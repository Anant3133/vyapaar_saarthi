import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Moon, 
  Sun, 
  Globe, 
  Menu,
  Settings,
  LogOut,
  ChevronDown,
  Search,
  UserCircle,
  HelpCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';

interface TopNavbarProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  language: 'en' | 'hi';
  setLanguage: (language: 'en' | 'hi') => void;
  toggleSidebar: () => void;
  user?: any;
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

export function TopNavbar({ 
  darkMode, 
  setDarkMode, 
  language, 
  setLanguage, 
  toggleSidebar, 
  user,
  onLogout,
  onNavigate 
}: TopNavbarProps) {
  const navigate = useNavigate();

  const translations = {
    en: {
      title: 'Vyapaar सारथी',
      subtitle: 'Government Dashboard',
      searchPlaceholder: 'Search applications, schemes, documents...',
      notifications: 'Notifications',
      unreadMessages: 'unread',
      viewAllNotifications: 'View All',
      viewProfile: 'View Profile',
      settings: 'Settings',
      helpSupport: 'Help & Support',
      logout: 'Logout',
      logoutConfirm: 'Are you sure you want to logout?',
      businessOwner: 'Business Owner',
      notificationList: [
        { title: 'License Application Approved', message: 'Your trade license has been approved', time: '2h ago' },
        { title: 'Compliance Reminder', message: 'Submit your quarterly compliance report', time: '1d ago' },
        { title: 'New Scheme Available', message: 'Startup India benefits now available', time: '3d ago' },
        { title: 'Payment Confirmation', message: 'Registration fee payment received', time: '5d ago' }
      ]
    },
    hi: {
      title: 'Vyapaar सारथी',
      subtitle: 'सरकारी डैशबोर्ड',
      searchPlaceholder: 'आवेदन, योजनाएं, दस्तावेज़ खोजें...',
      notifications: 'सूचनाएं',
      unreadMessages: 'अपठित',
      viewAllNotifications: 'सभी देखें',
      viewProfile: 'प्रोफ़ाइल देखें',
      settings: 'सेटिंग्स',
      helpSupport: 'सहायता',
      logout: 'लॉगआउट',
      logoutConfirm: 'क्या आप वाकई लॉगआउट करना चाहते हैं?',
      businessOwner: 'व्यवसाय स्वामी',
      notificationList: [
        { title: 'लाइसेंस आवेदन स्वीकृत', message: 'आपका व्यापार लाइसेंस स्वीकृत हो गया है', time: '2 घंटे पहले' },
        { title: 'अनुपालन रिमाइंडर', message: 'अपनी त्रैमासिक अनुपालन रिपोर्ट जमा करें', time: '1 दिन पहले' },
        { title: 'नई योजना उपलब्ध', message: 'स्टार्टअप इंडिया लाभ अब उपलब्ध', time: '3 दिन पहले' },
        { title: 'भुगतान पुष्टि', message: 'पंजीकरण शुल्क भुगतान प्राप्त', time: '5 दिन पहले' }
      ]
    }
  };

  const t = translations[language];

  // Function to translate user names and business types
  const translateUserName = (name: string) => {
    if (!name) return language === 'hi' ? 'उपयोगकर्ता' : 'User';
    
    const nameTranslations: { [key: string]: { hi: string; en: string } } = {
      'Rajesh Kumar': { hi: 'राजेश कुमार', en: 'Rajesh Kumar' },
      'Priya Sharma': { hi: 'प्रिया शर्मा', en: 'Priya Sharma' },
      'Amit Singh': { hi: 'अमित सिंह', en: 'Amit Singh' },
      'Sunita Patel': { hi: 'सुनीता पटेल', en: 'Sunita Patel' },
      'Demo User': { hi: 'डेमो उपयोगकर्ता', en: 'Demo User' }
    };
    
    return nameTranslations[name]?.[language] || name;
  };

  const translateBusinessType = (businessType: string, userRole?: string) => {
    // For government users, show their role instead of business type
    if (userRole === 'government') {
      return language === 'hi' ? 'सरकारी कर्मचारी' : 'Govt Employee';
    }
    
    if (!businessType) return t.businessOwner;
    
    const businessTypeTranslations: { [key: string]: { hi: string; en: string } } = {
      'Manufacturing': { hi: 'निर्माण', en: 'Manufacturing' },
      'Technology Startup': { hi: 'प्रौद्योगिकी स्टार्टअप', en: 'Technology Startup' },
      'Retail Business': { hi: 'खुदरा व्यवसाय', en: 'Retail Business' },
      'Healthcare Services': { hi: 'स्वास्थ्य सेवाएं', en: 'Healthcare Services' },
      'Consulting': { hi: 'परामर्श', en: 'Consulting' },
      'Restaurant': { hi: 'रेस्टोरेंट', en: 'Restaurant' },
      'E-commerce': { hi: 'ई-कॉमर्स', en: 'E-commerce' },
      'Business Owner': { hi: 'व्यवसाय स्वामी', en: 'Business Owner' }
    };
    
    return businessTypeTranslations[businessType]?.[language] || businessType;
  };

  const [notifications] = useState([
    { id: 1, title: t.notificationList[0].title, message: t.notificationList[0].message, time: t.notificationList[0].time, unread: true },
    { id: 2, title: t.notificationList[1].title, message: t.notificationList[1].message, time: t.notificationList[1].time, unread: true },
    { id: 3, title: t.notificationList[2].title, message: t.notificationList[2].message, time: t.notificationList[2].time, unread: false },
    { id: 4, title: t.notificationList[3].title, message: t.notificationList[3].message, time: t.notificationList[3].time, unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleProfileClick = () => {
    const settingsPath = user?.role === 'government' ? '/admin/settings' : '/settings';
    navigate(settingsPath);
  };

  const handleSettingsClick = () => {
    const settingsPath = user?.role === 'government' ? '/admin/settings' : '/settings';
    navigate(settingsPath);
  };

  const handleLogout = () => {
    if (confirm(t.logoutConfirm)) {
      onLogout?.();
    }
  };

  return (
    <header 
      className={`h-14 bg-background/95 backdrop-blur-sm border-b border-border/50 flex items-center px-3 lg:px-6 relative z-40 ${language === 'hi' ? 'lang-hi' : 'lang-en'}`}
    >
      {/* Left Section - Compact */}
      <div className="flex items-center gap-2 min-w-0 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="lg:hidden h-8 w-8 hover:bg-accent flex-shrink-0"
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <div className="hidden md:block min-w-0 max-w-48">
          <h1 className="text-sm leading-none truncate">{t.title}</h1>
          <p className="text-xs text-muted-foreground leading-none mt-0.5 truncate">{t.subtitle}</p>
        </div>
      </div>

      {/* Center Section - Search (Hidden on smaller screens) */}
      <div className="hidden xl:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t.searchPlaceholder}
            className="h-8 pl-9 bg-accent/50 border-border/50 focus:bg-background transition-colors text-sm"
          />
        </div>
      </div>

      {/* Right Section - Compact */}
      <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
        {/* Language Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent">
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-24">
            <DropdownMenuItem 
              onClick={() => setLanguage('en')}
              className={`text-xs ${language === 'en' ? 'bg-accent' : ''}`}
            >
              English
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setLanguage('hi')}
              className={`text-xs ${language === 'hi' ? 'bg-accent' : ''}`}
            >
              हिंदी
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          className="h-8 w-8 hover:bg-accent"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs min-w-0 border-background"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-4 py-3 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-sm">{t.notifications}</h3>
                <span className="text-xs text-muted-foreground">{unreadCount} {t.unreadMessages}</span>
              </div>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-accent/50 cursor-pointer border-b border-border last:border-b-0 ${
                    notification.unread ? 'bg-accent/20' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      notification.unread ? 'bg-blue-600' : 'bg-transparent'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate mb-1">{notification.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-border">
              <Button variant="ghost" size="sm" className="w-full text-xs h-8">
                {t.viewAllNotifications}
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* User Profile - Compact */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 px-2 hover:bg-accent gap-2 min-w-0 max-w-44">
              <Avatar className="h-6 w-6 flex-shrink-0">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face" />
                <AvatarFallback className="text-xs">
                  {translateUserName(user?.name)?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left min-w-0 flex-1">
                <p className="text-xs leading-none truncate">{translateUserName(user?.name)}</p>
                <p className="text-xs text-muted-foreground leading-none mt-0.5 truncate">
                  {translateBusinessType(user?.businessType, user?.role)}
                </p>
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground flex-shrink-0 hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <div className="px-3 py-2 border-b border-border">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                  <AvatarFallback className="text-xs">
                    {translateUserName(user?.name)?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{translateUserName(user?.name)}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
            </div>
            
            <DropdownMenuItem onClick={handleProfileClick} className="text-sm">
              <UserCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              {t.viewProfile}
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={handleSettingsClick} className="text-sm">
              <Settings className="h-4 w-4 mr-2 flex-shrink-0" />
              {t.settings}
            </DropdownMenuItem>
            
            <DropdownMenuItem className="text-sm">
              <HelpCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              {t.helpSupport}
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={handleLogout} className="text-destructive text-sm">
              <LogOut className="h-4 w-4 mr-2 flex-shrink-0" />
              {t.logout}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}