import { Badge } from '../../../ui/badge';
import { 
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  AlertTriangle,
  FileText
} from 'lucide-react';

export const getStatusBadge = (status: string, t: any) => {
  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: t.pendingReview },
    approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: t.approved },
    rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, label: t.rejected },
    underReview: { color: 'bg-blue-100 text-blue-800', icon: Eye, label: t.underReview },
    documentsPending: { color: 'bg-orange-100 text-orange-800', icon: AlertTriangle, label: t.documentsPending }
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

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'border-l-red-500';
    case 'medium': return 'border-l-yellow-500';
    case 'low': return 'border-l-green-500';
    default: return 'border-l-gray-500';
  }
};

export const getStatIcon = (index: number) => {
  const icons = [FileText, Clock, CheckCircle, AlertTriangle];
  return icons[index] || FileText;
};

export const filterApplications = (applications: any[], searchTerm: string, selectedStatus: string, selectedScheme: string, selectedTab: string) => {
  return applications.filter(app => {
    const matchesSearch = searchTerm === '' || 
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    const matchesScheme = selectedScheme === 'all' || app.scheme === selectedScheme;
    
    if (selectedTab !== 'all') {
      return matchesSearch && matchesStatus && matchesScheme && app.status === selectedTab;
    }
    
    return matchesSearch && matchesStatus && matchesScheme;
  });
};

export const getSchemeName = (scheme: string, t: any) => {
  const schemeMap: { [key: string]: string } = {
    startupIndia: t.startupIndia,
    msmeDigital: t.msmeDigital,
    womenEntrepreneur: t.womenEntrepreneur,
    skillDevelopment: t.skillDevelopment,
    exportPromotion: t.exportPromotion
  };
  return schemeMap[scheme] || scheme;
};