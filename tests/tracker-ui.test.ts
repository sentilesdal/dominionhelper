// @vitest-environment jsdom

import { describe, it, expect, beforeEach } from "vitest";
import type { Card, GameState } from "../src/types";
import { createPlayerZones } from "../src/tracker/deck-state";
import {
  renderTrackerPanel,
  removeTrackerPanel,
} from "../src/tracker/tracker-ui";

// Helper to build a minimal Card for testing
function makeCard(name: string, types: string[], coins: number = 0): Card {
  return {
    name,
    set: "Base",
    types: types as Card["types"],
    cost: { coins: 0 },
    text: "",
    effects: { coins: coins || undefined },
    tags: [],
    isTerminal: false,
    isCantrip: false,
  };
}

function makeCardDb(cards: Card[]): Map<string, Card> {
  return new Map(cards.map((c) => [c.name, c]));
}

// Builds a GameState with one player who has the standard starting deck
function makeGameStateWithStartingDeck(): GameState {
  const zones = createPlayerZones();
  zones.deck.set("Copper", 7);
  zones.deck.set("Estate", 3);

  const state: GameState = {
    players: new Map([["m", zones]]),
    playerNames: new Map([["m", "muddybrown"]]),
    currentTurn: 1,
    activePlayer: "m",
    localPlayer: "m",
  };

  return state;
}

beforeEach(() => {
  // Clean up any panels from previous tests
  document.body.innerHTML = "";
});

describe("renderTrackerPanel", () => {
  it("creates the tracker panel element", () => {
    const state = makeGameStateWithStartingDeck();
    const cardDb = makeCardDb([
      makeCard("Copper", ["Treasure"], 1),
      makeCard("Estate", ["Victory"]),
    ]);

    renderTrackerPanel(state, cardDb);

    const panel = document.getElementById("dominion-helper-tracker");
    expect(panel).not.toBeNull();
  });

  it("shows deck composition", () => {
    const state = makeGameStateWithStartingDeck();
    const cardDb = makeCardDb([
      makeCard("Copper", ["Treasure"], 1),
      makeCard("Estate", ["Victory"]),
    ]);

    renderTrackerPanel(state, cardDb);

    const panel = document.getElementById("dominion-helper-tracker")!;
    const text = panel.textContent!;
    expect(text).toContain("Treasures: 7");
    expect(text).toContain("Victories: 3");
    expect(text).toContain("Total: 10 cards");
  });

  it("shows card zone counts", () => {
    const state = makeGameStateWithStartingDeck();
    const zones = state.players.get("m")!;
    // Move some cards to hand
    zones.deck.set("Copper", 4);
    zones.hand.set("Copper", 3);

    const cardDb = makeCardDb([
      makeCard("Copper", ["Treasure"], 1),
      makeCard("Estate", ["Victory"]),
    ]);

    renderTrackerPanel(state, cardDb);

    const panel = document.getElementById("dominion-helper-tracker")!;
    const text = panel.textContent!;
    expect(text).toContain("Draw pile: 7");
    expect(text).toContain("Hand: 3");
  });

  it("shows all owned cards", () => {
    const state = makeGameStateWithStartingDeck();
    const cardDb = makeCardDb([
      makeCard("Copper", ["Treasure"], 1),
      makeCard("Estate", ["Victory"]),
    ]);

    renderTrackerPanel(state, cardDb);

    const panel = document.getElementById("dominion-helper-tracker")!;
    const text = panel.textContent!;
    expect(text).toContain("Copper x7");
    expect(text).toContain("Estate x3");
  });

  it("shows player tabs", () => {
    const state = makeGameStateWithStartingDeck();
    // Add opponent
    const oppZones = createPlayerZones();
    oppZones.deck.set("Copper", 7);
    state.players.set("o", oppZones);
    state.playerNames.set("o", "opponent");

    const cardDb = makeCardDb([makeCard("Copper", ["Treasure"], 1)]);

    renderTrackerPanel(state, cardDb);

    const tabs = document.querySelectorAll(".dh-tracker-tab");
    expect(tabs.length).toBe(2);
  });

  it("reuses existing panel on re-render", () => {
    const state = makeGameStateWithStartingDeck();
    const cardDb = makeCardDb([makeCard("Copper", ["Treasure"], 1)]);

    renderTrackerPanel(state, cardDb);
    renderTrackerPanel(state, cardDb);

    const panels = document.querySelectorAll("#dominion-helper-tracker");
    expect(panels.length).toBe(1);
  });

  it("shows waiting message when no zones available", () => {
    const state: GameState = {
      players: new Map(),
      playerNames: new Map(),
      currentTurn: 0,
      activePlayer: "",
      localPlayer: "",
    };
    const cardDb = makeCardDb([]);

    renderTrackerPanel(state, cardDb);

    const panel = document.getElementById("dominion-helper-tracker")!;
    expect(panel.textContent).toContain("Waiting for game to start");
  });
});

describe("removeTrackerPanel", () => {
  it("removes the tracker panel from the DOM", () => {
    const state = makeGameStateWithStartingDeck();
    const cardDb = makeCardDb([makeCard("Copper", ["Treasure"], 1)]);

    renderTrackerPanel(state, cardDb);
    expect(document.getElementById("dominion-helper-tracker")).not.toBeNull();

    removeTrackerPanel();
    expect(document.getElementById("dominion-helper-tracker")).toBeNull();
  });

  it("does nothing if panel doesn't exist", () => {
    // Should not throw
    removeTrackerPanel();
  });
});
