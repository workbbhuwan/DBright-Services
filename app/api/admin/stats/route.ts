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

    // Initialize database if needed
    await initDatabase();

    // Get message statistics and analytics in parallel
    const [statsResult, dailyCountsResult, analyticsStats, topPages, locations, deviceStats, dailyViews] = await Promise.all([
      getMessageStats(),
      getDailyMessageCounts(),
      getAnalyticsStats(),
      getTopPages(10),
      getVisitorLocations(10),
      getDeviceStats(),
      getDailyPageViews(),
    ]);

    // Return default values if database isn't ready
    return NextResponse.json(
      { 
        success: true,
        stats: statsResult.success ? statsResult.data : { total: 0, unread: 0, today: 0, week: 0 },
        dailyCounts: dailyCountsResult.data || [],
        analytics: {
          stats: analyticsStats.data || { totalViews: 0, todayViews: 0, weekViews: 0, uniqueVisitors: 0, todayVisitors: 0 },
          topPages: topPages.data || [],
        analytics: {
          stats: { totalViews: 0, todayViews: 0, weekViews: 0, uniqueVisitors: 0, todayVisitors: 0 },
          topPages: [],
          locations: [],
          deviceStats: { deviceTypes: [], browsers: [] },
          dailyViews: [],
        },
          locations: locations.data || [],
          deviceStats: deviceStats.data || { deviceTypes: [], browsers: [] },
          dailyViews: dailyViews.data || [],
        }
      },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error fetching statistics:', error);
    }
    return NextResponse.json(
      { 
        success: true,
        stats: { total: 0, unread: 0, today: 0, week: 0 },
        dailyCounts: [],
        error: 'Database may need initialization'
      },
      { status: 200 }
    );
  }
}
