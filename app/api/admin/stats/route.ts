/**
 * Admin Statistics API Route
 * Provides message statistics for the admin dashboard
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

    // Initialize database if needed (with timeout protection)
    const initPromise = initDatabase();
    const timeoutPromise = new Promise((resolve) => 
      setTimeout(() => resolve({ success: false, timeout: true }), 8000)
    );
    
    await Promise.race([initPromise, timeoutPromise]);

    // Get message statistics with individual timeout protection
    const [statsResult, dailyCountsResult] = await Promise.all([
      Promise.race([
        getMessageStats(),
        new Promise<{ success: boolean; data: { total: number; unread: number; today: number; week: number } }>((resolve) => setTimeout(() => resolve({ success: false, data: { total: 0, unread: 0, today: 0, week: 0 } }), 5000))
      ]),
      Promise.race([
        getDailyMessageCounts(),
        new Promise<{ success: boolean; data: never[] }>((resolve) => setTimeout(() => resolve({ success: false, data: [] }), 5000))
      ]),
    ]);

    return NextResponse.json(
      { 
        success: true,
        stats: statsResult.data || { total: 0, unread: 0, today: 0, week: 0 },
        dailyCounts: dailyCountsResult.data || [],
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
      },
      { status: 200 }
    );
  }
}
