// Dominion Helper — Player Abbreviation Utilities
//
// dominion.games exposes player identifiers from multiple surfaces. The game
// log uses short tokens, while the Angular bridge may report dotted initials
// such as "L.". Normalizing them in one place keeps tracker state from
// splitting a single player into multiple tabs.
//
// @module player-abbrev

// Normalizes a player abbreviation so the log parser, bridge snapshot, and
// tracker state all use the same key.
//
// @param abbrev - Raw player abbreviation or initials from dominion.games
// @returns Lowercased tracker key with punctuation stripped
export function normalizePlayerAbbrev(abbrev: string): string {
  const trimmed = abbrev.trim().toLowerCase();
  const normalized = trimmed.replace(/[^\w]/g, "");
  return normalized || trimmed;
}
