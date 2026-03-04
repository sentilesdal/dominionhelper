chrome.runtime.onMessage.addListener(
  (
    message: { type: string; cards?: string[] },
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: unknown) => void,
  ) => {
    if (message.type === "KINGDOM_DETECTED") {
      chrome.storage.session.set({ currentKingdom: message.cards });
      sendResponse({ ok: true });
    }

    if (message.type === "GET_KINGDOM") {
      chrome.storage.session.get("currentKingdom", (result) => {
        sendResponse({
          cards: (result.currentKingdom as string[] | undefined) || [],
        });
      });
      return true; // keep channel open for async response
    }
  },
);
