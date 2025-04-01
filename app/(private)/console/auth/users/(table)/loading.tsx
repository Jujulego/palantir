import UserTableSkeleton from '@/components/users/UserTableSkeleton';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

// Loading state
export default function ConsoleUsersLoading() {
  return (
    <>
      <Breadcrumbs sx={{ mx: 3, mt: 2, mb: 3 }}>
        <MuiLink underline="hover" color="inherit" component={Link} href="/console">Console</MuiLink>
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
