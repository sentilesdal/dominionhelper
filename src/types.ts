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

export interface CardCost {
  coins: number;
  potions?: number;
  debt?: number;
}

export interface CardEffects {
  actions?: number;
  cards?: number;
  coins?: number;
  buys?: number;
  vp?: number;
}

export interface Card {
  name: string;
  set: string;
  types: CardType[];
  cost: CardCost;
  text: string;
  effects: CardEffects;
  tags: CardTag[];
  isTerminal: boolean;
  isCantrip: boolean;
}

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

export interface AnalysisResult {
  kingdom: string[];
  unknown: string[];
  components: string[];
  synergies: string[];
  archetypes: string[];
  notes: string[];
}
