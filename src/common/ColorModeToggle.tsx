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
  const { mode, setMode } = useColorScheme();

  const handleClick = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode]);

  // Render
  return (
    <Paper sx={[{ borderRadius: 9999 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <IconButton onClick={handleClick} color="inherit" sx={{ m: 0.5 }}>
        <NoSsr>
          { mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon /> }
        </NoSsr>
      </IconButton>
    </Paper>
  );
}
