import { type ConsoleUsersIdParams, decodeId } from '@/app/console/auth/users/[id]/params';
import { queryUser } from '@/lib/users/users';
import { notFound } from 'next/navigation';

// Page
export interface ConsoleUsersIdPermissionsProps {
  readonly params: Promise<ConsoleUsersIdParams>;
}

export default async function ConsoleUsersIdPermissions({ params }: ConsoleUsersIdPermissionsProps) {
  const userId = await decodeId(params);
  const user = await queryUser(userId);

  if (!user) {
    notFound();
  }

  return (
    <h1>Hello world !</h1>
  );
}
