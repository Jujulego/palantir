import type { SearchHookState, SearchOption } from '@/components/SearchBox';
import { useDnsLookup } from '@/hooks/useDnsLookup';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function useDnsSearchOptions(inputValue: string): SearchHookState {
  const searchParams = useSearchParams();
  const isDns = useMemo(() => inputValue.match(/^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/) !== null, [inputValue]);
  const { ips, isLoading, isValidating } = useDnsLookup(isDns ? inputValue : null);

  const options: SearchOption[] = useMemo(() => ips.map((ip) => ({
    type: 'option',
    key: `dns:${ip}`,
    label: ip,
    url: buildUrl(ip, inputValue, searchParams),
  })), [inputValue, ips, searchParams]);

  return {
    options,
    isLoading,
    isValidating,
    isActive: isDns,
  };
}

// Utils
function buildUrl(ip: string, inputValue: string, searchParams: ReadonlyURLSearchParams): string {
  const url = new URL(`/ip/${encodeURIComponent(ip)}?${searchParams}`, window.location.origin);

  if (inputValue) {
    url.searchParams.set('name', inputValue);
  }

  return url.toString();
}
