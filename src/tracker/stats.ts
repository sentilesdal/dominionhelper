// Dominion Helper — Deck Statistics Calculator
//
// Calculates deck composition breakdowns and draw probabilities based
// on the current zone state. Composition classifies owned cards by type
// (Action, Treasure, Victory, Curse). Probabilities estimate the chance
// of drawing specific cards or hitting coin thresholds in a 5-card hand.
//
// Key exports: calculateStats, calculateComposition, calculateProbabilities
//
// @module stats

import type {
  Card,
  DeckComposition,
  DrawProbabilities,
  PlayerZones,
  TrackerStats,
} from "../types";
import { getAllOwnedCards } from "./deck-state";

// Number of Monte Carlo iterations for simulating hand values.
// 1000 gives ~3% error margin at 95% confidence — fast enough to run
// on every log update without noticeable lag.
const SIMULATION_ITERATIONS = 1000;

// Standard hand size in Dominion (5 cards drawn at start of turn)
const HAND_SIZE = 5;

// Calculates the probability of drawing at least one copy of a specific
// card in a hand of `handSize` cards from a deck of `deckSize` cards,
// where `copies` of the target card exist in the deck.
//
// Uses the hypergeometric distribution complement:
// P(at least 1) = 1 - P(0) = 1 - C(deckSize-copies, handSize) / C(deckSize, handSize)
//
// Simplifies to: 1 - product of (deckSize-copies-i)/(deckSize-i) for i in 0..handSize-1
//
// @param copies - Number of copies of the target card in the deck
// @param deckSize - Total cards in the deck
// @param handSize - Number of cards drawn (default: 5)
// @returns Probability between 0 and 1
export function hypergeometricAtLeastOne(
  copies: number,
  deckSize: number,
  handSize: number = HAND_SIZE,
): number {
  if (copies <= 0 || deckSize <= 0) return 0;
  if (copies >= deckSize) return 1;
  if (handSize >= deckSize) return 1;

  // P(drawing 0 copies) = C(deckSize-copies, handSize) / C(deckSize, handSize)
  // Computed iteratively to avoid large factorials
  let pZero = 1;
  for (let i = 0; i < handSize; i++) {
    pZero *= (deckSize - copies - i) / (deckSize - i);
    // If numerator goes negative, all remaining cards are the target
    if (pZero <= 0) return 1;
  }

  return 1 - pZero;
}

// Gets the coin value of a card for hand value calculations.
// Only Treasure-type cards contribute coins to a hand's buying power.
// Cards not in the database are assumed to contribute $0.
//
// @param cardName - Name of the card
// @param cardDb - Card database lookup map
// @returns Coin value (0 for non-treasures or unknown cards)
function getCardCoinValue(cardName: string, cardDb: Map<string, Card>): number {
  const card = cardDb.get(cardName);
  if (!card) return 0;
  // Only Treasures contribute to hand value in the basic simulation
  if (!card.types.includes("Treasure")) return 0;
  return card.effects.coins || 0;
}

// Builds a flat array of card names from a zone's card-count map.
// Used to create a "deck" array that can be shuffled for Monte Carlo.
// e.g., { "Copper": 3, "Silver": 2 } -> ["Copper", "Copper", "Copper", "Silver", "Silver"]
//
// @param zone - Map of card name to count
// @returns Flat array with each card repeated by its count
function flattenZone(zone: Map<string, number>): string[] {
  const result: string[] = [];
  for (const [card, count] of zone) {
    for (let i = 0; i < count; i++) {
      result.push(card);
    }
  }
  return result;
}

// Fisher-Yates shuffle for an array. Mutates in place.
//
// @param arr - Array to shuffle
function shuffle<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Estimates the probability of drawing a hand worth at least `targetCoins`
// using Monte Carlo simulation. Simulates drawing 5 cards from the
// available draw pool (deck + discard if deck < 5), sums Treasure coin
// values, and checks if it meets the target.
//
// When deck has fewer than `handSize` cards, the simulation draws all
// remaining deck cards, then shuffles the discard and draws the rest
// (matching Dominion's actual reshuffle mechanic).
//
// @param deckCards - Cards in the draw pile
// @param discardCards - Cards in the discard pile
// @param targetCoins - Minimum coin value to count as success
// @param cardDb - Card database for looking up coin values
// @param iterations - Number of simulation runs (default: 1000)
// @returns Probability between 0 and 1
export function simulateHandValue(
  deckCards: string[],
  discardCards: string[],
  targetCoins: number,
  cardDb: Map<string, Card>,
  iterations: number = SIMULATION_ITERATIONS,
): number {
  const totalAvailable = deckCards.length + discardCards.length;
  if (totalAvailable === 0) return 0;

  const handSize = Math.min(HAND_SIZE, totalAvailable);
  let successes = 0;

  for (let iter = 0; iter < iterations; iter++) {
    const hand: string[] = [];

    if (deckCards.length >= handSize) {
      // Enough cards in deck — just draw from it
      const deckCopy = [...deckCards];
      shuffle(deckCopy);
      for (let i = 0; i < handSize; i++) {
        hand.push(deckCopy[i]);
      }
    } else {
      // Draw all remaining deck cards, then shuffle discard for the rest
      hand.push(...deckCards);
      const discardCopy = [...discardCards];
      shuffle(discardCopy);
      const remaining = handSize - hand.length;
      for (let i = 0; i < remaining && i < discardCopy.length; i++) {
        hand.push(discardCopy[i]);
      }
    }

    // Sum coin values of Treasures in hand
    let coins = 0;
    for (const card of hand) {
      coins += getCardCoinValue(card, cardDb);
    }

    if (coins >= targetCoins) successes++;
  }

  return successes / iterations;
}

