import {NextRequest, NextResponse} from 'next/server'

const AUTH_COOKIE_NAME = 'capster_session';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    const loginUrl = new URL('/login-capster', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/capster/dashboard/:path*'],
}