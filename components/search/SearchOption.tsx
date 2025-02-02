'use client';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, useId } from 'react';

export interface SearchOptionProps {
  readonly href: string;
  readonly children?: ReactNode;
}

export default function SearchOption({ href, children }: SearchOptionProps) {
  const id = useId();

  const pathname = usePathname();
  const isSelected = pathname === href;

  return (
    <ListItem id={id} disablePadding aria-selected={isSelected}>
      <ListItemButton component={Link} href={href} tabIndex={-1} selected={isSelected}>
        { children }
      </ListItemButton>
    </ListItem>
  );
}
