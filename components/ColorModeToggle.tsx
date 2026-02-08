'use client';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';
import { useCallback } from 'react';

// Component
export interface ColorModeToggleProps {
  readonly className?: string;
}

export default function ColorModeToggle({ className }: ColorModeToggleProps) {
  const { mode, setMode } = useColorScheme();

  const handleClick = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode]);

  // Render
  return (
    <IconButton
      className={className}
      color="primary" aria-label="Switch theme"
      onClick={handleClick}
    >
      { mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon /> }
    </IconButton>
  );
}
