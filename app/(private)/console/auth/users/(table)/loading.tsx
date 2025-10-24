import UserTableSkeleton from '@/components/users/UserTableSkeleton';
import Link from '@/components/mui/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// Loading state
export default function ConsoleUsersLoading() {
  return (
    <>
      <Breadcrumbs sx={{ mx: 3, mt: 2, mb: 3 }}>
        <Link underline="hover" color="inherit" href="/console">Console</Link>
        <Typography sx={{ color: 'text.primary' }}>Users</Typography>
      </Breadcrumbs>

      <Typography component="h1" variant="h4" sx={{ mx: 3, mb: 3 }}>
        Users
      </Typography>

      <Divider />

      <UserTableSkeleton />
    </>
  );
}
