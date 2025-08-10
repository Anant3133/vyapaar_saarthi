import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  FileText,
  User,
  Building2,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Download,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Hash,
  Edit,
  Share,
  History,
  Tag,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Progress } from '../../ui/progress';
import { Textarea } from '../../ui/textarea';
import { sharedState } from '@/utils/shared-state';

interface AdminApplicationDetailProps {
  language: 'en' | 'hi';
  user: any;
  applicationId?: string;
  onNavigate?: (page: string) => void;
  onBack?: () => void;
}

export function AdminApplicationDetail({ language, user, applicationId, onNavigate, onBack }: AdminApplicationDetailProps) {
  const [application, setApplication] = useState<any>(null);
  const [comment, setComment] = useState('');
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);

  const translations = {
    en: {
      backToTracking: 'Back to Tracking',
      applicationDetails: 'Application Details',
      overview: 'Overview',
      documents: 'Documents',
      history: 'History',
      actions: 'Actions',
      applicantInfo: 'Applicant Information',
      businessInfo: 'Business Information',
      licenseInfo: 'License Information',
      processingInfo: 'Processing Information',
      currentStatus: 'Current Status',
      progress: 'Progress',
      approveApplication: 'Approve Application',
      rejectApplication: 'Reject Application',
      addComment: 'Add Comment',
      requestDocuments: 'Request Additional Documents',
      assignOfficer: 'Assign to Officer',
      shareApplication: 'Share Application',
      exportDetails: 'Export Details',
      applicationId: 'Application ID',
      submissionDate: 'Submission Date',
      lastUpdated: 'Last Updated',
      processingTime: 'Processing Time',
      daysElapsed: 'Days Elapsed',
      assignedOfficer: 'Assigned Officer',
      priority: 'Priority',
      fees: 'Application Fees',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      businessName: 'Business Name',
      businessType: 'Business Type',
      licenseType: 'License Type',
      category: 'Category',
      duration: 'Duration',
      documentsSubmitted: 'Documents Submitted',
      downloadDocument: 'Download',
      viewDocument: 'View',
      activityLog: 'Activity Log',
      statusHistory: 'Status History',
      commentPlaceholder: 'Add your comment or note...',
      saveComment: 'Save Comment',
      pendingReview: 'Pending Review',
      approved: 'Approved',
      rejected: 'Rejected',
      inReview: 'In Review',
      documentRequired: 'Document Required',
      high: 'High',
      medium: 'Medium',
      low: 'Low'
    },
    hi: {
      backToTracking: 'ट्रैकिंग पर वापस',
      applicationDetails: 'आवेदन विवरण',
      overview: 'अवलोकन',
      documents: 'दस्तावेज़',
      history: 'इतिहास',
      actions: 'कार्य',
      applicantInfo: 'आवेदक की जानकारी',
      businessInfo: 'व्यावसायिक जानकारी',
      licenseInfo: 'लाइसेंस की जानकारी',
      processingInfo: 'प्रसंस्करण की जानकारी',
      currentStatus: 'वर्तमान स्थिति',
      progress: 'प्रगति',
      approveApplication: 'आवेदन अनुमोदित करें',
      rejectApplication: 'आवेदन अस्वीकार करें',
      addComment: 'टिप्पणी जोड़ें',
      requestDocuments: 'अतिरिक्त दस्तावेज़ मांगें',
      assignOfficer: 'अधिकारी को सौंपें',
      shareApplication: 'आवेदन साझा करें',
      exportDetails: 'विवरण निर्यात करें',
      applicationId: 'आवेदन आईडी',
      submissionDate: 'जमा करने की दिनांक',
      lastUpdated: 'अंतिम अपडेट',
      processingTime: 'प्रसंस्करण समय',
      daysElapsed: 'बीते दिन',
      assignedOfficer: 'नियुक्त अधिकारी',
      priority: 'प्राथमिकता',
      fees: 'आवेदन शुल्क',
      name: 'नाम',
      email: 'ईमेल',
      phone: 'फोन',
      address: 'पता',
      businessName: 'व्यवसाय का नाम',
      businessType: 'व्यवसाय प्रकार',
      licenseType: 'लाइसेंस प्रकार',
      category: 'श्रेणी',
      duration: 'अवधि',
      documentsSubmitted: 'जमा किए गए दस्तावेज़',
      downloadDocument: 'डाउनलोड',
      viewDocument: 'देखें',
      activityLog: 'गतिविधि लॉग',
      statusHistory: 'स्थिति इतिहास',
      commentPlaceholder: 'अपनी टिप्पणी या नोट जोड़ें...',
      saveComment: 'टिप्पणी सहेजें',
      pendingReview: 'समीक्षा लंबित',
      approved: 'अनुमोदित',
      rejected: 'अस्वीकृत',
      inReview: 'समीक्षाधीन',
      documentRequired: 'दस्तावेज़ आवश्यक',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'निम्न'
    }
  };

  const t = translations[language];

  // Load application data
  useEffect(() => {
    if (applicationId) {
      const app = sharedState.getApplicationById(applicationId);
      setApplication(app);
    }
  }, [applicationId]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: t.pendingReview, icon: Clock },
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
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

  const handleAction = (action: 'approve' | 'reject') => {
    if (application && comment.trim()) {
      const success = sharedState.updateApplicationStatus(
        application.id,
        action === 'approve' ? 'approved' : 'rejected',
        comment,
        user?.name
      );
      
      if (success) {
        setComment('');
        setActionType(null);
        // Reload application data
        const updatedApp = sharedState.getApplicationById(application.id);
        setApplication(updatedApp);
      }
    }
  };

  if (!application) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {language === 'hi' ? 'आवेदन नहीं मिला' : 'Application not found'}
          </p>
          <Button className="mt-4" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToTracking}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToTracking}
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{t.applicationDetails}</h1>
                <p className="text-muted-foreground">{application.id}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                {t.shareApplication}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                {t.exportDetails}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <div className="border-b bg-white px-6 py-4">
              <TabsList>
                <TabsTrigger value="overview">{t.overview}</TabsTrigger>
                <TabsTrigger value="documents">{t.documents}</TabsTrigger>
                <TabsTrigger value="history">{t.history}</TabsTrigger>
                <TabsTrigger value="actions">{t.actions}</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="overview" className="mt-0 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Status Card */}
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle className="text-lg">{t.currentStatus}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        {getStatusBadge(application.status)}
                        <span className={`font-medium ${getPriorityColor(application.priority)}`}>
                          {t[application.priority as keyof typeof t]}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t.progress}</span>
                          <span className="font-medium">{getProgressValue(application.status)}%</span>
                        </div>
                        <Progress value={getProgressValue(application.status)} className="h-2" />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.submissionDate}</span>
                          <span>{new Date(application.submissionDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.daysElapsed}</span>
                          <span>{application.daysElapsed} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.assignedOfficer}</span>
                          <span>{application.assignedOfficer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.fees}</span>
                          <span className="font-medium">{application.fees}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Application Details */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Applicant Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <User className="w-5 h-5 mr-2" />
                          {t.applicantInfo}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-muted-foreground">{t.name}</label>
                            <p className="font-medium">{application.applicantName}</p>
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">{t.email}</label>
                            <p className="font-medium">{application.applicantEmail}</p>
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">{t.phone}</label>
                            <p className="font-medium">{application.applicantPhone}</p>
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">{t.address}</label>
                            <p className="font-medium">{application.businessAddress}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Business Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Building2 className="w-5 h-5 mr-2" />
                          {t.businessInfo}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-muted-foreground">{t.businessName}</label>
                            <p className="font-medium">{application.businessName}</p>
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">{t.businessType}</label>
                            <p className="font-medium">{application.businessType}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* License Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <FileText className="w-5 h-5 mr-2" />
                          {t.licenseInfo}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-muted-foreground">{t.licenseType}</label>
                            <p className="font-medium">{application.licenseType}</p>
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">{t.processingTime}</label>
                            <p className="font-medium">{application.processingTime}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="mt-0 p-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.documentsSubmitted}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {application.documents.map((doc: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">{doc}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              {t.viewDocument}
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-1" />
                              {t.downloadDocument}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-0 p-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <History className="w-5 h-5 mr-2" />
                      {t.activityLog}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium">Application Submitted</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(application.submissionDate).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                        <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium">Application Under Review</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(application.lastUpdated).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="actions" className="mt-0 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.addComment}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        placeholder={t.commentPlaceholder}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                      />
                      <Button onClick={() => console.log('Comment saved')}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {t.saveComment}
                      </Button>
                    </CardContent>
                  </Card>

                  {(application.status === 'pending' || application.status === 'in-review') && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button 
                          className="w-full" 
                          onClick={() => handleAction('approve')}
                          disabled={!comment.trim()}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {t.approveApplication}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleAction('reject')}
                          disabled={!comment.trim()}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          {t.rejectApplication}
                        </Button>
                        <Button variant="outline" className="w-full">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          {t.requestDocuments}
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}