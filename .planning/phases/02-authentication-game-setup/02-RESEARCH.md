# Phase 2: Authentication & Game Setup - Research

**Researched:** 2026-03-18
**Domain:** Playwright E2E testing against live AngularJS web app (dominion.games)
**Confidence:** MEDIUM

## Summary

Phase 2 requires logging into dominion.games, creating a table with the Lord Rattington bot, starting a game, and detecting turn transitions. Research into existing open-source extensions (LogDog, command.games) confirms that dominion.games is built with **AngularJS 1.x** (not vanilla JS as previously noted in ADR-001). The site uses `ng-if`, `ng-repeat`, `ng-bind-html`, and `angular.element()` is accessible from the page's main world JavaScript context. Game state is communicated via **WebSocket** connections. The game log DOM element (`.game-log`) contains turn markers in the format `Turn N - PlayerName`.

Critically, Playwright's `page.evaluate()` executes in the **main world** of the page, which means it CAN access `window.angular`, `angular.element()`, and AngularJS scopes/services directly. The Chrome extension's content script runs in an isolated world and does NOT interfere with this access. This enables the "Angular-first" testing approach specified in CONTEXT.md.

**Primary recommendation:** Use a hybrid approach: DOM selectors for login form interaction (no alternative), `page.on('websocket')` for monitoring game state transitions, `page.evaluate()` with `angular.element()` for reading Angular scope data, and game log DOM parsing for turn detection.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Store credentials in `.env` file with `DOMINION_USER` and `DOMINION_PASS`
- Commit `.env.example` with placeholder values; `.env` is gitignored
- Only these two vars for now -- add more when needed
- Separate `e2e/env-setup.ts` file handles dotenv loading and validation (not in global-setup.ts)
- `e2e/global-setup.ts` chains: env-setup (validate creds) -> build extension
- Validation is env-var-existence check only -- no network request
- All E2E tests require credentials (including smoke tests from Phase 1)
- When credentials are missing, skip tests with clear message via `test.skip()`
- No auth state caching -- fresh login each test run (EXT-04 defers caching to v2)
- **CRITICAL DECISION:** Avoid DOM selectors wherever possible. Prefer Angular framework state, API response interception, and Angular service methods
- Use `page.evaluate()` to access Angular scope/services from Playwright
- Use `page.on('response')` or `page.route()` to intercept API responses for state detection
- DOM selectors are last resort only -- when no Angular state or API signal exists
- Check if already logged in first before attempting login (handle cached session edge case)
- Verify login success via API response -- do not check lobby DOM
- `authenticatedPage` fixture wraps `gamePage` with login logic
- Fixture handles retry internally (1 retry on login failure, then throws)
- Playwright config: 1 retry for auth spec tests specifically (network flakiness)
- Login timeout: 30 seconds
- On failure: capture screenshot, fail with clear error message
- Isolated login test (GAME-01) separate from full flow test (GAME-02/03/04)
- Auth tests in `e2e/auth.spec.ts` (separate from `e2e/smoke.spec.ts`)
- Default game settings -- just add Lord Rattington as opponent and start
- Random kingdom is fine (no specific card sets needed)
- Research API-based table creation -- prefer programmatic over UI button clicks
- Detect game start: intercept game-start API response for timing, read Angular state for kingdom data
- Verify exactly 10 kingdom cards from the game data (GAME-03 success criterion)
- Intercept turn-change API/WebSocket messages for timing, verify with Angular game state
- Event-driven waiting -- no arbitrary delays or setTimeout
- Reusable `waitForMyTurn(page)` helper function for Phase 4 reuse
- 30-second timeout for bot turn -- fail with screenshot if exceeded
- Lord Rattington plays instantly, so turn detection should be near-immediate
- `e2e/auth.spec.ts` -- login test (GAME-01) + full game setup flow (GAME-02/03/04)
- `e2e/fixtures.ts` -- add `authenticatedPage` fixture
- `e2e/helpers/` -- `waitForMyTurn(page)` and other reusable game helpers

