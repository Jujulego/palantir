'use client';

import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, IconButton, Paper, styled, SxProps } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useCallback, useState, useTransition } from 'react';

// Component
export interface SearchBarProps {
  readonly sx?: SxProps;
}

export default function SearchBar({ sx }: SearchBarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get('ip') ?? '');
  const [isSearching, startTransition] = useTransition();

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
      sx={[{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 9999,
        overflow: 'hidden'
      }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <SearchInput
        type="search" placeholder="Adresse IP" required
        value={search} onChange={handleChange}
      />

      { isSearching ? (
        <CircularProgress size={24} sx={{ ml: 2, my: 1.5, mr: 1.5, flex: '0 0 auto' }} />
      ) : (
        <IconButton
          color="inherit" type="submit" disabled={!search}
          aria-label="Search"
          sx={{ ml: 1, my: 0.5, mr: 0.5, flex: '0 0 auto' }}
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
