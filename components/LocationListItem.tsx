'use client';

import LocationTypography from '@/components/LocationTypography';
import { useMapFlyTo } from '@/hooks/useMapFlyTo';
import type { Address } from '@/lib/utils/address';
import type { Location } from '@/lib/utils/location';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useCallback } from 'react';

export interface LocationListItemProps {
  readonly address?: Address | null;
  readonly location?: Location | null;
}

export default function LocationListItem({ address, location }: LocationListItemProps) {
  const { flyTo, isReady } = useMapFlyTo();

  const handleClick = useCallback(() => {
    if (!location) return;
    flyTo({ latitude: location.latitude, longitude: location.longitude, zoom: 5 });
  }, [flyTo, location]);

  return (
    <ListItem disablePadding>
      <ListItemButton
        disabled={!isReady}
        onClick={handleClick}
        sx={{ minHeight: 56, px: 2, py: 0 }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          <LocationCityIcon color="primary" />
        </ListItemIcon>

        <ListItemText
          primary={<LocationTypography address={address} location={location} />}
          secondary={address?.country}
        />
      </ListItemButton>
    </ListItem>
  );
}
