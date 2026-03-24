// Dominion Helper — Tracker Runtime Helpers
//
// Pure helper functions for the content script's tracker pipeline. These keep
// player tab selection deterministic when the Angular bridge's live player
// snapshot diverges from the log-discovered game state, and they expose a
// debug-friendly serialized view of tracker internals.
//
// @module tracker-runtime

import type {
  GameState,
  GameStateSnapshot,
  PlayerZones,
  TrackerPlayer,
} from "../types";
import { normalizePlayerAbbrev } from "../tracker/player-abbrev";
import { mapToRecord } from "./serialize";

// Finds the abbreviation already mapped to a full player name.
//
// @param state - Current tracker game state
// @param fullName - Full dominion.games player name
// @returns Existing abbreviation, or null if none is registered
function findMappedAbbrev(state: GameState, fullName: string): string | null {
  for (const [abbrev, name] of state.playerNames) {
    if (name === fullName) {
      return abbrev;
    }
  }

  return null;
}

// Serializes a single player's tracked zones into plain objects.
//
// @param zones - Map-based zone state for a player
// @returns JSON-serializable zone records
function serializePlayerZones(
  zones: PlayerZones,
): Record<keyof PlayerZones, Record<string, number>> {
  return {
    deck: mapToRecord(zones.deck),
    discard: mapToRecord(zones.discard),
    hand: mapToRecord(zones.hand),
    play: mapToRecord(zones.play),
    trash: mapToRecord(zones.trash),
  };
}

// Counts the total number of tracked cards across all of a player's zones.
//
// Used to suppress tracker tabs during a fresh-game reset window where the
// Angular bridge already knows who the players are, but log-based ownership
// tracking has not rebuilt the new game's deck composition yet.
//
// @param zones - Zone state for one player
// @returns Total tracked cards across deck, discard, hand, play, and trash
export function countTrackedCards(zones: PlayerZones): number {
  let total = 0;

  for (const zone of [
    zones.deck,
    zones.discard,
    zones.hand,
    zones.play,
    zones.trash,
  ]) {
    for (const count of zone.values()) {
      total += count;
    }
  }

  return total;
}

// Filters the tracker player list down to players whose current zone snapshot
// contains at least one tracked card.
//
// During the short new-game reset window, this prevents the side panel from
// keeping stale player tabs alive while the tracker only has zero-card shell
// data for the next game.
//
// @param players - Ordered tracker player list for the current game
// @param zonesByPlayer - Current zone state keyed by player abbreviation
// @returns Only players whose zones contain tracked cards
export function filterPlayersWithTrackedCards(
  players: TrackerPlayer[],
  zonesByPlayer: Map<string, PlayerZones>,
): TrackerPlayer[] {
  return players.filter((player) => {
    const zones = zonesByPlayer.get(player.abbrev);
    return Boolean(zones && countTrackedCards(zones) > 0);
  });
}

// Detects whether the live turn counter moved backwards, which dominion.games
// uses when transitioning from one game to the next.
//
// A drop from 1 to 0 is just as much a reset as a drop from 8 to 1, so the
// tracker should clear whenever the next observed turn number is lower than the
// previous one.
//
// @param previousTurn - Previously tracked turn number
// @param nextTurn - Newly observed turn number from the bridge snapshot
// @returns True when the snapshot indicates a new game/reset transition
export function didTurnCounterReset(
  previousTurn: number,
  nextTurn: number,
): boolean {
  return nextTurn < previousTurn;
}

// Builds the canonical player list for the tracker UI.
//
// When the Angular bridge is active, we trust the snapshot's player list so
// the tracker only renders players in the live game. Without the bridge, we
// fall back to players discovered from log parsing.
//
// @param state - Current tracker game state
// @param snapshot - Most recent Angular snapshot, if available
// @param bridgeActive - Whether bridge-backed tracker rendering is enabled
// @returns Ordered list of players to show in the tracker UI
export function getTrackerPlayers(
  state: GameState,
  snapshot: GameStateSnapshot | null,
  bridgeActive: boolean,
): TrackerPlayer[] {
  if (bridgeActive && snapshot) {
    const players: TrackerPlayer[] = [];
    const seen = new Set<string>();

    for (const player of snapshot.players) {
      const abbrev =
        findMappedAbbrev(state, player.name) ??
        normalizePlayerAbbrev(player.initials);
      if (seen.has(abbrev)) continue;

      seen.add(abbrev);
      players.push({
        abbrev,
        fullName: player.name,
      });
    }

    return players;
  }

  return [...state.players.keys()].map((abbrev) => ({
    abbrev,
    fullName: state.playerNames.get(abbrev) || abbrev,
  }));
}

// Resolves which player should currently be selected in the tracker UI.
//
// The current selection wins if it still exists; otherwise we fall back to the
// local player, then finally the first available player.
//
// @param currentSelectedPlayer - Previously selected player abbreviation
// @param localPlayer - Local player abbreviation, if known
// @param players - Current tracker player list
// @returns The player abbreviation that should be selected, or empty string
export function resolveSelectedPlayer(
  currentSelectedPlayer: string,
  localPlayer: string,
  players: TrackerPlayer[],
): string {
  const available = new Set(players.map((player) => player.abbrev));

  if (currentSelectedPlayer && available.has(currentSelectedPlayer)) {
    return currentSelectedPlayer;
  }

  if (localPlayer && available.has(localPlayer)) {
    return localPlayer;
  }

  return players[0]?.abbrev ?? "";
}

// Resolves the selected player while distinguishing between an automatic
// default selection and a user-pinned tab choice.
//
// Automatic selection should always snap back to the local player when that
// player becomes available. User-pinned selections should be preserved as long
// as the chosen player still exists.
//
// @param currentSelectedPlayer - Previously selected player abbreviation
// @param localPlayer - Local player abbreviation, if known
// @param players - Current tracker player list
// @param keepCurrentSelection - True when the user explicitly chose a tab
// @returns The player abbreviation that should be selected, or empty string
export function resolvePreferredSelectedPlayer(
  currentSelectedPlayer: string,
  localPlayer: string,
  players: TrackerPlayer[],
  keepCurrentSelection: boolean,
): string {
  return resolveSelectedPlayer(
    keepCurrentSelection ? currentSelectedPlayer : "",
    localPlayer,
    players,
  );
}

// Converts the content script's Map-based game state into plain objects so the
// current tracker state can be inspected from Chrome DevTools.
//
// @param state - Current tracker game state
// @returns JSON-serializable tracker state for debugging
export function serializeDebugGameState(state: GameState): {
  currentTurn: number;
  activePlayer: string;
  localPlayer: string;
  playerNames: Record<string, string>;
  players: Record<string, ReturnType<typeof serializePlayerZones>>;
} {
  const playerNames: Record<string, string> = {};
  for (const [abbrev, fullName] of state.playerNames) {
    playerNames[abbrev] = fullName;
  }

  const players: Record<string, ReturnType<typeof serializePlayerZones>> = {};
  for (const [abbrev, zones] of state.players) {
    players[abbrev] = serializePlayerZones(zones);
  }

  return {
    currentTurn: state.currentTurn,
    activePlayer: state.activePlayer,
    localPlayer: state.localPlayer,
    playerNames,
    players,
  };
}
