// Dominion Helper — Content Script Entry Point
//
// This is the main entry point injected into dominion.games by the Chrome
// extension. It wires three systems:
//
// 1. Kingdom analysis: DOM observer detects kingdom cards → analysis engine
//    produces strategic advice → rendered in the right-side overlay panel.
//
// 2. Deck tracker: Game log observer detects card actions → log parser
//    produces structured entries → deck state tracks card zones → stats
//    calculator produces composition/probabilities → rendered in the
//    left-side tracker panel.
//
// 3. Angular bridge: A MAIN-world script polls Angular game state and
//    dispatches CustomEvents. This content script (ISOLATED world) listens
//    for those events and uses applySnapshot to correct zone data with
//    ground-truth hand/play/count information from Angular.
//
// Vite bundles this file and all its transitive imports into `dist/content.js`.
//
// @module content

import type { Card, GameStateSnapshot } from "../types";
import { observeKingdom } from "./observer";
import { renderOverlay } from "./ui";
import { observeGameLog } from "./log-observer";
import {
  parseLogLine,
  parseTurnMarker,
  isGameStart,
} from "../tracker/log-parser";
import {
  createGameState,
  processLogEntry,
  processTurnChange,
  resetGameState,
  applySnapshot,
} from "../tracker/deck-state";
import { renderTrackerPanel } from "../tracker/tracker-ui";
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
// Otherwise, updates the stored kingdom, notifies the service worker,
// and renders the analysis overlay.
//
// @param cardNames - Array of card name strings detected from the DOM
function onKingdomDetected(cardNames: string[]): void {
  if (arraysEqual(cardNames, currentKingdom)) return;
  currentKingdom = cardNames;

  // Notify the service worker so the popup can display the current kingdom
  chrome.runtime.sendMessage({
    type: "KINGDOM_DETECTED",
    cards: cardNames,
  });

  renderOverlay(cardNames);
}

// Start observing the DOM for kingdom cards as soon as the content script loads
observeKingdom(onKingdomDetected);

// ─── Deck Tracker Pipeline ─────────────────────────────────────────────

// Mutable game state tracking card zones for all players
let gameState = createGameState();

// Tracks whether the Angular bridge is active. When true, we have ground-truth
// zone data and log parsing only needs to track ownership changes.
let bridgeActive = false;

// Callback invoked by the log observer when new log lines appear.
// Parses each line, processes card movements, and re-renders the tracker.
// When the bridge is active, all log actions are still processed to maintain
// ownership tracking (gains, trashes, starts-with), which is needed for
// inferring draw pile composition.
//
// @param lines - Array of new log line strings from the game log DOM
function onLogUpdate(lines: string[]): void {
  let changed = false;

  for (const line of lines) {
    // Detect new game start — reset state if we see "starts with"
    // after the game has already begun (turn > 0)
    if (isGameStart(line) && gameState.currentTurn > 0) {
      gameState = resetGameState();
      bridgeActive = false;
      changed = true;
    }

    // Check for turn markers ("Turn 1 - muddybrown")
    const turn = parseTurnMarker(line);
    if (turn) {
      processTurnChange(gameState, turn.turn, turn.fullName, CARD_DB);
      changed = true;
      continue;
    }

    // Parse and process regular log entries (plays, buys, draws, etc.)
    const entry = parseLogLine(line);
    if (entry) {
      processLogEntry(gameState, entry);
      changed = true;
    }
  }

  // Only re-render if something actually changed and bridge isn't handling renders
  // When bridge is active, it handles rendering on every snapshot update
  if (changed && !bridgeActive) {
    renderTrackerPanel(gameState, CARD_DB);
  }
}

// Start observing the game log for card actions
observeGameLog(onLogUpdate);

// ─── Angular Bridge Integration ────────────────────────────────────────

// Listen for game state snapshots from the MAIN-world bridge script.
// The bridge polls Angular every 500ms and dispatches a CustomEvent only
// when the state changes. We use this to apply ground-truth zone data.
window.addEventListener("dominion-helper-game-state", (e: Event) => {
  const snapshot = (e as CustomEvent).detail as GameStateSnapshot;

  // Mark bridge as active on first snapshot — enables hybrid rendering
  bridgeActive = true;

  // Apply Angular's ground truth data to our game state
  applySnapshot(gameState, snapshot);

  // Re-render with the corrected state
  renderTrackerPanel(gameState, CARD_DB);
});
