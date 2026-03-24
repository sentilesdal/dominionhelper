// E2E tests for dominion.games authentication, table creation with Lord
// Rattington bot, game start verification, and turn detection.
// Tests GAME-01 through GAME-04.
//
// The authenticatedPage fixture (from fixtures.ts) handles login with
// retry and screenshot-on-failure. These tests consume it to verify
// the complete game setup flow against live dominion.games.
import { test, expect } from './fixtures';
import { capturePageState } from './helpers/debug';
import {
  createTableWithBot,
  getKingdomCardCount,
  waitForMyTurn,
  getPlayerName,
} from './helpers/game';

// GAME-01: Verify login to dominion.games using .env credentials.
// This test is isolated from the game setup flow to provide a clear
// signal when login itself fails vs. later game interaction steps.
test.describe('Authentication', () => {
  test('logs into dominion.games successfully', async ({ authenticatedPage }) => {
    // Verify we are on the dominion.games domain after login.
    expect(authenticatedPage.url()).toContain('dominion.games');

    // Verify login succeeded — we should be at the lobby, a
    // reconnection screen, or an active game. Any of these proves
    // authentication worked (the login form is gone).
    const loggedIn = await authenticatedPage.evaluate(
      () =>
        !!document.querySelector('.lobby-page') ||
        !!document.querySelector('.game-log') ||
        document.body?.textContent?.includes('reconnected') ||
        document.querySelectorAll('canvas').length > 10
    );
    expect(loggedIn).toBe(true);
  });
});

// GAME-02, GAME-03, GAME-04: Full game setup flow as a single test.
// Each step depends on the previous -- you cannot detect turns without
// starting a game, and you cannot start a game without creating a table.
// Combining them avoids redundant login/table-creation overhead.
test.describe('Game setup flow', () => {
  test('creates table with bot, starts game, and detects turn', async ({
    authenticatedPage,
  }) => {
    // Allow 2 minutes for the full flow: login + table creation +
    // game start + kingdom rendering + turn detection.
    test.setTimeout(120000);

    // Capture lobby state for debugging selectors.
    // Produces screenshot, DOM snapshot, and element list in test-results/.
    await capturePageState(authenticatedPage, 'lobby-state');

    // GAME-02: Create a table with Lord Rattington as the bot opponent.
    // This navigates the lobby to click "1 Bot" and start the game.
    await createTableWithBot(authenticatedPage);

    // GAME-03: Verify that exactly 10 kingdom cards are shown.
    // The card-stacks div is already visible (createTableWithBot waits
    // for it), so we just need to count the kingdom supply cards.
    const cardCount = await getKingdomCardCount(authenticatedPage);
    expect(cardCount).toBe(10);

    // GAME-04: Detect the human player's turn.
    // First, wait for the game log to appear (it renders turn markers
    // as the game progresses).
    await authenticatedPage
      .locator('.game-log')
      .waitFor({ state: 'visible', timeout: 15000 });

    // Discover the human player's name from the game log.
    // In a Lord Rattington game, the non-bot player name is the human.
    const playerName = await getPlayerName(authenticatedPage);
    expect(playerName).toBeTruthy();
    expect(playerName).not.toBe('Lord Rattington');

    // Wait for the human player's turn.
    // Lord Rattington plays instantly, so this should resolve quickly.
    const turnInfo = await waitForMyTurn(authenticatedPage, playerName, 30000);
    expect(turnInfo.turn).toBeGreaterThanOrEqual(1);
  });
});
