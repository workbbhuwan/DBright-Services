/**
 * Analytics API Route
 * Tracks page views and visitor data
 */

import { NextResponse } from 'next/server';
import { trackPageView, trackVisitor, initDatabase } from '@/lib/db';
import { headers } from 'next/headers';

// POST: Track page view
export async function POST(request: Request) {
  try {
    // Initialize database tables if they don't exist
    await initDatabase();
    
    const body = await request.json();
    const { pagePath, pageTitle, referrer, visitorId } = body;

    // Get headers
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const userAgent = headersList.get('user-agent') || '';
    
    // Parse user agent for device info
    const deviceType = getDeviceType(userAgent);
    const browser = getBrowser(userAgent);
    const os = getOS(userAgent);

    // Use Vercel's built-in geo headers (fast, free, reliable)
    // These are automatically provided by Vercel Edge Network
    const country = headersList.get('x-vercel-ip-country') || null;
    const city = headersList.get('x-vercel-ip-city') || null;
    
    // Fallback: Only use external API if Vercel headers not available (local dev)
    // In production on Vercel, the headers above will always be present
    if (!country && ipAddress && ipAddress !== 'unknown' && !ipAddress.startsWith('127.') && !ipAddress.startsWith('192.168.')) {
      try {
        const geoResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`, {
          signal: AbortSignal.timeout(1000), // 1 second timeout for fallback
        });
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          // Note: Free tier limited to 1000 requests/day
        }
      } catch {
        // Silently ignore geolocation failures in fallback
      }
    }

    // Track page view with location data
    await trackPageView({
      pagePath,
      pageTitle,
      referrer,
      ipAddress,
      userAgent,
      country,
      city,
      deviceType,
      browser,
      os,
    });

    // Track unique visitor with location
    if (visitorId) {
      await trackVisitor({
        visitorId,
        ipAddress,
        country,
        city,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[Analytics] Error tracking:', error);
    return NextResponse.json(
      { error: 'Failed to track analytics', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Helper functions to parse user agent
function getDeviceType(userAgent: string): string {
  if (/mobile/i.test(userAgent)) return 'Mobile';
  if (/tablet|ipad/i.test(userAgent)) return 'Tablet';
  return 'Desktop';
}

function getBrowser(userAgent: string): string {
  if (/edg/i.test(userAgent)) return 'Edge';
  if (/opr|opera/i.test(userAgent)) return 'Opera';
  if (/chrome/i.test(userAgent) && !/edg/i.test(userAgent)) return 'Chrome';
  if (/firefox/i.test(userAgent)) return 'Firefox';
  if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) return 'Safari';
  if (/msie|trident/i.test(userAgent)) return 'IE';
  return 'Other';
}

function getOS(userAgent: string): string {
  if (/windows/i.test(userAgent)) return 'Windows';
  if (/mac/i.test(userAgent)) return 'macOS';
  if (/linux/i.test(userAgent)) return 'Linux';
  if (/android/i.test(userAgent)) return 'Android';
  if (/ios|iphone|ipad/i.test(userAgent)) return 'iOS';
  return 'Other';
}
