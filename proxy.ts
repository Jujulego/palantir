import { auth0 } from '@/auth0';
import { setUser } from '@sentry/nextjs';
import { createEdgeRouter } from 'next-connect';
import { type NextFetchEvent, type NextRequest, NextResponse } from 'next/server';

// Proxy
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ]
};

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  return router.run(request, event);
}

// Router
const router = createEdgeRouter<NextRequest, NextFetchEvent>();

router
  .use(async (request, _, next) => {
    const session = await auth0.getSession(request);

    if (session) {
      setUser({
        id: session.user.sub,
        username: session.user.name,
        email: session.user.email,
      });
    }

    return next();
  })
  .use('/console/', async (request, _, next) => {
    const session = await auth0.getSession(request);

    if (session) {
      return next();
    }

    return NextResponse.redirect(`${request.nextUrl.origin}/auth/login?returnTo=${encodeURIComponent(request.nextUrl.pathname)}`);
  })
  .all(async (request) => {
    return await auth0.middleware(request);
  });
