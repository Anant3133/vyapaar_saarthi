import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  ArrowLeft,
  Home,
  MoreVertical,
  User,
  Calendar,
  Building2,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { translations, sampleApplications, getQuickStats } from './constants/AdminSchemesApplicationsConstants';
import { 
  getStatusBadge, 
  getPriorityColor, 
  getStatIcon, 
  filterApplications, 
  getSchemeName 
} from './components/AdminSchemesApplicationsHelpers';
import { AdminAPI } from '@/api';

interface AdminSchemesApplicationsProps {
  language: 'en' | 'hi';
  user: any;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export function AdminSchemesApplications({ language, user, onNavigate, onBack }: AdminSchemesApplicationsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedScheme, setSelectedScheme] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');
  const [apps, setApps] = useState<any[]>([]);

  const t = translations[language];

  // Load scheme applications from admin endpoint
  // Maps backend fields into UI shape consumed by helpers
  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await AdminAPI.getAllApplications();
        if (!mounted) return;
        const mapped = (data || []).map((a: any) => ({
          id: a.id,
          applicantName: a.User?.full_name || '—',
          company: a.User?.full_name || '—',
          scheme: 'startupIndia', // placeholder key for helper; actual name below
          schemeName: a.GovernmentScheme?.name || a.GovernmentScheme?.title || '—',
          amount: a.requested_amount ? `₹${a.requested_amount}` : '—',
          applicationDate: a.application_date || a.createdAt || new Date().toISOString(),
          status: a.status === 'in_review' ? 'underReview' : a.status === 'applied' ? 'pending' : (a.status || 'pending'),
          location: '—',
          priority: 'medium',
        }));
        setApps(mapped);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => { mounted = false; };
  }, [language]);

  const quickStats = React.useMemo(() => {
    const total = apps.length;
    const pending = apps.filter(a => a.status === 'pending' || a.status === 'pendingReview').length;
    const approvedToday = apps.filter(a => a.status === 'approved').length;
    return [
      { label: t.totalApplications, value: String(total), change: '+0', color: 'bg-blue-50 text-blue-600' },
      { label: t.pendingApplications, value: String(pending), change: '+0', color: 'bg-yellow-50 text-yellow-600' },
      { label: t.approvedToday, value: String(approvedToday), change: '+0', color: 'bg-green-50 text-green-600' },
      { label: t.avgProcessingTime, value: '—', change: '0', color: 'bg-purple-50 text-purple-600' },
    ];
  }, [apps, t]);

  const filteredApplications = filterApplications(apps, searchTerm, selectedStatus, selectedScheme, selectedTab);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="space-y-1">
          <motion.h1 
            className="text-3xl flex items-center space-x-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span>{t.title}</span>
          </motion.h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => onNavigate('welcome')}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200"
          >
            <Home className="w-4 h-4 mr-2" />
            {t.backToWelcome}
          </Button>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToSchemes}
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            {t.downloadReport}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {quickStats.map((stat, index) => {
          const IconComponent = getStatIcon(index);
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.change} {language === 'hi' ? 'इस सप्ताह' : 'this week'}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      {/* Filters */}
      <motion.div 
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t.searchApplications}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t.filterByStatus} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allStatuses}</SelectItem>
              <SelectItem value="pending">{t.pendingReview}</SelectItem>
              <SelectItem value="approved">{t.approved}</SelectItem>
              <SelectItem value="rejected">{t.rejected}</SelectItem>
              <SelectItem value="underReview">{t.underReview}</SelectItem>
              <SelectItem value="documentsPending">{t.documentsPending}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedScheme} onValueChange={setSelectedScheme}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={t.filterByScheme} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allSchemes}</SelectItem>
              <SelectItem value="startupIndia">{t.startupIndia}</SelectItem>
              <SelectItem value="msmeDigital">{t.msmeDigital}</SelectItem>
              <SelectItem value="womenEntrepreneur">{t.womenEntrepreneur}</SelectItem>
              <SelectItem value="skillDevelopment">{t.skillDevelopment}</SelectItem>
              <SelectItem value="exportPromotion">{t.exportPromotion}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Applications Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">{t.allApplications}</TabsTrigger>
            <TabsTrigger value="pending">{t.pending}</TabsTrigger>
            <TabsTrigger value="underReview">{t.underReview}</TabsTrigger>
            <TabsTrigger value="approved">{t.approved}</TabsTrigger>
            <TabsTrigger value="rejected">{t.rejected}</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.applicationId}</TableHead>
                        <TableHead>{t.applicantName}</TableHead>
                        <TableHead>{t.schemeName}</TableHead>
                        <TableHead>{t.amount}</TableHead>
                        <TableHead>{t.applicationDate}</TableHead>
                        <TableHead>{t.status}</TableHead>
                        <TableHead>{t.actions}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.map((application, index) => (
                        <TableRow key={application.id} className={`border-l-4 ${getPriorityColor(application.priority)}`}>
                          <TableCell>
                            <div className="font-medium">{application.id}</div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{application.applicantName}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Building2 className="w-3 h-3" />
                                <span>{application.company}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span>{application.location}</span>
                              </div>
                            </div>
                          </TableCell>
                           <TableCell>
                             <span className="font-medium">{application.schemeName || getSchemeName(application.scheme, t)}</span>
                           </TableCell>
                          <TableCell>
                            <span className="font-medium text-green-600">{application.amount}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{new Date(application.applicationDate).toLocaleDateString()}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(application.status, t)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                {t.viewDetails}
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="ghost">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>{t.approve}</DropdownMenuItem>
                                  <DropdownMenuItem>{t.reject}</DropdownMenuItem>
                                  <DropdownMenuItem>{t.requestInfo}</DropdownMenuItem>
                                  <DropdownMenuItem>{t.download}</DropdownMenuItem>
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
        </Tabs>
      </motion.div>
    </div>
  );
}