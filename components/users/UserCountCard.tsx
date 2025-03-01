'use client';

import { useUserCount } from '@/lib/users/useUserCount';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

// Component
export interface UserCountCardProps {
  readonly userCount: number;
}

export default function UserCountCard({ userCount }: UserCountCardProps) {
  const { data } = useUserCount({ fallbackData: userCount });

  return (
    <Card>
      <CardActionArea component={Link} href="/console/auth/users">
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            User count
          </Typography>
          <Typography variant="h4">{ data }</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
