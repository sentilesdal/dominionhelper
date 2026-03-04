import { describe, it, expect } from "vitest";
import type { Card, LogEntry } from "../src/types";
import {
  createGameState,
  createPlayerZones,
  processLogEntry,
  processTurnChange,
  resetGameState,
  getAllOwnedCards,
  deriveAbbrev,
} from "../src/tracker/deck-state";

// Helper to build a minimal Card object for testing
function makeCard(name: string, types: string[] = ["Action"]): Card {
  return {
    name,
    set: "Base",
    types: types as Card["types"],
    cost: { coins: 0 },
    text: "",
    effects: {},
    tags: [],
    isTerminal: false,
    isCantrip: false,
  };
}

// Helper to build a card database map
function makeCardDb(cards: Card[]): Map<string, Card> {
  return new Map(cards.map((c) => [c.name, c]));
}

// Helper to build a LogEntry
function makeEntry(
  playerAbbrev: string,
  action: LogEntry["action"],
  cards: string[],
  counts: number[],
): LogEntry {
  return {
    playerAbbrev,
    action,
    cards,
    counts,
    rawText: "",
  };
}

describe("createPlayerZones", () => {
  it("creates empty zones for all zone types", () => {
    const zones = createPlayerZones();
    expect(zones.deck.size).toBe(0);
    expect(zones.discard.size).toBe(0);
    expect(zones.hand.size).toBe(0);
    expect(zones.play.size).toBe(0);
    expect(zones.trash.size).toBe(0);
  });
});

describe("createGameState", () => {
  it("creates an empty game state", () => {
    const state = createGameState();
    expect(state.players.size).toBe(0);
    expect(state.playerNames.size).toBe(0);
    expect(state.currentTurn).toBe(0);
    expect(state.activePlayer).toBe("");
    expect(state.localPlayer).toBe("");
  });
});

describe("resetGameState", () => {
  it("returns a fresh empty state", () => {
    const state = resetGameState();
    expect(state.currentTurn).toBe(0);
    expect(state.players.size).toBe(0);
  });
});

describe("processLogEntry", () => {
  it("processes starts-with by adding cards to deck", () => {
    const state = createGameState();
    const entry = makeEntry("m", "starts-with", ["Copper"], [7]);

    processLogEntry(state, entry);

    const zones = state.players.get("m")!;
    expect(zones.deck.get("Copper")).toBe(7);
  });

  it("processes plays by moving cards from hand to play", () => {
    const state = createGameState();
    // First put a card in hand
    processLogEntry(state, makeEntry("m", "draws", ["Silver"], [1]));
    // Then play it
    processLogEntry(state, makeEntry("m", "plays", ["Silver"], [1]));

    const zones = state.players.get("m")!;
    expect(zones.hand.get("Silver") || 0).toBe(0);
    expect(zones.play.get("Silver")).toBe(1);
  });

  it("processes buys by adding cards to discard", () => {
    const state = createGameState();
    processLogEntry(state, makeEntry("m", "buys", ["Village"], [1]));

    const zones = state.players.get("m")!;
    expect(zones.discard.get("Village")).toBe(1);
  });

  it("processes gains by adding cards to discard", () => {
    const state = createGameState();
    processLogEntry(state, makeEntry("m", "gains", ["Gold"], [1]));

    const zones = state.players.get("m")!;
    expect(zones.discard.get("Gold")).toBe(1);
  });

  it("processes trashes by moving cards to trash", () => {
    const state = createGameState();
    // Put card in hand first
    processLogEntry(state, makeEntry("m", "draws", ["Copper"], [1]));
    // Trash it
    processLogEntry(state, makeEntry("m", "trashes", ["Copper"], [1]));

    const zones = state.players.get("m")!;
    expect(zones.hand.get("Copper") || 0).toBe(0);
    expect(zones.trash.get("Copper")).toBe(1);
  });

  it("processes draws by moving cards from deck to hand", () => {
    const state = createGameState();
    // Put cards in deck first
    processLogEntry(state, makeEntry("m", "starts-with", ["Copper"], [7]));
    // Draw some
    processLogEntry(state, makeEntry("m", "draws", ["Copper"], [5]));

    const zones = state.players.get("m")!;
    expect(zones.deck.get("Copper")).toBe(2);
    expect(zones.hand.get("Copper")).toBe(5);
  });

  it("processes discards by moving cards from hand to discard", () => {
    const state = createGameState();
    processLogEntry(state, makeEntry("m", "draws", ["Copper"], [3]));
    processLogEntry(state, makeEntry("m", "discards", ["Copper"], [1]));

    const zones = state.players.get("m")!;
    expect(zones.hand.get("Copper")).toBe(2);
    expect(zones.discard.get("Copper")).toBe(1);
  });

  it("processes shuffles by moving all discard to deck", () => {
    const state = createGameState();
    processLogEntry(state, makeEntry("m", "gains", ["Copper"], [3]));
    processLogEntry(state, makeEntry("m", "gains", ["Silver"], [2]));
    processLogEntry(state, makeEntry("m", "shuffles", [], []));

    const zones = state.players.get("m")!;
    expect(zones.discard.size).toBe(0);
    expect(zones.deck.get("Copper")).toBe(3);
    expect(zones.deck.get("Silver")).toBe(2);
  });

  it("processes topdecks by moving cards from hand to deck", () => {
    const state = createGameState();
    processLogEntry(state, makeEntry("m", "draws", ["Silver"], [1]));
    processLogEntry(state, makeEntry("m", "topdecks", ["Silver"], [1]));

    const zones = state.players.get("m")!;
    expect(zones.hand.get("Silver") || 0).toBe(0);
    expect(zones.deck.get("Silver")).toBe(1);
  });

  it("handles multiple players independently", () => {
    const state = createGameState();
    processLogEntry(state, makeEntry("m", "starts-with", ["Copper"], [7]));
    processLogEntry(state, makeEntry("o", "starts-with", ["Copper"], [7]));

    expect(state.players.get("m")!.deck.get("Copper")).toBe(7);
    expect(state.players.get("o")!.deck.get("Copper")).toBe(7);
  });

  it("gracefully handles trashing from empty hand", () => {
    const state = createGameState();
    // Trash without having drawn — shouldn't crash
    processLogEntry(state, makeEntry("m", "trashes", ["Copper"], [1]));

    const zones = state.players.get("m")!;
    expect(zones.trash.get("Copper")).toBe(1);
  });
});

