'use client';

import MapMarker from '@/components/map/MapMarker';
import { useMapFlyTo } from '@/lib/map/useMapFlyTo';
import type { Coordinates } from '@/lib/utils/coordinates';
import PlaceIcon from '@mui/icons-material/Place';
import NoSsr from '@mui/material/NoSsr';
import { m } from 'motion/react';
import { useEffect } from 'react';

// Component
export interface AnimalMarkerProps {
  readonly coordinates: Coordinates;
}

export default function AnimalMarker({ coordinates }: AnimalMarkerProps) {
  const { flyTo, isReady } = useMapFlyTo();

  useEffect(() => {
    if (isReady) {
      flyTo({ latitude: coordinates.latitude, longitude: coordinates.longitude, zoom: 5 });
    }
  }, [coordinates, flyTo, isReady]);

  // Render
  return (
    <NoSsr>
      <MapMarker latitude={coordinates.latitude} longitude={coordinates.longitude}>
        <m.div
          initial={{ scale: 0, y: '8.33%' }}
          animate={{
            scale: 1.325,
          }}
          style={{
            transformOrigin: 'bottom center',
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <PlaceIcon
            sx={{
              color: 'primary.main',
              filter: 'drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))',
              fontSize: 36,
              verticalAlign: 'bottom'
            }}
          />
        </m.div>
      </MapMarker>
    </NoSsr>
  );
}
