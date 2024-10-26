'use client';

import AddressTypography from '@/components/location/AddressTypography';
import MapboxFlyTo from '@/components/mapbox/MapboxFlyTo';
import MapboxMarker from '@/components/mapbox/MapboxMarker';
import MapboxSpin from '@/components/mapbox/MapboxSpin';
import type { MergedIpLocation } from '@/data/ip-metadata';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';

export interface LocationItemProps {
  readonly options: readonly MergedIpLocation[];
}

export function LocationItem({ options }: LocationItemProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const theme = useTheme();

  // Extract selected location
  const selectedSource = searchParams.get('location');
  const selected = selectedSource
    && options.find((location) => location.source === selectedSource)
    || options[0];

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

  return (
    <>
      <ListItemButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{ minHeight: 56, px: 2, py: 0 }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          <LocationCityIcon color="primary" />
        </ListItemIcon>

        { selected.address ? (
          <ListItemText
            primary={<AddressTypography address={selected.address} />}
            secondary={selected.address.country}
          />
        ) : (
          <ListItemText
            primary="Unknown location"
            sx={{ color: 'text.secondary' }}
          />
        ) }

        <ExpandCircleDownIcon
          sx={{
            transform: isOpen ? 'rotate(90deg)' : 'rotate(-90deg)',
          }}
        />
      </ListItemButton>

      { selected?.coordinates ? (
        <>
          <MapboxMarker
            color={theme.palette.primary.main}
            latitude={selected.coordinates.latitude}
            longitude={selected.coordinates.longitude}
          />
          <MapboxFlyTo latitude={selected.coordinates.latitude} longitude={selected.coordinates.longitude} zoom={5} />
        </>
      ) : (
        <MapboxSpin />
      ) }

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
        <List dense>
          { options.map((location) => (
            <ListItemButton
              key={location.source}
              component={Link}
              href={changeSourceHref(pathname, searchParams, location.source)}
              replace
              selected={location.source === selected.source}
            >
              { location.address ? (
                <ListItemText
                  primary={
                    <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                      <span><AddressTypography address={location.address} /></span>
                      <Chip label={location.source} size="small" sx={{ my: -0.5 }} />
                    </Box>
                  }
                  secondary={location.address.country}
                />
              ) : (
                <ListItemText
                  primary={
                    <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                      <span>Unknown location</span>
                      <Chip label={location.source} size="small" sx={{ my: -0.5 }} />
                    </Box>
                  }
                  sx={{ color: 'text.secondary' }}
                />
              ) }
            </ListItemButton>
          )) }
        </List>
      </Popover>
    </>
  )
}

// Utils
function changeSourceHref(pathname: string, searchParams: ReadonlyURLSearchParams, source: string) {
  const params = new URLSearchParams(searchParams);
  params.set('location', source);

  return `${pathname}?${params}`;
}
