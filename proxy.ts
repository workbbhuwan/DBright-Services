import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const VALID_SUB_PATHS = ['', '/services', '/company-profile', '/contact'];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ── Skip internal / static / API / admin paths ──
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/admin') ||
        /\.[^/]+$/.test(pathname)
    ) {
        // Keep existing admin protection logic
        if (pathname.startsWith('/admin')) {
            const session = request.cookies.get('admin_session');
            if (pathname === '/admin') return NextResponse.next();
            if (pathname.startsWith('/api/admin') && pathname !== '/api/admin/login') {
                if (!session) {
                    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
                }
            }
        }
        return NextResponse.next();
    }

    // ── /ja/* → strip prefix and redirect to / (canonical is root) ──
    if (pathname === '/ja' || pathname.startsWith('/ja/')) {
        const rest = pathname.replace(/^\/ja/, '') || '/';
        const url = request.nextUrl.clone();
        url.pathname = rest;
        return NextResponse.redirect(url, 301);
    }

    // ── /en/* → internally rewrite to /[locale]=en route ──
    if (pathname === '/en' || pathname.startsWith('/en/')) {
        const subPath = pathname.replace(/^\/en/, '') || '';
        const normalizedSubPath = subPath === '/' ? '' : subPath.replace(/\/$/, '');

        if (!VALID_SUB_PATHS.includes(normalizedSubPath)) {
            const url = request.nextUrl.clone();
            url.pathname = '/en';
            return NextResponse.redirect(url);
        }

        // Let Next.js handle the /en/* route via [locale]
        const response = NextResponse.next();
        response.headers.set('x-locale', 'en');
        return response;
    }

    // ── Root paths (no locale prefix) → rewrite to /ja/* internally ──
    const normalizedPath = pathname === '/' ? '' : pathname.replace(/\/$/, '');

    if (!VALID_SUB_PATHS.includes(normalizedPath)) {
        // Invalid path → redirect to home
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    // Rewrite / → /ja (internal, URL stays as /)
    const url = request.nextUrl.clone();
    url.pathname = `/ja${pathname === '/' ? '' : pathname}`;
    const response = NextResponse.rewrite(url);
    response.headers.set('x-locale', 'ja');
    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
