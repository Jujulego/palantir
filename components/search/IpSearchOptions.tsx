'use client';

import { SearchContext } from '@/components/search/search.context';
import SearchOption from '@/components/search/SearchOption';
import ComputerIcon from '@mui/icons-material/Computer';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ipaddr from 'ipaddr.js';
import { use, useMemo } from 'react';

export default function IpSearchOptions() {
  const { inputValue } = use(SearchContext);
  const ip = useMemo(() => ipaddr.isValid(inputValue) ? ipaddr.parse(inputValue) : null, [inputValue]);

  if (!ip) {
    return null;
  }

  return (
    <SearchOption href={`/ip/${ip.toNormalizedString()}`}>
      <ListItemIcon sx={{ minWidth: 40 }}>
        <ComputerIcon />
      </ListItemIcon>
      <ListItemText primary={ip.toNormalizedString()} />
    </SearchOption>
  );
}
