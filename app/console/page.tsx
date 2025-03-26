import UserCount from '@/components/UserCount';
import UserCountSkeleton from '@/components/users/UserCountSkeleton';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Suspense } from 'react';

export default async function AdminPage() {
  return (
    <>
      <Breadcrumbs sx={{ mx: 3, mt: 2, mb: 3 }}>
        <Typography sx={{ color: 'text.primary' }}>Console</Typography>
      </Breadcrumbs>

      <Typography component="h1" variant="h4" sx={{ flex: '0 0 auto', mx: 3, mb: 3 }}>
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
