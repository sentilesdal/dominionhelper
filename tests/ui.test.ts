// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from "vitest";

// Must be hoisted before module imports so chrome is defined when
// sidepanel.ts top-level code (onMessage.addListener, init) runs.
const { mockSendMessage } = vi.hoisted(() => {
  const mockAddListener = vi.fn();
  const mockSendMessage = vi.fn(
    (_msg: unknown, callback?: (response: unknown) => void) => {
      if (callback) callback(undefined);
    },
  );

  // Set chrome global before any module code runs
  globalThis.chrome = {
    runtime: {
      onMessage: { addListener: mockAddListener },
      sendMessage: mockSendMessage,
    },
  } as unknown as typeof chrome;

  return { mockAddListener, mockSendMessage };
});

import {
  renderKingdomAnalysis,
  renderSection,
  renderOpenings,
  renderTracker,
} from "../src/sidepanel/sidepanel";
import type { AnalysisResult, TrackerData } from "../src/types";

beforeEach(() => {
  // Set up the DOM structure expected by the side panel
  document.body.innerHTML = `
    <div id="kingdom-tab"></div>
    <div id="tracker-tab"></div>
  `;
});

function makeAnalysis(overrides?: Partial<AnalysisResult>): AnalysisResult {
  return {
    kingdom: ["Village", "Smithy"],
    unknown: [],
    components: ["Villages: Village", "Draw: Smithy"],
    synergies: ["Engine core: Village + Smithy"],
    archetypes: ["Engine"],
    openings: {
      fiveTwo: [{ cardName: "Smithy", cost: 4, reasoning: "Strong draw" }],
      fourThree: [{ cardName: "Village", cost: 3, reasoning: "Village first" }],
    },
    notes: ["No +Buy available"],
    ...overrides,
  };
}

describe("renderKingdomAnalysis", () => {
  it("renders all sections into the kingdom tab", () => {
    renderKingdomAnalysis(makeAnalysis());

    const container = document.getElementById("kingdom-tab")!;
    const text = container.textContent!;
    expect(text).toContain("Village");
    expect(text).toContain("Smithy");
    expect(text).toContain("Engine core");
    expect(text).toContain("No +Buy available");
  });

  it("renders collapsible sections with arrows", () => {
    renderKingdomAnalysis(makeAnalysis());

    const container = document.getElementById("kingdom-tab")!;
    const arrows = container.querySelectorAll(".dh-collapse-arrow");
    expect(arrows.length).toBeGreaterThan(0);
  });

  it("all sections start expanded", () => {
    renderKingdomAnalysis(makeAnalysis());

    const container = document.getElementById("kingdom-tab")!;
    const contents = container.querySelectorAll(".dh-section-content");
    for (const content of contents) {
      expect(content.classList.contains("dh-section-collapsed")).toBe(false);
    }
  });

  it("clicking a section title collapses its content", () => {
    renderKingdomAnalysis(makeAnalysis());

    const container = document.getElementById("kingdom-tab")!;
    const title = container.querySelector(".dh-collapsible") as HTMLElement;
    const targetId = title.getAttribute("data-target")!;
    const content = document.getElementById(targetId)!;

    title.click();

    expect(content.classList.contains("dh-section-collapsed")).toBe(true);
    expect(title.classList.contains("dh-collapsed-title")).toBe(true);
  });

  it("clicking a collapsed section title expands it again", () => {
    renderKingdomAnalysis(makeAnalysis());

    const container = document.getElementById("kingdom-tab")!;
    const title = container.querySelector(".dh-collapsible") as HTMLElement;
    const targetId = title.getAttribute("data-target")!;
    const content = document.getElementById(targetId)!;

    title.click();
    title.click();

    expect(content.classList.contains("dh-section-collapsed")).toBe(false);
    expect(title.classList.contains("dh-collapsed-title")).toBe(false);
  });

  it("each section has a unique target ID", () => {
    renderKingdomAnalysis(makeAnalysis());

    const container = document.getElementById("kingdom-tab")!;
    const titles = container.querySelectorAll(".dh-collapsible");
    const ids = new Set<string>();
    for (const title of titles) {
      const id = title.getAttribute("data-target")!;
      expect(ids.has(id)).toBe(false);
      ids.add(id);
    }
  });

  it("renders openings section with both splits", () => {
    renderKingdomAnalysis(makeAnalysis());

    const container = document.getElementById("kingdom-tab")!;
    const text = container.textContent!;
    expect(text).toContain("4/3 Split");
    expect(text).toContain("5/2 Split");
    expect(text).toContain("Village");
    expect(text).toContain("Smithy");
  });

  it("shows unknown cards section when present", () => {
    renderKingdomAnalysis(makeAnalysis({ unknown: ["FakeCard"] }));

    const container = document.getElementById("kingdom-tab")!;
    const text = container.textContent!;
    expect(text).toContain("Not In Database");
    expect(text).toContain("FakeCard");
  });

  it("omits unknown section when empty", () => {
    renderKingdomAnalysis(makeAnalysis({ unknown: [] }));

    const container = document.getElementById("kingdom-tab")!;
    expect(container.textContent!).not.toContain("Not In Database");
  });

  it("shows empty state when analysis has no data", () => {
    renderKingdomAnalysis(
      makeAnalysis({
        kingdom: [],
        components: [],
        synergies: [],
        archetypes: [],
        notes: [],
        openings: { fiveTwo: [], fourThree: [] },
      }),
    );

    const container = document.getElementById("kingdom-tab")!;
    expect(container.textContent!).toContain("No analysis available");
  });
});

