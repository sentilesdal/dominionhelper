// Dominion Helper — Deck State Manager
//
// Tracks card locations across zones (deck, hand, discard, play, trash)
// for each player throughout the game. Processes LogEntry objects from
// the log parser and moves cards between zones accordingly.
//
// Card movement rules:
// - plays:      hand → play
// - buys/gains: (new card) → discard
// - trashes:    (best-guess source) → trash
// - draws:      deck → hand
// - discards:   hand → discard
// - shuffles:   discard (all) → deck (all)
// - topdecks:   hand → deck
// - starts-with: (new card) → deck
//
// Key exports: createGameState, processLogEntry, processTurnChange,
//   applySnapshotMetadata, inferDrawPile, buildHybridZones
//
// @module deck-state

import type {
  Card,
  CardZone,
  GameState,
  GameStateSnapshot,
  LogEntry,
  PlayerSnapshot,
  PlayerZones,
} from "../types";
import { normalizePlayerAbbrev } from "./player-abbrev";

// Creates a fresh set of empty zones for a new player.
//
// @returns PlayerZones with empty Maps for each zone
export function createPlayerZones(): PlayerZones {
  return {
    deck: new Map<string, number>(),
    discard: new Map<string, number>(),
    hand: new Map<string, number>(),
    play: new Map<string, number>(),
    trash: new Map<string, number>(),
  };
}

// Creates a fresh game state for a new game.
//
// @returns Empty GameState ready to receive log entries
export function createGameState(): GameState {
  return {
    players: new Map<string, PlayerZones>(),
    playerNames: new Map<string, string>(),
    currentTurn: 0,
    activePlayer: "",
    localPlayer: "",
  };
}

// Resets the game state for a new game. Alias for createGameState
// but named to clarify intent when called mid-session.
//
// @returns Fresh empty GameState
export function resetGameState(): GameState {
  return createGameState();
}

// Adds cards to a zone. If the card already exists in the zone,
// its count is incremented; otherwise it's added with the given count.
//
// @param zone - The zone Map to add cards to
// @param cardName - Name of the card to add
// @param count - Number of copies to add
function addToZone(
  zone: Map<string, number>,
  cardName: string,
  count: number,
): void {
  zone.set(cardName, (zone.get(cardName) || 0) + count);
}

// Removes cards from a zone. Decrements the count and removes the entry
// entirely if it reaches zero or below. If the card isn't in the zone,
// this is a no-op (graceful handling of tracking inaccuracies).
//
// @param zone - The zone Map to remove cards from
// @param cardName - Name of the card to remove
// @param count - Number of copies to remove
function removeFromZone(
  zone: Map<string, number>,
  cardName: string,
  count: number,
): void {
  const current = zone.get(cardName) || 0;
  const remaining = current - count;
  if (remaining <= 0) {
    zone.delete(cardName);
  } else {
    zone.set(cardName, remaining);
  }
}

// Moves cards from one zone to another for a given player.
//
// @param zones - The player's zone state
// @param from - Source zone
// @param to - Destination zone
// @param cardName - Name of the card to move
// @param count - Number of copies to move
function moveCards(
  zones: PlayerZones,
  from: CardZone,
  to: CardZone,
  cardName: string,
  count: number,
): void {
  removeFromZone(zones[from], cardName, count);
  addToZone(zones[to], cardName, count);
}

// Gets or creates the PlayerZones for a given player abbreviation.
// Ensures a player entry exists before processing their log entries.
//
// @param state - Current game state
// @param abbrev - Player abbreviation from the log
// @returns The player's zone state
function ensurePlayer(state: GameState, abbrev: string): PlayerZones {
  let zones = state.players.get(abbrev);
  if (!zones) {
    zones = createPlayerZones();
    state.players.set(abbrev, zones);
  }
  return zones;
}

