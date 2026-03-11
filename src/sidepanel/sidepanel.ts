// Dominion Helper — Side Panel Entry Point
//
// Renders both the kingdom analysis and deck tracker inside the Chrome
// side panel. Receives data from the service worker via chrome.runtime
// messages and updates the UI accordingly. Replaces the old in-page
// overlay panels (ui.ts, tracker-ui.ts) with a native sidebar UI.
//
// Message types handled:
// - ANALYSIS_UPDATE: AnalysisResult from the analysis engine
// - TRACKER_UPDATE: TrackerData with serialized deck stats
//
// @module sidepanel

import type {
  AnalysisResult,
  OpeningRecommendation,
  TrackerData,
} from "../types";

// ─── HTML Helpers ───────────────────────────────────────────────────

// Counter for generating unique section IDs within a single render pass.
let sectionIdCounter = 0;

// Escapes HTML special characters to prevent XSS when inserting card
// names or analysis text into innerHTML.
//
// @param str - Raw string to escape
// @returns HTML-safe string
function escapeHtml(str: string): string {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ─── Tab Switching ──────────────────────────────────────────────────

// Wires up the main tab bar (Kingdom / Tracker). Clicking a tab shows
// the corresponding content pane and hides the other.
function setupTabs(): void {
  const tabs = document.querySelectorAll<HTMLElement>(".dh-tab");
  const kingdomTab = document.getElementById("kingdom-tab");
  const trackerTab = document.getElementById("tracker-tab");
  if (!kingdomTab || !trackerTab) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Deactivate all tabs, then activate the clicked one
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.getAttribute("data-tab");
      if (target === "kingdom") {
        kingdomTab.classList.remove("dh-hidden");
        trackerTab.classList.add("dh-hidden");
      } else {
        trackerTab.classList.remove("dh-hidden");
        kingdomTab.classList.add("dh-hidden");
      }
    });
  });
}

// ─── Collapsible Sections ───────────────────────────────────────────

// Attaches click handlers to all collapsible section titles within a
// container. Toggling a title hides/shows its content and rotates the
// arrow indicator.
//
// @param container - Parent element containing collapsible sections
function attachCollapsibleHandlers(container: HTMLElement): void {
  container.querySelectorAll(".dh-collapsible").forEach((titleEl) => {
    titleEl.addEventListener("click", () => {
      const targetId = titleEl.getAttribute("data-target");
      if (!targetId) return;
      const content = document.getElementById(targetId);
      if (!content) return;
      content.classList.toggle("dh-section-collapsed");
      titleEl.classList.toggle("dh-collapsed-title");
    });
  });
}

// ─── Kingdom Analysis Rendering ─────────────────────────────────────

// Renders a collapsible section with a title and list of items. Returns
// empty string if items is empty/undefined, allowing sections to be
// omitted entirely when there's nothing to show.
//
// @param title - Section heading (e.g., "Synergies", "Key Notes")
// @param items - Array of display strings for this section
// @param className - CSS class for color-coding (e.g., "dh-synergies")
// @returns HTML string for the section, or empty string if no items
export function renderSection(
  title: string,
  items: string[] | undefined,
  className: string,
): string {
  if (!items || items.length === 0) return "";

  const sectionId = `dh-sec-${sectionIdCounter++}`;
  const itemsHtml = items
    .map((item) => `<div class="dh-item">${escapeHtml(item)}</div>`)
    .join("");

  return `
    <div class="dh-section ${className}">
      <div class="dh-section-title dh-collapsible" data-target="${sectionId}">
        <span class="dh-collapse-arrow">&#9660;</span>
        ${escapeHtml(title)}
      </div>
      <div class="dh-section-content" id="${sectionId}">
        ${itemsHtml}
      </div>
    </div>
  `;
}

