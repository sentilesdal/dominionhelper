// Custom Playwright fixtures for Chrome extension E2E testing.
//
// Provides five fixtures:
// - context: Persistent browser context with the built extension loaded
// - extensionId: Dynamic extension ID extracted from the service worker URL
// - gamePage: A page navigated to https://dominion.games
// - sidePanelPage: A page navigated to chrome-extension://<id>/sidepanel.html
// - authenticatedPage: A gamePage that has completed the login flow
//
// The context fixture reads the `headless` option from Playwright's use config
// so the --headed CLI flag works correctly.
//
// Source pattern: https://playwright.dev/docs/chrome-extensions
import { test as base, chromium, type BrowserContext, type Page } from '@playwright/test';
import path from 'path';
import { validateCredentials } from './env-setup';

// Extension fixtures for Dominion Helper E2E tests.
// Overrides the default context to use a persistent browser context
// with the built extension loaded via Chrome launch args.
export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
  gamePage: Page;
  sidePanelPage: Page;
  authenticatedPage: Page;
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

  // A gamePage that has completed the dominion.games login flow.
  //
  // Skips the test if credentials are not configured in .env.
  // Waits for AngularJS to bootstrap, checks if already logged in,
  // fills the login form, and verifies login via API response.
  // Retries once on failure; captures a screenshot on final failure.
  authenticatedPage: async ({ gamePage }, use) => {
    const creds = validateCredentials();
    if (!creds) {
      test.skip(true, 'DOMINION_USER and DOMINION_PASS required in .env');
      return;
    }

    // Retry login up to 2 attempts to handle transient network failures
    let lastError: Error | null = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        // Wait for AngularJS to bootstrap before interacting with the page.
        // dominion.games is an AngularJS 1.x app; window.angular is
        // available once the framework has initialized.
        await gamePage.waitForFunction(() => !!(window as any).angular, {
          timeout: 15000,
        });

        // Check if already logged in (handle cached session edge case).
        // If the lobby page is visible, login was already completed
        // in a previous session or via cached cookies.
        const isLoggedIn = await gamePage.evaluate(
          () => !!document.querySelector('.lobby-page')
        );
        if (isLoggedIn) {
          lastError = null;
          break;
        }

        // Fill the login form using resilient selectors.
        // Username uses fill() which works fine for simple text inputs.
        const usernameInput = gamePage.locator('input[type="text"]').first();
        await usernameInput.fill(creds.user);

        // Password uses pressSequentially() to type character by character.
        // AngularJS's digest cycle can interfere with Playwright's fill()
        // on password fields, causing value truncation. Typing sequentially
        // ensures each character is processed by the framework.
        const passwordInput = gamePage.locator('input[type="password"]');
        await passwordInput.click();
        await passwordInput.fill('');
        await passwordInput.pressSequentially(creds.pass, { delay: 50 });

        // Set up response interception before submitting login.
        // Verify login success via API response status rather than
        // checking the DOM, per CONTEXT.md decision.
        const responsePromise = gamePage.waitForResponse(
          (resp) => resp.url().includes('login') || resp.url().includes('auth'),
          { timeout: 30000 }
        );

        // Submit the login form by pressing Enter on the password field.
        // This is more resilient than clicking a specific button, since
        // the button text/role varies across site versions. Most login
        // forms bind Enter on the password field to form submission.
        // If Enter does not work, fall back to clicking the button.
        await passwordInput.press('Enter');

        // Wait for the login API response and verify it succeeded
        const response = await responsePromise;
        if (response.status() !== 200) {
          throw new Error(`Login API returned status ${response.status()}`);
        }

        lastError = null;
        break;
      } catch (err) {
        lastError = err as Error;
        // On first failure, reload the page and retry
        if (attempt === 0) {
          await gamePage.reload();
        }
      }
    }

    // If both attempts failed, capture a screenshot for debugging
    // and throw with the last error message
    if (lastError) {
      await gamePage.screenshot({ path: 'test-results/login-failure.png' });
      throw new Error(`Login failed after retry: ${lastError.message}`);
    }

    // The authenticated page IS the gamePage after successful login
    await use(gamePage);
  },
});

export const expect = test.expect;
