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

    const startLat = ctx.map.getCenter().lat;

    if (typeof ctx.lat !== 'number') ctx.lat.set(startLat);
    if (typeof ctx.lng !== 'number') ctx.lng.set(ctx.map.getCenter().lng);
    if (typeof ctx.zoom !== 'number') ctx.zoom.set(ctx.map.getZoom());

    return stopAll(
      animate(ctx.zoom, Math.min(ctx.map.getZoom(), 3), { duration: 1 }),
      animate(ctx.lat, 0, { ease: 'linear', duration: 1 }),
      animate(ctx.lng, [startLat, startLat + 360 / 2, startLat + 360], { ease: 'linear', duration: 300, repeat: Infinity }),
    );
  }, [ctx]);

  return null;
}
