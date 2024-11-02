import { auth0 } from '@/auth0';
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
  .use('/ip/', async (request, event, next) => {
    const session = await auth0.getSession();

    if (!session) {
      return NextResponse.redirect(`${request.nextUrl.origin}/auth/login?returnTo=${encodeURIComponent(request.nextUrl.pathname)}`);
    } else {
      return next();
    }
  })
  .all(async (request) => {
    return await auth0.middleware(request);
  });
