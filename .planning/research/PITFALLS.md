# Domain Pitfalls: Chrome Extension E2E Testing

**Domain:** E2E testing a Chrome extension (MV3) against a live third-party Angular site (dominion.games) using Playwright
**Researched:** 2026-03-17

## Critical Pitfalls

Mistakes that cause rewrites, wasted weeks, or an unusable test suite.

### Pitfall 1: Side Panel Testing Strategy -- Avoid the PW_CHROMIUM_ATTACH_TO_OTHER Trap

**What goes wrong:** Developers discover Playwright cannot natively open Chrome's side panel (Issue #26693) and reach for the `PW_CHROMIUM_ATTACH_TO_OTHER=1` workaround. This requires: (a) injecting a test-only button into the content script to trigger `chrome.sidePanel.open()` via user gesture, (b) relying on an undocumented Playwright internal flag, and (c) finding the side panel page among `context.pages()`. The approach is fragile, couples tests to production code modifications, and breaks when Playwright updates.

**Why it happens:** The PW_CHROMIUM_ATTACH_TO_OTHER approach appears in the GitHub issue comments and looks "official" because it works. But it's an internal debugging flag, not a public API.

**Consequences:** Test infrastructure depends on undocumented behavior. Production code gains test-only branches. Updates to Playwright or Chrome can silently break the side panel discovery.

**Prevention:** Navigate directly to `chrome-extension://<id>/sidepanel.html` in a regular tab. This is a standard extension page with full `chrome.runtime` API access. It receives the same `ANALYSIS_UPDATE` and `TRACKER_UPDATE` messages as the real side panel. No test hooks in production code needed.

**Detection:** If you find yourself writing `process.env.PW_CHROMIUM_ATTACH_TO_OTHER = "1"` or adding `if (NODE_ENV === 'test')` to the extension code, you've taken the wrong path.

**Phase:** Phase 1 (infrastructure). This decision shapes the entire test architecture.

---

### Pitfall 2: Persistent Context Prevents Standard Playwright Isolation

**What goes wrong:** Chrome extensions require `launchPersistentContext()` which ties the browser to a single user data directory. Running tests in parallel with the default Playwright test runner causes file locks, corrupted profiles, and extension state bleeding between tests.

**Why it happens:** Playwright's standard isolation model (one `BrowserContext` per test) does not work for extensions. Extensions need persistent contexts, and persistent contexts share on-disk state.

**Consequences:** Tests that pass individually fail intermittently when run together. Debugging is a nightmare because failures depend on execution order.

**Prevention:**
- Set `workers: 1` in Playwright config. Serial execution is fine for a suite of 5-10 E2E tests.
- Use `test.describe.serial()` for tests that share game state.
- Clear extension state between test suites (navigate away from dominion.games and back, or send a reset message to the service worker).
- Do NOT attempt worker-scoped parallelism with unique userDataDirs unless you have a specific need and multiple test accounts.

**Detection:** Intermittent failures that only appear when running the full suite. Errors referencing locked profile directories.

**Phase:** Phase 1 (infrastructure). The fixture design must account for this from the start.

---

### Pitfall 3: Random Kingdoms Make Assertions Non-Deterministic

**What goes wrong:** dominion.games randomly selects 10 kingdom cards. Tests that assert specific card names, synergies, or archetypes will pass or fail depending on which kingdom is dealt.

**Why it happens:** No API to control kingdom selection. Free-tier limits to base set (~25 kingdom cards), but selection is still random.

**Consequences:** Entire test suite becomes flaky. Tests pass locally but fail next time.

**Prevention:**
- **Never assert specific card names.** Assert structural properties: "10 kingdom cards detected", "deck count is 10 at start", "hand has 5 cards."
- **Assert invariants.** Total cards = 10 at game start. Playing a card: hand -1, play +1. Buying a card: total +1, new card in discard.
- **Read the kingdom first, then verify.** Extract actual kingdom from the game page DOM, then verify the side panel detected the same set.
- **Log the kingdom on failure** for reproducibility.

**Detection:** Test pass rate below 100% across multiple runs with identical code.

**Phase:** Phase 2 (writing tests). Test design must embrace randomness.

---

### Pitfall 4: Third-Party Site DOM Changes Break Tests Silently

