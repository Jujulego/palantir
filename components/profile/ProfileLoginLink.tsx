'use client';

import LoginIcon from '@mui/icons-material/Login';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function ProfileLoginLink() {
  return (
    <Suspense fallback={<BasicLoginLink />}>
      <CompleteLoginLink />
    </Suspense>
  );
}

function BasicLoginLink() {
  const url = usePathname();

  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={`/auth/login?returnTo=${encodeURIComponent(url)}`}>
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>

        <ListItemText primary="Login" />
      </ListItemButton>
    </ListItem>
  );
}

function CompleteLoginLink() {
  const url = `${usePathname()}?${useSearchParams()}`;

  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={`/auth/login?returnTo=${encodeURIComponent(url)}`}>
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>

        <ListItemText primary="Login" />
      </ListItemButton>
    </ListItem>
  );
}
