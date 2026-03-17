# Architecture

**Analysis Date:** 2026-03-17

## Pattern Overview

**Overall:** Event-driven Chrome extension architecture with isolated worlds (ISOLATED and MAIN) communicating via custom events and Chrome message passing.

**Key Characteristics:**
- Multi-entry bundling: Three separate IIFE scripts (content, service worker, side panel) bundled by Vite
- Hybrid real-time tracking: Log-based card movement detection augmented by Angular bridge snapshots
- Pure analysis engine: No external API calls; all logic runs client-side in content script
- Bi-directional messaging: Chrome `chrome.runtime.sendMessage` for extension-to-service-worker and service-worker-to-panel communication

## Layers

**Presentation Layer (Side Panel):**
- Purpose: Render interactive UI for kingdom analysis and deck tracking in the Chrome sidebar
- Location: `src/sidepanel/`
- Contains: Tab switching, collapsible sections, analysis display, tracker UI, player selection
- Depends on: Service worker for analysis and tracker data (via `chrome.runtime.onMessage`)
- Used by: Extension user clicking toolbar icon

**Messaging Layer (Service Worker):**
- Purpose: Central message router and cache between content script and side panel
- Location: `src/background/service-worker.ts`
- Contains: Message listeners for KINGDOM_DETECTED, TRACKER_UPDATE, SELECT_PLAYER; caching of analysis and tracker state
- Depends on: Analysis engine (for KINGDOM_DETECTED processing)
- Used by: Content script (sends analysis requests) and side panel (requests current data and sends player selection)

**Analysis Engine:**
- Purpose: Deterministic kingdom analysis—classify cards, detect synergies, identify viable strategies
- Location: `src/analysis/`
- Contains: `engine.ts` (orchestrator), `synergies.ts` (pattern detection), `archetypes.ts` (strategy classification), `openings.ts` (opening recommendations)
- Depends on: Card database, type definitions
- Used by: Service worker (on KINGDOM_DETECTED)
- Pure: No I/O, no state, no side effects

**Content Script Layer (ISOLATED World):**
- Purpose: Observe DOM for kingdom cards and game log, track card zones, communicate with service worker
- Location: `src/content/content.ts`
- Contains: Entry point, kingdom observer callback, log observer callback, Angular bridge listener, game state management, tracker update sender
- Depends on: Observer modules, log parser, deck state tracker, stats calculator
- Used by: Chrome extension (injected into dominion.games page)

**DOM Observation Layer:**
- Purpose: Watch for kingdom cards and game log changes using MutationObserver
- Location: `src/content/observer.ts`, `src/content/log-observer.ts`
- Contains: KINGDOM-VIEWER extraction, fallback `.card-stacks` extraction, log line scraping
- Depends on: Type definitions
- Used by: Content script main loop

**Game State Bridge (MAIN World):**
- Purpose: Access Angular game state (not available to ISOLATED scripts) and broadcast snapshots via CustomEvent
- Location: `src/content/game-state-bridge.ts`
- Contains: Angular service hook, snapshot polling (500ms), CustomEvent dispatch
- Depends on: Angular framework on dominion.games page
- Used by: Content script (ISOLATED) listens for events

**Log Parsing & Deck Tracking:**
- Purpose: Parse game log into card movements, maintain zone state, calculate draw probabilities
- Location: `src/tracker/log-parser.ts`, `src/tracker/deck-state.ts`, `src/tracker/stats.ts`
- Contains: Log regex patterns, card zone maps, hybrid zone merging, composition/probability calculations
- Depends on: Card database (for Duration detection, type classification)
- Used by: Content script (processes log updates and builds TrackerData)

**Data Layer:**
- Purpose: Source of truth for card properties (cost, types, tags, effects)
- Location: `src/data/cards.json`
- Contains: 786 cards across 18 Dominion sets with functional tags (village, trasher, draw, etc.)
- Format: Array of Card objects, imported as ES module and bundled by Vite
- Used by: Analysis engine (classification), content script (Duration detection), tracker (type lookup)

