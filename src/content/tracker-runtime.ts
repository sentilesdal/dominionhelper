// Dominion Helper — Tracker Runtime Helpers
//
// Pure helper functions for the content script's tracker pipeline.
// These utilities keep player selection, player tab rendering, and
// debug serialization deterministic and easy to unit test.
//
// @module tracker-runtime

import type {
  GameState,
  GameStateSnapshot,
  TrackerPlayer,
  PlayerZones,
} from "../types";
import { mapToRecord } from "./serialize";

// Serializable version of a player's tracked zones, used by the page-visible
// debug surface to inspect the extension's current internal state.
export interface SerializedPlayerZones {
  deck: Record<string, number>;
  discard: Record<string, number>;
  hand: Record<string, number>;
  play: Record<string, number>;
  trash: Record<string, number>;
}

// Serializable snapshot of the content script's internal tracker state.
export interface SerializedDebugGameState {
  currentTurn: number;
  activePlayer: string;
  localPlayer: string;
  playerNames: Record<string, string>;
  players: Record<string, SerializedPlayerZones>;
}

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
function serializePlayerZones(zones: PlayerZones): SerializedPlayerZones {
  return {
    deck: mapToRecord(zones.deck),
    discard: mapToRecord(zones.discard),
    hand: mapToRecord(zones.hand),
    play: mapToRecord(zones.play),
    trash: mapToRecord(zones.trash),
  };
}

// Builds the canonical player list for the tracker UI.
//
// When the Angular bridge is active, we trust the snapshot's player list so
// tabs only reflect players in the live game. Without the bridge, we fall back
// to players discovered from log parsing.
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
        findMappedAbbrev(state, player.name) ?? player.initials.toLowerCase();
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

// Converts the content script's Map-based game state into plain objects so the
// current tracker state can be inspected from Chrome DevTools.
//
// @param state - Current tracker game state
// @returns JSON-serializable tracker state for debugging
export function serializeDebugGameState(
  state: GameState,
): SerializedDebugGameState {
  const playerNames: Record<string, string> = {};
  for (const [abbrev, fullName] of state.playerNames) {
    playerNames[abbrev] = fullName;
  }

  const players: Record<string, SerializedPlayerZones> = {};
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
