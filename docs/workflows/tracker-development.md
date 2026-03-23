# Tracker Development Workflow

Use this workflow whenever a change touches tracker state, player tabs, or dominion.games application-state inspection.

## Why This Exists

Tracker bugs are hard to reason about from the UI alone. The fastest reliable loop is to compare three views of the same game state:

1. The side panel UI
2. Raw Angular state from `window.__dominionHelperDebug.bridgeSnapshot`
3. The extension's computed tracker state from `window.__dominionHelperDebug.trackerState`

## Fast Loop

1. Create a worktree and make the tracker change there.
2. Run targeted tracker tests:

   ```bash
   npm run test:tracker
   ```

3. Rebuild the extension:

   ```bash
   npm run build
   ```

4. Reload the unpacked extension from `dist/` in Chrome.
5. Open `https://dominion.games`, start or join a game, and open the extension side panel on the `Tracker` tab.
6. Open page DevTools on the dominion.games tab, not the extension page.
7. In the console, inspect the debug handle:

   ```js
   const dh = window.__dominionHelperDebug;
   dh.bridgeSnapshot;
   dh.trackerState?.tracker;
   dh.trackerState?.gameState;
   dh.getSnapshot();
   ```

## Manual Tracker Checks

### 1. Player Tabs

- Compare `dh.bridgeSnapshot.players.map((p) => p.name)` with `dh.trackerState.tracker.players.map((p) => p.fullName)`.
- Click each tracker tab and confirm the selected player changes without duplicate tabs appearing.
- Start a fresh game and confirm players from the previous game do not remain in the tab list.

### 2. Hand / Deck / Discard / In-Play

- Play a Treasure or Action and compare the side panel against:
  - `dh.bridgeSnapshot.players[*].zones` for `HandZone` and `InPlayZone`
  - `dh.trackerState.tracker.handCards`
  - `dh.trackerState.tracker.playCards`
- Buy or gain a card and confirm discard counts update in the side panel and `dh.trackerState.tracker.discardCards`.
- End a turn and confirm cleanup moves cards out of hand and non-Duration cards out of play.

### 3. No State Between Games

- Leave the game, return to lobby, or disconnect from the active match.
- Confirm:
  - `window.__dominionHelperDebug.bridgeSnapshot === null`
  - `window.__dominionHelperDebug.trackerState.tracker === null`
  - the tracker tab returns to `Waiting for a game on dominion.games...`
- Start a new game and verify the new player list and zones are fresh.

## Automation Expectations

For tracker changes, the minimum verification bar is:

```bash
npm run test:tracker
npm run build
npm run test:smoke
```

Use the auth-backed browser test when it is helpful and credentials are configured:

```bash
npm run test:auth
```

The auth path is now tracker-focused: it verifies authenticated login, tracker hydration, tab stability while switching players, and tracker clear behavior when leaving the current game. It still depends on live dominion.games timing, so keep treating it as strong signal rather than the only merge gate.

## Agent Checklist

Before finishing tracker work, confirm all of the following:

- Targeted tracker tests pass
- The extension builds successfully
- The debug handle exists on the dominion.games page
- Player tabs match the current game's players
- Hand, deck, discard, and in-play state match the debug handle
- Tracker state clears when the game disappears
- Smoke E2E still passes
