"use client";

import { useEffect, useState } from 'react';
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
  Users,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

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

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
      fetchStats();
    }
  }, [isAuthenticated, filter]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/login');
      if (response.ok) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
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
    } catch (error) {
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
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const statusParam = filter === 'all' ? '' : `?status=${filter}`;
      const response = await fetch(`/api/admin/messages${statusParam}`);
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
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
    } catch (error) {
      console.error('Failed to update message:', error);
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
    } catch (error) {
      console.error('Failed to delete message:', error);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">D.BRIGHT Services</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {loginError}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">D.BRIGHT Services Management</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Messages</p>
                <p className="text-3xl font-bold mt-2">{stats.total}</p>
              </div>
              <MessageSquare className="w-12 h-12 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Unread</p>
                <p className="text-3xl font-bold mt-2">{stats.unread}</p>
              </div>
              <Mail className="w-12 h-12 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Today</p>
                <p className="text-3xl font-bold mt-2">{stats.today}</p>
              </div>
              <Calendar className="w-12 h-12 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">This Week</p>
                <p className="text-3xl font-bold mt-2">{stats.week}</p>
              </div>
              <TrendingUp className="w-12 h-12 opacity-80" />
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                className="flex-1 md:flex-none"
              >
                All
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                onClick={() => setFilter('unread')}
                className="flex-1 md:flex-none"
              >
                Unread
              </Button>
              <Button
                variant={filter === 'read' ? 'default' : 'outline'}
                onClick={() => setFilter('read')}
                className="flex-1 md:flex-none"
              >
                Read
              </Button>
              <Button
                variant={filter === 'archived' ? 'default' : 'outline'}
                onClick={() => setFilter('archived')}
                className="flex-1 md:flex-none"
              >
                Archived
              </Button>
            </div>
          </div>
        </Card>

        {/* Messages List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Messages ({filteredMessages.length})
              </h2>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No messages found</p>
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                        message.status === 'unread' ? 'bg-blue-50 border-blue-200' : 'bg-white'
                      } ${selectedMessage?.id === message.id ? 'ring-2 ring-blue-500' : ''}`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{message.name}</h3>
                          <p className="text-sm text-gray-600">{message.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {message.status === 'unread' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              <Clock className="w-3 h-3 mr-1" />
                              New
                            </span>
                          )}
                          {message.status === 'read' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Read
                            </span>
                          )}
                          {message.status === 'archived' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <Archive className="w-3 h-3 mr-1" />
                              Archived
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2 mb-2">{message.message}</p>
                      <p className="text-xs text-gray-500">{formatDate(message.created_at)}</p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
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
                      <p className="font-semibold">{selectedMessage.email}</p>
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
      </div>
    </div>
  );
}
