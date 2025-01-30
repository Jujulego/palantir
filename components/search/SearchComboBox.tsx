import type { SearchOption } from '@/components/search/search.context';
import SearchInputBar from '@/components/search/SearchInputBar';
import SearchSurface from '@/components/search/SearchSurface';
import { mergeSx } from '@/utils/mui';
import { type SxProps, type Theme } from '@mui/material/styles';
import { useComboBox } from '@react-aria/combobox';
import { useComboBoxState } from '@react-stately/combobox';
import { useRef } from 'react';

// Component
export interface SearchComboBoxProps {
  readonly inputValue: string;
  readonly onInputChange: (value: string) => void;
  readonly options: readonly SearchOption[];
  readonly sx?: SxProps<Theme>;
}

export function SearchComboBox({ inputValue, onInputChange, options, sx }: SearchComboBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const listBoxRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Combo box state
  const state = useComboBoxState({
    allowsEmptyCollection: true,
    items: options,
    inputValue,
    onInputChange
  });

  const { inputProps } = useComboBox({
    inputRef,
    listBoxRef,
    popoverRef,

    'aria-label': 'Search',
    placeholder: 'Search',
  }, state);

  // Render
  return (
    <SearchSurface
      isOpen={state.isOpen}
      onClose={state.close}
      sx={mergeSx(sx, { height: 48 })}
    >
      <SearchInputBar
        inputRef={inputRef}
        inputProps={inputProps}

        sx={{ height: 48 }}
      />
    </SearchSurface>
  );
}