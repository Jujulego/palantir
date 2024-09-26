'use client';

import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import ipaddr from 'ipaddr.js';
import { type ChangeEvent, type FormEvent, useCallback, useEffect, useMemo, useState, useTransition } from 'react';

// Component
export interface SearchBarProps {
  readonly value?: string;
  readonly onSearch: (value: string) => void;
  readonly sx?: SxProps<Theme>;
}

export default function SearchBox({ value, onSearch, sx }: SearchBarProps) {
  const [isSearching, startSearch] = useTransition();
  const [search, setSearch] = useState(value ?? '');
  const isValid = useMemo(() => ipaddr.isValid(search), [search]);

  useEffect(() => {
    setSearch(value ?? '');
  }, [value]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const handleLocate = useCallback((value: string) => {
    setSearch(value);
    startSearch(() => onSearch(value));
  }, [onSearch]);

  const handleSearch = useCallback(() => {
    startSearch(() => onSearch(search));
  }, [search, onSearch]);

  // Render
  return (
    <SearchForm sx={sx}>
      <SearchInput
        type="search" placeholder="Adresse IP" required
        value={search} onChange={handleChange}
      />

      { isSearching ? (
        <CircularProgress size={24} sx={{ m: 1, flex: '0 0 auto' }} />
      ) : (
        <IconButton
          color="inherit" disabled={!isValid}
          aria-label="Search"
          onClick={handleSearch}
          sx={{ flex: '0 0 auto' }}
        >
          <SearchIcon />
        </IconButton>
      ) }
    </SearchForm>
  );
}

// Utils
const SearchForm = styled('search')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
}));

const SearchInput = styled('input')(({ theme }) => ({
  height: 40,
  width: 246,
  flex: '0 0 auto',
  paddingLeft: theme.spacing(2.5),
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
}));