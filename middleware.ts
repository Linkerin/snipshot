import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-real-ip', '127.0.0.1');

    const response = NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*'
};
