# Codebase Structure

**Analysis Date:** 2026-03-17

## Directory Layout

```
dominionhelper/
├── src/                              # Source code (TypeScript)
│   ├── types.ts                      # Shared type definitions
│   ├── analysis/                     # Kingdom analysis engine
│   │   ├── engine.ts                 # Main orchestrator
│   │   ├── synergies.ts              # Synergy detection
│   │   ├── archetypes.ts             # Strategy archetype classification
│   │   └── openings.ts               # Opening buy recommendations
│   ├── content/                      # Content script (runs on dominion.games)
│   │   ├── content.ts                # Entry point, wires observers & tracker
│   │   ├── observer.ts               # DOM observer for kingdom cards
│   │   ├── log-observer.ts           # DOM observer for game log
│   │   ├── game-state-bridge.ts      # MAIN-world Angular bridge
│   │   └── serialize.ts              # Map → object serialization helpers
│   ├── tracker/                      # Real-time deck tracking
│   │   ├── log-parser.ts             # Parse game log lines → LogEntry
│   │   ├── deck-state.ts             # Game state & zone management
│   │   └── stats.ts                  # Deck composition & probability calculations
│   ├── sidepanel/                    # Side panel UI
│   │   ├── sidepanel.ts              # Entry point & message listener
│   │   ├── sidepanel.html            # HTML template
│   │   └── sidepanel.css             # Styling
│   ├── background/                   # Service worker
│   │   └── service-worker.ts         # Message router & state cache
│   └── data/
│       └── cards.json                # Card database (786 cards, 18 sets)
│
├── tests/                            # Vitest unit tests
│   ├── engine.test.ts                # Analysis engine tests
│   ├── synergies.test.ts             # Synergy detection tests
│   ├── archetypes.test.ts            # Archetype classification tests
│   ├── openings.test.ts              # Opening recommendations tests
│   ├── observer.test.ts              # DOM observer tests
│   ├── log-observer.test.ts          # Game log observer tests
│   ├── log-parser.test.ts            # Log parsing tests
│   ├── deck-state.test.ts            # Game state & zone tracking tests
│   ├── stats.test.ts                 # Composition & probability tests
│   ├── ui.test.ts                    # Side panel rendering tests
│   ├── tracker-ui.test.ts            # Tracker UI rendering tests
│   ├── cards-data.test.ts            # Card database validation
│   ├── helpers.ts                    # Test utilities (mock cards, etc.)
│
├── scripts/
│   └── build.mjs                     # Vite bundler script (IIFE builds)
│
├── docs/
│   └── adr/                          # Architecture Decision Records
│
├── icons/                            # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│
├── dist/                             # Built extension (load into Chrome)
│   ├── manifest.json                 # Generated manifest with dist-relative paths
│   ├── content.js                    # Content script bundle (IIFE)
│   ├── service-worker.js             # Service worker bundle (IIFE)
│   ├── sidepanel.js                  # Side panel bundle (IIFE)
│   ├── game-state-bridge.js          # Angular bridge bundle (IIFE)
│   ├── sidepanel.html                # Copied from src/
│   ├── sidepanel.css                 # Copied from src/
│   ├── icons/                        # Copied from icons/
│   └── manifest.json                 # Generated from manifest.json
│
├── manifest.json                     # Source manifest (template for dist/)
├── package.json                      # Dependencies and build scripts
├── tsconfig.json                     # TypeScript configuration
├── CLAUDE.md                         # AI agent context (project instructions)
└── README.md                         # Project overview
```

## Directory Purposes

**`src/`**
- Purpose: All source code in TypeScript (ES2022 target, strict mode)
- Contains: Analysis engine, content script, side panel, service worker, card database
- Key files: `types.ts` (shared contracts), `analysis/engine.ts` (main entry), `content/content.ts` (content script entry)

**`src/analysis/`**
- Purpose: Kingdom analysis—classify cards, detect synergies, identify strategies
- Contains: Pure functions with no I/O or side effects
- Key functions: `analyzeKingdom()` (engine.ts), `detectSynergies()` (synergies.ts), `detectArchetypes()` (archetypes.ts), `analyzeOpenings()` (openings.ts)

**`src/content/`**
- Purpose: Content script bundle (injected into dominion.games page)
- Contains: DOM observers (kingdom, log), game state tracking, message sending to service worker
- Key functions: `observeKingdom()` (observer.ts), `observeGameLog()` (log-observer.ts), `onKingdomDetected()` (content.ts callback)