### Claude's Discretion
- Exact Angular state access patterns (depends on version found during research)
- API endpoint discovery approach (devtools recording, source inspection, etc.)
- Helper function signatures and internal implementation
- How to handle edge cases in table creation flow
- Whether WebSocket or polling interception patterns are used

### Deferred Ideas (OUT OF SCOPE)
- Auth state caching to skip login on subsequent runs -- deferred to EXT-04 (v2)
- Specific card set selection for reproducible kingdoms -- not needed for random testing approach
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| GAME-01 | Tests log into dominion.games using credentials from `.env` file | Credential management via dotenv (already installed), login flow via DOM form + API response verification, `authenticatedPage` fixture pattern |
| GAME-02 | Tests create a table with a bot opponent (Lord Rattington) | Lobby interaction via `.tab-button`, `.lobby-button`, `.lobby-button.kingdom-selection` selectors (verified from LogDog/command.games), AngularJS `dispatchEvent` pattern for form inputs |
| GAME-03 | Tests start a game and wait for kingdom viewer (10 kingdom cards) | Kingdom detection via `.kingdom-viewer-group .full-card-name.card-name` selectors (verified), or Angular scope state, WebSocket game-start message interception |
| GAME-04 | Tests detect when bot's turn is complete and human player's turn begins | Game log turn markers (`Turn N - PlayerName` in `.game-log`), WebSocket frame monitoring via `page.on('websocket')`, `waitForMyTurn()` helper |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @playwright/test | 1.58.2 | E2E test framework | Already installed, Chrome extension support via persistent context |
| dotenv | 17.3.1 | Credential loading from .env | Already installed as devDependency |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none new) | -- | -- | All needed dependencies already installed |

**No new dependencies needed.** Both `@playwright/test` and `dotenv` are already in `devDependencies`.

**Installation:** N/A -- all dependencies are already installed.

## Architecture Patterns

### Recommended File Structure
```
e2e/
├── fixtures.ts           # Extended with authenticatedPage fixture
├── global-setup.ts       # Updated to chain env-setup before build
├── env-setup.ts          # NEW: dotenv loading + credential validation
├── helpers/
│   └── game.ts           # NEW: waitForMyTurn(), game interaction helpers
├── smoke.spec.ts         # Existing (must continue to pass)
└── auth.spec.ts          # NEW: login + game setup tests
```

### Pattern 1: AngularJS State Access via page.evaluate()

**What:** Access AngularJS scope and services from Playwright using the main world JS context.
**When to use:** Reading game state, checking login status, verifying Angular model data.
**Confidence:** MEDIUM -- Verified that dominion.games uses AngularJS 1.x (confirmed by `angular.element()`, `ng-if`, `ng-repeat`, `ng-bind-html` attributes found in LogDog source and command.games source). `page.evaluate()` runs in the main world where `window.angular` is available.

**Key technique:** AngularJS exposes scope via `angular.element(domElement).scope()` and services via `angular.element(document).injector().get('serviceName')`.

```typescript
// Source: AngularJS debugging patterns + Playwright evaluate docs
// Access Angular scope from a DOM element
const scopeData = await page.evaluate(() => {
  const el = document.querySelector('.some-angular-element');
  if (!el || !window.angular) return null;
  const scope = window.angular.element(el).scope();
  return scope ? scope.someProperty : null;
});

// Access Angular service
const serviceData = await page.evaluate(() => {
  if (!window.angular) return null;
  const injector = window.angular.element(document).injector();
  if (!injector) return null;
  const service = injector.get('someService');
  return service.someMethod();
});
```

**Critical caveat for content script isolation:** Playwright's `page.evaluate()` runs in the MAIN world (where AngularJS lives). The Chrome extension's content script runs in an ISOLATED world. These do not interfere with each other. `page.evaluate()` CAN access `window.angular` directly.

