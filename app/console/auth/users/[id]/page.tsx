import { type ConsoleUsersIdParams, decodeId } from '@/app/console/auth/users/[id]/params';
import UserEmail from '@/components/users/UserEmail';
import UserIdentities from '@/components/users/UserIdentities';
import FormatDate from '@/components/utils/FormatDate';
import { needRight } from '@/lib/auth/need-right';
import { queryUser } from '@/lib/users/users';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

// Page
export interface ConsoleUsersIdProps {
  readonly params: Promise<ConsoleUsersIdParams>;
}

export default async function ConsoleUsersId({ params }: ConsoleUsersIdProps) {
  await needRight('console:ManageUsers', {
    forbiddenRedirectTo: '/console',
  });

  const userId = await decodeId(params);
  const user = await queryUser(userId);

  if (!user) {
    notFound();
  }

  return (
    <Box component="article" sx={{ flex: '1 0 0', overflow: 'auto' }}>
      <Box component="section" sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', alignContent: 'start', my: 3, px: 3, gap: 3 }}>
        <DataField
          label="Name"
          value={user.name && <Typography>{ user.name }</Typography>}
        />
        <DataField
          label="Nickname"
          value={user.nickname && <Typography>{ user.nickname }</Typography>}
        />
        <DataField
          label="Email"
          value={user.email && <UserEmail user={user} />}
        />
        <DataField
          label="Identities"
          value={<UserIdentities identities={user.identities} />}
        />
      </Box>

      <Box component="section" sx={{ px: 3 }}>
        <Typography component="h2" variant="h5" sx={{ mb: 1 }}>Logins</Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', alignContent: 'start', gap: 3 }}>
          <DataField
            label="Last login"
            value={user.last_login && <FormatDate date={user.last_login} format="lll" />}
          />
          <DataField
            label="Login count"
            value={<Typography>{ user.logins_count ?? 0 }</Typography>}
          />
          <DataField
            label="Last IP address"
            value={user.last_ip && <Typography>{ user.last_ip }</Typography>}
            action={user.last_ip && (
              <IconButton component={Link} href={`/server/${encodeURIComponent(user.last_ip)}/ip-info`}>
                <TravelExploreIcon />
              </IconButton>
            )}
          />
        </Box>
      </Box>
    </Box>
  );
}

// Elements
interface DataFieldProps {
  readonly label: ReactNode;
  readonly value?: ReactNode;
  readonly action?: ReactNode;
}

function DataField({ label, value, action }: DataFieldProps) {
  return (
    <Box component="div" sx={{ display: 'grid', gridTemplateColumns: '1fr auto', gridTemplateRows: 'auto 24px' }}>
      <Typography component="h6" variant="caption" sx={{ fontWeight: 'bold', gridColumn: '1' }}>
        { label }
      </Typography>

      <Box sx={{ gridColumn: '1', alignSelf: 'center' }}>
        { value ?? (
          <Typography color="textSecondary">
            unknown
          </Typography>
        ) }
      </Box>

      { action && (
        <Box sx={{ gridColumn: '2', gridRow: '1 / span 2' }}>
          { action }
        </Box>
      ) }
    </Box>
  );
}