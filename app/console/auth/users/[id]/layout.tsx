import { type ConsoleUsersIdParams, decodeId } from '@/app/console/auth/users/[id]/params';
import UserLayoutToolbar from '@/components/users/UserLayoutToolbar';
import UserLayoutToolbarSkeleton from '@/components/users/UserLayoutToolbarSkeleton';
import UserLayoutTabs from '@/components/users/UserLayoutTabs';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
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
        <MuiLink underline="hover" color="inherit" component={Link} href="/console">Console</MuiLink>
        <MuiLink underline="hover" color="inherit" component={Link} href="/console/auth/users">Users</MuiLink>
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
