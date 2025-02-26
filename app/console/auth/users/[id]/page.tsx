import { type ConsoleUsersIdParams, decodeId } from '@/app/console/auth/users/[id]/params';
import { needRight } from '@/lib/auth/need-right';
import { queryUser } from '@/lib/users/users';
import Box from '@mui/material/Box';
import { notFound } from 'next/navigation';

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
    <Box sx={{ flex: '1 0 0', overflow: 'auto' }}>
      <code style={{ whiteSpace: 'pre' }}>
        { JSON.stringify(user, null, 2) }
      </code>
    </Box>
  );
}
