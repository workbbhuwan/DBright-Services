/**
 * Contact API Route
 * Saves contact form submissions to Vercel Postgres database
 * View all submissions in the admin dashboard at /admin
 */

import { NextResponse } from 'next/server';
import { saveContactMessage, initDatabase } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, subject, company, date, time } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get client IP and user agent for tracking
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Initialize database (creates table if it doesn't exist)
    await initDatabase();

    // Save to database
    const dbResult = await saveContactMessage({
      name,
      email,
      phone,
      service: subject,
      company,
      preferredDate: date,
      preferredTime: time,
      message,
      ipAddress,
      userAgent,
    });

    if (!dbResult.success) {
      console.error('Failed to save to database:', dbResult.error);
      return NextResponse.json(
        { error: 'Failed to save message' },
        { status: 500 }
      );
    }

    // Success - message saved to database
    // View all messages in admin dashboard at /admin
    return NextResponse.json(
      { message: 'Message received successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error processing contact form:', error);
    }
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
