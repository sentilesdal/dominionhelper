// Dominion Helper — Angular Game State Bridge
//
// Runs in the MAIN world (not ISOLATED) so it can access the page's Angular
// context. Polls the Angular game state every 500ms and dispatches a
// CustomEvent with a GameStateSnapshot whenever the state changes.
//
// The ISOLATED-world content script listens for these events to get accurate
// zone counts and visible card lists, which are used to correct log-based
// deck tracking.
//
// Event name: "dominion-helper-game-state"
// Detail: GameStateSnapshot (see src/types.ts)
//
// @module game-state-bridge

// Type aliases for the Angular structures we read. These mirror the runtime
// shape of the dominion.games Angular objects — not importable since this
// file runs in MAIN world with no module system access to our types.
interface BridgeZoneSnapshot {
  zoneName: string;
  cards: string[];
  count: number;
}

interface BridgePlayerSnapshot {
  name: string;
  initials: string;
  isMe: boolean;
  zones: BridgeZoneSnapshot[];
}

interface BridgeGameStateSnapshot {
  players: BridgePlayerSnapshot[];
  turnNumber: number;
}

interface DominionHelperDebugHandle {
  bridgeSnapshot: BridgeGameStateSnapshot | null;
  trackerState: unknown;
  lastBridgeUpdate: string | null;
  lastTrackerUpdate: string | null;
  getSnapshot: () => BridgeGameStateSnapshot | null;
}

interface DominionHelperWindow extends Window {
  __dominionHelperDebug?: DominionHelperDebugHandle;
}

// Detects whether the visible DOM is actually showing a live match surface.
//
// dominion.games can keep Angular game/player objects around on lobby, table,
// and results routes even after the match UI is gone. The tracker should only
// consume snapshots while the live game log or kingdom viewer is present.
function hasLiveGameSurface(): boolean {
  return Boolean(
    document.querySelector(
      ".game-log, GAME-LOG, .kingdom-viewer-group, KINGDOM-VIEWER",
    ),
  );
}

// Reads the current game state from Angular's injector. Returns null if
// Angular isn't loaded, the game service isn't available, or no players exist.
function getSnapshot(): BridgeGameStateSnapshot | null {
  try {
    if (!hasLiveGameSurface()) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ng = (window as any).angular;
    if (!ng) return null;

    const injector = ng.element(document.body).injector();
    if (!injector) return null;

    const game = injector.get("game");
    if (!game?.state?.players) return null;

    const players: BridgePlayerSnapshot[] = [];
    for (const player of game.state.players) {
      const zones: BridgeZoneSnapshot[] = [];

      for (const zone of player.ownedZones) {
        const zoneName: string = zone.zoneName;
        const cards: string[] = [];
        let count = 0;

        // Each zone contains cardStacks; visible cards have topCard with pileName,
        // face-down cards contribute to privateAnonymousCards count
        for (const stack of zone.cardStacks) {
          if (stack.topCard?.pileName?.english) {
            cards.push(stack.topCard.pileName.english);
            count += 1;
          }
          count += stack.privateAnonymousCards || 0;
        }

        zones.push({ zoneName, cards, count });
      }

      players.push({
        name: player.name,
        initials: player.initials,
        isMe: player.isMe,
        zones,
      });
    }

    return {
      players,
      turnNumber: game.state.turnCounter || 0,
    };
  } catch {
    // Angular not ready or game not in progress — silently return null
    return null;
  }
}

// Exposes the latest raw bridge snapshot and computed tracker state on the page
// window so we can inspect both from DevTools while developing against the live
// dominion.games client.
const debugWindow = window as DominionHelperWindow;
const debugHandle =
  debugWindow.__dominionHelperDebug ??
  (debugWindow.__dominionHelperDebug = {
    bridgeSnapshot: null,
    trackerState: null,
    lastBridgeUpdate: null,
    lastTrackerUpdate: null,
    getSnapshot,
  });

window.addEventListener("dominion-helper-tracker-debug", (e: Event) => {
  debugHandle.trackerState = (e as CustomEvent).detail ?? null;
  debugHandle.lastTrackerUpdate = new Date().toISOString();
});

// Track the last dispatched JSON to avoid sending duplicate events
let lastJson = "";
let hadSnapshot = false;

// Poll every 500ms — frequent enough to catch mid-turn state changes
// but light enough to not impact game performance
setInterval(() => {
  const snapshot = getSnapshot();
  if (!snapshot) {
    if (!hadSnapshot) return;

    hadSnapshot = false;
    lastJson = "";
    debugHandle.bridgeSnapshot = null;
    debugHandle.lastBridgeUpdate = null;

    window.dispatchEvent(
      new CustomEvent("dominion-helper-game-state", {
        detail: null,
      }),
    );
    return;
  }

  hadSnapshot = true;
  const json = JSON.stringify(snapshot);
  // Only dispatch when state actually changed
  if (json === lastJson) return;
  lastJson = json;
  debugHandle.bridgeSnapshot = snapshot;
  debugHandle.lastBridgeUpdate = new Date().toISOString();

  window.dispatchEvent(
    new CustomEvent("dominion-helper-game-state", {
      detail: snapshot,
    }),
  );
}, 500);