**What goes wrong:** dominion.games updates its Angular application. DOM selectors break, but tests may still pass if they assert the wrong thing (e.g., checking element exists but not content).

**Why it happens:** The extension depends on fragile DOM selectors. E2E tests add a second layer of selector dependency. When dominion.games deploys, both layers break.

**Consequences:** Tests pass (green) but the extension is broken. Or tests fail for reasons unrelated to extension code.

**Prevention:**
- **Canary test.** A small test that validates DOM selectors work (`KINGDOM-VIEWER` exists, contains `.name-layer` elements). If canary fails, skip all game tests with a clear "dominion.games DOM changed" message.
- **Use the extension's output as truth.** Check what the extension detected (via side panel) rather than independently querying the game DOM.
- **Centralize selectors.** All dominion.games selectors in one `selectors.ts` file for easy maintenance.

**Detection:** All E2E tests fail on the same day with no code changes.

**Phase:** Phase 1 (canary tests) and Phase 2 (test design patterns).

---

### Pitfall 5: MV3 Service Worker Suspension Causes Race Conditions

**What goes wrong:** Chrome suspends MV3 service workers after 30 seconds of inactivity. Playwright may find the worker suspended when trying to access it. Additionally, Playwright has a known race condition where it fails to attach to the service worker if Chrome creates it before Playwright is ready (Issue #39075).

**Why it happens:** MV3 service workers are designed to be ephemeral. Chrome aggressively suspends them.

**Consequences:** Tests intermittently fail with "service worker not found" or timeout errors.

**Prevention:**
- **Always check `context.serviceWorkers()` first**, then fall back to `context.waitForEvent('serviceworker')`.
- **The extension's messaging keeps the worker alive.** During active gameplay, the content script sends frequent TRACKER_UPDATE messages, preventing suspension. This is only a concern during long pauses between test actions.
- **Implement retry logic** for service worker access in the fixture.

**Detection:** Tests passing locally but failing in CI. Timeout errors on `waitForEvent('serviceworker')`.

**Phase:** Phase 1 (infrastructure). Service worker access is fundamental.

---

## Moderate Pitfalls

### Pitfall 6: Login Session Expiration Mid-Test-Suite

**What goes wrong:** Session expires partway through a long test run. Later tests fail with auth errors.

**Prevention:**
- Use persistent context's `userDataDir` to cache cookies across tests within a run.
- Implement `ensureLoggedIn()` check at the start of each test suite that re-authenticates if needed.
- Use a dedicated test account separate from personal accounts.

**Detection:** Tests passing early in suite but failing later with redirect URLs.

---

### Pitfall 7: Game State Timing -- Acting Before the Game is Ready

**What goes wrong:** After starting a game, the test immediately tries to read kingdom or interact. But Angular has loading animations and async rendering.

**Prevention:**
- **Never use `page.waitForTimeout()`.** Use element-based waits: `await expect(page.locator('KINGDOM-VIEWER .kingdom-viewer')).toBeVisible()`.
- **Define readiness conditions:**
  - "Login complete" = lobby UI visible
  - "Game started" = KINGDOM-VIEWER has 10 card names
  - "Turn started" = game log contains "Turn 1"
  - "Extension processed" = side panel shows analysis or tracker data
- **Generous timeouts for live-site waits** (30-60 seconds for game creation).

**Detection:** "Element not found" or timeout errors that only appear on slower machines.

---

### Pitfall 8: Extension Not Loaded or Content Script Not Injected

**What goes wrong:** Playwright launches with `--load-extension`, but the content script does not inject.

**Prevention:**
- **Verify extension loading in fixture.** Check `context.serviceWorkers()` returns a worker. Fail fast with clear error.
- **Ensure dist/ is built and current.** Add `npm run build` as a pre-step.
- **Navigate to dominion.games after extension loads.** Content scripts only inject on navigation to matching pages.

**Detection:** Service worker exists but no extension effects on the page.

---

### Pitfall 9: Content Script Runs in ISOLATED World -- Playwright Cannot Access It

**What goes wrong:** Tests try to use `gamePage.evaluate()` to read content script variables (like `currentKingdom` or `gameState`). This silently fails because `page.evaluate()` runs in the page's MAIN world, not the content script's ISOLATED world.

**Why it happens:** Chrome extensions run content scripts in an isolated JavaScript context. Playwright can only evaluate in the MAIN world.

**Prevention:**
- **Never try to read content script state from Playwright.** Instead, verify through the extension's output: side panel DOM, service worker cached state, or chrome.storage.session.
- **For game state ground truth**, use `gamePage.evaluate()` to access Angular globals (which ARE in the MAIN world) the same way the game-state-bridge does.

**Detection:** `page.evaluate(() => currentKingdom)` returns `undefined` even when the extension is tracking the kingdom.

---

### Pitfall 10: Bot Opponent Behavior is Unpredictable

**What goes wrong:** Tests create a game against a bot, but bot decisions are non-deterministic. Tests that assume specific bot behavior fail intermittently.

**Prevention:**
- **Only assert the human player's actions.** The test controls what the human does.
- **Wait for turn transitions explicitly.** After ending turn, wait for log to show "Turn N" for the human player.
- **Handle game-over gracefully.** Bot might end the game quickly. Detect and handle.

**Detection:** Tests timing out during bot turns. Assertions failing for bot actions.

---

## Minor Pitfalls

### Pitfall 11: Extension ID Changes Between Runs

**What goes wrong:** Extension ID is dynamically generated. Hardcoded references break.

**Prevention:** Always extract from service worker URL: `serviceWorker.url().split('/')[2]`. Use a fixture.

---

### Pitfall 12: Video/Trace Capture Issues with Persistent Contexts

**What goes wrong:** Playwright's video recording may not work correctly with `launchPersistentContext` (Issue #33792).

**Prevention:**
- Use `trace: 'retain-on-failure'` instead of video for debugging.
- Take explicit screenshots with `page.screenshot()` in afterEach hooks.
- Capture game log text on failure -- often more useful than screenshots.

---

### Pitfall 13: Rate Limiting or Account Lockout

**What goes wrong:** Repeated test runs trigger rate limiting on dominion.games.

**Prevention:**
- Reuse auth state across runs.
- Add delays between rapid game creation cycles.
- Use dedicated test account.

---

### Pitfall 14: Stale Games Left on dominion.games

**What goes wrong:** Tests crash before game ends. Next run sees "already in a game" instead of lobby.

**Prevention:**
- **Robust teardown** in `test.afterEach()`: navigate to lobby, resign/leave any active game.
- **At test start**: check if account is already in a game and leave it.
- **globalSetup**: "clean slate" check as first action.

**Detection:** First test in suite failing with "already in a game."

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|---|---|---|
| Infrastructure (Phase 1) | Side panel approach (#1), extension not injecting (#8), service worker race (#5) | Use direct page navigation for side panel. Build health-check fixtures. Validate extension loads before game tests. |
| Authentication (Phase 1) | Session expiration (#6), rate limiting (#13), stale games (#14) | ensureLoggedIn() helper, dedicated test account, globalSetup cleanup |
| Game flow (Phase 2) | Game timing (#7), bot behavior (#10), DOM changes (#4) | Element-based waits, only assert human player, canary tests for selectors |
| Tracker verification (Phase 3) | Random kingdoms (#3), ISOLATED world (#9) | Assert invariants not values, verify via side panel not content script |

## Sources

- [Playwright Chrome Extension Docs](https://playwright.dev/docs/chrome-extensions) -- HIGH confidence
- [Playwright Side Panel Issue #26693](https://github.com/microsoft/playwright/issues/26693) -- HIGH confidence
- [Playwright MV3 Service Worker Issue #39075](https://github.com/microsoft/playwright/issues/39075) -- HIGH confidence
- [Playwright Video Bug with Persistent Context #33792](https://github.com/microsoft/playwright/issues/33792) -- HIGH confidence
- [Chrome sidePanel API Reference](https://developer.chrome.com/docs/extensions/reference/api/sidePanel) -- HIGH confidence
- [Playwright Authentication Docs](https://playwright.dev/docs/auth) -- HIGH confidence
- [Chrome Extension E2E Testing via CDP](https://dev.to/corrupt952/how-i-built-e2e-tests-for-chrome-extensions-using-playwright-and-cdp-11fl) -- MEDIUM confidence

---

*Pitfalls audit: 2026-03-17*
