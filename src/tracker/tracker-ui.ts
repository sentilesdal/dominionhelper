// Dominion Helper — Tracker UI
//
// Renders the deck tracker panel as a floating overlay on the left side
// of the dominion.games page. Displays deck composition, card zones,
// draw probabilities, and owned cards for the selected player.
//
// The panel is independent from the analysis overlay (which sits on the
// right) and follows the same patterns: collapsible sections, draggable
// header, and dark translucent theme.
//
// Key exports: renderTrackerPanel, removeTrackerPanel
//
// @module tracker-ui

import type { Card, GameState, TrackerStats } from "../types";
import { calculateStats } from "./stats";

// DOM id for the tracker panel — must not conflict with the analysis panel
const TRACKER_PANEL_ID = "dominion-helper-tracker";

// Escapes HTML special characters to prevent XSS when inserting text
// into innerHTML. Reuses the same technique as the analysis overlay.
//
// @param str - Raw string to escape
// @returns HTML-safe string
function escapeHtml(str: string): string {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Finds the local player's abbreviation by checking PLAYER-INFO-NAME
// elements on the page. The local player's name element is positioned
// at the bottom of the viewport (y > 50% screen height).
//
// @param state - Current game state with player name mappings
// @returns Abbreviation of the local player, or empty string if not found
function detectLocalPlayer(state: GameState): string {
  const nameEls = document.querySelectorAll("PLAYER-INFO-NAME");
  for (const el of nameEls) {
    const rect = el.getBoundingClientRect();
    // Local player's info bar is at the bottom of the screen
    if (rect.y > window.innerHeight * 0.5) {
      const name = el.textContent?.trim() || "";
      // Find matching abbreviation from the state's player names
      for (const [abbrev, fullName] of state.playerNames) {
        if (fullName === name) return abbrev;
      }
    }
  }
  return "";
}

// Gets or creates the tracker panel element. Appended to document.body
// and persists across re-renders (innerHTML is replaced but the element
// is reused).
//
// @returns The tracker panel HTMLElement
function createTrackerPanel(): HTMLElement {
  let panel = document.getElementById(TRACKER_PANEL_ID);
  if (panel) return panel;

  panel = document.createElement("div");
  panel.id = TRACKER_PANEL_ID;
  document.body.appendChild(panel);
  return panel;
}

// Formats a probability as a percentage string (e.g., 0.72 -> "72%")
//
// @param prob - Probability between 0 and 1
// @returns Formatted percentage string
function formatProb(prob: number): string {
  return Math.round(prob * 100) + "%";
}

// Renders the player tab bar for switching between players.
//
// @param state - Current game state
// @param selectedPlayer - Currently selected player abbreviation
// @returns HTML string for the tab bar
function renderPlayerTabs(state: GameState, selectedPlayer: string): string {
  const tabs: string[] = [];
  for (const [abbrev] of state.players) {
    const fullName = state.playerNames.get(abbrev) || abbrev;
    const isLocal = abbrev === state.localPlayer;
    const label = isLocal ? "You" : escapeHtml(fullName);
    const activeClass =
      abbrev === selectedPlayer ? "dh-tracker-tab active" : "dh-tracker-tab";
    tabs.push(
      `<button class="${activeClass}" data-player="${escapeHtml(abbrev)}">${label}</button>`,
    );
  }
  return `<div class="dh-tracker-tabs">${tabs.join("")}</div>`;
}

// Renders the deck composition section showing card type breakdown.
//
// @param stats - Calculated tracker stats
// @returns HTML string for the composition section
function renderComposition(stats: TrackerStats): string {
  const c = stats.composition;
  return `
    <div class="dh-section dh-tracker-composition">
      <div class="dh-section-title">Deck Composition</div>
      <div class="dh-tracker-stats-grid">
        <span class="dh-tracker-stat">Actions: ${c.actions}</span>
        <span class="dh-tracker-stat">Treasures: ${c.treasures}</span>
        <span class="dh-tracker-stat">Victories: ${c.victories}</span>
        <span class="dh-tracker-stat">Curses: ${c.curses}</span>
      </div>
      <div class="dh-tracker-total">Total: ${c.total} cards</div>
    </div>
  `;
}

// Renders the card zones section showing how many cards are in each zone.
//
// @param stats - Calculated tracker stats
// @param zones - The player's zone state (for hand/play counts)
// @returns HTML string for the zones section
function renderZones(
  stats: TrackerStats,
  handCount: number,
  playCount: number,
): string {
  const p = stats.probabilities;
  return `
    <div class="dh-section dh-tracker-zones">
      <div class="dh-section-title">Card Zones</div>
      <div class="dh-item">Draw pile: ${p.cardsInDeck} cards</div>
      <div class="dh-item">Discard: ${p.cardsInDiscard} cards</div>
      <div class="dh-item">Hand: ${handCount} / In play: ${playCount}</div>
    </div>
  `;
}

// Renders the draw probabilities section showing chances of hitting
// coin thresholds and drawing specific cards.
//
// @param stats - Calculated tracker stats
// @returns HTML string for the probabilities section
function renderProbabilities(stats: TrackerStats): string {
  const p = stats.probabilities;
  let html = `
    <div class="dh-section dh-tracker-probs">
      <div class="dh-section-title">Draw Probabilities</div>
      <div class="dh-item">$5+ hand: ${formatProb(p.fivePlusCoinProb)}</div>
      <div class="dh-item">$8+ hand: ${formatProb(p.eightPlusCoinProb)}</div>
  `;

  // Show per-card draw probabilities, sorted by probability descending
  const sortedCards = [...p.cardDrawProb.entries()].sort((a, b) => b[1] - a[1]);
  // Only show top 8 cards to avoid clutter
  const topCards = sortedCards.slice(0, 8);
  for (const [card, prob] of topCards) {
    // Show how many copies are in the deck for context
    const inDeck = stats.probabilities.cardsInDeck;
    html += `<div class="dh-item">${escapeHtml(card)}: ${formatProb(prob)}</div>`;
    void inDeck; // counts shown via the draw pile stat above
  }

  html += "</div>";
  return html;
}

// Renders the "All Cards" section listing every card the player owns.
//
// @param stats - Calculated tracker stats
// @returns HTML string for the all cards section
function renderAllCards(stats: TrackerStats): string {
  if (stats.allCards.size === 0) return "";

  // Sort alphabetically by card name
  const sorted = [...stats.allCards.entries()].sort((a, b) =>
    a[0].localeCompare(b[0]),
  );
  const cardList = sorted
    .map(([name, count]) => `${escapeHtml(name)} x${count}`)
    .join(", ");

  return `
    <div class="dh-section dh-tracker-allcards">
      <div class="dh-section-title">All Cards</div>
      <div class="dh-item">${cardList}</div>
    </div>
  `;
}

// Counts total cards in a zone map.
//
// @param zone - Map of card name to count
// @returns Total number of cards
function zoneTotal(zone: Map<string, number>): number {
  let total = 0;
  for (const count of zone.values()) {
    total += count;
  }
  return total;
}

// Currently selected player tab (persists across re-renders)
let selectedPlayer = "";

// Renders the deck tracker panel with stats for the selected player.
// Called on every game state change. Replaces the panel's innerHTML
// and re-attaches event listeners.
//
// @param state - Current game state
// @param cardDb - Card database lookup map
export function renderTrackerPanel(
  state: GameState,
  cardDb: Map<string, Card>,
): void {
  // Detect local player if not yet set
  if (!state.localPlayer) {
    state.localPlayer = detectLocalPlayer(state);
  }

  // Auto-select the local player, or fall back to first player
  if (!selectedPlayer || !state.players.has(selectedPlayer)) {
    selectedPlayer =
      state.localPlayer || (state.players.keys().next().value ?? "");
  }

  const panel = createTrackerPanel();
  const zones = state.players.get(selectedPlayer);

  // Don't render if we have no data yet
  if (!zones) {
    panel.innerHTML = `
      <div class="dh-header dh-tracker-header" id="dh-tracker-header">
        <span class="dh-title">Deck Tracker</span>
        <button class="dh-toggle" id="dh-tracker-toggle">_</button>
      </div>
      <div class="dh-body" id="dh-tracker-body">
        <div class="dh-item">Waiting for game to start...</div>
      </div>
    `;
    setupTrackerDrag(panel);
    setupTrackerToggle();
    return;
  }

  const stats = calculateStats(zones, cardDb);
  const handCount = zoneTotal(zones.hand);
  const playCount = zoneTotal(zones.play);

  let html = `
    <div class="dh-header dh-tracker-header" id="dh-tracker-header">
      <span class="dh-title">Deck Tracker</span>
      <button class="dh-toggle" id="dh-tracker-toggle">_</button>
    </div>
    <div class="dh-body" id="dh-tracker-body">
  `;

  html += renderPlayerTabs(state, selectedPlayer);
  html += renderComposition(stats);
  html += renderZones(stats, handCount, playCount);
  html += renderProbabilities(stats);
  html += renderAllCards(stats);

  html += "</div>";

  panel.innerHTML = html;

  // Attach tab click handlers
  panel.querySelectorAll(".dh-tracker-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const player = tab.getAttribute("data-player");
      if (player) {
        selectedPlayer = player;
        renderTrackerPanel(state, cardDb);
      }
    });
  });

  setupTrackerDrag(panel);
  setupTrackerToggle();
}

