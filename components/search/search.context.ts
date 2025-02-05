import { createContext } from 'react';

// Context
export const SearchContext = createContext<SearchContextProps>({
  activeOption: null,
  inputValue: '',
  isOpen: false,
  setActiveOption: () => null,
  registerOption: () => null,
  unregisterOption: () => null,
});

// Types
export interface SearchContextProps {
  readonly activeOption: string | null;
  readonly inputValue: string;
  readonly isOpen: boolean;
  readonly setActiveOption: (id: string | null) => void;
  readonly registerOption: (id: string, target: URL) => void;
  readonly unregisterOption: (id: string) => void;
}
