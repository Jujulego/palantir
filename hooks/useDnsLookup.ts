import type { DnsResponse } from '@/data/dns';
import { jsonFetch } from '@/utils/fetch';
import { filter$, map$, pipe$ } from 'kyrielle';
import { useMemo } from 'react';
import { preload } from 'react-dom';
import useSWR from 'swr';

export interface DnsLookupState {
  readonly ips: readonly string[];
  readonly isLoading: boolean;
  readonly isValidating: boolean;
}

export function useDnsLookup(name: string | null): DnsLookupState {
  const v4 = useDnsQuery(name, 1);
  const v6 = useDnsQuery(name, 28);

  return {
    ips: useMemo(() => [...extractIps(1, v4.data), ...extractIps(28, v6.data)], [v4.data, v6.data]),

    get isLoading() {
      return v4.isLoading && v6.isLoading;
    },
    get isValidating() {
      return v4.isValidating || v6.isValidating;
    }
  };
}

function useDnsQuery(name: string | null, type: number) {
  const url = `https://dns.google.com/resolve?type=${type}&name=${name}`;

  if (name) {
    preload(url, { as: 'fetch', crossOrigin: 'anonymous' });
  }

  return useSWR<DnsResponse>(name ? url : null, jsonFetch);
}

function extractIps(type: number, data?: DnsResponse) {
  return pipe$(
    data?.Answer ?? [],
    filter$((ans) => ans.type === type),
    map$((ans) => ans.data),
  );
}
