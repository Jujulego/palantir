import type { DnsResponse } from '@/data/dns';
import { jsonFetcher } from '@/utils/fetch';
import ipaddr from 'ipaddr.js';
import { collect$, filter$, map$, pipe$ } from 'kyrielle';
import { useMemo } from 'react';
import useSWR from 'swr';

export interface DnsLookupState {
  readonly ips: readonly string[];
  readonly isLoading: boolean;
  readonly isValidating: boolean;
}

export function useDnsLookup(dns: string): DnsLookupState {
  const { data, isLoading, isValidating } = useSWR<DnsResponse>(`https://dns.google.com/resolve?type=1&name=${dns}`, jsonFetcher);

  return {
    ips: useMemo(() => extractIps(data), [data]),
    isLoading, isValidating
  };
}

export function useDnsLookupV6(dns: string): DnsLookupState {
  const { data, isLoading, isValidating } = useSWR<DnsResponse>(`https://dns.google.com/resolve?type=28&name=${dns}`, jsonFetcher);

  return {
    ips: useMemo(() => extractIps(data), [data]),
    isLoading, isValidating
  };
}

function extractIps(data?: DnsResponse): string[] {
  return pipe$(
    data?.Answer ?? [],
    map$((ans) => ans.data),
    filter$((val) => ipaddr.isValid(val)),
    collect$()
  );
}