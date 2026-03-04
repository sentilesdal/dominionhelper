---
paths:
  - "src/**/*.ts"
  - "tests/**/*.ts"
---

# TypeScript Code Style

## General

- Use strict TypeScript — no `any` types unless absolutely unavoidable (and documented why)
- Prefer `const` over `let`; never use `var`
- Use explicit return types on exported functions
- Use `type` imports for type-only imports: `import type { Card } from "../types"`
- Keep functions small and focused — if a function is over 40 lines, consider splitting it

## Types

- Define shared types in `src/types.ts`
- Use union types for known string literals (e.g., `CardTag`, `CardType`)
- Prefer interfaces for object shapes, type aliases for unions/intersections
- Use `readonly` for arrays and objects that shouldn't be mutated

## Naming

- Functions: `camelCase` verbs — `detectSynergies`, `analyzeKingdom`, `extractCardNames`
- Types/Interfaces: `PascalCase` nouns — `Card`, `TagClassification`, `AnalysisResult`
- Constants: `UPPER_SNAKE_CASE` for true constants — `BASIC_SUPPLY`, `PANEL_ID`
- Files: `kebab-case` — `service-worker.ts`, `engine.test.ts`
- Branches: `type/kebab-case` — `feat/opening-analysis`

## Formatting

Prettier handles formatting automatically. Run `npm run format` before committing.
ESLint catches code quality issues. Run `npm run lint` before committing.
