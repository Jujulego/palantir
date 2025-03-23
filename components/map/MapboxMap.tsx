import type { MapCamera } from '@/components/map/map.context';
import { useLazyMapbox } from '@/lib/map/useLazyMapbox';
import { styled } from '@mui/material';
import type { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { m, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import { preconnect, prefetchDNS } from 'react-dom';

// Component
preconnect('https://api.mapbox.com');
prefetchDNS('https://events.mapbox.com');

export interface MapboxMapProps {
  readonly camera: MapCamera;
  readonly onMapCreated: (map: Map) => void;
  readonly onMapLoaded: () => void;
  readonly onMapStyleLoaded: () => void;
  readonly onMapRemoved: () => void;
}

export default function MapboxMap(props: MapboxMapProps) {
  const { camera, onMapCreated, onMapLoaded, onMapStyleLoaded, onMapRemoved } = props;

  // Initiate map
  const { mapboxRef, isLoaded: isMapboxLoaded } = useLazyMapbox();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapboxRef.current) return;

    const map = new mapboxRef.current.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_PK!,
      container: containerRef.current!,
      style: 'mapbox://styles/mapbox/standard?optimize=true',
      zoom: camera.zoom.get(),
    });

    onMapCreated(map);
    map.once('load', onMapLoaded);
    map.once('style.load', onMapStyleLoaded);

    return () => {
      map.off('load', onMapLoaded);
      map.off('style.load', onMapStyleLoaded);
      map.remove();

      onMapRemoved();
    };
  }, [isMapboxLoaded, mapboxRef, onMapCreated, onMapLoaded, onMapRemoved, onMapStyleLoaded, camera.zoom]);

  // Render
  const top = useTransform(camera.padding.top, (value) => `${value}px`);
  const left = useTransform(camera.padding.left, (value) => `${value}px`);
  const bottom = useTransform(camera.padding.bottom, (value) => `${value}px`);
  const right = useTransform(camera.padding.right, (value) => `${value}px`);

  return (
    <Container
      ref={containerRef}
      style={{
        '--MapboxMap-top': top,
        '--MapboxMap-left': left,
        '--MapboxMap-bottom': bottom,
        '--MapboxMap-right': right,
      }}
    />
  );
}

// Utils
const Container = styled(m.div)({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',

  '.mapboxgl-ctrl-top': {
    top: 'var(--MapboxMap-top)',
  },
  '.mapboxgl-ctrl-top-left': {
    top: 'var(--MapboxMap-top)',
    left: 'var(--MapboxMap-left)',
  },
  '.mapboxgl-ctrl-left': {
    left: 'var(--MapboxMap-left)',
  },
  '.mapboxgl-ctrl-bottom-left': {
    left: 'var(--MapboxMap-left)',
    bottom: 'var(--MapboxMap-bottom)',
  },
  '.mapboxgl-ctrl-bottom': {
    bottom: 'var(--MapboxMap-bottom)',
  },
  '.mapboxgl-ctrl-bottom-right': {
    bottom: 'var(--MapboxMap-bottom)',
    right: 'var(--MapboxMap-right)',
  },
  '.mapboxgl-ctrl-right': {
    right: 'var(--MapboxMap-right)',
  },
  '.mapboxgl-ctrl-top-right': {
    top: 'var(--MapboxMap-top)',
    right: 'var(--MapboxMap-right)',
  },
});
