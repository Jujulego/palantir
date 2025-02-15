import { useLazyMapbox } from '@/lib/map/useLazyMapbox';
import { styled } from '@mui/material';
import type { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { m, type MotionValue, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import { preconnect, prefetchDNS } from 'react-dom';

// Component
preconnect('https://api.mapbox.com');
prefetchDNS('https://events.mapbox.com');

export interface MapboxMapProps {
  readonly leftPadding: MotionValue<number>;
  readonly zoom: number;
  readonly onMapCreated: (map: Map) => void;
  readonly onMapLoaded: () => void;
  readonly onMapStyleLoaded: () => void;
  readonly onMapRemoved: () => void;
}

export default function MapboxMap(props: MapboxMapProps) {
  const { leftPadding, zoom, onMapCreated, onMapLoaded, onMapStyleLoaded, onMapRemoved } = props;

  // Initiate map
  const { mapboxRef, isLoaded: isMapboxLoaded } = useLazyMapbox();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapboxRef.current) return;

    const map = new mapboxRef.current.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_PK!,
      container: containerRef.current!,
      style: 'mapbox://styles/mapbox/standard?optimize=true',
      zoom,
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
  }, [isMapboxLoaded, mapboxRef, onMapCreated, onMapLoaded, onMapRemoved, onMapStyleLoaded, zoom]);

  // Render
  const left = useTransform(leftPadding, (value) => `${value}px`);

  return <Container ref={containerRef} style={{ '--MapboxMap-left': left }} />;
}

// Utils
const Container = styled(m.div)({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',

  '.mapboxgl-ctrl-top-left': {
    left: 'var(--MapboxMap-left)',
  },
  '.mapboxgl-ctrl-left': {
    left: 'var(--MapboxMap-left)',
  },
  '.mapboxgl-ctrl-bottom-left': {
    left: 'var(--MapboxMap-left)',
  },
});
