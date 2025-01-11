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

    const center = map.getCenter();
    const zoom = map.getZoom();
    const zoomDuration = (zoom - Math.min(zoom, 3)) * 0.5;

    animate(camera.lat, [center.lat, 0], { ease: 'easeInOut', duration: 300, delay: zoomDuration * 0.75 });
    animate(camera.lng, [center.lng, center.lng + 360 / 2, center.lng + 360], { ease: 'linear', duration: 300, delay: zoomDuration * 0.75, repeat: Infinity });
    animate(camera.zoom, [zoom, Math.min(zoom, 3)], { duration: zoomDuration });
  }, [animate, camera.lat, camera.lng, camera.zoom, isLoaded, map]);

  return null;
}
