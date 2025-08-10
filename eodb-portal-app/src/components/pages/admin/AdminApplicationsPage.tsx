import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  Building2,
  Calendar,
  FileText,
  MoreHorizontal,
  ArrowUpDown,
  RefreshCw,
  MessageSquare,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Hash
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { ScrollArea } from '../../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Textarea } from '../../ui/textarea';
import { sharedState } from '@/utils/shared-state';
import { getDepartmentById, getLicenseTypeById } from '../../../utils/department-mapping';

interface AdminApplicationsPageProps {
  language: 'en' | 'hi';
  user: any;
}

export function AdminApplicationsPage({ language, user }: AdminApplicationsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [rejectionReason, setRejectionReason] = useState('');
  const [approvalMessage, setApprovalMessage] = useState('');
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);

  const translations = {
    en: {
      title: 'Applications Management',
      subtitle: 'Monitor and manage applications for your department',
      totalApplications: 'Total Applications',
      pendingReview: 'Pending Review',
      inProcess: 'In Process',
      completed: 'Completed',
      highPriority: 'High Priority',
      search: 'Search applications...',
      filter: 'Filter',
      export: 'Export Data',
      refresh: 'Refresh',
      viewDetails: 'View Details',
      approve: 'Approve',
      reject: 'Reject',
      assignOfficer: 'Assign Officer',
      allStatuses: 'All Statuses',
      allPriorities: 'All Priorities',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      inReview: 'In Review',
      documentRequired: 'Document Required',
      applicationId: 'Application ID',
      applicantName: 'Applicant Name',
      businessType: 'Business Type',
      licenseType: 'License Type',
      department: 'Department',
      submissionDate: 'Submission Date',
      status: 'Status',
      assignedOfficer: 'Assigned Officer',
      priority: 'Priority',
      actions: 'Actions',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      applicationDetails: 'Application Details',
      contactInfo: 'Contact Information',
      documentsSubmitted: 'Documents Submitted',
      applicationHistory: 'Application History',
      businessDetails: 'Business Details',
      processingTime: 'Processing Time',
      fees: 'Application Fees',
      lastUpdated: 'Last Updated',
      daysElapsed: 'Days Since Submission',
      approveApplication: 'Approve Application',
      rejectApplication: 'Reject Application',
      approvalComment: 'Approval Comment (Optional)',
      rejectionReason: 'Reason for Rejection',
      confirmAction: 'Confirm Action',
      cancel: 'Cancel',
      noApplications: 'No applications found for your department',
      yourDepartment: 'Your Department'
    },
    hi: {
      title: 'आवेदन प्रबंधन',
      subtitle: 'अपने विभाग के आवेदनों की निगरानी और प्रबंधन करें',
      totalApplications: 'कुल आवेदन',
      pendingReview: 'समीक्षा लंबित',
      inProcess: 'प्रक्रिया में',
      completed: 'पूर्ण',
      highPriority: 'उच्च प्राथमिकता',
      search: 'आवेदन खोजें...',
      filter: 'फ़िल्टर',
      export: 'डेटा निर्यात',
      refresh: 'रीफ्रेश',
      viewDetails: 'विवरण देखें',
      approve: 'अनुमोदित करें',
      reject: 'अस्वीकार करें',
      assignOfficer: 'अधिकारी नियुक्त करें',
      allStatuses: 'सभी स्थितियां',
      allPriorities: 'सभी प्राथमिकताएं',
      pending: 'लंबित',
      approved: 'अनुमोदित',
      rejected: 'अस्वीकृत',
      inReview: 'समीक्षाधीन',
      documentRequired: 'दस्तावेज़ आवश्यक',
      applicationId: 'आवेदन आईडी',
      applicantName: 'आवेदक का नाम',
      businessType: 'व्यवसाय प्रकार',
      licenseType: 'लाइसेंस प्रकार',
      department: 'विभाग',
      submissionDate: 'जमा करने की दिनांक',
      status: 'स्थिति',
      assignedOfficer: 'नियुक्त अधिकारी',
      priority: 'प्राथमिकता',
      actions: 'कार्य',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'निम्न',
      applicationDetails: 'आवेदन विवरण',
      contactInfo: 'संपर्क जानकारी',
      documentsSubmitted: 'जमा किए गए दस्तावेज़',
      applicationHistory: 'आवेदन इतिहास',
      businessDetails: 'व्यावसायिक विवरण',
      processingTime: 'प्रसंस्करण समय',
      fees: 'आवेदन शुल्क',
      lastUpdated: 'अंतिम अपडेट',
      daysElapsed: 'जमा करने के बाद के दिन',
      approveApplication: 'आवेदन अनुमोदित करें',
      rejectApplication: 'आवेदन अस्वीकार करें',
      approvalComment: 'अनुमोदन टिप्पणी (वैकल्पिक)',
      rejectionReason: 'अस्वीकार करने का कारण',
      confirmAction: 'कार्य की पुष्टि करें',
      cancel: 'रद्द करें',
      noApplications: 'आपके विभाग के लिए कोई आवेदन नहीं मिला',
      yourDepartment: 'आपका विभाग'
    }
  };

  const t = translations[language];

  // Load applications on component mount and set up real-time updates
  useEffect(() => {
    const loadApplications = () => {
      if (user?.department) {
        const departmentApplications = sharedState.getApplicationsByDepartment(user.department);
        setApplications(departmentApplications);
      } else {
        // If no specific department, show all applications (for senior administrators)
        setApplications(sharedState.getApplications());
      }
    };

    loadApplications();

    // Set up real-time listener
    const unsubscribe = sharedState.addListener('applications', loadApplications);

    return unsubscribe;
  }, [user?.department]);

  // Statistics
  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    inProcess: applications.filter(app => app.status === 'in-review' || app.status === 'document-required').length,
    completed: applications.filter(app => app.status === 'approved' || app.status === 'rejected').length,
    highPriority: applications.filter(app => app.priority === 'high').length
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: t.pending, icon: Clock },
      approved: { color: 'bg-green-100 text-green-800 border-green-200', label: t.approved, icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', label: t.rejected, icon: XCircle },
      'in-review': { color: 'bg-blue-100 text-blue-800 border-blue-200', label: t.inReview, icon: Eye },
      'document-required': { color: 'bg-orange-100 text-orange-800 border-orange-200', label: t.documentRequired, icon: FileText }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
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
        {t[priority as keyof typeof t]}
      </Badge>
    );
  };

  const handleApproveReject = async (applicationId: string, action: 'approve' | 'reject', message: string) => {
    const status = action === 'approve' ? 'approved' : 'rejected';
    const success = sharedState.updateApplicationStatus(applicationId, status, message, user?.name);
    
    if (success) {
      setActionType(null);
      setApprovalMessage('');
      setRejectionReason('');
      setSelectedApplication(null);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.licenseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || app.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const userDepartment = getDepartmentById(user?.department);

  return (
    <div className="flex h-screen">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
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
              {userDepartment && (
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {t.yourDepartment}: {userDepartment.name[language]}
                  </Badge>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                {t.refresh}
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                {t.export}
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="p-6 border-b">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-5 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
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
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.inProcess}</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.inProcess}</p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.completed}</p>
                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.highPriority}</p>
                    <p className="text-2xl font-bold text-red-600">{stats.highPriority}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b">
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
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allStatuses}</SelectItem>
                  <SelectItem value="pending">{t.pending}</SelectItem>
                  <SelectItem value="in-review">{t.inReview}</SelectItem>
                  <SelectItem value="approved">{t.approved}</SelectItem>
                  <SelectItem value="rejected">{t.rejected}</SelectItem>
                  <SelectItem value="document-required">{t.documentRequired}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allPriorities}</SelectItem>
                  <SelectItem value="high">{t.high}</SelectItem>
                  <SelectItem value="medium">{t.medium}</SelectItem>
                  <SelectItem value="low">{t.low}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                {t.filter}
              </Button>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="flex-1 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-full"
          >
            {filteredApplications.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">{t.noApplications}</h3>
                  <p className="text-muted-foreground">
                    {userDepartment ? 
                      `${language === 'hi' ? 'कोई आवेदन नहीं मिला' : 'No applications found for'} ${userDepartment.name[language]}` :
                      t.noApplications
                    }
                  </p>
                </div>
              </div>
            ) : (
              <ScrollArea className="h-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-32">{t.applicationId}</TableHead>
                      <TableHead className="min-w-48">{t.applicantName}</TableHead>
                      <TableHead className="min-w-32">{t.licenseType}</TableHead>
                      <TableHead className="w-32">{t.submissionDate}</TableHead>
                      <TableHead className="w-32">{t.status}</TableHead>
                      <TableHead className="w-24">{t.priority}</TableHead>
                      <TableHead className="w-24">{t.daysElapsed}</TableHead>
                      <TableHead className="w-32">{t.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app) => (
                      <TableRow key={app.id} className="hover:bg-muted/50">
                        <TableCell className="font-mono text-sm">{app.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{app.applicantName}</div>
                            <div className="text-sm text-muted-foreground">{app.businessType}</div>
                          </div>
                        </TableCell>
                        <TableCell>{app.licenseType}</TableCell>
                        <TableCell className="text-sm">
                          {new Date(app.submissionDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell>{getPriorityBadge(app.priority)}</TableCell>
                        <TableCell className="text-sm">
                          <Badge variant="outline">{app.daysElapsed} days</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => setSelectedApplication(app)}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>{t.applicationDetails} - {app.id}</DialogTitle>
                                  <DialogDescription>
                                    {language === 'hi' ? 'संपूर्ण आवेदन विवरण और दस्तावेज़' : 'Complete application details and documents'}
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedApplication && (
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="font-medium mb-2 flex items-center">
                                          <User className="w-4 h-4 mr-2" />
                                          {t.contactInfo}
                                        </h4>
                                        <div className="space-y-2 text-sm bg-muted/50 p-3 rounded">
                                          <div className="flex items-center">
                                            <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                                            {selectedApplication.applicantEmail}
                                          </div>
                                          <div className="flex items-center">
                                            <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                                            {selectedApplication.applicantPhone}
                                          </div>
                                          <div className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                                            {selectedApplication.businessAddress}
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div>
                                        <h4 className="font-medium mb-2 flex items-center">
                                          <Building2 className="w-4 h-4 mr-2" />
                                          {t.businessDetails}
                                        </h4>
                                        <div className="space-y-2 text-sm bg-muted/50 p-3 rounded">
                                          <p><strong>{language === 'hi' ? 'व्यवसाय का नाम' : 'Business Name'}:</strong> {selectedApplication.businessName}</p>
                                          <p><strong>{language === 'hi' ? 'व्यवसाय प्रकार' : 'Business Type'}:</strong> {selectedApplication.businessType}</p>
                                          <p><strong>{t.processingTime}:</strong> {selectedApplication.processingTime}</p>
                                          <p><strong>{t.fees}:</strong> {selectedApplication.fees}</p>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="font-medium mb-2 flex items-center">
                                          <FileText className="w-4 h-4 mr-2" />
                                          {t.documentsSubmitted}
                                        </h4>
                                        <div className="space-y-1">
                                          {selectedApplication.documents.map((doc: string, index: number) => (
                                            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                                              <span>{doc}</span>
                                              <Button size="sm" variant="ghost">
                                                <Eye className="w-3 h-3" />
                                              </Button>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                      
                                      <div>
                                        <h4 className="font-medium mb-2 flex items-center">
                                          <Hash className="w-4 h-4 mr-2" />
                                          {language === 'hi' ? 'आवेदन स्थिति' : 'Application Status'}
                                        </h4>
                                        <div className="space-y-2 text-sm bg-muted/50 p-3 rounded">
                                          <div className="flex justify-between">
                                            <span>{t.status}:</span>
                                            {getStatusBadge(selectedApplication.status)}
                                          </div>
                                          <div className="flex justify-between">
                                            <span>{t.priority}:</span>
                                            {getPriorityBadge(selectedApplication.priority)}
                                          </div>
                                          <div className="flex justify-between">
                                            <span>{t.lastUpdated}:</span>
                                            <span>{new Date(selectedApplication.lastUpdated).toLocaleString()}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            
                            {(app.status === 'pending' || app.status === 'in-review') ? (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={() => { setActionType('approve'); setSelectedApplication(app); }}>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    {t.approve}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => { setActionType('reject'); setSelectedApplication(app); }}>
                                    <XCircle className="w-4 h-4 mr-2" />
                                    {t.reject}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                {app.status === 'approved' ? (language === 'hi' ? 'पूर्ण' : 'Completed') : 
                                 app.status === 'rejected' ? (language === 'hi' ? 'अस्वीकृत' : 'Rejected') :
                                 (language === 'hi' ? 'कोई कार्य नहीं' : 'No Action')}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            )}
          </motion.div>
        </div>
      </div>

      {/* Action Dialogs */}
      <Dialog open={actionType === 'approve'} onOpenChange={() => setActionType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.approveApplication}</DialogTitle>
            <DialogDescription>
              {language === 'hi' ? 'आवेदन को अनुमोदित करने के लिए एक टिप्पणी जोड़ें (वैकल्पिक)' : 'Add a comment for approving this application (optional)'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder={t.approvalComment}
              value={approvalMessage}
              onChange={(e) => setApprovalMessage(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setActionType(null)}>
                {t.cancel}
              </Button>
              <Button 
                onClick={() => selectedApplication && handleApproveReject(selectedApplication.id, 'approve', approvalMessage)}
                className="bg-green-600 hover:bg-green-700"
              >
                {t.confirmAction}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={actionType === 'reject'} onOpenChange={() => setActionType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.rejectApplication}</DialogTitle>
            <DialogDescription>
              {language === 'hi' ? 'आवेदन को अस्वीकार करने का कारण प्रदान करें' : 'Please provide a reason for rejecting this application'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder={t.rejectionReason}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={3}
              required
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setActionType(null)}>
                {t.cancel}
              </Button>
              <Button 
                onClick={() => selectedApplication && handleApproveReject(selectedApplication.id, 'reject', rejectionReason)}
                className="bg-red-600 hover:bg-red-700"
                disabled={!rejectionReason.trim()}
              >
                {t.confirmAction}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}