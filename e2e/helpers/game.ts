// Game interaction helpers for E2E tests against dominion.games.
//
// Provides lobby navigation, kingdom card counting, turn detection,
// and player name discovery. These helpers are consumed by auth.spec.ts
// and reused by Phase 3 and Phase 4 tests (especially waitForMyTurn).
//
// All waiting uses Playwright's built-in retry mechanisms (expect.poll,
// locator auto-waiting) rather than manual setTimeout/setInterval.
import { type Page, expect } from '@playwright/test';

// Navigates the dominion.games lobby to create a new table with
// Lord Rattington as the bot opponent and starts the game.
//
// Steps: click "New Table" tab -> click "Create Table" -> add Lord
// Rattington bot -> click "Start Game" / "Ready" button.
//
// Selectors are based on LogDog/command.games research. Text-based
// locators are preferred for resilience against class name changes.
//
// @param page - Playwright Page already logged into dominion.games
export async function createTableWithBot(page: Page): Promise<void> {
  // Step 1: Click the "New Table" tab in the lobby navigation.
  // Uses text filter for resilience -- the tab text is "New Table"
  // across English locales.
  await page.locator('.tab-button').filter({ hasText: /new table/i }).click();

  // Step 2: Click the "Create Table" button.
  // This appears after selecting the New Table tab and opens the
  // table configuration view.
  await page.locator('.lobby-button').filter({ hasText: /create/i }).click();

  // Step 3: Add Lord Rattington as the bot opponent.
  // The first visible .lobby-button.kingdom-selection element is the
  // Lord Rattington button. Wait for it to become visible before clicking,
  // as the table setup view may take a moment to render.
  const botButton = page.locator('.lobby-button.kingdom-selection').first();
  await botButton.waitFor({ state: 'visible' });
  await botButton.click();

  // Step 4: Start the game by clicking the start/ready button.
  // The button text varies ("Start Game", "Ready", etc.) so we use
  // a broad regex match.
  await page.locator('.lobby-button').filter({ hasText: /start|ready/i }).click();
}

// Counts the number of kingdom cards visible in the kingdom viewer.
//
// Primary approach uses the DOM selector for card name elements.
// Falls back to AngularJS scope access if the primary selector
// finds no cards. Always returns a number (0 if nothing found).
//
// @param page - Playwright Page with an active game
// @returns The number of kingdom cards visible in the viewer
export async function getKingdomCardCount(page: Page): Promise<number> {
  // Primary: count card name elements in the kingdom viewer group.
  // The .full-card-name.card-name selector matches individual kingdom
  // card names as confirmed by LogDog extension source code.
  const count = await page.locator('.kingdom-viewer-group .full-card-name.card-name').count();

  if (count > 0) {
    return count;
  }

  // Fallback: read card count from AngularJS scope data.
  // dominion.games is an AngularJS 1.x app, so angular.element().scope()
  // provides access to the component's model data.
  return page.evaluate(() => {
    const el = document.querySelector('.kingdom-viewer-group');
    if (!el || !(window as any).angular) return 0;
    const scope = (window as any).angular.element(el).scope();
    return scope?.cards?.length ?? scope?.kingdom?.length ?? 0;
  });
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

  // Poll the game log until we find the latest turn marker matching
  // the target player name. expect.poll retries automatically with
  // configurable intervals, avoiding manual setTimeout/setInterval.
  await expect
    .poll(
      async () => {
        const info = await page.evaluate((name: string) => {
          const log = document.querySelector('.game-log');
          if (!log) return null;

          const text = (log as HTMLElement).innerText;
          // Multi-language turn marker regex from LogDog extension:
          // English "Turn", German "Zug", French "Tour", Russian "Ход"
          const regex = /(?:Turn|Zug|Tour|\u0425\u043e\u0434) (\d+) - (.+?)(?:\n|$)/g;
          let match: RegExpExecArray | null = null;
          let lastMatch: RegExpExecArray | null = null;

          // Find the LAST turn marker in the log (most recent turn)
          while ((match = regex.exec(text)) !== null) {
            lastMatch = match;
          }

          if (!lastMatch) return null;
          return { turn: parseInt(lastMatch[1], 10), player: lastMatch[2].trim() };
        }, playerName);

        // Return true only when the latest turn belongs to the target player
        if (info && info.player === playerName) {
          turnNumber = info.turn;
          return true;
        }
        return false;
      },
      {
        message: `Waiting for ${playerName}'s turn in game log`,
        timeout,
        // Start polling quickly (200ms), back off slightly over time
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
// This works because a 2-player game always has exactly two player
// names in the turn markers.
//
// Falls back to reading the player name from the AngularJS scope
// if no turn markers are found in the game log yet.
//
// @param page - Playwright Page with an active game
// @returns The human player's display name
export async function getPlayerName(page: Page): Promise<string> {
  // Primary: parse the game log for turn markers and find the
  // non-bot player name. In a game with Lord Rattington, the
  // human player is the one whose name is NOT "Lord Rattington".
  const nameFromLog = await page.evaluate(() => {
    const log = document.querySelector('.game-log');
    if (!log) return null;

    const text = (log as HTMLElement).innerText;
    // Multi-language turn marker regex matching "Turn N - PlayerName"
    const regex = /(?:Turn|Zug|Tour|\u0425\u043e\u0434) (\d+) - (.+?)(?:\n|$)/g;
    const players = new Set<string>();
    let match: RegExpExecArray | null = null;

    while ((match = regex.exec(text)) !== null) {
      players.add(match[2].trim());
    }

    // Return the player name that is NOT the bot
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

  // Fallback: try to read the player name from the AngularJS scope.
  // The game controller or player service may expose the current
  // player's display name.
  const nameFromScope = await page.evaluate(() => {
    if (!(window as any).angular) return null;
    const injector = (window as any).angular.element(document).injector();
    if (!injector) return null;

    // Attempt to read from common Angular service names
    try {
      const playerService = injector.get('playerService');
      return playerService?.getMyName?.() ?? playerService?.name ?? null;
    } catch {
      // Service not found -- not all Angular apps expose this
    }

    // Try reading from root scope
    try {
      const rootScope = (window as any).angular.element(document).scope();
      return rootScope?.playerName ?? rootScope?.myName ?? rootScope?.username ?? null;
    } catch {
      return null;
    }
  });

  return nameFromScope ?? '';
}
