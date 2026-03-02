// Dominion Helper - Background Service Worker
// Handles communication between content script and popup

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'KINGDOM_DETECTED') {
    // Store the detected kingdom for the popup to access
    chrome.storage.session.set({ currentKingdom: message.cards });
    sendResponse({ ok: true });
  }

  if (message.type === 'GET_KINGDOM') {
    chrome.storage.session.get('currentKingdom', (result) => {
      sendResponse({ cards: result.currentKingdom || [] });
    });
    return true; // keep channel open for async response
  }
});
