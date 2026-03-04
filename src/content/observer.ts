const BASIC_SUPPLY = new Set([
  "Copper",
  "Silver",
  "Gold",
  "Platinum",
  "Potion",
  "Estate",
  "Duchy",
  "Province",
  "Colony",
  "Curse",
]);

const SHELTERS = new Set(["Hovel", "Necropolis", "Overgrown Estate"]);

export function extractCardNames(root: Document | Element): string[] {
  const found = new Set<string>();

  // Strategy 1: KINGDOM-VIEWER element (most reliable)
  const kingdomViewer = root.querySelector("KINGDOM-VIEWER .kingdom-viewer");
  if (kingdomViewer) {
    const groups = Array.from(kingdomViewer.children).filter(
      (div) => !div.classList.contains("ng-hide"),
    );

    for (const group of groups) {
      const nameEls = group.querySelectorAll(".name-layer .text-fitter-node");
      for (const el of nameEls) {
        const text = el.textContent?.trim();
        if (text && !BASIC_SUPPLY.has(text) && !SHELTERS.has(text)) {
          found.add(text);
        }
      }
    }
  }

  if (found.size >= 10) return [...found];

  // Strategy 2: Scan .card-stacks supply area (fallback)
  const cardStacks = root.querySelector(".card-stacks");
  if (cardStacks) {
    const stacks = Array.from(cardStacks.children);
    for (const stack of stacks) {
      const nameEl = stack.querySelector(".name-layer .text-fitter-node");
      if (!nameEl) continue;
      const text = nameEl.textContent?.trim();
      if (!text || BASIC_SUPPLY.has(text) || SHELTERS.has(text)) continue;
      const rect = (stack as HTMLElement).getBoundingClientRect();
      if (rect.y < window.innerHeight * 0.5) {
        found.add(text);
      }
    }
  }

  return [...found];
}

export function observeKingdom(callback: (cards: string[]) => void): void {
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  const observer = new MutationObserver(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const cards = extractCardNames(document.body);
      if (cards.length >= 10) {
        callback(cards);
      }
    }, 500);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Also check immediately in case the page is already loaded
  const cards = extractCardNames(document.body);
  if (cards.length >= 10) {
    callback(cards);
  }
}
