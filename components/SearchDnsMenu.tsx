'use client';

import { useDnsLookup } from '@/hooks/useDnsLookup';
import { Box, Collapse, Fade, LinearProgress, useTheme } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import { TransitionGroup } from 'react-transition-group';

export interface DnsLookupItemsProps {
  readonly name: string;
  readonly selectedIp: string;
  readonly onSelect: (ip: string) => void;
}

export function SearchDnsMenu({ name, selectedIp, onSelect }: DnsLookupItemsProps) {
  const { ips, isLoading, isValidating } = useDnsLookup(name);
  const theme = useTheme();

  return <Box sx={{ position: 'relative', minHeight: 52, py: 1 }}>
    <Fade in={isValidating} unmountOnExit>
      <LinearProgress
        aria-label="Resolving"
        sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
      />
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
      <TransitionGroup component={null}>
        { ips.map((ip, idx) => idx === 0 ? (
          <Fade key={idx}>
            <MenuItem selected={ip === selectedIp} onClick={() => onSelect(ip)}>
              { ip }
            </MenuItem>
          </Fade>
        ) : (
          <MenuItem
            key={idx}
            component={Collapse}
            selected={ip === selectedIp}
            onClick={() => onSelect(ip)}
            sx={{ p: 0 }}
            timeout={{
              enter: theme.transitions.duration.enteringScreen,
              exit: theme.transitions.duration.leavingScreen
            }}
          >
            <Box sx={{ m: 0, px: 2, py: 0.75 }}>{ ip }</Box>
          </MenuItem>
        )) }
      </TransitionGroup>
    </MenuList>
  </Box>;
}