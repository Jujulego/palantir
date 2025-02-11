import { useColorScheme, useTheme } from '@mui/material/styles';
import type * as mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';

// Component
export interface MapStyleProps {
  readonly map: mapboxgl.Map;
}

export default function MapStyle({ map }: MapStyleProps) {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    map.setConfigProperty('basemap', 'font', theme.typography.fontFamily);
    map.setConfigProperty('basemap', 'lightPreset', colorScheme === 'light' ? 'day' : 'night');
  }, [map, theme.typography.fontFamily, colorScheme]);

  // Render
  return null;
}
