import UserCountSsr from '@/components/users/UserCountSsr';
import StatCard from '@/components/utils/StatCard';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';

// Page
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
        <StatCard
          title="Users"
          href="/console/auth/users"
          sx={{ gridColumn: { '@xs': 'span 12', '@sm': 'span 6', '@md': 'span 3' } }}
        >
          <UserCountSsr />
        </StatCard>
      </Box>
    </>
  );
}
