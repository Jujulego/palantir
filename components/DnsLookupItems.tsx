'use client';

import { useDnsLookup, useDnsLookupV6 } from '@/hooks/useDnsLookup';
import { Box, Collapse, Fade, LinearProgress } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import { TransitionGroup } from 'react-transition-group';

export interface DnsLookupItemsProps {
  readonly dns: string;
  readonly onSelect: (ip: string) => void;
}

export function DnsLookupItems({ dns, onSelect }: DnsLookupItemsProps) {
  const { ips: ipv4, isLoading: isLoadingV4, isValidating: isValidatingV4 } = useDnsLookup(dns);
  const { ips: ipv6, isLoading: isLoadingV6, isValidating: isValidatingV6 } = useDnsLookupV6(dns);

  const isLoading = isLoadingV4 && isLoadingV6;
  const isValidating = isValidatingV4 && isValidatingV6;
  const ips = [...ipv4, ...ipv6];

  return <Box sx={{ position: 'relative', minHeight: 52, pb: 1 }}>
    <Fade in={isValidating}>
      <LinearProgress sx={{ mb: 0.5 }} />
    </Fade>

    <Fade in={isLoading} unmountOnExit>
      <Typography
        color="textSecondary"
        sx={{ position: 'absolute', top: 8, height: 36, px: 2, py: 0.75 }}
      >
        Resolving...
      </Typography>
    </Fade>

    <Fade in={!isLoading && ips.length === 0} unmountOnExit>
      <Typography
        color="textSecondary"
        sx={{ position: 'absolute', top: 8, height: 36, px: 2, py: 0.75 }}
      >
        No results
      </Typography>
    </Fade>

    <MenuList disablePadding>
      <TransitionGroup>
        { ips.map((ip, idx) => idx === 0 ? (
          <Fade key={ip}>
            <MenuItem onClick={() => onSelect(ip)}>
              { ip }
            </MenuItem>
          </Fade>
        ) : (
          <Collapse key={ip}>
            <MenuItem onClick={() => onSelect(ip)}>
              { ip }
            </MenuItem>
          </Collapse>
        )) }
      </TransitionGroup>
    </MenuList>
  </Box>;
}