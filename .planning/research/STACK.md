# Technology Stack: E2E Testing Infrastructure

**Project:** Dominion Helper -- Chrome Extension E2E Testing
**Researched:** 2026-03-17
**Mode:** Ecosystem (Stack dimension)

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| @playwright/test | ^1.58.0 | E2E test runner and assertion library | Only mainstream framework with first-class Chrome extension support via persistent contexts. Built-in auto-wait eliminates flaky Angular timing issues. Test fixtures handle extension lifecycle cleanly. | HIGH |
| playwright | ^1.58.0 | Browser automation engine (peer of @playwright/test) | Installed automatically with @playwright/test. Provides chromium.launchPersistentContext() required for extension loading. | HIGH |

### Environment and Configuration

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| dotenv | ^16.4.0 | Load .env credentials into process.env | Playwright has no built-in .env support. Official docs recommend dotenv. Needed for DOMINION_USER/DOMINION_PASS credentials. | HIGH |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @playwright/test (fixtures) | ^1.58.0 | Custom test fixtures for extension context and extensionId | Every E2E test -- provides the persistent context with extension loaded |
| Node.js path module | built-in | Resolve extension dist/ path for --load-extension arg | Fixture setup only |
| Node.js fs module | built-in | Check dist/ exists before test run, manage auth state files | Global setup and teardown |

## Critical Architecture Decisions

### 1. Persistent Context is Mandatory (not optional)

Chrome extensions ONLY work via `chromium.launchPersistentContext()`. The standard `browser.newContext()` API cannot load extensions. This is a hard Playwright constraint, not a design choice.

**Implication:** Every E2E test file shares a single browser context (one Chromium instance with the extension loaded). Tests within a file run serially against that context. This differs from standard Playwright tests where each test gets an isolated context.

**Confidence:** HIGH -- verified from [official Playwright docs](https://playwright.dev/docs/chrome-extensions).

### 2. Use Bundled Chromium, NOT System Chrome

Google Chrome and Microsoft Edge removed the command-line flags (`--load-extension`, `--disable-extensions-except`) needed to side-load extensions. Only Playwright's bundled Chromium still supports these flags.

**Configuration:** Use `channel: 'chromium'` in launch options. Do NOT use `channel: 'chrome'` or `channel: 'msedge'`.

**Confidence:** HIGH -- explicit warning in [official docs](https://playwright.dev/docs/chrome-extensions): "Google Chrome and Microsoft Edge removed the command-line flags needed to side-load extensions, so use Chromium that comes bundled with Playwright."

### 3. Headless Mode IS Supported for Extensions (with chromium channel)

As of Playwright 1.57+, the `channel: 'chromium'` option enables the "new headless mode" which is the full Chrome browser running without a visible window. This supports extensions, unlike the old headless shell.

**Configuration:** Set `channel: 'chromium'` in launchPersistentContext options. Headless is the default. For debugging, override with `headless: false`.

**Quote from official docs:** "Note the use of the chromium channel that allows to run extensions in headless mode."

**Confidence:** HIGH -- verified from [official Playwright Chrome extensions page](https://playwright.dev/docs/chrome-extensions).

### 4. Separate Playwright Config from Vitest

E2E tests use `playwright.config.ts` with `@playwright/test`. Unit tests continue using `vitest.config.ts` with Vitest. These are completely separate test runners, separate configs, separate npm scripts. Do not try to unify them.

**Confidence:** HIGH -- standard pattern, no overlap between the two runners.

### 5. Side Panel Access via Direct Page Navigation

Playwright cannot open Chrome's actual side panel UI (Issue #26693). Instead, navigate to `chrome-extension://<id>/sidepanel.html` in a regular tab. This gives the page full `chrome.runtime` API access and it receives the same `ANALYSIS_UPDATE` and `TRACKER_UPDATE` messages as the real side panel.

**Why this works:** Chrome extension pages loaded via `chrome-extension://` URLs have the same runtime privileges regardless of whether they're rendered in a tab, popup, or side panel. The sidepanel.html page calls `chrome.runtime.sendMessage({ type: 'GET_ANALYSIS' })` on init, and the service worker responds identically.

**Alternative rejected:** `PW_CHROMIUM_ATTACH_TO_OTHER=1` with test-only buttons to trigger `chrome.sidePanel.open()`. This is fragile, relies on an undocumented Playwright internal, and requires modifying production code with test hooks.

**Confidence:** HIGH -- Chrome extension pages have the same API access in all contexts (verified via Chrome extension docs). The direct navigation approach is used by the Playwright community for popup testing (`chrome-extension://<id>/popup.html`).

### 6. Login State Persistence via userDataDir

For dominion.games login, use the persistent context's `userDataDir` to cache session cookies across test runs. First run performs login; subsequent runs skip it if cookies are still valid.

**Important caveats:**
- Session cookies (no expiry) may not persist across launches -- dominion.games likely uses session cookies
- Fallback: Always check if logged in at test start and re-login if needed
- Alternative: Use a dedicated global setup that logs in, saves state, and tests reuse it

**Confidence:** MEDIUM -- userDataDir persistence works but has known edge cases on macOS. The login-check-and-retry pattern is more robust.

## Playwright Configuration

### playwright.config.ts (recommended structure)

```typescript
import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./e2e",
  timeout: 120_000,        // 2 minutes -- games take time to set up
  retries: 1,              // Retry once on flake (network issues, slow load)
  workers: 1,              // Serial execution -- one browser, one game at a time
  reporter: "list",        // Simple output for local dev
  use: {
    trace: "retain-on-failure",   // Capture trace only on failures
    video: "retain-on-failure",   // Record video only on failures
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium-extension",
      use: {
        // No standard 'use' options here -- extension tests
        // use custom fixtures that call launchPersistentContext directly
      },
    },
  ],
});
```

### Custom Test Fixture (core pattern)

```typescript
import { test as base, chromium, type BrowserContext, type Page } from "@playwright/test";
import path from "path";

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
  gamePage: Page;
  sidePanelPage: Page;
}>({
  // Override default context with persistent context + extension
  context: async ({}, use) => {
    const pathToExtension = path.resolve(__dirname, "../dist");
    const context = await chromium.launchPersistentContext("", {
      channel: "chromium",
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    await use(context);
    await context.close();
  },
  // Extract extension ID from service worker URL
  extensionId: async ({ context }, use) => {
    let [serviceWorker] = context.serviceWorkers();
    if (!serviceWorker) {
      serviceWorker = await context.waitForEvent("serviceworker");
    }
    const extensionId = serviceWorker.url().split("/")[2];
    await use(extensionId);
  },
  // Game page navigated to dominion.games
  gamePage: async ({ context }, use) => {
    const page = await context.newPage();
    await page.goto("https://dominion.games");
    await use(page);
  },
  // Side panel opened as extension page in a tab
  sidePanelPage: async ({ context, extensionId }, use) => {
    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/sidepanel.html`);
    await use(page);
  },
});

