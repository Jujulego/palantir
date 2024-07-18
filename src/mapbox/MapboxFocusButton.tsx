'use client';

import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import IconButton from '@mui/material/IconButton';
import { useCallback, useContext } from 'react';

import { MapboxContext } from '@/src/mapbox/Mapbox.context';

// Component
export interface MapboxFocusButtonProps {
  readonly focusKey: string;
}

export default function MapboxFocusButton({ focusKey }: MapboxFocusButtonProps) {
  const { focus, setFocus } = useContext(MapboxContext);

  const handleClick = useCallback(() => {
    setFocus(focusKey);
  }, [focusKey, setFocus]);

  return (
    <IconButton aria-label="Locate" onClick={handleClick}>
      { focus === focusKey ? <GpsFixedIcon /> : <GpsNotFixedIcon /> }
    </IconButton>
  );
}
