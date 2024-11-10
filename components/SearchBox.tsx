'use client';

import { SearchDnsMenu } from '@/components/SearchDnsMenu';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Collapse } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useFocusWithin } from '@react-aria/interactions';
import ipaddr from 'ipaddr.js';
import { useRouter, useSearchParams, useSelectedLayoutSegments } from 'next/navigation';
import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition
} from 'react';

// Component
export default function SearchBox() {
  const router = useRouter();

  const segments = useSelectedLayoutSegments();
  const searchParams = useSearchParams();
  const selectedIp = decodeURIComponent(segments[1] ?? '');

  const [isSearching, startSearch] = useTransition();

  const urlSearch = searchParams.get('search') || selectedIp;
  const [search, setSearch] = useState(urlSearch ?? '');

  const isIp = useMemo(() => ipaddr.isValid(search), [search]);
  const isDns = useMemo(() => search.match(/^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/) !== null, [search]);

  const [hasFocus, setHasFocus] = useState(false);
  const { focusWithinProps } = useFocusWithin({
    onFocusWithin: () => setHasFocus(true),
    //onBlurWithin: () => setHasFocus(false),
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!hasFocus && isDns) {
      inputRef.current!.focus();
    }
  }, [hasFocus, isDns, urlSearch]);

  useEffect(() => {
    setSearch(urlSearch ?? '');
  }, [urlSearch]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const handleClear = useCallback(() => {
    router.push('/');
    setSearch('');
  }, [router]);

  const handleSearch = useCallback((ip: string, search?: string) => {
    startSearch(() => {
      const parts = segments.length ? [...segments] : ['ip', '', 'ip-info'];
      parts[1] = encodeURIComponent(ip);

      const url = new URL(`/${parts.join('/')}`, window.location.origin);

      if (search) {
        url.searchParams.set('search', search);
      }

      router.push(url.toString());
    });
  }, [segments, router]);

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    handleSearch(search);
  }, [handleSearch, search]);

  const handleSelect = useCallback((ip: string) => handleSearch(ip, search), [handleSearch, search]);

  // Render
  return (
    <Box sx={{ position: 'relative', height: 48, width: 384 }}>
      <Paper
        component="form" role="search"
        elevation={2}
        onSubmit={handleSubmit} {...focusWithinProps}
        sx={{
          position: 'absolute',
          borderRadius: hasFocus && isDns ? 4 : 6,
          overflow: 'hidden',
          transition: ({ transitions }) => transitions.create('border-radius')
        }}
      >
        <Box sx={{ display: 'flex', boxShadow: 1 }}>
          <SearchInput
            ref={inputRef}
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
              color="inherit" disabled={!isIp}
              aria-label="Search"
              type="submit"
              sx={{ flex: '0 0 auto', m: 0.5 }}
            >
              <SearchIcon />
            </IconButton>
          ) }
        </Box>

        <Collapse in={hasFocus && isDns} unmountOnExit>
          <SearchDnsMenu name={search} selectedIp={selectedIp} onSelect={handleSelect} />
        </Collapse>
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
