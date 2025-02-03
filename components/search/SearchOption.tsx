'use client';

import { SearchContext } from '@/components/search/search.context';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, use, useEffect, useId, useMemo } from 'react';

export interface SearchOptionProps {
  readonly href: string;
  readonly children?: ReactNode;
}

export default function SearchOption({ href, children }: SearchOptionProps) {
  const id = useId();

  const { inputValue, registerOption, unregisterOption } = use(SearchContext);
  const pathname = usePathname();
  const isSelected = pathname === href;

  const url = useMemo(() => {
    const url = new URL(href, location.origin + pathname);
    url.searchParams.set('search', inputValue);
    
    return url;
  }, [href, inputValue, pathname]);

  useEffect(() => {
    registerOption(id, url);

    return () => unregisterOption(id);
  }, [id, registerOption, unregisterOption, url]);

  return (
    <ListItem id={id} disablePadding role="option" aria-selected={isSelected}>
      <ListItemButton component={Link} href={url.toString()} tabIndex={-1} selected={isSelected}>
        { children }
      </ListItemButton>
    </ListItem>
  );
}
