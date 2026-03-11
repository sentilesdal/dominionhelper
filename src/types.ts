// Dominion Helper — Shared Type Definitions
//
// Central type definitions used across the analysis engine, content scripts,
// and tests. All card data, classification results, and analysis outputs
// are typed here to ensure consistency across the codebase.

// Functional tags assigned to cards in the database. The analysis engine
// uses these to detect synergies, classify components, and identify
// viable strategies. A card may have multiple tags.
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

// Dominion card types as they appear on the card itself.
// A card may have multiple types (e.g., "Action" + "Attack").
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

// Cost to buy a card. Most cards cost only coins, but some use potions or debt.
export interface CardCost {
  coins: number;
  // Number of Potion cards required (Alchemy set).
  potions?: number;
  // Debt tokens taken on purchase (Empires set).
  debt?: number;
}

// Immediate effects printed on a card (e.g., "+2 Cards, +1 Action").
export interface CardEffects {
  actions?: number;
  cards?: number;
  coins?: number;
  buys?: number;
  vp?: number;
}

// A single Dominion card as stored in the card database (`src/data/cards.json`).
// This is the source-of-truth shape that the analysis engine operates on.
export interface Card {
  name: string;
  set: string;
  types: CardType[];
  cost: CardCost;
  text: string;
  effects: CardEffects;
  // Functional tags used by the analysis engine for synergy/archetype detection.
  tags: CardTag[];
  // True if playing this card uses an action and does not grant +Action.
  isTerminal: boolean;
  // True if the card grants at least +1 Card and +1 Action (replaces itself).
  isCantrip: boolean;
}

// Cards in the kingdom grouped by functional role. Produced by
// `classifyComponents` in the engine and consumed by synergy/archetype
// detectors. Each array contains card names (not Card objects).
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

// A single opening buy recommendation for a given cost point.
// Produced by `analyzeOpenings` and displayed in the overlay panel.
export interface OpeningRecommendation {
  // The card being recommended (e.g., "Chapel", "Laboratory").
  cardName: string;
  // Coin cost of the card.
  cost: number;
  // Brief explanation of why this card is a good opening buy.
  reasoning: string;
}

// Opening buy recommendations for both starting splits.
// In Dominion, players draw 5 of their 10 starting cards (7 Coppers + 3 Estates)
// on each of their first two turns, producing either $5/$2 (17%) or $4/$3 (83%).
export interface OpeningAnalysis {
  // Best cards to buy with a 5/2 starting split (first hand $5, second $2).
  fiveTwo: OpeningRecommendation[];
  // Best cards to buy with a 4/3 starting split (first hand $4, second $3).
  fourThree: OpeningRecommendation[];
}

// Complete output of `analyzeKingdom`. Contains everything needed to
// render the overlay panel: detected cards, unknowns, classified
// components, synergies, viable strategies, and strategic warnings.
export interface AnalysisResult {
  // The original card names passed to analyzeKingdom.
  kingdom: string[];
  // Card names not found in the database.
  unknown: string[];
  // Human-readable component summaries (e.g., "Villages: Village, Festival").
  components: string[];
  // Detected synergy descriptions (e.g., "Engine core: Village + Smithy").
  synergies: string[];
  // Viable macro-strategy descriptions (e.g., "Engine (with trashing)").
  archetypes: string[];
  // Strategic warnings (e.g., "No village — limited to one terminal").
  notes: string[];
  // Recommended opening buys for each starting split (5/2 and 4/3).
  openings: OpeningAnalysis;
}

// ─── Angular Bridge Types ─────────────────────────────────────────────
//
// Types for snapshots dispatched by the MAIN-world bridge script that
// reads Angular game state. These provide ground-truth zone counts and
// visible card lists that the content script uses to correct log-based tracking.

// Snapshot of a single zone from Angular game state.
// Visible zones (hand, play, trash) include card names; hidden zones
// (draw, discard) provide only a count.
export interface ZoneSnapshot {
  zoneName: string;
  cards: string[];
  count: number;
}

// Snapshot of a single player from Angular game state.
// The isMe flag identifies the local player; initials match the log abbreviation.
export interface PlayerSnapshot {
  name: string;
  initials: string;
  isMe: boolean;
  zones: ZoneSnapshot[];
}

// Complete game state snapshot dispatched by the bridge as a CustomEvent.
// Produced every 500ms when Angular state changes.
export interface GameStateSnapshot {
  players: PlayerSnapshot[];
  turnNumber: number;
}

// ─── Deck Tracker Types ────────────────────────────────────────────────
//
// Types for the real-time deck tracker that parses game log entries,
// tracks card zones per player, and calculates draw probabilities.

// Actions that can appear in the game log. Each maps to a specific
// card movement pattern (e.g., "plays" moves cards from hand to play area).
export type LogAction =
  | "plays"
  | "buys"
  | "gains"
  | "trashes"
  | "draws"
  | "discards"
  | "shuffles"
  | "topdecks"
  | "starts-with"
  | "reveals"
  | "sets-aside"
  | "returns"
  | "passes";

