'use client';

import { MapContext } from '@/components/map/map.context';
import { useLazyMapbox } from '@/hooks/useLazyMapbox';
import PlaceIcon from '@mui/icons-material/Place';
import type * as mapboxgl from 'mapbox-gl';
import { use, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Component
export interface MapMarkerProps {
  readonly latitude: number;
  readonly longitude: number;
}

export default function MapMarker({ latitude, longitude }: MapMarkerProps) {
  const elementRef = useRef(document.createElement('div'));
  const markerRef = useRef<mapboxgl.Marker>(null);
  const { map, isLoaded } = use(MapContext);
  
  useLazyMapbox(useCallback(({ Marker }) => {
    markerRef.current = new Marker({ element: elementRef.current })
      .setLngLat({ lat: latitude, lng: longitude });

    if (map && isLoaded) {
      markerRef.current.addTo(map);
    }
  }, [])); /* eslint-disable-line react-hooks/exhaustive-deps */

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
    <PlaceIcon sx={{ position: 'absolute', bottom: -3, left: -18, color: 'primary.main', fontSize: 36 }} />,
    elementRef.current,
  );
}
