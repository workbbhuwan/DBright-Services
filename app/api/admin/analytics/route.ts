/**
 * Admin Analytics Stats API Route
 * Provides analytics data for the admin dashboard
 */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
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

// GET: Fetch analytics statistics
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

    // Get all analytics data
    const [stats, topPages, locations, deviceStats, dailyViews] = await Promise.all([
      getAnalyticsStats(),
      getTopPages(10),
      getVisitorLocations(10),
      getDeviceStats(),
      getDailyPageViews(),
    ]);

    return NextResponse.json(
      {
        success: true,
        stats: stats.data,
        topPages: topPages.data || [],
        locations: locations.data || [],
        deviceStats: deviceStats.data,
        dailyViews: dailyViews.data || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      {
        success: true,
        stats: {
          totalViews: 0,
          todayViews: 0,
          weekViews: 0,
          uniqueVisitors: 0,
          todayVisitors: 0,
        },
        topPages: [],
        locations: [],
        deviceStats: { deviceTypes: [], browsers: [] },
        dailyViews: [],
        error: 'Failed to load analytics'
      },
      { status: 200 }
    );
  }
}
