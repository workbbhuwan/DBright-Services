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
    const { pagePath, pageTitle, referrer, visitorId, country, city } = body;

    // Get headers
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const userAgent = headersList.get('user-agent') || '';
    
    // Parse user agent for device info
    const deviceType = getDeviceType(userAgent);
    const browser = getBrowser(userAgent);
    const os = getOS(userAgent);

    // Track page view with location data
    await trackPageView({
      pagePath,
      pageTitle,
      referrer,
      ipAddress,
      userAgent,
      country: country || null,
      city: city || null,
      deviceType,
      browser,
      os,
    });

    // Track unique visitor with location
    if (visitorId) {
      await trackVisitor({
        visitorId,
        ipAddress,
        country: country || null,
        city: city || null,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error tracking analytics:', error);
    }
    return NextResponse.json(
      { error: 'Failed to track analytics' },
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
