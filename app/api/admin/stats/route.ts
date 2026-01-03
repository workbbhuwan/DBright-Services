/**
 * Admin Statistics API Route
 * Provides analytics data for the admin dashboard
 */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { 
  getMessageStats, 
  getDailyMessageCounts,
  getAnalyticsStats,
  getTopPages,
  getVisitorLocations,
  getDeviceStats,
  getDailyPageViews,
  initDatabase 
} from '@/lib/db';

// Helper to check authentication
async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return !!session;
}

// GET: Fetch statistics
export async function GET() {
  try {
    // Check authentication
    if (!await isAuthenticated()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Initialize database if needed (with timeout protection)
    const initPromise = initDatabase();
    const timeoutPromise = new Promise((resolve) => 
      setTimeout(() => resolve({ success: false, timeout: true }), 8000)
    );
    
    await Promise.race([initPromise, timeoutPromise]);

    const emptyAnalytics = {
      stats: { totalViews: 0, todayViews: 0, weekViews: 0, uniqueVisitors: 0, todayVisitors: 0 },
      topPages: [],
      locations: [],
      deviceStats: { deviceTypes: [], browsers: [] },
      dailyViews: [],
    };

    // Get message statistics and analytics with individual timeout protection
    const [statsResult, dailyCountsResult, analyticsStats, topPages, locations, deviceStats, dailyViews] = await Promise.all([
      Promise.race([
        getMessageStats(),
        new Promise<any>((resolve) => setTimeout(() => resolve({ success: false, data: { total: 0, unread: 0, today: 0, week: 0 } }), 5000))
      ]),
      Promise.race([
        getDailyMessageCounts(),
        new Promise<any>((resolve) => setTimeout(() => resolve({ success: false, data: [] }), 5000))
      ]),
      Promise.race([
        getAnalyticsStats(),
        new Promise<any>((resolve) => setTimeout(() => resolve({ success: false, data: emptyAnalytics.stats }), 5000))
      ]),
      Promise.race([
        getTopPages(10),
        new Promise<any>((resolve) => setTimeout(() => resolve({ success: false, data: [] }), 5000))
      ]),
      Promise.race([
        getVisitorLocations(10),
        new Promise<any>((resolve) => setTimeout(() => resolve({ success: false, data: [] }), 5000))
      ]),
      Promise.race([
        getDeviceStats(),
        new Promise<any>((resolve) => setTimeout(() => resolve({ success: false, data: emptyAnalytics.deviceStats }), 5000))
      ]),
      Promise.race([
        getDailyPageViews(),
        new Promise<any>((resolve) => setTimeout(() => resolve({ success: false, data: [] }), 5000))
      ]),
    ]);

    return NextResponse.json(
      { 
        success: true,
        stats: statsResult.data || { total: 0, unread: 0, today: 0, week: 0 },
        dailyCounts: dailyCountsResult.data || [],
        analytics: {
          stats: analyticsStats.data || emptyAnalytics.stats,
          topPages: topPages.data || [],
          locations: locations.data || [],
          deviceStats: deviceStats.data || emptyAnalytics.deviceStats,
          dailyViews: dailyViews.data || [],
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Stats API] Error:', error);
    
    return NextResponse.json(
      { 
        success: true,
        stats: { total: 0, unread: 0, today: 0, week: 0 },
        dailyCounts: [],
        analytics: {
          stats: { totalViews: 0, todayViews: 0, weekViews: 0, uniqueVisitors: 0, todayVisitors: 0 },
          topPages: [],
          locations: [],
          deviceStats: { deviceTypes: [], browsers: [] },
          dailyViews: [],
        }
      },
      { status: 200 }
    );
  }
}
