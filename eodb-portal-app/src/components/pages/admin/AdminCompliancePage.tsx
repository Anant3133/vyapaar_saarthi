import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Home,
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  Building2,
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  BarChart3,
  Target,
  Zap,
  Plus,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Progress } from '../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

interface AdminCompliancePageProps {
  language: 'en' | 'hi';
  user: any;
  onNavigate?: (page: string) => void;
}

export function AdminCompliancePage({ language, user, onNavigate }: AdminCompliancePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedCompliance, setSelectedCompliance] = useState('all');

  const translations = {
    en: {
      title: 'Compliance Monitoring Dashboard',
      subtitle: 'Real-time compliance tracking, audit management, and regulatory oversight',
      backToWelcome: 'Back to Welcome',
      search: 'Search compliance records...',
      filter: 'Filter',
      export: 'Export Report',
      compliant: 'Compliant',
      nonCompliant: 'Non-Compliant',
      pending: 'Pending Review',
      critical: 'Critical',
      warning: 'Warning',
      good: 'Good',
      allDepartments: 'All Departments',
      allCompliance: 'All Compliance Types',
      overview: 'Overview',
      audits: 'Audits & Reviews',
      violations: 'Violations',
      reports: 'Reports',
      complianceRate: 'Compliance Rate',
      activeIssues: 'Active Issues',
      overdueItems: 'Overdue Items',
      completedAudits: 'Completed Audits',
      riskAssessment: 'Risk Assessment',
      complianceScore: 'Compliance Score',
      trendAnalysis: 'Trend Analysis',
      departmentCompliance: 'Department Compliance',
      recentActivity: 'Recent Compliance Activity',
      viewDetails: 'View Details',
      markCompliant: 'Mark Compliant',
      scheduleAudit: 'Schedule Audit',
      generateReport: 'Generate Report',
      complianceType: 'Compliance Type',
      lastReview: 'Last Review',
      nextReview: 'Next Review',
      status: 'Status',
      priority: 'Priority',
      assignedOfficer: 'Assigned Officer',
      regulatoryFramework: 'Regulatory Framework',
      environmentalCompliance: 'Environmental Compliance',
      safetyCompliance: 'Safety Compliance',
      licenseCompliance: 'License Compliance',
      documentCompliance: 'Document Compliance',
      financialCompliance: 'Financial Compliance'
    },
    hi: {
      title: 'अनुपालन निगरानी डैशबोर्ड',
      subtitle: 'रीयल-टाइम अनुपालन ट्रैकिंग, ऑडिट प्रबंधन और नियामक निरीक्षण',
      backToWelcome: 'स्वागत पृष्ठ पर वापस',
      search: 'अनुपालन रिकॉर्ड खोजें...',
      filter: 'फ़िल्टर',
      export: 'रिपोर्ट निर्यात करें',
      compliant: 'अनुपालित',
      nonCompliant: 'गैर-अनुपालित',
      pending: 'समीक्षा लंबित',
      critical: 'गंभीर',
      warning: 'चेतावनी',
      good: 'अच्छा',
      allDepartments: 'सभी विभाग',
      allCompliance: 'सभी अनुपालन प्रकार',
      overview: 'अवलोकन',
      audits: 'ऑडिट और समीक्षा',
      violations: 'उल्लंघन',
      reports: 'रिपोर्ट',
      complianceRate: 'अनुपालन दर',
      activeIssues: 'सक्रिय मुद्दे',
      overdueItems: 'विलंबित आइटम',
      completedAudits: 'पूर्ण ऑडिट',
      riskAssessment: 'जोखिम मूल्यांकन',
      complianceScore: 'अनुपालन स्कोर',
      trendAnalysis: 'रुझान विश्लेषण',
      departmentCompliance: 'विभागीय अनुपालन',
      recentActivity: 'हाल की अनुपालन गतिविधि',
      viewDetails: 'विवरण देखें',
      markCompliant: 'अनुपालित चिह्नित करें',
      scheduleAudit: 'ऑडिट निर्धारित करें',
      generateReport: 'रिपोर्ट तैयार करें',
      complianceType: 'अनुपालन प्रकार',
      lastReview: 'अंतिम समीक्षा',
      nextReview: 'अगली समीक्षा',
      status: 'स्थिति',
      priority: 'प्राथमिकता',
      assignedOfficer: 'नियुक्त अधिकारी',
      regulatoryFramework: 'नियामक ढांचा',
      environmentalCompliance: 'पर्यावरणीय अनुपालन',
      safetyCompliance: 'सुरक्षा अनुपालन',
      licenseCompliance: 'लाइसेंस अनुपालन',
      documentCompliance: 'दस्तावेज़ अनुपालन',
      financialCompliance: 'वित्तीय अनुपालन'
    }
  };

  const t = translations[language];

  const complianceData = [
    {
      id: 'ENV-001',
      type: t.environmentalCompliance,
      entity: 'Delhi Chemicals Ltd',
      status: 'compliant',
      priority: 'high',
      lastReview: '2024-12-10',
      nextReview: '2024-12-25',
      officer: 'Dr. A.K. Sharma',
      department: 'DPCC'
    },
    {
      id: 'SAF-002',
      type: t.safetyCompliance,
      entity: 'City Mall Complex',
      status: 'pending',
      priority: 'critical',
      lastReview: '2024-11-15',
      nextReview: '2024-12-20',
      officer: 'Insp. R.K. Singh',
      department: 'Fire Services'
    },
    {
      id: 'LIC-003',
      type: t.licenseCompliance,
      entity: 'Modern Pharmacy',
      status: 'non-compliant',
      priority: 'high',
      lastReview: '2024-12-05',
      nextReview: '2024-12-18',
      officer: 'Dr. M. Patel',
      department: 'Health Services'
    },
    {
      id: 'DOC-004',
      type: t.documentCompliance,
      entity: 'Tech Startup Hub',
      status: 'compliant',
      priority: 'medium',
      lastReview: '2024-12-08',
      nextReview: '2024-12-22',
      officer: 'Mrs. S. Gupta',
      department: 'MCD'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      compliant: { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', icon: CheckCircle },
      'non-compliant': { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', icon: AlertTriangle },
      pending: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300', icon: Clock }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {t[status.replace('-', '') as keyof typeof t] || status}
      </Badge>
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 dark:text-red-400';
      case 'high': return 'text-orange-600 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

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
                <Download className="w-4 h-4 mr-2" />
                {t.export}
              </Button>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                {t.generateReport}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-6 border-b bg-muted dark:bg-slate-800/50 border-border">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.complianceRate}</p>
                    <p className="text-2xl font-bold text-green-600">94.2%</p>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.activeIssues}</p>
                    <p className="text-2xl font-bold text-red-600">12</p>
                  </div>
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.overdueItems}</p>
                    <p className="text-2xl font-bold text-orange-600">7</p>
                  </div>
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.completedAudits}</p>
                    <p className="text-2xl font-bold text-blue-600">89</p>
                  </div>
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.complianceScore}</p>
                    <p className="text-2xl font-bold text-purple-600">8.7/10</p>
                  </div>
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <div className="border-b bg-background dark:bg-slate-900 border-border">
              <div className="px-6 py-4">
                <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
                  <TabsTrigger value="overview">{t.overview}</TabsTrigger>
                  <TabsTrigger value="audits">{t.audits}</TabsTrigger>
                  <TabsTrigger value="violations">{t.violations}</TabsTrigger>
                  <TabsTrigger value="reports">{t.reports}</TabsTrigger>
                </TabsList>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mt-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t.search}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.allDepartments}</SelectItem>
                        <SelectItem value="mcd">MCD</SelectItem>
                        <SelectItem value="labour-dept">Labour</SelectItem>
                        <SelectItem value="fire-services">Fire Services</SelectItem>
                        <SelectItem value="dpcc">DPCC</SelectItem>
                        <SelectItem value="health-services">Health Services</SelectItem>
                        <SelectItem value="fssai">FSSAI</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedCompliance} onValueChange={setSelectedCompliance}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.allCompliance}</SelectItem>
                        <SelectItem value="environmental">{t.environmentalCompliance}</SelectItem>
                        <SelectItem value="safety">{t.safetyCompliance}</SelectItem>
                        <SelectItem value="license">{t.licenseCompliance}</SelectItem>
                        <SelectItem value="document">{t.documentCompliance}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="overview" className="h-full overflow-y-auto mt-0">
                <div className="p-6 space-y-6">
                  {/* Risk Assessment Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="border-l-4 border-l-red-500 dark:bg-slate-800 dark:border-slate-700">
                      <CardHeader>
                        <CardTitle className="flex items-center text-red-600">
                          <AlertTriangle className="w-5 h-5 mr-2" />
                          {t.critical}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-red-600 mb-2">3</div>
                        <p className="text-sm text-muted-foreground">
                          {language === 'hi' ? 'तत्काल ध्यान देने की आवश्यकता' : 'Require immediate attention'}
                        </p>
                        <Progress value={20} className="mt-2 h-2" />
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-yellow-500 dark:bg-slate-800 dark:border-slate-700">
                      <CardHeader>
                        <CardTitle className="flex items-center text-yellow-600">
                          <Clock className="w-5 h-5 mr-2" />
                          {t.warning}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-yellow-600 mb-2">9</div>
                        <p className="text-sm text-muted-foreground">
                          {language === 'hi' ? 'निगरानी की आवश्यकता' : 'Need monitoring'}
                        </p>
                        <Progress value={60} className="mt-2 h-2" />
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-500 dark:bg-slate-800 dark:border-slate-700">
                      <CardHeader>
                        <CardTitle className="flex items-center text-green-600">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          {t.good}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-green-600 mb-2">78</div>
                        <p className="text-sm text-muted-foreground">
                          {language === 'hi' ? 'अच्छी स्थिति में' : 'In good standing'}
                        </p>
                        <Progress value={90} className="mt-2 h-2" />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Compliance Records */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">{t.recentActivity}</h3>
                    {complianceData.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card dark:bg-slate-800 rounded-lg border border-border p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-medium text-foreground">{item.id}</h4>
                              {getStatusBadge(item.status)}
                              <Badge className={`text-xs ${getPriorityColor(item.priority)} bg-opacity-10 border border-current`}>
                                {item.priority}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                              <div>
                                <p className="text-sm text-muted-foreground">{t.complianceType}</p>
                                <p className="font-medium text-sm text-foreground">{item.type}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Entity</p>
                                <p className="font-medium text-sm text-foreground">{item.entity}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">{t.lastReview}</p>
                                <p className="font-medium text-sm text-foreground">{new Date(item.lastReview).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">{t.assignedOfficer}</p>
                                <p className="font-medium text-sm text-foreground">{item.officer}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              {t.viewDetails}
                            </Button>
                            {item.status === 'pending' && (
                              <Button size="sm" variant="outline">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                {t.markCompliant}
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="audits" className="h-full overflow-y-auto mt-0">
                <div className="p-6 space-y-6">
                  {/* Audit Overview */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <Card className="dark:bg-slate-800 dark:border-slate-700">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'निर्धारित ऑडिट' : 'Scheduled Audits'}</p>
                            <p className="text-2xl font-bold text-blue-600">12</p>
                          </div>
                          <Calendar className="w-8 h-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="dark:bg-slate-800 dark:border-slate-700">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'पूर्ण ऑडिट' : 'Completed Audits'}</p>
                            <p className="text-2xl font-bold text-green-600">89</p>
                          </div>
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="dark:bg-slate-800 dark:border-slate-700">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'लंबित समीक्षा' : 'Pending Reviews'}</p>
                            <p className="text-2xl font-bold text-orange-600">7</p>
                          </div>
                          <Clock className="w-8 h-8 text-orange-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="dark:bg-slate-800 dark:border-slate-700">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'गैर-अनुपालन' : 'Non-Compliance'}</p>
                            <p className="text-2xl font-bold text-red-600">3</p>
                          </div>
                          <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center space-x-4">
                    <Button>
                      <Calendar className="w-4 h-4 mr-2" />
                      {t.scheduleAudit}
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      {language === 'hi' ? 'ऑडिट रिपोर्ट' : 'Audit Report'}
                    </Button>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      {language === 'hi' ? 'फ़िल्टर' : 'Filter'}
                    </Button>
                  </div>

                  {/* Upcoming Audits */}
                  <Card className="dark:bg-slate-800 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="flex items-center text-foreground">
                        <Calendar className="w-5 h-5 mr-2" />
                        {language === 'hi' ? 'आगामी ऑडिट' : 'Upcoming Audits'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{language === 'hi' ? 'दिल्ली केमिकल्स लिमिटेड - पर्यावरणीय अनुपालन' : 'Delhi Chemicals Ltd - Environmental Compliance'}</h4>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'निर्धारित: 25 दिसंबर 2024' : 'Scheduled: Dec 25, 2024'}</p>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'ऑडिटर: डॉ. ए.के. शर्मा' : 'Auditor: Dr. A.K. Sharma'}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">{language === 'hi' ? 'उच्च प्राथमिकता' : 'High Priority'}</Badge>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              {language === 'hi' ? 'देखें' : 'View'}
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{language === 'hi' ? 'मेट्रो हॉस्पिटल चेन - अग्नि सुरक्षा' : 'Metro Hospital Chain - Fire Safety'}</h4>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'निर्धारित: 28 दिसंबर 2024' : 'Scheduled: Dec 28, 2024'}</p>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'ऑडिटर: इंस्पेक्टर आर.के. सिंह' : 'Auditor: Inspector R.K. Singh'}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">{language === 'hi' ? 'अति गंभीर' : 'Critical'}</Badge>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              {language === 'hi' ? 'देखें' : 'View'}
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{language === 'hi' ? 'फ्रेश बेकरी एंड स्वीट्स - खाद्य सुरक्षा' : 'Fresh Bakery & Sweets - Food Safety'}</h4>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'निर्धारित: 2 जनवरी 2025' : 'Scheduled: Jan 2, 2025'}</p>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'ऑडिटर: डॉ. एम. पटेल' : 'Auditor: Dr. M. Patel'}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">{language === 'hi' ? 'मध्यम' : 'Medium'}</Badge>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              {language === 'hi' ? 'देखें' : 'View'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Audit Results */}
                  <Card className="dark:bg-slate-800 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="flex items-center text-foreground">
                        <Shield className="w-5 h-5 mr-2" />
                        {language === 'hi' ? 'हाल के ऑडिट परिणाम' : 'Recent Audit Results'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          {language === 'hi' ? 'ऑडिट परिणाम यहाँ दिखाए जाएंगे' : 'Audit results will be displayed here'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="violations" className="h-full overflow-y-auto mt-0">
                <div className="p-6 space-y-6">
                  <div className="text-center py-12">
                    <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {language === 'hi' ? 'उल्लंघन रिकॉर्ड यहाँ दिखाए जाएंगे' : 'Violation records will be displayed here'}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="h-full overflow-y-auto mt-0">
                <div className="p-6 space-y-6">
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {language === 'hi' ? 'अनुपालन रिपोर्ट यहाँ जेनरेट की जाएंगी' : 'Compliance reports will be generated here'}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}