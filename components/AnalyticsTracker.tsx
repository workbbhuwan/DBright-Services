/**
 * Analytics Tracker Component
 * Tracks page views and sends analytics data to the server
 */

"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Generate a simple session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

// Track page view
async function trackPageView(path: string) {
  try {
    const data = {
      path,
      referrer: document.referrer || undefined,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      sessionId: getSessionId(),
    };

    // Send tracking data (fire and forget)
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      keepalive: true, // Ensures request completes even if user navigates away
    });
  } catch (error) {
    // Silently fail - analytics should never break the app
    if (process.env.NODE_ENV !== 'production') {
      console.log('Analytics tracking failed:', error);
    }
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin pages
    if (pathname?.startsWith('/admin')) return;

    // Track the page view
    trackPageView(pathname || '/');
  }, [pathname]);

  return null; // This component doesn't render anything
}
