import { describe, it, expect } from "vitest";
import {
  parseLogLine,
  parseTurnMarker,
  parseCardList,
  singularize,
  isGameStart,
  stripAnnotations,
} from "../../src/tracker/log-parser";

describe("singularize", () => {
  it("removes trailing 's' from regular plurals", () => {
    expect(singularize("Coppers")).toBe("Copper");
    expect(singularize("Silvers")).toBe("Silver");
    expect(singularize("Golds")).toBe("Gold");
    expect(singularize("Villages")).toBe("Village");
  });

  it("converts 'ies' ending to 'y'", () => {
    expect(singularize("Duchies")).toBe("Duchy");
  });

  it("converts 'shes' ending correctly", () => {
    expect(singularize("Wishes")).toBe("Wish");
  });

  it("converts 'ches' ending correctly", () => {
    expect(singularize("Witches")).toBe("Witch");
  });

  it("preserves plural exception card names", () => {
    expect(singularize("Gardens")).toBe("Gardens");
    expect(singularize("Nobles")).toBe("Nobles");
  });

  it("preserves names that don't end in 's'", () => {
    expect(singularize("Copper")).toBe("Copper");
    expect(singularize("Chapel")).toBe("Chapel");
  });

  it("preserves names ending in 'ss'", () => {
    expect(singularize("Fortress")).toBe("Fortress");
  });
});

describe("parseCardList", () => {
  it("parses a single card with count", () => {
    const result = parseCardList("3 Coppers");
    expect(result.cards).toEqual(["Copper"]);
    expect(result.counts).toEqual([3]);
  });

  it("parses multiple cards with 'and'", () => {
    const result = parseCardList("7 Coppers and 3 Estates");
    expect(result.cards).toEqual(["Copper", "Estate"]);
    expect(result.counts).toEqual([7, 3]);
  });

  it("parses cards with comma and 'and'", () => {
    const result = parseCardList("3 Coppers, 2 Silvers and a Gold");
    expect(result.cards).toEqual(["Copper", "Silver", "Gold"]);
    expect(result.counts).toEqual([3, 2, 1]);
  });

  it("parses Oxford-comma lists without leaving 'and' in the card name", () => {
    const result = parseCardList("Copper, Copper, and a Border Guard");
    expect(result.cards).toEqual(["Copper", "Copper", "Border Guard"]);
    expect(result.counts).toEqual([1, 1, 1]);
  });

  it("parses counted Oxford-comma lists", () => {
    const result = parseCardList(
      "Copper, 2 Border Guards, and 3 Border Guards",
    );
    expect(result.cards).toEqual(["Copper", "Border Guard", "Border Guard"]);
    expect(result.counts).toEqual([1, 2, 3]);
  });

  it("parses 'a' article as count 1", () => {
    const result = parseCardList("a Silver");
    expect(result.cards).toEqual(["Silver"]);
    expect(result.counts).toEqual([1]);
  });

  it("parses 'an' article as count 1", () => {
    const result = parseCardList("an Estate");
    expect(result.cards).toEqual(["Estate"]);
    expect(result.counts).toEqual([1]);
  });

  it("handles bare card name with no count", () => {
    const result = parseCardList("Gold");
    expect(result.cards).toEqual(["Gold"]);
    expect(result.counts).toEqual([1]);
  });

  it("preserves plural exception names", () => {
    const result = parseCardList("2 Gardens");
    expect(result.cards).toEqual(["Gardens"]);
    expect(result.counts).toEqual([2]);
  });
});

describe("parseLogLine", () => {
  it("parses 'plays' action", () => {
    const result = parseLogLine("m plays a Silver.");
    expect(result).not.toBeNull();
    expect(result!.playerAbbrev).toBe("m");
    expect(result!.action).toBe("plays");
    expect(result!.cards).toEqual(["Silver"]);
    expect(result!.counts).toEqual([1]);
  });

  it("parses 'buys and gains' action", () => {
    const result = parseLogLine("m buys and gains a Village.");
    expect(result).not.toBeNull();
    expect(result!.action).toBe("buys");
    expect(result!.cards).toEqual(["Village"]);
    expect(result!.counts).toEqual([1]);
  });

  it("parses 'gains' action (without buy)", () => {
    const result = parseLogLine("m gains a Gold.");
    expect(result).not.toBeNull();
    expect(result!.action).toBe("gains");
    expect(result!.cards).toEqual(["Gold"]);
  });

  it("parses 'trashes' action", () => {
    const result = parseLogLine("m trashes a Copper.");
    expect(result).not.toBeNull();
    expect(result!.action).toBe("trashes");
    expect(result!.cards).toEqual(["Copper"]);
  });

  it("parses 'draws' action with multiple cards", () => {
    const result = parseLogLine("m draws 3 Coppers and 2 Estates.");
    expect(result).not.toBeNull();
    expect(result!.action).toBe("draws");
    expect(result!.cards).toEqual(["Copper", "Estate"]);
    expect(result!.counts).toEqual([3, 2]);
  });

  it("parses 'discards' action", () => {
    const result = parseLogLine("m discards a Copper.");
    expect(result).not.toBeNull();
    expect(result!.action).toBe("discards");
    expect(result!.cards).toEqual(["Copper"]);
  });

  it("parses 'shuffles' action (no cards)", () => {
    const result = parseLogLine("m shuffles their deck.");
    expect(result).not.toBeNull();
    expect(result!.action).toBe("shuffles");
    expect(result!.cards).toEqual([]);
    expect(result!.counts).toEqual([]);
  });

  it("parses 'puts on deck' as topdecks", () => {
    const result = parseLogLine("m puts a Silver on their deck.");
    expect(result).not.toBeNull();
    expect(result!.action).toBe("topdecks");
    expect(result!.cards).toEqual(["Silver"]);
  });

  it("parses 'starts with' action", () => {
    const result = parseLogLine("m starts with 7 Coppers.");
    expect(result).not.toBeNull();
    expect(result!.action).toBe("starts-with");
    expect(result!.cards).toEqual(["Copper"]);
    expect(result!.counts).toEqual([7]);
  });

  it("normalizes dotted bot abbreviations", () => {
    const result = parseLogLine("L. starts with 7 Coppers.");
    expect(result).not.toBeNull();
    expect(result!.playerAbbrev).toBe("l");
    expect(result!.action).toBe("starts-with");
  });

  it("returns null for empty string", () => {
    expect(parseLogLine("")).toBeNull();
  });

  it("returns null for unrecognized lines", () => {
    expect(parseLogLine("Game #12345, rated.")).toBeNull();
  });

  it("preserves the raw text", () => {
    const result = parseLogLine("m plays a Silver.");
    expect(result!.rawText).toBe("m plays a Silver.");
  });
});

