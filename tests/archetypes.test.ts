import { describe, it, expect } from "vitest";
import { detectArchetypes } from "../src/analysis/archetypes";
import { makeCard, makeTags } from "./helpers";

describe("detectArchetypes", () => {
  it("detects Engine with village + draw + payload", () => {
    const cards = [
      makeCard({ name: "Village", tags: ["village"] }),
      makeCard({ name: "Smithy", tags: ["terminal-draw"], isTerminal: true }),
      makeCard({
        name: "Militia",
        tags: ["economy", "handsize-attack"],
        isTerminal: true,
      }),
    ];
    const tags = makeTags({
      villages: ["Village"],
      draw: ["Smithy"],
      economy: ["Militia"],
      attacks: ["Militia"],
    });

    const result = detectArchetypes(cards, tags);

    expect(result.some((a) => a.startsWith("Engine"))).toBe(true);
  });

  it("includes trashing note when trasher is available for engine", () => {
    const cards = [
      makeCard({ name: "Village", tags: ["village"] }),
      makeCard({ name: "Smithy", tags: ["terminal-draw"], isTerminal: true }),
      makeCard({
        name: "Chapel",
        tags: ["trasher", "strong-trasher"],
        isTerminal: true,
      }),
      makeCard({
        name: "Militia",
        tags: ["economy", "handsize-attack"],
        isTerminal: true,
      }),
    ];
    const tags = makeTags({
      villages: ["Village"],
      draw: ["Smithy"],
      trashers: ["Chapel"],
      economy: ["Militia"],
      attacks: ["Militia"],
    });

    const result = detectArchetypes(cards, tags);

    expect(
      result.some((a) => a.includes("Engine") && a.includes("trashing")),
    ).toBe(true);
  });

  it("includes double-Province note when +Buy is available for engine", () => {
    const cards = [
      makeCard({ name: "Village", tags: ["village"] }),
      makeCard({ name: "Smithy", tags: ["terminal-draw"], isTerminal: true }),
      makeCard({ name: "Market", tags: ["plus-buy", "economy", "cantrip"] }),
    ];
    const tags = makeTags({
      villages: ["Village"],
      draw: ["Smithy"],
      plusBuy: ["Market"],
      economy: ["Market"],
    });

    const result = detectArchetypes(cards, tags);

    expect(
      result.some((a) => a.includes("Engine") && a.includes("double-Province")),
    ).toBe(true);
  });

  it("detects Big Money + X with a strong terminal", () => {
    const cards = [
      makeCard({ name: "Smithy", tags: ["terminal-draw"], isTerminal: true }),
      makeCard({ name: "Cellar", tags: ["sifter"] }),
    ];
    const tags = makeTags({
      draw: ["Smithy"],
      sifters: ["Cellar"],
    });

    const result = detectArchetypes(cards, tags);

    expect(result.some((a) => a.includes("Big Money + Smithy"))).toBe(true);
  });

  it("detects Rush with gainer + alt-VP", () => {
    const cards = [
      makeCard({ name: "Workshop", tags: ["gainer"], isTerminal: true }),
      makeCard({ name: "Gardens", tags: ["alt-vp"] }),
    ];
    const tags = makeTags({
      gainers: ["Workshop"],
      altVp: ["Gardens"],
    });

    const result = detectArchetypes(cards, tags);

    expect(result.some((a) => a.includes("Rush"))).toBe(true);
    expect(
      result.some((a) => a.includes("Workshop") && a.includes("Gardens")),
    ).toBe(true);
  });

  it("detects Slog when attacks present and no trashers", () => {
    const cards = [
      makeCard({
        name: "Militia",
        tags: ["handsize-attack", "economy"],
        isTerminal: true,
      }),
      makeCard({
        name: "Witch",
        tags: ["curser", "terminal-draw"],
        isTerminal: true,
      }),
    ];
    const tags = makeTags({
      attacks: ["Militia", "Witch"],
      draw: ["Witch"],
      economy: ["Militia"],
      trashers: [],
    });

    const result = detectArchetypes(cards, tags);

    expect(result.some((a) => a.includes("Slog"))).toBe(true);
    expect(result.some((a) => a.includes("war of attrition"))).toBe(true);
  });

  it("detects Combo with throne-variant + cost-reducer", () => {
    const cards = [
      makeCard({ name: "Throne Room", tags: ["throne-variant"] }),
      makeCard({
        name: "Bridge",
        tags: ["cost-reducer", "economy", "plus-buy"],
      }),
    ];
    const tags = makeTags({
      plusBuy: ["Bridge"],
      economy: ["Bridge"],
    });

    const result = detectArchetypes(cards, tags);

    expect(result.some((a) => a.includes("Combo"))).toBe(true);
    expect(
      result.some((a) => a.includes("Throne Room") && a.includes("Bridge")),
    ).toBe(true);
  });

  it("falls back to Big Money likely when no patterns match", () => {
    const cards = [
      makeCard({ name: "Cellar", tags: ["sifter"] }),
      makeCard({ name: "Harbinger", tags: ["cantrip", "sifter"] }),
    ];
    const tags = makeTags({
      sifters: ["Cellar", "Harbinger"],
    });

    const result = detectArchetypes(cards, tags);

    expect(result).toEqual(["Big Money likely — limited engine components"]);
  });

  it("detects multiple archetypes that coexist", () => {
    // Kingdom with both engine components AND a strong Big Money terminal
    const cards = [
      makeCard({ name: "Village", tags: ["village"] }),
      makeCard({ name: "Smithy", tags: ["terminal-draw"], isTerminal: true }),
      makeCard({
        name: "Militia",
        tags: ["economy", "handsize-attack"],
        isTerminal: true,
      }),
      makeCard({ name: "Workshop", tags: ["gainer"], isTerminal: true }),
      makeCard({ name: "Gardens", tags: ["alt-vp"] }),
    ];
    const tags = makeTags({
      villages: ["Village"],
      draw: ["Smithy"],
      economy: ["Militia"],
      attacks: ["Militia"],
      gainers: ["Workshop"],
      altVp: ["Gardens"],
    });

    const result = detectArchetypes(cards, tags);

    // Should detect both Engine and Rush at minimum
    expect(result.some((a) => a.startsWith("Engine"))).toBe(true);
    expect(result.some((a) => a.includes("Rush"))).toBe(true);
    // Also Big Money + X since Smithy is a strong terminal
    expect(result.some((a) => a.includes("Big Money +"))).toBe(true);
  });
});
