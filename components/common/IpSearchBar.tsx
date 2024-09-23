'use client';

import IpLocateButton from '@/components/common/IpLocateButton';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { styled, type SxProps } from '@mui/material/styles';
import ipaddr from 'ipaddr.js';
import { type ChangeEvent, type FormEvent, useCallback, useEffect, useMemo, useState, useTransition } from 'react';

// Component
export interface IpSearchBarProps {
  readonly ip?: string;
  readonly sx?: SxProps;
  readonly onSearch: (ip: string) => void;
}

export default function IpSearchBar({ ip, sx, onSearch }: IpSearchBarProps) {
  const [isSearching, startSearch] = useTransition();
  const [search, setSearch] = useState(ip ?? '');
  const isValid = useMemo(() => ipaddr.isValid(search), [search]);

  useEffect(() => {
    setSearch(ip ?? '');
  }, [ip]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const handleSearch = useCallback((ip: string) => {
    startSearch(() => onSearch(ip));
  }, [onSearch]);

  const handleLocate = useCallback((ip: string) => {
    setSearch(ip);
    handleSearch(ip);
  }, [search, handleSearch]);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(search);
  }, [search, handleSearch]);

  // Render
  return (
    <SearchForm sx={sx} onSubmit={handleSubmit}>
      <SearchInput
        type="search" placeholder="Adresse IP" required
        value={search} onChange={handleChange}
      />

      <IpLocateButton onLocate={handleLocate} />

      { isSearching ? (
        <CircularProgress size={24} sx={{ m: 1, flex: '0 0 auto' }} />
      ) : (
        <IconButton
          color="inherit" type="submit" disabled={!isValid}
          aria-label="Search"
          sx={{ flex: '0 0 auto' }}
        >
          <SearchIcon />
        </IconButton>
      ) }
    </SearchForm>
  );
}

// Utils
const SearchForm = styled('form')(({ theme }) => ({
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
