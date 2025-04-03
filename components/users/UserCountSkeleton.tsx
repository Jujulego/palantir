'use client';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
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
          <Typography component="span" variant="h4">
            <Skeleton />
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
            Users
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
