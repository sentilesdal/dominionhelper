# Architecture Patterns

**Domain:** E2E testing infrastructure for Chrome extension (side panel + content script + service worker)
**Researched:** 2026-03-17

## Recommended Architecture

The E2E test suite has four architectural layers: a Playwright test harness that manages Chrome with the extension loaded, a game flow automation layer that drives dominion.games through login/table/game states, a side panel verification layer that reads extension UI state, and a shared fixtures/helpers layer that provides reusable test infrastructure.

### Architecture Overview

```
+--------------------------------------------------------------+
|  Playwright Test Runner (@playwright/test)                    |
|  +--------------------------------------------------------+  |
|  |  Custom Fixtures                                        |  |
|  |  - extensionContext (persistent, chromium channel)       |  |
|  |  - extensionId (from service worker URL)                |  |
|  |  - gamePage (dominion.games tab)                        |  |
|  |  - sidePanelPage (chrome-extension:// tab)              |  |
|  |  - serviceWorker (background script handle)             |  |
|  +--------------------------------------------------------+  |
|  +--------------------------------------------------------+  |
|  |  Page Object Models                                     |  |
|  |  - LoginPage (credentials, login form, lobby wait)      |  |
|  |  - LobbyPage (table creation, bot setup, game start)    |  |
|  |  - GamePage (log reading, turn actions, card playing)    |  |
|  |  - SidePanelPage (tab switching, tracker reading)       |  |
|  +--------------------------------------------------------+  |
|  +--------------------------------------------------------+  |
|  |  Test Specs                                             |  |
|  |  - kingdom-analysis.spec.ts                             |  |
|  |  - tracker-zones.spec.ts                                |  |
|  |  - tracker-counts.spec.ts                               |  |
|  +--------------------------------------------------------+  |
+--------------------------------------------------------------+
         |              |                |
         v              v                v
   +----------+  +------------+  +------------------+
   | Chrome   |  | dominion   |  | Side Panel Page  |
   | Service  |  | .games     |  | chrome-extension |
   | Worker   |  | (Angular)  |  | ://<id>/sidepanel|
   |          |  |            |  | .html            |
   +----------+  +------------+  +------------------+
```

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| Test Fixtures | Launch Chrome with extension, provide page handles, manage lifecycle | All components (creates/destroys them) |
| LoginPage POM | Fill credentials, submit login, wait for lobby | dominion.games page |
| LobbyPage POM | Create table, add bot, select card sets, start game | dominion.games page |
| GamePage POM | Read game log, detect turns, wait for game events, read DOM state | dominion.games page |
| SidePanelPage POM | Read kingdom analysis, read tracker data, switch tabs/players | Side panel extension page |
| Service Worker Handle | Evaluate JS in service worker context, read cached state | Chrome service worker |
| Test Specs | Orchestrate game flow, assert extension behavior | All POMs |

### Data Flow

**Test Initialization Flow:**

```
1. Fixture launches Chrome with --load-extension=dist/
2. Fixture waits for service worker -> extracts extension ID
3. Fixture opens dominion.games tab -> returns gamePage
4. Fixture opens chrome-extension://<id>/sidepanel.html tab -> returns sidePanelPage
5. Test uses LoginPage POM on gamePage to authenticate
```

**Game Flow (per test):**

```
1. LobbyPage.createTable() -> creates new table on dominion.games
2. LobbyPage.addBot() -> adds Lord Rattington as opponent
3. LobbyPage.startGame() -> waits for game board to load
4. GamePage.waitForKingdom() -> waits for kingdom cards to appear in DOM
5. SidePanelPage.waitForAnalysis() -> waits for kingdom analysis to render
6. GamePage.waitForTurn() -> waits for first turn
7. SidePanelPage.switchToTracker() -> clicks tracker tab
8. SidePanelPage.getTrackerState() -> reads deck/hand/discard counts
9. Assert: tracker state matches expected starting conditions
```

