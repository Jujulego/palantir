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
  const id = useId();
  const listBoxId = `${id}-listbox`;

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
  const router = useRouter();
  const listBoxRef = useRef<HTMLUListElement>(null);
  const [options, setOptions] = useState<OptionTargetRecord>({});

  const registerOption = useCallback((id: string, target: URL) => {
    setOptions((old) => ({ ...old, [id]: target }));
  }, []);

  const unregisterOption = useCallback((id: string) => {
    setOptions(({ [id]: _, ...rest }) => rest);
  }, []);

  const handleSearch = useCallback(() => {
    if (!listBoxRef.current) return;

    const element = listBoxRef.current.querySelector('li[role="option"]:not([aria-disabled])');
    if (!element) return;

    const target = options[element.id];
    if (target) router.push(target.toString());
  }, [options, router]);

  // Render
  const isOpen = _isOpen && !!inputValue;
  const hasOptions = Object.keys(options).length > 0;

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
          { (isOpen && !hasOptions) && <SearchEmptyOption /> }
          { isOpen && children }
        </SearchListBox>
      </SearchContext>
    </SearchSurface>
  );
}

// Utils
type OptionTargetRecord = Partial<Record<string, URL>>;