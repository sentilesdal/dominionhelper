# Codebase Concerns

**Analysis Date:** 2026-03-17

## Tech Debt

**Hardcoded DOM Selectors (Fragile):**
- Issue: DOM parsing relies on brittle selectors that break if dominion.games changes its layout
- Files: `src/content/observer.ts`, `src/content/log-observer.ts`
- Impact: If dominion.games updates their DOM structure, kingdom detection and log parsing will silently fail with no error feedback. Players won't know the extension has stopped working.
- Fix approach: Create an abstraction layer with fallback selectors and add error logging/metrics to detect when selectors fail. Consider adding a UI alert when detection fails.

**DOM Observer Initialization Race Condition:**
- Issue: `observeKingdom()` and `observeGameLog()` in `src/content/content.ts` attach observers immediately, but dominion.games may not have rendered those DOM elements yet
- Files: `src/content/observer.ts` (line 120-124), `src/content/log-observer.ts` (line 106-112)
- Impact: If the extension loads before the page fully renders, the first immediate check may miss the kingdom even though it's present on screen
- Fix approach: The log observer already has a 2-second polling retry (`log-observer.ts` lines 106-112); the kingdom observer should have the same. Currently relies on mutation events to catch late-loaded kingdoms.

**Abbreviation Derivation Logic is Heuristic:**
- Issue: `deriveAbbrev()` in `src/tracker/deck-state.ts` (lines 297-325) uses the shortest unique prefix assumption, but this may fail if two players have names starting with the same letter
- Files: `src/tracker/deck-state.ts` (lines 297-325, 393-405)
- Impact: Player name mappings could be incorrect or unstable in edge cases, causing stale player tabs or wrong stats displayed
- Fix approach: Get player initials from the Angular snapshot (`PlayerSnapshot.initials`) which comes from the game engine directly. Only fall back to abbreviation derivation if Angular data is unavailable.

**Unguarded Map Access in Deck State:**
- Issue: Multiple functions in `src/tracker/deck-state.ts` assume players exist in `state.players` before operating on them
- Files: `src/tracker/deck-state.ts` (lines 158-226, 258-276, 489-491)
- Impact: If log parsing encounters a player abbreviation never seen before (corrupted log or edge case), the code gracefully creates new player zones (via `ensurePlayer`), but there's no validation that the created state is consistent
- Fix approach: Already mitigated by `ensurePlayer()` calls, but add defensive assertions in tests for malformed logs with unknown player abbreviations.

**Card Database Lookup Assumes Card Exists:**
- Issue: `getCardCoinValue()` in `src/tracker/stats.ts` (lines 70-76) returns 0 for unknown cards, but this silently hides data problems
- Files: `src/tracker/stats.ts` (line 71-72), `src/content/content.ts` (lines 177-182)
- Impact: If card database is incomplete or card names are misspelled in logs, the extension silently produces incorrect statistics without warning
- Fix approach: Log unknown cards; side panel already has an `unknown` array in `AnalysisResult`, should do the same for tracker. Add a "Not In Database" section for tracker unknown cards.

## Known Bugs

**Deck/Discard Split is Approximate When Discard is Non-Empty:**
- Symptoms: When a player's discard pile has cards and the deck is not empty, the extension distributes cards from the deck pool between deck and discard using a heuristic: fill the draw pile up to Angular's `deckCount`, then put the rest in discard. The specific card composition is inferred, not exact.
- Files: `src/tracker/deck-state.ts` (lines 533-557)
- Trigger: Happens when `discardCount > 0` and multiple cards are in the pool. The most accurate time is right after a shuffle when discard is empty.
- Current mitigation: The code has the correct total counts (from Angular), so draw probability calculations are correct even if the per-card distribution between deck and discard is approximate. The "deck/discard split" display may show cards in the wrong zone, but probabilities remain accurate.

**Player Selection Doesn't Persist Across Page Reloads:**
- Symptoms: If the user selects a player in the tracker and reloads the dominion.games page, the selected player reverts to the local player
- Files: `src/content/content.ts` (line 102), `src/background/service-worker.ts` (lines 31-34)
- Trigger: Page reload or game start
- Workaround: User can click the player tab again after reload. The extension detects the new game and resets state.

