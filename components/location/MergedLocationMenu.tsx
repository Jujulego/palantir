'use client';

import AddressTypography from '@/components/location/AddressTypography';
import MapboxFlyTo from '@/components/mapbox/MapboxFlyTo';
import type { MergedIpLocation } from '@/data/ip-metadata';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation';
import { MergedMenu } from '../common/MergedMenu';
import MapboxMarker from '../mapbox/MapboxMarker';
import MapboxSpin from '../mapbox/MapboxSpin';

export interface MergedLocationMenuProps {
  readonly options: readonly MergedIpLocation[];
}

export function MergedLocationMenu({ options }: MergedLocationMenuProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const theme = useTheme();

  // Extract selected location
  const selectedSource = searchParams.get('location');
  const selected = selectedSource
    && options.find((location) => location.source === selectedSource)
    || options[0];

  // Render
  return (<>
    <MergedMenu
      content={<>
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
      </>}
    >
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
    </MergedMenu>

    { selected?.coordinates ? (<>
      <MapboxMarker
        color={theme.palette.primary.main}
        latitude={selected.coordinates.latitude}
        longitude={selected.coordinates.longitude}
      />
      <MapboxFlyTo latitude={selected.coordinates.latitude} longitude={selected.coordinates.longitude} zoom={5} />
    </>) : (
      <MapboxSpin />
    ) }
  </>);
}

// Utils
function changeSourceHref(pathname: string, searchParams: ReadonlyURLSearchParams, source: string) {
  const params = new URLSearchParams(searchParams);
  params.set('location', source);

  return `${pathname}?${params}`;
}
