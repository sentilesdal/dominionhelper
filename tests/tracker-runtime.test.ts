import { describe, it, expect } from "vitest";
import type { GameStateSnapshot } from "../src/types";
import { createGameState, createPlayerZones } from "../src/tracker/deck-state";
import {
  getTrackerPlayers,
  resolveSelectedPlayer,
} from "../src/content/tracker-runtime";

// Builds a minimal Angular snapshot for tracker runtime tests.
//
// @param players - Snapshot players to include
// @param turnNumber - Current turn number in the snapshot
// @returns Snapshot shaped like the bridge event detail
function makeSnapshot(
  players: GameStateSnapshot["players"],
  turnNumber = 1,
): GameStateSnapshot {
  return {
    players,
    turnNumber,
  };
}

describe("getTrackerPlayers", () => {
  it("prefers the live bridge player list over stale game-state players", () => {
    const state = createGameState();
    state.playerNames.set("m", "muddybrown");
    state.playerNames.set("o", "old-opponent");
    state.players.set("m", createPlayerZones());
    state.players.set("o", createPlayerZones());

    const snapshot = makeSnapshot([
      { name: "muddybrown", initials: "m", isMe: true, zones: [] },
      { name: "new-opponent", initials: "n", isMe: false, zones: [] },
    ]);

    expect(getTrackerPlayers(state, snapshot, true)).toEqual([
      { abbrev: "m", fullName: "muddybrown" },
      { abbrev: "n", fullName: "new-opponent" },
    ]);
  });

  it("normalizes dotted bridge initials for Lord Rattington", () => {
    const state = createGameState();

    const snapshot = makeSnapshot([
      { name: "muddybrown", initials: "m", isMe: true, zones: [] },
      { name: "Lord Rattington", initials: "L.", isMe: false, zones: [] },
    ]);

    expect(getTrackerPlayers(state, snapshot, true)).toEqual([
      { abbrev: "m", fullName: "muddybrown" },
      { abbrev: "l", fullName: "Lord Rattington" },
    ]);
  });

  it("falls back to log-discovered players when the bridge is inactive", () => {
    const state = createGameState();
    state.playerNames.set("m", "muddybrown");
    state.playerNames.set("o", "opponent");
    state.players.set("m", createPlayerZones());
    state.players.set("o", createPlayerZones());

    expect(getTrackerPlayers(state, null, false)).toEqual([
      { abbrev: "m", fullName: "muddybrown" },
      { abbrev: "o", fullName: "opponent" },
    ]);
  });
});

describe("resolveSelectedPlayer", () => {
  const players = [
    { abbrev: "m", fullName: "muddybrown" },
    { abbrev: "n", fullName: "new-opponent" },
  ];

  it("keeps the existing selection when it is still available", () => {
    expect(resolveSelectedPlayer("n", "m", players)).toBe("n");
  });

  it("falls back to the local player when the current selection disappears", () => {
    expect(resolveSelectedPlayer("o", "m", players)).toBe("m");
  });

  it("falls back to the first player when the local player is unavailable", () => {
    expect(resolveSelectedPlayer("", "x", players)).toBe("m");
  });

  it("returns an empty string when no players are available", () => {
    expect(resolveSelectedPlayer("m", "m", [])).toBe("");
  });
});
