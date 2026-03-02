// Dominion Helper - Content Script
// Injected into dominion.games to detect kingdom cards and display analysis
// All dependencies are loaded via manifest.json content_scripts in order.

(function () {
  'use strict';

  const DH = window.DominionHelper;
  let currentKingdom = [];

  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((v, i) => v === sortedB[i]);
  }

  function onKingdomDetected(cardNames) {
    if (arraysEqual(cardNames, currentKingdom)) return;
    currentKingdom = cardNames;

    chrome.runtime.sendMessage({
      type: 'KINGDOM_DETECTED',
      cards: cardNames,
    });

    DH.renderOverlay(cardNames);
  }

  DH.observeKingdom(onKingdomDetected);
})();
