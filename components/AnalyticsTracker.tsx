'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // TODO (Senior Dev Recommendation): Use cookies instead of localStorage
    // Cookies persist better and can have proper expiry (30 days)
    // localStorage gets cleared too easily by users
    
    // Generate or get visitor ID
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('visitor_id', visitorId);
    }

    // Track page view immediately without waiting for geolocation
    const trackView = async () => {
      try {
        // Send analytics immediately with basic data
        const response = await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pagePath: pathname,
            pageTitle: document.title,
            referrer: document.referrer,
            visitorId,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio || 1,
          }),
          // Don't wait for response - fire and forget for performance
          keepalive: true,
        });

        // Log errors even in production for debugging
        if (!response.ok) {
          console.error('[Analytics] Tracking failed:', response.status, await response.text());
        }
      } catch (error) {
        // Log all errors for debugging
        console.error('[Analytics] Track error:', error);
      }
    };

    // Track immediately
    trackView();
  }, [pathname]);
  }, [pathname]);

  return null;
}
