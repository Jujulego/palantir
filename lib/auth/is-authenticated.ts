import { auth0 } from '@/auth0';
import { redirect, RedirectType } from 'next/navigation';

// Utils
export async function isAuthenticated(opts: IsAuthenticatedOpts = {}) {
  const session = await auth0.getSession();

  if (!session) {
    redirect(`/auth/login?returnTo=${encodeURIComponent(opts.loginReturnTo ?? '/')}`, RedirectType.replace);
  }

  return session;
}

export interface IsAuthenticatedOpts {
  readonly loginReturnTo?: string;
}
