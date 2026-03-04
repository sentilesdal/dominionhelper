/**
 * Dominion Helper — Synergy Detection
 *
 * Identifies strategic card synergies within a kingdom by examining
 * tag combinations. Each rule checks for a known Dominion pattern
 * (e.g., village + draw = engine core) and produces a human-readable
 * description when the pattern is present.
 *
 * @module synergies
 */

import type { Card, TagClassification } from "../types";

/**
 * Detects synergies between cards in the kingdom based on tag combinations.
 *
 * Checks for: engine cores (village + draw), villager engines, curse defense
 * (trasher + curser), rush potential (gainer + alt-VP), trash-for-benefit
 * chains, draw-to-X combos, throne room variants, multi-buy, and full
 * engine potential (village + draw + trashing).
 *
 * @param cards - Array of Card objects in the current kingdom
 * @param tags - Pre-classified tag groupings from classifyComponents
 * @returns Array of human-readable synergy descriptions
 */
export function detectSynergies(
  cards: Card[],
  tags: TagClassification,
): string[] {
  const synergies: string[] = [];

  // Village + Terminal Draw = Engine core (the most fundamental Dominion synergy)
  if (tags.villages.length > 0 && tags.draw.length > 0) {
    synergies.push(
      `Engine core: ${tags.villages[0]} + ${tags.draw[0]} — chain actions and draw`,
    );
  } else if (
    tags.villagers &&
    tags.villagers.length > 0 &&
    tags.draw.length > 0
  ) {
    // Villager token sources (e.g., Recruiter) can substitute for villages
    // in lighter engines that don't need unlimited actions per turn
    const pureVillagers = tags.villagers.filter(
      (name) => !tags.villages.includes(name),
    );
    if (pureVillagers.length > 0) {
      const drawPartner =
        tags.draw.find((name) => !pureVillagers.includes(name)) || tags.draw[0];
      synergies.push(
        `Villager engine: ${pureVillagers[0]} + ${drawPartner} — spend Villagers for extra actions`,
      );
    }
  }

  // Trasher counters curser — having a trasher when curses are flying
  // lets you remove curses from your deck to stay competitive
  if (tags.trashers.length > 0 && tags.attacks.length > 0) {
    const cursers = cards.filter((c) => c.tags && c.tags.includes("curser"));
    if (cursers.length > 0) {
      synergies.push(`${tags.trashers[0]} counters ${cursers[0].name} curses`);
    }
  }

  // Gainer + Alt-VP = Rush potential — gain cheap cards fast and convert
  // quantity into victory points (e.g., Workshop + Gardens)
  if (tags.gainers.length > 0 && tags.altVp.length > 0) {
    synergies.push(
      `Rush: ${tags.gainers[0]} + ${tags.altVp[0]} — gain cards fast for alt-VP`,
    );
  }

  // Trash-for-benefit cards (e.g., Remodel, Upgrade) can turn cheap cards
  // into expensive ones, creating upgrade chains through the cost curve
  const tfb = cards.filter(
    (c) => c.tags && c.tags.includes("trash-for-benefit"),
  );
  if (tfb.length > 0) {
    synergies.push(
      `${tfb[0].name} can upgrade cards — look for upgrade chains`,
    );
  }

  // Draw-to-X cards (e.g., Library, Watchtower) combo with terminals —
  // play your terminals first to spend actions, then draw back up to X
  const drawToX = cards.filter((c) => c.tags && c.tags.includes("draw-to-x"));
  const terminals = cards.filter(
    (c) => c.isTerminal && !c.tags?.includes("draw-to-x"),
  );
  if (drawToX.length > 0 && terminals.length > 1) {
    synergies.push(
      `${drawToX[0].name} combos with terminal actions — play terminals, then draw back up`,
    );
  }

  // Throne Room variants double the effect of strong payload cards,
  // cursers (double the curses), or economy cards (double the coins)
  const throneVariants = cards.filter(
    (c) => c.tags && c.tags.includes("throne-variant"),
  );
  if (throneVariants.length > 0) {
    const payload = cards.filter(
      (c) =>
        c.tags &&
        (c.tags.includes("payload") ||
          c.tags.includes("curser") ||
          c.tags.includes("economy")),
    );
    if (payload.length > 0) {
      synergies.push(
        `${throneVariants[0].name} + ${payload[0].name} — double the impact`,
      );
    }
  }

  // +Buy with strong economy enables multi-buy turns — buying two $5 cards
  // in one turn is a huge tempo advantage
  if (tags.plusBuy.length > 0 && tags.economy.length > 1) {
    synergies.push(`${tags.plusBuy[0]} enables multi-buy with strong economy`);
  }

  // Village + draw + trasher = full engine — the trifecta for building a
  // thin, consistent deck that can reliably draw and play every card
  if (
    tags.villages.length > 0 &&
    tags.draw.length > 0 &&
    tags.trashers.length > 0
  ) {
    synergies.push(
      "Full engine potential: village + draw + trashing for a thin, consistent deck",
    );
  }

  return synergies;
}