**Type Definitions:**
- Purpose: Shared TypeScript contracts across all modules
- Location: `src/types.ts`
- Contains: Card, AnalysisResult, GameState, LogEntry, TrackerData, GameStateSnapshot
- Used by: All modules for compile-time type safety

## Data Flow

**Kingdom Analysis Pipeline:**

1. **DOM Observation**: MutationObserver detects kingdom cards → `extractCardNames()` parses KINGDOM-VIEWER or `.card-stacks`
2. **Deduplication**: Content script compares extracted kingdom to `currentKingdom` (skip if unchanged)
3. **Service Worker**: Content script sends `KINGDOM_DETECTED` message with card names
4. **Analysis Engine**: Service worker calls `analyzeKingdom(cardNames)` which:
   - Looks up cards in database (separate known from unknown)
   - Classifies by functional tags (villages, draw, trashers, etc.)
   - Runs synergy detection (engine core, rush, trash-for-benefit, etc.)
   - Runs archetype detection (engine, big money + x, rush, slog, combo)
   - Generates strategic warnings (no village, no trashing, cursing attack, etc.)
   - Returns AnalysisResult
5. **Side Panel Update**: Service worker broadcasts `ANALYSIS_UPDATE` message; side panel receives and renders

**Deck Tracker Pipeline:**

1. **Log Observation**: MutationObserver detects `.game-log` updates → `extractLogText()` yields new lines
2. **Parsing**: Content script calls `parseLogLine()` for each line → LogEntry (player, action, cards)
3. **Deduplication**: Detects turn markers (`parseTurnMarker()`) and new games (`isGameStart()`)
4. **Game State**: Content script calls `processLogEntry()` to move cards between zones (hand → play, buy → discard, etc.)
5. **Hybrid Zones** (when Angular bridge is active): `buildHybridZones()` merges Angular ground truth (hand, play, trash) with log-based ownership tracking
6. **Statistics**: Content script calls `calculateStats()` to compute composition and draw probabilities
7. **Serialization**: Content script converts Maps to plain objects via `serializeTrackerStats()` for message passing
8. **Side Panel Update**: Content script sends `TRACKER_UPDATE` message; side panel receives and renders

**Angular Bridge Flow:**

1. **Bridge Initialization**: MAIN-world `game-state-bridge.ts` polls Angular service every 500ms
2. **State Change**: When Angular state changes, bridge dispatches CustomEvent `dominion-helper-game-state`
3. **ISOLATED Listener**: Content script listens for event, stores snapshot in `latestSnapshot`
4. **Metadata Update**: Content script calls `applySnapshotMetadata()` to update player names, turn counter (does NOT touch zone data)
5. **Hybrid Rendering**: Next `sendTrackerUpdate()` uses `buildHybridZones()` to combine Angular ground truth with log-based ownership
6. **Game Reset Detection**: When turn counter drops while game is active, reset state (clear player tabs)

**State Management:**

- **Content Script State**: Mutable globals—`currentKingdom` (string[]), `gameState` (GameState), `bridgeActive` (boolean), `latestSnapshot` (GameStateSnapshot | null), `selectedPlayer` (string)
- **Service Worker State**: Mutable globals—`currentAnalysis` (AnalysisResult | null), `currentTracker` (TrackerData | null), `contentTabId` (number | null)
- **Side Panel State**: Mutable DOM + local variables (tab selection, section collapse state)
- **Persistent Storage**: Session storage for current kingdom (`chrome.storage.session`) and side panel data

## Key Abstractions

**Card Classification:**
- Purpose: Group cards by functional role (villages, draw, trashers, etc.)
- Examples: `src/analysis/engine.ts:classifyComponents()`
- Pattern: Iterate cards, check tags, build TagClassification object with string arrays for each role

**Synergy Detection:**
- Purpose: Identify card combinations that create strategic value
- Examples: `src/analysis/synergies.ts:detectSynergies()`
- Pattern: Rule-based checks for tag combinations (village + draw = engine core), return human-readable descriptions

