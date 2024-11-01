'use client';

import { MapboxContext } from '@/components/mapbox/MapboxMap';
import { use, useEffect } from 'react';

// Component
export interface MapboxFlyToProps {
  readonly latitude: number;
  readonly longitude: number;
  readonly zoom?: number;
}

export default function MapboxFlyTo({ latitude, longitude, zoom }: MapboxFlyToProps) {
  const { map, isStyleLoaded } = use(MapboxContext);

  useEffect(() => {
    if (!map || !isStyleLoaded) return;

    const id = setTimeout(() => {
      map.flyTo({
        center: { lat: latitude, lng: longitude },
        zoom: zoom
      });
    }, 0);

    return () => clearTimeout(id);
  }, [isStyleLoaded, latitude, longitude, map, zoom]);

  return null;
}
