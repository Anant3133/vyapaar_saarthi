import { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart,
  Eye,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { SimpleBarChart, SimpleLineChart, SimplePieChart } from '../../SimpleCharts';

interface AdminComplianceReportsProps {
  language: 'en' | 'hi';
  user: any;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export function AdminComplianceReports({ language, user, onNavigate, onBack }: AdminComplianceReportsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const translations = {
    en: {
      title: 'Compliance Reports',
      subtitle: 'Generate and analyze compliance reports across departments',
      overview: 'Overview',
      detailed: 'Detailed Reports',
      analytics: 'Analytics',
      scheduled: 'Scheduled Reports',
      generateReport: 'Generate Report',
      export: 'Export',
      totalInspections: 'Total Inspections',
      passedInspections: 'Passed Inspections',
      averageScore: 'Average Score',
      complianceTrend: 'Compliance Trend Over Time',
      departmentPerformance: 'Department Performance',
      violationsByType: 'Violations by Type',
      lastMonth: 'Last Month',
      lastQuarter: 'Last Quarter',
      lastYear: 'Last Year'
    },
    hi: {
      title: 'अनुपालन रिपोर्ट्स',
      subtitle: 'विभागों में अनुपालन रिपोर्ट्स बनाएं और विश्लेषण करें',
      overview: 'अवलोकन',
      detailed: 'विस्तृत रिपोर्ट्स',
      analytics: 'एनालिटिक्स',
      scheduled: 'निर्धारित रिपोर्ट्स',
      generateReport: 'रिपोर्ट बनाएं',
      export: 'निर्यात',
      totalInspections: 'कुल निरीक्षण',
      passedInspections: 'सफल निरीक्षण',
      averageScore: 'औसत स्कोर',
      complianceTrend: 'समय के साथ अनुपालन प्रवृत्ति',
      departmentPerformance: 'विभागीय प्रदर्शन',
      violationsByType: 'प्रकार के अनुसार उल्लंघन',
      lastMonth: 'पिछला महीना',
      lastQuarter: 'पिछली तिमाही',
      lastYear: 'पिछला वर्ष'
    }
  };

  const t = translations[language];

  // Hardcoded data for guaranteed visibility
  const complianceTrendData = [
    { label: 'Jan', value: 85 },
    { label: 'Feb', value: 88 },
    { label: 'Mar', value: 87 },
    { label: 'Apr', value: 91 },
    { label: 'May', value: 93 },
    { label: 'Jun', value: 94 }
  ];

  const departmentPerformanceData = [
    { label: 'Trade', value: 87, color: '#3b82f6' },
    { label: 'Health', value: 92, color: '#10b981' },
    { label: 'Food', value: 86, color: '#f59e0b' },
    { label: 'Environment', value: 90, color: '#ef4444' },
    { label: 'Transport', value: 88, color: '#8b5cf6' }
  ];

  const violationsByTypeData = [
    { label: 'Safety', value: 35, color: '#ef4444' },
    { label: 'Documentation', value: 25, color: '#f59e0b' },
    { label: 'Health', value: 20, color: '#eab308' },
    { label: 'Environmental', value: 15, color: '#22c55e' },
    { label: 'Others', value: 5, color: '#6b7280' }
  ];

  const recentReports = [
    {
      id: 1,
      name: language === 'hi' ? 'मासिक अनुपालन रिपोर्ट' : 'Monthly Compliance Report',
      type: 'Monthly',
      generatedDate: '2024-01-31',
      status: 'Ready',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: language === 'hi' ? 'विभागीय प्रदर्शन विश्लेषण' : 'Department Performance Analysis',
      type: 'Quarterly',
      generatedDate: '2024-01-28',
      status: 'Ready',
      size: '3.1 MB'
    },
    {
      id: 3,
      name: language === 'hi' ? 'उल्लंघन सारांश रिपोर्ट' : 'Violations Summary Report',
      type: 'Custom',
      generatedDate: '2024-01-25',
      status: 'Generating',
      size: '-'
    }
  ];

  const scheduledReports = [
    {
      id: 1,
      name: language === 'hi' ? 'मासिक अनुपालन डैशबोर्ड' : 'Monthly Compliance Dashboard',
      frequency: 'Monthly',
      nextRun: '2024-02-01',
      recipients: 3,
      status: 'enabled'
    },
    {
      id: 2,
      name: language === 'hi' ? 'त्रैमासिक प्रदर्शन रिपोर्ट' : 'Quarterly Performance Report',
      frequency: 'Quarterly',
      nextRun: '2024-04-01',
      recipients: 5,
      status: 'enabled'
    }
  ];

  const statistics = {
    totalInspections: 1205,
    passedInspections: 819,
    averageScore: 89.2
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
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
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              {t.generateReport}
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.totalInspections}</p>
                  <p className="text-3xl font-bold text-foreground">{statistics.totalInspections}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.passedInspections}</p>
                  <p className="text-3xl font-bold text-green-600">{statistics.passedInspections}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.averageScore}</p>
                  <p className="text-3xl font-bold text-purple-600">{statistics.averageScore}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="detailed">{t.detailed}</TabsTrigger>
            <TabsTrigger value="analytics">{t.analytics}</TabsTrigger>
            <TabsTrigger value="scheduled">{t.scheduled}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>{t.complianceTrend}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleLineChart 
                  data={complianceTrendData}
                  height={350}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detailed">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report, index) => (
                    <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <h4 className="font-semibold text-foreground">{report.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>{report.generatedDate}</span>
                          <span>•</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={report.status === 'Ready' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                        {report.status === 'Ready' && (
                          <>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
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

          <TabsContent value="scheduled">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Scheduled Reports</span>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule New
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledReports.map((report, index) => (
                    <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <h4 className="font-semibold text-foreground">{report.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{report.frequency}</span>
                          <span>•</span>
                          <span>Next: {report.nextRun}</span>
                          <span>•</span>
                          <span>{report.recipients} recipients</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={report.status === 'enabled' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}