import { type ConsoleUsersIdParams, decodeId } from '@/app/(private)/console/auth/users/[id]/params';
import Link from '@/components/mui/Link';
import UserLayoutTabs from '@/components/users/UserLayoutTabs';
import UserLayoutToolbar from '@/components/users/UserLayoutToolbar';
import UserLayoutToolbarSkeleton from '@/components/users/UserLayoutToolbarSkeleton';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { type ReactNode, Suspense } from 'react';

// Page
export interface ConsoleUsersIdLayoutProps {
  readonly children: ReactNode;
  readonly params: Promise<ConsoleUsersIdParams>;
}

export default async function ConsoleUsersIdLayout({ children, params }: ConsoleUsersIdLayoutProps) {
  const userId = await decodeId(params);

  return (
    <>
      <Breadcrumbs sx={{ mx: 3, mt: 2, mb: 1 }}>
        <Link underline="hover" color="inherit" href="/console">Console</Link>
        <Link underline="hover" color="inherit" href="/console/auth/users">Users</Link>
        <Typography sx={{ color: 'text.primary' }}>{ userId }</Typography>
      </Breadcrumbs>

      <Suspense fallback={<UserLayoutToolbarSkeleton sx={{ mb: 1 }} />}>
        <UserLayoutToolbar userId={userId} sx={{ mb: 1 }} />
      </Suspense>

      <UserLayoutTabs userId={userId} />

      <Divider />

      { children }
    </>
  );
}
