import { auth0 } from '@/auth0';
import { isAuthenticated, type IsAuthenticatedOpts } from '@/lib/auth/is-authenticated';
import type { RightKey } from '@/lib/auth/permissions';
import { queryUser } from '@/lib/users/users';
import { redirect, RedirectType } from 'next/navigation';
import { cache } from 'react';

// Utils
export async function needRight(right: RightKey, opts: NeedRightOpts = {}) {
  const [session, rights] = await Promise.all([isAuthenticated(), await querySessionRights()]);

  if (!rights.includes(right)) {
    redirect(opts.forbiddenRedirectTo ?? '/', RedirectType.replace);
  }

  return session;
}

export const querySessionRights = cache(async () => {
  const session = await auth0.getSession();

  if (!session) {
    return [];
  }

  const user = await queryUser(session.user.sub);
  return user?.app_metadata?.permissions ?? [];
});

// Types
export interface NeedRightOpts extends IsAuthenticatedOpts {
  readonly forbiddenRedirectTo?: string;
}
