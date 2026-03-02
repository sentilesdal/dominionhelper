// Dominion Helper - Content Script
// Injected into dominion.games to detect kingdom cards and display analysis

import { observeKingdom } from './observer.js';
import { renderOverlay } from './ui.js';

let currentKingdom = [];

function onKingdomDetected(cardNames) {
  if (arraysEqual(cardNames, currentKingdom)) return;
  currentKingdom = cardNames;

  chrome.runtime.sendMessage({
    type: 'KINGDOM_DETECTED',
    cards: cardNames,
  });

  renderOverlay(cardNames);
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((v, i) => v === sortedB[i]);
}

observeKingdom(onKingdomDetected);
