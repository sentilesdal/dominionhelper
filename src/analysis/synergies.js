// Dominion Helper - Synergy Detection
// Identifies card synergies within a kingdom
// Used both as content script (window.DominionHelper) and in tests (export)

(function () {
  'use strict';

  function detectSynergies(cards, tags) {
    const synergies = [];

    // Village + Terminal Draw = Engine core
    if (tags.villages.length > 0 && tags.draw.length > 0) {
      synergies.push(
        `Engine core: ${tags.villages[0]} + ${tags.draw[0]} — chain actions and draw`
      );
    }

    // Trasher + Curser = Curse defense
    if (tags.trashers.length > 0 && tags.attacks.length > 0) {
      const cursers = cards.filter((c) => c.tags && c.tags.includes('curser'));
      if (cursers.length > 0) {
        synergies.push(
          `${tags.trashers[0]} counters ${cursers[0].name} curses`
        );
      }
    }

    // Gainer + Alt-VP = Rush potential
    if (tags.gainers.length > 0 && tags.altVp.length > 0) {
      synergies.push(
        `Rush: ${tags.gainers[0]} + ${tags.altVp[0]} — gain cards fast for alt-VP`
      );
    }

    // Trash-for-benefit + expensive cards
    const tfb = cards.filter(
      (c) => c.tags && c.tags.includes('trash-for-benefit')
    );
    if (tfb.length > 0) {
      synergies.push(
        `${tfb[0].name} can upgrade cards — look for upgrade chains`
      );
    }

    // Draw-to-X + terminal actions
    const drawToX = cards.filter(
      (c) => c.tags && c.tags.includes('draw-to-x')
    );
    const terminals = cards.filter(
      (c) => c.isTerminal && !c.tags?.includes('draw-to-x')
    );
    if (drawToX.length > 0 && terminals.length > 1) {
      synergies.push(
        `${drawToX[0].name} combos with terminal actions — play terminals, then draw back up`
      );
    }

    // Throne Room variant + strong terminal
    const throneVariants = cards.filter(
      (c) => c.tags && c.tags.includes('throne-variant')
    );
    if (throneVariants.length > 0) {
      const payload = cards.filter(
        (c) =>
          c.tags &&
          (c.tags.includes('payload') ||
            c.tags.includes('curser') ||
            c.tags.includes('economy'))
      );
      if (payload.length > 0) {
        synergies.push(
          `${throneVariants[0].name} + ${payload[0].name} — double the impact`
        );
      }
    }

    // +Buy + strong economy = multi-buy turns
    if (tags.plusBuy.length > 0 && tags.economy.length > 1) {
      synergies.push(
        `${tags.plusBuy[0]} enables multi-buy with strong economy`
      );
    }

    // Village + draw + trasher = full engine
    if (
      tags.villages.length > 0 &&
      tags.draw.length > 0 &&
      tags.trashers.length > 0
    ) {
      synergies.push(
        'Full engine potential: village + draw + trashing for a thin, consistent deck'
      );
    }

    return synergies;
  }

  // Expose to global namespace for content scripts
  if (typeof window !== 'undefined') {
    window.DominionHelper = window.DominionHelper || {};
    window.DominionHelper.detectSynergies = detectSynergies;
  }

  // Expose for tests (Node.js / Vitest)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { detectSynergies };
  }
})();
