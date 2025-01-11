'use client';

import LocationTypography from '@/components/LocationTypography';
import type { Address, Coordinates } from '@/data/ip-metadata';
import { useMapFlyTo } from '@/hooks/useMapFlyTo';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useCallback } from 'react';

export interface LocationListItemProps {
  readonly address?: Address;
  readonly coordinates?: Coordinates;
}

export default function LocationListItem({ address, coordinates }: LocationListItemProps) {
  const { flyTo, isReady } = useMapFlyTo();

  const handleClick = useCallback(() => {
    if (!coordinates) return;
    flyTo({ latitude: coordinates.latitude, longitude: coordinates.longitude, zoom: 5 });
  }, [flyTo, coordinates]);

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
          primary={<LocationTypography address={address} coordinates={coordinates} />}
          secondary={address?.country}
        />
      </ListItemButton>
    </ListItem>
  );
}
