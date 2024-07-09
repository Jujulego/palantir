'use client';

import { use, useEffect, useId } from 'react';

import { MapboxContext, useMapboxMap } from '@/src/mapbox/Mapbox.context';

// Components
export interface MapboxAreaProps {
  readonly lineColor: string;
  readonly lineWidth?: number;
  readonly fillColor: string;
  readonly fillOpacity?: number;
  readonly polygon: [number, number][];
}

export default function MapboxArea({ polygon, lineColor, lineWidth, fillColor, fillOpacity }: MapboxAreaProps) {
  const { loaded$ } = use(MapboxContext);
  const map = useMapboxMap();
  const id = useId();

  useEffect(() => {
    map.addSource(id, {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [polygon]
        },
        properties: {}
      }
    });

    map.addLayer({
      id: `${id}-fill`,
      type: 'fill',
      source: id,
      paint: {
        'fill-color': fillColor,
        'fill-opacity': fillOpacity,
        'fill-emissive-strength': 0.75
      }
    });

    map.addLayer({
      id: `${id}-line`,
      type: 'line',
      source: id,
      paint: {
        'line-color': lineColor,
        'line-width': lineWidth,
        'line-emissive-strength': 0.75
      }
    });

    return () => {
      if (loaded$.defer()) {
        map.removeLayer(`${id}-line`);
        map.removeLayer(`${id}-fill`);
        map.removeSource(id);
      }
    }
  }, [map, id, polygon, fillColor, fillOpacity, lineColor, lineWidth, loaded$]);

  return null;
}
