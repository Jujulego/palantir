'use client';

import { SearchContext } from '@/components/search/search.context';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, use, useCallback, useEffect, useId, useMemo } from 'react';

export interface SearchOptionProps {
  readonly href: string;
  readonly children?: ReactNode;
}

export default function SearchOption({ href, children }: SearchOptionProps) {
  const id = useId();

  const { activeOption, inputValue, isOpen, setActiveOption, registerOption, unregisterOption } = use(SearchContext);
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

  const handleActivate = useCallback(() => {
    setActiveOption(id);
  }, [id, setActiveOption]);

  // Render
  if (!isOpen) return null;

  return (
    <ListItem
      id={id}
      disablePadding
      onMouseEnter={handleActivate}
      onTouchStart={handleActivate}

      aria-selected={isSelected}
      role="option"
    >
      <ListItemButton
        className={activeOption === id ? 'Mui-focusVisible' : ''}
        component={Link} href={url.toString()}
        tabIndex={-1}
        selected={isSelected}
      >
        { children }
      </ListItemButton>
    </ListItem>
  );
}
