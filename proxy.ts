import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dbrightservices.com';
const VALID_SUB_PATHS = ['', '/services', '/company-profile', '/contact'];

/**
 * Attach HTTP `Link: <…>; rel="canonical"` header.
 * This gives Google a canonical signal at the HTTP level,
 * reinforcing the <link rel="canonical"> already in HTML.
 */
function withCanonical(response: NextResponse, pathname: string): NextResponse {
    const clean = pathname === '/' ? '' : pathname.replace(/\/$/, '');
    response.headers.set('Link', `<${SITE_URL}${clean}>; rel="canonical"`);
    return response;
}

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
        return withCanonical(response, pathname);
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
    return withCanonical(response, pathname);
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