**Verification Flow (tracker accuracy):**

```
1. GamePage reads game log -> extracts what happened (drew 5 cards, etc.)
2. SidePanelPage reads tracker DOM -> extracts what extension thinks happened
3. Test compares: does the extension's view match the game's reality?
```

## The Side Panel Problem and Solution

**Confidence: HIGH** (verified via official Playwright docs, GitHub issue #26693, and Chrome extension API docs)

### The Problem

Playwright does not natively support opening Chrome's side panel UI. The `chrome.sidePanel.open()` API requires a user gesture (click), which Playwright cannot synthesize for the Chrome toolbar. This is a known limitation tracked in [microsoft/playwright#26693](https://github.com/microsoft/playwright/issues/26693), and the Playwright team has stated they are "not planning to work on it at the moment."

### The Solution: Direct Page Navigation

The side panel HTML (`sidepanel.html`) is a standard extension page. When opened via `page.goto('chrome-extension://<id>/sidepanel.html')`, it:

- Has full access to `chrome.runtime` API (same as when opened in the actual side panel)
- Can send and receive messages to/from the service worker
- Renders the same DOM as the actual side panel
- Receives `ANALYSIS_UPDATE` and `TRACKER_UPDATE` messages identically

This works because Chrome extension pages loaded via `chrome-extension://` URLs have the same runtime privileges regardless of whether they're in a tab, popup, or side panel. The only difference is the viewport dimensions and the CSS environment, neither of which matter for functional E2E testing.

**This is the primary strategy.** Open `sidepanel.html` in a separate tab and treat it as a regular Playwright page.

### Alternative: PW_CHROMIUM_ATTACH_TO_OTHER (Not Recommended)

Setting `process.env.PW_CHROMIUM_ATTACH_TO_OTHER = "1"` allows Playwright to discover non-standard pages like side panels. However, this requires:

1. A test-only message handler in the service worker that calls `chrome.sidePanel.open()` via user gesture
2. The `PW_CHROMIUM_ATTACH_TO_OTHER` environment variable (undocumented, internal Playwright flag)
3. Additional logic to find the side panel page among context pages

This adds unnecessary complexity and couples tests to an undocumented Playwright internal. **Use the direct navigation approach instead.**

## Patterns to Follow

### Pattern 1: Persistent Browser Context Fixture

**What:** A Playwright test fixture that launches Chrome with the extension loaded and provides reusable handles to the service worker, game page, and side panel page.

**Confidence: HIGH** (Playwright official docs)

**When:** Every E2E test needs this foundation.

**Example:**

```typescript
// e2e/fixtures.ts
import { test as base, chromium, BrowserContext, Page } from '@playwright/test';
import path from 'path';

const EXTENSION_PATH = path.resolve(__dirname, '..', 'dist');

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
  gamePage: Page;
  sidePanelPage: Page;
}>({
  // Override context to use persistent context with extension
  context: async ({}, use) => {
    const context = await chromium.launchPersistentContext('', {
      channel: 'chromium',
      args: [
        `--disable-extensions-except=${EXTENSION_PATH}`,
        `--load-extension=${EXTENSION_PATH}`,
      ],
    });
    await use(context);
    await context.close();
  },

  // Extract extension ID from service worker URL
  extensionId: async ({ context }, use) => {
    let [sw] = context.serviceWorkers();
    if (!sw) {
      sw = await context.waitForEvent('serviceworker');
    }
    // URL format: chrome-extension://<id>/service-worker.js
    const id = sw.url().split('/')[2];
    await use(id);
  },

  // Game page navigated to dominion.games
  gamePage: async ({ context }, use) => {
    const page = await context.newPage();
    await page.goto('https://dominion.games');
    await use(page);
  },

  // Side panel page opened as extension page in a tab
  sidePanelPage: async ({ context, extensionId }, use) => {
    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/sidepanel.html`);
    await use(page);
  },
});

