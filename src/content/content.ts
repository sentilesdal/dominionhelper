// Dominion Helper — Content Script Entry Point
//
// This is the main entry point injected into dominion.games by the Chrome
// extension. It wires three systems:
//
// 1. Kingdom analysis: DOM observer detects kingdom cards -> sends card names
//    to the service worker, which runs the analysis engine and forwards the
//    result to the side panel.
//
// 2. Deck tracker: Game log observer detects card actions -> log parser
//    produces structured entries -> deck state tracks card zones -> stats
//    calculator produces composition/probabilities -> serialized and sent
//    to the service worker for forwarding to the side panel.
//
// 3. Angular bridge: A MAIN-world script polls Angular game state and
//    dispatches CustomEvents. This content script (ISOLATED world) listens
//    for those events and uses applySnapshot to correct zone data with
//    ground-truth hand/play/count information from Angular.
//
// Vite bundles this file and all its transitive imports into `dist/content.js`.
//
// @module content

import type { Card, GameStateSnapshot, TrackerData } from "../types";
import { observeKingdom } from "./observer";
import { observeGameLog } from "./log-observer";
import {
  parseLogLine,
  parseTurnMarker,
  isGameStart,
} from "../tracker/log-parser";
import {
  createGameState,
  resetGameState,
  applySnapshotMetadata,
  buildHybridZones,
} from "../tracker/deck-state";
import {
  createPendingDrawBuffer,
  clearPendingDrawBuffer,
  processObservedLogItems,
  type ObservedLogItem,
} from "../tracker/log-stream";
import { calculateStats } from "../tracker/stats";
import { serializeTrackerStats, mapToRecord } from "./serialize";
import {
  getTrackerPlayers,
  resolvePreferredSelectedPlayer,
  serializeDebugGameState,
  countTrackedCards,
  didTurnCounterReset,
  filterPlayersWithTrackedCards,
} from "./tracker-runtime";
import cardData from "../data/cards.json";

// Build a card database map for O(1) lookups by name.
// Used by both the deck state (for Duration detection) and stats (for type/coin values).
const CARD_DB = new Map((cardData as Card[]).map((c) => [c.name, c]));

// ─── Kingdom Analysis Pipeline ─────────────────────────────────────────

// Tracks the current kingdom to avoid redundant re-analysis.
let currentKingdom: string[] = [];

// Compares two string arrays for equality regardless of order.
// Used to skip re-analysis when the observer fires but the kingdom
// hasn't actually changed (e.g., DOM mutations from card animations).
//
// @param a - First array
// @param b - Second array
// @returns True if both arrays contain the same strings
function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((v, i) => v === sortedB[i]);
}

// Callback invoked by the DOM observer when a kingdom is detected.
// Skips processing if the kingdom hasn't changed since the last detection.
// Otherwise, updates the stored kingdom and notifies the service worker
// which will run the analysis engine and forward results to the side panel.
//
// @param cardNames - Array of card name strings detected from the DOM
function onKingdomDetected(cardNames: string[]): void {
  if (arraysEqual(cardNames, currentKingdom)) return;
  currentKingdom = cardNames;

  // Notify the service worker — it runs the analysis and forwards to side panel
  chrome.runtime.sendMessage({
    type: "KINGDOM_DETECTED",
    cards: cardNames,
  });
}

// Start observing the DOM for kingdom cards as soon as the content script loads
observeKingdom(onKingdomDetected);

// ─── Deck Tracker Pipeline ─────────────────────────────────────────────

// Mutable game state tracking card zones for all players
let gameState = createGameState();

// Tracks whether the Angular bridge is active. When true, we have ground-truth
// zone data and log parsing only needs to track ownership changes.
let bridgeActive = false;

// Stores the most recent Angular snapshot for use by buildHybridZones().
// Updated every time the bridge dispatches a state change event.
let latestSnapshot: GameStateSnapshot | null = null;

// Buffers ambiguous active-player draw lines until later log entries confirm
// whether they were ordinary draws or cleanup draws for the next hand.
const pendingDrawBuffer = createPendingDrawBuffer();

// Currently selected player for the tracker (persists across re-renders).
// Defaults to the local player when first detected.
let selectedPlayer = "";

// Tracks whether the user explicitly chose a player tab. When false, automatic
// selection should keep preferring the local player as new tracker data arrives.
let selectedPlayerPinned = false;

// Tracks whether we intentionally reset for a newly starting game and should
// keep the tracker empty until fresh ownership data exists for the new match.
let waitingForFreshTrackerData = false;

