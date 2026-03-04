/**
 * Dominion Helper — Background Service Worker
 *
 * Handles message passing between the content script and the popup.
 * The content script sends KINGDOM_DETECTED when it finds kingdom cards,
 * and the popup sends GET_KINGDOM to retrieve the stored kingdom.
 *
 * Uses chrome.storage.session (not local) so the kingdom data is cleared
 * when the browser session ends — it's ephemeral game state, not persistent.
 *
 * @module service-worker
 */

chrome.runtime.onMessage.addListener(
  (
    message: { type: string; cards?: string[] },
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: unknown) => void,
  ) => {
    if (message.type === "KINGDOM_DETECTED") {
      // Store the detected kingdom in session storage for the popup to access
      chrome.storage.session.set({ currentKingdom: message.cards });
      sendResponse({ ok: true });
    }

    if (message.type === "GET_KINGDOM") {
      // Async storage read — must return true to keep the message channel open
      chrome.storage.session.get("currentKingdom", (result) => {
        sendResponse({
          cards: (result.currentKingdom as string[] | undefined) || [],
        });
      });
      return true; // keeps the message channel open for the async sendResponse
    }
  },
);
