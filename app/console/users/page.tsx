import { queryUsers } from '@/lib/auth/users';

export default async function ConsoleUsersPage() {
  const users = await queryUsers();

  return (
    <code style={{ whiteSpace: 'pre' }}>
      { JSON.stringify(users, null, 2) }
    </code>
  );
}