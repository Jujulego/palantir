import UserTable from '@/components/users/UserTable';
import { queryUsers } from '@/lib/auth/users';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

// Page
export default async function ConsoleUsersPage() {
  const { users, total } = await queryUsers({ includeTotals: true });

  return (
    <>
      <Breadcrumbs sx={{ mx: 3, my: 2 }}>
        <MuiLink underline="hover" color="inherit" component={Link} href="/console">Console</MuiLink>
        <Typography sx={{ color: 'text.primary' }}>Users</Typography>
      </Breadcrumbs>

      <Typography component="h1" variant="h4" sx={{ flex: '0 0 auto', mx: 3, mb: 3 }}>
        Users
      </Typography>

      <Divider />

      <UserTable
        users={users}
        userCount={total}
        sx={{ flex: '1 0 0' }}
      />
    </>
  );
}
