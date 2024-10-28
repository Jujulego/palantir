'use client';

import { validateSourceIdParam } from '@/data/sources';
import Chip from '@mui/material/Chip';
import { type ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export interface SourceChipProps {
  readonly id: string;
  readonly label: string;
}

export default function SourceChip({ id, label }: SourceChipProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const selectedId = useMemo(() => {
    return validateSourceIdParam(searchParams.get('source'));
  }, [searchParams]);

  const handleClick = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set('source', id);
    
    router.replace(`${pathname}?${params}`);
  }, [id, pathname, router, searchParams]);
  
  return (
    <Chip
      label={label}
      size="small"
      variant={id === selectedId ? 'filled' : 'outlined'}
      onClick={handleClick}
    />
  );
}

// Utils
function changeSourceHref(pathname: string, searchParams: ReadonlyURLSearchParams, source: string) {
  const params = new URLSearchParams(searchParams);
  params.set('source', source);

  return `${pathname}?${params}`;
}