**Archetype Identification:**
- Purpose: Classify kingdom into viable macro-strategies
- Examples: `src/analysis/archetypes.ts:detectArchetypes()`
- Pattern: Check for component presence (village, draw, payload, trash) and return strategy descriptions

**Card Zone Tracking:**
- Purpose: Maintain per-player card locations through the game
- Examples: `src/tracker/deck-state.ts:processLogEntry()`
- Pattern: Extract cards from LogEntry, find source zone, move to destination zone, track card counts

**Draw Probability Calculation:**
- Purpose: Estimate hand value and specific card draw probability
- Examples: `src/tracker/stats.ts:hypergeometricAtLeastOne()`
- Pattern: Use hypergeometric distribution for exact calculations, Monte Carlo for hand value simulation

**DOM Extraction:**
- Purpose: Safely parse and deduplicate card names from dominion.games UI
- Examples: `src/content/observer.ts:extractCardNames()`
- Pattern: Primary KINGDOM-VIEWER strategy, fallback to position-based filtering on `.card-stacks`

## Entry Points

**Content Script (`dist/content.js`):**
- Location: `src/content/content.ts`
- Triggers: Injected by Chrome extension manifest on dominion.games page load
- Responsibilities:
  - Observe kingdom and log DOM
  - Parse log entries and track game state
  - Listen for Angular bridge snapshots
  - Calculate and serialize tracker data
  - Forward messages to service worker

**Service Worker (`dist/service-worker.js`):**
- Location: `src/background/service-worker.ts`
- Triggers: Chrome extension background (persistent across tab navigation)
- Responsibilities:
  - Listen for KINGDOM_DETECTED and TRACKER_UPDATE from content script
  - Run analysis engine on kingdom
  - Cache analysis and tracker results
  - Broadcast updates to side panel
  - Forward player selection to content script

**Side Panel (`dist/sidepanel.js`):**
- Location: `src/sidepanel/sidepanel.ts`
- Triggers: User clicks extension toolbar icon (or keyboard shortcut)
- Responsibilities:
  - Request current analysis and tracker data on open
  - Listen for ANALYSIS_UPDATE and TRACKER_UPDATE messages
  - Render kingdom analysis and deck tracker UI
  - Forward player selection changes to service worker

**Game State Bridge (`dist/game-state-bridge.js`):**
- Location: `src/content/game-state-bridge.ts`
- Triggers: Injected by Chrome extension manifest with `world: "MAIN"` on dominion.games page load
- Responsibilities:
  - Access Angular game state (only available in MAIN world)
  - Poll every 500ms for state changes
  - Dispatch CustomEvent with snapshots to ISOLATED world

## Error Handling

**Strategy:** Graceful degradation—missing data doesn't crash, features degrade safely

**Patterns:**

- **Unknown Cards**: Cards not found in database go to `AnalysisResult.unknown` array; analysis continues with known cards
- **Missing Zones**: When building TrackerData, if a player's zones are missing, skip that player (return early from sendTrackerUpdate)
- **Log Parse Failures**: Lines that don't match any ACTION_PATTERN are silently ignored; game continues tracking
- **Angular Bridge Timeout**: If bridge never sends a snapshot, log-based tracking continues without hybrid merging
- **Message Send Failures**: `.catch(() => {})` on all `chrome.runtime.sendMessage()` calls (side panel may not be open)
- **DOM Query Failures**: Fallback extraction strategies (KINGDOM-VIEWER → `.card-stacks` → empty array)

## Cross-Cutting Concerns

**Logging:** None—no logging framework. Use `console.log()` for debugging; removed in production builds.

**Validation:**
- Card names validated by database lookup (unknown cards separated)
- Log entries validated by regex pattern matching
- DOM queries fall back gracefully when selectors don't match

**Authentication:** None—extension runs in user's browser context with local data only.

**Serialization:**
- Maps → plain objects (via `mapToRecord()` and `serializeTrackerStats()`)
- CustomEvents use `.detail` property for snapshot data
- `chrome.runtime.sendMessage()` accepts objects with string, number, boolean, array, object values only

---

*Architecture analysis: 2026-03-17*
