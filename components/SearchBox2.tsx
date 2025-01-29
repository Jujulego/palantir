'use client';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import type { CollectionChildren } from '@react-types/shared';
import { m } from 'motion/react';
import { useRef } from 'react';
import { useComboBox, useListBox, useOption } from 'react-aria';
import { type ListState, type Node, useComboBoxState } from 'react-stately';

// Component
export interface SearchBox2Props {
  readonly children?: CollectionChildren<object>;
}

export default function SearchBox2({ children }: SearchBox2Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const state = useComboBoxState({
    label: 'Search',
    children,
    defaultFilter: all
  });

  const { inputProps, listBoxProps: _listBoxProps } = useComboBox({
    label: 'Search',
    inputRef,
    listBoxRef,
    popoverRef,
  }, state);

  const { listBoxProps } = useListBox(_listBoxProps, state, listBoxRef);

  // Render
  return (
    <SearchBoxPlaceholder>
      <SearchBoxForm
        role="search"
        initial={{ borderRadius: 24 }}
        animate={{
          borderRadius: state.isOpen ? 16 : 24,
        }}
      >
        <SearchBoxOuter>
          <SearchBoxInput ref={inputRef} {...inputProps} />

          { state.inputValue && (
            <IconButton
              color="inherit"
              type="button"
              aria-label="Clear"
              sx={{ flex: '0 0 auto', m: 0.5 }}
            >
              <ClearIcon />
            </IconButton>
          ) }

          <IconButton
            color="inherit"
            type="submit"
            aria-label="Search"
            sx={{ flex: '0 0 auto', m: 0.5 }}
          >
            <SearchIcon />
          </IconButton>
        </SearchBoxOuter>

        { state.isOpen && (
          <ul ref={listBoxRef} {...listBoxProps}>
            { [...state.collection].map((item) => (
              <SearchBoxOption key={item.key} item={item} state={state} />
            )) }
          </ul>
        ) }
      </SearchBoxForm>
    </SearchBoxPlaceholder>
  );
}

// UI
const SearchBoxPlaceholder = styled('div')({
  position: 'relative',
  height: 48,
  width: 384,
});

const SearchBoxForm = styled(m.div)({
  position: 'absolute',
  width: '100%',
  overflow: 'hidden',

  backgroundColor: 'var(--mui-palette-background-paper)',
  backgroundImage: 'var(--mui-overlays-2)',
  boxShadow: 'var(--mui-shadows-2)',
  color: 'var(--mui-palette-text-primary)',
});

const SearchBoxOuter = styled('div')({
  display: 'flex',
  boxShadow: 'var(--mui-shadows-1)',
});

const SearchBoxInput = styled('input')(({ theme }) => ({
  flex: '1 0 auto',

  paddingLeft: theme.spacing(2.5),
  paddingTop: theme.spacing(0.5),
  paddingRight: 0,
  paddingBottom: theme.spacing(0.5),

  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',

  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.fontSize,

  '&::-webkit-search-cancel-button': {
    'WebkitAppearance': 'none',
  }
}));

interface SearchBoxOptionProps {
  readonly item: Node<unknown>;
  readonly state: ListState<unknown>;
}

function SearchBoxOption({ item, state }: SearchBoxOptionProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps } = useOption({ key: item.key }, state, ref);

  return (
    <li {...optionProps} ref={ref}>{ item.rendered }</li>
  );
}

// Utils
function all() {
  return true;
}
