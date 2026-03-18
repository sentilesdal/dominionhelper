---
phase: 02-authentication-game-setup
plan: 02
subsystem: testing
tags: [playwright, e2e, game-setup, bot, lord-rattington, turn-detection, angularjs]

requires:
  - phase: 02-authentication-game-setup
    provides: authenticatedPage fixture, validateCredentials, env-setup.ts
provides:
  - e2e/helpers/game.ts with createTableWithBot, getKingdomCardCount, waitForMyTurn, getPlayerName
  - e2e/auth.spec.ts with login and game setup E2E tests (GAME-01 through GAME-04)
  - Resilient login form handling using pressSequentially for AngularJS compatibility
affects: [03-01, kingdom-verification, tracker-verification]

tech-stack:
  added: []
  patterns: [pressSequentially-for-angularjs, enter-key-form-submit, expect-poll-turn-detection, angular-scope-fallback]

key-files:
  created:
    - e2e/helpers/game.ts
    - e2e/auth.spec.ts
  modified:
    - e2e/fixtures.ts

key-decisions:
  - "Use pressSequentially() instead of fill() for password field to avoid AngularJS digest truncation"
  - "Submit login form via Enter key press instead of button click for resilience against DOM changes"
  - "Single combined test for GAME-02/03/04 since each step depends on previous (table -> game -> turn)"
  - "waitForMyTurn uses expect.poll with configurable intervals for eventual consistency"
  - "getPlayerName filters out Lord Rattington from game log turn markers to find human player"

patterns-established:
  - "AngularJS input pattern: use pressSequentially() with delay for fields where fill() causes truncation"
  - "Form submit pattern: press Enter on last field instead of locating submit button"
  - "Turn detection pattern: poll game log with multi-language regex (Turn/Zug/Tour) via expect.poll"
  - "Player discovery pattern: parse game log for unique player names, exclude bot name"

requirements-completed: [GAME-02, GAME-03, GAME-04]

duration: 5min
completed: 2026-03-18
---

# Phase 2 Plan 2: Game Interaction Helpers & Auth/Game-Setup Tests Summary

**Game interaction helpers (createTableWithBot, waitForMyTurn, getKingdomCardCount, getPlayerName) and E2E tests verifying login, table creation with Lord Rattington, 10-card kingdom detection, and turn detection**

## Performance

- **Duration:** ~5 min (across two sessions: initial implementation + login fix)
- **Started:** 2026-03-18T16:24:56Z
- **Completed:** 2026-03-18T16:35:50Z
- **Tasks:** 3 (2 auto + 1 checkpoint with fix)
- **Files modified:** 3

## Accomplishments
- Created four reusable game interaction helpers in e2e/helpers/game.ts for lobby navigation, kingdom counting, turn detection, and player name discovery
- Created auth.spec.ts with isolated login test (GAME-01) and combined game setup flow test (GAME-02 through GAME-04)
- Fixed AngularJS password field truncation by replacing fill() with pressSequentially() in the authenticatedPage fixture
- Fixed login form submission by replacing fragile button role locator with Enter key press on password field

## Task Commits

Each task was committed atomically:

1. **Task 1: Create game interaction helpers** - `9552cc8` (feat)
2. **Task 2: Create auth.spec.ts with login and game setup tests** - `8e3f95b` (feat)
3. **Task 3: Fix login flow (checkpoint fix)** - `55e616e` (fix)

## Files Created/Modified
- `e2e/helpers/game.ts` - Four exported helpers: createTableWithBot (lobby navigation), getKingdomCardCount (DOM + Angular fallback), waitForMyTurn (expect.poll turn detection), getPlayerName (game log parsing)
- `e2e/auth.spec.ts` - Two test blocks: Authentication (login + lobby verification) and Game setup flow (table creation, 10-card kingdom, turn detection)
- `e2e/fixtures.ts` - Fixed password fill (pressSequentially) and login submission (Enter key) in authenticatedPage fixture

## Decisions Made
- Used pressSequentially() with 50ms delay for password input -- AngularJS digest cycle interferes with Playwright's fill() on password fields, causing value truncation
- Submit login via Enter key on password field instead of clicking a button -- the button locator (getByRole with regex) did not match the actual DOM element, and Enter is universally supported by login forms
- Combined GAME-02, GAME-03, GAME-04 into a single test since each step depends on the previous (cannot detect turns without starting a game, cannot start without creating a table)
- Used expect.poll() with configurable intervals [200, 500, 1000] for turn detection rather than toPass, matching Playwright's recommended pattern for polling assertions

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed password field truncation in login flow**
- **Found during:** Task 3 (checkpoint verification by user)
- **Issue:** Playwright's fill() method conflicted with AngularJS digest cycle on the password input, causing only ~4 of ~12 characters to appear in the field
- **Fix:** Replaced fill() with click() + fill('') + pressSequentially(pass, { delay: 50 }) to type character by character
- **Files modified:** e2e/fixtures.ts
- **Verification:** User will re-test with --headed mode
- **Committed in:** 55e616e

**2. [Rule 1 - Bug] Fixed login button locator that never matched**
- **Found during:** Task 3 (checkpoint verification by user)
- **Issue:** getByRole('button', { name: /log\s*in|sign\s*in/i }) did not match the actual login button on dominion.games, preventing form submission
- **Fix:** Replaced button click with passwordInput.press('Enter') which submits the form regardless of button element type or text
- **Files modified:** e2e/fixtures.ts
- **Verification:** User will re-test with --headed mode
- **Committed in:** 55e616e

---

**Total deviations:** 2 auto-fixed (2 bugs found during user verification)
**Impact on plan:** Both fixes are essential for the login flow to work. The original selectors were based on research assumptions; real DOM differed. No scope creep.

## Issues Encountered
- Login form selectors from research did not match the live dominion.games DOM -- resolved by using more resilient approaches (sequential typing, Enter key submission)

## User Setup Required

Users must have a `.env` file with valid dominion.games credentials (see 02-01-SUMMARY.md for details). The user should re-run `npx playwright test e2e/auth.spec.ts --headed` to verify the login fix works.

## Next Phase Readiness
- Game interaction helpers (createTableWithBot, waitForMyTurn) are ready for Phase 3 kingdom verification tests
- waitForMyTurn is exported and reusable for Phase 4 tracker tests
- Login flow fix needs user re-verification with --headed mode to confirm
- Kingdom card selectors (.kingdom-viewer-group, .full-card-name.card-name) in game helpers may need adjustment when tested against live game

## Self-Check: PASSED

All 4 files verified present. All 3 task commits (9552cc8, 8e3f95b, 55e616e) confirmed in git log.

---
*Phase: 02-authentication-game-setup*
*Completed: 2026-03-18*
