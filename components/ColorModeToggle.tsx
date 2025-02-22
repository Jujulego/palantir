'use client';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import { type SxProps, type Theme, useColorScheme } from '@mui/material/styles';
import { useCallback } from 'react';

// Component
export interface ColorModeToggleProps {
  readonly sx?: SxProps<Theme>;
}

export default function ColorModeToggle({ sx }: ColorModeToggleProps) {
  const { colorScheme, setColorScheme } = useColorScheme();

  const handleClick = useCallback(() => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  }, [colorScheme, setColorScheme]);

  // Render
  return (
    <IconButton
      color="inherit" aria-label="Switch theme"
      onClick={handleClick}
      sx={sx}
    >
      { colorScheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon /> }
    </IconButton>
  );
}
