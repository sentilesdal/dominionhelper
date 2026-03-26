import { describe, it, expect } from "vitest";
import cardData from "../../src/data/cards.json";
import type { Card, CardTag } from "../../src/types";

// All valid CardTag values as defined in src/types.ts, plus
// additional descriptive tags used in the card database that are not
// part of the analysis-engine tag classification (duration, night, loot).
const VALID_TAGS: readonly string[] = [
  "village",
  "terminal-draw",
  "non-terminal-draw",
  "trasher",
  "strong-trasher",
  "gainer",
  "plus-buy",
  "curser",
  "handsize-attack",
  "junker",
  "reaction",
  "alt-vp",
  "economy",
  "sifter",
  "draw-to-x",
  "villagers",
  "trash-for-benefit",
  "throne-variant",
  "payload",
  "cost-reducer",
  "cantrip",
  // Descriptive tags present in the database but not used by analysis
  "duration",
  "night",
  "loot",
] satisfies readonly (CardTag | string)[];

// Known sets that should be present in the card database
const KNOWN_SETS = [
  "Dominion",
  "Intrigue",
  "Seaside",
  "Alchemy",
  "Prosperity",
  "Hinterlands",
  "Dark Ages",
  "Adventures",
  "Empires",
  "Nocturne",
  "Renaissance",
  "Menagerie",
  "Allies",
  "Cornucopia & Guilds",
  "Plunder",
  "Rising Sun",
  "Promo",
];

const cards = cardData as Card[];

describe("Card database integrity", () => {
  it("all cards have required fields", () => {
    for (const card of cards) {
      expect(card.name, `card missing name`).toBeDefined();
      expect(typeof card.name).toBe("string");
      expect(card.name.length).toBeGreaterThan(0);

      expect(card.set, `${card.name} missing set`).toBeDefined();
      expect(typeof card.set).toBe("string");

      expect(card.types, `${card.name} missing types`).toBeDefined();
      expect(Array.isArray(card.types), `${card.name} types is not array`).toBe(
        true,
      );

      expect(card.cost, `${card.name} missing cost`).toBeDefined();

      expect(card.tags, `${card.name} missing tags`).toBeDefined();
      expect(Array.isArray(card.tags), `${card.name} tags is not array`).toBe(
        true,
      );

      expect(typeof card.isTerminal, `${card.name} missing isTerminal`).toBe(
        "boolean",
      );
      expect(typeof card.isCantrip, `${card.name} missing isCantrip`).toBe(
        "boolean",
      );
    }
  });

  it("all card names are unique", () => {
    const names = cards.map((c) => c.name);
    const uniqueNames = new Set(names);

    const duplicates = names.filter(
      (name, index) => names.indexOf(name) !== index,
    );

    expect(
      duplicates,
      `Duplicate card names found: ${duplicates.join(", ")}`,
    ).toEqual([]);
    expect(uniqueNames.size).toBe(names.length);
  });

  it("all card costs have a coins or debt field that is a number", () => {
    for (const card of cards) {
      const hasCoins =
        card.cost.coins !== undefined && typeof card.cost.coins === "number";
      const hasDebt =
        card.cost.debt !== undefined && typeof card.cost.debt === "number";

      expect(
        hasCoins || hasDebt,
        `${card.name} cost has neither coins nor debt (got ${JSON.stringify(card.cost)})`,
      ).toBe(true);

      if (hasCoins) {
        expect(card.cost.coins, `${card.name} cost.coins is NaN`).not.toBeNaN();
      }
      if (hasDebt) {
        expect(card.cost.debt, `${card.name} cost.debt is NaN`).not.toBeNaN();
      }
    }
  });

  it("all tags are valid CardTag values", () => {
    const validTagSet = new Set<string>(VALID_TAGS);

    for (const card of cards) {
      for (const tag of card.tags) {
        expect(
          validTagSet.has(tag),
          `${card.name} has invalid tag "${tag}"`,
        ).toBe(true);
      }
    }
  });

  it("no card has both isTerminal=true and isCantrip=true", () => {
    const violations = cards.filter((c) => c.isTerminal && c.isCantrip);

    expect(
      violations.map((c) => c.name),
      `Cards with both isTerminal and isCantrip: ${violations.map((c) => c.name).join(", ")}`,
    ).toEqual([]);
  });

  it("all known sets are represented", () => {
    const setsInData = new Set(cards.map((c) => c.set));

    for (const set of KNOWN_SETS) {
      expect(
        setsInData.has(set),
        `Expected set "${set}" not found in card database`,
      ).toBe(true);
    }
  });

  it("card count is reasonable (700+ cards)", () => {
    expect(cards.length).toBeGreaterThan(700);
  });

  it("types array is non-empty for every card", () => {
    const violations = cards.filter((c) => c.types.length === 0);

    expect(
      violations.map((c) => c.name),
      `Cards with empty types: ${violations.map((c) => c.name).join(", ")}`,
    ).toEqual([]);
  });
});