describe("renderSection", () => {
  it("returns empty string for empty items", () => {
    expect(renderSection("Title", [], "dh-test")).toBe("");
  });

  it("returns empty string for undefined items", () => {
    expect(renderSection("Title", undefined, "dh-test")).toBe("");
  });

  it("renders items with the given CSS class", () => {
    const html = renderSection("Test Title", ["item1"], "dh-synergies");
    expect(html).toContain("dh-synergies");
    expect(html).toContain("Test Title");
    expect(html).toContain("item1");
  });
});

describe("renderOpenings", () => {
  it("returns empty string when both splits are empty", () => {
    expect(renderOpenings([], [])).toBe("");
  });

  it("renders only 4/3 split when 5/2 is empty", () => {
    const html = renderOpenings(
      [],
      [{ cardName: "Silver", cost: 3, reasoning: "Money" }],
    );
    expect(html).toContain("4/3 Split");
    expect(html).not.toContain("5/2 Split");
  });

  it("renders both splits", () => {
    const html = renderOpenings(
      [{ cardName: "Chapel", cost: 2, reasoning: "Trash" }],
      [{ cardName: "Silver", cost: 3, reasoning: "Money" }],
    );
    expect(html).toContain("4/3 Split");
    expect(html).toContain("5/2 Split");
    expect(html).toContain("Chapel");
    expect(html).toContain("Silver");
  });
});

