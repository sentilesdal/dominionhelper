# Testing Requirements

## Every Change Needs Tests

All code changes MUST include corresponding tests. No exceptions.

- New functions → unit tests covering happy path, edge cases, and error conditions
- Bug fixes → a test that reproduces the bug before the fix, then passes after
- Refactors → existing tests must still pass; add tests if coverage gaps are found
- New modules → test file at `tests/<module-name>.test.ts`

## Test Structure

- Use `describe` blocks to group related tests by function or feature
- Use clear test names that describe the expected behavior: `it("returns empty array when no villages are present")`
- Each test should test ONE behavior — if a test name has "and" in it, split it
- Arrange-Act-Assert pattern: set up data, call the function, check the result

## What to Test

- Public exported functions — test the API surface
- Edge cases: empty arrays, unknown cards, missing fields, null/undefined inputs
- Integration between modules: e.g., engine calling synergies and archetypes together
- DOM observer logic: mock DOM structures and verify extraction

## Test Commands

```bash
npm test              # Run all tests once
npm run test:watch    # Watch mode during development
```

## Coverage Expectations

- All analysis functions (`engine.ts`, `synergies.ts`, `archetypes.ts`) must have tests
- Content script logic (`observer.ts`, `ui.ts`) should have tests for pure functions
- Aim for every branch in conditional logic to be exercised by at least one test
