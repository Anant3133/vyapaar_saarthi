import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Download,
  MessageSquare,
  BarChart3,
  FileText,
  Users,
  TrendingUp,
  TrendingDown,
  Building2,
  Shield,
  Leaf,
  ChevronDown,
  MoreHorizontal,
  Bell,
  User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface DepartmentDashboardProps {
  user: any;
  onNavigate: (page: string) => void;
  language: 'en' | 'hi';
}

export function DepartmentDashboard({ user, onNavigate, language }: DepartmentDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedTab, setSelectedTab] = useState('applications');

  const translations = {
    en: {
      welcome: 'Welcome back',
      department: 'Department',
      position: 'Position',
      overview: 'Department Overview',
      applications: 'Applications',
      complaints: 'Complaints',
      analytics: 'Analytics',
      pending: 'Pending',
      inReview: 'In Review',
      approved: 'Approved',
      rejected: 'Rejected',
      all: 'All',
      search: 'Search applications...',
      sortBy: 'Sort by',
      date: 'Date',
      status: 'Status',
      priority: 'Priority',
      applicantName: 'Applicant Name',
      businessType: 'Business Type',
      applicationDate: 'Application Date',
      licenseType: 'License Type',
      actions: 'Actions',
      view: 'View',
      approve: 'Approve',
      reject: 'Reject',
      moreInfo: 'More Info',
      totalApplications: 'Total Applications',
      pendingReviews: 'Pending Reviews',
      approvedToday: 'Approved Today',
      avgProcessingTime: 'Avg Processing Time',
      days: 'days',
      hours: 'hours',
      recentActivity: 'Recent Activity',
      quickActions: 'Quick Actions',
      exportData: 'Export Data',
      generateReport: 'Generate Report',
      bulkApprove: 'Bulk Approve',
      scheduleInspection: 'Schedule Inspection',
      departments: {
        health: 'Health & Safety Department',
        municipal: 'Municipal Corporation / Trade License',
        environment: 'Environmental Clearance Board'
      }
    },
    hi: {
      welcome: 'वापसी पर स्वागत',
      department: 'विभाग',
      position: 'पद',
      overview: 'विभाग अवलोकन',
      applications: 'आवेदन',
      complaints: 'शिकायतें',
      analytics: 'विश्लेषण',
      pending: 'लंबित',
      inReview: 'समीक्षाधीन',
      approved: 'अनुमोदित',
      rejected: 'अस्वीकृत',
      all: 'सभी',
      search: 'आवेदन खोजें...',
      sortBy: 'इसके अनुसार क्रमबद्ध करें',
      date: 'दिनांक',
      status: 'स्थिति',
      priority: 'प्राथमिकता',
      applicantName: 'आवेदक का नाम',
      businessType: 'व्यवसाय प्रकार',
      applicationDate: 'आवेदन दिनांक',
      licenseType: 'लाइसेंस प्रकार',
      actions: 'कार्य',
      view: 'देखें',
      approve: 'अनुमोदित करें',
      reject: 'अस्वीकार करें',
      moreInfo: 'अधिक जानकारी',
      totalApplications: 'कुल आवेदन',
      pendingReviews: 'लंबित समीक्षा',
      approvedToday: 'आज अनुमोदित',
      avgProcessingTime: 'औसत प्रसंस्करण समय',
      days: 'दिन',
      hours: 'घंटे',
      recentActivity: 'हाल की गतिविधि',
      quickActions: 'त्वरित कार्य',
      exportData: 'डेटा निर्यात करें',
      generateReport: 'रिपोर्ट बनाएं',
      bulkApprove: 'बल्क अनुमोदन',
      scheduleInspection: 'निरीक्षण अनुसूची',
      departments: {
        health: 'स्वास्थ्य और सुरक्षा विभाग',
        municipal: 'नगर निगम / व्यापार लाइसेंस',
        environment: 'पर्यावरण मंजूरी बोर्ड'
      }
    }
  };

  const t = translations[language];

  // Demo data based on department
  const getDepartmentIcon = () => {
    if (user?.department?.includes('Health')) return Shield;
    if (user?.department?.includes('Municipal')) return Building2;
    if (user?.department?.includes('Environment')) return Leaf;
    return Building2;
  };

  const getDepartmentColor = () => {
    if (user?.department?.includes('Health')) return 'from-red-500 to-red-600';
    if (user?.department?.includes('Municipal')) return 'from-blue-500 to-blue-600';
    if (user?.department?.includes('Environment')) return 'from-green-500 to-green-600';
    return 'from-blue-500 to-blue-600';
  };

  // Demo applications data
  const demoApplications = [
    {
      id: 'APP001',
      applicantName: language === 'hi' ? 'राज एंटरप्राइजेज' : 'Raj Enterprises',
      businessType: language === 'hi' ? 'निर्माण' : 'Manufacturing',
      licenseType: language === 'hi' ? 'स्वास्थ्य लाइसेंस' : 'Health License',
      applicationDate: '2024-01-15',
      status: 'pending',
      priority: 'high',
      documents: 8,
      assignedTo: user?.name || 'You'
    },
    {
      id: 'APP002',
      applicantName: language === 'hi' ? 'ग्रीन टेक सॉल्यूशंस' : 'Green Tech Solutions',
      businessType: language === 'hi' ? 'प्रौद्योगिकी' : 'Technology',
      licenseType: language === 'hi' ? 'पर्यावरण मंजूरी' : 'Environmental Clearance',
      applicationDate: '2024-01-14',
      status: 'in-review',
      priority: 'medium',
      documents: 12,
      assignedTo: user?.name || 'You'
    },
    {
      id: 'APP003',
      applicantName: language === 'hi' ? 'फूड डिलाइट रेस्टोरेंट' : 'Food Delight Restaurant',
      businessType: language === 'hi' ? 'रेस्टोरेंट' : 'Restaurant',
      licenseType: language === 'hi' ? 'व्यापार लाइसेंस' : 'Trade License',
      applicationDate: '2024-01-13',
      status: 'approved',
      priority: 'low',
      documents: 6,
      assignedTo: user?.name || 'You'
    },
    {
      id: 'APP004',
      applicantName: language === 'hi' ? 'मेडिकेयर क्लिनिक' : 'Medicare Clinic',
      businessType: language === 'hi' ? 'स्वास्थ्य सेवा' : 'Healthcare',
      licenseType: language === 'hi' ? 'चिकित्सा लाइसेंस' : 'Medical License',
      applicationDate: '2024-01-12',
      status: 'rejected',
      priority: 'high',
      documents: 4,
      assignedTo: user?.name || 'You'
    }
  ];

  // Statistics based on department
  const getStats = () => {
    const baseStats = {
      totalApplications: 156,
      pendingReviews: 23,
      approvedToday: 8,
      avgProcessingTime: 5.2
    };

    if (user?.department?.includes('Health')) {
      return {
        ...baseStats,
        totalApplications: 89,
        pendingReviews: 15,
        approvedToday: 6,
        avgProcessingTime: 7.1
      };
    }
    
    if (user?.department?.includes('Environment')) {
      return {
        ...baseStats,
        totalApplications: 67,
        pendingReviews: 12,
        approvedToday: 3,
        avgProcessingTime: 12.5
      };
    }

    return baseStats;
  };

  const stats = getStats();
  const DepartmentIcon = getDepartmentIcon();
  const departmentColor = getDepartmentColor();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: t.pending },
      'in-review': { color: 'bg-blue-100 text-blue-800 border-blue-200', label: t.inReview },
      approved: { color: 'bg-green-100 text-green-800 border-green-200', label: t.approved },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', label: t.rejected }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { color: 'bg-red-50 text-red-700 border-red-200', icon: AlertTriangle },
      medium: { color: 'bg-orange-50 text-orange-700 border-orange-200', icon: Clock },
      low: { color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Clock }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const filteredApplications = demoApplications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.licenseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.businessType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="space-y-1">
          <motion.h1 
            className="text-3xl font-bold flex items-center space-x-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${departmentColor} flex items-center justify-center`}>
              <DepartmentIcon className="w-5 h-5 text-white" />
            </div>
            <span>{t.welcome}, {user?.name}</span>
          </motion.h1>
          <p className="text-muted-foreground">
            {t.position}: {user?.position} | {t.department}: {language === 'hi' ? 
              (user?.department?.includes('Health') ? t.departments.health :
               user?.department?.includes('Municipal') ? t.departments.municipal :
               t.departments.environment) : user?.department
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => onNavigate('settings')}>
            <User className="w-4 h-4 mr-2" />
            Profile
          </Button>
          <Button>
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.totalApplications}</p>
                <p className="text-3xl font-bold">{stats.totalApplications}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${departmentColor} flex items-center justify-center`}>
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+12%</span>
              <span className="text-muted-foreground ml-1">{language === 'hi' ? 'पिछले महीने से' : 'from last month'}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.pendingReviews}</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingReviews}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mr-1" />
              <span className="text-yellow-600">{language === 'hi' ? 'तत्काल ध्यान दें' : 'Needs attention'}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.approvedToday}</p>
                <p className="text-3xl font-bold text-green-600">{stats.approvedToday}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+{language === 'hi' ? '३' : '3'}</span>
              <span className="text-muted-foreground ml-1">{language === 'hi' ? 'कल से' : 'from yesterday'}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.avgProcessingTime}</p>
                <p className="text-3xl font-bold">{stats.avgProcessingTime} <span className="text-sm text-muted-foreground">{t.days}</span></p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">-0.8 {t.days}</span>
              <span className="text-muted-foreground ml-1">{language === 'hi' ? 'बेहतर' : 'improved'}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="applications">{t.applications}</TabsTrigger>
            <TabsTrigger value="complaints">{t.complaints}</TabsTrigger>
            <TabsTrigger value="analytics">{t.analytics}</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={t.search}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                    
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.all}</SelectItem>
                        <SelectItem value="pending">{t.pending}</SelectItem>
                        <SelectItem value="in-review">{t.inReview}</SelectItem>
                        <SelectItem value="approved">{t.approved}</SelectItem>
                        <SelectItem value="rejected">{t.rejected}</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">{t.date}</SelectItem>
                        <SelectItem value="status">{t.status}</SelectItem>
                        <SelectItem value="priority">{t.priority}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      {t.exportData}
                    </Button>
                    <Button size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      {t.generateReport}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Applications Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{t.applications} ({filteredApplications.length})</span>
                  <Badge variant="outline">{language === 'hi' ? 'सभी विभाग' : 'All Departments'}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.applicantName}</TableHead>
                        <TableHead>{t.businessType}</TableHead>
                        <TableHead>{t.licenseType}</TableHead>
                        <TableHead>{t.applicationDate}</TableHead>
                        <TableHead>{t.status}</TableHead>
                        <TableHead>{t.priority}</TableHead>
                        <TableHead>{t.actions}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell className="font-medium">{app.applicantName}</TableCell>
                          <TableCell>{app.businessType}</TableCell>
                          <TableCell>{app.licenseType}</TableCell>
                          <TableCell>{app.applicationDate}</TableCell>
                          <TableCell>{getStatusBadge(app.status)}</TableCell>
                          <TableCell>{getPriorityBadge(app.priority)}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                <XCircle className="w-4 h-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>{t.view}</DropdownMenuItem>
                                  <DropdownMenuItem>{t.moreInfo}</DropdownMenuItem>
                                  <DropdownMenuItem>{t.scheduleInspection}</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaints" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.complaints}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {language === 'hi' ? 'शिकायत प्रबंधन सिस्टम यहाँ होगा' : 'Complaint management system will be here'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.analytics}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {language === 'hi' ? 'विस्तृत विश्लेषण और चार्ट यहाँ होंगे' : 'Detailed analytics and charts will be here'}
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