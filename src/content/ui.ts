// Dominion Helper — Overlay UI
//
// Renders the analysis results as a floating overlay panel on the
// dominion.games page. The panel shows detected kingdom cards, unknown
// cards, component classifications, synergies, viable strategies, and
// strategic warnings. Includes a collapse/expand toggle.
//
// Styled by `overlay.css` which is injected as a content script stylesheet.
//
// @module ui

import type { OpeningRecommendation } from "../types";
import { analyzeKingdom } from "../analysis/engine";

// DOM id for the overlay panel — used to find or create the element.
const PANEL_ID = "dominion-helper-panel";

// Gets or creates the overlay panel element. The panel is appended to
// `document.body` and persists across re-renders (innerHTML is replaced,
// but the container element is reused).
//
// @returns The panel HTMLElement
function createPanel(): HTMLElement {
  let panel = document.getElementById(PANEL_ID);
  if (panel) return panel;

  panel = document.createElement("div");
  panel.id = PANEL_ID;
  document.body.appendChild(panel);
  return panel;
}

// Escapes HTML special characters to prevent XSS when inserting card names
// or analysis text into innerHTML. Uses the browser's built-in text encoding
// by setting textContent and reading innerHTML.
//
// @param str - Raw string to escape
// @returns HTML-safe string
function escapeHtml(str: string): string {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Renders a collapsible section of the overlay panel with a title and
// list of items. Returns empty string if items is empty/undefined,
// allowing sections to be omitted entirely when there's nothing to show.
//
// @param title - Section heading (e.g., "Synergies", "Key Notes")
// @param items - Array of display strings for this section
// @param className - CSS class for color-coding (e.g., "dh-synergies", "dh-notes")
// @returns HTML string for the section, or empty string if no items
function renderSection(
  title: string,
  items: string[] | undefined,
  className: string,
): string {
  if (!items || items.length === 0) return "";

  const itemsHtml = items
    .map((item) => `<div class="dh-item">${escapeHtml(item)}</div>`)
    .join("");

  return `
    <div class="dh-section ${className}">
      <div class="dh-section-title">${escapeHtml(title)}</div>
      ${itemsHtml}
    </div>
  `;
}

// Renders the opening buys section showing recommended cards for each
// starting split. Each split is shown as a subsection with the split name
// (e.g., "5/2 Split") and a list of recommended cards with reasoning.
// Returns empty string if there are no recommendations for either split.
//
// @param fiveTwo - Recommendations for the 5/2 split
// @param fourThree - Recommendations for the 4/3 split
// @returns HTML string for the openings section, or empty string if no recommendations
function renderOpenings(
  fiveTwo: OpeningRecommendation[],
  fourThree: OpeningRecommendation[],
): string {
  if (fiveTwo.length === 0 && fourThree.length === 0) return "";

  let html = `
    <div class="dh-section dh-openings">
      <div class="dh-section-title">Opening Buys</div>
  `;

  if (fourThree.length > 0) {
    html += `<div class="dh-opening-split">4/3 Split (83%)</div>`;
    for (const rec of fourThree) {
      html += `<div class="dh-item"><strong>${escapeHtml(rec.cardName)}</strong> ($${rec.cost}) — ${escapeHtml(rec.reasoning)}</div>`;
    }
  }

  if (fiveTwo.length > 0) {
    html += `<div class="dh-opening-split">5/2 Split (17%)</div>`;
    for (const rec of fiveTwo) {
      html += `<div class="dh-item"><strong>${escapeHtml(rec.cardName)}</strong> ($${rec.cost}) — ${escapeHtml(rec.reasoning)}</div>`;
    }
  }

  html += "</div>";
  return html;
}

// Runs the analysis engine on the detected card names and renders the
// results into the overlay panel. Replaces the panel's innerHTML entirely
// on each call (triggered when a new kingdom is detected).
//
// The panel contains these sections (each omitted if empty):
// - Detected Kingdom: list of card names found
// - Not In Database: cards not in our card database
// - Kingdom Components: functional role classifications
// - Synergies: detected card synergies
// - Viable Strategies: macro-strategy archetypes
// - Opening Buys: recommended opening purchases for each split
// - Key Notes: strategic warnings
//
// @param cardNames - Array of card name strings detected from the game UI
export function renderOverlay(cardNames: string[]): void {
  const analysis = analyzeKingdom(cardNames);
  const panel = createPanel();

  let html = `
    <div class="dh-header">
      <span class="dh-title">Dominion Helper</span>
      <button class="dh-toggle" id="dh-toggle-btn">_</button>
    </div>
    <div class="dh-body" id="dh-body">
  `;

  if (analysis.kingdom && analysis.kingdom.length > 0) {
    html += renderSection(
      "Detected Kingdom (" + analysis.kingdom.length + " cards)",
      [analysis.kingdom.join(", ")],
      "dh-kingdom",
    );
  }

  if (analysis.unknown && analysis.unknown.length > 0) {
    html += renderSection(
      "Not In Database (" + analysis.unknown.length + ")",
      [analysis.unknown.join(", ")],
      "dh-unknown",
    );
  }

  html += renderSection(
    "Kingdom Components",
    analysis.components,
    "dh-components",
  );
  html += renderSection("Synergies", analysis.synergies, "dh-synergies");
  html += renderSection(
    "Viable Strategies",
    analysis.archetypes,
    "dh-archetypes",
  );
  html += renderOpenings(
    analysis.openings.fiveTwo,
    analysis.openings.fourThree,
  );
  html += renderSection("Key Notes", analysis.notes, "dh-notes");

  html += "</div>";

  panel.innerHTML = html;

  // Attach toggle handler — must re-attach after innerHTML replacement
  document.getElementById("dh-toggle-btn")!.addEventListener("click", () => {
    const body = document.getElementById("dh-body");
    body?.classList.toggle("dh-collapsed");
  });
}
