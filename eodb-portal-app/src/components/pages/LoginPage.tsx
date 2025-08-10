import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Building, Phone, MapPin, Info, Globe, ChevronDown, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { auth, demoUtils } from '../../utils/supabase/client';

interface LoginPageProps {
  onLogin: (user: any) => void;
  onBack: () => void;
  language: 'en' | 'hi';
  setLanguage: (language: 'en' | 'hi') => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  userRole?: 'business' | 'government';
}

export function LoginPage({ onLogin, onBack, language, setLanguage, darkMode, setDarkMode, userRole = 'business' }: LoginPageProps) {
  const translations = {
    en: {
      title: 'Welcome to EODB Portal',
      subtitle: 'Sign in to your account to continue',
      email: 'Email Address',
      password: 'Password',
      remember: 'Remember me',
      forgot: 'Forgot password?',
      signin: 'Sign In',
      signup: 'Sign Up',
      noaccount: "Don't have an account?",
      haveaccount: 'Already have an account?',
      fullname: 'Full Name',
      businessname: 'Business Name',
      phone: 'Phone Number',
      confirmpassword: 'Confirm Password',
      or: 'or continue with',
      google: 'Continue with Google',
      government: 'Continue with Government ID',
      demo: 'Try Demo Account',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      namePlaceholder: 'Enter your full name',
      businessPlaceholder: 'Enter your business name',
      phonePlaceholder: 'Enter your phone number',
      confirmPlaceholder: 'Confirm your password',
      locationPlaceholder: 'City, State',
      createPasswordPlaceholder: 'Create a password',
      selectBusinessType: 'Select business type',
      secure: 'Your data is secured with bank-grade encryption',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      features: {
        dashboard: 'Comprehensive dashboard for all your business needs',
        tracking: 'Real-time application tracking and status updates',
        ai: '24/7 AI assistant for instant help and guidance',
        compliance: 'Automated compliance management and reminders'
      },
      demoInfo: 'Demo Accounts Available:',
      signingIn: 'Signing in...',
      creatingAccount: 'Creating Account...',
      createAccount: 'Create Account',
      orTryDemo: 'Or try demo accounts:',
      termsAgreement: 'By continuing, you agree to our',
      terms: 'Terms of Service',
      and: 'and',
      privacy: 'Privacy Policy',
      back: 'Back',
      businessTypes: {
        sole: 'Sole Proprietorship',
        partnership: 'Partnership',
        llp: 'Limited Liability Partnership (LLP)',
        private: 'Private Limited Company',
        public: 'Public Limited Company',
        opc: 'One Person Company (OPC)',
        section8: 'Section 8 Company',
        producer: 'Producer Company'
      }
    },
    hi: {
      title: 'ईओडीबी पोर्टल में आपका स्वागत है',
      subtitle: 'जारी रखने के लिए अपने खाते में साइन इन करें',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      remember: 'मुझे याद रखें',
      forgot: 'पासवर्ड भूल गए?',
      signin: 'साइन इन',
      signup: 'साइन अप',
      noaccount: 'खाता नहीं है?',
      haveaccount: 'पहले से खाता है?',
      fullname: 'पूरा नाम',
      businessname: 'व्यवसाय का नाम',
      phone: 'फोन नंबर',
      confirmpassword: 'पासवर्ड की पुष्टि करें',
      or: 'या इसके साथ जारी रखें',
      google: 'Google के साथ जारी रखें',
      government: 'सरकारी ID के साथ जारी रखें',
      demo: 'डेमो खाता आज़माएं',
      emailPlaceholder: 'अपना ईमेल दर्ज करें',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      namePlaceholder: 'अपना पूरा नाम दर्ज करें',
      businessPlaceholder: 'अपने व्यवसाय का नाम दर्ज करें',
      phonePlaceholder: 'अपना फोन नंबर दर्ज करें',
      confirmPlaceholder: 'अपने पासवर्ड की पुष्टि करें',
      locationPlaceholder: 'शहर, राज्य',
      createPasswordPlaceholder: 'पासवर्ड बनाएं',
      selectBusinessType: 'व्यवसाय प्रकार चुनें',
      secure: 'आपका डेटा बैंक-ग्रेड एन्क्रिप्शन के साथ सुरक्षित है',
      lightMode: 'लाइट मोड',
      darkMode: 'डार्क मोड',
      features: {
        dashboard: 'आपकी सभी व्यावसायिक आवश्यकताओं के लिए व्यापक डैशबोर्ड',
        tracking: 'रियल-टाइम आवेदन ट्रैकिंग और स्थिति अपडेट',
        ai: 'तत्काल सहायता और मार्गदर्शन के लिए 24/7 एआई सहायक',
        compliance: 'स्वचालित अनुपालन प्रबंधन और रिमाइंडर'
      },
      demoInfo: 'उपलब्ध डेमो खाते:',
      signingIn: 'साइन इन हो रहा है...',
      creatingAccount: 'खाता बनाया जा रहा है...',
      createAccount: 'खाता बनाएं',
      orTryDemo: 'या डेमो खाते आज़माएं:',
      termsAgreement: 'जारी रखकर, आप हमारी',
      terms: 'सेवा की शर्तों',
      and: 'और',
      privacy: 'गोपनीयता नीति',
      back: 'वापस',
      businessTypes: {
        sole: 'एकल स्वामित्व',
        partnership: 'साझेदारी',
        llp: 'सीमित देयता भागीदारी (एलएलपी)',
        private: 'प्राइवेट लिमिटेड कंपनी',
        public: 'पब्लिक लिमिटेड कंपनी',
        opc: 'एक व्यक्ति कंपनी (ओपीसी)',
        section8: 'धारा 8 कंपनी',
        producer: 'उत्पादक कंपनी'
      }
    }
  };

  const t = translations[language];
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('login');

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessType: '',
    phoneNumber: '',
    location: ''
  });

  const businessTypes = [
    { value: 'sole-proprietorship', label: t.businessTypes.sole },
    { value: 'partnership', label: t.businessTypes.partnership },
    { value: 'llp', label: t.businessTypes.llp },
    { value: 'private-limited', label: t.businessTypes.private },
    { value: 'public-limited', label: t.businessTypes.public },
    { value: 'opc', label: t.businessTypes.opc },
    { value: 'section8', label: t.businessTypes.section8 },
    { value: 'producer', label: t.businessTypes.producer }
  ];

  // Demo user credentials for testing
  const demoUsers = [
    {
      email: 'demo@eodb.gov.in',
      password: 'demo123',
      name: language === 'hi' ? 'राजेश कुमार' : 'Rajesh Kumar',
      businessType: language === 'hi' ? 'निर्माण' : 'Manufacturing',
      location: language === 'hi' ? 'मुंबई, महाराष्ट्र' : 'Mumbai, Maharashtra',
      phoneNumber: '+91 9876543210'
    },
    {
      email: 'startup@example.com',
      password: 'startup123',
      name: language === 'hi' ? 'प्रिया शर्मा' : 'Priya Sharma',
      businessType: language === 'hi' ? 'प्रौद्योगिकी स्टार्टअप' : 'Technology Startup',
      location: language === 'hi' ? 'बैंगलोर, कर्नाटक' : 'Bangalore, Karnataka',
      phoneNumber: '+91 8765432109'
    },
    {
      email: 'business@company.com',
      password: 'business123',
      name: language === 'hi' ? 'अमित सिंह' : 'Amit Singh',
      businessType: language === 'hi' ? 'खुदरा व्यवसाय' : 'Retail Business',
      location: language === 'hi' ? 'दिल्ली, भारत' : 'Delhi, India',
      phoneNumber: '+91 7654321098'
    }
  ];

  const handleDemoLogin = (demoUser: any) => {
    setIsLoading(true);
    setError('');

    // Simulate login delay
    setTimeout(() => {
      const userData = {
        id: `demo-${Date.now()}`,
        email: demoUser.email,
        name: demoUser.name,
        role: userRole,
        businessType: demoUser.businessType,
        location: demoUser.location,
        phoneNumber: demoUser.phoneNumber,
        verified: true,
        memberSince: '2024-01-01',
        totalApplications: Math.floor(Math.random() * 10) + 1,
        completedApplications: Math.floor(Math.random() * 5) + 1,
        user_metadata: {
          name: demoUser.name,
          businessType: demoUser.businessType,
          location: demoUser.location,
          phoneNumber: demoUser.phoneNumber,
          verified: true
        }
      };
      
      // Set demo user data for the data service
      demoUtils.setDemoUser(userData);
      
      onLogin(userData);
      setIsLoading(false);
    }, 1000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Check if it's a demo user first
    const demoUser = demoUsers.find(user => 
      user.email === loginData.email && user.password === loginData.password
    );

    if (demoUser) {
      handleDemoLogin(demoUser);
      return;
    }

    // For non-demo users, show a helpful message instead of attempting real auth
    setError(language === 'hi' 
      ? 'यह एक डेमो एप्लिकेशन है। कृपया ऊपर दिए गए डेमो खातों में से किसी एक का उपयोग करें।'
      : 'This is a demo application. Please use one of the demo accounts provided above.');
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (signupData.password !== signupData.confirmPassword) {
      setError(language === 'hi' ? 'पासवर्ड मेल नहीं खाते' : 'Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (signupData.password.length < 6) {
      setError(language === 'hi' 
        ? 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए'
        : 'Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    // For demo purposes, create a temporary user
    setTimeout(() => {
      const userData = {
        id: `demo-signup-${Date.now()}`,
        email: signupData.email,
        name: signupData.name,
        role: userRole,
        businessType: businessTypes.find(bt => bt.value === signupData.businessType)?.label || signupData.businessType,
        location: signupData.location,
        phoneNumber: signupData.phoneNumber,
        verified: false,
        memberSince: new Date().toISOString(),
        totalApplications: 0,
        completedApplications: 0,
        user_metadata: {
          name: signupData.name,
          businessType: businessTypes.find(bt => bt.value === signupData.businessType)?.label || signupData.businessType,
          location: signupData.location,
          phoneNumber: signupData.phoneNumber,
          verified: false
        }
      };
      
      // Set demo user data
      demoUtils.setDemoUser(userData);
      
      onLogin(userData);
      setIsLoading(false);
    }, 1500);
  };

  const handleLoginChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSignupChange = (field: string, value: string) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 relative z-10 ${language === 'hi' ? 'lang-hi' : 'lang-en'}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-card/80 backdrop-blur-md border-border/50 shadow-2xl">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="w-fit"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.back}
              </Button>
              
              <div className="flex items-center gap-2">
                {/* Dark Mode Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDarkMode(!darkMode)}
                  title={darkMode ? t.lightMode : t.darkMode}
                  className="w-8 h-8 p-0"
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <Moon className="w-4 h-4 text-blue-600" />
                  )}
                </Button>

                {/* Language Toggle */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">{language === 'hi' ? 'हिंदी' : 'English'}</span>
                      <ChevronDown className="w-3 h-3" />
                    </Button>
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
            
            <CardTitle className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.title}
              </div>
              <p className="text-sm font-normal text-muted-foreground mt-2">
                {t.subtitle}
              </p>
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* Demo Account Info */}
            <Alert className="mb-6 border-blue-200 bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>{t.demoInfo}</strong><br />
                <div className="mt-2 space-y-1 text-xs">
                  <div>Email: demo@eodb.gov.in | Password: demo123</div>
                  <div>Email: startup@example.com | Password: startup123</div>
                  <div>Email: business@company.com | Password: business123</div>
                </div>
              </AlertDescription>
            </Alert>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">{t.signin}</TabsTrigger>
                <TabsTrigger value="signup">{t.signup}</TabsTrigger>
              </TabsList>

              {error && (
                <Alert className="mt-4 border-red-200 bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">{t.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder={t.emailPlaceholder}
                        value={loginData.email}
                        onChange={(e) => handleLoginChange('email', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">{t.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t.passwordPlaceholder}
                        value={loginData.password}
                        onChange={(e) => handleLoginChange('password', e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? t.signingIn : t.signin}
                  </Button>
                </form>

                {/* Quick Demo Login Buttons */}
                <div className="space-y-2">
                  <div className="text-center text-sm text-muted-foreground">
                    {t.orTryDemo}
                  </div>
                  <div className="grid gap-2">
                    {demoUsers.map((user, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleDemoLogin(user)}
                        disabled={isLoading}
                        className="text-xs justify-start"
                      >
                        <User className="w-3 h-3 mr-2" />
                        {user.name} - {user.businessType}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">{t.fullname}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder={t.namePlaceholder}
                        value={signupData.name}
                        onChange={(e) => handleSignupChange('name', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">{t.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder={t.emailPlaceholder}
                        value={signupData.email}
                        onChange={(e) => handleSignupChange('email', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">{t.phone}</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder={t.phonePlaceholder}
                        value={signupData.phoneNumber}
                        onChange={(e) => handleSignupChange('phoneNumber', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-type">{t.businessname}</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                      <Select
                        value={signupData.businessType}
                        onValueChange={(value) => handleSignupChange('businessType', value)}
                        required
                      >
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder={t.selectBusinessType} />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-location">{language === 'hi' ? 'स्थान' : 'Location'}</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-location"
                        type="text"
                        placeholder={t.locationPlaceholder}
                        value={signupData.location}
                        onChange={(e) => handleSignupChange('location', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">{t.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t.createPasswordPlaceholder}
                        value={signupData.password}
                        onChange={(e) => handleSignupChange('password', e.target.value)}
                        className="pl-10 pr-10"
                        required
                        minLength={6}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">{t.confirmpassword}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-confirm-password"
                        type="password"
                        placeholder={t.confirmPlaceholder}
                        value={signupData.confirmPassword}
                        onChange={(e) => handleSignupChange('confirmPassword', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? t.creatingAccount : t.createAccount}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>
                {t.termsAgreement}{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  {t.terms}
                </a>{' '}
                {t.and}{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  {t.privacy}
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}