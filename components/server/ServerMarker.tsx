'use client';

import { ServerMarkersContext } from '@/components/server/server-markers.context';
import ServerMarkerIcon from '@/components/server/ServerMarkerIcon';
import { useMapFlyTo } from '@/lib/map/useMapFlyTo';
import type { Coordinates } from '@/lib/utils/coordinates';
import { type SxProps, type Theme } from '@mui/material/styles';
import { type ReactNode, use, useEffect } from 'react';

// Component
export interface ServerMarkerProps {
  readonly coordinates: Coordinates;
  readonly markerKey: string;
  readonly tooltip?: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function ServerMarker({ coordinates, markerKey, tooltip, sx }: ServerMarkerProps) {
  const { flyTo, isReady } = useMapFlyTo();

  useEffect(() => {
    if (isReady) {
      flyTo({ latitude: coordinates.latitude, longitude: coordinates.longitude, zoom: 5 });
    }
  }, [coordinates, flyTo, isReady]);

  const { createMarker, selectMarker } = use(ServerMarkersContext);

  useEffect(() => {
    createMarker(markerKey, {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      children: <ServerMarkerIcon markerKey={markerKey} tooltip={tooltip} sx={sx} />
    });
  }, [coordinates.latitude, coordinates.longitude, createMarker, markerKey, sx, tooltip]);
  
  useEffect(() => {
    selectMarker(markerKey);
  }, [markerKey, selectMarker]);

  return null;
}