// Finds the best source zone when trashing a card. The game log doesn't
// specify where a trashed card comes from, so we check zones in priority
// order: hand (most common), play, deck, discard.
//
// @param zones - The player's zone state
// @param cardName - Card being trashed
// @returns The zone the card is most likely in
function findTrashSource(zones: PlayerZones, cardName: string): CardZone {
  if ((zones.hand.get(cardName) || 0) > 0) return "hand";
  if ((zones.play.get(cardName) || 0) > 0) return "play";
  if ((zones.deck.get(cardName) || 0) > 0) return "deck";
  if ((zones.discard.get(cardName) || 0) > 0) return "discard";
  // Default to hand — the card may not be tracked yet
  return "hand";
}

// Processes a single LogEntry and updates the game state accordingly.
// Moves cards between zones based on the action type. Mutates the
// state in place and returns it for convenience.
//
// @param state - Current game state (mutated in place)
// @param entry - Parsed log entry to process
// @returns The updated game state
export function processLogEntry(state: GameState, entry: LogEntry): GameState {
  const zones = ensurePlayer(state, entry.playerAbbrev);

  switch (entry.action) {
    case "plays":
      // Move each card from hand to play area
      for (let i = 0; i < entry.cards.length; i++) {
        moveCards(zones, "hand", "play", entry.cards[i], entry.counts[i]);
      }
      break;

    case "buys":
    case "gains":
      // New cards gained go to the discard pile
      for (let i = 0; i < entry.cards.length; i++) {
        addToZone(zones.discard, entry.cards[i], entry.counts[i]);
      }
      break;

    case "trashes":
      // Find the most likely source zone and move to trash
      for (let i = 0; i < entry.cards.length; i++) {
        const source = findTrashSource(zones, entry.cards[i]);
        moveCards(zones, source, "trash", entry.cards[i], entry.counts[i]);
      }
      break;

    case "draws":
      // Move cards from deck to hand
      for (let i = 0; i < entry.cards.length; i++) {
        moveCards(zones, "deck", "hand", entry.cards[i], entry.counts[i]);
      }
      break;

    case "discards":
      // Move cards from hand to discard
      for (let i = 0; i < entry.cards.length; i++) {
        moveCards(zones, "hand", "discard", entry.cards[i], entry.counts[i]);
      }
      break;

    case "shuffles":
      // Move all cards from discard to deck
      for (const [card, count] of zones.discard) {
        addToZone(zones.deck, card, count);
      }
      zones.discard.clear();
      break;

    case "topdecks":
      // Move cards from hand to top of deck
      for (let i = 0; i < entry.cards.length; i++) {
        moveCards(zones, "hand", "deck", entry.cards[i], entry.counts[i]);
      }
      break;

    case "starts-with":
      // Starting cards go into the deck before the first draw
      for (let i = 0; i < entry.cards.length; i++) {
        addToZone(zones.deck, entry.cards[i], entry.counts[i]);
      }
      break;

    // reveals, sets-aside, returns, passes: no zone movement tracked
    // (these are informational or handled by subsequent gain/discard lines)
    default:
      break;
  }

  return state;
}

// Processes a turn change event. Called when a "Turn N - PlayerName" line
// is parsed. Performs the cleanup phase for the previous active player:
// moves all non-Duration cards from the play area to the discard pile,
// since in Dominion the cleanup phase discards played cards (except Durations
// which stay in play for the next turn).
//
// Also updates the player name mapping and turn counter.
//
// @param state - Current game state (mutated in place)
// @param turn - The new turn number
// @param fullName - Full player name from the turn marker
// @param cardDb - Card database for looking up Duration type
// @returns The updated game state
export function processTurnChange(
  state: GameState,
  turn: number,
  fullName: string,
  cardDb: Map<string, Card>,
): GameState {
  // Derive the abbreviation from the full name. The game log uses the
  // first letter(s) that uniquely identify the player. For now, use
  // the first letter lowercased as the most common case.
  const abbrev = deriveAbbrev(fullName, state.playerNames);

  // Register the name mapping
  state.playerNames.set(abbrev, fullName);

  // Cleanup phase for the previous active player: move play area to discard,
  // except for Duration cards which stay in play across turns
  if (state.activePlayer) {
    const prevZones = state.players.get(state.activePlayer);
    if (prevZones) {
      const toDiscard: [string, number][] = [];
      for (const [card, count] of prevZones.play) {
        const cardInfo = cardDb.get(card);
        // Duration cards stay in play; everything else gets discarded
        if (cardInfo && cardInfo.types.includes("Duration")) continue;
        toDiscard.push([card, count]);
      }
      for (const [card, count] of toDiscard) {
        moveCards(prevZones, "play", "discard", card, count);
      }

      // Also move hand to discard (cleanup discards remaining hand)
      for (const [card, count] of prevZones.hand) {
        addToZone(prevZones.discard, card, count);
      }
      prevZones.hand.clear();
    }
  }

  state.currentTurn = turn;
  state.activePlayer = abbrev;

  // Ensure the player has zones initialized
  ensurePlayer(state, abbrev);

  return state;
}