export const expect = test.expect;
```

## Handling dominion.games (Angular Application)

### Locator Strategy

dominion.games is an Angular application. Key considerations:

| Challenge | Solution | Rationale |
|-----------|----------|-----------|
| Angular renders DOM asynchronously | Use Playwright's built-in auto-wait (locator API) | Playwright automatically waits for elements to be visible/stable before acting. No need for `waitForAngular()` or `protractor`-style helpers. |
| Custom Angular elements (e.g., `KINGDOM-VIEWER`) | Use CSS selectors directly: `page.locator('KINGDOM-VIEWER .kingdom-viewer')` | Playwright handles custom elements natively. The extension already uses these selectors. |
| No `data-testid` attributes (third-party site) | Use structural CSS selectors matching what the extension uses | We cannot add test IDs to dominion.games. Use the same selectors the extension's observer.ts uses. |
| Network never fully idle (WebSocket, polling) | Never use `waitForLoadState('networkidle')` | Angular apps with WebSocket connections will cause `networkidle` to hang. Wait for specific DOM elements instead. |
| Page transitions within SPA | Wait for specific elements, not navigation events | Angular router changes don't trigger full page loads. Use `page.waitForSelector()` or locator assertions. |

### Waiting Strategy

```typescript
// GOOD: Wait for specific game UI elements
await page.locator(".game-log").waitFor({ state: "visible", timeout: 30000 });

// GOOD: Use locator assertions with auto-retry
await expect(page.locator("KINGDOM-VIEWER .name-layer .text-fitter-node")).toHaveCount(10, { timeout: 10000 });

// BAD: Never do this with Angular
await page.waitForLoadState("networkidle");  // Will hang or timeout
```

## File Structure

```
dominionhelper/
  e2e/                          # E2E test directory (separate from tests/)
    fixtures.ts                 # Custom test fixture with persistent context
    pages/                      # Page Object Models
      login-page.ts             # Login flow automation
      lobby-page.ts             # Table creation, bot setup
      game-page.ts              # Game interaction, log reading
      side-panel-page.ts        # Side panel DOM reading
    helpers/
      selectors.ts              # Centralized CSS selectors for dominion.games
    specs/                      # Test files
      setup.spec.ts             # Extension loads, login works
      kingdom.spec.ts           # Kingdom detection + analysis verification
      tracker.spec.ts           # Deck tracker accuracy tests
  playwright.config.ts          # Playwright configuration
  .env                          # Credentials (gitignored)
  .env.example                  # Template for required env vars (committed)
