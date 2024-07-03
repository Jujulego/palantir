'use client';

import LocateButton from '@/src/common/LocateButton';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, IconButton, Paper, styled, SxProps } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState, useTransition } from 'react';

// Component
export interface SearchBarProps {
  readonly sx?: SxProps;
}

export default function SearchBar({ sx }: SearchBarProps) {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [isSearching, startTransition] = useTransition();

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const handleSearch = useCallback((ip: string) => {
    startTransition(() => {
      router.push(`/locate/${encodeURIComponent(ip)}`);
    });
  }, [router]);

  const handleLocate = useCallback((ip: string) => {
    setSearch(ip);
    handleSearch(ip);
  }, [handleSearch]);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(search);
  }, [search, handleSearch]);

  return (
    <Paper
      component="form" role="search" onSubmit={handleSubmit}
      sx={[{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 9999,
        overflow: 'hidden',
        minWidth: '276px'
      }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <SearchInput
        type="search" placeholder="Adresse IP" required
        value={search} onChange={handleChange}
      />

      <LocateButton sx={{ ml: 1, my: 0.5, flex: '0 0 auto' }} onClick={handleLocate} />

      { isSearching ? (
        <CircularProgress size={24} sx={{ m: 1.5, flex: '0 0 auto' }} />
      ) : (
        <IconButton
          color="inherit" type="submit" disabled={!search}
          aria-label="Search"
          sx={{ m: 0.5, flex: '0 0 auto' }}
        >
          <SearchIcon />
        </IconButton>
      ) }
    </Paper>
  );
}

// Utils
const SearchInput = styled('input')(({ theme }) => ({
  flex: 1,
  height: '100%',
  paddingLeft: theme.spacing(2.5),
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
}));
