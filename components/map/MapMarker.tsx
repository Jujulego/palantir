'use client';

import { MapContext } from '@/components/map/map.context';
import { useLazyMapbox } from '@/hooks/useLazyMapbox';
import { mergeSx } from '@/utils/mui';
import PlaceIcon from '@mui/icons-material/Place';
import { type SxProps, type Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import type * as mapboxgl from 'mapbox-gl';
import { type ReactNode, use, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Component
export interface MapMarkerProps {
  readonly latitude: number;
  readonly longitude: number;
  readonly tooltip?: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function MapMarker({ latitude, longitude, tooltip, sx }: MapMarkerProps) {
  const { mapboxRef, isLoaded: isMapboxLoaded } = useLazyMapbox();
  const { map, isLoaded } = use(MapContext);

  const elementRef = useRef(document.createElement('div'));
  const markerRef = useRef<mapboxgl.Marker>(null);

  useEffect(() => {
    if (!mapboxRef.current) return;

    const { Marker } = mapboxRef.current;
    markerRef.current = new Marker({ element: elementRef.current })
      .setLngLat({ lat: latitude, lng: longitude });

    if (map && isLoaded) {
      markerRef.current.addTo(map);
    }
  }, [isMapboxLoaded, isLoaded, latitude, longitude, map, mapboxRef]);

  useEffect(() => {
    const marker = markerRef.current;
    if (!map || !isLoaded || !marker) return;

    marker.addTo(map);

    return () => {
      marker.remove();
    };
  }, [isLoaded, map]);

  useEffect(() => {
    if (!markerRef.current) return;
    
    markerRef.current.setLngLat({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);

  // Render
  return createPortal(
    <Tooltip
      title={tooltip}
      placement="top"
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -8],
              }
            }
          ]
        }
      }}
    >
      <PlaceIcon
        sx={mergeSx(
          { color: 'primary.main', filter: 'drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))' },
          sx,
          { position: 'absolute', bottom: -3, left: -18, fontSize: 36 }
        )}
      />
    </Tooltip>,
    elementRef.current,
  );
}
