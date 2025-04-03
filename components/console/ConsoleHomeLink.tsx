'use client';

import PalantirIcon from '@/components/icons/PalantirIcon';
import { mergeSx } from '@/lib/utils/mui';
import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import Link from 'next/link';

// Component
export interface ConsoleHomeLinkProps {
  readonly sx?: SxProps<Theme>;
}

export default function ConsoleHomeLink({ sx }: ConsoleHomeLinkProps) {
  return (
    <Button
      component={Link}
      href="/"
      color="inherit"
      sx={mergeSx({ gap: 2, fontSize: '1.25rem', lineHeight: 1.25, textTransform: 'capitalize' }, sx)}
    >
      <PalantirIcon width={24} height={24} sx={{ display: { xs: 'none', lg: 'block' } }} />
      Palantir
    </Button>
  );
}
