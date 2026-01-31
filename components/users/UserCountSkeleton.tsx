'use client';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import { SxProps, Theme } from '@mui/material/styles';
import Link from 'next/link';

// Component
export interface UserCountSkeletonProps {
  readonly sx?: SxProps<Theme>;
}

export default function UserCountSkeleton({ sx }: UserCountSkeletonProps) {
  return (
    <Card sx={sx}>
      <CardActionArea component={Link} href="/console/auth/users">
        <CardContent>
          <p className="typography-h4">
            <Skeleton />
          </p>
          <h6 className="typography-body2 text-text-secondary/70">
            Users
          </h6>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
