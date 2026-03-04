# Dominion Helper - Chrome Extension

## Project Overview
Chrome extension for dominion.games that analyzes the current kingdom (set of 10 supply cards) and surfaces card synergies, viable strategy archetypes, and key warnings.

## Tech Stack
- Chrome Extension Manifest V3
- TypeScript (strict mode, ES2022 target)
- Vite (bundler, via `scripts/build.mjs`)
- Vitest for testing
- ESLint + Prettier for linting/formatting

## Project Structure
- `manifest.json` — Source manifest (used as template for `dist/manifest.json`)
- `src/types.ts` — Shared TypeScript interfaces (Card, TagClassification, AnalysisResult, etc.)
- `src/content/` — Content scripts injected into dominion.games (observer, UI overlay)
- `src/analysis/` — Kingdom analysis engine (synergies, archetypes, openings)
- `src/data/cards.json` — Card database source of truth (bundled into content script by Vite)
- `src/popup/` — Extension popup UI
- `src/background/` — Service worker for message passing
- `scripts/build.mjs` — Multi-entry Vite build script
- `tests/` — Vitest tests
- `docs/adr/` — Architecture Decision Records
- `dist/` — Built extension output (load this in Chrome)

## Module Pattern
All files use standard ES module `import`/`export`. The build script bundles them into IIFE format for Chrome:
- `src/content/content.ts` → `dist/content.js` (includes all analysis + content modules + card data)
- `src/background/service-worker.ts` → `dist/service-worker.js`
- `src/popup/popup.ts` → `dist/popup.js`

## Key Patterns
- Cards are tagged with functional categories (village, trasher, curser, etc.)
- Synergy detection is rule-based: if tag combinations exist, report the synergy
- DOM observation uses MutationObserver to detect kingdom cards
- Primary DOM selector: `KINGDOM-VIEWER .kingdom-viewer` with `.name-layer .text-fitter-node`
- Fallback: `.card-stacks` with vertical position filtering
- Analysis is purely client-side — no external API calls

## Workflow

All code changes follow this workflow — see `.claude/rules/` for full details:

1. **Worktree**: Create a git worktree (`git worktree add .claude/worktrees/<name> -b <branch>`) — never commit to main directly
2. **Implement**: Write code with JSDoc on all exports and inline comments on complex logic
3. **Test**: Write tests covering happy path, edge cases, and error conditions
4. **Verify**: `npm run typecheck && npm run lint && npm test && npm run build` — all must pass
5. **PR**: Commit, push, create PR with summary and test plan
6. **Clean up**: Remove the worktree after PR is created

Use `/implement <description>` to run this workflow automatically.

## Development Commands
```bash
npm install           # Install dependencies
npm run build         # Typecheck + build to dist/
npm run dev           # Build without typecheck (faster)
npm test              # Run tests once
npm run test:watch    # Watch mode
npm run lint          # Check lint errors
npm run lint:fix      # Auto-fix lint errors
npm run format        # Format with Prettier
npm run typecheck     # TypeScript type check only
```

## Loading the Extension
1. Run `npm run build`
2. Open chrome://extensions/
3. Enable Developer mode
4. Click "Load unpacked" and select the `dist/` directory
5. After code changes: rebuild and click reload on the extension card

## Card Data
`src/data/cards.json` is the card database (786 cards, 18 sets). It's imported directly by TypeScript and bundled by Vite — no separate `cards-bundle.js` needed.

Each card needs: `name`, `set`, `types`, `cost`, `text`, `effects`, `tags[]`, `isTerminal`, `isCantrip`

## Rules and Skills

Behavioral rules are in `.claude/rules/`:
- `workflow.md` — Worktree workflow, branching, PRs, commit messages
- `testing.md` — Testing requirements (every change needs tests)
- `documentation.md` — Documentation requirements (JSDoc on exports, inline comments on complex logic)
- `code-style.md` — TypeScript conventions (path-scoped to `src/` and `tests/`)

Skills are in `.claude/skills/`:
- `/implement` — End-to-end implementation workflow (worktree → code → test → document → PR)
- `/build` — Build commands
- `/test` — Test commands
- `/lint` — Lint, format, typecheck commands
