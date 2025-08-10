import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Target, 
  Plus, 
  Upload, 
  Download, 
  Search,
  Filter,
  Eye,
  Edit,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Star,
  Award,
  Building2,
  MapPin,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Progress } from '../../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

interface AdminSchemesPageProps {
  language: 'en' | 'hi';
  user: any;
  onNavigate?: (page: string) => void;
}

export function AdminSchemesPage({ language, user, onNavigate }: AdminSchemesPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const translations = {
    en: {
      title: 'Schemes & Subsidies Management',
      subtitle: 'Comprehensive management of government schemes, subsidies, and incentive programs',
      addScheme: 'Add New Scheme',
      uploadScheme: 'Upload Scheme',
      downloadReport: 'Download Report',
      searchSchemes: 'Search schemes...',
      filter: 'Filter',
      activeSchemes: 'Active Schemes',
      expiredSchemes: 'Expired Schemes',
      draftSchemes: 'Draft Schemes',
      overview: 'Overview',
      manage: 'Manage Schemes',
      analytics: 'Analytics',
      applications: 'Applications',
      totalSchemes: 'Total Schemes',
      activeBeneficiaries: 'Active Beneficiaries',
      totalBudget: 'Total Budget',
      utilizationRate: 'Utilization Rate',
      newApplications: 'New Applications',
      approved: 'Approved',
      pending: 'Pending Review',
      rejected: 'Rejected',
      viewDetails: 'View Details',
      editScheme: 'Edit Scheme',
      publishScheme: 'Publish Scheme',
      archiveScheme: 'Archive Scheme',
      schemeName: 'Scheme Name',
      category: 'Category',
      budget: 'Budget Allocated',
      startDate: 'Start Date',
      endDate: 'End Date',
      status: 'Status',
      beneficiaries: 'Beneficiaries',
      description: 'Description',
      eligibility: 'Eligibility Criteria',
      documents: 'Required Documents',
      allCategories: 'All Categories',
      allStatuses: 'All Statuses',
      startupSchemes: 'Startup Schemes',
      msmeSchemes: 'MSME Schemes',
      womenEntrepreneurship: 'Women Entrepreneurship',
      skillDevelopment: 'Skill Development',
      exportPromotion: 'Export Promotion',
      technologyUpgradation: 'Technology Upgradation',
      featured: 'Featured',
      popular: 'Popular',
      trending: 'Trending',
      recentActivity: 'Recent Activity',
      topPerformingSchemes: 'Top Performing Schemes',
      applicationTrends: 'Application Trends',
      budgetUtilization: 'Budget Utilization',
      performanceOverview: 'Performance Overview',
      monthlyApplications: 'Monthly Applications',
      schemeWiseAnalysis: 'Scheme-wise Analysis',
      departmentWiseData: 'Department-wise Data',
      viewAnalytics: 'View Full Analytics',
      applicationOverview: 'Application Overview',
      recentApplications: 'Recent Applications',
      applicationsByStatus: 'Applications by Status',
      pendingReview: 'Pending Review',
      underVerification: 'Under Verification',
      viewApplications: 'View All Applications',
      thisMonth: 'This Month',
      lastMonth: 'Last Month',
      growth: 'Growth',
      decline: 'Decline'
    },
    hi: {
      title: 'योजना और सब्सिडी प्रबंधन',
      subtitle: 'सरकारी योजनाओं, सब्सिडी और प्रोत्साहन कार्यक्रमों का व्यापक प्रबंधन',
      addScheme: 'नई योजना जोड़ें',
      uploadScheme: 'योजना अपलोड करें',
      downloadReport: 'रिपोर्ट डाउनलोड करें',
      searchSchemes: 'योजनाएं खोजें...',
      filter: 'फ़िल्टर',
      activeSchemes: 'सक्रिय योजनाएं',
      expiredSchemes: 'समाप्त योजनाएं',
      draftSchemes: 'मसौदा योजनाएं',
      overview: 'अवलोकन',
      manage: 'योजना प्रबंधन',
      analytics: 'एनालिटिक्स',
      applications: 'आवेदन',
      totalSchemes: 'कुल योजनाएं',
      activeBeneficiaries: 'सक्रिय लाभार्थी',
      totalBudget: 'कुल बजट',
      utilizationRate: 'उपयोग दर',
      newApplications: 'नए आवेदन',
      approved: 'अनुमोदित',
      pending: 'समीक्षा लंबित',
      rejected: 'अस्वीकृत',
      viewDetails: 'विवरण देखें',
      editScheme: 'योजना संपादित करें',
      publishScheme: 'योजना प्रकाशित करें',
      archiveScheme: 'योजना संग्रहीत करें',
      schemeName: 'योजना का नाम',
      category: 'श्रेणी',
      budget: 'आवंटित बजट',
      startDate: 'प्रारंभ दिनांक',
      endDate: 'समाप्ति दिनांक',
      status: 'स्थिति',
      beneficiaries: 'लाभार्थी',
      description: 'विवरण',
      eligibility: 'पात्रता मापदंड',
      documents: 'आवश्यक दस्तावेज़',
      allCategories: 'सभी श्रेणियां',
      allStatuses: 'सभी स्थितियां',
      startupSchemes: 'स्टार्टअप योजनाएं',
      msmeSchemes: 'एमएसएमई योजनाएं',
      womenEntrepreneurship: 'महिला उद्यमिता',
      skillDevelopment: 'कौशल विकास',
      exportPromotion: 'निर्यात संवर्धन',
      technologyUpgradation: 'प्रौद्योगिकी उन्नयन',
      featured: 'चुनिंदा',
      popular: 'लोकप्रिय',
      trending: 'ट्रेंडिंग',
      recentActivity: 'हाल की गतिविधि',
      topPerformingSchemes: 'शीर्ष प्रदर्शन योजनाएं',
      applicationTrends: 'आवेदन रुझान',
      budgetUtilization: 'बजट उपयोग',
      performanceOverview: 'प्रदर्शन अवलोकन',
      monthlyApplications: 'मासिक आवेदन',
      schemeWiseAnalysis: 'योजना-वार विश्लेषण',
      departmentWiseData: 'विभाग-वार डेटा',
      viewAnalytics: 'पूर्ण एनालिटिक्स देखें',
      applicationOverview: 'आवेदन अवलोकन',
      recentApplications: 'हाल के आवेदन',
      applicationsByStatus: 'स्थिति के अनुसार आवेदन',
      pendingReview: 'समीक्षा लंबित',
      underVerification: 'सत्यापन अधीन',
      viewApplications: 'सभी आवेदन देखें',
      thisMonth: 'इस महीने',
      lastMonth: 'पिछले महीने',
      growth: 'वृद्धि',
      decline: 'गिरावट'
    }
  };

  const t = translations[language];

  const schemesData = [
    {
      id: 'SCH-001',
      name: language === 'hi' ? 'स्टार्टअप इंडिया योजना' : 'Startup India Scheme',
      category: 'startup',
      budget: '₹50 Crores',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      beneficiaries: 1250,
      applications: 2340,
      utilizationRate: 78,
      description: language === 'hi' ? 'नवाचार और उद्यमिता को बढ़ावा देने के लिए' : 'To promote innovation and entrepreneurship',
      featured: true
    },
    {
      id: 'SCH-002',
      name: language === 'hi' ? 'महिला उद्यमी सशक्तिकरण योजना' : 'Women Entrepreneur Empowerment Scheme',
      category: 'women',
      budget: '₹25 Crores',
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      status: 'active',
      beneficiaries: 890,
      applications: 1456,
      utilizationRate: 65,
      description: language === 'hi' ? 'महिला उद्यमियों के लिए वित्तीय सहायता' : 'Financial assistance for women entrepreneurs',
      popular: true
    },
    {
      id: 'SCH-003',
      name: language === 'hi' ? 'एमएसएमई डिजिटल पहल' : 'MSME Digital Initiative',
      category: 'msme',
      budget: '₹75 Crores',
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      status: 'active',
      beneficiaries: 2150,
      applications: 3200,
      utilizationRate: 85,
      description: language === 'hi' ? 'छोटे व्यवसायों का डिजिटलीकरण' : 'Digitalization of small businesses',
      trending: true
    },
    {
      id: 'SCH-004',
      name: language === 'hi' ? 'निर्यात संवर्धन योजना' : 'Export Promotion Scheme',
      category: 'export',
      budget: '₹30 Crores',
      startDate: '2023-06-01',
      endDate: '2024-05-31',
      status: 'expired',
      beneficiaries: 456,
      applications: 678,
      utilizationRate: 92,
      description: language === 'hi' ? 'निर्यात को बढ़ावा देने के लिए प्रोत्साहन' : 'Incentives to promote exports'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400', icon: CheckCircle },
      expired: { color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400', icon: AlertTriangle },
      draft: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400', icon: Clock }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {t[status as keyof typeof t] || status}
      </Badge>
    );
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      startup: t.startupSchemes,
      women: t.womenEntrepreneurship,
      msme: t.msmeSchemes,
      export: t.exportPromotion,
      skill: t.skillDevelopment,
      tech: t.technologyUpgradation
    };
    return categoryMap[category] || category;
  };

  const filteredSchemes = schemesData.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || scheme.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-white dark:bg-slate-800">
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
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                {t.uploadScheme}
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                {t.addScheme}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-6 border-b bg-slate-50 dark:bg-slate-900/50">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.totalSchemes}</p>
                    <p className="text-2xl font-bold text-foreground">28</p>
                  </div>
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.activeBeneficiaries}</p>
                    <p className="text-2xl font-bold text-green-600">4.7K</p>
                  </div>
                  <Users className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.totalBudget}</p>
                    <p className="text-2xl font-bold text-purple-600">₹180Cr</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.utilizationRate}</p>
                    <p className="text-2xl font-bold text-orange-600">76%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.newApplications}</p>
                    <p className="text-2xl font-bold text-red-600">167</p>
                  </div>
                  <FileText className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <div className="border-b bg-white dark:bg-slate-800">
              <div className="px-6 py-4">
                <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
                  <TabsTrigger value="overview">{t.overview}</TabsTrigger>
                  <TabsTrigger value="manage">{t.manage}</TabsTrigger>
                  <TabsTrigger value="analytics">{t.analytics}</TabsTrigger>
                  <TabsTrigger value="applications">{t.applications}</TabsTrigger>
                </TabsList>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mt-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t.searchSchemes}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.allCategories}</SelectItem>
                        <SelectItem value="startup">{t.startupSchemes}</SelectItem>
                        <SelectItem value="women">{t.womenEntrepreneurship}</SelectItem>
                        <SelectItem value="msme">{t.msmeSchemes}</SelectItem>
                        <SelectItem value="export">{t.exportPromotion}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.allStatuses}</SelectItem>
                        <SelectItem value="active">{t.activeSchemes}</SelectItem>
                        <SelectItem value="expired">{t.expiredSchemes}</SelectItem>
                        <SelectItem value="draft">{t.draftSchemes}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="overview" className="h-full overflow-y-auto mt-0">
                <div className="p-6 space-y-6">
                  {/* Featured Schemes */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center text-foreground">
                      <Star className="w-5 h-5 mr-2 text-yellow-500" />
                      {t.featured} {t.activeSchemes}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {schemesData.filter(scheme => scheme.featured || scheme.popular || scheme.trending).slice(0, 4).map((scheme) => (
                        <motion.div
                          key={scheme.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white dark:bg-slate-800 rounded-lg border p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium text-foreground">{scheme.name}</h4>
                                {scheme.featured && <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">{t.featured}</Badge>}
                                {scheme.popular && <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">{t.popular}</Badge>}
                                {scheme.trending && <Badge className="bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400">{t.trending}</Badge>}
                              </div>
                              {getStatusBadge(scheme.status)}
                            </div>
                            <Award className="w-5 h-5 text-yellow-500" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.budget}</p>
                              <p className="font-medium text-foreground">{scheme.budget}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{t.beneficiaries}</p>
                              <p className="font-medium text-foreground">{scheme.beneficiaries.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{t.utilizationRate}</span>
                              <span className="font-medium text-foreground">{scheme.utilizationRate}%</span>
                            </div>
                            <Progress value={scheme.utilizationRate} className="h-2" />
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              {t.viewDetails}
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4 mr-1" />
                              {t.editScheme}
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="manage" className="h-full overflow-y-auto mt-0">
                <div className="p-6 space-y-4">
                  {filteredSchemes.map((scheme) => (
                    <motion.div
                      key={scheme.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-slate-800 rounded-lg border p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-medium text-foreground">{scheme.name}</h4>
                            {getStatusBadge(scheme.status)}
                            <Badge variant="outline">{getCategoryLabel(scheme.category)}</Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.budget}</p>
                              <p className="font-medium text-foreground">{scheme.budget}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{t.beneficiaries}</p>
                              <p className="font-medium text-foreground">{scheme.beneficiaries.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{t.applications}</p>
                              <p className="font-medium text-foreground">{scheme.applications.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{t.endDate}</p>
                              <p className="font-medium text-foreground">{new Date(scheme.endDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{t.utilizationRate}</span>
                              <span className="font-medium text-foreground">{scheme.utilizationRate}%</span>
                            </div>
                            <Progress value={scheme.utilizationRate} className="h-2" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            {t.viewDetails}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            {t.editScheme}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="h-full overflow-y-auto mt-0">
                <div className="p-6 space-y-6">
                  {/* Quick Analytics Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          {t.performanceOverview}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{t.thisMonth}</span>
                            <div className="flex items-center">
                              <span className="font-medium text-foreground">₹45Cr</span>
                              <ArrowUpRight className="w-4 h-4 ml-1 text-green-500" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{t.lastMonth}</span>
                            <span className="font-medium text-muted-foreground">₹38Cr</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            +18% {t.growth}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <Activity className="w-4 h-4 mr-2" />
                          {t.monthlyApplications}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{t.thisMonth}</span>
                            <div className="flex items-center">
                              <span className="font-medium text-foreground">2,847</span>
                              <ArrowUpRight className="w-4 h-4 ml-1 text-green-500" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{t.lastMonth}</span>
                            <span className="font-medium text-muted-foreground">2,156</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            +32% {t.growth}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <PieChart className="w-4 h-4 mr-2" />
                          {t.budgetUtilization}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Utilized</span>
                            <span className="font-medium text-foreground">76%</span>
                          </div>
                          <Progress value={76} className="h-2" />
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">₹137Cr / ₹180Cr</span>
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                              On Track
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Detailed Analytics Navigation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate?.('admin-schemes-analytics')}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <TrendingUp className="w-8 h-8 text-blue-600" />
                          <Button variant="ghost" size="sm">
                            <ArrowUpRight className="w-4 h-4" />
                          </Button>
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">{t.schemeWiseAnalysis}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {language === 'hi' ? 'प्रत्येक योजना का विस्तृत प्रदर्शन विश्लेषण और तुलना' : 'Detailed performance analysis and comparison of each scheme'}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-muted-foreground">High Performing: 12</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                            <span className="text-muted-foreground">Average: 8</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate?.('admin-schemes-analytics')}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Building2 className="w-8 h-8 text-purple-600" />
                          <Button variant="ghost" size="sm">
                            <ArrowUpRight className="w-4 h-4" />
                          </Button>
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">{t.departmentWiseData}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {language === 'hi' ? 'विभाग-वार योजना वितरण और प्रदर्शन मेट्रिक्स' : 'Department-wise scheme distribution and performance metrics'}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-muted-foreground">MSME: 45%</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                            <span className="text-muted-foreground">Startup: 32%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Full Analytics Button */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-semibold text-foreground mb-2">{t.viewAnalytics}</h3>
                        <p className="text-muted-foreground mb-4">
                          {language === 'hi' ? 'समग्र योजना एनालिटिक्स, रुझान और विस्तृत रिपोर्टिंग तक पहुंच प्राप्त करें' : 'Access comprehensive scheme analytics, trends and detailed reporting'}
                        </p>
                        <Button onClick={() => onNavigate?.('admin-schemes-analytics')} className="w-full sm:w-auto">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          {t.viewAnalytics}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="applications" className="h-full overflow-y-auto mt-0">
                <div className="p-6 space-y-6">
                  {/* Application Overview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{t.newApplications}</p>
                            <p className="text-2xl font-bold text-blue-600">167</p>
                          </div>
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{t.pendingReview}</p>
                            <p className="text-2xl font-bold text-yellow-600">89</p>
                          </div>
                          <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{t.approved}</p>
                            <p className="text-2xl font-bold text-green-600">234</p>
                          </div>
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{t.underVerification}</p>
                            <p className="text-2xl font-bold text-purple-600">45</p>
                          </div>
                          <Activity className="w-6 h-6 text-purple-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Applications */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        {t.recentApplications}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { id: 'APP-001', scheme: language === 'hi' ? 'स्टार्टअप इंडिया योजना' : 'Startup India Scheme', applicant: 'TechVenture Pvt Ltd', status: 'pending', date: '2024-01-15' },
                          { id: 'APP-002', scheme: language === 'hi' ? 'महिला उद्यमी सशक्तिकरण योजना' : 'Women Entrepreneur Empowerment', applicant: 'InnovatHer Solutions', status: 'approved', date: '2024-01-14' },
                          { id: 'APP-003', scheme: language === 'hi' ? 'एमएसएमई डिजिटल पहल' : 'MSME Digital Initiative', applicant: 'Digital Craft Industries', status: 'review', date: '2024-01-14' }
                        ].map((app) => (
                          <div key={app.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <span className="font-medium text-sm text-foreground">{app.id}</span>
                                <Badge variant="outline">{app.scheme}</Badge>
                                {app.status === 'approved' && <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">{t.approved}</Badge>}
                                {app.status === 'pending' && <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">{t.pending}</Badge>}
                                {app.status === 'review' && <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Review</Badge>}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{app.applicant}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">{new Date(app.date).toLocaleDateString()}</span>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                {t.viewDetails}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Applications by Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">{t.applicationsByStatus}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{t.approved}</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={65} className="h-2 w-20" />
                              <span className="text-sm font-medium text-foreground">65%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{t.pending}</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={25} className="h-2 w-20" />
                              <span className="text-sm font-medium text-foreground">25%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{t.rejected}</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={10} className="h-2 w-20" />
                              <span className="text-sm font-medium text-foreground">10%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate?.('admin-schemes-applications')}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <FileText className="w-8 h-8 text-indigo-600" />
                          <Button variant="ghost" size="sm">
                            <ArrowUpRight className="w-4 h-4" />
                          </Button>
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">{t.viewApplications}</h3>
                        <p className="text-sm text-muted-foreground">
                          {language === 'hi' ? 'सभी योजना आवेदनों का प्रबंधन, समीक्षा और अनुमोदन' : 'Manage, review and approve all scheme applications'}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Full Applications Management Button */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-semibold text-foreground mb-2">{t.applicationOverview}</h3>
                        <p className="text-muted-foreground mb-4">
                          {language === 'hi' ? 'सभी योजना आवेदनों का विस्तृत दृश्य और प्रबंधन उपकरण' : 'Comprehensive view and management tools for all scheme applications'}
                        </p>
                        <Button onClick={() => onNavigate?.('admin-schemes-applications')} className="w-full sm:w-auto">
                          <FileText className="w-4 h-4 mr-2" />
                          {t.viewApplications}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}