/**
 * Admin Messages API Route
 * Handles fetching, updating, and deleting contact messages
 */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getContactMessages, updateMessageStatus, deleteContactMessage, initDatabase } from '@/lib/db';

// Helper to check authentication
async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return !!session;
}

// GET: Fetch messages with optional filters
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
    const status = searchParams.get('status') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;
    const search = searchParams.get('search') || undefined;

    const result = await getContactMessages({
      status,
      limit,
      offset,
      search,
    });

    if (!result.success) {
      console.error('Database error:', result.error);
      // Return empty array instead of error if database just needs initialization
      return NextResponse.json(
        { 
          success: true,
          messages: [],
          count: 0,
          error: 'Database may need initialization. Try submitting a contact form first.'
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        messages: result.data,
        count: result.data.length
      },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error fetching messages:', error);
    }
    return NextResponse.json(
      { error: 'Failed to fetch messages', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PATCH: Update message status
export async function PATCH(request: Request) {
  try {
    // Check authentication
    if (!await isAuthenticated()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['unread', 'read', 'archived'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const result = await updateMessageStatus(id, status);

    if (!result.success) {
      throw new Error('Failed to update message');
    }

    return NextResponse.json(
      { success: true, message: 'Message updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error updating message:', error);
    }
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a message
export async function DELETE(request: Request) {
  try {
    // Check authentication
    if (!await isAuthenticated()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    const result = await deleteContactMessage(parseInt(id));

    if (!result.success) {
      throw new Error('Failed to delete message');
    }

    return NextResponse.json(
      { success: true, message: 'Message deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error deleting message:', error);
    }
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