// Renders the opening buys section showing recommended cards for each
// starting split. Returns empty string if there are no recommendations.
//
// @param fiveTwo - Recommendations for the 5/2 split
// @param fourThree - Recommendations for the 4/3 split
// @returns HTML string for the openings section
export function renderOpenings(
  fiveTwo: OpeningRecommendation[],
  fourThree: OpeningRecommendation[],
): string {
  if (fiveTwo.length === 0 && fourThree.length === 0) return "";

  const sectionId = `dh-sec-${sectionIdCounter++}`;
  let html = `
    <div class="dh-section dh-openings">
      <div class="dh-section-title dh-collapsible" data-target="${sectionId}">
        <span class="dh-collapse-arrow">&#9660;</span>
        Opening Buys
      </div>
      <div class="dh-section-content" id="${sectionId}">
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

  html += "</div></div>";
  return html;
}

// Renders the full kingdom analysis into the kingdom tab pane.
// Called when an ANALYSIS_UPDATE message is received.
//
// @param analysis - Complete analysis result from the engine
export function renderKingdomAnalysis(analysis: AnalysisResult): void {
  const container = document.getElementById("kingdom-tab");
  if (!container) return;

  // Reset section counter for stable IDs
  sectionIdCounter = 0;

  let html = "";

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

  // If no content was generated, show the empty state
  if (!html) {
    html = '<div class="dh-empty-state">No analysis available yet.</div>';
  }

  container.innerHTML = html;
  attachCollapsibleHandlers(container);
}

// ─── Deck Tracker Rendering ─────────────────────────────────────────

// Formats a probability as a percentage string (e.g., 0.72 -> "72%")
//
// @param prob - Probability between 0 and 1
// @returns Formatted percentage string
function formatProb(prob: number): string {
  return Math.round(prob * 100) + "%";
}

// Renders a per-card list sorted by count descending, then alphabetically.
// Each card appears on its own line as "CardName x3".
//
// @param cards - Record of card name to count
// @returns HTML string with one div per card
function renderCardList(cards: Record<string, number>): string {
  const entries = Object.entries(cards).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
  );
  return entries
    .map(
      ([name, count]) =>
        `<div class="dh-card-list-item">${escapeHtml(name)} x${count}</div>`,
    )
    .join("");
}

// Renders the deck tracker into the tracker tab pane. Called when a
// TRACKER_UPDATE message is received. Layout order (most to least important):
// 1. Player tabs, 2. Draw pile, 3. Village/terminal ratio,
// 4. Discard pile, 5. Hand/in play, 6. Draw probabilities, 7. Deck composition
//
// @param data - Serialized tracker data with stats for the selected player
export function renderTracker(data: TrackerData): void {
  const container = document.getElementById("tracker-tab");
  if (!container) return;

  // Reset section counter for stable collapsible IDs
  sectionIdCounter = 0;

  const { stats } = data;
  const p = stats.probabilities;

  let html = "";

  // Player tabs — send a message to the content script to switch players
  if (data.players.length > 1) {
    html += '<div class="dh-tracker-tabs">';
    for (const player of data.players) {
      const isLocal = player.abbrev === data.localPlayer;
      const label = isLocal ? "You" : escapeHtml(player.fullName);
      const activeClass =
        player.abbrev === data.selectedPlayer
          ? "dh-tracker-tab active"
          : "dh-tracker-tab";
      html += `<button class="${activeClass}" data-player="${escapeHtml(player.abbrev)}">${label}</button>`;
    }
    html += "</div>";
  }

  // Draw pile — collapsible, starts expanded, shows per-card counts
  const deckSectionId = `dh-sec-${sectionIdCounter++}`;
  const deckCount = p.cardsInDeck;
  const deckListHtml =
    Object.keys(data.deckCards).length > 0
      ? renderCardList(data.deckCards)
      : '<div class="dh-card-list-item dh-empty-zone">(empty)</div>';
  html += `
    <div class="dh-section dh-tracker-deck">
      <div class="dh-section-title dh-collapsible" data-target="${deckSectionId}">
        <span class="dh-collapse-arrow">&#9660;</span>
        Draw Pile (${deckCount} ${deckCount === 1 ? "card" : "cards"})
      </div>
      <div class="dh-section-content dh-card-list" id="${deckSectionId}">
        ${deckListHtml}
      </div>
    </div>
  `;

  // Village / terminal ratio
  html += `
    <div class="dh-section dh-tracker-ratio">
      <div class="dh-ratio-line">Villages: ${data.villageCount} / Terminals: ${data.terminalCount}</div>
    </div>
  `;

  // Discard pile — collapsible, starts expanded
  const discardSectionId = `dh-sec-${sectionIdCounter++}`;
  const discardCount = p.cardsInDiscard;
  const discardLabel =
    discardCount === 0
      ? "Discard Pile (empty)"
      : `Discard Pile (${discardCount} ${discardCount === 1 ? "card" : "cards"})`;
  const discardListHtml =
    Object.keys(data.discardCards).length > 0
      ? renderCardList(data.discardCards)
      : '<div class="dh-card-list-item dh-empty-zone">(empty)</div>';
  html += `
    <div class="dh-section dh-tracker-discard">
      <div class="dh-section-title dh-collapsible" data-target="${discardSectionId}">
        <span class="dh-collapse-arrow">&#9660;</span>
        ${escapeHtml(discardLabel)}
      </div>
      <div class="dh-section-content dh-card-list" id="${discardSectionId}">
        ${discardListHtml}
      </div>
    </div>
  `;

  // Hand / In play — two sub-lists with per-card counts
  const handSectionId = `dh-sec-${sectionIdCounter++}`;
  const handListHtml =
    Object.keys(data.handCards).length > 0
      ? renderCardList(data.handCards)
      : '<div class="dh-card-list-item dh-empty-zone">(empty)</div>';
  const playListHtml =
    Object.keys(data.playCards).length > 0
      ? renderCardList(data.playCards)
      : '<div class="dh-card-list-item dh-empty-zone">(empty)</div>';
  html += `
    <div class="dh-section dh-tracker-hand">
      <div class="dh-section-title dh-collapsible" data-target="${handSectionId}">
        <span class="dh-collapse-arrow">&#9660;</span>
        Hand / In Play
      </div>
      <div class="dh-section-content" id="${handSectionId}">
        <div class="dh-sub-label">Hand (${data.handCount})</div>
        <div class="dh-card-list">${handListHtml}</div>
        <div class="dh-sub-label">In Play (${data.playCount})</div>
        <div class="dh-card-list">${playListHtml}</div>
      </div>
    </div>
  `;

  // Draw probabilities
  const probsSectionId = `dh-sec-${sectionIdCounter++}`;
  let probsHtml = `
    <div class="dh-item">$5+ hand: ${formatProb(p.fivePlusCoinProb)}</div>
    <div class="dh-item">$8+ hand: ${formatProb(p.eightPlusCoinProb)}</div>
  `;
  // Per-card draw probabilities, sorted descending, top 8
  const cardProbs = Object.entries(p.cardDrawProb).sort((a, b) => b[1] - a[1]);
  const topCards = cardProbs.slice(0, 8);
  for (const [card, prob] of topCards) {
    probsHtml += `<div class="dh-item">${escapeHtml(card)}: ${formatProb(prob)}</div>`;
  }
  html += `
    <div class="dh-section dh-tracker-probs">
      <div class="dh-section-title dh-collapsible" data-target="${probsSectionId}">
        <span class="dh-collapse-arrow">&#9660;</span>
        Draw Probabilities
      </div>
      <div class="dh-section-content" id="${probsSectionId}">
        ${probsHtml}
      </div>
    </div>
  `;

  // Deck composition
  const compSectionId = `dh-sec-${sectionIdCounter++}`;
  const c = stats.composition;
  html += `
    <div class="dh-section dh-tracker-composition">
      <div class="dh-section-title dh-collapsible" data-target="${compSectionId}">
        <span class="dh-collapse-arrow">&#9660;</span>
        Deck Composition
      </div>
      <div class="dh-section-content" id="${compSectionId}">
        <div class="dh-tracker-stats-grid">
          <span class="dh-tracker-stat">Actions: ${c.actions}</span>
          <span class="dh-tracker-stat">Treasures: ${c.treasures}</span>
          <span class="dh-tracker-stat">Victories: ${c.victories}</span>
          <span class="dh-tracker-stat">Curses: ${c.curses}</span>
        </div>
        <div class="dh-tracker-total">Total: ${c.total} cards</div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Attach collapsible section handlers for draw pile, discard, etc.
  attachCollapsibleHandlers(container);

  // Attach player tab click handlers — send message to content script
  // to switch the selected player, which will trigger a new TRACKER_UPDATE
  container.querySelectorAll(".dh-tracker-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const player = tab.getAttribute("data-player");
      if (player) {
        chrome.runtime.sendMessage({
          type: "SELECT_PLAYER",
          player,
        });
      }
    });
  });
}

