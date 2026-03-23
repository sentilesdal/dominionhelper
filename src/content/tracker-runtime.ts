// Dominion Helper — Tracker Runtime Helpers
//
// Pure helper functions for the content script's tracker pipeline. These keep
// player tab selection deterministic when the Angular bridge's live player
// snapshot diverges from the log-discovered game state.
//
// @module tracker-runtime

import type { GameState, GameStateSnapshot, TrackerPlayer } from "../types";
import { normalizePlayerAbbrev } from "../tracker/player-abbrev";

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
