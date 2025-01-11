'use client';

import { MapContext } from '@/components/map/map.context';
import { useAnimate } from 'motion/react';
import { use, useEffect } from 'react';

// Component
export default function MapSpin() {
  const { map, isLoaded, camera } = use(MapContext);
  const [,animate] = useAnimate();

  useEffect(() => {
    if (!map || !isLoaded) return;

    const startLng = map.getCenter().lng;

    animate(camera.lat, 0, { duration: 300 });
    animate(camera.lng, [startLng, startLng + 360 / 2, startLng + 360], { ease: 'linear', duration: 300, repeat: Infinity });
    animate(camera.zoom, Math.min(map.getZoom(), 3), { duration: 1 });
  }, [animate, camera.lat, camera.lng, camera.zoom, isLoaded, map]);

  return null;
}
