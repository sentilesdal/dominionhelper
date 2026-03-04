/**
 * Dominion Helper — DOM Observer
 *
 * Watches the dominion.games page for kingdom cards to appear and extracts
 * their names. Uses two strategies in order of reliability:
 *
 * 1. KINGDOM-VIEWER element — contains only kingdom/landscape/shelter cards,
 *    no hand or basic supply cards. Most reliable.
 * 2. `.card-stacks` fallback — all cards including hand/basic supply,
 *    filtered by vertical position (supply is in the top half of the screen).
 *
 * The observer uses MutationObserver with a 500ms debounce to avoid
 * re-analyzing during rapid DOM updates (e.g., card animations).
 *
 * @module observer
 */

/** Cards always present in the supply — never part of the kingdom selection. */
const BASIC_SUPPLY = new Set([
  "Copper",
  "Silver",
  "Gold",
  "Platinum",
  "Potion",
  "Estate",
  "Duchy",
  "Province",
  "Colony",
  "Curse",
]);

/** Shelter cards replace Estates in starting hands — not kingdom cards. */
const SHELTERS = new Set(["Hovel", "Necropolis", "Overgrown Estate"]);

/**
 * Extracts kingdom card names from the dominion.games DOM.
 *
 * Tries the KINGDOM-VIEWER element first (only contains kingdom cards,
 * landscapes, and shelters). Falls back to `.card-stacks` with position-based
 * filtering if KINGDOM-VIEWER yields fewer than 10 cards.
 *
 * Filters out basic supply cards (Copper, Silver, Gold, etc.) and shelter
 * cards (Hovel, Necropolis, Overgrown Estate) since these are not part of
 * the kingdom selection.
 *
 * @param root - DOM element to search within (typically `document.body`)
 * @returns Array of unique card name strings found in the kingdom
 */
export function extractCardNames(root: Document | Element): string[] {
  const found = new Set<string>();

  // Strategy 1: KINGDOM-VIEWER element (most reliable)
  // The .kingdom-viewer contains child divs grouped by type. Visible (non
  // .ng-hide) groups hold kingdom cards, landscapes, and shelters.
  const kingdomViewer = root.querySelector("KINGDOM-VIEWER .kingdom-viewer");
  if (kingdomViewer) {
    const groups = Array.from(kingdomViewer.children).filter(
      (div) => !div.classList.contains("ng-hide"),
    );

    for (const group of groups) {
      const nameEls = group.querySelectorAll(".name-layer .text-fitter-node");
      for (const el of nameEls) {
        const text = el.textContent?.trim();
        if (text && !BASIC_SUPPLY.has(text) && !SHELTERS.has(text)) {
          found.add(text);
        }
      }
    }
  }

  // 10 cards = complete kingdom — no need for fallback
  if (found.size >= 10) return [...found];

  // Strategy 2: Scan .card-stacks supply area (fallback)
  // This container includes ALL cards on the page (hand, basic supply, kingdom).
  // Filter by vertical position: supply cards render in the top half of the viewport.
  const cardStacks = root.querySelector(".card-stacks");
  if (cardStacks) {
    const stacks = Array.from(cardStacks.children);
    for (const stack of stacks) {
      const nameEl = stack.querySelector(".name-layer .text-fitter-node");
      if (!nameEl) continue;
      const text = nameEl.textContent?.trim();
      if (!text || BASIC_SUPPLY.has(text) || SHELTERS.has(text)) continue;
      const rect = (stack as HTMLElement).getBoundingClientRect();
      // Supply cards are rendered in the top half; hand cards are in the bottom
      if (rect.y < window.innerHeight * 0.5) {
        found.add(text);
      }
    }
  }

  return [...found];
}

/**
 * Starts observing the DOM for kingdom card changes and invokes the callback
 * when a complete kingdom (10+ cards) is detected.
 *
 * Uses MutationObserver on `document.body` with a 500ms debounce to batch
 * rapid DOM changes (e.g., card deal animations). Also checks immediately
 * on call in case the kingdom is already rendered.
 *
 * @param callback - Function called with an array of card names when a kingdom is detected
 */
export function observeKingdom(callback: (cards: string[]) => void): void {
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  const observer = new MutationObserver(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
    // 500ms debounce prevents re-analysis during card animations
    debounceTimer = setTimeout(() => {
      const cards = extractCardNames(document.body);
      if (cards.length >= 10) {
        callback(cards);
      }
    }, 500);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Check immediately in case the page is already loaded with a kingdom
  const cards = extractCardNames(document.body);
  if (cards.length >= 10) {
    callback(cards);
  }
}
