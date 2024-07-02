'use client';

import { useMediaQuery, useTheme } from '@mui/material';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';

import { useMapboxMap } from '@/src/mapbox/Mapbox.context';
import { MapboxFocus } from '@/src/mapbox/MapboxFocus.context';

// Components
export interface MapboxMarkerProps {
  readonly color?: string;
  readonly focusKey?: string;
  readonly lngLat: LngLatLike;
}

export default function MapboxMarker({ color, focusKey, lngLat }: MapboxMarkerProps) {
  const map = useMapboxMap();
  const { focus } = useContext(MapboxFocus);

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [marker, setMarker] = useState<mapboxgl.Marker>(new mapboxgl.Marker());
  const scale = focus === focusKey ? 1 : 0.5;

  useLayoutEffect(() => {
    setMarker(new mapboxgl.Marker({ color, scale }));
  }, [color, scale]);

  useEffect(() => {
    marker.setLngLat(lngLat);
  }, [marker, lngLat]);

  useEffect(() => {
    const m = marker.addTo(map);
    return () => void m.remove();
  }, [marker, map]);

  useEffect(() => {
    if (focus === focusKey) {
      map.flyTo({
        center: lngLat,
        zoom: 4,
        padding: smallScreen
          ? { left: 16, top: 344, right: 16, bottom: 16 }
          : { left: 408, top: 16, right: 16, bottom: 16 }
      });
    }
  }, [lngLat, focusKey, focus, map, smallScreen]);

  return null;
}
