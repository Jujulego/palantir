'use client';

import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Link from 'next/link';

export default function IconLink({ children, ...props }: IconLinkProps) {
  return <IconButton {...props} component={Link}>{ children }</IconButton>;
}

export type IconLinkProps = Omit<IconButtonProps<typeof Link>, 'component'>;
