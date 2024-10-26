'use client';

import type { MergedIpAsn } from '@/data/ip-metadata';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import HubIcon from '@mui/icons-material/Hub';
import { ListItem } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import Link from 'next/link';
import { type ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';

export interface MergedAsnsProps {
  readonly asns: readonly MergedIpAsn[];
}

export function MergedAsns({ asns }: MergedAsnsProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Extract selected location
  const selectedSource = searchParams.get('asn');
  const selected = selectedSource
    && asns.find((asn) => asn.source.includes(selectedSource))
    || asns[0];

  // Menu anchor
  const anchorRef = useRef<HTMLDivElement>(null);
  const anchorPosition = { top: 0, left: 0 };

  if (anchorRef.current) {
    const { top, right } = anchorRef.current.getBoundingClientRect();

    anchorPosition.top = top - 8;
    anchorPosition.left = right;
  }

  // Menu state
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  if (!selected) {
    return null;
  }

  return (
    <ListItem disablePadding>
      <ListItemButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{ minHeight: 56, px: 2, py: 0 }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          <HubIcon color="primary" />
        </ListItemIcon>

        <ListItemText
          primary={selected.organisation} primaryTypographyProps={{ noWrap: true }}
          secondary={`AS${selected.asn}`}
        />

        <ExpandCircleDownIcon
          sx={{
            transform: isOpen ? 'rotate(90deg)' : 'rotate(-90deg)',
          }}
        />
      </ListItemButton>

      <Popover
        open={isOpen}
        anchorPosition={anchorPosition}
        anchorReference="anchorPosition"
        slotProps={{
          paper: {
            sx: {
              minWidth: 220,
              overflow: 'auto',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }
          }
        }}
        onClose={handleClose}
      >
        <List component="nav" dense>
          { asns.map((asn) => (
            <ListItemButton
              key={asn.asn}
              component={Link}
              href={changeSourceHref(pathname, searchParams, asn.source[0])}
              replace
              selected={selectedSource ? asn.source.includes(selectedSource) : false}
            >
              <ListItemText
                primary={
                  <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                    <span>{ asn.organisation }</span>
                    <Chip label={asn.source[0]} size="small" sx={{ my: -0.5 }} />
                  </Box>
                }
                secondary={`AS${asn.asn}`}
              />
            </ListItemButton>
          )) }
        </List>
      </Popover>
    </ListItem>
  );
}

// Utils
function changeSourceHref(pathname: string, searchParams: ReadonlyURLSearchParams, source: string) {
  const params = new URLSearchParams(searchParams);
  params.set('asn', source);

  return `${pathname}?${params}`;
}
