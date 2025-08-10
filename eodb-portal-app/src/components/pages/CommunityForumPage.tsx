import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Filter, 
  Pin, 
  Heart, 
  MessageCircle, 
  Eye, 
  Clock, 
  User, 
  Building2, 
  Shield,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Reply,
  Send,
  Tag,
  Bookmark,
  Flag,
  MoreHorizontal,
  Crown,
  Home
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

interface CommunityForumPageProps {
  language: 'en' | 'hi';
  user: any;
  onNavigate?: (page: string) => void;
}

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    role: 'business' | 'government';
    department?: string;
    company?: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  timestamp: string;
  lastActivity: string;
  replies: number;
  likes: number;
  views: number;
  isPinned: boolean;
  isResolved: boolean;
  replies_data?: ForumReply[];
}

interface ForumReply {
  id: string;
  content: string;
  author: {
    name: string;
    role: 'business' | 'government';
    department?: string;
    company?: string;
    avatar?: string;
  };
  timestamp: string;
  likes: number;
  isAcceptedAnswer: boolean;
}

export function CommunityForumPage({ language, user, onNavigate }: CommunityForumPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('general');
  const [replyContent, setReplyContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);

  const translations = {
    en: {
      title: 'Community Forum',
      subtitle: 'Connect, discuss, and get help from the business community and government officials',
      backToWelcome: 'Back to Welcome',
      newPost: 'New Post',
      search: 'Search discussions...',
      filter: 'Filter',
      sortBy: 'Sort By',
      recent: 'Most Recent',
      popular: 'Most Popular',
      resolved: 'Resolved',
      unresolved: 'Unresolved',
      allCategories: 'All Categories',
      categories: {
        all: 'All Categories',
        general: 'General Discussion',
        licenses: 'License Applications',
        compliance: 'Compliance & Regulations',
        schemes: 'Government Schemes',
        taxation: 'Taxation & GST',
        registration: 'Company Registration',
        support: 'Technical Support',
        announcements: 'Announcements'
      },
      stats: {
        totalDiscussions: 'Total Discussions',
        activeToday: 'Active Today',
        resolvedIssues: 'Resolved Issues',
        governmentReplies: 'Government Replies'
      },
      postActions: {
        reply: 'Reply',
        like: 'Like',
        bookmark: 'Bookmark',
        report: 'Report',
        share: 'Share'
      },
      userRoles: {
        business: 'Business Owner',
        government: 'Government Official'
      },
      postForm: {
        title: 'Post Title',
        titlePlaceholder: 'What would you like to discuss?',
        content: 'Content',
        contentPlaceholder: 'Describe your question or discussion topic in detail...',
        category: 'Category',
        tags: 'Tags (optional)',
        tagsPlaceholder: 'Add relevant tags separated by commas',
        submit: 'Post Discussion',
        cancel: 'Cancel'
      },
      postDetails: {
        views: 'views',
        replies: 'replies',
        likes: 'likes',
        lastActivity: 'Last activity',
        pinned: 'Pinned',
        resolved: 'Resolved',
        acceptedAnswer: 'Accepted Answer'
      },
      replyForm: {
        placeholder: 'Write your reply...',
        submit: 'Post Reply'
      }
    },
    hi: {
      title: 'सामुदायिक मंच',
      subtitle: 'व्यावसायिक समुदाय और सरकारी अधिकारियों से जुड़ें, चर्चा करें और सहायता प्राप्त करें',
      backToWelcome: 'स्वागत पृष्ठ पर वापस',
      newPost: 'नई पोस्ट',
      search: 'चर्चा खोजें...',
      filter: 'फ़िल्टर',
      sortBy: 'इसके अनुसार क्रमबद्ध करें',
      recent: 'सबसे हाल की',
      popular: 'सबसे लोकप्रिय',
      resolved: 'हल किया गया',
      unresolved: 'अनसुलझा',
      allCategories: 'सभी श्रेणियां',
      categories: {
        all: 'सभी श्रेणियां',
        general: 'सामान्य चर्चा',
        licenses: 'लाइसेंस आवेदन',
        compliance: 'अनुपालन और नियम',
        schemes: 'सरकारी योजनाएं',
        taxation: 'कराधान और जीएसटी',
        registration: 'कंपनी पंजीकरण',
        support: 'तकनीकी सहायता',
        announcements: 'घोषणाएं'
      },
      stats: {
        totalDiscussions: 'कुल चर्चाएं',
        activeToday: 'आज सक्रिय',
        resolvedIssues: 'हल किए गए मुद्दे',
        governmentReplies: 'सरकारी जवाब'
      },
      postActions: {
        reply: 'जवाब दें',
        like: 'पसंद करें',
        bookmark: 'बुकमार्क',
        report: 'रिपोर्ट करें',
        share: 'साझा करें'
      },
      userRoles: {
        business: 'व्यापार मालिक',
        government: 'सरकारी अधिकारी'
      },
      postForm: {
        title: 'पोस्ट शीर्षक',
        titlePlaceholder: 'आप किस बारे में चर्चा करना चाहते हैं?',
        content: 'सामग्री',
        contentPlaceholder: 'अपने प्रश्न या चर्चा विषय का विस्तार से वर्णन करें...',
        category: 'श्रेणी',
        tags: 'टैग (वैकल्पिक)',
        tagsPlaceholder: 'कॉमा से अलग करके संबंधित टैग जोड़ें',
        submit: 'चर्चा पोस्ट करें',
        cancel: 'रद्द करें'
      },
      postDetails: {
        views: 'बार देखा गया',
        replies: 'जवाब',
        likes: 'पसंद',
        lastActivity: 'अंतिम गतिविधि',
        pinned: 'पिन किया गया',
        resolved: 'हल किया गया',
        acceptedAnswer: 'स्वीकृत उत्तर'
      },
      replyForm: {
        placeholder: 'अपना जवाब लिखें...',
        submit: 'जवाब पोस्ट करें'
      }
    }
  };

  const t = translations[language];

  // Demo forum posts data with replies
  const forumPosts: ForumPost[] = [
    {
      id: '1',
      title: language === 'hi' ? 'व्यापार लाइसेंस के लिए आवश्यक दस्तावेज़' : 'Required documents for trade license application',
      content: language === 'hi' ? 'मैं अपने रेस्टोरेंट के लिए व्यापार लाइसेंस के लिए आवेदन करना चाहता हूं। कृपया बताएं कि कौन से दस्तावेज़ आवश्यक हैं।' : 'I want to apply for a trade license for my restaurant. Please let me know what documents are required.',
      author: {
        name: 'Rajesh Kumar',
        role: 'business',
        company: 'Kumar Restaurant'
      },
      category: 'licenses',
      tags: ['trade-license', 'restaurant', 'documents'],
      timestamp: '2 hours ago',
      lastActivity: '30 minutes ago',
      replies: 3,
      likes: 12,
      views: 145,
      isPinned: false,
      isResolved: true,
      replies_data: [
        {
          id: '1-1',
          content: language === 'hi' ? 'रेस्टोरेंट के लिए आवश्यक दस्तावेज़: 1) व्यापार पंजीकरण प्रमाण पत्र 2) FSSAI लाइसेंस 3) अग्नि सुरक्षा प्रमाण पत्र 4) स्वास्थ्य विभाग की अनुमति 5) स्थानीय प्राधिकरण की अनुमति। सभी दस्तावेज़ मूल और प्रतिलिपि दोनों में चाहिए।' : 'For restaurants, you need: 1) Business registration certificate 2) FSSAI license 3) Fire safety certificate 4) Health department clearance 5) Local authority permission. All documents should be in original and copy.',
          author: {
            name: 'Dr. Meera Gupta',
            role: 'government',
            department: 'Licensing Department'
          },
          timestamp: '1 hour ago',
          likes: 8,
          isAcceptedAnswer: true
        },
        {
          id: '1-2',
          content: language === 'hi' ? 'धन्यवाद Dr. Gupta! क्या ये सभी दस्तावेज़ एक साथ जमा करने होते हैं या अलग-अलग विभागों में?' : 'Thank you Dr. Gupta! Do I need to submit all these documents together or to different departments?',
          author: {
            name: 'Rajesh Kumar',
            role: 'business',
            company: 'Kumar Restaurant'
          },
          timestamp: '45 minutes ago',
          likes: 2,
          isAcceptedAnswer: false
        },
        {
          id: '1-3',
          content: language === 'hi' ? 'सभी दस्तावेज़ एक साथ ऑनलाइन पोर्टल पर अपलोड कर सकते हैं। सिस्टम स्वचालित रूप से संबंधित विभागों को भेज देगा।' : 'You can upload all documents together on our online portal. The system will automatically forward to relevant departments.',
          author: {
            name: 'Suresh Sharma',
            role: 'government',
            department: 'Digital Services'
          },
          timestamp: '30 minutes ago',
          likes: 5,
          isAcceptedAnswer: false
        }
      ]
    },
    {
      id: '2',
      title: language === 'hi' ? 'नई स्टार्टअप योजना की घोषणा' : 'New startup scheme announcement',
      content: language === 'hi' ? 'दिल्ली सरकार ने टेक स्टार्टअप्स के लिए नई वित्तीय सहायता योजना की घोषणा की है। अधिक जानकारी के लिए यहाँ देखें।' : 'Delhi Government has announced a new financial assistance scheme for tech startups. See here for more details.',
      author: {
        name: 'Dr. Priya Sharma',
        role: 'government',
        department: 'MSME Department'
      },
      category: 'announcements',
      tags: ['startup', 'funding', 'government-scheme'],
      timestamp: '1 day ago',
      lastActivity: '4 hours ago',
      replies: 3,
      likes: 89,
      views: 567,
      isPinned: true,
      isResolved: false,
      replies_data: [
        {
          id: '2-1',
          content: language === 'hi' ? 'यह बहुत अच्छी खबर है! मेरा एक AI स्टार्टअप है। क्या इसके लिए आवेदन करने की कोई अंतिम तिथि है?' : 'This is great news! I have an AI startup. Is there any deadline for applying to this scheme?',
          author: {
            name: 'Anita Patel',
            role: 'business',
            company: 'TechInnovate AI'
          },
          timestamp: '18 hours ago',
          likes: 12,
          isAcceptedAnswer: false
        },
        {
          id: '2-2',
          content: language === 'hi' ? 'आवेदन की अंतिम तिथि 31 मार्च है। अधिक जानकारी के लिए startup.delhigovt.nic.in पर जाएं। पात्रता मानदंड भी वहां उपलब्ध हैं।' : 'The application deadline is March 31st. For more details visit startup.delhigovt.nic.in. Eligibility criteria are also available there.',
          author: {
            name: 'Dr. Priya Sharma',
            role: 'government',
            department: 'MSME Department'
          },
          timestamp: '16 hours ago',
          likes: 18,
          isAcceptedAnswer: false
        },
        {
          id: '2-3',
          content: language === 'hi' ? 'क्या इस योजना में सिर्फ तकनीकी स्टार्टअप्स के लिए है या अन्य क्षेत्रों के लिए भी?' : 'Is this scheme only for tech startups or for other sectors too?',
          author: {
            name: 'Rohit Agarwal',
            role: 'business',
            company: 'Green Solutions'
          },
          timestamp: '12 hours ago',
          likes: 8,
          isAcceptedAnswer: false
        }
      ]
    },
    {
      id: '3',
      title: language === 'hi' ? 'जीएसटी रिटर्न फाइलिंग में सहायता चाहिए' : 'Need help with GST return filing',
      content: language === 'hi' ? 'मैं एक छोटे व्यापारी हूं और जीएसटी रिटर्न फाइल करने में कठिनाई हो रही है। कोई मार्गदर्शन कर सकता है?' : 'I am a small trader and facing difficulty in filing GST returns. Can someone provide guidance?',
      author: {
        name: 'Amit Singh',
        role: 'business',
        company: 'Singh Traders'
      },
      category: 'taxation',
      tags: ['gst', 'returns', 'filing', 'help'],
      timestamp: '3 days ago',
      lastActivity: '1 day ago',
      replies: 2,
      likes: 15,
      views: 234,
      isPinned: false,
      isResolved: false,
      replies_data: [
        {
          id: '3-1',
          content: language === 'hi' ? 'GST रिटर्न फाइलिंग के लिए: 1) GST पोर्टल पर लॉगिन करें 2) GSTR-1 में sales data भरें 3) GSTR-3B में summary भरें। यदि turnover 1.5 करोड़ से कम है तो quarterly filing कर सकते हैं।' : 'For GST return filing: 1) Login to GST portal 2) Fill sales data in GSTR-1 3) Fill summary in GSTR-3B. If turnover is less than 1.5 crore, you can file quarterly.',
          author: {
            name: 'CA Vikram Joshi',
            role: 'business',
            company: 'Tax Consultancy Services'
          },
          timestamp: '2 days ago',
          likes: 22,
          isAcceptedAnswer: false
        },
        {
          id: '3-2',
          content: language === 'hi' ? 'आपकी सालाना टर्नओवर कितनी है? उसके आधार पर filing frequency अलग होती है। छोटे व्यापारियों के लिए सरकार ने composition scheme भी शुरू की है।' : 'What is your annual turnover? Filing frequency varies based on that. Government has also started composition scheme for small traders.',
          author: {
            name: 'Ravi Kumar',
            role: 'government',
            department: 'GST Department'
          },
          timestamp: '1 day ago',
          likes: 15,
          isAcceptedAnswer: false
        }
      ]
    },
    {
      id: '4',
      title: language === 'hi' ? 'अनुपालन कैलेंडर अपडेट' : 'Compliance calendar update',
      content: language === 'hi' ? 'इस महीने की महत्वपूर्ण अनुपालन तिथियों की जानकारी यहाँ है। सभी व्यापारियों को ध्यान देना चाहिए।' : 'Here are the important compliance dates for this month. All traders should take note.',
      author: {
        name: 'Suresh Gupta',
        role: 'government',
        department: 'Labour Department'
      },
      category: 'compliance',
      tags: ['compliance', 'deadlines', 'calendar'],
      timestamp: '5 days ago',
      lastActivity: '2 days ago',
      replies: 3,
      likes: 45,
      views: 423,
      isPinned: true,
      isResolved: false,
      replies_data: [
        {
          id: '4-1',
          content: language === 'hi' ? 'महत्वपूर्ण तिथियां: 15 जनवरी - TDS रिटर्न, 20 जनवरी - ESI जमा करना, 31 जनवरी - PF जमा करना। सभी व्यापारियों से अनुरोध है कि समय पर compliance करें।' : 'Important dates: 15 Jan - TDS Returns, 20 Jan - ESI deposits, 31 Jan - PF deposits. All traders are requested to comply on time.',
          author: {
            name: 'Suresh Gupta',
            role: 'government',
            department: 'Labour Department'
          },
          timestamp: '4 days ago',
          likes: 28,
          isAcceptedAnswer: false
        },
        {
          id: '4-2',
          content: language === 'hi' ? 'क्या इन सभी के लिए अलग-अलग पोर्टल पर जाना होगा या कोई एक integrated platform है?' : 'Do we need to visit different portals for all these or is there any integrated platform?',
          author: {
            name: 'Neha Agarwal',
            role: 'business',
            company: 'Agarwal Industries'
          },
          timestamp: '3 days ago',
          likes: 8,
          isAcceptedAnswer: false
        },
        {
          id: '4-3',
          content: language === 'hi' ? 'अभी तक अलग-अलग पोर्टल हैं, लेकिन सरकार एक unified compliance portal बनाने पर काम कर रही है। जल्द ही लॉन्च होगा।' : 'Currently they are on different portals, but government is working on a unified compliance portal. Will be launched soon.',
          author: {
            name: 'Digital Services Team',
            role: 'government',
            department: 'IT Department'
          },
          timestamp: '2 days ago',
          likes: 16,
          isAcceptedAnswer: false
        }
      ]
    }
  ];

  const forumStats = [
    { label: t.stats.totalDiscussions, value: '1,247', icon: MessageSquare, color: 'text-blue-600' },
    { label: t.stats.activeToday, value: '89', icon: Clock, color: 'text-green-600' },
    { label: t.stats.resolvedIssues, value: '523', icon: Shield, color: 'text-purple-600' },
    { label: t.stats.governmentReplies, value: '156', icon: Crown, color: 'text-orange-600' }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'licenses': return Shield;
      case 'compliance': return MessageSquare;
      case 'schemes': return Crown;
      case 'taxation': return Building2;
      case 'registration': return User;
      case 'support': return MessageCircle;
      case 'announcements': return Pin;
      default: return MessageSquare;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'licenses': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'compliance': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'schemes': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'taxation': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'registration': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300';
      case 'support': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      case 'announcements': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getUserRoleIcon = (role: 'business' | 'government') => {
    return role === 'government' ? Crown : Building2;
  };

  const getUserRoleColor = (role: 'business' | 'government') => {
    return role === 'government' 
      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
  };

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleNewPost = () => {
    // Handle new post creation
    setShowNewPostDialog(false);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostCategory('general');
  };

  const handleReply = (postId: string) => {
    // Handle reply submission
    setReplyContent('');
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-background dark:bg-slate-900 border-border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="space-y-1">
              <motion.h1 
                className="text-3xl font-bold text-foreground flex items-center space-x-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span>{t.title}</span>
              </motion.h1>
              <p className="text-muted-foreground">{t.subtitle}</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => onNavigate?.('welcome')}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200 dark:from-blue-900/20 dark:to-indigo-900/20 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 dark:border-blue-700"
              >
                <Home className="w-4 h-4 mr-2" />
                {t.backToWelcome}
              </Button>
              <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    {t.newPost}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{t.newPost}</DialogTitle>
                    <DialogDescription>
                      {language === 'hi' ? 'समुदाय के साथ अपना प्रश्न या चर्चा साझा करें' : 'Share your question or discussion with the community'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">{t.postForm.title}</label>
                      <Input
                        placeholder={t.postForm.titlePlaceholder}
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">{t.postForm.category}</label>
                      <Select value={newPostCategory} onValueChange={setNewPostCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">{t.categories.general}</SelectItem>
                          <SelectItem value="licenses">{t.categories.licenses}</SelectItem>
                          <SelectItem value="compliance">{t.categories.compliance}</SelectItem>
                          <SelectItem value="schemes">{t.categories.schemes}</SelectItem>
                          <SelectItem value="taxation">{t.categories.taxation}</SelectItem>
                          <SelectItem value="registration">{t.categories.registration}</SelectItem>
                          <SelectItem value="support">{t.categories.support}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">{t.postForm.content}</label>
                      <Textarea
                        placeholder={t.postForm.contentPlaceholder}
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        rows={6}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowNewPostDialog(false)}>
                        {t.postForm.cancel}
                      </Button>
                      <Button onClick={handleNewPost}>
                        {t.postForm.submit}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-6 border-b bg-muted dark:bg-slate-800/50 border-border">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {forumStats.map((stat, index) => (
              <Card key={index} className="dark:bg-slate-800 dark:border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Filters */}
            <div className="border-b bg-background dark:bg-slate-900 border-border">
              <div className="px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={t.search}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.categories.all}</SelectItem>
                        <SelectItem value="general">{t.categories.general}</SelectItem>
                        <SelectItem value="licenses">{t.categories.licenses}</SelectItem>
                        <SelectItem value="compliance">{t.categories.compliance}</SelectItem>
                        <SelectItem value="schemes">{t.categories.schemes}</SelectItem>
                        <SelectItem value="taxation">{t.categories.taxation}</SelectItem>
                        <SelectItem value="registration">{t.categories.registration}</SelectItem>
                        <SelectItem value="support">{t.categories.support}</SelectItem>
                        <SelectItem value="announcements">{t.categories.announcements}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">{t.recent}</SelectItem>
                        <SelectItem value="popular">{t.popular}</SelectItem>
                        <SelectItem value="resolved">{t.resolved}</SelectItem>
                        <SelectItem value="unresolved">{t.unresolved}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Forum Posts */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-4">
                {filteredPosts.map((post) => {
                  const CategoryIcon = getCategoryIcon(post.category);
                  const RoleIcon = getUserRoleIcon(post.author.role);
                  
                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card dark:bg-slate-800 rounded-lg border border-border p-6 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={(e) => {
                        // Only toggle if clicking on the main post area, not on interactive elements
                        if (!e.target.closest('button') && !e.target.closest('textarea') && !e.target.closest('input')) {
                          setSelectedPost(selectedPost === post.id ? null : post.id);
                          if (selectedPost !== post.id) {
                            setShowReplyForm(null);
                            setReplyContent('');
                          }
                        }
                      }}
                    >
                      <div className="space-y-4">
                        {/* Post Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              {post.isPinned && (
                                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                                  <Pin className="w-3 h-3 mr-1" />
                                  {t.postDetails.pinned}
                                </Badge>
                              )}
                              <Badge className={getCategoryColor(post.category)}>
                                <CategoryIcon className="w-3 h-3 mr-1" />
                                {t.categories[post.category as keyof typeof t.categories]}
                              </Badge>
                              {post.isResolved && (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                  <Shield className="w-3 h-3 mr-1" />
                                  {t.postDetails.resolved}
                                </Badge>
                              )}
                            </div>
                            
                            <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-blue-600 transition-colors">
                              {post.title}
                            </h3>
                            
                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                              {post.content}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {post.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  <Tag className="w-2 h-2 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {/* Post Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs">
                                  {post.author.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-foreground">{post.author.name}</p>
                                <div className="flex items-center space-x-1">
                                  <Badge className={getUserRoleColor(post.author.role)} variant="outline">
                                    <RoleIcon className="w-2 h-2 mr-1" />
                                    {t.userRoles[post.author.role]}
                                  </Badge>
                                  {post.author.department && (
                                    <span className="text-xs text-muted-foreground">• {post.author.department}</span>
                                  )}
                                  {post.author.company && (
                                    <span className="text-xs text-muted-foreground">• {post.author.company}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.replies}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{post.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Expanded Post Details */}
                        {selectedPost === post.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 space-y-4"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Separator />
                            
                            {/* Full Post Content */}
                            <div className="space-y-4">
                              <div className="prose max-w-none dark:prose-invert">
                                <p className="text-foreground">{post.content}</p>
                              </div>
                              
                              {/* Action Buttons */}
                              <div className="flex items-center space-x-4 py-2">
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                  <Heart className="w-4 h-4 mr-2" />
                                  {t.postActions.like} ({post.likes})
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-muted-foreground hover:text-foreground"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowReplyForm(showReplyForm === post.id ? null : post.id);
                                  }}
                                >
                                  <Reply className="w-4 h-4 mr-2" />
                                  {t.postActions.reply}
                                </Button>
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                  <Bookmark className="w-4 h-4 mr-2" />
                                  {t.postActions.bookmark}
                                </Button>
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                  <Flag className="w-4 h-4 mr-2" />
                                  {t.postActions.report}
                                </Button>
                              </div>
                              
                              <Separator />
                              
                              {/* Existing Replies */}
                              {post.replies_data && post.replies_data.length > 0 && (
                                <div className="space-y-4">
                                  <h4 className="text-lg font-semibold text-foreground">
                                    {t.postDetails.replies} ({post.replies_data.length})
                                  </h4>
                                  
                                  {post.replies_data.map((reply) => {
                                    const ReplyRoleIcon = getUserRoleIcon(reply.author.role);
                                    return (
                                      <div key={reply.id} className={`p-4 rounded-lg border ${reply.isAcceptedAnswer ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20' : 'border-border bg-muted/30'}`}>
                                        {reply.isAcceptedAnswer && (
                                          <div className="flex items-center space-x-2 mb-3">
                                            <Shield className="w-4 h-4 text-green-600" />
                                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                              {t.postDetails.acceptedAnswer}
                                            </Badge>
                                          </div>
                                        )}
                                        
                                        <div className="space-y-3">
                                          <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-3">
                                              <Avatar className="w-8 h-8">
                                                <AvatarFallback className="text-xs">
                                                  {reply.author.name.charAt(0)}
                                                </AvatarFallback>
                                              </Avatar>
                                              <div>
                                                <p className="text-sm font-medium text-foreground">{reply.author.name}</p>
                                                <div className="flex items-center space-x-2">
                                                  <Badge className={getUserRoleColor(reply.author.role)} variant="outline">
                                                    <ReplyRoleIcon className="w-2 h-2 mr-1" />
                                                    {t.userRoles[reply.author.role]}
                                                  </Badge>
                                                  {reply.author.department && (
                                                    <span className="text-xs text-muted-foreground">• {reply.author.department}</span>
                                                  )}
                                                  {reply.author.company && (
                                                    <span className="text-xs text-muted-foreground">• {reply.author.company}</span>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                            
                                            <div className="text-xs text-muted-foreground">
                                              {reply.timestamp}
                                            </div>
                                          </div>
                                          
                                          <div className="prose max-w-none dark:prose-invert">
                                            <p className="text-sm text-foreground">{reply.content}</p>
                                          </div>
                                          
                                          <div className="flex items-center space-x-4">
                                            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
                                              <ArrowUp className="w-3 h-3 mr-1" />
                                              {reply.likes}
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
                                              <Reply className="w-3 h-3 mr-1" />
                                              Reply
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                              
                              {/* New Reply Form */}
                              {showReplyForm === post.id && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="space-y-4 p-4 border border-border rounded-lg bg-muted/50"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <h5 className="text-md font-semibold text-foreground">{t.postActions.reply}</h5>
                                  <div className="space-y-3">
                                    <Textarea
                                      placeholder={t.replyForm.placeholder}
                                      value={replyContent}
                                      onChange={(e) => setReplyContent(e.target.value)}
                                      rows={4}
                                      className="resize-none"
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                    <div className="flex justify-end space-x-2">
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setShowReplyForm(null);
                                          setReplyContent('');
                                        }}
                                      >
                                        {t.postForm.cancel}
                                      </Button>
                                      <Button 
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleReply(post.id);
                                          setShowReplyForm(null);
                                        }}
                                        disabled={!replyContent.trim()}
                                      >
                                        <Send className="w-4 h-4 mr-2" />
                                        {t.replyForm.submit}
                                      </Button>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                      {language === 'hi' ? 'कोई चर्चा नहीं मिली' : 'No discussions found'}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'hi' ? 'चयनित फ़िल्टर के लिए कोई चर्चा उपलब्ध नहीं है।' : 'No discussions available for the selected filters.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}