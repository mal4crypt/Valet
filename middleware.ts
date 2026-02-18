import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('X-Pathname', request.nextUrl.pathname);

  return {
    headers: requestHeaders,
  };
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
