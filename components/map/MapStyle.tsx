import { useTheme } from '@mui/material/styles';
import type * as mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';

// Component
export interface MapStyleProps {
  readonly map: mapboxgl.Map;
}

export default function MapStyle({ map }: MapStyleProps) {
  const theme = useTheme();

  useEffect(() => {
    map.setConfigProperty('basemap', 'font', theme.typography.fontFamily);
    map.setConfigProperty('basemap', 'lightPreset', theme.map.light);
  }, [map, theme.map.light, theme.typography.fontFamily]);

  // Render
  return null;
}
