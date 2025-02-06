import { createContext, use, useEffect, useId } from 'react';

// Context
export const SearchContext = createContext<SearchContextProps>({
  activeOption: null,
  inputValue: '',
  isOpen: false,
  markLoading: () => null,
  markLoaded: () => null,
  registerOption: () => null,
  search: () => null,
  setActiveOption: () => null,
  unregisterOption: () => null,
});

// Types
export interface SearchContextProps {
  readonly activeOption: string | null;
  readonly inputValue: string;
  readonly isOpen: boolean;
  readonly markLoading: (id: string) => void;
  readonly markLoaded: (id: string) => void;
  readonly registerOption: (id: string, target: URL) => void;
  readonly search: (url: URL) => void;
  readonly setActiveOption: (id: string | null) => void;
  readonly unregisterOption: (id: string) => void;
}

// Hooks
export function useLoadingSearchOptions(isLoading: boolean) {
  const id = useId();
  const { markLoading, markLoaded } = use(SearchContext);

  useEffect(() => {
    if (isLoading) {
      markLoading(id);
      return () => markLoaded(id);
    }
  }, [id, isLoading, markLoaded, markLoading]);
}