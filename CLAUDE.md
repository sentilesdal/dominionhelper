# Dominion Helper - Chrome Extension

## Project Overview
Chrome extension for dominion.games that analyzes the current kingdom (set of 10 supply cards) and surfaces card synergies, viable strategy archetypes, and key warnings.

## Tech Stack
- Chrome Extension Manifest V3
- Vanilla JavaScript (IIFE pattern, no build step)
- Vitest for testing
- Source files are the extension files directly (no bundler)

## Project Structure
- `manifest.json` — Chrome extension manifest, loads content scripts in dependency order
- `src/content/` — Content scripts injected into dominion.games (observer, UI overlay)
- `src/analysis/` — Kingdom analysis engine (synergies, archetypes, openings)
- `src/data/cards.json` — Card database source of truth (used by tests)
- `src/data/cards-bundle.js` — Card data as JS for content scripts (`window.DominionHelper.cardData`)
- `src/popup/` — Extension popup UI
- `src/background/` — Service worker for message passing
- `tests/` — Vitest tests
- `docs/adr/` — Architecture Decision Records

## Module Pattern
Content scripts can't use ES module imports. All files use IIFE + shared namespace:
- Browser: `window.DominionHelper` namespace (scripts loaded in order via manifest)
- Tests: `module.exports` / `require()` (CommonJS)

## Key Patterns
- Cards are tagged with functional categories (village, trasher, curser, etc.)
- Synergy detection is rule-based: if tag combinations exist, report the synergy
- DOM observation uses MutationObserver to detect kingdom cards
- Primary DOM selector: `.kingdom-viewer-group .full-card-name.card-name`
- Secondary: `span[onmousedown*="publicStudyRequest"]` attribute parsing
- Analysis is purely client-side — no external API calls

## Testing
```bash
npm test          # Run tests once
npm run test:watch # Watch mode
```

## Loading the Extension
1. Open chrome://extensions/
2. Enable Developer mode
3. Click "Load unpacked" and select this project root directory

## Card Data
`src/data/cards.json` currently has the base set (2nd edition). When adding cards:
1. Add to `cards.json` (source of truth)
2. Update `cards-bundle.js` to match
3. Each card needs: `name`, `set`, `types`, `cost`, `effects`, `tags[]`, `isTerminal`
