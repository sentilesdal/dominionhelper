import { describe, it, expect } from "vitest";
import type { Card, LogEntry } from "../../src/types";
import { createGameState, processLogEntry } from "../../src/tracker/deck-state";
import {
  createPendingDrawBuffer,
  processObservedLogItems,
  type ObservedLogItem,
} from "../../src/tracker/log-stream";

function makeCardDb(cards: Card[]): Map<string, Card> {
  return new Map(cards.map((card) => [card.name, card]));
}

function makeEntry(
  playerAbbrev: string,
  action: LogEntry["action"],
  cards: string[],
  counts: number[],
): LogEntry {
  return {
    playerAbbrev,
    action,
    cards,
    counts,
    rawText: "",
  };
}

function makeItems(...items: ObservedLogItem[]): ObservedLogItem[] {
  return items;
}

describe("processObservedLogItems", () => {
  it("applies the opening hand draw immediately on turn one", () => {
    const state = createGameState();
    const pendingDrawBuffer = createPendingDrawBuffer();

    processLogEntry(
      state,
      makeEntry("m", "starts-with", ["Copper", "Estate"], [7, 3]),
    );

    const result = processObservedLogItems(
      state,
      makeItems(
        {
          kind: "turn",
          turn: 1,
          fullName: "muddybrown",
        },
        {
          kind: "entry",
          entry: makeEntry("m", "draws", ["Copper", "Estate"], [4, 1]),
        },
      ),
      makeCardDb([]),
      pendingDrawBuffer,
    );

    const zones = state.players.get("m")!;
    expect(result.changed).toBe(true);
    expect(result.needsImmediateSync).toBe(true);
    expect(pendingDrawBuffer.entries).toHaveLength(0);
    expect(zones.hand.get("Copper")).toBe(4);
    expect(zones.hand.get("Estate")).toBe(1);
    expect(zones.deck.get("Copper")).toBe(3);
    expect(zones.deck.get("Estate")).toBe(2);
  });

  it("holds cleanup draws until the next turn marker arrives", () => {
    const state = createGameState();
    const pendingDrawBuffer = createPendingDrawBuffer();
    const cardDb = makeCardDb([]);

    processLogEntry(
      state,
      makeEntry("m", "starts-with", ["Copper", "Estate"], [7, 3]),
    );

    processObservedLogItems(
      state,
      makeItems(
        {
          kind: "turn",
          turn: 1,
          fullName: "muddybrown",
        },
        {
          kind: "entry",
          entry: makeEntry("m", "draws", ["Copper", "Estate"], [4, 1]),
        },
      ),
      cardDb,
      pendingDrawBuffer,
    );

    const midTurnResult = processObservedLogItems(
      state,
      makeItems(
        {
          kind: "entry",
          entry: makeEntry("m", "plays", ["Copper"], [4]),
        },
        {
          kind: "entry",
          entry: makeEntry("m", "buys", ["Silver"], [1]),
        },
        {
          kind: "entry",
          entry: makeEntry("m", "draws", ["Copper", "Estate"], [3, 2]),
        },
      ),
      cardDb,
      pendingDrawBuffer,
    );

    const midTurnZones = state.players.get("m")!;
    expect(midTurnResult.changed).toBe(true);
    expect(midTurnResult.needsImmediateSync).toBe(true);
    expect(pendingDrawBuffer.entries).toHaveLength(1);
    expect(midTurnZones.play.get("Copper")).toBe(4);
    expect(midTurnZones.discard.get("Silver")).toBe(1);
    expect(midTurnZones.hand.get("Estate")).toBe(1);

    const turnChangeResult = processObservedLogItems(
      state,
      makeItems({
        kind: "turn",
        turn: 1,
        fullName: "Lord Rattington",
      }),
      cardDb,
      pendingDrawBuffer,
    );

    const zones = state.players.get("m")!;
    expect(turnChangeResult.changed).toBe(true);
    expect(turnChangeResult.needsImmediateSync).toBe(true);
    expect(pendingDrawBuffer.entries).toHaveLength(0);
    expect(zones.play.size).toBe(0);
    expect(zones.hand.get("Copper")).toBe(3);
    expect(zones.hand.get("Estate")).toBe(2);
    expect(zones.discard.get("Copper")).toBe(4);
    expect(zones.discard.get("Estate")).toBe(1);
    expect(zones.discard.get("Silver")).toBe(1);
  });

  it("flushes buffered draws before a later same-turn action", () => {
    const state = createGameState();
    const pendingDrawBuffer = createPendingDrawBuffer();
    const cardDb = makeCardDb([]);

    processLogEntry(state, makeEntry("m", "starts-with", ["Copper"], [1]));
    processObservedLogItems(
      state,
      makeItems(
        {
          kind: "turn",
          turn: 1,
          fullName: "muddybrown",
        },
        {
          kind: "entry",
          entry: makeEntry("m", "draws", ["Copper"], [1]),
        },
      ),
      cardDb,
      pendingDrawBuffer,
    );

    state.players.get("m")!.deck.set("Silver", 1);

    const bufferedDrawResult = processObservedLogItems(
      state,
      makeItems({
        kind: "entry",
        entry: makeEntry("m", "draws", ["Silver"], [1]),
      }),
      cardDb,
      pendingDrawBuffer,
    );

    expect(bufferedDrawResult.changed).toBe(false);
    expect(bufferedDrawResult.needsImmediateSync).toBe(false);
    expect(pendingDrawBuffer.entries).toHaveLength(1);

    const playResult = processObservedLogItems(
      state,
      makeItems({
        kind: "entry",
        entry: makeEntry("m", "plays", ["Silver"], [1]),
      }),
      cardDb,
      pendingDrawBuffer,
    );

    const zones = state.players.get("m")!;
    expect(playResult.changed).toBe(true);
    expect(playResult.needsImmediateSync).toBe(false);
    expect(pendingDrawBuffer.entries).toHaveLength(0);
    expect(zones.hand.get("Silver") || 0).toBe(0);
    expect(zones.play.get("Silver")).toBe(1);
  });
});
