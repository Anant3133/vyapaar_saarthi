import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Send,
  Bot,
  RefreshCw,
  Languages,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Download,
  Paperclip,
  Plus,
  X,
  Settings,
  Sparkles,
  Shield,
  Search,
  Zap,
  Brain,
  MessageCircle,
  FileText,
  Award,
  Building2,
  Clock,
  Star,
  ThumbsUp,
  Bookmark
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { dataService } from '../../utils/supabase/client';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  actionItems?: any[];
  attachments?: any[];
  metadata?: {
    confidence?: number;
    processingTime?: number;
    sources?: string[];
    intent?: string;
  };
  liked?: boolean;
  bookmarked?: boolean;
  isTyping?: boolean;
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

interface ChatbotPageProps {
  language: 'en' | 'hi';
}

export function ChatbotPage({ language }: ChatbotPageProps) {
  const translations = {
    en: {
      title: 'AI Assistant',
      subtitle: 'Advanced AI-powered support with real-time problem solving',
      securePrivate: 'Secure & Private',
      clear: 'Clear',
      online: 'AI Assistant - Online',
      messages: 'messages',
      messagePlaceholder: 'Type your message here...',
      suggestions: 'Suggestions:',
      voiceNotSupported: 'Voice input is not supported in this browser',
      greeting: '🙏 Namaste! I\'m your AI Assistant for the EODB Portal. I can help you with:\n\n🏢 License applications and registrations\n📋 Compliance requirements and deadlines\n🎯 Government schemes and incentives\n📊 Application status tracking\n📚 Document requirements\n🔍 Search and recommendations\n\nWhat would you like to know about your business journey today?',
      defaultSuggestions: [
        'How to apply for a trade license?',
        'What documents do I need for GST registration?',
        'Show me available schemes for startups',
        'Check my application status',
        'Upcoming compliance deadlines'
      ],
      errorMessage: 'Sorry, I had trouble processing your request. Please try again or rephrase your question.',
      errorSuggestions: ['Try asking differently', 'Contact support', 'View help topics'],
      quickActions: {
        licenses: {
          category: 'Licenses',
          actions: [
            'How to apply for a trade license?',
            'GST registration process',
            'Environmental clearance requirements',
            'Fire safety certificate process'
          ]
        },
        schemes: {
          category: 'Schemes',
          actions: [
            'Startup India benefits',
            'MSME schemes available',
            'Digital India initiatives',
            'Export promotion schemes'
          ]
        },
        compliance: {
          category: 'Compliance',
          actions: [
            'Upcoming deadlines',
            'Annual filing requirements',
            'Tax compliance checklist',
            'Regulatory updates'
          ]
        },
        support: {
          category: 'Support',
          actions: [
            'Contact support team',
            'Schedule consultation',
            'Technical assistance',
            'Document help'
          ]
        }
      },
      capabilities: [
        'Voice Recognition',
        'Text-to-Speech',
        'Context Awareness',
        'Smart Suggestions',
        'Multi-language',
        'Secure Chat'
      ],
      settings: {
        voiceEnabled: 'Voice Input',
        autoPlay: 'Auto-play Responses',
        contextualMode: 'Contextual Mode',
        smartSuggestions: 'Smart Suggestions',
        aiModel: 'AI Model'
      }
    },
    hi: {
      title: 'एआई सहायक',
      subtitle: 'वास्तविक समय समस्या समाधान के साथ उन्नत एआई-संचालित सहायता',
      securePrivate: 'सुरक्षित और निजी',
      clear: 'साफ़ करें',
      online: 'एआई सहायक - ऑनलाइन',
      messages: 'संदेश',
      messagePlaceholder: 'अपना संदेश यहाँ लिखें...',
      suggestions: 'सुझाव:',
      voiceNotSupported: 'वॉयस इनपुट इस ब्राउज़र में समर्थित नहीं है',
      greeting: '🙏 नमस्ते! मैं ईओडीबी पोर्टल के लिए आपका एआई सहायक हूं। मैं इसमें आपकी सहायता कर सकता हूं:\n\n🏢 लाइसेंस आवेदन और पंजीकरण\n📋 अनुपालन आवश्यकताएं और समय सीमा\n🎯 सरकारी योजनाएं और प्रोत्साहन\n📊 आवेदन स्थिति ट्रैकिंग\n📚 दस्तावेज़ आवश्यकताएं\n🔍 खोज और सिफारिशें\n\nआज आप अपनी व्यावसायिक यात्रा के बारे में क्या जानना चाहेंगे?',
      defaultSuggestions: [
        'व्यापार लाइसेंस के लिए कैसे आवेदन करें?',
        'जीएसटी पंजीकरण के लिए मुझे कौन से दस्तावेज़ चाहिए?',
        'स्टार्टअप के लिए उपलब्ध योजनाएं दिखाएं',
        'मेरी आवेदन स्थिति जांचें',
        'आगामी अनुपालन समय सीमा'
      ],
      errorMessage: 'माफ करें, मुझे आपके सवाल को समझने में समस्या हुई है। कृपया दोबारा कोशिश करें।',
      errorSuggestions: ['अलग तरीके से पूछें', 'सहायता से संपर्क करें', 'सहायता विषय देखें'],
      quickActions: {
        licenses: {
          category: 'लाइसेंस',
          actions: [
            'व्यापार लाइसेंस के लिए कैसे आवेदन करें?',
            'जीएसटी पंजीकरण प्रक्रिया',
            'पर्यावरण मंजूरी आवश्यकताएं',
            'अग्नि सुरक्षा प्रमाणपत्र प्रक्रिया'
          ]
        },
        schemes: {
          category: 'योजनाएं',
          actions: [
            'स्टार्टअप इंडिया लाभ',
            'एमएसएमई योजनाएं उपलब्ध',
            'डिजिटल इंडिया पहल',
            'निर्यात संवर्धन योजनाएं'
          ]
        },
        compliance: {
          category: 'अनुपालन',
          actions: [
            'आगामी समय सीमा',
            'वार्षिक फाइलिंग आवश्यकताएं',
            'कर अनुपालन चेकलिस्ट',
            'नियामक अपडेट'
          ]
        },
        support: {
          category: 'सहायता',
          actions: [
            'सहायता टीम से संपर्क करें',
            'परामर्श शेड्यूल करें',
            'तकनीकी सहायता',
            'दस्तावेज़ सहायता'
          ]
        }
      },
      capabilities: [
        'वॉयस पहचान',
        'टेक्स्ट-टू-स्पीच',
        'संदर्भ जागरूकता',
        'स्मार्ट सुझाव',
        'बहुभाषी',
        'सुरक्षित चैट'
      ],
      settings: {
        voiceEnabled: 'वॉयस इनपुट',
        autoPlay: 'ऑटो-प्ले प्रतिक्रियाएं',
        contextualMode: 'संदर्भित मोड',
        smartSuggestions: 'स्मार्ट सुझाव',
        aiModel: 'एआई मॉडल'
      }
    }
  };

  const t = translations[language];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: t.greeting,
      timestamp: new Date(),
      suggestions: t.defaultSuggestions,
      metadata: {
        confidence: 100,
        processingTime: 0,
        intent: 'greeting'
      }
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi'>(language);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [contextualMode, setContextualMode] = useState(true);
  const [smartSuggestions, setSmartSuggestions] = useState(true);
  const [selectedModel, setSelectedModel] = useState('advanced');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const speechServices = useRef<any>({});

  // Initialize speech services
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechServices.current.synthesis = window.speechSynthesis;
    }
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      speechServices.current.recognition = new (window as any).webkitSpeechRecognition();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced AI response with comprehensive user-specific problem solving
  const generateRealTimeResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // License renewal queries
    if (lowerQuery.includes('renew') || lowerQuery.includes('renewal') || 
        lowerQuery.includes('नवीनीकरण') || lowerQuery.includes('रिन्यू')) {
      return language === 'hi' 
        ? `🔄 **लाइसेंस नवीनीकरण सहायता**\n\n**आपके नवीनीकरण विकल्प:**\n• तत्काल ऑनलाइन नवीनीकरण\n• मानक नवीनीकरण (15-20 दिन)\n• त्वरित नवीनीकरण (5-7 दिन)\n\n**आपके मौजूदा लाइसेंस:**\n🚨 व्यापार लाइसेंस - समाप्त हो गया\n⚠️ अग्नि सुरक्षा प्रमाणपत्र - 7 दिनों में समाप्त\n✅ पर्यावरण मंजूरी - सक्रिय\n\n**तत्काल कार्य:** नवीनीकरण पृष्ठ पर जाएं और अपने समाप्त हो चुके लाइसेंस को नवीनीकृत करें।`
        : `🔄 **License Renewal Assistance**\n\n**Your Renewal Options:**\n• Instant online renewal\n• Standard renewal (15-20 days)\n• Expedited renewal (5-7 days)\n\n**Your Current Licenses:**\n🚨 Trade License - Expired\n⚠️ Fire Safety Certificate - Expires in 7 days\n✅ Environmental Clearance - Active\n\n**Immediate Action:** Go to renewal page and renew your expired licenses.`;
    }

    // Application status queries
    if (lowerQuery.includes('status') || lowerQuery.includes('track') || lowerQuery.includes('progress') ||
        lowerQuery.includes('स्थिति') || lowerQuery.includes('ट्रैक') || lowerQuery.includes('प्रगति')) {
      return language === 'hi'
        ? `📊 **आवेदन स्थिति ट्रैकिंग**\n\n**आपके हाल के आवेदन:**\n\n**1. कंपनी पंजीकरण (APP-2024-001)**\n• स्थिति: दस्तावेज़ सत्यापन चरण\n• प्रगति: 60% पूर्ण\n• अगला कदम: अधिकारी समीक्षा\n• अनुमानित समय: 3-5 दिन\n\n**2. जीएसटी पंजीकरण (GST-2024-002)**\n• स्थिति: अनुमोदित\n• प्रमाणपत्र डाउनलोड के लिए तैयार\n\n**तत्काल कार्य:** डैशबोर्ड पर जाकर विस्तृत स्थिति देखें।`
        : `📊 **Application Status Tracking**\n\n**Your Recent Applications:**\n\n**1. Company Registration (APP-2024-001)**\n• Status: Document Verification Stage\n• Progress: 60% Complete\n• Next Step: Officer Review\n• Estimated Time: 3-5 days\n\n**2. GST Registration (GST-2024-002)**\n• Status: Approved\n• Certificate Ready for Download\n\n**Immediate Action:** Visit dashboard to view detailed status.`;
    }
    
    // Real-time problem-solving responses
    if (lowerQuery.includes('application stuck') || lowerQuery.includes('not moving') || lowerQuery.includes('delayed') ||
        lowerQuery.includes('आवेदन अटका') || lowerQuery.includes('नहीं हो रहा') || lowerQuery.includes('देरी')) {
      return language === 'hi' 
        ? `🚨 **आवेदन प्रसंस्करण समस्या समाधान**\n\n**समस्या विश्लेषण:**\n✅ सभी दस्तावेज़ अपलोड किए गए\n✅ भुगतान पूर्ण\n❌ अधिकारी अनुमोदन लंबित\n\n**तत्काल समाधान:**\n1. **अधिकारी को सीधे संपर्क करें:**\n   📞 +91-11-2345-6789\n   📧 officer.review@gov.in\n\n2. **त्वरित ट्रैकिंग सेवा:**\n   • SMS अपडेट चालू करें\n   • व्हाट्सऐप अलर्ट सेट करें\n\n3. **वैकल्पिक कार्य:**\n   • ऑनलाइन शिकायत दर्ज करें\n   • हेल्पडेस्क टिकट बनाएं\n\n**औसत समाधान समय:** 24-48 घंटे`
        : `🚨 **Application Processing Issue Resolution**\n\n**Problem Analysis:**\n✅ All documents uploaded\n✅ Payment completed\n❌ Officer approval pending\n\n**Immediate Solutions:**\n1. **Contact Officer Directly:**\n   📞 +91-11-2345-6789\n   📧 officer.review@gov.in\n\n2. **Fast Track Service:**\n   • Enable SMS updates\n   • Set WhatsApp alerts\n\n3. **Alternative Actions:**\n   • File online complaint\n   • Create helpdesk ticket\n\n**Average Resolution Time:** 24-48 hours`;
    }
    
    // Payment and fee queries
    if (lowerQuery.includes('payment') || lowerQuery.includes('fee') || lowerQuery.includes('cost') ||
        lowerQuery.includes('भुगतान') || lowerQuery.includes('शुल्क') || lowerQuery.includes('फीस')) {
      return language === 'hi'
        ? `💳 **विस्तृत भुगतान गाइड**\n\n**सभी सरकारी शुल्क:**\n\n**लाइसेंस शुल्क:**\n• व्यापार लाइसेंस: ₹500\n• व्यापार लाइसेंस नवीनीकरण: ₹300\n• अग्नि सुरक्षा प्रमाणपत्र: ₹1,200\n• पर्यावरण मंजूरी: ₹2,000\n\n**पंजीकरण शुल्क:**\n• प्राइवेट लिमिटेड कंपनी: ₹8,000\n• साझेदारी फर्म: ₹3,000\n• एकल स्वामित्व: ₹1,000\n\n**उपलब्ध भुगतान विधियां:**\n🔒 UPI (तत्काल)\n🔒 नेट बैंकिंग\n🔒 कार्ड भुगतान\n🔒 डिजिटल वॉलेट\n\n**छूट योग्यता:** MSME पंजीकृत व्यवसायों को 20% छूट`
        : `💳 **Comprehensive Payment Guide**\n\n**All Government Fees:**\n\n**License Fees:**\n• Trade License: ₹500\n• Trade License Renewal: ₹300\n• Fire Safety Certificate: ₹1,200\n• Environmental Clearance: ₹2,000\n\n**Registration Fees:**\n• Private Limited Company: ₹8,000\n• Partnership Firm: ₹3,000\n• Sole Proprietorship: ₹1,000\n\n**Available Payment Methods:**\n🔒 UPI (Instant)\n🔒 Net Banking\n🔒 Card Payment\n🔒 Digital Wallets\n\n**Discount Eligibility:** 20% discount for MSME registered businesses`;
    }

    // Document queries
    if (lowerQuery.includes('document') || lowerQuery.includes('upload') || lowerQuery.includes('certificate') ||
        lowerQuery.includes('दस्तावेज़') || lowerQuery.includes('अपलोड') || lowerQuery.includes('प्रमाणपत्र')) {
      return language === 'hi'
        ? `📋 **दस्तावेज़ सहायता केंद्र**\n\n**आवश्यक दस्तावेज़ चेकलिस्ट:**\n\n**व्यक्तिगत दस्तावेज़:**\n✅ आधार कार्ड (स्व-सत्यापित)\n✅ पैन कार्ड (स्व-सत्यापित)\n✅ पासपोर्ट साइज फोटो\n✅ हस्ताक्षर प्रमाण\n\n**व्यावसायिक दस्तावेज़:**\n✅ पंजीकृत कार्यालय का पता प्रमाण\n✅ बैंक स्टेटमेंट (3 महीने)\n✅ किराया समझौता/संपत्ति दस्तावेज़\n\n**अपलोड दिशानिर्देश:**\n• फ़ाइल प्रारूप: PDF, JPG, PNG\n• अधिकतम आकार: 5MB प्रति फ़ाइल\n• गुणवत्ता: उच्च रिज़ॉल्यूशन, स्पष्ट टेक्स्ट\n\n**तत्काल सहायता:** डॉक्यूमेंट वेरिफिकेशन हेल्पलाइन 1800-XXX-XXXX`
        : `📋 **Document Assistance Center**\n\n**Required Documents Checklist:**\n\n**Personal Documents:**\n✅ Aadhaar Card (Self-attested)\n✅ PAN Card (Self-attested)\n✅ Passport Size Photos\n✅ Signature Proof\n\n**Business Documents:**\n✅ Registered Office Address Proof\n✅ Bank Statement (3 months)\n✅ Rent Agreement/Property Documents\n\n**Upload Guidelines:**\n• File Format: PDF, JPG, PNG\n• Max Size: 5MB per file\n• Quality: High resolution, clear text\n\n**Immediate Help:** Document Verification Helpline 1800-XXX-XXXX`;
    }

    // Compliance and deadline queries
    if (lowerQuery.includes('compliance') || lowerQuery.includes('deadline') || lowerQuery.includes('due') ||
        lowerQuery.includes('अनुपालन') || lowerQuery.includes('समय सीमा') || lowerQuery.includes('देय')) {
      return language === 'hi'
        ? `⏰ **अनुपालन कैलेंडर और महत्वपूर्ण तिथियां**\n\n**इस महीने की समय सीमाएं:**\n\n🔴 **तत्काल कार्य (7 दिनों के भीतर):**\n• जीएसटी रिटर्न फाइलिंग - 20 जनवरी\n• टीडीएस भुगतान - 7 जनवरी\n• अग्नि सुरक्षा लाइसेंस नवीनीकरण - 15 जनवरी\n\n🟡 **आगामी समय सीमाएं (30 दिनों के भीतर):**\n• इनकम टैक्स रिटर्न - 31 जनवरी\n• ईपीएफ भुगतान - 15 फरवरी\n• व्यापार लाइसेंस नवीनीकरण - 28 फरवरी\n\n**स्वचालित रिमाइंडर सेट करें:**\n📱 SMS अलर्ट\n📧 ईमेल नोटिफिकेशन\n📲 व्हाट्सऐप अपडेट\n\n**तत्काल कार्य:** अनुपालन ट्रैकर पेज पर जाएं`
        : `⏰ **Compliance Calendar & Important Dates**\n\n**This Month's Deadlines:**\n\n🔴 **Urgent Actions (Within 7 days):**\n• GST Return Filing - Jan 20\n• TDS Payment - Jan 7\n• Fire Safety License Renewal - Jan 15\n\n🟡 **Upcoming Deadlines (Within 30 days):**\n• Income Tax Return - Jan 31\n• EPF Payment - Feb 15\n• Trade License Renewal - Feb 28\n\n**Set Automatic Reminders:**\n📱 SMS Alerts\n📧 Email Notifications\n📲 WhatsApp Updates\n\n**Immediate Action:** Visit Compliance Tracker page`;
    }

    // Scheme and incentive queries
    if (lowerQuery.includes('scheme') || lowerQuery.includes('incentive') || lowerQuery.includes('benefit') ||
        lowerQuery.includes('योजना') || lowerQuery.includes('प्रोत्साहन') || lowerQuery.includes('लाभ')) {
      return language === 'hi'
        ? `🎯 **व्यक्तिगत योजना सिफारिशें**\n\n**आपके व्यवसाय के लिए मैच की गई योजनाएं:**\n\n🌟 **उच्च प्राथमिकता (तत्काल आवेदन करें):**\n• स्टार्टअप इंडिया सीड फंड - ₹50 लाख तक\n• प्रधानमंत्री रोजगार सृजन कार्यक्रम - ₹25 लाख तक\n• मुद्रा लोन योजना - ₹10 लाख तक\n\n💰 **कर लाभ योजनाएं:**\n• धारा 80-आईए कर छूट - 100% कर छूट 3 साल\n• जीएसटी छूट - ₹40 लाख तक टर्नओवर\n\n📋 **आवेदन आवश्यकताएं:**\n✅ आपकी पात्रता: 95% मैच\n✅ दस्तावेज़ तैयार: 80% पूर्ण\n\n**तत्काल कार्य:** योजना पृष्ठ पर जाकर आवेदन शुरू करें`
        : `🎯 **Personalized Scheme Recommendations**\n\n**Matched Schemes for Your Business:**\n\n🌟 **High Priority (Apply Immediately):**\n• Startup India Seed Fund - Up to ₹50 lakhs\n• PM Employment Generation Programme - Up to ₹25 lakhs\n• Mudra Loan Scheme - Up to ₹10 lakhs\n\n💰 **Tax Benefit Schemes:**\n• Section 80-IA Tax Exemption - 100% tax exemption for 3 years\n• GST Exemption - Up to ₹40 lakhs turnover\n\n📋 **Application Requirements:**\n✅ Your Eligibility: 95% Match\n✅ Documents Ready: 80% Complete\n\n**Immediate Action:** Visit schemes page to start application`;
    }

    // General business guidance
    if (lowerQuery.includes('start') || lowerQuery.includes('begin') || lowerQuery.includes('new business') ||
        lowerQuery.includes('शुरू') || lowerQuery.includes('नया व्यवसाय') || lowerQuery.includes('आरंभ')) {
      return language === 'hi'
        ? `🚀 **नया व्यवसाय शुरू करने का पूरा गाइड**\n\n**चरणबद्ध प्रक्रिया:**\n\n**चरण 1: व्यावसायिक संरचना चुनें (आज)**\n• एकल स्वामित्व - सबसे सरल\n• साझेदारी फर्म - 2+ साझीदार\n• प्राइवेट लिमिटेड - सीमित देयता\n\n**चरण 2: पंजीकरण (1-2 सप्ताह)**\n• कंपनी नाम आरक्षण\n• निगमन प्रमाणपत्र\n• पैन और टैन प्राप्त करें\n\n**चरण 3: अनुपालन सेटअप (2-3 सप्ताह)**\n• जीएसटी पंजीकरण\n• व्यापार लाइसेंस\n• बैंक खाता खोलना\n\n**अनुमानित लागत:** ₹8,000-15,000\n**अनुमानित समय:** 3-4 सप्ताह\n\n**अगला कदम:** पंजीकरण फॉर्म भरना शुरू करें`
        : `🚀 **Complete Guide to Starting New Business**\n\n**Step-by-Step Process:**\n\n**Step 1: Choose Business Structure (Today)**\n• Sole Proprietorship - Simplest\n• Partnership Firm - 2+ Partners\n• Private Limited - Limited Liability\n\n**Step 2: Registration (1-2 weeks)**\n• Company Name Reservation\n• Certificate of Incorporation\n• Obtain PAN and TAN\n\n**Step 3: Compliance Setup (2-3 weeks)**\n• GST Registration\n• Trade License\n• Bank Account Opening\n\n**Estimated Cost:** ₹8,000-15,000\n**Estimated Time:** 3-4 weeks\n\n**Next Step:** Start filling registration form`;
    }
    
    // Default enhanced intelligent response with user context
    return language === 'hi'
      ? `🤖 **AI असिस्टेंट - व्यक्तिगत सहायता**\n\nमैं "${query}" के बारे में आपके सवाल को समझ गया हूं। आपकी प्रोफाइल के आधार पर, यहां हैं सबसे प्रासंगिक सहायता विकल्प:\n\n**तत्काल सहायता उपलब्ध:**\n🔴 एक्सप्रेस सहायता - तुरंत जवाब\n🟢 सरकारी अधिकारी लाइव चैट\n📋 दस्तावेज़ सत्यापन सेवा\n📊 रियल-टाइम आवेदन ट्रैकिंग\n💳 पेमेंट गेटवे सहायता\n\n**स्मार्ट सुझाव:**\n• आपके क्षेत्र के लिए विशेष योजनाएं\n• समय सीमा अनुस्मारक सेटअप\n• व्यावसायिक अनुपालन चेकलिस्ट\n\n**प्राथमिकता स्तर:** उच्च\nकृपया अधिक विशिष्ट जानकारी दें ताकि मैं बेहतर सहायता कर सकूं।`
      : `🤖 **AI Assistant - Personalized Help**\n\nI understand your question about "${query}". Based on your profile, here are the most relevant assistance options:\n\n**Immediate Help Available:**\n🔴 Express Support - Instant answers\n🟢 Government Officer Live Chat\n📋 Document Verification Service\n📊 Real-time Application Tracking\n💳 Payment Gateway Assistance\n\n**Smart Suggestions:**\n• Specialized schemes for your sector\n• Deadline reminder setup\n• Business compliance checklist\n\n**Priority Level:** High\nPlease provide more specific details so I can assist you better.`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    const query = inputMessage;
    setInputMessage('');
    setAttachments([]);
    setIsTyping(true);
    setIsLoading(true);

    try {
      // Simulate processing time for realism
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiResponse = generateRealTimeResponse(query);
      
      const responseSuggestions = language === 'hi' 
        ? [
          'मेरी आवेदन स्थिति जांचें',
          'गुम दस्तावेज़ अपलोड करें',
          'अधिकारी परामर्श शेड्यूल करें',
          'अनुपालन रिमाइंडर सेट करें',
          'भुगतान इतिहास देखें'
        ]
        : [
          'Check my application status',
          'Upload missing documents',
          'Schedule officer consultation',
          'Set compliance reminders',
          'View payment history'
        ];
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: aiResponse,
        timestamp: new Date(),
        suggestions: responseSuggestions,
        metadata: {
          confidence: 95,
          processingTime: 1200,
          intent: 'problem_solving',
          sources: ['Real-time Database', 'Government APIs', 'AI Analysis']
        }
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      if (autoPlay && voiceEnabled) {
        setTimeout(() => {
          playMessageAudio(aiResponse);
        }, 500);
      }
      
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: t.errorMessage,
        timestamp: new Date(),
        suggestions: t.errorSuggestions
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleVoiceInput = async () => {
    const { recognition } = speechServices.current;
    
    if (!recognition) {
      alert(t.voiceNotSupported);
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }

    try {
      setIsListening(true);
      recognition.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (error) {
      console.error('Voice input error:', error);
      setIsListening(false);
    }
  };

  const playMessageAudio = async (text: string) => {
    const { synthesis } = speechServices.current;
    
    if (!synthesis || isSpeaking) return;
    
    try {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthesis.speak(utterance);
    } catch (error) {
      console.error('Text-to-speech error:', error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    const { synthesis } = speechServices.current;
    if (synthesis) {
      synthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const attachment: Attachment = {
        id: Date.now().toString() + Math.random().toString(36),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file)
      };
      setAttachments(prev => [...prev, attachment]);
    });
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const likeMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, liked: !msg.liked } : msg
    ));
  };

  const bookmarkMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, bookmarked: !msg.bookmarked } : msg
    ));
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleQuickAction = (query: string) => {
    setInputMessage(query);
    setTimeout(() => handleSendMessage(), 100);
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      type: 'bot',
      content: t.greeting,
      timestamp: new Date(),
      suggestions: t.defaultSuggestions,
      metadata: {
        confidence: 100,
        processingTime: 0,
        intent: 'greeting'
      }
    }]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const quickActions = [
    {
      category: t.quickActions.licenses.category,
      icon: FileText,
      color: 'bg-blue-600',
      actions: t.quickActions.licenses.actions
    },
    {
      category: t.quickActions.schemes.category,
      icon: Award,
      color: 'bg-green-600',
      actions: t.quickActions.schemes.actions
    },
    {
      category: t.quickActions.compliance.category,
      icon: Shield,
      color: 'bg-purple-600',
      actions: t.quickActions.compliance.actions
    },
    {
      category: t.quickActions.support.category,
      icon: MessageCircle,
      color: 'bg-orange-600',
      actions: t.quickActions.support.actions
    }
  ];

  const capabilities = [
    { name: t.capabilities[0], icon: Mic, enabled: voiceEnabled },
    { name: t.capabilities[1], icon: Volume2, enabled: true },
    { name: t.capabilities[2], icon: Brain, enabled: contextualMode },
    { name: t.capabilities[3], icon: Sparkles, enabled: smartSuggestions },
    { name: t.capabilities[4], icon: Languages, enabled: true },
    { name: t.capabilities[5], icon: Shield, enabled: true }
  ];

  return (
    <div className={`h-screen flex flex-col p-6 relative z-10 overflow-hidden ${language === 'hi' ? 'lang-hi' : 'lang-en'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full flex flex-col"
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <span>{t.title}</span>
            </h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20">
              <Shield className="w-3 h-3 mr-1" />
              {t.securePrivate}
            </Badge>
            <Button variant="outline" size="sm" onClick={() => setSelectedLanguage(selectedLanguage === 'en' ? 'hi' : 'en')}>
              <Languages className="w-4 h-4 mr-2" />
              {selectedLanguage === 'en' ? 'हिंदी' : 'English'}
            </Button>
            <Button variant="outline" size="sm" onClick={clearChat}>
              <RefreshCw className="w-4 h-4 mr-2" />
              {t.clear}
            </Button>
          </div>
        </div>

        {/* Main Content - Flexible with proper overflow handling */}
        <div className="flex-1 grid lg:grid-cols-4 gap-6 min-h-0 overflow-hidden">
          {/* Chat Interface - Scrollable */}
          <div className="lg:col-span-3 flex flex-col min-h-0">
            <Card className="flex-1 bg-card/50 backdrop-blur-sm flex flex-col min-h-0 border-2">
              <CardHeader className="flex-shrink-0 border-b border-border">
                <CardTitle className="flex items-center space-x-2">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span>{t.online}</span>
                  <Badge variant="secondary" className="ml-auto">
                    {messages.length - 1} {t.messages}
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              {/* Messages Area - Properly scrollable */}
              <CardContent className="flex-1 p-0 min-h-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-6 space-y-6">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarFallback className={`${message.type === 'user' ? 'bg-gradient-to-r from-green-600 to-blue-600' : 'bg-gradient-to-r from-blue-600 to-purple-600'} text-white`}>
                              {message.type === 'user' ? 'U' : <Bot className="w-4 h-4" />}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`rounded-2xl px-4 py-3 ${message.type === 'user' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-card border border-border'}`}>
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                            {message.metadata && (
                              <div className="mt-2 text-xs opacity-70">
                                <div className="flex items-center space-x-2">
                                  {message.metadata.confidence && (
                                    <span>{language === 'hi' ? 'विश्वसनीयता' : 'Confidence'}: {message.metadata.confidence}%</span>
                                  )}
                                  {message.metadata.processingTime && (
                                    <>
                                      <span>•</span>
                                      <span>{message.metadata.processingTime}ms</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            )}
                            {message.type === 'bot' && (
                              <div className="flex items-center space-x-2 mt-3">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => likeMessage(message.id)}
                                  className={`h-6 px-2 ${message.liked ? 'text-red-500' : ''}`}
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => bookmarkMessage(message.id)}
                                  className={`h-6 px-2 ${message.bookmarked ? 'text-yellow-500' : ''}`}
                                >
                                  <Bookmark className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyMessage(message.content)}
                                  className="h-6 px-2"
                                >
                                  <MessageSquare className="w-3 h-3" />
                                </Button>
                                {voiceEnabled && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => isSpeaking ? stopSpeaking() : playMessageAudio(message.content)}
                                    className="h-6 px-2"
                                  >
                                    {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Typing Indicator */}
                    <AnimatePresence>
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex justify-start"
                        >
                          <div className="flex items-start space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                <Bot className="w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="bg-card border border-border rounded-2xl px-4 py-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Suggestions */}
                    {messages.length > 0 && messages[messages.length - 1].suggestions && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">{t.suggestions}</h4>
                        <div className="flex flex-wrap gap-2 justify-start">
                          {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
                            <motion.button
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2, delay: index * 0.1 }}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-1 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm transition-colors duration-200"
                            >
                              {suggestion}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>
              
              {/* Input Area - Fixed at bottom */}
              <div className="flex-shrink-0 p-4 border-t border-border bg-card/50">
                {/* Attachments */}
                {attachments.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center space-x-2 bg-accent/20 rounded-lg px-3 py-1">
                        <span className="text-sm">{attachment.name}</span>
                        <span className="text-xs text-muted-foreground">({formatFileSize(attachment.size)})</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5"
                          onClick={() => removeAttachment(attachment.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex-1 relative">
                    <Input
                      placeholder={t.messagePlaceholder}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      disabled={isLoading}
                      className="pr-12"
                    />
                  </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleVoiceInput}
                    className={isListening ? 'bg-red-50 text-red-600' : ''}
                    disabled={!voiceEnabled}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  />
                </div>

                {/* Quick Settings */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={voiceEnabled}
                        onCheckedChange={setVoiceEnabled}
                        className="scale-75"
                      />
                      <Label className="text-xs">{t.settings.voiceEnabled}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={autoPlay}
                        onCheckedChange={setAutoPlay}
                        className="scale-75"
                      />
                      <Label className="text-xs">{t.settings.autoPlay}</Label>
                    </div>
                  </div>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-32 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">{language === 'hi' ? 'बेसिक' : 'Basic'}</SelectItem>
                      <SelectItem value="advanced">{language === 'hi' ? 'एडवांस्ड' : 'Advanced'}</SelectItem>
                      <SelectItem value="expert">{language === 'hi' ? 'एक्सपर्ट' : 'Expert'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar - Quick Actions and Capabilities */}
          <div className="lg:col-span-1 space-y-6 overflow-y-auto">
            {/* Quick Actions */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">{language === 'hi' ? 'त्वरित कार्य' : 'Quick Actions'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-6 h-6 rounded-full ${category.color} flex items-center justify-center`}>
                          <Icon className="w-3 h-3 text-white" />
                        </div>
                        <h4 className="text-sm font-medium">{category.category}</h4>
                      </div>
                      <div className="space-y-1 pl-8">
                        {category.actions.slice(0, 2).map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={() => handleQuickAction(action)}
                            className="block text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 text-left"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* AI Capabilities */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">{language === 'hi' ? 'एआई क्षमताएं' : 'AI Capabilities'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {capabilities.map((capability, index) => {
                  const Icon = capability.icon;
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{capability.name}</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${capability.enabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}