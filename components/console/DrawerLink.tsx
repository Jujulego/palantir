'use client';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export interface DrawerLinkProps {
  readonly href: string;
  readonly icon: ReactNode;
  readonly primary: ReactNode;
  readonly exactMatch?: boolean;
}

export default function DrawerLink({ href, icon, primary, exactMatch }: DrawerLinkProps) {
  const pathname = usePathname();
  const selected = exactMatch ? pathname === href : pathname.startsWith(href);

  return (
    <ListItem component="div" disablePadding>
      <ListItemButton component={Link} href={href} selected={selected}>
        <ListItemIcon>
          { icon }
        </ListItemIcon>

        <ListItemText primary={primary} />
      </ListItemButton>
    </ListItem>
  );
}