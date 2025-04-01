import ConsoleDrawer from '@/components/console/ConsoleDrawer';
import HomeLink from '@/components/HomeLink';
import ProfileMenu from '@/components/profile/ProfileMenu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Layout
export interface ConsoleLayoutProps {
  readonly children: ReactNode;
}

export default async function ConsoleLayout({ children }: ConsoleLayoutProps) {
  return (
    <Box sx={{ display: 'flex', '--mui-palette-TableCell-border': 'var(--mui-palette-divider)' }}>
      <AppBar position="fixed" elevation={2}>
        <Toolbar>
          <HomeLink sx={{ mr: 'auto' }} />

          <ProfileMenu />
        </Toolbar>
      </AppBar>

      <ConsoleDrawer />

      <Stack component="main" sx={{ height: '100vh', flex: '1 0 0', overflow: 'auto' }}>
        <Toolbar />
        { children }
      </Stack>
    </Box>
  );
}

export const metadata: Metadata = {
  title: {
    default: 'Palantir Console',
    template: 'Console - %s',
  },
};
