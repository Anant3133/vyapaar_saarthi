import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  FileCheck, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Plus,
  Download,
  Upload,
  BarChart3,
  Calendar,
  CheckCircle2,
  XCircle,
  Timer,
  Search,
  Filter,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap,
  Home,
  Activity,
  Shield,
  Building2,
  Eye,
  FileText,
  Award,
  Briefcase,
  Factory,
  Laptop,
  Stethoscope,
  ShoppingCart,
  Utensils,
  Car,
  Plane,
  Hammer,
  GraduationCap,
  Leaf,
  Zap as ZapIcon,
  Wifi,
  Heart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';

interface DashboardProps {
  user?: any;
  onNavigate?: (page: string) => void;
  language: 'en' | 'hi';
}

export function Dashboard({ user, onNavigate, language }: DashboardProps) {
  const translations = {
    en: {
      welcomeBack: 'Welcome back',
      whatsHappening: "Here's what's happening with your business.",
      searchPlaceholder: 'Search applications, licenses, schemes...',
      backToWelcome: 'Back to Welcome',
      allSystemsActive: 'All Systems Active',
      activeLicenses: 'Active Licenses',
      pendingApplications: 'Pending Applications',
      upcomingDeadlines: 'Upcoming Deadlines',
      complianceScore: 'Compliance Score',
      thisMonth: 'this month',
      inReview: 'in review',
      thisWeek: 'this week',
      excellentRating: 'Excellent rating',
      applicationTrends: 'Application Trends',
      liveData: 'Live Data',
      applicationStatus: 'Application Status',
      processingEfficiency: 'Processing Efficiency by Stage',
      realTime: 'Real-time',
      averageTime: 'Average Time',
      currentTime: 'Current Time',
      recentApplications: 'Recent Applications',
      quickActions: 'Quick Actions',
      recentActivity: 'Recent Activity',
      newApplication: 'New Application',
      startNewApplication: 'Start a new license application',
      uploadDocuments: 'Upload Documents',
      uploadSupportingDocs: 'Upload supporting documents',
      downloadLicense: 'Download License',
      downloadApprovedLicenses: 'Download approved licenses',
      viewReports: 'View Reports',
      accessDetailedReports: 'Access detailed reports',
      viewDetails: 'View Details',
      submitted: 'Submitted',
      completed: 'Completed',
      estCompletion: 'Est. Completion',
      approved: 'Approved',
      rejected: 'Rejected',
      draft: 'Draft',
      progress: 'Progress',
      total: 'Total',
      totalApplications: 'Total Applications',
      approvals: 'Approvals',
      avg: 'Avg',
      current: 'Current',
      days: 'days',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      processingStages: [
        'Document Verification',
        'Technical Review', 
        'Legal Clearance',
        'Final Approval',
        'Certificate Issue'
      ],
      applicationTypes: [
        'Trade License Application',
        'GST Registration',
        'Environmental Clearance'
      ],
      // New translations for license and certificate sections
      myActiveLicenses: 'My Active Licenses',
      requiredCertificates: 'Required Certificates',
      needsAttention: 'Needs Your Attention',
      downloadPDF: 'Download PDF',
      viewCertificate: 'View Certificate',
      applyNow: 'Apply Now',
      renewalDue: 'Renewal Due',
      expiresIn: 'Expires in',
      days: 'days',
      issuedOn: 'Issued on',
      validUntil: 'Valid until',
      licenseNumber: 'License No',
      certificateNumber: 'Certificate No',
      requiredFor: 'Required for',
      missingCertificates: 'Missing Certificates',
      basedOnBusinessType: 'Based on your business type',
      businessType: 'Business Type',
      recommended: 'Recommended',
      mandatory: 'Mandatory',
      optional: 'Optional',
      priority: 'Priority',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      description: 'Description',
      processingTime: 'Processing Time',
      fees: 'Fees',
      status: 'Status',
      active: 'Active',
      expired: 'Expired',
      expiringSoon: 'Expiring Soon',
      notApplied: 'Not Applied'
    },
    hi: {
      welcomeBack: 'वापसी पर स्वागत है',
      whatsHappening: 'यहाँ आपके व्यवसाय के साथ क्या हो रहा है।',
      searchPlaceholder: 'आवेदन, लाइसेंस, योजनाएं खोजें...',
      backToWelcome: 'स्वागत पर वापस',
      allSystemsActive: 'सभी सिस्टम सक्रिय',
      activeLicenses: 'सक्रिय लाइसेंस',
      pendingApplications: 'लंबित आवेदन',
      upcomingDeadlines: 'आगामी समय सीमा',
      complianceScore: 'अनुपालन स्कोर',
      thisMonth: 'इस महीने',
      inReview: 'समीक्षाधीन',
      thisWeek: 'इस सप्ताह',
      excellentRating: 'उत्कृष्ट रेटिंग',
      applicationTrends: 'आवेदन रुझान',
      liveData: 'लाइव डेटा',
      applicationStatus: 'आवेदन स्थिति',
      processingEfficiency: 'चरण द्वारा प्रसंस्करण दक्षता',
      realTime: 'वास्तविक समय',
      averageTime: 'औसत समय',
      currentTime: 'वर्तमान समय',
      recentApplications: 'हाल के आवेदन',
      quickActions: 'त्वरित कार्य',
      recentActivity: 'हाल की गतिविधि',
      newApplication: 'नया आवेदन',
      startNewApplication: 'नया लाइसेंस आवेदन शुरू करें',
      uploadDocuments: 'दस्तावेज़ अपलोड करें',
      uploadSupportingDocs: 'सहायक दस्तावेज़ अपलोड करें',
      downloadLicense: 'लाइसेंस डाउनलोड करें',
      downloadApprovedLicenses: 'स्वीकृत लाइसेंस डाउनलोड करें',
      viewReports: 'रिपोर्ट देखें',
      accessDetailedReports: 'विस्तृत रिपोर्ट एक्सेस करें',
      viewDetails: 'विवरण देखें',
      submitted: 'जमा किया गया',
      completed: 'पूर्ण',
      estCompletion: 'अनुमानित पूर्णता',
      approved: 'स्वीकृत',
      rejected: 'अस्वीकृत',
      draft: 'मसौदा',
      progress: 'प्रगति',
      total: 'कुल',
      totalApplications: 'कुल आवेदन',
      approvals: 'स्वीकृतियां',
      avg: 'औसत',
      current: 'वर्तमान',
      days: 'दिन',
      months: ['जन', 'फर', 'मार', 'अप्र', 'मई', 'जून'],
      processingStages: [
        'दस्तावेज़ सत्यापन',
        'तकनीकी समीक्षा',
        'कानूनी मंजूरी',
        'अंतिम अनुमोदन',
        'प्रमाणपत्र जारी'
      ],
      applicationTypes: [
        'व्यापार लाइसेंस आवेदन',
        'जीएसटी पंजीकरण',
        'पर्यावरण मंजूरी'
      ],
      // New Hindi translations
      myActiveLicenses: 'मेरे सक्रिय लाइसेंस',
      requiredCertificates: 'आवश्यक प्रमाणपत्र',
      needsAttention: 'आपका ध्यान चाहिए',
      downloadPDF: 'पीडीएफ डाउनलोड करें',
      viewCertificate: 'प्रमाणपत्र देखें',
      applyNow: 'अभी आवेदन करें',
      renewalDue: 'नवीनीकरण देय',
      expiresIn: 'समाप्ति में',
      days: 'दिन',
      issuedOn: 'जारी की तारीख',
      validUntil: 'तक वैध',
      licenseNumber: 'लाइसेंस नंबर',
      certificateNumber: 'प्रमाणपत्र नंबर',
      requiredFor: 'के लिए आवश्यक',
      missingCertificates: 'गुम प्रमाणपत्र',
      basedOnBusinessType: 'आपके व्यवसाय प्रकार के आधार पर',
      businessType: 'व्यवसाय प्रकार',
      recommended: 'अनुशंसित',
      mandatory: 'अनिवार्य',
      optional: 'वैकल्पिक',
      priority: 'प्राथमिकता',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कम',
      description: 'विवरण',
      processingTime: 'प्रसंस्करण समय',
      fees: 'शुल्क',
      status: 'स्थिति',
      active: 'सक्रिय',
      expired: 'समाप्त',
      expiringSoon: 'जल्द समाप्त',
      notApplied: 'आवेदन नहीं'
    }
  };

  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');

  // Business type specific certificates mapping
  const getCertificatesForBusinessType = (businessType: string) => {
    const businessTypeMap: { [key: string]: any[] } = {
      'Technology Startup': [
        {
          id: 'startup-india',
          name: language === 'hi' ? 'स्टार्टअप इंडिया पंजीकरण' : 'Startup India Registration',
          icon: Laptop,
          priority: 'high',
          type: 'recommended',
          description: language === 'hi' ? 'सरकारी लाभ और प्रोत्साहन के लिए' : 'For government benefits and incentives',
          processingTime: language === 'hi' ? '7-14 दिन' : '7-14 days',
          fees: '₹0',
          status: 'notApplied'
        },
        {
          id: 'udyam-registration',
          name: language === 'hi' ? 'उद्यम पंजीकरण' : 'Udyam Registration',
          icon: Building2,
          priority: 'high',
          type: 'mandatory',
          description: language === 'hi' ? 'एमएसएमई लाभ के लिए अनिवार्य' : 'Mandatory for MSME benefits',
          processingTime: language === 'hi' ? '1-3 दिन' : '1-3 days',
          fees: '₹0',
          status: 'notApplied'
        },
        {
          id: 'it-certificate',
          name: language === 'hi' ? 'आईटी सेवा प्रमाणपत्र' : 'IT Service Certificate',
          icon: Wifi,
          priority: 'medium',
          type: 'recommended',
          description: language === 'hi' ? 'तकनीकी सेवा प्रदाताओं के लिए' : 'For technology service providers',
          processingTime: language === 'hi' ? '10-15 दिन' : '10-15 days',
          fees: '₹2,000',
          status: 'notApplied'
        },
        {
          id: 'export-import-code',
          name: language === 'hi' ? 'आयात-निर्यात कोड' : 'Import Export Code',
          icon: Plane,
          priority: 'low',
          type: 'optional',
          description: language === 'hi' ? 'अंतर्राष्ट्रीय व्यापार के लिए' : 'For international trade',
          processingTime: language === 'hi' ? '5-7 दिन' : '5-7 days',
          fees: '₹500',
          status: 'notApplied'
        }
      ],
      'Manufacturing': [
        {
          id: 'factory-license',
          name: language === 'hi' ? 'फैक्टरी लाइसेंस' : 'Factory License',
          icon: Factory,
          priority: 'high',
          type: 'mandatory',
          description: language === 'hi' ? 'निर्माण गतिविधियों के लिए अनिवार्य' : 'Mandatory for manufacturing activities',
          processingTime: language === 'hi' ? '15-30 दिन' : '15-30 days',
          fees: '₹5,000',
          status: 'notApplied'
        },
        {
          id: 'pollution-clearance',
          name: language === 'hi' ? 'प्रदूषण मंजूरी' : 'Pollution Clearance',
          icon: Leaf,
          priority: 'high',
          type: 'mandatory',
          description: language === 'hi' ? 'पर्यावरण अनुपालन के लिए' : 'For environmental compliance',
          processingTime: language === 'hi' ? '30-45 दिन' : '30-45 days',
          fees: '₹10,000',
          status: 'notApplied'
        },
        {
          id: 'fire-safety',
          name: language === 'hi' ? 'अग्नि सुरक्षा प्रमाणपत्र' : 'Fire Safety Certificate',
          icon: Shield,
          priority: 'high',
          type: 'mandatory',
          description: language === 'hi' ? 'अग्नि सुरक्षा अनुपालन' : 'Fire safety compliance',
          processingTime: language === 'hi' ? '10-20 दिन' : '10-20 days',
          fees: '₹3,000',
          status: 'notApplied'
        },
        {
          id: 'esi-registration',
          name: language === 'hi' ? 'ईएसआई पंजीकरण' : 'ESI Registration',
          icon: Heart,
          priority: 'medium',
          type: 'recommended',
          description: language === 'hi' ? 'कर्मचारी बीमा के लिए' : 'For employee insurance',
          processingTime: language === 'hi' ? '7-14 दिन' : '7-14 days',
          fees: '₹0',
          status: 'notApplied'
        }
      ],
      'Retail Business': [
        {
          id: 'shop-establishment',
          name: language === 'hi' ? 'दुकान और स्थापना लाइसेंस' : 'Shop & Establishment License',
          icon: ShoppingCart,
          priority: 'high',
          type: 'mandatory',
          description: language === 'hi' ? 'खुदरा दुकान संचालन के लिए' : 'For retail shop operations',
          processingTime: language === 'hi' ? '7-15 दिन' : '7-15 days',
          fees: '₹2,500',
          status: 'notApplied'
        },
        {
          id: 'fssai-license',
          name: language === 'hi' ? 'एफएसएसएआई लाइसेंस' : 'FSSAI License',
          icon: Utensils,
          priority: 'high',
          type: 'mandatory',
          description: language === 'hi' ? 'खाद्य उत्पादों की बिक्री के लिए' : 'For selling food products',
          processingTime: language === 'hi' ? '15-30 दिन' : '15-30 days',
          fees: '₹7,500',
          status: 'notApplied'
        },
        {
          id: 'weights-measures',
          name: language === 'hi' ? 'वजन और माप लाइसेंस' : 'Weights & Measures License',
          icon: Award,
          priority: 'medium',
          type: 'recommended',
          description: language === 'hi' ? 'तौल कानून अनुपालन' : 'For weights compliance',
          processingTime: language === 'hi' ? '10-15 दिन' : '10-15 days',
          fees: '₹1,500',
          status: 'notApplied'
        }
      ],
      'Healthcare Services': [
        {
          id: 'clinical-establishment',
          name: language === 'hi' ? 'क्लिनिकल स्थापना पंजीकरण' : 'Clinical Establishment Registration',
          icon: Stethoscope,
          priority: 'high',
          type: 'mandatory',
          description: language === 'hi' ? 'स्वास्थ्य सेवा प्रदान करने के लिए' : 'For providing healthcare services',
          processingTime: language === 'hi' ? '30-45 दिन' : '30-45 days',
          fees: '₹15,000',
          status: 'notApplied'
        },
        {
          id: 'drug-license',
          name: language === 'hi' ? 'ड्रग लाइसेंस' : 'Drug License',
          icon: Heart,
          priority: 'high',
          type: 'mandatory',
          description: language === 'hi' ? 'दवाइयों की बिक्री/भंडारण के लिए' : 'For selling/storing medicines',
          processingTime: language === 'hi' ? '20-30 दिन' : '20-30 days',
          fees: '₹10,000',
          status: 'notApplied'
        },
        {
          id: 'bio-medical-waste',
          name: language === 'hi' ? 'बायो-मेडिकल वेस्ट प्राधिकरण' : 'Bio-Medical Waste Authorization',
          icon: Shield,
          priority: 'high',
          type: 'mandatory',
          description: language === 'hi' ? 'मेडिकल वेस्ट प्रबंधन' : 'Medical waste management',
          processingTime: language === 'hi' ? '15-25 दिन' : '15-25 days',
          fees: '₹5,000',
          status: 'notApplied'
        }
      ],
      'Restaurant': [
        {
          id: 'fssai-license',
          name: language === 'hi' ? 'एफएसएसएआई लाइसेंस' : 'FSSAI License',
          icon: Utensils,
          priority: 'high',
          type: 'mandatory',
          description: language === 'hi' ? 'खाद्य व्यवसाय के लिए आवश्यक' : 'Required for food business',
          processingTime: language === 'hi' ? '15-30 दिन' : '15-30 days',
          fees: '₹7,500',
          status: 'notApplied'
        },
        {
          id: 'eating-house-license',
          name: language === 'hi' ? 'भोजनालय लाइसेंस' : 'Eating House License',
          icon: Building2,
          priority: 'high',
          type: 'mandatory',
          description: language === 'hi' ? 'रेस्तरां संचालन के लिए' : 'For restaurant operations',
          processingTime: language === 'hi' ? '10-20 दिन' : '10-20 days',
          fees: '₹3,000',
          status: 'notApplied'
        },
        {
          id: 'liquor-license',
          name: language === 'hi' ? 'शराब लाइसेंस' : 'Liquor License',
          icon: Award,
          priority: 'medium',
          type: 'optional',
          description: language === 'hi' ? 'अल्कोहल परोसने के लिए' : 'For serving alcohol',
          processingTime: language === 'hi' ? '45-60 दिन' : '45-60 days',
          fees: '₹50,000',
          status: 'notApplied'
        }
      ]
    };

    return businessTypeMap[businessType] || [];
  };

  // Mock active licenses data
  const getActiveLicenses = () => {
    return [
      {
        id: 'trade-license-001',
        name: language === 'hi' ? 'व्यापार लाइसेंस' : 'Trade License',
        licenseNumber: 'TL/2024/001234',
        icon: Building2,
        issuedOn: '2024-01-15',
        validUntil: '2025-01-15',
        status: 'active',
        expiresInDays: 365,
        authority: language === 'hi' ? 'दिल्ली नगर निगम' : 'Delhi Municipal Corporation'
      },
      {
        id: 'gst-registration',
        name: language === 'hi' ? 'जीएसटी पंजीकरण' : 'GST Registration',
        licenseNumber: '07AABCS1234M1Z5',
        icon: FileText,
        issuedOn: '2023-12-10',
        validUntil: '2024-12-10',
        status: 'expiringSoon',
        expiresInDays: 45,
        authority: language === 'hi' ? 'जीएसटी विभाग' : 'GST Department'
      },
      {
        id: 'udyam-cert',
        name: language === 'hi' ? 'उद्यम पंजीकरण' : 'Udyam Registration',
        licenseNumber: 'UDYAM-DL-06-1234567',
        icon: Award,
        issuedOn: '2024-02-20',
        validUntil: 'Lifetime',
        status: 'active',
        expiresInDays: null,
        authority: language === 'hi' ? 'एमएसएमई मंत्रालय' : 'MSME Ministry'
      }
    ];
  };

  // Data for visualizations
  const applicationTrends = [
    { month: t.months[0], applications: 12, approvals: 8, percentage: 67 },
    { month: t.months[1], applications: 18, approvals: 14, percentage: 78 },
    { month: t.months[2], applications: 15, approvals: 12, percentage: 80 },
    { month: t.months[3], applications: 22, approvals: 18, percentage: 82 },
    { month: t.months[4], applications: 28, approvals: 24, percentage: 86 },
    { month: t.months[5], applications: 32, approvals: 28, percentage: 88 }
  ];

  const statusBreakdown = [
    { name: t.approved, value: 68, color: '#22c55e' },
    { name: t.inReview, value: 20, color: '#eab308' },
    { name: t.rejected, value: 8, color: '#ef4444' },
    { name: t.draft, value: 4, color: '#6b7280' }
  ];

  const processingData = [
    { stage: t.processingStages[0], avgTime: 3.2, currentTime: 2.8, efficiency: 87 },
    { stage: t.processingStages[1], avgTime: 5.5, currentTime: 4.2, efficiency: 76 },
    { stage: t.processingStages[2], avgTime: 7.1, currentTime: 6.8, efficiency: 96 },
    { stage: t.processingStages[3], avgTime: 2.3, currentTime: 1.9, efficiency: 83 },
    { stage: t.processingStages[4], avgTime: 1.5, currentTime: 1.2, efficiency: 80 }
  ];

  const summaryData = [
    {
      title: t.activeLicenses,
      value: '12',
      change: `+2 ${t.thisMonth}`,
      changePercent: '+16.7%',
      icon: FileCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-600/10',
      trend: 'up'
    },
    {
      title: t.pendingApplications,
      value: '5',
      change: `3 ${t.inReview}`,
      changePercent: '-20%',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-600/10',
      trend: 'down'
    },
    {
      title: t.upcomingDeadlines,
      value: '8',
      change: `3 ${t.thisWeek}`,
      changePercent: '+12.5%',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-600/10',
      trend: 'up'
    },
    {
      title: t.complianceScore,
      value: '94%',
      change: t.excellentRating,
      changePercent: '+2%',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-600/10',
      trend: 'up'
    }
  ];

  const activeLicenses = getActiveLicenses();
  const requiredCertificates = getCertificatesForBusinessType(user?.businessType || 'Technology Startup');

  const handleBackToWelcome = () => {
    if (onNavigate) {
      onNavigate('welcome');
    }
  };

  const handleQuickAction = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const handleDownloadLicense = (licenseId: string) => {
    // Mock download functionality
    alert(language === 'hi' 
      ? `लाइसेंस ${licenseId} डाउनलोड हो रहा है...`
      : `Downloading license ${licenseId}...`
    );
  };

  const handleApplyCertificate = (certificateId: string) => {
    if (onNavigate) {
      onNavigate('license-application');
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <ArrowUpRight className="w-4 h-4 text-green-600" />
    ) : (
      <ArrowDownRight className="w-4 h-4 text-red-600" />
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400', label: t.active },
      expired: { color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400', label: t.expired },
      expiringSoon: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400', label: t.expiringSoon },
      notApplied: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400', label: t.notApplied }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.notApplied;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400', label: t.high },
      medium: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400', label: t.medium },
      low: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400', label: t.low }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
    return <Badge variant="outline" className={config.color}>{config.label}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      mandatory: { color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400', label: t.mandatory },
      recommended: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400', label: t.recommended },
      optional: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400', label: t.optional }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.optional;
    return <Badge variant="outline" className={config.color}>{config.label}</Badge>;
  };

  // CSS-based Donut Chart Component
  const DonutChart = ({ data, size = 160 }: { data: typeof statusBreakdown, size?: number }) => {
    let cumulativePercentage = 0;
    const radius = size / 2;
    const strokeWidth = 20;
    const innerRadius = radius - strokeWidth;

    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {data.map((item, index) => {
            const circumference = 2 * Math.PI * innerRadius;
            const strokeDasharray = circumference;
            const strokeDashoffset = circumference - (circumference * item.value) / 100;
            const rotation = (cumulativePercentage * 360) / 100;
            
            cumulativePercentage += item.value;
            
            return (
              <circle
                key={index}
                cx={radius}
                cy={radius}
                r={innerRadius}
                fill="none"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  transformOrigin: `${radius}px ${radius}px`,
                  transform: `rotate(${rotation}deg)`
                }}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">100%</div>
            <div className="text-xs text-muted-foreground">{t.total}</div>
          </div>
        </div>
      </div>
    );
  };

  // CSS-based Bar Chart Component
  const BarChart = ({ data }: { data: typeof processingData }) => {
    const maxValue = Math.max(...data.map(d => Math.max(d.avgTime, d.currentTime)));
    
    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.stage}</span>
              <div className="flex space-x-4 text-xs">
                <span className="text-amber-600">{t.avg}: {item.avgTime}d</span>
                <span className="text-red-600">{t.current}: {item.currentTime}d</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.avgTime / maxValue) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full bg-amber-500 rounded-full"
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                  {item.avgTime} {t.days}
                </span>
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.currentTime / maxValue) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                  className="h-full bg-red-500 rounded-full"
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                  {item.currentTime} {t.days}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  // CSS-based Trend Chart Component
  const TrendChart = ({ data }: { data: typeof applicationTrends }) => {
    const maxValue = Math.max(...data.map(d => d.applications));
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-6 gap-2 h-48">
          {data.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-end space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center space-y-1 h-full justify-end">
                <div className="text-xs font-medium">{item.applications}</div>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.applications / maxValue) * 120}px` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="w-8 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm relative"
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.approvals / item.applications) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-sm absolute bottom-0"
                  />
                </motion.div>
              </div>
              <div className="text-xs text-muted-foreground">{item.month}</div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-sm text-muted-foreground">{t.totalApplications}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span className="text-sm text-muted-foreground">{t.approvals}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`p-6 space-y-6 relative z-10 ${language === 'hi' ? 'lang-hi' : 'lang-en'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t.welcomeBack}, {user?.name?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-muted-foreground">
              {t.whatsHappening}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={handleBackToWelcome}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800"
            >
              <Home className="w-4 h-4" />
              <span>{t.backToWelcome}</span>
            </Button>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20">
              <TrendingUp className="w-3 h-3 mr-1" />
              {t.allSystemsActive}
            </Badge>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${item.bgColor}`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{item.value}</div>
                      <div className="flex items-center text-sm">
                        {getTrendIcon(item.trend)}
                        <span className={item.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                          {item.changePercent}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* New Sections: Active Licenses and Required Certificates */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Active Licenses Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileCheck className="w-5 h-5 text-green-600" />
                  <span>{t.myActiveLicenses}</span>
                  <Badge variant="outline" className="ml-auto bg-green-50 text-green-700 border-green-200">
                    {activeLicenses.length} {t.active}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeLicenses.map((license, index) => (
                  <motion.div
                    key={license.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-border/50 bg-accent/20 hover:bg-accent/30 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                          <license.icon className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{license.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {t.licenseNumber}: {license.licenseNumber}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(license.status)}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">{t.issuedOn}: </span>
                        <span>{license.issuedOn}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t.validUntil}: </span>
                        <span>{license.validUntil}</span>
                      </div>
                    </div>
                    {license.expiresInDays && license.expiresInDays <= 90 && (
                      <div className="mb-3">
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {t.expiresIn} {license.expiresInDays} {t.days}
                        </Badge>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{license.authority}</span>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadLicense(license.id)}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          {t.downloadPDF}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          {t.viewCertificate}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Required Certificates Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <span>{t.requiredCertificates}</span>
                  <Badge variant="outline" className="ml-auto bg-orange-50 text-orange-700 border-orange-200">
                    {t.needsAttention}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {t.basedOnBusinessType}: <strong>{user?.businessType || 'Technology Startup'}</strong>
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {requiredCertificates.map((certificate, index) => (
                  <motion.div
                    key={certificate.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-border/50 bg-accent/20 hover:bg-accent/30 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          certificate.priority === 'high' ? 'bg-red-100 dark:bg-red-900/20' :
                          certificate.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                          'bg-blue-100 dark:bg-blue-900/20'
                        }`}>
                          <certificate.icon className={`w-4 h-4 ${
                            certificate.priority === 'high' ? 'text-red-600' :
                            certificate.priority === 'medium' ? 'text-yellow-600' :
                            'text-blue-600'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-semibold">{certificate.name}</h4>
                          <p className="text-sm text-muted-foreground">{certificate.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1">
                        {getPriorityBadge(certificate.priority)}
                        {getTypeBadge(certificate.type)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">{t.processingTime}: </span>
                        <span>{certificate.processingTime}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t.fees}: </span>
                        <span className="font-semibold">{certificate.fees}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      {getStatusBadge(certificate.status)}
                      <Button 
                        size="sm"
                        onClick={() => handleApplyCertificate(certificate.id)}
                        className={`${
                          certificate.priority === 'high' ? 'bg-red-600 hover:bg-red-700' :
                          certificate.priority === 'medium' ? 'bg-yellow-600 hover:bg-yellow-700' :
                          'bg-blue-600 hover:bg-blue-700'
                        } text-white`}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {t.applyNow}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Visual Analytics Row - CSS-Based Charts */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Application Trends - CSS Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>{t.applicationTrends}</span>
                  <Badge variant="outline" className="ml-auto">
                    <Activity className="w-3 h-3 mr-1" />
                    {t.liveData}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TrendChart data={applicationTrends} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Status Breakdown - CSS Donut Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardHeader>
                <CardTitle>{t.applicationStatus}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <DonutChart data={statusBreakdown} />
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {statusBreakdown.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-xs">{item.name}</span>
                        </div>
                        <span className="font-semibold text-xs">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Processing Efficiency - CSS Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <span>{t.processingEfficiency}</span>
                <Badge variant="outline" className="ml-auto">
                  <Activity className="w-3 h-3 mr-1" />
                  {t.realTime}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart data={processingData} />
              <div className="flex justify-center space-x-6 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm text-muted-foreground">{t.averageTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-muted-foreground">{t.currentTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Application Status & Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="lg:col-span-2"
          >
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>{t.recentApplications}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-lg border border-border/50 bg-accent/20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <div>
                        <h4 className="font-semibold">{t.applicationTypes[0]}</h4>
                        <p className="text-sm text-muted-foreground">APP001</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      {t.approved}
                    </Badge>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t.progress}</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">{t.submitted}: 2024-01-15</span>
                      <br />
                      <span className="text-muted-foreground">{t.completed}: 2024-01-20</span>
                    </div>
                    <Button variant="ghost" size="sm">{t.viewDetails}</Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="p-4 rounded-lg border border-border/50 bg-accent/20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Timer className="w-4 h-4 text-yellow-600" />
                      <div>
                        <h4 className="font-semibold">{t.applicationTypes[1]}</h4>
                        <p className="text-sm text-muted-foreground">APP002</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                      {t.inReview}
                    </Badge>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t.progress}</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">{t.submitted}: 2024-01-20</span>
                      <br />
                      <span className="text-muted-foreground">{t.estCompletion}: 2024-02-05</span>
                    </div>
                    <Button variant="ghost" size="sm">{t.viewDetails}</Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="p-4 rounded-lg border border-border/50 bg-accent/20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <div>
                        <h4 className="font-semibold">{t.applicationTypes[2]}</h4>
                        <p className="text-sm text-muted-foreground">APP003</p>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                      {t.submitted}
                    </Badge>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t.progress}</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">{t.submitted}: 2024-01-25</span>
                      <br />
                      <span className="text-muted-foreground">{t.estCompletion}: 2024-02-15</span>
                    </div>
                    <Button variant="ghost" size="sm">{t.viewDetails}</Button>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>{t.quickActions}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-auto p-4"
                    onClick={() => handleQuickAction('license-application')}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                        <Plus className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold">{t.newApplication}</h4>
                        <p className="text-sm text-muted-foreground">{t.startNewApplication}</p>
                      </div>
                    </div>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-auto p-4"
                    onClick={() => handleQuickAction('upload-documents')}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                        <Upload className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold">{t.uploadDocuments}</h4>
                        <p className="text-sm text-muted-foreground">{t.uploadSupportingDocs}</p>
                      </div>
                    </div>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-auto p-4"
                    onClick={() => handleQuickAction('download-license')}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                        <Download className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold">{t.downloadLicense}</h4>
                        <p className="text-sm text-muted-foreground">{t.downloadApprovedLicenses}</p>
                      </div>
                    </div>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-auto p-4"
                    onClick={() => handleQuickAction('reports')}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
                        <BarChart3 className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold">{t.viewReports}</h4>
                        <p className="text-sm text-muted-foreground">{t.accessDetailedReports}</p>
                      </div>
                    </div>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}