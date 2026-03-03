// Dominion Helper - DOM Observer
// Watches for kingdom cards to appear on the dominion.games page
//
// Confirmed DOM structure (validated against live dominion.games 2025):
// - KINGDOM-VIEWER > .kingdom-viewer contains grouped child divs:
//   - First visible div: 10 kingdom supply cards
//   - Second visible div: landscapes (Events, Projects, Ways, Landmarks, Traits, etc.)
//   - Third visible div: shelters or other special starting cards
// - Card names: .name-layer > .text-fitter-node (text content = card name)
// - All supply cards also in .card-stacks but mixed with hand/basic supply

(function () {
  'use strict';

  const DH = window.DominionHelper;

  // Basic supply cards that are always present and not part of the kingdom
  const BASIC_SUPPLY = new Set([
    'Copper', 'Silver', 'Gold', 'Platinum', 'Potion',
    'Estate', 'Duchy', 'Province', 'Colony', 'Curse',
  ]);

  // Shelter cards (starting hand variants, not kingdom cards)
  const SHELTERS = new Set(['Hovel', 'Necropolis', 'Overgrown Estate']);

  /**
   * Extract kingdom card names from the supply/kingdom viewer area.
   * Uses multiple strategies in order of reliability.
   */
  function extractCardNames(root) {
    const found = new Set();

    // Strategy 1: KINGDOM-VIEWER element (most reliable)
    // Contains only kingdom cards, landscapes, and shelters — no hand/basic supply
    const kingdomViewer = root.querySelector('KINGDOM-VIEWER .kingdom-viewer');
    if (kingdomViewer) {
      // Get visible (non-hidden) groups
      const groups = Array.from(kingdomViewer.children).filter(
        (div) => !div.classList.contains('ng-hide')
      );

      for (const group of groups) {
        const nameEls = group.querySelectorAll('.name-layer .text-fitter-node');
        for (const el of nameEls) {
          const text = el.textContent.trim();
          if (text && !BASIC_SUPPLY.has(text) && !SHELTERS.has(text)) {
            found.add(text);
          }
        }
      }
    }

    if (found.size >= 10) return [...found];

    // Strategy 2: Scan .card-stacks supply area (fallback)
    // All cards are in .card-stacks; filter by position to get supply only
    const cardStacks = root.querySelector('.card-stacks');
    if (cardStacks) {
      const stacks = Array.from(cardStacks.children);
      for (const stack of stacks) {
        const nameEl = stack.querySelector('.name-layer .text-fitter-node');
        if (!nameEl) continue;
        const text = nameEl.textContent.trim();
        if (!text || BASIC_SUPPLY.has(text) || SHELTERS.has(text)) continue;
        // Filter out hand cards by vertical position (supply is in the top half)
        const rect = stack.getBoundingClientRect();
        if (rect.y < window.innerHeight * 0.5) {
          found.add(text);
        }
      }
    }

    return [...found];
  }

  function observeKingdom(callback) {
    let debounceTimer = null;

    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
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

    // Also check immediately in case the page is already loaded
    const cards = extractCardNames(document.body);
    if (cards.length >= 10) {
      callback(cards);
    }
  }

  DH.observeKingdom = observeKingdom;
})();
