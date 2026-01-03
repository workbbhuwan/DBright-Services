'use client';

import { Card } from '@/components/ui/card';
import {
  BarChart3,
  ExternalLink,
  TrendingUp,
  Eye,
  MousePointer,
  Globe,
} from 'lucide-react';

export function AnalyticsSection() {
  return (
    <div className="space-y-6">
      {/* Vercel Analytics Info */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-600 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Professional Analytics Active
            </h3>
            <p className="text-gray-700 mb-4">
              Your site is now tracked with <strong>Vercel Web Analytics</strong> - a privacy-friendly, 
              zero-configuration analytics solution that's GDPR compliant and doesn't require cookie consent.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://vercel.com/analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <BarChart3 className="w-4 h-4" />
                Open Vercel Analytics Dashboard
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://vercel.com/docs/analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors border border-gray-300"
              >
                Documentation
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <Eye className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Page Views</h4>
          </div>
          <p className="text-sm text-gray-600">
            Track every page view with automatic path grouping and real-time updates.
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-gray-900">Visitor Insights</h4>
          </div>
          <p className="text-sm text-gray-600">
            See unique visitors, returning users, and traffic trends over time.
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-gray-900">Geographic Data</h4>
          </div>
          <p className="text-sm text-gray-600">
            View visitor locations by country and city without compromising privacy.
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <MousePointer className="w-5 h-5 text-orange-600" />
            <h4 className="font-semibold text-gray-900">Referrer Tracking</h4>
          </div>
          <p className="text-sm text-gray-600">
            Discover where your traffic comes from and which channels perform best.
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-5 h-5 text-cyan-600" />
            <h4 className="font-semibold text-gray-900">Performance Metrics</h4>
          </div>
          <p className="text-sm text-gray-600">
            Monitor Core Web Vitals and page load performance with Speed Insights.
          </p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h4 className="font-semibold text-gray-900">Privacy First</h4>
          </div>
          <p className="text-sm text-gray-700">
            GDPR compliant, no cookies, no personal data collection. Privacy-friendly by design.
          </p>
        </Card>
      </div>

      {/* Quick Access */}
      <Card className="p-6 bg-gray-50">
        <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
        <div className="space-y-2 text-sm">
          <p className="text-gray-600">
            📊 <strong>Analytics Dashboard:</strong> Log in to Vercel and navigate to your project's Analytics tab
          </p>
          <p className="text-gray-600">
            ⚡ <strong>Speed Insights:</strong> Monitor Core Web Vitals and performance scores in real-time
          </p>
          <p className="text-gray-600">
            📈 <strong>Data Retention:</strong> Free tier includes 30 days of data, paid plans offer unlimited retention
          </p>
        </div>
      </Card>
    </div>
  );
}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-xs sm:text-sm font-medium">Total Views</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{analytics.stats.totalViews.toLocaleString()}</p>
            </div>
            <Eye className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
          </div>
        </Card>

        {/* <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-teal-500 to-teal-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-xs sm:text-sm font-medium">Unique Visitors</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{analytics.stats.uniqueVisitors.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
          </div>
        </Card> */}

        <Card className="p-3 sm:p-4 lg:p-6 bg-linear-to-r from-pink-500 to-pink-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-xs sm:text-sm font-medium">Today's Views</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{analytics.stats.todayViews.toLocaleString()}</p>
            </div>
            <Calendar className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-100 text-xs sm:text-sm font-medium">This Week</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{analytics.stats.weekViews.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
          </div>
        </Card>

        {/* <Card className="p-3 sm:p-4 lg:p-6 bg-linear-to-r from-amber-500 to-amber-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-xs sm:text-sm font-medium">Today's Visitors</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{analytics.stats.todayVisitors.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
          </div>
        </Card> */}
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
                    <Globe className="w-4 h-4 text-gray-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate">{location.country || 'Unknown'}</p>
                      {location.city && <p className="text-xs text-gray-500 truncate">{location.city}</p>}
                    </div>
                  </div>
                  <span className="ml-2 font-bold text-sm sm:text-base text-green-600 shrink-0">
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
