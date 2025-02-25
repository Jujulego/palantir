import UserCount from '@/components/UserCount';
import UserCountSkeleton from '@/components/users/UserCountSkeleton';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Suspense } from 'react';

export default async function AdminPage() {
  return (
    <>
      <Breadcrumbs sx={{ mx: 3, my: 2 }}>
        <Typography sx={{ color: 'text.primary' }}>Console</Typography>
      </Breadcrumbs>

      <Typography component="h1" variant="h4" sx={{ flex: '0 0 auto', mx: 3, mb: 3 }}>
        Dashboard
      </Typography>

      <Grid2 container spacing={2} padding={2}>
        <Grid2 size={3}>
          <Suspense fallback={<UserCountSkeleton />}>
            <UserCount />
          </Suspense>
        </Grid2>
      </Grid2>
    </>
  );
}
