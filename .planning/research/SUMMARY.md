# Research Summary: E2E Testing Infrastructure

**Domain:** Chrome Extension E2E Testing (Playwright + dominion.games)
**Researched:** 2026-03-17
**Overall confidence:** HIGH

## Executive Summary

Playwright is the clear and only viable choice for E2E testing Chrome extensions. It has first-class support for loading extensions via persistent browser contexts, extracting extension IDs from service workers, and testing Manifest V3 extensions. No other mainstream framework (Cypress, Puppeteer, Selenium) offers comparable extension testing capabilities. The latest Playwright (v1.58.2) supports headless mode for extensions via the `channel: 'chromium'` option, using Playwright's bundled Chromium (required because Google Chrome removed the command-line flags for side-loading extensions).

The primary architectural challenge is testing the extension's side panel. Playwright does not support Chrome's native side panel UI, but the solution is straightforward: navigate to `chrome-extension://<extensionId>/sidepanel.html` in a regular browser tab. The page has full `chrome.runtime` API access, receives the same `ANALYSIS_UPDATE` and `TRACKER_UPDATE` messages from the service worker, and renders the identical DOM as the real side panel. This works because Chrome extension pages have the same runtime privileges regardless of their container (tab, popup, or side panel). No test hooks in production code are needed. The `PW_CHROMIUM_ATTACH_TO_OTHER` workaround should be avoided -- it's an undocumented internal flag that couples tests to Playwright internals.

The most significant testing challenge is that dominion.games randomly selects kingdom cards for each game. Tests must assert structural invariants (deck count = 5 after draw, hand size = 5, total cards = 10 at start) rather than specific card names. This constraint shapes the entire test design approach.

The stack is minimal: `@playwright/test` (^1.58.0) for the test framework and `dotenv` (^16.4.0) for loading credentials. No other dependencies are needed. The existing Vitest unit test setup remains completely separate.

## Key Findings

**Stack:** `@playwright/test` ^1.58.0 + `dotenv` ^16.4.0. Use bundled Chromium (`channel: 'chromium'`), NOT system Chrome. Two dev dependencies total.

**Architecture:** Four-layer system: Playwright fixtures (persistent context, extension ID, game page, side panel page) -> Page Object Models (LoginPage, LobbyPage, GamePage, SidePanelPage) -> centralized selectors + assertion helpers -> test specs. Side panel tested via direct tab navigation to the extension page.

**Critical pitfall:** Do NOT use `PW_CHROMIUM_ATTACH_TO_OTHER` or inject test-only hooks into the extension. Navigate directly to `sidepanel.html` as a regular extension page instead. Also: `page.evaluate()` runs in the page's MAIN world, not the content script's ISOLATED world -- verify extension behavior through the side panel output, not by reading content script variables.

## Implications for Roadmap

Based on research, suggested phase structure:

1. **Phase 1: Test Harness** - Foundation everything else depends on
   - Addresses: Playwright config, persistent context fixture, extension loading, service worker extraction, extension ID resolution, side panel page navigation
   - Avoids: Side panel workaround pitfall, extension not loading, service worker race condition
   - Deliverable: A smoke test that proves the extension loads, service worker starts, and side panel page renders in a tab
   - Estimated complexity: Medium (well-documented patterns)

2. **Phase 2: Authentication and Game Setup** - Gates to game testing
   - Addresses: Login automation, table creation with bot, game start detection, stale game cleanup
   - Avoids: Session expiration, rate limiting, stale games from crashed tests
   - Deliverable: A test that logs in, creates a table with a bot, starts a game, and verifies the kingdom viewer appears
   - Estimated complexity: Medium-High (login/lobby selectors need discovery on live site)
   - NOTE: This phase requires selector discovery on the live dominion.games site.

3. **Phase 3: Kingdom Verification** - Proves the content script -> service worker -> side panel pipeline
   - Addresses: Kingdom detection in side panel, analysis rendering, component/synergy presence
   - Avoids: Random kingdom flakiness by asserting "10 cards detected" not specific names
   - Deliverable: Tests verifying the side panel shows analysis data matching the game's kingdom
   - Estimated complexity: Medium

4. **Phase 4: Tracker Verification** - The highest-value tests
   - Addresses: Zone count accuracy, card movements, multi-turn tracking, starting state validation
   - Avoids: Timing pitfalls with expect.poll assertions, bot unpredictability by only asserting human player
   - Deliverable: Tests that verify deck/hand/discard/play zone counts match expected values across turns
   - Estimated complexity: High (random kingdoms, async updates, bot turn handling)

**Phase ordering rationale:**
- Phase 1 first: all phases depend on the persistent context and extension loading
- Phase 2 second: without a running game, there is nothing to verify
- Phase 3 before 4: the analysis pipeline is simpler and proves the messaging chain (content -> service worker -> side panel) before tackling the more complex tracker pipeline
- Each phase has its own smoke test that validates the foundation for the next

**Research flags for phases:**
- Phase 2: Needs hands-on selector discovery. Login, lobby, table creation selectors are all unknown.
- Phase 4: May need deeper research on shuffle detection and turn boundary handling for expected-state computation.
- Phases 1, 3: Standard Playwright patterns, unlikely to need additional research.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | @playwright/test is the only viable choice. Version, channel, and configuration verified from official docs. |
| Side Panel Access | HIGH | Extension pages have same runtime privileges in all containers. Verified via Chrome extension docs and community patterns for popup testing. |
| Architecture | HIGH | Persistent context fixture, POM pattern, and auto-wait are standard Playwright patterns. |
| Game Flow | MEDIUM | Extension DOM selectors known from existing code. Login/lobby/table selectors unknown, need discovery. |
| Pitfalls | HIGH | All critical pitfalls documented with official sources. Side panel, persistent context, service worker, ISOLATED world issues are well-known. |

## Gaps to Address

- **dominion.games login/lobby selectors** - Unknown. Must be discovered during Phase 2 by inspecting the live site.
- **Session persistence behavior** - Whether dominion.games uses session vs persistent cookies affects auth caching. Test empirically.
- **Bot turn timing** - How long Lord Rattington takes and what signals turn completion. Test empirically.
- **Game speed settings** - Whether animation speed can be configured via lobby UI or requires Angular manipulation. Unknown.
- **Rate limiting** - Whether automated login/game-creation triggers throttling on dominion.games. Test with dedicated account.

## Sources

- [Playwright Chrome Extensions (official docs)](https://playwright.dev/docs/chrome-extensions)
- [Playwright GitHub Issue #26693: Side Panel Support](https://github.com/microsoft/playwright/issues/26693)
- [Chrome sidePanel API Reference](https://developer.chrome.com/docs/extensions/reference/api/sidePanel)
- [Playwright Auto-Waiting Documentation](https://playwright.dev/docs/actionability)
- [Playwright Authentication Documentation](https://playwright.dev/docs/auth)
- [E2E Tests for Chrome Extensions Using Playwright and CDP](https://dev.to/corrupt952/how-i-built-e2e-tests-for-chrome-extensions-using-playwright-and-cdp-11fl)
- [BrowserStack: How to Automate Tests for Chrome Extensions](https://www.browserstack.com/guide/playwright-chrome-extension)

---

*Research summary: 2026-03-17*
