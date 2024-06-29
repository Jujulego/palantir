'use client';

import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, IconButton, Paper, styled } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState, useTransition } from 'react';

// Component
export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [isSearching, startTransition] = useTransition();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const ip = searchParams.get('ip');

    if (ip) {
      setSearch(ip);
    }
  }, []);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(() => {
      router.push(`${pathname}?ip=${search}`);
    });
  }, [search, pathname, router]);

  return (
    <Paper
      component="form" role="search" onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '9999px',
        overflow: 'hidden'
      }}
    >
      <SearchInput
        type="search" placeholder="Adresse IP" required
        value={search} onChange={handleChange}
      />

      { isSearching ? (
        <CircularProgress size={32} sx={{ m: 1 }} />
      ) : (
        <IconButton type="submit" sx={{ ml: 1, my: 0.5, mr: 0.5 }} disabled={!search}>
          <SearchIcon />
        </IconButton>
      ) }
    </Paper>
  );
}

// Utils
const SearchInput = styled('input')(({ theme }) => ({
    border: 'none',
    outline: 'none',
    paddingLeft: theme.spacing(2.5),
}));
