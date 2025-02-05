'use client';

import { SearchContext } from '@/components/search/search.context';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { AnimatePresence, m, usePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, type Ref, use, useCallback, useEffect, useId, useMemo } from 'react';

export interface SearchOptionProps {
  readonly ref?: Ref<HTMLLIElement>;
  readonly href: string;
  readonly children?: ReactNode;
}

function SearchOption({ ref, href, children }: SearchOptionProps) {
  const id = useId();
  const [isPresent, safeToRemove] = usePresence();

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

  useEffect(() => {
    if (!isPresent) {
      unregisterOption(id);
    }
  }, [id, isPresent, unregisterOption]);

  const handleActivate = useCallback(() => {
    setActiveOption(id);
  }, [id, setActiveOption]);

  // Render
  return (
    <AnimatePresence onExitComplete={safeToRemove!}>
      { isOpen && isPresent && (
        <ListItem
          id={id}
          ref={ref}
          component={m.li}
          disablePadding
          sx={{ overflow: 'hidden' }}
          onMouseEnter={handleActivate}
          onTouchStart={handleActivate}

          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 48, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ ease: 'easeOut' }}

          aria-selected={isSelected}
          role="option"
        >
          <ListItemButton
            className={activeOption === id ? 'Mui-focusVisible' : ''}
            component={Link} href={url.toString()}
            tabIndex={-1}
            selected={isSelected}
          >
            {children}
          </ListItemButton>
        </ListItem>
      ) }
    </AnimatePresence>
  );
}

export default SearchOption;

// Elements
const MListItem = m.create(ListItem);
