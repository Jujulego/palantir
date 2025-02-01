'use client';

import { SearchContext } from '@/components/search/search.context';
import { SearchComboBox } from '@/components/search/SearchComboBox';
import SearchSurface from '@/components/search/SearchSurface';
import { mergeSx } from '@/utils/mui';
import type { SxProps, Theme } from '@mui/material/styles';
import { type ReactNode, useCallback, useState } from 'react';

// Component
export interface SearchProviderProps {
  readonly children?: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function SearchBox({ children, sx }: SearchProviderProps) {
  const [inputValue, setInputValue] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <SearchSurface
      isOpen={isOpen}
      onClose={handleClose}
      sx={mergeSx(sx, { height: 48 })}
    >
      <SearchComboBox
        inputValue={inputValue}
        onInputChange={setInputValue}
        sx={{ height: 48 }}
      />

      <SearchContext value={{ inputValue }}>
        { children }
      </SearchContext>
    </SearchSurface>
  );
}
