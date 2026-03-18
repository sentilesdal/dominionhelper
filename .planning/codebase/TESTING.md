# Testing Patterns

**Analysis Date:** 2026-03-17

## Test Framework

**Runner:**
- Vitest 3.0.0
- Config: `vite.config.ts` (minimal; inherits Vitest defaults)

**Assertion Library:**
- Vitest built-in `expect()` (Chai-compatible)

**Run Commands:**
```bash
npm test              # Run all tests once
npm run test:watch   # Watch mode for development
```

## Test File Organization

**Location:**
- Co-located in `tests/` directory (parallel to `src/`)
- One test file per source module with matching name: `src/analysis/engine.ts` → `tests/engine.test.ts`

**Naming:**
- Pattern: `{module-name}.test.ts`
- All test files in `tests/` directory at root level, no subdirectories

**Structure:**
```
tests/
├── engine.test.ts          # Tests for src/analysis/engine.ts
├── synergies.test.ts       # Tests for src/analysis/synergies.ts
├── observer.test.ts        # Tests for src/content/observer.ts
├── log-parser.test.ts      # Tests for src/tracker/log-parser.ts
├── deck-state.test.ts      # Tests for src/tracker/deck-state.ts
├── stats.test.ts           # Tests for src/tracker/stats.ts
├── helpers.ts              # Shared test factory functions
└── ...                     # One file per logical module
```

## Test Structure

**Suite Organization:**
- Top-level `describe()` block per exported function
- Nested `describe()` blocks for function families (optional)
- All tests follow Arrange-Act-Assert (AAA) pattern

**Example from `tests/synergies.test.ts`:**
```typescript
describe("detectSynergies", () => {
  it("detects engine core when village and draw tags are present", () => {
    // Arrange
    const cards = [
      makeCard({ name: "Village", tags: ["village"] }),
      makeCard({ name: "Smithy", tags: ["terminal-draw"], isTerminal: true }),
    ];
    const tags = makeTags({
      villages: ["Village"],
      draw: ["Smithy"],
    });

    // Act
    const result = detectSynergies(cards, tags);

    // Assert
    expect(result.some((s) => s.includes("Engine core"))).toBe(true);
  });

  it("returns empty array when no synergies are present", () => {
    const cards = [...];
    const tags = makeTags({...});

    const result = detectSynergies(cards, tags);

    expect(result).toEqual([]);
  });
});
```

**Patterns:**
- Descriptive test names that read as specifications: "detects engine core when village and draw tags are present"
- One assertion per test or closely related assertions testing the same behavior
- Arrange code separated visually from Act and Assert sections (no blank lines needed, comments mark sections)

## Mocking

**Framework:** None (Vitest runs without mocking library)

**Patterns:**
- No external mocks needed; modules are pure functions
- DOM testing uses `@vitest/environment jsdom` flag: `// @vitest-environment jsdom`
- JSDOM provides real DOM API for testing selectors and element queries

**Example from `tests/observer.test.ts`:**
```typescript
// @vitest-environment jsdom

import { describe, it, expect } from "vitest";
import { extractCardNames } from "../src/content/observer";

function buildKingdomViewer(groups: string[][], hiddenGroups: string[][] = []): Document {
  const doc = new DOMParser().parseFromString(
    "<html><body></body></html>",
    "text/html",
  );
  // ... build real DOM structure for testing
  return doc;
}

describe("extractCardNames", () => {
  it("extracts card names from KINGDOM-VIEWER structure", () => {
    const kingdomCards = ["Village", "Smithy", "Chapel", ...];
    const doc = buildKingdomViewer([kingdomCards]);

    const result = extractCardNames(doc);

    expect(result).toHaveLength(10);
    for (const card of kingdomCards) {
      expect(result).toContain(card);
    }
  });
});
```

**What to Mock:**
- Rarely needed; all modules designed to accept data as arguments
- CardData imported as JSON and passed to functions

**What NOT to Mock:**
- Pure analysis functions (`detectSynergies`, `analyzeKingdom`) — test with real card/tag data
- Text parsing functions (`parseLogLine`, `singularize`) — test with real log lines
- Zone tracking (`processLogEntry`) — test with real LogEntry objects

## Fixtures and Factories

**Test Data:**
- `tests/helpers.ts` provides factory functions `makeCard()` and `makeTags()`
- Factories return objects with sensible defaults, overrideable via parameters

