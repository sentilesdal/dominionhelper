# Requirements: E2E Testing Infrastructure

**Defined:** 2026-03-17
**Core Value:** Agents building the extension can automatically verify that features work against a live dominion.games game, catching regressions and eliminating manual testing bottlenecks.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Test Harness

- [ ] **HARNESS-01**: Playwright config loads the built extension via persistent browser context with `channel: 'chromium'`
- [ ] **HARNESS-02**: Test fixture extracts dynamic extension ID from service worker URL
- [ ] **HARNESS-03**: Test fixture provides game page handle (dominion.games tab)
- [ ] **HARNESS-04**: Test fixture provides side panel page handle (navigated to `chrome-extension://<id>/sidepanel.html`)
- [ ] **HARNESS-05**: Extension builds automatically before E2E test suite runs (`npm run build`)
- [x] **HARNESS-06**: Smoke test proves extension loads, service worker starts, and side panel renders

### Authentication & Game Setup

- [ ] **GAME-01**: Tests log into dominion.games using credentials from `.env` file (`DOMINION_USER`, `DOMINION_PASS`)
- [ ] **GAME-02**: Tests create a table with a bot opponent (Lord Rattington)
- [ ] **GAME-03**: Tests start a game and wait for the kingdom viewer to appear (10 kingdom cards visible)
- [ ] **GAME-04**: Tests can detect when the bot's turn is complete and the human player's turn begins

### Kingdom Verification

- [ ] **KINGDOM-01**: Side panel displays analysis data after kingdom cards are detected
- [ ] **KINGDOM-02**: Analysis shows 10 kingdom cards (structural assertion, no specific card names)
- [ ] **KINGDOM-03**: Analysis tab renders components, synergies, and archetype sections

### Tracker Verification

- [ ] **TRACKER-01**: Starting deck state shows 7 Copper and 3 Estate for the human player
- [ ] **TRACKER-02**: After initial draw, hand shows 5 cards and deck shows 5 cards
- [ ] **TRACKER-03**: After playing treasure cards, played cards move to in-play zone
- [ ] **TRACKER-04**: After buying a card, the bought card appears in discard zone
- [ ] **TRACKER-05**: After ending turn, hand and in-play cards move to discard zone
- [ ] **TRACKER-06**: Zone counts are verified using `expect.poll()` for eventual consistency
- [ ] **TRACKER-07**: Tests handle random kingdoms by asserting structural invariants (counts, zone transitions) not specific card names

### Developer Experience

- [x] **DX-01**: E2E tests run via `npm run test:e2e` (separate from `npm test` unit tests)
- [x] **DX-02**: Tests run serially (`workers: 1`) since one account can only be in one game
- [ ] **DX-03**: Failed tests capture screenshot and game log text for debugging
- [x] **DX-04**: Tests support headed mode via `--headed` flag for visual debugging

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Extended Testing

- **EXT-01**: Multi-turn game scenario tests (3-5 turns with buys each turn)
- **EXT-02**: Service worker state inspection via `serviceWorker.evaluate()` for raw TrackerData
- **EXT-03**: Turn-aware expected-state tracking (predict zone counts from game history)
- **EXT-04**: Auth state caching to skip login on subsequent test runs

### Agent Integration

- **AGENT-01**: Claude Code `--chrome` integration guide for agent self-verification
- **AGENT-02**: Helper scripts for agents to launch browser and verify extension behavior

## Out of Scope

| Feature | Reason |
|---------|--------|
| Card-name-specific assertions | Kingdoms are random; asserting specific names makes tests flaky by design |
| Visual regression / screenshot comparison | Game has animations and timing-dependent layouts; pixel comparisons flake |
| Non-base-set card testing | Free-tier account only has base set; expansion cards add massive complexity |
| Full game completion tests | Playing to completion takes 15-30 min; tracker logic is the same at turn 5 and turn 30 |
| Mocking dominion.games | Defeats purpose of E2E testing against real game |
| CI/CD integration | dominion.games requires real login; bot detection may block CI runners |
| Parallel test execution | One account per game; parallel tests fight over the account |
| Test-only hooks in production code | Pollutes production code and creates untested code paths |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| HARNESS-01 | Phase 1 | Pending |
| HARNESS-02 | Phase 1 | Pending |
| HARNESS-03 | Phase 1 | Pending |
| HARNESS-04 | Phase 1 | Pending |
| HARNESS-05 | Phase 1 | Pending |
| HARNESS-06 | Phase 1 | Complete |
| GAME-01 | Phase 2 | Pending |
| GAME-02 | Phase 2 | Pending |
| GAME-03 | Phase 2 | Pending |
| GAME-04 | Phase 2 | Pending |
| KINGDOM-01 | Phase 3 | Pending |
| KINGDOM-02 | Phase 3 | Pending |
| KINGDOM-03 | Phase 3 | Pending |
| TRACKER-01 | Phase 4 | Pending |
| TRACKER-02 | Phase 4 | Pending |
| TRACKER-03 | Phase 4 | Pending |
| TRACKER-04 | Phase 4 | Pending |
| TRACKER-05 | Phase 4 | Pending |
| TRACKER-06 | Phase 4 | Pending |
| TRACKER-07 | Phase 4 | Pending |
| DX-01 | Phase 1 | Complete |
| DX-02 | Phase 1 | Complete |
| DX-03 | Phase 4 | Pending |
| DX-04 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 24 total
- Mapped to phases: 24
- Unmapped: 0

---
*Requirements defined: 2026-03-17*
*Last updated: 2026-03-17 after initial definition*
