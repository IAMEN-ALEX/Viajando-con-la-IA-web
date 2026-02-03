import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Ensure static assets and manifest are always accessible
    // This explicitly tells Next.js not to block these paths if we add auth logic later
    if (
        request.nextUrl.pathname.match(/\.(css|js|json|png|jpg|ico|svg|webp)$/) ||
        request.nextUrl.pathname.startsWith('/_next') ||
        request.nextUrl.pathname.startsWith('/api/auth') ||
        request.nextUrl.pathname === '/manifest.json'
    ) {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
