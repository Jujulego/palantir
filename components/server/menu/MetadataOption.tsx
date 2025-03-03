'use client';

import { MetadataMenuContext } from '@/components/server/menu/metadata-menu.context';
import TransitionLink from '@/components/utils/TransitionLink';
import MenuItem from '@mui/material/MenuItem';
import { usePathname, useSearchParams } from 'next/navigation';
import { type ReactNode, use, useEffect } from 'react';

export interface MetadataOptionProps {
  readonly href: string;
  readonly children: ReactNode;
}

export default function MetadataOption({ href, children }: MetadataOptionProps) {
  const { setSelectedNode, startLoading } = use(MetadataMenuContext);
  const searchParams = useSearchParams();
  const isSelected = href === usePathname();

  useEffect(() => {
    if (isSelected) {
      setSelectedNode(children);
    }
  }, [children, href, isSelected, setSelectedNode]);
  
  return (
    <MenuItem
      component={TransitionLink}
      href={`${href}?${searchParams}`}
      startTransition={startLoading}

      selected={isSelected}
      sx={{ gap: 0.75 }}
    >
      { children }
    </MenuItem>
  );
}