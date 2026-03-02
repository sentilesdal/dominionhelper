# Dominion Helper - Chrome Extension

## Project Overview
Chrome extension for dominion.games that analyzes the current kingdom (set of 10 supply cards) and surfaces card synergies, viable strategy archetypes, and key warnings.

## Tech Stack
- Chrome Extension Manifest V3
- Vanilla JavaScript (ES2022+, ESM modules)
- Vitest for testing
- No build step — source files are the extension files

## Project Structure
- `manifest.json` — Chrome extension manifest
- `src/content/` — Content scripts injected into dominion.games (observer, UI overlay)
- `src/analysis/` — Kingdom analysis engine (synergies, archetypes, openings)
- `src/data/cards.json` — Card database with tags for synergy detection
- `src/popup/` — Extension popup UI
- `src/background/` — Service worker for message passing
- `tests/` — Vitest tests
- `docs/adr/` — Architecture Decision Records

## Key Patterns
- Cards are tagged with functional categories (village, trasher, curser, etc.)
- Synergy detection is rule-based: if tag combinations exist, report the synergy
- DOM observation uses MutationObserver to detect when kingdom cards appear
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
`src/data/cards.json` currently has the base set (2nd edition). Cards from other expansions need to be added with proper tags. Each card needs:
- `name`, `set`, `types`, `cost`, `text`
- `tags` array (village, trasher, curser, gainer, etc.)
- `isTerminal` boolean
- `effects` object (actions, cards, buys, coins)
