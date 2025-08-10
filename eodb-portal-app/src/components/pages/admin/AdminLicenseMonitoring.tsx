import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Monitor,
  Calendar,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Progress } from '../../ui/progress';
import { SimpleBarChart, SimpleLineChart, SimplePieChart } from '../../SimpleCharts';

interface AdminLicenseMonitoringProps {
  language: 'en' | 'hi';
  user: any;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export function AdminLicenseMonitoring({ language, user, onNavigate, onBack }: AdminLicenseMonitoringProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const translations = {
    en: {
      title: 'License Monitoring Dashboard',
      subtitle: 'Monitor license activities, compliance, and performance metrics',
      overview: 'Overview',
      analytics: 'Analytics',
      compliance: 'Compliance',
      alerts: 'Alerts',
      lastMonth: 'Last Month',
      lastQuarter: 'Last Quarter',
      lastYear: 'Last Year',
      export: 'Export',
      activeLicenses: 'Active Licenses',
      expiringSoon: 'Expiring Soon',
      violationsReported: 'Violations Reported',
      complianceRate: 'Compliance Rate',
      licenseIssuanceTrend: 'License Issuance Trend',
      departmentPerformance: 'Department Performance',
      licensesByCategory: 'Licenses by Category',
      violationsByType: 'Violations by Type',
      recentAlerts: 'Recent Alerts'
    },
    hi: {
      title: 'लाइसेंस निगरानी डैशबोर्ड',
      subtitle: 'लाइसेंस गतिविधियों, अनुपालन, और प्रदर्शन मेट्रिक्स की निगरानी करें',
      overview: 'अवलोकन',
      analytics: 'एनालिटिक्स',
      compliance: 'अनुपालन',
      alerts: 'अलर्ट',
      lastMonth: 'पिछला महीना',
      lastQuarter: 'पिछली तिमाही',
      lastYear: 'पिछला वर्ष',
      export: 'निर्यात',
      activeLicenses: 'सक्रिय लाइसेंस',
      expiringSoon: 'जल्द समाप्त होने वाले',
      violationsReported: 'रिपोर्ट किए गए उल्लंघन',
      complianceRate: 'अनुपालन दर',
      licenseIssuanceTrend: 'लाइसेंस जारी करने की प्रवृत्ति',
      departmentPerformance: 'विभागीय प्रदर्शन',
      licensesByCategory: 'श्रेणी के अनुसार लाइसेंस',
      violationsByType: 'प्रकार के अनुसार उल्लंघन',
      recentAlerts: 'हाल के अलर्ट'
    }
  };

  const t = translations[language];

  // Hardcoded data for guaranteed visibility
  const issuanceTrendData = [
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 52 },
    { label: 'Mar', value: 48 },
    { label: 'Apr', value: 61 },
    { label: 'May', value: 58 },
    { label: 'Jun', value: 67 }
  ];

  const departmentPerformanceData = [
    { label: 'Trade', value: 87, color: '#3b82f6' },
    { label: 'Health', value: 92, color: '#10b981' },
    { label: 'Food', value: 86, color: '#f59e0b' },
    { label: 'Environment', value: 90, color: '#ef4444' },
    { label: 'Transport', value: 88, color: '#8b5cf6' }
  ];

  const licensesByCategoryData = [
    { label: 'Trade', value: 45, color: '#3b82f6' },
    { label: 'Health', value: 25, color: '#10b981' },
    { label: 'Food', value: 20, color: '#f59e0b' },
    { label: 'Manufacturing', value: 10, color: '#8b5cf6' }
  ];

  const violationsByTypeData = [
    { label: 'Safety', value: 35, color: '#ef4444' },
    { label: 'Documentation', value: 25, color: '#f59e0b' },
    { label: 'Health', value: 20, color: '#eab308' },
    { label: 'Environmental', value: 15, color: '#22c55e' },
    { label: 'Others', value: 5, color: '#6b7280' }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'License Expired',
      description: 'TL-2023-0045 has expired without renewal',
      timestamp: '2 hours ago',
      business: 'राज एंटरप्राइजेज'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Inspection Overdue',
      description: 'FL-2023-0023 inspection is 15 days overdue',
      timestamp: '4 hours ago',
      business: 'फूड कॉर्नर'
    },
    {
      id: 3,
      type: 'info',
      title: 'Renewal Reminder',
      description: 'HL-2023-0067 expires in 30 days',
      timestamp: '6 hours ago',
      business: 'स्वास्थ्य केंद्र'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default: return <CheckCircle className="w-4 h-4 text-blue-600" />;
    }
  };

  const getAlertClass = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  const statistics = {
    activeLicenses: 1247,
    expiringSoon: 156,
    violationsReported: 43,
    complianceRate: 87.5
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground mt-1">{t.subtitle}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">{t.lastMonth}</SelectItem>
                <SelectItem value="quarter">{t.lastQuarter}</SelectItem>
                <SelectItem value="year">{t.lastYear}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {}}>
              <Download className="w-4 h-4 mr-2" />
              {t.export}
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.activeLicenses}</p>
                  <p className="text-3xl font-bold text-foreground">{statistics.activeLicenses.toLocaleString()}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.expiringSoon}</p>
                  <p className="text-3xl font-bold text-yellow-600">{statistics.expiringSoon}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.violationsReported}</p>
                  <p className="text-3xl font-bold text-red-600">{statistics.violationsReported}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.complianceRate}</p>
                  <p className="text-3xl font-bold text-blue-600">{statistics.complianceRate}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="analytics">{t.analytics}</TabsTrigger>
            <TabsTrigger value="compliance">{t.compliance}</TabsTrigger>
            <TabsTrigger value="alerts">{t.alerts}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* License Issuance Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span>{t.licenseIssuanceTrend}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleLineChart 
                    data={issuanceTrendData}
                    height={350}
                  />
                </CardContent>
              </Card>

              {/* Licenses by Category */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.licensesByCategory}</CardTitle>
                </CardHeader>
                <CardContent>
                  <SimplePieChart 
                    data={licensesByCategoryData}
                    height={350}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Department Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.departmentPerformance}</CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleBarChart 
                    data={departmentPerformanceData}
                    height={350}
                  />
                </CardContent>
              </Card>

              {/* Violations by Type */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.violationsByType}</CardTitle>
                </CardHeader>
                <CardContent>
                  <SimplePieChart 
                    data={violationsByTypeData}
                    height={350}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {statistics.complianceRate}%
                    </div>
                    <p className="text-sm text-muted-foreground">{t.complianceRate}</p>
                    <Progress value={statistics.complianceRate} className="mt-4" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      14.5
                    </div>
                    <p className="text-sm text-muted-foreground">Average Processing Days</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      ₹18.2Cr
                    </div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Critical Alerts</p>
                        <p className="text-3xl font-bold text-red-600">
                          {recentAlerts.filter(a => a.type === 'critical').length}
                        </p>
                      </div>
                      <XCircle className="w-8 h-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Warning Alerts</p>
                        <p className="text-3xl font-bold text-yellow-600">
                          {recentAlerts.filter(a => a.type === 'warning').length}
                        </p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Info Alerts</p>
                        <p className="text-3xl font-bold text-blue-600">
                          {recentAlerts.filter(a => a.type === 'info').length}
                        </p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{t.recentAlerts}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAlerts.map((alert, index) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`p-4 rounded-lg border ${getAlertClass(alert.type)}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            {getAlertIcon(alert.type)}
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground">{alert.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                                <span>{alert.business}</span>
                                <span>•</span>
                                <span>{alert.timestamp}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {alert.type === 'critical' && (
                              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                                Take Action
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}