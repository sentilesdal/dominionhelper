# Feature Landscape

**Domain:** Chrome Extension E2E Testing (game tracker vs. live Angular web app)
**Researched:** 2026-03-17

## Table Stakes

Features the test suite must have or tests are useless. Without these, nothing runs.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Persistent browser context with extension loaded | Playwright requires `launchPersistentContext` with `--load-extension` for Chrome extensions. No alternative exists. | Low | Well-documented Playwright API. Must use `chromium` channel, not Chrome/Edge. |
| Dynamic extension ID resolution | Extension ID changes per profile/environment. Hardcoding breaks portability. Derive from service worker URL at runtime. | Low | `serviceWorker.url().split('/')[2]` is the standard pattern. |
| Headed mode execution | Chrome extensions work in headless mode with `channel: 'chromium'`. But headed mode is needed for debugging. Both must be supported. | Low | Default to headless for speed, `--headed` flag for debugging. |
| Automated login to dominion.games | Cannot reach a game without logging in. Must fill username/password fields and submit. Credentials from `.env` file. | Medium | Angular SPA login flow. Selectors TBD during implementation. |
| Table creation with bot opponent | Tests need a game to observe. Must create table, add bot, start game. | High | Most complex navigation step. dominion.games table creation UI uses Angular components. |
| Wait-for-game-start helper | After clicking "Start", the game takes time to load. Tests must wait for the game to be playable before asserting. | Medium | Wait for `KINGDOM-VIEWER` element (10 card names). |
| Side panel access via direct page navigation | The side panel is where tracker output displays. Navigate to `chrome-extension://<id>/sidepanel.html` in a tab. | Low | Gets full `chrome.runtime` access. Receives same messages as real side panel. No workarounds needed. |
| Tracker data extraction from side panel | Read deck counts, card lists, zone compositions from the side panel DOM. | Medium | Side panel uses CSS classes like `.dh-tracker-deck`, `.dh-tracker-hand`, etc. |
| Game action execution helpers | Tests need to advance game turns: play treasures, buy cards, end phases. | High | Must click game action buttons. Selectors are Angular-rendered. |
| Basic assertion helpers for zone state | Assert deck count, hand count, discard count, in-play count match expected values. | Medium | Use Playwright's `expect.poll()` for eventual consistency. |

## Differentiators

Features that make the test suite genuinely useful for development agents, not just a smoke test.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Playwright test fixtures for extension lifecycle | Reusable fixture: launch browser, resolve extension ID, get service worker, open game page, open side panel page. Every test gets clean handles without boilerplate. | Medium | Standard Playwright fixture pattern. Single place to change if API evolves. |
| Page Object Model for dominion.games | Encapsulate DOM interactions: `LoginPage`, `LobbyPage`, `GamePage`, `SidePanelPage`. When dominion.games changes selectors, fix one POM, not every test. | High | Most valuable investment. GamePage is most complex (action buttons, supply cards, log). |
| Turn-aware game state tracking | Test helper that tracks what happened: turn number, cards bought/played. Used to compute expected state for assertions. | High | Track starting deck (7 Copper + 3 Estate), buys, and shuffles to predict zone counts. |
| `expect.poll`-based tracker assertions | Custom assertions that poll side panel for eventual consistency. Example: `await expectDeckCount(sidePanelPage, 5)` retries until tracker converges. | Medium | Essential because tracker lags game actions by 200-500ms. Raw `expect()` will flake. |
| Screenshot + game log capture on failure | Capture game page screenshot, side panel screenshot, and full game log text on failure. | Low | Playwright has built-in screenshot-on-failure. Game log text is most useful for debugging tracker mismatches. |
| Configurable game speed | Set dominion.games animation speed to fastest for tests. | Low | One-time setup. Significant time savings per test run. |
| Bot turn completion waiter | After human ends turn, wait for bot turn to finish. Detect via turn marker in log. | Medium | Poll game log for next "Turn N" entry for the human player. |
| Service worker state inspection | Read cached analysis/tracker data directly from service worker context. | Medium | `serviceWorker.evaluate()` for raw TrackerData without UI rendering. Good for focused assertions. |
| Build-before-test automation | `globalSetup` or npm pre-script runs `npm run build` before E2E tests. | Low | Ensures tests run against latest extension build. |
| Multi-turn game scenario tests | Play through 3-5 turns, buying cards each turn, verify tracker accumulates correctly. | High | Most comprehensive test type but slowest. Combines all helpers. |
| Kingdom analysis verification | Verify analysis tab shows synergies/archetypes for the random kingdom. | Medium | Cannot assert exact values. Verify: analysis non-empty, components match detected kingdom, sections render. |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Card-name-specific test assertions | Kingdoms are random. Asserting specific card names makes tests flaky by design. | Assert structural properties: "10 kingdom cards", "deck count is N", "hand has 5 cards". |
| Visual regression / screenshot comparison | Game UI has animations, timing-dependent layouts, random card art. Pixel comparisons flake constantly. | Verify data accuracy via DOM text content and tracker counts. |
| Multi-set card testing (beyond base set) | Non-base sets add massive complexity (Duration, Exile, Tavern mat). Free-tier account only has base set. | Limit to base-set-only kingdoms. Expand only with paid account and tracker support. |
| Full game completion tests | Playing to completion takes 15-30 minutes. Far too slow for tests. | Play 3-5 turns max. Tracker logic is the same at turn 5 and turn 30. |
| Mocking dominion.games responses | Defeats the purpose of E2E testing. The point is testing against the real game. | Keep E2E tests fully live. Use Vitest unit tests for isolated logic with mock data. |
| Testing Chrome extension popup | Extension uses a side panel, not a popup. No popup.html exists. | Test the side panel only. |
| CI/CD integration | dominion.games requires real login. Bot detection may block CI runners. | Run locally only. `npm run test:e2e`. Revisit CI later. |
| Parallelized test execution | One account can only be in one game. Parallel tests fight over the account. | `workers: 1` in Playwright config. |
| PW_CHROMIUM_ATTACH_TO_OTHER workaround | Undocumented Playwright internal. Requires test-only hooks in production code. | Use direct `chrome-extension://<id>/sidepanel.html` navigation instead. |
| Test-only hooks in production code | Pollutes production code, creates untested code paths, risks shipping test behavior. | Test through real UI and messaging channels. |

