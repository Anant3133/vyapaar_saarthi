import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  User, 
  Lock, 
  Mail, 
  Building2, 
  Globe,
  ChevronDown,
  Sun,
  Moon,
  Shield,
  Crown,
  Settings,
  CheckCircle,
  BadgeIcon,
  Building,
  Briefcase,
  KeyRound
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { departments } from '../../utils/department-mapping';

interface AdminLoginPageProps {
  onLogin: (user: any) => void;
  onBack: () => void;
  language: 'en' | 'hi';
  setLanguage: (language: 'en' | 'hi') => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export function AdminLoginPage({ onLogin, onBack, language, setLanguage, darkMode, setDarkMode }: AdminLoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('login');
  
  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const translations = {
    en: {
      title: 'Government Employee Portal',
      subtitle: 'Secure Government Employee Login',
      welcomeBack: 'Welcome, Government Employee',
      signInDescription: 'Access the government portal with full administrative privileges',
      emailAddress: 'Official Email Address',
      password: 'Secure Password',
      signIn: 'Sign In',
      or: 'or',
      forgotPassword: 'Forgot Password?',
      rememberMe: 'Remember me',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      demoAccounts: 'Demo Employee Accounts',
      tryDemo: 'Try with demo account',
      selectDemo: 'Select a demo government employee account to explore the portal',
      loginWith: 'Login as',
      govInitiative: 'Government of NCT of Delhi Initiative',
      secureLogin: 'Maximum Security Login',
      dataProtection: 'Advanced Data Protection',
      support247: '24/7 Priority Support',
      employeeLevels: {
        senior: 'Senior Officer',
        officer: 'Department Officer',
        assistant: 'Assistant Officer'
      },
      securityNotice: 'All administrative actions are logged and monitored for security compliance.'
    },
    hi: {
      title: 'सरकारी कर्मचारी पोर्टल',
      subtitle: 'सुरक्षित सरकारी कर्मचारी लॉगिन',
      welcomeBack: 'स्वागत है, सरकारी कर्मचारी',
      signInDescription: 'पूर्ण प्रशासनिक विशेषाधिकारों के साथ सरकारी पोर्टल तक पहुंच',
      emailAddress: 'आधिकारिक ईमेल',
      password: 'सुरक्षित पासवर्ड',
      signIn: 'साइन इन करें',
      or: 'या',
      forgotPassword: 'पासवर्ड भूल गए?',
      rememberMe: 'मुझे याद रखें',
      lightMode: 'लाइट मोड',
      darkMode: 'डार्क मोड',
      demoAccounts: 'डेमो कर्मचारी खाते',
      tryDemo: 'डेमो खाते के साथ आज़माएं',
      selectDemo: 'सरकारी पोर्टल का अन्वेषण करने के लिए एक डेमो सरकारी कर्मचारी खाता चुनें',
      loginWith: 'के रूप में लॉगिन करें',
      govInitiative: 'राष्ट्रीय राजधानी क्षेत्र दिल्ली सरकार की पहल',
      secureLogin: 'अधिकतम सुरक्षा लॉगिन',
      dataProtection: 'उन्नत डेटा सुरक्षा',
      support247: '24/7 प्राथमिकता सहायता',
      employeeLevels: {
        senior: 'वरिष्ठ अधिकारी',
        officer: 'विभाग अधिकारी',
        assistant: 'सहायक अधिकारी'
      },
      securityNotice: 'सभी प्रशासनिक कार्यों को सुरक्षा अनुपालन के लिए लॉग और निगरानी की जाती है।'
    }
  };

  const t = translations[language];

  // Demo government employee accounts - department specific
  const demoAccounts = [
    {
      id: 1,
      name: language === 'hi' ? 'राजेश कुमार' : 'Rajesh Kumar',
      email: 'rajesh.kumar@mcd.delhi.gov.in',
      department: 'mcd',
      departmentName: departments.find(d => d.id === 'mcd')?.name[language] || 'MCD',
      position: language === 'hi' ? 'वरिष्ठ लाइसेंसिंग अधिकारी' : 'Senior Licensing Officer',
      level: 'senior',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      verified: true,
      lastLogin: '2024-01-15 09:30',
      permissions: ['trade_license_approval', 'health_license_review', 'building_permit_oversight'],
      specialization: language === 'hi' ? 'व्यापार लाइसेंस और स्वास्थ्य परमिट' : 'Trade Licenses & Health Permits'
    },
    {
      id: 2,
      name: language === 'hi' ? 'प्रीति सिंह' : 'Preeti Singh',
      email: 'preeti.singh@labour.delhi.gov.in',
      department: 'labour-dept',
      departmentName: departments.find(d => d.id === 'labour-dept')?.name[language] || 'Labour Department',
      position: language === 'hi' ? 'फैक्टरी लाइसेंस अधिकारी' : 'Factory License Officer',
      level: 'officer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1a2?w=40&h=40&fit=crop&crop=face',
      verified: true,
      lastLogin: '2024-01-15 08:45',
      permissions: ['factory_license_review', 'shop_establishment_approval', 'worker_safety_oversight'],
      specialization: language === 'hi' ? 'फैक्टरी लाइसेंस और श्रम नियम' : 'Factory Licenses & Labour Regulations'
    },
    {
      id: 3,
      name: language === 'hi' ? 'अनिल शर्मा' : 'Anil Sharma',
      email: 'anil.sharma@fire.delhi.gov.in',
      department: 'fire-services',
      departmentName: departments.find(d => d.id === 'fire-services')?.name[language] || 'Fire Services',
      position: language === 'hi' ? 'अग्नि सुरक्षा निरीक्षक' : 'Fire Safety Inspector',
      level: 'officer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      verified: true,
      lastLogin: '2024-01-15 10:15',
      permissions: ['fire_safety_inspection', 'noc_approval', 'safety_compliance_review'],
      specialization: language === 'hi' ? 'अग्नि सुरक्षा और आपातकालीन तैयारी' : 'Fire Safety & Emergency Preparedness'
    },
    {
      id: 4,
      name: language === 'hi' ? 'सुनीता गुप्ता' : 'Sunita Gupta',
      email: 'sunita.gupta@dpcc.delhi.gov.in',
      department: 'dpcc',
      departmentName: departments.find(d => d.id === 'dpcc')?.name[language] || 'DPCC',
      position: language === 'hi' ? 'पर्यावरण अधिकारी' : 'Environmental Officer',
      level: 'senior',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      verified: true,
      lastLogin: '2024-01-14 16:20',
      permissions: ['pollution_control_review', 'environmental_clearance', 'waste_management_oversight'],
      specialization: language === 'hi' ? 'प्रदूषण नियंत्रण और पर्यावरण सुरक्षा' : 'Pollution Control & Environmental Protection'
    },
    {
      id: 5,
      name: language === 'hi' ? 'डॉ. विनोद मिश्रा' : 'Dr. Vinod Mishra',
      email: 'vinod.mishra@health.delhi.gov.in',
      department: 'health-services',
      departmentName: departments.find(d => d.id === 'health-services')?.name[language] || 'Health Services',
      position: language === 'hi' ? 'ड्रग कंट्रोल अधिकारी' : 'Drug Control Officer',
      level: 'senior',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=40&h=40&fit=crop&crop=face',
      verified: true,
      lastLogin: '2024-01-15 11:30',
      permissions: ['drug_license_approval', 'pharmacy_inspection', 'medical_compliance_review'],
      specialization: language === 'hi' ? 'औषधि नियंत्रण और फार्मेसी विनियमन' : 'Drug Control & Pharmacy Regulation'
    },
    {
      id: 6,
      name: language === 'hi' ? 'महेश यादव' : 'Mahesh Yadav',
      email: 'mahesh.yadav@fssai.delhi.gov.in',
      department: 'fssai',
      departmentName: departments.find(d => d.id === 'fssai')?.name[language] || 'FSSAI',
      position: language === 'hi' ? 'खाद्य सुरक्षा अधिकारी' : 'Food Safety Officer',
      level: 'officer',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
      verified: true,
      lastLogin: '2024-01-14 14:45',
      permissions: ['food_license_approval', 'restaurant_inspection', 'food_safety_compliance'],
      specialization: language === 'hi' ? 'खाद्य सुरक्षा और स्वच्छता नियम' : 'Food Safety & Hygiene Regulations'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail.trim() || !loginPassword) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Demo government employee user data
    const govUser = {
      id: '1',
      name: 'Government Employee',
      email: loginEmail,
      role: 'government' as const,
      department: 'mcd',
      position: 'Senior Officer',
      phoneNumber: '+91 98765 43210',
      verified: true,
      memberSince: '2024-01-15',
      permissions: ['system_admin', 'user_management', 'dept_oversight', 'security_admin'],
      managedDepartments: ['All Departments'],
      lastLogin: new Date().toISOString()
    };
    
    onLogin(govUser);
    setIsLoading(false);
  };

  const handleDemoLogin = async (demoAccount: any) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const govUser = {
      id: demoAccount.id.toString(),
      name: demoAccount.name,
      email: demoAccount.email,
      role: 'government' as const,
      department: demoAccount.department,
      position: demoAccount.position,
      phoneNumber: '+91 98765 43210',
      verified: demoAccount.verified,
      memberSince: '2024-01-15',
      permissions: demoAccount.permissions,
      managedDepartments: [demoAccount.departmentName],
      lastLogin: demoAccount.lastLogin,
      specialization: demoAccount.specialization
    };
    
    onLogin(govUser);
    setIsLoading(false);
  };

