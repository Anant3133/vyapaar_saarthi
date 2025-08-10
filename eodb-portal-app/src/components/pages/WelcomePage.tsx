import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Building2, 
  FileText, 
  Shield, 
  Zap,
  Users,
  Award,
  Bot,
  Play,
  CheckCircle,
  Star,
  Globe,
  Clock,
  Sparkles,
  UserCheck,
  FileCheck,
  Target,
  Rocket,
  Flag,
  MapPin,
  Phone,
  Mail,
  Crown,
  Hexagon,
  Settings,
  Bell,
  ChevronDown,
  Languages,
  HelpCircle,
  BookOpen,
  MessageCircle,
  Sun,
  Moon
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

interface WelcomePageProps {
  onGetStarted: () => void;
  onWatchDemo: () => void;
  language: 'en' | 'hi';
  setLanguage: (language: 'en' | 'hi') => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  onNavigate?: (page: string) => void;
}

export function WelcomePage({ onGetStarted, onWatchDemo, language, setLanguage, darkMode, setDarkMode, onNavigate }: WelcomePageProps) {
  const translations = {
    en: {
      title: 'Vyapaar सारथी',
      subtitle: 'Ease of Doing Business Platform',
      description: 'Streamline your business journey with ease through our comprehensive AI-powered platform for licenses, registrations, compliance management, and government schemes.',
      getStarted: 'Get Started',
      watchDemo: 'Watch Demo',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      features: {
        licenses: {
          title: 'License Applications',
          description: 'Apply for various licenses and track their status in real-time with automated workflows',
          stats: '10,000+ licenses processed'
        },
        registration: {
          title: 'Business Registration',
          description: 'Register your business with ease - Proprietorship, Partnership, LLP & Private Limited',
          stats: '5,000+ businesses registered'
        },
        schemes: {
          title: 'Schemes & Incentives',
          description: 'Discover government schemes tailored for your business with AI-powered recommendations',
          stats: '500+ schemes available'
        },
        compliance: {
          title: 'Compliance Tracking',
          description: 'Never miss important deadlines with our smart reminder system and calendar integration',
          stats: '99.5% compliance rate'
        }
      },
      steps: {
        title: 'How It Works',
        subtitle: 'Simple steps to transform your business operations with our intelligent platform',
        step1: {
          title: 'Create Account',
          description: 'Sign up with your business details and verify your identity',
          time: '2 minutes'
        },
        step2: {
          title: 'Choose Services',
          description: 'Select the licenses and registrations you need from our comprehensive catalog',
          time: '5 minutes'
        },
        step3: {
          title: 'Submit Applications',
          description: 'Fill smart forms and upload required documents with our guided process',
          time: '15 minutes'
        },
        step4: {
          title: 'Track Progress',
          description: 'Monitor your applications in real-time with notifications and updates',
          time: 'Real-time'
        }
      },
      ai: {
        title: 'Meet Your AI Assistant',
        description: 'Instant help with applications, compliance, and scheme recommendations',
        features: ['Voice Support', 'Multi-language', '24/7 Available', 'Smart Suggestions']
      },
      testimonials: {
        title: 'What Our Users Say',
        subtitle: 'Join thousands of satisfied businesses who have transformed their operations with our platform'
      },
      cta: {
        title: 'Ready to Transform Your Business?',
        description: 'Join thousands of businesses already using our platform to streamline their operations, ensure compliance, and unlock growth opportunities.',
        start: 'Start Your Journey',
        explore: 'Explore Features'
      },
      stats: {
        businesses: 'Businesses Served',
        successRate: 'Success Rate',
        processingTime: 'Processing Time',
        satisfaction: 'Satisfaction'
      },
      contact: {
        phone: '1800-123-4567',
        email: 'support@eodb.delhi.gov.in'
      },
      ministry: 'Ministry of Industry of Delhi',
      digitalIndia: 'Digital India',
      verified: 'Verified',
      govInitiative: 'Government of NCT of Delhi Initiative',
      satyamevaJayate: 'Truth Alone Triumphs',
      navItems: {
        help: 'Help',
        documentation: 'Documentation',
        contact: 'Contact',
        notifications: 'Notifications'
      }
    },
    hi: {
      title: 'Vyapaar सारथी',
      subtitle: 'व्यवसाय करने में आसानी मंच',
      description: 'लाइसेंस, पंजीकरण, अनुपालन प्रबंधन, और सरकारी योजनाओं के लिए हमारे व्यापक एआई-संचालित प्लेटफॉर्म के माध्यम से अपने व्यावसायिक यात्रा को आसानी से सुव्यवस्थित करें।',
      getStarted: 'शुरू करें',
      watchDemo: 'डेमो देखें',
      lightMode: 'लाइट मोड',
      darkMode: 'डार्क मोड',
      features: {
        licenses: {
          title: 'लाइसेंस आवेदन',
          description: 'विभिन्न लाइसेंसों के लिए आवेदन करें और स्वचालित वर्कफ़्लो के साथ उनकी स्थिति को रियल-टाइम में ट्रैक करें',
          stats: '10,000+ लाइसेंस प्रसंस्कृत'
        },
        registration: {
          title: 'व्यवसाय पंजीकरण',
          description: 'आसानी से अपना व्यवसाय पंजीकृत करें - प्रोप्राइटरशिप, पार्टनरशिप, एलएलपी और प्राइवेट लिमिटेड',
          stats: '5,000+ व्यवसाय पंजीकृत'
        },
        schemes: {
          title: 'योजनाएं और प्रोत्साहन',
          description: 'एआई-संचालित सिफारिशों के साथ अपने व्यवसाय के अनुकूल सरकारी योजनाओं की खोज करें',
          stats: '500+ योजनाएं उपलब्ध'
        },
        compliance: {
          title: 'अनुपालन ट्रैकिंग',
          description: 'हमारे स्मार्ट रिमाइंडर सिस्टम और कैलेंडर एकीकरण के साथ महत्वपूर्ण समय सीमा कभी न चूकें',
          stats: '99.5% अनुपालन दर'
        }
      },
      steps: {
        title: 'यह कैसे काम करता है',
        subtitle: 'हमारे बुद्धिमान प्लेटफॉर्म के साथ अपने व्यावसायिक संचालन को बदलने के लिए सरल चरण',
        step1: {
          title: 'खाता बनाएं',
          description: 'अपने व्यावसायिक विवरण के साथ साइन अप करें और अपनी पहचान सत्यापित करें',
          time: '2 मिनट'
        },
        step2: {
          title: 'सेवाएं चुनें',
          description: 'हमारे व्यापक कैटलॉग से आपको आवश्यक लाइसेंस और पंजीकरण का चयन करें',
          time: '5 मिनट'
        },
        step3: {
          title: 'आवेदन जमा करें',
          description: 'हमारी निर्देशित प्रक्रिया के साथ स्मार्ट फॉर्म भरें और आवश्यक दस्तावेज अपलोड करें',
          time: '15 मिनट'
        },
        step4: {
          title: 'प्रगति ट्रैक करें',
          description: 'सूचनाओं और अपडेट के साथ अपने आवेदनों को रियल-टाइम में मॉनिटर करें',
          time: 'रियल-टाइम'
        }
      },
      ai: {
        title: 'अपने एआई सहायक से मिलें',
        description: 'आवेदन, अनुपालन, और योजना सिफारिशों के साथ तत्काल सहायता',
        features: ['वॉयस सपोर्ट', 'बहुभाषी', '24/7 उपलब्ध', 'स्मार्ट सुझाव']
      },
      testimonials: {
        title: 'हमारे उपयोगकर्ता क्या कहते हैं',
        subtitle: 'हजारों संतुष्ट व्यवसायों के साथ जुड़ें जिन्होंने हमारे प्लेटफॉर्म के साथ अपने संचालन को बदल दिया है'
      },
      cta: {
        title: 'अपने व्यवसाय को बदलने के लिए तैयार हैं?',
        description: 'हजारों व्यवसायों के साथ जुड़ें जो पहले से ही हमारे प्लेटफॉर्म का उपयोग करके अपने संचालन को सुव्यवस्थित करने, अनुपालन सुनिश्चित करने और विकास के अवसरों को अनलॉक करने के लिए कर रहे हैं।',
        start: 'अपनी यात्रा शुरू करें',
        explore: 'फीचर्स एक्सप्लोर करें'
      },
      stats: {
        businesses: 'व्यवसाय सेवित',
        successRate: 'सफलता दर',
        processingTime: 'प्रसंस्करण समय',
        satisfaction: 'संतुष्टि'
      },
      contact: {
        phone: '1800-123-4567',
        email: 'support@eodb.delhi.gov.in'
      },
      ministry: 'दिल्ली उद्योग मंत्रालय',
      digitalIndia: 'डिजिटल इंडिया',
      verified: 'सत्यापित',
      govInitiative: 'राष्ट्रीय राजधानी क्षेत्र दिल्ली सरकार की पहल',
      satyamevaJayate: 'सत्यमेव जयते',
      navItems: {
        help: 'सहायता',
        documentation: 'दस्तावेज़',
        contact: 'संपर्क',
        notifications: 'सूचनाएं'
      }
    }
  };

  const t = translations[language];
  
  const features = [
    {
      icon: FileText,
      title: t.features.licenses.title,
      description: t.features.licenses.description,
      stats: t.features.licenses.stats,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Building2,
      title: t.features.registration.title,
      description: t.features.registration.description,
      stats: t.features.registration.stats,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Award,
      title: t.features.schemes.title,
      description: t.features.schemes.description,
      stats: t.features.schemes.stats,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Shield,
      title: t.features.compliance.title,
      description: t.features.compliance.description,
      stats: t.features.compliance.stats,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const steps = [
    { 
      number: 1, 
      title: t.steps.step1.title,
      description: t.steps.step1.description,
      icon: UserCheck,
      time: t.steps.step1.time
    },
    { 
      number: 2, 
      title: t.steps.step2.title,
      description: t.steps.step2.description,
      icon: Target,
      time: t.steps.step2.time
    },
    { 
      number: 3, 
      title: t.steps.step3.title,
      description: t.steps.step3.description,
      icon: FileCheck,
      time: t.steps.step3.time
    },
    { 
      number: 4, 
      title: t.steps.step4.title,
      description: t.steps.step4.description,
      icon: Rocket,
      time: t.steps.step4.time
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

  const testimonials = [
    {
      name: language === 'hi' ? 'राजेश कुमार' : 'Rajesh Kumar',
      company: language === 'hi' ? 'टेक स्टार्टअप प्राइवेट लिमिटेड' : 'Tech Startup Pvt. Ltd.',
      message: language === 'hi' 
        ? 'केवल 3 दिनों में मेरा स्टार्टअप पंजीकृत हो गया! एआई सहायक अविश्वसनीय रूप से सहायक था।'
        : 'Got my startup registered in just 3 days! The AI assistant was incredibly helpful.',
      rating: 5
    },
    {
      name: language === 'hi' ? 'प्रिया शर्मा' : 'Priya Sharma',
      company: language === 'hi' ? 'ग्रीन एनर्जी सॉल्यूशंस' : 'Green Energy Solutions',
      message: language === 'hi'
        ? 'अनुपालन ट्रैकिंग ने हमें महत्वपूर्ण समय सीमा चूकने से बचाया। अत्यधिक सुझाई गई!'
        : 'The compliance tracking saved us from missing critical deadlines. Highly recommended!',
      rating: 5
    },
    {
      name: language === 'hi' ? 'मोहम्मद अली' : 'Mohammed Ali',
      company: language === 'hi' ? 'एक्सपोर्ट हाउस' : 'Export House',
      message: language === 'hi'
        ? 'हमारे निर्यात व्यवसाय के लिए सही सरकारी योजना मिली। अद्भुत प्लेटफॉर्म!'
        : 'Found the perfect government scheme for our export business. Amazing platform!',
      rating: 5
    }
  ];

  // Navigation handlers
  const handlePhoneClick = () => {
    window.open(`tel:${t.contact.phone}`, '_self');
  };

  const handleEmailClick = () => {
    window.open(`mailto:${t.contact.email}`, '_self');
  };

  const handleHelpClick = () => {
    // Create a simple help modal or redirect to documentation
    alert(language === 'hi' ? 
      'सहायता के लिए कृपया support@eodb.delhi.gov.in पर संपर्क करें या 1800-123-4567 पर कॉल करें।' :
      'For help, please contact support@eodb.delhi.gov.in or call 1800-123-4567.'
    );
  };

  const handleDocumentationClick = () => {
    // Open documentation in new tab
    window.open('https://eodb.delhi.gov.in/docs', '_blank');
  };

  const handleNotificationClick = () => {
    alert(language === 'hi' ? 
      'कोई नई सूचना नहीं है। कृपया अपना खाता बनाने के लिए "शुरू करें" पर क्लिक करें।' :
      'No new notifications. Please click "Get Started" to create your account.'
    );
  };

  return (
    <div className={`min-h-screen relative z-10 overflow-hidden ${language === 'hi' ? 'lang-hi' : 'lang-en'}`}>
      {/* Enhanced Header with Government Branding */}
      <motion.header 
        className="absolute top-0 left-0 right-0 z-20 bg-white/10 backdrop-blur-md border-b border-white/20"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Government Info & National Motto */}
            <motion.div 
              className="flex items-center gap-3 flex-1 min-w-0 max-w-none"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              {/* National Motto Section */}
              <div className="flex-shrink-0 text-center">
                <div className="text-sm font-bold text-blue-800 dark:text-blue-300 tracking-wide">
                  {t.satyamevaJayate}
                </div>
                <div className="text-sm text-orange-600 dark:text-orange-400 font-medium tracking-wider">
                  सत्यमेव जयते
                </div>
              </div>

              {/* Government Title - Removed truncate and adjusted spacing */}
              <div className="flex-1 min-w-0">
                <motion.h1 
                  className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent leading-tight"
                  animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                  transition={{ duration: 8, repeat: Infinity }}
                  style={{ backgroundSize: '200% auto' }}
                >
                  {language === 'hi' ? 'राष्ट्रीय राजधानी क्षेत्र दिल्ली सरकार' : 'Government of NCT of Delhi'}
                </motion.h1>
                <p className="text-xs sm:text-sm text-muted-foreground leading-tight">{t.ministry}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium leading-tight">{language === 'hi' ? 'राष्ट्रीय राजधानी क्षेत्र दिल्ली' : 'National Capital Territory of Delhi'}</p>
              </div>

              {/* Digital India Badge - Adjusted for better responsive behavior */}
              <div className="hidden lg:block flex-shrink-0">
                <Badge 
                  variant="outline" 
                  className="bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 border-blue-300 text-xs whitespace-nowrap"
                >
                  <Flag className="w-3 h-3 mr-1 flex-shrink-0" />
                  {t.digitalIndia}
                </Badge>
              </div>
            </motion.div>

            {/* Right Side - Navigation - Reduced space to accommodate longer left text */}
            <motion.div 
              className="flex items-center gap-1 sm:gap-2 flex-shrink-0"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Contact Info - Hidden on smaller screens to save space */}
              <div className="hidden xl:flex items-center gap-2 text-sm text-muted-foreground">
                <motion.button 
                  className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer text-xs"
                  whileHover={{ scale: 1.05 }}
                  onClick={handlePhoneClick}
                >
                  <Phone className="w-3 h-3 flex-shrink-0" />
                  <span className="whitespace-nowrap">{t.contact.phone}</span>
                </motion.button>
                <motion.button 
                  className="flex items-center gap-1 hover:text-green-600 transition-colors cursor-pointer text-xs"
                  whileHover={{ scale: 1.05 }}
                  onClick={handleEmailClick}
                >
                  <Mail className="w-3 h-3 flex-shrink-0" />
                  <span className="whitespace-nowrap max-w-32">{t.contact.email}</span>
                </motion.button>
              </div>

              {/* Navigation Icons - Reduced size on mobile */}
              <div className="hidden md:flex items-center gap-1">
                <motion.button
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  onClick={handleHelpClick}
                  title={t.navItems.help}
                >
                  <HelpCircle className="w-4 h-4 text-blue-500" />
                </motion.button>
                <motion.button
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  onClick={handleDocumentationClick}
                  title={t.navItems.documentation}
                >
                  <BookOpen className="w-4 h-4 text-green-500" />
                </motion.button>
                <motion.button
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  onClick={handleEmailClick}
                  title={t.navItems.contact}
                >
                  <MessageCircle className="w-4 h-4 text-purple-500" />
                </motion.button>
              </div>

              {/* Dark Mode Toggle */}
              <motion.button
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
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

              {/* Language Toggle - Compact on mobile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1.5 border border-white/30 cursor-pointer"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <Globe className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-xs font-medium hidden sm:inline whitespace-nowrap">
                      {language === 'hi' ? 'हिंदी' : 'English'}
                    </span>
                    <ChevronDown className="w-3 h-3 flex-shrink-0" />
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

              {/* Notification Bell */}
              <motion.button
                className="relative p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                onClick={handleNotificationClick}
                title={t.navItems.notifications}
              >
                <Bell className="w-4 h-4 text-orange-600" />
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Animated Border Bottom */}
        <motion.div
          className="h-1 bg-gradient-to-r from-orange-500 via-blue-500 to-green-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
      </motion.header>

      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-sm"
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

      {/* Hero Section - Updated spacing to accommodate larger header */}
      <section className="container mx-auto px-4 sm:px-6 py-20 pt-32 sm:pt-36">
        <div className="text-center max-w-5xl mx-auto">
          {/* Government Badge - Moved to proper position */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <motion.div 
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-green-600/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-3 mb-8 border border-blue-200/30"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.govInitiative}
              </span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                {t.verified}
              </Badge>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span 
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                style={{ backgroundSize: '200% 200%' }}
              >
                {t.title}
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-4"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-2">
                {t.subtitle}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                {t.description}
              </p>
            </motion.div>

            {/* Stats Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-8"
            >
              {[
                { label: t.stats.businesses, value: '50K+', icon: Building2 },
                { label: t.stats.successRate, value: '99.5%', icon: CheckCircle },
                { label: t.stats.processingTime, value: language === 'hi' ? '70% तेज़' : '70% Faster', icon: Clock },
                { label: t.stats.satisfaction, value: '4.9/5', icon: Star }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 border border-white/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <stat.icon className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-sm sm:text-base">{stat.value}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 sm:px-10 py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-base sm:text-lg"
              >
                {t.getStarted}
                <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 px-8 py-4 rounded-xl hover:bg-accent transition-all duration-300"
                onClick={onWatchDemo}
              >
                <Play className="mr-2 h-5 w-5" />
                {t.watchDemo}
              </Button>
            </motion.div>
          </motion.div>

          {/* AI Assistant Section - Enhanced */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mb-24"
          >
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-green-600/10 backdrop-blur-sm border-2 border-gradient-to-r border-blue-200/30 shadow-2xl">
              <CardContent className="p-6 sm:p-8 text-center">
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                    boxShadow: [
                      '0 10px 25px rgba(59, 130, 246, 0.3)',
                      '0 10px 25px rgba(147, 51, 234, 0.3)',
                      '0 10px 25px rgba(59, 130, 246, 0.3)'
                    ]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {t.ai.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                    {t.ai.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {t.ai.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features Grid - Enhanced */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-4 sm:p-6 text-center">
                  <motion.div
                    className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{feature.description}</p>
                  <Badge variant="secondary" className="bg-white/20 text-foreground text-xs">
                    {feature.stats}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.steps.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.steps.subtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className="relative"
              >
                {/* Connection Line - Hidden on mobile */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 + 0.2 * index }}
                  />
                )}

                <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 relative z-10">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <motion.div
                      className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg relative"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {step.number}
                      </div>
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">{step.description}</p>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.time}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.testimonials.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.testimonials.subtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic text-sm">"{testimonial.message}"</p>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center mb-16"
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-green-600/20 backdrop-blur-sm border-2 border-white/30 shadow-2xl">
            <CardContent className="p-8 sm:p-12">
              <motion.div
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg"
                animate={{ 
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 20px 40px rgba(59, 130, 246, 0.3)',
                    '0 20px 40px rgba(147, 51, 234, 0.3)',
                    '0 20px 40px rgba(59, 130, 246, 0.3)'
                  ]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Rocket className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </motion.div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.cta.title}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t.cta.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    onClick={onGetStarted}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 sm:px-10 py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-base sm:text-lg"
                  >
                    {t.cta.start}
                    <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 sm:px-10 py-4 rounded-xl text-base sm:text-lg"
                  >
                    {t.cta.explore}
                    <Sparkles className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}