// Calculates the deck composition breakdown for a player's owned cards.
// Classifies each card as Action, Treasure, Victory, or Curse based on
// its types in the card database. Cards can be counted in multiple
// categories (e.g., Action-Victory cards count as both).
//
// @param zones - The player's zone state
// @param cardDb - Card database lookup map
// @returns DeckComposition with counts by type
export function calculateComposition(
  zones: PlayerZones,
  cardDb: Map<string, Card>,
): DeckComposition {
  const owned = getAllOwnedCards(zones);
  let actions = 0;
  let treasures = 0;
  let victories = 0;
  let curses = 0;
  let total = 0;

  for (const [cardName, count] of owned) {
    total += count;
    const card = cardDb.get(cardName);
    if (!card) continue;

    if (card.types.includes("Action")) actions += count;
    if (card.types.includes("Treasure")) treasures += count;
    if (card.types.includes("Victory")) victories += count;
    if (card.types.includes("Curse")) curses += count;
  }

  return { actions, treasures, victories, curses, total };
}

// Calculates draw probabilities for the next hand. Computes the chance
// of drawing at least one copy of each card in the deck, plus the
// probability of hitting $5 and $8 thresholds (common strategic targets).
//
// When the deck has fewer than 5 cards, the probability calculations
// account for the reshuffle by treating deck + discard as the draw pool.
//
// @param zones - The player's zone state
// @param cardDb - Card database lookup map
// @returns DrawProbabilities with per-card and threshold probabilities
export function calculateProbabilities(
  zones: PlayerZones,
  cardDb: Map<string, Card>,
): DrawProbabilities {
  const deckCards = flattenZone(zones.deck);
  const discardCards = flattenZone(zones.discard);
  const deckSize = deckCards.length;
  const discardSize = discardCards.length;

  // Per-card draw probabilities
  const cardDrawProb = new Map<string, number>();

  // When deck < 5, a reshuffle will happen. Combine deck + discard
  // for probability calculations since the draw will span both.
  const drawPool =
    deckSize >= HAND_SIZE ? zones.deck : mergeMaps(zones.deck, zones.discard);
  const poolSize = deckSize >= HAND_SIZE ? deckSize : deckSize + discardSize;

  for (const [card, count] of drawPool) {
    const prob = hypergeometricAtLeastOne(count, poolSize);
    cardDrawProb.set(card, prob);
  }

  // Simulate $5+ and $8+ hand probabilities via Monte Carlo
  const fivePlusCoinProb = simulateHandValue(
    deckCards,
    discardCards,
    5,
    cardDb,
  );
  const eightPlusCoinProb = simulateHandValue(
    deckCards,
    discardCards,
    8,
    cardDb,
  );

  return {
    fivePlusCoinProb,
    eightPlusCoinProb,
    cardDrawProb,
    cardsInDeck: deckSize,
    cardsInDiscard: discardSize,
  };
}

// Merges two card-count maps into a single combined map.
//
// @param a - First map
// @param b - Second map
// @returns New map with combined counts
function mergeMaps(
  a: Map<string, number>,
  b: Map<string, number>,
): Map<string, number> {
  const result = new Map(a);
  for (const [card, count] of b) {
    result.set(card, (result.get(card) || 0) + count);
  }
  return result;
}

// Calculates all deck statistics for a player: composition, probabilities,
// and owned card totals. This is the main entry point called by the UI
// whenever the game state changes.
//
// @param zones - The player's zone state
// @param cardDb - Card database lookup map
// @returns Complete TrackerStats for display
export function calculateStats(
  zones: PlayerZones,
  cardDb: Map<string, Card>,
): TrackerStats {
  return {
    composition: calculateComposition(zones, cardDb),
    probabilities: calculateProbabilities(zones, cardDb),
    allCards: getAllOwnedCards(zones),
  };
}