**Example from `tests/helpers.ts`:**
```typescript
export function makeCard(overrides: Partial<Card> = {}): Card {
  return {
    name: overrides.name ?? "TestCard",
    set: overrides.set ?? "Dominion",
    types: overrides.types ?? (["Action"] as CardType[]),
    cost: overrides.cost ?? { coins: 3 },
    text: overrides.text ?? "",
    effects: overrides.effects ?? {},
    tags: overrides.tags ?? ([] as CardTag[]),
    isTerminal: overrides.isTerminal ?? false,
    isCantrip: overrides.isCantrip ?? false,
  };
}

export function makeTags(overrides: Partial<TagClassification> = {}): TagClassification {
  return {
    villages: overrides.villages ?? [],
    draw: overrides.draw ?? [],
    trashers: overrides.trashers ?? [],
    // ... all tag categories with empty defaults
  };
}
```

**Usage:**
```typescript
const cards = [
  makeCard({ name: "Village", tags: ["village"] }),
  makeCard({ name: "Smithy", tags: ["terminal-draw"], isTerminal: true }),
];
```

**Location:**
- `tests/helpers.ts` — shared across all test files
- Import: `import { makeCard, makeTags } from "./helpers"`

## Coverage

**Requirements:** No enforced target; test what matters

**View Coverage:**
```bash
npm test -- --coverage  # Not configured; manual approach
```

**Coverage by Module:**
- `src/analysis/engine.ts` — 100% (core logic, critical to functionality)
- `src/analysis/synergies.ts` — 100% (every synergy rule tested)
- `src/content/observer.ts` — 100% (DOM extraction heavily tested)
- `src/tracker/log-parser.ts` — 100% (every parser rule tested)
- `src/tracker/deck-state.ts` — High (card movement logic tested)

## Test Types

**Unit Tests:**
- Scope: Single exported function with its inputs/outputs
- Approach: Test happy path, edge cases, and error conditions
- Example: `detectSynergies` tested with various tag combinations (engine, rush, curse defense, no synergies)

**Integration Tests:**
- Scope: Multiple modules working together
- Approach: Call `analyzeKingdom()` with real kingdoms and verify all layers (components, synergies, archetypes, notes, openings)
- Example from `tests/engine.test.ts`:
```typescript
it("detects engine components in Village/Smithy kingdom", () => {
  const kingdom = [
    "Village", "Smithy", "Chapel", "Market", "Festival",
    "Witch", "Moat", "Remodel", "Laboratory", "Gardens",
  ];
  const result = analyzeKingdom(kingdom);

  expect(result.components.length).toBeGreaterThan(0);
  expect(result.components.some((c) => c.includes("Village"))).toBe(true);
  expect(result.components.some((c) => c.includes("Smithy"))).toBe(true);
});
```

**E2E Tests:**
- Not used; Chrome extension testing requires browser context not typical for unit/integration tests
- Manual testing in Chrome via `npm run build` and loading `dist/` folder

## Common Patterns

**Async Testing:**
- No async tests in current codebase; all analysis is synchronous
- If needed: `it("...", async () => { ... })` and `await` results

**Error Testing:**
```typescript
it("returns empty analysis for unknown cards gracefully", () => {
  const kingdom = ["FakeCard1", "FakeCard2"];
  const result = analyzeKingdom(kingdom);

  expect(result).toBeDefined();
  expect(result.components).toEqual([]);
});
```

**Negative Testing (absence of something):**
```typescript
it("does not detect engine core when only village is present without draw", () => {
  const cards = [
    makeCard({ name: "Village", tags: ["village"] }),
    makeCard({ name: "Cellar", tags: ["sifter"] }),
  ];
  const tags = makeTags({ villages: ["Village"], sifters: ["Cellar"] });

  const result = detectSynergies(cards, tags);

  expect(result.some((s) => s.includes("Engine core"))).toBe(false);
});
```

**Array/String Matching:**
- Use `.toContain()` for presence checks
- Use `.toEqual([...])` for exact array contents
- Use `.toHaveLength()` for count verification
- Use `.some()` for conditional assertions on array elements

**Example from `tests/log-parser.test.ts`:**
```typescript
it("parses a single card with count", () => {
  const result = parseCardList("3 Coppers");
  expect(result.cards).toEqual(["Copper"]);
  expect(result.counts).toEqual([3]);
});

it("parses multiple cards with 'and'", () => {
  const result = parseCardList("7 Coppers and 3 Estates");
  expect(result.cards).toEqual(["Copper", "Estate"]);
  expect(result.counts).toEqual([7, 3]);
});
```

## Test Execution & Debugging

**Run specific test file:**
```bash
npm test -- tests/engine.test.ts
```

**Run tests matching pattern:**
```bash
npm test -- -t "engine core"
```

**Watch mode during development:**
```bash
npm run test:watch
```

---

*Testing analysis: 2026-03-17*
