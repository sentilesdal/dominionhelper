// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the analysis engine so renderOverlay doesn't need real card data
vi.mock("../src/analysis/engine", () => ({
  analyzeKingdom: vi.fn(() => ({
    kingdom: ["Village", "Smithy"],
    unknown: [],
    components: ["Village: Village", "Draw: Smithy"],
    synergies: ["Engine core: Village + Smithy"],
    archetypes: ["Engine"],
    openings: {
      fiveTwo: [
        {
          cardName: "Smithy",
          cost: 4,
          reasoning: "Strong draw",
          priority: 1,
        },
      ],
      fourThree: [
        {
          cardName: "Village",
          cost: 3,
          reasoning: "Village first",
          priority: 1,
        },
      ],
    },
    notes: ["No +Buy available"],
  })),
}));

import { renderOverlay, resetUIState } from "../src/content/ui";

beforeEach(() => {
  document.body.innerHTML = "";
  resetUIState();
});

describe("collapsible sections", () => {
  it("renders collapse arrows on section titles", () => {
    renderOverlay(["Village", "Smithy"]);
    const arrows = document.querySelectorAll(".dh-collapse-arrow");
    expect(arrows.length).toBeGreaterThan(0);
  });

  it("all sections start expanded", () => {
    renderOverlay(["Village", "Smithy"]);
    const contents = document.querySelectorAll(".dh-section-content");
    for (const content of contents) {
      expect(content.classList.contains("dh-section-collapsed")).toBe(false);
    }
  });

  it("clicking a section title collapses its content", () => {
    renderOverlay(["Village", "Smithy"]);
    const title = document.querySelector(".dh-collapsible") as HTMLElement;
    const targetId = title.getAttribute("data-target")!;
    const content = document.getElementById(targetId)!;

    title.click();

    expect(content.classList.contains("dh-section-collapsed")).toBe(true);
    expect(title.classList.contains("dh-collapsed-title")).toBe(true);
  });

  it("clicking a collapsed section title expands it again", () => {
    renderOverlay(["Village", "Smithy"]);
    const title = document.querySelector(".dh-collapsible") as HTMLElement;
    const targetId = title.getAttribute("data-target")!;
    const content = document.getElementById(targetId)!;

    // Collapse then expand
    title.click();
    title.click();

    expect(content.classList.contains("dh-section-collapsed")).toBe(false);
    expect(title.classList.contains("dh-collapsed-title")).toBe(false);
  });

  it("each section has a unique target ID", () => {
    renderOverlay(["Village", "Smithy"]);
    const titles = document.querySelectorAll(".dh-collapsible");
    const ids = new Set<string>();
    for (const title of titles) {
      const id = title.getAttribute("data-target")!;
      expect(ids.has(id)).toBe(false);
      ids.add(id);
    }
  });

  it("openings section is also collapsible", () => {
    renderOverlay(["Village", "Smithy"]);
    const openingsSection = document.querySelector(".dh-openings");
    expect(openingsSection).not.toBeNull();
    const title = openingsSection!.querySelector(".dh-collapsible");
    expect(title).not.toBeNull();
  });
});

