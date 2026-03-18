# External Integrations

**Analysis Date:** 2026-03-17

## APIs & External Services

**None detected** - The extension operates entirely client-side without external API dependencies or network requests.

## Data Storage

**Databases:**
- Not used - No backend database integration

**File Storage:**
- Local filesystem only - Extension stores data in:
  - `chrome.storage.session` - Caches current kingdom card list across service worker restarts
    - Key: `currentKingdom`
    - Scope: Session-based, cleared when browser closes or extension unloads

**Caching:**
- In-memory cache in service worker:
  - `currentAnalysis` - Latest AnalysisResult (synergies, archetypes, openings)
  - `currentTracker` - Latest TrackerData (deck composition, draw probabilities)
  - `contentTabId` - Tab ID for message routing to content script

**Card Database:**
- Bundled source: `src/data/cards.json` (786 cards, 18 Dominion sets)
- Format: JSON array of Card objects with properties: name, set, types, cost, text, effects, tags, isTerminal, isCantrip
- Bundled into: `dist/content.js` (no external loading required)
- No API for card data - All data is static and compiled at build time

## Authentication & Identity

**Auth Provider:**
- Not applicable - No user authentication needed

**Implementation:**
- Extension runs in isolated world with access only to dominion.games DOM
- No user login or identity system
- No API keys or secrets required

## Monitoring & Observability

**Error Tracking:**
- Not detected - No error tracking service integrated

**Logs:**
- Browser console only (`console.log`, `console.error`)
- No persistent logging or log aggregation
- Game log parsing is from dominion.games page DOM, not external service

## CI/CD & Deployment

**Hosting:**
- Not applicable - Extension is user-loaded from local `dist/` directory
- Manual deployment: Load unpacked from `chrome://extensions/` developer mode
- No CDN or cloud hosting required

**CI Pipeline:**
- Not detected - No CI/CD workflow configuration in repository
- Build commands available: `npm run build` (typecheck + bundle)

## Environment Configuration

**Required env vars:**
- None - No external secrets or API keys needed

**Secrets location:**
- Not applicable - No secrets in codebase
- Manifest.json contains only card data and UI paths

## Webhooks & Callbacks

**Incoming:**
- None - Extension does not expose HTTP endpoints

**Outgoing:**
- None - Extension does not make HTTP requests

## Cross-Tab/Worker Communication

**Chrome Extension Message Passing:**

**Content Script → Service Worker:**
- `KINGDOM_DETECTED` - Content script sends detected kingdom card names
  - Payload: `{ type: "KINGDOM_DETECTED", cards: string[] }`
  - Handler: `src/background/service-worker.ts` line 54
  - Action: Runs `analyzeKingdom()` and broadcasts result to side panel

- `TRACKER_UPDATE` - Content script sends serialized deck tracker statistics
  - Payload: `{ type: "TRACKER_UPDATE", tracker: TrackerData }`
  - Handler: `src/background/service-worker.ts` (forwarded to side panel)
  - Action: Caches tracker data and broadcasts to side panel

**Service Worker → Content Script:**
- `SELECT_PLAYER` - Side panel requests player selection change
  - Payload: `{ type: "SELECT_PLAYER", player: string }`
  - Handler: `src/content/content.ts` line 291
  - Action: Updates selectedPlayer and recalculates stats

**Side Panel → Service Worker:**
- `GET_ANALYSIS` - Side panel requests current analysis on open
  - Payload: `{ type: "GET_ANALYSIS" }`
  - Handler: `src/background/service-worker.ts` line 103
  - Response: Returns cached `currentAnalysis`

- `GET_TRACKER` - Side panel requests current tracker data on open
  - Payload: `{ type: "GET_TRACKER" }`
  - Handler: `src/background/service-worker.ts` line 108
  - Response: Returns cached `currentTracker`

**Service Worker → Side Panel (Broadcast):**
- `ANALYSIS_UPDATE` - Service worker broadcasts analysis to all extension pages
  - Payload: `{ type: "ANALYSIS_UPDATE", analysis: AnalysisResult }`
  - Handler: `src/sidepanel/sidepanel.ts` line 418
  - Action: Re-renders kingdom analysis panel with new synergies/archetypes

- `TRACKER_UPDATE` - Service worker forwards tracker updates to side panel
  - Payload: `{ type: "TRACKER_UPDATE", tracker: TrackerData }`
  - Handler: `src/sidepanel/sidepanel.ts` line 418
  - Action: Re-renders deck tracker panel with updated stats

## DOM Integration (dominion.games)

**Kingdom Detection:**
- Reads from: `KINGDOM-VIEWER > .kingdom-viewer` (first visible child div)
- Extracts card names: `.name-layer > .text-fitter-node` (text content)
- Fallback: `.card-stacks` selector with vertical position filtering
- MutationObserver: `src/content/observer.ts` line 101

**Game Log Parsing:**
- Reads from: Game log container (DOM selector varies by page version)
- Extracts text: `.extractLogText()` in `src/content/log-observer.ts` line 32
- MutationObserver: `src/content/log-observer.ts` line 58

**Angular Bridge (MAIN World):**
- Reads from: Angular game state via `window.ng` globals
- Polls: Every 500ms for state changes
- Dispatches: CustomEvent `dominion-helper-game-state` with GameStateSnapshot
- Location: `src/content/game-state-bridge.ts`
- Isolation: Runs in MAIN world to access Angular; listens for CustomEvents in ISOLATED world content script

## Data Serialization

**Chrome Message Passing Compatibility:**
- Maps converted to plain objects: `Map<string, number>` → `Record<string, number>`
- Function: `src/content/serialize.ts` line 26 (`serializeTrackerStats()`)
- Used by: Tracker stats before sending via `chrome.runtime.sendMessage()`

**No external serialization:**
- No JSON.stringify/parse for external APIs
- Message passing uses native Chrome extension message API

---

*Integration audit: 2026-03-17*
