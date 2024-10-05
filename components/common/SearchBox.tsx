'use client';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ipaddr from 'ipaddr.js';
import { type ChangeEvent, type FormEvent, useCallback, useEffect, useMemo, useState, useTransition } from 'react';

// Component
export interface SearchBarProps {
  readonly value?: string;
  readonly onClear: () => void;
  readonly onSearch: (value: string) => void;
}

export default function SearchBox({ value, onClear, onSearch }: SearchBarProps) {
  const [isSearching, startSearch] = useTransition();
  const [search, setSearch] = useState(value ?? '');
  const isValid = useMemo(() => ipaddr.isValid(search), [search]);

  useEffect(() => {
    setSearch(value ?? '');
  }, [value]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const handleClear = useCallback(() => {
    onClear();
    setSearch('');
  }, [onClear]);

  const handleSearch = useCallback((event: FormEvent) => {
    event.preventDefault();
    startSearch(() => onSearch(search));
  }, [search, onSearch]);

  // Render
  return (
    <Paper component="form" role="search" elevation={2} onSubmit={handleSearch} sx={{ display: 'flex', borderRadius: 9999 }}>
      <SearchInput
        type="search" placeholder="Adresse IP" required
        value={search} onChange={handleChange}
      />

      <Grow in={!!search}>
        <IconButton
          color="inherit"
          aria-label="Clear"
          type="reset"
          onClick={handleClear}
          sx={{ flex: '0 0 auto', m: 0.5 }}
        >
          <ClearIcon />
        </IconButton>
      </Grow>

      { isSearching ? (
        <CircularProgress size={24} sx={{ m: 1.5, flex: '0 0 auto' }} />
      ) : (
        <IconButton
          color="inherit" disabled={!isValid}
          aria-label="Search"
          type="submit"
          sx={{ flex: '0 0 auto', m: 0.5 }}
        >
          <SearchIcon />
        </IconButton>
      ) }
    </Paper>
  );
}

// Utils
const SearchInput = styled('input')(({ theme }) => ({
  width: 288,
  flex: '0 0 auto',
  paddingLeft: theme.spacing(2.5),
  paddingTop: theme.spacing(0.5),
  paddingRight: 0,
  paddingBottom: theme.spacing(0.5),
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  '&::-webkit-search-cancel-button': {
    '-webkit-appearance': 'none',
  }
}));
