'use client';

import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import ipaddr from 'ipaddr.js';
import { type ChangeEvent, type FormEvent, useCallback, useEffect, useMemo, useState, useTransition } from 'react';

// Component
export interface SearchBarProps {
  readonly value?: string;
  readonly onSearch: (value: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBarProps) {
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
    <Paper component="search" sx={{ display: 'flex', borderRadius: 9999 }}>
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
  width: 246,
  flex: '0 0 auto',
  paddingLeft: theme.spacing(2.5),
  paddingTop: theme.spacing(0.5),
  paddingRight: 0,
  paddingBottom: theme.spacing(0.5),
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
}));