'use client';

import { MapContext } from '@/components/map/map.context';

import type { Coordinates } from '@/lib/utils/coordinates';
import { useTheme } from '@mui/material';
import type { GeoJSONSource } from 'mapbox-gl';
import { use, useEffect, useId } from 'react';

// Component
export interface MapPolylineProps {
  readonly coordinates: readonly Coordinates[];
}

export default function MapPolyline({ coordinates }: MapPolylineProps) {
  const { map, isLoaded } = use(MapContext);
  const theme = useTheme();
  const id = useId();

  useEffect(() => {
    if (!map || !isLoaded) return;

    map.addSource(id, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      }
    });

    map.addLayer({
      id: `${id}-line`,
      type: 'line',
      source: id,
      paint: {
        'line-width': 4,
        'line-emissive-strength': 0.75
      }
    });

    return () => {
      map.removeLayer(`${id}-line`);
      map.removeSource(id);
    };
  }, [id, isLoaded, map]);

  useEffect(() => {
    const source = map?.getSource<GeoJSONSource>(id);
    if (!source || !isLoaded) return;

    source.setData({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: coordinates.map(({ latitude, longitude }) => [longitude, latitude])
      }
    });
  }, [coordinates, id, isLoaded, map]);

  useEffect(() => {
    if (!map || !isLoaded) return;
    
    map.setPaintProperty(`${id}-line`, 'line-color', theme.palette.primary.main);
  }, [id, isLoaded, map, theme.palette.primary.main]);

  return null;
}
