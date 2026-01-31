'use client';

import MuiLink from '@mui/material/Link';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { use } from 'react';

export interface HostnameLinkProps {
  readonly className?: string;
  readonly hostname: Promise<string | null>;
}

export default function HostnameLink({ className, hostname: _hostname }: HostnameLinkProps) {
  const searchParams = useSearchParams();
  const hostname = use(_hostname);

  if (!hostname) {
    return (
      <p className={clsx('typography-body2', className)}>
        No hostname found
      </p>
    );
  }

  const hostnameParams = new URLSearchParams(searchParams);
  hostnameParams.set('search', hostname);

  return (
    <MuiLink
      className={clsx('text-text-secondary/70', className)}
      component={Link}
      href={`?${hostnameParams}`}
      variant="body2"
    >
      { hostname }
    </MuiLink>
  );
}
