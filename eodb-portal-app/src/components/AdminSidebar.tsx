import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  FileText, 
  Shield, 
  Bell, 
  Crown, 
  FolderOpen, 
  Settings, 
  Users,
  BarChart3,
  MessageSquare,
  Calendar,
  ClipboardList,
  Search,
  TrendingUp,
  Database,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Landmark,
  User,
  LogOut,
  AlertCircle,
  CheckCircle,
  Clock,
  Home,
  Award,
  FileCheck,
  FileX,
  Monitor,
  AlertTriangle,
  BookOpen,
  Clipboard
} from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';

interface AdminSidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  language: 'en' | 'hi';
  user: any;
  onBackToWelcome: () => void;
}

export function AdminSidebar({ 
  collapsed, 
  setCollapsed, 
  language, 
  user,
  onBackToWelcome 
}: AdminSidebarProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const translations = {
    en: {
      navigation: 'Navigation',
      dashboard: 'Admin Dashboard',
      applications: 'Applications',
      applicationManagement: 'Application Management',
      applicationTracking: 'Application Tracking',
      compliance: 'Compliance',
      complianceMonitoring: 'Compliance Monitoring',
      licensing: 'Licensing',
      licenseTypes: 'License Types',
      licenseIssuance: 'License Issuance',
      licenseRenewals: 'License Renewals',
      licenseMonitoring: 'License Monitoring',
      complianceViolations: 'Violations',
      complianceReports: 'Compliance Reports',
      complianceAudits: 'Audits',
      notifications: 'Notifications',
      schemes: 'Schemes & Programs',
      schemesAnalytics: 'Schemes Analytics',
      schemesApplications: 'Scheme Applications',
      documents: 'Documents',
      documentsVault: 'Document Vault',
      settings: 'Settings',
      support: 'Support & Community',
      forum: 'Community Forum',
      complaintManagement: 'Complaint Management',
      backToWelcome: 'Back to Welcome',
      profile: user?.name || 'Government Employee',
      department: user?.department || 'Department',
      position: user?.position || 'Position',
      adminLevel: user?.adminLevel || 'Level',
      permissions: 'Permissions',
      lastLogin: 'Last Login',
      pendingReviews: 'Pending Reviews',
      activeAlerts: 'Active Alerts'
    },
    hi: {
      navigation: 'नेवगैशन',
      dashboard: 'एडमिन डैशबोर्ड',
      applications: 'आवेदन',
      applicationManagement: 'आवेदन प्रबंधन',
      applicationTracking: 'आवेदन ट्रैकिंग',
      compliance: 'अनुपालन',
      complianceMonitoring: 'अनुपालन निगरानी',
      licensing: 'लाइसेंसिंग',
      licenseTypes: 'लाइसेंस प्रकार',
      licenseIssuance: 'लाइसेंस जारी करना',
      licenseRenewals: 'लाइसेंस नवीनीकरण',
      licenseMonitoring: 'लाइसेंस निगरानी',
      complianceViolations: 'उल्लंघन',
      complianceReports: 'अनुपालन रिपोर्ट',
      complianceAudits: 'ऑडिट',
      notifications: 'अधिसूचनाएं',
      schemes: 'योजनाएं और कार्यक्रम',
      schemesAnalytics: 'योजना एनालिटिक्स',
      schemesApplications: 'योजना आवेदन',
      documents: 'दस्तावेज़',
      documentsVault: 'दस्तावेज़ वॉल्ट',
      settings: 'सेटिंग्स',
      support: 'सहायता और समुदाय',
      forum: 'सामुदायिक मंच',
      complaintManagement: 'शिकायत प्रबंधन',
      backToWelcome: 'स्वागत पृष्ठ पर वापस',
      profile: user?.name || 'सरकारी कर्मचारी',
      department: user?.department || 'विभाग',
      position: user?.position || 'पद',
      adminLevel: user?.adminLevel || 'स्तर',
      permissions: 'अनुमतियां',
      lastLogin: 'अंतिम लॉगिन',
      pendingReviews: 'लंबित समीक्षाएं',
      activeAlerts: 'सक्रिय अलर्ट'
    }
  };

  const t = translations[language];

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on initial load
    
    return () => window.removeEventListener('resize', handleResize);
  }, [setCollapsed]);

  const menuItems = [
    {
      id: 'dashboard',
      label: t.dashboard,
      icon: LayoutDashboard,
      path: '/admin/dashboard',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 'applications',
      label: t.applications,
      icon: FileText,
      color: 'text-green-600 dark:text-green-400',
      subItems: [
        { id: 'application-management', label: t.applicationManagement, path: '/admin/applications', icon: ClipboardList },
        { id: 'application-tracking', label: t.applicationTracking, path: '/admin/tracking', icon: Search }
      ]
    },
    {
      id: 'compliance',
      label: t.compliance,
      icon: Shield,
      path: '/admin/compliance',
      color: 'text-purple-600 dark:text-purple-400',
      subItems: [
        { id: 'compliance-violations', label: t.complianceViolations, path: '/admin/compliance-violations', icon: AlertTriangle },
        { id: 'compliance-reports', label: t.complianceReports, path: '/admin/compliance-reports', icon: BookOpen },
        { id: 'compliance-audits', label: t.complianceAudits, path: '/admin/compliance-audits', icon: Clipboard }
      ]
    },
    {
      id: 'licensing',
      label: t.licensing,
      icon: Award,
      path: '/admin/licensing',
      color: 'text-indigo-600 dark:text-indigo-400',
      subItems: [
        { id: 'license-types', label: t.licenseTypes, path: '/admin/license-types', icon: FileText },
        { id: 'license-issuance', label: t.licenseIssuance, path: '/admin/license-issuance', icon: FileCheck },
        { id: 'license-renewals', label: t.licenseRenewals, path: '/admin/license-renewals', icon: Clock },
        { id: 'license-monitoring', label: t.licenseMonitoring, path: '/admin/license-monitoring', icon: Monitor }
      ]
    },
    {
      id: 'notifications',
      label: t.notifications,
      icon: Bell,
      path: '/admin/notifications',
      color: 'text-yellow-600 dark:text-yellow-400',
      badge: '12'
    },
    {
      id: 'schemes',
      label: t.schemes,
      icon: Crown,
      color: 'text-orange-600 dark:text-orange-400',
      subItems: [
        { id: 'schemes-main', label: 'Schemes Overview', path: '/admin/schemes', icon: Crown },
        { id: 'schemes-analytics', label: t.schemesAnalytics, path: '/admin/schemes-analytics', icon: BarChart3 },
        { id: 'schemes-applications', label: t.schemesApplications, path: '/admin/schemes-applications', icon: FileText }
      ]
    },
    {
      id: 'documents',
      label: t.documents,
      icon: FolderOpen,
      path: '/admin/documents',
      color: 'text-teal-600 dark:text-teal-400'
    }
  ];

  const supportItems = [
    {
      id: 'forum',
      label: t.forum,
      icon: Users,
      path: '/forum',
      color: 'text-purple-600 dark:text-purple-400',
      badge: 'New'
    },
    {
      id: 'complaint-management',
      label: t.complaintManagement,
      icon: AlertTriangle,
      path: '/admin/complaint-management',
      color: 'text-red-600 dark:text-red-400'
    }
  ];

  const handleItemClick = (item: any) => {
    if (item.subItems) {
      setExpandedSection(expandedSection === item.id ? null : item.id);
    } else {
      navigate(item.path);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    }
  };

  const handleSubItemClick = (subItem: any) => {
    navigate(subItem.path);
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (item: any) => {
    if (item.path && location.pathname === item.path) return true;
    if (item.subItems) {
      return item.subItems.some((subItem: any) => location.pathname === subItem.path);
    }
    return false;
  };

  // Mock data for demonstration
  const adminStats = {
    pendingReviews: 23,
    activeAlerts: 7,
    permissions: user?.permissions?.length || 0
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-sidebar dark:bg-slate-900 border-r border-sidebar-border dark:border-slate-700 transition-all duration-300 z-40 flex flex-col ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border dark:border-slate-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                <Landmark className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-sidebar-foreground dark:text-slate-100">
                  {language === 'hi' ? 'सरकारी पोर्टल' : 'Government Portal'}
                </h2>
                <p className="text-xs text-sidebar-accent-foreground dark:text-slate-400">
                  {language === 'hi' ? 'प्रशासन डैशबोर्ड' : 'Admin Dashboard'}
                </p>
              </div>
            </motion.div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0 hover:bg-sidebar-accent dark:hover:bg-slate-700"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* User Profile */}
      {!collapsed && user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border-b border-sidebar-border dark:border-slate-700 flex-shrink-0"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                {user.name?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-sidebar-foreground dark:text-slate-100 truncate">
                {t.profile}
              </h3>
              <div className="flex items-center space-x-1">
                <p className="text-xs text-sidebar-accent-foreground dark:text-slate-400 truncate">
                  {t.department}
                </p>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 text-xs px-1">
                  {user.adminLevel || 'Admin'}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-sidebar-accent dark:bg-slate-800 rounded-lg p-2">
              <div className="text-sidebar-accent-foreground dark:text-slate-400">{t.pendingReviews}</div>
              <div className="font-semibold text-sidebar-foreground dark:text-slate-100 flex items-center">
                {adminStats.pendingReviews}
                <Clock className="w-3 h-3 ml-1 text-orange-500" />
              </div>
            </div>
            <div className="bg-sidebar-accent dark:bg-slate-800 rounded-lg p-2">
              <div className="text-sidebar-accent-foreground dark:text-slate-400">{t.activeAlerts}</div>
              <div className="font-semibold text-sidebar-foreground dark:text-slate-100 flex items-center">
                {adminStats.activeAlerts}
                <AlertCircle className="w-3 h-3 ml-1 text-red-500" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation - FIXED SCROLLING AREA */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-always-visible">
          <div className="p-4 space-y-2">
            {!collapsed && (
              <h3 className="text-xs font-semibold text-sidebar-accent-foreground dark:text-slate-400 uppercase tracking-wider mb-3">
                {t.navigation}
              </h3>
            )}
            
            {/* Main Menu Items */}
            {menuItems.map((item) => {
              const isItemActive = isParentActive(item);
              const isExpanded = expandedSection === item.id;
              
              return (
                <div key={item.id}>
                  <motion.button
                    whileHover={{ scale: collapsed ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 relative ${
                      isItemActive
                        ? 'bg-sidebar-primary dark:bg-slate-700 text-sidebar-primary-foreground dark:text-slate-100 shadow-sm'
                        : 'text-sidebar-accent-foreground dark:text-slate-300 hover:bg-sidebar-accent dark:hover:bg-slate-700/50 hover:text-sidebar-foreground dark:hover:text-slate-100'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 flex-shrink-0 ${isItemActive ? 'text-sidebar-primary-foreground dark:text-slate-100' : item.color || 'text-sidebar-accent-foreground dark:text-slate-400'}`} />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-sm font-medium truncate">{item.label}</span>
                        {item.badge && (
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs px-1 flex-shrink-0">
                            {item.badge}
                          </Badge>
                        )}
                        {item.subItems && (
                          <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        )}
                      </>
                    )}
                    {collapsed && item.badge && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </motion.button>
                  
                  {/* Sub Items */}
                  {!collapsed && item.subItems && (
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-8 mt-1 space-y-1"
                        >
                          {item.subItems.map((subItem: any) => (
                            <motion.button
                              key={subItem.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleSubItemClick(subItem)}
                              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                                isActive(subItem.path)
                                  ? 'bg-sidebar-primary/80 dark:bg-slate-600 text-sidebar-primary-foreground dark:text-slate-100'
                                  : 'text-sidebar-accent-foreground dark:text-slate-400 hover:bg-sidebar-accent dark:hover:bg-slate-700/30 hover:text-sidebar-foreground dark:hover:text-slate-200'
                              }`}
                            >
                              <subItem.icon className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm truncate">{subItem.label}</span>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>

          <Separator className="mx-4" />

          {/* Support & Community Section */}
          <div className="p-4 space-y-2">
            {!collapsed && (
              <h3 className="text-xs font-semibold text-sidebar-accent-foreground dark:text-slate-400 uppercase tracking-wider mb-3">
                {t.support}
              </h3>
            )}
            
            {supportItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: collapsed ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 relative ${
                  isActive(item.path)
                    ? 'bg-sidebar-primary dark:bg-slate-700 text-sidebar-primary-foreground dark:text-slate-100 shadow-sm'
                    : 'text-sidebar-accent-foreground dark:text-slate-300 hover:bg-sidebar-accent dark:hover:bg-slate-700/50 hover:text-sidebar-foreground dark:hover:text-slate-100'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive(item.path) ? 'text-sidebar-primary-foreground dark:text-slate-100' : item.color || 'text-sidebar-accent-foreground dark:text-slate-400'}`} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-sm font-medium truncate">{item.label}</span>
                    {item.badge && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs px-1 flex-shrink-0">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
                {collapsed && item.badge && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </motion.button>
            ))}
          </div>

          <Separator className="mx-4" />

          {/* Settings & Logout */}
          <div className="p-4 space-y-2 pb-6">
            <motion.button
              whileHover={{ scale: collapsed ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/admin/settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                isActive('/admin/settings')
                  ? 'bg-sidebar-primary dark:bg-slate-700 text-sidebar-primary-foreground dark:text-slate-100 shadow-sm'
                  : 'text-sidebar-accent-foreground dark:text-slate-300 hover:bg-sidebar-accent dark:hover:bg-slate-700/50 hover:text-sidebar-foreground dark:hover:text-slate-100'
              }`}
            >
              <Settings className={`w-5 h-5 flex-shrink-0 ${isActive('/admin/settings') ? 'text-sidebar-primary-foreground dark:text-slate-100' : 'text-gray-600 dark:text-gray-400'}`} />
              {!collapsed && <span className="text-sm font-medium truncate">{t.settings}</span>}
            </motion.button>

            <motion.button
              whileHover={{ scale: collapsed ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBackToWelcome}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 text-sidebar-accent-foreground dark:text-slate-300 hover:bg-sidebar-accent dark:hover:bg-slate-700/50 hover:text-sidebar-foreground dark:hover:text-slate-100"
            >
              <Home className="w-5 h-5 flex-shrink-0 text-gray-600 dark:text-gray-400" />
              {!collapsed && <span className="text-sm font-medium truncate">{t.backToWelcome}</span>}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}