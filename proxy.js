import { NextResponse } from 'next/server';

// Protect routes by checking for a dc_user cookie. If missing, redirect to home '/'.
const PROTECTED = ['/dashboard','/donors','/donations','/campaigns','/admin'];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  // Only consider top-level protected prefixes
  const matches = PROTECTED.some(p => pathname === p || pathname.startsWith(p + '/'));
  if (!matches) return NextResponse.next();

  const dcUser = request.cookies.get('dc_user');
  if (!dcUser) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/donors/:path*',
    '/donations/:path*',
    '/campaigns/:path*',
    '/admin/:path*'
  ]
};