describe("renderTracker", () => {
  function makeTrackerData(overrides?: Partial<TrackerData>): TrackerData {
    return {
      players: [
        { abbrev: "m", fullName: "muddybrown" },
        { abbrev: "o", fullName: "opponent" },
      ],
      localPlayer: "m",
      selectedPlayer: "m",
      stats: {
        composition: {
          actions: 0,
          treasures: 7,
          victories: 3,
          curses: 0,
          total: 10,
        },
        probabilities: {
          fivePlusCoinProb: 0.15,
          eightPlusCoinProb: 0,
          cardDrawProb: { Copper: 0.97, Estate: 0.83 },
          cardsInDeck: 10,
          cardsInDiscard: 0,
        },
        allCards: { Copper: 7, Estate: 3 },
      },
      handCount: 0,
      playCount: 0,
      deckCards: { Copper: 7, Estate: 3 },
      discardCards: {},
      handCards: {},
      playCards: {},
      villageCount: 0,
      terminalCount: 0,
      ...overrides,
    };
  }

  it("renders deck composition", () => {
    renderTracker(makeTrackerData());

    const container = document.getElementById("tracker-tab")!;
    const text = container.textContent!;
    expect(text).toContain("Treasures: 7");
    expect(text).toContain("Victories: 3");
    expect(text).toContain("Total: 10 cards");
  });

  it("renders draw pile with per-card counts", () => {
    renderTracker(makeTrackerData());

    const container = document.getElementById("tracker-tab")!;
    const text = container.textContent!;
    expect(text).toContain("Draw Pile (10 cards)");
    expect(text).toContain("Copper x7");
    expect(text).toContain("Estate x3");
  });

  it("renders draw pile cards sorted by count descending", () => {
    renderTracker(
      makeTrackerData({
        deckCards: { Silver: 1, Copper: 4, Estate: 2 },
      }),
    );

    const container = document.getElementById("tracker-tab")!;
    const deckSection = container.querySelector(".dh-tracker-deck")!;
    const items = deckSection.querySelectorAll(".dh-card-list-item");
    expect(items[0].textContent).toBe("Copper x4");
    expect(items[1].textContent).toBe("Estate x2");
    expect(items[2].textContent).toBe("Silver x1");
  });

  it("renders discard pile with per-card counts", () => {
    renderTracker(
      makeTrackerData({
        discardCards: { Copper: 3, Estate: 1 },
        stats: {
          composition: {
            actions: 0,
            treasures: 7,
            victories: 3,
            curses: 0,
            total: 10,
          },
          probabilities: {
            fivePlusCoinProb: 0.15,
            eightPlusCoinProb: 0,
            cardDrawProb: { Copper: 0.97, Estate: 0.83 },
            cardsInDeck: 6,
            cardsInDiscard: 4,
          },
          allCards: { Copper: 7, Estate: 3 },
        },
      }),
    );

    const container = document.getElementById("tracker-tab")!;
    const text = container.textContent!;
    expect(text).toContain("Discard Pile (4 cards)");
    expect(text).toContain("Copper x3");
  });

  it("shows empty label when discard pile is empty", () => {
    renderTracker(makeTrackerData({ discardCards: {} }));

    const container = document.getElementById("tracker-tab")!;
    const text = container.textContent!;
    expect(text).toContain("Discard Pile (empty)");
  });

  it("renders village and terminal ratio", () => {
    renderTracker(makeTrackerData({ villageCount: 2, terminalCount: 3 }));

    const container = document.getElementById("tracker-tab")!;
    const text = container.textContent!;
    expect(text).toContain("Villages: 2");
    expect(text).toContain("Terminals: 3");
  });

  it("renders hand cards", () => {
    renderTracker(
      makeTrackerData({
        handCards: { Copper: 3, Estate: 2 },
        handCount: 5,
      }),
    );

    const container = document.getElementById("tracker-tab")!;
    const text = container.textContent!;
    expect(text).toContain("Hand (5)");
    expect(text).toContain("Copper x3");
    expect(text).toContain("Estate x2");
  });

  it("renders play area cards", () => {
    renderTracker(
      makeTrackerData({
        playCards: { Village: 1, Smithy: 1 },
        playCount: 2,
      }),
    );

    const container = document.getElementById("tracker-tab")!;
    const text = container.textContent!;
    expect(text).toContain("In Play (2)");
    expect(text).toContain("Village x1");
    expect(text).toContain("Smithy x1");
  });

  it("renders player tabs for multiple players", () => {
    renderTracker(makeTrackerData());

    const container = document.getElementById("tracker-tab")!;
    const tabs = container.querySelectorAll(".dh-tracker-tab");
    expect(tabs.length).toBe(2);
    expect(tabs[0].textContent).toBe("You");
    expect(tabs[1].textContent).toBe("opponent");
  });

  it("does not render player tabs for single player", () => {
    renderTracker(
      makeTrackerData({
        players: [{ abbrev: "m", fullName: "muddybrown" }],
      }),
    );

    const container = document.getElementById("tracker-tab")!;
    const tabs = container.querySelectorAll(".dh-tracker-tab");
    expect(tabs.length).toBe(0);
  });

  it("renders draw probabilities", () => {
    renderTracker(makeTrackerData());

    const container = document.getElementById("tracker-tab")!;
    const text = container.textContent!;
    expect(text).toContain("$5+ hand: 15%");
    expect(text).toContain("$8+ hand: 0%");
    expect(text).toContain("Copper: 97%");
    expect(text).toContain("Estate: 83%");
  });

  it("draw pile and discard pile sections are collapsible", () => {
    renderTracker(makeTrackerData());

    const container = document.getElementById("tracker-tab")!;
    const deckTitle = container.querySelector(
      ".dh-tracker-deck .dh-collapsible",
    ) as HTMLElement;
    const targetId = deckTitle.getAttribute("data-target")!;
    const content = document.getElementById(targetId)!;

    // Starts expanded
    expect(content.classList.contains("dh-section-collapsed")).toBe(false);

    // Click to collapse
    deckTitle.click();
    expect(content.classList.contains("dh-section-collapsed")).toBe(true);

    // Click to expand again
    deckTitle.click();
    expect(content.classList.contains("dh-section-collapsed")).toBe(false);
  });

  it("sends SELECT_PLAYER message when clicking a player tab", () => {
    mockSendMessage.mockClear();
    renderTracker(makeTrackerData());

    const container = document.getElementById("tracker-tab")!;
    const tabs = container.querySelectorAll(".dh-tracker-tab");
    // Click the opponent tab
    (tabs[1] as HTMLElement).click();

    expect(mockSendMessage).toHaveBeenCalledWith({
      type: "SELECT_PLAYER",
      player: "o",
    });
  });
});
