import type { SearchHookState, SearchOption } from '@/components/SearchBox';
import { fetchAnimalTracking } from '@/data/club-ocean';
import { type ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import useSWR from 'swr';

export function useAnimalSearchOptions(inputValue: string): SearchHookState {
  const key = `animal:${inputValue}`;
  const isName = useMemo(() => inputValue.match(/^[a-z]{3,}$/i) !== null, [inputValue]);
  
  const searchParams = useSearchParams();
  const { data, isLoading, isValidating } = useSWR(isName ? key : null, { fetcher: animalFetcher });
  
  const options: SearchOption[] = useMemo(() => data ? [{
    type: 'option',
    key,
    label: inputValue,
    url: buildUrl(inputValue, searchParams),
  }] : [], [data, inputValue, key, searchParams]);

  return {
    options,
    isLoading,
    isValidating,
    isSearching: isName,
  };
}

// Utils
function animalFetcher(key: string) {
  return fetchAnimalTracking(key.slice(7));
}

function buildUrl(inputValue: string, searchParams: ReadonlyURLSearchParams): string {
  const url = new URL(`/animal/${encodeURIComponent(inputValue)}?${searchParams}`, window.location.origin);

  if (inputValue) {
    url.searchParams.set('name', inputValue);
  }

  return url.toString();
}
