/**
 * Admin Statistics API Route
 * Provides analytics data for the admin dashboard
 */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getMessageStats, getDailyMessageCounts, initDatabase } from '@/lib/db';

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

    // Get message statistics
    const statsResult = await getMessageStats();
    const dailyCountsResult = await getDailyMessageCounts();

    // Return default values if database isn't ready
    return NextResponse.json(
      { 
        success: true,
        stats: statsResult.success ? statsResult.data : { total: 0, unread: 0, today: 0, week: 0 },
        dailyCounts: dailyCountsResult.data || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching statistics:', error);
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
