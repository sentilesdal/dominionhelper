import { describe, it, expect } from "vitest";
import { detectSynergies } from "../../src/analysis/synergies";
import { makeCard, makeTags } from "./helpers";

describe("detectSynergies", () => {
  it("detects engine core when village and draw tags are present", () => {
    const cards = [
      makeCard({ name: "Village", tags: ["village"] }),
      makeCard({ name: "Smithy", tags: ["terminal-draw"], isTerminal: true }),
    ];
    const tags = makeTags({
      villages: ["Village"],
      draw: ["Smithy"],
    });

    const result = detectSynergies(cards, tags);

    expect(result.some((s) => s.includes("Engine core"))).toBe(true);
    expect(
      result.some((s) => s.includes("Village") && s.includes("Smithy")),
    ).toBe(true);
  });

  it("detects villager engine when villagers present but no village", () => {
    const cards = [
      makeCard({
        name: "Recruiter",
        tags: ["terminal-draw", "villagers"],
        isTerminal: true,
      }),
      makeCard({ name: "Smithy", tags: ["terminal-draw"], isTerminal: true }),
    ];
    const tags = makeTags({
      villages: [],
      draw: ["Recruiter", "Smithy"],
      villagers: ["Recruiter"],
    });

    const result = detectSynergies(cards, tags);

    expect(result.some((s) => s.includes("Villager engine"))).toBe(true);
    expect(result.some((s) => s.includes("Recruiter"))).toBe(true);
  });

  it("detects curse defense when trasher and curser present", () => {
    const cards = [
      makeCard({
        name: "Chapel",
        tags: ["trasher", "strong-trasher"],
        isTerminal: true,
      }),
      makeCard({
        name: "Witch",
        tags: ["curser", "terminal-draw"],
        isTerminal: true,
      }),
    ];
    const tags = makeTags({
      trashers: ["Chapel"],
      attacks: ["Witch"],
      draw: ["Witch"],
    });

    const result = detectSynergies(cards, tags);

    expect(
      result.some((s) => s.includes("counters") && s.includes("curse")),
    ).toBe(true);
  });

  it("detects rush synergy when gainer and alt-VP present", () => {
    const cards = [
      makeCard({ name: "Workshop", tags: ["gainer"], isTerminal: true }),
      makeCard({ name: "Gardens", tags: ["alt-vp"] }),
    ];
    const tags = makeTags({
      gainers: ["Workshop"],
      altVp: ["Gardens"],
    });

    const result = detectSynergies(cards, tags);

    expect(result.some((s) => s.includes("Rush"))).toBe(true);
    expect(
      result.some((s) => s.includes("Workshop") && s.includes("Gardens")),
    ).toBe(true);
  });

  it("detects trash-for-benefit when that tag exists", () => {
    const cards = [
      makeCard({
        name: "Remodel",
        tags: ["trash-for-benefit", "trasher"],
        isTerminal: true,
      }),
    ];
    const tags = makeTags({
      trashers: ["Remodel"],
    });

    const result = detectSynergies(cards, tags);

    expect(
      result.some((s) => s.includes("Remodel") && s.includes("upgrade")),
    ).toBe(true);
  });

  it("detects draw-to-X combo with multiple terminals", () => {
    const cards = [
      makeCard({ name: "Library", tags: ["draw-to-x"], isTerminal: true }),
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
    });

    const result = detectSynergies(cards, tags);

    expect(
      result.some((s) => s.includes("Library") && s.includes("terminal")),
    ).toBe(true);
  });

  it("detects Throne Room variant + payload/curser/economy synergy", () => {
    const cards = [
      makeCard({ name: "Throne Room", tags: ["throne-variant"] }),
      makeCard({
        name: "Witch",
        tags: ["curser", "terminal-draw"],
        isTerminal: true,
      }),
    ];
    const tags = makeTags({
      attacks: ["Witch"],
      draw: ["Witch"],
    });

    const result = detectSynergies(cards, tags);

    expect(
      result.some((s) => s.includes("Throne Room") && s.includes("Witch")),
    ).toBe(true);
    expect(result.some((s) => s.includes("double the impact"))).toBe(true);
  });

  it("detects multi-buy with +Buy and multiple economy cards", () => {
    const cards = [
      makeCard({ name: "Market", tags: ["plus-buy", "economy", "cantrip"] }),
      makeCard({
        name: "Militia",
        tags: ["economy", "handsize-attack"],
        isTerminal: true,
      }),
      makeCard({
        name: "Moneylender",
        tags: ["economy", "trash-for-benefit"],
        isTerminal: true,
      }),
    ];
    const tags = makeTags({
      plusBuy: ["Market"],
      economy: ["Market", "Militia", "Moneylender"],
      attacks: ["Militia"],
    });

    const result = detectSynergies(cards, tags);

    expect(
      result.some((s) => s.includes("Market") && s.includes("multi-buy")),
    ).toBe(true);
  });

  it("detects full engine potential with village + draw + trasher", () => {
    const cards = [
      makeCard({ name: "Village", tags: ["village"] }),
      makeCard({ name: "Smithy", tags: ["terminal-draw"], isTerminal: true }),
      makeCard({
        name: "Chapel",
        tags: ["trasher", "strong-trasher"],
        isTerminal: true,
      }),
    ];
    const tags = makeTags({
      villages: ["Village"],
      draw: ["Smithy"],
      trashers: ["Chapel"],
    });

    const result = detectSynergies(cards, tags);

    expect(result.some((s) => s.includes("Full engine potential"))).toBe(true);
  });

  it("returns empty array when no synergies are present", () => {
    const cards = [
      makeCard({ name: "Cellar", tags: ["sifter"] }),
      makeCard({
        name: "Moat",
        tags: ["terminal-draw", "reaction"],
        isTerminal: true,
      }),
    ];
    const tags = makeTags({
      draw: ["Moat"],
      reactions: ["Moat"],
      sifters: ["Cellar"],
    });

    const result = detectSynergies(cards, tags);

    // No village => no engine core, no curser => no curse defense,
    // no gainer/alt-vp => no rush, no trash-for-benefit, etc.
    // Only draw is present, which alone doesn't trigger synergies
    // except draw-to-x (not present) or throne (not present)
    expect(result).toEqual([]);
  });

  it("does not detect engine core when only village is present without draw", () => {
    const cards = [
      makeCard({ name: "Village", tags: ["village"] }),
      makeCard({ name: "Cellar", tags: ["sifter"] }),
    ];
    const tags = makeTags({
      villages: ["Village"],
      sifters: ["Cellar"],
    });

    const result = detectSynergies(cards, tags);

    expect(result.some((s) => s.includes("Engine core"))).toBe(false);
  });

  it("does not detect engine core when only draw is present without village", () => {
    const cards = [
      makeCard({ name: "Smithy", tags: ["terminal-draw"], isTerminal: true }),
      makeCard({ name: "Cellar", tags: ["sifter"] }),
    ];
    const tags = makeTags({
      draw: ["Smithy"],
      sifters: ["Cellar"],
    });

    const result = detectSynergies(cards, tags);

    expect(result.some((s) => s.includes("Engine core"))).toBe(false);
  });
});
