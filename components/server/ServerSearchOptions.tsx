'use client';

import { SearchContext } from '@/components/search/search.context';
import SearchOption from '@/components/search/SearchOption';
import ComputerIcon from '@mui/icons-material/Computer';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ipaddr from 'ipaddr.js';
import { AnimatePresence } from 'motion/react';
import { use, useMemo } from 'react';

export default function ServerSearchOptions() {
  const { inputValue } = use(SearchContext);
  const ip = useMemo(() => ipaddr.isValid(inputValue) ? ipaddr.parse(inputValue) : null, [inputValue]);

  return (
    <AnimatePresence>
      { ip && (
        <SearchOption href={`/server/${encodeURIComponent(ip.toNormalizedString())}/ip-info`}>
          <ListItemIcon>
            <ComputerIcon color="inherit" />
          </ListItemIcon>
          <ListItemText primary={ip.toString()} />
        </SearchOption>
      ) }
    </AnimatePresence>
  );
}
