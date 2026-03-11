// Dominion Helper — Background Service Worker
//
// Central message hub between the content script and the side panel.
// When the content script detects a kingdom, the service worker runs
// the analysis engine and forwards the result to the side panel. Deck
// tracker data is forwarded directly from the content script to the
// side panel.
//
// Also configures the extension icon to toggle the side panel instead
// of opening a popup.
//
// Message types handled:
// - KINGDOM_DETECTED: content script found kingdom cards -> run analysis -> forward to side panel
// - TRACKER_UPDATE: content script sends serialized deck stats -> forward to side panel
// - SELECT_PLAYER: side panel requests player switch -> forward to content script tab
// - GET_ANALYSIS: side panel requests current analysis (on open)
// - GET_TRACKER: side panel requests current tracker data (on open)
//
// @module service-worker

import type { AnalysisResult, TrackerData } from "../types";
import { analyzeKingdom } from "../analysis/engine";

// Open the side panel when the user clicks the extension's toolbar icon
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// ─── Cached State ───────────────────────────────────────────────────

// Stores the most recent analysis result so the side panel can request
// it when it opens (after analysis may have already been computed).
let currentAnalysis: AnalysisResult | null = null;

// Stores the most recent tracker data for the same reason.
let currentTracker: TrackerData | null = null;

// Stores the content script tab ID for forwarding player selection changes
let contentTabId: number | null = null;

// ─── Message Handling ───────────────────────────────────────────────

chrome.runtime.onMessage.addListener(
  (
    message: {
      type: string;
      cards?: string[];
      tracker?: TrackerData;
      analysis?: AnalysisResult;
      player?: string;
    },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: unknown) => void,
  ) => {
    // Content script detected kingdom cards — run analysis and broadcast
    if (message.type === "KINGDOM_DETECTED" && message.cards) {
      // Remember which tab the content script is running in
      if (sender.tab?.id) {
        contentTabId = sender.tab.id;
      }

      // Store the kingdom in session storage for persistence across
      // service worker restarts
      chrome.storage.session.set({ currentKingdom: message.cards });

      // Run the analysis engine
      const analysis = analyzeKingdom(message.cards);
      currentAnalysis = analysis;

      // Broadcast to all extension pages (side panel will pick this up)
      chrome.runtime
        .sendMessage({
          type: "ANALYSIS_UPDATE",
          analysis,
        })
        .catch(() => {
          // Side panel may not be open — that's fine, we cached the result
        });

      sendResponse({ ok: true });
    }

    // Content script sends tracker data — cache and forward to side panel
    if (message.type === "TRACKER_UPDATE" && message.tracker) {
      // Remember which tab the content script is running in
      if (sender.tab?.id) {
        contentTabId = sender.tab.id;
      }

      currentTracker = message.tracker;

      // Forward to side panel
      chrome.runtime
        .sendMessage({
          type: "TRACKER_UPDATE",
          tracker: message.tracker,
        })
        .catch(() => {
          // Side panel may not be open
        });

      sendResponse({ ok: true });
    }

    // Side panel requests current analysis data (e.g., on open)
    if (message.type === "GET_ANALYSIS") {
      sendResponse({ analysis: currentAnalysis });
    }

    // Side panel requests current tracker data (e.g., on open)
    if (message.type === "GET_TRACKER") {
      sendResponse({ tracker: currentTracker });
    }

    // Side panel requests to switch the selected player — forward to
    // the content script so it can recompute stats for the new player
    if (message.type === "SELECT_PLAYER" && message.player) {
      if (contentTabId !== null) {
        chrome.tabs
          .sendMessage(contentTabId, {
            type: "SELECT_PLAYER",
            player: message.player,
          })
          .catch(() => {
            // Content script tab may have been closed
          });
      }
      sendResponse({ ok: true });
    }

    // Return true to keep the message channel open for async responses
    return true;
  },
);
