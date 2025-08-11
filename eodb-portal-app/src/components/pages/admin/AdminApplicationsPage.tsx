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
} from '../../ui/dialog';
import { Textarea } from '../../ui/textarea';
import { AdminAPI } from '@/api';
import { getDepartmentById, getLicenseTypeById } from '../../../utils/department-mapping';

interface AdminApplicationsPageProps {
  language: 'en' | 'hi';
  user: any;
}

export function AdminApplicationsPage({ language, user }: AdminApplicationsPageProps) {
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
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
      submissionDate: 'Submission Date',
      status: 'Status',
      priority: 'Priority',
      actions: 'Actions',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      applicationDetails: 'Application Details',
      contactInfo: 'Contact Information',
      documentsSubmitted: 'Documents Submitted',
      businessDetails: 'Business Details',
      lastUpdated: 'Last Updated',
      daysElapsed: 'Days Since Submission',
      approveApplication: 'Approve Application',
      rejectApplication: 'Reject Application',
      approvalComment: 'Approval Comment (Optional)',
      rejectionReason: 'Reason for Rejection',
      confirmAction: 'Confirm Action',
      cancel: 'Cancel',
      noApplications: 'No applications found',
      yourDepartment: 'Your Department',
      loadingApplications: 'Loading applications...'
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
      submissionDate: 'जमा करने की दिनांक',
      status: 'स्थिति',
      priority: 'प्राथमिकता',
      actions: 'कार्य',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'निम्न',
      applicationDetails: 'आवेदन विवरण',
      contactInfo: 'संपर्क जानकारी',
      documentsSubmitted: 'जमा किए गए दस्तावेज़',
      businessDetails: 'व्यावसायिक विवरण',
      lastUpdated: 'अंतिम अपडेट',
      daysElapsed: 'जमा करने के बाद के दिन',
      approveApplication: 'आवेदन अनुमोदित करें',
      rejectApplication: 'आवेदन अस्वीकार करें',
      approvalComment: 'अनुमोदन टिप्पणी (वैकल्पिक)',
      rejectionReason: 'अस्वीकार करने का कारण',
      confirmAction: 'कार्य की पुष्टि करें',
      cancel: 'रद्द करें',
      noApplications: 'कोई आवेदन नहीं मिला',
      yourDepartment: 'आपका विभाग',
      loadingApplications: 'आवेदन लोड हो रहे हैं...'
    }
  };

  const t = translations[language];

  // Function to fetch applications from the API
  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      // Use the API call to get all license applications
      const apps = await AdminAPI.getAllLicenseApplications();
      // Map the raw API data to the shape required by the UI
      const mapped = (apps || []).map((a: any) => ({
        id: a.id,
        applicantName: a.applicant_name || '—',
        applicantEmail: a.applicant_email || '—',
        applicantPhone: a.applicant_phone || '—',
        businessType: a.business_type || '—',
        licenseType: a.license_type || '—',
        businessName: a.business_name || '—',
        businessAddress: a.business_address || '—',
        status: a.status || 'pending',
        priority: a.priority || 'medium',
        submissionDate: a.createdAt || new Date().toISOString(),
        lastUpdated: a.updatedAt || a.createdAt || new Date().toISOString(),
        daysElapsed: Math.max(0, Math.floor((Date.now() - new Date(a.createdAt || Date.now()).getTime()) / (24*60*60*1000))),
        documents: a.documents || [], // Assuming documents are nested in the response
      }));
      setApplications(mapped);
    } catch (e) {
      console.error("Failed to fetch applications:", e);
      setApplications([]); // Clear applications on error
    } finally {
      setIsLoading(false);
    }
  };

  // Load applications on initial component mount
  useEffect(() => {
    fetchApplications();
  }, []);

  // Recalculate stats whenever the applications array changes
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

  // Handles the API call for approving or rejecting an application
  const handleApproveReject = async () => {
    if (!selectedApplication || !actionType) return;

    const status = actionType === 'approve' ? 'approved' : 'rejected';
    const comments = actionType === 'approve' ? approvalMessage : rejectionReason;

    try {
      // Use the API call to update the application status
      await AdminAPI.updateLicenseAppStatus(selectedApplication.id, status, comments);
      
      // Update the UI optimistically
      setApplications(prev => prev.map(a => 
        a.id === selectedApplication.id 
        ? { ...a, status, lastUpdated: new Date().toISOString() } 
        : a
      ));
      
      // Close the dialog and reset state
      setActionType(null);
      setApprovalMessage('');
      setRejectionReason('');
      setSelectedApplication(null);
    } catch (e) {
      console.error("Failed to update application status:", e);
      alert("Error: Could not update the application status. Please try again.");
    }
  };

  const filteredApplications = applications.filter(app => {
    const searchString = `${app.applicantName} ${app.licenseType} ${app.id}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || app.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const userDepartment = getDepartmentById(user?.department);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="space-y-1">
              <motion.h1 className="text-3xl font-bold" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {t.title}
              </motion.h1>
              <p className="text-muted-foreground">{t.subtitle}</p>
              {userDepartment && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {t.yourDepartment}: {userDepartment.name[language]}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={fetchApplications} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {t.refresh}
              </Button>
              <Button><Download className="w-4 h-4 mr-2" />{t.export}</Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="p-6 border-b bg-white">
            <motion.div 
                className="grid grid-cols-2 lg:grid-cols-5 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">{t.totalApplications}</p><p className="text-2xl font-bold">{stats.total}</p></div><FileText className="w-8 h-8 text-blue-600" /></div></CardContent></Card>
                <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">{t.pendingReview}</p><p className="text-2xl font-bold text-yellow-600">{stats.pending}</p></div><Clock className="w-8 h-8 text-yellow-600" /></div></CardContent></Card>
                <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">{t.inProcess}</p><p className="text-2xl font-bold text-blue-600">{stats.inProcess}</p></div><Eye className="w-8 h-8 text-blue-600" /></div></CardContent></Card>
                <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">{t.completed}</p><p className="text-2xl font-bold text-green-600">{stats.completed}</p></div><CheckCircle className="w-8 h-8 text-green-600" /></div></CardContent></Card>
                <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">{t.highPriority}</p><p className="text-2xl font-bold text-red-600">{stats.highPriority}</p></div><AlertTriangle className="w-8 h-8 text-red-600" /></div></CardContent></Card>
            </motion.div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b bg-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input placeholder={t.search} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-full sm:w-64"/></div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">{t.allStatuses}</SelectItem><SelectItem value="pending">{t.pending}</SelectItem><SelectItem value="in-review">{t.inReview}</SelectItem><SelectItem value="approved">{t.approved}</SelectItem><SelectItem value="rejected">{t.rejected}</SelectItem><SelectItem value="document-required">{t.documentRequired}</SelectItem></SelectContent></Select>
                    <Select value={priorityFilter} onValueChange={setPriorityFilter}><SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">{t.allPriorities}</SelectItem><SelectItem value="high">{t.high}</SelectItem><SelectItem value="medium">{t.medium}</SelectItem><SelectItem value="low">{t.low}</SelectItem></SelectContent></Select>
                </div>
                <div className="flex items-center space-x-2"><Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" />{t.filter}</Button><Button variant="outline" size="sm"><ArrowUpDown className="w-4 h-4 mr-2" />Sort</Button></div>
            </div>
        </div>

        {/* Applications Table */}
        <div className="flex-1 overflow-hidden p-6">
          <motion.div className="h-full bg-white rounded-lg shadow-sm border" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            {isLoading ? (
              <div className="flex items-center justify-center h-full"><p className="text-muted-foreground">{t.loadingApplications}</p></div>
            ) : filteredApplications.length === 0 ? (
              <div className="flex items-center justify-center h-full"><div className="text-center"><FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" /><h3 className="text-lg font-medium mb-2">{t.noApplications}</h3></div></div>
            ) : (
              <ScrollArea className="h-full">
                <Table>
                  <TableHeader><TableRow><TableHead className="w-32">{t.applicationId}</TableHead><TableHead className="min-w-48">{t.applicantName}</TableHead><TableHead className="min-w-32">{t.licenseType}</TableHead><TableHead className="w-32">{t.submissionDate}</TableHead><TableHead className="w-32">{t.status}</TableHead><TableHead className="w-24">{t.priority}</TableHead><TableHead className="w-24">{t.daysElapsed}</TableHead><TableHead className="w-32 text-right">{t.actions}</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {filteredApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-mono text-sm">{app.id.substring(0, 8)}...</TableCell>
                        <TableCell><div className="font-medium">{app.applicantName}</div><div className="text-sm text-muted-foreground">{app.businessName}</div></TableCell>
                        <TableCell>{app.licenseType}</TableCell>
                        <TableCell>{new Date(app.submissionDate).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell>{getPriorityBadge(app.priority)}</TableCell>
                        <TableCell><Badge variant="outline">{app.daysElapsed} days</Badge></TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedApplication(null)}>
                              <DialogTrigger asChild><Button size="sm" variant="outline" onClick={() => setSelectedApplication(app)}><Eye className="w-4 h-4" /></Button></DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh]"><DialogHeader><DialogTitle>{t.applicationDetails} - {app.id.substring(0,8)}</DialogTitle><DialogDescription>{language === 'hi' ? 'संपूर्ण आवेदन विवरण और दस्तावेज़' : 'Complete application details and documents'}</DialogDescription></DialogHeader>{selectedApplication && (<div>{/* Details Dialog content */}</div>)}</DialogContent>
                            </Dialog>
                            {(app.status === 'pending' || app.status === 'in-review') && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild><Button size="sm" variant="outline"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={() => { setActionType('approve'); setSelectedApplication(app); }}><CheckCircle className="w-4 h-4 mr-2 text-green-500" />{t.approve}</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => { setActionType('reject'); setSelectedApplication(app); }}><XCircle className="w-4 h-4 mr-2 text-red-500" />{t.reject}</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
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
      <Dialog open={!!actionType} onOpenChange={() => setActionType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{actionType === 'approve' ? t.approveApplication : t.rejectApplication}</DialogTitle>
            <DialogDescription>{actionType === 'approve' ? t.approvalComment : t.rejectionReason}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder={actionType === 'approve' ? t.approvalComment : t.rejectionReason}
              value={actionType === 'approve' ? approvalMessage : rejectionReason}
              onChange={(e) => actionType === 'approve' ? setApprovalMessage(e.target.value) : setRejectionReason(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setActionType(null)}>{t.cancel}</Button>
              <Button 
                onClick={handleApproveReject}
                className={actionType === 'approve' ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
                disabled={actionType === 'reject' && !rejectionReason.trim()}
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
