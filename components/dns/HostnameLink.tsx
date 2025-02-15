'use client';

import { mergeSx } from '@/lib/utils/mui';
import MuiLink from '@mui/material/Link';
import type { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { use } from 'react';

export interface HostnameLinkProps {
  readonly hostname: Promise<string | null>;
  readonly sx?: SxProps<Theme>;
}

export default function HostnameLink({ hostname: _hostname, sx }: HostnameLinkProps) {
  const searchParams = useSearchParams();
  const hostname = use(_hostname);

  if (!hostname) {
    return (
      <Typography
        variant="body2"
        sx={mergeSx({ color: 'text.disabled' }, sx)}
      >
        No hostname found
      </Typography>
    );
  }

  const hostnameParams = new URLSearchParams(searchParams);
  hostnameParams.set('search', hostname);

  return (
    <MuiLink
      component={Link}
      href={`?${hostnameParams}`}
      variant="body2"
      sx={mergeSx({ color: 'text.secondary' }, sx)}
    >
      { hostname }
    </MuiLink>
  );
}
