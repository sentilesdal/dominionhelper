// @vitest-environment jsdom

import { describe, it, expect } from "vitest";
import { extractCardNames } from "../../src/content/observer";

// Builds a KINGDOM-VIEWER DOM structure with the given card names.
// Groups are arrays of card name arrays -- each group becomes a visible
// child div inside .kingdom-viewer, with .name-layer > .text-fitter-node
// elements for each card name.
function buildKingdomViewer(
  groups: string[][],
  hiddenGroups: string[][] = [],
): Document {
  const doc = new DOMParser().parseFromString(
    "<html><body></body></html>",
    "text/html",
  );

  const kingdomViewerTag = doc.createElement("KINGDOM-VIEWER");
  const kingdomViewerDiv = doc.createElement("div");
  kingdomViewerDiv.classList.add("kingdom-viewer");

  for (const group of groups) {
    const groupDiv = doc.createElement("div");
    for (const cardName of group) {
      const nameLayer = doc.createElement("div");
      nameLayer.classList.add("name-layer");
      const textFitter = doc.createElement("span");
      textFitter.classList.add("text-fitter-node");
      textFitter.textContent = cardName;
      nameLayer.appendChild(textFitter);
      groupDiv.appendChild(nameLayer);
    }
    kingdomViewerDiv.appendChild(groupDiv);
  }

  for (const group of hiddenGroups) {
    const groupDiv = doc.createElement("div");
    groupDiv.classList.add("ng-hide");
    for (const cardName of group) {
      const nameLayer = doc.createElement("div");
      nameLayer.classList.add("name-layer");
      const textFitter = doc.createElement("span");
      textFitter.classList.add("text-fitter-node");
      textFitter.textContent = cardName;
      nameLayer.appendChild(textFitter);
      groupDiv.appendChild(nameLayer);
    }
    kingdomViewerDiv.appendChild(groupDiv);
  }

  kingdomViewerTag.appendChild(kingdomViewerDiv);
  doc.body.appendChild(kingdomViewerTag);

  return doc;
}

