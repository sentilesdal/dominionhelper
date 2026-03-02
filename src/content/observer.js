// Dominion Helper - DOM Observer
// Watches for kingdom cards to appear on the dominion.games page
//
// Confirmed DOM structure from reverse-engineering existing extensions:
// - Kingdom cards: .kingdom-viewer-group > .full-card-name.card-name
// - Landscape cards: .landscape-name
// - Card names in log: <span onmousedown="publicStudyRequest(event, 'CardName')">
// - Game log: .game-log > .log-line / .actual-log

(function () {
  'use strict';

  const DH = window.DominionHelper;
  const ALL_CARD_NAMES = new Set(DH.cardData.map((c) => c.name));

  /**
   * Extract kingdom card names from the supply/kingdom viewer area.
   * Uses multiple strategies in order of reliability.
   */
  function extractCardNames(root) {
    const found = new Set();

    // Strategy 1: Kingdom viewer elements (most reliable)
    // dominion.games uses .kingdom-viewer-group containing .full-card-name.card-name
    const kingdomNames = root.querySelectorAll(
      '.kingdom-viewer-group .full-card-name.card-name'
    );
    for (const el of kingdomNames) {
      const text = el.textContent.trim();
      if (ALL_CARD_NAMES.has(text)) {
        found.add(text);
      }
    }

    // Also check landscape cards (Events, Projects, Ways, etc.)
    const landscapes = root.querySelectorAll(
      '.landscape-name:not(.unselectable)'
    );
    for (const el of landscapes) {
      const text = el.textContent.trim();
      if (ALL_CARD_NAMES.has(text)) {
        found.add(text);
      }
    }

    if (found.size >= 10) return [...found];

    // Strategy 2: Extract card names from onmousedown="publicStudyRequest" attributes
    // These are the most reliable programmatic source of card names
    const spans = root.querySelectorAll('span[onmousedown*="publicStudyRequest"]');
    for (const span of spans) {
      const mousedown = span.getAttribute('onmousedown') || '';
      const match = mousedown.match(/publicStudyRequest\(event,\s*'([^']+)'\)/);
      if (match && ALL_CARD_NAMES.has(match[1])) {
        found.add(match[1]);
      }
    }

    if (found.size >= 10) return [...found];

    // Strategy 3: Broader selector search (fallback)
    const fallbackSelectors = ['.supply-card', '.card-name', '.name-layer'];
    for (const selector of fallbackSelectors) {
      const elements = root.querySelectorAll(selector);
      for (const el of elements) {
        const text = el.textContent.trim();
        if (ALL_CARD_NAMES.has(text)) {
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
