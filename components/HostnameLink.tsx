'use client';

import MuiLink from '@mui/material/Link';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { use } from 'react';

export interface HostnameLinkProps {
  readonly hostname: Promise<string | null>;
}

export default function HostnameLink({ hostname: _hostname }: HostnameLinkProps) {
  const searchParams = useSearchParams();
  const hostname = use(_hostname);

  if (!hostname) {
    return null;
  }

  const hostnameParams = new URLSearchParams(searchParams);
  hostnameParams.set('search', hostname);

  return (
    <MuiLink
      component={Link}
      href={`?${hostnameParams}`}
      variant="body2"
      sx={{ display: 'block', color: 'text.secondary' }}
    >
      { hostname }
    </MuiLink>
  );
}
