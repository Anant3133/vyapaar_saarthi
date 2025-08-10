import { useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Building,
  AlertCircle,
  Flag,
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
import { violationsData } from './constants/AdminComplianceConstants';
import { getViolationStatusBadge, getViolationSeverityBadge, getViolationSeverityIcon, getViolationTypeLabel } from './components/ViolationsHelpers';

interface AdminComplianceViolationsProps {
  language: 'en' | 'hi';
  user: any;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export function AdminComplianceViolations({ language, user, onNavigate, onBack }: AdminComplianceViolationsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const translations = {
    en: {
      title: 'Compliance Violations Management',
      subtitle: 'Track and manage compliance violations across all licenses',
      search: 'Search violations...',
      export: 'Export',
      totalViolations: 'Total Violations',
      openViolations: 'Open Violations',
      criticalViolations: 'Critical Violations',
      resolvedToday: 'Resolved Today',
      violationId: 'Violation ID',
      business: 'Business',
      violationType: 'Violation Type',
      severity: 'Severity',
      status: 'Status',
      reportedDate: 'Reported Date',
      actions: 'Actions',
      view: 'View',
      resolve: 'Resolve'
    },
    hi: {
      title: 'अनुपालन उल्लंघन प्रबंधन',
      subtitle: 'सभी लाइसेंसों में अनुपालन उल्लंघनों को ट्रैक और प्रबंधित करें',
      search: 'उल्लंघन खोजें...',
      export: 'निर्यात',
      totalViolations: 'कुल उल्लंघन',
      openViolations: 'खुले उल्लंघन',
      criticalViolations: 'गंभीर उल्लंघन',
      resolvedToday: 'आज हल किए गए',
      violationId: 'उल्लंघन आईडी',
      business: 'व्यापार',
      violationType: 'उल्लंघन प्रकार',
      severity: 'गंभीरता',
      status: 'स्थिति',
      reportedDate: 'रिपोर्ट दिनांक',
      actions: 'कार्य',
      view: 'देखें',
      resolve: 'हल करें'
    }
  };

  const t = translations[language];
  const { violations, statistics } = violationsData;

  const filteredViolations = violations.filter(violation => {
    const matchesSearch = violation.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         violation.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || violation.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || violation.status === selectedStatus;
    const matchesType = selectedType === 'all' || violation.violationType === selectedType;
    
    return matchesSearch && matchesSeverity && matchesStatus && matchesType;
  });

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
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.totalViolations}</p>
                  <p className="text-3xl font-bold text-foreground">{statistics.total}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.openViolations}</p>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">{statistics.open}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.criticalViolations}</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{statistics.critical}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.resolvedToday}</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{statistics.resolvedToday}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Violations Table */}
        <Card>
          <CardHeader>
            <CardTitle>{t.title}</CardTitle>
          </CardHeader>
          <CardContent>
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
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.violationId}</TableHead>
                    <TableHead>{t.business}</TableHead>
                    <TableHead>{t.violationType}</TableHead>
                    <TableHead>{t.severity}</TableHead>
                    <TableHead>{t.status}</TableHead>
                    <TableHead>{t.reportedDate}</TableHead>
                    <TableHead className="text-right">{t.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredViolations.map((violation) => {
                    const severityConfig = getViolationSeverityBadge(violation.severity, language);
                    const statusConfig = getViolationStatusBadge(violation.status, language);
                    
                    return (
                      <TableRow key={violation.id}>
                        <TableCell className="font-medium">{violation.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                              <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{violation.business}</p>
                              <p className="text-sm text-muted-foreground">{violation.licenseNumber}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getViolationTypeLabel(violation.violationType, language)}</TableCell>
                        <TableCell>
                          <Badge className={severityConfig.class}>
                            <div className="flex items-center space-x-1">
                              {getViolationSeverityIcon(violation.severity)}
                              <span>{severityConfig.label}</span>
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusConfig.class}>
                            {statusConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">{violation.reportedDate}</p>
                            <p className="text-xs text-muted-foreground">
                              {violation.daysAgo} {violation.daysAgo === 1 ? 'day' : 'days'} ago
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              {t.view}
                            </Button>
                            
                            {violation.status === 'open' && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                {t.resolve}
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