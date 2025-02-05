'use client';

import { SearchContext } from '@/components/search/search.context';
import SearchOption from '@/components/search/SearchOption';
import { fetchAnimalTracking } from '@/data/club-ocean';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PetsIcon from '@mui/icons-material/Pets';
import { use, useMemo } from 'react';
import useSWR from 'swr';
import { AnimatePresence } from 'motion/react';

export default function AnimalSearchOptions() {
  const { inputValue } = use(SearchContext);

  const isAnimal = useMemo(() => ANIMAL_RE.test(inputValue), [inputValue]);
  const key = isAnimal ? `animal:${inputValue.toLowerCase()}` : null;

  const { data } = useSWR(key, { fetcher: animalFetcher });

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

function animalFetcher(key: string) {
  return fetchAnimalTracking(key.slice(7));
}
