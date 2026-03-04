// Dominion Helper — Popup Script
//
// Runs in the extension popup (opened by clicking the extension icon).
// Requests the current kingdom from the service worker and displays it.
// Shows a "no kingdom detected" message if no game is active.
//
// @module popup

document.addEventListener("DOMContentLoaded", () => {
  const statusEl = document.getElementById("status")!;
  const kingdomEl = document.getElementById("kingdom")!;

  // Request the current kingdom from the service worker
  chrome.runtime.sendMessage(
    { type: "GET_KINGDOM" },
    (response: { cards?: string[] }) => {
      if (response && response.cards && response.cards.length > 0) {
        statusEl.textContent = `Kingdom detected (${response.cards.length} cards)`;
        kingdomEl.textContent = response.cards.join(", ");
      } else {
        statusEl.textContent =
          "No kingdom detected yet. Start a game on dominion.games!";
      }
    },
  );
});
