import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Paths that do not require authentication
  const isPublicPath = path === '/login' || path.startsWith('/api/auth');

  // Static files and next internals are generally bypassed by matcher anyway,
  // but just in case:
  if (path.startsWith('/_next') || path.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }

  const session = req.cookies.get('admin_session')?.value;

  // If trying to access a protected route without a session, redirect to login
  if (!isPublicPath && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If trying to access the login page while already authenticated, redirect to dashboard
  if (path === '/login' && session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except api, _next/static, _next/image, favicon.ico
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
