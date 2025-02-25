'use client';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

// Component
export default function UserCountSkeleton() {
  return (
    <Card>
      <CardActionArea component={Link} href="/console/auth/users">
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            User count
          </Typography>
          <Typography variant="h4">
            <Skeleton />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
