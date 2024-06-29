'use client';

import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, IconButton, Paper, styled } from '@mui/material';
import { ChangeEvent, FormEvent, useCallback, useState, useTransition } from 'react';

// Component
export interface SearchBarProps {
  readonly onSearch?: (search: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState('');
  const [isSearching, startTransition] = useTransition();

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onSearch) {
      startTransition(() => {
        onSearch(search);
      });
    }
  }, [search, onSearch]);

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
        <CircularProgress size={32} />
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
