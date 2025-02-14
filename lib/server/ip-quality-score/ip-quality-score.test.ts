import { jsonFetch } from '@/utils/fetch';
import ipaddr from 'ipaddr.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { queryIpQualityScore } from './ip-quality-score';
import type { IpQualityScoreResult } from './ip-quality-score.dto';

// Mocks
vi.mock('@/utils/fetch');

// Setup
beforeEach(() => {
  vi.restoreAllMocks();
});

// Tests
describe('queryIpQualityScore', () => {
  it('should not query for loopback ip addresses', async () => {
    const ip = ipaddr.parse('1.2.3.4');
    vi.spyOn(ip, 'range').mockReturnValue('loopback');

    await expect(queryIpQualityScore(ip)).resolves.toBeNull();

    expect(jsonFetch).not.toHaveBeenCalled();
  });

  it('should not query for private ip addresses', async () => {
    const ip = ipaddr.parse('1.2.3.4');
    vi.spyOn(ip, 'range').mockReturnValue('private');

    await expect(queryIpQualityScore(ip)).resolves.toBeNull();

    expect(jsonFetch).not.toHaveBeenCalled();
  });

  it('should send a request with ip and key', async () => {
    vi.mocked(jsonFetch).mockResolvedValue({ success: true } as IpQualityScoreResult);

    await expect(queryIpQualityScore(ipaddr.parse('1.2.3.4'))).resolves.toStrictEqual({ success: true });

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://ipqualityscore.com/api/json/ip?ip=1.2.3.4'), {
      headers: {
        'IPQS-KEY': undefined,
      },
      next: {
        revalidate: 86400,
        tags: ['server-1.2.3.4']
      }
    });
  });
});
