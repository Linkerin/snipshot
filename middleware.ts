import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const { device } = userAgent(request);
  requestHeaders.set('x-device-type', device?.type ?? '');
  requestHeaders.set('x-device-model', device?.model ?? '');

  if (process.env.NODE_ENV === 'development') {
    requestHeaders.set('x-real-ip', '127.0.0.1');
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  return response;
}

export const config = {
  matcher: '/:path*'
};
