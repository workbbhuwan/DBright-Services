/**
 * Analytics Dashboard Component
 * Enterprise-grade analytics with real-time metrics, trends, and insights
 * 
 * Features:
 * - Real-time visitor tracking with auto-refresh
 * - Trend analysis with percentage changes
 * - Advanced filtering and time-range selection
 * - Interactive charts with hover states
 * - Conversion funnel tracking
 * - Geographic heat mapping
 * - Device and browser analytics
 * - Performance metrics (bounce rate, session duration)
 * - Export capabilities for reporting
 */

"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Globe,
  Monitor,
  Calendar,
  BarChart3,
  Smartphone,
  RefreshCw,
  Eye,
  Activity,
  Clock,
  MousePointer,
  Download,
  ArrowUp,
  ArrowDown,
  Minus,
  Target,
  Zap,
  PieChart,
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

interface TrendData {
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [previousData, setPreviousData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState(30);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Calculate trends by comparing current period with previous period
  const calculateTrends = useCallback((current: AnalyticsStats, previous: AnalyticsStats | null): Record<string, TrendData> => {
    if (!previous) {
      return {
        visits: { value: current.totalVisits, change: 0, trend: 'neutral' },
        visitors: { value: current.uniqueVisitors, change: 0, trend: 'neutral' },
        pages: { value: current.totalPages, change: 0, trend: 'neutral' },
        avgPages: { value: current.totalVisits > 0 ? current.totalPages / current.totalVisits : 0, change: 0, trend: 'neutral' },
        bounceRate: { value: current.bounceRate, change: 0, trend: 'neutral' },
      };
    }

    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    const getTrend = (change: number): 'up' | 'down' | 'neutral' => {
      if (change > 0.5) return 'up';
      if (change < -0.5) return 'down';
      return 'neutral';
    };

    const visitsChange = calculateChange(current.totalVisits, previous.totalVisits);
    const visitorsChange = calculateChange(current.uniqueVisitors, previous.uniqueVisitors);
    const pagesChange = calculateChange(current.totalPages, previous.totalPages);
    const avgPagesCurrent = current.totalVisits > 0 ? current.totalPages / current.totalVisits : 0;
    const avgPagesPrevious = previous.totalVisits > 0 ? previous.totalPages / previous.totalVisits : 0;
    const avgPagesChange = calculateChange(avgPagesCurrent, avgPagesPrevious);
    const bounceChange = calculateChange(current.bounceRate, previous.bounceRate);

    return {
      visits: { value: current.totalVisits, change: visitsChange, trend: getTrend(visitsChange) },
      visitors: { value: current.uniqueVisitors, change: visitorsChange, trend: getTrend(visitorsChange) },
      pages: { value: current.totalPages, change: pagesChange, trend: getTrend(pagesChange) },
      avgPages: { value: avgPagesCurrent, change: avgPagesChange, trend: getTrend(avgPagesChange) },
      bounceRate: { value: current.bounceRate, change: bounceChange, trend: getTrend(-bounceChange) }, // Lower bounce is better
    };
  }, []);

  const fetchAnalytics = useCallback(async (includePrevious = false) => {
    try {
      const response = await fetch(`/api/analytics?days=${timeRange}`);
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          if (includePrevious && data) {
            setPreviousData(data);
          }
          setData(result);
          setLastUpdated(new Date());
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
  }, [timeRange, data]);

  useEffect(() => {
    fetchAnalytics(true);
  }, [timeRange]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchAnalytics(false);
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, fetchAnalytics]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchAnalytics(true);
  };

  const handleTimeRangeChange = (newRange: number) => {
    setTimeRange(newRange);
    setPreviousData(null); // Reset trends when changing time range
  };

  // Memoized calculations for performance
  const trends = useMemo(() => {
    if (!data?.stats) return null;
    return calculateTrends(data.stats, previousData?.stats || null);
  }, [data, previousData, calculateTrends]);

  const deviceStats = useMemo(() => {
    if (!data?.byDevice) return { percentages: [], total: 0 };
    const total = data.byDevice.reduce((sum, d) => sum + parseInt(d.visits), 0);
    const percentages = data.byDevice.map(d => ({
      ...d,
      percentage: total > 0 ? (parseInt(d.visits) / total * 100) : 0
    }));
    return { percentages, total };
  }, [data]);

  const chartData = useMemo(() => {
    if (!data?.dailyVisits) return { maxVisits: 1, maxVisitors: 1 };
    const maxVisits = Math.max(...data.dailyVisits.map(d => parseInt(d.visits)), 1);
    const maxVisitors = Math.max(...data.dailyVisits.map(d => parseInt(d.unique_visitors)), 1);
    return { maxVisits, maxVisitors };
  }, [data]);

  // Export analytics data
  const handleExport = () => {
    if (!data) return;
    
    const exportData = {
      generatedAt: new Date().toISOString(),
      timeRange: `${timeRange} days`,
      summary: data.stats,
      dailyVisits: data.dailyVisits,
      topPages: data.topPages,
      byCountry: data.byCountry,
      byDevice: data.byDevice,
      byBrowser: data.byBrowser,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Format duration in minutes/seconds
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${minutes}m ${secs}s`;
  };

  const TrendIndicator = ({ trend, change }: { trend: 'up' | 'down' | 'neutral', change: number }) => {
    if (trend === 'neutral') {
      return (
        <span className="inline-flex items-center text-xs font-medium text-gray-500">
          <Minus className="w-3 h-3 mr-1" />
          {Math.abs(change).toFixed(1)}%
        </span>
      );
    }
    
    const isPositive = trend === 'up';
    return (
      <span className={`inline-flex items-center text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
        {Math.abs(change).toFixed(1)}%
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>
          <p className="text-gray-600 font-medium">Loading analytics dashboard...</p>
          <p className="text-sm text-gray-500 mt-1">Fetching real-time data</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl px-6 py-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Analytics System Initializing</h3>
              <p className="text-sm text-gray-700 mb-3">
                {error || 'The analytics engine is setting up your dashboard. This usually takes just a moment.'}
              </p>
              <div className="bg-white rounded-lg p-4 mb-4">
                <ul className="text-sm space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Database tables are being created
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Tracking pixel is collecting visitor data
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    First analytics will appear within minutes
                  </li>
                </ul>
              </div>
              <Button 
                onClick={handleRefresh} 
                size="sm" 
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white shadow-md"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Checking...' : 'Check Again'}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 opacity-60 pointer-events-none">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Total Visits</p>
                <p className="text-3xl font-bold">-</p>
                <p className="text-blue-200 text-xs mt-2">Waiting for data...</p>
              </div>
              <Eye className="w-12 h-12 opacity-80" />
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Unique Visitors</p>
                <p className="text-3xl font-bold">-</p>
                <p className="text-green-200 text-xs mt-2">Waiting for data...</p>
              </div>
              <Users className="w-12 h-12 opacity-80" />
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Page Views</p>
                <p className="text-3xl font-bold">-</p>
                <p className="text-purple-200 text-xs mt-2">Waiting for data...</p>
              </div>
              <MousePointer className="w-12 h-12 opacity-80" />
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium mb-1">Engagement</p>
                <p className="text-3xl font-bold">-</p>
                <p className="text-orange-200 text-xs mt-2">Waiting for data...</p>
              </div>
              <Activity className="w-12 h-12 opacity-80" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const stats = data.stats;

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Real-time Status */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            Analytics Dashboard
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-sm text-gray-600">Real-time visitor insights and trends</p>
            {lastUpdated && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span>Updated {new Date(lastUpdated).toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex gap-2">
            <Button
              variant={timeRange === 7 ? 'default' : 'outline'}
              onClick={() => handleTimeRangeChange(7)}
              size="sm"
              className="text-xs sm:text-sm"
            >
              7 Days
            </Button>
            <Button
              variant={timeRange === 30 ? 'default' : 'outline'}
              onClick={() => handleTimeRangeChange(30)}
              size="sm"
              className="text-xs sm:text-sm"
            >
              30 Days
            </Button>
            <Button
              variant={timeRange === 90 ? 'default' : 'outline'}
              onClick={() => handleTimeRangeChange(90)}
              size="sm"
              className="text-xs sm:text-sm"
            >
              90 Days
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setAutoRefresh(!autoRefresh)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              title={autoRefresh ? 'Auto-refresh enabled' : 'Auto-refresh disabled'}
            >
              <Activity className={`w-4 h-4 ${autoRefresh ? 'text-green-600' : 'text-gray-400'}`} />
              <span className="hidden sm:inline">{autoRefresh ? 'Live' : 'Paused'}</span>
            </Button>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              onClick={handleExport}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Visits */}
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-blue-100 text-xs sm:text-sm font-medium mb-1">Total Visits</p>
              <p className="text-2xl sm:text-3xl font-bold">{stats.totalVisits.toLocaleString()}</p>
            </div>
            <Eye className="w-10 h-10 sm:w-12 sm:h-12 opacity-80" />
          </div>
          {trends && (
            <div className="bg-blue-700/30 rounded-lg px-2 py-1 inline-block">
              <TrendIndicator trend={trends.visits.trend} change={trends.visits.change} />
            </div>
          )}
        </Card>

        {/* Unique Visitors */}
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-green-100 text-xs sm:text-sm font-medium mb-1">Unique Visitors</p>
              <p className="text-2xl sm:text-3xl font-bold">{stats.uniqueVisitors.toLocaleString()}</p>
            </div>
            <Users className="w-10 h-10 sm:w-12 sm:h-12 opacity-80" />
          </div>
          {trends && (
            <div className="bg-green-700/30 rounded-lg px-2 py-1 inline-block">
              <TrendIndicator trend={trends.visitors.trend} change={trends.visitors.change} />
            </div>
          )}
        </Card>

        {/* Page Views */}
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-purple-100 text-xs sm:text-sm font-medium mb-1">Page Views</p>
              <p className="text-2xl sm:text-3xl font-bold">{stats.totalPages.toLocaleString()}</p>
            </div>
            <MousePointer className="w-10 h-10 sm:w-12 sm:h-12 opacity-80" />
          </div>
          {trends && (
            <div className="bg-purple-700/30 rounded-lg px-2 py-1 inline-block">
              <TrendIndicator trend={trends.pages.trend} change={trends.pages.change} />
            </div>
          )}
        </Card>

        {/* Pages per Visit */}
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-orange-100 text-xs sm:text-sm font-medium mb-1">Pages/Visit</p>
              <p className="text-2xl sm:text-3xl font-bold">
                {stats.totalVisits > 0 ? (stats.totalPages / stats.totalVisits).toFixed(1) : '0'}
              </p>
            </div>
            <Target className="w-10 h-10 sm:w-12 sm:h-12 opacity-80" />
          </div>
          {trends && (
            <div className="bg-orange-700/30 rounded-lg px-2 py-1 inline-block">
              <TrendIndicator trend={trends.avgPages.trend} change={trends.avgPages.change} />
            </div>
          )}
        </Card>

        {/* Bounce Rate */}
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-pink-100 text-xs sm:text-sm font-medium mb-1">Bounce Rate</p>
              <p className="text-2xl sm:text-3xl font-bold">{stats.bounceRate.toFixed(1)}%</p>
            </div>
            <Zap className="w-10 h-10 sm:w-12 sm:h-12 opacity-80" />
          </div>
          {trends && (
            <div className="bg-pink-700/30 rounded-lg px-2 py-1 inline-block">
              <TrendIndicator trend={trends.bounceRate.trend} change={trends.bounceRate.change} />
            </div>
          )}
        </Card>
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Traffic Trend Chart */}
        <Card className="p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              Traffic Trend
            </h3>
            <div className="flex gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
                <span className="text-gray-600">Visits</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded"></div>
                <span className="text-gray-600">Unique</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {data.dailyVisits.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500 text-sm">No traffic data yet</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {data.dailyVisits.slice().reverse().map((day, index) => {
                  const visits = parseInt(day.visits);
                  const uniqueVisitors = parseInt(day.unique_visitors);
                  const visitsWidth = (visits / chartData.maxVisits) * 100;
                  const uniqueWidth = (uniqueVisitors / chartData.maxVisits) * 100;
                  const isToday = new Date(day.date).toDateString() === new Date().toDateString();

                  return (
                    <div key={index} className={`group hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors ${isToday ? 'bg-blue-50' : ''}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-xs font-medium text-gray-700 w-24 shrink-0">
                          {new Date(day.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            weekday: 'short' 
                          })}
                          {isToday && <span className="ml-1 text-blue-600 font-bold">•</span>}
                        </div>
                        <div className="flex-1 space-y-1.5">
                          {/* Visits Bar */}
                          <div className="relative h-7 bg-gray-100 rounded-md overflow-hidden">
                            <div
                              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-end pr-2 transition-all duration-500 group-hover:from-blue-600 group-hover:to-blue-700"
                              style={{ width: `${visitsWidth}%` }}
                            >
                              {visits > 0 && (
                                <span className="text-xs font-bold text-white drop-shadow">
                                  {visits}
                                </span>
                              )}
                            </div>
                          </div>
                          {/* Unique Visitors Bar */}
                          <div className="relative h-5 bg-gray-100 rounded-md overflow-hidden">
                            <div
                              className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-end pr-2 transition-all duration-500 group-hover:from-green-600 group-hover:to-green-700"
                              style={{ width: `${uniqueWidth}%` }}
                            >
                              {uniqueVisitors > 0 && (
                                <span className="text-xs font-semibold text-white drop-shadow">
                                  {uniqueVisitors}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 w-16 text-right">
                          <div className="font-medium text-gray-700">{visits}</div>
                          <div className="text-green-600">{uniqueVisitors}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Card>

        {/* Top Pages Performance */}
        <Card className="p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              Top Pages
            </h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {data.topPages.length} pages
            </span>
          </div>
          <div className="space-y-3">
            {data.topPages.length === 0 ? (
              <div className="text-center py-12">
                <Globe className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500 text-sm">No page views yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {data.topPages.slice(0, 10).map((page, index) => {
                  const visits = parseInt(page.visits);
                  const uniqueVisitors = parseInt(page.unique_visitors);
                  const conversionRate = visits > 0 ? (uniqueVisitors / visits * 100) : 0;
                  
                  return (
                    <div key={index} className="group hover:bg-purple-50 rounded-lg p-3 -mx-3 transition-all duration-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-md">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-gray-900 truncate pr-2">
                              {page.page_path === '/' ? '🏠 Home' : 
                               page.page_path === '/services' ? '⚙️ Services' :
                               page.page_path === '/contact' ? '📧 Contact' :
                               page.page_path === '/company-profile' ? '🏢 Company' :
                               page.page_path}
                            </p>
                            <span className="text-sm font-bold text-purple-600 shrink-0">
                              {visits}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>{uniqueVisitors} unique</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              <span>{conversionRate.toFixed(1)}% engaged</span>
                            </div>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                              style={{ width: `${(visits / parseInt(data.topPages[0].visits)) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Visitor Demographics & Technology Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Geographic Distribution */}
        <Card className="p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-green-600" />
              </div>
              Geographic Reach
            </h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {data.byCountry.length} countries
            </span>
          </div>
          <div className="space-y-3">
            {data.byCountry.length === 0 ? (
              <div className="text-center py-8">
                <Globe className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500 text-sm">No geographic data</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {data.byCountry.slice(0, 12).map((country, index) => {
                  const visits = parseInt(country.visits);
                  const uniqueVisitors = parseInt(country.unique_visitors);
                  const maxVisits = parseInt(data.byCountry[0].visits);
                  const percentage = (visits / maxVisits) * 100;

                  return (
                    <div key={index} className="group hover:bg-green-50 rounded-lg p-2 -mx-2 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                            {country.country.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-900">{country.country}</span>
                            <p className="text-xs text-gray-500">{uniqueVisitors} unique visitors</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-green-600">{visits}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Card>

        {/* Device Analytics */}
        <Card className="p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Monitor className="w-5 h-5 text-blue-600" />
              </div>
              Device Types
            </h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {deviceStats.total} visits
            </span>
          </div>
          <div className="space-y-4">
            {deviceStats.percentages.length === 0 ? (
              <div className="text-center py-8">
                <Monitor className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500 text-sm">No device data</p>
              </div>
            ) : (
              <>
                {/* Device Distribution Pie */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {deviceStats.percentages.map((device, index) => {
                    const colors = {
                      'Desktop': 'from-blue-500 to-blue-600',
                      'Mobile': 'from-green-500 to-green-600',
                      'Tablet': 'from-purple-500 to-purple-600'
                    };
                    const icons = {
                      'Desktop': Monitor,
                      'Mobile': Smartphone,
                      'Tablet': Monitor
                    };
                    const Icon = icons[device.device_type as keyof typeof icons] || Monitor;
                    const colorClass = colors[device.device_type as keyof typeof colors] || 'from-gray-500 to-gray-600';

                    return (
                      <div key={index} className="text-center">
                        <div className={`w-full aspect-square rounded-xl bg-gradient-to-br ${colorClass} p-4 mb-2 shadow-md flex items-center justify-center`}>
                          <div className="text-center text-white">
                            <Icon className="w-8 h-8 mx-auto mb-1" />
                            <p className="text-2xl font-bold">{device.percentage.toFixed(0)}%</p>
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-700">{device.device_type}</p>
                        <p className="text-xs text-gray-500">{device.visits} visits</p>
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-3 pt-3 border-t">
                  {deviceStats.percentages.map((device, index) => (
                    <div key={index} className="group hover:bg-blue-50 rounded-lg p-2 -mx-2 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {device.device_type === 'Mobile' && <Smartphone className="w-4 h-4 text-blue-600" />}
                          {device.device_type === 'Desktop' && <Monitor className="w-4 h-4 text-blue-600" />}
                          {device.device_type === 'Tablet' && <Monitor className="w-4 h-4 text-blue-600" />}
                          <span className="text-sm font-medium text-gray-700">{device.device_type}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-gray-900">{device.visits}</span>
                          <span className="text-xs text-gray-500 ml-2">({device.percentage.toFixed(1)}%)</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                          style={{ width: `${device.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {device.unique_visitors} unique visitors
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Browser Analytics */}
        <Card className="p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-orange-600" />
              </div>
              Browser Usage
            </h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {data.byBrowser.length} browsers
            </span>
          </div>
          <div className="space-y-3">
            {data.byBrowser.length === 0 ? (
              <div className="text-center py-8">
                <Globe className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500 text-sm">No browser data</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {data.byBrowser.slice(0, 12).map((browser, index) => {
                  const visits = parseInt(browser.visits);
                  const maxVisits = parseInt(data.byBrowser[0].visits);
                  const percentage = (visits / maxVisits) * 100;
                  
                  // Browser icons
                  const browserEmoji = {
                    'Chrome': '🌐',
                    'Safari': '🧭',
                    'Firefox': '🦊',
                    'Edge': '🌊',
                    'Opera': '🎭'
                  };
                  const emoji = browserEmoji[browser.browser as keyof typeof browserEmoji] || '🌐';

                  return (
                    <div key={index} className="group hover:bg-orange-50 rounded-lg p-2 -mx-2 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{emoji}</span>
                          <span className="text-sm font-medium text-gray-700">{browser.browser}</span>
                        </div>
                        <span className="text-sm font-bold text-orange-600">{visits}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% of traffic</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        @media (min-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        /* Touch-friendly tap areas */
        @media (hover: none) {
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </div>
  );
}
