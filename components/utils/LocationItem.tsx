'use client';

import LocationTypography from '@/components/utils/LocationTypography';
import { useMapFlyTo } from '@/lib/map/useMapFlyTo';
import type { Address } from '@/lib/utils/address';
import type { Coordinates } from '@/lib/utils/coordinates';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useCallback } from 'react';

export interface LocationItemProps {
  readonly address?: Address | null;
  readonly coordinates?: Coordinates | null;
}

export default function LocationItem({ address, coordinates }: LocationItemProps) {
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
        <ListItemIcon>
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
