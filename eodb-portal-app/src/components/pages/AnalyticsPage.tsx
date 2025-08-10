import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  TrendingUp,
  Calendar,
  RefreshCw,
  Users,
  DollarSign,
  FileText,
  Target,
  Clock,
  Award,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { SimpleBarChart, SimpleLineChart, SimplePieChart, SimpleAreaChart, SimpleProgressRing } from '../SimpleCharts';

interface AnalyticsPageProps {
  language: 'en' | 'hi';
}

export function AnalyticsPage({ language }: AnalyticsPageProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  const translations = {
    en: {
      title: 'Business Analytics',
      subtitle: 'Comprehensive insights into your business performance',
      overview: 'Overview',
      trends: 'Trends & Forecasts',
      performance: 'Performance',
      beneficiary: 'Beneficiary Analysis',
      lastMonth: 'Last Month',
      last3Months: 'Last 3 Months',
      last6Months: 'Last 6 Months',
      lastYear: 'Last Year',
      totalApplications: 'Total Applications',
      approvalRate: 'Approval Rate',
      avgProcessingTime: 'Avg Processing Time',
      revenueGenerated: 'Revenue Generated',
      businessGrowth: 'Business Growth Trend',
      monthlyApplicationTrends: 'Monthly Application Trends',
      applicationsByDepartment: 'Applications by Department',
      processingTimeAnalysis: 'Processing Time Analysis',
      complianceScore: 'Compliance Score',
      beneficiaryByRegion: 'Beneficiaries by Region',
      beneficiaryByCategory: 'Beneficiaries by Business Category',
      growthForecast: 'Growth Forecast',
      predictiveAnalytics: 'Predictive Analytics'
    },
    hi: {
      title: 'बिजनेस एनालिटिक्स',
      subtitle: 'आपके व्यावसायिक प्रदर्शन में व्यापक अंतर्दृष्टि',
      overview: 'अवलोकन',
      trends: 'रुझान और पूर्वानुमान',
      performance: 'प्रदर्शन',
      beneficiary: 'लाभार्थी विश्लेषण',
      lastMonth: 'पिछला महीना',
      last3Months: 'पिछले 3 महीने',
      last6Months: 'पिछले 6 महीने',
      lastYear: 'पिछला वर्ष',
      totalApplications: 'कुल आवेदन',
      approvalRate: 'अनुमोदन दर',
      avgProcessingTime: 'औसत प्रसंस्करण समय',
      revenueGenerated: 'उत्पन्न राजस्व',
      businessGrowth: 'व्यावसायिक विकास रुझान',
      monthlyApplicationTrends: 'मासिक आवेदन रुझान',
      applicationsByDepartment: 'विभाग के अनुसार आवेदन',
      processingTimeAnalysis: 'प्रसंस्करण समय विश्लेषण',
      complianceScore: 'अनुपालन स्कोर',
      beneficiaryByRegion: 'क्षेत्र के अनुसार लाभार्थी',
      beneficiaryByCategory: 'व्यावसायिक श्रेणी के अनुसार लाभार्थी',
      growthForecast: 'विकास पूर्वानुमान',
      predictiveAnalytics: 'भविष्यसूचक एनालिटिक्स'
    }
  };

  const t = translations[language];

  // Hardcoded data for guaranteed visibility
  const monthlyApplicationTrends = [
    { label: 'Jan', value1: 145, value2: 128 },
    { label: 'Feb', value1: 162, value2: 144 },
    { label: 'Mar', value1: 138, value2: 121 },
    { label: 'Apr', value1: 181, value2: 163 },
    { label: 'May', value1: 158, value2: 139 },
    { label: 'Jun', value1: 197, value2: 178 },
    { label: 'Jul', value1: 174, value2: 156 },
    { label: 'Aug', value1: 189, value2: 170 }
  ];

  const businessGrowthData = [
    { label: 'Jan', value1: 245000, value2: 45000 },
    { label: 'Feb', value1: 287000, value2: 52000 },
    { label: 'Mar', value1: 268000, value2: 48000 },
    { label: 'Apr', value1: 315000, value2: 58000 },
    { label: 'May', value1: 298000, value2: 55000 },
    { label: 'Jun', value1: 342000, value2: 63000 }
  ];

  const departmentData = [
    { label: 'Trade License', value: 285, color: '#3b82f6' },
    { label: 'GST Registration', value: 324, color: '#10b981' },
    { label: 'Environmental', value: 156, color: '#f59e0b' },
    { label: 'Fire Safety', value: 198, color: '#ef4444' },
    { label: 'Health License', value: 142, color: '#8b5cf6' }
  ];

  const processingTimeData = [
    { label: 'Trade', value: 12, color: '#3b82f6' },
    { label: 'GST', value: 5, color: '#10b981' },
    { label: 'Environment', value: 28, color: '#f59e0b' },
    { label: 'Fire Safety', value: 18, color: '#ef4444' },
    { label: 'Health', value: 14, color: '#8b5cf6' }
  ];

  const beneficiaryRegionData = [
    { label: 'North Delhi', value: 245, color: '#3b82f6' },
    { label: 'South Delhi', value: 198, color: '#10b981' },
    { label: 'East Delhi', value: 167, color: '#f59e0b' },
    { label: 'West Delhi', value: 142, color: '#ef4444' },
    { label: 'Central Delhi', value: 124, color: '#8b5cf6' }
  ];

  const beneficiaryCategoryData = [
    { label: 'Small Business', value: 45, color: '#3b82f6' },
    { label: 'Startups', value: 28, color: '#10b981' },
    { label: 'Manufacturing', value: 18, color: '#f59e0b' },
    { label: 'Services', value: 9, color: '#ef4444' }
  ];

  const keyMetrics = [
    {
      title: t.totalApplications,
      value: '1,247',
      change: '+18.5%',
      trend: 'up',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: t.approvalRate,
      value: '89.2%',
      change: '+3.2%',
      trend: 'up',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: t.avgProcessingTime,
      value: '14.5 days',
      change: '-2.1 days',
      trend: 'up',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: t.revenueGenerated,
      value: '₹18.2L',
      change: '+15.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
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
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
              <p className="text-muted-foreground mt-1">{t.subtitle}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-48">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">{t.lastMonth}</SelectItem>
                  <SelectItem value="3months">{t.last3Months}</SelectItem>
                  <SelectItem value="6months">{t.last6Months}</SelectItem>
                  <SelectItem value="year">{t.lastYear}</SelectItem>
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

          {/* Main Analytics Dashboard */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">{t.overview}</TabsTrigger>
              <TabsTrigger value="trends">{t.trends}</TabsTrigger>
              <TabsTrigger value="performance">{t.performance}</TabsTrigger>
              <TabsTrigger value="beneficiary">{t.beneficiary}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Business Growth Trend */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span>{t.businessGrowth}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SimpleAreaChart 
                      data={businessGrowthData}
                      height={350}
                    />
                  </CardContent>
                </Card>

                {/* Applications by Department */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.applicationsByDepartment}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SimpleBarChart 
                      data={departmentData}
                      height={350}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              {/* Monthly Application Trends Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>{t.monthlyApplicationTrends}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleAreaChart 
                    data={monthlyApplicationTrends}
                    height={400}
                  />
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Growth Forecast */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.growthForecast}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Next Quarter Growth</span>
                        <span className="text-lg font-semibold text-green-600">+24.5%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Revenue Projection</span>
                        <span className="text-lg font-semibold text-blue-600">₹4.2L</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Market Share</span>
                        <span className="text-lg font-semibold text-purple-600">18.3%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Predictive Analytics */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.predictiveAnalytics}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-blue-50">
                        <h4 className="font-semibold text-blue-800">High Demand Period</h4>
                        <p className="text-sm text-blue-600 mt-1">
                          Expected 35% increase in applications next month
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-green-50">
                        <h4 className="font-semibold text-green-800">Processing Optimization</h4>
                        <p className="text-sm text-green-600 mt-1">
                          Digital workflow can reduce processing time by 40%
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-amber-50">
                        <h4 className="font-semibold text-amber-800">Resource Planning</h4>
                        <p className="text-sm text-amber-600 mt-1">
                          Recommend increasing staff by 2 members for Q2
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Processing Time Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.processingTimeAnalysis}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SimpleBarChart 
                      data={processingTimeData}
                      height={350}
                    />
                  </CardContent>
                </Card>

                {/* Compliance Score */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.complianceScore}</CardTitle>
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

            <TabsContent value="beneficiary" className="space-y-6">
              {/* Monthly Application Trends for Beneficiaries */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span>{t.monthlyApplicationTrends} - Beneficiary Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleAreaChart 
                    data={monthlyApplicationTrends.map(item => ({
                      label: item.label,
                      value1: item.value2 // Using approved applications as beneficiaries
                    }))}
                    height={400}
                  />
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Beneficiaries by Region */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.beneficiaryByRegion}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SimpleBarChart 
                      data={beneficiaryRegionData}
                      height={350}
                    />
                  </CardContent>
                </Card>

                {/* Beneficiaries by Category */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.beneficiaryByCategory}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SimplePieChart 
                      data={beneficiaryCategoryData}
                      height={350}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}