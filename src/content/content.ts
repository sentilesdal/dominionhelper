import { observeKingdom } from "./observer";
import { renderOverlay } from "./ui";

let currentKingdom: string[] = [];

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((v, i) => v === sortedB[i]);
}

function onKingdomDetected(cardNames: string[]): void {
  if (arraysEqual(cardNames, currentKingdom)) return;
  currentKingdom = cardNames;

  chrome.runtime.sendMessage({
    type: "KINGDOM_DETECTED",
    cards: cardNames,
  });

  renderOverlay(cardNames);
}

observeKingdom(onKingdomDetected);
