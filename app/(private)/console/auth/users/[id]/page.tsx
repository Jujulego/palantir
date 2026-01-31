import { decodeId } from '@/app/(private)/console/auth/users/[id]/params';
import IconLink from '@/components/mui/IconLink';
import UserEmail from '@/components/users/UserEmail';
import UserIdentities from '@/components/users/UserIdentities';
import FormatDate from '@/components/utils/FormatDate';
import { needRight } from '@/lib/auth/need-right';
import { queryUser } from '@/lib/users/users';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Divider from '@mui/material/Divider';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

// Page
export default async function ConsoleUsersId({ params }: PageProps<'/console/auth/users/[id]'>) {
  await needRight('console:ManageUsers', {
    forbiddenRedirectTo: '/console',
  });

  const userId = await decodeId(params);
  const user = await queryUser(userId);

  if (!user) {
    notFound();
  }

  return (
    <article className="grow shrink-0 basis-0 overflow-auto pt-4">
      <section className="grid grid-cols-1 @sm:grid-cols-2 content-start mb-6 px-6 gap-6">
        <DataField
          label="Name"
          value={user.name && <p>{user.name}</p>}
        />
        <DataField
          label="Nickname"
          value={user.nickname && <p>{user.nickname}</p>}
        />
        <DataField
          label="Email"
          value={user.email && <UserEmail user={user}/>}
        />
        <DataField
          label="Identities"
          value={<UserIdentities identities={user.identities}/>}
        />
      </section>

      <section className="px-6">
        <h2 className="typography-h5 mb-2">Logins</h2>
        <Divider sx={{ mb: 2 }}/>

        <div className="grid grid-cols-1 @sm:grid-cols-2 content-start gap-6">
          <DataField
            label="Last login"
            value={user.last_login && <FormatDate date={user.last_login} format="lll"/>}
          />
          <DataField
            label="Login count"
            value={<p>{user.logins_count ?? 0}</p>}
          />
          <DataField
            label="Last IP address"
            value={user.last_ip && <p>{user.last_ip}</p>}
            action={user.last_ip && (
              <IconLink href={`/server/${encodeURIComponent(user.last_ip)}/ip-info`}>
                <TravelExploreIcon/>
              </IconLink>
            )}
          />
        </div>
      </section>
    </article>
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
    <div className="grid grid-cols-[1fr_auto] grid-rows-[auto_24px]">
      <h6 className="typography-caption font-bold col-start-1">
        {label}
      </h6>

      <div className="col-start-1 self-center">
        {value ?? (
          <p color="textSecondary">unknown</p>
        )}
      </div>

      {action && (
        <div className="col-start-2 row-span-2 row-start-1">{ action }</div>
      )}
    </div>
  );
}
