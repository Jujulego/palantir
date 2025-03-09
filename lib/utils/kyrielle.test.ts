import { count$ } from '@/lib/utils/kyrielle';
import { collect$, pipe$ } from 'kyrielle';
import { describe, expect, it } from 'vitest';

describe('count$', () => {
  it('should return all numbers from 1 included to 5 excluded', () => {
    expect(pipe$(count$(1, 5), collect$())).toStrictEqual([1, 2, 3, 4]);
  });
});