describe("parseTurnMarker", () => {
  it("parses a turn marker line", () => {
    const result = parseTurnMarker("Turn 1 - muddybrown");
    expect(result).not.toBeNull();
    expect(result!.turn).toBe(1);
    expect(result!.fullName).toBe("muddybrown");
  });

  it("parses higher turn numbers", () => {
    const result = parseTurnMarker("Turn 15 - opponent123");
    expect(result!.turn).toBe(15);
    expect(result!.fullName).toBe("opponent123");
  });

  it("returns null for non-turn-marker lines", () => {
    expect(parseTurnMarker("m plays a Silver.")).toBeNull();
    expect(parseTurnMarker("")).toBeNull();
  });
});

describe("isGameStart", () => {
  it("returns true for 'starts with' lines", () => {
    expect(isGameStart("m starts with 7 Coppers.")).toBe(true);
  });

  it("returns true for dotted bot 'starts with' lines", () => {
    expect(isGameStart("L. starts with 7 Coppers.")).toBe(true);
  });

  it("returns false for other lines", () => {
    expect(isGameStart("m plays a Silver.")).toBe(false);
    expect(isGameStart("Turn 1 - muddybrown")).toBe(false);
    expect(isGameStart("")).toBe(false);
  });
});

describe("stripAnnotations", () => {
  it("strips coin bonus annotations", () => {
    expect(stripAnnotations("m plays Vassal. (+$2)")).toBe("m plays Vassal.");
  });

  it("strips card source annotations", () => {
    expect(stripAnnotations("m draws a Copper. (Vassal)")).toBe(
      "m draws a Copper.",
    );
  });

  it("strips multi-coin bonus annotations", () => {
    expect(stripAnnotations("m plays Copper, Copper and Silver. (+$4)")).toBe(
      "m plays Copper, Copper and Silver.",
    );
  });

  it("strips buy bonus annotations", () => {
    expect(stripAnnotations("m plays Market. (+1 Buy)")).toBe(
      "m plays Market.",
    );
  });

  it("strips card bonus annotations", () => {
    expect(stripAnnotations("m plays Laboratory. (+2 Cards)")).toBe(
      "m plays Laboratory.",
    );
  });

  it("strips multiple annotations", () => {
    expect(stripAnnotations("m plays Hireling. (+$1) (Hireling)")).toBe(
      "m plays Hireling.",
    );
  });

  it("preserves lines with no annotations", () => {
    expect(stripAnnotations("m plays a Silver.")).toBe("m plays a Silver.");
  });

  it("preserves empty strings", () => {
    expect(stripAnnotations("")).toBe("");
  });
});

describe("parseLogLine with annotations", () => {
  it("parses plays with coin bonus annotation", () => {
    const result = parseLogLine("m plays Vassal. (+$2)");
    expect(result).not.toBeNull();
    expect(result!.action).toBe("plays");
    expect(result!.cards).toEqual(["Vassal"]);
  });

  it("parses draws with card source annotation", () => {
    const result = parseLogLine("m draws a Copper. (Vassal)");
    expect(result).not.toBeNull();
    expect(result!.action).toBe("draws");
    expect(result!.cards).toEqual(["Copper"]);
  });

  it("parses multi-card plays with coin annotation", () => {
    const result = parseLogLine("m plays Copper, Copper and Silver. (+$4)");
    expect(result).not.toBeNull();
    expect(result!.action).toBe("plays");
    expect(result!.cards).toEqual(["Copper", "Copper", "Silver"]);
    expect(result!.counts).toEqual([1, 1, 1]);
  });
});