## Feature Dependencies

```
Build automation
  |
  v
Persistent context + extension loading
  |
  +---> Dynamic extension ID resolution
  |       |
  |       +---> Service worker access
  |       |
  |       +---> Side panel page (chrome-extension://<id>/sidepanel.html)
  |               |
  |               +---> Side panel page object
  |               |
  |               +---> Tracker data extraction
  |                       |
  |                       +---> Zone assertion helpers (expect.poll)
  |
  +---> Automated login
  |       |
  |       +---> Auth state caching
  |
  +---> Table creation with bot
          |
          +---> Wait-for-game-start
          |       |
          |       +---> Extension readiness detection
          |
          +---> Game action helpers (play/buy/end turn)
          |       |
          |       +---> Bot turn completion waiter
          |       |
          |       +---> Turn-aware state tracking
          |               |
          |               +---> Multi-turn scenario tests
          |
          +---> Game speed configuration

Screenshot/log capture on failure (independent, add anytime)
Kingdom analysis verification (independent of tracker features)
Retry/resilience config (independent, add anytime)
```

## Critical Path (Minimum Viable Test Suite)

1. **Persistent context + extension loading + extension ID** - Without this, nothing works
2. **Side panel page navigation** - Validates the side panel approach works
3. **Test fixture wrapping the above** - Every test needs this, build it once
4. **Automated login** - Gate to everything else on dominion.games
5. **Table creation with bot** - Need a game to test
6. **Wait-for-game-start + extension readiness** - Know when to start asserting
7. **Kingdom analysis verification** - Simpler pipeline, proves content script -> service worker -> side panel
8. **Game action helpers** (play treasures, buy, end turn) - Need to advance the game
9. **Tracker data extraction + basic zone assertions** - The actual tracker tests
10. **Bot turn completion waiter** - Needed for multi-turn tests

## MVP Recommendation

Prioritize:

1. **Test fixtures** (persistent context, extension ID, game page, side panel page) - foundation
2. **Login + lobby page objects** (create table, add bot, start game) - gate to games
3. **Side panel page object** (read analysis, read tracker) - verification layer
4. **One smoke test**: login, create game, wait for kingdom in side panel, play one turn, verify deck count

Defer:
- **Multi-turn scenario tests**: Build after smoke test proves infrastructure
- **Service worker state inspection**: Nice optimization, not needed for v1
- **Turn-aware expected-state tracking**: Complex; start with simple count assertions

## Sources

- [Playwright Chrome Extensions docs](https://playwright.dev/docs/chrome-extensions) -- HIGH confidence
- [Playwright Side Panel Issue #26693](https://github.com/microsoft/playwright/issues/26693) -- HIGH confidence
- [Chrome sidePanel API Reference](https://developer.chrome.com/docs/extensions/reference/api/sidePanel) -- HIGH confidence
- [Playwright Authentication docs](https://playwright.dev/docs/auth) -- HIGH confidence
- [Playwright Best Practices](https://playwright.dev/docs/best-practices) -- HIGH confidence

---

*Feature landscape: 2026-03-17*
