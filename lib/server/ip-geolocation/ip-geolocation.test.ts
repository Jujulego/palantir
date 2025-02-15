import { FetchError, jsonFetch } from '@/lib/utils/fetch';
import ipaddr from 'ipaddr.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { queryIpGeolocation } from './ip-geolocation';
import type { IpGeolocationResult } from './ip-geolocation.dto';

// Mocks
vi.mock('@/lib/utils/fetch', (importOriginal) =>
  importOriginal<typeof import('@/lib/utils/fetch')>().then((mod) => ({
    ...mod,
    jsonFetch: vi.fn(),
  }))
);

// Setup
beforeEach(() => {
  vi.restoreAllMocks();
});

// Tests
describe('queryIpGeolocation', () => {
  it('should not query for loopback ip addresses', async () => {
    const ip = ipaddr.parse('1.2.3.4');
    vi.spyOn(ip, 'range').mockReturnValue('loopback');

    await expect(queryIpGeolocation(ip)).resolves.toBeNull();

    expect(jsonFetch).not.toHaveBeenCalled();
  });

  it('should not query for private ip addresses', async () => {
    const ip = ipaddr.parse('1.2.3.4');
    vi.spyOn(ip, 'range').mockReturnValue('private');

    await expect(queryIpGeolocation(ip)).resolves.toBeNull();

    expect(jsonFetch).not.toHaveBeenCalled();
  });

  it('should send a request with ip and key', async () => {
    vi.mocked(jsonFetch).mockResolvedValue({
      ip: '1.2.3.4'
    } as IpGeolocationResult);

    await expect(queryIpGeolocation(ipaddr.parse('1.2.3.4'))).resolves.toStrictEqual({
      ip: '1.2.3.4'
    });

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://api.ipgeolocation.io/ipgeo?apiKey=undefined&ip=1.2.3.4'), {
      next: {
        revalidate: 86400,
        tags: ['server-1.2.3.4']
      }
    });
  });

  it('should handle bogon ips', async () => {
    vi.mocked(jsonFetch).mockRejectedValue(new FetchError(423, ''));

    await expect(queryIpGeolocation(ipaddr.parse('1.2.3.4'))).resolves.toBeNull();

    expect(jsonFetch).toHaveBeenCalledOnce();
  });

  it('should rethrow other errors', async () => {
    vi.mocked(jsonFetch).mockRejectedValue(new FetchError(500, 'Service failure'));

    await expect(queryIpGeolocation(ipaddr.parse('1.2.3.4')))
      .rejects.toStrictEqual(new FetchError(500, 'Service failure'));

    expect(jsonFetch).toHaveBeenCalledOnce();
  });
});
