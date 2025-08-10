import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Maximize, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface DemoVideoProps {
  className?: string;
  language?: 'en' | 'hi';
}

export function DemoVideo({ className = '', language = 'en' }: DemoVideoProps) {
  const [showDemo, setShowDemo] = useState(false);

  const translations = {
    en: {
      watchDemo: 'Watch Demo'
    },
    hi: {
      watchDemo: 'डेमो देखें'
    }
  };

  const t = translations[language];

  // If demo is not showing, render the trigger button
  if (!showDemo) {
    return (
      <Button 
        variant="outline" 
        size="lg"
        className={`border-2 px-8 py-4 rounded-xl hover:bg-accent transition-all duration-300 ${className}`}
        onClick={() => setShowDemo(true)}
      >
        <Play className="mr-2 h-5 w-5" />
        {t.watchDemo}
      </Button>
    );
  }

  // Full demo component when showing
  return <DemoVideoModal onClose={() => setShowDemo(false)} language={language} />;
}

function DemoVideoModal({ onClose, language = 'en' }: { onClose: () => void; language?: 'en' | 'hi' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const translations = {
    en: {
      title: "EODB Portal - Demo Walkthrough",
      subtitle: "Learn how to use the portal effectively",
      duration: "3:30 mins",
      demoChapters: "Demo Chapters",
      clickToJump: "Click to jump to section",
      whatYouLearn: "What You'll Learn",
      navigateDashboard: "Navigate the dashboard efficiently",
      submitApplications: "Submit license applications",
      useAIAssistant: "Use AI assistant effectively",
      manageCompliance: "Manage compliance deadlines",
      liveDemo: "LIVE DEMO",
      playDemo: "Play Demo",
      pause: "Pause",
      steps: [
        {
          title: "Welcome to EODB Portal",
          description: "Your one-stop solution for all government compliance needs",
          duration: "0:00 - 0:15"
        },
        {
          title: "Dashboard Overview",
          description: "View your applications, deadlines, and compliance status at a glance",
          duration: "0:15 - 0:45"
        },
        {
          title: "License Applications",
          description: "Apply for various business licenses with step-by-step guidance",
          duration: "0:45 - 1:15"
        },
        {
          title: "Document Management",
          description: "Upload, verify, and manage all your business documents securely",
          duration: "1:15 - 1:45"
        },
        {
          title: "AI Assistant",
          description: "Get instant help with voice-enabled AI chatbot support",
          duration: "1:45 - 2:15"
        },
        {
          title: "Compliance Tracking",
          description: "Never miss a deadline with our intelligent compliance calendar",
          duration: "2:15 - 2:45"
        },
        {
          title: "Government Schemes",
          description: "Discover and apply for relevant government schemes and incentives",
          duration: "2:45 - 3:15"
        },
        {
          title: "Real-time Notifications",
          description: "Stay updated with instant notifications and status updates",
          duration: "3:15 - 3:30"
        }
      ]
    },
    hi: {
      title: "ईओडीबी पोर्टल - डेमो वॉकथ्रू",
      subtitle: "पोर्टल का प्रभावी उपयोग सीखें",
      duration: "3:30 मिनट",
      demoChapters: "डेमो अध्याय",
      clickToJump: "सेक्शन पर जाने के लिए क्लिक करें",
      whatYouLearn: "आप क्या सीखेंगे",
      navigateDashboard: "डैशबोर्ड को कुशलता से नेविगेट करें",
      submitApplications: "लाइसेंस आवेदन जमा करें",
      useAIAssistant: "एआई सहायक का प्रभावी उपयोग करें",
      manageCompliance: "अनुपालन की समय सीमा प्रबंधित करें",
      liveDemo: "लाइव डेमो",
      playDemo: "डेमो चलाएं",
      pause: "रोकें",
      steps: [
        {
          title: "ईओडीबी पोर्टल में आपका स्वागत है",
          description: "सभी सरकारी अनुपालन आवश्यकताओं के लिए आपका एक-स्टॉप समाधान",
          duration: "0:00 - 0:15"
        },
        {
          title: "डैशबोर्ड अवलोकन",
          description: "अपने आवेदन, समय सीमा और अनुपालन स्थिति को एक नज़र में देखें",
          duration: "0:15 - 0:45"
        },
        {
          title: "लाइसेंस आवेदन",
          description: "चरणबद्ध मार्गदर्शन के साथ विभिन्न व्यावसायिक लाइसेंसों के लिए आवेदन करें",
          duration: "0:45 - 1:15"
        },
        {
          title: "दस्तावेज़ प्रबंधन",
          description: "अपने सभी व्यावसायिक दस्तावेज़ों को सुरक्षित रूप से अपलोड, सत्यापित और प्रबंधित करें",
          duration: "1:15 - 1:45"
        },
        {
          title: "एआई सहायक",
          description: "वॉयस-सक्षम एआई चैटबॉट सहायता के साथ तत्काल सहायता प्राप्त करें",
          duration: "1:45 - 2:15"
        },
        {
          title: "अनुपालन ट्रैकिंग",
          description: "हमारे बुद्धिमान अनुपालन कैलेंडर के साथ कभी भी महत्वपूर्ण समय सीमा न चूकें",
          duration: "2:15 - 2:45"
        },
        {
          title: "सरकारी योजनाएं",
          description: "प्रासंगिक सरकारी योजनाओं और प्रोत्साहनों की खोज करें और उनके लिए आवेदन करें",
          duration: "2:45 - 3:15"
        },
        {
          title: "रियल-टाइम सूचनाएं",
          description: "तत्काल सूचनाओं और स्थिति अपडेट के साथ अपडेट रहें",
          duration: "3:15 - 3:30"
        }
      ]
    }
  };

  const t = translations[language];
  const demoSteps = t.steps;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Simulate video step progression
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          const next = prev + 1;
          if (next >= demoSteps.length) {
            setIsPlaying(false);
            clearInterval(interval);
            return 0;
          }
          return next;
        });
      }, 4000);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={`bg-background rounded-lg shadow-2xl ${
            isFullscreen ? 'w-full h-full' : 'max-w-4xl w-full max-h-[90vh]'
          } overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
        {/* Video Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold">{t.title}</h3>
            <p className="text-sm text-muted-foreground">{t.subtitle}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{t.duration}</Badge>
            <Button variant="outline" size="icon" onClick={() => setIsFullscreen(!isFullscreen)}>
              <Maximize className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 h-full">
          {/* Video Area */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center relative">
            {/* Simulated Video Player */}
            <div className="text-center p-8">
              <motion.div
                animate={{ 
                  scale: isPlaying ? [1, 1.1, 1] : 1,
                  rotate: isPlaying ? [0, 5, -5, 0] : 0
                }}
                transition={{ 
                  duration: 2, 
                  repeat: isPlaying ? Infinity : 0,
                  ease: "easeInOut"
                }}
                className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Play className="w-12 h-12 text-white" />
              </motion.div>
              
              <h4 className="text-xl font-semibold mb-2">
                {demoSteps[currentStep]?.title || (language === 'hi' ? "ईओडीबी पोर्टल डेमो" : "EODB Portal Demo")}
              </h4>
              <p className="text-muted-foreground mb-6">
                {demoSteps[currentStep]?.description || (language === 'hi' ? "पोर्टल को नेविगेट और उपयोग करने का तरीका देखें" : "Watch how to navigate and use the portal")}
              </p>

              {/* Simulated Progress Indicators */}
              <div className="flex justify-center space-x-2 mb-6">
                {demoSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Video Controls */}
              <div className="flex items-center justify-center space-x-4">
                <Button onClick={handlePlayPause} size="lg">
                  {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                  {isPlaying ? t.pause : t.playDemo}
                </Button>
                
                <Button variant="outline" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Playing Indicator */}
            {isPlaying && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-red-600 text-white animate-pulse">
                  ● {t.liveDemo}
                </Badge>
              </div>
            )}
          </div>

          {/* Demo Steps Sidebar */}
          <div className="border-l border-border bg-card/50">
            <div className="p-4 border-b border-border">
              <h4 className="font-semibold">{t.demoChapters}</h4>
              <p className="text-sm text-muted-foreground">{t.clickToJump}</p>
            </div>
            
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {demoSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    index === currentStep
                      ? 'bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      : 'bg-accent/20 hover:bg-accent/40'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      index === currentStep
                        ? 'bg-blue-600 text-white'
                        : index < currentStep
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-sm">{step.title}</h5>
                      <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                      <p className="text-xs text-blue-600 mt-1">{step.duration}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Demo Features */}
            <div className="p-4 border-t border-border">
              <h5 className="font-medium mb-3">{t.whatYouLearn}</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                  <span>{t.navigateDashboard}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                  <span>{t.submitApplications}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                  <span>{t.useAIAssistant}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                  <span>{t.manageCompliance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}