export { expect } from '@playwright/test';
```

### Pattern 2: Page Object Model for Game Flow

**What:** Encapsulate dominion.games DOM interactions in reusable page objects. The Angular app uses custom elements (KINGDOM-VIEWER, PLAYER-INFO-NAME) that are stable selectors.

**Confidence: MEDIUM** (Angular app selectors verified from existing extension code; game flow selectors need discovery during implementation)

**When:** Any test that interacts with dominion.games needs these abstractions.

**Example:**

```typescript
// e2e/pages/login-page.ts
export class LoginPage {
  constructor(private page: Page) {}

  async login(username: string, password: string): Promise<void> {
    // Fill login form (selectors TBD during implementation)
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[data-test="login-button"]');
    // Wait for lobby to load (URL or element-based)
    await this.page.waitForSelector('.lobby-container', { timeout: 15000 });
  }
}
```

### Pattern 3: Service Worker State Inspection

**What:** Use the service worker handle to evaluate JavaScript directly in the service worker context, reading cached analysis or tracker state.

**Confidence: HIGH** (Playwright official docs)

**When:** When you need to verify the service worker's internal state without going through the UI.

**Example:**

```typescript
// Read cached analysis from service worker
const analysis = await serviceWorker.evaluate(() => {
  // This runs in the service worker's JS context
  // where currentAnalysis is a module-level variable
  return (globalThis as any).__testGetAnalysis?.();
});
```

Note: Since the service worker bundles as IIFE, module-level variables are not directly accessible. Either: (a) add a test-only global accessor in the service worker, or (b) use `chrome.storage.session` which the service worker already populates with `currentKingdom`. Strategy (b) is cleaner -- read from storage rather than injecting test hooks.

### Pattern 4: Wait-for-Message Pattern

**What:** Instead of polling the side panel DOM, wait for specific DOM changes that indicate the extension has processed new data.

**Confidence: HIGH** (Playwright auto-wait is well-documented)

**When:** After any game action that should trigger a tracker or analysis update.

**Example:**

```typescript
// e2e/pages/side-panel-page.ts
export class SidePanelPage {
  constructor(private page: Page) {}

  async waitForAnalysis(): Promise<void> {
    // Kingdom analysis renders sections with these CSS classes
    await this.page.waitForSelector('.dh-section.dh-kingdom', { timeout: 10000 });
  }

  async waitForTracker(): Promise<void> {
    // Tracker renders draw pile section
    await this.page.waitForSelector('.dh-section.dh-tracker-deck', { timeout: 10000 });
  }

