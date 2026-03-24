// Smoke tests for the Dominion Helper Chrome extension.
//
// Verifies the minimum viable test harness works:
// 1. The extension loads and its service worker is active
// 2. The side panel page renders the expected DOM structure
//
// These tests prove the entire pipeline (build -> extension load ->
// service worker registration -> side panel rendering) works end to end.
// They do NOT test message passing or game interaction (Phase 2+).
import { test, expect } from './fixtures';

test.describe('Extension smoke test', () => {
  test('service worker is active', async ({ context }) => {
    // Wait for at least one service worker to register if none exist yet.
    // The service worker may not have registered by the time this test runs
    // because this test does not depend on the extensionId fixture (which
    // includes its own waitForEvent logic).
    let serviceWorkers = context.serviceWorkers();
    if (serviceWorkers.length === 0) {
      await context.waitForEvent('serviceworker');
      serviceWorkers = context.serviceWorkers();
    }
    expect(serviceWorkers.length).toBeGreaterThan(0);
  });

  test('extension ID is a valid 32-character string', async ({ extensionId }) => {
    // Chrome extension IDs are 32 lowercase letters (a-p alphabet).
    // This verifies the fixture extracts the ID correctly.
    expect(extensionId).toMatch(/^[a-p]{32}$/);
  });

  test('side panel renders content', async ({ sidePanelPage }) => {
    // Verify the top-level side panel container is visible
    await expect(sidePanelPage.locator('.dh-sidepanel')).toBeVisible();

    // Verify the title tg ext
    await expect(sidePanelPage.locator('.dh-title')).toHaveText('Dominion Helper');

    // Verify both tabs exist (Kingdom and Tracker)
    await expect(sidePanelPage.locator('.dh-tab')).toHaveCount(2);
    await expect(sidePanelPage.locator('.dh-tab').first()).toHaveText('Kingdom');
    await expect(sidePanelPage.locator('.dh-tab').last()).toHaveText('Tracker');

    // Verify the empty state is shown (no game data yet)
    await expect(sidePanelPage.locator('#kingdom-tab .dh-empty-state')).toBeVisible();
    await expect(sidePanelPage.locator('#kingdom-tab .dh-empty-state')).toHaveText(
      'Waiting for a game on dominion.games...'
    );
  });

  test('game page loads dominion.games', async ({ gamePage }) => {
    // Verify the game page fixture navigated to dominion.games.
    // The exact page content depends on login state, but the URL
    // should be on the dominion.games domain.
    expect(gamePage.url()).toContain('dominion.games');
  });
});
