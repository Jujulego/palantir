'use client';

import { SearchContext, useLoadingSearchOptions } from '@/components/search/search.context';
import SearchOption from '@/components/search/SearchOption';
import { useDnsLookup } from '@/lib/dns/useDnsLookup';
import WebIcon from '@mui/icons-material/Web';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AnimatePresence } from 'motion/react';
import { use } from 'react';

// Component
export default function DnsSearchOptions() {
  const { inputValue } = use(SearchContext);
  const { ips, isValidating } = useDnsLookup(inputValue);
  useLoadingSearchOptions(isValidating);

  return (
    <AnimatePresence>
      { ips.map((ip) => (
        <SearchOption
          key={ip.toNormalizedString()}
          href={`/server/${encodeURIComponent(ip.toNormalizedString())}/ip-info`}
        >
          <ListItemIcon>
            <WebIcon color="inherit" />
          </ListItemIcon>
          <ListItemText primary={ip.toString()} />
        </SearchOption>
      )) }
    </AnimatePresence>
  );
}
