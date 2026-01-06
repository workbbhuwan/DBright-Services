/**
 * Analytics Tracking API Route
 * Tracks page views and visitor analytics
 */

import { NextRequest, NextResponse } from 'next/server';
import { savePageAnalytics } from '@/lib/db';

// Helper to detect device type
function getDeviceType(userAgent: string): string {
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    return 'Tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    return 'Mobile';
  }
  return 'Desktop';
}

// Helper to detect browser
function getBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes('edg/') || ua.includes('edge/')) return 'Edge';
  if (ua.includes('chrome/') && !ua.includes('edg/')) return 'Chrome';
  if (ua.includes('safari/') && !ua.includes('chrome/')) return 'Safari';
  if (ua.includes('firefox/')) return 'Firefox';
  if (ua.includes('opera/') || ua.includes('opr/')) return 'Opera';
  if (ua.includes('msie') || ua.includes('trident/')) return 'Internet Explorer';
  return 'Unknown';
}

// Helper to detect OS
function getOS(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes('windows')) return 'Windows';
  if (ua.includes('mac os x') || ua.includes('macintosh')) return 'macOS';
  if (ua.includes('linux')) return 'Linux';
  if (ua.includes('android')) return 'Android';
  if (ua.includes('iphone') || ua.includes('ipad')) return 'iOS';
  return 'Unknown';
}

// Helper to get IP address
function getIpAddress(request: NextRequest): string | undefined {
  // Try various headers for IP address (works with most hosting providers)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;
  
  const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare
  if (cfConnectingIp) return cfConnectingIp;
  
  return undefined;
}

// Helper to get country from IP (simplified version)
// In production, you'd use a GeoIP service or Cloudflare headers
function getCountryFromHeaders(request: NextRequest): string | undefined {
  // Cloudflare provides country code in headers
  const cfCountry = request.headers.get('cf-ipcountry');
  if (cfCountry && cfCountry !== 'XX') return cfCountry;
  
  // Vercel provides geo data
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  if (vercelCountry) return vercelCountry;
  
  return undefined;
}

// POST: Track page visit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    
    const analyticsData = {
      pagePath: body.path || '/',
      referrer: body.referrer,
      ipAddress: getIpAddress(request),
      country: getCountryFromHeaders(request) || body.country,
      city: body.city,
      deviceType: getDeviceType(userAgent),
      browser: getBrowser(userAgent),
      os: getOS(userAgent),
      screenResolution: body.screenResolution,
      language: body.language || request.headers.get('accept-language')?.split(',')[0],
      userAgent: userAgent,
      sessionId: body.sessionId,
    };

    await savePageAnalytics(analyticsData);

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Track API] Error:', error);
    
    // Don't fail on tracking errors
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  }
}
