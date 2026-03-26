// Dominion Helper - Game State Bridge Runtime Helpers
//
// Normalizes dominion.games Angular objects into a serializable snapshot for
// the tracker bridge. The live client exposes different stack shapes for local
// hands, hidden opponent hands, and deck piles, so these helpers extract card
// names and counts without double-counting mirrored UI stacks.
//
// @module game-state-bridge-runtime

/**
 * Serialized zone payload sent from the MAIN-world bridge to the content
 * script.
 */
export interface BridgeZoneSnapshot {
  zoneName: string;
  cards: string[];
  count: number;
}

/**
 * Serialized player payload sent from the MAIN-world bridge to the content
 * script.
 */
export interface BridgePlayerSnapshot {
  name: string;
  initials: string;
  isMe: boolean;
  zones: BridgeZoneSnapshot[];
}

/**
 * Complete Angular snapshot payload sent from the MAIN-world bridge to the
 * content script.
 */
export interface BridgeGameStateSnapshot {
  players: BridgePlayerSnapshot[];
  turnNumber: number;
}

type UnknownRecord = Record<string, unknown>;
const PLACEHOLDER_CARD_NAMES = new Set(["back", "card"]);

/**
 * Converts an unknown value into a record when possible.
 *
 * @param value - Value to inspect
 * @returns Object record or null when the value is not object-like
 */
function asRecord(value: unknown): UnknownRecord | null {
  if (typeof value !== "object" || value === null) return null;
  return value as UnknownRecord;
}

/**
 * Returns a trimmed string when the value is a non-empty string.
 *
 * @param value - Value to inspect
 * @returns Normalized string or null
 */
function asString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Returns a finite positive number when the value is numeric.
 *
 * @param value - Value to inspect
 * @returns Positive finite number or null
 */
function asPositiveNumber(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return null;
  }
  return value;
}

/**
 * Returns an array when the value is array-like.
 *
 * @param value - Value to inspect
 * @returns Array value or an empty array
 */
function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

/**
 * Reads a Dominion card name from the Angular card objects exposed on the page.
 *
 * The live client uses several shapes depending on whether a card is visible,
 * hidden, or represented by a synthetic image wrapper.
 *
 * @param card - Angular card-like object
 * @returns Card name when available, otherwise null
 */
export function extractCardName(card: unknown): string | null {
  const directName = asString(card);
  if (directName) return directName;

  const record = asRecord(card);
  if (!record) return null;

  const candidates = [
    record.name,
    asRecord(record.pileName)?.english,
    asRecord(record.pileName)?.name,
    asRecord(record.cardName)?.english,
    asRecord(record.cardName)?.name,
    asRecord(record.privateImage)?.name,
    asRecord(record.privateServerImage)?.name,
  ];

  for (const candidate of candidates) {
    const name = asString(candidate);
    if (name && !PLACEHOLDER_CARD_NAMES.has(name.toLowerCase())) {
      return name;
    }
  }

  return null;
}

/**
 * Selects the canonical stack collection for a zone.
 *
 * Some dominion.games zones expose mirrored window stacks inside `cardStacks`.
 * When `primaryStacks` is present, it contains the de-duplicated source of
 * truth and should be preferred.
 *
 * @param zone - Angular zone-like object
 * @returns Canonical stack collection for the zone
 */
function getZoneStacks(zone: UnknownRecord): unknown[] {
  const primaryStacks = asArray(zone.primaryStacks);
  if (primaryStacks.length > 0) {
    return primaryStacks;
  }

  return asArray(zone.cardStacks);
}

/**
 * Extracts the visible card names from a stack when the client exposes them.
 *
 * Local hands expose full `privateCards`, visible public piles may expose
 * `cards`, and some single-card stacks only surface a top-card reference.
 *
 * @param stack - Angular stack-like object
 * @returns Visible card names for that stack
 */
function getStackVisibleCards(stack: UnknownRecord): string[] {
  const visibleArrays = [asArray(stack.privateCards), asArray(stack.cards)];
  for (const cards of visibleArrays) {
    if (cards.length === 0) continue;

    const names = cards
      .map((card) => extractCardName(card))
      .filter((name): name is string => Boolean(name));
    if (names.length > 0) {
      return names;
    }
  }

  const topCardName =
    extractCardName(stack.privateTopCard) ??
    extractCardName(stack.topCard) ??
    extractCardName(stack.stackCard);

  return topCardName ? [topCardName] : [];
}

