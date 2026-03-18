# Phase 1: Test Harness - Research

**Researched:** 2026-03-17
**Domain:** Playwright E2E testing for Chrome extensions (Manifest V3)
**Confidence:** HIGH

## Summary

Playwright has first-class support for testing Chrome extensions via `chromium.launchPersistentContext()`. Extensions require a persistent browser context and must be loaded at browser launch time via `--disable-extensions-except` and `--load-extension` args. The extension ID is extracted dynamically from the service worker URL (`serviceWorker.url().split('/')[2]`). The `channel: 'chromium'` option enables extensions to run in headless mode using Chrome's new headless architecture.

The side panel cannot be opened programmatically through Playwright (there is no API for `chrome.sidePanel.open()`), but the official Playwright docs demonstrate testing extension UI pages by navigating directly to `chrome-extension://<id>/page.html` in a regular tab. This matches the approach specified in HARNESS-04. The side panel HTML renders identically whether opened as a side panel or navigated to in a tab, because it is standard HTML/CSS/JS.

The project already uses Vitest for unit tests. Playwright E2E tests will live in a separate directory (`e2e/`) with their own config file (`playwright.config.ts`), keeping the two test suites completely independent per DX-01.

**Primary recommendation:** Use the official Playwright Chrome extension fixture pattern with `channel: 'chromium'`, a `globalSetup` that runs `npm run build`, and custom fixtures for `context`, `extensionId`, `gamePage`, and `sidePanelPage`.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HARNESS-01 | Playwright config loads built extension via persistent browser context with `channel: 'chromium'` | Official Playwright docs show exact pattern with `launchPersistentContext` and `channel: 'chromium'` -- see Architecture Patterns |
| HARNESS-02 | Test fixture extracts dynamic extension ID from service worker URL | Official docs show `serviceWorker.url().split('/')[2]` pattern -- see Code Examples |
| HARNESS-03 | Test fixture provides game page handle (dominion.games tab) | Custom fixture creates a page via `context.newPage()` and navigates to dominion.games -- see Architecture Patterns |
| HARNESS-04 | Test fixture provides side panel page handle (navigated to `chrome-extension://<id>/sidepanel.html`) | Official docs show `page.goto('chrome-extension://${extensionId}/popup.html')` pattern; same approach works for sidepanel.html -- see Code Examples |
| HARNESS-05 | Extension builds automatically before E2E test suite runs (`npm run build`) | Use `globalSetup` with `execSync('npm run build')` -- see Architecture Patterns |
| HARNESS-06 | Smoke test proves extension loads, service worker starts, and side panel renders | Service worker presence verified via `context.serviceWorkers()`, side panel content verified via standard Playwright assertions on navigated page -- see Code Examples |
| DX-01 | E2E tests run via `npm run test:e2e` (separate from `npm test` unit tests) | Separate `playwright.config.ts` in project root, new npm script, tests in `e2e/` directory |
| DX-02 | Tests run serially (`workers: 1`) since one account can only be in one game | Playwright config supports `workers: 1` directly |
| DX-04 | Tests support headed mode via `--headed` flag for visual debugging | Playwright CLI natively supports `--headed`; fixture reads `headless` from `use` options to pass to `launchPersistentContext` |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @playwright/test | 1.58.2 | E2E test framework with Chrome extension support | Official Playwright docs demonstrate Chrome extension testing; only framework with `launchPersistentContext` for extensions |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| dotenv | 17.3.1 | Load `.env` credentials for future phases | Phase 2+ needs DOMINION_USER/DOMINION_PASS; install now to avoid re-touching config later |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @playwright/test | puppeteer | Playwright has better test runner, fixtures, assertions, and official extension docs |
| @playwright/test | selenium-webdriver | Playwright is faster, modern, TypeScript-native, better DX |
| dotenv | hardcoded env vars | dotenv is the standard pattern; credentials must not be committed |

**Installation:**
```bash
npm install --save-dev @playwright/test dotenv
npx playwright install chromium
```

**Version verification:** `@playwright/test` 1.58.2 confirmed via `npm view` on 2026-03-17. `dotenv` 17.3.1 confirmed via `npm view` on 2026-03-17.

