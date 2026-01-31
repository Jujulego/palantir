'use client';

import { SearchContext, useLoadingSearchOptions } from '@/components/search/search.context';
import SearchOption from '@/components/search/SearchOption';
import { actScrapAnimalTracking } from '@/lib/animal/club-ocean.actions';
import { ANIMAL_NAME_REGEX } from '@/lib/animal/constants';
import PetsIcon from '@mui/icons-material/Pets';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { use } from 'react';
import useSWR from 'swr';

// Component
export default function AnimalSearchOptions() {
  const { inputValue: _inputValue } = use(SearchContext);
  const inputValue = _inputValue.toLowerCase();

  const { data, isValidating } = useSWR(
    ANIMAL_NAME_REGEX.test(inputValue)
      ? ['animal', inputValue]
      : null,
    { fetcher: animalFetcher }
  );
  useLoadingSearchOptions(isValidating);

  return data && (
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
  );
}

// Utils
type AnimalKey = readonly ['animal', string];

function animalFetcher([, name]: AnimalKey) {
  return actScrapAnimalTracking(name);
}