**Log Parser Pluralization Edge Cases:**
- Symptoms: Some cards with unusual plural forms may not be singularized correctly (e.g., cards already plural in the database like "Gardens" would be treated as plural and converted to "Garden", breaking lookups)
- Files: `src/tracker/log-parser.ts` (lines 81-100)
- Trigger: Card name ends with 's' but is already the singular database name
- Current mitigation: `PLURAL_EXCEPTIONS` set (lines 16-42) handles known edge cases, but the list may be incomplete if new cards are added to the database

## Security Considerations

**Content Script Runs in Isolated World:**
- Risk: The content script cannot directly read the page's Angular context but must receive data via CustomEvents from a MAIN-world bridge script
- Files: `src/content/content.ts`, `src/content/game-state-bridge.ts`
- Current mitigation: This is actually a security feature. The ISOLATED world prevents the content script from being manipulated by page JavaScript. The bridge pattern is intentional and secure.
- No action needed.

**Message Passing Between Worlds Not Validated:**
- Risk: The content script (`src/content/content.ts`) listens for `dominion-helper-game-state` CustomEvents without type checking
- Files: `src/content/content.ts` (lines 261-284)
- Current mitigation: The event comes from a script we control (`game-state-bridge.ts`), not arbitrary page code. Type casting `(e as CustomEvent).detail` is safe because the bridge is the only source.
- Recommendation: If the architecture changes to accept external event sources, add runtime validation.

**Card Data Not Validated on Load:**
- Risk: `src/data/cards.json` is bundled into the content script and loaded without schema validation
- Files: `src/content/content.ts` (line 46)
- Current mitigation: The card database is built into the extension at compile time, not loaded from external sources. Validation happens during testing (`tests/cards-data.test.ts`).
- No immediate risk but recommend schema validation test coverage.

**Chrome Message API Doesn't Confirm Delivery:**
- Risk: `chrome.runtime.sendMessage()` calls in `src/background/service-worker.ts` (lines 69-76, 91-98) use `.catch()` to silently ignore failures if the side panel is closed
- Files: `src/background/service-worker.ts` (lines 69-98)
- Current mitigation: The service worker caches analysis and tracker data (lines 31-34), so the side panel can retrieve it later when opened via `GET_ANALYSIS` / `GET_TRACKER` messages.
- This is by design and safe.

## Performance Bottlenecks

**MutationObserver with Broad Subtree Watch:**
- Problem: `observeKingdom()` observes all of `document.body` with `subtree: true` (line 115-118 in `observer.ts`). Every DOM change on the page triggers the observer callback.
- Files: `src/content/observer.ts` (lines 115-118)
- Cause: Dominion.games is an Angular app with frequent animations and state updates. The 500ms debounce mitigates this, but the callback still fires on every mutation.
- Improvement path: Observe only the specific container (KINGDOM-VIEWER or .card-stacks) instead of `document.body`. This would reduce observer overhead significantly.

**Game Log Observer Polls Every 2 Seconds if Container Missing:**
- Problem: If the game hasn't started when the extension loads, `observeGameLog()` polls for the log container every 2 seconds until it finds it
- Files: `src/content/log-observer.ts` (lines 106-112)
- Cause: dominion.games doesn't render the game log until a game has actually started. The polling ensures the observer attaches once a game begins.
- Improvement path: This is necessary overhead but could be optimized by detecting game start via the first "Turn 1" log entry instead of polling the DOM.

**Monte Carlo Simulation for Draw Probabilities (1000 iterations):**
- Problem: `SIMULATION_ITERATIONS = 1000` in `src/tracker/stats.ts` (line 24) runs on every tracker update
- Files: `src/tracker/stats.ts` (lines 21-24, 104-130)
- Cause: The extension simulates hand draws 1000 times per player per update to calculate `fivePlusCoinProb` and `eightPlusCoinProb`. This is accurate but expensive.
- Impact: On a 4-player game, this is 4000 simulations per log entry. Most entries are single cards, so the cost is actually low per log entry, but it adds up during heavy action turns.
- Improvement path: Use closed-form hypergeometric distribution (already implemented for per-card probabilities on line 42-61) for hand value thresholds instead of Monte Carlo. Or cache probabilities during turns when deck composition hasn't changed.