### Pattern 2: WebSocket Frame Monitoring

**What:** Listen to WebSocket messages for game state changes (game start, turn transitions).
**When to use:** Detecting game start, turn changes, and other real-time game events.
**Confidence:** MEDIUM -- dominion.games confirmed to use WebSocket (ADR-001), but protocol is proprietary and undocumented.

```typescript
// Source: Playwright WebSocket docs (https://playwright.dev/docs/api/class-websocket)
// Monitor WebSocket for game state messages
page.on('websocket', ws => {
  ws.on('framereceived', event => {
    // Log frames to discover protocol format
    console.log('WS received:', event.payload);
  });
});

// Wait for a specific WebSocket frame matching a predicate
async function waitForWsMessage(page: Page, predicate: (payload: string) => boolean, timeout = 30000): Promise<string> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('WebSocket message timeout')), timeout);
    const handler = (ws: WebSocket) => {
      ws.on('framereceived', event => {
        if (predicate(String(event.payload))) {
          clearTimeout(timer);
          resolve(String(event.payload));
        }
      });
    };
    page.on('websocket', handler);
  });
}
```

### Pattern 3: Game Log DOM Parsing for Turn Detection

**What:** Parse the `.game-log` element for turn markers to detect whose turn it is.
**When to use:** Primary turn detection mechanism (simpler and more reliable than WebSocket protocol parsing).
**Confidence:** HIGH -- Verified from LogDog source code. Turn format: `Turn N - PlayerName`.

```typescript
// Source: LogDog contentScript.js + background.js
// Turn markers in the game log follow this pattern:
// English: "Turn 1 - PlayerName", German: "Zug 1 - PlayerName"
// French: "Tour 1 - PlayerName", Russian: "Ход 1 - PlayerName"

// Detect current turn owner from game log
async function getCurrentTurnInfo(page: Page): Promise<{ turn: number; player: string } | null> {
  return page.evaluate(() => {
    const log = document.querySelector('.game-log');
    if (!log) return null;
    const text = log.innerText;
    // Match the LAST turn marker in the log
    const regex = /(?:Turn|Zug|Tour|Ход) (\d+) - (.+?)(?:\n|$)/g;
    let match;
    let lastMatch = null;
    while ((match = regex.exec(text)) !== null) {
      lastMatch = match;
    }
    if (!lastMatch) return null;
    return { turn: parseInt(lastMatch[1]), player: lastMatch[2].trim() };
  });
}
```

### Pattern 4: Credential Management and Test Skipping

**What:** Load credentials from `.env`, validate existence, skip tests when missing.
**When to use:** Every E2E test run.
**Confidence:** HIGH -- Standard dotenv pattern.

```typescript
// e2e/env-setup.ts
// Source: dotenv standard pattern
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export function validateCredentials(): { user: string; pass: string } | null {
  const user = process.env.DOMINION_USER;
  const pass = process.env.DOMINION_PASS;
  if (!user || !pass) return null;
  return { user, pass };
}
```

### Pattern 5: Lobby Interaction Flow (DOM-Based)

**What:** Navigate the dominion.games lobby to create a table with Lord Rattington.
**When to use:** GAME-02 (table creation) and GAME-03 (game start).
**Confidence:** HIGH -- Verified from two independent open-source extensions (LogDog and command.games).

The lobby flow based on real extension source code:

1. **Navigate to New Table tab:** Click `.tab-button` at index 1 (text: "New Table")
2. **Create Table:** Click `.lobby-button` (the "Create Table" or "New Table" button at index 0)
3. **Add Bot:** Click `.lobby-button.kingdom-selection` at index 0 (adds Lord Rattington when `parentElement.ariaHidden == "false"`)
4. **Start Game:** Click the start/ready button

