import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Filter,
  Star,
  Clock,
  DollarSign,
  Users,
  Building,
  Lightbulb,
  TrendingUp,
  MapPin,
  Calendar,
  FileText,
  ExternalLink,
  Bookmark,
  CheckCircle,
  AlertCircle,
  CreditCard,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';

interface Scheme {
  id: string;
  title: string;
  description: string;
  department: string;
  category: 'funding' | 'tax-benefit' | 'subsidy' | 'training' | 'infrastructure' | 'export' | 'technology';
  eligibility: string[];
  benefits: string[];
  maxFunding: string;
  fundingType: 'grant' | 'loan' | 'subsidy' | 'tax-credit' | 'equity';
  applicationDeadline: string;
  processingTime: string;
  successRate: number;
  applicationsReceived: number;
  targetSector: string[];
  businessSize: 'startup' | 'msme' | 'large' | 'all';
  location: string[];
  status: 'active' | 'upcoming' | 'closed';
  featured: boolean;
  documents: string[];
  contactInfo: {
    website: string;
    phone: string;
    email: string;
  };
}

interface SchemesIncentivesProps {
  language: 'en' | 'hi';
}

export function SchemesIncentives({ language }: SchemesIncentivesProps) {
  const translations = {
    en: {
      title: 'Government Schemes & Incentives',
      subtitle: 'Discover funding opportunities and benefits for your business',
      activeSchemes: 'Active Schemes',
      searchPlaceholder: 'Search schemes by name, department, or keywords...',
      filters: {
        category: 'Category',
        businessSize: 'Business Size',
        location: 'Location',
        allCategories: 'All Categories',
        funding: 'Funding',
        taxBenefits: 'Tax Benefits',
        subsidies: 'Subsidies',
        training: 'Training',
        infrastructure: 'Infrastructure',
        export: 'Export',
        technology: 'Technology',
        allSizes: 'All Sizes',
        startup: 'Startup',
        msme: 'MSME',
        largeEnterprise: 'Large Enterprise',
        allLocations: 'All Locations',
        allIndia: 'All India',
        ruralAreas: 'Rural Areas',
        urbanAreas: 'Urban Areas'
      },
      tabs: {
        allSchemes: 'All Schemes',
        featured: 'Featured',
        bookmarked: 'Bookmarked'
      },
      schemeDetails: {
        featured: 'Featured',
        active: 'Active',
        upcoming: 'Upcoming',
        closed: 'Closed',
        keyBenefits: 'Key Benefits:',
        eligibility: 'Eligibility:',
        successRate: 'Success Rate',
        applications: 'Applications',
        type: 'Type',
        applyNow: 'Apply Now',
        viewDetails: 'View Details',
        deadline: 'Deadline',
        contact: 'Contact'
      },
      schemes: {
        startupIndia: {
          title: 'Startup India Scheme',
          description: 'Comprehensive support for startups with tax exemptions, funding support, and simplified compliance',
          department: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
          eligibility: [
            'Business incorporated as Private Limited Company, Partnership or LLP',
            'Turnover should not exceed ₹100 crores in any financial year',
            'Entity should not be formed by splitting or reconstruction',
            'Working towards innovation, development of products/services'
          ],
          benefits: [
            '3-year income tax exemption',
            'Self-certification for labor and environment laws',
            'Fast-track patent examination',
            'Access to funding through Fund of Funds',
            'Government tender benefits'
          ]
        },
        pmMudra: {
          title: 'PM MUDRA Yojana',
          description: 'Micro Units Development and Refinance Agency providing loans to micro and small enterprises',
          department: 'Ministry of Micro, Small and Medium Enterprises',
          eligibility: [
            'Individual proprietors',
            'Partnership firms',
            'Private limited companies',
            'Small manufacturing enterprises',
            'Traders, shopkeepers, and service sector enterprises'
          ],
          benefits: [
            'Collateral-free loans up to ₹10 lakhs',
            'Shishu loans: up to ₹50,000',
            'Kishore loans: ₹50,000 to ₹5 lakhs',
            'Tarun loans: ₹5 lakhs to ₹10 lakhs',
            'No processing fee for Shishu loans'
          ]
        }
      },
      noBookmarks: {
        title: 'No Bookmarked Schemes',
        description: "Start bookmarking schemes you're interested in to see them here."
      }
    },
    hi: {
      title: 'सरकारी योजनाएं और प्रोत्साहन',
      subtitle: 'अपने व्यवसाय के लिए फंडिंग अवसर और लाभ खोजें',
      activeSchemes: 'सक्रिय योजनाएं',
      searchPlaceholder: 'नाम, विभाग, या कीवर्ड से योजनाएं खोजें...',
      filters: {
        category: 'श्रेणी',
        businessSize: 'व्यवसाय का आकार',
        location: 'स्थान',
        allCategories: 'सभी श्रेणियां',
        funding: 'फंडिंग',
        taxBenefits: 'कर लाभ',
        subsidies: 'सब्सिडी',
        training: 'प्रशिक्षण',
        infrastructure: 'अवसंरचना',
        export: 'निर्यात',
        technology: 'प्रौद्योगिकी',
        allSizes: 'सभी आकार',
        startup: 'स्टार्टअप',
        msme: 'एमएसएमई',
        largeEnterprise: 'बड़ा उद्यम',
        allLocations: 'सभी स्थान',
        allIndia: 'अखिल भारत',
        ruralAreas: 'ग्रामीण क्षेत्र',
        urbanAreas: 'शहरी क्षेत्र'
      },
      tabs: {
        allSchemes: 'सभी योजनाएं',
        featured: 'फीचर्ड',
        bookmarked: 'बुकमार्क किया गया'
      },
      schemeDetails: {
        featured: 'फीचर्ड',
        active: 'सक्रिय',
        upcoming: 'आगामी',
        closed: 'बंद',
        keyBenefits: 'मुख्य लाभ:',
        eligibility: 'पात्रता:',
        successRate: 'सफलता दर',
        applications: 'आवेदन',
        type: 'प्रकार',
        applyNow: 'अभी आवेदन करें',
        viewDetails: 'विवरण देखें',
        deadline: 'समय सीमा',
        contact: 'संपर्क'
      },
      schemes: {
        startupIndia: {
          title: 'स्टार्टअप इंडिया योजना',
          description: 'कर छूट, फंडिंग सहायता और सरलीकृत अनुपालन के साथ स्टार्टअप के लिए व्यापक सहायता',
          department: 'उद्योग और आंतरिक व्यापार संवर्धन विभाग (डीपीआईआईटी)',
          eligibility: [
            'प्राइवेट लिमिटेड कंपनी, पार्टनरशिप या एलएलपी के रूप में निगमित व्यवसाय',
            'किसी भी वित्तीय वर्ष में टर्नओवर ₹100 करोड़ से अधिक नहीं होना चाहिए',
            'इकाई का गठन विभाजन या पुनर्निर्माण द्वारा नहीं होना चाहिए',
            'उत्पादों/सेवाओं के नवाचार, विकास की दिशा में कार्य'
          ],
          benefits: [
            '3 साल की आयकर छूट',
            'श्रम और पर्यावरण कानूनों के लिए स्व-प्रमाणन',
            'फास्ट-ट्रैक पेटेंट परीक्षा',
            'फंड ऑफ फंड्स के माध्यम से फंडिंग तक पहुंच',
            'सरकारी टेंडर लाभ'
          ]
        },
        pmMudra: {
          title: 'पीएम मुद्रा योजना',
          description: 'सूक्ष्म इकाई विकास और पुनर्वित्त एजेंसी जो सूक्ष्म और लघु उद्यमों को ऋण प्रदान करती है',
          department: 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय',
          eligibility: [
            'व्यक्तिगत स्वामी',
            'साझेदारी फर्म',
            'प्राइवेट लिमिटेड कंपनियां',
            'छोटे विनिर्माण उद्यम',
            'व्यापारी, दुकानदार और सेवा क्षेत्र के उद्यम'
          ],
          benefits: [
            '₹10 लाख तक संपार्श्विक-मुक्त ऋण',
            'शिशु ऋण: ₹50,000 तक',
            'किशोर ऋण: ₹50,000 से ₹5 लाख',
            'तरुण ऋण: ₹5 लाख से ₹10 लाख',
            'शिशु ऋण के लिए कोई प्रसंस्करण शुल्क नहीं'
          ]
        }
      },
      noBookmarks: {
        title: 'कोई बुकमार्क योजना नहीं',
        description: 'आपकी रुचि की योजनाओं को बुकमार्क करना शुरू करें ताकि वे यहां दिखें।'
      }
    }
  };

  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBusinessSize, setSelectedBusinessSize] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState<Set<string>>(new Set());

  const schemes: Scheme[] = [
    {
      id: 'startup-india',
      title: t.schemes.startupIndia.title,
      description: t.schemes.startupIndia.description,
      department: t.schemes.startupIndia.department,
      category: 'tax-benefit',
      eligibility: t.schemes.startupIndia.eligibility,
      benefits: t.schemes.startupIndia.benefits,
      maxFunding: '₹50 Lakhs',
      fundingType: 'tax-credit',
      applicationDeadline: language === 'hi' ? 'रोलिंग आधार' : 'Rolling basis',
      processingTime: language === 'hi' ? '30-45 दिन' : '30-45 days',
      successRate: 78,
      applicationsReceived: 85640,
      targetSector: ['Technology', 'Healthcare', 'Fintech', 'E-commerce', 'CleanTech'],
      businessSize: 'startup',
      location: [language === 'hi' ? 'अखिल भारत' : 'All India'],
      status: 'active',
      featured: true,
      documents: [
        language === 'hi' ? 'निगमन प्रमाणपत्र' : 'Certificate of Incorporation',
        language === 'hi' ? 'पैन कार्ड' : 'PAN Card',
        language === 'hi' ? 'आधार कार्ड' : 'Aadhaar Card',
        language === 'hi' ? 'बैंक खाता विवरण' : 'Bank Account Details',
        language === 'hi' ? 'व्यावसायिक योजना' : 'Business Plan',
        language === 'hi' ? 'नवाचार विवरण' : 'Innovation Details'
      ],
      contactInfo: {
        website: 'https://www.startupindia.gov.in',
        phone: '1800-115-565',
        email: 'startupindia@invest.india.gov.in'
      }
    },
    {
      id: 'pm-mudra',
      title: t.schemes.pmMudra.title,
      description: t.schemes.pmMudra.description,
      department: t.schemes.pmMudra.department,
      category: 'funding',
      eligibility: t.schemes.pmMudra.eligibility,
      benefits: t.schemes.pmMudra.benefits,
      maxFunding: '₹10 Lakhs',
      fundingType: 'loan',
      applicationDeadline: language === 'hi' ? 'रोलिंग आधार' : 'Rolling basis',
      processingTime: language === 'hi' ? '15-30 दिन' : '15-30 days',
      successRate: 92,
      applicationsReceived: 2850000,
      targetSector: [
        language === 'hi' ? 'विनिर्माण' : 'Manufacturing',
        language === 'hi' ? 'व्यापार' : 'Trading',
        language === 'hi' ? 'सेवाएं' : 'Services',
        language === 'hi' ? 'कृषि' : 'Agriculture'
      ],
      businessSize: 'msme',
      location: [language === 'hi' ? 'अखिल भारत' : 'All India'],
      status: 'active',
      featured: true,
      documents: [
        language === 'hi' ? 'व्यावसायिक योजना' : 'Business Plan',
        language === 'hi' ? 'पहचान प्रमाण' : 'Identity Proof',
        language === 'hi' ? 'पता प्रमाण' : 'Address Proof',
        language === 'hi' ? 'आय प्रमाण' : 'Income Proof',
        language === 'hi' ? 'बैंक विवरण' : 'Bank Statements',
        language === 'hi' ? 'व्यवसाय पंजीकरण' : 'Business Registration'
      ],
      contactInfo: {
        website: 'https://www.mudra.org.in',
        phone: '1800-180-1111',
        email: 'info@mudra.org.in'
      }
    }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesBusinessSize = selectedBusinessSize === 'all' || scheme.businessSize === selectedBusinessSize || scheme.businessSize === 'all';
    const matchesLocation = selectedLocation === 'all' || scheme.location.includes(selectedLocation) || scheme.location.includes('All India') || scheme.location.includes('अखिल भारत');

    return matchesSearch && matchesCategory && matchesBusinessSize && matchesLocation;
  });

  const featuredSchemes = schemes.filter(scheme => scheme.featured);

  const toggleBookmark = (schemeId: string) => {
    const newBookmarks = new Set(bookmarkedSchemes);
    if (newBookmarks.has(schemeId)) {
      newBookmarks.delete(schemeId);
    } else {
      newBookmarks.add(schemeId);
    }
    setBookmarkedSchemes(newBookmarks);
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'funding': DollarSign,
      'tax-benefit': TrendingUp,
      'subsidy': CreditCard,
      'training': Users,
      'infrastructure': Building,
      'export': ExternalLink,
      'technology': Lightbulb
    };
    return icons[category] || FileText;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'funding': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'tax-benefit': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'subsidy': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      'training': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      'infrastructure': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
      'export': 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400',
      'technology': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'upcoming': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'closed': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const renderSchemeCard = (scheme: Scheme, index: number) => {
    const CategoryIcon = getCategoryIcon(scheme.category);
    
    return (
      <motion.div
        key={scheme.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <CardTitle className="text-xl">{scheme.title}</CardTitle>
                  {scheme.featured && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Star className="w-3 h-3 mr-1" />
                      {t.schemeDetails.featured}
                    </Badge>
                  )}
                  <Badge className={getStatusColor(scheme.status)}>
                    {scheme.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {scheme.status === 'upcoming' && <Clock className="w-3 h-3 mr-1" />}
                    {scheme.status === 'closed' && <AlertCircle className="w-3 h-3 mr-1" />}
                    {t.schemeDetails[scheme.status as keyof typeof t.schemeDetails]}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-3">{scheme.description}</p>
                <p className="text-sm text-muted-foreground">{scheme.department}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleBookmark(scheme.id)}
                className={bookmarkedSchemes.has(scheme.id) ? 'text-yellow-600' : ''}
              >
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Key Information */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={getCategoryColor(scheme.category)}>
                    <CategoryIcon className="w-3 h-3 mr-1" />
                    {scheme.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                  <Badge variant="outline">
                    <DollarSign className="w-3 h-3 mr-1" />
                    {language === 'hi' ? 'तक' : 'Up to'} {scheme.maxFunding}
                  </Badge>
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    {scheme.processingTime}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">{t.schemeDetails.keyBenefits}</h4>
                    <ul className="text-sm space-y-1">
                      {scheme.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">{t.schemeDetails.eligibility}</h4>
                    <ul className="text-sm space-y-1">
                      {scheme.eligibility.slice(0, 2).map((criteria, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                          {criteria}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Stats and Actions */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t.schemeDetails.successRate}</span>
                      <span>{scheme.successRate}%</span>
                    </div>
                    <Progress value={scheme.successRate} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-accent/20 rounded-lg">
                      <div className="text-lg font-semibold">{scheme.applicationsReceived.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{t.schemeDetails.applications}</div>
                    </div>
                    <div className="p-3 bg-accent/20 rounded-lg">
                      <div className="text-lg font-semibold">{scheme.fundingType}</div>
                      <div className="text-xs text-muted-foreground">{t.schemeDetails.type}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full">
                    {t.schemeDetails.applyNow}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    {t.schemeDetails.viewDetails}
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  <div>{t.schemeDetails.deadline}: {scheme.applicationDeadline}</div>
                  <div>{t.schemeDetails.contact}: {scheme.contactInfo.phone}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className={`p-6 space-y-6 relative z-10 ${language === 'hi' ? 'lang-hi' : 'lang-en'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Star className="w-3 h-3 mr-1" />
            {schemes.length} {t.activeSchemes}
          </Badge>
        </div>

        {/* Search and Filters */}
        <Card className="bg-card/50 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:w-auto w-full">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder={t.filters.category} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.filters.allCategories}</SelectItem>
                    <SelectItem value="funding">{t.filters.funding}</SelectItem>
                    <SelectItem value="tax-benefit">{t.filters.taxBenefits}</SelectItem>
                    <SelectItem value="subsidy">{t.filters.subsidies}</SelectItem>
                    <SelectItem value="training">{t.filters.training}</SelectItem>
                    <SelectItem value="infrastructure">{t.filters.infrastructure}</SelectItem>
                    <SelectItem value="export">{t.filters.export}</SelectItem>
                    <SelectItem value="technology">{t.filters.technology}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedBusinessSize} onValueChange={setSelectedBusinessSize}>
                  <SelectTrigger>
                    <Building className="w-4 h-4 mr-2" />
                    <SelectValue placeholder={t.filters.businessSize} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.filters.allSizes}</SelectItem>
                    <SelectItem value="startup">{t.filters.startup}</SelectItem>
                    <SelectItem value="msme">{t.filters.msme}</SelectItem>
                    <SelectItem value="large">{t.filters.largeEnterprise}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <MapPin className="w-4 h-4 mr-2" />
                    <SelectValue placeholder={t.filters.location} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.filters.allLocations}</SelectItem>
                    <SelectItem value="All India">{t.filters.allIndia}</SelectItem>
                    <SelectItem value="Rural Areas">{t.filters.ruralAreas}</SelectItem>
                    <SelectItem value="Urban Areas">{t.filters.urbanAreas}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all-schemes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all-schemes">{t.tabs.allSchemes} ({filteredSchemes.length})</TabsTrigger>
            <TabsTrigger value="featured">{t.tabs.featured} ({featuredSchemes.length})</TabsTrigger>
            <TabsTrigger value="bookmarked">{t.tabs.bookmarked} ({bookmarkedSchemes.size})</TabsTrigger>
          </TabsList>

          <TabsContent value="all-schemes" className="space-y-6">
            <div className="grid gap-6">
              {filteredSchemes.map((scheme, index) => renderSchemeCard(scheme, index))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid gap-6">
              {featuredSchemes.map((scheme, index) => renderSchemeCard(scheme, index))}
            </div>
          </TabsContent>

          <TabsContent value="bookmarked" className="space-y-6">
            {bookmarkedSchemes.size === 0 ? (
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Bookmark className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">{t.noBookmarks.title}</h3>
                  <p className="text-muted-foreground">{t.noBookmarks.description}</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {schemes.filter(scheme => bookmarkedSchemes.has(scheme.id)).map((scheme, index) => renderSchemeCard(scheme, index))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}