/**
 * Analytics Dashboard Component
 * Displays comprehensive website analytics with charts and statistics
 */

"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  Users,
  Globe,
  Monitor,
  Calendar,
  BarChart3,
  Smartphone,
  RefreshCw,
  Eye,
} from 'lucide-react';

interface AnalyticsStats {
  totalVisits: number;
  uniqueVisitors: number;
  totalPages: number;
  avgSessionDuration: number;
  bounceRate: number;
}

interface CountryData {
  country: string;
  visits: string;
  unique_visitors: string;
}

interface DeviceData {
  device_type: string;
  visits: string;
  unique_visitors: string;
}

interface BrowserData {
  browser: string;
  visits: string;
}

interface DailyVisit {
  date: string;
  visits: string;
  unique_visitors: string;
}

interface TopPage {
  page_path: string;
  visits: string;
  unique_visitors: string;
}

interface AnalyticsData {
  stats: AnalyticsStats;
  byCountry: CountryData[];
  byDevice: DeviceData[];
  byBrowser: BrowserData[];
  dailyVisits: DailyVisit[];
  topPages: TopPage[];
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState(30);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      const response = await fetch(`/api/analytics?days=${timeRange}`);
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setData(result);
          setError(null);
        } else {
          setError(result.error || 'Failed to load analytics data');
        }
      } else if (response.status === 401) {
        setError('Unauthorized - please login again');
      } else {
        setError('Failed to load analytics data');
      }
    } catch (err) {
      setError('Failed to load analytics data');
      console.error('Analytics fetch error:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchAnalytics();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg">
          <div className="flex items-start gap-3">
            <BarChart3 className="w-6 h-6 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Analytics Not Available Yet</h3>
              <p className="text-sm mb-2">
                {error || 'No analytics data available. This could be because:'}
              </p>
              <ul className="text-sm space-y-1 ml-4 list-disc">
                <li>The analytics system is still initializing</li>
                <li>No visitors have accessed the site yet</li>
                <li>The database table is being created</li>
              </ul>
              <div className="mt-4">
                <Button onClick={handleRefresh} size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Show empty state preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 opacity-50">
          <Card className="p-6 bg-linear-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Visits</p>
                <p className="text-3xl font-bold mt-2">0</p>
              </div>
              <Eye className="w-12 h-12 opacity-80" />
            </div>
          </Card>
          <Card className="p-6 bg-linear-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Unique Visitors</p>
                <p className="text-3xl font-bold mt-2">0</p>
              </div>
              <Users className="w-12 h-12 opacity-80" />
            </div>
          </Card>
          <Card className="p-6 bg-linear-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Pages Visited</p>
                <p className="text-3xl font-bold mt-2">0</p>
              </div>
              <Globe className="w-12 h-12 opacity-80" />
            </div>
          </Card>
          <Card className="p-6 bg-linear-to-br from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Avg. Pages/Visit</p>
                <p className="text-3xl font-bold mt-2">0</p>
              </div>
              <TrendingUp className="w-12 h-12 opacity-80" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const stats = data.stats;

  // Calculate percentages for device types
  const totalDeviceVisits = data.byDevice.reduce((sum, d) => sum + parseInt(d.visits), 0);
  const devicePercentages = data.byDevice.map(d => ({
    ...d,
    percentage: totalDeviceVisits > 0 ? (parseInt(d.visits) / totalDeviceVisits * 100) : 0
  }));

  // Get max visits for chart scaling
  const maxDailyVisits = Math.max(...data.dailyVisits.map(d => parseInt(d.visits)), 1);

  return (
    <div className="space-y-6">
      {/* Header with time range selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Website Analytics
          </h2>
          <p className="text-sm text-gray-600 mt-1">Track visitor behavior and engagement</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <Button
              variant={timeRange === 7 ? 'default' : 'outline'}
              onClick={() => setTimeRange(7)}
              size="sm"
            >
              7 Days
            </Button>
            <Button
              variant={timeRange === 30 ? 'default' : 'outline'}
              onClick={() => setTimeRange(30)}
              size="sm"
            >
              30 Days
            </Button>
            <Button
              variant={timeRange === 90 ? 'default' : 'outline'}
              onClick={() => setTimeRange(90)}
              size="sm"
            >
              90 Days
            </Button>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-linear-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Visits</p>
              <p className="text-3xl font-bold mt-2">{stats.totalVisits.toLocaleString()}</p>
            </div>
            <Eye className="w-12 h-12 opacity-80" />
          </div>
        </Card>

        <Card className="p-6 bg-linear-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Unique Visitors</p>
              <p className="text-3xl font-bold mt-2">{stats.uniqueVisitors.toLocaleString()}</p>
            </div>
            <Users className="w-12 h-12 opacity-80" />
          </div>
        </Card>

        <Card className="p-6 bg-linear-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Pages Visited</p>
              <p className="text-3xl font-bold mt-2">{stats.totalPages.toLocaleString()}</p>
            </div>
            <Globe className="w-12 h-12 opacity-80" />
          </div>
        </Card>

        <Card className="p-6 bg-linear-to-br from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Avg. Pages/Visit</p>
              <p className="text-3xl font-bold mt-2">
                {stats.totalVisits > 0 ? (stats.totalPages / stats.totalVisits).toFixed(1) : '0'}
              </p>
            </div>
            <TrendingUp className="w-12 h-12 opacity-80" />
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Visits Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Daily Visits
          </h3>
          <div className="space-y-2">
            {data.dailyVisits.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No data available</p>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {data.dailyVisits.slice(0, 14).reverse().map((day, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-xs text-gray-600 w-20 shrink-0">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex-1">
                      <div className="relative h-8 bg-gray-100 rounded overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-end pr-2 transition-all duration-500"
                          style={{ width: `${(parseInt(day.visits) / maxDailyVisits) * 100}%` }}
                        >
                          <span className="text-xs font-semibold text-white">
                            {day.visits}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 w-16 text-right">
                      {day.unique_visitors} unique
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Top Pages */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Top Pages
          </h3>
          <div className="space-y-3">
            {data.topPages.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No data available</p>
            ) : (
              data.topPages.slice(0, 8).map((page, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {page.page_path === '/' ? 'Home' : page.page_path}
                    </p>
                    <p className="text-xs text-gray-500">
                      {page.visits} visits • {page.unique_visitors} unique
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Country, Device, and Browser Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visitors by Country */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-600" />
            Visitors by Country
          </h3>
          <div className="space-y-3">
            {data.byCountry.length === 0 ? (
              <p className="text-gray-500 text-center py-8 text-sm">No data available</p>
            ) : (
              data.byCountry.slice(0, 8).map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">
                      {country.country.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{country.country}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{country.visits}</p>
                    <p className="text-xs text-gray-500">{country.unique_visitors} unique</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Visitors by Device */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-blue-600" />
            Visitors by Device
          </h3>
          <div className="space-y-4">
            {devicePercentages.length === 0 ? (
              <p className="text-gray-500 text-center py-8 text-sm">No data available</p>
            ) : (
              devicePercentages.map((device, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {device.device_type === 'Mobile' && <Smartphone className="w-4 h-4 text-blue-600" />}
                      {device.device_type === 'Desktop' && <Monitor className="w-4 h-4 text-blue-600" />}
                      {device.device_type === 'Tablet' && <Monitor className="w-4 h-4 text-blue-600" />}
                      <span className="text-sm font-medium">{device.device_type}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{device.visits}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 to-blue-600 transition-all duration-500"
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {device.percentage.toFixed(1)}% • {device.unique_visitors} unique visitors
                  </p>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Visitors by Browser */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-orange-600" />
            Visitors by Browser
          </h3>
          <div className="space-y-3">
            {data.byBrowser.length === 0 ? (
              <p className="text-gray-500 text-center py-8 text-sm">No data available</p>
            ) : (
              data.byBrowser.slice(0, 8).map((browser, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{browser.browser}</span>
                  <span className="text-sm font-bold text-gray-900">{browser.visits}</span>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
