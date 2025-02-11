'use client';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';
import { useCallback } from 'react';

// Component
export default function ColorModeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const handleClick = useCallback(() => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  }, [colorScheme, setColorScheme]);

  // Render
  return (
    <IconButton
      color="inherit" aria-label="Switch theme"
      onClick={handleClick}
    >
      { colorScheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon /> }
    </IconButton>
  );
}
