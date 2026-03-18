---
phase: 02-authentication-game-setup
plan: 01
subsystem: testing
tags: [playwright, dotenv, e2e, credentials, fixtures]

requires:
  - phase: 01-test-harness
    provides: Playwright E2E infrastructure (fixtures.ts, global-setup.ts, smoke.spec.ts, playwright.config.ts)
provides:
  - e2e/env-setup.ts with credential loading and validateCredentials()
  - authenticatedPage fixture with login, retry, and screenshot-on-failure
  - Smoke test skip guard for missing credentials
  - .env.example template for credential setup
  - Project-based Playwright config with auth retry
affects: [02-02, auth-tests, game-setup-tests]

tech-stack:
  added: []
  patterns: [credential-skip-guard, authenticatedPage-fixture, project-based-retry]

key-files:
  created:
    - e2e/env-setup.ts
    - .env.example
  modified:
    - e2e/global-setup.ts
    - e2e/fixtures.ts
    - e2e/smoke.spec.ts
    - playwright.config.ts
    - .gitignore

key-decisions:
  - "validateCredentials returns null (not throws) so callers can decide skip vs fail"
  - "Smoke tests use beforeEach skip guard rather than fixture-level skip for clarity"
  - "authenticatedPage wraps gamePage with login logic and 2-attempt retry"
  - "Login form uses resilient selectors: input[type=text], input[type=password], role-based button"

patterns-established:
  - "Credential skip guard: import validateCredentials, check in beforeEach, test.skip if null"
  - "Auth fixture pattern: depends on gamePage, adds login with retry, screenshot on failure"
  - "Project-based Playwright config: separate retry policies for smoke vs auth test suites"

requirements-completed: [GAME-01]

duration: 3min
completed: 2026-03-18
---

# Phase 2 Plan 1: Credential Management & Auth Fixtures Summary

**Dotenv credential loading with validateCredentials(), authenticatedPage fixture with retry and screenshot-on-failure, smoke test skip guard, and project-based Playwright retry config**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-18T16:17:04Z
- **Completed:** 2026-03-18T16:20:23Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Created e2e/env-setup.ts that loads .env via dotenv and exports validateCredentials() for credential presence checks
- Added authenticatedPage fixture to e2e/fixtures.ts with AngularJS wait, login form fill, API response verification, 2-attempt retry, and screenshot capture on failure
- Updated smoke tests to skip gracefully when credentials are absent via test.beforeEach guard
- Configured Playwright projects with separate retry policy (1 retry for auth tests, 0 for smoke)
- Added .env to .gitignore and created .env.example with placeholder credentials

## Task Commits

Each task was committed atomically:

1. **Task 1: Create credential management and update global setup** - `ac17084` (feat)
2. **Task 2: Update fixtures with authenticatedPage and configure Playwright retry** - `6f69303` (feat)

## Files Created/Modified
- `e2e/env-setup.ts` - Dotenv loading and validateCredentials() export
- `.env.example` - Template with DOMINION_USER and DOMINION_PASS placeholders
- `.gitignore` - Added .env entry to prevent credential leaks
- `e2e/global-setup.ts` - Chains env validation before extension build, warns if credentials missing
- `e2e/fixtures.ts` - Added authenticatedPage fixture with full login flow
- `e2e/smoke.spec.ts` - Added beforeEach credential skip guard
- `playwright.config.ts` - Added projects array with smoke and auth configs

## Decisions Made
- validateCredentials returns null (not throws) so callers can choose between test.skip() and throwing
- Used resilient selectors for login form (input[type="text"], input[type="password"], role-based button locator) per research recommendations
- Smoke tests use beforeEach skip guard for explicit per-test skipping rather than a fixture-level approach
- Login verification uses API response interception (waitForResponse) per CONTEXT.md "verify login success via API response" decision

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required

Users must create a `.env` file in the project root with valid dominion.games credentials:

```
DOMINION_USER=your_actual_username
DOMINION_PASS=your_actual_password
```

See `.env.example` for the template. Without this file, all E2E tests will skip.

## Next Phase Readiness
- Credential infrastructure is complete and ready for auth tests (e2e/auth.spec.ts in Plan 02)
- authenticatedPage fixture is ready for use by game setup tests
- Login form selectors are based on research; may need adjustment when first run against live dominion.games
- WebSocket and game log patterns from 02-RESEARCH.md are ready for Plan 02 implementation

## Self-Check: PASSED

All 8 files verified present. Both task commits (ac17084, 6f69303) confirmed in git log.

---
*Phase: 02-authentication-game-setup*
*Completed: 2026-03-18*
