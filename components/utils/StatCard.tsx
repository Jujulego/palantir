'use client';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import type { SxProps, Theme } from '@mui/material/styles';
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
          <p className="typography-h4">
            <Suspense fallback={<Skeleton />}>{ children }</Suspense>
          </p>
          <h6 className="text-text-secondary/70 typography-body2">
            { title }
          </h6>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
