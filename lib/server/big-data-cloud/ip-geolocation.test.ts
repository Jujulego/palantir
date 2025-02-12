import { queryIpGeolocationFull } from '@/lib/server/big-data-cloud/ip-geolocation';
import { jsonFetch } from '@/utils/fetch';
import ipaddr from 'ipaddr.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mocks
vi.mock('@/utils/fetch');

// Setup
beforeEach(() => {
  vi.restoreAllMocks();
});

// Tests
describe('queryIpGeolocationFull', () => {
  it('should not query for loopback ip addresses', async () => {
    const ip = ipaddr.parse('1.2.3.4');
    vi.spyOn(ip, 'range').mockReturnValue('loopback');

    await expect(queryIpGeolocationFull(ip)).resolves.toBeNull();

    expect(jsonFetch).not.toHaveBeenCalled();
  });

  it('should not query for private ip addresses', async () => {
    const ip = ipaddr.parse('1.2.3.4');
    vi.spyOn(ip, 'range').mockReturnValue('private');

    await expect(queryIpGeolocationFull(ip)).resolves.toBeNull();

    expect(jsonFetch).not.toHaveBeenCalled();
  });

  it('should send a request with ip and key', async () => {
    vi.mocked(jsonFetch).mockResolvedValue({
      location: {
        latitude: 1,
        longitude: 2,
      }
    });

    await expect(queryIpGeolocationFull(ipaddr.parse('1.2.3.4'))).resolves.toStrictEqual({
      location: {
        latitude: 1,
        longitude: 2,
      }
    });

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://api-bdc.net/data/ip-geolocation-full?ip=1.2.3.4&key=undefined'), {
      next: {
        revalidate: 86400,
        tags: ['server-1.2.3.4']
      }
    });
  });
});
