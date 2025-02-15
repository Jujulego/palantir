'use client';

import { MapContext } from '@/components/map/map.context';
import { useLazyMapbox } from '@/hooks/useLazyMapbox';
import { mergeSx } from '@/lib/utils/mui';
import PlaceIcon from '@mui/icons-material/Place';
import { type SxProps, type Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import type * as mapboxgl from 'mapbox-gl';
import { m } from 'motion/react';
import { type ReactNode, use, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Component
export interface MapMarkerProps {
  readonly latitude: number;
  readonly longitude: number;
  readonly tooltip?: ReactNode;
  readonly selected?: boolean;
  readonly sx?: SxProps<Theme>;
}

export default function MapMarker({ latitude, longitude, tooltip, selected, sx }: MapMarkerProps) {
  const { mapboxRef, isLoaded: isMapboxLoaded } = useLazyMapbox();
  const { map, isLoaded } = use(MapContext);

  const elementRef = useRef(document.createElement('div'));
  const markerRef = useRef<mapboxgl.Marker>(null);

  useEffect(() => {
    if (!mapboxRef.current) return;

    const { Marker } = mapboxRef.current;
    const marker = new Marker({
      anchor: 'bottom',
      element: elementRef.current,
      occludedOpacity: 0.75
    }).setLngLat({ lat: latitude, lng: longitude });

    markerRef.current = marker;

    if (map && isLoaded) {
      marker.addTo(map);

      return () => {
        marker.remove();
      };
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
    <>
      <m.div
        initial={{ scale: 0, translateY: '8.33%' }}
        style={{
          transformOrigin: 'bottom center',
        }}
        animate={{
          scale: selected ? 1.325 : 0.8,
          opacity: selected ? 1 : 0.75,
        }}
        transition={{
          duration: 0.5,
        }}
      >
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
              { color: 'primary.main', filter: 'drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))', fontSize: 36 },
              sx,
              { verticalAlign: 'bottom' },
            )}
          />
        </Tooltip>
      </m.div>
    </>,
    elementRef.current,
  );
}
