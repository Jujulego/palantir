'use client';

import { SearchContext, useLoadingSearchOptions } from '@/components/search/search.context';
import SearchOption from '@/components/search/SearchOption';
import { actScrapAnimalTracking } from '@/lib/animal/club-ocean.actions';
import PetsIcon from '@mui/icons-material/Pets';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AnimatePresence } from 'motion/react';
import { use } from 'react';
import useSWR from 'swr';

// Component
export default function AnimalSearchOptions() {
  const { inputValue: _inputValue } = use(SearchContext);
  const inputValue = _inputValue.toLowerCase();

  const { data, isValidating } = useSWR(
    ANIMAL_RE.test(inputValue)
      ? ['animal', inputValue]
      : null,
    { fetcher: animalFetcher }
  );
  useLoadingSearchOptions(isValidating);

  return (
    <AnimatePresence>
      { data && (
        <SearchOption href={`/animal/${inputValue}`}>
          <ListItemIcon>
            <PetsIcon color="inherit" />
          </ListItemIcon>
          <ListItemText
            primary={inputValue}
            slotProps={{
              primary: {
                sx: { textTransform: 'capitalize' }
              }
            }}
          />
        </SearchOption>
      ) }
    </AnimatePresence>
  );
}

// Utils
const ANIMAL_RE = /^[a-z]{3,}$/;

type AnimalKey = readonly ['animal', string];

function animalFetcher([, name]: AnimalKey) {
  return actScrapAnimalTracking(name);
}
