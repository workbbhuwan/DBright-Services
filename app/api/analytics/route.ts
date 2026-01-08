/**
 * Analytics API Route
 * Provides visitor analytics for the admin dashboard
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { 
  getAnalyticsStats,
  getAnalyticsByCountry,
  getAnalyticsByDevice,
  getAnalyticsByBrowser,
  getDailyVisitCounts,
  getTopPages,
  initDatabase 
} from '@/lib/db';

// Helper to check authentication
async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return !!session;
}

// GET: Fetch analytics data
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    if (!await isAuthenticated()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get days parameter from query string
    const searchParams = request.nextUrl.searchParams;
    const days = parseInt(searchParams.get('days') || '30');

    // Initialize database if needed
    const initPromise = initDatabase();
    const timeoutPromise = new Promise((resolve) => 
      setTimeout(() => resolve({ success: false, timeout: true }), 8000)
    );
    
    await Promise.race([initPromise, timeoutPromise]);

    // Fetch all analytics data in parallel with timeout protection
    const [
      statsResult,
      countryResult,
      deviceResult,
      browserResult,
      dailyVisitsResult,
      topPagesResult
    ] = await Promise.all([
      Promise.race([
        getAnalyticsStats(days),
        new Promise<{ success: boolean; data: Record<string, number> }>((resolve) => setTimeout(() => resolve({ success: false, data: {} }), 5000))
      ]),
      Promise.race([
        getAnalyticsByCountry(days),
        new Promise<{ success: boolean; data: never[] }>((resolve) => setTimeout(() => resolve({ success: false, data: [] }), 5000))
      ]),
      Promise.race([
        getAnalyticsByDevice(days),
        new Promise<{ success: boolean; data: never[] }>((resolve) => setTimeout(() => resolve({ success: false, data: [] }), 5000))
      ]),
      Promise.race([
        getAnalyticsByBrowser(days),
        new Promise<{ success: boolean; data: never[] }>((resolve) => setTimeout(() => resolve({ success: false, data: [] }), 5000))
      ]),
      Promise.race([
        getDailyVisitCounts(days),
        new Promise<{ success: boolean; data: never[] }>((resolve) => setTimeout(() => resolve({ success: false, data: [] }), 5000))
      ]),
      Promise.race([
        getTopPages(days),
        new Promise<{ success: boolean; data: never[] }>((resolve) => setTimeout(() => resolve({ success: false, data: [] }), 5000))
      ])
    ]);

    return NextResponse.json(
      { 
        success: true,
        stats: statsResult.data || {
          totalVisits: 0,
          uniqueVisitors: 0,
          totalPages: 0,
          avgSessionDuration: 0,
          bounceRate: 0,
        },
        byCountry: countryResult.data || [],
        byDevice: deviceResult.data || [],
        byBrowser: browserResult.data || [],
        dailyVisits: dailyVisitsResult.data || [],
        topPages: topPagesResult.data || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Analytics API] Error:', error);
    
    // Return empty data with success=true so dashboard can still display
    return NextResponse.json(
      { 
        success: true,
        stats: {
          totalVisits: 0,
          uniqueVisitors: 0,
          totalPages: 0,
          avgSessionDuration: 0,
          bounceRate: 0,
        },
        byCountry: [],
        byDevice: [],
        byBrowser: [],
        dailyVisits: [],
        topPages: [],
      },
      { status: 200 }
    );
  }
}
