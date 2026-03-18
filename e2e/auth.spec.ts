// E2E tests for dominion.games authentication, table creation with Lord
// Rattington bot, game start verification, and turn detection.
// Tests GAME-01 through GAME-04.
//
// The authenticatedPage fixture (from fixtures.ts) handles login with
// retry and screenshot-on-failure. These tests consume it to verify
// the complete game setup flow against live dominion.games.
import { test, expect } from './fixtures';
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
  test('logs into dominion.games and reaches lobby', async ({ authenticatedPage }) => {
    // The authenticatedPage fixture handles the login flow.
    // Verify we are still on the dominion.games domain after login.
    expect(authenticatedPage.url()).toContain('dominion.games');

    // Wait for lobby content to appear, proving login succeeded.
    // The lobby contains either .lobby-page or tab-button navigation
    // elements, depending on the current lobby state.
    await expect(
      authenticatedPage.locator('.lobby-page, .tab-button')
    ).toBeVisible({ timeout: 10000 });
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

    // GAME-02: Create a table with Lord Rattington as the bot opponent.
    // This navigates the lobby to create a new table, add the bot,
    // and start the game.
    await createTableWithBot(authenticatedPage);

    // GAME-03: Wait for the kingdom viewer to appear and verify
    // that exactly 10 kingdom cards are shown.
    // The kingdom viewer appears after the game starts and the
    // server sends the kingdom card data.
    await authenticatedPage
      .locator('.kingdom-viewer-group')
      .waitFor({ state: 'visible', timeout: 30000 });
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
