# ADR 002: TypeScript Migration with Vite Build

## Status

Accepted

## Context

The project started as vanilla JavaScript with an IIFE pattern and no build step. Content scripts were loaded individually via `manifest.json` in dependency order, and a manually-synced `cards-bundle.js` duplicated the card database for browser use. Every file needed dual-environment boilerplate (`window.DominionHelper` for browser, `module.exports` for tests).

As the project grows, this creates friction:

- No type safety across the analysis engine
- Manual dependency ordering in manifest.json
- Dual-environment boilerplate in every file
- Manually synced `cards-bundle.js` that duplicates `cards.json`

## Decision

Migrate to TypeScript with Vite as the bundler, and add ESLint + Prettier for code quality.

### What Changed

- **JS to TypeScript**: All source files converted from `.js` to `.ts` with strict type checking
- **IIFE to ES modules**: Removed `window.DominionHelper` namespace and `module.exports` boilerplate; using standard `import`/`export`
- **No build to Vite**: A build script (`scripts/build.mjs`) bundles three entry points (content script, service worker, popup) into IIFE format in `dist/`
- **Eliminated `cards-bundle.js`**: TypeScript imports `cards.json` directly; Vite bundles it into the content script output
- **Central type definitions**: `src/types.ts` defines shared interfaces (`Card`, `TagClassification`, `AnalysisResult`, etc.)
- **Added tooling**: ESLint (flat config with typescript-eslint), Prettier, TypeScript strict mode

### Build Architecture

The build script calls `vite.build()` three times to produce IIFE bundles (Chrome content scripts don't support ES modules):

1. `src/content/content.ts` → `dist/content.js` (includes all analysis + observer + UI + card data)
2. `src/background/service-worker.ts` → `dist/service-worker.js`
3. `src/popup/popup.ts` → `dist/popup.js`

Static assets (CSS, HTML, icons) are copied to `dist/`, and a new `dist/manifest.json` is generated with dist-relative paths.

## Consequences

### Positive

- Type safety catches bugs at compile time
- Single source of truth for card data (no more manual sync)
- Standard ES module imports instead of global namespace
- Linting and formatting enforce consistency
- Vite enables fast builds and future HMR for development

### Negative

- Build step required before loading extension (load from `dist/`, not project root)
- Slightly more complex project setup

### Risks

- Card data JSON is bundled into content script (~220KB unminified) — acceptable for now but could be lazy-loaded if it grows significantly
