import { describe, it, expect } from 'vitest';

// The analysis files use IIFE + module.exports for dual-environment support
const { analyzeKingdom } = require('../src/analysis/engine.js');

describe('analyzeKingdom', () => {
  it('detects engine components in Village/Smithy kingdom', () => {
    const kingdom = [
      'Village', 'Smithy', 'Chapel', 'Market', 'Festival',
      'Witch', 'Moat', 'Remodel', 'Laboratory', 'Gardens',
    ];
    const result = analyzeKingdom(kingdom);

    expect(result.components.length).toBeGreaterThan(0);
    expect(result.components.some((c) => c.includes('Village'))).toBe(true);
    expect(result.components.some((c) => c.includes('Smithy'))).toBe(true);
  });

  it('detects trashing synergy with curse defense', () => {
    const kingdom = [
      'Village', 'Smithy', 'Chapel', 'Market', 'Festival',
      'Witch', 'Moat', 'Remodel', 'Laboratory', 'Gardens',
    ];
    const result = analyzeKingdom(kingdom);

    expect(result.components.some((c) => c.includes('Trashing'))).toBe(true);
    expect(result.synergies.some((s) => s.toLowerCase().includes('curse'))).toBe(true);
  });

  it('flags missing village', () => {
    const kingdom = [
      'Smithy', 'Militia', 'Bureaucrat', 'Moneylender', 'Bandit',
      'Mine', 'Witch', 'Library', 'Artisan', 'Vassal',
    ];
    const result = analyzeKingdom(kingdom);

    expect(result.notes.some((n) => n.includes('No village'))).toBe(true);
  });

  it('detects rush strategy with gainer + alt-vp', () => {
    const kingdom = [
      'Workshop', 'Gardens', 'Village', 'Smithy', 'Market',
      'Festival', 'Chapel', 'Moat', 'Militia', 'Remodel',
    ];
    const result = analyzeKingdom(kingdom);

    expect(
      result.synergies.some((s) => s.includes('Workshop') && s.includes('Gardens'))
    ).toBe(true);
  });

  it('detects slog conditions when attacks exist without trashing', () => {
    const kingdom = [
      'Militia', 'Bureaucrat', 'Smithy', 'Vassal', 'Bandit',
      'Library', 'Artisan', 'Council Room', 'Moat', 'Poacher',
    ];
    const result = analyzeKingdom(kingdom);

    expect(result.notes.some((n) => n.includes('No trashing'))).toBe(true);
  });

  it('returns empty analysis for unknown cards gracefully', () => {
    const kingdom = ['FakeCard1', 'FakeCard2'];
    const result = analyzeKingdom(kingdom);

    expect(result).toBeDefined();
    expect(result.components).toEqual([]);
  });

  it('detects full engine potential', () => {
    const kingdom = [
      'Village', 'Smithy', 'Chapel', 'Market', 'Festival',
      'Laboratory', 'Witch', 'Moat', 'Remodel', 'Council Room',
    ];
    const result = analyzeKingdom(kingdom);

    expect(
      result.synergies.some((s) => s.includes('Full engine potential'))
    ).toBe(true);
  });

  it('detects Throne Room synergy', () => {
    const kingdom = [
      'Throne Room', 'Witch', 'Village', 'Smithy', 'Market',
      'Festival', 'Chapel', 'Moat', 'Remodel', 'Laboratory',
    ];
    const result = analyzeKingdom(kingdom);

    expect(
      result.synergies.some((s) => s.includes('Throne Room'))
    ).toBe(true);
  });
});
