// Dominion Helper — Opening Analysis
//
// Recommends opening buys based on the 5/2 and 4/3 starting splits.
// In Dominion, players start with 7 Coppers and 3 Estates, drawing 5 cards.
// The first two hands produce either $5/$2 (17%) or $4/$3 (83%), and
// choosing the right opening buys is one of the most impactful decisions.
//
// The analysis scores cards by strategic priority using their tags,
// then returns ranked recommendations for each cost point within
// each split. Trashers are almost always top priority, followed by
// non-terminal draw, villages, economy, and situational picks.
//
// @module openings

import type { Card, OpeningAnalysis, OpeningRecommendation } from "../types";

// Priority tiers for opening buy scoring. Higher values = stronger opening picks.
// These reflect the general consensus in competitive Dominion:
// trashing early is critical for deck thinning, non-terminal draw is safe
// and strong, villages enable future engine-building, and so on.
const TAG_PRIORITY: Record<string, number> = {
  "strong-trasher": 100, // e.g., Chapel — best possible $2 open
  trasher: 80, // any trasher is high priority in the opening
  "non-terminal-draw": 70, // safe draw that doesn't risk collision
  village: 50, // villages set up future engine turns
  economy: 40, // Silver-equivalent or better economy cards
  sifter: 35, // filtering helps find your good cards
  "terminal-draw": 30, // good but risks terminal collision
  gainer: 25, // situationally strong for rush strategies
  reaction: 20, // useful if attacks are present
  "plus-buy": 15, // +Buy is rarely critical in the opening
  cantrip: 15, // cantrips are fine but not exciting openers
  "alt-vp": 5, // victory cards are usually bad early
};

// Maximum number of recommendations to show per cost point.
// Keeps the overlay concise — players only need to see the top picks.
const MAX_RECOMMENDATIONS_PER_COST = 3;

// Calculates a priority score for a card as an opening buy.
//
// Sums up the priority values for each of the card's tags, giving
// higher scores to cards with multiple desirable properties (e.g.,
// a card that is both a trasher and a cantrip scores higher than
// a pure trasher).
//
// @param card - The card to score
// @returns Numeric priority score (higher = better opening buy)
function scoreCard(card: Card): number {
  let score = 0;
  for (const tag of card.tags) {
    if (tag in TAG_PRIORITY) {
      score += TAG_PRIORITY[tag];
    }
  }
  return score;
}

// Generates a concise reasoning string explaining why a card is
// a good opening buy, based on its tags. Lists the relevant
// strategic roles the card fills.
//
// @param card - The card to generate reasoning for
// @returns Human-readable reasoning string
function generateReasoning(card: Card): string {
  const reasons: string[] = [];

  if (card.tags.includes("strong-trasher")) {
    reasons.push("elite trasher — thin your deck fast");
  } else if (card.tags.includes("trasher")) {
    reasons.push("trasher — remove starting junk");
  }

  if (card.tags.includes("non-terminal-draw")) {
    reasons.push("non-terminal draw — safe and strong");
  } else if (card.tags.includes("terminal-draw")) {
    reasons.push("terminal draw — good but watch for collisions");
  }

  if (card.tags.includes("village")) {
    reasons.push("village — enables action chaining");
  }

  if (card.tags.includes("economy")) {
    reasons.push("economy — boosts buying power");
  }

  if (card.tags.includes("sifter")) {
    reasons.push("sifter — filters for good cards");
  }

  if (card.tags.includes("gainer")) {
    reasons.push("gainer — accelerates deck building");
  }

  if (card.tags.includes("reaction")) {
    reasons.push("reaction — defends against attacks");
  }

  // Fallback for cards with no recognized strategic tags
  if (reasons.length === 0) {
    return "solid card at this price point";
  }

  return reasons.join("; ");
}

// Filters and ranks kingdom cards at a specific cost point, returning
// the top recommendations. Cards are scored by tag priority and sorted
// in descending order. Only Action and Treasure cards are considered
// (Victory cards are almost never good opening buys).
//
// @param cards - All cards in the kingdom
// @param cost - The coin cost to filter for
// @returns Array of top recommendations at this cost point
function getRecommendationsAtCost(
  cards: Card[],
  cost: number,
): OpeningRecommendation[] {
  // Filter to cards at the target cost that are reasonable opening buys.
  // Exclude pure Victory cards (buying green early is almost always wrong)
  // and cards requiring potions or debt (not available in the opening).
  const candidates = cards.filter((card) => {
    if (card.cost.coins !== cost) return false;
    if (card.cost.potions && card.cost.potions > 0) return false;
    if (card.cost.debt && card.cost.debt > 0) return false;
    // Skip pure Victory cards (no Action or Treasure type)
    const hasPlayableType = card.types.some(
      (t) => t === "Action" || t === "Treasure" || t === "Night",
    );
    if (!hasPlayableType) return false;
    return true;
  });

  // Score and sort by priority (highest first)
  const scored = candidates
    .map((card) => ({
      card,
      score: scoreCard(card),
    }))
    .sort((a, b) => b.score - a.score);

  // Take top recommendations and convert to the output format
  return scored.slice(0, MAX_RECOMMENDATIONS_PER_COST).map(({ card }) => ({
    cardName: card.name,
    cost: card.cost.coins,
    reasoning: generateReasoning(card),
  }));
}

// Analyzes the kingdom to recommend opening purchases for each starting split.
//
// For the 5/2 split (17% chance), finds the best $5 and $2 cards.
// For the 4/3 split (83% chance), finds the best $4 and $3 cards.
// Each cost point returns up to 3 ranked recommendations with reasoning.
//
// @param cards - Array of Card objects in the current kingdom
// @returns Opening recommendations for both splits
export function analyzeOpenings(cards: Card[]): OpeningAnalysis {
  // Get ranked recommendations at each relevant cost point
  const at2 = getRecommendationsAtCost(cards, 2);
  const at3 = getRecommendationsAtCost(cards, 3);
  const at4 = getRecommendationsAtCost(cards, 4);
  const at5 = getRecommendationsAtCost(cards, 5);

  // Combine recommendations for each split. The $5 cards come first
  // (they're usually the more impactful buy), followed by $2 options.
  // Similarly, $4 before $3 for the more common split.
  return {
    fiveTwo: [...at5, ...at2],
    fourThree: [...at4, ...at3],
  };
}
