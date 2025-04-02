'use client';

import { useUserCount } from '@/lib/users/useUserCount';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import type { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

// Component
export interface UserCountCardProps {
  readonly userCount: number;
  readonly sx?: SxProps<Theme>;
}

export default function UserCountCard({ userCount, sx }: UserCountCardProps) {
  const { data } = useUserCount({ fallbackData: userCount });

  return (
    <Card sx={sx}>
      <CardActionArea component={Link} href="/console/auth/users">
        <CardContent>
          <Typography component="span" variant="h4">{ data }</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
            Users
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
