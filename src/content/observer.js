// Dominion Helper - DOM Observer
// Watches for kingdom cards to appear on the dominion.games page
//
// Strategy: dominion.games renders card names as text in the supply area.
// We use a MutationObserver to detect when the game view loads, then
// extract card names by matching DOM text content against our card database.

import cardData from '../data/cards.json' with { type: 'json' };

const ALL_CARD_NAMES = new Set(cardData.map((c) => c.name));

// Selectors may need updating if dominion.games changes their DOM structure.
// These are starting points — we'll refine once we can inspect the live site.
const SUPPLY_SELECTORS = [
  '.kingdom-viewer-group',
  '.supply-card',
  '.name-layer',
  '.card-name',
];

function extractCardNames(root) {
  const found = new Set();

  // Strategy 1: Look for elements matching known selectors
  for (const selector of SUPPLY_SELECTORS) {
    const elements = root.querySelectorAll(selector);
    for (const el of elements) {
      const text = el.textContent.trim();
      if (ALL_CARD_NAMES.has(text)) {
        found.add(text);
      }
    }
  }

  // Strategy 2: If selectors fail, scan all text nodes for card names
  // This is slower but more resilient to DOM changes
  if (found.size === 0) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const text = walker.currentNode.textContent.trim();
      if (ALL_CARD_NAMES.has(text)) {
        found.add(text);
      }
    }
  }

  return [...found];
}

export function observeKingdom(callback) {
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
