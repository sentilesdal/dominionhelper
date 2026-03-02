// Dominion Helper - Analysis Engine
// Main entry point for kingdom analysis

import { detectSynergies } from './synergies.js';
import { detectArchetypes } from './archetypes.js';
import cardData from '../data/cards.json' with { type: 'json' };

const CARD_MAP = new Map(cardData.map((c) => [c.name, c]));

function getCard(name) {
  return CARD_MAP.get(name);
}

function classifyComponents(cards) {
  const components = [];
  const tags = {
    villages: [],
    draw: [],
    trashers: [],
    gainers: [],
    plusBuy: [],
    attacks: [],
    reactions: [],
    altVp: [],
    economy: [],
    sifters: [],
  };

  for (const card of cards) {
    if (!card) continue;
    const t = card.tags || [];

    if (t.includes('village')) tags.villages.push(card.name);
    if (t.includes('terminal-draw') || t.includes('non-terminal-draw'))
      tags.draw.push(card.name);
    if (t.includes('trasher')) tags.trashers.push(card.name);
    if (t.includes('gainer')) tags.gainers.push(card.name);
    if (t.includes('plus-buy')) tags.plusBuy.push(card.name);
    if (t.includes('curser') || t.includes('handsize-attack') || t.includes('junker'))
      tags.attacks.push(card.name);
    if (t.includes('reaction')) tags.reactions.push(card.name);
    if (t.includes('alt-vp')) tags.altVp.push(card.name);
    if (t.includes('economy')) tags.economy.push(card.name);
    if (t.includes('sifter') || t.includes('draw-to-x'))
      tags.sifters.push(card.name);
  }

  if (tags.villages.length > 0)
    components.push(`Villages: ${tags.villages.join(', ')}`);
  if (tags.draw.length > 0)
    components.push(`Draw: ${tags.draw.join(', ')}`);
  if (tags.trashers.length > 0)
    components.push(`Trashing: ${tags.trashers.join(', ')}`);
  if (tags.gainers.length > 0)
    components.push(`Gainers: ${tags.gainers.join(', ')}`);
  if (tags.plusBuy.length > 0)
    components.push(`+Buy: ${tags.plusBuy.join(', ')}`);
  if (tags.attacks.length > 0)
    components.push(`Attacks: ${tags.attacks.join(', ')}`);
  if (tags.reactions.length > 0)
    components.push(`Reactions: ${tags.reactions.join(', ')}`);
  if (tags.altVp.length > 0)
    components.push(`Alt VP: ${tags.altVp.join(', ')}`);

  return { components, tags };
}

function generateNotes(tags) {
  const notes = [];

  if (tags.villages.length === 0) {
    notes.push('No village — limited to one terminal action per turn');
  }

  if (tags.trashers.length === 0) {
    notes.push('No trashing available — deck will stay bloated');
  }

  if (tags.plusBuy.length === 0) {
    notes.push('No +Buy — can only buy one card per turn');
  }

  if (tags.attacks.length > 0 && tags.reactions.length === 0) {
    notes.push(
      `Attacks (${tags.attacks.join(', ')}) with no reaction available`
    );
  }

  if (
    tags.attacks.some((a) => {
      const c = getCard(a);
      return c && c.tags && c.tags.includes('curser');
    }) &&
    tags.trashers.length === 0
  ) {
    notes.push('Cursing attack with no trasher — get those curses out or be cursed!');
  }

  return notes;
}

export function analyzeKingdom(cardNames) {
  const cards = cardNames.map(getCard).filter(Boolean);
  const { components, tags } = classifyComponents(cards);
  const synergies = detectSynergies(cards, tags);
  const archetypes = detectArchetypes(cards, tags);
  const notes = generateNotes(tags);

  return {
    components,
    synergies,
    archetypes,
    notes,
  };
}
