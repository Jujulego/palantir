import { auth0 } from '@/auth0';
import { createEdgeRouter } from 'next-connect';
import { NextFetchEvent, type NextRequest } from 'next/server';

// Router
const router = createEdgeRouter<NextRequest, NextFetchEvent>();

router.all((request) => auth0.middleware(request));

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
