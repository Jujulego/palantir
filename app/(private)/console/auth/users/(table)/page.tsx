import Link from '@/components/mui/Link';
import UserTable from '@/components/users/UserTable';
import { needRight } from '@/lib/auth/need-right';
import { queryUsers } from '@/lib/users/users';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// Page
export default async function ConsoleUsersPage() {
  await needRight('console:ManageUsers', {
    forbiddenRedirectTo: '/console',
  });
  const { users, total } = await queryUsers({ includeTotals: true });

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

      <UserTable
        users={users}
        userCount={total}
        sx={{ flex: '1 0 0' }}
      />
    </>
  );
}
