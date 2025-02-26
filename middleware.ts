import { auth0 } from '@/auth0';
import { querySessionRights } from '@/lib/auth/need-right';
import { setUser } from '@sentry/nextjs';
import { createEdgeRouter } from 'next-connect';
import { type NextFetchEvent, type NextRequest, NextResponse } from 'next/server';

// Middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - monitoring (sentry tunnel)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|monitoring|favicon.ico|sitemap.xml|robots.txt).*)',
  ]
};

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  return router.run(request, event);
}

// Router
const router = createEdgeRouter<NextRequest, NextFetchEvent>();

router
  .use(async (request, _, next) => {
    const session = await auth0.getSession();

    setUser({
      id: session?.user?.sub,
      email: session?.user?.email,
      ip_address: request.headers.get('X-Forwarded-For') ?? undefined,
    });

    return next();
  })
  .use('/console/', async (request, _, next) => {
    const session = await auth0.getSession();

    if (session) {
      return next();
    }

    return NextResponse.redirect(`${request.nextUrl.origin}/auth/login?returnTo=${encodeURIComponent(request.nextUrl.pathname)}`);
  })
  .use('/console/auth/users', async (request, _, next) => {
    const rights = await querySessionRights();

    if (rights.includes('console:ManageUsers')) {
      return next();
    }

    return NextResponse.redirect(`${request.nextUrl.origin}/console`);
  })
  .all(async (request) => {
    return await auth0.middleware(request);
  });
