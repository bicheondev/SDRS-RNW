import { describe, expect, it } from 'vitest';

import { parseCsvDocument, serializeCsv } from './csv.js';

describe('csv helpers', () => {
  it('parses quoted commas and escaped quotes', () => {
    const { headers, rows } = parseCsvDocument('이름,설명\n"선박, A","큰 ""테스트"" 선박"');

    expect(headers).toEqual(['이름', '설명']);
    expect(rows).toEqual([{ 이름: '선박, A', 설명: '큰 "테스트" 선박' }]);
  });

  it('serializes values that need CSV escaping', () => {
    expect(serializeCsv(['이름', '설명'], [{ 이름: '선박, A', 설명: '큰 "테스트" 선박' }])).toBe(
      '이름,설명\r\n"선박, A","큰 ""테스트"" 선박"',
    );
  });
});
