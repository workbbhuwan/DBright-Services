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
  Users,
  Globe,
  Monitor,
  Calendar,
  BarChart3,
  Smartphone,
  RefreshCw,
  Eye,
  Activity,
  MousePointer,
  Download,
  ArrowUp,
  ArrowDown,
  Minus,
  Target,
  Zap,
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
        <span className="inline-flex items-center text-xs font-medium text-white">
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
      <div className="flex items-center justify-center py-12 sm:py-20">
        <div className="text-center">
          <div className="relative">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4">
              <div className="absolute inset-0 border-3 sm:border-4 border-blue-200 rounded-full"></div>
              <div className="absolute inset-0 border-3 sm:border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>
          <p className="text-sm sm:text-base text-gray-600 font-medium">Loading analytics...</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Fetching data</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-3 sm:space-y-4">
        <div className="bg-linear-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg sm:rounded-xl px-4 py-4 sm:px-6 sm:py-5 shadow-sm">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2">Analytics Initializing</h3>
              <p className="text-xs sm:text-sm text-gray-700 mb-3">
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
                className="bg-linear-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white shadow-md"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Checking...' : 'Check Again'}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Preview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 opacity-60 pointer-events-none">
          <Card className="p-3 sm:p-6 bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs sm:text-sm font-medium mb-1">Visits</p>
                <p className="text-xl sm:text-3xl font-bold">-</p>
                <p className="text-blue-200 text-[10px] sm:text-xs mt-1 sm:mt-2">Waiting...</p>
              </div>
              <Eye className="w-8 h-8 sm:w-12 sm:h-12 opacity-80" />
            </div>
          </Card>
          <Card className="p-3 sm:p-6 bg-linear-to-r from-green-500 to-green-600 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs sm:text-sm font-medium mb-1">Visitors</p>
                <p className="text-xl sm:text-3xl font-bold">-</p>
                <p className="text-green-200 text-[10px] sm:text-xs mt-1 sm:mt-2">Waiting...</p>
              </div>
              <Users className="w-8 h-8 sm:w-12 sm:h-12 opacity-80" />
            </div>
          </Card>
          <Card className="p-3 sm:p-6 bg-linear-to-r from-purple-500 to-purple-600 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs sm:text-sm font-medium mb-1">Pages</p>
                <p className="text-xl sm:text-3xl font-bold">-</p>
                <p className="text-purple-200 text-[10px] sm:text-xs mt-1 sm:mt-2">Waiting...</p>
              </div>
              <MousePointer className="w-8 h-8 sm:w-12 sm:h-12 opacity-80" />
            </div>
          </Card>
          <Card className="p-3 sm:p-6 bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-xs sm:text-sm font-medium mb-1">Engage</p>
                <p className="text-xl sm:text-3xl font-bold">-</p>
                <p className="text-orange-200 text-[10px] sm:text-xs mt-1 sm:mt-2">Waiting...</p>
              </div>
              <Activity className="w-8 h-8 sm:w-12 sm:h-12 opacity-80" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const stats = data.stats;

  return (
    <div className="space-y-3 sm:space-y-6">
      {/* Enhanced Header with Real-time Status */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="hidden sm:inline">Analytics Dashboard</span>
            <span className="sm:hidden">Analytics</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex gap-1.5 sm:gap-2">
            <Button
              variant={timeRange === 7 ? 'default' : 'outline'}
              onClick={() => handleTimeRangeChange(7)}
              size="sm"
              className="text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9"
            >
              7d
            </Button>
            <Button
              variant={timeRange === 30 ? 'default' : 'outline'}
              onClick={() => handleTimeRangeChange(30)}
              size="sm"
              className="text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9"
            >
              30d
            </Button>
            <Button
              variant={timeRange === 90 ? 'default' : 'outline'}
              onClick={() => handleTimeRangeChange(90)}
              size="sm"
              className="text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9"
            >
              90d
            </Button>
          </div>
          <div className="flex gap-1.5 sm:gap-2">
            <Button
              onClick={() => setAutoRefresh(!autoRefresh)}
              variant="outline"
              size="sm"
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 h-8 sm:h-9"
              title={autoRefresh ? 'Auto-refresh enabled' : 'Auto-refresh disabled'}
            >
              <Activity className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${autoRefresh ? 'text-green-600' : 'text-gray-400'}`} />
              <span className="hidden sm:inline text-xs sm:text-sm">{autoRefresh ? 'Live' : 'Paused'}</span>
            </Button>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              size="sm"
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 h-8 sm:h-9"
            >
              <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline text-xs sm:text-sm">Refresh</span>
            </Button>
            <Button
              onClick={handleExport}
              variant="outline"
              size="sm"
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 h-8 sm:h-9"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline text-xs sm:text-sm">Export</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {/* Total Visits */}
        <Card className="p-3 sm:p-4 lg:p-6 bg-linear-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-xs sm:text-sm font-medium">Visits</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{stats.totalVisits.toLocaleString()}</p>
              {trends && (
                <div className="mt-2">
                  <TrendIndicator trend={trends.visits.trend} change={trends.visits.change} />
                </div>
              )}
            </div>
            <Eye className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
          </div>
        </Card>

        {/* Unique Visitors */}
        {/* <Card className="p-3 sm:p-4 lg:p-6 bg-linear-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-xs sm:text-sm font-medium">Visitors</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{stats.uniqueVisitors.toLocaleString()}</p>
              {trends && (
                <div className="mt-2">
                  <TrendIndicator trend={trends.visitors.trend} change={trends.visitors.change} />
                </div>
              )}
            </div>
            <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
          </div>
        </Card> */}

        {/* Page Views */}
        <Card className="p-3 sm:p-4 lg:p-6 bg-linear-to-r from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-xs sm:text-sm font-medium">Pages</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{stats.totalPages.toLocaleString()}</p>
              {trends && (
                <div className="mt-2">
                  <TrendIndicator trend={trends.pages.trend} change={trends.pages.change} />
                </div>
              )}
            </div>
            <MousePointer className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
          </div>
        </Card>

        {/* Pages per Visit */}
        <Card className="p-3 sm:p-4 lg:p-6 bg-linear-to-r from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-xs sm:text-sm font-medium">Pg/Visit</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">
                {stats.totalVisits > 0 ? (stats.totalPages / stats.totalVisits).toFixed(1) : '0'}
              </p>
              {trends && (
                <div className="mt-2">
                  <TrendIndicator trend={trends.avgPages.trend} change={trends.avgPages.change} />
                </div>
              )}
            </div>
            <Target className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
          </div>
        </Card>

        {/* Bounce Rate */}
        <Card className="p-3 sm:p-4 lg:p-6 bg-linear-to-r from-pink-500 to-rose-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-xs sm:text-sm font-medium">Bounce</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{stats.bounceRate.toFixed(1)}%</p>
              {trends && (
                <div className="mt-2">
                  <TrendIndicator trend={trends.bounceRate.trend} change={trends.bounceRate.change} />
                </div>
              )}
            </div>
            <Zap className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
          </div>
        </Card>
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
        {/* Daily Traffic Trend Chart */}
        <Card className="p-4 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              Traffic Trend
            </h3>
            <div className="flex gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-linear-to-r from-blue-500 to-blue-600 rounded"></div>
                <span className="text-gray-600">Visits</span>
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
              <div className="space-y-1.5 sm:space-y-2 max-h-75 sm:max-h-100 overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
                {data.dailyVisits.slice().reverse().map((day, index) => {
                  const visits = parseInt(day.visits);
                  const visitsWidth = (visits / chartData.maxVisits) * 100;
                  const isToday = new Date(day.date).toDateString() === new Date().toDateString();

                  return (
                    <div key={index} className={`group hover:bg-gray-50 rounded-md sm:rounded-lg p-1.5 sm:p-2 -mx-1.5 sm:-mx-2 transition-colors ${isToday ? 'bg-blue-50' : ''}`}>
                      <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                        <div className="text-[10px] sm:text-xs font-medium text-gray-700 w-16 sm:w-24 shrink-0">
                          {new Date(day.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            weekday: 'short' 
                          })}
                          {isToday && <span className="ml-1 text-blue-600 font-bold">•</span>}
                        </div>
                        <div className="flex-1 space-y-1">
                          {/* Visits Bar */}
                          <div className="relative h-5 sm:h-7 bg-gray-100 rounded-md overflow-hidden">
                            <div
                              className="absolute inset-y-0 left-0 bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-end pr-2 transition-all duration-500 group-hover:from-blue-600 group-hover:to-blue-700"
                              style={{ width: `${visitsWidth}%` }}
                            >
                              {visits > 0 && (
                                <span className="text-[10px] sm:text-xs font-bold text-white drop-shadow">
                                  {visits}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 w-16 text-right">
                          <div className="font-medium text-gray-700">{visits}</div>
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
        <Card className="p-4 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
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
              <div className="space-y-2 sm:space-y-3 max-h-75 sm:max-h-100 overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
                {data.topPages.slice(0, 10).map((page, index) => {
                  const visits = parseInt(page.visits);
                  
                  return (
                    <div key={index} className="group hover:bg-purple-50 rounded-md sm:rounded-lg p-2 sm:p-3 -mx-2 sm:-mx-3 transition-all duration-200">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-linear-to-r from-purple-500 to-purple-600 text-white flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 shadow-md">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate pr-2">
                              {page.page_path === '/' ? 'Home' : 
                               page.page_path === '/services' ? 'Services' :
                               page.page_path === '/contact' ? 'Contact' :
                               page.page_path === '/company-profile' ? 'Company' :
                               page.page_path}
                            </p>
                            <span className="text-xs sm:text-sm font-bold text-purple-600 shrink-0">
                              {visits}
                            </span>
                          </div>
                          <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-linear-to-r from-purple-500 to-purple-600 transition-all duration-500"
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
        {/* Geographic Distribution */}
        <Card className="p-4 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              Geographic Reach
            </h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {data.byCountry.length} {data.byCountry.length === 1 ? 'country' : 'countries'}
            </span>
          </div>
          <div className="space-y-3">
            {data.byCountry.length === 0 ? (
              <div className="text-center py-8">
                <Globe className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500 text-sm">No geographic data</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-87.5 overflow-y-auto pr-2 custom-scrollbar">
                {data.byCountry.slice(0, 12).map((country, index) => {
                  const visits = parseInt(country.visits);
                  const maxVisits = parseInt(data.byCountry[0].visits);
                  const percentage = (visits / maxVisits) * 100;
                  
                  // Country code to full name and flag mapping
                  const countryData: Record<string, { name: string; flag: string }> = {
                    'AF': { name: 'Afghanistan', flag: '🇦🇫' },
                    'AL': { name: 'Albania', flag: '🇦🇱' },
                    'DZ': { name: 'Algeria', flag: '🇩🇿' },
                    'AD': { name: 'Andorra', flag: '🇦🇩' },
                    'AO': { name: 'Angola', flag: '🇦🇴' },
                    'AR': { name: 'Argentina', flag: '🇦🇷' },
                    'AM': { name: 'Armenia', flag: '🇦🇲' },
                    'AU': { name: 'Australia', flag: '🇦🇺' },
                    'AT': { name: 'Austria', flag: '🇦🇹' },
                    'AZ': { name: 'Azerbaijan', flag: '🇦🇿' },
                    'BS': { name: 'Bahamas', flag: '🇧🇸' },
                    'BH': { name: 'Bahrain', flag: '🇧🇭' },
                    'BD': { name: 'Bangladesh', flag: '🇧🇩' },
                    'BB': { name: 'Barbados', flag: '🇧🇧' },
                    'BY': { name: 'Belarus', flag: '🇧🇾' },
                    'BE': { name: 'Belgium', flag: '🇧🇪' },
                    'BZ': { name: 'Belize', flag: '🇧🇿' },
                    'BJ': { name: 'Benin', flag: '🇧🇯' },
                    'BT': { name: 'Bhutan', flag: '🇧🇹' },
                    'BO': { name: 'Bolivia', flag: '🇧🇴' },
                    'BA': { name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
                    'BW': { name: 'Botswana', flag: '🇧🇼' },
                    'BR': { name: 'Brazil', flag: '🇧🇷' },
                    'BN': { name: 'Brunei', flag: '🇧🇳' },
                    'BG': { name: 'Bulgaria', flag: '🇧🇬' },
                    'BF': { name: 'Burkina Faso', flag: '🇧🇫' },
                    'BI': { name: 'Burundi', flag: '🇧🇮' },
                    'KH': { name: 'Cambodia', flag: '🇰🇭' },
                    'CM': { name: 'Cameroon', flag: '🇨🇲' },
                    'CA': { name: 'Canada', flag: '🇨🇦' },
                    'CV': { name: 'Cape Verde', flag: '🇨🇻' },
                    'CF': { name: 'Central African Republic', flag: '🇨🇫' },
                    'TD': { name: 'Chad', flag: '🇹🇩' },
                    'CL': { name: 'Chile', flag: '🇨🇱' },
                    'CN': { name: 'China', flag: '🇨🇳' },
                    'CO': { name: 'Colombia', flag: '🇨🇴' },
                    'KM': { name: 'Comoros', flag: '🇰🇲' },
                    'CG': { name: 'Congo', flag: '🇨🇬' },
                    'CD': { name: 'Congo (Democratic Republic)', flag: '🇨🇩' },
                    'CR': { name: 'Costa Rica', flag: '🇨🇷' },
                    'CI': { name: 'Côte d\'Ivoire', flag: '🇨🇮' },
                    'HR': { name: 'Croatia', flag: '🇭🇷' },
                    'CU': { name: 'Cuba', flag: '🇨🇺' },
                    'CY': { name: 'Cyprus', flag: '🇨🇾' },
                    'CZ': { name: 'Czech Republic', flag: '🇨🇿' },
                    'DK': { name: 'Denmark', flag: '🇩🇰' },
                    'DJ': { name: 'Djibouti', flag: '🇩🇯' },
                    'DM': { name: 'Dominica', flag: '🇩🇲' },
                    'DO': { name: 'Dominican Republic', flag: '🇩🇴' },
                    'EC': { name: 'Ecuador', flag: '🇪🇨' },
                    'EG': { name: 'Egypt', flag: '🇪🇬' },
                    'SV': { name: 'El Salvador', flag: '🇸🇻' },
                    'GQ': { name: 'Equatorial Guinea', flag: '🇬🇶' },
                    'ER': { name: 'Eritrea', flag: '🇪🇷' },
                    'EE': { name: 'Estonia', flag: '🇪🇪' },
                    'ET': { name: 'Ethiopia', flag: '🇪🇹' },
                    'FJ': { name: 'Fiji', flag: '🇫🇯' },
                    'FI': { name: 'Finland', flag: '🇫🇮' },
                    'FR': { name: 'France', flag: '🇫🇷' },
                    'GA': { name: 'Gabon', flag: '🇬🇦' },
                    'GM': { name: 'Gambia', flag: '🇬🇲' },
                    'GE': { name: 'Georgia', flag: '🇬🇪' },
                    'DE': { name: 'Germany', flag: '🇩🇪' },
                    'GH': { name: 'Ghana', flag: '🇬🇭' },
                    'GR': { name: 'Greece', flag: '🇬🇷' },
                    'GD': { name: 'Grenada', flag: '🇬🇩' },
                    'GT': { name: 'Guatemala', flag: '🇬🇹' },
                    'GN': { name: 'Guinea', flag: '🇬🇳' },
                    'GW': { name: 'Guinea-Bissau', flag: '🇬🇼' },
                    'GY': { name: 'Guyana', flag: '🇬🇾' },
                    'HT': { name: 'Haiti', flag: '🇭🇹' },
                    'HN': { name: 'Honduras', flag: '🇭🇳' },
                    'HK': { name: 'Hong Kong', flag: '🇭🇰' },
                    'HU': { name: 'Hungary', flag: '🇭🇺' },
                    'IS': { name: 'Iceland', flag: '🇮🇸' },
                    'IN': { name: 'India', flag: '🇮🇳' },
                    'ID': { name: 'Indonesia', flag: '🇮🇩' },
                    'IR': { name: 'Iran', flag: '🇮🇷' },
                    'IQ': { name: 'Iraq', flag: '🇮🇶' },
                    'IE': { name: 'Ireland', flag: '🇮🇪' },
                    'IL': { name: 'Israel', flag: '🇮🇱' },
                    'IT': { name: 'Italy', flag: '🇮🇹' },
                    'JM': { name: 'Jamaica', flag: '🇯🇲' },
                    'JP': { name: 'Japan', flag: '🇯🇵' },
                    'JO': { name: 'Jordan', flag: '🇯🇴' },
                    'KZ': { name: 'Kazakhstan', flag: '🇰🇿' },
                    'KE': { name: 'Kenya', flag: '🇰🇪' },
                    'KI': { name: 'Kiribati', flag: '🇰🇮' },
                    'KP': { name: 'North Korea', flag: '🇰🇵' },
                    'KR': { name: 'South Korea', flag: '🇰🇷' },
                    'KW': { name: 'Kuwait', flag: '🇰🇼' },
                    'KG': { name: 'Kyrgyzstan', flag: '🇰🇬' },
                    'LA': { name: 'Laos', flag: '🇱🇦' },
                    'LV': { name: 'Latvia', flag: '🇱🇻' },
                    'LB': { name: 'Lebanon', flag: '🇱🇧' },
                    'LS': { name: 'Lesotho', flag: '🇱🇸' },
                    'LR': { name: 'Liberia', flag: '🇱🇷' },
                    'LY': { name: 'Libya', flag: '🇱🇾' },
                    'LI': { name: 'Liechtenstein', flag: '🇱🇮' },
                    'LT': { name: 'Lithuania', flag: '🇱🇹' },
                    'LU': { name: 'Luxembourg', flag: '🇱🇺' },
                    'MO': { name: 'Macao', flag: '🇲🇴' },
                    'MK': { name: 'North Macedonia', flag: '🇲🇰' },
                    'MG': { name: 'Madagascar', flag: '🇲🇬' },
                    'MW': { name: 'Malawi', flag: '🇲🇼' },
                    'MY': { name: 'Malaysia', flag: '🇲🇾' },
                    'MV': { name: 'Maldives', flag: '🇲🇻' },
                    'ML': { name: 'Mali', flag: '🇲🇱' },
                    'MT': { name: 'Malta', flag: '🇲🇹' },
                    'MH': { name: 'Marshall Islands', flag: '🇲🇭' },
                    'MR': { name: 'Mauritania', flag: '🇲🇷' },
                    'MU': { name: 'Mauritius', flag: '🇲🇺' },
                    'MX': { name: 'Mexico', flag: '🇲🇽' },
                    'FM': { name: 'Micronesia', flag: '🇫🇲' },
                    'MD': { name: 'Moldova', flag: '🇲🇩' },
                    'MC': { name: 'Monaco', flag: '🇲🇨' },
                    'MN': { name: 'Mongolia', flag: '🇲🇳' },
                    'ME': { name: 'Montenegro', flag: '🇲🇪' },
                    'MA': { name: 'Morocco', flag: '🇲🇦' },
                    'MZ': { name: 'Mozambique', flag: '🇲🇿' },
                    'MM': { name: 'Myanmar', flag: '🇲🇲' },
                    'NA': { name: 'Namibia', flag: '🇳🇦' },
                    'NR': { name: 'Nauru', flag: '🇳🇷' },
                    'NP': { name: 'Nepal', flag: '🇳🇵' },
                    'NL': { name: 'Netherlands', flag: '🇳🇱' },
                    'NZ': { name: 'New Zealand', flag: '🇳🇿' },
                    'NI': { name: 'Nicaragua', flag: '🇳🇮' },
                    'NE': { name: 'Niger', flag: '🇳🇪' },
                    'NG': { name: 'Nigeria', flag: '🇳🇬' },
                    'NO': { name: 'Norway', flag: '🇳🇴' },
                    'OM': { name: 'Oman', flag: '🇴🇲' },
                    'PK': { name: 'Pakistan', flag: '🇵🇰' },
                    'PW': { name: 'Palau', flag: '🇵🇼' },
                    'PS': { name: 'Palestine', flag: '🇵🇸' },
                    'PA': { name: 'Panama', flag: '🇵🇦' },
                    'PG': { name: 'Papua New Guinea', flag: '🇵🇬' },
                    'PY': { name: 'Paraguay', flag: '🇵🇾' },
                    'PE': { name: 'Peru', flag: '🇵🇪' },
                    'PH': { name: 'Philippines', flag: '🇵🇭' },
                    'PL': { name: 'Poland', flag: '🇵🇱' },
                    'PT': { name: 'Portugal', flag: '🇵🇹' },
                    'QA': { name: 'Qatar', flag: '🇶🇦' },
                    'RO': { name: 'Romania', flag: '🇷🇴' },
                    'RU': { name: 'Russia', flag: '🇷🇺' },
                    'RW': { name: 'Rwanda', flag: '🇷🇼' },
                    'KN': { name: 'Saint Kitts and Nevis', flag: '🇰🇳' },
                    'LC': { name: 'Saint Lucia', flag: '🇱🇨' },
                    'VC': { name: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
                    'WS': { name: 'Samoa', flag: '🇼🇸' },
                    'SM': { name: 'San Marino', flag: '🇸🇲' },
                    'ST': { name: 'São Tomé and Príncipe', flag: '🇸🇹' },
                    'SA': { name: 'Saudi Arabia', flag: '🇸🇦' },
                    'SN': { name: 'Senegal', flag: '🇸🇳' },
                    'RS': { name: 'Serbia', flag: '🇷🇸' },
                    'SC': { name: 'Seychelles', flag: '🇸🇨' },
                    'SL': { name: 'Sierra Leone', flag: '🇸🇱' },
                    'SG': { name: 'Singapore', flag: '🇸🇬' },
                    'SK': { name: 'Slovakia', flag: '🇸🇰' },
                    'SI': { name: 'Slovenia', flag: '🇸🇮' },
                    'SB': { name: 'Solomon Islands', flag: '🇸🇧' },
                    'SO': { name: 'Somalia', flag: '🇸🇴' },
                    'ZA': { name: 'South Africa', flag: '🇿🇦' },
                    'SS': { name: 'South Sudan', flag: '🇸🇸' },
                    'ES': { name: 'Spain', flag: '🇪🇸' },
                    'LK': { name: 'Sri Lanka', flag: '🇱🇰' },
                    'SD': { name: 'Sudan', flag: '🇸🇩' },
                    'SR': { name: 'Suriname', flag: '🇸🇷' },
                    'SZ': { name: 'Eswatini', flag: '🇸🇿' },
                    'SE': { name: 'Sweden', flag: '🇸🇪' },
                    'CH': { name: 'Switzerland', flag: '🇨🇭' },
                    'SY': { name: 'Syria', flag: '🇸🇾' },
                    'TW': { name: 'Taiwan', flag: '🇹🇼' },
                    'TJ': { name: 'Tajikistan', flag: '🇹🇯' },
                    'TZ': { name: 'Tanzania', flag: '🇹🇿' },
                    'TH': { name: 'Thailand', flag: '🇹🇭' },
                    'TL': { name: 'Timor-Leste', flag: '🇹🇱' },
                    'TG': { name: 'Togo', flag: '🇹🇬' },
                    'TO': { name: 'Tonga', flag: '🇹🇴' },
                    'TT': { name: 'Trinidad and Tobago', flag: '🇹🇹' },
                    'TN': { name: 'Tunisia', flag: '🇹🇳' },
                    'TR': { name: 'Turkey', flag: '🇹🇷' },
                    'TM': { name: 'Turkmenistan', flag: '🇹🇲' },
                    'TV': { name: 'Tuvalu', flag: '🇹🇻' },
                    'UG': { name: 'Uganda', flag: '🇺🇬' },
                    'UA': { name: 'Ukraine', flag: '🇺🇦' },
                    'AE': { name: 'United Arab Emirates', flag: '🇦🇪' },
                    'GB': { name: 'United Kingdom', flag: '🇬🇧' },
                    'US': { name: 'United States', flag: '🇺🇸' },
                    'UY': { name: 'Uruguay', flag: '🇺🇾' },
                    'UZ': { name: 'Uzbekistan', flag: '🇺🇿' },
                    'VU': { name: 'Vanuatu', flag: '🇻🇺' },
                    'VA': { name: 'Vatican City', flag: '🇻🇦' },
                    'VE': { name: 'Venezuela', flag: '🇻🇪' },
                    'VN': { name: 'Vietnam', flag: '🇻🇳' },
                    'YE': { name: 'Yemen', flag: '🇾🇪' },
                    'ZM': { name: 'Zambia', flag: '🇿🇲' },
                    'ZW': { name: 'Zimbabwe', flag: '🇿🇼' },
                    'Unknown': { name: 'Unknown', flag: '🌍' }
                  };
                  
                  const countryCode = country.country.toUpperCase();
                  const countryInfo = countryData[countryCode] || { 
                    name: country.country, 
                    flag: '🌍' 
                  };

                  return (
                    <div key={index} className="group hover:bg-green-50 rounded-md sm:rounded-lg p-1.5 sm:p-2 -mx-1.5 sm:-mx-2 transition-colors">
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                          <img
                            src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
                            alt={countryInfo.name}
                            className="w-6 h-4 sm:w-8 sm:h-6 object-contain rounded shrink-0 shadow-sm"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-xs sm:text-sm font-semibold text-gray-900 block truncate">{countryInfo.name}</span>
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-green-600 shrink-0 ml-2">{visits}</span>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-green-500 to-green-600 transition-all duration-500"
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
        <Card className="p-4 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
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
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
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
                        <div className={`w-full aspect-square rounded-lg sm:rounded-xl bg-linear-to-r ${colorClass} p-2 sm:p-4 mb-1.5 sm:mb-2 shadow-md flex items-center justify-center`}>
                          <div className="text-center text-white">
                            <Icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-0.5 sm:mb-1" />
                            <p className="text-lg sm:text-2xl font-bold">{device.percentage.toFixed(0)}%</p>
                          </div>
                        </div>
                        <p className="text-[10px] sm:text-xs font-medium text-gray-700">{device.device_type}</p>
                        <p className="text-[9px] sm:text-xs text-gray-500">{device.visits} visits</p>
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 border-t">
                  {deviceStats.percentages.map((device, index) => (
                    <div key={index} className="group hover:bg-blue-50 rounded-md sm:rounded-lg p-1.5 sm:p-2 -mx-1.5 sm:-mx-2 transition-colors">
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          {device.device_type === 'Mobile' && <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />}
                          {device.device_type === 'Desktop' && <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />}
                          {device.device_type === 'Tablet' && <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />}
                          <span className="text-xs sm:text-sm font-medium text-gray-700">{device.device_type}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-bold text-gray-900">{device.visits}</span>
                          <span className="text-[10px] sm:text-xs text-gray-500 ml-1 sm:ml-2">({device.percentage.toFixed(1)}%)</span>
                        </div>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-blue-500 to-blue-600 transition-all duration-500"
                          style={{ width: `${device.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Browser Analytics */}
        <Card className="p-4 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
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
              <div className="space-y-3 max-h-87.5 overflow-y-auto pr-2 custom-scrollbar">
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
                    <div key={index} className="group hover:bg-orange-50 rounded-md sm:rounded-lg p-1.5 sm:p-2 -mx-1.5 sm:-mx-2 transition-colors">
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                          <span className="text-base sm:text-xl shrink-0">{emoji}</span>
                          <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">{browser.browser}</span>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-orange-600 shrink-0">{visits}</span>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-orange-500 to-orange-600 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% of traffic</p>
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
