'use client';

import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import { IconButton } from '@mui/material';
import { type LngLatLike } from 'mapbox-gl';
import { useCallback } from 'react';

import { useMapboxMap } from '@/src/mapbox/Mapbox.context';

// Components
export interface MapboxFlyToButtonProps {
  readonly lngLat: LngLatLike;
}

export default function MapboxFlyToButton({ lngLat }: MapboxFlyToButtonProps) {
  const map = useMapboxMap({ suspense: false });

  const handleClick = useCallback(() => {
    map?.flyTo({ center: lngLat, zoom: 4, padding: { left: 318, top: 16, right: 16, bottom: 16 } });
  }, [map, lngLat]);

  return (
    <IconButton disabled={!map} aria-label="Locate" onClick={handleClick}>
      <GpsNotFixedIcon />
    </IconButton>
  );
}
