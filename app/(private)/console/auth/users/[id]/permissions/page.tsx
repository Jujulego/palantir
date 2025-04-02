import { type ConsoleUsersIdParams, decodeId } from '@/app/(private)/console/auth/users/[id]/params';
import UserPermissionListItem from '@/components/users/UserPermissionListItem';
import { needRight } from '@/lib/auth/need-right';
import { queryUser } from '@/lib/users/users';
import { actPatchUser } from '@/lib/users/users.actions';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { notFound } from 'next/navigation';

// Page
export interface ConsoleUsersIdPermissionsProps {
  readonly params: Promise<ConsoleUsersIdParams>;
}

export default async function ConsoleUsersIdPermissions({ params }: ConsoleUsersIdPermissionsProps) {
  await needRight('console:ManageUsers', {
    forbiddenRedirectTo: '/console',
  });

  const userId = await decodeId(params);
  const user = await queryUser(userId);

  if (!user) {
    notFound();
  }

  return (
    <Box component="article" sx={{ flex: '1 0 0', p: 2, overflow: 'auto' }}>
      <section>
        <Typography component="h2" variant="h5" sx={{ mt: 2, mb: 1 }}>IP Address Metadata</Typography>
        <Divider />

        <List disablePadding>
          <UserPermissionListItem
            user={user}
            right="ip:AccessBigDataCloud"
            onPatchAction={actPatchUser}

            primary="BigDataCloud"
            secondary={
              <>Access ip metadata retrieved using <MuiLink href="https://www.bigdatacloud.com" target="_blank">BigDataCloud API</MuiLink></>
            }
          />

          <UserPermissionListItem
            user={user}
            right="ip:AccessIpData"
            onPatchAction={actPatchUser}

            primary="ipdata"
            secondary={
              <>Access ip metadata retrieved using <MuiLink href="https://ipdata.co" target="_blank">ipdata API</MuiLink></>
            }
          />

          <UserPermissionListItem
            user={user}
            right="ip:AccessIpGeolocation"
            onPatchAction={actPatchUser}

            primary="ipgeolocation"
            secondary={
              <>Access ip metadata retrieved using <MuiLink href="https://ipgeolocation.io" target="_blank">ipgeolocation API</MuiLink></>
            }
          />

          <UserPermissionListItem
            user={user}
            right="ip:AccessIpQualityScore"
            onPatchAction={actPatchUser}

            primary="IPQualityScore"
            secondary={
              <>Access ip metadata retrieved using <MuiLink href="https://www.ipqualityscore.com" target="_blank">IPQualityScore API</MuiLink></>
            }
          />
        </List>
      </section>

      <section>
        <Typography component="h2" variant="h5" sx={{ mt: 2, mb: 1 }}>Console</Typography>
        <Divider />

        <List disablePadding>
          <UserPermissionListItem
            user={user}
            right="console:ManageUsers"
            onPatchAction={actPatchUser}

            primary="Manage users"
            secondary="Access and update users from the console"
          />
        </List>
      </section>
    </Box>
  );
}
