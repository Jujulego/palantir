'use client';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
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
      color="primary" aria-label="Switch theme"
      onClick={handleClick}
      sx={sx}
    >
      { colorScheme === 'dark' ? <DarkModeIcon /> : <LightModeIcon /> }
    </IconButton>
  );
}
