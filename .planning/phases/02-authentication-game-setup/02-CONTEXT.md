# Phase 2: Authentication & Game Setup - Context

**Gathered:** 2026-03-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Log into dominion.games using stored credentials, create a table with Lord Rattington (bot), start a game, and detect when it is the human player's turn. This phase produces reusable fixtures and helpers that Phase 3 and 4 build upon.

</domain>

<decisions>
## Implementation Decisions

### Credential Management
- Store credentials in `.env` file with `DOMINION_USER` and `DOMINION_PASS`
- Commit `.env.example` with placeholder values; `.env` is gitignored
- Only these two vars for now — add more when needed
- Separate `e2e/env-setup.ts` file handles dotenv loading and validation (not in global-setup.ts)
- `e2e/global-setup.ts` chains: env-setup (validate creds) → build extension
- Validation is env-var-existence check only — no network request
- All E2E tests require credentials (including smoke tests from Phase 1)
- When credentials are missing, skip tests with clear message via `test.skip()`
- No auth state caching — fresh login each test run (EXT-04 defers caching to v2)

### Angular-First Testing Approach
- **CRITICAL DECISION:** Avoid DOM selectors wherever possible. Prefer Angular framework state, API response interception, and Angular service methods
- Use `page.evaluate()` to access Angular scope/services from Playwright
- Use `page.on('response')` or `page.route()` to intercept API responses for state detection
- DOM selectors are last resort only — when no Angular state or API signal exists
- Researcher MUST investigate: which Angular version dominion.games uses (1.x vs 2+), how to access Angular internals from Playwright, what API endpoints exist

### Login & Lobby Flow
- Check if already logged in first before attempting login (handle cached session edge case)
- Verify login success via API response — do not check lobby DOM
- `authenticatedPage` fixture wraps `gamePage` with login logic
- Fixture handles retry internally (1 retry on login failure, then throws)
- Playwright config: 1 retry for auth spec tests specifically (network flakiness)
- Login timeout: 30 seconds
- On failure: capture screenshot, fail with clear error message
- Isolated login test (GAME-01) separate from full flow test (GAME-02/03/04)
- Auth tests in `e2e/auth.spec.ts` (separate from `e2e/smoke.spec.ts`)

### API Surface Mapping
- Researcher should map key dominion.games API endpoints: login, table creation, game start, turn changes
- Researcher should determine transport: REST/polling vs WebSocket
- Document response shapes for each endpoint relevant to Phase 2 requirements

### Table & Game Creation
- Default game settings — just add Lord Rattington as opponent and start
- Random kingdom is fine (no specific card sets needed)
- Research API-based table creation — prefer programmatic over UI button clicks
- Detect game start: intercept game-start API response for timing, read Angular state for kingdom data
- Verify exactly 10 kingdom cards from the game data (GAME-03 success criterion)

### Turn Detection
- Intercept turn-change API/WebSocket messages for timing, verify with Angular game state
- Event-driven waiting — no arbitrary delays or setTimeout
- Reusable `waitForMyTurn(page)` helper function for Phase 4 reuse
- 30-second timeout for bot turn — fail with screenshot if exceeded
- Lord Rattington plays instantly, so turn detection should be near-immediate

### Test Structure
- `e2e/auth.spec.ts` — login test (GAME-01) + full game setup flow (GAME-02/03/04)
- `e2e/fixtures.ts` — add `authenticatedPage` fixture
- `e2e/helpers/` — `waitForMyTurn(page)` and other reusable game helpers

### Claude's Discretion
- Exact Angular state access patterns (depends on version found during research)
- API endpoint discovery approach (devtools recording, source inspection, etc.)
- Helper function signatures and internal implementation
- How to handle edge cases in table creation flow
- Whether WebSocket or polling interception patterns are used

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### E2E Infrastructure (from Phase 1)
- `e2e/fixtures.ts` — Existing Playwright fixtures (context, extensionId, gamePage, sidePanelPage). New `authenticatedPage` fixture extends this.
- `e2e/global-setup.ts` — Current global setup (build only). Must be updated to chain env-setup.
- `e2e/smoke.spec.ts` — Existing smoke tests. Must continue to pass (now with credentials required).
- `playwright.config.ts` — Current config. Needs per-project retry config for auth tests.

### Project Requirements
- `.planning/REQUIREMENTS.md` — GAME-01 through GAME-04 define the phase requirements

### Architecture Decisions
- `docs/adr/` — Check for any ADRs about testing strategy or DOM interaction patterns

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `e2e/fixtures.ts`: Provides `context`, `extensionId`, `gamePage`, `sidePanelPage` fixtures. New `authenticatedPage` fixture should follow same pattern.
- `e2e/global-setup.ts`: Runs `npm run build` via `execSync`. Chain env-setup before build.
- `dotenv` already installed as devDependency.

### Established Patterns
- Persistent browser context with `channel: 'chromium'` and empty `userDataDir` (fresh profile each run)
- Service worker race condition handled via `waitForEvent` fallback
- Side panel tested via direct tab navigation to `chrome-extension://<id>/sidepanel.html`
- All tests serial (`workers: 1`) due to single-account constraint

### Integration Points
- `gamePage` fixture navigates to `https://dominion.games` — `authenticatedPage` extends this with login
- `playwright.config.ts` needs per-project config for retry settings on auth tests
- `e2e/global-setup.ts` needs to chain `e2e/env-setup.ts` for credential validation

</code_context>

<specifics>
## Specific Ideas

- "Avoid relying on HTML elements except as a last resort. Use Angular state and find API methods to use and look at the responses."
- Researcher should figure out the Angular version and transport mechanism (REST vs WebSocket)
- API response interception is the primary mechanism for detecting state transitions (login, game start, turn changes)

</specifics>

<deferred>
## Deferred Ideas

- Auth state caching to skip login on subsequent runs — deferred to EXT-04 (v2)
- Specific card set selection for reproducible kingdoms — not needed for random testing approach

</deferred>

---

*Phase: 02-authentication-game-setup*
*Context gathered: 2026-03-17*
