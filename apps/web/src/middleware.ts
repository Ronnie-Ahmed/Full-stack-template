import { NextResponse, type NextRequest } from 'next/server';

// Cheap optimistic check; the real auth check happens in the API.
export function middleware(req: NextRequest) {
  if (!req.cookies.has('token')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*'] };
