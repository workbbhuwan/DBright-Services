/**
 * Simple in-memory rate limiter for admin login attempts
 * In production, consider using Redis or a dedicated rate limiting service
 */

interface RateLimitEntry {
  count: number;
  firstAttempt: number;
  lockoutUntil?: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Configuration
const MAX_ATTEMPTS = 5; // Max attempts before lockout
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_MS = 30 * 60 * 1000; // 30 minutes lockout

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.lockoutUntil && entry.lockoutUntil < now) {
      rateLimitStore.delete(key);
    } else if (now - entry.firstAttempt > WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }
}, 60 * 60 * 1000);

export function checkRateLimit(identifier: string): { 
  allowed: boolean; 
  remainingAttempts?: number;
  lockoutUntil?: number;
  retryAfter?: number;
} {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry) {
    rateLimitStore.set(identifier, {
      count: 1,
      firstAttempt: now,
    });
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS - 1 };
  }

  // Check if locked out
  if (entry.lockoutUntil && entry.lockoutUntil > now) {
    const retryAfter = Math.ceil((entry.lockoutUntil - now) / 1000);
    return { 
      allowed: false, 
      lockoutUntil: entry.lockoutUntil,
      retryAfter 
    };
  }

  // Reset if window expired
  if (now - entry.firstAttempt > WINDOW_MS) {
    rateLimitStore.set(identifier, {
      count: 1,
      firstAttempt: now,
    });
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS - 1 };
  }

  // Increment count
  entry.count++;

  // Lock out if exceeded
  if (entry.count > MAX_ATTEMPTS) {
    entry.lockoutUntil = now + LOCKOUT_MS;
    const retryAfter = Math.ceil(LOCKOUT_MS / 1000);
    return { 
      allowed: false, 
      lockoutUntil: entry.lockoutUntil,
      retryAfter 
    };
  }

  return { 
    allowed: true, 
    remainingAttempts: MAX_ATTEMPTS - entry.count 
  };
}

export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}

export function getRateLimitInfo(identifier: string): {
  attempts: number;
  isLockedOut: boolean;
  retryAfter?: number;
} {
  const entry = rateLimitStore.get(identifier);
  const now = Date.now();

  if (!entry) {
    return { attempts: 0, isLockedOut: false };
  }

  const isLockedOut = !!(entry.lockoutUntil && entry.lockoutUntil > now);
  const retryAfter = isLockedOut 
    ? Math.ceil((entry.lockoutUntil! - now) / 1000)
    : undefined;

  return {
    attempts: entry.count,
    isLockedOut,
    retryAfter,
  };
}