describe("extractCardNames", () => {
  it("extracts card names from KINGDOM-VIEWER structure", () => {
    const kingdomCards = [
      "Village",
      "Smithy",
      "Chapel",
      "Market",
      "Festival",
      "Witch",
      "Moat",
      "Remodel",
      "Laboratory",
      "Gardens",
    ];
    const doc = buildKingdomViewer([kingdomCards]);

    const result = extractCardNames(doc);

    expect(result).toHaveLength(10);
    for (const card of kingdomCards) {
      expect(result).toContain(card);
    }
  });

  it("filters out basic supply cards", () => {
    const kingdomCards = [
      "Village",
      "Smithy",
      "Chapel",
      "Market",
      "Festival",
      "Witch",
      "Moat",
      "Remodel",
      "Laboratory",
      "Gardens",
    ];
    const basicSupply = [
      "Copper",
      "Silver",
      "Gold",
      "Estate",
      "Duchy",
      "Province",
      "Curse",
    ];
    const doc = buildKingdomViewer([[...kingdomCards, ...basicSupply]]);

    const result = extractCardNames(doc);

    expect(result).toHaveLength(10);
    expect(result).not.toContain("Copper");
    expect(result).not.toContain("Silver");
    expect(result).not.toContain("Gold");
    expect(result).not.toContain("Estate");
    expect(result).not.toContain("Duchy");
    expect(result).not.toContain("Province");
    expect(result).not.toContain("Curse");
  });

  it("filters out shelter cards", () => {
    const kingdomCards = [
      "Village",
      "Smithy",
      "Chapel",
      "Market",
      "Festival",
      "Witch",
      "Moat",
      "Remodel",
      "Laboratory",
      "Gardens",
    ];
    const shelters = ["Hovel", "Necropolis", "Overgrown Estate"];
    const doc = buildKingdomViewer([kingdomCards, shelters]);

    const result = extractCardNames(doc);

    expect(result).toHaveLength(10);
    expect(result).not.toContain("Hovel");
    expect(result).not.toContain("Necropolis");
    expect(result).not.toContain("Overgrown Estate");
  });

  it("returns empty array when no kingdom viewer is present", () => {
    const doc = new DOMParser().parseFromString(
      "<html><body><div>No cards here</div></body></html>",
      "text/html",
    );

    const result = extractCardNames(doc);

    expect(result).toEqual([]);
  });

  it("falls back to .card-stacks when KINGDOM-VIEWER has fewer than 10 cards", () => {
    // Create a document with a KINGDOM-VIEWER that has only 3 cards
    // and a .card-stacks with additional cards
    const doc = new DOMParser().parseFromString(
      "<html><body></body></html>",
      "text/html",
    );

    // Add a KINGDOM-VIEWER with fewer than 10 cards
    const kingdomViewerTag = doc.createElement("KINGDOM-VIEWER");
    const kingdomViewerDiv = doc.createElement("div");
    kingdomViewerDiv.classList.add("kingdom-viewer");
    const group = doc.createElement("div");
    for (const name of ["Village", "Smithy", "Chapel"]) {
      const nameLayer = doc.createElement("div");
      nameLayer.classList.add("name-layer");
      const textFitter = doc.createElement("span");
      textFitter.classList.add("text-fitter-node");
      textFitter.textContent = name;
      nameLayer.appendChild(textFitter);
      group.appendChild(nameLayer);
    }
    kingdomViewerDiv.appendChild(group);
    kingdomViewerTag.appendChild(kingdomViewerDiv);
    doc.body.appendChild(kingdomViewerTag);

    // Add .card-stacks with additional cards (using position-based filtering)
    // Note: In JSDOM, getBoundingClientRect returns all zeros, so rect.y < window.innerHeight * 0.5
    // evaluates to 0 < 0 which is false. We verify the fallback path is attempted.
    const cardStacks = doc.createElement("div");
    cardStacks.classList.add("card-stacks");
    for (const name of ["Market", "Festival", "Witch"]) {
      const stack = doc.createElement("div");
      const nameLayer = doc.createElement("div");
      nameLayer.classList.add("name-layer");
      const textFitter = doc.createElement("span");
      textFitter.classList.add("text-fitter-node");
      textFitter.textContent = name;
      nameLayer.appendChild(textFitter);
      stack.appendChild(nameLayer);
      cardStacks.appendChild(stack);
    }
    doc.body.appendChild(cardStacks);

    const result = extractCardNames(doc);

    // KINGDOM-VIEWER found 3 cards (< 10), so fallback runs.
    // In jsdom, getBoundingClientRect returns {x:0,y:0,...} and
    // window.innerHeight defaults to 768, so 0 < 384 is true.
    // The fallback should add the card-stacks cards.
    expect(result).toContain("Village");
    expect(result).toContain("Smithy");
    expect(result).toContain("Chapel");
    expect(result).toContain("Market");
    expect(result).toContain("Festival");
    expect(result).toContain("Witch");
  });

  it("handles missing .text-fitter-node gracefully", () => {
    const doc = new DOMParser().parseFromString(
      "<html><body></body></html>",
      "text/html",
    );

    const kingdomViewerTag = doc.createElement("KINGDOM-VIEWER");
    const kingdomViewerDiv = doc.createElement("div");
    kingdomViewerDiv.classList.add("kingdom-viewer");
    const group = doc.createElement("div");

    // Add name-layers but WITHOUT .text-fitter-node children
    for (let i = 0; i < 5; i++) {
      const nameLayer = doc.createElement("div");
      nameLayer.classList.add("name-layer");
      // No .text-fitter-node added
      group.appendChild(nameLayer);
    }

    kingdomViewerDiv.appendChild(group);
    kingdomViewerTag.appendChild(kingdomViewerDiv);
    doc.body.appendChild(kingdomViewerTag);

    const result = extractCardNames(doc);

    // Should not crash, returns empty since no text-fitter-nodes found
    expect(result).toEqual([]);
  });

  it("handles empty text content gracefully", () => {
    const doc = new DOMParser().parseFromString(
      "<html><body></body></html>",
      "text/html",
    );

    const kingdomViewerTag = doc.createElement("KINGDOM-VIEWER");
    const kingdomViewerDiv = doc.createElement("div");
    kingdomViewerDiv.classList.add("kingdom-viewer");
    const group = doc.createElement("div");

    // Add elements with empty text
    for (let i = 0; i < 3; i++) {
      const nameLayer = doc.createElement("div");
      nameLayer.classList.add("name-layer");
      const textFitter = doc.createElement("span");
      textFitter.classList.add("text-fitter-node");
      textFitter.textContent = ""; // empty text
      nameLayer.appendChild(textFitter);
      group.appendChild(nameLayer);
    }

    // Also add one with only whitespace
    const nameLayer = doc.createElement("div");
    nameLayer.classList.add("name-layer");
    const textFitter = doc.createElement("span");
    textFitter.classList.add("text-fitter-node");
    textFitter.textContent = "   ";
    nameLayer.appendChild(textFitter);
    group.appendChild(nameLayer);

    kingdomViewerDiv.appendChild(group);
    kingdomViewerTag.appendChild(kingdomViewerDiv);
    doc.body.appendChild(kingdomViewerTag);

    const result = extractCardNames(doc);

    // Empty and whitespace-only text content should be skipped
    expect(result).toEqual([]);
  });

  it("skips hidden (.ng-hide) groups", () => {
    const visibleCards = [
      "Village",
      "Smithy",
      "Chapel",
      "Market",
      "Festival",
      "Witch",
      "Moat",
      "Remodel",
      "Laboratory",
      "Gardens",
    ];
    const hiddenCards = ["HiddenCard1", "HiddenCard2"];

    const doc = buildKingdomViewer([visibleCards], [hiddenCards]);

    const result = extractCardNames(doc);

    expect(result).toHaveLength(10);
    expect(result).not.toContain("HiddenCard1");
    expect(result).not.toContain("HiddenCard2");
  });
});
