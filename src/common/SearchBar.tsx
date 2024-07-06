'use client';

import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { styled, type SxProps } from '@mui/material/styles';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { ChangeEvent, FormEvent, useCallback, useDeferredValue, useState, useTransition } from 'react';

import IpTags from '@/src/common/IpTags';
import LocateButton from '@/src/common/LocateButton';

// Component
export interface SearchBarProps {
  readonly sx?: SxProps;
}

export default function SearchBar({ sx }: SearchBarProps) {
  const router = useRouter();
  const searchedIp = useSelectedLayoutSegment();

  const [search, setSearch] = useState(searchedIp ? decodeURIComponent(searchedIp) : '');
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
    <Box sx={sx}>
      <Paper
        component="form" role="search" onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 9999,
          overflow: 'hidden',
          minWidth: '276px'
        }}
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

      <IpTags ip={useDeferredValue(search)} />
    </Box>
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