  const getEmployeeLevelColor = (level: string) => {
    switch (level) {
      case 'senior': return 'text-purple-700 bg-purple-100 border-purple-200 dark:text-purple-300 dark:bg-purple-900/30 dark:border-purple-700';
      case 'officer': return 'text-blue-700 bg-blue-100 border-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-700';
      case 'assistant': return 'text-green-700 bg-green-100 border-green-200 dark:text-green-300 dark:bg-green-900/30 dark:border-green-700';
      default: return 'text-gray-700 bg-gray-100 border-gray-200 dark:text-gray-300 dark:bg-gray-900/30 dark:border-gray-700';
    }
  };

  const getDepartmentColor = (departmentId: string) => {
    const colors = {
      'mcd': 'text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-300 dark:bg-orange-900/30 dark:border-orange-700',
      'labour-dept': 'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-700',
      'fire-services': 'text-red-700 bg-red-50 border-red-200 dark:text-red-300 dark:bg-red-900/30 dark:border-red-700',
      'dpcc': 'text-green-700 bg-green-50 border-green-200 dark:text-green-300 dark:bg-green-900/30 dark:border-green-700',
      'health-services': 'text-teal-700 bg-teal-50 border-teal-200 dark:text-teal-300 dark:bg-teal-900/30 dark:border-teal-700',
      'fssai': 'text-purple-700 bg-purple-50 border-purple-200 dark:text-purple-300 dark:bg-purple-900/30 dark:border-purple-700'
    };
    return colors[departmentId as keyof typeof colors] || 'text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-300 dark:bg-gray-900/30 dark:border-gray-700';
  };