// A parsed game log line containing the acting player, the action taken,
// and the cards involved. Produced by `parseLogLine` in the log parser.
export interface LogEntry {
  // Abbreviated player name as it appears in the log (e.g., "m" for "muddybrown")
  playerAbbrev: string;
  // The action verb parsed from the log line
  action: LogAction;
  // Card names involved in the action (already singularized)
  cards: string[];
  // Counts corresponding to each card name (e.g., [3, 2] for "3 Coppers and 2 Estates")
  counts: number[];
  // The original unparsed log line text
  rawText: string;
}

// Zones where cards can reside during a Dominion game.
// Cards move between zones based on game actions (play, buy, draw, etc.).
export type CardZone = "deck" | "discard" | "hand" | "play" | "trash";

// Card counts per zone for a single player. Each zone maps card names
// to the number of copies in that zone. This is the core state tracked
// by the deck tracker — updated on every parsed log entry.
export type PlayerZones = Record<CardZone, Map<string, number>>;

// Complete game state tracked by the deck tracker. Contains zone state
// for all players, name mappings, and turn tracking.
export interface GameState {
  // Card zones per player, keyed by abbreviated name
  players: Map<string, PlayerZones>;
  // Maps abbreviated names (e.g., "m") to full names (e.g., "muddybrown")
  playerNames: Map<string, string>;
  // Current turn number (0 = before game starts)
  currentTurn: number;
  // Abbreviated name of the player whose turn it currently is
  activePlayer: string;
  // Abbreviated name of the local player (the one at the bottom of the screen)
  localPlayer: string;
}

// Breakdown of a player's deck by card type category.
// Used to show the deck composition section of the tracker UI.
export interface DeckComposition {
  actions: number;
  treasures: number;
  victories: number;
  curses: number;
  total: number;
}

// Draw probability calculations for the next hand draw.
// Based on cards currently in the deck (and discard if deck < 5 cards).
export interface DrawProbabilities {
  // Probability of drawing a hand worth $5 or more
  fivePlusCoinProb: number;
  // Probability of drawing a hand worth $8 or more (Province money)
  eightPlusCoinProb: number;
  // Per-card probability of drawing at least one copy in a 5-card hand
  cardDrawProb: Map<string, number>;
  // Number of cards currently in the draw pile
  cardsInDeck: number;
  // Number of cards currently in the discard pile
  cardsInDiscard: number;
}

// Combined statistics for a player, displayed in the tracker panel.
// Produced by `calculateStats` in the stats module.
export interface TrackerStats {
  composition: DeckComposition;
  probabilities: DrawProbabilities;
  // All cards the player owns (across all non-trash zones), name → total count
  allCards: Map<string, number>;
}

// ─── Side Panel Message Types ───────────────────────────────────────
//
// Serializable data structures sent from the content script to the
// service worker and then forwarded to the side panel. Maps and other
// non-serializable types are converted to plain objects/arrays before
// message passing.

// Serializable version of DrawProbabilities for message passing.
// Replaces Map<string, number> with a plain object.
export interface SerializedDrawProbabilities {
  fivePlusCoinProb: number;
  eightPlusCoinProb: number;
  // Per-card draw probability as a plain object (card name → probability)
  cardDrawProb: Record<string, number>;
  cardsInDeck: number;
  cardsInDiscard: number;
}

// Serializable version of TrackerStats for message passing.
// Replaces Maps with plain objects so data survives chrome.runtime.sendMessage.
export interface SerializedTrackerStats {
  composition: DeckComposition;
  probabilities: SerializedDrawProbabilities;
  // All owned cards as a plain object (card name → count)
  allCards: Record<string, number>;
}

// Player info for the tracker panel, sent as part of TrackerData.
export interface TrackerPlayer {
  abbrev: string;
  fullName: string;
}

// Complete tracker data sent from the content script to the side panel
// via the service worker. Contains everything needed to render the
// deck tracker tab without access to the content script's GameState.
export interface TrackerData {
  // List of players in the game with their abbreviations and full names
  players: TrackerPlayer[];
  // Abbreviation of the local player (the one at the bottom of the screen)
  localPlayer: string;
  // Currently selected player abbreviation
  selectedPlayer: string;
  // Calculated stats for the selected player
  stats: SerializedTrackerStats;
  // Number of cards in the selected player's hand
  handCount: number;
  // Number of cards in the selected player's play area
  playCount: number;
  // Per-card counts in each zone (card name -> count)
  deckCards: Record<string, number>;
  discardCards: Record<string, number>;
  handCards: Record<string, number>;
  playCards: Record<string, number>;
  // Village vs terminal action counts across the player's full deck
  villageCount: number;
  terminalCount: number;
}
