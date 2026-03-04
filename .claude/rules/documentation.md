# Documentation Requirements

## Comment Style

Always use `//` line comments. Never use `/** ... */` or `/* ... */` block comments.

For multi-line comments, use multiple `//` lines:

```typescript
// Detects synergies between cards in the kingdom based on tag combinations.
//
// Checks for engine cores (village + draw), curse defense (trasher + curser),
// rush potential (gainer + alt-VP), and other strategic combinations.
//
// @param cards - Array of Card objects in the current kingdom
// @param tags - Pre-classified tag groupings from classifyComponents
// @returns Array of human-readable synergy descriptions
export function detectSynergies(cards: Card[], tags: TagClassification): string[] {
```

## Code Documentation

Nearly every logical block of code must be documented. This project values clarity — future contributors (and AI agents) should understand the code without guessing.

### What to Document

- **Every exported function**: Comment explaining purpose, parameters, return value, and any side effects
- **Every interface/type**: Brief description of what it represents and when it's used
- **Complex logic blocks**: Inline comments explaining WHY, not WHAT (the code shows what)
- **Algorithm steps**: When a function has multiple logical steps, comment each step
- **Magic numbers/strings**: Explain why specific values were chosen (e.g., debounce timing, DOM selectors)
- **Workarounds and hacks**: Always explain why a non-obvious approach was taken
- **TODOs**: Use `// TODO:` with a description of what needs to be done and why

### What NOT to Document

- Obvious one-liners (e.g., `const name = card.name;`)
- Simple getters/setters
- Import statements
- Test files (test names should be self-documenting)

## File-Level Documentation

Every source file should have a brief `//` comment at the top explaining:
- What the module does
- How it fits into the larger system
- Key exports

## Architecture Documentation

- Major architectural decisions go in `docs/adr/` as Architecture Decision Records
- The README.md covers project setup, commands, and high-level architecture
- CLAUDE.md is the source of truth for AI agent context
