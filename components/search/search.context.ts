import { createContext, type ReactNode } from 'react';

// Context
export const SearchContext = createContext<SearchContextProps>({
  inputValue: '',
});

// Types
export interface SearchOption {
  readonly key: string;
  readonly render: ReactNode;
  readonly url: string;
}

export interface SearchContextProps {
  readonly inputValue: string;
  readonly options?: SearchOption[];
}
