/**
 * Admin Login API Route
 * Handles admin authentication with simple session management
 */

import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { checkRateLimit, resetRateLimit } from '@/lib/rate-limiter';

// In production, use environment variables
// Default credentials (CHANGE THESE in production via env vars)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Session token (simple implementation - use JWT or better solution in production)
const SESSION_SECRET = process.env.SESSION_SECRET || 'change-this-secret-key';

// Helper to get client identifier for rate limiting
function getClientIdentifier(ipAddress: string | null, userAgent: string | null): string {
  return `${ipAddress || 'unknown'}_${userAgent || 'unknown'}`.substring(0, 100);
}

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || 
                      headersList.get('x-real-ip') || 
                      'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    const clientId = getClientIdentifier(ipAddress, userAgent);

    // Check rate limit
    const rateLimitResult = checkRateLimit(clientId);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many login attempts. Please try again later.',
          retryAfter: rateLimitResult.retryAfter,
          lockoutUntil: rateLimitResult.lockoutUntil
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.retryAfter || 60),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(rateLimitResult.lockoutUntil || Date.now() + 60000)
          }
        }
      );
    }

    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { 
          error: 'Username and password are required',
          remainingAttempts: rateLimitResult.remainingAttempts
        },
        { status: 400 }
      );
    }

    // Check credentials
    const isValidUsername = username === ADMIN_USERNAME;
    const isValidPassword = password === ADMIN_PASSWORD;

    if (!isValidUsername || !isValidPassword) {
      return NextResponse.json(
        { 
          error: 'Invalid credentials',
          remainingAttempts: rateLimitResult.remainingAttempts
        },
        { status: 401 }
      );
    }

    // Successful login - reset rate limit
    resetRateLimit(clientId);

    // Create session token
    const sessionToken = Buffer.from(
      `${username}:${Date.now()}:${SESSION_SECRET}`
    ).toString('base64');

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json(
      { 
        success: true,
        message: 'Login successful',
        user: { username }
      },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Login error:', error);
    }
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}

// Logout endpoint
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');

    return NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Logout error:', error);
    }
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}

// Check session endpoint
export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        authenticated: true,
        user: { username: ADMIN_USERNAME }
      },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Session check error:', error);
    }
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    );
  }
}
