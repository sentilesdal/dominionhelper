# Coding Conventions

**Analysis Date:** 2026-03-17

## Naming Patterns

**Files:**
- Lowercase with hyphens: `log-parser.ts`, `game-state-bridge.ts`, `observer.ts`
- Corresponds to module purpose (e.g., `deck-state.ts` for zone tracking)
- Entry points use standard names: `content.ts`, `service-worker.ts`, `sidepanel.ts`

**Functions:**
- camelCase: `extractCardNames`, `processLogEntry`, `detectSynergies`, `singularize`
- Descriptive verbs: `create*`, `build*`, `parse*`, `detect*`, `calculate*`, `process*`
- Private/internal functions (e.g., `addToZone`, `ensurePlayer`) use camelCase without export

**Variables:**
- camelCase for local variables: `cardNames`, `gameState`, `latestSnapshot`, `bridgeActive`
- UPPERCASE_SNAKE_CASE for module-level constants: `BASIC_SUPPLY`, `SHELTERS`, `CARD_DB`, `ACTION_PATTERNS`
- Descriptive names: `currentKingdom`, `foundCards`, `selectedPlayer` (avoid single letters except loop counters)

**Types:**
- PascalCase: `Card`, `TagClassification`, `AnalysisResult`, `LogEntry`, `PlayerZones`, `GameState`
- Union types use PascalCase: `CardTag`, `CardType`, `LogAction`, `CardZone`
- Interface names are nouns: `DrawProbabilities`, `DeckComposition`, `TrackerStats`

## Code Style

**Formatting:**
- Prettier enforced: 80 character print width, 2-space indentation
- Semicolons required; single quotes for JSON/type strings, double quotes for content
- Trailing commas on all multi-line arrays/objects (Prettier `"trailingComma": "all"`)

**Linting:**
- ESLint (flat config) with TypeScript plugin
- Enforces `@typescript-eslint/recommended` rules
- Unused variables flagged as error; underscore prefix (`_param`) suppresses warning for intentionally unused parameters
- ESLint config: `eslint.config.mjs`

## Import Organization

**Order:**
1. Type imports from project types: `import type { Card, LogEntry } from "../types"`
2. Default imports from dependencies: `import cardData from "../data/cards.json"`
3. Named imports from local modules: `import { observeKingdom } from "./observer"`
4. Type imports from external packages: `import type { GameStateSnapshot } from "../types"`

**Path Aliases:**
- No import aliases used; relative paths only (`../types`, `./observer`)
- Prefer explicit relative imports over implicit path resolution

**Example from `src/tracker/deck-state.ts`:**
```typescript
import type {
  Card,
  CardZone,
  GameState,
  GameStateSnapshot,
  LogEntry,
  PlayerSnapshot,
  PlayerZones,
} from "../types";
```

## Error Handling

**Patterns:**
- Graceful degradation: Functions return sensible defaults rather than throwing (e.g., `extractCardNames` returns empty array `[]` if no KINGDOM-VIEWER found)
- Null-coalescing: `zone.get(cardName) || 0` to safely handle missing Map entries
- Optional chaining: `el.textContent?.trim()` to handle missing DOM elements
- Guard clauses: Early returns in functions (`if (!kingdomViewer) return []; ...`)

**Examples from `src/content/observer.ts`:**
```typescript
const text = el.textContent?.trim();
if (text && !BASIC_SUPPLY.has(text) && !SHELTERS.has(text)) {
  found.add(text);
}
```

**From `src/tracker/deck-state.ts`:**
```typescript
const remaining = current - count;
if (remaining <= 0) {
  zone.delete(cardName);
} else {
  zone.set(cardName, remaining);
}
```

## Logging

**Framework:** console (no dedicated logging library)

**Patterns:**
- No active logging in production code
- Console available for debugging but not used in core modules
- Error-free execution preferred to console output

## Comments

**When to Comment:**
- File-level comment on every module explaining purpose, dependencies, and key exports
- JSDoc-style comments (using `//`) on every exported function with parameter and return descriptions
- Inline comments for complex logic blocks, magic numbers, and algorithm steps
- Comments explain WHY, not WHAT (code shows what it does)

**JSDoc/TSDoc:**
- Use `//` style comments (never `/** */` block comments)
- Multi-line comments use multiple `//` lines
- Every exported function includes @param, @returns, and purpose description

**Example from `src/analysis/engine.ts`:**
```typescript
// Generates strategic warnings about the kingdom's weaknesses.
//
// Checks for common problem patterns that players should be aware of:
// missing villages (can't chain terminals), no trashing (bloated deck),
// no +Buy (one purchase per turn), unblockable attacks, and cursing
// attacks without a trasher to remove them.
//
// @param tags - Classified tag groupings from classifyComponents
// @param getCard - Lookup function to retrieve a Card by name
// @returns Array of human-readable warning strings
export function generateNotes(
  tags: TagClassification,
  getCard: (name: string) => Card | undefined,
): string[] {
```

## Function Design

**Size:** Functions are typically 20-100 lines; longer functions are broken into smaller helpers

**Parameters:**
- 1-3 parameters preferred; 4+ parameters refactored into object/tuple types
- Use destructuring for object parameters: `{ cards, tags }` not `args`

**Return Values:**
- Functions return complete data structures, not partial updates
- Explicit return types on all exported functions

**Example from `src/content/content.ts`:**
```typescript
// Compares two string arrays for equality regardless of order.
// Used to skip re-analysis when the observer fires but the kingdom
// hasn't actually changed (e.g., DOM mutations from card animations).
function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((v, i) => v === sortedB[i]);
}
```

## Module Design

**Exports:**
- Each module exports 2-5 primary functions (the public API)
- Private helpers use `function` without `export` keyword
- Type exports go in `src/types.ts`

**Barrel Files:**
- Not used; each module imports directly from specific files
- Example: `import { detectSynergies } from "./synergies"` not `import { detectSynergies } from "."`

**Module Structure (example from `src/analysis/engine.ts`):**
```typescript
// Module header comment
import type { ... };  // Type imports
import cardData from "...";  // Data imports
import { ... } from "...";  // Function imports

// Module-level constants
const CARD_MAP = new Map(...);

// Private helper functions
function buildCardMap(...) { ... }
function classifyComponents(...) { ... }

// Main exported function
export function analyzeKingdom(...) { ... }
```

---

*Convention analysis: 2026-03-17*
