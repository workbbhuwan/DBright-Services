/**
 * Admin Statistics API Route
 * Provides analytics data for the admin dashboard
 */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { 
  getMessageStats, 
  getDailyMessageCounts,
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

    // Get only message statistics (analytics now handled by Vercel)
    const [statsResult, dailyCountsResult] = await Promise.all([
      getMessageStats().catch(err => {
        console.error('getMessageStats error:', err);
        return { success: false, data: { total: 0, unread: 0, today: 0, week: 0 } };
      }),
      getDailyMessageCounts().catch(err => {
        console.error('getDailyMessageCounts error:', err);
        return { success: false, data: [] };
      }),
    ]);

    // Return message stats only
    return NextResponse.json(
      { 
        success: true,
        stats: statsResult.data || { total: 0, unread: 0, today: 0, week: 0 },
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
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 200 }
    );
  }
}
