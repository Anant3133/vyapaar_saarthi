import { motion } from 'motion/react';
import { 
  Building2, 
  Shield, 
  Users, 
  ArrowRight,
  Globe,
  ChevronDown,
  Sun,
  Moon,
  UserCheck,
  Award,
  FileText,
  Briefcase,
  Settings,
  Lock
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface RoleSelectionPageProps {
  onRoleSelect: (role: 'business' | 'government') => void;
  onBack: () => void;
  language: 'en' | 'hi';
  setLanguage: (language: 'en' | 'hi') => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export function RoleSelectionPage({ 
  onRoleSelect, 
  onBack, 
  language, 
  setLanguage, 
  darkMode, 
  setDarkMode 
}: RoleSelectionPageProps) {
  const translations = {
    en: {
      title: 'Choose Your Role',
      subtitle: 'Select how you want to access the portal',
      description: 'Welcome to Delhi Government\'s Ease of Doing Business Portal. Please choose your role to continue with the appropriate login flow.',
      businessOwner: {
        title: 'Business Owner',
        subtitle: 'Apply for licenses, track applications, manage compliance',
        description: 'Access business registration, license applications, compliance tracking, and government schemes.',
        features: [
          'License Applications',
          'Business Registration', 
          'Compliance Tracking',
          'Government Schemes',
          'Document Management',
          'Payment Gateway'
        ]
      },
      governmentEmployee: {
        title: 'Government Employee',
        subtitle: 'Review applications, manage approvals, oversee departments',
        description: 'Access administrative dashboard, review applications, manage approvals and oversee all business processes.',
        features: [
          'Application Reviews',
          'Approval Management', 
          'Department Analytics',
          'Compliance Monitoring',
          'Complaint Handling',
          'System Administration'
        ]
      },
      continue: 'Continue',
      back: 'Back to Home',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      selectRole: 'Select Your Role',
      govInitiative: 'Government of NCT of Delhi Initiative'
    },
    hi: {
      title: 'अपनी भूमिका चुनें',
      subtitle: 'पोर्टल तक पहुंचने का तरीका चुनें',
      description: 'दिल्ली सरकार के व्यापार सुगमता पोर्टल में आपका स्वागत है। उपयुक्त लॉगिन प्रवाह के साथ जारी रखने के लिए कृपया अपनी भूमिका चुनें।',
      businessOwner: {
        title: 'व्यापार स्वामी',
        subtitle: 'लाइसेंस के लिए आवेदन करें, ट्रैक करें, अनुपालन प्रबंधित करें',
        description: 'व्यावसायिक पंजीकरण, लाइसेंस आवेदन, अनुपालन ट्रैकिंग, और सरकारी योजनाओं तक पहुंच।',
        features: [
          'लाइसेंस आवेदन',
          'व्यवसाय पंजीकरण',
          'अनुपालन ट्रैकिंग',
          'सरकारी योजनाएं',
          'दस्तावेज़ प्रबंधन',
          'भुगतान गेटवे'
        ]
      },
      governmentEmployee: {
        title: 'सरकारी कर्मचारी',
        subtitle: 'आवेदनों की समीक्षा करें, अनुमोदन प्रबंधित करें, विभागों की देखरेख करें',
        description: 'प्रशासनिक डैशबोर्ड तक पहुंच, आवेदनों की समीक्षा, अनुमोदन प्रबंधन और सभी व्यावसायिक प्रक्रियाओं की देखरेख।',
        features: [
          'आवेदन समीक्षा',
          'अनुमोदन प्रबंधन',
          'विभाग विश्लेषण',
          'अनुपालन निगरानी',
          'शिकायत प्रबंधन',
          'सिस्टम प्रशासन'
        ]
      },
      continue: 'जारी रखें',
      back: 'होम पर वापस',
      lightMode: 'लाइट मोड',
      darkMode: 'डार्क मोड',
      selectRole: 'अपनी भूमिका चुनें',
      govInitiative: 'राष्ट्रीय राजधानी क्षेत्र दिल्ली सरकार की पहल'
    }
  };

  const t = translations[language];

  const roles = [
    {
      id: 'business' as const,
      icon: Building2,
      title: t.businessOwner.title,
      subtitle: t.businessOwner.subtitle,
      description: t.businessOwner.description,
      features: t.businessOwner.features,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      darkBgColor: 'from-blue-900/20 to-blue-800/20'
    },
    {
      id: 'government' as const,
      icon: Shield,
      title: t.governmentEmployee.title,
      subtitle: t.governmentEmployee.subtitle,
      description: t.governmentEmployee.description,
      features: t.governmentEmployee.features,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      darkBgColor: 'from-green-900/20 to-green-800/20'
    }
  ];

  const floatingParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className={`min-h-screen relative z-10 overflow-hidden ${language === 'hi' ? 'lang-hi' : 'lang-en'} bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900`}>
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-400/10 dark:to-purple-400/10 blur-sm"
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

      {/* Header */}
      <motion.header 
        className="absolute top-0 left-0 right-0 z-20 bg-white/10 dark:bg-slate-900/20 backdrop-blur-md border-b border-white/20 dark:border-slate-700/30"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Branding */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Vyapaar सारथी
                </h1>
                <p className="text-sm text-muted-foreground">{language === 'hi' ? 'व्यापार सुगमता पोर्टल' : 'Ease of Doing Business Portal'}</p>
              </div>
            </motion.div>

            {/* Right Side - Controls */}
            <div className="flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              <motion.button
                className="p-2 hover:bg-white/20 dark:hover:bg-slate-800/40 rounded-lg transition-colors text-foreground"
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
                    className="flex items-center space-x-2 bg-white/20 dark:bg-slate-800/40 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/30 dark:border-slate-700/50 cursor-pointer"
                    whileHover={{ scale: 1.05, backgroundColor: darkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(255,255,255,0.3)' }}
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
      <div className="flex items-center justify-center min-h-screen pt-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto w-full">
          {/* Government Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.div 
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-green-600/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-green-600/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-blue-200/30 dark:border-blue-700/50"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                {t.govInitiative}
              </span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700 text-xs">
                {language === 'hi' ? 'सत्यापित' : 'Verified'}
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.title}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t.subtitle}
            </motion.p>
            
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t.description}
            </motion.p>
          </motion.div>

          {/* Role Selection Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 * (index + 1) }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => onRoleSelect(role.id)}
              >
                <Card className={`h-full bg-gradient-to-br ${role.bgColor} dark:bg-gradient-to-br dark:${role.darkBgColor} border-2 border-transparent hover:border-current transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden relative dark:border-slate-700/50 dark:hover:border-slate-600`}>
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <CardContent className="p-8 relative">
                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center mb-6 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <role.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Title and Subtitle */}
                    <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {role.subtitle}
                    </p>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {role.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {role.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * featureIndex }}
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${role.color}`} />
                          <span className="text-sm text-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Continue Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        className={`w-full bg-gradient-to-r ${role.color} hover:shadow-lg transition-all duration-300 text-white dark:text-white`}
                        size="lg"
                      >
                        {t.continue}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-8"
          >
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground"
            >
              ← {t.back}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}