**Card Database Lookup is Linear Scan if Card Not in Map:**
- Problem: `CARD_DB` in `src/content/content.ts` (line 46) is a Map, so lookups are O(1), but every call to get card info still requires a lookup
- Files: `src/content/content.ts` (lines 46, 177-182)
- Impact: Negligible in practice (hundreds of lookups per game), but the code iterates over stats.allCards (potentially hundreds of entries) on every tracker update.
- This is not a real bottleneck.

## Fragile Areas

**Sidepanel UI Rendering (462 lines, large component):**
- Files: `src/sidepanel/sidepanel.ts`
- Why fragile: The sidepanel is a large monolithic file that handles kingdom analysis display, tracker display, player selection, and UI state all in one file. Changes to one section (e.g., adding a new stat) risk breaking the entire rendering pipeline.
- Safe modification: Separate rendering into smaller functions/modules. Consider extracting kingdom display, tracker display, and player tabs into separate modules.
- Test coverage: `tests/tracker-ui.test.ts` and `tests/ui.test.ts` exist but may not cover all combinations of player counts and game states.

**Deck State Hybrid Zone Building (lines 482-563):**
- Files: `src/tracker/deck-state.ts` (lines 482-563)
- Why fragile: The `buildHybridZones()` function is the most critical path for accurate tracker display. It combines log-based ownership tracking with Angular snapshot data. If the logic is off, all zone displays are wrong.
- Safe modification: Any changes to `buildHybridZones()` must include tests for: (1) single player, (2) multiple players, (3) empty discard (exact), (4) non-empty discard (approximate), (5) cards in hand/play that don't exist in log-owned list.
- Test coverage: `tests/deck-state.test.ts` has tests but should include all scenarios above.

**Log Parser Regex Patterns (lines 47-62):**
- Files: `src/tracker/log-parser.ts` (lines 47-62)
- Why fragile: The order of regex patterns matters. "buys and gains" must come before "gains" (line 48-49). If a new action type is added that partially matches an existing pattern, it will fail silently.
- Safe modification: Add comments explaining why order matters. Add a test for every action type that could have an ambiguous pattern.
- Test coverage: `tests/log-parser.test.ts` has good coverage but should explicitly test pattern ordering.

**Angular Bridge Snapshot Reading (lines 39-89 in game-state-bridge.ts):**
- Files: `src/content/game-state-bridge.ts` (lines 39-89)
- Why fragile: The bridge reads nested Angular objects without strong typing. If dominion.games updates their Angular structure (e.g., `zone.cardStacks` becomes `zone.stacks`), the bridge silently returns null and zone data is missing.
- Safe modification: Add inline documentation explaining the Angular structure it expects. Consider adding a version check or fallback structure.
- Test coverage: This code runs in MAIN world and can't be unit tested easily. Manual testing required on dominion.games.

## Scaling Limits

**Multiple Players in Tracker:**
- Current capacity: Tested with 2-4 players locally; designed to handle up to 6-8 (typical maximum in Dominion)
- Limit: The sidepanel UI has fixed tab dimensions. If more than 8 players are in a game (extremely rare), tabs may overflow.
- Scaling path: Make the player tab container scrollable or dynamic in width. The underlying state tracking has no limit.

**Card Database Size:**
- Current capacity: 786 cards, 18 sets (as of 2026-03)
- Limit: None identified. Cards are loaded into a Map at startup, lookup is O(1). The JSON file grows linearly with card count.
- Scaling path: No action needed unless Dominion releases >1000 cards. Consider compressing cards.json if it exceeds 500KB.

**Game Log Line Processing:**
- Current capacity: 1000+ log lines per game processed with no lag
- Limit: Very long games (2000+ lines) might show slight delay on log update, but this is acceptable UX
- Scaling path: Not a concern; dominion.games games rarely exceed 300 moves per player.

## Dependencies at Risk

**Vite (7.3.1) — Build Bundler:**
- Risk: Vite is actively maintained but the chrome extension build process is custom and may break if Vite internals change
- Impact: Build script (`scripts/build.mjs`) calls `vite.build()` four times; if Vite's build API changes, the extension can't be packaged
- Migration plan: If Vite becomes unmaintained, switch to esbuild or rollup (which Vite uses under the hood anyway)

**Vitest (3.0.0) — Test Runner:**
- Risk: Vitest is pre-1.0 software (current version 3.0.0 as of March 2026); breaking changes are possible
- Impact: Tests may fail to run or require rewrites on major Vitest updates
- Migration plan: Keep Vitest pinned to a known-good version in package.json; migrate to stable Jest or Node's native test runner if Vitest becomes problematic

