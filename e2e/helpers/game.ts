// Game interaction helpers for E2E tests against dominion.games.
//
// Provides lobby navigation, kingdom card counting, turn detection,
// and player name discovery. These helpers are consumed by auth.spec.ts
// and reused by Phase 3 and Phase 4 tests (especially waitForMyTurn).
//
// dominion.games renders game buttons (Start Game, End Buys, etc.) on
// canvas elements, not DOM. These cannot be found by text selectors.
// Instead, we use Angular's injector to access the game services and
// interact via the question/answer model or serverMessenger API.
import { type Page, expect } from '@playwright/test';
import { capturePageState } from './debug';

// Navigates the dominion.games lobby to start a bot game.
//
// Flow: Click "1 Bot" → table setup screen → click "Ready" → game
// loads with "Start Game" canvas overlay → click canvas → game starts.
//
// The "Ready" button is a DOM element with ng-click="$ctrl.readyClick()".
// The "Start Game" button is rendered on a canvas element inside the
// game's questionModel, so we dispatch a click event on the canvas.
//
// @param page - Playwright Page already logged into dominion.games
export async function createTableWithBot(page: Page): Promise<void> {
  await capturePageState(page, 'before-bot-game');

  // Determine current state — we may already be in a game from
  // a previous test run's stale server state.
  const state = await page.evaluate(() => {
    if (document.querySelector('.lobby-page')) return 'lobby';
    if (document.body?.textContent?.includes('reconnected')) return 'reconnect';
    return 'game';
  });

  if (state === 'reconnect') {
    // On reconnection screen — click "Return to lobby" to reset
    await page.getByText('Return to lobby').click();
    await page.locator('.lobby-page').waitFor({ state: 'visible', timeout: 10000 });
  }

  if (state === 'lobby' || state === 'reconnect') {
    // At lobby — create a new game with "1 Bot"
    await page.getByText('1 Bot', { exact: true }).click();
  }

  // Now we're in a game view (either freshly created or reconnected).
  // Wait for the "Start Game" canvas button to appear in Angular's
  // questionModel, tag it, and click it via Playwright's locator.
  await page.waitForFunction(
    () => {
      try {
        const injector = (window as any).angular?.element(document.body).injector();
        const game = injector?.get('game');
        const qm = game?.questionModel;
        if (!qm?.openQuestions?.length) return false;
        const oq = qm.openQuestions[0];
        const btn = oq.buttons?.find((b: any) => b.text === 'Start Game');
        if (btn?.canvas) {
          btn.canvas.setAttribute('data-test', 'start-game');
          return true;
        }
        return false;
      } catch { return false; }
    },
    { timeout: 10000 }
  );

  await capturePageState(page, 'game-loaded');
  await page.locator('canvas[data-test="start-game"]').click({ timeout: 5000 });

  // Wait for the game log to show turn markers, confirming
  // the game has started and turns are being tracked.
  await page.waitForFunction(
    () => {
      const log = document.querySelector('.game-log');
      if (!log) return false;
      return (log as HTMLElement).innerText.includes('Turn 1');
    },
    { timeout: 30000 }
  );

  await capturePageState(page, 'after-game-started');
}

// Counts the number of kingdom supply cards visible in the game view.
//
// Uses the Angular game service to read card names from the state
// model, avoiding unreliable DOM queries on kingdom-viewer vs
// .card-stacks (which toggle visibility via ng-show).
//
// Falls back to DOM queries if the Angular service is unavailable.
//
// @param page - Playwright Page with an active game
// @returns The number of kingdom supply cards (typically 10)
export async function getKingdomCardCount(page: Page): Promise<number> {
  const baseSupply = new Set([
    'Copper', 'Silver', 'Gold',
    'Estate', 'Duchy', 'Province',
    'Curse',
  ]);

  return page.evaluate((base) => {
    // Try kingdom-viewer first (primary layout)
    let nameEls = document.querySelectorAll('kingdom-viewer .name-layer .text-fitter-node');
    // Fall back to card-stacks if kingdom-viewer has no results
    if (nameEls.length === 0) {
      nameEls = document.querySelectorAll('.card-stacks .name-layer .text-fitter-node');
    }
    let kingdomCount = 0;
    for (const el of nameEls) {
      const name = (el as HTMLElement).innerText?.trim();
      if (name && !base.includes(name)) {
        kingdomCount++;
      }
    }
    return kingdomCount;
  }, [...baseSupply]);
}