  async getDeckCount(): Promise<number> {
    // Parse "Draw Pile (N cards)" from the section title
    const text = await this.page.textContent('.dh-tracker-deck .dh-section-title');
    const match = text?.match(/\((\d+)/);
    return match ? parseInt(match[1], 10) : -1;
  }

  async getHandCards(): Promise<Record<string, number>> {
    // Read card list items from the hand section
    const items = await this.page.$$eval(
      '.dh-tracker-hand .dh-card-list-item:not(.dh-empty-zone)',
      (els) => {
        const result: Record<string, number> = {};
        for (const el of els) {
          const match = el.textContent?.match(/(.+) x(\d+)/);
          if (match) result[match[1]] = parseInt(match[2], 10);
        }
        return result;
      }
    );
    return items;
  }
}
```

### Pattern 5: Generic Game Assertions (Random Kingdoms)

**What:** Since kingdoms are randomly selected, tests cannot assert specific card names. Instead, assert structural invariants: deck counts, zone transitions, card totals.

**Confidence: HIGH** (requirement from PROJECT.md)

**When:** All tracker verification tests.

**Example invariants:**

```typescript
// At game start (after initial draw of 5):
// - Deck should have 5 cards (10 starting - 5 drawn)
// - Hand should have 5 cards
// - Discard should have 0 cards
// - Total should be 10 cards (7 Copper, 3 Estate)

// After buying a card:
// - Total cards should increase by 1
// - The bought card should appear in discard

// After a shuffle:
// - Discard should be 0
// - Deck should have all non-hand, non-play cards
```

### Pattern 6: Centralized Selector Registry

**What:** A single file containing all CSS selectors used to interact with dominion.games and the extension UI. No selector string should appear directly in page objects or tests.

**Confidence: HIGH** (standard Page Object Model best practice)

**When:** Always.

**Why:** When dominion.games changes their DOM, you fix selectors in one file, not across every test and page object.

**Example:**

```typescript
// e2e/helpers/selectors.ts
export const SELECTORS = {
  // Known from extension source code (HIGH confidence)
  KINGDOM_VIEWER: 'KINGDOM-VIEWER .kingdom-viewer',
  CARD_NAME: '.name-layer .text-fitter-node',
  GAME_LOG: '.game-log',
  PLAYER_NAME: 'PLAYER-INFO-NAME',

  // Need discovery during implementation (LOW confidence)
  USERNAME_INPUT: 'TBD',
  PASSWORD_INPUT: 'TBD',
  LOGIN_BUTTON: 'TBD',
  NEW_TABLE_BTN: 'TBD',
  ADD_BOT_BTN: 'TBD',
  START_GAME_BTN: 'TBD',
  PLAY_TREASURES_BTN: 'TBD',
  END_TURN_BTN: 'TBD',

  // Extension side panel selectors (from sidepanel.ts)
  SIDE_PANEL_TAB_TRACKER: '.dh-tab-tracker',
  TRACKER_DECK: '.dh-tracker-deck',
  TRACKER_HAND: '.dh-tracker-hand',
  TRACKER_DISCARD: '.dh-tracker-discard',
  TRACKER_IN_PLAY: '.dh-tracker-in-play',
} as const;
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Hardcoded Card Assertions

**What:** Asserting specific card names in tracker tests (e.g., `expect(hand).toContain('Village')`).

**Why bad:** Kingdoms are randomly selected. The test will fail whenever the random kingdom doesn't include that card.

**Instead:** Assert structural invariants: zone sizes, card count totals, zone transition correctness. The test should work regardless of which 10 kingdom cards are selected.

### Anti-Pattern 2: Test-Only Hooks in Production Code

**What:** Adding `if (process.env.NODE_ENV === 'test')` branches or `__test__` globals to the extension source code.

**Why bad:** Pollutes production code, creates untested code paths, risks shipping test-only behavior.

**Instead:** Test through the real UI and messaging channels. The side panel opened as a tab receives the same messages as the actual side panel. If you must inspect internal state, use `chrome.storage.session` which is already populated.

### Anti-Pattern 3: Fixed Timeouts Instead of Waiting

**What:** Using `page.waitForTimeout(5000)` to wait for game state changes.

**Why bad:** Slow (always waits the full duration), flaky (sometimes not enough), untraceable (timeout failures don't tell you what didn't load).

**Instead:** Use Playwright's auto-wait with element selectors: `page.waitForSelector('.dh-tracker-deck')`. Use `page.waitForURL()` for navigation. Use `page.waitForFunction()` for complex conditions.

### Anti-Pattern 4: Using networkidle with Angular

**What:** Calling `page.waitForLoadState('networkidle')` after navigation.

**Why bad:** dominion.games uses WebSockets for real-time game communication and polling for state updates. The network is never idle. Tests will hang until timeout.

**Instead:** Wait for specific DOM elements that signal the page is ready. Use locator assertions with auto-retry.

### Anti-Pattern 5: Single Monolithic Test

**What:** One giant test that logs in, creates a game, plays 10 turns, and checks everything.

**Why bad:** Slow, fragile, hard to debug. A failure at turn 8 requires re-running the entire login/setup flow.

**Instead:** Use `test.describe.serial()` for tests that share game state within a suite. Share the login/setup across tests using fixtures with appropriate scope. But keep individual test assertions focused.

## Handling Multiple Extension Contexts

**Confidence: HIGH**

The extension operates across four isolated JavaScript contexts. Playwright interacts with them differently:

| Context | How Playwright Accesses It | What Tests Can Do |
|---------|---------------------------|-------------------|
| Content Script (ISOLATED) | `gamePage.evaluate()` runs in PAGE context, NOT content script | Cannot directly access content script variables. Instead, observe effects through DOM or messages. |
| Game State Bridge (MAIN) | `gamePage.evaluate()` runs in MAIN world | Can access Angular state via same globals the bridge uses. Useful for verifying ground truth. |
| Service Worker | `context.serviceWorkers()[0].evaluate()` | Can read cached state, evaluate JS in SW context. |
| Side Panel (as tab) | `sidePanelPage.locator()`, `sidePanelPage.evaluate()` | Full DOM access, click handlers, chrome.runtime calls. |

**Critical distinction:** `gamePage.evaluate()` runs in the page's MAIN world, not the content script's ISOLATED world. You cannot read content script variables from Playwright. This is by design -- test the extension's observable output (side panel DOM, messages) rather than its internal state.

## Handling dominion.games Game Flow

**Confidence: MEDIUM** (game flow known from extension development; exact selectors need discovery)

### Login Phase

dominion.games is an Angular single-page application. Login involves:

1. Navigate to `https://dominion.games`
2. Fill username/password in the login form
3. Submit and wait for the lobby view to load

Credentials come from `.env` file (`DOMINION_USER`, `DOMINION_PASS`), loaded via `dotenv`.

### Table Creation Phase

From the lobby:

1. Click "New Table" button
2. Configure settings (base set only for free accounts -- this is the default)
3. Add a bot opponent (Lord Rattington)
4. Click "Start Game"
5. Wait for the game board to render (KINGDOM-VIEWER element appears)

### Game Play Phase

The game is turn-based. Each turn has phases: Action, Buy, Cleanup. The game log (`.game-log`) records every action. Tests can:

- Wait for turn markers in the log (`"Turn N - PlayerName"`)
- Read what cards were drawn/played/bought from the log
- Let the bot play (it plays automatically)
- Optionally play cards by clicking on them (for specific action testing)

### DOM Selectors (Known from Extension Code)

These selectors are already proven stable by the extension itself:

| Element | Selector | Source |
|---------|----------|--------|
| Kingdom container | `KINGDOM-VIEWER .kingdom-viewer` | `observer.ts` |
| Card names | `.name-layer .text-fitter-node` | `observer.ts` |
| Game log | `.game-log` | `log-observer.ts` |
| Player name elements | `PLAYER-INFO-NAME` | `content.ts` |
| Card stacks (fallback) | `.card-stacks` | `observer.ts` |

Selectors for login form, lobby, and table creation are unknown and need discovery during implementation.

## Headless vs Headed Mode

**Confidence: HIGH** (verified from [official Playwright docs](https://playwright.dev/docs/chrome-extensions))

As of Playwright 1.57+, extensions CAN run in headless mode when using `channel: 'chromium'`. The official docs state: "Note the use of the chromium channel that allows to run extensions in headless mode."

The `channel: 'chromium'` option uses Playwright's bundled Chromium with the "new headless mode" which is the full Chrome browser running without a visible window. This supports extensions, unlike the old headless shell (`chrome-headless-shell`).

**Recommendation:** Default to headless for speed. Use `--headed` flag or `headless: false` for debugging. The Playwright UI mode (`--ui`) and trace viewer are invaluable for diagnosing timing issues.

## Suggested File Structure

```
e2e/
+-- fixtures.ts              # Playwright fixtures (context, extensionId, pages)
+-- pages/                   # Page Object Models
|   +-- login-page.ts        # Login flow automation
|   +-- lobby-page.ts        # Table creation, bot setup
|   +-- game-page.ts         # Game interaction, log reading
|   +-- side-panel-page.ts   # Side panel DOM reading
+-- helpers/                 # Shared utilities
|   +-- selectors.ts         # Centralized CSS selectors
|   +-- game-state.ts        # Log parsing helpers for test assertions
+-- specs/                   # Test files
    +-- setup.spec.ts        # Login + table creation smoke test
    +-- kingdom.spec.ts      # Kingdom detection + analysis verification
    +-- tracker.spec.ts      # Deck tracker accuracy tests

playwright.config.ts         # E2E-specific Playwright config (at project root)
.env                         # DOMINION_USER, DOMINION_PASS (gitignored)
.env.example                 # Template for required env vars (committed)
```

## Suggested Build Order

Build the infrastructure bottom-up, validating each layer before building on it:

**Phase 1: Harness** (build first -- everything depends on this)
- Playwright config with persistent context
- Extension loading fixture
- Service worker extraction + extension ID
- Side panel page navigation (`chrome-extension://<id>/sidepanel.html`)
- Smoke test: extension loads, service worker starts, side panel page renders

**Phase 2: Game Flow Automation** (build second -- tests need a game to verify)
- Login page object (selector discovery required)
- Lobby page object (selector discovery required)
- Table creation with bot
- Game start detection (wait for KINGDOM-VIEWER)
- Smoke test: can log in, create table, start game

**Phase 3: Kingdom Verification** (build third -- simpler than tracker, proves the pipeline)
- SidePanelPage reads analysis sections
- Wait for ANALYSIS_UPDATE to propagate
- Assert: kingdom detected, synergies rendered, archetypes present
- Validates: content script -> service worker -> side panel messaging chain

**Phase 4: Tracker Verification** (build last -- most complex, depends on everything)
- GamePage reads game log for ground truth
- SidePanelPage reads tracker sections
- Assert: zone counts match expectations
- Assert: card totals remain consistent across turns
- Validates: log parsing -> deck state -> tracker data -> side panel rendering

**Rationale:** Each phase validates the next layer's dependencies. If the harness doesn't work, game flow tests are meaningless. If game flow doesn't work, there's no game to verify the extension against.

## Scalability Considerations

| Concern | Current (local dev) | Future (CI) |
|---------|-------------------|-------------|
| Browser mode | Headless with chromium channel (default) | Same, or Xvfb for headed if needed |
| Credentials | `.env` file, gitignored | CI secrets / environment variables |
| Parallelism | Serial (one game at a time per account) | Multiple accounts or serial execution |
| Flakiness | Retries: 1 in config | Retries: 2, add trace analysis |
| Speed | ~30-60s per test (includes game setup) | Acceptable for nightly/pre-merge runs |
| Game state | Fresh table per test suite | Same (tables are disposable) |

## Sources

- [Playwright Chrome Extensions Documentation](https://playwright.dev/docs/chrome-extensions) -- HIGH confidence, official docs
- [Playwright GitHub Issue #26693: Side Panel Support](https://github.com/microsoft/playwright/issues/26693) -- HIGH confidence, primary source for workarounds
- [Playwright Browsers Documentation](https://playwright.dev/docs/browsers) -- HIGH confidence, headless mode details
- [Chrome sidePanel API Reference](https://developer.chrome.com/docs/extensions/reference/api/sidePanel) -- HIGH confidence, official Chrome docs
- [E2E Tests for Chrome Extensions Using Playwright and CDP](https://dev.to/corrupt952/how-i-built-e2e-tests-for-chrome-extensions-using-playwright-and-cdp-11fl) -- MEDIUM confidence, community reference
- [BrowserStack: How to Automate Tests for Chrome Extensions](https://www.browserstack.com/guide/playwright-chrome-extension) -- MEDIUM confidence, third-party guide
- [Playwright Auto-Waiting Documentation](https://playwright.dev/docs/actionability) -- HIGH confidence, official docs

---

*Architecture analysis: 2026-03-17*
