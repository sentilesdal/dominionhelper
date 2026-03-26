import { describe, it, expect } from "vitest";
import { analyzeOpenings } from "../../src/analysis/openings";
import type { Card } from "../../src/types";

// Helper to create a minimal Card object for testing.
// Only the fields used by analyzeOpenings need real values;
// the rest get sensible defaults.
function makeCard(overrides: Partial<Card> & { name: string }): Card {
  return {
    name: overrides.name,
    set: overrides.set ?? "Test",
    types: overrides.types ?? ["Action"],
    cost: overrides.cost ?? { coins: 3 },
    text: overrides.text ?? "",
    effects: overrides.effects ?? {},
    tags: overrides.tags ?? [],
    isTerminal: overrides.isTerminal ?? false,
    isCantrip: overrides.isCantrip ?? false,
  };
}

describe("analyzeOpenings", () => {
  it("recommends Chapel as a top opening when present at $2", () => {
    const cards = [
      makeCard({
        name: "Chapel",
        cost: { coins: 2 },
        tags: ["trasher", "strong-trasher"],
        isTerminal: true,
      }),
      makeCard({
        name: "Cellar",
        cost: { coins: 2 },
        tags: ["sifter"],
      }),
      makeCard({
        name: "Village",
        cost: { coins: 3 },
        tags: ["village"],
      }),
      makeCard({
        name: "Smithy",
        cost: { coins: 4 },
        tags: ["terminal-draw"],
        isTerminal: true,
      }),
      makeCard({
        name: "Laboratory",
        cost: { coins: 5 },
        tags: ["non-terminal-draw"],
      }),
    ];

    const result = analyzeOpenings(cards);

    // Chapel should be in the 5/2 split recommendations (it's a $2 card)
    const chapelRec = result.fiveTwo.find((r) => r.cardName === "Chapel");
    expect(chapelRec).toBeDefined();
    expect(chapelRec!.cost).toBe(2);

    // Chapel should also be in the 4/3 split is NOT expected since
    // $2 cards are not part of the 4/3 split — but it IS in 5/2
    // Chapel should rank above Cellar in the $2 recommendations
    const twoRecs = result.fiveTwo.filter((r) => r.cost === 2);
    expect(twoRecs.length).toBeGreaterThanOrEqual(1);
    expect(twoRecs[0].cardName).toBe("Chapel");
  });

  it("recommends a $5 card like Laboratory in the 5/2 split", () => {
    const cards = [
      makeCard({
        name: "Laboratory",
        cost: { coins: 5 },
        tags: ["non-terminal-draw"],
      }),
      makeCard({
        name: "Market",
        cost: { coins: 5 },
        tags: ["cantrip", "economy", "plus-buy"],
      }),
      makeCard({
        name: "Chapel",
        cost: { coins: 2 },
        tags: ["trasher", "strong-trasher"],
        isTerminal: true,
      }),
    ];

    const result = analyzeOpenings(cards);

    // Laboratory should be recommended in the 5/2 split
    const labRec = result.fiveTwo.find((r) => r.cardName === "Laboratory");
    expect(labRec).toBeDefined();
    expect(labRec!.cost).toBe(5);

    // Laboratory should not appear in the 4/3 split ($5 is not available)
    const labIn43 = result.fourThree.find((r) => r.cardName === "Laboratory");
    expect(labIn43).toBeUndefined();
  });

  it("recommends $4 and $3 cards in the 4/3 split", () => {
    const cards = [
      makeCard({
        name: "Village",
        cost: { coins: 3 },
        tags: ["village"],
      }),
      makeCard({
        name: "Smithy",
        cost: { coins: 4 },
        tags: ["terminal-draw"],
        isTerminal: true,
      }),
      makeCard({
        name: "Merchant",
        cost: { coins: 3 },
        tags: ["cantrip", "economy"],
      }),
      makeCard({
        name: "Remodel",
        cost: { coins: 4 },
        tags: ["trasher", "trash-for-benefit"],
        isTerminal: true,
      }),
    ];

    const result = analyzeOpenings(cards);

    // Should have recommendations at both $4 and $3
    const at4 = result.fourThree.filter((r) => r.cost === 4);
    const at3 = result.fourThree.filter((r) => r.cost === 3);
    expect(at4.length).toBeGreaterThan(0);
    expect(at3.length).toBeGreaterThan(0);

    // Remodel (trasher) should rank above Smithy (terminal draw) at $4
    expect(at4[0].cardName).toBe("Remodel");
  });

  it("prioritizes trashers over other cards at the same cost", () => {
    const cards = [
      makeCard({
        name: "Moneylender",
        cost: { coins: 4 },
        tags: ["trasher", "economy"],
        isTerminal: true,
      }),
      makeCard({
        name: "Smithy",
        cost: { coins: 4 },
        tags: ["terminal-draw"],
        isTerminal: true,
      }),
      makeCard({
        name: "Militia",
        cost: { coins: 4 },
        tags: ["handsize-attack", "economy"],
        isTerminal: true,
      }),
      makeCard({
        name: "Bureaucrat",
        cost: { coins: 4 },
        tags: ["economy"],
        isTerminal: true,
      }),
    ];

    const result = analyzeOpenings(cards);
    const at4 = result.fourThree.filter((r) => r.cost === 4);

    // Moneylender (trasher + economy) should be ranked first
    expect(at4[0].cardName).toBe("Moneylender");
  });

  it("warns about terminal collision when multiple terminals are recommended", () => {
    // This test verifies that terminal draw cards get appropriate reasoning
    // mentioning collision risk
    const cards = [
      makeCard({
        name: "Smithy",
        cost: { coins: 4 },
        tags: ["terminal-draw"],
        isTerminal: true,
      }),
      makeCard({
        name: "Moat",
        cost: { coins: 2 },
        tags: ["terminal-draw", "reaction"],
        isTerminal: true,
      }),
    ];

    const result = analyzeOpenings(cards);

    // Smithy should mention collision risk in its reasoning
    const smithyRec = result.fourThree.find((r) => r.cardName === "Smithy");
    expect(smithyRec).toBeDefined();
    expect(smithyRec!.reasoning).toContain("collision");

    // Moat should also mention collision risk
    const moatRec = result.fiveTwo.find((r) => r.cardName === "Moat");
    expect(moatRec).toBeDefined();
    expect(moatRec!.reasoning).toContain("collision");
  });

  it("returns empty recommendations when no cards exist at target costs", () => {
    // Kingdom with only $6+ cards — no valid opening buys
    const cards = [
      makeCard({
        name: "Gold",
        cost: { coins: 6 },
        types: ["Treasure"],
        tags: ["economy"],
      }),
    ];

    const result = analyzeOpenings(cards);

    expect(result.fiveTwo).toEqual([]);
    expect(result.fourThree).toEqual([]);
  });

  it("returns empty recommendations for an empty kingdom", () => {
    const result = analyzeOpenings([]);

    expect(result.fiveTwo).toEqual([]);
    expect(result.fourThree).toEqual([]);
  });

  it("excludes pure Victory cards from recommendations", () => {
    const cards = [
      makeCard({
        name: "Gardens",
        cost: { coins: 4 },
        types: ["Victory"],
        tags: ["alt-vp"],
      }),
      makeCard({
        name: "Smithy",
        cost: { coins: 4 },
        tags: ["terminal-draw"],
        isTerminal: true,
      }),
    ];

    const result = analyzeOpenings(cards);
    const at4 = result.fourThree.filter((r) => r.cost === 4);

    // Gardens (pure Victory) should be excluded
    expect(at4.find((r) => r.cardName === "Gardens")).toBeUndefined();
    // Smithy should be present
    expect(at4.find((r) => r.cardName === "Smithy")).toBeDefined();
  });

  it("excludes cards requiring potions from recommendations", () => {
    const cards = [
      makeCard({
        name: "Familiar",
        cost: { coins: 3, potions: 1 },
        tags: ["curser", "non-terminal-draw"],
      }),
      makeCard({
        name: "Village",
        cost: { coins: 3 },
        tags: ["village"],
      }),
    ];

    const result = analyzeOpenings(cards);
    const at3 = result.fourThree.filter((r) => r.cost === 3);

    // Familiar (requires potion) should be excluded
    expect(at3.find((r) => r.cardName === "Familiar")).toBeUndefined();
    // Village should be present
    expect(at3.find((r) => r.cardName === "Village")).toBeDefined();
  });

  it("limits recommendations to 3 per cost point", () => {
    // Create 5 cards all at $4
    const cards = [
      makeCard({ name: "Card1", cost: { coins: 4 }, tags: ["trasher"] }),
      makeCard({ name: "Card2", cost: { coins: 4 }, tags: ["economy"] }),
      makeCard({ name: "Card3", cost: { coins: 4 }, tags: ["village"] }),
      makeCard({
        name: "Card4",
        cost: { coins: 4 },
        tags: ["terminal-draw"],
      }),
      makeCard({ name: "Card5", cost: { coins: 4 }, tags: ["gainer"] }),
    ];

    const result = analyzeOpenings(cards);
    const at4 = result.fourThree.filter((r) => r.cost === 4);

    expect(at4.length).toBeLessThanOrEqual(3);
  });

  it("includes reasoning for recommended cards", () => {
    const cards = [
      makeCard({
        name: "Chapel",
        cost: { coins: 2 },
        tags: ["trasher", "strong-trasher"],
        isTerminal: true,
      }),
    ];

    const result = analyzeOpenings(cards);
    const chapelRec = result.fiveTwo.find((r) => r.cardName === "Chapel");

    expect(chapelRec).toBeDefined();
    expect(chapelRec!.reasoning.length).toBeGreaterThan(0);
    expect(chapelRec!.reasoning).toContain("trasher");
  });

  it("includes Night cards as valid opening buys", () => {
    const cards = [
      makeCard({
        name: "Monastery",
        cost: { coins: 2 },
        types: ["Night"],
        tags: ["trasher"],
      }),
    ];

    const result = analyzeOpenings(cards);
    const monasteryRec = result.fiveTwo.find((r) => r.cardName === "Monastery");

    expect(monasteryRec).toBeDefined();
  });
});
