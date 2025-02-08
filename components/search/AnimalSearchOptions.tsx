'use client';

import { SearchContext, useLoadingSearchOptions } from '@/components/search/search.context';
import SearchOption from '@/components/search/SearchOption';
import { fetchAnimalTracking } from '@/data/club-ocean';
import PetsIcon from '@mui/icons-material/Pets';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AnimatePresence } from 'motion/react';
import { use } from 'react';
import useSWR from 'swr';

// Component
export default function AnimalSearchOptions() {
  const { inputValue } = use(SearchContext);

  const { data, isValidating } = useSWR(
    ANIMAL_RE.test(inputValue)
      ? ['animal', inputValue.toLowerCase()]
      : null,
    { fetcher: animalFetcher }
  );
  useLoadingSearchOptions(isValidating);

  return (
    <AnimatePresence>
      { data && (
        <SearchOption href={`/animal/${inputValue}`}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <PetsIcon color="inherit" />
          </ListItemIcon>
          <ListItemText primary={inputValue} />
        </SearchOption>
      ) }
    </AnimatePresence>
  );
}

// Utils
const ANIMAL_RE = /^[a-z]{3,}$/i;

type AnimalKey = readonly ['animal', string];

function animalFetcher([, name]: AnimalKey) {
  return fetchAnimalTracking(name);
}