## Architecture Patterns

### Recommended Project Structure
```
e2e/
├── fixtures.ts          # Custom Playwright fixtures (context, extensionId, pages)
├── global-setup.ts      # Runs npm run build before test suite
├── smoke.spec.ts        # HARNESS-06 smoke test
playwright.config.ts     # Playwright config (separate from vite.config.ts)
```

### Pattern 1: Extension Fixture with Persistent Context
**What:** Custom Playwright fixtures that launch Chrome with the built extension loaded, extract the extension ID, and provide pre-configured page handles.
**When to use:** Every E2E test that needs the extension loaded.
**Example:**
```typescript
// Source: https://playwright.dev/docs/chrome-extensions
import { test as base, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  context: async ({ headless }, use) => {
    const pathToExtension = path.join(__dirname, 'dist');
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
  extensionId: async ({ context }, use) => {
    let [serviceWorker] = context.serviceWorkers();
    if (!serviceWorker)
      serviceWorker = await context.waitForEvent('serviceworker');
    const extensionId = serviceWorker.url().split('/')[2];
    await use(extensionId);
  },
});

export const expect = test.expect;
```

### Pattern 2: Global Setup for Pre-Build
**What:** A globalSetup script that runs `npm run build` before any test executes.
**When to use:** Always -- the extension must be built before loading into Chrome.
**Example:**
```typescript
// e2e/global-setup.ts
import { execSync } from 'child_process';

export default function globalSetup() {
  execSync('npm run build', { stdio: 'inherit' });
}
```

### Pattern 3: Side Panel Testing via Direct Navigation
**What:** Navigate to `chrome-extension://<id>/sidepanel.html` in a regular browser tab to test the side panel UI.
**When to use:** Whenever testing side panel rendering or behavior. Playwright cannot programmatically open the actual Chrome side panel, but the HTML renders identically in a tab.
**Example:**
```typescript
// Navigate to side panel page in a tab
const sidePanelPage = await context.newPage();
await sidePanelPage.goto(`chrome-extension://${extensionId}/sidepanel.html`);
await expect(sidePanelPage.locator('.dh-sidepanel')).toBeVisible();
```

### Pattern 4: Headed Mode Support via --headed Flag
**What:** The `--headed` flag on `npx playwright test` sets `use.headless = false`. Our custom fixture reads the `headless` option and passes it to `launchPersistentContext`.
**When to use:** Visual debugging during development.
**Example:**
```bash
npm run test:e2e -- --headed
```
The fixture destructures `{ headless }` from the fixture parameters (which Playwright populates from `use` config, which `--headed` overrides).

### Anti-Patterns to Avoid
- **Hardcoding extension ID:** Extension IDs are dynamic per profile/session. Always extract from service worker URL at runtime.
- **Using `context` fixture name collision:** The official docs override the `context` fixture directly, which works but means tests cannot use the default Playwright context. This is intentional for extension testing since a persistent context is required.
- **Using `webServer` for build step:** `webServer` expects a long-running server process with a URL to poll. Use `globalSetup` with `execSync` for one-shot build commands.
- **Using system Chrome (`channel: 'chrome'`):** The requirement specifies bundled Chromium. Use `channel: 'chromium'` to get Playwright's bundled browser, ensuring reproducibility.
- **Empty string for userDataDir:** Passing `''` (empty string) for `userDataDir` in `launchPersistentContext` creates a temporary directory that is cleaned up automatically. This is the correct approach -- do not use a fixed path like `/tmp/test-data` which causes stale state between runs.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Extension ID extraction | Regex parsing of manifest or chrome:// pages | `serviceWorker.url().split('/')[2]` | Official pattern; handles all edge cases |
| Build orchestration | Shell scripts or Makefile | Playwright `globalSetup` | Integrates with test lifecycle; runs only when tests run |
| Test assertions | Manual `if` checks with `throw` | `expect` from `@playwright/test` | Auto-retry, clear error messages, rich matchers |
| Browser lifecycle | Manual `chromium.launch()` + extension args | Playwright fixture with `launchPersistentContext` | Proper cleanup, worker scoping, test isolation |
| Waiting for service worker | `setTimeout` / polling loops | `context.waitForEvent('serviceworker')` | Event-driven; no arbitrary timeouts |

**Key insight:** Playwright's fixture system handles the entire browser lifecycle (launch, cleanup, worker scoping). Fighting it by managing browsers manually leads to leaked processes and flaky tests.

## Common Pitfalls

### Pitfall 1: Extension Not Loading (Wrong Path)
**What goes wrong:** Tests fail with "no service workers found" because the extension path points to `src/` instead of `dist/`.
**Why it happens:** The source manifest has `src/`-relative paths; only the built `dist/` manifest has correct paths for Chrome to load.
**How to avoid:** Always point `--load-extension` at the `dist/` directory. The `globalSetup` ensures `dist/` is fresh.
**Warning signs:** `context.serviceWorkers()` returns empty array; `waitForEvent('serviceworker')` times out.

### Pitfall 2: Service Worker Race Condition
**What goes wrong:** `context.serviceWorkers()` returns empty array even though extension loaded correctly.
**Why it happens:** The service worker hasn't registered yet when the test tries to read it.
**How to avoid:** Always use the pattern: `let [sw] = context.serviceWorkers(); if (!sw) sw = await context.waitForEvent('serviceworker');`
**Warning signs:** Tests pass intermittently; faster machines fail more often.

### Pitfall 3: Stale Build Artifacts
**What goes wrong:** Tests verify old behavior because `dist/` contains a previous build.
**Why it happens:** `globalSetup` failed silently or was skipped.
**How to avoid:** `globalSetup` uses `execSync` with `stdio: 'inherit'` so build errors are visible and fail the test run.
**Warning signs:** Tests pass but don't reflect recent code changes.

### Pitfall 4: Side Panel chrome.runtime APIs Fail in Tab Context
**What goes wrong:** Side panel JS calls `chrome.runtime.sendMessage()` which may behave differently when loaded in a regular tab vs actual side panel.
**Why it happens:** Extension pages loaded via `chrome-extension://` URL in a tab still have access to Chrome extension APIs. However, the `chrome.sidePanel` context may differ.
**How to avoid:** For Phase 1, the smoke test only needs to verify the HTML renders (DOM structure, visible text). Do not test message passing in the smoke test -- that requires a game tab sending messages, which is Phase 3+.
**Warning signs:** Console errors about `chrome.runtime` in the side panel page.

