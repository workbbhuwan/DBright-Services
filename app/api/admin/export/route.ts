/**
 * Admin Messages Export API Route
 * Allows exporting contact messages as CSV or JSON
 */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getContactMessages, initDatabase } from '@/lib/db';

// Helper to check authentication
async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return !!session;
}

// Convert messages to CSV format
function convertToCSV(messages: Array<Record<string, unknown>>): string {
  if (messages.length === 0) {
    return 'id,name,email,phone,message,status,created_at,ip_address\n';
  }

  const headers = ['id', 'name', 'email', 'phone', 'message', 'status', 'created_at', 'ip_address'];
  const csvRows = [headers.join(',')];

  for (const message of messages) {
    const values = headers.map(header => {
      const value = message[header] || '';
      // Escape quotes and wrap in quotes if contains comma, quote, or newline
      const escaped = String(value).replace(/"/g, '""');
      return /[,"\n]/.test(escaped) ? `"${escaped}"` : escaped;
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
}

export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json'; // json or csv
    const status = searchParams.get('status') || undefined;

    // Get all messages (no limit for export)
    const result = await getContactMessages({
      status,
      limit: 10000, // High limit for export
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to fetch messages for export' },
        { status: 500 }
      );
    }

    const messages = result.data;

    if (format === 'csv') {
      const csv = convertToCSV(messages);
      const timestamp = new Date().toISOString().split('T')[0];
      
      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="messages-export-${timestamp}.csv"`,
        },
      });
    } else {
      // JSON format
      const timestamp = new Date().toISOString().split('T')[0];
      
      return new NextResponse(JSON.stringify(messages, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="messages-export-${timestamp}.json"`,
        },
      });
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error exporting messages:', error);
    }
    return NextResponse.json(
      { error: 'Failed to export messages' },
      { status: 500 }
    );
  }
}
