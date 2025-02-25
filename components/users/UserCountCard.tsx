'use client';

import { actQueryUsers } from '@/lib/users/users.actions';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import useSWR from 'swr';

// Component
export interface UserCountCardProps {
  readonly userCount: number;
}

export default function UserCountCard({ userCount }: UserCountCardProps) {
  const { data } = useSWR(['users', '--count--'], userCountFetcher, {
    fallbackData: userCount,
    focusThrottleInterval: 30_000,
    revalidateOnMount: false,
  });

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

// Utils
async function userCountFetcher(): Promise<number> {
  const { total } = await actQueryUsers({ includeTotals: true, perPage: 0 });
  return total;
}