// Derives the log abbreviation for a player name. The dominion.games log
// uses the shortest unique prefix that distinguishes players. With two
// players whose names start with different letters, it's just the first
// letter lowercased.
//
// @param fullName - Full player name
// @param existingNames - Already-known name mappings
// @returns The abbreviated name used in log lines
export function deriveAbbrev(
  fullName: string,
  existingNames: Map<string, string>,
): string {
  // Check if we already have a mapping for this full name
  for (const [abbrev, name] of existingNames) {
    if (name === fullName) return abbrev;
  }

  // The game uses the shortest unique prefix. Start with the first character.
  const lower = fullName.toLowerCase();
  for (let len = 1; len <= lower.length; len++) {
    const candidate = lower.slice(0, len);
    let conflict = false;
    for (const [existingAbbrev] of existingNames) {
      if (
        existingAbbrev.startsWith(candidate) ||
        candidate.startsWith(existingAbbrev)
      ) {
        conflict = true;
        break;
      }
    }
    if (!conflict) return candidate;
  }

  // Fallback: use the full lowercase name
  return lower;
}

// Computes the total owned cards across all non-trash zones for a player.
// Useful for the "All Cards" display section in the tracker UI.
//
// @param zones - The player's zone state
// @returns Map of card name to total count across deck, discard, hand, and play
export function getAllOwnedCards(zones: PlayerZones): Map<string, number> {
  const owned = new Map<string, number>();

  // Sum cards across all zones except trash (trashed cards are gone)
  const activeZones: CardZone[] = ["deck", "discard", "hand", "play"];
  for (const zoneName of activeZones) {
    for (const [card, count] of zones[zoneName]) {
      owned.set(card, (owned.get(card) || 0) + count);
    }
  }

  return owned;
}

// Computes the total tracked cards across every zone, including trash.
// This lets the hybrid builder replace log-based trash with Angular trash
// while preserving the total number of cards the tracker has seen.
//
// @param zones - The player's zone state
// @returns Map of card name to total count across all tracked zones
function getAllTrackedCards(zones: PlayerZones): Map<string, number> {
  const tracked = new Map<string, number>();

  const allZones: CardZone[] = ["deck", "discard", "hand", "play", "trash"];
  for (const zoneName of allZones) {
    for (const [card, count] of zones[zoneName]) {
      tracked.set(card, (tracked.get(card) || 0) + count);
    }
  }

  return tracked;
}

// Builds a count map for a visible Angular zone.
//
// @param player - Player snapshot from Angular
// @param zoneName - Angular zone name (for example "HandZone")
// @returns Count map for the zone's visible cards
function getAngularVisibleZone(
  player: PlayerSnapshot,
  zoneName: string,
): Map<string, number> {
  const cards = new Map<string, number>();
  const zone = player.zones.find(
    (candidate) => candidate.zoneName === zoneName,
  );
  if (!zone) return cards;

  for (const card of zone.cards) {
    addToZone(cards, card, 1);
  }

  return cards;
}