describe("processTurnChange", () => {
  it("updates turn number and active player", () => {
    const state = createGameState();
    const cardDb = makeCardDb([]);

    processTurnChange(state, 1, "muddybrown", cardDb);

    expect(state.currentTurn).toBe(1);
    expect(state.activePlayer).toBe("m");
    expect(state.playerNames.get("m")).toBe("muddybrown");
  });

  it("moves played cards to discard on turn change (cleanup)", () => {
    const state = createGameState();
    const cardDb = makeCardDb([makeCard("Village")]);

    // Set up: player m has Village in play
    processLogEntry(state, makeEntry("m", "starts-with", ["Copper"], [7]));
    processTurnChange(state, 1, "muddybrown", cardDb);
    processLogEntry(state, makeEntry("m", "draws", ["Copper"], [5]));
    processLogEntry(state, makeEntry("m", "plays", ["Copper"], [1]));

    // Opponent's turn triggers cleanup for m
    processTurnChange(state, 2, "opponent", cardDb);

    const zones = state.players.get("m")!;
    // Played cards should now be in discard
    expect(zones.play.get("Copper") || 0).toBe(0);
    // 1 from play + 4 remaining in hand = 5 total discarded
    expect(zones.discard.get("Copper")).toBe(5);
  });

  it("keeps Duration cards in play during cleanup", () => {
    const state = createGameState();
    const wharf = makeCard("Wharf", ["Action", "Duration"]);
    const cardDb = makeCardDb([wharf, makeCard("Copper", ["Treasure"])]);

    processLogEntry(state, makeEntry("m", "starts-with", ["Copper"], [7]));
    processTurnChange(state, 1, "muddybrown", cardDb);

    // Put Wharf and Copper in play
    const zones = state.players.get("m")!;
    zones.hand.set("Wharf", 1);
    zones.hand.set("Copper", 1);
    processLogEntry(state, makeEntry("m", "plays", ["Wharf"], [1]));
    processLogEntry(state, makeEntry("m", "plays", ["Copper"], [1]));

    // Turn change cleanup
    processTurnChange(state, 2, "opponent", cardDb);

    // Wharf (Duration) stays in play, Copper goes to discard
    expect(zones.play.get("Wharf")).toBe(1);
    expect(zones.play.get("Copper") || 0).toBe(0);
  });

  it("moves remaining hand to discard on cleanup", () => {
    const state = createGameState();
    const cardDb = makeCardDb([]);

    processTurnChange(state, 1, "muddybrown", cardDb);
    processLogEntry(state, makeEntry("m", "draws", ["Copper"], [3]));

    // Turn change should discard remaining hand
    processTurnChange(state, 2, "opponent", cardDb);

    const zones = state.players.get("m")!;
    expect(zones.hand.size).toBe(0);
    expect(zones.discard.get("Copper")).toBe(3);
  });
});

describe("deriveAbbrev", () => {
  it("uses first letter for single player", () => {
    const names = new Map<string, string>();
    expect(deriveAbbrev("muddybrown", names)).toBe("m");
  });

  it("returns existing abbreviation if full name is already mapped", () => {
    const names = new Map([["m", "muddybrown"]]);
    expect(deriveAbbrev("muddybrown", names)).toBe("m");
  });

  it("uses longer prefix when first letter conflicts", () => {
    const names = new Map([["m", "muddybrown"]]);
    // "matthew" conflicts with "m" -> "muddybrown", so needs longer prefix
    const abbrev = deriveAbbrev("matthew", names);
    expect(abbrev.length).toBeGreaterThan(1);
  });
});

describe("getAllOwnedCards", () => {
  it("sums cards across all non-trash zones", () => {
    const zones = createPlayerZones();
    zones.deck.set("Copper", 3);
    zones.hand.set("Copper", 2);
    zones.discard.set("Silver", 1);
    zones.play.set("Village", 1);
    zones.trash.set("Estate", 1);

    const owned = getAllOwnedCards(zones);

    expect(owned.get("Copper")).toBe(5);
    expect(owned.get("Silver")).toBe(1);
    expect(owned.get("Village")).toBe(1);
    // Trashed cards should NOT be counted
    expect(owned.has("Estate")).toBe(false);
  });

  it("returns empty map for empty zones", () => {
    const zones = createPlayerZones();
    const owned = getAllOwnedCards(zones);
    expect(owned.size).toBe(0);
  });
});
