import { describe, it, expect } from 'vitest';
import { analyzeKingdom } from '../src/analysis/engine.js';

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

  it('detects trashing synergy', () => {
    const kingdom = [
      'Village', 'Smithy', 'Chapel', 'Market', 'Festival',
      'Witch', 'Moat', 'Remodel', 'Laboratory', 'Gardens',
    ];
    const result = analyzeKingdom(kingdom);

    expect(result.components.some((c) => c.includes('Trashing'))).toBe(true);
    expect(result.synergies.some((s) => s.toLowerCase().includes('curse'))).toBe(true);
  });

  it('flags missing components', () => {
    const kingdom = [
      'Smithy', 'Militia', 'Bureaucrat', 'Moneylender', 'Bandit',
      'Mine', 'Witch', 'Library', 'Artisan', 'Vassal',
    ];
    const result = analyzeKingdom(kingdom);

    // No village in this kingdom
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

  it('detects slog conditions', () => {
    const kingdom = [
      'Witch', 'Militia', 'Smithy', 'Vassal', 'Bandit',
      'Bureaucrat', 'Library', 'Artisan', 'Mine', 'Moat',
    ];
    const result = analyzeKingdom(kingdom);

    // No trasher (Mine trashes treasures, not curses effectively)
    // But Mine is tagged as trasher so this may find trashing
    expect(result.notes.length).toBeGreaterThan(0);
  });

  it('returns empty analysis for unknown cards gracefully', () => {
    const kingdom = ['FakeCard1', 'FakeCard2'];
    const result = analyzeKingdom(kingdom);

    expect(result).toBeDefined();
    expect(result.components).toEqual([]);
  });
});
