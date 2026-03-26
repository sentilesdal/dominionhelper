import { describe, it, expect } from "vitest";
import type { Card } from "../../src/types";
import { createPlayerZones } from "../../src/tracker/deck-state";
import {
  calculateComposition,
  calculateProbabilities,
  calculateStats,
  hypergeometricAtLeastOne,
  simulateHandValue,
} from "../../src/tracker/stats";

// Helper to build a minimal Card for testing
function makeCard(name: string, types: string[], coins: number = 0): Card {
  return {
    name,
    set: "Base",
    types: types as Card["types"],
    cost: { coins: 0 },
    text: "",
    effects: { coins: coins || undefined },
    tags: [],
    isTerminal: false,
    isCantrip: false,
  };
}

function makeCardDb(cards: Card[]): Map<string, Card> {
  return new Map(cards.map((c) => [c.name, c]));
}

describe("hypergeometricAtLeastOne", () => {
  it("returns 0 when no copies exist", () => {
    expect(hypergeometricAtLeastOne(0, 10)).toBe(0);
  });

  it("returns 1 when copies >= deck size", () => {
    expect(hypergeometricAtLeastOne(10, 10)).toBe(1);
  });

  it("returns 1 when hand size >= deck size", () => {
    expect(hypergeometricAtLeastOne(1, 3, 5)).toBe(1);
  });

  it("returns 0 when deck is empty", () => {
    expect(hypergeometricAtLeastOne(1, 0)).toBe(0);
  });

  it("calculates correct probability for known case", () => {
    // 3 Coppers in a 10-card deck, drawing 5
    // P(at least 1) = 1 - C(7,5)/C(10,5) = 1 - 21/252 = 1 - 1/12 ≈ 0.917
    const prob = hypergeometricAtLeastOne(3, 10, 5);
    expect(prob).toBeCloseTo(0.917, 2);
  });

  it("returns higher probability with more copies", () => {
    const fewCopies = hypergeometricAtLeastOne(2, 20);
    const manyCopies = hypergeometricAtLeastOne(8, 20);
    expect(manyCopies).toBeGreaterThan(fewCopies);
  });
});

describe("simulateHandValue", () => {
  it("returns 1 for easy thresholds with all treasures", () => {
    // 10 Coppers ($1 each), drawing 5 => always $5
    const deck = Array(10).fill("Copper");
    const cardDb = makeCardDb([makeCard("Copper", ["Treasure"], 1)]);

    const prob = simulateHandValue(deck, [], 5, cardDb);
    expect(prob).toBe(1);
  });

  it("returns 0 when no treasures exist", () => {
    const deck = Array(10).fill("Village");
    const cardDb = makeCardDb([makeCard("Village", ["Action"])]);

    const prob = simulateHandValue(deck, [], 1, cardDb);
    expect(prob).toBe(0);
  });

  it("returns 0 for empty deck and discard", () => {
    const cardDb = makeCardDb([]);
    const prob = simulateHandValue([], [], 5, cardDb);
    expect(prob).toBe(0);
  });

  it("uses discard pile when deck is too small", () => {
    // 2 cards in deck, 8 in discard (all Coppers, $1 each)
    // Drawing 5 total => always $5
    const deck = ["Copper", "Copper"];
    const discard = Array(8).fill("Copper");
    const cardDb = makeCardDb([makeCard("Copper", ["Treasure"], 1)]);

    const prob = simulateHandValue(deck, discard, 5, cardDb);
    expect(prob).toBe(1);
  });

  it("returns probability between 0 and 1 for mixed decks", () => {
    // 7 Coppers ($1), 3 Estates ($0) => P($5) = P(5+ Coppers in 5 draws)
    const deck = [...Array(7).fill("Copper"), ...Array(3).fill("Estate")];
    const cardDb = makeCardDb([
      makeCard("Copper", ["Treasure"], 1),
      makeCard("Estate", ["Victory"]),
    ]);

    const prob = simulateHandValue(deck, [], 5, cardDb, 5000);
    // P(exactly 5 or more Coppers in 5 draws from 7C/3E)
    // = C(7,5)/C(10,5) + C(7,4)*C(3,1)/C(10,5) ... but Monte Carlo is approximate
    expect(prob).toBeGreaterThan(0);
    expect(prob).toBeLessThan(1);
  });
});

