// Dominion Helper — Log Stream Sequencer
//
// Dominion's live log sometimes emits cleanup draws before the next turn
// marker. This helper sequences parsed log items so those ambiguous draws are
// only applied after cleanup when we can confirm they were the next hand, while
// still allowing ordinary mid-turn draws to resolve as soon as later lines make
// their intent clear.
//
// @module log-stream

import type { Card, GameState, LogEntry } from "../types";
import { processLogEntry, processTurnChange } from "./deck-state";

/**
 * Parsed item from the observed game log stream.
 */
export type ObservedLogItem =
  | {
      kind: "entry";
      entry: LogEntry;
    }
  | {
      kind: "turn";
      turn: number;
      fullName: string;
    };

/**
 * Buffered active-player draw entries awaiting enough context to determine
 * whether they are ordinary draws or cleanup draws.
 */
export interface PendingDrawBuffer {
  entries: LogEntry[];
}

/**
 * Result of sequencing a batch of observed log items.
 */
export interface LogStreamResult {
  changed: boolean;
  needsImmediateSync: boolean;
}

const HIDDEN_ZONE_ACTIONS = new Set<LogEntry["action"]>([
  "buys",
  "gains",
  "trashes",
  "discards",
  "shuffles",
  "topdecks",
  "starts-with",
]);

/**
 * Creates an empty pending draw buffer.
 *
 * @returns Mutable buffer used across log observer callbacks
 */
export function createPendingDrawBuffer(): PendingDrawBuffer {
  return { entries: [] };
}

/**
 * Clears any deferred draw entries.
 *
 * @param buffer - Pending draw buffer to reset
 */
export function clearPendingDrawBuffer(buffer: PendingDrawBuffer): void {
  buffer.entries = [];
}

/**
 * Applies all buffered draws to the tracker state.
 *
 * @param state - Current game state
 * @param buffer - Pending draw buffer
 * @returns True when at least one draw was applied
 */
function flushPendingDraws(
  state: GameState,
  buffer: PendingDrawBuffer,
): boolean {
  if (buffer.entries.length === 0) return false;

  for (const entry of buffer.entries) {
    processLogEntry(state, entry);
  }

  clearPendingDrawBuffer(buffer);
  return true;
}

/**
 * Finds the next non-draw decision point in a batch.
 *
 * Consecutive draw lines stay ambiguous until we either see another regular
 * action, which means the cards had to reach the hand first, or a turn marker,
 * which means the draws belonged to cleanup.
 *
 * @param items - Observed items for the current batch
 * @param startIndex - Index after the current item
 * @returns `"entry"`, `"turn"`, or null when the batch ends while still ambiguous
 */
function findNextDecisionKind(
  items: ObservedLogItem[],
  startIndex: number,
): "entry" | "turn" | null {
  for (let index = startIndex; index < items.length; index += 1) {
    const item = items[index];
    if (item.kind === "turn") {
      return "turn";
    }

    if (item.entry.action !== "draws") {
      return "entry";
    }
  }

  return null;
}

/**
 * Detects the initial turn-one opening hand draw so we do not defer it.
 *
 * The first draw after `Turn 1 - Player` is not a cleanup draw; it's the
 * starting hand and should be applied immediately even if it is the only line
 * currently in the observer batch.
 *
 * @param state - Current game state
 * @param entry - Draw entry being considered for buffering
 * @returns True when the draw is the initial opening hand draw
 */
function isOpeningHandDraw(state: GameState, entry: LogEntry): boolean {
  if (entry.action !== "draws" || state.currentTurn !== 1) return false;
  if (entry.playerAbbrev !== state.activePlayer) return false;

  const zones = state.players.get(entry.playerAbbrev);
  if (!zones) return false;

  return (
    zones.hand.size === 0 &&
    zones.play.size === 0 &&
    zones.discard.size === 0 &&
    zones.trash.size === 0
  );
}

/**
 * Sequences observed log items, deferring ambiguous active-player draw lines
 * until a later line confirms whether they were cleanup draws.
 *
 * @param state - Current game state to mutate
 * @param items - Parsed log items from the latest observer callback
 * @param cardDb - Card database used during cleanup processing
 * @param pendingDrawBuffer - Cross-callback draw buffer
 * @returns Flags describing whether tracker state changed and whether hidden
 *   zones changed enough to justify an immediate UI sync while the Angular
 *   bridge is active
 */
export function processObservedLogItems(
  state: GameState,
  items: ObservedLogItem[],
  cardDb: Map<string, Card>,
  pendingDrawBuffer: PendingDrawBuffer,
): LogStreamResult {
  let changed = false;
  let needsImmediateSync = false;

  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];

    if (item.kind === "turn") {
      processTurnChange(state, item.turn, item.fullName, cardDb);
      changed = true;
      needsImmediateSync = true;

      if (flushPendingDraws(state, pendingDrawBuffer)) {
        changed = true;
      }
      continue;
    }

    const { entry } = item;
    const isAmbiguousActivePlayerDraw =
      entry.action === "draws" &&
      state.activePlayer.length > 0 &&
      entry.playerAbbrev === state.activePlayer &&
      !isOpeningHandDraw(state, entry);

    if (isAmbiguousActivePlayerDraw) {
      const nextDecision = findNextDecisionKind(items, index + 1);
      if (nextDecision !== "entry") {
        pendingDrawBuffer.entries.push(entry);
        continue;
      }
    }

    flushPendingDraws(state, pendingDrawBuffer);

    processLogEntry(state, entry);
    changed = true;

    if (HIDDEN_ZONE_ACTIONS.has(entry.action)) {
      needsImmediateSync = true;
    }
  }

  return { changed, needsImmediateSync };
}
