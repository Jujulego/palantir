import { useLazyMapbox } from '@/hooks/useLazyMapbox';
import { styled } from '@mui/material';
import type * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import { preconnect, prefetchDNS } from 'react-dom';

// Component
preconnect('https://api.mapbox.com');
prefetchDNS('https://events.mapbox.com');

export interface MapboxMapProps {
  readonly zoom: number;
  readonly onMapCreated: (map: mapboxgl.Map) => void;
  readonly onMapLoaded: () => void;
  readonly onMapStyleLoaded: () => void;
  readonly onMapRemoved: () => void;
}

export default function MapboxMap(props: MapboxMapProps) {
  const { zoom, onMapCreated, onMapLoaded, onMapStyleLoaded, onMapRemoved } = props;

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
  return <Container ref={containerRef} />;
}

// Utils
const Container = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
});
