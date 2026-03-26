# Dominion Helper

Chrome extension for [dominion.games](https://dominion.games) that analyzes the current kingdom and surfaces card synergies, viable strategy archetypes, and key warnings.

## Features

- Detects the 10 kingdom supply cards from the game UI
- Classifies cards by functional role (village, draw, trashing, etc.)
- Identifies synergies (engine core, curse defense, rush, throne combos, etc.)
- Suggests viable macro-strategies (engine, big money, rush, slog, combo)
- Warns about missing components (no village, no trashing, no +Buy)
- Renders an overlay panel on the game page

## Development

### Prerequisites

- Node.js 18+
- Chrome browser

### Setup

```bash
npm install
npm run build
```

### Commands

| Command                | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| `npm run build`        | Typecheck + build extension to `dist/`                    |
| `npm run dev`          | Build without typecheck (faster)                          |
| `npm test`             | Run the Vitest unit suite once                            |
| `npm run test:unit`    | Run the Vitest unit suite                                 |
| `npm run test:tracker` | Run tracker-focused unit tests                            |
| `npm run test:watch`   | Run tests in watch mode                                   |
| `npm run test:e2e`     | Run all Playwright coverage                               |
| `npm run test:smoke`   | Run the stable extension smoke suite in Playwright        |
| `npm run test:auth`    | Run authenticated dominion.games tracker Playwright tests |
| `npm run test:login`   | Run the focused login-debug Playwright helper             |
| `npm run lint`         | Check for lint errors                                     |
| `npm run lint:fix`     | Auto-fix lint errors                                      |
| `npm run format`       | Format all files with Prettier                            |
| `npm run typecheck`    | Run TypeScript type checker                               |

Vitest unit coverage lives in `tests/unit/`. Browser automation and live dominion.games coverage live in `tests/e2e/`.

### Loading the Extension

1. Run `npm run build`
2. Open `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked** and select the `dist/` directory
5. Navigate to [dominion.games](https://dominion.games) and start a game

After code changes, run `npm run build` again and click the reload button on the extension card in `chrome://extensions/`.

### Tracker Development Workflow

Tracker work has a dedicated verification loop in [docs/workflows/tracker-development.md](docs/workflows/tracker-development.md).
The longer-term fixture-based replay plan lives in [docs/workflows/tracker-ground-truth-plan.md](docs/workflows/tracker-ground-truth-plan.md).

For tracker changes, use this minimum loop:

```bash
npm run test:tracker
npm run build
npm run test:smoke
```

Then verify the live page in Chrome with the debug handle exposed on dominion.games:

```js
const dh = window.__dominionHelperDebug;
dh.bridgeSnapshot;
dh.trackerState?.tracker;
dh.trackerState?.gameState;
```

## Architecture

```
src/
  types.ts              # Shared TypeScript interfaces
  data/cards.json       # Card database (786 cards, 18 sets)
  analysis/
    engine.ts           # Main analysis orchestrator
    synergies.ts        # Synergy detection rules
    archetypes.ts       # Strategy archetype detection
    openings.ts         # Opening analysis (placeholder)
  content/
    content.ts          # Entry point (bundles into dist/content.js)
    observer.ts         # DOM observer for kingdom card detection
    ui.ts               # Overlay panel rendering
    overlay.css         # Overlay styles
  background/
    service-worker.ts   # Chrome message passing
  popup/
    popup.ts            # Extension popup logic
    popup.html          # Popup markup
    popup.css           # Popup styles
scripts/
  build.mjs             # Multi-entry Vite build script
tests/
  unit/
    engine.test.ts      # Vitest unit tests
  e2e/
    smoke.spec.ts       # Playwright smoke coverage
    auth.spec.ts        # Playwright authenticated flows
```

The build script bundles three entry points into IIFE format (required by Chrome content scripts):

- **Content script** — all analysis + DOM observer + UI bundled into a single `dist/content.js`
- **Service worker** — `dist/service-worker.js`
- **Popup** — `dist/popup.js`

## Card Data

`src/data/cards.json` contains 786 cards across 18 sets. Each card has:

- `name`, `set`, `types`, `cost`, `text`
- `effects` — action/card/coin/buy/VP bonuses
- `tags` — functional categories used by the analysis engine
- `isTerminal`, `isCantrip`

## Tech Stack

- TypeScript (strict mode)
- Vite (bundler)
- Vitest (testing)
- Playwright (browser automation)
- ESLint + Prettier (linting/formatting)
- Chrome Extension Manifest V3
