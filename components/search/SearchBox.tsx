'use client';

import { SearchContext, type SearchOption } from '@/components/search/search.context';
import { SearchComboBox } from '@/components/search/SearchComboBox';
import type { SxProps, Theme } from '@mui/material/styles';
import { useListData } from '@react-stately/data';
import { type ReactNode, useState } from 'react';

// Component
export interface SearchProviderProps {
  readonly children?: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function SearchBox({ children, sx }: SearchProviderProps) {
  const [inputValue, setInputValue] = useState('');
  const options = useListData<SearchOption>({
    initialItems: [],
    getKey: getOptionKey
  });

  return (
    <SearchContext value={{ inputValue, options }}>
      <SearchComboBox sx={sx} />
      {children}
    </SearchContext>
  );
}

// Utils
export function getOptionKey(option: SearchOption) {
  return option.key;
}