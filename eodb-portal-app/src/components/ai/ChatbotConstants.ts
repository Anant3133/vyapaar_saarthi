import { FileText, HelpCircle, Zap, Clock, MessageSquare, Star, Brain, Mic, Globe, Database, Sparkles, TrendingUp } from 'lucide-react';

export const quickActionCategories = [
  {
    title: 'Applications',
    icon: FileText,
    actions: [
      { title: 'Trade License Application', query: 'How do I apply for a trade license?', icon: FileText },
      { title: 'GST Registration', query: 'GST registration process and requirements', icon: FileText },
      { title: 'Company Registration', query: 'How to register a private limited company?', icon: FileText },
      { title: 'Environmental Clearance', query: 'Environmental clearance application process', icon: FileText }
    ]
  },
  {
    title: 'Documents',
    icon: HelpCircle,
    actions: [
      { title: 'Document Checklist', query: 'What documents do I need for business registration?', icon: HelpCircle },
      { title: 'Identity Verification', query: 'Required identity documents for applications', icon: HelpCircle },
      { title: 'Address Proof', query: 'Acceptable address proof documents', icon: HelpCircle },
      { title: 'Digital Signatures', query: 'How to obtain digital signature certificate?', icon: HelpCircle }
    ]
  },
  {
    title: 'Schemes & Benefits',
    icon: Zap,
    actions: [
      { title: 'Startup India Benefits', query: 'What are the benefits under Startup India scheme?', icon: Zap },
      { title: 'MSME Schemes', query: 'Available schemes for micro and small enterprises', icon: Zap },
      { title: 'Tax Incentives', query: 'Tax benefits and incentives for new businesses', icon: Zap },
      { title: 'Export Promotion', query: 'Government schemes for export promotion', icon: Zap }
    ]
  },
  {
    title: 'Compliance',
    icon: Clock,
    actions: [
      { title: 'Filing Deadlines', query: 'Upcoming compliance deadlines and due dates', icon: Clock },
      { title: 'Annual Compliance', query: 'Annual compliance requirements for businesses', icon: Clock },
      { title: 'Tax Filing', query: 'Tax filing requirements and procedures', icon: Clock },
      { title: 'Renewal Process', query: 'License renewal process and timelines', icon: Clock }
    ]
  }
];

export const chatAnalytics = [
  {
    title: 'Queries Resolved',
    value: '1,247',
    change: '+18%',
    icon: MessageSquare,
    color: 'text-blue-600'
  },
  {
    title: 'Accuracy Rate',
    value: '96.8%',
    change: '+2.1%',
    icon: Star,
    color: 'text-green-600'
  },
  {
    title: 'Avg Response Time',
    value: '0.8s',
    change: '-0.2s',
    icon: Clock,
    color: 'text-purple-600'
  },
  {
    title: 'User Satisfaction',
    value: '4.9/5',
    change: '+0.1',
    icon: Star,
    color: 'text-orange-600'
  }
];

export const aiCapabilities = [
  { name: 'Natural Language Processing', icon: Brain },
  { name: 'Voice Recognition', icon: Mic },
  { name: 'Multi-language Support', icon: Globe },
  { name: 'Context Awareness', icon: Database },
  { name: 'Smart Suggestions', icon: Sparkles },
  { name: 'Real-time Data', icon: TrendingUp }
];

export const modelOptions = [
  { value: 'basic', label: 'Basic Model', description: 'Fast responses, basic understanding' },
  { value: 'advanced', label: 'Advanced Model', description: 'Deep understanding, contextual responses' },
  { value: 'expert', label: 'Expert Model', description: 'Specialized knowledge, detailed explanations' }
];