import { mergeSx } from '@/lib/utils/mui';
import { describe, expect, it } from 'vitest';

describe('mergeSx', () => {
  it('should merge sx props in an array (both objects)', () => {
    expect(mergeSx({ p: 1 }, { m: 1 })).toStrictEqual([
      { p: 1 },
      { m: 1 }
    ]);
  });

  it('should merge sx props in an array (array and object)', () => {
    expect(mergeSx([{ p: 1 }, { border: 1 }], { m: 1 })).toStrictEqual([
      { p: 1 },
      { border: 1 },
      { m: 1 }
    ]);
  });
});
