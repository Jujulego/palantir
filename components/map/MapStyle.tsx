import { useColorScheme, useTheme } from '@mui/material/styles';
import type * as mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';

// Component
export interface MapStyleProps {
  readonly map: mapboxgl.Map;
}

export default function MapStyle({ map }: MapStyleProps) {
  const theme = useTheme();

  const { mode, systemMode } = useColorScheme();
  const actualMode = mode === 'system' ? systemMode : mode;

  useEffect(() => {
    map.setConfigProperty('basemap', 'font', theme.typography.fontFamily);
    map.setConfigProperty('basemap', 'lightPreset', actualMode === 'light' ? 'day' : 'night');
  }, [map, actualMode, theme.typography.fontFamily]);

  // Render
  return null;
}