describe("state persistence across re-renders", () => {
  it("preserves body collapsed state after re-render", () => {
    renderOverlay(["Village", "Smithy"]);
    const toggleBtn = document.getElementById("dh-toggle-btn")!;

    // Collapse the body
    toggleBtn.click();
    expect(
      document.getElementById("dh-body")!.classList.contains("dh-collapsed"),
    ).toBe(true);

    // Re-render (simulates game state change)
    renderOverlay(["Village", "Smithy"]);

    // Body should still be collapsed
    expect(
      document.getElementById("dh-body")!.classList.contains("dh-collapsed"),
    ).toBe(true);
  });

  it("preserves section collapsed state after re-render", () => {
    renderOverlay(["Village", "Smithy"]);
    const title = document.querySelector(".dh-collapsible") as HTMLElement;
    const targetId = title.getAttribute("data-target")!;

    // Collapse the first section
    title.click();

    // Re-render
    renderOverlay(["Village", "Smithy"]);

    // Section should still be collapsed
    const content = document.getElementById(targetId)!;
    const newTitle = document.querySelector(
      `[data-target="${targetId}"]`,
    ) as HTMLElement;
    expect(content.classList.contains("dh-section-collapsed")).toBe(true);
    expect(newTitle.classList.contains("dh-collapsed-title")).toBe(true);
  });

  it("preserves expanded state after re-render when section was toggled back open", () => {
    renderOverlay(["Village", "Smithy"]);
    const title = document.querySelector(".dh-collapsible") as HTMLElement;
    const targetId = title.getAttribute("data-target")!;

    // Collapse then expand
    title.click();
    title.click();

    // Re-render
    renderOverlay(["Village", "Smithy"]);

    // Section should still be expanded
    const content = document.getElementById(targetId)!;
    expect(content.classList.contains("dh-section-collapsed")).toBe(false);
  });

  it("preserves multiple collapsed sections independently", () => {
    renderOverlay(["Village", "Smithy"]);
    const titles = document.querySelectorAll(
      ".dh-collapsible",
    ) as NodeListOf<HTMLElement>;

    // Collapse the first and third sections (if they exist)
    titles[0].click();
    if (titles.length > 2) titles[2].click();

    // Re-render
    renderOverlay(["Village", "Smithy"]);

    // First section should be collapsed
    const firstId = titles[0].getAttribute("data-target")!;
    expect(
      document
        .getElementById(firstId)!
        .classList.contains("dh-section-collapsed"),
    ).toBe(true);

    // Second section should still be expanded
    const secondId = titles[1].getAttribute("data-target")!;
    expect(
      document
        .getElementById(secondId)!
        .classList.contains("dh-section-collapsed"),
    ).toBe(false);
  });

  it("does not leak drag listeners on re-render", () => {
    const addEventSpy = vi.spyOn(document, "addEventListener");

    renderOverlay(["Village", "Smithy"]);
    const callsAfterFirst = addEventSpy.mock.calls.filter(
      (c) => c[0] === "mousemove",
    ).length;

    renderOverlay(["Village", "Smithy"]);
    const callsAfterSecond = addEventSpy.mock.calls.filter(
      (c) => c[0] === "mousemove",
    ).length;

    // Should not have added more document-level mousemove listeners
    expect(callsAfterSecond).toBe(callsAfterFirst);

    addEventSpy.mockRestore();
  });
});

describe("draggable panel", () => {
  it("renders the header with an id for drag handling", () => {
    renderOverlay(["Village", "Smithy"]);
    const header = document.getElementById("dh-header");
    expect(header).not.toBeNull();
  });

  it("header has cursor:move style in CSS class", () => {
    renderOverlay(["Village", "Smithy"]);
    const header = document.getElementById("dh-header");
    expect(header!.classList.contains("dh-header")).toBe(true);
  });

  it("mousedown on header followed by mousemove repositions the panel", () => {
    renderOverlay(["Village", "Smithy"]);
    const panel = document.getElementById("dominion-helper-panel")!;
    const header = document.getElementById("dh-header")!;

    // Simulate the panel having a bounding rect
    panel.getBoundingClientRect = () => ({
      left: 100,
      top: 50,
      right: 380,
      bottom: 450,
      width: 280,
      height: 400,
      x: 100,
      y: 50,
      toJSON: () => {},
    });

    // Simulate mousedown on the header
    const mousedown = new MouseEvent("mousedown", {
      clientX: 150,
      clientY: 60,
      button: 0,
    });
    header.dispatchEvent(mousedown);

    // Simulate mousemove on the document
    const mousemove = new MouseEvent("mousemove", {
      clientX: 250,
      clientY: 160,
    });
    document.dispatchEvent(mousemove);

    // Panel should have been repositioned
    expect(panel.style.left).not.toBe("");
    expect(panel.style.top).not.toBe("");
    expect(panel.style.right).toBe("auto");

    // Simulate mouseup
    document.dispatchEvent(new MouseEvent("mouseup"));
  });

  it("does not drag when clicking the toggle button", () => {
    renderOverlay(["Village", "Smithy"]);
    const panel = document.getElementById("dominion-helper-panel")!;
    const toggleBtn = document.getElementById("dh-toggle-btn")!;

    panel.getBoundingClientRect = () => ({
      left: 100,
      top: 50,
      right: 380,
      bottom: 450,
      width: 280,
      height: 400,
      x: 100,
      y: 50,
      toJSON: () => {},
    });

    // Mousedown on the toggle button
    const mousedown = new MouseEvent("mousedown", {
      clientX: 150,
      clientY: 60,
      button: 0,
      bubbles: true,
    });
    toggleBtn.dispatchEvent(mousedown);

    // Mousemove should not reposition since drag was initiated on toggle
    const mousemove = new MouseEvent("mousemove", {
      clientX: 250,
      clientY: 160,
    });
    document.dispatchEvent(mousemove);

    // right should still be its default (not "auto")
    expect(panel.style.right).not.toBe("auto");
  });
});

describe("main body toggle", () => {
  it("toggle button still collapses the entire body", () => {
    renderOverlay(["Village", "Smithy"]);
    const toggleBtn = document.getElementById("dh-toggle-btn")!;
    const body = document.getElementById("dh-body")!;

    toggleBtn.click();
    expect(body.classList.contains("dh-collapsed")).toBe(true);

    toggleBtn.click();
    expect(body.classList.contains("dh-collapsed")).toBe(false);
  });
});
