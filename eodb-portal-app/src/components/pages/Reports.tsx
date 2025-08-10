import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Download,
  RefreshCw,
  FileText,
  PieChart,
  Clock,
  CheckCircle,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { SimpleBarChart, SimpleLineChart, SimplePieChart, SimpleAreaChart, SimpleProgressRing } from '../SimpleCharts';

interface ReportsProps {
  language: 'en' | 'hi';
}

export function Reports({ language = 'en' }: ReportsProps) {
  const [dateRange, setDateRange] = useState('last-6-months');

  const translations = {
    en: {
      title: 'Analytics & Reports',
      subtitle: 'Comprehensive insights into your business operations',
      overview: 'Overview',
      applications: 'Applications',
      performance: 'Performance',
      compliance: 'Compliance',
      financial: 'Financial',
      totalApplications: 'Total Applications',
      approvalRate: 'Approval Rate',
      avgProcessingTime: 'Avg Processing Time',
      revenueGenerated: 'Revenue Generated',
      applicationTrends: 'Application Trends',
      statusDistribution: 'Status Distribution',
      monthlyVolume: 'Monthly Application Volume',
      departmentPerformance: 'Department Performance',
      processingTimeAnalysis: 'Processing Time Analysis',
      complianceScoreTrend: 'Compliance Score Trend',
      revenueAnalysis: 'Revenue Analysis',
      recentReports: 'Recent Reports',
      export: 'Export',
      download: 'Download',
      ready: 'Ready',
      generating: 'Generating',
      approved: 'Approved',
      inReview: 'In Review',
      rejected: 'Rejected',
      draft: 'Draft',
      efficiency: 'efficiency',
      days: 'days',
      lastMonth: 'Last Month',
      last3Months: 'Last 3 Months',
      last6Months: 'Last 6 Months',
      lastYear: 'Last Year'
    },
    hi: {
      title: 'एनालिटिक्स और रिपोर्ट्स',
      subtitle: 'आपके व्यावसायिक संचालन में व्यापक अंतर्दृष्टि',
      overview: 'अवलोकन',
      applications: 'आवेदन',
      performance: 'प्रदर्शन',
      compliance: 'अनुपालन',
      financial: 'वित्तीय',
      totalApplications: 'कुल आवेदन',
      approvalRate: 'अनुमोदन दर',
      avgProcessingTime: 'औसत प्रसंस्करण समय',
      revenueGenerated: 'उत्पन्न राजस्व',
      applicationTrends: 'आवेदन रुझान',
      statusDistribution: 'स्थिति वितरण',
      monthlyVolume: 'मासिक आवेदन मात्रा',
      departmentPerformance: 'विभागीय प्रदर्शन',
      processingTimeAnalysis: 'प्रसंस्करण समय विश्लेषण',
      complianceScoreTrend: 'अनुपालन स्कोर प्रवृत्ति',
      revenueAnalysis: 'राजस्व विश्लेषण',
      recentReports: 'हाल की रिपोर्ट्स',
      export: 'निर्यात',
      download: 'डाउनलोड',
      ready: 'तैयार',
      generating: 'तैयार हो रहा है',
      approved: 'अनुमोदित',
      inReview: 'समीक्षाधीन',
      rejected: 'अस्वीकृत',
      draft: 'ड्राफ्ट',
      efficiency: 'दक्षता',
      days: 'दिन',
      lastMonth: 'पिछला महीना',
      last3Months: 'पिछले 3 महीने',
      last6Months: 'पिछले 6 महीने',
      lastYear: 'पिछला वर्ष'
    }
  };

  const t = translations[language];

  // Hardcoded data for charts
  const applicationTrendsData = [
    { label: 'Jan', value1: 145, value2: 128 },
    { label: 'Feb', value1: 162, value2: 144 },
    { label: 'Mar', value1: 138, value2: 121 },
    { label: 'Apr', value1: 181, value2: 163 },
    { label: 'May', value1: 158, value2: 139 },
    { label: 'Jun', value1: 197, value2: 178 }
  ];

  const statusDistributionData = [
    { label: t.approved, value: 68, color: '#22c55e' },
    { label: t.inReview, value: 20, color: '#eab308' },
    { label: t.rejected, value: 8, color: '#ef4444' },
    { label: t.draft, value: 4, color: '#6b7280' }
  ];

  const monthlyVolumeData = [
    { label: 'Jan', value: 145, color: '#3b82f6' },
    { label: 'Feb', value: 162, color: '#10b981' },
    { label: 'Mar', value: 138, color: '#f59e0b' },
    { label: 'Apr', value: 181, color: '#ef4444' },
    { label: 'May', value: 158, color: '#8b5cf6' },
    { label: 'Jun', value: 197, color: '#06b6d4' }
  ];

  const processingTimeData = [
    { label: 'Trade License', value: 12, color: '#3b82f6' },
    { label: 'GST Reg', value: 5, color: '#10b981' },
    { label: 'Environment', value: 28, color: '#f59e0b' },
    { label: 'Fire Safety', value: 18, color: '#ef4444' },
    { label: 'Health', value: 14, color: '#8b5cf6' }
  ];

  const complianceScoreData = [
    { label: 'Jan', value: 85 },
    { label: 'Feb', value: 88 },
    { label: 'Mar', value: 87 },
    { label: 'Apr', value: 91 },
    { label: 'May', value: 93 },
    { label: 'Jun', value: 94 }
  ];

  const revenueData = [
    { label: 'Jan', value1: 245000, value2: 180000 },
    { label: 'Feb', value1: 287000, value2: 210000 },
    { label: 'Mar', value1: 268000, value2: 195000 },
    { label: 'Apr', value1: 315000, value2: 235000 },
    { label: 'May', value1: 298000, value2: 225000 },
    { label: 'Jun', value1: 342000, value2: 258000 }
  ];

  const keyMetrics = [
    {
      title: t.totalApplications,
      value: '2,847',
      change: '+18.5%',
      trend: 'up',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: t.approvalRate,
      value: '89.7%',
      change: '+3.2%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: t.avgProcessingTime,
      value: '12.8 ' + t.days,
      change: '-2.1 ' + t.days,
      trend: 'up',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: t.revenueGenerated,
      value: '₹2.84Cr',
      change: '+15.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const recentReports = [
    {
      id: 1,
      title: language === 'hi' ? 'मासिक आवेदन सारांश' : 'Monthly Application Summary',
      type: t.applications,
      date: '2024-01-31',
      size: '2.4 MB',
      status: t.ready
    },
    {
      id: 2,
      title: language === 'hi' ? 'विभागीय प्रदर्शन विश्लेषण' : 'Department Performance Analysis',
      type: t.performance,
      date: '2024-01-28',
      size: '1.8 MB',
      status: t.ready
    },
    {
      id: 3,
      title: language === 'hi' ? 'अनुपालन स्कोर रिपोर्ट' : 'Compliance Score Report',
      type: t.compliance,
      date: '2024-01-25',
      size: '3.1 MB',
      status: t.ready
    },
    {
      id: 4,
      title: language === 'hi' ? 'राजस्व विश्लेषण Q4' : 'Revenue Analysis Q4',
      type: t.financial,
      date: '2024-01-20',
      size: '2.9 MB',
      status: t.generating
    }
  ];

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
              <p className="text-muted-foreground mt-1">{t.subtitle}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-48">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-month">{t.lastMonth}</SelectItem>
                  <SelectItem value="last-3-months">{t.last3Months}</SelectItem>
                  <SelectItem value="last-6-months">{t.last6Months}</SelectItem>
                  <SelectItem value="last-year">{t.lastYear}</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {keyMetrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                        <metric.icon className={`w-6 h-6 ${metric.color}`} />
                      </div>
                      <Badge variant={metric.trend === 'up' ? 'default' : 'destructive'}>
                        {metric.change}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">{metric.title}</h3>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Reports Dashboard */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">{t.overview}</TabsTrigger>
              <TabsTrigger value="applications">{t.applications}</TabsTrigger>
              <TabsTrigger value="performance">{t.performance}</TabsTrigger>
              <TabsTrigger value="compliance">{t.compliance}</TabsTrigger>
              <TabsTrigger value="financial">{t.financial}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Application Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <span>{t.applicationTrends}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        {t.export}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SimpleAreaChart 
                      data={applicationTrendsData}
                      height={300}
                    />
                  </CardContent>
                </Card>

                {/* Status Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <PieChart className="w-5 h-5 text-purple-600" />
                      <span>{t.statusDistribution}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SimplePieChart 
                      data={statusDistributionData}
                      height={300}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="applications">
              <div className="grid lg:grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.monthlyVolume}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SimpleBarChart 
                      data={monthlyVolumeData}
                      height={400}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>{t.processingTimeAnalysis}</CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleBarChart 
                    data={processingTimeData}
                    height={400}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.complianceScoreTrend}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SimpleLineChart 
                      data={complianceScoreData}
                      height={300}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Overall Compliance Score</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <SimpleProgressRing 
                      value={89}
                      title="Current Score"
                      size={200}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="financial">
              <Card>
                <CardHeader>
                  <CardTitle>{t.revenueAnalysis}</CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleAreaChart 
                    data={revenueData}
                    height={400}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>{t.recentReports}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-accent/5"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{report.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>{report.date}</span>
                          <span>•</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={report.status === t.ready ? 'default' : 'secondary'}>
                        {report.status}
                      </Badge>
                      {report.status === t.ready && (
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          {t.download}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}