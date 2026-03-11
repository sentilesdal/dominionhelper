import { describe, it, expect } from "vitest";
import { serializeTrackerStats } from "../src/content/serialize";
import type { TrackerStats } from "../src/types";

function makeTrackerStats(): TrackerStats {
  return {
    composition: {
      actions: 2,
      treasures: 7,
      victories: 3,
      curses: 0,
      total: 12,
    },
    probabilities: {
      fivePlusCoinProb: 0.35,
      eightPlusCoinProb: 0.05,
      cardDrawProb: new Map([
        ["Copper", 0.97],
        ["Estate", 0.83],
        ["Village", 0.45],
      ]),
      cardsInDeck: 7,
      cardsInDiscard: 0,
    },
    allCards: new Map([
      ["Copper", 7],
      ["Estate", 3],
      ["Village", 2],
    ]),
  };
}

describe("serializeTrackerStats", () => {
  it("converts Maps to plain objects", () => {
    const stats = makeTrackerStats();
    const serialized = serializeTrackerStats(stats);

    // cardDrawProb should be a plain object
    expect(serialized.probabilities.cardDrawProb).toEqual({
      Copper: 0.97,
      Estate: 0.83,
      Village: 0.45,
    });

    // allCards should be a plain object
    expect(serialized.allCards).toEqual({
      Copper: 7,
      Estate: 3,
      Village: 2,
    });
  });

  it("preserves composition values", () => {
    const stats = makeTrackerStats();
    const serialized = serializeTrackerStats(stats);

    expect(serialized.composition).toEqual({
      actions: 2,
      treasures: 7,
      victories: 3,
      curses: 0,
      total: 12,
    });
  });

  it("preserves probability scalar values", () => {
    const stats = makeTrackerStats();
    const serialized = serializeTrackerStats(stats);

    expect(serialized.probabilities.fivePlusCoinProb).toBe(0.35);
    expect(serialized.probabilities.eightPlusCoinProb).toBe(0.05);
    expect(serialized.probabilities.cardsInDeck).toBe(7);
    expect(serialized.probabilities.cardsInDiscard).toBe(0);
  });

  it("produces JSON-serializable output", () => {
    const stats = makeTrackerStats();
    const serialized = serializeTrackerStats(stats);

    // This should not throw — all Maps have been converted to plain objects
    const json = JSON.stringify(serialized);
    const parsed = JSON.parse(json);

    expect(parsed.allCards.Copper).toBe(7);
    expect(parsed.probabilities.cardDrawProb.Copper).toBe(0.97);
  });

  it("handles empty Maps", () => {
    const stats: TrackerStats = {
      composition: {
        actions: 0,
        treasures: 0,
        victories: 0,
        curses: 0,
        total: 0,
      },
      probabilities: {
        fivePlusCoinProb: 0,
        eightPlusCoinProb: 0,
        cardDrawProb: new Map(),
        cardsInDeck: 0,
        cardsInDiscard: 0,
      },
      allCards: new Map(),
    };

    const serialized = serializeTrackerStats(stats);

    expect(serialized.allCards).toEqual({});
    expect(serialized.probabilities.cardDrawProb).toEqual({});
  });
});
