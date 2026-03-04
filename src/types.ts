/**
 * Dominion Helper — Shared Type Definitions
 *
 * Central type definitions used across the analysis engine, content scripts,
 * and tests. All card data, classification results, and analysis outputs
 * are typed here to ensure consistency across the codebase.
 */

/**
 * Functional tags assigned to cards in the database. The analysis engine
 * uses these to detect synergies, classify components, and identify
 * viable strategies. A card may have multiple tags.
 */
export type CardTag =
  | "village"
  | "terminal-draw"
  | "non-terminal-draw"
  | "trasher"
  | "strong-trasher"
  | "gainer"
  | "plus-buy"
  | "curser"
  | "handsize-attack"
  | "junker"
  | "reaction"
  | "alt-vp"
  | "economy"
  | "sifter"
  | "draw-to-x"
  | "villagers"
  | "trash-for-benefit"
  | "throne-variant"
  | "payload"
  | "cost-reducer"
  | "cantrip";

/**
 * Dominion card types as they appear on the card itself.
 * A card may have multiple types (e.g., "Action" + "Attack").
 */
export type CardType =
  | "Action"
  | "Treasure"
  | "Victory"
  | "Curse"
  | "Attack"
  | "Reaction"
  | "Duration"
  | "Night"
  | "Doom"
  | "Fate"
  | "Spirit"
  | "Zombie"
  | "Heirloom"
  | "Command"
  | "Reserve"
  | "Traveller"
  | "Castle"
  | "Gathering"
  | "Knight"
  | "Looter"
  | "Ruins"
  | "Shelter"
  | "Prize"
  | "Event"
  | "Landmark"
  | "Project"
  | "Way"
  | "Ally"
  | "Trait"
  | "Liaison"
  | "Augur"
  | "Clash"
  | "Fort"
  | "Odyssey"
  | "Townsfolk"
  | "Wizard"
  | "Loot"
  | "Shadow"
  | "Omen"
  | "Prophecy";

/** Cost to buy a card. Most cards cost only coins, but some use potions or debt. */
export interface CardCost {
  coins: number;
  /** Number of Potion cards required (Alchemy set). */
  potions?: number;
  /** Debt tokens taken on purchase (Empires set). */
  debt?: number;
}

/** Immediate effects printed on a card (e.g., "+2 Cards, +1 Action"). */
export interface CardEffects {
  actions?: number;
  cards?: number;
  coins?: number;
  buys?: number;
  vp?: number;
}

/**
 * A single Dominion card as stored in the card database (`src/data/cards.json`).
 * This is the source-of-truth shape that the analysis engine operates on.
 */
export interface Card {
  name: string;
  set: string;
  types: CardType[];
  cost: CardCost;
  text: string;
  effects: CardEffects;
  /** Functional tags used by the analysis engine for synergy/archetype detection. */
  tags: CardTag[];
  /** True if playing this card uses an action and does not grant +Action. */
  isTerminal: boolean;
  /** True if the card grants at least +1 Card and +1 Action (replaces itself). */
  isCantrip: boolean;
}

/**
 * Cards in the kingdom grouped by functional role. Produced by
 * `classifyComponents` in the engine and consumed by synergy/archetype
 * detectors. Each array contains card names (not Card objects).
 */
export interface TagClassification {
  villages: string[];
  draw: string[];
  trashers: string[];
  gainers: string[];
  plusBuy: string[];
  attacks: string[];
  reactions: string[];
  altVp: string[];
  economy: string[];
  sifters: string[];
  villagers: string[];
}

/**
 * Complete output of `analyzeKingdom`. Contains everything needed to
 * render the overlay panel: detected cards, unknowns, classified
 * components, synergies, viable strategies, and strategic warnings.
 */
export interface AnalysisResult {
  /** The original card names passed to analyzeKingdom. */
  kingdom: string[];
  /** Card names not found in the database. */
  unknown: string[];
  /** Human-readable component summaries (e.g., "Villages: Village, Festival"). */
  components: string[];
  /** Detected synergy descriptions (e.g., "Engine core: Village + Smithy"). */
  synergies: string[];
  /** Viable macro-strategy descriptions (e.g., "Engine (with trashing)"). */
  archetypes: string[];
  /** Strategic warnings (e.g., "No village — limited to one terminal"). */
  notes: string[];
}
