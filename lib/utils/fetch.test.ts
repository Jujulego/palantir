import { FetchError, jsonFetch } from '@/lib/utils/fetch';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

beforeEach(() => {
  vi.spyOn(global, 'fetch');
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('jsonFetch', () => {
  it('should call fetch and return parsed json output', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ test: 'successful' })
    } as Response);

    await expect(jsonFetch('https://www.example.com'))
      .resolves.toStrictEqual({
        test: 'successful',
      });

    expect(fetch).toHaveBeenCalledWith('https://www.example.com', undefined);
  });

  it('should throw a FetchError if api call is not ok', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 418,
      text: async () => 'test failed!'
    } as Response);

    await expect(jsonFetch('https://www.example.com'))
      .rejects.toStrictEqual(new FetchError(418, 'test failed!'));
  });
});