### Pitfall 5: Headed Mode Not Working
**What goes wrong:** `--headed` flag appears to have no effect; browser still runs headless.
**Why it happens:** The custom fixture doesn't read the `headless` option from Playwright's `use` config.
**How to avoid:** Destructure `{ headless }` in the fixture definition so Playwright passes the resolved value (which `--headed` overrides to `false`).
**Warning signs:** Running `npm run test:e2e -- --headed` doesn't show a browser window.

### Pitfall 6: TypeScript Config Conflict
**What goes wrong:** Playwright imports fail or `e2e/` files cause type errors in the main build.
**Why it happens:** The project's `tsconfig.json` includes `src/**/*.ts` and `tests/**/*.ts` but not `e2e/`. Playwright needs its own types.
**How to avoid:** Either extend `tsconfig.json` to include `e2e/` or (better) Playwright handles TS compilation internally via its own transformer -- no tsconfig changes needed if `e2e/` files only import from `@playwright/test`.
**Warning signs:** `npm run typecheck` fails on Playwright types; or Playwright test runner fails on project types.

## Code Examples

Verified patterns from official sources:

### Complete Fixture File (e2e/fixtures.ts)
```typescript
// Source: https://playwright.dev/docs/chrome-extensions (adapted for this project)
import { test as base, chromium, type BrowserContext, type Page } from '@playwright/test';
import path from 'path';

// Custom fixtures for Chrome extension E2E testing.
// Launches a persistent browser context with the built extension loaded,
// extracts the dynamic extension ID, and provides page handles for the
// game tab and side panel.
export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
  gamePage: Page;
  sidePanelPage: Page;
}>({
  // Override the default context with a persistent context that loads our extension.
  // Reads `headless` from Playwright's use config so --headed flag works.
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
  extensionId: async ({ context }, use) => {
    let [serviceWorker] = context.serviceWorkers();
    if (!serviceWorker) {
      serviceWorker = await context.waitForEvent('serviceworker');
    }
    const extensionId = serviceWorker.url().split('/')[2];
    await use(extensionId);
  },

  // A page navigated to dominion.games (for future phases).
  gamePage: async ({ context }, use) => {
    const page = await context.newPage();
    await page.goto('https://dominion.games');
    await use(page);
  },

  // A page navigated to the side panel HTML (tested as a regular tab).
  sidePanelPage: async ({ context, extensionId }, use) => {
    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/sidepanel.html`);
    await use(page);
  },
});

