import type { SearchHookState } from '@/components/SearchBox';
import { collect$, flat$, map$, pipe$ } from 'kyrielle';
import { useMemo } from 'react';

export function useSearchOptions(...states: SearchHookState[]): SearchHookState {
  return {
    options: useMemo(() => pipe$(
      states,
      map$(({ options }) => options),
      flat$(),
      collect$()
    ), [states]),
    isActive: states.reduce((acc, { isActive }) => acc || isActive, false),
    isLoading: states.reduce((acc, { isLoading }) => acc || isLoading, false),
    isValidating: states.reduce((acc, { isValidating }) => acc || isValidating, false),
  };
}