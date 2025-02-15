import { auth0 } from '@/auth0';
import { redirect, RedirectType } from 'next/navigation';

export async function isAuthenticated(opts: IsAuthenticatedOpts = {}) {
  const session = await auth0.getSession();

  if (!session) {
    redirect(`/auth/login?returnTo=${encodeURIComponent(opts.returnTo ?? '/')}`, RedirectType.replace);
  }

  return session;
}

export interface IsAuthenticatedOpts {
  readonly returnTo?: string;
}
