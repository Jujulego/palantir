import { unstable_flag as flag } from '@vercel/flags/next';
import { var$ } from 'kyrielle';

// Types
type UserFlags = Partial<Record<string, boolean>>;

// Load flags
export const userFlags$ = var$<UserFlags>();

export const getUserFlags = async (): Promise<Partial<Record<string, boolean>>> => {
  let userFlags = userFlags$.defer();

  if (!userFlags) {
    const { getSession } = await import('@auth0/nextjs-auth0');
    const session = await getSession();

    userFlags = session?.user?.['https://palantir.capellari.net/featureFlags'] as UserFlags;
    userFlags$.mutate(userFlags);
  }

  return userFlags;
};

export const showIpData = flag({
  key: 'showIpData',
  decide: async () => (await getUserFlags()).showIpData ?? false,
});

export const precomputeFlags = [showIpData] as const;