/**
 * Computes the total stack count from the fields dominion.games exposes.
 *
 * Local hands often only expose `privateCards`, hidden hands use
 * `privateAnonymousCards`, and public piles may rely on `privateCount` or
 * `count` while only revealing a single top card.
 *
 * @param stack - Angular stack-like object
 * @param visibleCards - Visible cards already extracted for the stack
 * @returns Total number of cards represented by the stack
 */
function getStackCount(
  zoneName: string,
  stack: UnknownRecord,
  visibleCards: string[],
): number {
  const visibleCount = Math.max(
    asArray(stack.privateCards).length,
    asArray(stack.cards).length,
  );
  const anonymousCount = asPositiveNumber(stack.privateAnonymousCards) ?? 0;
  const explicitCount =
    asPositiveNumber(stack.privateCount) ?? asPositiveNumber(stack.count) ?? 0;

  const exactVisibilityZones = new Set(["HandZone", "InPlayZone", "TrashZone"]);
  if (
    exactVisibilityZones.has(zoneName) &&
    (visibleCount > 0 || anonymousCount > 0)
  ) {
    return visibleCount + anonymousCount;
  }

  if (anonymousCount > 0) {
    return Math.max(anonymousCount, explicitCount);
  }

  if (explicitCount > 0) {
    return explicitCount;
  }

  if (visibleCount > 0) {
    return visibleCount;
  }

  return visibleCards.length;
}

/**
 * Extracts a serialized zone snapshot from a dominion.games Angular zone.
 *
 * @param zone - Angular zone-like object
 * @returns Serialized zone snapshot, or null when the zone is invalid
 */
export function extractZoneSnapshot(zone: unknown): BridgeZoneSnapshot | null {
  const record = asRecord(zone);
  const zoneName = asString(record?.zoneName);
  if (!record || !zoneName) return null;

  const cards: string[] = [];
  let count = 0;

  for (const stackValue of getZoneStacks(record)) {
    const stack = asRecord(stackValue);
    if (!stack) continue;

    const visibleCards = getStackVisibleCards(stack);
    cards.push(...visibleCards);
    count += getStackCount(zoneName, stack, visibleCards);
  }

  return { zoneName, cards, count };
}

/**
 * Extracts the current turn number from the Angular game model.
 *
 * dominion.games stores the active turn inside `state.activeTurn.turnNumber`
 * rather than the older `state.turnCounter` field.
 *
 * @param game - Angular game service object
 * @returns Current turn number, or 0 when unavailable
 */
export function extractTurnNumber(game: unknown): number {
  const gameRecord = asRecord(game);
  const state = asRecord(gameRecord?.state);
  return (
    asPositiveNumber(asRecord(state?.activeTurn)?.turnNumber) ??
    asPositiveNumber(state?.turnCounter) ??
    0
  );
}

/**
 * Extracts a serialized player snapshot from a dominion.games Angular player.
 *
 * @param player - Angular player-like object
 * @returns Serialized player snapshot, or null when the player is invalid
 */
export function extractPlayerSnapshot(
  player: unknown,
): BridgePlayerSnapshot | null {
  const record = asRecord(player);
  const name = asString(record?.name);
  if (!record || !name) return null;

  const zones = asArray(record.ownedZones)
    .map((zone) => extractZoneSnapshot(zone))
    .filter((zone): zone is BridgeZoneSnapshot => Boolean(zone));

  return {
    name,
    initials: asString(record.initials) ?? "",
    isMe: record.isMe === true,
    zones,
  };
}

/**
 * Extracts the complete bridge snapshot from the Angular game service.
 *
 * @param game - Angular game service object
 * @returns Serialized bridge snapshot, or null when no players are available
 */
export function extractGameStateSnapshot(
  game: unknown,
): BridgeGameStateSnapshot | null {
  const gameRecord = asRecord(game);
  const state = asRecord(gameRecord?.state);
  const players = asArray(state?.players)
    .map((player) => extractPlayerSnapshot(player))
    .filter((player): player is BridgePlayerSnapshot => Boolean(player));

  if (players.length === 0) return null;

  return {
    players,
    turnNumber: extractTurnNumber(game),
  };
}
