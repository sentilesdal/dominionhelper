// Custom Playwright fixtures for Chrome extension E2E testing.
//
// Provides four fixtures:
// - context: Persistent browser context with the built extension loaded
// - extensionId: Dynamic extension ID extracted from the service worker URL
// - gamePage: A page navigated to https://dominion.games
// - sidePanelPage: A page navigated to chrome-extension://<id>/sidepanel.html
//
// The context fixture reads the `headless` option from Playwright's use config
// so the --headed CLI flag works correctly.
//
// Source pattern: https://playwright.dev/docs/chrome-extensions
import { test as base, chromium, type BrowserContext, type Page } from '@playwright/test';
import path from 'path';

// Extension fixtures for Dominion Helper E2E tests.
// Overrides the default context to use a persistent browser context
// with the built extension loaded via Chrome launch args.
export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
  gamePage: Page;
  sidePanelPage: Page;
}>({
  // Launch Chrome with the built extension from dist/.
  // Uses an empty string for userDataDir to create a fresh temporary
  // profile that is cleaned up automatically after the test.
  context: async ({ headless }, use) => {
    const pathToExtension = path.resolve(__dirname, '..', 'dist');
    const context = await chromium.launchPersistentContext('', {
      channel: 'chromium',
      headless,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    await use(context);
    await context.close();
  },

  // Extract the extension ID from the service worker URL.
  // Service worker URL format: chrome-extension://<id>/service-worker.js
  // Waits for the service worker event if it hasn't registered yet,
  // avoiding the race condition where serviceWorkers() returns empty.
  extensionId: async ({ context }, use) => {
    let [serviceWorker] = context.serviceWorkers();
    if (!serviceWorker) {
      serviceWorker = await context.waitForEvent('serviceworker');
    }
    const extensionId = serviceWorker.url().split('/')[2];
    await use(extensionId);
  },

  // A page navigated to dominion.games for game interaction.
  // Phase 1 only verifies the page loads; login is Phase 2.
  gamePage: async ({ context }, use) => {
    const page = await context.newPage();
    await page.goto('https://dominion.games');
    await use(page);
  },

  // A page navigated to the side panel HTML as a regular tab.
  // Playwright cannot programmatically open the Chrome side panel,
  // but the HTML renders identically in a tab since it is standard
  // HTML/CSS/JS with access to chrome.runtime APIs.
  sidePanelPage: async ({ context, extensionId }, use) => {
    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/sidepanel.html`);
    await use(page);
  },
});

export const expect = test.expect;
