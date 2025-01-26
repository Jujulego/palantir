import type { SearchHookState, SearchOption } from '@/components/SearchBox';
import ipaddr from 'ipaddr.js';
import { type ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function useIpSearchOptions(inputValue: string): SearchHookState {
  const searchParams = useSearchParams();
  const isIp = useMemo(() => ipaddr.isValid(inputValue), [inputValue]);

  const options: SearchOption[] = useMemo(() => isIp ? [{
    type: 'option',
    key: `ip:${inputValue}`,
    label: inputValue,
    url: buildUrl(inputValue, searchParams),
  }] : [], [inputValue, isIp, searchParams]);

  return {
    options,
    isActive: isIp,
    isLoading: false,
    isValidating: false,
  };
}

// Utils
function buildUrl(inputValue: string, searchParams: ReadonlyURLSearchParams): string {
  const url = new URL(`/ip/${encodeURIComponent(inputValue)}?${searchParams}`, window.location.origin);
  return url.toString();
}