**ESLint (10.0.2) with Flat Config:**
- Risk: ESLint flat config is relatively new (adopted in v8+); some plugins may not support it
- Impact: If a useful linting plugin doesn't support flat config, we're stuck using the old .eslintrc format
- Migration plan: The current config in `eslint.config.mjs` is minimal and doesn't rely on plugins, so risk is low

**Chrome Extension APIs (Manifest V3):**
- Risk: Chrome may deprecate specific APIs. Side panels are relatively new (introduced in Chrome 114).
- Impact: If side panels are removed, the entire UI needs to be rebuilt (popup or DevTools panel instead)
- Current usage: `chrome.sidePanel`, `chrome.storage.session`, `chrome.runtime`, `chrome.tabs`
- Mitigation: Side panels are stable APIs with no deprecation warnings. No action needed.

## Missing Critical Features

**No Error Recovery for Missing Log Container:**
- Problem: If the game log DOM never appears (dominion.games broken or extreme edge case), the log observer polls forever every 2 seconds
- Blocks: Tracker won't work if the log can't be found
- Improvement: Add a timeout after 30 seconds of polling; if the log container still doesn't appear, notify the user via a console warning and give up polling

**No Validation of Card Name Case Sensitivity:**
- Problem: Dominion card names are case-sensitive (e.g., "Village" not "village"). If a log line has a typo or the Angular bridge returns a different case, the card lookup fails silently
- Blocks: Stats become inaccurate for misspelled cards
- Improvement: Add case-insensitive lookup with a warning if a fuzzy-matched card is used. Or validate card names during log parsing against a whitelist.

**No Handling of Duplicate Player Names:**
- Problem: Two players could theoretically have the same name (not common but possible). The abbreviation derivation logic doesn't handle this case
- Blocks: Player stats would be mixed or lost
- Improvement: Use Angular `PlayerSnapshot.initials` as the primary identifier instead of derived abbreviations

**No Persistence of Game History:**
- Problem: Once a game ends and the page resets, all tracker data is lost
- Blocks: Users can't review past games or track stats over time
- Current state: This is Phase 3+ work, not Phase 1
- Improvement path: Store game snapshots in `chrome.storage.local`; add a game history tab to the sidepanel

## Test Coverage Gaps

**DOM Observer with No Observers/Selectors Available:**
- What's not tested: `extractCardNames()` when KINGDOM-VIEWER exists but is empty, or when .card-stacks exists but contains no cards
- Files: `src/content/observer.ts` (lines 45-91)
- Risk: The function returns an empty array, which is correct, but edge case coverage is incomplete
- Priority: Low (graceful failure)

**Log Parser Edge Cases with Multi-Card Actions:**
- What's not tested: "m buys and gains 3 Coppers and 2 Silvers." (combining multiple card types in a single action)
- Files: `src/tracker/log-parser.ts` (lines 47-62)
- Risk: If the log grammar changes, parsing may fail silently
- Priority: Medium (could affect accuracy)

**Tracker Stats with Empty Deck:**
- What's not tested: `calculateStats()` when a player has 0 cards remaining in deck/discard (all in hand/play)
- Files: `src/tracker/stats.ts` (lines 42-130)
- Risk: Division by zero or hypergeometric function edge case
- Priority: Low (unlikely in actual gameplay, but possible in edge cases like someone playing all their cards)

**Angular Bridge with Malformed Zone Structure:**
- What's not tested: `getSnapshot()` behavior if Angular zone structure is incomplete (e.g., missing `cardStacks` array)
- Files: `src/content/game-state-bridge.ts` (lines 39-89)
- Risk: Silent null return, tracker doesn't update, player sees no stats
- Priority: Medium (dominion.games could update their Angular structure)

**Message Passing with Large Payloads:**
- What's not tested: `chrome.runtime.sendMessage()` with very large tracker data (1000+ cards in play across 6 players)
- Files: `src/background/service-worker.ts`, `src/content/content.ts`
- Risk: Chrome has message size limits (50MB in general, but practical limit is lower); large games could exceed this
- Priority: Low (Dominion games have at most a few hundred cards in play)

---

*Concerns audit: 2026-03-17*