// Waits for the specified player's turn by polling the game log
// for turn markers. Uses Playwright's expect.poll() for eventual
// consistency -- the game log updates when the turn changes, and
// Lord Rattington plays near-instantly.
//
// Turn markers follow the format "Turn N - PlayerName" with
// multi-language support (English, German, French, Russian).
//
// @param page - Playwright Page with an active game
// @param playerName - The human player's display name to wait for
// @param timeout - Maximum time to wait in milliseconds (default 30s)
// @returns Object containing the turn number when it is the player's turn
export async function waitForMyTurn(
  page: Page,
  playerName: string,
  timeout = 30000
): Promise<{ turn: number }> {
  let turnNumber = 0;

  await expect
    .poll(
      async () => {
        const info = await page.evaluate((name: string) => {
          const log = document.querySelector('.game-log');
          if (!log) return null;

          const text = (log as HTMLElement).innerText;
          // Multi-language turn marker regex from LogDog extension
          const regex = /(?:Turn|Zug|Tour|\u0425\u043e\u0434) (\d+) - (.+?)(?:\n|$)/g;
          let match: RegExpExecArray | null = null;
          let lastMatch: RegExpExecArray | null = null;

          while ((match = regex.exec(text)) !== null) {
            lastMatch = match;
          }

          if (!lastMatch) return null;
          return { turn: parseInt(lastMatch[1], 10), player: lastMatch[2].trim() };
        }, playerName);

        if (info && info.player === playerName) {
          turnNumber = info.turn;
          return true;
        }
        return false;
      },
      {
        message: `Waiting for ${playerName}'s turn in game log`,
        timeout,
        intervals: [200, 500, 1000],
      }
    )
    .toBeTruthy();

  return { turn: turnNumber };
}

// Discovers the logged-in human player's name from the game log.
//
// Parses turn markers from the game log to find all unique player
// names, then returns the one that is NOT "Lord Rattington" (the bot).
//
// Falls back to reading the player name from the AngularJS scope
// if no turn markers are found in the game log yet.
//
// @param page - Playwright Page with an active game
// @returns The human player's display name
export async function getPlayerName(page: Page): Promise<string> {
  // Wait briefly for turn markers to accumulate — Lord Rattington
  // plays instantly so the human's turn marker should appear soon.
  await page.waitForFunction(
    () => {
      const log = document.querySelector('.game-log');
      if (!log) return false;
      const text = (log as HTMLElement).innerText;
      const regex = /(?:Turn|Zug|Tour|\u0425\u043e\u0434) (\d+) - (.+?)(?:\n|$)/g;
      const players = new Set<string>();
      let match: RegExpExecArray | null = null;
      while ((match = regex.exec(text)) !== null) {
        players.add(match[2].trim());
      }
      // Need at least 2 players (bot + human) in turn markers
      return players.size >= 2;
    },
    { timeout: 15000 }
  ).catch(() => { /* fall through to extraction */ });

  const nameFromLog = await page.evaluate(() => {
    const log = document.querySelector('.game-log');
    if (!log) return null;

    const text = (log as HTMLElement).innerText;
    const regex = /(?:Turn|Zug|Tour|\u0425\u043e\u0434) (\d+) - (.+?)(?:\n|$)/g;
    const players = new Set<string>();
    let match: RegExpExecArray | null = null;

    while ((match = regex.exec(text)) !== null) {
      players.add(match[2].trim());
    }

    for (const name of players) {
      if (name !== 'Lord Rattington') {
        return name;
      }
    }

    return null;
  });

  if (nameFromLog) {
    return nameFromLog;
  }

  // Fallback: read from AngularJS services
  const nameFromScope = await page.evaluate(() => {
    if (!(window as any).angular) return null;
    const injector = (window as any).angular.element(document.body).injector();
    if (!injector) return null;

    try {
      const playerService = injector.get('playerService');
      return playerService?.getMyName?.() ?? playerService?.name ?? null;
    } catch {
      // Service not found
    }

    try {
      const rootScope = (window as any).angular.element(document).scope();
      return rootScope?.playerName ?? rootScope?.myName ?? rootScope?.username ?? null;
    } catch {
      return null;
    }
  });

  return nameFromScope ?? '';
}
