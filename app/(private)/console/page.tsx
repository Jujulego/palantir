import UserCount from '@/components/UserCount';
import UserCountSkeleton from '@/components/users/UserCountSkeleton';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { Suspense } from 'react';

export default async function AdminPage() {
  return (
    <>
      <Typography component="h1" variant="h4" sx={{ flex: '0 0 auto', m: 3 }}>
        Dashboard
      </Typography>

      <Box
        component="section"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          p: 2,
          gap: 2,
        }}
      >
        <Suspense fallback={<UserCountSkeleton />}>
          <UserCount sx={{ gridColumn: { '@xs': 'span 12', '@sm': 'span 6', '@md': 'span 3' } }} />
        </Suspense>
      </Box>
    </>
  );
}
