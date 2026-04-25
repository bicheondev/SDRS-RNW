import { describe, expect, it } from 'vitest';

import { buildDisplayVessels, buildHarborOptions, createEmptyDatabaseState } from './databaseState.js';

describe('database state helpers', () => {
  it('creates empty database metadata for both bundled files', () => {
    expect(createEmptyDatabaseState().files).toEqual({
      images: { imported: false, modified: false, name: 'images.zip' },
      ship: { imported: false, modified: false, name: 'ship.csv' },
    });
  });

  it('builds sorted harbor options and display vessels without changing data text', () => {
    const records = [
      {
        id: 'ship-1',
        title: '동해호',
        registration: '9406005-6497201',
        port: '포항',
        business: '연안통발어업',
        tonnage: '9.77',
        sonar: true,
        detector: false,
      },
      {
        id: 'ship-2',
        title: '남해호',
        registration: '9406005-6497202',
        port: '강릉',
        business: '기타',
        tonnage: '1.2',
        sonar: false,
        detector: true,
      },
    ];

    expect(buildHarborOptions(records)).toEqual(['전체 항포구', '강릉', '포항']);
    expect(buildDisplayVessels(records).map((vessel) => vessel.name)).toEqual(['동해호', '남해호']);
  });
});
