'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  BarChart3,
  ExternalLink,
  TrendingUp,
  Eye,
  Globe,
  Calendar,
  Monitor,
  Smartphone,
  Laptop,
  Tablet,
} from 'lucide-react';

interface AnalyticsData {
  stats: {
    totalViews: number;
    todayViews: number;
    weekViews: number;
    uniqueVisitors: number;
    todayVisitors: number;
  };
  topPages: Array<{
    page_path: string;
    page_title: string;
    views: number;
    unique_visitors: number;
  }>;
  locations: Array<{
    country: string;
    city: string;
    visitors: number;
  }>;
  deviceStats: {
    deviceTypes: Array<{
      device_type: string;
      count: number;
    }>;
    browsers: Array<{
      browser: string;
      count: number;
    }>;
  };
  dailyViews: Array<{
    date: string;
    views: number;
    unique_visitors: number;
  }>;
}

export function AnalyticsSection() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    fetchAnalytics();
    
    const interval = setInterval(() => {
      fetchAnalytics();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        
        const analyticsData = data.analytics || {
          stats: { totalViews: 0, todayViews: 0, weekViews: 0, uniqueVisitors: 0, todayVisitors: 0 },
          topPages: [],
          locations: [],
          deviceStats: { deviceTypes: [], browsers: [] },
          dailyViews: []
        };
        
        setAnalytics(analyticsData);
        setLastUpdate(new Date());
      } else {
        setAnalytics({
          stats: { totalViews: 0, todayViews: 0, weekViews: 0, uniqueVisitors: 0, todayVisitors: 0 },
          topPages: [],
          locations: [],
          deviceStats: { deviceTypes: [], browsers: [] },
          dailyViews: []
        });
      }
    } catch (error) {
      setAnalytics({
        stats: { totalViews: 0, todayViews: 0, weekViews: 0, uniqueVisitors: 0, todayVisitors: 0 },
        topPages: [],
        locations: [],
        deviceStats: { deviceTypes: [], browsers: [] },
        dailyViews: []
      });
      console.error('Failed to fetch analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDeviceIcon = (type: string) => {
    if (type.toLowerCase() === 'mobile') return <Smartphone className="w-4 h-4" />;
    if (type.toLowerCase() === 'tablet') return <Tablet className="w-4 h-4" />;
    return <Laptop className="w-4 h-4" />;
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Vercel Analytics Link - Professional Grade */}
      <Card className="p-4 bg-linear-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Professional Analytics</h4>
              <p className="text-sm text-gray-600">Vercel Analytics - Full insights & performance data</p>
            </div>
          </div>
          <a
            href="https://vercel.com/analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            Open Dashboard
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </Card>

      {/* Live Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live Data • Updated {lastUpdate.toLocaleTimeString()}</span>
        </div>
        <button
          onClick={() => fetchAnalytics()}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Refresh Now
        </button>
      </div>

      {/* Analytics Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-5 bg-linear-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Views</p>
              <p className="text-3xl font-bold mt-2">{analytics.stats.totalViews.toLocaleString()}</p>
            </div>
            <Eye className="w-12 h-12 opacity-80" />
          </div>
        </Card>

        <Card className="p-5 bg-linear-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Today&apos;s Views</p>
              <p className="text-3xl font-bold mt-2">{analytics.stats.todayViews.toLocaleString()}</p>
            </div>
            <Calendar className="w-12 h-12 opacity-80" />
          </div>
        </Card>

        <Card className="p-5 bg-linear-to-r from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">This Week</p>
              <p className="text-3xl font-bold mt-2">{analytics.stats.weekViews.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-12 h-12 opacity-80" />
          </div>
        </Card>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Top Pages
          </h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {analytics.topPages.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No page views yet</p>
            ) : (
              analytics.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{page.page_title || page.page_path}</p>
                    <p className="text-xs text-gray-500 truncate">{page.page_path}</p>
                  </div>
                  <div className="text-right ml-3">
                    <p className="font-bold text-blue-600">{page.views}</p>
                    <p className="text-xs text-gray-500">{page.unique_visitors} unique</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Visitor Locations */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-600" />
            Visitor Locations
          </h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {analytics.locations.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No location data yet</p>
            ) : (
              analytics.locations.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Globe className="w-4 h-4 text-gray-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium truncate">{location.country || 'Unknown'}</p>
                      {location.city && <p className="text-xs text-gray-500 truncate">{location.city}</p>}
                    </div>
                  </div>
                  <span className="ml-2 font-bold text-green-600 shrink-0">
                    {location.visitors}
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Device Types */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-purple-600" />
            Device Types
          </h3>
          <div className="space-y-3">
            {analytics.deviceStats.deviceTypes.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No device data yet</p>
            ) : (
              analytics.deviceStats.deviceTypes.map((device, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {getDeviceIcon(device.device_type)}
                    <span className="font-medium">{device.device_type}</span>
                  </div>
                  <span className="font-bold text-purple-600">{device.count}</span>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Browsers */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-orange-600" />
            Top Browsers
          </h3>
          <div className="space-y-3">
            {analytics.deviceStats.browsers.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No browser data yet</p>
            ) : (
              analytics.deviceStats.browsers.map((browser, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{browser.browser}</span>
                  <span className="font-bold text-orange-600">{browser.count}</span>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
