import { useState } from 'react';
import { motion } from 'motion/react';
import {
  RefreshCw,
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
  AlertTriangle,
  FileText,
  Mail,
  Phone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Progress } from '../../ui/progress';

interface AdminLicenseRenewalsProps {
  language: 'en' | 'hi';
  user: any;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export function AdminLicenseRenewals({ language, user, onNavigate, onBack }: AdminLicenseRenewalsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const translations = {
    en: {
      title: 'License Renewals Management',
      subtitle: 'Track and process license renewal applications',
      search: 'Search renewals...',
      status: 'Status',
      type: 'License Type',
      allStatuses: 'All Statuses',
      allTypes: 'All Types',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      expired: 'Expired',
      licenseNumber: 'License Number',
      licensee: 'Licensee',
      licenseType: 'License Type',
      expiryDate: 'Expiry Date',
      renewalStatus: 'Renewal Status',
      actions: 'Actions',
      view: 'View',
      approve: 'Approve',
      reject: 'Reject',
      export: 'Export',
      totalRenewals: 'Total Renewals',
      pendingRenewals: 'Pending Renewals',
      expiringSoon: 'Expiring Soon',
      overdue: 'Overdue',
      days: 'days',
      daysLeft: 'days left',
      daysOverdue: 'days overdue',
      renewalDetails: 'Renewal Details',
      licenseDetails: 'License Details',
      businessName: 'Business Name',
      contactNumber: 'Contact Number',
      email: 'Email',
      address: 'Address',
      originalIssueDate: 'Original Issue Date',
      lastRenewalDate: 'Last Renewal Date',
      currentExpiryDate: 'Current Expiry Date',
      requestedRenewalDate: 'Requested Renewal Date',
      renewalPeriod: 'Renewal Period',
      renewalFee: 'Renewal Fee',
      paymentStatus: 'Payment Status',
      paid: 'Paid',
      pending: 'Pending',
      failed: 'Failed',
      documentStatus: 'Document Status',
      verified: 'Verified',
      notSubmitted: 'Not Submitted',
      processRenewal: 'Process Renewal',
      approveRenewal: 'Approve Renewal',
      rejectRenewal: 'Reject Renewal',
      cancel: 'Cancel',
      sendReminder: 'Send Reminder'
    },
    hi: {
      title: 'लाइसेंस नवीनीकरण प्रबंधन',
      subtitle: 'लाइसेंस नवीनीकरण आवेदनों को ट्रैक और प्रोसेस करें',
      search: 'नवीनीकरण खोजें...',
      status: 'स्थिति',
      type: 'लाइसेंस प्रकार',
      allStatuses: 'सभी स्थितियां',
      allTypes: 'सभी प्रकार',
      pending: 'लंबित',
      approved: 'अनुमोदित',
      rejected: 'अस्वीकृत',
      expired: 'समाप्त',
      licenseNumber: 'लाइसेंस नंबर',
      licensee: 'लाइसेंसधारी',
      licenseType: 'लाइसेंस प्रकार',
      expiryDate: 'समाप्ति दिनांक',
      renewalStatus: 'नवीनीकरण स्थिति',
      actions: 'कार्य',
      view: 'देखें',
      approve: 'अनुमोदित करें',
      reject: 'अस्वीकार करें',
      export: 'निर्यात',
      totalRenewals: 'कुल नवीनीकरण',
      pendingRenewals: 'लंबित नवीनीकरण',
      expiringSoon: 'जल्द समाप्त होने वाले',
      overdue: 'देर से',
      days: 'दिन',
      daysLeft: 'दिन बचे',
      daysOverdue: 'दिन देर से',
      renewalDetails: 'नवीनीकरण विवरण',
      licenseDetails: 'लाइसेंस विवरण',
      businessName: 'व्यापार नाम',
      contactNumber: 'संपर्क नंबर',
      email: 'ईमेल',
      address: 'पता',
      originalIssueDate: 'मूल जारी दिनांक',
      lastRenewalDate: 'अंतिम नवीनीकरण दिनांक',
      currentExpiryDate: 'वर्तमान समाप्ति दिनांक',
      requestedRenewalDate: 'अनुरोधित नवीनीकरण दिनांक',
      renewalPeriod: 'नवीनीकरण अवधि',
      renewalFee: 'नवीनीकरण शुल्क',
      paymentStatus: 'भुगतान स्थिति',
      paid: 'भुगतान किया गया',
      pending: 'लंबित',
      failed: 'असफल',
      documentStatus: 'दस्तावेज़ स्थिति',
      verified: 'सत्यापित',
      notSubmitted: 'प्रस्तुत नहीं',
      processRenewal: 'नवीनीकरण प्रोसेस करें',
      approveRenewal: 'नवीनीकरण अनुमोदित करें',
      rejectRenewal: 'नवीनीकरण अस्वीकार करें',
      cancel: 'रद्द करें',
      sendReminder: 'रिमाइंडर भेजें'
    }
  };

  const t = translations[language];

  const renewals = [
    {
      id: 'LIC-2024-001',
      licenseNumber: 'TL-2023-0045',
      licensee: 'राज एंटरप्राइजेज',
      licenseType: 'Trade License',
      originalIssueDate: '2023-02-15',
      lastRenewalDate: '2023-02-15',
      currentExpiryDate: '2024-02-15',
      requestedRenewalDate: '2024-01-15',
      status: 'pending',
      businessName: 'राज एंटरप्राइजेज',
      email: 'raj@enterprises.com',
      phone: '+91 9876543210',
      address: 'नई दिल्ली, भारत',
      renewalPeriod: '1 year',
      renewalFee: 5000,
      paymentStatus: 'paid',
      documentStatus: 'verified',
      daysToExpiry: -30,
      priority: 'high'
    },
    {
      id: 'LIC-2024-002',
      licenseNumber: 'HL-2023-0023',
      licensee: 'स्वास्थ्य केंद्र',
      licenseType: 'Health License',
      originalIssueDate: '2022-03-10',
      lastRenewalDate: '2023-03-10',
      currentExpiryDate: '2024-03-10',
      requestedRenewalDate: '2024-02-10',
      status: 'approved',
      businessName: 'स्वास्थ्य केंद्र',
      email: 'health@center.com',
      phone: '+91 9876543211',
      address: 'गुड़गांव, हरियाणा',
      renewalPeriod: '2 years',
      renewalFee: 15000,
      paymentStatus: 'paid',
      documentStatus: 'verified',
      daysToExpiry: 15,
      priority: 'medium'
    },
    {
      id: 'LIC-2024-003',
      licenseNumber: 'FL-2023-0067',
      licensee: 'फूड कॉर्नर',
      licenseType: 'Food License',
      originalIssueDate: '2023-04-20',
      lastRenewalDate: '2023-04-20',
      currentExpiryDate: '2024-04-20',
      requestedRenewalDate: '2024-03-20',
      status: 'pending',
      businessName: 'फूड कॉर्नर',
      email: 'food@corner.com',
      phone: '+91 9876543212',
      address: 'नोएडा, उत्तर प्रदेश',
      renewalPeriod: '1 year',
      renewalFee: 3000,
      paymentStatus: 'pending',
      documentStatus: 'pending',
      daysToExpiry: 45,
      priority: 'low'
    },
    {
      id: 'LIC-2024-004',
      licenseNumber: 'FL-2022-0034',
      licensee: 'मैन्युफैक्चरिंग प्लांट',
      licenseType: 'Factory License',
      originalIssueDate: '2021-01-15',
      lastRenewalDate: '2023-01-15',
      currentExpiryDate: '2024-01-15',
      requestedRenewalDate: null,
      status: 'expired',
      businessName: 'मैन्युफैक्चरिंग प्लांट',
      email: 'manufacturing@plant.com',
      phone: '+91 9876543213',
      address: 'फरीदाबाद, हरियाणा',
      renewalPeriod: '3 years',
      renewalFee: 25000,
      paymentStatus: 'failed',
      documentStatus: 'not_submitted',
      daysToExpiry: -15,
      priority: 'high'
    }
  ];

  const statuses = [
    { value: 'all', label: t.allStatuses },
    { value: 'pending', label: t.pending },
    { value: 'approved', label: t.approved },
    { value: 'rejected', label: t.rejected },
    { value: 'expired', label: t.expired }
  ];

  const licenseTypes = [
    { value: 'all', label: t.allTypes },
    { value: 'trade', label: 'Trade License' },
    { value: 'health', label: 'Health License' },
    { value: 'food', label: 'Food License' },
    { value: 'factory', label: 'Factory License' }
  ];

  const filteredRenewals = renewals.filter(renewal => {
    const matchesSearch = renewal.licensee.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         renewal.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || renewal.status === selectedStatus;
    const matchesType = selectedType === 'all' || renewal.licenseType.toLowerCase().includes(selectedType);
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: t.pending, class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
      approved: { label: t.approved, class: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
      rejected: { label: t.rejected, class: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
      expired: { label: t.expired, class: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300' }
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  const getExpiryStatus = (daysToExpiry: number) => {
    if (daysToExpiry < 0) {
      return {
        text: `${Math.abs(daysToExpiry)} ${t.daysOverdue}`,
        class: 'text-red-600 dark:text-red-400',
        bgClass: 'bg-red-50 dark:bg-red-900/20'
      };
    } else if (daysToExpiry <= 30) {
      return {
        text: `${daysToExpiry} ${t.daysLeft}`,
        class: 'text-yellow-600 dark:text-yellow-400',
        bgClass: 'bg-yellow-50 dark:bg-yellow-900/20'
      };
    } else {
      return {
        text: `${daysToExpiry} ${t.daysLeft}`,
        class: 'text-green-600 dark:text-green-400',
        bgClass: 'bg-green-50 dark:bg-green-900/20'
      };
    }
  };

  const statistics = {
    total: renewals.length,
    pending: renewals.filter(r => r.status === 'pending').length,
    expiringSoon: renewals.filter(r => r.daysToExpiry <= 30 && r.daysToExpiry > 0).length,
    overdue: renewals.filter(r => r.daysToExpiry < 0).length
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
                  <p className="text-sm text-muted-foreground">{t.totalRenewals}</p>
                  <p className="text-3xl font-bold text-foreground">{statistics.total}</p>
                </div>
                <RefreshCw className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.pendingRenewals}</p>
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
                  <p className="text-sm text-muted-foreground">{t.expiringSoon}</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{statistics.expiringSoon}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.overdue}</p>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">{statistics.overdue}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Renewals Management */}
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

            {/* Renewals Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.licenseNumber}</TableHead>
                    <TableHead>{t.licensee}</TableHead>
                    <TableHead>{t.licenseType}</TableHead>
                    <TableHead>{t.expiryDate}</TableHead>
                    <TableHead>{t.renewalStatus}</TableHead>
                    <TableHead className="text-right">{t.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRenewals.map((renewal, index) => {
                    const statusConfig = getStatusBadge(renewal.status);
                    const expiryStatus = getExpiryStatus(renewal.daysToExpiry);
                    
                    return (
                      <TableRow key={renewal.id}>
                        <TableCell className="font-medium">{renewal.licenseNumber}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                              <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{renewal.licensee}</p>
                              <p className="text-sm text-muted-foreground">{renewal.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{renewal.licenseType}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">{renewal.currentExpiryDate}</p>
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${expiryStatus.bgClass} ${expiryStatus.class}`}>
                              <Clock className="w-3 h-3 mr-1" />
                              {expiryStatus.text}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusConfig.class}>
                            {statusConfig.label}
                          </Badge>
                        </TableCell>
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
                                  <DialogTitle>{t.renewalDetails} - {renewal.licenseNumber}</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-6 py-4">
                                  {/* License Details */}
                                  <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">{t.licenseDetails}</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium">{t.businessName}</label>
                                        <p className="mt-1 text-sm">{renewal.businessName}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">{t.licenseType}</label>
                                        <p className="mt-1 text-sm">{renewal.licenseType}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">{t.originalIssueDate}</label>
                                        <p className="mt-1 text-sm">{renewal.originalIssueDate}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">{t.currentExpiryDate}</label>
                                        <p className="mt-1 text-sm">{renewal.currentExpiryDate}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Contact Information */}
                                  <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Contact Information</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium">{t.email}</label>
                                        <p className="mt-1 text-sm">{renewal.email}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">{t.contactNumber}</label>
                                        <p className="mt-1 text-sm">{renewal.phone}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Renewal Information */}
                                  <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Renewal Information</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium">{t.renewalPeriod}</label>
                                        <p className="mt-1 text-sm">{renewal.renewalPeriod}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">{t.renewalFee}</label>
                                        <p className="mt-1 text-sm">₹{renewal.renewalFee.toLocaleString()}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">{t.paymentStatus}</label>
                                        <Badge className={renewal.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                          {renewal.paymentStatus === 'paid' ? t.paid : t.pending}
                                        </Badge>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">{t.documentStatus}</label>
                                        <Badge className={renewal.documentStatus === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                          {renewal.documentStatus === 'verified' ? t.verified : t.pending}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex justify-end space-x-3">
                                    {renewal.status === 'pending' && (
                                      <>
                                        <Button variant="outline" className="text-red-600 hover:text-red-700">
                                          <XCircle className="w-4 h-4 mr-2" />
                                          {t.rejectRenewal}
                                        </Button>
                                        <Button className="bg-green-600 hover:bg-green-700">
                                          <CheckCircle className="w-4 h-4 mr-2" />
                                          {t.approveRenewal}
                                        </Button>
                                      </>
                                    )}
                                    {renewal.status === 'expired' && (
                                      <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                                        <Mail className="w-4 h-4 mr-2" />
                                        {t.sendReminder}
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            {renewal.status === 'pending' && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                {t.approve}
                              </Button>
                            )}
                            
                            {renewal.status === 'expired' && (
                              <Button size="sm" variant="outline" className="text-blue-600 hover:text-blue-700">
                                <Mail className="w-4 h-4 mr-2" />
                                Remind
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