**Important DOM selectors verified from source code:**
- `.tab-button` -- lobby navigation tabs (index 1 = "New Table")
- `.lobby-button` -- action buttons in lobby
- `.lobby-button.kingdom-selection` -- buttons in the kingdom/player setup area
- `.table-rule-text-input` -- text inputs in table creation
- `.kingdom-viewer-group` -- container for kingdom card groups
- `.full-card-name.card-name` -- individual kingdom card name elements
- `.game-log` -- game log container
- `.opponent-name` -- opponent name elements (with VP counter)
- `ng-pristine ng-untouched ng-empty ng-valid ng-valid-required` -- AngularJS form input classes
- `.lobby-button.toggle-button` -- toggle buttons (colonies/shelters)
- `.landscape-name:not(.unselectable)` -- landscape card names

**AngularJS-specific selectors:**
- `div[ng-if="lobby.tab.userPrefTab"]` -- user preferences tab
- `angular.element()` -- for triggering AngularJS change events on form inputs
- `dispatchEvent(new Event('change'))` -- trigger AngularJS model updates

### Anti-Patterns to Avoid
- **Arbitrary setTimeout chains:** LogDog uses nested `setTimeout(fn, 567)` -- this is fragile. Use Playwright's `waitForSelector()`, `waitForResponse()`, or `expect.poll()` instead.
- **Index-based element selection without validation:** `getElementsByClassName('lobby-button')[1]` -- indexes can shift. Prefer text-based locators like `page.getByRole('button', { name: 'New Table' })` or combine class + text.
- **Polling the DOM in a timer:** LogDog uses `setInterval(checkLog, 1000)` -- use `page.on('websocket')` or Playwright's built-in waiting mechanisms instead.
- **Ignoring AngularJS digest cycle:** After programmatically changing input values, must trigger AngularJS change detection via `dispatchEvent(new Event('change'))` or `angular.element(el).triggerHandler('change')`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Waiting for DOM elements | Custom polling/setTimeout | `page.waitForSelector()` or `page.locator().waitFor()` | Built-in auto-retry with configurable timeout |
| Waiting for network | Custom response listeners | `page.waitForResponse()` | Playwright handles race conditions |
| Waiting for WebSocket messages | Custom Promise + event listener | `ws.waitForEvent('framereceived', predicate)` | Built-in timeout and predicate support |
| Credential loading | Manual fs.readFile + parse | `dotenv.config()` | Already installed, handles edge cases |
| Screenshot on failure | Manual try/catch + screenshot | Playwright's built-in `screenshot: 'only-on-failure'` in config | Automatic, no test code needed |
| Element text matching | Custom DOM queries | `page.getByText()`, `page.getByRole()` | Auto-waiting, less brittle than class selectors |

**Key insight:** Playwright's auto-waiting and locator APIs eliminate most of the fragile patterns seen in LogDog/command.games. The `page.locator()` API retries automatically until elements match, which is far more reliable than the `setTimeout` chains used by existing extensions.

## Common Pitfalls

### Pitfall 1: AngularJS Digest Cycle Not Triggered
**What goes wrong:** Setting an input value via `element.value = 'x'` does not update the AngularJS model. The form appears filled but Angular doesn't know about the change.
**Why it happens:** AngularJS uses its own change detection (`$digest` cycle) that only runs on AngularJS events, not native DOM events.
**How to avoid:** After setting a value, dispatch a native `change` or `input` event: `element.dispatchEvent(new Event('change'))`. Or use `angular.element(el).triggerHandler('change')`. With Playwright's `page.fill()`, this is handled automatically because it simulates real user input.
**Warning signs:** Form values appear correct in DOM but submission fails or Angular ignores the values.

### Pitfall 2: Content Script Isolation Confusion
**What goes wrong:** Attempting to access AngularJS from the extension's content script context, or assuming `page.evaluate()` runs in the content script world.
**Why it happens:** Chrome extensions have two JavaScript worlds: MAIN (page JS including Angular) and ISOLATED (content script JS).
**How to avoid:** Always use `page.evaluate()` for Angular access (it runs in MAIN world). The content script's MutationObserver works in the ISOLATED world but can read the same DOM.
**Warning signs:** `window.angular is undefined` errors in `page.evaluate()` -- would indicate Angular hasn't loaded yet (timing issue), NOT an isolation issue.

