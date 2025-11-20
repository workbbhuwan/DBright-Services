import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // List of valid routes
    const validRoutes = [
        '/',
        '/services',
        '/company-profile',
        '/contact',
        '/api/contact',
    ];

    // Check if the pathname starts with any valid route
    const isValidRoute = validRoutes.some(route =>
        pathname === route || pathname.startsWith(`${route}/`)
    );

    // Check if it's a static file (has an extension)
    const isStaticFile = /\.[^/]+$/.test(pathname);

    // If not a valid route and not a static file, redirect to home
    if (!isValidRoute && !isStaticFile && pathname !== '/_next' && !pathname.startsWith('/_next/')) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
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
