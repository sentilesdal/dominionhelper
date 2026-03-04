/**
 * Dominion Helper — Analysis Engine
 *
 * Main entry point for kingdom analysis. Takes a list of card names detected
 * from the dominion.games UI, looks them up in the card database, classifies
 * them by functional role, then runs synergy and archetype detection to
 * produce strategic advice.
 *
 * This is the only module that directly imports the card database. All other
 * analysis modules receive card data as function arguments.
 *
 * @module engine
 */

import type { Card, TagClassification, AnalysisResult } from "../types";
import cardData from "../data/cards.json";
import { detectSynergies } from "./synergies";
import { detectArchetypes } from "./archetypes";

/**
 * Builds a lookup map from card name to Card object for O(1) access.
 *
 * @param cards - Array of all cards from the database
 * @returns Map keyed by card name
 */
function buildCardMap(cards: Card[]): Map<string, Card> {
  const map = new Map<string, Card>();
  for (const c of cards) {
    map.set(c.name, c);
  }
  return map;
}

/**
 * Groups kingdom cards by functional role (village, draw, trasher, etc.)
 * and produces human-readable component summaries.
 *
 * Each card is checked against known tag categories. A card can appear in
 * multiple groups (e.g., a card tagged "village" and "economy" appears in
 * both). Attack classification includes cursers, handsize attacks, and junkers.
 *
 * @param cards - Array of Card objects found in the kingdom
 * @returns Object containing display-ready component strings and the raw tag classification
 */
function classifyComponents(cards: Card[]): {
  components: string[];
  tags: TagClassification;
} {
  const components: string[] = [];
  const tags: TagClassification = {
    villages: [],
    draw: [],
    trashers: [],
    gainers: [],
    plusBuy: [],
    attacks: [],
    reactions: [],
    altVp: [],
    economy: [],
    sifters: [],
    villagers: [],
  };

  for (const card of cards) {
    if (!card) continue;
    const t = card.tags || [];

    if (t.includes("village")) tags.villages.push(card.name);
    if (t.includes("terminal-draw") || t.includes("non-terminal-draw"))
      tags.draw.push(card.name);
    if (t.includes("trasher")) tags.trashers.push(card.name);
    if (t.includes("gainer")) tags.gainers.push(card.name);
    if (t.includes("plus-buy")) tags.plusBuy.push(card.name);
    // All three attack subtypes are grouped together for strategic analysis
    if (
      t.includes("curser") ||
      t.includes("handsize-attack") ||
      t.includes("junker")
    )
      tags.attacks.push(card.name);
    if (t.includes("reaction")) tags.reactions.push(card.name);
    if (t.includes("alt-vp")) tags.altVp.push(card.name);
    if (t.includes("economy")) tags.economy.push(card.name);
    if (t.includes("sifter") || t.includes("draw-to-x"))
      tags.sifters.push(card.name);
    if (t.includes("villagers")) tags.villagers.push(card.name);
  }

  // Build display strings for each non-empty category
  if (tags.villages.length > 0)
    components.push(`Villages: ${tags.villages.join(", ")}`);
  if (tags.draw.length > 0) components.push(`Draw: ${tags.draw.join(", ")}`);
  if (tags.trashers.length > 0)
    components.push(`Trashing: ${tags.trashers.join(", ")}`);
  if (tags.gainers.length > 0)
    components.push(`Gainers: ${tags.gainers.join(", ")}`);
  if (tags.plusBuy.length > 0)
    components.push(`+Buy: ${tags.plusBuy.join(", ")}`);
  if (tags.attacks.length > 0)
    components.push(`Attacks: ${tags.attacks.join(", ")}`);
  if (tags.reactions.length > 0)
    components.push(`Reactions: ${tags.reactions.join(", ")}`);
  if (tags.altVp.length > 0)
    components.push(`Alt VP: ${tags.altVp.join(", ")}`);

  return { components, tags };
}

/**
 * Generates strategic warnings about the kingdom's weaknesses.
 *
 * Checks for common problem patterns that players should be aware of:
 * missing villages (can't chain terminals), no trashing (bloated deck),
 * no +Buy (one purchase per turn), unblockable attacks, and cursing
 * attacks without a trasher to remove them.
 *
 * @param tags - Classified tag groupings from classifyComponents
 * @param getCard - Lookup function to retrieve a Card by name
 * @returns Array of human-readable warning strings
 */
function generateNotes(
  tags: TagClassification,
  getCard: (name: string) => Card | undefined,
): string[] {
  const notes: string[] = [];

  if (tags.villages.length === 0) {
    // Villager token sources (e.g., Recruiter) provide a weaker form of
    // +Actions — worth noting as a partial substitute for true villages
    const pureVillagers = tags.villagers.filter(
      (name) => !tags.villages.includes(name),
    );
    if (pureVillagers.length > 0) {
      notes.push(
        `No village, but ${pureVillagers.join(", ")} provide${pureVillagers.length === 1 ? "s" : ""} Villagers for extra actions`,
      );
    } else {
      notes.push("No village — limited to one terminal action per turn");
    }
  }

  if (tags.trashers.length === 0) {
    notes.push("No trashing available — deck will stay bloated");
  }

  if (tags.plusBuy.length === 0) {
    notes.push("No +Buy — can only buy one card per turn");
  }

  // Attacks with no reaction available means opponents have no defense
  if (tags.attacks.length > 0 && tags.reactions.length === 0) {
    notes.push(
      `Attacks (${tags.attacks.join(", ")}) with no reaction available`,
    );
  }

  // Cursing attacks are especially punishing without a trasher — the curses
  // permanently clog your deck and cost you VP
  if (
    tags.attacks.some((a) => {
      const c = getCard(a);
      return c && c.tags && c.tags.includes("curser");
    }) &&
    tags.trashers.length === 0
  ) {
    notes.push(
      "Cursing attack with no trasher — get those curses out or be cursed!",
    );
  }

  return notes;
}

/**
 * Analyzes a kingdom by card names and returns a complete strategic breakdown.
 *
 * This is the main entry point for the analysis engine. It:
 * 1. Looks up each card name in the database (cards not found go to `unknown`)
 * 2. Classifies known cards by functional role (villages, draw, trashing, etc.)
 * 3. Detects synergies between card combinations
 * 4. Identifies viable macro-strategies (engine, big money, rush, etc.)
 * 5. Generates strategic warnings about missing components
 *
 * @param cardNames - Array of card name strings detected from the game UI
 * @returns Complete analysis result with components, synergies, archetypes, and notes
 */
export function analyzeKingdom(cardNames: string[]): AnalysisResult {
  const CARD_MAP = buildCardMap(cardData as Card[]);
  const getCard = (name: string) => CARD_MAP.get(name);

  // Separate known cards (in database) from unknown (not in database)
  const known: Card[] = [];
  const unknown: string[] = [];
  for (const name of cardNames) {
    const card = getCard(name);
    if (card) {
      known.push(card);
    } else {
      unknown.push(name);
    }
  }

  const { components, tags } = classifyComponents(known);
  const synergies = detectSynergies(known, tags);
  const archetypes = detectArchetypes(known, tags);
  const notes = generateNotes(tags, getCard);

  return {
    kingdom: cardNames,
    unknown,
    components,
    synergies,
    archetypes,
    notes,
  };
}