### Pitfall 3: WebSocket Protocol is Proprietary and Undocumented
**What goes wrong:** Spending excessive time trying to decode dominion.games WebSocket binary protocol.
**Why it happens:** The WebSocket protocol is custom, not documented, and may use binary frames.
**How to avoid:** Use WebSocket monitoring primarily for detecting connection events (new WS opened = game started). For actual game state, prefer the game log DOM (`.game-log`) and Angular scope access, which are well-documented by existing extensions.
**Warning signs:** WebSocket payloads are binary/opaque; spending more than 1 hour trying to parse WS frame formats.

### Pitfall 4: Login Form Selectors Unknown Until Runtime
**What goes wrong:** Hardcoding selectors for the login form that may have changed since extensions were last updated.
**Why it happens:** dominion.games can update their UI at any time; no public API documentation.
**How to avoid:** During initial implementation, use Playwright's headed mode (`--headed`) to visually inspect the login page. Use resilient selectors (role-based, text-based) over fragile class-based selectors. Document discovered selectors.
**Warning signs:** Tests fail immediately at login with "element not found" errors.

### Pitfall 5: Race Condition Between Page Load and Angular Bootstrap
**What goes wrong:** Calling `page.evaluate(() => window.angular)` before AngularJS has bootstrapped, getting `undefined`.
**Why it happens:** Angular bootstraps asynchronously after page load. `page.goto()` resolves on `load` event, but Angular may not be ready.
**How to avoid:** Wait for an Angular-rendered element before accessing Angular scope: `await page.waitForSelector('[ng-if]')` or `await page.waitForFunction(() => !!window.angular)`.
**Warning signs:** Intermittent `angular is undefined` errors, especially on slow connections.

### Pitfall 6: .env File Not in .gitignore
**What goes wrong:** Credentials get committed to the repository.
**Why it happens:** The current `.gitignore` does NOT include `.env`. It must be added.
**How to avoid:** Add `.env` to `.gitignore` as part of the credential setup task.
**Warning signs:** `git status` shows `.env` as untracked or modified.

### Pitfall 7: Smoke Tests Break After Credential Requirement
**What goes wrong:** Existing smoke tests in `smoke.spec.ts` start failing because they don't handle credential requirements.
**Why it happens:** CONTEXT.md states "All E2E tests require credentials (including smoke tests from Phase 1)". Smoke tests must use `test.skip()` when credentials are missing.
**How to avoid:** Add credential check to the shared fixtures or use a `test.beforeEach` that skips when credentials are absent.
**Warning signs:** CI or developer machines without `.env` see all tests failing instead of skipping.

## Code Examples

### Login Flow Helper
```typescript
// Source: Verified DOM patterns from LogDog/command.games + Playwright best practices
// Note: Exact login selectors must be discovered at implementation time
// using headed mode. These are educated guesses based on AngularJS patterns.

async function login(page: Page, user: string, pass: string): Promise<void> {
  // Wait for Angular to bootstrap
  await page.waitForFunction(() => !!window.angular, { timeout: 15000 });

  // Check if already logged in (handle cached session)
  const isLoggedIn = await page.evaluate(() => {
    // Look for lobby indicators -- exact selector TBD
    return !!document.querySelector('.lobby-page');
  });
  if (isLoggedIn) return;

  // Fill login form -- selectors TBD at implementation time
  // Playwright's fill() triggers proper input events for AngularJS
  await page.locator('input[type="text"]').first().fill(user);
  await page.locator('input[type="password"]').fill(pass);

  // Intercept login response for verification
  const responsePromise = page.waitForResponse(
    resp => resp.url().includes('login') || resp.url().includes('auth'),
    { timeout: 30000 }
  );

  // Click login button
  await page.getByRole('button', { name: /log\s*in|sign\s*in/i }).click();

  // Verify via API response (not DOM)
  const response = await responsePromise;
  if (response.status() !== 200) {
    throw new Error(`Login failed with status ${response.status()}`);
  }
}
```

