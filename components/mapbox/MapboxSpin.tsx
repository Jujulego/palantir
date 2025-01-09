'use client';

import { MapboxContext } from '@/components/mapbox/MapboxMap';
import { stopAll } from '@/utils/motion';
import { animate } from 'motion/react';
import { use, useEffect } from 'react';

// Component
export default function MapboxSpin() {
  const ctx = use(MapboxContext);

  useEffect(() => {
    if (!ctx.map || !ctx.isLoaded) return;

    const startLng = ctx.map.getCenter().lng;

    return stopAll(
      animate(ctx.lat, 0, { duration: 300 }),
      animate(ctx.lng, [startLng, startLng + 360 / 2, startLng + 360], { ease: 'linear', duration: 300, repeat: Infinity }),
      animate(ctx.zoom, Math.min(ctx.map.getZoom(), 3), { duration: 1 }),
    );
  }, [ctx]);

  return null;
}
