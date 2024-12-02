import { useDnsLookup } from '@/hooks/useDnsLookup';
import { jsonFetch } from '@/utils/fetch';
import { renderHook } from '@testing-library/react';
import useSWR, { type SWRResponse } from 'swr';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/utils/fetch');
vi.mock('swr');

beforeEach(() => {
  vi.resetAllMocks();

  vi.mocked(useSWR).mockReturnValue({
    isLoading: false,
    isValidating: false,
  } as SWRResponse);
});

describe('useDnsLookup', () => {
  it('should not send any dns query', () => {
    const { result } = renderHook(() => useDnsLookup(null));

    expect(result.current).toStrictEqual({
      ips: [],
      isLoading: false,
      isValidating: false,
    });

    expect(useSWR).toHaveBeenCalledTimes(2);
    expect(useSWR).toHaveBeenCalledWith(null, jsonFetch);
    expect(useSWR).not.toHaveBeenCalledWith(expect.stringMatching(/^https:\/\/dns\.google\.com\//), jsonFetch);
  });

  it('should send dns queries with types 1 and 28', () => {
    vi.mocked(useSWR).mockReturnValue({
      isLoading: true,
      isValidating: true,
    } as SWRResponse);

    const { result } = renderHook(() => useDnsLookup('www.example.com'));

    expect(result.current).toStrictEqual({
      ips: [],
      isLoading: true,
      isValidating: true,
    });

    expect(useSWR).toHaveBeenCalledTimes(2);
    expect(useSWR).toHaveBeenCalledWith('https://dns.google.com/resolve?type=1&name=www.example.com', jsonFetch);
    expect(useSWR).toHaveBeenCalledWith('https://dns.google.com/resolve?type=28&name=www.example.com', jsonFetch);
  });

  it('should keep v4 dns query results', () => {
    vi.mocked(useSWR).mockImplementation((url) => {
      const isV4 = (url as string).includes('type=1');

      return ({
        data: isV4 ? {
          Answer: [
            { type: 1, data: '0.0.0.0' },
          ]
        } : undefined,
        isLoading: isV4,
        isValidating: isV4,
      } as SWRResponse);
    });

    const { result } = renderHook(() => useDnsLookup('www.example.com'));

    expect(result.current).toStrictEqual({
      ips: ['0.0.0.0'],
      isLoading: false,
      isValidating: true,
    });

    expect(useSWR).toHaveBeenCalledTimes(2);
    expect(useSWR).toHaveBeenCalledWith('https://dns.google.com/resolve?type=1&name=www.example.com', jsonFetch);
    expect(useSWR).toHaveBeenCalledWith('https://dns.google.com/resolve?type=28&name=www.example.com', jsonFetch);
  });

  it('should keep v6 dns query results', () => {
    vi.mocked(useSWR).mockImplementation((url) => {
      const isV6 = (url as string).includes('type=28');

      return ({
        data: isV6 ? {
          Answer: [
            { type: 28, data: '::1' },
          ]
        } : undefined,
        isLoading: isV6,
        isValidating: isV6,
      } as SWRResponse);
    });

    const { result } = renderHook(() => useDnsLookup('www.example.com'));

    expect(result.current).toStrictEqual({
      ips: ['::1'],
      isLoading: false,
      isValidating: true,
    });

    expect(useSWR).toHaveBeenCalledTimes(2);
    expect(useSWR).toHaveBeenCalledWith('https://dns.google.com/resolve?type=1&name=www.example.com', jsonFetch);
    expect(useSWR).toHaveBeenCalledWith('https://dns.google.com/resolve?type=28&name=www.example.com', jsonFetch);
  });

  it('should combine dns queries results', () => {
    vi.mocked(useSWR).mockReturnValue({
      data: {
        Answer: [
          { type: 1, data: '0.0.0.0' },
          { type: 28, data: '::1' },
        ]
      },
      isLoading: false,
      isValidating: false,
    } as SWRResponse);

    const { result } = renderHook(() => useDnsLookup('www.example.com'));

    expect(result.current).toStrictEqual({
      ips: ['0.0.0.0', '::1'],
      isLoading: false,
      isValidating: false,
    });

    expect(useSWR).toHaveBeenCalledTimes(2);
    expect(useSWR).toHaveBeenCalledWith('https://dns.google.com/resolve?type=1&name=www.example.com', jsonFetch);
    expect(useSWR).toHaveBeenCalledWith('https://dns.google.com/resolve?type=28&name=www.example.com', jsonFetch);
  });
});