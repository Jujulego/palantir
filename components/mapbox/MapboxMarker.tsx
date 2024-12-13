'use client';

import { MapboxContext } from '@/components/mapbox/MapboxMap';
import type { Marker } from 'mapbox-gl';
import { use, useEffect } from 'react';

// Component
export interface MapboxMarkerProps {
  readonly latitude: number;
  readonly longitude: number;
  readonly color?: string;
}

export default function MapboxMarker({ color, latitude, longitude }: MapboxMarkerProps) {
  const { map, isLoaded } = use(MapboxContext);

  useEffect(() => {
    if (!map || !isLoaded) return;

    let marker: Marker;
    let cleaned = false;

    (async () => {
      const { Marker } = await import('mapbox-gl');
      if (cleaned) return;

      marker = new Marker({ color });

      marker
        .setLngLat({ lat: latitude, lng: longitude })
        .addTo(map);
    })();

    return () => {
      cleaned = true;

      marker?.remove();
    };
  }, [map, isLoaded, color, latitude, longitude]);

  return null;
}