### Table Creation and Game Start
```typescript
// Source: LogDog contentScript.js loadGame() and loadKingdom() functions
// Adapted from setTimeout chains to Playwright auto-waiting

async function createTableWithBot(page: Page): Promise<void> {
  // Click "New Table" tab
  await page.locator('.tab-button').filter({ hasText: /new table/i }).click();

  // Click "Create Table" button
  await page.locator('.lobby-button').filter({ hasText: /create/i }).click();

  // Add Lord Rattington bot
  // The bot button is at .lobby-button.kingdom-selection[0]
  // Only click if parent is not hidden (ariaHidden != "true")
  const botButton = page.locator('.lobby-button.kingdom-selection').first();
  await botButton.waitFor({ state: 'visible' });
  await botButton.click();

  // Start the game -- click ready/start button
  await page.locator('.lobby-button').filter({ hasText: /start|ready/i }).click();
}
```

### waitForMyTurn Helper
```typescript
// Source: LogDog background.js turn detection regex + Playwright waiting patterns

async function waitForMyTurn(page: Page, playerName: string, timeout = 30000): Promise<{ turn: number }> {
  // Use expect.poll() for eventual consistency -- the game log updates
  // when the turn changes, and Lord Rattington plays near-instantly
  const startTime = Date.now();

  return page.evaluate(
    ({ playerName, timeout }) => {
      return new Promise<{ turn: number }>((resolve, reject) => {
        const check = () => {
          const log = document.querySelector('.game-log');
          if (!log) {
            if (Date.now() - startTime > timeout) return reject(new Error('Turn detection timeout'));
            setTimeout(check, 100);
            return;
          }
          const text = log.innerText;
          const regex = /(?:Turn|Zug|Tour|Ход) (\d+) - (.+?)(?:\n|$)/g;
          let match;
          let lastMatch = null;
          while ((match = regex.exec(text)) !== null) {
            lastMatch = match;
          }
          if (lastMatch && lastMatch[2].trim() === playerName) {
            return resolve({ turn: parseInt(lastMatch[1]) });
          }
          if (Date.now() - startTime > timeout) {
            return reject(new Error(`Timeout waiting for ${playerName}'s turn`));
          }
          setTimeout(check, 200);
        };
        check();
      });
    },
    { playerName, timeout }
  );
}

// Better alternative using Playwright's expect.poll():
async function waitForMyTurnPoll(page: Page, playerName: string): Promise<number> {
  let turnNumber = 0;
  await expect.poll(async () => {
    const info = await page.evaluate((name) => {
      const log = document.querySelector('.game-log');
      if (!log) return null;
      const text = log.innerText;
      const regex = /(?:Turn|Zug|Tour|Ход) (\d+) - (.+?)(?:\n|$)/g;
      let match;
      let lastMatch = null;
      while ((match = regex.exec(text)) !== null) lastMatch = match;
      if (!lastMatch) return null;
      return { turn: parseInt(lastMatch[1]), player: lastMatch[2].trim() };
    }, playerName);
    if (info && info.player === playerName) {
      turnNumber = info.turn;
      return true;
    }
    return false;
  }, {
    message: `Waiting for ${playerName}'s turn`,
    timeout: 30000,
    intervals: [200, 500, 1000],
  }).toBeTruthy();
  return turnNumber;
}
```

### authenticatedPage Fixture
```typescript
// Source: Playwright fixtures docs + Phase 1 fixtures.ts pattern
// Extends existing gamePage with login logic

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
  gamePage: Page;
  sidePanelPage: Page;
  authenticatedPage: Page;
}>({
  // ... existing fixtures unchanged ...

  authenticatedPage: async ({ gamePage }, use) => {
    const creds = validateCredentials();
    if (!creds) {
      test.skip(true, 'DOMINION_USER and DOMINION_PASS required in .env');
      return;
    }

    // Attempt login with 1 retry
    let lastError: Error | null = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        await login(gamePage, creds.user, creds.pass);
        lastError = null;
        break;
      } catch (err) {
        lastError = err as Error;
        if (attempt === 0) {
          await gamePage.reload();
        }
      }
    }

    if (lastError) {
      await gamePage.screenshot({ path: 'test-results/login-failure.png' });
      throw new Error(`Login failed after retry: ${lastError.message}`);
    }

    await use(gamePage);
  },
});
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Protractor for AngularJS testing | Playwright (Protractor deprecated) | Protractor deprecated 2023 | Use `page.evaluate()` for Angular access instead of Protractor helpers |
| `setTimeout` chains for timing | Playwright auto-waiting + `expect.poll()` | Playwright 1.20+ | Eliminates flaky arbitrary delays |
| WebSocket monitoring read-only | `page.routeWebSocket()` for interception + mocking | Playwright 1.48+ | Can intercept and modify WS frames if needed |
| Manual screenshot capture | `screenshot: 'only-on-failure'` config | Playwright 1.0+ | Automatic, no code needed |

