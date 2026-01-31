import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const token = request.cookies.get('auth-token');
    const path = request.nextUrl.pathname;

    // Paths that should not be accessible if logged in
    const isAuthRoute = path === '/' || path === '/register';

    // Paths that require authentication
    const isProtectedRoute = path.startsWith('/dashboard');

    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/register', '/dashboard/:path*'],
};
