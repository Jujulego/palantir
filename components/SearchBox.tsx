'use client';

import { DnsLookupItems } from '@/components/DnsLookupItems';
import { useDebounced } from '@/hooks/useDebounced';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ipaddr from 'ipaddr.js';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import { type ChangeEvent, type FormEvent, useCallback, useEffect, useMemo, useState, useTransition } from 'react';

// Component
export default function SearchBox() {
  const router = useRouter();

  const segments = useSelectedLayoutSegments();
  const value = useMemo(() => segments[1] && decodeURIComponent(segments[1]), [segments]);
  const [isSearching, startSearch] = useTransition();

  const [search, setSearch] = useState(value ?? '');
  const dns = useDebounced(search, 300);

  const isValid = useMemo(() => ipaddr.isValid(search), [search]);
  const hasMenu = useMemo(() => !isValid && dns, [dns, isValid]);

  useEffect(() => {
    setSearch(value ?? '');
  }, [value]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const handleClear = useCallback(() => {
    router.push('/');
    setSearch('');
  }, [router]);

  const handleSearch = useCallback((ip: string) => {
    startSearch(() => {
      const parts = segments.length ? [...segments] : ['ip', '', 'ip-info'];
      parts[1] = encodeURIComponent(ip);

      router.push(`/${parts.join('/')}`);
    });
  }, [segments, router]);

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    handleSearch(search);
  }, [handleSearch, search]);

  const handleSelect = useCallback((ip: string) => {
    setSearch(ip);
    handleSearch(ip);
  }, [handleSearch]);

  // Render
  return (
    <Box sx={{ position: 'relative', height: 48, width: 384 }}>
      <Paper component="form" role="search" elevation={2} onSubmit={handleSubmit} sx={{ position: 'absolute', borderRadius: hasMenu ? 4 : 6, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex' }}>
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
        </Box>

        { hasMenu && <>
          <Divider />

          <DnsLookupItems dns={dns} onSelect={handleSelect} />
        </> }
      </Paper>
    </Box>
  );
}

// Utils
const SearchInput = styled('input')(({ theme }) => ({
  width: 288,
  flex: '0 0 auto',
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.fontSize,
  paddingLeft: theme.spacing(2.5),
  paddingTop: theme.spacing(0.5),
  paddingRight: 0,
  paddingBottom: theme.spacing(0.5),
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  '&::-webkit-search-cancel-button': {
    'WebkitAppearance': 'none',
  }
}));