**Deprecated/outdated:**
- Protractor: Deprecated, do not use. Playwright handles AngularJS via standard DOM and `page.evaluate()`.
- `ng-` attribute selectors in Playwright: Work fine but prefer role/text locators when possible for resilience.

## Open Questions

1. **Exact Login Form Selectors**
   - What we know: dominion.games has a login form (confirmed by user reports and extension context)
   - What's unclear: The exact input field selectors, button text, and form structure
   - Recommendation: Discover at implementation time using `--headed` mode. Use text/role-based locators for resilience. This is acceptable because the login form is the one place where DOM interaction is unavoidable.

2. **Login API Endpoint URL Pattern**
   - What we know: There is a login flow; the CONTEXT.md says to verify via API response
   - What's unclear: The exact URL pattern for the login API call (REST endpoint)
   - Recommendation: During implementation, use `page.on('response')` to log all network requests during login, then identify the auth endpoint. If no clear REST endpoint, fall back to detecting the lobby page load as login success indicator.

3. **WebSocket Message Format**
   - What we know: Game uses WebSocket for real-time communication (confirmed in ADR-001)
   - What's unclear: Whether messages are JSON, binary, or custom format; what messages indicate game start and turn changes
   - Recommendation: Log WebSocket frames during a headed test run to discover format. If messages are opaque/binary, rely on game log DOM parsing (proven by LogDog) instead of WebSocket parsing. The game log approach is more maintainable.

4. **Table Creation Button Text and Flow Variations**
   - What we know: LogDog uses button index-based selection; command.games uses text-based selection with i18n
   - What's unclear: Whether the flow has changed since these extensions were last updated
   - Recommendation: Use headed mode to verify current flow. LogDog's `loadKingdom()` function (creating table with bot) matches our requirements closely -- adapt its flow with Playwright auto-waiting.

