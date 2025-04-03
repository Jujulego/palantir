'use client';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import type { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { type ReactNode, Suspense } from 'react';

// Component
export interface StatCardProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly title: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function StatCard({ href, children, title, sx }: StatCardProps) {
  return (
    <Card sx={sx}>
      <CardActionArea component={Link} href={href}>
        <CardContent>
          <Typography component="span" variant="h4">
            <Suspense fallback={<Skeleton />}>{ children }</Suspense>
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
            { title }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
