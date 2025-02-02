'use client';

import { SearchContext } from '@/components/search/search.context';
import SearchOption from '@/components/search/SearchOption';
import { useDnsLookup } from '@/hooks/useDnsLookup';
import ComputerIcon from '@mui/icons-material/Computer';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { use } from 'react';

// Component
export default function DnsSearchOptions() {
  const { inputValue } = use(SearchContext);
  const { ips } = useDnsLookup(inputValue);

  return ips.map((ip) => (
    <SearchOption key={ip} href={`/ip/${ip}?name=${inputValue}`}>
      <ListItemIcon sx={{ minWidth: 40 }}>
        <ComputerIcon color="inherit" />
      </ListItemIcon>
      <ListItemText primary={ip} />
    </SearchOption>
  ));
}