5. **Player Name Discovery**
   - What we know: Turn detection requires knowing the human player's name to match against `Turn N - PlayerName`
   - What's unclear: Where to get the logged-in player's display name
   - Recommendation: Either read from Angular scope after login, or parse the first "Turn 1 - PlayerName" entry from the game log (will be one of two players; the other is "Lord Rattington").

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | @playwright/test 1.58.2 |
| Config file | `playwright.config.ts` |
| Quick run command | `npx playwright test e2e/auth.spec.ts` |
| Full suite command | `npx playwright test` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| GAME-01 | Login to dominion.games with .env credentials | e2e | `npx playwright test e2e/auth.spec.ts -g "login"` | No -- Wave 0 |
| GAME-02 | Create table with Lord Rattington bot | e2e | `npx playwright test e2e/auth.spec.ts -g "table"` | No -- Wave 0 |
| GAME-03 | Start game, 10 kingdom cards visible | e2e | `npx playwright test e2e/auth.spec.ts -g "kingdom"` | No -- Wave 0 |
| GAME-04 | Detect human player's turn after bot plays | e2e | `npx playwright test e2e/auth.spec.ts -g "turn"` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npx playwright test e2e/auth.spec.ts --headed`
- **Per wave merge:** `npx playwright test` (full suite including smoke tests)
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `e2e/env-setup.ts` -- credential loading and validation
- [ ] `e2e/helpers/game.ts` -- game interaction helpers (waitForMyTurn, etc.)
- [ ] `e2e/auth.spec.ts` -- auth and game setup test file
- [ ] `.env.example` -- placeholder credential file
- [ ] `.env` added to `.gitignore`
- [ ] `e2e/global-setup.ts` updated to chain env-setup
- [ ] `e2e/fixtures.ts` updated with `authenticatedPage` fixture
- [ ] `playwright.config.ts` updated with per-project retry config

## Sources

### Primary (HIGH confidence)
- LogDog extension source code (https://github.com/michaelgoetze/LogDog) -- DOM selectors for kingdom detection (`.kingdom-viewer-group .full-card-name.card-name`), game log (`.game-log`), lobby buttons (`.tab-button`, `.lobby-button`, `.lobby-button.kingdom-selection`), turn detection regex, Lord Rattington bot addition flow
- command.games extension source code (https://github.com/davidtorosyan/command.games) -- Confirmed AngularJS 1.x usage (`angular.element()`, `ng-if`, `triggerAngular()`), lobby navigation (`.lobby-page`, `.kingdom-choices`), form interaction patterns
- Playwright official docs (https://playwright.dev/docs/api/class-websocket) -- WebSocket monitoring API
- Playwright official docs (https://playwright.dev/docs/evaluating) -- page.evaluate() in main world
- Playwright official docs (https://playwright.dev/docs/test-fixtures) -- Fixture composition patterns
- Playwright official docs (https://playwright.dev/docs/chrome-extensions) -- Chrome extension persistent context
- Existing project code (`e2e/fixtures.ts`, `e2e/global-setup.ts`, `playwright.config.ts`) -- Phase 1 infrastructure

### Secondary (MEDIUM confidence)
- AngularJS scope access patterns (https://ionic.io/blog/angularjs-console, https://www.codelord.net/2018/01/28/angularjs-console-debugging-tricks/) -- `angular.element().scope()` and `angular.element(document).injector().get()` patterns
- ADR-001 (`docs/adr/001-dominion-helper-architecture.md`) -- States "custom SPA using vanilla JavaScript" but this contradicts evidence from LogDog/command.games showing AngularJS. The ADR may have missed the AngularJS dependency or it was added later.
- Playwright Protractor migration guide (https://playwright.dev/docs/protractor) -- AngularJS selector patterns with Playwright

### Tertiary (LOW confidence)
- WebSocket protocol format -- No documentation found. Must be discovered at implementation time via frame logging.
- Exact login form selectors -- Not found in any source. Must be discovered at implementation time.
- Current lobby button text/flow -- Extensions may be outdated. Verify at implementation time with `--headed` mode.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All packages already installed, versions confirmed via npm
- Architecture: MEDIUM -- AngularJS confirmed but exact Angular scope paths for dominion.games are unknown; DOM selectors verified from two independent extensions but may have changed
- Pitfalls: HIGH -- Based on real patterns from existing extension source code and Playwright documentation
- Turn detection: HIGH -- Regex pattern verified from LogDog, game log DOM structure documented
- Login flow: LOW -- Exact selectors unknown, must discover at implementation time
- Table creation flow: MEDIUM -- Verified from LogDog/command.games but may have changed

**Research date:** 2026-03-18
**Valid until:** 2026-04-01 (dominion.games may update DOM at any time; verify selectors with headed mode)
