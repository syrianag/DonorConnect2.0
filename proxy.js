// Migrated from deprecated middleware.js — single proxy handler
import { NextResponse } from 'next/server';

// Protect routes by checking for a dc_user cookie. If missing, redirect to home '/'.
const PROTECTED = ['/dashboard', '/donors', '/donations', '/campaigns', '/admin'];

// Next.js will call this exported `proxy` function for matching routes.
export function proxy(request) {
  const { pathname } = request.nextUrl;
  // Only consider top-level protected prefixes
  const matches = PROTECTED.some((p) => pathname === p || pathname.startsWith(p + '/'));
  if (!matches) return NextResponse.next();

  const dcUser = request.cookies.get('dc_user');
  if (!dcUser) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Keep `config.matcher` so Next.js knows which routes to invoke this proxy for.
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/donors/:path*',
    '/donations/:path*',
    '/campaigns/:path*',
    '/admin/:path*',
  ],
};
