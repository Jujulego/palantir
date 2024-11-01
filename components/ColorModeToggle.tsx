'use client';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';
import { useCallback } from 'react';

// Component
export default function ColorModeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();
  const actualMode = mode === 'system' ? systemMode : mode;

  const handleClick = useCallback(() => {
    setMode(actualMode === 'dark' ? 'light' : 'dark');
  }, [actualMode, setMode]);

  // Render
  return (
    <IconButton
      color="inherit" aria-label="Switch theme"
      onClick={handleClick}
    >
      { actualMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon /> }
    </IconButton>
  );
}