import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Clipboard,
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
  FileText,
  AlertCircle,
  Plus
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
import { auditData } from './constants/AdminComplianceConstants';

interface AdminComplianceAuditsProps {
  language: 'en' | 'hi';
  user: any;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export function AdminComplianceAudits({ language, user, onNavigate, onBack }: AdminComplianceAuditsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const translations = {
    en: {
      title: 'Compliance Audits Management',
      subtitle: 'Schedule, track and manage compliance audits',
      search: 'Search audits...',
      status: 'Status',
      type: 'Audit Type',
      allStatuses: 'All Statuses',
      allTypes: 'All Types',
      scheduled: 'Scheduled',
      inProgress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
      routine: 'Routine',
      surprise: 'Surprise',
      followUp: 'Follow-up',
      auditId: 'Audit ID',
      business: 'Business',
      auditType: 'Audit Type',
      scheduledDate: 'Scheduled Date',
      actions: 'Actions',
      view: 'View',
      complete: 'Complete',
      cancel: 'Cancel',
      export: 'Export',
      scheduleAudit: 'Schedule New Audit',
      totalAudits: 'Total Audits',
      scheduledAudits: 'Scheduled Audits',
      completedAudits: 'Completed Audits',
      pendingAudits: 'Pending Audits',
      auditDetails: 'Audit Details',
      businessDetails: 'Business Details',
      businessName: 'Business Name',
      contactNumber: 'Contact Number',
      email: 'Email',
      address: 'Address',
      auditInfo: 'Audit Information',
      auditorAssigned: 'Auditor Assigned',
      checklist: 'Checklist Items',
      findings: 'Findings',
      addFindings: 'Add audit findings...',
      completeAudit: 'Complete Audit',
      cancelAudit: 'Cancel Audit',
      save: 'Save',
      daysAgo: 'days ago'
    },
    hi: {
      title: 'अनुपालन ऑडिट प्रबंधन',
      subtitle: 'अनुपालन ऑडिट को शेड्यूल, ट्रैक और प्रबंधित करें',
      search: 'ऑडिट खोजें...',
      status: 'स्थिति',
      type: 'ऑडिट प्रकार',
      allStatuses: 'सभी स्थितियां',
      allTypes: 'सभी प्रकार',
      scheduled: 'निर्धारित',
      inProgress: 'प्रगति में',
      completed: 'पूर्ण',
      cancelled: 'रद्द',
      routine: 'नियमित',
      surprise: 'अचानक',
      followUp: 'फॉलो-अप',
      auditId: 'ऑडिट आईडी',
      business: 'व्यापार',
      auditType: 'ऑडिट प्रकार',
      scheduledDate: 'निर्धारित दिनांक',
      actions: 'कार्य',
      view: 'देखें',
      complete: 'पूर्ण करें',
      cancel: 'रद्द करें',
      export: 'निर्यात',
      scheduleAudit: 'नया ऑडिट शेड्यूल करें',
      totalAudits: 'कुल ऑडिट',
      scheduledAudits: 'निर्धारित ऑडिट',
      completedAudits: 'पूर्ण ऑडिट',
      pendingAudits: 'लंबित ऑडिट',
      auditDetails: 'ऑडिट विवरण',
      businessDetails: 'व्यापार विवरण',
      businessName: 'व्यापार नाम',
      contactNumber: 'संपर्क नंबर',
      email: 'ईमेल',
      address: 'पता',
      auditInfo: 'ऑडिट जानकारी',
      auditorAssigned: 'निर्दिष्ट ऑडिटर',
      checklist: 'चेकलिस्ट आइटम',
      findings: 'निष्कर्ष',
      addFindings: 'ऑडिट निष्कर्ष जोड़ें...',
      completeAudit: 'ऑडिट पूर्ण करें',
      cancelAudit: 'ऑडिट रद्द करें',
      save: 'सहेजें',
      daysAgo: 'दिन पहले'
    }
  };

  const t = translations[language];
  const { audits, statistics } = auditData;

  const statuses = [
    { value: 'all', label: t.allStatuses },
    { value: 'scheduled', label: t.scheduled },
    { value: 'inProgress', label: t.inProgress },
    { value: 'completed', label: t.completed },
    { value: 'cancelled', label: t.cancelled }
  ];

  const auditTypes = [
    { value: 'all', label: t.allTypes },
    { value: 'routine', label: t.routine },
    { value: 'surprise', label: t.surprise },
    { value: 'followUp', label: t.followUp }
  ];

  const filteredAudits = audits.filter(audit => {
    const matchesSearch = audit.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         audit.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || audit.status === selectedStatus;
    const matchesType = selectedType === 'all' || audit.auditType === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { label: t.scheduled, class: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
      inProgress: { label: t.inProgress, class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
      completed: { label: t.completed, class: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
      cancelled: { label: t.cancelled, class: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300' }
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
  };

  const getAuditTypeLabel = (type: string) => {
    const typeLabels = {
      routine: t.routine,
      surprise: t.surprise,
      followUp: t.followUp
    };
    
    return typeLabels[type as keyof typeof typeLabels] || type;
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
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              {t.export}
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              {t.scheduleAudit}
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.totalAudits}</p>
                  <p className="text-3xl font-bold text-foreground">{statistics.total}</p>
                </div>
                <Clipboard className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.scheduledAudits}</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{statistics.scheduled}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.completedAudits}</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{statistics.completed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.pendingAudits}</p>
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{statistics.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audits Management */}
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
                  {auditTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Audits Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.auditId}</TableHead>
                    <TableHead>{t.business}</TableHead>
                    <TableHead>{t.auditType}</TableHead>
                    <TableHead>{t.status}</TableHead>
                    <TableHead>{t.scheduledDate}</TableHead>
                    <TableHead className="text-right">{t.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAudits.map((audit) => {
                    const statusConfig = getStatusBadge(audit.status);
                    
                    return (
                      <TableRow key={audit.id}>
                        <TableCell className="font-medium">{audit.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                              <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{audit.business}</p>
                              <p className="text-sm text-muted-foreground">{audit.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getAuditTypeLabel(audit.auditType)}</TableCell>
                        <TableCell>
                          <Badge className={statusConfig.class}>
                            {statusConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell>{audit.scheduledDate}</TableCell>
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
                                  <DialogTitle>{t.auditDetails} - {audit.id}</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-6 py-4">
                                  <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">{t.businessDetails}</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>{t.businessName}</Label>
                                        <p className="mt-1 text-sm">{audit.businessName}</p>
                                      </div>
                                      <div>
                                        <Label>{t.email}</Label>
                                        <p className="mt-1 text-sm">{audit.email}</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">{t.auditInfo}</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>{t.auditType}</Label>
                                        <p className="mt-1 text-sm">{getAuditTypeLabel(audit.auditType)}</p>
                                      </div>
                                      <div>
                                        <Label>{t.auditorAssigned}</Label>
                                        <p className="mt-1 text-sm">{audit.auditor}</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <Label htmlFor="findings">{t.findings}</Label>
                                    <Textarea id="findings" placeholder={t.addFindings} />
                                  </div>

                                  <div className="flex justify-end space-x-3">
                                    {audit.status === 'scheduled' && (
                                      <Button className="bg-green-600 hover:bg-green-700">
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        {t.completeAudit}
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            {audit.status === 'scheduled' && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                {t.complete}
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