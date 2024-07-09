import { getSession, withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { unstable_precompute as precompute } from '@vercel/flags/next';
import { NextResponse } from 'next/server';

import { userFlags$, precomputeFlags } from '@/src/flags';

// Config
export const config = {
  matcher: [
    '/((?!\.well-known/vercel/flags|favicon\.ico).*)',
  ]
}

// Middleware
export default withMiddlewareAuthRequired(async (request) => {
  if (request.nextUrl.pathname.startsWith('/api')) {
    return;
  }

  // Load user flags
  const response = NextResponse.next({ request });
  const session = await getSession(request, response);

  userFlags$.mutate(session?.user?.['https://palantir.capellari.net/featureFlags'] ?? {});

  // Precompute flags
  const code = await precompute(precomputeFlags);
  const nextUrl = new URL(`/${code}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url);

  return NextResponse.rewrite(nextUrl, response);
});
