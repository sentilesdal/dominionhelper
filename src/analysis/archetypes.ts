/**
 * Dominion Helper — Strategy Archetype Detection
 *
 * Identifies viable macro-strategies for the current kingdom. Dominion
 * games generally fall into one of several archetypes (engine, big money,
 * rush, slog, combo), and the best kingdoms support multiple approaches.
 * This module checks which archetypes the kingdom's cards can support.
 *
 * @module archetypes
 */

import type { Card, TagClassification } from "../types";

/**
 * Identifies viable macro-strategies based on available kingdom components.
 *
 * Evaluates the kingdom for five archetype patterns:
 * - **Engine**: Village + draw + payload (optional trashing, +Buy)
 * - **Big Money + X**: Strong terminal as a supplement to money-based strategy
 * - **Rush**: Gainer + alt-VP for fast point accumulation
 * - **Slog**: Attacks without trashing — a war of attrition
 * - **Combo**: Throne variant + cost reducer for massive discount turns
 *
 * Falls back to "Big Money likely" if no specific archetype is detected.
 *
 * @param cards - Array of Card objects in the current kingdom
 * @param tags - Pre-classified tag groupings from classifyComponents
 * @returns Array of human-readable strategy descriptions
 */
export function detectArchetypes(
  cards: Card[],
  tags: TagClassification,
): string[] {
  const archetypes: string[] = [];

  const hasVillage = tags.villages.length > 0;
  const hasDraw = tags.draw.length > 0;
  const hasTrash = tags.trashers.length > 0;
  const hasPayload = tags.economy.length > 0 || tags.attacks.length > 0;

  // Engine: the classic Dominion strategy — chain actions with villages,
  // draw your deck with draw cards, and use payload for points/economy
  if (hasVillage && hasDraw && hasPayload) {
    let desc = "Engine";
    if (hasTrash) desc += " (with trashing for thin deck)";
    // +Buy lets an engine buy Province + Duchy or double Province in one turn
    if (tags.plusBuy.length > 0) desc += " — can double-Province";
    archetypes.push(desc);
  }

  // Big Money + X: buy money and one strong terminal action card.
  // Works when the kingdom lacks engine components but has a standout card
  const strongTerminals = cards.filter(
    (c) =>
      c.isTerminal &&
      c.tags &&
      (c.tags.includes("economy") || c.tags.includes("terminal-draw")),
  );
  if (strongTerminals.length > 0) {
    const best = strongTerminals[0].name;
    archetypes.push(`Big Money + ${best}`);
  }

  // Rush: gain cheap cards quickly and convert quantity into VP.
  // Classic example: Workshop + Gardens (gain cards to inflate deck size)
  if (tags.gainers.length > 0 && tags.altVp.length > 0) {
    archetypes.push(`Rush: ${tags.gainers[0]} + ${tags.altVp[0]}`);
  }

  // Slog: when attacks are present but trashing is absent, games devolve
  // into a war of attrition with bloated decks grinding to a finish
  if (tags.attacks.length > 0 && tags.trashers.length === 0) {
    archetypes.push("Slog — attacks with no trashing, war of attrition");
  }

  // Combo: Throne Room variant + cost reducer (e.g., King's Court + Bridge)
  // enables buying entire piles in a single massive turn
  const throneVariants = cards.filter(
    (c) => c.tags && c.tags.includes("throne-variant"),
  );
  const costReducers = cards.filter(
    (c) => c.tags && c.tags.includes("cost-reducer"),
  );
  if (throneVariants.length > 0 && costReducers.length > 0) {
    archetypes.push(
      `Combo: ${throneVariants[0].name} + ${costReducers[0].name} — massive cost reduction`,
    );
  }

  // Fallback: if no specific archetype is detected, the kingdom probably
  // favors a simple money-based approach
  if (archetypes.length === 0) {
    archetypes.push("Big Money likely — limited engine components");
  }

  return archetypes;
}
