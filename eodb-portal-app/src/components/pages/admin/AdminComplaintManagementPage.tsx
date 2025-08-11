import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  AlertTriangle,
  Search,
  Filter,
  MessageSquare,
  Reply,
  Eye,
  Clock,
  User,
  Tag,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Building2,
  FileText,
  Phone,
  Mail,
  ExternalLink,
  Calendar,
  Home,
  TrendingUp,
  Archive,
  PlusCircle,
  ArrowRight,
  Zap,
  Send,
  MoreVertical
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Separator } from '../../ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { toast } from 'sonner';
import { AdminAPI } from '@/api';

interface AdminComplaintManagementPageProps {
  language: 'en' | 'hi';
  user?: any;
  onNavigate?: (page: string) => void;
  onBack?: () => void;
}

interface Complaint {
  id: string;
  referenceId: string;
  type: 'license' | 'general';
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  submittedBy: string;
  businessName: string;
  contactEmail: string;
  contactPhone: string;
  contactPreference: 'email' | 'phone' | 'both';
  submittedDate: string;
  updatedDate: string;
  department: string;
  assignedTo?: string;
  responses: {
    id: string;
    message: string;
    author: string;
    timestamp: string;
    type: 'response' | 'status-update' | 'note';
  }[];
  licenseApplicationId?: string;
  attachments?: string[];
  escalationLevel: number;
  sla: {
    responseTime: string;
    resolutionTime: string;
    timeRemaining: string;
    isOverdue: boolean;
  };
}

