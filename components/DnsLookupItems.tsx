'use client';

import { useDnsLookup } from '@/hooks/useDnsLookup';
import { Box, Fade, LinearProgress } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';

export interface DnsLookupItemsProps {
  readonly dns: string;
  readonly onSelect: (ip: string) => void;
}

export function DnsLookupItems({ dns, onSelect }: DnsLookupItemsProps) {
  const { ips, isLoading, isValidating } = useDnsLookup(dns);

  return <Box sx={{ pb: 1 }}>
    <Fade in={isValidating}>
      <LinearProgress sx={{ mb: 0.5 }} />
    </Fade>

    { isLoading ? (
      <Typography
        color="textSecondary"
        sx={{ height: 36, px: 2, py: 0.75 }}
      >
        Resolving...
      </Typography>
    ) : ips.length ? (
      <MenuList disablePadding>
        { ips.map((ip) => (
          <MenuItem key={ip} onClick={() => onSelect(ip)}>
            { ip }
          </MenuItem>
        )) }
      </MenuList>
    ) : (
      <Typography
        color="textSecondary"
        sx={{ height: 36, px: 2, py: 0.75 }}
      >
        No results
      </Typography>
    ) }
  </Box>;
}