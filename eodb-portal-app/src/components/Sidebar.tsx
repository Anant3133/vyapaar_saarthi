import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  FileText, 
  BarChart3, 
  Shield, 
  MessageSquare, 
  Settings, 
  HelpCircle, 
  Upload, 
  Download, 
  ClipboardList,
  Crown,
  AlertCircle,
  Phone,
  ChevronLeft,
  ChevronRight,
  User,
  Building2,
  Calendar,
  Briefcase,
  Landmark,
  Users
} from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  language: 'en' | 'hi';
  user: any;
}

export function Sidebar({ collapsed, setCollapsed, language, user }: SidebarProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const translations = {
    en: {
      navigation: 'Navigation',
      dashboard: 'Dashboard',
      applications: 'Applications',
      licenseApplication: 'License Application',
      licenseRenewal: 'License Renewal', 
      companyRegistration: 'Company Registration',
      compliance: 'Compliance Tracker',
      schemes: 'Schemes & Incentives',
      analytics: 'Analytics',
      documents: 'Documents',
      uploadDocuments: 'Upload Documents',
      downloadLicense: 'Download License',
      reports: 'Reports',
      support: 'Support',
      chatbot: 'AI Assistant',
      forum: 'Community Forum',
      complaints: 'Complaints',
      contact: 'Contact Us',
      settings: 'Settings',
      account: 'Account',
      profile: user?.name || 'User Profile',
      businessType: user?.businessType || 'Business',
      location: user?.location || 'Location',
      verified: 'Verified',
      memberSince: 'Member since',
      totalApplications: 'Total Applications',
      completedApplications: 'Completed'
    },
    hi: {
      navigation: 'नेवगैशन',
      dashboard: 'डैशबोर्ड',
      applications: 'आवेदन',
      licenseApplication: 'लाइसेंस आवेदन',
      licenseRenewal: 'लाइसेंस नवीनीकरण',
      companyRegistration: 'कंपनी पंजीकरण',
      compliance: 'अनुपालन ट्रैकर',
      schemes: 'योजनाएं और प्रोत्साहन',
      analytics: 'एनालिटिक्स',
      documents: 'दस्तावेज़',
      uploadDocuments: 'दस्तावेज़ अपलोड करें',
      downloadLicense: 'लाइसेंस डाउनलोड करें',
      reports: 'रिपोर्ट्स',
      support: 'सहायता',
      chatbot: 'एआई सहायक',
      forum: 'सामुदायिक मंच',
      complaints: 'शिकायतें',
      contact: 'संपर्क करें',
      settings: 'सेटिंग्स',
      account: 'खाता',
      profile: user?.name || 'उपयोगकर्ता प्रोफाइल',
      businessType: user?.businessType || 'व्यवसाय',
      location: user?.location || 'स्थान',
      verified: 'सत्यापित',
      memberSince: 'सदस्य बने',
      totalApplications: 'कुल आवेदन',
      completedApplications: 'पूर्ण'
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
      icon: Home,
      path: '/dashboard',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 'applications',
      label: t.applications,
      icon: FileText,
      color: 'text-green-600 dark:text-green-400',
      subItems: [
        { id: 'license-application', label: t.licenseApplication, path: '/license-application', icon: Shield },
        { id: 'license-renewal', label: t.licenseRenewal, path: '/license-renewal', icon: Calendar },
        { id: 'company-registration', label: t.companyRegistration, path: '/company-registration', icon: Building2 }
      ]
    },
    {
      id: 'compliance',
      label: t.compliance,
      icon: Shield,
      path: '/compliance',
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: 'schemes',
      label: t.schemes,
      icon: Crown,
      path: '/schemes',
      color: 'text-orange-600 dark:text-orange-400'
    },
    {
      id: 'analytics',
      label: t.analytics,
      icon: BarChart3,
      path: '/analytics',
      color: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      id: 'documents',
      label: t.documents,
      icon: ClipboardList,
      color: 'text-teal-600 dark:text-teal-400',
      subItems: [
        { id: 'upload-documents', label: t.uploadDocuments, path: '/upload-documents', icon: Upload },
        { id: 'download-license', label: t.downloadLicense, path: '/download-license', icon: Download }
      ]
    },
    {
      id: 'reports',
      label: t.reports,
      icon: Briefcase,
      path: '/reports',
      color: 'text-gray-600 dark:text-gray-400'
    }
  ];

  const supportItems = [
    {
      id: 'chatbot',
      label: t.chatbot,
      icon: MessageSquare,
      path: '/chatbot',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 'forum',
      label: t.forum,
      icon: Users,
      path: '/forum',
      color: 'text-purple-600 dark:text-purple-400',
      badge: 'New'
    },
    {
      id: 'complaints',
      label: t.complaints,
      icon: AlertCircle,
      path: '/complaints',
      color: 'text-red-600 dark:text-red-400'
    },
    {
      id: 'contact',
      label: t.contact,
      icon: Phone,
      path: '/contact',
      color: 'text-green-600 dark:text-green-400'
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <Landmark className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-sidebar-foreground dark:text-slate-100">
                  {language === 'hi' ? 'व्यापार सारथी' : 'Vyapaar Sarthi'}
                </h2>
                <p className="text-xs text-sidebar-accent-foreground dark:text-slate-400">
                  {language === 'hi' ? 'ईओडीबी पोर्टल' : 'EODB Portal'}
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-sidebar-foreground dark:text-slate-100 truncate">
                {t.profile}
              </h3>
              <div className="flex items-center space-x-1">
                <p className="text-xs text-sidebar-accent-foreground dark:text-slate-400 truncate">
                  {t.businessType}
                </p>
                {user.verified && (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs px-1">
                    {t.verified}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-sidebar-accent dark:bg-slate-800 rounded-lg p-2">
              <div className="text-sidebar-accent-foreground dark:text-slate-400">{t.totalApplications}</div>
              <div className="font-semibold text-sidebar-foreground dark:text-slate-100">{user.totalApplications || 0}</div>
            </div>
            <div className="bg-sidebar-accent dark:bg-slate-800 rounded-lg p-2">
              <div className="text-sidebar-accent-foreground dark:text-slate-400">{t.completedApplications}</div>
              <div className="font-semibold text-sidebar-foreground dark:text-slate-100">{user.completedApplications || 0}</div>
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
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                      isItemActive
                        ? 'bg-sidebar-primary dark:bg-slate-700 text-sidebar-primary-foreground dark:text-slate-100 shadow-sm'
                        : 'text-sidebar-accent-foreground dark:text-slate-300 hover:bg-sidebar-accent dark:hover:bg-slate-700/50 hover:text-sidebar-foreground dark:hover:text-slate-100'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 flex-shrink-0 ${isItemActive ? 'text-sidebar-primary-foreground dark:text-slate-100' : item.color || 'text-sidebar-accent-foreground dark:text-slate-400'}`} />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-sm font-medium truncate">{item.label}</span>
                        {item.subItems && (
                          <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        )}
                      </>
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

          {/* Support Section */}
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

          {/* Settings */}
          <div className="p-4 pb-6">
            <motion.button
              whileHover={{ scale: collapsed ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                isActive('/settings')
                  ? 'bg-sidebar-primary dark:bg-slate-700 text-sidebar-primary-foreground dark:text-slate-100 shadow-sm'
                  : 'text-sidebar-accent-foreground dark:text-slate-300 hover:bg-sidebar-accent dark:hover:bg-slate-700/50 hover:text-sidebar-foreground dark:hover:text-slate-100'
              }`}
            >
              <Settings className={`w-5 h-5 flex-shrink-0 ${isActive('/settings') ? 'text-sidebar-primary-foreground dark:text-slate-100' : 'text-gray-600 dark:text-gray-400'}`} />
              {!collapsed && <span className="text-sm font-medium truncate">{t.settings}</span>}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}