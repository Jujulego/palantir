import type { MapCamera } from '@/components/map/map.context';
import { useLazyMapbox } from '@/lib/map/useLazyMapbox';
import { styled } from '@mui/material';
import type { Map } from 'mapbox-gl';
import { m, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import { prefetchDNS } from 'react-dom';
import './mapbox.css';

// Component
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

    const offHeight = camera.height.on('change', () => {
      setTimeout(() => map.resize());
    });

    const offWidth = camera.width.on('change', () => {
      setTimeout(() => map.resize());
    });

    return () => {
      offHeight();
      offWidth();

      map.off('load', onMapLoaded);
      map.off('style.load', onMapStyleLoaded);
      map.remove();

      onMapRemoved();
    };
  }, [camera.height, camera.width, camera.zoom, isMapboxLoaded, mapboxRef, onMapCreated, onMapLoaded, onMapRemoved, onMapStyleLoaded]);

  // Container height
  useEffect(() => {
    camera.height.set(window.innerHeight);
    camera.width.set(window.innerWidth);

    const listener = () => {
      camera.height.set(window.innerHeight);
      camera.width.set(window.innerWidth);
    };

    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [camera.height, camera.width]);

  // Render
  const top = useTransform(camera.padding.top, (value) => `${value}px`);
  const left = useTransform(camera.padding.left, (value) => `${value}px`);
  const bottom = useTransform(camera.padding.bottom, (value) => `${value}px`);
  const right = useTransform(camera.padding.right, (value) => `${value}px`);

  return (
    <Container
      ref={containerRef}
      style={{
        height: camera.height,
        width: camera.width,
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
