'use client';

import { MapContext } from '@/components/map/map.context';
import { useLazyMapbox } from '@/hooks/useLazyMapbox';
import { use, useCallback } from 'react';

// Component
export interface MapMarkerProps {
  readonly latitude: number;
  readonly longitude: number;
  readonly color?: string;
}

export default function MapMarker({ color, latitude, longitude }: MapMarkerProps) {
  const { map, isLoaded } = use(MapContext);

  useLazyMapbox(useCallback(({ Marker }) => {
    if (!map || !isLoaded) return;

    const marker = new Marker({ color })
      .setLngLat({ lat: latitude, lng: longitude })
      .addTo(map);

    return () => {
      marker.remove();
    };
  }, [map, isLoaded, color, latitude, longitude]));

  return null;
}