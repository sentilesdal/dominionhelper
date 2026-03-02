// Dominion Helper - Strategy Archetype Detection
// Identifies viable macro-strategies for the kingdom

(function () {
  'use strict';

  function detectArchetypes(cards, tags) {
    const archetypes = [];

    const hasVillage = tags.villages.length > 0;
    const hasDraw = tags.draw.length > 0;
    const hasTrash = tags.trashers.length > 0;
    const hasPayload =
      tags.economy.length > 0 || tags.attacks.length > 0;

    // Engine detection
    if (hasVillage && hasDraw && hasPayload) {
      let desc = 'Engine';
      if (hasTrash) desc += ' (with trashing for thin deck)';
      if (tags.plusBuy.length > 0) desc += ' — can double-Province';
      archetypes.push(desc);
    }

    // Big Money detection
    const strongTerminals = cards.filter(
      (c) =>
        c.isTerminal &&
        c.tags &&
        (c.tags.includes('economy') || c.tags.includes('terminal-draw'))
    );
    if (strongTerminals.length > 0) {
      const best = strongTerminals[0].name;
      archetypes.push(`Big Money + ${best}`);
    }

    // Rush detection
    if (tags.gainers.length > 0 && tags.altVp.length > 0) {
      archetypes.push(
        `Rush: ${tags.gainers[0]} + ${tags.altVp[0]}`
      );
    }

    // Slog detection
    if (tags.attacks.length > 0 && tags.trashers.length === 0) {
      archetypes.push('Slog — attacks with no trashing, war of attrition');
    }

    // Combo detection (Throne + Bridge-type)
    const throneVariants = cards.filter(
      (c) => c.tags && c.tags.includes('throne-variant')
    );
    const costReducers = cards.filter(
      (c) => c.tags && c.tags.includes('cost-reducer')
    );
    if (throneVariants.length > 0 && costReducers.length > 0) {
      archetypes.push(
        `Combo: ${throneVariants[0].name} + ${costReducers[0].name} — massive cost reduction`
      );
    }

    if (archetypes.length === 0) {
      archetypes.push('Big Money likely — limited engine components');
    }

    return archetypes;
  }

  if (typeof window !== 'undefined') {
    window.DominionHelper = window.DominionHelper || {};
    window.DominionHelper.detectArchetypes = detectArchetypes;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { detectArchetypes };
  }
})();
