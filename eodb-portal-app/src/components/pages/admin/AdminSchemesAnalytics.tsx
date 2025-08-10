import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp,
  BarChart3,
  PieChart,
  Users,
  DollarSign,
  Target,
  Award,
  ArrowLeft,
  Download,
  Filter,
  Calendar,
  Home
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

interface AdminSchemesAnalyticsProps {
  language: 'en' | 'hi';
  user: any;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export function AdminSchemesAnalytics({ language, user, onNavigate, onBack }: AdminSchemesAnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const translations = {
    en: {
      title: 'Schemes & Subsidies Analytics',
      subtitle: 'Comprehensive analytics and performance insights for government schemes',
      overview: 'Overview',
      performance: 'Performance Metrics',
      trends: 'Trends & Forecasts',
      beneficiaries: 'Beneficiary Analysis',
      backToSchemes: 'Back to Schemes',
      backToWelcome: 'Back to Welcome',
      downloadReport: 'Download Report',
      filterBy: 'Filter by Period',
      last30days: 'Last 30 Days',
      last3months: 'Last 3 Months',
      last6months: 'Last 6 Months',
      thisYear: 'This Year',
      allCategories: 'All Categories',
      startupSchemes: 'Startup Schemes',
      msmeSchemes: 'MSME Schemes',
      womenEntrepreneurship: 'Women Entrepreneurship',
      skillDevelopment: 'Skill Development',
      
      // Metrics
      totalSchemes: 'Total Active Schemes',
      totalBeneficiaries: 'Total Beneficiaries',
      budgetAllocated: 'Budget Allocated',
      budgetUtilized: 'Budget Utilized',
      avgProcessingTime: 'Avg Processing Time',
      successRate: 'Success Rate',
      applicationVolume: 'Application Volume',
      approvalRate: 'Approval Rate',
      
      // Performance indicators
      schemePerformance: 'Scheme Performance',
      topPerformingSchemes: 'Top Performing Schemes',
      categoryWiseDistribution: 'Category-wise Distribution',
      monthlyTrends: 'Monthly Application Trends',
      budgetUtilization: 'Budget Utilization',
      beneficiaryGrowth: 'Beneficiary Growth',
      geographicDistribution: 'Geographic Distribution',
      
      // Time periods
      days: 'days',
      hours: 'hours',
      minutes: 'minutes',
      
      // Status
      excellent: 'Excellent',
      good: 'Good',
      average: 'Average',
      needsAttention: 'Needs Attention'
    },
    hi: {
      title: 'योजना और सब्सिडी एनालिटिक्स',
      subtitle: 'सरकारी योजनाओं के लिए व्यापक एनालिटिक्स और प्रदर्शन अंतर्दृष्टि',
      overview: 'अवलोकन',
      performance: 'प्रदर्शन मेट्रिक्स',
      trends: 'रुझान और पूर्वानुमान',
      beneficiaries: 'लाभार्थी विश्लेषण',
      backToSchemes: 'योजनाओं पर वापस',
      backToWelcome: 'स्वागत पृष्ठ पर वापस',
      downloadReport: 'रिपोर्ट डाउनलोड करें',
      filterBy: 'अवधि के अनुसार फिल्टर करें',
      last30days: 'पिछले 30 दिन',
      last3months: 'पिछले 3 महीने',
      last6months: 'पिछले 6 महीने',
      thisYear: 'इस वर्ष',
      allCategories: 'सभी श्रेणियां',
      startupSchemes: 'स्टार्टअप योजनाएं',
      msmeSchemes: 'एमएसएमई योजनाएं',
      womenEntrepreneurship: 'महिला उद्यमिता',
      skillDevelopment: 'कौशल विकास',
      
      // Metrics
      totalSchemes: 'कुल सक्रिय योजनाएं',
      totalBeneficiaries: 'कुल लाभार्थी',
      budgetAllocated: 'आवंटित बजट',
      budgetUtilized: 'उपयोगित बजट',
      avgProcessingTime: 'औसत प्रसंस्करण समय',
      successRate: 'सफलता दर',
      applicationVolume: 'आवेदन मात्रा',
      approvalRate: 'अनुमोदन दर',
      
      // Performance indicators
      schemePerformance: 'योजना प्रदर्शन',
      topPerformingSchemes: 'शीर्ष प्रदर्शन योजनाएं',
      categoryWiseDistribution: 'श्रेणी-वार वितरण',
      monthlyTrends: 'मासिक आवेदन रुझान',
      budgetUtilization: 'बजट उपयोग',
      beneficiaryGrowth: 'लाभार्थी वृद्धि',
      geographicDistribution: 'भौगोलिक वितरण',
      
      // Time periods
      days: 'दिन',
      hours: 'घंटे',
      minutes: 'मिनट',
      
      // Status
      excellent: 'उत्कृष्ट',
      good: 'अच्छा',
      average: 'औसत',
      needsAttention: 'ध्यान चाहिए'
    }
  };

  const t = translations[language];

  // Sample analytics data
  const overviewStats = [
    {
      label: t.totalSchemes,
      value: '28',
      change: '+3',
      changePercent: '+12%',
      trend: 'up',
      icon: Target,
      color: 'bg-blue-500'
    },
    {
      label: t.totalBeneficiaries,
      value: '12.4K',
      change: '+1.2K',
      changePercent: '+11%',
      trend: 'up',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      label: t.budgetUtilized,
      value: '₹142Cr',
      change: '+₹18Cr',
      changePercent: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      label: t.successRate,
      value: '87%',
      change: '+5%',
      changePercent: '+6%',
      trend: 'up',
      icon: Award,
      color: 'bg-orange-500'
    }
  ];

  const topSchemes = [
    {
      name: language === 'hi' ? 'स्टार्टअप इंडिया योजना' : 'Startup India Scheme',
      category: 'startup',
      beneficiaries: 2340,
      budget: '₹50Cr',
      utilization: 78,
      performance: 'excellent'
    },
    {
      name: language === 'hi' ? 'एमएसएमई डिजिटल पहल' : 'MSME Digital Initiative',
      category: 'msme',
      beneficiaries: 3200,
      budget: '₹75Cr',
      utilization: 85,
      performance: 'excellent'
    },
    {
      name: language === 'hi' ? 'महिला उद्यमी सशक्तिकरण योजना' : 'Women Entrepreneur Empowerment',
      category: 'women',
      beneficiaries: 1456,
      budget: '₹25Cr',
      utilization: 65,
      performance: 'good'
    },
    {
      name: language === 'hi' ? 'कौशल विकास कार्यक्रम' : 'Skill Development Program',
      category: 'skill',
      beneficiaries: 1890,
      budget: '₹40Cr',
      utilization: 72,
      performance: 'good'
    }
  ];

  const getPerformanceBadge = (performance: string) => {
    const config = {
      excellent: { color: 'bg-green-100 text-green-800', label: t.excellent },
      good: { color: 'bg-blue-100 text-blue-800', label: t.good },
      average: { color: 'bg-yellow-100 text-yellow-800', label: t.average },
      needsAttention: { color: 'bg-red-100 text-red-800', label: t.needsAttention }
    };
    
    const item = config[performance as keyof typeof config] || config.average;
    return <Badge className={item.color}>{item.label}</Badge>;
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="space-y-1">
          <motion.h1 
            className="text-3xl font-bold flex items-center space-x-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span>{t.title}</span>
          </motion.h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => onNavigate('welcome')}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200"
          >
            <Home className="w-4 h-4 mr-2" />
            {t.backToWelcome}
          </Button>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToSchemes}
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            {t.downloadReport}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">{t.last30days}</SelectItem>
              <SelectItem value="3months">{t.last3months}</SelectItem>
              <SelectItem value="6months">{t.last6months}</SelectItem>
              <SelectItem value="year">{t.thisYear}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allCategories}</SelectItem>
              <SelectItem value="startup">{t.startupSchemes}</SelectItem>
              <SelectItem value="msme">{t.msmeSchemes}</SelectItem>
              <SelectItem value="women">{t.womenEntrepreneurship}</SelectItem>
              <SelectItem value="skill">{t.skillDevelopment}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {overviewStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-green-600">{stat.change}</span>
                      <span className="text-muted-foreground ml-1">({stat.changePercent})</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      {/* Main Analytics Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="performance">{t.performance}</TabsTrigger>
            <TabsTrigger value="trends">{t.trends}</TabsTrigger>
            <TabsTrigger value="beneficiaries">{t.beneficiaries}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Top Performing Schemes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span>{t.topPerformingSchemes}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topSchemes.map((scheme, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{scheme.name}</h4>
                          {getPerformanceBadge(scheme.performance)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">{t.totalBeneficiaries}</p>
                          <p className="font-medium">{scheme.beneficiaries.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t.budgetAllocated}</p>
                          <p className="font-medium">{scheme.budget}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t.budgetUtilization}</span>
                          <span className="font-medium">{scheme.utilization}%</span>
                        </div>
                        <Progress value={scheme.utilization} className="h-2" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5" />
                    <span>{t.categoryWiseDistribution}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Startup Schemes</span>
                      </div>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">MSME Schemes</span>
                      </div>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-sm">Women Entrepreneurship</span>
                      </div>
                      <span className="text-sm font-medium">22%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-sm">Skill Development</span>
                      </div>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.avgProcessingTime}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">4.2 {t.days}</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {language === 'hi' ? '0.3 दिन तेज़' : '0.3 days faster'} vs {language === 'hi' ? 'पिछला महीना' : 'last month'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{t.approvalRate}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">89%</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    +3% vs {language === 'hi' ? 'पिछला महीना' : 'last month'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{t.applicationVolume}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">2,847</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    +12% vs {language === 'hi' ? 'पिछला महीना' : 'last month'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.monthlyTrends}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {language === 'hi' ? 'मासिक आवेदन और अनुमोदन रुझान चार्ट यहाँ दिखेगा' : 'Monthly application and approval trends chart would be displayed here'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="beneficiaries" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.beneficiaryGrowth}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {language === 'hi' ? 'लाभार्थी वृद्धि चार्ट यहाँ दिखेगा' : 'Beneficiary growth chart would be displayed here'}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{t.geographicDistribution}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {language === 'hi' ? 'भौगोलिक वितरण मानचित्र यहाँ दिखेगा' : 'Geographic distribution map would be displayed here'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}