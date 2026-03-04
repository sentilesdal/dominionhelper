// Dominion Helper — Game Log Parser
//
// Parses text lines from the dominion.games game log into structured
// LogEntry objects. The game log uses abbreviated player names and a
// consistent grammar for card actions (plays, buys, draws, etc.).
//
// Key exports: parseLogLine, parseTurnMarker, parseCardList, isGameStart
//
// @module log-parser

import type { LogAction, LogEntry } from "../types";

// Card names that are already plural and should NOT be singularized.
// These are cards whose names end in 's' naturally (Gardens, not Garden).
const PLURAL_EXCEPTIONS = new Set([
  "Gardens",
  "Nobles",
  "Delusions",
  "Lanterns",
  "Envy",
  "Misery",
  "Despair",
  "Poverty",
  "Greed",
  "Locusts",
  "Skulls",
  "Wars",
  "Famine",
  "Plague",
  "Bandit Camp",
  "Cursed Gold",
  "Goat",
  "Pasture",
  "Pouch",
  "Cursed Village",
  "Lost City",
  "Magic Lamp",
  "Haunted Mirror",
  "Lucky Coin",
  "Ghost Town",
]);

// Maps regex patterns to LogAction types. Patterns are tried in order
// against each log line. The first capturing group is always the player
// abbreviation; the second (if present) is the card list text.
const ACTION_PATTERNS: [RegExp, LogAction][] = [
  // "buys and gains" must come before "gains" to avoid partial match
  [/^(\w+) buys and gains (.+)\.$/, "buys"],
  [/^(\w+) plays (.+)\.$/, "plays"],
  [/^(\w+) gains (.+)\.$/, "gains"],
  [/^(\w+) trashes (.+)\.$/, "trashes"],
  [/^(\w+) draws (.+)\.$/, "draws"],
  [/^(\w+) discards (.+)\.$/, "discards"],
  [/^(\w+) puts (.+) on their deck\.$/, "topdecks"],
  [/^(\w+) starts with (.+)\.$/, "starts-with"],
  [/^(\w+) shuffles their deck\.$/, "shuffles"],
  [/^(\w+) reveals (.+)\.$/, "reveals"],
  [/^(\w+) sets aside (.+)\.$/, "sets-aside"],
  [/^(\w+) returns (.+)\.$/, "returns"],
  [/^(\w+) passes (.+)\.$/, "passes"],
];

// Regex for turn marker lines: "Turn 1 - muddybrown"
const TURN_MARKER_RE = /^Turn (\d+) - (.+)$/;

// Regex for "starts with" lines, used to detect new game starts
const STARTS_WITH_RE = /^(\w+) starts with /;

// Converts a potentially plural card name to its singular form.
// Dominion's log uses plural names (e.g., "3 Coppers") but the card
// database uses singular names (e.g., "Copper").
//
// Handles common English pluralization rules:
// - "ies" -> "y" (e.g., "Duchies" -> "Duchy")
// - "es" -> "" for names ending in "sh/ch/x/s" (e.g., "Wishes" -> "Wish")
// - "s" -> "" (e.g., "Coppers" -> "Copper")
//
// @param name - Potentially plural card name
// @returns Singular form of the card name
export function singularize(name: string): string {
  if (PLURAL_EXCEPTIONS.has(name)) return name;

  // "Duchies" -> "Duchy"
  if (name.endsWith("ies")) {
    return name.slice(0, -3) + "y";
  }

  // "Wishes" -> "Wish", "Witches" -> "Witch"
  if (name.endsWith("shes") || name.endsWith("ches") || name.endsWith("xes")) {
    return name.slice(0, -2);
  }

  // Generic plural: "Coppers" -> "Copper", "Silvers" -> "Silver"
  if (name.endsWith("s") && !name.endsWith("ss")) {
    return name.slice(0, -1);
  }

  return name;
}

// Parses a card list string from the game log into parallel arrays of
// card names and counts. The log uses natural language formatting:
//   "3 Coppers and 2 Estates" -> { cards: ["Copper", "Estate"], counts: [3, 2] }
//   "a Gold" -> { cards: ["Gold"], counts: [1] }
//   "an Estate" -> { cards: ["Estate"], counts: [1] }
//
// Card names are singularized to match the database format.
//
// @param text - Card list text from a log line (e.g., "3 Coppers and 2 Estates")
// @returns Object with parallel cards[] and counts[] arrays
export function parseCardList(text: string): {
  cards: string[];
  counts: number[];
} {
  const cards: string[] = [];
  const counts: number[] = [];

  // Split on ", " and " and " to get individual card entries
  // e.g., "3 Coppers, 2 Silvers and a Gold" -> ["3 Coppers", "2 Silvers", "a Gold"]
  const parts = text
    .split(/,\s+|\s+and\s+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  for (const part of parts) {
    // Try to match "N CardName" (e.g., "3 Coppers")
    const numMatch = part.match(/^(\d+)\s+(.+)$/);
    if (numMatch) {
      counts.push(parseInt(numMatch[1], 10));
      cards.push(singularize(numMatch[2].trim()));
      continue;
    }

    // Match "a CardName" or "an CardName" (count = 1)
    const articleMatch = part.match(/^an?\s+(.+)$/);
    if (articleMatch) {
      counts.push(1);
      cards.push(singularize(articleMatch[1].trim()));
      continue;
    }

    // Bare card name (no count prefix) — assume count of 1
    counts.push(1);
    cards.push(singularize(part.trim()));
  }

  return { cards, counts };
}

// Parses a single game log line into a structured LogEntry.
// Returns null for lines that don't match any known action pattern
// (e.g., decorative lines, chat messages, or unknown formats).
//
// @param text - A single line of text from the game log
// @returns Parsed LogEntry or null if the line doesn't match a known pattern
export function parseLogLine(text: string): LogEntry | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  for (const [pattern, action] of ACTION_PATTERNS) {
    const match = trimmed.match(pattern);
    if (!match) continue;

    const playerAbbrev = match[1];

    // Shuffle has no card list
    if (action === "shuffles") {
      return {
        playerAbbrev,
        action,
        cards: [],
        counts: [],
        rawText: trimmed,
      };
    }

    // Parse the card list from the second capture group
    const cardListText = match[2];
    const { cards, counts } = parseCardList(cardListText);

    return {
      playerAbbrev,
      action,
      cards,
      counts,
      rawText: trimmed,
    };
  }

  return null;
}

// Parses a turn marker line to extract the turn number and full player name.
// Turn markers look like "Turn 1 - muddybrown" and serve two purposes:
// 1. They establish the mapping between abbreviated names and full names
// 2. They signal the start of a new turn (triggering cleanup phase)
//
// @param text - A single line of text from the game log
// @returns Object with turn number and full player name, or null if not a turn marker
export function parseTurnMarker(
  text: string,
): { turn: number; fullName: string } | null {
  const match = text.trim().match(TURN_MARKER_RE);
  if (!match) return null;

  return {
    turn: parseInt(match[1], 10),
    fullName: match[2],
  };
}

// Checks whether a log line indicates the start of a new game.
// "starts with" lines appear at the beginning of each game when players
// receive their initial decks (e.g., "m starts with 7 Coppers.").
//
// @param text - A single line of text from the game log
// @returns True if this line is a "starts with" entry
export function isGameStart(text: string): boolean {
  return STARTS_WITH_RE.test(text.trim());
}
