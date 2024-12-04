import ipData, { type IpDataResult } from '@/data/sources/ip-data';
import { FetchError, jsonFetch } from '@/utils/fetch';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/utils/fetch', (importOriginal) =>
  importOriginal<typeof import('@/utils/fetch')>().then((mod) => ({
    ...mod,
    jsonFetch: vi.fn(),
  }))
);

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('ipData.rawFetch', () => {
  it('should not send a request for loopback or private ip address', async () => {
    await expect(ipData.rawFetch('10.0.0.1')).resolves.toStrictEqual({ ip: '10.0.0.1', is_bogon: true });
    await expect(ipData.rawFetch('127.0.0.1')).resolves.toStrictEqual({ ip: '127.0.0.1', is_bogon: true });
    await expect(ipData.rawFetch('172.16.0.1')).resolves.toStrictEqual({ ip: '172.16.0.1', is_bogon: true });
    await expect(ipData.rawFetch('192.168.1.1')).resolves.toStrictEqual({ ip: '192.168.1.1', is_bogon: true });

    expect(jsonFetch).not.toHaveBeenCalled();
  });

  it('should send a request with ip and api-key', async () => {
    const raw = { ip: '1.2.3.4' } as IpDataResult;

    vi.mocked(jsonFetch).mockResolvedValue(raw);

    await expect(ipData.rawFetch('1.2.3.4')).resolves.toStrictEqual(raw);

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://eu-api.ipdata.co/1.2.3.4?api-key=undefined'), {
      next: {
        revalidate: 86400,
        tags: ['1.2.3.4']
      }
    });
  });

  it('should handle reserved ip case', async () => {
    vi.mocked(jsonFetch).mockRejectedValue(new FetchError(400, JSON.stringify({
      message: '1.2.3.4 is a reserved IP address.',
    })));

    await expect(ipData.rawFetch('1.2.3.4')).resolves.toStrictEqual({
      ip: '1.2.3.4',
      is_bogon: true,
    });

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://eu-api.ipdata.co/1.2.3.4?api-key=undefined'), {
      next: {
        revalidate: 86400,
        tags: ['1.2.3.4']
      }
    });
  });

  it('should handle private ip case', async () => {
    vi.mocked(jsonFetch).mockRejectedValue(new FetchError(400, JSON.stringify({
      message: '1.2.3.4 is a private IP address.',
    })));

    await expect(ipData.rawFetch('1.2.3.4')).resolves.toStrictEqual({
      ip: '1.2.3.4',
      is_bogon: true,
    });

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://eu-api.ipdata.co/1.2.3.4?api-key=undefined'), {
      next: {
        revalidate: 86400,
        tags: ['1.2.3.4']
      }
    });
  });

  it('should rethrow other errors', async () => {
    vi.mocked(jsonFetch).mockRejectedValue(new FetchError(500, 'Service failure'));

    await expect(ipData.rawFetch('1.2.3.4')).rejects.toStrictEqual(new FetchError(500, 'Service failure'));

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://eu-api.ipdata.co/1.2.3.4?api-key=undefined'), {
      next: {
        revalidate: 86400,
        tags: ['1.2.3.4']
      }
    });
  });
});
