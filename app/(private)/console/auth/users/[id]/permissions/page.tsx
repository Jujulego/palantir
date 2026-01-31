import { decodeId } from '@/app/(private)/console/auth/users/[id]/params';
import UserPermissionListItem from '@/components/users/UserPermissionListItem';
import { needRight } from '@/lib/auth/need-right';
import { queryUser } from '@/lib/users/users';
import { actPatchUser } from '@/lib/users/users.actions';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import List from '@mui/material/List';
import { notFound } from 'next/navigation';

// Page
export default async function ConsoleUsersIdPermissions({ params }: PageProps<'/console/auth/users/[id]/permissions'>) {
  await needRight('console:ManageUsers', {
    forbiddenRedirectTo: '/console',
  });

  const userId = await decodeId(params);
  const user = await queryUser(userId);

  if (!user) {
    notFound();
  }

  return (
    <article className="p-4 overflow-auto grow shrink-0 basis-0">
      <section>
        <h2 className="typography-h5 mt-4 mb-2">IP Address Metadata</h2>
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
        <h2 className="typography-h5 mt-4 mb-2">Console</h2>
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
    </article>
  );
}