// Subtracts one card-count map from another, clamping at zero. Used to
// remove authoritative Angular-visible cards from the tracker-owned pool
// before rebuilding the hidden zones from log state.
//
// @param base - Starting card counts
// @param removal - Cards to subtract
// @returns A new Map containing the clamped difference
function subtractCardMaps(
  base: Map<string, number>,
  removal: Map<string, number>,
): Map<string, number> {
  const result = new Map<string, number>(base);

  for (const [card, count] of removal) {
    const current = result.get(card) || 0;
    const remaining = current - count;
    if (remaining <= 0) {
      result.delete(card);
    } else {
      result.set(card, remaining);
    }
  }

  return result;
}

// Places hidden cards back into deck/discard using the log's current hidden
// zones as hints. When the log and Angular disagree, we preserve as much of
// the log's deck/discard placement as possible and send any unhinted remainder
// to discard so we do not overstate draw odds.
//
// @param hiddenPool - Hidden owned cards after removing visible Angular zones
// @param logZones - Log-tracked player zones used as placement hints
// @returns Deck/discard maps rebuilt from log-first hidden state
function placeHiddenCardsFromLog(
  hiddenPool: Map<string, number>,
  logZones: PlayerZones,
): Pick<PlayerZones, "deck" | "discard"> {
  const deck = new Map<string, number>();
  const discard = new Map<string, number>();

  for (const [card, targetCount] of hiddenPool) {
    let remaining = targetCount;
    const deckHint = logZones.deck.get(card) || 0;
    const discardHint = logZones.discard.get(card) || 0;

    const hintedDeck = Math.min(remaining, deckHint);
    if (hintedDeck > 0) {
      addToZone(deck, card, hintedDeck);
      remaining -= hintedDeck;
    }

    const hintedDiscard = Math.min(remaining, discardHint);
    if (hintedDiscard > 0) {
      addToZone(discard, card, hintedDiscard);
      remaining -= hintedDiscard;
    }

    if (remaining <= 0) continue;

    if (deckHint > discardHint) {
      addToZone(deck, card, remaining);
    } else {
      addToZone(discard, card, remaining);
    }
  }

  return { deck, discard };
}

// ─── Hybrid Angular Bridge Functions ──────────────────────────────────
//
// These functions merge Angular game state snapshots (ground truth for
// zone counts and visible cards) with log-based ownership tracking to
// produce accurate deck composition.

// Updates game state metadata from an Angular snapshot without modifying
// zone card data. Sets turn number, local player, name mappings, and
// ensures player zone entries exist. Zone card data is left untouched
// so that log-based ownership tracking remains accurate for use by
// buildHybridZones().
//
// This replaces the old applySnapshot() which mixed Angular zone data
// into log-tracked zones, corrupting the total ownership count and
// causing stale deck/hand displays.
//
// @param state - Current game state (mutated in place)
// @param snapshot - Angular game state snapshot from the bridge
// @returns The updated game state
export function applySnapshotMetadata(
  state: GameState,
  snapshot: GameStateSnapshot,
): GameState {
  state.currentTurn = snapshot.turnNumber;

  for (const player of snapshot.players) {
    // Find or create the abbreviation mapping for this player
    const abbrev = findAbbrevForPlayer(player, state);

    if (player.isMe) {
      state.localPlayer = abbrev;
    }

    // Ensure zones exist so log entries can populate them
    ensurePlayer(state, abbrev);
  }

  return state;
}

// Finds the abbreviation for a player from the Angular snapshot.
// First checks if we already have a mapping for this player's full name.
// Otherwise, tries matching by initials (which correspond to the log abbreviation).
//
// @param player - Player snapshot from Angular
// @param state - Current game state with existing name mappings
// @returns The abbreviation string used in our state maps
function findAbbrevForPlayer(player: PlayerSnapshot, state: GameState): string {
  // Check if we already have a mapping by full name
  for (const [abbrev, name] of state.playerNames) {
    if (name === player.name) return abbrev;
  }

  // The bridge may include punctuation in initials (for example "L."),
  // while the log parser uses a stripped token. Normalize both sources
  // to keep one tracker identity per player.
  const initials = normalizePlayerAbbrev(player.initials);

  // Register the mapping and ensure zones exist
  state.playerNames.set(initials, player.name);
  return initials;
}