// Attaches the collapse/expand toggle to the tracker panel.
function setupTrackerToggle(): void {
  const btn = document.getElementById("dh-tracker-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const body = document.getElementById("dh-tracker-body");
    body?.classList.toggle("dh-collapsed");
  });
}

// Attaches drag-to-move behavior to the tracker panel via its header.
// Same pattern as the analysis overlay drag handler.
//
// @param panel - The tracker panel element
function setupTrackerDrag(panel: HTMLElement): void {
  const header = document.getElementById("dh-tracker-header");
  if (!header) return;

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener("mousedown", (e: MouseEvent) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest(".dh-toggle")) return;

    isDragging = true;
    const rect = panel.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Switch to explicit left positioning on first drag
    panel.style.right = "auto";
    panel.style.left = rect.left + "px";
    panel.style.top = rect.top + "px";

    e.preventDefault();
  });

  document.addEventListener("mousemove", (e: MouseEvent) => {
    if (!isDragging) return;

    const x = Math.max(
      0,
      Math.min(e.clientX - offsetX, window.innerWidth - panel.offsetWidth),
    );
    const y = Math.max(
      0,
      Math.min(e.clientY - offsetY, window.innerHeight - panel.offsetHeight),
    );

    panel.style.left = x + "px";
    panel.style.top = y + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

// Removes the tracker panel from the DOM. Called when navigating away
// from a game or resetting the extension state.
export function removeTrackerPanel(): void {
  const panel = document.getElementById(TRACKER_PANEL_ID);
  if (panel) {
    panel.remove();
  }
}
