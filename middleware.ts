import { getSession, withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { unstable_precompute as precompute } from '@vercel/flags/next';
import { createEdgeRouter } from 'next-connect';
import { NextFetchEvent, type NextRequest, NextResponse } from 'next/server';

import { userFlags$, precomputeFlags } from '@/src/flags';

// Router
const router = createEdgeRouter<NextRequest, NextFetchEvent>();

router.get('/.well-known/vercel/flags', () => {
  return NextResponse.next();
});

router.all(withMiddlewareAuthRequired(async (request) => {
  const response = NextResponse.next({ request });

  // Load user flags
  const session = await getSession(request, response);
  userFlags$.mutate(session?.user?.['https://palantir.capellari.net/featureFlags'] ?? {});

  // Precompute flags
  const code = await precompute(precomputeFlags);

  const nextUrl = new URL(request.url);
  nextUrl.searchParams.set('code', code);

  return NextResponse.rewrite(nextUrl, response);
}));

// Middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ]
}

export function middleware(request: NextRequest, event: NextFetchEvent) {
  return router.run(request, event);
}
