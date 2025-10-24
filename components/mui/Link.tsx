'use client';

import MuiLink, { type LinkProps as MuiLinkProps } from '@mui/material/Link';
import NextLink from 'next/link';

export default function Link({ children, ...props }: LinkProps) {
  return <MuiLink {...props} component={NextLink}>{ children }</MuiLink>;
}

export type LinkProps = Omit<MuiLinkProps<typeof NextLink>, 'component'>;
