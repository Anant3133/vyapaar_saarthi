import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  MapPin, 
  Home,
  Eye,
  Calendar,
  FileText,
  User,
  Building2,
  TrendingUp,
  BarChart3,
  Timer,
  Users,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { sharedState } from '@/utils/shared-state';

interface AdminApplicationTrackingProps {
  language: 'en' | 'hi';
  user: any;
  onNavigate?: (page: string) => void;
}

export function AdminApplicationTracking({ language, user, onNavigate }: AdminApplicationTrackingProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const translations = {
    en: {
      title: 'Application Tracking System',
      subtitle: 'Real-time tracking and monitoring of all license applications across departments',
      backToWelcome: 'Back to Welcome',
      search: 'Search applications...',
      filter: 'Filter',
      pending: 'Pending',
      inProgress: 'In Progress',
      completed: 'Completed',
      approved: 'Approved',
      rejected: 'Rejected',
      inReview: 'In Review',
      documentRequired: 'Document Required',
      allDepartments: 'All Departments',
      allStatuses: 'All Statuses',
      applicationId: 'Application ID',
      applicantName: 'Applicant Name',
      licenseType: 'License Type',
      submissionDate: 'Submission Date',
      status: 'Status',
      department: 'Department',
      progress: 'Progress',
      viewDetails: 'View Details',
      totalApplications: 'Total Applications',
      pendingReview: 'Pending Review',
      processingTime: 'Avg Processing Time',
      completionRate: 'Completion Rate',
      overview: 'Overview',
      timeline: 'Timeline',
      analytics: 'Analytics',
      recentActivity: 'Recent Activity',
      departmentPerformance: 'Department Performance',
      applicationFlow: 'Application Flow',
      processingSpeed: 'Processing Speed',
      todaySubmissions: 'Today\'s Submissions',
      weeklyTrend: 'Weekly Trend',
      departmentWorkload: 'Department Workload'
    },
    hi: {
      title: 'आवेदन ट्रैकिंग सिस्टम',
      subtitle: 'सभी विभागों में लाइसेंस आवेदनों की रीयल-टाइम ट्रैकिंग और निगरानी',
      backToWelcome: 'स्वागत पृष्ठ पर वापस',
      search: 'आवेदन खोजें...',
      filter: 'फ़िल्टर',
      pending: 'लंबित',
      inProgress: 'प्रगति में',
      completed: 'पूर्ण',
      approved: 'अनुमोदित',
      rejected: 'अस्वीकृत',
      inReview: 'समीक्षाधीन',
      documentRequired: 'दस्तावेज़ आवश्यक',
      allDepartments: 'सभी विभाग',
      allStatuses: 'सभी स्थितियां',
      applicationId: 'आवेदन आईडी',
      applicantName: 'आवेदक का नाम',
      licenseType: 'लाइसेंस प्रकार',
      submissionDate: 'जमा करने की दिनांक',
      status: 'स्थिति',
      department: 'विभाग',
      progress: 'प्रगति',
      viewDetails: 'विवरण देखें',
      totalApplications: 'कुल आवेदन',
      pendingReview: 'समीक्षा लंबित',
      processingTime: 'औसत प्रसंस्करण समय',
      completionRate: 'पूर्णता दर',
      overview: 'अवलोकन',
      timeline: 'समयरेखा',
      analytics: 'एनालिटिक्स',
      recentActivity: 'हाल की गतिविधि',
      departmentPerformance: 'विभागीय प्रदर्शन',
      applicationFlow: 'आवेदन प्रवाह',
      processingSpeed: 'प्रसंस्करण गति',
      todaySubmissions: 'आज के आवेदन',
      weeklyTrend: 'साप्ताहिक रुझान',
      departmentWorkload: 'विभागीय कार्यभार'
    }
  };

  const t = translations[language];

  // Load applications data
  useEffect(() => {
    const loadApplications = () => {
      const allApplications = sharedState.getApplications();
      setApplications(allApplications);
    };

    loadApplications();
    
    const unsubscribe = sharedState.addListener('applications', loadApplications);
    return unsubscribe;
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: t.pending, icon: Clock },
      approved: { color: 'bg-green-100 text-green-800 border-green-200', label: t.approved, icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', label: t.rejected, icon: AlertTriangle },
      'in-review': { color: 'bg-blue-100 text-blue-800 border-blue-200', label: t.inReview, icon: Eye },
      'document-required': { color: 'bg-orange-100 text-orange-800 border-orange-200', label: t.documentRequired, icon: FileText }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'pending': return 10;
      case 'in-review': return 50;
      case 'document-required': return 75;
      case 'approved': return 100;
      case 'rejected': return 100;
      default: return 0;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.licenseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || app.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    processing: applications.filter(app => app.status === 'in-review' || app.status === 'document-required').length,
    completed: applications.filter(app => app.status === 'approved' || app.status === 'rejected').length
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="space-y-1">
              <motion.h1 
                className="text-3xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {t.title}
              </motion.h1>
              <p className="text-muted-foreground">{t.subtitle}</p>
            </div>
            
            <Button
              variant="outline"
              onClick={() => onNavigate?.('welcome')}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200 self-start lg:self-auto"
            >
              <Home className="w-4 h-4 mr-2" />
              {t.backToWelcome}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-6 border-b bg-slate-50">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.totalApplications}</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.pendingReview}</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.processingTime}</p>
                    <p className="text-2xl font-bold text-blue-600">18 {language === 'hi' ? 'दिन' : 'days'}</p>
                  </div>
                  <Timer className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.completionRate}</p>
                    <p className="text-2xl font-bold text-green-600">94.2%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <div className="border-b bg-white">
              <div className="px-6 py-4">
                <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
                  <TabsTrigger value="overview">{t.overview}</TabsTrigger>
                  <TabsTrigger value="timeline">{t.timeline}</TabsTrigger>
                  <TabsTrigger value="analytics">{t.analytics}</TabsTrigger>
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
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.allStatuses}</SelectItem>
                        <SelectItem value="pending">{t.pending}</SelectItem>
                        <SelectItem value="in-review">{t.inReview}</SelectItem>
                        <SelectItem value="approved">{t.approved}</SelectItem>
                        <SelectItem value="rejected">{t.rejected}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="overview" className="h-full overflow-y-auto mt-0">
                <div className="p-6 space-y-4">
                  {filteredApplications.length === 0 ? (
                    <div className="text-center py-12">
                      <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        {language === 'hi' ? 'कोई आवेदन नहीं मिला' : 'No applications found'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredApplications.map((app) => (
                        <motion.div
                          key={app.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-medium">{app.id}</h3>
                                {getStatusBadge(app.status)}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                <div>
                                  <p className="text-sm text-muted-foreground">{t.applicantName}</p>
                                  <p className="font-medium">{app.applicantName}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">{t.licenseType}</p>
                                  <p className="font-medium">{app.licenseType}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">{t.submissionDate}</p>
                                  <p className="font-medium">{new Date(app.submissionDate).toLocaleDateString()}</p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">{t.progress}</span>
                                  <span className="font-medium">{getProgressValue(app.status)}%</span>
                                </div>
                                <Progress value={getProgressValue(app.status)} className="h-2" />
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4 min-w-fit">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => onNavigate?.(`admin-application-detail?id=${app.id}`)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                {t.viewDetails}
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="h-full overflow-y-auto mt-0">
                <div className="p-6 space-y-6">
                  {/* Timeline Overview */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'आज जमा' : 'Submitted Today'}</p>
                            <p className="text-2xl font-bold text-blue-600">8</p>
                          </div>
                          <Calendar className="w-8 h-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'इस सप्ताह' : 'This Week'}</p>
                            <p className="text-2xl font-bold text-green-600">34</p>
                          </div>
                          <TrendingUp className="w-8 h-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'औसत समय' : 'Avg. Time'}</p>
                            <p className="text-2xl font-bold text-orange-600">12d</p>
                          </div>
                          <Timer className="w-8 h-8 text-orange-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'तत्काल' : 'Urgent'}</p>
                            <p className="text-2xl font-bold text-red-600">5</p>
                          </div>
                          <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline View */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        {language === 'hi' ? 'आवेदन समयरेखा' : 'Application Timeline'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Today */}
                        <div>
                          <h4 className="font-medium mb-3 flex items-center">
                            <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                            {language === 'hi' ? 'आज - ' : 'Today - '}
                            {new Date().toLocaleDateString()}
                          </h4>
                          <div className="ml-5 space-y-3">
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FileText className="w-5 h-5 text-blue-600" />
                                <div>
                                  <p className="font-medium">APP-2024-021 - Trade License</p>
                                  <p className="text-sm text-muted-foreground">Digital Marketing Agency</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {language === 'hi' ? 'जमा किया गया' : 'Submitted'}
                                </Badge>
                                <p className="text-xs text-muted-foreground mt-1">10:30 AM</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <div>
                                  <p className="font-medium">APP-2024-018 - FSSAI License</p>
                                  <p className="text-sm text-muted-foreground">Fresh Bakery & Sweets</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  {language === 'hi' ? 'अनुमोदित' : 'Approved'}
                                </Badge>
                                <p className="text-xs text-muted-foreground mt-1">2:15 PM</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Yesterday */}
                        <div>
                          <h4 className="font-medium mb-3 flex items-center">
                            <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                            {language === 'hi' ? 'कल - ' : 'Yesterday - '}
                            {new Date(Date.now() - 86400000).toLocaleDateString()}
                          </h4>
                          <div className="ml-5 space-y-3">
                            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <AlertTriangle className="w-5 h-5 text-orange-600" />
                                <div>
                                  <p className="font-medium">APP-2024-019 - Fire Safety NOC</p>
                                  <p className="text-sm text-muted-foreground">Metro Hospital Chain</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge className="bg-orange-100 text-orange-800">
                                  <FileText className="w-3 h-3 mr-1" />
                                  {language === 'hi' ? 'दस्तावेज़ चाहिए' : 'Docs Required'}
                                </Badge>
                                <p className="text-xs text-muted-foreground mt-1">11:45 AM</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <Eye className="w-5 h-5 text-blue-600" />
                                <div>
                                  <p className="font-medium">APP-2024-017 - Pollution NOC</p>
                                  <p className="text-sm text-muted-foreground">EcoFriendly Industries</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge className="bg-blue-100 text-blue-800">
                                  <Eye className="w-3 h-3 mr-1" />
                                  {language === 'hi' ? 'समीक्षाधीन' : 'Under Review'}
                                </Badge>
                                <p className="text-xs text-muted-foreground mt-1">3:20 PM</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* This Week */}
                        <div>
                          <h4 className="font-medium mb-3 flex items-center">
                            <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
                            {language === 'hi' ? 'इस सप्ताह' : 'This Week'}
                          </h4>
                          <div className="ml-5">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <BarChart3 className="w-5 h-5 text-purple-600" />
                                <div>
                                  <p className="font-medium">{language === 'hi' ? 'कुल गतिविधि' : 'Total Activity'}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {language === 'hi' ? '34 आवेदन प्रसंस्करित' : '34 applications processed'}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-purple-600">34</p>
                                <p className="text-xs text-muted-foreground">+12% vs last week</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="h-full overflow-y-auto mt-0">
                <div className="p-6 space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'अनुमोदन दर' : 'Approval Rate'}</p>
                            <p className="text-2xl font-bold text-green-600">94.2%</p>
                            <p className="text-xs text-green-600">+2.1% vs last month</p>
                          </div>
                          <TrendingUp className="w-8 h-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'औसत समय' : 'Avg Processing Time'}</p>
                            <p className="text-2xl font-bold text-blue-600">12.4d</p>
                            <p className="text-xs text-blue-600">-1.2d vs target</p>
                          </div>
                          <Timer className="w-8 h-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'मासिक वृद्धि' : 'Monthly Growth'}</p>
                            <p className="text-2xl font-bold text-purple-600">+18%</p>
                            <p className="text-xs text-purple-600">vs last month</p>
                          </div>
                          <BarChart3 className="w-8 h-8 text-purple-600" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{language === 'hi' ? 'संतुष्टि स्कोर' : 'Satisfaction Score'}</p>
                            <p className="text-2xl font-bold text-orange-600">4.8/5</p>
                            <p className="text-xs text-orange-600">+0.2 vs last month</p>
                          </div>
                          <Star className="w-8 h-8 text-orange-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BarChart3 className="w-5 h-5 mr-2" />
                          {t.departmentPerformance}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">MCD</span>
                              <span className="text-sm text-muted-foreground">85%</span>
                            </div>
                            <Progress value={85} className="h-2" />
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Fire Services</span>
                              <span className="text-sm text-muted-foreground">92%</span>
                            </div>
                            <Progress value={92} className="h-2" />
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">DPCC</span>
                              <span className="text-sm text-muted-foreground">78%</span>
                            </div>
                            <Progress value={78} className="h-2" />
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Health Services</span>
                              <span className="text-sm text-muted-foreground">96%</span>
                            </div>
                            <Progress value={96} className="h-2" />
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">FSSAI</span>
                              <span className="text-sm text-muted-foreground">89%</span>
                            </div>
                            <Progress value={89} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Users className="w-5 h-5 mr-2" />
                          {t.applicationFlow}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                              <span className="font-medium">{language === 'hi' ? 'नए आवेदन' : 'New Applications'}</span>
                            </div>
                            <span className="text-xl font-bold text-blue-600">245</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                              <span className="font-medium">{language === 'hi' ? 'समीक्षाधीन' : 'Under Review'}</span>
                            </div>
                            <span className="text-xl font-bold text-yellow-600">89</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                              <span className="font-medium">{language === 'hi' ? 'अनुमोदित' : 'Approved'}</span>
                            </div>
                            <span className="text-xl font-bold text-green-600">187</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                              <span className="font-medium">{language === 'hi' ? 'अस्वीकृत' : 'Rejected'}</span>
                            </div>
                            <span className="text-xl font-bold text-red-600">12</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Processing Time Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        {language === 'hi' ? 'प्रसंस्करण समय विश्लेषण' : 'Processing Time Analysis'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <h4 className="font-medium text-green-600">{language === 'hi' ? 'तेज़ (< 7 दिन)' : 'Fast (< 7 days)'}</h4>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Trade License</span>
                              <span>5.2d avg</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Drug License</span>
                              <span>6.8d avg</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-orange-600">{language === 'hi' ? 'मध्यम (7-21 दिन)' : 'Medium (7-21 days)'}</h4>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Fire Safety NOC</span>
                              <span>14.3d avg</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>FSSAI License</span>
                              <span>18.7d avg</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-red-600">{language === 'hi' ? 'धीमा (> 21 दिन)' : 'Slow (> 21 days)'}</h4>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Pollution NOC</span>
                              <span>45.2d avg</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Factory License</span>
                              <span>28.9d avg</span>
                            </div>
                          </div>
                        </div>
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