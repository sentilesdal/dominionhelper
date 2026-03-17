# Roadmap: E2E Testing Infrastructure

## Overview

Build a Playwright-based E2E test suite that loads the Dominion Helper Chrome extension into a real browser, logs into dominion.games, starts a game with a bot, and verifies that the extension's kingdom analysis and deck tracker work correctly against live game state. The roadmap progresses from bare infrastructure (extension loads in Playwright) through game automation (login, table, game start) to feature verification (kingdom analysis, then tracker accuracy). Each phase produces runnable tests that prove the foundation for the next phase.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Test Harness** - Playwright config, extension loading, fixtures, and smoke test proving the extension runs in an automated browser
- [ ] **Phase 2: Authentication & Game Setup** - Login automation, table creation with bot, game start detection, and turn detection
- [ ] **Phase 3: Kingdom Verification** - Side panel displays kingdom analysis with 10 cards, components, synergies, and archetypes
- [ ] **Phase 4: Tracker Verification** - Zone count accuracy, card movement tracking, structural invariant assertions, and failure diagnostics

## Phase Details

### Phase 1: Test Harness
**Goal**: A developer can run `npm run test:e2e` and see a Playwright test that loads the extension, confirms the service worker is running, and renders the side panel page in a browser tab
**Depends on**: Nothing (first phase)
**Requirements**: HARNESS-01, HARNESS-02, HARNESS-03, HARNESS-04, HARNESS-05, HARNESS-06, DX-01, DX-02, DX-04
**Success Criteria** (what must be TRUE):
  1. Running `npm run test:e2e` launches Playwright with the built extension loaded via persistent browser context using bundled Chromium
  2. The test fixture automatically extracts the extension ID from the service worker URL and provides page handles for the game tab and side panel tab
  3. A smoke test passes that verifies the extension's service worker is active and the side panel page renders content
  4. Tests run serially (workers: 1) and support `--headed` flag for visual debugging
  5. The extension is built automatically before the test suite runs
**Plans**: TBD

Plans:
- [ ] 01-01: TBD
- [ ] 01-02: TBD

### Phase 2: Authentication & Game Setup
**Goal**: Tests can log into dominion.games, create a table with Lord Rattington, start a game, and detect when it is the human player's turn
**Depends on**: Phase 1
**Requirements**: GAME-01, GAME-02, GAME-03, GAME-04
**Success Criteria** (what must be TRUE):
  1. A test logs into dominion.games using credentials from a `.env` file and reaches the lobby
  2. A test creates a table with a bot opponent and starts a game that shows 10 kingdom cards in the kingdom viewer
  3. A test detects when the bot's turn ends and the human player's turn begins
**Plans**: TBD

Plans:
- [ ] 02-01: TBD

### Phase 3: Kingdom Verification
**Goal**: The side panel displays correct kingdom analysis data after a game starts, proving the content script to service worker to side panel messaging pipeline works end-to-end
**Depends on**: Phase 2
**Requirements**: KINGDOM-01, KINGDOM-02, KINGDOM-03
**Success Criteria** (what must be TRUE):
  1. The side panel shows analysis data after kingdom cards are detected in the game
  2. The analysis reports exactly 10 kingdom cards (structural assertion, not specific card names)
  3. The analysis tab renders components, synergies, and archetype sections with non-empty content
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

### Phase 4: Tracker Verification
**Goal**: The deck tracker in the side panel accurately reflects game state -- starting deck composition, hand draws, card plays, buys, and turn transitions -- using structural invariant assertions that work with any random kingdom
**Depends on**: Phase 3
**Requirements**: TRACKER-01, TRACKER-02, TRACKER-03, TRACKER-04, TRACKER-05, TRACKER-06, TRACKER-07, DX-03
**Success Criteria** (what must be TRUE):
  1. The tracker shows 7 Copper and 3 Estate as the starting deck for the human player
  2. After initial draw, the tracker shows 5 cards in hand and 5 cards in deck
  3. After playing treasures and buying a card, zone counts update correctly (in-play increases, discard reflects bought card after turn end)
  4. All zone count assertions use `expect.poll()` for eventual consistency with async game state updates
  5. Failed tests capture a screenshot and game log text for debugging
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Test Harness | 0/0 | Not started | - |
| 2. Authentication & Game Setup | 0/0 | Not started | - |
| 3. Kingdom Verification | 0/0 | Not started | - |
| 4. Tracker Verification | 0/0 | Not started | - |

---
*Roadmap created: 2026-03-17*
