import { jsonFetch } from '@/lib/utils/fetch';
import ipaddr from 'ipaddr.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { queryIpInfo } from './ip-info';
import type { IpInfoResult } from './ip-info.dto';

// Mocks
vi.mock('@/lib/utils/fetch');

// Setup
beforeEach(() => {
  vi.restoreAllMocks();
});

// Tests
describe('queryIpInfo', () => {
  it('should not query for loopback ip addresses', async () => {
    const ip = ipaddr.parse('1.2.3.4');
    vi.spyOn(ip, 'range').mockReturnValue('loopback');

    await expect(queryIpInfo(ip)).resolves.toBeNull();

    expect(jsonFetch).not.toHaveBeenCalled();
  });

  it('should not query for private ip addresses', async () => {
    const ip = ipaddr.parse('1.2.3.4');
    vi.spyOn(ip, 'range').mockReturnValue('private');

    await expect(queryIpInfo(ip)).resolves.toBeNull();

    expect(jsonFetch).not.toHaveBeenCalled();
  });

  it('should send a request with ip and api-key', async () => {
    const raw = { ip: '1.2.3.4' } as IpInfoResult;

    vi.mocked(jsonFetch).mockResolvedValue({
      ip: '1.2.3.4'
    } as IpInfoResult);

    await expect(queryIpInfo(ipaddr.parse('1.2.3.4'))).resolves.toStrictEqual(raw);

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://ipinfo.io/1.2.3.4/json'), {
      headers: {
        Authorization: 'Bearer undefined'
      },
      next: {
        revalidate: 86400,
        tags: ['server-1.2.3.4']
      }
    });
  });
});
