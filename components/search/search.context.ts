import { createContext } from 'react';

// Context
export const SearchContext = createContext<SearchContextProps>({
  inputValue: '',
  registerOption: () => null,
  unregisterOption: () => null,
});

// Types
export interface SearchContextProps {
  readonly inputValue: string;
  readonly registerOption: (id: string, target: URL) => void;
  readonly unregisterOption: (id: string) => void;
}
