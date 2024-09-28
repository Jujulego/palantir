'use client';

import { MapboxContext } from '@/components/mapbox/MapboxMap';
import mapboxgl from 'mapbox-gl';
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

    const marker = new mapboxgl.Marker({ color });

    marker
      .setLngLat({ lat: latitude, lng: longitude })
      .addTo(map);

    return () => { marker.remove(); };
  }, [map, isLoaded, color, latitude, longitude]);

  return null;
}