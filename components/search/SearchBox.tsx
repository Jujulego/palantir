'use client';

import { SearchContext } from '@/components/search/search.context';
import { SearchComboBox } from '@/components/search/SearchComboBox';
import SearchListBox from '@/components/search/SearchListBox';
import SearchSurface from '@/components/search/SearchSurface';
import { useSearchParam } from '@/hooks/useSearchParam';
import { mergeSx } from '@/utils/mui';
import type { SxProps, Theme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { type ReactNode, useCallback, useEffect, useId, useRef, useState } from 'react';

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

  // Options
  const router = useRouter();
  const listBoxRef = useRef<HTMLUListElement>(null);

  const handleSearch = useCallback(() => {
    if (!listBoxRef.current) return;

    const option = listBoxRef.current.querySelector('li[role="option"]:not([aria-disabled])');
    if (!option) return;

    console.log(option);
    router.push(option.getAttribute('data-target')!);
  }, [router]);

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
        onSearch={handleSearch}
        sx={{ height: 48 }}
      />

      <SearchContext value={{ inputValue }}>
        <SearchListBox ref={listBoxRef} isOpen={isOpen} listBoxId={listBoxId}>
          { children }
        </SearchListBox>
      </SearchContext>
    </SearchSurface>
  );
}