describe("calculateComposition", () => {
  it("counts card types correctly", () => {
    const zones = createPlayerZones();
    zones.deck.set("Copper", 5);
    zones.deck.set("Village", 2);
    zones.hand.set("Estate", 3);
    zones.discard.set("Curse", 1);

    const cardDb = makeCardDb([
      makeCard("Copper", ["Treasure"]),
      makeCard("Village", ["Action"]),
      makeCard("Estate", ["Victory"]),
      makeCard("Curse", ["Curse"]),
    ]);

    const comp = calculateComposition(zones, cardDb);

    expect(comp.treasures).toBe(5);
    expect(comp.actions).toBe(2);
    expect(comp.victories).toBe(3);
    expect(comp.curses).toBe(1);
    expect(comp.total).toBe(11);
  });

  it("excludes trashed cards", () => {
    const zones = createPlayerZones();
    zones.deck.set("Copper", 5);
    zones.trash.set("Estate", 2);

    const cardDb = makeCardDb([
      makeCard("Copper", ["Treasure"]),
      makeCard("Estate", ["Victory"]),
    ]);

    const comp = calculateComposition(zones, cardDb);
    expect(comp.total).toBe(5);
    expect(comp.victories).toBe(0);
  });

  it("returns zeros for empty zones", () => {
    const zones = createPlayerZones();
    const cardDb = makeCardDb([]);

    const comp = calculateComposition(zones, cardDb);
    expect(comp.total).toBe(0);
    expect(comp.actions).toBe(0);
    expect(comp.treasures).toBe(0);
  });
});

describe("calculateProbabilities", () => {
  it("returns per-card draw probabilities", () => {
    const zones = createPlayerZones();
    zones.deck.set("Copper", 7);
    zones.deck.set("Estate", 3);

    const cardDb = makeCardDb([
      makeCard("Copper", ["Treasure"], 1),
      makeCard("Estate", ["Victory"]),
    ]);

    const probs = calculateProbabilities(zones, cardDb);

    expect(probs.cardsInDeck).toBe(10);
    expect(probs.cardsInDiscard).toBe(0);
    expect(probs.cardDrawProb.has("Copper")).toBe(true);
    expect(probs.cardDrawProb.has("Estate")).toBe(true);
    // 7 Coppers in 10 cards, draw 5 => very high probability
    expect(probs.cardDrawProb.get("Copper")!).toBeGreaterThan(0.9);
  });

  it("combines deck and discard when deck < 5", () => {
    const zones = createPlayerZones();
    zones.deck.set("Copper", 2);
    zones.discard.set("Silver", 3);

    const cardDb = makeCardDb([
      makeCard("Copper", ["Treasure"], 1),
      makeCard("Silver", ["Treasure"], 2),
    ]);

    const probs = calculateProbabilities(zones, cardDb);

    expect(probs.cardsInDeck).toBe(2);
    expect(probs.cardsInDiscard).toBe(3);
    // Both Copper and Silver should be in the draw probability map
    expect(probs.cardDrawProb.has("Copper")).toBe(true);
    expect(probs.cardDrawProb.has("Silver")).toBe(true);
  });
});

describe("calculateStats", () => {
  it("returns complete stats object", () => {
    const zones = createPlayerZones();
    zones.deck.set("Copper", 5);
    zones.hand.set("Estate", 2);

    const cardDb = makeCardDb([
      makeCard("Copper", ["Treasure"], 1),
      makeCard("Estate", ["Victory"]),
    ]);

    const stats = calculateStats(zones, cardDb);

    expect(stats.composition.total).toBe(7);
    expect(stats.allCards.get("Copper")).toBe(5);
    expect(stats.allCards.get("Estate")).toBe(2);
    expect(stats.probabilities.cardsInDeck).toBe(5);
  });
});