// Infers the draw pile composition using ownership tracking and Angular zone data.
//
// The key insight: we track all cards a player has ever gained (from logs) and
// all cards they've trashed. The difference is total owned cards. Angular tells
// us exactly what's in hand and play. So:
//   deckPool = totalOwned - hand - play
//   deckPool splits into deck (deckCount) and discard (discardCount) from Angular
//
// When discard is empty (right after a shuffle), ALL deckPool cards are in the
// draw pile — this is the most accurate moment for draw probability calculation.
//
// @param allOwned - Total cards owned by the player (from log tracking)
// @param hand - Exact hand contents (from Angular)
// @param play - Exact play area contents (from Angular)
// @param deckCount - Number of cards in draw pile (from Angular)
// @param discardCount - Number of cards in discard pile (from Angular)
// @returns Object with deckPool (cards in deck+discard), deckCount, and discardCount
export function inferDrawPile(
  allOwned: Map<string, number>,
  hand: Map<string, number>,
  play: Map<string, number>,
  deckCount: number,
  discardCount: number,
): { deckPool: Map<string, number>; deckCount: number; discardCount: number } {
  // Start with all owned cards
  const deckPool = new Map<string, number>();
  for (const [card, count] of allOwned) {
    deckPool.set(card, count);
  }

  // Subtract hand cards (exact from Angular)
  for (const [card, count] of hand) {
    const current = deckPool.get(card) || 0;
    const remaining = current - count;
    if (remaining <= 0) {
      deckPool.delete(card);
    } else {
      deckPool.set(card, remaining);
    }
  }

  // Subtract play area cards (exact from Angular)
  for (const [card, count] of play) {
    const current = deckPool.get(card) || 0;
    const remaining = current - count;
    if (remaining <= 0) {
      deckPool.delete(card);
    } else {
      deckPool.set(card, remaining);
    }
  }

  return { deckPool, deckCount, discardCount };
}

// Builds hybrid PlayerZones by combining Angular snapshot data with log-based
// ownership tracking. Visible zones come from Angular, while hidden zones stay
// log-first:
// - hand and play: exact cards from Angular (ground truth)
// - trash: exact cards from Angular (ground truth)
// - deck and discard: reconstructed from log ownership after subtracting the
//   authoritative visible zones
//
// @param state - Current game state with log-based ownership data
// @param snapshot - Angular game state snapshot
// @returns Map of abbreviation to hybrid PlayerZones for each player
export function buildHybridZones(
  state: GameState,
  snapshot: GameStateSnapshot,
): Map<string, PlayerZones> {
  const result = new Map<string, PlayerZones>();

  for (const player of snapshot.players) {
    const abbrev = findAbbrevForPlayer(player, state);
    const logZones = state.players.get(abbrev);
    if (!logZones) continue;

    const hybrid = createPlayerZones();
    const hand = getAngularVisibleZone(player, "HandZone");
    const play = getAngularVisibleZone(player, "InPlayZone");
    const trash = getAngularVisibleZone(player, "TrashZone");

    hybrid.hand = hand;
    hybrid.play = play;
    hybrid.trash = trash;

    // Start from every tracked card, replace log trash with Angular trash,
    // then remove the authoritative visible owned zones.
    const allTracked = getAllTrackedCards(logZones);
    const currentlyOwned = subtractCardMaps(allTracked, hybrid.trash);
    const afterHand = subtractCardMaps(currentlyOwned, hybrid.hand);
    const hiddenPool = subtractCardMaps(afterHand, hybrid.play);
    const hiddenZones = placeHiddenCardsFromLog(hiddenPool, logZones);

    hybrid.deck = hiddenZones.deck;
    hybrid.discard = hiddenZones.discard;

    result.set(abbrev, hybrid);
  }

  return result;
}
