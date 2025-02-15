'use client';

import { useMapFlyTo } from '@/lib/map/useMapFlyTo';
import { useEffect } from 'react';

// Component
export interface MapFlyToProps {
  readonly latitude: number;
  readonly longitude: number;
  readonly zoom?: number;
}

export default function MapFlyTo({ latitude, longitude, zoom }: MapFlyToProps) {
  const { flyTo, isReady } = useMapFlyTo();

  useEffect(() => {
    if (isReady) flyTo({ latitude, longitude, zoom });
  }, [latitude, longitude, flyTo, zoom, isReady]);

  return null;
}
