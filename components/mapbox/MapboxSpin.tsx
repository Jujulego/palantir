'use client';

import { MapboxContext } from '@/components/mapbox/MapboxMap';
import { use, useEffect } from 'react';

// Component
export default function MapboxSpin() {
  const { map, isStyleLoaded } = use(MapboxContext);

  useEffect(() => {
    if (!map || !isStyleLoaded) return;

    // Make map spin
    let pause = false;

    function spinAnimation() {
      if (pause) return;

      const center = map!.getCenter();
      center.lng += 360 / 240; // <= 1 revolution every 4 minutes

      map!.easeTo({
        center,
        zoom: Math.min(3, map!.getZoom()),
        maxZoom: 3,
        duration: 1000,
        easing: (n) => n
      });
    }

    spinAnimation();
    map.on('moveend', spinAnimation); // <= start again move when it ends

    // Pause animation
    function pauseAnimation() {
      if (!pause) {
        pause = true;
        map!.stop();
      }
    }

    map.on('mousedown', pauseAnimation);
    map.on('touchstart', pauseAnimation);
    map.on('zoomstart', pauseAnimation);

    // Restart animation
    function restartAnimation() {
      if (pause) {
        pause = false;
        spinAnimation();
      }
    }

    map.on('mouseup', restartAnimation);
    map.on('dragend', restartAnimation);
    map.on('pitchend', restartAnimation);
    map.on('rotateend', restartAnimation);
    map.on('touchend', restartAnimation);
    map.on('zoomend', restartAnimation);

    return () => {
      // Clear events
      map.off('moveend', spinAnimation);

      map.off('mousedown', pauseAnimation);
      map.off('touchstart', pauseAnimation);
      map.off('zoomstart', pauseAnimation);

      map.off('mouseup', restartAnimation);
      map.off('dragend', restartAnimation);
      map.off('pitchend', restartAnimation);
      map.off('rotateend', restartAnimation);
      map.off('touchend', restartAnimation);
      map.off('zoomend', restartAnimation);
    };
  }, [map, isStyleLoaded]);

  return null;
}
