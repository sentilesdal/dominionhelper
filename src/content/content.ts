// Dominion Helper — Content Script Entry Point
//
// This is the main entry point injected into dominion.games by the Chrome
// extension. It wires the DOM observer to the UI renderer: when the observer
// detects a kingdom (10+ supply cards), it triggers analysis and overlay
// rendering. Also notifies the service worker so the popup can display
// the current kingdom.
//
// Vite bundles this file and all its transitive imports (observer, ui,
// engine, synergies, archetypes, card data) into a single `dist/content.js`.
//
// @module content

import { observeKingdom } from "./observer";
import { renderOverlay } from "./ui";

// Tracks the current kingdom to avoid redundant re-analysis.
let currentKingdom: string[] = [];

// Compares two string arrays for equality regardless of order.
// Used to skip re-analysis when the observer fires but the kingdom
// hasn't actually changed (e.g., DOM mutations from card animations).
//
// @param a - First array
// @param b - Second array
// @returns True if both arrays contain the same strings
function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((v, i) => v === sortedB[i]);
}

// Callback invoked by the DOM observer when a kingdom is detected.
// Skips processing if the kingdom hasn't changed since the last detection.
// Otherwise, updates the stored kingdom, notifies the service worker,
// and renders the analysis overlay.
//
// @param cardNames - Array of card name strings detected from the DOM
function onKingdomDetected(cardNames: string[]): void {
  if (arraysEqual(cardNames, currentKingdom)) return;
  currentKingdom = cardNames;

  // Notify the service worker so the popup can display the current kingdom
  chrome.runtime.sendMessage({
    type: "KINGDOM_DETECTED",
    cards: cardNames,
  });

  renderOverlay(cardNames);
}

// Start observing the DOM for kingdom cards as soon as the content script loads
observeKingdom(onKingdomDetected);
