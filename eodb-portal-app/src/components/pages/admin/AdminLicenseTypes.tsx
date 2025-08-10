import { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Clock,
  Shield,
  Building,
  Zap,
  Leaf,
  Heart,
  Car,
  Coffee,
  Factory,
  Home,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';

interface AdminLicenseTypesProps {
  language: 'en' | 'hi';
  user: any;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export function AdminLicenseTypes({ language, user, onNavigate, onBack }: AdminLicenseTypesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const translations = {
    en: {
      title: 'License Types Management',
      subtitle: 'Manage and configure different types of licenses',
      addNewType: 'Add New License Type',
      search: 'Search license types...',
      category: 'Category',
      status: 'Status',
      actions: 'Actions',
      allCategories: 'All Categories',
      allStatuses: 'All Statuses',
      active: 'Active',
      inactive: 'Inactive',
      draft: 'Draft',
      trade: 'Trade & Commerce',
      construction: 'Construction',
      food: 'Food & Beverages',
      transport: 'Transport',
      manufacturing: 'Manufacturing',
      healthcare: 'Healthcare',
      environment: 'Environment',
      licenseName: 'License Name',
      description: 'Description',
      fees: 'Fees',
      validity: 'Validity',
      requirements: 'Requirements',
      processingTime: 'Processing Time',
      edit: 'Edit',
      delete: 'Delete',
      export: 'Export',
      days: 'days',
      months: 'months',
      years: 'years',
      createLicenseType: 'Create License Type',
      editLicenseType: 'Edit License Type',
      name: 'Name',
      categorySelect: 'Select Category',
      statusSelect: 'Select Status',
      feeAmount: 'Fee Amount (₹)',
      validityPeriod: 'Validity Period',
      maxProcessingTime: 'Maximum Processing Time',
      requiredDocuments: 'Required Documents',
      save: 'Save',
      cancel: 'Cancel'
    },
    hi: {
      title: 'लाइसेंस प्रकार प्रबंधन',
      subtitle: 'विभिन्न प्रकार के लाइसेंसों का प्रबंधन और कॉन्फ़िगरेशन',
      addNewType: 'नया लाइसेंस प्रकार जोड़ें',
      search: 'लाइसेंस प्रकार खोजें...',
      category: 'श्रेणी',
      status: 'स्थिति',
      actions: 'कार्य',
      allCategories: 'सभी श्रेणियां',
      allStatuses: 'सभी स्थितियां',
      active: 'सक्रिय',
      inactive: 'निष्क्रिय',
      draft: 'ड्राफ्ट',
      trade: 'व्यापार और वाणिज्य',
      construction: 'निर्माण',
      food: 'खाद्य और पेय पदार्थ',
      transport: 'परिवहन',
      manufacturing: 'विनिर्माण',
      healthcare: 'स्वास्थ्य सेवा',
      environment: 'पर्यावरण',
      licenseName: 'लाइसेंस नाम',
      description: 'विवरण',
      fees: 'शुल्क',
      validity: 'वैधता',
      requirements: 'आवश्यकताएं',
      processingTime: 'प्रसंस्करण समय',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      export: 'निर्यात',
      days: 'दिन',
      months: 'महीने',
      years: 'वर्ष',
      createLicenseType: 'लाइसेंस प्रकार बनाएं',
      editLicenseType: 'लाइसेंस प्रकार संपादित करें',
      name: 'नाम',
      categorySelect: 'श्रेणी चुनें',
      statusSelect: 'स्थिति चुनें',
      feeAmount: 'शुल्क राशि (₹)',
      validityPeriod: 'वैधता अवधि',
      maxProcessingTime: 'अधिकतम प्रसंस्करण समय',
      requiredDocuments: 'आवश्यक दस्तावेज़',
      save: 'सहेजें',
      cancel: 'रद्द करें'
    }
  };

  const t = translations[language];

  const licenseTypes = [
    {
      id: 1,
      name: language === 'hi' ? 'व्यापार लाइसेंस' : 'Trade License',
      category: 'trade',
      description: language === 'hi' ? 'सामान्य व्यापारिक गतिविधियों के लिए लाइसेंस' : 'License for general commercial activities',
      fees: 5000,
      validity: '1 year',
      processingTime: '15 days',
      requirements: 4,
      status: 'active',
      icon: Building,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      id: 2,
      name: language === 'hi' ? 'खाद्य लाइसेंस' : 'Food License',
      category: 'food',
      description: language === 'hi' ? 'खाद्य व्यवसाय संचालन लाइसेंस' : 'License for food business operations',
      fees: 3000,
      validity: '1 year',
      processingTime: '21 days',
      requirements: 6,
      status: 'active',
      icon: Coffee,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      id: 3,
      name: language === 'hi' ? 'फैक्टरी लाइसेंस' : 'Factory License',
      category: 'manufacturing',
      description: language === 'hi' ? 'औद्योगिक विनिर्माण लाइसेंस' : 'License for industrial manufacturing',
      fees: 25000,
      validity: '3 years',
      processingTime: '45 days',
      requirements: 8,
      status: 'active',
      icon: Factory,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      id: 4,
      name: language === 'hi' ? 'परिवहन लाइसेंस' : 'Transport License',
      category: 'transport',
      description: language === 'hi' ? 'वाहन परिवहन सेवा लाइसेंस' : 'License for vehicle transport services',
      fees: 8000,
      validity: '2 years',
      processingTime: '30 days',
      requirements: 5,
      status: 'active',
      icon: Car,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      id: 5,
      name: language === 'hi' ? 'स्वास्थ्य लाइसेंस' : 'Health License',
      category: 'healthcare',
      description: language === 'hi' ? 'स्वास्थ्य सेवा प्रदाता लाइसेंस' : 'License for healthcare service providers',
      fees: 15000,
      validity: '2 years',
      processingTime: '60 days',
      requirements: 10,
      status: 'active',
      icon: Heart,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      id: 6,
      name: language === 'hi' ? 'पर्यावरण मंजूरी' : 'Environmental Clearance',
      category: 'environment',
      description: language === 'hi' ? 'पर्यावरणीय प्रभाव मूल्यांकन लाइसेंस' : 'License for environmental impact activities',
      fees: 50000,
      validity: '5 years',
      processingTime: '90 days',
      requirements: 12,
      status: 'draft',
      icon: Leaf,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    }
  ];

  const categories = [
    { value: 'all', label: t.allCategories },
    { value: 'trade', label: t.trade },
    { value: 'construction', label: t.construction },
    { value: 'food', label: t.food },
    { value: 'transport', label: t.transport },
    { value: 'manufacturing', label: t.manufacturing },
    { value: 'healthcare', label: t.healthcare },
    { value: 'environment', label: t.environment }
  ];

  const statuses = [
    { value: 'all', label: t.allStatuses },
    { value: 'active', label: t.active },
    { value: 'inactive', label: t.inactive },
    { value: 'draft', label: t.draft }
  ];

  const filteredLicenseTypes = licenseTypes.filter(license => {
    const matchesSearch = license.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         license.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || license.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || license.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: t.active, variant: 'default' as const, class: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
      inactive: { label: t.inactive, variant: 'secondary' as const, class: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300' },
      draft: { label: t.draft, variant: 'outline' as const, class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' }
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
  };

  const statistics = {
    total: licenseTypes.length,
    active: licenseTypes.filter(l => l.status === 'active').length,
    draft: licenseTypes.filter(l => l.status === 'draft').length,
    avgProcessingTime: Math.round(licenseTypes.reduce((acc, l) => acc + parseInt(l.processingTime), 0) / licenseTypes.length)
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground mt-1">{t.subtitle}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => {}}>
              <Download className="w-4 h-4 mr-2" />
              {t.export}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  {t.addNewType}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{t.createLicenseType}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.name}</Label>
                      <Input id="name" placeholder="Enter license name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">{t.category}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={t.categorySelect} />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.slice(1).map(cat => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">{t.description}</Label>
                    <Textarea id="description" placeholder="Enter license description" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fees">{t.feeAmount}</Label>
                      <Input id="fees" type="number" placeholder="5000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="validity">{t.validityPeriod}</Label>
                      <Input id="validity" placeholder="1 year" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="processing">{t.maxProcessingTime}</Label>
                      <Input id="processing" placeholder="15 days" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="documents">{t.requiredDocuments}</Label>
                    <Textarea id="documents" placeholder="List required documents..." />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">{t.cancel}</Button>
                  <Button>{t.save}</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Types</p>
                  <p className="text-3xl font-bold text-foreground">{statistics.total}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.active}</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{statistics.active}</p>
                </div>
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.draft}</p>
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{statistics.draft}</p>
                </div>
                <Edit className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg {t.processingTime}</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{statistics.avgProcessingTime} {t.days}</p>
                </div>
                <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>{t.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder={t.search}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="lg:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="lg:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* License Types Grid */}
            <div className="grid gap-6">
              {filteredLicenseTypes.map((license, index) => {
                const IconComponent = license.icon;
                const statusConfig = getStatusBadge(license.status);
                
                return (
                  <motion.div
                    key={license.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className={`p-3 rounded-lg ${license.bgColor}`}>
                              <IconComponent className={`w-6 h-6 ${license.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-semibold text-foreground">{license.name}</h3>
                                <Badge className={statusConfig.class}>
                                  {statusConfig.label}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {license.description}
                              </p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">{t.fees}: </span>
                                  <span className="font-medium">₹{license.fees.toLocaleString()}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">{t.validity}: </span>
                                  <span className="font-medium">{license.validity}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">{t.processingTime}: </span>
                                  <span className="font-medium">{license.processingTime}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">{t.requirements}: </span>
                                  <span className="font-medium">{license.requirements} docs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              {t.edit}
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4 mr-2" />
                              {t.delete}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}