**`src/tracker/`**
- Purpose: Real-time deck tracking—parse log, maintain zones, calculate probabilities
- Contains: Log parser, game state machine, statistics calculator
- Key functions: `parseLogLine()` (log-parser.ts), `processLogEntry()` (deck-state.ts), `calculateStats()` (stats.ts)

**`src/sidepanel/`**
- Purpose: Chrome side panel UI—render kingdom analysis and deck tracker
- Contains: HTML, CSS, TypeScript for rendering and tab/section control
- Key functions: `setupTabs()`, `renderAnalysis()`, `renderTracker()` (sidepanel.ts)

**`src/background/`**
- Purpose: Service worker—central message hub and result caching
- Contains: Message listener, analysis runner, cache management
- Key function: `chrome.runtime.onMessage.addListener()` (service-worker.ts)

**`tests/`**
- Purpose: Vitest unit test suite—one test file per module
- Contains: Happy path, edge cases, error conditions for each exported function
- Pattern: `describe()` blocks group tests by function, `it()` uses clear behavior descriptions

**`scripts/`**
- Purpose: Build tooling
- Key file: `build.mjs` orchestrates four separate Vite builds for IIFE format

**`dist/`**
- Purpose: Built extension ready to load into Chrome
- Generated: Built by `npm run build`, commit-ignored by `.gitignore`
- How to load: Open `chrome://extensions/`, enable Developer mode, click "Load unpacked", select `dist/`

## Key File Locations

**Entry Points:**
- `src/content/content.ts`: Content script entry (observes kingdom/log, sends to service worker)
- `src/background/service-worker.ts`: Service worker entry (runs analysis, caches results)
- `src/sidepanel/sidepanel.ts`: Side panel entry (renders UI, listens for updates)
- `src/content/game-state-bridge.ts`: MAIN-world bridge entry (polls Angular, broadcasts snapshots)

**Configuration:**
- `manifest.json`: Source manifest (blueprint for dist/manifest.json)
- `tsconfig.json`: TypeScript settings (ES2022, strict mode, isolated modules)
- `package.json`: Dependencies (typescript, vite, vitest, eslint, prettier)
- `scripts/build.mjs`: Four-entry Vite build for IIFE bundles

**Core Logic:**
- `src/analysis/engine.ts`: Kingdom analysis orchestrator (calls synergy/archetype/opening detectors)
- `src/tracker/deck-state.ts`: Game state machine (maintains card zones per player)
- `src/tracker/stats.ts`: Probability calculator (hypergeometric distribution, Monte Carlo hand simulation)
- `src/content/observer.ts`: DOM parser (extracts kingdom card names)

**Testing:**
- `tests/engine.test.ts`: Analysis engine tests (classification, synergy, archetype)
- `tests/deck-state.test.ts`: Game state tests (zone movements, log processing)
- `tests/log-parser.test.ts`: Log parsing tests (regex patterns, card extraction)
- `tests/helpers.ts`: Shared test utilities (mock Card objects, sample LogEntries)

## Naming Conventions

**Files:**
- `.ts` extension for TypeScript source
- `.test.ts` suffix for Vitest test files (co-located pattern not used; tests are in separate `tests/` directory)
- `index` exports not used; modules export named functions/types directly
- Descriptive names matching exported functions: `engine.ts` exports `analyzeKingdom()`, `synergies.ts` exports `detectSynergies()`

**Directories:**
- Lowercase, plural for feature areas: `src/analysis/`, `src/content/`, `src/tracker/`, `src/sidepanel/`
- `src/data/` for static data (cards.json)
- `src/background/` for service worker
- `tests/` at project root (not `src/tests/`)
- `dist/` for built output (git-ignored)

**Functions:**
- camelCase: `analyzeKingdom()`, `detectSynergies()`, `processLogEntry()`
- Imperative verbs: `observe`, `parse`, `classify`, `detect`, `calculate`
- Getters with `get` prefix: `getCard()`, `getCardCoinValue()`
- Predicates with `is`/`has` prefix: `isGameStart()`, `hasVillage`

