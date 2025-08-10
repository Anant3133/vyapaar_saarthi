import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield,
  FileText,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Database,
  Server,
  Globe,
  Crown,
  Bell,
  Download,
  Eye,
  RefreshCw,
  Home
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface AdminDashboardProps {
  user: any;
  onNavigate: (page: string) => void;
  language: 'en' | 'hi';
}

export function AdminDashboard({ user, onNavigate, language }: AdminDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 1247,
    processingApplications: 89,
    systemLoad: 23.5,
    networkStatus: 'healthy'
  });

  const translations = {
    en: {
      welcome: 'Welcome to Admin Portal',
      systemOverview: 'System Overview',
      quickActions: 'Quick Actions',
      recentActivity: 'Recent Activity',
      systemHealth: 'System Health',
      activeLicenses: 'Total Active Licenses',
      pendingApplications: 'Pending Applications',
      complianceStatus: 'Compliance Status',
      processingTime: 'Avg Processing Time',
      days: 'days',
      hours: 'hours',
      minutes: 'mins',
      userActivity: 'User Activity',
      departmentPerformance: 'Department Performance',
      systemAlerts: 'System Alerts',
      viewAll: 'View All',
      refresh: 'Refresh',
      export: 'Export',
      realTimeStats: 'Real-Time Statistics',
      activeUsers: 'Active Users',
      processing: 'Processing',
      systemLoad: 'System Load',
      networkStatus: 'Network Status',
      healthy: 'Healthy',
      warning: 'Warning',
      critical: 'Critical',
      last7days: 'Last 7 Days',
      last30days: 'Last 30 Days',
      thisMonth: 'This Month',
      departments: {
        health: 'Health & Safety',
        municipal: 'Municipal Corp',
        environment: 'Environment',
        trade: 'Trade License'
      },
      performanceMetrics: 'Performance Metrics',
      applicationTrends: 'Application Trends',
      complianceOverview: 'Compliance Overview',
      backToWelcome: 'Back to Welcome'
    },
    hi: {
      welcome: 'एडमिन पोर्टल में आपका स्वागत है',
      systemOverview: 'सिस्टम अवलोकन',
      quickActions: 'त्वरित कार्य',
      recentActivity: 'हाल की गतिविधि',
      systemHealth: 'सिस्टम स्वास्थ्य',
      activeLicenses: 'कुल सक्रिय लाइसेंस',
      pendingApplications: 'लंबित आवेदन',
      complianceStatus: 'अनुपालन स्थिति',
      processingTime: 'औसत प्रसंस्करण समय',
      days: 'दिन',
      hours: 'घंटे',
      minutes: 'मिनट',
      userActivity: 'उपयोगकर्ता गतिविधि',
      departmentPerformance: 'विभाग प्रदर्शन',
      systemAlerts: 'सिस्टम अलर्ट',
      viewAll: 'सभी देखें',
      refresh: 'रीफ्रेश',
      export: 'निर्यात',
      realTimeStats: 'रियल-टाइम आंकड़े',
      activeUsers: 'सक्रिय उपयोगकर्ता',
      processing: 'प्रसंस्करण',
      systemLoad: 'सिस्टम लोड',
      networkStatus: 'नेटवर्क स्थिति',
      healthy: 'स्वस्थ',
      warning: 'चेतावनी',
      critical: 'गंभीर',
      last7days: 'पिछले 7 दिन',
      last30days: 'पिछले 30 दिन',
      thisMonth: 'इस महीने',
      departments: {
        health: 'स्वास्थ्य और सुरक्षा',
        municipal: 'नगर निगम',
        environment: 'पर्यावरण',
        trade: 'व्यापार लाइसेंस'
      },
      performanceMetrics: 'प्रदर्शन मेट्रिक्स',
      applicationTrends: 'आवेदन रुझान',
      complianceOverview: 'अनुपालन अवलोकन',
      backToWelcome: 'स्वागत पृष्ठ पर वापस'
    }
  };

  const t = translations[language];

  // Demo system statistics
  const systemStats = {
    totalLicenses: 15847,
    pendingApplications: 234,
    complianceRate: 94.2,
    avgProcessingTime: 4.8,
    activeUsers: realTimeData.activeUsers,
    systemUptime: 99.8
  };

  // Department performance data
  const departmentData = [
    {
      name: t.departments.health,
      applications: 89,
      approved: 76,
      pending: 13,
      efficiency: 85.4,
      avgTime: 5.2
    },
    {
      name: t.departments.municipal,
      applications: 156,
      approved: 142,
      pending: 14,
      efficiency: 91.0,
      avgTime: 3.8
    },
    {
      name: t.departments.environment,
      applications: 67,
      approved: 58,
      pending: 9,
      efficiency: 86.6,
      avgTime: 7.1
    },
    {
      name: t.departments.trade,
      applications: 203,
      approved: 189,
      pending: 14,
      efficiency: 93.1,
      avgTime: 4.2
    }
  ];

  // Recent system alerts
  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      title: language === 'hi' ? 'उच्च सिस्टम लोड' : 'High System Load',
      description: language === 'hi' ? 'सिस्टम CPU उपयोग 75% से अधिक' : 'System CPU usage above 75%',
      time: '2 mins ago',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      title: language === 'hi' ? 'डेटाबेस बैकअप पूर्ण' : 'Database Backup Complete',
      description: language === 'hi' ? 'दैनिक बैकअप सफलतापूर्वक पूर्ण' : 'Daily backup completed successfully',
      time: '15 mins ago',
      severity: 'low'
    },
    {
      id: 3,
      type: 'error',
      title: language === 'hi' ? 'API दर सीमा पहुंची' : 'API Rate Limit Reached',
      description: language === 'hi' ? 'कुछ API endpoints दर सीमा पहुंच गई' : 'Some API endpoints hit rate limit',
      time: '1 hour ago',
      severity: 'high'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      case 'info': return CheckCircle;
      default: return AlertTriangle;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-700';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-700';
      case 'low': return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-700';
      default: return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-700';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto bg-background">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="space-y-1">
          <motion.h1 
            className="text-3xl font-bold flex items-center space-x-3 text-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <span>{t.welcome}</span>
          </motion.h1>
          <p className="text-muted-foreground">
            {language === 'hi' ? 'सिस्टम प्रशासक' : 'System Administrator'} | {user?.name} | {language === 'hi' ? 'अंतिम लॉगिन' : 'Last Login'}: {new Date().toLocaleString()}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => onNavigate('welcome')}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200 dark:from-blue-900/20 dark:to-indigo-900/20 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 dark:border-blue-700"
          >
            <Home className="w-4 h-4 mr-2" />
            {t.backToWelcome}
          </Button>
          <Button variant="outline" onClick={() => setRealTimeData({...realTimeData, activeUsers: Math.floor(Math.random() * 1500) + 1000})}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {t.refresh}
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            {t.export}
          </Button>
        </div>
      </div>

      {/* Real-time Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none dark:from-purple-700 dark:to-blue-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">{realTimeData.activeUsers.toLocaleString()}</div>
                <div className="text-sm opacity-80">{t.activeUsers}</div>
              </div>
              <div className="text-center">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">{realTimeData.processingApplications}</div>
                <div className="text-sm opacity-80">{t.processing}</div>
              </div>
              <div className="text-center">
                <Server className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">{realTimeData.systemLoad}%</div>
                <div className="text-sm opacity-80">{t.systemLoad}</div>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">{t.healthy}</div>
                <div className="text-sm opacity-80">{t.networkStatus}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Statistics Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.activeLicenses}</p>
                <p className="text-3xl font-bold text-foreground">{systemStats.totalLicenses.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
              <span className="text-green-600 dark:text-green-400">+8.2%</span>
              <span className="text-muted-foreground ml-1">{t.last7days}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.pendingApplications}</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{systemStats.pendingApplications}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingDown className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
              <span className="text-green-600 dark:text-green-400">-12.5%</span>
              <span className="text-muted-foreground ml-1">{t.last7days}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.complianceStatus}</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{systemStats.complianceRate}%</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={systemStats.complianceRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.processingTime}</p>
                <p className="text-3xl font-bold text-foreground">{systemStats.avgProcessingTime} <span className="text-sm text-muted-foreground">{t.days}</span></p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingDown className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
              <span className="text-green-600 dark:text-green-400">-0.3 {t.days}</span>
              <span className="text-muted-foreground ml-1">{language === 'hi' ? 'बेहतर' : 'improved'}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted dark:bg-slate-800/50 p-1">
            <TabsTrigger value="overview" className="text-muted-foreground dark:text-slate-400 data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-foreground hover:text-foreground dark:hover:text-foreground hover:bg-background/60 dark:hover:bg-slate-700/60">
              {t.systemOverview}
            </TabsTrigger>
            <TabsTrigger value="departments" className="text-muted-foreground dark:text-slate-400 data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-foreground hover:text-foreground dark:hover:text-foreground hover:bg-background/60 dark:hover:bg-slate-700/60">
              {t.departmentPerformance}
            </TabsTrigger>
            <TabsTrigger value="alerts" className="text-muted-foreground dark:text-slate-400 data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-foreground hover:text-foreground dark:hover:text-foreground hover:bg-background/60 dark:hover:bg-slate-700/60">
              {t.systemAlerts}
            </TabsTrigger>
            <TabsTrigger value="activity" className="text-muted-foreground dark:text-slate-400 data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-foreground hover:text-foreground dark:hover:text-foreground hover:bg-background/60 dark:hover:bg-slate-700/60">
              {t.userActivity}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-foreground">
                    <Settings className="w-5 h-5" />
                    <span>{t.quickActions}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => onNavigate('admin-applications')}
                  >
                    <FileText className="w-4 h-4 mr-3" />
                    {language === 'hi' ? 'आवेदन प्रबंधन' : 'Manage Applications'}
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => onNavigate('admin-compliance')}
                  >
                    <Shield className="w-4 h-4 mr-3" />
                    {language === 'hi' ? 'अनुपालन निगरानी' : 'Monitor Compliance'}
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => onNavigate('admin-schemes')}
                  >
                    <Crown className="w-4 h-4 mr-3" />
                    {language === 'hi' ? 'योजना प्रबंधन' : 'Manage Schemes'}
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => onNavigate('admin-settings')}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    {language === 'hi' ? 'सिस्टम सेटिंग्स' : 'System Settings'}
                  </Button>
                </CardContent>
              </Card>

              {/* System Health */}
              <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-foreground">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-5 h-5" />
                      <span>{t.systemHealth}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      {systemStats.systemUptime}% {language === 'hi' ? 'अपटाइम' : 'Uptime'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground">{language === 'hi' ? 'डेटाबेस प्रदर्शन' : 'Database Performance'}</span>
                      <span className="text-foreground">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground">{language === 'hi' ? 'API प्रतिक्रिया समय' : 'API Response Time'}</span>
                      <span className="text-foreground">142ms</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground">{language === 'hi' ? 'स्टोरेज उपयोग' : 'Storage Usage'}</span>
                      <span className="text-foreground">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground">{language === 'hi' ? 'नेटवर्क थ्रूपुट' : 'Network Throughput'}</span>
                      <span className="text-foreground">91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-foreground">{t.departmentPerformance}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="dark:border-slate-700">
                        <TableHead className="text-foreground">{language === 'hi' ? 'विभाग' : 'Department'}</TableHead>
                        <TableHead className="text-foreground">{language === 'hi' ? 'आवेदन' : 'Applications'}</TableHead>
                        <TableHead className="text-foreground">{language === 'hi' ? 'अनुमोदित' : 'Approved'}</TableHead>
                        <TableHead className="text-foreground">{language === 'hi' ? 'लंबित' : 'Pending'}</TableHead>
                        <TableHead className="text-foreground">{language === 'hi' ? 'दक्षता' : 'Efficiency'}</TableHead>
                        <TableHead className="text-foreground">{language === 'hi' ? 'औसत समय' : 'Avg Time'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {departmentData.map((dept, index) => (
                        <TableRow key={index} className="dark:border-slate-700">
                          <TableCell className="font-medium text-foreground">{dept.name}</TableCell>
                          <TableCell className="text-foreground">{dept.applications}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">{dept.approved}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">{dept.pending}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress value={dept.efficiency} className="h-2 w-16" />
                              <span className="text-sm text-foreground">{dept.efficiency}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-foreground">{dept.avgTime} {t.days}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-foreground">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>{t.systemAlerts}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    {t.viewAll}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemAlerts.map((alert) => {
                  const AlertIcon = getAlertIcon(alert.type);
                  return (
                    <motion.div
                      key={alert.id}
                      className={`p-4 rounded-lg border ${getAlertColor(alert.severity)}`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start space-x-3">
                        <AlertIcon className="w-5 h-5 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{alert.title}</h4>
                          <p className="text-sm opacity-80 mb-2">{alert.description}</p>
                          <p className="text-xs opacity-60">{alert.time}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-foreground">{t.userActivity}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {language === 'hi' ? 'उपयोगकर्ता गतिविधि ट्रैकिंग यहाँ दिखाई जाएगी' : 'User activity tracking will be displayed here'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}