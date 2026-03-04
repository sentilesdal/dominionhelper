// Dominion Helper — Game Log Observer
//
// Watches the dominion.games game log DOM for new entries using
// MutationObserver. Extracts text from new log lines and passes them
// to a callback for parsing. Uses the same observer pattern as the
// kingdom card observer but targets the game log container.
//
// DOM structure:
//   .game-log > .log-scroll-container > div > .log-line > .log-line-block > span
//
// Key exports: observeGameLog, extractLogText
//
// @module log-observer

// Selector for the game log scroll container that holds log line elements
const LOG_CONTAINER_SELECTOR = ".game-log .log-scroll-container";

// Selector for individual log line elements within the container
const LOG_LINE_SELECTOR = ".log-line";

// Debounce delay in ms. Shorter than the kingdom observer (500ms)
// because log updates are small, incremental additions rather than
// full DOM rebuilds.
const DEBOUNCE_MS = 200;

// Extracts text content from log line elements within a container.
// Each log line may contain multiple spans; we concatenate them into
// a single string per line. Empty/whitespace-only lines are filtered out.
//
// @param container - DOM element containing .log-line elements
// @returns Array of trimmed text strings, one per log line
export function extractLogText(container: Element): string[] {
  const lines: string[] = [];
  const logLineEls = container.querySelectorAll(LOG_LINE_SELECTOR);

  for (const lineEl of logLineEls) {
    const text = lineEl.textContent?.trim();
    if (text) {
      lines.push(text);
    }
  }

  return lines;
}

// Starts observing the game log DOM for new entries and invokes the
// callback with newly added log lines. Uses MutationObserver on the
// log scroll container with a 200ms debounce.
//
// Tracks the number of previously seen lines to only yield new entries
// on each update. Detects game resets when the line count drops (the
// log is cleared for a new game).
//
// Also polls every 2 seconds for the container appearing (in case
// the game starts after the content script loads).
//
// @param callback - Function called with an array of new log line strings
export function observeGameLog(callback: (lines: string[]) => void): void {
  let lastLineCount = 0;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  let observer: MutationObserver | null = null;

  // Processes new log lines by comparing current line count to previously seen.
  // If line count dropped, a new game started — send all lines as new.
  function processNewLines(container: Element): void {
    const allLines = extractLogText(container);

    // Line count dropped — game was reset, send all lines
    if (allLines.length < lastLineCount) {
      lastLineCount = 0;
    }

    if (allLines.length > lastLineCount) {
      const newLines = allLines.slice(lastLineCount);
      lastLineCount = allLines.length;
      callback(newLines);
    }
  }

  // Attempts to find the log container and attach the observer.
  // Returns true if the container was found and observer attached.
  function tryAttach(): boolean {
    const container = document.querySelector(LOG_CONTAINER_SELECTOR);
    if (!container) return false;

    // Process any lines already present
    processNewLines(container);

    observer = new MutationObserver(() => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        processNewLines(container);
      }, DEBOUNCE_MS);
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    return true;
  }

  // If the log container isn't present yet (e.g., game hasn't started),
  // poll every 2 seconds until it appears
  if (!tryAttach()) {
    const pollInterval = setInterval(() => {
      if (tryAttach()) {
        clearInterval(pollInterval);
      }
    }, 2000);
  }
}
