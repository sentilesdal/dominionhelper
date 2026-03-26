// Test helper factory functions to reduce boilerplate when constructing
// Card and TagClassification objects for unit tests.

import type {
  Card,
  CardTag,
  CardType,
  TagClassification,
} from "../../src/types";

// Creates a minimal Card object with sensible defaults.
// Pass overrides to customize specific fields for the test scenario.
export function makeCard(overrides: Partial<Card> = {}): Card {
  return {
    name: overrides.name ?? "TestCard",
    set: overrides.set ?? "Dominion",
    types: overrides.types ?? (["Action"] as CardType[]),
    cost: overrides.cost ?? { coins: 3 },
    text: overrides.text ?? "",
    effects: overrides.effects ?? {},
    tags: overrides.tags ?? ([] as CardTag[]),
    isTerminal: overrides.isTerminal ?? false,
    isCantrip: overrides.isCantrip ?? false,
  };
}

// Creates a TagClassification object with empty arrays for all categories.
// Pass overrides to populate specific categories for the test scenario.
export function makeTags(
  overrides: Partial<TagClassification> = {},
): TagClassification {
  return {
    villages: overrides.villages ?? [],
    draw: overrides.draw ?? [],
    trashers: overrides.trashers ?? [],
    gainers: overrides.gainers ?? [],
    plusBuy: overrides.plusBuy ?? [],
    attacks: overrides.attacks ?? [],
    reactions: overrides.reactions ?? [],
    altVp: overrides.altVp ?? [],
    economy: overrides.economy ?? [],
    sifters: overrides.sifters ?? [],
    villagers: overrides.villagers ?? [],
  };
}
