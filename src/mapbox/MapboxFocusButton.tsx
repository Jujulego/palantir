'use client';

import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import IconButton from '@mui/material/IconButton';
import { useCallback, useContext } from 'react';

import { MapboxFocus } from './MapboxFocus.context';

// Component
export interface MapboxFocusButtonProps {
  readonly focusKey: string;
}

export default function MapboxFocusButton({ focusKey }: MapboxFocusButtonProps) {
  const { focus, setFocus } = useContext(MapboxFocus);

  const handleClick = useCallback(() => {
    setFocus(focusKey);
  }, [focusKey, setFocus]);

  return (
    <IconButton aria-label="Locate" onClick={handleClick}>
      { focus === focusKey ? <GpsFixedIcon /> : <GpsNotFixedIcon /> }
    </IconButton>
  );
}
