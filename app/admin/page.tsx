"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Mail, 
  BarChart3, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Search,
  LogOut,
  Eye,
  Archive,
  TrendingUp,
  MessageSquare,
  Calendar,
  FileJson,
  FileSpreadsheet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { AnalyticsSection } from '@/components/admin/AnalyticsSection';

interface Message {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  created_at: string;
  ip_address?: string;
  user_agent?: string;
}

interface Stats {
  total: number;
  unread: number;
  today: number;
  week: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard state
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, unread: 0, today: 0, week: 0 });
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [activeTab, setActiveTab] = useState<'messages' | 'analytics'>('messages');
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch data when authenticated
  const fetchMessages = useCallback(async () => {
    try {
      const statusParam = filter === 'all' ? '' : `?status=${filter}`;
      const response = await fetch(`/api/admin/messages${statusParam}`);
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to fetch messages:', error);
      }
    }
  }, [filter]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/stats');
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to fetch stats:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
      fetchStats();
    }
  }, [isAuthenticated, filter, fetchMessages, fetchStats]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/login');
      if (response.ok) {
        setIsAuthenticated(true);
      }
    } catch {
      // Auth check failed silently
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setUsername('');
        setPassword('');
      } else {
        const data = await response.json();
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch {
      setLoginError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', { method: 'DELETE' });
      setIsAuthenticated(false);
      router.push('/');
    } catch {
      // Logout failed silently
    }
  };

  const updateMessageStatus = async (id: number, status: 'unread' | 'read' | 'archived') => {
    try {
      const response = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        fetchMessages();
        fetchStats();
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch {
      // Update failed silently
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/admin/messages?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchMessages();
        fetchStats();
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch {
      // Delete failed silently
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        msg.name.toLowerCase().includes(query) ||
        msg.email.toLowerCase().includes(query) ||
        msg.message.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const handleExport = async (format: 'json' | 'csv') => {
    setIsExporting(true);
    setError(null);
    
    try {
      const statusParam = filter === 'all' ? '' : `&status=${filter}`;
      const response = await fetch(`/api/admin/export?format=${format}${statusParam}`);
      
      if (!response.ok) {
        throw new Error('Export failed');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const timestamp = new Date().toISOString().split('T')[0];
      a.download = `messages-export-${timestamp}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to export messages. Please try again.');
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-4">
        <Card className="w-full max-w-md p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full mb-3 sm:mb-4" aria-hidden="true">
              <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">D.BRIGHT Services</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                disabled={isLoading}
                autoComplete="username"
                className="w-full h-11 sm:h-10"
                aria-describedby={loginError ? "login-error" : undefined}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                disabled={isLoading}
                autoComplete="current-password"
                className="w-full h-11 sm:h-10"
                aria-describedby={loginError ? "login-error" : undefined}
              />
            </div>

            {loginError && (
              <div 
                id="login-error"
                role="alert"
                className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded text-sm"
              >
                {loginError}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 h-11 sm:h-10"
              aria-label={isLoading ? 'Logging in...' : 'Login to admin dashboard'}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">D.BRIGHT Services Management</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 h-9 sm:h-10"
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Out</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Tab Navigation */}
        <div className="mb-4 sm:mb-6">
          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex items-center gap-2 px-4 py-2 sm:py-3 font-medium text-sm sm:text-base border-b-2 transition-colors ${
                activeTab === 'messages'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Mail className="w-4 h-4" />
              Messages
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 sm:py-3 font-medium text-sm sm:text-base border-b-2 transition-colors ${
                activeTab === 'analytics'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
          </div>
        </div>

        {activeTab === 'messages' ? (
          <>
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
          <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs sm:text-sm font-medium">Total</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{stats.total}</p>
              </div>
              <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
            </div>
          </Card>

          <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-xs sm:text-sm font-medium">Unread</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{stats.unread}</p>
              </div>
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
            </div>
          </Card>

          <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs sm:text-sm font-medium">Today</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{stats.today}</p>
              </div>
              <Calendar className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
            </div>
          </Card>

          <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs sm:text-sm font-medium">This Week</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{stats.week}</p>
              </div>
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80" />
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center justify-between">
              <span className="text-sm">{error}</span>
              <button onClick={() => setError(null)} className="text-red-700 hover:text-red-900">✕</button>
            </div>
          )}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <Input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 sm:pl-10 h-10 sm:h-10 text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleExport('csv')}
                  disabled={isExporting || filteredMessages.length === 0}
                  variant="outline"
                  className="shrink-0 h-10 text-xs sm:text-sm px-3 sm:px-4 flex items-center gap-2"
                  title="Export as CSV"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span className="hidden sm:inline">CSV</span>
                </Button>
                <Button
                  onClick={() => handleExport('json')}
                  disabled={isExporting || filteredMessages.length === 0}
                  variant="outline"
                  className="shrink-0 h-10 text-xs sm:text-sm px-3 sm:px-4 flex items-center gap-2"
                  title="Export as JSON"
                >
                  <FileJson className="w-4 h-4" />
                  <span className="hidden sm:inline">JSON</span>
                </Button>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                className="shrink-0 h-9 sm:h-10 text-xs sm:text-sm px-3 sm:px-4"
              >
                All
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                onClick={() => setFilter('unread')}
                className="shrink-0 h-9 sm:h-10 text-xs sm:text-sm px-3 sm:px-4"
              >
                Unread
              </Button>
              <Button
                variant={filter === 'read' ? 'default' : 'outline'}
                onClick={() => setFilter('read')}
                className="shrink-0 h-9 sm:h-10 text-xs sm:text-sm px-3 sm:px-4"
              >
                Read
              </Button>
              <Button
                variant={filter === 'archived' ? 'default' : 'outline'}
                onClick={() => setFilter('archived')}
                className="shrink-0 h-9 sm:h-10 text-xs sm:text-sm px-3 sm:px-4"
              >
                Archived
              </Button>
            </div>
          </div>
        </Card>

        {/* Messages List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            <Card className="p-3 sm:p-4 lg:p-6">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                Messages ({filteredMessages.length})
              </h2>
              
              <div className="space-y-2 sm:space-y-3 lg:space-y-4 max-h-[calc(100vh-24rem)] sm:max-h-[600px] overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="text-center py-8 sm:py-12 text-gray-500">
                    <Mail className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-50" />
                    <p className="text-sm sm:text-base">No messages found</p>
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`border rounded-lg p-3 sm:p-4 cursor-pointer transition-all hover:shadow-md active:scale-[0.98] ${
                        message.status === 'unread' ? 'bg-blue-50 border-blue-200' : 'bg-white'
                      } ${selectedMessage?.id === message.id ? 'ring-2 ring-blue-500' : ''}`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">{message.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">{message.email}</p>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 ml-2 shrink-0">
                          {message.status === 'unread' && (
                            <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 whitespace-nowrap">
                              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                              New
                            </span>
                          )}
                          {message.status === 'read' && (
                            <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">
                              <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                              Read
                            </span>
                          )}
                          {message.status === 'archived' && (
                            <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 whitespace-nowrap">
                              <Archive className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                              Arch
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 line-clamp-2 mb-1.5 sm:mb-2">{message.message}</p>
                      <p className="text-xs text-gray-500">{formatDate(message.created_at)}</p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-1">
            {selectedMessage && (
              <>
                {/* Mobile: Fixed bottom sheet */}
                <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setSelectedMessage(null)}>
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
                      <h2 className="text-lg font-bold flex items-center gap-2">
                        <Eye className="w-5 h-5" />
                        Message Details
                      </h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedMessage(null)}
                        className="h-8 w-8 p-0"
                      >
                        ✕
                      </Button>
                    </div>
                    <div className="p-4 space-y-4">
                      <div>
                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">Name</label>
                        <p className="font-semibold text-sm mt-1">{selectedMessage.name}</p>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">Email</label>
                        <p className="font-semibold text-sm mt-1 break-all">{selectedMessage.email}</p>
                      </div>

                      {selectedMessage.phone && (
                        <div>
                          <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">Phone</label>
                          <p className="font-semibold text-sm mt-1">{selectedMessage.phone}</p>
                        </div>
                      )}

                      <div>
                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">Message</label>
                        <p className="mt-1 text-sm text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</p>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">Received</label>
                        <p className="font-semibold text-sm mt-1">{formatDate(selectedMessage.created_at)}</p>
                      </div>

                      <div className="pt-2 space-y-2 sticky bottom-0 bg-white pb-safe">
                        {selectedMessage.status === 'unread' && (
                          <Button
                            onClick={() => updateMessageStatus(selectedMessage.id, 'read')}
                            className="w-full bg-green-600 hover:bg-green-700 h-11"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Read
                          </Button>
                        )}

                        {selectedMessage.status === 'read' && (
                          <Button
                            onClick={() => updateMessageStatus(selectedMessage.id, 'archived')}
                            className="w-full bg-gray-600 hover:bg-gray-700 h-11"
                          >
                            <Archive className="w-4 h-4 mr-2" />
                            Archive
                          </Button>
                        )}

                        {selectedMessage.status !== 'unread' && (
                          <Button
                            onClick={() => updateMessageStatus(selectedMessage.id, 'unread')}
                            variant="outline"
                            className="w-full h-11"
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            Mark as Unread
                          </Button>
                        )}

                        <Button
                          onClick={() => deleteMessage(selectedMessage.id)}
                          variant="outline"
                          className="w-full text-red-600 border-red-600 hover:bg-red-50 h-11"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Desktop: Sticky sidebar */}
            <Card className="p-4 lg:p-6 sticky top-24 hidden lg:block">
              {selectedMessage ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Message Details
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Name</label>
                      <p className="font-semibold">{selectedMessage.name}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="font-semibold break-all">{selectedMessage.email}</p>
                    </div>

                    {selectedMessage.phone && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Phone</label>
                        <p className="font-semibold">{selectedMessage.phone}</p>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-gray-600">Message</label>
                      <p className="mt-1 text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">Received</label>
                      <p className="font-semibold">{formatDate(selectedMessage.created_at)}</p>
                    </div>

                    <div className="pt-4 space-y-2">
                      {selectedMessage.status === 'unread' && (
                        <Button
                          onClick={() => updateMessageStatus(selectedMessage.id, 'read')}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Read
                        </Button>
                      )}

                      {selectedMessage.status === 'read' && (
                        <Button
                          onClick={() => updateMessageStatus(selectedMessage.id, 'archived')}
                          className="w-full bg-gray-600 hover:bg-gray-700"
                        >
                          <Archive className="w-4 h-4 mr-2" />
                          Archive
                        </Button>
                      )}

                      {selectedMessage.status !== 'unread' && (
                        <Button
                          onClick={() => updateMessageStatus(selectedMessage.id, 'unread')}
                          variant="outline"
                          className="w-full"
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Mark as Unread
                        </Button>
                      )}

                      <Button
                        onClick={() => deleteMessage(selectedMessage.id)}
                        variant="outline"
                        className="w-full text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Message
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select a message to view details</p>
                </div>
              )}
            </Card>
          </div>
        </div>
        </>
        ) : (
          <AnalyticsSection />
        )}
      </div>
    </div>
  );
}
