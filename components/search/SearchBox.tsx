'use client';

import { SearchContext } from '@/components/search/search.context';
import { SearchComboBox } from '@/components/search/SearchComboBox';
import SearchListBox from '@/components/search/SearchListBox';
import SearchSurface from '@/components/search/SearchSurface';
import { useSearchParam } from '@/hooks/useSearchParam';
import { mergeSx } from '@/utils/mui';
import type { SxProps, Theme } from '@mui/material/styles';
import { type ReactNode, useCallback, useEffect, useId, useState } from 'react';

// Component
export interface SearchProviderProps {
  readonly children?: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function SearchBox({ children, sx }: SearchProviderProps) {
  const id = useId();
  const listBoxId = `${id}-listbox`;

  // Open state
  const [_isOpen, setIsOpen] = useState(false);
  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  // Input state
  const [searchParam, setSearchParam] = useSearchParam('search');
  const [inputValue, setInputValue] = useState(searchParam ?? '');

  useEffect(() => {
    setInputValue(searchParam ?? '');
  }, [searchParam]);

  useEffect(() => {
    const id = setTimeout(() => setSearchParam(inputValue), 250);
    return () => clearTimeout(id);
  }, [inputValue, setSearchParam]);

  // Render
  const isOpen = _isOpen && !!inputValue;

  return (
    <SearchSurface
      isOpen={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      sx={mergeSx(sx, { height: 48 })}
    >
      <SearchComboBox
        isOpen={isOpen}
        inputValue={inputValue}
        listBoxId={listBoxId}
        onInputChange={setInputValue}
        sx={{ height: 48 }}
      />

      <SearchContext value={{ inputValue }}>
        <SearchListBox isOpen={isOpen} listBoxId={listBoxId}>
          { children }
        </SearchListBox>
      </SearchContext>
    </SearchSurface>
  );
}
