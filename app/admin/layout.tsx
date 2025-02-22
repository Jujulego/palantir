import ColorModeToggle from '@/components/ColorModeToggle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Layout
export interface AdminLayoutProps {
  readonly children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <AppBar position="fixed" elevation={2}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Console
          </Typography>

          <ColorModeToggle />
        </Toolbar>
      </AppBar>

      <main>
        <Toolbar />
        { children }
      </main>
    </>
  );
}

export const metadata: Metadata = {
  title: {
    default: 'Admin Console',
    template: 'Admin - %s',
  },
};