// Finds the local player's abbreviation by checking PLAYER-INFO-NAME
// elements on the page. The local player's name element is positioned
// at the bottom of the viewport (y > 50% screen height).
//
// @param state - Current game state with player name mappings
// @returns Abbreviation of the local player, or empty string if not found
function detectLocalPlayer(): string {
  const nameEls = document.querySelectorAll("PLAYER-INFO-NAME");
  for (const el of nameEls) {
    const rect = el.getBoundingClientRect();
    // Local player's info bar is at the bottom of the screen
    if (rect.y > window.innerHeight * 0.5) {
      const name = el.textContent?.trim() || "";
      // Find matching abbreviation from the state's player names
      for (const [abbrev, fullName] of gameState.playerNames) {
        if (fullName === name) return abbrev;
      }
    }
  }
  return "";
}

// Counts total cards in a zone map.
//
// @param zone - Map of card name to count
// @returns Total number of cards
function zoneTotal(zone: Map<string, number>): number {
  let total = 0;
  for (const count of zone.values()) {
    total += count;
  }
  return total;
}

// Sends the current tracker internals to the MAIN-world bridge so the state is
// visible from the page's DevTools console. This makes it much easier to
// compare raw Angular state against the extension's derived tracker state.
//
// @param tracker - The current tracker payload, or null when clearing state
function dispatchTrackerDebug(tracker: TrackerData | null): void {
  window.dispatchEvent(
    new CustomEvent("dominion-helper-tracker-debug", {
      detail: {
        tracker,
        gameState: serializeDebugGameState(gameState),
        bridgeActive,
        latestSnapshotTurn: latestSnapshot?.turnNumber ?? null,
        selectedPlayer,
      },
    }),
  );
}

// Clears any cached tracker UI in the side panel and updates the page-visible
// debug handle so stale state does not linger after leaving a game.
function sendTrackerClear(): void {
  chrome.runtime.sendMessage({
    type: "TRACKER_CLEAR",
  });
  dispatchTrackerDebug(null);
}

// Builds serializable TrackerData from the current game state and sends
// it to the service worker for forwarding to the side panel.
function sendTrackerUpdate(): void {
  // Detect local player if not yet set
  if (!gameState.localPlayer) {
    gameState.localPlayer = detectLocalPlayer();
  }

  let players = getTrackerPlayers(gameState, latestSnapshot, bridgeActive);
  selectedPlayer = resolvePreferredSelectedPlayer(
    selectedPlayer,
    gameState.localPlayer,
    players,
    selectedPlayerPinned,
  );

  // When the Angular bridge is active, use buildHybridZones() to produce
  // accurate zone data. Visible zones come from Angular, while hidden zones
  // stay reconstructed from the log-based tracker state.
  // Without the bridge, fall back to raw log-parsed zones.
  let zonesMap = gameState.players;
  if (bridgeActive && latestSnapshot) {
    zonesMap = buildHybridZones(gameState, latestSnapshot);
  }

  if (waitingForFreshTrackerData) {
    players = filterPlayersWithTrackedCards(players, zonesMap);
    selectedPlayer = resolvePreferredSelectedPlayer(
      selectedPlayer,
      gameState.localPlayer,
      players,
      selectedPlayerPinned,
    );

    if (players.length === 0 || !selectedPlayer) {
      sendTrackerClear();
      return;
    }
  } else if (players.length === 0 || !selectedPlayer) {
    sendTrackerClear();
    return;
  }

  const zones = zonesMap.get(selectedPlayer);
  if (!zones) {
    sendTrackerClear();
    return;
  }

  if (waitingForFreshTrackerData) {
    waitingForFreshTrackerData = countTrackedCards(zones) === 0;
    if (waitingForFreshTrackerData) {
      sendTrackerClear();
      return;
    }
  }

  const stats = calculateStats(zones, CARD_DB);

  // Count villages and terminals across the player's full deck
  let villageCount = 0;
  let terminalCount = 0;
  for (const [cardName, count] of stats.allCards) {
    const card = CARD_DB.get(cardName);
    if (!card) continue;
    if (card.tags.includes("village")) villageCount += count;
    if (card.isTerminal && card.types.includes("Action")) {
      terminalCount += count;
    }
  }

  const trackerData: TrackerData = {
    players,
    localPlayer: gameState.localPlayer,
    selectedPlayer,
    stats: serializeTrackerStats(stats),
    handCount: zoneTotal(zones.hand),
    playCount: zoneTotal(zones.play),
    deckCards: mapToRecord(zones.deck),
    discardCards: mapToRecord(zones.discard),
    handCards: mapToRecord(zones.hand),
    playCards: mapToRecord(zones.play),
    villageCount,
    terminalCount,
  };

  chrome.runtime.sendMessage({
    type: "TRACKER_UPDATE",
    tracker: trackerData,
  });

  dispatchTrackerDebug(trackerData);
}

