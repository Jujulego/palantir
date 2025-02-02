'use client';

import { SearchContext } from '@/components/search/search.context';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, use, useId, useMemo } from 'react';

export interface SearchOptionProps {
  readonly href: string;
  readonly children?: ReactNode;
}

export default function SearchOption({ href, children }: SearchOptionProps) {
  const id = useId();

  const { inputValue } = use(SearchContext);
  const pathname = usePathname();
  const isSelected = pathname === href;

  const url = useMemo(() => {
    const url = new URL(href, location.origin + pathname);
    url.searchParams.set('search', inputValue);
    
    return url.toString();
  }, [href, inputValue, pathname]);

  return (
    <ListItem id={id} disablePadding role="option" aria-selected={isSelected}>
      <ListItemButton component={Link} href={url} tabIndex={-1} selected={isSelected}>
        { children }
      </ListItemButton>
    </ListItem>
  );
}
