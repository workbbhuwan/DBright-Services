'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Generate or get visitor ID
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('visitor_id', visitorId);
    }

    // Track page view
    const trackView = async () => {
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pagePath: pathname,
            pageTitle: document.title,
            referrer: document.referrer,
            visitorId,
          }),
        });
      } catch (error) {
        console.error('Analytics tracking error:', error);
      }
    };

    trackView();
  }, [pathname]);

  return null;
}
