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
  Zap,
  CheckCircle,
  Badge as BadgeIcon,
  Building,
  Briefcase
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface GovernmentLoginPageProps {
  onLogin: (user: any) => void;
  onBack: () => void;
  language: 'en' | 'hi';
  setLanguage: (language: 'en' | 'hi') => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export function GovernmentLoginPage({ onLogin, onBack, language, setLanguage, darkMode, setDarkMode }: GovernmentLoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('login');
  
  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const translations = {
    en: {
      title: 'Government Portal Access',
      subtitle: 'Department Personnel Login',
      welcomeBack: 'Welcome, Government Official',
      signInDescription: 'Access your departmental dashboard and manage applications',
      emailAddress: 'Official Email Address',
      password: 'Password',
      signIn: 'Sign In',
      or: 'or',
      forgotPassword: 'Forgot Password?',
      rememberMe: 'Remember me',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      demoAccounts: 'Demo Accounts',
      tryDemo: 'Try with demo account',
      selectDemo: 'Select a demo department account to explore the portal',
      loginWith: 'Login as',
      govInitiative: 'Government of NCT of Delhi Initiative',
      secureLogin: 'Secure Government Login',
      dataProtection: 'Data Protection Compliant',
      support247: '24/7 IT Support',
      departments: {
        health: 'Health & Safety Department',
        municipal: 'Municipal Corporation / Trade License',
        environment: 'Environmental Clearance Board'
      },
      positions: {
        officer: 'Department Officer',
        senior: 'Senior Officer',
        head: 'Department Head'
      }
    },
    hi: {
      title: 'सरकारी पोर्टल पहुंच',
      subtitle: 'विभागीय कर्मचारी लॉगिन',
      welcomeBack: 'स्वागत है, सरकारी अधिकारी',
      signInDescription: 'अपने विभागीय डैशबोर्ड तक पहुंचें और आवेदनों का प्रबंधन करें',
      emailAddress: 'आधिकारिक ईमेल पता',
      password: 'पासवर्ड',
      signIn: 'साइन इन करें',
      or: 'या',
      forgotPassword: 'पासवर्ड भूल गए?',
      rememberMe: 'मुझे याद रखें',
      lightMode: 'लाइट मोड',
      darkMode: 'डार्क मोड',
      demoAccounts: 'डेमो खाते',
      tryDemo: 'डेमो खाते के साथ आज़माएं',
      selectDemo: 'पोर्टल का अन्वेषण करने के लिए एक डेमो विभाग खाता चुनें',
      loginWith: 'के रूप में लॉगिन करें',
      govInitiative: 'राष्ट्रीय राजधानी क्षेत्र दिल्ली सरकार की पहल',
      secureLogin: 'सुरक्षित सरकारी लॉगिन',
      dataProtection: 'डेटा सुरक्षा अनुपालित',
      support247: '24/7 आईटी सहायता',
      departments: {
        health: 'स्वास्थ्य और सुरक्षा विभाग',
        municipal: 'नगर निगम / व्यापार लाइसेंस',
        environment: 'पर्यावरण मंजूरी बोर्ड'
      },
      positions: {
        officer: 'विभाग अधिकारी',
        senior: 'वरिष्ठ अधिकारी',
        head: 'विभाग प्रमुख'
      }
    }
  };

  const t = translations[language];

  // Demo government accounts
  const demoAccounts = [
    {
      id: 1,
      name: language === 'hi' ? 'डॉ. अनिल शर्मा' : 'Dr. Anil Sharma',
      email: 'anil.sharma@health.delhi.gov.in',
      department: 'Health & Safety Department',
      departmentHi: 'स्वास्थ्य और सुरक्षा विभाग',
      position: language === 'hi' ? 'विभाग प्रमुख' : 'Department Head',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face',
      verified: true,
      pendingApplications: 15,
      completedReviews: 45
    },
    {
      id: 2,
      name: language === 'hi' ? 'सुमित्रा पटेल' : 'Sumitra Patel',
      email: 'sumitra.patel@municipal.delhi.gov.in',
      department: 'Municipal Corporation / Trade License',
      departmentHi: 'नगर निगम / व्यापार लाइसेंस',
      position: language === 'hi' ? 'वरिष्ठ अधिकारी' : 'Senior Officer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1a2?w=40&h=40&fit=crop&crop=face',
      verified: true,
      pendingApplications: 28,
      completedReviews: 120
    },
    {
      id: 3,
      name: language === 'hi' ? 'राजेश कुमार' : 'Rajesh Kumar',
      email: 'rajesh.kumar@environment.delhi.gov.in',
      department: 'Environmental Clearance Board',
      departmentHi: 'पर्यावरण मंजूरी बोर्ड',
      position: language === 'hi' ? 'विभाग अधिकारी' : 'Department Officer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      verified: true,
      pendingApplications: 12,
      completedReviews: 78
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail.trim() || !loginPassword) {
      alert(language === 'hi' ? 'कृपया सभी फ़ील्ड भरें' : 'Please fill all fields');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Demo government user data
    const govUser = {
      id: '1',
      name: 'Government Official',
      email: loginEmail,
      role: 'government' as const,
      department: 'Health & Safety Department',
      position: 'Department Officer',
      phoneNumber: '+91 98765 43210',
      verified: true,
      memberSince: '2024-01-15',
      permissions: ['review_applications', 'approve_licenses', 'manage_complaints']
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
      permissions: ['review_applications', 'approve_licenses', 'manage_complaints']
    };
    
    onLogin(govUser);
    setIsLoading(false);
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
    <div className={`min-h-screen relative overflow-hidden ${language === 'hi' ? 'lang-hi' : 'lang-en'}`}>
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-sm"
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
        className="absolute top-0 left-0 right-0 z-20 bg-white/10 backdrop-blur-md border-b border-white/20"
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
                className="hover:bg-white/20"
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
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
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
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/30 cursor-pointer"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">
                      {language === 'hi' ? 'हिंदी' : 'English'}
                    </span>
                    <ChevronDown className="w-3 h-3" />
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
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-600/10 via-blue-600/10 to-green-600/10 backdrop-blur-sm rounded-full px-6 py-3 border border-green-200/30"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {t.govInitiative}
              </span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                {language === 'hi' ? 'सत्यापित' : 'Verified'}
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
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                  Vyapaar सारथी
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {language === 'hi' ? 'सरकारी पोर्टल' : 'Government Portal'}
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
                { icon: Shield, text: t.secureLogin },
                { icon: Crown, text: t.dataProtection },
                { icon: CheckCircle, text: t.support247 }
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-foreground">{feature.text}</span>
                </motion.div>
              ))}
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
          <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border border-border/50 shadow-2xl">
            <CardHeader className="space-y-1">
              <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">{t.signIn}</TabsTrigger>
                  <TabsTrigger value="demo">{t.demoAccounts}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-4">
                  <div className="text-center space-y-2">
                    <CardTitle className="text-2xl">{t.welcomeBack}</CardTitle>
                    <p className="text-muted-foreground text-sm">{t.signInDescription}</p>
                  </div>
                  
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t.emailAddress}</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="officer@dept.delhi.gov.in"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t.password}</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="pl-10 pr-10"
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
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>{t.rememberMe}</span>
                      </label>
                      <button type="button" className="text-green-600 hover:underline">
                        {t.forgotPassword}
                      </button>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing In...' : t.signIn}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="demo" className="space-y-4">
                  <div className="text-center space-y-2">
                    <CardTitle className="text-2xl">{t.tryDemo}</CardTitle>
                    <p className="text-muted-foreground text-sm">{t.selectDemo}</p>
                  </div>
                  
                  <div className="space-y-3">
                    {demoAccounts.map((account) => (
                      <motion.div
                        key={account.id}
                        className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDemoLogin(account)}
                      >
                        <div className="flex items-center space-x-3">
                          <img 
                            src={account.avatar} 
                            alt={account.name}
                            className="w-12 h-12 rounded-full border-2 border-green-200"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{account.name}</h4>
                              {account.verified && (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {language === 'hi' ? account.departmentHi : account.department}
                            </p>
                            <p className="text-xs text-muted-foreground">{account.position}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{account.pendingApplications} {language === 'hi' ? 'लंबित' : 'pending'}</p>
                            <p className="text-xs text-green-600">{account.completedReviews} {language === 'hi' ? 'समीक्षित' : 'reviewed'}</p>
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