// ─── Message Handling ───────────────────────────────────────────────

// Listens for messages from the service worker and updates the UI.
// ANALYSIS_UPDATE replaces the kingdom tab content.
// TRACKER_UPDATE replaces the tracker tab content.
chrome.runtime.onMessage.addListener(
  (message: {
    type: string;
    analysis?: AnalysisResult;
    tracker?: TrackerData;
  }) => {
    if (message.type === "ANALYSIS_UPDATE" && message.analysis) {
      renderKingdomAnalysis(message.analysis);
    }

    if (message.type === "TRACKER_UPDATE" && message.tracker) {
      renderTracker(message.tracker);
    }
  },
);

// ─── Initialization ─────────────────────────────────────────────────

// On load, set up tab switching and request current data from the
// service worker (in case the side panel opened after analysis already ran).
function init(): void {
  setupTabs();

  // Request any existing analysis data
  chrome.runtime.sendMessage(
    { type: "GET_ANALYSIS" },
    (response: { analysis?: AnalysisResult } | undefined) => {
      if (response?.analysis) {
        renderKingdomAnalysis(response.analysis);
      }
    },
  );

  // Request any existing tracker data
  chrome.runtime.sendMessage(
    { type: "GET_TRACKER" },
    (response: { tracker?: TrackerData } | undefined) => {
      if (response?.tracker) {
        renderTracker(response.tracker);
      }
    },
  );
}

init();
