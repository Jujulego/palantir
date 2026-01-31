import Link from '@/components/mui/Link';
import UserTableSkeleton from '@/components/users/UserTableSkeleton';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';

// Loading state
export default function ConsoleUsersLoading() {
  return (
    <>
      <Breadcrumbs sx={{ mx: 3, mt: 2, mb: 3 }}>
        <Link underline="hover" color="inherit" href="/console">Console</Link>
        <p className="text-text-primary">Users</p>
      </Breadcrumbs>

      <h1 className="typography-h4 mx-6 mb-6">
        Users
      </h1>

      <Divider />

      <UserTableSkeleton />
    </>
  );
}
