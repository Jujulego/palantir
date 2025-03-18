import { jsonFetch } from '@/lib/utils/fetch';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { reverseDnsLookup } from './reverse-dns-lookup';

vi.mock('@/lib/utils/fetch');

beforeEach(() => {
  vi.resetAllMocks();
});

describe('reverseDnsLookup', () => {
  it('should send a type 12 dns query with the given ipv4 address', async () => {
    vi.mocked(jsonFetch).mockResolvedValue({
      Answer: [
        {
          data: 'www.example.com.',
        }
      ]
    });

    await expect(reverseDnsLookup('1.2.3.4')).resolves.toBe('www.example.com');

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://dns.google/resolve?type=12&name=4.3.2.1.in-addr.arpa'), {
      next: {
        revalidate: 86400,
      }
    });
  });

  it('should send a type 12 dns query with the given ipv6 address', async () => {
    vi.mocked(jsonFetch).mockResolvedValue({
      Answer: [
        {
          data: 'www.example.com.',
        }
      ]
    });

    await expect(reverseDnsLookup('1234::5678')).resolves.toBe('www.example.com');

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://dns.google/resolve?type=12&name=8.7.6.5.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.4.3.2.1.ip6.arpa'), {
      next: {
        revalidate: 86400,
      }
    });
  });

  it('should return null if query as no answers', async () => {
    vi.mocked(jsonFetch).mockResolvedValue({});

    await expect(reverseDnsLookup('1.2.3.4')).resolves.toBeNull();

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://dns.google/resolve?type=12&name=4.3.2.1.in-addr.arpa'), {
      next: {
        revalidate: 86400,
      }
    });
  });
});
