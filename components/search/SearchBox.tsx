'use client';

import { SearchContext } from '@/components/search/search.context';
import { SearchComboBox } from '@/components/search/SearchComboBox';
import SearchEmptyOption from '@/components/search/SearchEmptyOption';
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
  const router = useRouter();

  const id = useId();
  const listBoxId = `${id}-listbox`;
  const listBoxRef = useRef<HTMLUListElement>(null);

  // Open state
  const [_isOpen, setIsOpen] = useState(false);
  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  // Input state
  const [searchParam, _] = useSearchParam('search');
  const [inputValue, setInputValue] = useState(searchParam ?? '');

  useEffect(() => {
    setInputValue(searchParam ?? '');
  }, [searchParam]);

  // Options
  const optionsRef = useRef<OptionsRecord>({});
  const [isEmpty, setIsEmpty] = useState(false);

  const registerOption = useCallback((id: string, target: URL) => {
    optionsRef.current[id] = target;
    setIsEmpty(false);
  }, []);

  const unregisterOption = useCallback((id: string) => {
    delete optionsRef.current[id];
    setIsEmpty(Object.keys(optionsRef.current).length === 0);
  }, []);

  const handleSearch = useCallback(() => {
    if (!listBoxRef.current) return;

    const element = listBoxRef.current.querySelector('li[role="option"]:not([aria-disabled])');
    if (!element) return;

    const target = optionsRef.current[element.id];
    if (target) router.push(target.toString());
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

      <SearchContext value={{ inputValue, registerOption, unregisterOption }}>
        <SearchListBox ref={listBoxRef} listBoxId={listBoxId}>
          { isOpen && isEmpty && <SearchEmptyOption /> }
          { isOpen && children }
        </SearchListBox>
      </SearchContext>
    </SearchSurface>
  );
}

// Utils
type OptionsRecord = Partial<Record<string, URL>>;