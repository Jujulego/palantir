import UserCount from '@/components/UserCount';
import UserCountSkeleton from '@/components/users/UserCountSkeleton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Suspense } from 'react';

export default async function AdminPage() {
  return (
    <>
      <Typography component="h1" variant="h4" sx={{ flex: '0 0 auto', m: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={2} padding={2}>
        <Grid size={3}>
          <Suspense fallback={<UserCountSkeleton />}>
            <UserCount />
          </Suspense>
        </Grid>
      </Grid>
    </>
  );
}