export function AdminComplaintManagementPage({ language, user, onNavigate, onBack }: AdminComplaintManagementPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const translations = {
    en: {
      title: 'Complaint Management Portal',
      subtitle: 'Track, manage, and resolve complaints from business owners efficiently',
      searchPlaceholder: 'Search by complaint ID, business name, or subject...',
      filterByCategory: 'Filter by Category',
      filterByStatus: 'Filter by Status',
      filterByPriority: 'Filter by Priority',
      allCategories: 'All Categories',
      allStatuses: 'All Statuses',
      allPriorities: 'All Priorities',
      backToWelcome: 'Back to Welcome',
      
      // Tabs
      allComplaints: 'All Complaints',
      newComplaints: 'New Complaints',
      inProgress: 'In Progress',
      overdue: 'Overdue',
      resolved: 'Resolved',
      
      // Status Types
      statusTypes: {
        'open': 'Open',
        'in-progress': 'In Progress',
        'resolved': 'Resolved',
        'closed': 'Closed'
      },
      
      // Priority Types
      priorityTypes: {
        'low': 'Low',
        'medium': 'Medium',
        'high': 'High',
        'critical': 'Critical'
      },
      
      // Categories
      categories: {
        'application-delay': 'Application Processing Delay',
        'document-issue': 'Document/Upload Issues',
        'status-update': 'Status Update Problems',
        'payment-issue': 'Payment Related Issues',
        'rejection-appeal': 'Rejection/Appeal Issues',
        'renewal-problem': 'Renewal Problems',
        'technical-issue': 'Technical/Website Issues',
        'account-access': 'Account Access Problems',
        'information-query': 'Information/Guidance Query',
        'service-quality': 'Service Quality Issues',
        'staff-behavior': 'Staff Behavior Complaint',
        'other': 'Other Issues'
      },
      
      // Quick Stats
      totalComplaints: 'Total Complaints',
      openComplaints: 'Open Complaints',
      resolvedToday: 'Resolved Today',
      avgResolutionTime: 'Avg Resolution Time',
      
      // Complaint Details
      complaintId: 'Complaint ID',
      businessName: 'Business Name',
      submittedBy: 'Submitted By',
      submittedOn: 'Submitted On',
      lastUpdated: 'Last Updated',
      priority: 'Priority',
      status: 'Status',
      category: 'Category',
      subject: 'Subject',
      description: 'Description',
      contactInfo: 'Contact Information',
      slaInfo: 'SLA Information',
      responseTime: 'Response Time',
      resolutionTime: 'Resolution Time',
      timeRemaining: 'Time Remaining',
      overdue: 'OVERDUE',
      
      // Actions
      viewDetails: 'View Details',
      respondToComplaint: 'Respond to Complaint',
      markInProgress: 'Mark In Progress',
      markResolved: 'Mark Resolved',
      escalate: 'Escalate',
      assignTo: 'Assign To',
      addNote: 'Add Internal Note',
      viewHistory: 'View History',
      
      // Response Form
      responseTitle: 'Respond to Complaint',
      responseMessage: 'Response Message',
      responsePlaceholder: 'Type your response to the business owner...',
      sendResponse: 'Send Response',
      cancel: 'Cancel',
      sending: 'Sending...',
      
      // Complaint Types
      licenseRelated: 'License/Application Related',
      generalIssue: 'General Issue',
      
      // Time
      minutes: 'minutes ago',
      hours: 'hours ago',
      days: 'days ago',
      weeks: 'weeks ago',
      
      // Success/Error Messages
      responseSuccess: 'Response sent successfully',
      statusUpdateSuccess: 'Complaint status updated successfully',
      responseError: 'Failed to send response. Please try again.',
      statusUpdateError: 'Failed to update status. Please try again.'
    },
    hi: {
      title: 'शिकायत प्रबंधन पोर्टल',
      subtitle: 'व्यापार मालिकों की शिकायतों को कुशलतापूर्वक ट्रैक, प्रबंधित और हल करें',
      searchPlaceholder: 'शिकायत आईडी, व्यापार का नाम या विषय से खोजें...',
      filterByCategory: 'श्रेणी के अनुसार फिल्टर करें',
      filterByStatus: 'स्थिति के अनुसार फिल्टर करें',
      filterByPriority: 'प्राथमिकता के अनुसार फिल्टर करें',
      allCategories: 'सभी श्रेणियां',
      allStatuses: 'सभी स्थितियां',
      allPriorities: 'सभी प्राथमिकताएं',
      backToWelcome: 'स्वागत पृष्ठ पर वापस',
      
      // Tabs
      allComplaints: 'सभी शिकायतें',
      newComplaints: 'नई शिकायतें',
      inProgress: 'प्रगति में',
      overdue: 'अतिदेय',
      resolved: 'समाधानित',
      
      // Status Types
      statusTypes: {
        'open': 'खुला',
        'in-progress': 'प्रगति में',
        'resolved': 'समाधानित',
        'closed': 'बंद'
      },
      
      // Priority Types
      priorityTypes: {
        'low': 'कम',
        'medium': 'मध्यम',
        'high': 'उच्च',
        'critical': 'गंभीर'
      },
      
      // Categories
      categories: {
        'application-delay': 'आवेदन प्रसंस्करण में देरी',
        'document-issue': 'दस्तावेज/अपलोड समस्याएं',
        'status-update': 'स्थिति अपडेट समस्याएं',
        'payment-issue': 'भुगतान संबंधी समस्याएं',
        'rejection-appeal': 'अस्वीकरण/अपील समस्याएं',
        'renewal-problem': 'नवीनीकरण समस्याएं',
        'technical-issue': 'तकनीकी/वेबसाइट समस्याएं',
        'account-access': 'खाता पहुंच समस्याएं',
        'information-query': 'जानकारी/मार्गदर्शन प्रश्न',
        'service-quality': 'सेवा गुणवत्ता समस्याएं',
        'staff-behavior': 'कर्मचारी व्यवहार शिकायत',
        'other': 'अन्य समस्याएं'
      },
      
      // Quick Stats
      totalComplaints: 'कुल शिकायतें',
      openComplaints: 'खुली शिकायतें',
      resolvedToday: 'आज समाधानित',
      avgResolutionTime: 'औसत समाधान समय',
      
      // Complaint Details
      complaintId: 'शिकायत आईडी',
      businessName: 'व्यापार का नाम',
      submittedBy: 'द्वारा प्रस्तुत',
      submittedOn: 'पर प्रस्तुत',
      lastUpdated: 'अंतिम अपडेट',
      priority: 'प्राथमिकता',
      status: 'स्थिति',
      category: 'श्रेणी',
      subject: 'विषय',
      description: 'विवरण',
      contactInfo: 'संपर्क जानकारी',
      slaInfo: 'एसएलए जानकारी',
      responseTime: 'प्रतिक्रिया समय',
      resolutionTime: 'समाधान समय',
      timeRemaining: 'बचा समय',
      overdue: 'अतिदेय',
      
      // Actions
      viewDetails: 'विवरण देखें',
      respondToComplaint: 'शिकायत का जवाब दें',
      markInProgress: 'प्रगति में चिह्नित करें',
      markResolved: 'समाधानित चिह्नित करें',
      escalate: 'एस्केलेट करें',
      assignTo: 'को सौंपें',
      addNote: 'आंतरिक नोट जोड़ें',
      viewHistory: 'इतिहास देखें',
      
      // Response Form
      responseTitle: 'शिकायत का जवाब दें',
      responseMessage: 'प्रतिक्रिया संदेश',
      responsePlaceholder: 'व्यापार मालिक को अपनी प्रतिक्रिया टाइप करें...',
      sendResponse: 'प्रतिक्रिया भेजें',
      cancel: 'रद्द करें',
      sending: 'भेजा जा रहा है...',
      
      // Complaint Types
      licenseRelated: 'लाइसेंस/आवेदन संबंधी',
      generalIssue: 'सामान्य समस्या',
      
      // Time
      minutes: 'मिनट पहले',
      hours: 'घंटे पहले',
      days: 'दिन पहले',
      weeks: 'सप्ताह पहले',
      
      // Success/Error Messages
      responseSuccess: 'प्रतिक्रिया सफलतापूर्वक भेजी गई',
      statusUpdateSuccess: 'शिकायत की स्थिति सफलतापूर्वक अपडेट की गई',
      responseError: 'प्रतिक्रिया भेजने में विफल। कृपया पुनः प्रयास करें।',
      statusUpdateError: 'स्थिति अपडेट करने में विफल। कृपया पुनः प्रयास करें।'
    }
  };

  const t = translations[language];

  // Mock user department for filtering - in real app this would come from user context
  const userDepartment = user?.department || 'mcd'; // Example: Municipal Corporation of Delhi

  const categories = [
    { id: 'all', label: t.allCategories },
    ...Object.entries(t.categories).map(([key, value]) => ({ id: key, label: value }))
  ];

  const statuses = [
    { id: 'all', label: t.allStatuses },
    ...Object.entries(t.statusTypes).map(([key, value]) => ({ id: key, label: value }))
  ];

  const priorities = [
    { id: 'all', label: t.allPriorities },
    ...Object.entries(t.priorityTypes).map(([key, value]) => ({ id: key, label: value }))
  ];

  const [sampleComplaints, setSampleComplaints] = useState<Complaint[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await AdminAPI.listComplaints();
        setSampleComplaints((data || []).map((c: any) => ({
          id: c.id,
          referenceId: c.id,
          type: 'license',
          category: 'other',
          priority: 'medium',
          subject: c.description?.slice(0, 64) || 'Complaint',
          description: c.description || '',
          status: (c.status || 'open').replace('_', '-') as any,
          submittedBy: '—',
          businessName: '—',
          contactEmail: '—',
          contactPhone: '—',
          contactPreference: 'email',
          submittedDate: c.created_at || new Date().toISOString(),
          updatedDate: c.updated_at || new Date().toISOString(),
          department: 'mcd',
          responses: [],
          escalationLevel: 0,
          sla: { responseTime: '24 hours', resolutionTime: '7 days', timeRemaining: '—', isOverdue: false },
        })) as Complaint[]);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // Filter complaints by user's department and current filters
  const filteredComplaints = sampleComplaints.filter(complaint => {
    // Filter by department - only show complaints for user's department
    if (complaint.department !== userDepartment) return false;
    
    // Filter by category
    if (selectedCategory !== 'all' && complaint.category !== selectedCategory) return false;
    
    // Filter by status
    if (selectedStatus !== 'all' && complaint.status !== selectedStatus) return false;
    
    // Filter by priority
    if (selectedPriority !== 'all' && complaint.priority !== selectedPriority) return false;
    
    // Filter by search query
    if (searchQuery && !complaint.referenceId.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !complaint.businessName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !complaint.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !complaint.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Filter by tab
  const getComplaintsByTab = (tab: string) => {
    switch (tab) {
      case 'new':
        return filteredComplaints.filter(c => c.status === 'open' && c.responses.length === 0);
      case 'in-progress':
        return filteredComplaints.filter(c => c.status === 'in-progress');
      case 'overdue':
        return filteredComplaints.filter(c => c.sla.isOverdue);
      case 'resolved':
        return filteredComplaints.filter(c => c.status === 'resolved' || c.status === 'closed');
      default:
        return filteredComplaints;
    }
  };

  const quickStats = [
    { 
      label: t.totalComplaints, 
      value: sampleComplaints.filter(c => c.department === userDepartment).length.toString(), 
      change: '+8%', 
      color: 'bg-blue-50 text-blue-600',
      icon: FileText
    },
    { 
      label: t.openComplaints, 
      value: sampleComplaints.filter(c => c.department === userDepartment && (c.status === 'open' || c.status === 'in-progress')).length.toString(), 
      change: '+12%', 
      color: 'bg-orange-50 text-orange-600',
      icon: AlertTriangle
    },
    { 
      label: t.resolvedToday, 
      value: sampleComplaints.filter(c => c.department === userDepartment && c.status === 'resolved' && c.updatedDate === '2024-01-22').length.toString(), 
      change: '+25%', 
      color: 'bg-green-50 text-green-600',
      icon: CheckCircle
    },
    { 
      label: t.avgResolutionTime, 
      value: '3.2 days', 
      change: '-15%', 
      color: 'bg-purple-50 text-purple-600',
      icon: Clock
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'in-progress':
        return <RefreshCw className="w-4 h-4 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'closed':
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'low':
        return <TrendingUp className="w-4 h-4 text-gray-500 rotate-180" />;
      case 'medium':
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'high':
        return <TrendingUp className="w-4 h-4 text-orange-500" />;
      case 'critical':
        return <Zap className="w-4 h-4 text-red-500" />;
      default:
        return <TrendingUp className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleStatusUpdate = async (complaintId: string, newStatus: string) => {
    setIsSubmitting(true);
    try {
      await AdminAPI.updateComplaintStatus(complaintId, newStatus.replace('-', '_'));
      setSampleComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, status: newStatus as any } : c));
      toast.success(t.statusUpdateSuccess);
    } catch (error) {
      toast.error(t.statusUpdateError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendResponse = async () => {
    if (!responseMessage.trim()) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(t.responseSuccess);
      setResponseMessage('');
      setShowResponseForm(false);
      setSelectedComplaint(null);
    } catch (error) {
      toast.error(t.responseError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayComplaints = getComplaintsByTab(activeTab);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 ${language === 'hi' ? 'lang-hi' : 'lang-en'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h1 className="text-3xl text-foreground mb-2">{t.title}</h1>
              <p className="text-lg text-muted-foreground">{t.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              onClick={() => onNavigate?.('welcome')}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200"
            >
              <Home className="w-4 h-4 mr-2" />
              {t.backToWelcome}
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className="w-5 h-5 text-muted-foreground" />
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${stat.color}`}>
                      {stat.change}
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t.filterByCategory} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder={t.filterByStatus} />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.id} value={status.id}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder={t.filterByPriority} />
            </SelectTrigger>
            <SelectContent>
              {priorities.map((priority) => (
                <SelectItem key={priority.id} value={priority.id}>
                  {priority.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">{t.allComplaints}</TabsTrigger>
                <TabsTrigger value="new">{t.newComplaints}</TabsTrigger>
                <TabsTrigger value="in-progress">{t.inProgress}</TabsTrigger>
                <TabsTrigger value="overdue">{t.overdue}</TabsTrigger>
                <TabsTrigger value="resolved">{t.resolved}</TabsTrigger>
              </TabsList>

              <div className="space-y-4">
                {displayComplaints.map((complaint, index) => (
                  <motion.div
                    key={complaint.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className={`hover:shadow-lg transition-shadow ${complaint.sla.isOverdue ? 'border-red-200 bg-red-50/30' : ''}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="font-medium">
                              {complaint.referenceId}
                            </Badge>
                            <Badge className={getStatusColor(complaint.status)}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(complaint.status)}
                                {t.statusTypes[complaint.status as keyof typeof t.statusTypes]}
                              </div>
                            </Badge>
                            <Badge className={getPriorityColor(complaint.priority)}>
                              <div className="flex items-center gap-1">
                                {getPriorityIcon(complaint.priority)}
                                {t.priorityTypes[complaint.priority as keyof typeof t.priorityTypes]}
                              </div>
                            </Badge>
                            {complaint.sla.isOverdue && (
                              <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                {t.overdue}
                              </Badge>
                            )}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => setSelectedComplaint(complaint)}>
                                <Eye className="w-4 h-4 mr-2" />
                                {t.viewDetails}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedComplaint(complaint);
                                setShowResponseForm(true);
                              }}>
                                <Reply className="w-4 h-4 mr-2" />
                                {t.respondToComplaint}
                              </DropdownMenuItem>
                              {complaint.status === 'open' && (
                                <DropdownMenuItem onClick={() => handleStatusUpdate(complaint.id, 'in-progress')}>
                                  <RefreshCw className="w-4 h-4 mr-2" />
                                  {t.markInProgress}
                                </DropdownMenuItem>
                              )}
                              {(complaint.status === 'open' || complaint.status === 'in-progress') && (
                                <DropdownMenuItem onClick={() => handleStatusUpdate(complaint.id, 'resolved')}>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  {t.markResolved}
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <h3 className="text-lg font-semibold mb-2">{complaint.subject}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">{complaint.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{complaint.businessName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span>{complaint.submittedBy}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>{complaint.submittedDate}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{complaint.sla.timeRemaining}</span>
                          </div>
                        </div>

                        {complaint.responses.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <MessageSquare className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                  {language === 'hi' ? 'नवीनतम प्रतिक्रिया' : 'Latest Response'}
                                </span>
                              </div>
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                {complaint.responses[complaint.responses.length - 1].message}
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {displayComplaints.length === 0 && (
                  <div className="text-center py-12">
                    <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                      {language === 'hi' ? 'कोई शिकायत नहीं मिली' : 'No complaints found'}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'hi' ? 'चयनित फिल्टर के लिए कोई शिकायत उपलब्ध नहीं है।' : 'No complaints available for the selected filters.'}
                    </p>
                  </div>
                )}
              </div>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Priority Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'hi' ? 'प्राथमिकता वितरण' : 'Priority Distribution'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {priorities.slice(1).map((priority) => {
                  const count = filteredComplaints.filter(c => c.priority === priority.id).length;
                  const percentage = filteredComplaints.length > 0 ? (count / filteredComplaints.length) * 100 : 0;
                  return (
                    <div key={priority.id} className="flex items-center justify-between">
                      <span className="text-sm">{priority.label}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getPriorityColor(priority.id).includes('red') ? 'bg-red-500' : 
                              getPriorityColor(priority.id).includes('orange') ? 'bg-orange-500' :
                              getPriorityColor(priority.id).includes('blue') ? 'bg-blue-500' : 'bg-gray-500'}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'hi' ? 'हाल की गतिविधि' : 'Recent Activity'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium">
                      {language === 'hi' ? 'शिकायत समाधानित' : 'Complaint Resolved'}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    C-2024-003 - {language === 'hi' ? '2 घंटे पहले' : '2 hours ago'}
                  </p>
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <RefreshCw className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">
                      {language === 'hi' ? 'नई प्रतिक्रिया भेजी गई' : 'New Response Sent'}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    C-2024-002 - {language === 'hi' ? '5 घंटे पहले' : '5 hours ago'}
                  </p>
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">
                      {language === 'hi' ? 'नई शिकायत प्राप्त' : 'New Complaint Received'}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    C-2024-004 - {language === 'hi' ? '1 दिन पहले' : '1 day ago'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Complaint Details Modal */}
        {selectedComplaint && !showResponseForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      {t.viewDetails}
                    </CardTitle>
                    <Button variant="ghost" onClick={() => setSelectedComplaint(null)}>
                      ×
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">{t.complaintId}</label>
                        <p className="text-lg font-medium">{selectedComplaint.referenceId}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">{t.businessName}</label>
                        <p>{selectedComplaint.businessName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">{t.submittedBy}</label>
                        <p>{selectedComplaint.submittedBy}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">{t.contactInfo}</label>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span>{selectedComplaint.contactEmail}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{selectedComplaint.contactPhone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">{t.status}</label>
                        <Badge className={getStatusColor(selectedComplaint.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(selectedComplaint.status)}
                            {t.statusTypes[selectedComplaint.status as keyof typeof t.statusTypes]}
                          </div>
                        </Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">{t.priority}</label>
                        <Badge className={getPriorityColor(selectedComplaint.priority)}>
                          <div className="flex items-center gap-1">
                            {getPriorityIcon(selectedComplaint.priority)}
                            {t.priorityTypes[selectedComplaint.priority as keyof typeof t.priorityTypes]}
                          </div>
                        </Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">{t.submittedOn}</label>
                        <p>{selectedComplaint.submittedDate}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">{t.lastUpdated}</label>
                        <p>{selectedComplaint.updatedDate}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t.subject}</label>
                    <p className="text-lg">{selectedComplaint.subject}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t.description}</label>
                    <p className="whitespace-pre-wrap">{selectedComplaint.description}</p>
                  </div>

                  {selectedComplaint.responses.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-3 block">
                        {language === 'hi' ? 'प्रतिक्रिया इतिहास' : 'Response History'}
                      </label>
                      <div className="space-y-3">
                        {selectedComplaint.responses.map((response) => (
                          <div key={response.id} className="bg-muted/30 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{response.author}</span>
                              <span className="text-sm text-muted-foreground">{response.timestamp}</span>
                            </div>
                            <p className="text-sm">{response.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={() => {
                        setShowResponseForm(true);
                      }}
                      className="flex-1"
                    >
                      <Reply className="w-4 h-4 mr-2" />
                      {t.respondToComplaint}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedComplaint(null)}
                      className="flex-1"
                    >
                      {t.cancel}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Response Form Modal */}
        {showResponseForm && selectedComplaint && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Reply className="w-5 h-5" />
                    {t.responseTitle}
                  </CardTitle>
                  <CardDescription>
                    {t.complaintId}: {selectedComplaint.referenceId} - {selectedComplaint.subject}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.responseMessage}</label>
                    <Textarea
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      placeholder={t.responsePlaceholder}
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={handleSendResponse}
                      disabled={!responseMessage.trim() || isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          {t.sending}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          {t.sendResponse}
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowResponseForm(false);
                        setResponseMessage('');
                      }}
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {t.cancel}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}