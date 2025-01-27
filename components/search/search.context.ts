import type { ListData } from '@react-stately/data';
import { createContext, type ReactNode, use } from 'react';

// Context
export const SearchContext = createContext<SearchContextProps>({
  inputValue: '',
});

export function useSearchOptions() {
  const { options } = use(SearchContext);

  if (!options) {
    throw new Error('useSearchOptions must be used inside a SearchContext.');
  }

  return options;
}

// Types
export interface SearchOption {
  readonly key: string;
  readonly render: ReactNode;
  readonly url: string;
}

export interface SearchContextProps {
  readonly inputValue: string;
  readonly options?: ListData<SearchOption>;
}
