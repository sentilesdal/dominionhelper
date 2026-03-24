import { describe, it, expect } from "vitest";
import type { GameStateSnapshot } from "../src/types";
import { createGameState, createPlayerZones } from "../src/tracker/deck-state";
import {
  countTrackedCards,
  didTurnCounterReset,
  filterPlayersWithTrackedCards,
  getTrackerPlayers,
  resolvePreferredSelectedPlayer,
  resolveSelectedPlayer,
  serializeDebugGameState,
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

  it("deduplicates duplicate bridge players by abbreviation", () => {
    const state = createGameState();

    const snapshot = makeSnapshot([
      { name: "muddybrown", initials: "m", isMe: true, zones: [] },
      { name: "muddybrown", initials: "m", isMe: true, zones: [] },
    ]);

    expect(getTrackerPlayers(state, snapshot, true)).toEqual([
      { abbrev: "m", fullName: "muddybrown" },
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

describe("resolvePreferredSelectedPlayer", () => {
  const players = [
    { abbrev: "l", fullName: "Lord Rattington" },
    { abbrev: "m", fullName: "muddybrown" },
  ];

  it("prefers the local player when the current selection is only automatic", () => {
    expect(resolvePreferredSelectedPlayer("l", "m", players, false)).toBe("m");
  });

  it("preserves a user-pinned opponent selection", () => {
    expect(resolvePreferredSelectedPlayer("l", "m", players, true)).toBe("l");
  });
});

describe("countTrackedCards", () => {
  it("counts cards across all tracked zones", () => {
    const zones = createPlayerZones();
    zones.deck.set("Copper", 7);
    zones.hand.set("Estate", 3);
    zones.play.set("Village", 1);

    expect(countTrackedCards(zones)).toBe(11);
  });

  it("returns zero for empty zones", () => {
    expect(countTrackedCards(createPlayerZones())).toBe(0);
  });
});

describe("filterPlayersWithTrackedCards", () => {
  it("removes players whose zones are still empty after a reset", () => {
    const players = [
      { abbrev: "m", fullName: "muddybrown" },
      { abbrev: "l", fullName: "Lord Rattington" },
    ];

    const zonesByPlayer = new Map<string, ReturnType<typeof createPlayerZones>>();
    const readyZones = createPlayerZones();
    readyZones.deck.set("Copper", 10);

    zonesByPlayer.set("m", readyZones);
    zonesByPlayer.set("l", createPlayerZones());

    expect(filterPlayersWithTrackedCards(players, zonesByPlayer)).toEqual([
      { abbrev: "m", fullName: "muddybrown" },
    ]);
  });
});

describe("didTurnCounterReset", () => {
  it("treats a lower next turn as a reset", () => {
    expect(didTurnCounterReset(1, 0)).toBe(true);
    expect(didTurnCounterReset(8, 1)).toBe(true);
  });

  it("does not treat stable or increasing turns as a reset", () => {
    expect(didTurnCounterReset(0, 0)).toBe(false);
    expect(didTurnCounterReset(1, 1)).toBe(false);
    expect(didTurnCounterReset(1, 2)).toBe(false);
  });
});

describe("serializeDebugGameState", () => {
  it("converts the internal tracker state into plain objects", () => {
    const state = createGameState();
    state.currentTurn = 4;
    state.activePlayer = "m";
    state.localPlayer = "m";
    state.playerNames.set("m", "muddybrown");

    const zones = createPlayerZones();
    zones.deck.set("Copper", 4);
    zones.hand.set("Estate", 1);
    state.players.set("m", zones);

    expect(serializeDebugGameState(state)).toEqual({
      currentTurn: 4,
      activePlayer: "m",
      localPlayer: "m",
      playerNames: {
        m: "muddybrown",
      },
      players: {
        m: {
          deck: { Copper: 4 },
          discard: {},
          hand: { Estate: 1 },
          play: {},
          trash: {},
        },
      },
    });
  });
});
