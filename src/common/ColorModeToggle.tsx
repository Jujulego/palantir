'use client';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton, NoSsr, Paper, SxProps, useColorScheme } from '@mui/material';
import { useCallback } from 'react';

// Component
export interface ColorModeToggleProps {
  readonly sx?: SxProps;
}

export default function ColorModeToggle({ sx }: ColorModeToggleProps) {
  const { mode, systemMode, setMode } = useColorScheme();
  const actualMode = mode === 'system' ? systemMode : mode;

  const handleClick = useCallback(() => {
    setMode(actualMode === 'dark' ? 'light' : 'dark');
  }, [actualMode, setMode]);

  // Render
  return (
    <Paper sx={[{ borderRadius: 9999 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <IconButton
        color="inherit" aria-label="Switch theme"
        onClick={handleClick}
        sx={{ m: 0.5 }}
      >
        <NoSsr>
          { actualMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon /> }
        </NoSsr>
      </IconButton>
    </Paper>
  );
}