  const floatingParticles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className={`min-h-screen relative overflow-hidden ${language === 'hi' ? 'lang-hi' : 'lang-en'} bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900`}>
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-sm dark:from-green-400/10 dark:to-blue-400/10"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header with Navigation */}
      <motion.header 
        className="absolute top-0 left-0 right-0 z-20 bg-white/10 dark:bg-slate-900/10 backdrop-blur-md border-b border-white/20 dark:border-slate-700/30"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Back Button and Brand */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="hover:bg-white/20 dark:hover:bg-slate-800/30 text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    {t.title}
                  </h1>
                  <p className="text-xs text-muted-foreground">{t.subtitle}</p>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Controls */}
            <div className="flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              <motion.button
                className="p-2 hover:bg-white/20 dark:hover:bg-slate-800/30 rounded-lg transition-colors text-foreground"
                whileHover={{ scale: 1.1 }}
                onClick={() => setDarkMode(!darkMode)}
                title={darkMode ? t.lightMode : t.darkMode}
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-600" />
                )}
              </motion.button>

              {/* Language Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    className="flex items-center space-x-2 bg-white/20 dark:bg-slate-800/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/30 dark:border-slate-700/50 cursor-pointer"
                    whileHover={{ scale: 1.05, backgroundColor: darkMode ? 'rgba(51, 65, 85, 0.4)' : 'rgba(255,255,255,0.3)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-foreground">
                      {language === 'hi' ? 'हिंदी' : 'English'}
                    </span>
                    <ChevronDown className="w-3 h-3 text-foreground" />
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem 
                    onClick={() => setLanguage('en')}
                    className={language === 'en' ? 'bg-accent' : ''}
                  >
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setLanguage('hi')}
                    className={language === 'hi' ? 'bg-accent' : ''}
                  >
                    हिंदी
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex min-h-screen pt-20">
        {/* Left Side - Government Branding */}
        <motion.div 
          className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-8 relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="max-w-md text-center space-y-8">
            {/* Government Badge */}
            <motion.div 
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-600/10 via-blue-600/10 to-green-600/10 dark:from-green-600/20 dark:via-blue-600/20 dark:to-green-600/20 backdrop-blur-sm rounded-full px-6 py-3 border border-green-200/30 dark:border-green-700/40"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
                {t.govInitiative}
              </span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700 text-xs">
                {language === 'hi' ? 'कर्मचारी' : 'EMPLOYEE'}
              </Badge>
            </motion.div>

            {/* Main Branding */}
            <div>
              <motion.h1 
                className="text-5xl font-bold mb-4"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-green-600 dark:from-green-400 dark:via-blue-400 dark:to-green-400 bg-clip-text text-transparent">
                  Vyapaar सारथी
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {language === 'hi' ? 'सरकारी कर्मचारी पोर्टल' : 'Government Employee Portal'}
              </motion.p>
            </div>

            {/* Features */}
            <motion.div 
              className="grid grid-cols-1 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {[
                { icon: KeyRound, text: t.secureLogin },
                { icon: Shield, text: t.dataProtection },
                { icon: Crown, text: t.support247 }
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-foreground">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Security Notice */}
            <motion.div 
              className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4 text-sm text-amber-800 dark:text-amber-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <p>{t.securityNotice}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div 
          className="w-full lg:w-1/2 flex items-center justify-center p-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="w-full max-w-2xl bg-card/50 dark:bg-slate-800/50 backdrop-blur-sm border border-border/50 dark:border-slate-700/50 shadow-2xl">
            <CardHeader className="space-y-1">
              <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">{t.signIn}</TabsTrigger>
                  <TabsTrigger value="demo">{t.demoAccounts}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-4">
                  <div className="text-center space-y-2">
                    <CardTitle className="text-2xl text-foreground">{t.welcomeBack}</CardTitle>
                    <p className="text-muted-foreground text-sm">{t.signInDescription}</p>
                  </div>
                  
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{t.emailAddress}</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="employee@delhi.gov.in"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="pl-10 bg-background dark:bg-slate-900/50 border-border dark:border-slate-600 text-foreground"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{t.password}</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter secure password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="pl-10 pr-10 bg-background dark:bg-slate-900/50 border-border dark:border-slate-600 text-foreground"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center space-x-2 text-foreground">
                        <input type="checkbox" className="rounded border-border dark:border-slate-600" />
                        <span>{t.rememberMe}</span>
                      </label>
                      <button type="button" className="text-green-600 dark:text-green-400 hover:underline">
                        {t.forgotPassword}
                      </button>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 dark:from-green-500 dark:to-blue-500 dark:hover:from-green-600 dark:hover:to-blue-600 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing In...' : t.signIn}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="demo" className="space-y-4">
                  <div className="text-center space-y-2">
                    <CardTitle className="text-2xl text-foreground">{t.tryDemo}</CardTitle>
                    <p className="text-muted-foreground text-sm">{t.selectDemo}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
                    {demoAccounts.map((account) => (
                      <motion.div
                        key={account.id}
                        className="p-4 border dark:border-slate-600 rounded-lg hover:bg-accent/50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDemoLogin(account)}
                      >
                        <div className="flex items-start space-x-4">
                          <img 
                            src={account.avatar} 
                            alt={account.name}
                            className="w-12 h-12 rounded-full border-2 border-green-200 dark:border-green-700 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium truncate text-foreground">{account.name}</h4>
                              {account.verified && (
                                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{account.position}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-2">
                              <Badge className={getDepartmentColor(account.department)}>
                                {account.departmentName}
                              </Badge>
                              <Badge className={getEmployeeLevelColor(account.level)}>
                                {t.employeeLevels[account.level as keyof typeof t.employeeLevels]}
                              </Badge>
                            </div>
                            
                            <p className="text-xs text-muted-foreground mb-2">{account.specialization}</p>
                            
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">
                                {language === 'hi' ? 'अंतिम लॉगिन' : 'Last Login'}
                              </p>
                              <p className="text-xs font-mono text-foreground">{account.lastLogin}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}