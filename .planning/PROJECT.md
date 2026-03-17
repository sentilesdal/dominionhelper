# Dominion Helper — E2E Testing Infrastructure

## What This Is

End-to-end testing infrastructure for the Dominion Helper Chrome extension. Uses Playwright to automate a real Chrome browser with the extension loaded, log into dominion.games, create games with bots, and verify that the extension's deck tracker correctly reflects game state. Also enables Claude Code agents to verify their own work via `claude --chrome` during development.

## Core Value

Agents building the extension can automatically verify that features work against a live dominion.games game, catching regressions and eliminating manual testing bottlenecks.

## Requirements

### Validated

- ✓ Kingdom card detection from dominion.games DOM — existing
- ✓ Synergy and archetype analysis engine — existing
- ✓ Opening buy recommendations — existing
- ✓ Game log parsing and card movement tracking — existing
- ✓ Deck/hand/discard/in-play zone management — existing
- ✓ Draw probability calculations — existing
- ✓ Side panel UI with kingdom analysis and tracker tabs — existing
- ✓ Angular bridge for game state snapshots — existing
- ✓ Unit test suite (Vitest) covering analysis, parsing, tracking — existing

### Active

- [ ] Playwright E2E test suite that loads the extension and tests against live dominion.games
- [ ] Automated login to dominion.games using env var credentials
- [ ] Automated table creation with a bot opponent
- [ ] Deck size tracking verification (deck count matches expected after draws/shuffles)
- [ ] Hand composition verification (cards shown in hand match tracker state)
- [ ] Discard pile tracking verification (played/bought cards move to discard correctly)
- [ ] In-play zone verification (played action cards appear in play zone)
- [ ] Side panel state verification (UI reflects correct tracker data)
- [ ] Generic test design that handles random kingdom card sets (base set only)
- [ ] Claude Code `--chrome` integration for agent self-verification during development

### Out of Scope

- Testing non-base-set card interactions — limit to base set for now
- Performance benchmarking — focus on correctness
- Visual regression testing — verify data accuracy, not pixel-perfect UI
- Mobile or non-Chrome browsers — extension is Chrome-only
- CI/CD integration — tests run locally for now (dominion.games requires real login)

## Context

Development velocity has slowed because agents writing features for the extension can't verify their work without manual testing. The extension tracks game state by parsing the game log and augmenting with Angular bridge snapshots, but there's no automated way to confirm this works against the real game.

dominion.games is an Angular application. The game randomly selects 10 kingdom cards from available sets. By using a free-tier account limited to the base set, we reduce the card pool but still get random kingdoms each game. Tests must be generic enough to handle any base-set kingdom.

Claude Code's Chrome integration (`claude --chrome`) connects to a real Chrome browser via the Claude in Chrome extension and native messaging. This lets agents navigate pages, read DOM state, and interact with the browser. This should complement the automated Playwright suite for ad-hoc verification.

Playwright supports loading Chrome extensions via persistent browser contexts with `--load-extension` and `--disable-extensions-except` flags, which is exactly what we need to test the extension against a real site.

## Constraints

- **Test framework**: Playwright (first-class Chrome extension support via persistent contexts)
- **Unit tests**: Vitest (existing, keep as-is)
- **Credentials**: `.env` file with `DOMINION_USER` and `DOMINION_PASS`, gitignored
- **Account**: Free-tier dominion.games account (base set only)
- **Random kingdoms**: Tests must not assume specific cards — verify generic behaviors (deck count, zone transitions)
- **Build requirement**: Extension must be built (`npm run build`) before E2E tests run

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Playwright over Puppeteer | Better extension support, auto-wait, built-in test runner | — Pending |
| Free-tier account for testing | Limits card pool to base set, reduces test complexity | — Pending |
| Env vars for credentials | Standard approach, gitignored, works with CI later | — Pending |
| Generic tests (no specific cards) | Random kingdoms mean tests can't depend on card names | — Pending |
| Separate from unit tests | E2E tests are slow, should run independently via `npm run test:e2e` | — Pending |

---
*Last updated: 2026-03-17 after initialization*
