'use client';

import { SearchContext } from '@/components/search/search.context';
import SearchListItem from '@/components/search/SearchListItem';
import { baseUrl } from '@/lib/utils/url';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type MouseEvent, type ReactNode, use, useCallback, useEffect, useId, useMemo } from 'react';

export interface SearchOptionProps {
  readonly href: string;
  readonly children?: ReactNode;
}

export default function SearchOption({ href, children }: SearchOptionProps) {
  const id = useId();

  const { activeOption, inputValue, search, setActiveOption, registerOption, unregisterOption } = use(SearchContext);
  const pathname = usePathname();
  const isSelected = pathname === href;

  const url = useMemo(() => {
    const url = new URL(href, baseUrl() + pathname);
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

  const handleClick = useCallback((event: MouseEvent) => {
    event.preventDefault();
    search(url);
  }, [url, search]);

  // Render
  return (
    <SearchListItem
      id={id}
      disablePadding
      selected={isSelected}
      onMouseEnter={handleActivate}
      onTouchStart={handleActivate}
    >
      <ListItemButton
        className={activeOption === id ? 'Mui-focusVisible' : ''}
        component={Link} href={url.toString()} prefetch
        onClick={handleClick}
        tabIndex={-1}
        selected={isSelected}
      >
        {children}
      </ListItemButton>
    </SearchListItem>
  );
}
