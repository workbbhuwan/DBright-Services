'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  BarChart3,
  Globe,
  Monitor,
  Eye,
  Users,
  TrendingUp,
  Calendar,
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

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics');
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setIsLoading(false);
    }
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
    return (
      <div className="text-center py-12 text-gray-500">
        <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>Failed to load analytics data</p>
      </div>
    );
  }

  const getDeviceIcon = (type: string) => {
    if (type.toLowerCase() === 'mobile') return <Smartphone className="w-4 h-4" />;
    if (type.toLowerCase() === 'tablet') return <Tablet className="w-4 h-4" />;
    return <Laptop className="w-4 h-4" />;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Analytics Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-xs sm:text-sm font-medium">Total Views</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{analytics.stats.totalViews}</p>
            </div>
            <Eye className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-teal-500 to-teal-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-xs sm:text-sm font-medium">Visitors</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{analytics.stats.uniqueVisitors}</p>
            </div>
            <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-pink-500 to-pink-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-xs sm:text-sm font-medium">Today</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{analytics.stats.todayViews}</p>
            </div>
            <Calendar className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-100 text-xs sm:text-sm font-medium">This Week</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{analytics.stats.weekViews}</p>
            </div>
            <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-xs sm:text-sm font-medium">Today Visitors</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{analytics.stats.todayVisitors}</p>
            </div>
            <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Top Pages */}
        <Card className="p-3 sm:p-4 lg:p-6">
          <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
            Top Pages
          </h3>
          <div className="space-y-2 sm:space-y-3 max-h-[300px] overflow-y-auto">
            {analytics.topPages.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No page views yet</p>
            ) : (
              analytics.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">{page.page_title || page.page_path}</p>
                    <p className="text-xs text-gray-500 truncate">{page.page_path}</p>
                  </div>
                  <div className="text-right ml-2">
                    <p className="font-bold text-sm sm:text-base text-blue-600">{page.views}</p>
                    <p className="text-xs text-gray-500">{page.unique_visitors} unique</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Visitor Locations */}
        <Card className="p-3 sm:p-4 lg:p-6">
          <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
            Visitor Locations
          </h3>
          <div className="space-y-2 sm:space-y-3 max-h-[300px] overflow-y-auto">
            {analytics.locations.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No location data yet</p>
            ) : (
              analytics.locations.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate">{location.country || 'Unknown'}</p>
                      {location.city && <p className="text-xs text-gray-500 truncate">{location.city}</p>}
                    </div>
                  </div>
                  <span className="ml-2 font-bold text-sm sm:text-base text-green-600 flex-shrink-0">
                    {location.visitors}
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Device Types */}
        <Card className="p-3 sm:p-4 lg:p-6">
          <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />
            Device Types
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {analytics.deviceStats.deviceTypes.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No device data yet</p>
            ) : (
              analytics.deviceStats.deviceTypes.map((device, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {getDeviceIcon(device.device_type)}
                    <span className="font-medium text-sm sm:text-base">{device.device_type}</span>
                  </div>
                  <span className="font-bold text-sm sm:text-base text-purple-600">{device.count}</span>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Browsers */}
        <Card className="p-3 sm:p-4 lg:p-6">
          <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />
            Top Browsers
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {analytics.deviceStats.browsers.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No browser data yet</p>
            ) : (
              analytics.deviceStats.browsers.map((browser, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-sm sm:text-base">{browser.browser}</span>
                  <span className="font-bold text-sm sm:text-base text-orange-600">{browser.count}</span>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