```

## NPM Scripts

```json
{
  "test:e2e": "npm run build && npx playwright test",
  "test:e2e:headed": "npx playwright test --headed",
  "test:e2e:debug": "npx playwright test --debug",
  "test:e2e:ui": "npx playwright test --ui"
}
```

## Installation

```bash
# E2E testing dependencies (all dev dependencies)
npm install -D @playwright/test dotenv

# Install Playwright browsers (downloads bundled Chromium)
npx playwright install chromium
```

**Do NOT install:**
- `playwright` separately -- `@playwright/test` includes it
- `puppeteer` -- Playwright replaces it with better extension support
- `selenium-webdriver` -- wrong paradigm entirely
- `protractor` -- deprecated Angular testing tool
- `cypress` -- cannot load Chrome extensions

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| E2E Framework | Playwright | Puppeteer | Puppeteer requires manual assertion library, no built-in test runner, no auto-wait. Playwright has dedicated extension support page in docs. |
| E2E Framework | Playwright | Cypress | Cypress fundamentally cannot load Chrome extensions -- it runs inside the browser, not as a controller. |
| E2E Framework | Playwright | Selenium/WebDriver | Heavy setup, no auto-wait, poor DX. Playwright is the modern standard. |
| Side panel access | Direct page.goto() | PW_CHROMIUM_ATTACH_TO_OTHER | Undocumented internal flag, requires test-only production code hooks, fragile. Direct navigation is simpler and more reliable. |
| Env vars | dotenv | cross-env + inline vars | dotenv is simpler for file-based config. Playwright docs explicitly recommend it. |
| Browser | Bundled Chromium | System Chrome (channel: 'chrome') | Chrome removed --load-extension flag. Extensions only work with bundled Chromium. |
| Test location | Separate e2e/ directory | Inside tests/ alongside unit tests | Unit tests (Vitest) and E2E tests (Playwright) use completely different runners. Mixing them in one directory causes config confusion. |

## Version Compatibility Matrix

| Package | Min Version | Reason |
|---------|-------------|--------|
| @playwright/test | 1.57.0+ | Chrome for Testing builds, new headless mode for extensions |
| Node.js | 18+ | Playwright 1.57+ requires Node 18 minimum |
| TypeScript | 5.0+ | Playwright types require modern TS (project already at 5.9.3) |
| Chrome Extension | Manifest V3 | Playwright 1.55+ dropped Manifest V2 support |

## Key Constraints and Gotchas

1. **One worker only.** Extension tests share a single persistent context. Running multiple workers would launch multiple Chromium instances, and dominion.games may not support concurrent sessions on one account.

2. **Build before test.** The `dist/` directory must exist and be current. The extension loads from `dist/`, not `src/`. Always run `npm run build` first.

3. **Extension ID is dynamic.** Never hardcode the extension ID. Extract it at runtime from the service worker URL. The ID changes per profile/machine.

4. **No Firefox/WebKit.** Extension tests are Chromium-only by definition. Do not configure other browsers in playwright.config.ts for extension tests.

5. **Headed mode for debugging.** Use `--headed` flag or `headless: false` in fixture when debugging. The Playwright UI mode (`--ui`) and trace viewer are invaluable for diagnosing Angular timing issues.

6. **dominion.games selectors may change.** The site is a third-party Angular app. Selectors can break without notice. Centralize all selectors in a single file for easy maintenance.

7. **Random kingdoms.** dominion.games picks random kingdom cards. Tests must verify generic behaviors (deck count = 10 at start, hand size = 5 after draw) rather than specific card names.

## Sources

- [Playwright Chrome Extensions (official docs)](https://playwright.dev/docs/chrome-extensions) -- HIGH confidence
- [Playwright Release Notes](https://playwright.dev/docs/release-notes) -- HIGH confidence
- [Playwright Test Configuration](https://playwright.dev/docs/test-configuration) -- HIGH confidence
- [Playwright Parameterize Tests / env vars](https://playwright.dev/docs/test-parameterize) -- HIGH confidence
- [Playwright Browsers](https://playwright.dev/docs/browsers) -- HIGH confidence
- [Playwright Authentication](https://playwright.dev/docs/auth) -- HIGH confidence
- [Playwright Locators](https://playwright.dev/docs/locators) -- HIGH confidence
- [Playwright Side Panel Issue #26693](https://github.com/microsoft/playwright/issues/26693) -- HIGH confidence
- [Chrome sidePanel API Reference](https://developer.chrome.com/docs/extensions/reference/api/sidePanel) -- HIGH confidence
- [BrowserStack: Playwright Chrome Extension Testing](https://www.browserstack.com/guide/playwright-chrome-extension) -- MEDIUM confidence

---

*Stack research: 2026-03-17*
