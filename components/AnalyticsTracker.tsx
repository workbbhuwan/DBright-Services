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

    // Track page view with geolocation
    const trackView = async () => {
      try {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const devicePixelRatio = window.devicePixelRatio || 1;
        
        // Get geolocation from IP (using ipapi.co free API)
        let country = '';
        let city = '';
        try {
          const geoResponse = await fetch('https://ipapi.co/json/', { 
            cache: 'force-cache',
            next: { revalidate: 3600 } // Cache for 1 hour
          });
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            country = geoData.country_name || '';
            city = geoData.city || '';
          }
        } catch (geoError) {
          // Silently fail - analytics will work without location
        }
        
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pagePath: pathname,
            pageTitle: document.title,
            referrer: document.referrer,
            visitorId,
            screenWidth,
            screenHeight,
            devicePixelRatio,
            country,
            city,
          }),
        });
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Analytics tracking error:', error);
        }
      }
    };

    trackView();
  }, [pathname]);

  return null;
}
