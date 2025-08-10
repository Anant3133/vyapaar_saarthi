import { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileCheck,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Building,
  Calendar,
  AlertCircle,
  Plus,
  Edit,
  Send
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';

interface AdminLicenseIssuanceProps {
  language: 'en' | 'hi';
  user: any;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export function AdminLicenseIssuance({ language, user, onNavigate, onBack }: AdminLicenseIssuanceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const translations = {
    en: {
      title: 'License Issuance Management',
      subtitle: 'Review and process license applications for issuance',
      search: 'Search applications...',
      status: 'Status',
      type: 'License Type',
      allStatuses: 'All Statuses',
      allTypes: 'All Types',
      pending: 'Pending Review',
      approved: 'Approved',
      rejected: 'Rejected',
      issued: 'Issued',
      applicationId: 'Application ID',
      applicant: 'Applicant',
      licenseType: 'License Type',
      submittedOn: 'Submitted On',
      actions: 'Actions',
      view: 'View',
      approve: 'Approve',
      reject: 'Reject',
      issue: 'Issue License',
      export: 'Export',
      totalApplications: 'Total Applications',
      pendingReview: 'Pending Review',
      readyToIssue: 'Ready to Issue',
      issued: 'Issued Today',
      days: 'days ago',
      hours: 'hours ago',
      reviewApplication: 'Review Application',
      applicantDetails: 'Applicant Details',
      businessName: 'Business Name',
      contactNumber: 'Contact Number',
      email: 'Email',
      address: 'Address',
      documentVerification: 'Document Verification',
      allDocumentsVerified: 'All documents verified',
      pendingVerification: 'Pending verification',
      reviewNotes: 'Review Notes',
      addNotes: 'Add review notes...',
      approveApplication: 'Approve Application',
      rejectApplication: 'Reject Application',
      cancel: 'Cancel',
      issueLicense: 'Issue License',
      licenseNumber: 'License Number',
      validFrom: 'Valid From',
      validUntil: 'Valid Until',
      generateLicense: 'Generate License'
    },
    hi: {
      title: 'लाइसेंस जारी करना प्रबंधन',
      subtitle: 'लाइसेंस जारी करने के लिए आवेदनों की समीक्षा और प्रसंस्करण',
      search: 'आवेदन खोजें...',
      status: 'स्थिति',
      type: 'लाइसेंस प्रकार',
      allStatuses: 'सभी स्थितियां',
      allTypes: 'सभी प्रकार',
      pending: 'समीक्षा लंबित',
      approved: 'अनुमोदित',
      rejected: 'अस्वीकृत',
      issued: 'जारी किया गया',
      applicationId: 'आवेदन आईडी',
      applicant: 'आवेदक',
      licenseType: 'लाइसेंस प्रकार',
      submittedOn: 'प्रस्तुत दिनांक',
      actions: 'कार्य',
      view: 'देखें',
      approve: 'अनुमोदित करें',
      reject: 'अस्वीकार करें',
      issue: 'लाइसेंस जारी करें',
      export: 'निर्यात',
      totalApplications: 'कुल आवेदन',
      pendingReview: 'समीक्षा लंबित',
      readyToIssue: 'जारी करने के लिए तैयार',
      issued: 'आज जारी किए गए',
      days: 'दिन पहले',
      hours: 'घंटे पहले',
      reviewApplication: 'आवेदन समीक्षा',
      applicantDetails: 'आवेदक विवरण',
      businessName: 'व्यापार नाम',
      contactNumber: 'संपर्क नंबर',
      email: 'ईमेल',
      address: 'पता',
      documentVerification: 'दस्तावेज़ सत्यापन',
      allDocumentsVerified: 'सभी दस्तावेज़ सत्यापित',
      pendingVerification: 'सत्यापन लंबित',
      reviewNotes: 'समीक्षा टिप्पणियां',
      addNotes: 'समीक्षा टिप्पणियां जोड़ें...',
      approveApplication: 'आवेदन अनुमोदित करें',
      rejectApplication: 'आवेदन अस्वीकार करें',
      cancel: 'रद्द करें',
      issueLicense: 'लाइसेंस जारी करें',
      licenseNumber: 'लाइसेंस नंबर',
      validFrom: 'से वैध',
      validUntil: 'तक वैध',
      generateLicense: 'लाइसेंस बनाएं'
    }
  };

  const t = translations[language];

  const applications = [
    {
      id: 'APP-2024-001',
      applicant: 'राज एंटरप्राइजेज',
      licenseType: 'Trade License',
      status: 'pending',
      submittedOn: '2024-01-15',
      businessName: 'राज एंटरप्राइजेज',
      email: 'raj@enterprises.com',
      phone: '+91 9876543210',
      address: 'नई दिल्ली, भारत',
      documentsVerified: true,
      priority: 'high'
    },
    {
      id: 'APP-2024-002',
      applicant: 'स्वास्थ्य केंद्र',
      licenseType: 'Health License',
      status: 'approved',
      submittedOn: '2024-01-12',
      businessName: 'स्वास्थ्य केंद्र',
      email: 'health@center.com',
      phone: '+91 9876543211',
      address: 'गुड़गांव, हरियाणा',
      documentsVerified: true,
      priority: 'medium'
    },
    {
      id: 'APP-2024-003',
      applicant: 'फूड कॉर्नर',
      licenseType: 'Food License',
      status: 'pending',
      submittedOn: '2024-01-10',
      businessName: 'फूड कॉर्नर',
      email: 'food@corner.com',
      phone: '+91 9876543212',
      address: 'नोएडा, उत्तर प्रदेश',
      documentsVerified: false,
      priority: 'low'
    },
    {
      id: 'APP-2024-004',
      applicant: 'मैन्युफैक्चरिंग प्लांट',
      licenseType: 'Factory License',
      status: 'issued',
      submittedOn: '2024-01-08',
      businessName: 'मैन्युफैक्चरिंग प्लांट',
      email: 'manufacturing@plant.com',
      phone: '+91 9876543213',
      address: 'फरीदाबाद, हरियाणा',
      documentsVerified: true,
      priority: 'high'
    }
  ];

  const statuses = [
    { value: 'all', label: t.allStatuses },
    { value: 'pending', label: t.pending },
    { value: 'approved', label: t.approved },
    { value: 'rejected', label: t.rejected },
    { value: 'issued', label: t.issued }
  ];

  const licenseTypes = [
    { value: 'all', label: t.allTypes },
    { value: 'trade', label: 'Trade License' },
    { value: 'health', label: 'Health License' },
    { value: 'food', label: 'Food License' },
    { value: 'factory', label: 'Factory License' }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    const matchesType = selectedType === 'all' || app.licenseType.toLowerCase().includes(selectedType);
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: t.pending, class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
      approved: { label: t.approved, class: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
      rejected: { label: t.rejected, class: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
      issued: { label: t.issued, class: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' }
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'issued': return <FileCheck className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const statistics = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    issued: applications.filter(a => a.status === 'issued').length
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground mt-1">{t.subtitle}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => {}}>
              <Download className="w-4 h-4 mr-2" />
              {t.export}
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.totalApplications}</p>
                  <p className="text-3xl font-bold text-foreground">{statistics.total}</p>
                </div>
                <FileCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.pendingReview}</p>
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{statistics.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.readyToIssue}</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{statistics.approved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.issued}</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{statistics.issued}</p>
                </div>
                <FileCheck className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Management */}
        <Card>
          <CardHeader>
            <CardTitle>{t.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder={t.search}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="lg:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="lg:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {licenseTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Applications Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.applicationId}</TableHead>
                    <TableHead>{t.applicant}</TableHead>
                    <TableHead>{t.licenseType}</TableHead>
                    <TableHead>{t.status}</TableHead>
                    <TableHead>{t.submittedOn}</TableHead>
                    <TableHead className="text-right">{t.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application, index) => {
                    const statusConfig = getStatusBadge(application.status);
                    
                    return (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{application.applicant}</p>
                              <p className="text-sm text-muted-foreground">{application.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{application.licenseType}</TableCell>
                        <TableCell>
                          <Badge className={statusConfig.class}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(application.status)}
                              <span>{statusConfig.label}</span>
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>{application.submittedOn}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4 mr-2" />
                                  {t.view}
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>{t.reviewApplication} - {application.id}</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-6 py-4">
                                  {/* Applicant Details */}
                                  <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">{t.applicantDetails}</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>{t.businessName}</Label>
                                        <p className="mt-1 text-sm">{application.businessName}</p>
                                      </div>
                                      <div>
                                        <Label>{t.email}</Label>
                                        <p className="mt-1 text-sm">{application.email}</p>
                                      </div>
                                      <div>
                                        <Label>{t.contactNumber}</Label>
                                        <p className="mt-1 text-sm">{application.phone}</p>
                                      </div>
                                      <div>
                                        <Label>{t.address}</Label>
                                        <p className="mt-1 text-sm">{application.address}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Document Verification */}
                                  <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">{t.documentVerification}</h3>
                                    <div className="flex items-center space-x-2">
                                      {application.documentsVerified ? (
                                        <>
                                          <CheckCircle className="w-5 h-5 text-green-600" />
                                          <span className="text-green-600">{t.allDocumentsVerified}</span>
                                        </>
                                      ) : (
                                        <>
                                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                                          <span className="text-yellow-600">{t.pendingVerification}</span>
                                        </>
                                      )}
                                    </div>
                                  </div>

                                  {/* Review Notes */}
                                  <div className="space-y-4">
                                    <Label htmlFor="notes">{t.reviewNotes}</Label>
                                    <Textarea id="notes" placeholder={t.addNotes} />
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex justify-end space-x-3">
                                    {application.status === 'pending' && (
                                      <>
                                        <Button variant="outline" className="text-red-600 hover:text-red-700">
                                          <XCircle className="w-4 h-4 mr-2" />
                                          {t.rejectApplication}
                                        </Button>
                                        <Button className="bg-green-600 hover:bg-green-700">
                                          <CheckCircle className="w-4 h-4 mr-2" />
                                          {t.approveApplication}
                                        </Button>
                                      </>
                                    )}
                                    {application.status === 'approved' && (
                                      <Button className="bg-blue-600 hover:bg-blue-700">
                                        <FileCheck className="w-4 h-4 mr-2" />
                                        {t.issueLicense}
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            {application.status === 'pending' && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                {t.approve}
                              </Button>
                            )}
                            
                            {application.status === 'approved' && (
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <FileCheck className="w-4 h-4 mr-2" />
                                {t.issue}
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}