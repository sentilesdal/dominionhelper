// Custom Playwright fixtures for Chrome extension E2E testing.
//
// Provides five fixtures:
// - context: Persistent browser context with the built extension loaded
// - extensionId: Dynamic extension ID extracted from the service worker URL
// - gamePage: A page navigated to https://dominion.games
// - sidePanelPage: A page navigated to chrome-extension://<id>/sidepanel.html
// - authenticatedPage: A gamePage that has completed the login flow
//
// Source pattern: https://playwright.dev/docs/chrome-extensions
import {
  test as base,
  chromium,
  type BrowserContext,
  type Page,
} from "@playwright/test";
import path from "path";
import { validateCredentials } from "./env-setup";

type WindowWithAngular = Window &
  typeof globalThis & {
    angular?: unknown;
  };

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
  gamePage: Page;
  sidePanelPage: Page;
  authenticatedPage: Page;
}>({
  context: async ({ headless }, use) => {
    const pathToExtension = path.resolve(__dirname, "..", "..", "dist");
    const context = await chromium.launchPersistentContext("", {
      channel: "chromium",
      headless,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    await use(context);
    await context.close();
  },

  extensionId: async ({ context }, use) => {
    let [serviceWorker] = context.serviceWorkers();
    if (!serviceWorker) {
      serviceWorker = await context.waitForEvent("serviceworker");
    }
    await use(serviceWorker.url().split("/")[2]);
  },

  gamePage: async ({ context }, use) => {
    const page = await context.newPage();
    await page.goto("https://dominion.games");
    await use(page);
  },

  sidePanelPage: async ({ context, extensionId }, use) => {
    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/sidepanel.html`);
    await use(page);
  },

  // Logs into dominion.games. After login the page may be at the
  // lobby, a reconnection screen, or an active game — callers must
  // handle all three states.
  authenticatedPage: async ({ gamePage }, use) => {
    const creds = validateCredentials();
    if (!creds) {
      test.skip(true, "DOMINION_USER and DOMINION_PASS required in .env");
      return;
    }

    await gamePage.waitForFunction(
      () => !!(window as WindowWithAngular).angular,
      {
        timeout: 10000,
      },
    );

    // Already logged in — skip form filling
    if (
      await gamePage.evaluate(() => !!document.querySelector(".lobby-page"))
    ) {
      await use(gamePage);
      return;
    }

    // Fill credentials and submit
    await gamePage.locator('input[type="text"]').first().fill(creds.user);
    const passwordInput = gamePage.locator('input[type="password"]');
    await passwordInput.click();
    await gamePage.keyboard.type(creds.pass, { delay: 50 });

    // Login click may throw if page redirects (detaches the button)
    try {
      await gamePage.getByText("Login", { exact: true }).click();
    } catch {
      // Detach = login succeeded and page navigated
    }

    // Wait for any post-login state — lobby, reconnection, or game
    await gamePage.waitForFunction(
      () =>
        !!document.querySelector(".lobby-page") ||
        !!document.querySelector(".game-log") ||
        document.body?.textContent?.includes("reconnected") ||
        document.querySelectorAll("canvas").length > 10,
      { timeout: 10000 },
    );

    await use(gamePage);
  },
});

export const expect = test.expect;
