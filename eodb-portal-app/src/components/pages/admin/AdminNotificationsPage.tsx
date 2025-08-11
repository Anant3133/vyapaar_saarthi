import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { NotificationsAPI } from '@/api';
import { 
  Bell, 
  Send, 
  Users, 
  AlertTriangle, 
  Home,
  FileText,
  Shield,
  Clock,
  CheckCircle,
  Eye,
  Filter,
  Search,
  Calendar,
  MessageSquare,
  Download,
  Plus
} from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';

interface AdminNotificationsPageProps {
  language: 'en' | 'hi';
  user: any;
  onNavigate?: (page: string) => void;
}

export function AdminNotificationsPage({ language, user, onNavigate }: AdminNotificationsPageProps) {
  const [activeTab, setActiveTab] = useState('system');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dynamic data state
  const [systemAlerts, setSystemAlerts] = useState<any[]>([]);
  const [userNotifications, setUserNotifications] = useState<any[]>([]);
  const [governmentCirculars, setGovernmentCirculars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const translations = {
    en: {
      title: 'Notifications & Alerts Center',
      subtitle: 'Monitor system status, user activities, and government communications',
      backToWelcome: 'Back to Welcome',
      sendNotification: 'Send Notification',
      createAlert: 'Create Alert',
      systemAlerts: 'System Alerts',
      userNotifications: 'User Notifications',
      governmentCirculars: 'Government Circulars',
      searchNotifications: 'Search notifications...',
      allPriorities: 'All Priorities',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      markAsRead: 'Mark as Read',
      viewDetails: 'View Details',
      filterBy: 'Filter by',
      dateRange: 'Date Range',
      status: 'Status',
      priority: 'Priority',
      department: 'Department',
      totalAlerts: 'Total Alerts',
      activeAlerts: 'Active Alerts',
      resolvedAlerts: 'Resolved Alerts',
      pendingNotifications: 'Pending Notifications',
      sentNotifications: 'Sent Notifications',
      newCirculars: 'New Circulars',
      publishedCirculars: 'Published Circulars',
      systemStatus: 'System Status',
      databaseConnection: 'Database Connection',
      serverHealth: 'Server Health',
      apiResponse: 'API Response Time',
      securityAlerts: 'Security Alerts',
      maintenanceAlerts: 'Maintenance Alerts',
      performanceAlerts: 'Performance Alerts',
      recentActivity: 'Recent Activity',
      viewAll: 'View All',
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'This Week',
      lastWeek: 'Last Week',
      thisMonth: 'This Month'
    },
    hi: {
      title: 'अधिसूचना और चेतावनी केंद्र',
      subtitle: 'सिस्टम स्थिति, उपयोगकर्ता गतिविधियों और सरकारी संचार की निगरानी करें',
      backToWelcome: 'स्वागत पृष्ठ पर वापस',
      sendNotification: 'अधिसूचना भेजें',
      createAlert: 'अलर्ट बनाएं',
      systemAlerts: 'सिस्टम अलर्ट',
      userNotifications: 'उपयोगकर्ता अधिसूचनाएं',
      governmentCirculars: 'सरकारी परिपत्र',
      searchNotifications: 'अधिसूचनाएं खोजें...',
      allPriorities: 'सभी प्राथमिकताएं',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'निम्न',
      markAsRead: 'पढ़े गए के रूप में चिह्नित करें',
      viewDetails: 'विवरण देखें',
      filterBy: 'फ़िल्टर करें',
      dateRange: 'दिनांक सीमा',
      status: 'स्थिति',
      priority: 'प्राथमिकता',
      department: 'विभाग',
      totalAlerts: 'कुल अलर्ट',
      activeAlerts: 'सक्रिय अलर्ट',
      resolvedAlerts: 'हल किए गए अलर्ट',
      pendingNotifications: 'लंबित अधिसूचनाएं',
      sentNotifications: 'भेजी गई अधिसूचनाएं',
      newCirculars: 'नए परिपत्र',
      publishedCirculars: 'प्रकाशित परिपत्र',
      systemStatus: 'सिस्टम स्थिति',
      databaseConnection: 'डेटाबेस कनेक्शन',
      serverHealth: 'सर्वर स्वास्थ्य',
      apiResponse: 'एपीआई प्रतिक्रिया समय',
      securityAlerts: 'सुरक्षा अलर्ट',
      maintenanceAlerts: 'रखरखाव अलर्ट',
      performanceAlerts: 'प्रदर्शन अलर्ट',
      recentActivity: 'हाल की गतिविधि',
      viewAll: 'सभी देखें',
      today: 'आज',
      yesterday: 'कल',
      thisWeek: 'इस सप्ताह',
      lastWeek: 'पिछला सप्ताह',
      thisMonth: 'इस महीने'
    }
  };

  const t = translations[language];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        // Fetch all notifications and filter by type
        const response = await NotificationsAPI.getAllNotifications();
        const allNotifications = response.data || [];
        
        // Filter system alerts (high priority, system-related)
        const alerts = allNotifications.filter((n: any) => 
          n.priority === 'high' || n.priority === 'critical' || 
          n.type === 'warning' || n.type === 'error'
        ).map(transformNotification);
        setSystemAlerts(alerts);
        
        // Filter user notifications
        const userNotifs = allNotifications.filter((n: any) => 
          n.user_id && (n.type === 'info' || n.type === 'reminder')
        ).map(transformNotification);
        setUserNotifications(userNotifs);
        
        // Filter government circulars (broadcast notifications)
        const circulars = allNotifications.filter((n: any) => 
          !n.user_id && n.type === 'info' && n.department
        ).map(transformNotification);
        setGovernmentCirculars(circulars);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
        // Fallback to empty arrays
        setSystemAlerts([]);
        setUserNotifications([]);
        setGovernmentCirculars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'investigating': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'published': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await NotificationsAPI.markNotificationAsRead(notificationId);
      // Update local state to mark as read
      setUserNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  // Transform backend data to match frontend structure
  const transformNotification = (notification: any) => ({
    id: notification.id,
    title: notification.title,
    message: notification.message,
    priority: notification.priority,
    timestamp: notification.created_at ? new Date(notification.created_at).toLocaleString() : 'Unknown',
    status: notification.status,
    department: notification.department,
    read: notification.status === 'read',
    type: notification.type
  });

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-background dark:bg-slate-900 border-border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="space-y-1">
              <motion.h1 
                className="text-3xl font-bold text-foreground"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {t.title}
              </motion.h1>
              <p className="text-muted-foreground">{t.subtitle}</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => onNavigate?.('welcome')}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200 dark:from-blue-900/20 dark:to-indigo-900/20 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 dark:border-blue-700"
              >
                <Home className="w-4 h-4 mr-2" />
                {t.backToWelcome}
              </Button>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                {t.createAlert}
              </Button>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                {t.sendNotification}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="border-b bg-background dark:bg-slate-900 border-border">
              <div className="px-6 py-4">
                <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
                  <TabsTrigger value="system" className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.systemAlerts}</span>
                  </TabsTrigger>
                  <TabsTrigger value="users" className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.userNotifications}</span>
                  </TabsTrigger>
                  <TabsTrigger value="circulars" className="flex items-center space-x-2">
                    <Bell className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.governmentCirculars}</span>
                  </TabsTrigger>
                </TabsList>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mt-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t.searchNotifications}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.allPriorities}</SelectItem>
                        <SelectItem value="high">{t.high}</SelectItem>
                        <SelectItem value="medium">{t.medium}</SelectItem>
                        <SelectItem value="low">{t.low}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      {t.filterBy}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center p-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading notifications...</p>
                </div>
              </div>
            )}

            {/* Content when not loading */}
            {!loading && (
              <>
                {/* Tabs Content */}
              <TabsContent value="system" className="h-full overflow-hidden mt-0">
                <div className="h-full flex flex-col">
                  {/* Stats Cards */}
                  <div className="p-6 border-b bg-muted dark:bg-slate-800/50 border-border">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="dark:bg-slate-800 dark:border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.totalAlerts}</p>
                              <p className="text-2xl font-bold text-foreground">24</p>
                            </div>
                            <AlertTriangle className="w-8 h-8 text-blue-600" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="dark:bg-slate-800 dark:border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.activeAlerts}</p>
                              <p className="text-2xl font-bold text-red-600">7</p>
                            </div>
                            <Shield className="w-8 h-8 text-red-600" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="dark:bg-slate-800 dark:border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.resolvedAlerts}</p>
                              <p className="text-2xl font-bold text-green-600">17</p>
                            </div>
                            <CheckCircle className="w-8 h-8 text-green-600" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="dark:bg-slate-800 dark:border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.systemStatus}</p>
                              <p className="text-sm font-medium text-green-600">Operational</p>
                            </div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Alerts List */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-6 space-y-4">
                      {systemAlerts.map((alert) => (
                        <motion.div
                          key={alert.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-card dark:bg-slate-800 rounded-lg border border-border p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <Badge className={getPriorityColor(alert.priority)}>
                                  {t[alert.priority as keyof typeof t] || alert.priority}
                                </Badge>
                                <Badge className={getStatusColor(alert.status)}>
                                  {alert.status}
                                </Badge>
                                <span className="text-sm text-muted-foreground">{alert.department}</span>
                              </div>
                              <h3 className="font-medium mb-1 text-foreground">{alert.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <span className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {alert.timestamp}
                                </span>
                                <span>{alert.department}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                {t.viewDetails}
                              </Button>
                              {alert.status === 'active' && (
                                <Button size="sm" variant="outline">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Resolve
                                </Button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* User Notifications Tab */}
              <TabsContent value="users" className="h-full overflow-hidden mt-0">
                <div className="h-full flex flex-col">
                  {/* Stats Cards */}
                  <div className="p-6 border-b bg-muted dark:bg-slate-800/50 border-border">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="dark:bg-slate-800 dark:border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.pendingNotifications}</p>
                              <p className="text-2xl font-bold text-orange-600">23</p>
                            </div>
                            <Bell className="w-8 h-8 text-orange-600" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="dark:bg-slate-800 dark:border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.sentNotifications}</p>
                              <p className="text-2xl font-bold text-blue-600">157</p>
                            </div>
                            <Send className="w-8 h-8 text-blue-600" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="dark:bg-slate-800 dark:border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.today}</p>
                              <p className="text-2xl font-bold text-foreground">12</p>
                            </div>
                            <Calendar className="w-8 h-8 text-green-600" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="dark:bg-slate-800 dark:border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.thisWeek}</p>
                              <p className="text-2xl font-bold text-foreground">89</p>
                            </div>
                            <MessageSquare className="w-8 h-8 text-purple-600" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-6 space-y-4">
                      {userNotifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`bg-card dark:bg-slate-800 rounded-lg border border-border p-4 hover:shadow-md transition-shadow ${
                            !notification.read ? 'border-l-4 border-l-blue-500' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {t[notification.priority as keyof typeof t] || notification.priority}
                                </Badge>
                                <span className="text-sm text-muted-foreground">{notification.department}</span>
                                {!notification.read && (
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                    New
                                  </Badge>
                                )}
                              </div>
                              <h3 className="font-medium mb-1 text-foreground">{notification.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <span className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {notification.timestamp}
                                </span>
                                <span>{notification.department}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => onNavigate?.(`admin-notification-detail?id=${notification.id}&type=user`)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                {t.viewDetails}
                              </Button>
                              {!notification.read && (
                                <Button size="sm" variant="outline">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  {t.markAsRead}
                                </Button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Government Circulars Tab */}
              <TabsContent value="circulars" className="h-full overflow-hidden mt-0">
                <div className="h-full flex flex-col">
                  {/* Stats Cards */}
                  <div className="p-6 border-b bg-muted dark:bg-slate-800/50 border-border">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="dark:bg-slate-800 dark:border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.newCirculars}</p>
                              <p className="text-2xl font-bold text-green-600">5</p>
                            </div>
                            <Bell className="w-8 h-8 text-green-600" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="dark:bg-slate-800 dark:border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.publishedCirculars}</p>
                              <p className="text-2xl font-bold text-blue-600">28</p>
                            </div>
                            <FileText className="w-8 h-8 text-blue-600" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="dark:bg-slate-800 dark:border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.thisMonth}</p>
                              <p className="text-2xl font-bold text-foreground">12</p>
                            </div>
                            <Calendar className="w-8 h-8 text-purple-600" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="dark:bg-slate-800 dark:border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Downloads</p>
                              <p className="text-2xl font-bold text-foreground">1.2K</p>
                            </div>
                            <Download className="w-8 h-8 text-orange-600" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Circulars List */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-6 space-y-4">
                      {governmentCirculars.map((circular) => (
                        <motion.div
                          key={circular.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-card dark:bg-slate-800 rounded-lg border border-border p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <Badge className={getPriorityColor(circular.priority)}>
                                  {t[circular.priority as keyof typeof t] || circular.priority}
                                </Badge>
                                <Badge className={getStatusColor(circular.status)}>
                                  {circular.status}
                                </Badge>
                                <span className="text-sm text-muted-foreground">{circular.department}</span>
                              </div>
                              <h3 className="font-medium mb-1 text-foreground">{circular.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{circular.message}</p>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <span className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                    {circular.timestamp}
                                </span>
                                <span>{circular.department}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => onNavigate?.(`admin-notification-detail?id=${circular.id}&type=circular`)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                {t.viewDetails}
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}