import { type ConsoleUsersIdParams, decodeId } from '@/app/console/auth/users/[id]/params';
import { queryUser } from '@/lib/users/users';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Page
export interface ConsoleUsersIdPageProps {
  readonly params: Promise<ConsoleUsersIdParams>;
}

export default async function ConsoleUsersPage({ params }: ConsoleUsersIdPageProps) {
  const userId = await decodeId(params);
  const user = await queryUser(userId);

  if (!user) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs sx={{ mx: 3, my: 2 }}>
        <MuiLink underline="hover" color="inherit" component={Link} href="/console">Console</MuiLink>
        <MuiLink underline="hover" color="inherit" component={Link} href="/console/auth/users">Users</MuiLink>
        <Typography sx={{ color: 'text.primary' }}>{ userId }</Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', mx: 3, mb: 3 }}>
        <Avatar src={user.picture} alt={user.nickname ?? user.name} sx={{ height: 48, width: 48, mr: 2 }}  />

        <Typography component="h1" variant="h4">
          { user.nickname ?? user.name }
        </Typography>
      </Box>

      <Divider />

      <code style={{ whiteSpace: 'pre' }}>
        { JSON.stringify(user, null, 2) }
      </code>
    </>
  );
}