import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  ArrowLeft,
  CheckCircle,
  Clock,
  Users,
  BookOpen,
  Zap,
  Shield,
  Award,
  FileText,
  Bot,
  Building2,
  Calendar,
  Star,
  Eye,
  SkipBack,
  SkipForward,
  Settings,
  Download,
  Share,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface DemoVideoPageProps {
  language: 'en' | 'hi';
  onBack: () => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export function DemoVideoPage({ language, onBack, darkMode, setDarkMode }: DemoVideoPageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoQuality, setVideoQuality] = useState('1080p');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(1170); // 19:30 minutes in seconds
  const videoRef = useRef<HTMLDivElement>(null);

  const translations = {
    en: {
      title: "EODB Portal - Complete Demo Walkthrough",
      subtitle: "Master the platform with our comprehensive video guide",
      totalDuration: "19:30 mins",
      videoGuide: "Video Guide",
      chapters: "Chapters",
      overview: "Overview",
      keyFeaturesTitle: "Key Features",
      whatYouLearn: "What You'll Learn",
      instructor: "Your Guide",
      goBack: "Back to Welcome",
      playDemo: "Play Video",
      pause: "Pause",
      mute: "Mute",
      unmute: "Unmute",
      fullscreen: "Fullscreen",
      skipPrevious: "Previous Chapter",
      skipNext: "Next Chapter",
      speed: "Speed",
      quality: "Quality",
      share: "Share",
      download: "Download",
      viewCount: "124,567 views",
      rating: "4.9/5 rating",
      completionRate: "98% completion rate",
      languages: "Available in English & Hindi",
      subtitles: "Subtitles available",
      offlineViewing: "Download for offline viewing",
      chapterList: [
        {
          title: "Welcome & Portal Introduction",
          description: "Get familiar with the EODB Portal interface and navigation",
          duration: "2:30",
          icon: Users,
          completed: false
        },
        {
          title: "Account Setup & Login Process",
          description: "Learn how to create and configure your business account",
          duration: "2:15",
          icon: Shield,
          completed: false
        },
        {
          title: "Dashboard Overview & Navigation",
          description: "Explore the main dashboard and understand key metrics",
          duration: "3:00",
          icon: BookOpen,
          completed: false
        },
        {
          title: "License Application Process",
          description: "Step-by-step guide to applying for business licenses",
          duration: "4:20",
          icon: FileText,
          completed: false
        },
        {
          title: "Business Registration Forms",
          description: "Complete guide to registering different business types",
          duration: "3:45",
          icon: Building2,
          completed: false
        },
        {
          title: "Document Upload & Management",
          description: "Learn to upload, verify and manage business documents",
          duration: "2:00",
          icon: Award,
          completed: false
        },
        {
          title: "AI Assistant & Chatbot Features",
          description: "Maximize the AI assistant for instant help and guidance",
          duration: "1:30",
          icon: Bot,
          completed: false
        }
      ],
      learningPoints: [
        "Navigate the portal like a pro",
        "Apply for licenses efficiently",
        "Manage documents securely",
        "Use AI assistant effectively",
        "Track compliance deadlines",
        "Discover government schemes",
        "Handle payments safely",
        "Generate reports easily"
      ],
      featuresList: [
        {
          title: "HD Video Quality",
          description: "Crystal clear 1080p video for better learning"
        },
        {
          title: "Interactive Chapters",
          description: "Jump to any section with clickable chapters"
        },
        {
          title: "Multilingual Support", 
          description: "Available in English and Hindi with subtitles"
        },
        {
          title: "Real Examples",
          description: "Actual portal usage with real-world scenarios"
        },
        {
          title: "Expert Narration",
          description: "Professional guidance from portal experts"
        },
        {
          title: "Mobile Friendly",
          description: "Watch on any device - desktop, tablet, or mobile"
        }
      ],
      instructorInfo: {
        name: "Priya Sharma",
        role: "Senior Portal Specialist",
        experience: "5+ years helping businesses",
        credentials: "Government Certified Trainer"
      }
    },
    hi: {
      title: "ईओडीबी पोर्टल - संपूर्ण डेमो वॉकथ्रू",
      subtitle: "हमारी व्यापक वीडियो गाइड के साथ प्लेटफॉर्म में महारत हासिल करें",
      totalDuration: "19:30 मिनट",
      videoGuide: "वीडियो गाइड",
      chapters: "अध्याय",
      overview: "अवलोकन",
      keyFeaturesTitle: "मुख्य विशेषताएं",
      whatYouLearn: "आप क्या सीखेंगे",
      instructor: "आपका गाइड",
      goBack: "स्वागत पृष्ठ पर वापस",
      playDemo: "वीडियो चलाएं",
      pause: "रोकें",
      mute: "मूक",
      unmute: "आवाज़ चालू",
      fullscreen: "पूर्ण स्क्रीन",
      skipPrevious: "पिछला अध्याय",
      skipNext: "अगला अध्याय",
      speed: "गति",
      quality: "गुणवत्ता",
      share: "साझा करें",
      download: "डाउनलोड करें",
      viewCount: "124,567 बार देखा गया",
      rating: "4.9/5 रेटिंग",
      completionRate: "98% पूर्णता दर",
      languages: "अंग्रेजी और हिंदी में उपलब्ध",
      subtitles: "उपशीर्षक उपलब्ध",
      offlineViewing: "ऑफलाइन देखने के लिए डाउनलोड करें",
      chapterList: [
        {
          title: "स्वागत और पोर्टल परिचय",
          description: "ईओडीबी पोर्टल इंटरफेस और नेविगेशन से परिचित हों",
          duration: "2:30",
          icon: Users,
          completed: false
        },
        {
          title: "खाता सेटअप और लॉगिन प्रक्रिया",
          description: "अपना व्यावसायिक खाता बनाना और कॉन्फ़िगर करना सीखें",
          duration: "2:15",
          icon: Shield,
          completed: false
        },
        {
          title: "डैशबोर्ड अवलोकन और नेविगेशन",
          description: "मुख्य डैशबोर्ड का अन्वेषण करें और प्रमुख मेट्रिक्स को समझें",
          duration: "3:00",
          icon: BookOpen,
          completed: false
        },
        {
          title: "लाइसेंस आवेदन प्रक्रिया",
          description: "व्यावसायिक लाइसेंस के लिए आवेदन करने की चरणबद्ध गाइड",
          duration: "4:20",
          icon: FileText,
          completed: false
        },
        {
          title: "व्यवसाय पंजीकरण फॉर्म",
          description: "विभिन्न व्यावसायिक प्रकारों को पंजीकृत करने की संपूर्ण गाइड",
          duration: "3:45",
          icon: Building2,
          completed: false
        },
        {
          title: "दस्तावेज़ अपलोड और प्रबंधन",
          description: "व्यावसायिक दस्तावेज़ों को अपलोड, सत्यापित और प्रबंधित करना सीखें",
          duration: "2:00",
          icon: Award,
          completed: false
        },
        {
          title: "एआई सहायक और चैटबॉट सुविधाएं",
          description: "तत्काल सहायता और मार्गदर्शन के लिए एआई सहायक का अधिकतम उपयोग",
          duration: "1:30",
          icon: Bot,
          completed: false
        }
      ],
      learningPoints: [
        "पोर्टल को प्रो की तरह नेविगेट करें",
        "कुशलता से लाइसेंस के लिए आवेदन करें",
        "दस्तावेज़ों को सुरक्षित रूप से प्रबंधित करें",
        "एआई सहायक का प्रभावी उपयोग करें",
        "अनुपालन समय सीमा को ट्रैक करें",
        "सरकारी योजनाओं की खोज करें",
        "भुगतान को सुरक्षित रूप से संभालें",
        "आसानी से रिपोर्ट बनाएं"
      ],
      featuresList: [
        {
          title: "एचडी वीडियो गुणवत्ता",
          description: "बेहतर सीखने के लिए क्रिस्टल साफ 1080p वीडियो"
        },
        {
          title: "इंटरैक्टिव अध्याय",
          description: "क्लिक करने योग्य अध्यायों के साथ किसी भी अनुभाग पर जाएं"
        },
        {
          title: "बहुभाषी समर्थन",
          description: "उपशीर्षक के साथ अंग्रेजी और हिंदी में उपलब्ध"
        },
        {
          title: "वास्तविक उदाहरण",
          description: "वास्तविक दुनिया के परिदृश्यों के साथ वास्तविक पोर्टल उपयोग"
        },
        {
          title: "विशेषज्ञ वर्णन",
          description: "पोर्टल विशेषज्ञों से पेशेवर मार्गदर्शन"
        },
        {
          title: "मोबाइल अनुकूल",
          description: "किसी भी डिवाइस पर देखें - डेस्कटॉप, टैबलेट या मोबाइल"
        }
      ],
      instructorInfo: {
        name: "प्रिया शर्मा",
        role: "वरिष्ठ पोर्टल विशेषज्ञ",
        experience: "5+ वर्षों से व्यवसायों की मदद",
        credentials: "सरकारी प्रमाणित प्रशिक्षक"
      }
    }
  };

  const t = translations[language];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate video progress
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          setProgress((newTime / duration) * 100);
          
          // Auto-advance chapters based on time
          const chapterEndTimes = [150, 285, 465, 725, 950, 1070, 1170]; // Cumulative seconds
          const newChapter = chapterEndTimes.findIndex(time => newTime <= time);
          if (newChapter !== -1 && newChapter !== currentChapter) {
            setCurrentChapter(newChapter);
          }
          
          if (newTime >= duration) {
            setIsPlaying(false);
            clearInterval(interval);
            return duration;
          }
          return newTime;
        });
      }, 1000);
    }
  };

  const handleChapterClick = (index: number) => {
    setCurrentChapter(index);
    // Calculate chapter start time
    const chapterStartTimes = [0, 150, 285, 465, 725, 950, 1070];
    const startTime = chapterStartTimes[index] || 0;
    setCurrentTime(startTime);
    setProgress((startTime / duration) * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const skipToNext = () => {
    if (currentChapter < t.chapterList.length - 1) {
      handleChapterClick(currentChapter + 1);
    }
  };

  const skipToPrevious = () => {
    if (currentChapter > 0) {
      handleChapterClick(currentChapter - 1);
    }
  };

  return (
    <div className={`min-h-screen p-6 relative z-10 bg-background ${language === 'hi' ? 'lang-hi' : 'lang-en'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Button variant="outline" onClick={onBack} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.goBack}
            </Button>
            <h1 className="text-4xl font-bold text-foreground">{t.title}</h1>
            <p className="text-xl text-muted-foreground mt-2">{t.subtitle}</p>
            
            {/* Video Stats */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{t.viewCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{t.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{t.completionRate}</span>
              </div>
              <Badge variant="outline">{t.totalDuration}</Badge>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="overflow-hidden">
                <div 
                  ref={videoRef}
                  className={`aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 relative ${
                    isFullscreen ? 'fixed inset-0 z-50 aspect-auto' : ''
                  }`}
                >
                  {/* Video Content Area */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <motion.div
                        animate={{ 
                          scale: isPlaying ? [1, 1.05, 1] : 1,
                          rotate: isPlaying ? [0, 2, -2, 0] : 0
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: isPlaying ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                        className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                      >
                        {isPlaying ? (
                          <Pause className="w-12 h-12 text-white" />
                        ) : (
                          <Play className="w-12 h-12 text-white" />
                        )}
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold mb-4">
                        {t.chapterList[currentChapter]?.title || t.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        {t.chapterList[currentChapter]?.description || t.subtitle}
                      </p>
                      
                      <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-lg px-4 py-2">
                        {isPlaying ? (language === 'hi' ? 'चल रहा है' : 'Playing') : (language === 'hi' ? 'तैयार' : 'Ready')}
                      </Badge>
                    </div>
                  </div>

                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <Progress value={progress} className="h-2 bg-white/20" />
                      <div className="flex justify-between text-white text-sm mt-2">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-4">
                        <Button 
                          onClick={skipToPrevious} 
                          size="icon" 
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                          disabled={currentChapter === 0}
                        >
                          <SkipBack className="w-5 h-5" />
                        </Button>
                        
                        <Button onClick={handlePlayPause} size="lg" variant="secondary">
                          {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                          {isPlaying ? t.pause : t.playDemo}
                        </Button>
                        
                        <Button 
                          onClick={skipToNext} 
                          size="icon" 
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                          disabled={currentChapter === t.chapterList.length - 1}
                        >
                          <SkipForward className="w-5 h-5" />
                        </Button>
                        
                        <Button 
                          onClick={() => setIsMuted(!isMuted)} 
                          size="icon" 
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <select 
                          value={playbackSpeed} 
                          onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                          className="bg-black/50 text-white rounded px-2 py-1 text-sm"
                        >
                          <option value={0.5}>0.5x</option>
                          <option value={0.75}>0.75x</option>
                          <option value={1}>1x</option>
                          <option value={1.25}>1.25x</option>
                          <option value={1.5}>1.5x</option>
                          <option value={2}>2x</option>
                        </select>
                        
                        <Button 
                          onClick={() => setIsFullscreen(!isFullscreen)} 
                          size="icon" 
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                        >
                          <Maximize className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Playing Indicator */}
                  {isPlaying && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-red-600 text-white animate-pulse">
                        ● LIVE
                      </Badge>
                    </div>
                  )}

                  {/* Chapter Indicator */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="outline" className="bg-black/50 text-white border-white/30">
                      {currentChapter + 1}/{t.chapterList.length}
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Video Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Button variant="outline">
                        <Share className="w-4 h-4 mr-2" />
                        {t.share}
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        {t.download}
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Monitor className="w-4 h-4" />
                        <Tablet className="w-4 h-4" />
                        <Smartphone className="w-4 h-4" />
                        <span>{language === 'hi' ? 'सभी डिवाइस' : 'All Devices'}</span>
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <span>{t.languages}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chapters */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    {t.chapters}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {t.chapterList.map((chapter, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-accent ${
                          index === currentChapter
                            ? 'bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                            : 'bg-accent/20 hover:bg-accent/40'
                        }`}
                        onClick={() => handleChapterClick(index)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            index === currentChapter
                              ? 'bg-blue-600 text-white'
                              : chapter.completed
                                ? 'bg-green-600 text-white'
                                : 'bg-muted text-muted-foreground'
                          }`}>
                            {chapter.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-sm">{chapter.title}</h5>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{chapter.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-blue-600">{chapter.duration}</span>
                              <chapter.icon className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* What You'll Learn */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    {t.whatYouLearn}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {t.learningPoints.map((point, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Instructor Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {t.instructor}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b1a2?w=48&h=48&fit=crop&crop=face" />
                      <AvatarFallback>PS</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{t.instructorInfo.name}</h4>
                      <p className="text-sm text-muted-foreground">{t.instructorInfo.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{t.instructorInfo.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-green-600" />
                      <span>{t.instructorInfo.credentials}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    {t.keyFeaturesTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {t.featuresList.map((feature, index) => (
                      <div key={index} className="border border-border rounded-lg p-3">
                        <h5 className="font-medium text-sm mb-1">{feature.title}</h5>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}