// Callback invoked by the log observer when new log lines appear.
// Parses each line, processes card movements, and sends the tracker
// update to the service worker.
// When the bridge is active, all log actions are still processed to
// maintain ownership tracking (gains, trashes, starts-with), which is
// needed for inferring draw pile composition.
//
// @param lines - Array of new log line strings from the game log DOM
function onLogUpdate(lines: string[]): void {
  let changed = false;
  let needsImmediateSync = false;
  const items: ObservedLogItem[] = [];

  for (const line of lines) {
    // Detect new game start — reset state if we see "starts with"
    // after the game has already begun (turn > 0)
    if (isGameStart(line) && gameState.currentTurn > 0) {
      gameState = resetGameState();
      clearPendingDrawBuffer(pendingDrawBuffer);
      bridgeActive = false;
      latestSnapshot = null;
      selectedPlayer = "";
      selectedPlayerPinned = false;
      waitingForFreshTrackerData = true;
      sendTrackerClear();
      changed = true;
    }

    // Check for turn markers ("Turn 1 - muddybrown")
    const turn = parseTurnMarker(line);
    if (turn) {
      items.push({
        kind: "turn",
        turn: turn.turn,
        fullName: turn.fullName,
      });
      continue;
    }

    // Parse and process regular log entries (plays, buys, draws, etc.)
    const entry = parseLogLine(line);
    if (entry) {
      items.push({
        kind: "entry",
        entry,
      });
    }
  }

  if (items.length > 0) {
    const result = processObservedLogItems(
      gameState,
      items,
      CARD_DB,
      pendingDrawBuffer,
    );
    changed = changed || result.changed;
    needsImmediateSync = result.needsImmediateSync;
  }

  // Hidden-zone log changes still need immediate tracker updates even while
  // the Angular bridge is active, because discard/deck changes are not always
  // visible enough in the bridge snapshot to trigger a timely refresh.
  if (changed && (!bridgeActive || needsImmediateSync)) {
    sendTrackerUpdate();
  }
}

// Start observing the game log for card actions
observeGameLog(onLogUpdate);

// ─── Angular Bridge Integration ────────────────────────────────────────

// Listen for game state snapshots from the MAIN-world bridge script.
// The bridge polls Angular every 500ms and dispatches a CustomEvent only
// when the state changes. We store the snapshot and update metadata, then
// sendTrackerUpdate() uses buildHybridZones() to overlay Angular-visible
// zones on top of the log-reconstructed hidden zones.
window.addEventListener("dominion-helper-game-state", (e: Event) => {
  const snapshot = (e as CustomEvent).detail as GameStateSnapshot | null;

  // The MAIN-world bridge dispatches a null detail when the player leaves a
  // game or Angular no longer exposes player state. Clear the tracker so old
  // tabs and card zones do not persist in the side panel.
  if (!snapshot) {
    if (bridgeActive || latestSnapshot || gameState.players.size > 0) {
      gameState = resetGameState();
      clearPendingDrawBuffer(pendingDrawBuffer);
      bridgeActive = false;
      latestSnapshot = null;
      selectedPlayer = "";
      selectedPlayerPinned = false;
      waitingForFreshTrackerData = false;
      sendTrackerClear();
    }
    return;
  }

  // Detect new game: turn counter dropped back to start while we were
  // tracking an ongoing game. Reset state so old player tabs don't persist.
  if (didTurnCounterReset(gameState.currentTurn, snapshot.turnNumber)) {
    gameState = resetGameState();
    clearPendingDrawBuffer(pendingDrawBuffer);
    latestSnapshot = null;
    selectedPlayer = "";
    selectedPlayerPinned = false;
    waitingForFreshTrackerData = true;
    sendTrackerClear();
  }

  // Mark bridge as active on first snapshot — enables hybrid rendering
  bridgeActive = true;

  // Store snapshot for use by buildHybridZones() in sendTrackerUpdate()
  latestSnapshot = snapshot;

  // Update metadata (turn, local player, name mappings) without touching
  // zone card data — log-based zones must stay pure for ownership tracking
  applySnapshotMetadata(gameState, snapshot);

  // Send updated tracker data to the side panel
  sendTrackerUpdate();
});

// ─── Side Panel Player Selection ────────────────────────────────────────

// Listen for player selection changes from the side panel (forwarded
// by the service worker). When the user clicks a player tab in the
// side panel, this switches the selected player and sends an update.
chrome.runtime.onMessage.addListener(
  (message: { type: string; player?: string }) => {
    if (message.type === "SELECT_PLAYER" && message.player) {
      selectedPlayer = message.player;
      selectedPlayerPinned = true;
      sendTrackerUpdate();
    }
  },
);