export const expect = test.expect;
```

### Playwright Config (playwright.config.ts)
```typescript
// Source: https://playwright.dev/docs/test-configuration
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup.ts',
  workers: 1,
  use: {
    channel: 'chromium',
  },
});
```

### Global Setup (e2e/global-setup.ts)
```typescript
import { execSync } from 'child_process';

// Builds the extension before the E2E test suite runs.
// The built dist/ directory is what Chrome loads as the extension.
export default function globalSetup() {
  execSync('npm run build', { stdio: 'inherit' });
}
```

### Smoke Test (e2e/smoke.spec.ts)
```typescript
import { test, expect } from './fixtures';

test.describe('Extension smoke test', () => {
  test('service worker is active', async ({ context }) => {
    const [serviceWorker] = context.serviceWorkers();
    expect(serviceWorker).toBeTruthy();
  });

  test('side panel renders content', async ({ sidePanelPage }) => {
    await expect(sidePanelPage.locator('.dh-sidepanel')).toBeVisible();
    await expect(sidePanelPage.locator('.dh-title')).toHaveText('Dominion Helper');
    // Verify tabs are present
    await expect(sidePanelPage.locator('.dh-tab')).toHaveCount(2);
    // Verify empty state is shown (no game data yet)
    await expect(sidePanelPage.locator('.dh-empty-state').first()).toBeVisible();
  });
});
```

### NPM Script (package.json)
```json
{
  "scripts": {
    "test:e2e": "npx playwright test"
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Old headless mode (no extension support) | New headless via `channel: 'chromium'` | Playwright 1.49 (2024) | Extensions now work in headless mode |
| Manifest V2 background pages | Manifest V3 service workers | Chrome 110 (2023) | Use `context.serviceWorkers()` not `context.backgroundPages()` |
| `headless: false` required | `channel: 'chromium'` enables headless | Playwright 1.49+ | Faster CI; no display server needed |
| Manual browser management | Playwright Test fixtures | Playwright 1.18+ | Automatic lifecycle, cleanup, parallel isolation |

**Deprecated/outdated:**
- `context.backgroundPages()`: Only for Manifest V2. This project uses Manifest V3 with service workers.
- `--headless=chromium` arg hack: No longer needed; `channel: 'chromium'` handles it natively.

## Open Questions

1. **gamePage fixture and dominion.games load behavior**
   - What we know: Phase 1 only needs the page handle to exist; login is Phase 2.
   - What's unclear: Whether `page.goto('https://dominion.games')` will redirect or show a login page. This doesn't affect Phase 1 since the smoke test doesn't need a logged-in game.
   - Recommendation: Create the `gamePage` fixture now but only assert it loaded (status 200). Phase 2 research will handle login selectors.

2. **Side panel JS errors in tab context**
   - What we know: The side panel JS calls `chrome.runtime.sendMessage` on init. These APIs are available in extension pages loaded as tabs.
   - What's unclear: Whether `chrome.runtime.sendMessage({ type: 'GET_ANALYSIS' })` will throw when no listener is ready, or silently return undefined.
   - Recommendation: The smoke test should verify DOM structure, not message passing. If console errors appear, they can be suppressed or ignored for Phase 1.

3. **TypeScript configuration for e2e/ directory**
   - What we know: Playwright has its own TS transformer and doesn't require files to be in tsconfig `include`.
   - What's unclear: Whether the project's `npm run typecheck` will complain about `e2e/` files being outside the include pattern.
   - Recommendation: Add `e2e/` to `tsconfig.json` exclude list, or create a separate `e2e/tsconfig.json` that extends the root config. Playwright's runner handles its own compilation.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | @playwright/test 1.58.2 |
| Config file | `playwright.config.ts` (to be created in Wave 0) |
| Quick run command | `npx playwright test` |
| Full suite command | `npx playwright test` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HARNESS-01 | Extension loads via persistent context with bundled Chromium | smoke | `npx playwright test e2e/smoke.spec.ts -x` | Wave 0 |
| HARNESS-02 | Extension ID extracted from service worker URL | smoke | `npx playwright test e2e/smoke.spec.ts -x` | Wave 0 |
| HARNESS-03 | Game page handle provided | smoke | `npx playwright test e2e/smoke.spec.ts -x` | Wave 0 |
| HARNESS-04 | Side panel page handle navigated to extension URL | smoke | `npx playwright test e2e/smoke.spec.ts -x` | Wave 0 |
| HARNESS-05 | Extension builds before tests via globalSetup | smoke | `npx playwright test e2e/smoke.spec.ts -x` | Wave 0 |
| HARNESS-06 | Smoke test verifies SW active + side panel renders | smoke | `npx playwright test e2e/smoke.spec.ts -x` | Wave 0 |
| DX-01 | `npm run test:e2e` runs Playwright (not Vitest) | manual | Verify `npm run test:e2e` launches Playwright | N/A |
| DX-02 | Tests run serially (workers: 1) | config | Verify `playwright.config.ts` has `workers: 1` | N/A |
| DX-04 | `--headed` flag opens visible browser | manual | `npm run test:e2e -- --headed` shows browser window | N/A |

### Sampling Rate
- **Per task commit:** `npx playwright test e2e/smoke.spec.ts -x`
- **Per wave merge:** `npx playwright test`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `playwright.config.ts` -- Playwright configuration file
- [ ] `e2e/fixtures.ts` -- Custom fixtures for extension testing
- [ ] `e2e/global-setup.ts` -- Pre-build step
- [ ] `e2e/smoke.spec.ts` -- Smoke test for HARNESS-06
- [ ] Framework install: `npm install --save-dev @playwright/test dotenv && npx playwright install chromium`
- [ ] NPM script: Add `"test:e2e": "npx playwright test"` to package.json

## Sources

### Primary (HIGH confidence)
- [Playwright Chrome Extensions docs](https://playwright.dev/docs/chrome-extensions) - Complete fixture pattern, service worker access, headless mode with `channel: 'chromium'`
- [Playwright Configuration docs](https://playwright.dev/docs/test-configuration) - Config options including workers, globalSetup, testDir
- [Playwright Global Setup docs](https://playwright.dev/docs/test-global-setup-teardown) - globalSetup pattern for pre-build
- [Playwright CLI docs](https://playwright.dev/docs/test-cli) - `--headed` flag documentation

### Secondary (MEDIUM confidence)
- [Playwright Issue #26693](https://github.com/microsoft/playwright/issues/26693) - Side panel not directly supported; tab navigation workaround confirmed
- [Playwright Issue #7447](https://github.com/microsoft/playwright/issues/7447) - launchPersistentContext with test fixtures patterns

### Tertiary (LOW confidence)
- [Railsware blog](https://railsware.com/blog/test-chrome-extensions/) - Additional extension testing patterns (verified against official docs)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Playwright docs prescribe exact pattern for Chrome extension testing
- Architecture: HIGH - Fixture pattern is from official docs; globalSetup is standard Playwright feature
- Pitfalls: HIGH - Service worker race condition and path issues are well-documented in community
- Side panel testing: MEDIUM - Tab navigation approach is a workaround (official side panel API not supported), but matches the approach specified in requirements

**Research date:** 2026-03-17
**Valid until:** 2026-04-17 (Playwright releases monthly but extension testing API is stable)
