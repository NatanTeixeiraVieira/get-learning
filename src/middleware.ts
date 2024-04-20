// export { default } from 'next-auth/middleware';

import { NextRequest, NextResponse } from 'next/server';

import { tokenKey } from 'constants/cookiesKeys';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(tokenKey);
  console.log('🚀 ~ middleware ~ token:', token);
  if (token) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/makePost', '/edit', '/account'],
};
