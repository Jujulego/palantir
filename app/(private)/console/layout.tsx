'use client';

import ConsoleDrawer from '@/components/console/ConsoleDrawer';
import HomeLink from '@/components/HomeLink';
import ProfileMenu from '@/components/profile/ProfileMenu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { type ReactNode, useCallback, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

// Layout
export interface ConsoleLayoutProps {
  readonly children: ReactNode;
}

export default function ConsoleLayout({ children }: ConsoleLayoutProps) {
  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCloseDrawer = useCallback(() => setDrawerOpen(false), []);
  const handleOpenDrawer = useCallback(() => setDrawerOpen(true), []);

  // Render
  return (
    <Box
      sx={{
        display: 'flex',
        '--mui-palette-TableCell-border': 'var(--mui-palette-divider)'
      }}
    >
      <AppBar position="fixed" elevation={2}>
        <Toolbar disableGutters sx={{ px: 2 }}>
          <IconButton onClick={handleOpenDrawer} sx={{ display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>

          <HomeLink sx={{ mr: 'auto' }} />

          <ProfileMenu />
        </Toolbar>
      </AppBar>

      <ConsoleDrawer isOpen={drawerOpen} onClose={handleCloseDrawer} />

      <Stack
        component="main"
        sx={{
          containerType: 'inline-size',
          height: '100vh',
          flex: '1 0 0',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        { children }
      </Stack>
    </Box>
  );
}