**Variables:**
- camelCase: `currentKingdom`, `gameState`, `cardNames`, `bridgeActive`
- Constants UPPERCASE: `BASIC_SUPPLY`, `SHELTERS`, `LOG_CONTAINER_SELECTOR`, `DEBOUNCE_MS`
- Booleans with `is`/`has` prefix: `isTerminal`, `hasVillage`, `bridgeActive`
- Abbreviations: `abbrev` (player abbreviation), `cardDb` (card database), `tfb` (trash-for-benefit)

**Types:**
- PascalCase: `Card`, `GameState`, `LogEntry`, `TagClassification`, `TrackerData`
- Unions end with `|`: `LogAction`, `CardZone`, `CardType`, `CardTag`
- Interfaces: `Card`, `GameState`, `AnalysisResult`
- Types: `CardTag`, `CardZone`, `LogAction`

## Where to Add New Code

**New Feature (e.g., new kingdom analysis check):**
- Primary code: Add rule-based function to `src/analysis/synergies.ts` or `src/analysis/archetypes.ts`
- Export: Named export, update return type
- Tests: Add test cases to `tests/synergies.test.ts` or `tests/archetypes.test.ts`
- Integration: Update `src/analysis/engine.ts` to call new detector if needed

**New Component/Module (e.g., new side panel section):**
- Implementation: Create file in `src/sidepanel/sidepanel.ts` or new module if complex
- HTML: Update `src/sidepanel/sidepanel.html` with new markup
- CSS: Add styles to `src/sidepanel/sidepanel.css`
- Message Handling: Add listener in `src/sidepanel/sidepanel.ts` if new message type needed
- Tests: Create `tests/[module-name].test.ts` for new logic

**Utilities (shared helpers, constants):**
- Shared helpers: Add to existing module that uses them (or new module if widely used)
- Card-related: `src/tracker/deck-state.ts` and `src/tracker/stats.ts` for deck logic
- DOM-related: `src/content/observer.ts` or `src/content/log-observer.ts` for extraction logic
- Type-related: `src/types.ts` for new shared interfaces/types

**Card Database Updates:**
- Location: `src/data/cards.json`
- Format: Array of Card objects with required fields: `name`, `set`, `types`, `cost`, `text`, `effects`, `tags`, `isTerminal`, `isCantrip`
- Validation: `tests/cards-data.test.ts` validates database integrity
- Testing: Run `npm test` to ensure no breaking changes

**New Message Type (content script ↔ service worker ↔ side panel):**
- Definition: Add to message handling in relevant file:
  - Service worker: `src/background/service-worker.ts`
  - Content script: `src/content/content.ts` (listener)
  - Side panel: `src/sidepanel/sidepanel.ts` (listener or sender)
- Type definition: Update types in `src/types.ts` if new message format

**Test File Pattern:**
```typescript
// tests/[module].test.ts
import { describe, it, expect } from "vitest";
import { exportedFunction } from "../src/[module]/file";

describe("[Module Name]", () => {
  describe("exportedFunction()", () => {
    it("returns expected value with valid input", () => {
      const result = exportedFunction(input);
      expect(result).toEqual(expected);
    });

    it("handles edge case: empty input", () => {
      const result = exportedFunction([]);
      expect(result).toEqual([]);
    });

    it("throws on invalid input", () => {
      expect(() => exportedFunction(null)).toThrow();
    });
  });
});
```

## Special Directories

**`dist/`**
- Purpose: Built extension output (load this in Chrome)
- Generated: Built by `npm run build` (runs typecheck + Vite)
- Committed: No (in `.gitignore`)
- Cleanup: Safe to delete; will be recreated by `npm run build`

**`docs/adr/`**
- Purpose: Architecture Decision Records
- Contents: Markdown files documenting major architectural decisions (e.g., why hybrid zone merging, why side panel instead of overlay)
- Commit: Yes (part of codebase documentation)

**`node_modules/`**
- Purpose: Installed npm dependencies
- Committed: No (in `.gitignore`)
- Size: ~400MB; only present after `npm install`

**`.claude/`**
- Purpose: Agent-specific workflow and context
- Contains: Rules (workflow.md, testing.md, documentation.md, code-style.md), skills (/implement, /build, /test, /lint), worktrees
- Committed: Yes (guides agent behavior)

**`.planning/codebase/`**
- Purpose: Generated codebase analysis documents (ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, CONCERNS.md)
- Committed: Yes (consumed by other GSD commands)
- Regenerated: Via `/gsd:map-codebase` command

---

*Structure analysis: 2026-03-17*
