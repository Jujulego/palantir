'use client';

import { IconButton, type IconButtonProps } from '@mui/material';
import Link from 'next/link';

export function IconLink({ children, ...props }: IconLinkProps) {
  return <IconButton {...props} component={Link}>{ children }</IconButton>;
}

export type IconLinkProps = IconButtonProps<typeof Link>;