// Dominion Helper — Tracker Stats Serializer
//
// Converts TrackerStats (which contains Maps) into SerializedTrackerStats
// (which uses plain objects) for passing over chrome.runtime.sendMessage.
// Maps are not serializable by the structured clone algorithm used by
// Chrome message passing.
//
// @module serialize

import type { TrackerStats, SerializedTrackerStats } from "../types";

// Converts a Map<string, number> to a plain Record<string, number>.
//
// @param map - Map to convert
// @returns Plain object with the same key-value pairs
function mapToRecord(map: Map<string, number>): Record<string, number> {
  const record: Record<string, number> = {};
  for (const [key, value] of map) {
    record[key] = value;
  }
  return record;
}

// Converts TrackerStats with Maps into a fully serializable plain object.
// Called by the content script before sending tracker data to the
// service worker via chrome.runtime.sendMessage.
//
// @param stats - TrackerStats with Map-based fields
// @returns SerializedTrackerStats with plain object fields
export function serializeTrackerStats(
  stats: TrackerStats,
): SerializedTrackerStats {
  return {
    composition: stats.composition,
    probabilities: {
      fivePlusCoinProb: stats.probabilities.fivePlusCoinProb,
      eightPlusCoinProb: stats.probabilities.eightPlusCoinProb,
      cardDrawProb: mapToRecord(stats.probabilities.cardDrawProb),
      cardsInDeck: stats.probabilities.cardsInDeck,
      cardsInDiscard: stats.probabilities.cardsInDiscard,
    },
    allCards: mapToRecord(stats.allCards),
  };
}
