import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Mail, 
  Shield,
  Sun,
  Moon,
  Crown,
  KeyRound,
  Globe,
  ChevronDown,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Alert, AlertDescription } from '../ui/alert';
import { AuthAPI } from '@/api'; // Assuming a barrel export for auth

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
  const [error, setError] = useState<string | null>(null);
  
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
      signingIn: 'Signing In...',
      forgotPassword: 'Forgot Password?',
      rememberMe: 'Remember me',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      govInitiative: 'Government of NCT of Delhi Initiative',
      secureLogin: 'Maximum Security Login',
      dataProtection: 'Advanced Data Protection',
      support247: '24/7 Priority Support',
      securityNotice: 'All administrative actions are logged and monitored for security compliance.',
      loginError: 'Invalid email or password. Please try again.'
    },
    hi: {
      title: 'सरकारी कर्मचारी पोर्टल',
      subtitle: 'सुरक्षित सरकारी कर्मचारी लॉगिन',
      welcomeBack: 'स्वागत है, सरकारी कर्मचारी',
      signInDescription: 'पूर्ण प्रशासनिक विशेषाधिकारों के साथ सरकारी पोर्टल तक पहुंच',
      emailAddress: 'आधिकारिक ईमेल',
      password: 'सुरक्षित पासवर्ड',
      signIn: 'साइन इन करें',
      signingIn: 'साइन इन हो रहा है...',
      forgotPassword: 'पासवर्ड भूल गए?',
      rememberMe: 'मुझे याद रखें',
      lightMode: 'लाइट मोड',
      darkMode: 'डार्क मोड',
      govInitiative: 'राष्ट्रीय राजधानी क्षेत्र दिल्ली सरकार की पहल',
      secureLogin: 'अधिकतम सुरक्षा लॉगिन',
      dataProtection: 'उन्नत डेटा सुरक्षा',
      support247: '24/7 प्राथमिकता सहायता',
      securityNotice: 'सभी प्रशासनिक कार्यों को सुरक्षा अनुपालन के लिए लॉग और निगरानी की जाती है।',
      loginError: 'अमान्य ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।'
    }
  };

  const t = translations[language];

  // Handles the actual login API call
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail.trim() || !loginPassword) {
      setError('Email and password are required.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the login function from the Auth API client
      const { token, user } = await AuthAPI.login({
        email: loginEmail,
        password: loginPassword,
      });

      // Set the token in local storage for session management
      AuthAPI.setAuthToken(token);

      // Pass the authenticated user object to the parent component
      onLogin(user);

    } catch (err) {
      console.error("Login failed:", err);
      setError(t.loginError);
    } finally {
      setIsLoading(false);
    }
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
            style={{ left: `${particle.x}%`, top: `${particle.y}%`, width: particle.size, height: particle.size }}
            animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
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
              <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-white/20 dark:hover:bg-slate-800/30 text-foreground">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">{t.title}</h1>
                  <p className="text-xs text-muted-foreground">{t.subtitle}</p>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Controls */}
            <div className="flex items-center space-x-3">
              <motion.button className="p-2 hover:bg-white/20 dark:hover:bg-slate-800/30 rounded-lg transition-colors text-foreground" whileHover={{ scale: 1.1 }} onClick={() => setDarkMode(!darkMode)} title={darkMode ? t.lightMode : t.darkMode}>
                {darkMode ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-blue-600" />}
              </motion.button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div className="flex items-center space-x-2 bg-white/20 dark:bg-slate-800/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/30 dark:border-slate-700/50 cursor-pointer" whileHover={{ scale: 1.05, backgroundColor: darkMode ? 'rgba(51, 65, 85, 0.4)' : 'rgba(255,255,255,0.3)' }} transition={{ duration: 0.2 }}>
                    <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-foreground">{language === 'hi' ? 'हिंदी' : 'English'}</span>
                    <ChevronDown className="w-3 h-3 text-foreground" />
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-accent' : ''}>English</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('hi')} className={language === 'hi' ? 'bg-accent' : ''}>हिंदी</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex min-h-screen pt-20">
        {/* Left Side - Government Branding */}
        <motion.div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-8 relative" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <div className="max-w-md text-center space-y-8">
            <motion.div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-600/10 via-blue-600/10 to-green-600/10 dark:from-green-600/20 dark:via-blue-600/20 dark:to-green-600/20 backdrop-blur-sm rounded-full px-6 py-3 border border-green-200/30 dark:border-green-700/40" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">{t.govInitiative}</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700 text-xs">{language === 'hi' ? 'कर्मचारी' : 'EMPLOYEE'}</Badge>
            </motion.div>
            <div>
              <motion.h1 className="text-5xl font-bold mb-4" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-green-600 dark:from-green-400 dark:via-blue-400 dark:to-green-400 bg-clip-text text-transparent">Vyapaar सारथी</span>
              </motion.h1>
              <motion.p className="text-xl text-muted-foreground mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>{language === 'hi' ? 'सरकारी कर्मचारी पोर्टल' : 'Government Employee Portal'}</motion.p>
            </div>
            <motion.div className="grid grid-cols-1 gap-4 text-left" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}>
              {[{ icon: KeyRound, text: t.secureLogin }, { icon: Shield, text: t.dataProtection }, { icon: Crown, text: t.support247 }].map((feature) => (
                <motion.div key={feature.text} className="flex items-center space-x-3" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500 flex items-center justify-center flex-shrink-0"><feature.icon className="w-4 h-4 text-white" /></div>
                  <span className="text-foreground">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
            <motion.div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4 text-sm text-amber-800 dark:text-amber-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.1 }}>
              <div className="flex items-start space-x-2"><Shield className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" /><p>{t.securityNotice}</p></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
          <Card className="w-full max-w-md bg-card/50 dark:bg-slate-800/50 backdrop-blur-sm border border-border/50 dark:border-slate-700/50 shadow-2xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl text-foreground">{t.welcomeBack}</CardTitle>
              <p className="text-muted-foreground text-sm">{t.signInDescription}</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t.emailAddress}</label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 h-4 w-4 text-muted-foreground" />
                    <Input type="email" placeholder="employee@delhi.gov.in" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t.password}</label>
                  <div className="relative flex items-center">
                    <KeyRound className="absolute left-3 h-4 w-4 text-muted-foreground" />
                    <Input type={showPassword ? 'text' : 'password'} placeholder="Enter secure password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="pl-10 pr-10" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 text-foreground"><input type="checkbox" className="rounded border-border dark:border-slate-600" /><span>{t.rememberMe}</span></label>
                  <button type="button" className="text-green-600 dark:text-green-400 hover:underline">{t.forgotPassword}</button>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      {t.signingIn}
                    </div>
                  ) : t.signIn}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
