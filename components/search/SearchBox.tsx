'use client';

import { SearchContext } from '@/components/search/search.context';
import { SearchComboBox } from '@/components/search/SearchComboBox';
import SearchEmptyOption from '@/components/search/SearchEmptyOption';
import SearchListBox from '@/components/search/SearchListBox';
import SearchSurface from '@/components/search/SearchSurface';
import { useSearchParam } from '@/hooks/useSearchParam';
import { mergeSx } from '@/utils/mui';
import Fade from '@mui/material/Fade';
import LinearProgress from '@mui/material/LinearProgress';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import { AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { type ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

// Component
export interface SearchProviderProps {
  readonly children?: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function SearchBox({ children, sx }: SearchProviderProps) {
  const router = useRouter();

  const id = useId();
  const listBoxId = `${id}listbox`;
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

  // Loading state
  const loadingKeys = useRef(new Set<string>());
  const [isLoading, setIsLoading] = useState(false);

  const markLoading = useCallback((id: string) => {
    loadingKeys.current.add(id);
    setIsLoading(true);
  }, []);

  const markLoaded = useCallback((id: string) => {
    loadingKeys.current.delete(id);
    setIsLoading(loadingKeys.current.size > 0);
  }, []);

  // Options
  const optionsRef = useRef<OptionsRecord>({});
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const registerOption = useCallback((id: string, target: URL) => {
    optionsRef.current[id] = target;
    setIsEmpty(false);
  }, []);

  const unregisterOption = useCallback((id: string) => {
    delete optionsRef.current[id];
    setActiveOption((old) => old === id ? null : old);
    setIsEmpty(Object.keys(optionsRef.current).length === 0);
  }, []);

  const handleFocusDown = useCallback(() => {
    setActiveOption((activeOption) => {
      let option: Element | null = null;

      if (activeOption) {
        option = getNextOption(activeOption);
      }

      if (!option && listBoxRef.current) {
        option = getFirstOption(listBoxRef.current);
      }

      return option?.id ?? null;
    });
  }, []);

  const handleFocusUp = useCallback(() => {
    setActiveOption((activeOption) => {
      let option: Element | null = null;

      if (activeOption) {
        option = getPreviousOption(activeOption);
      }

      if (!option && listBoxRef.current) {
        option = getLastOption(listBoxRef.current);
      }

      return option?.id ?? null;
    });
  }, []);

  const handleSearch = useCallback(() => {
    if (!listBoxRef.current) return;

    const option = getFirstOption(listBoxRef.current);
    if (!option) return;

    const target = optionsRef.current[option.id];
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
        inputValue={inputValue}
        isOpen={isOpen}

        activeOptionId={activeOption}
        listBoxId={listBoxId}

        onClose={handleClose}
        onFocusDown={handleFocusDown}
        onFocusUp={handleFocusUp}
        onInputChange={setInputValue}
        onSearch={handleSearch}
        onOpen={handleOpen}

        sx={{ height: 48, zIndex: 10 }}
      />

      <SearchListBoxContainer>
        { isOpen && (
          <Fade in={isLoading}>
            <LinearProgress color="primary" sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4 }} />
          </Fade>
        ) }

        <SearchContext
          value={{
            activeOption,
            inputValue,
            isOpen,
            markLoading,
            markLoaded,
            registerOption,
            setActiveOption,
            unregisterOption,
          }}
        >
          <SearchListBox ref={listBoxRef} listBoxId={listBoxId}>
            <AnimatePresence>
              { isOpen && isEmpty && <SearchEmptyOption /> }
            </AnimatePresence>

            { children }
          </SearchListBox>
        </SearchContext>
      </SearchListBoxContainer>
    </SearchSurface>
  );
}

// Elements
const SearchListBoxContainer = styled('div')({
  position: 'relative',
});

// Utils
type OptionsRecord = Partial<Record<string, URL>>;

function isEnabledOption(element: Element): boolean {
  return element.role === 'option' && element.ariaDisabled !== 'false';
}

function getFirstOption(listBox: HTMLUListElement): Element | null {
  return findOption(listBox.firstElementChild, 'previousElementSibling');
}

function getLastOption(listBox: HTMLUListElement): Element | null {
  return findOption(listBox.lastElementChild, 'previousElementSibling');
}

function getNextOption(activeId: string): Element | null {
  return findOption(document.getElementById(activeId)?.nextElementSibling ?? null, 'nextElementSibling');
}

function getPreviousOption(activeId: string): Element | null {
  return findOption(document.getElementById(activeId)?.previousElementSibling ?? null, 'previousElementSibling');
}

function findOption(element: Element | null, nextKey: 'nextElementSibling' | 'previousElementSibling') {
  while (element) {
    if (isEnabledOption(element)) {
      return element;
    }

    element = element[nextKey];
  }

  return null;
}
