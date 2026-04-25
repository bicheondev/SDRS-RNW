import { describe, expect, it } from 'vitest';

import { buildSearchIndex, compileSearchQuery, matchesCompiledSearchQuery } from './search.js';

describe('search helpers', () => {
  it('matches direct Korean text', () => {
    const index = buildSearchIndex(['동해호']);

    expect(matchesCompiledSearchQuery(index, compileSearchQuery('동해'))).toBe(true);
    expect(matchesCompiledSearchQuery(index, compileSearchQuery('서해'))).toBe(false);
  });

  it('matches choseong queries', () => {
    const index = buildSearchIndex(['동해호']);

    expect(matchesCompiledSearchQuery(index, compileSearchQuery('ㄷㅎㅎ'))).toBe(true);
  });
});
