import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LicenseTypesAPI } from '@/api';
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Search,
  Download,
  Clock,
  Shield,
  Building
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../../ui/dialog';
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
  const [licenseTypes, setLicenseTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingLicenseType, setEditingLicenseType] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    fees: '',
    validity_period: '',
    processing_time: '',
    status: 'active'
  });
  const [submitting, setSubmitting] = useState(false);

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
      cancel: 'Cancel',
      editLicenseTypeDesc: 'Update the license type information',
      update: 'Update'
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
      cancel: 'रद्द करें',
      editLicenseTypeDesc: 'लाइसेंस प्रकार की जानकारी अपडेट करें',
      update: 'अपडेट करें'
    }
  };

  const t = translations[language];

  useEffect(() => {
    const fetchLicenseTypes = async () => {
      try {
        setLoading(true);
        const response = await LicenseTypesAPI.getAllLicenseTypes();
        setLicenseTypes(response.data || []);
      } catch (error) {
        console.error('Failed to fetch license types:', error);
        // Fallback to empty array
        setLicenseTypes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLicenseTypes();
  }, []);

  // Form submission functions
  const handleCreateLicenseType = async () => {
    try {
      setSubmitting(true);
      await LicenseTypesAPI.createLicenseType(formData);
      setIsCreateDialogOpen(false);
      setFormData({
        name: '',
        category: '',
        description: '',
        fees: '',
        validity_period: '',
        processing_time: '',
        status: 'active'
      });
      // Refresh the list
      const response = await LicenseTypesAPI.getAllLicenseTypes();
      setLicenseTypes(response.data || []);
    } catch (error) {
      console.error('Failed to create license type:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditLicenseType = async () => {
    if (!editingLicenseType) return;
    try {
      setSubmitting(true);
      await LicenseTypesAPI.updateLicenseType(editingLicenseType.id, formData);
      setIsEditDialogOpen(false);
      setEditingLicenseType(null);
      setFormData({
        name: '',
        category: '',
        description: '',
        fees: '',
        validity_period: '',
        processing_time: '',
        status: 'active'
      });
      // Refresh the list
      const response = await LicenseTypesAPI.getAllLicenseTypes();
      setLicenseTypes(response.data || []);
    } catch (error) {
      console.error('Failed to update license type:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteLicenseType = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this license type?')) {
      try {
        await LicenseTypesAPI.deleteLicenseType(id);
        // Refresh the list
        const response = await LicenseTypesAPI.getAllLicenseTypes();
        setLicenseTypes(response.data || []);
      } catch (error) {
        console.error('Failed to delete license type:', error);
      }
    }
  };

  const openEditDialog = (licenseType: any) => {
    setEditingLicenseType(licenseType);
    setFormData({
      name: licenseType.name,
      category: licenseType.category,
      description: licenseType.description || '',
      fees: licenseType.fees?.toString() || '',
      validity_period: licenseType.validity_period?.toString() || '',
      processing_time: licenseType.processing_time?.toString() || '',
      status: licenseType.status || 'active'
    });
    setIsEditDialogOpen(true);
  };

  const openCreateDialog = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      fees: '',
      validity_period: '',
      processing_time: '',
      status: 'active'
    });
    setIsCreateDialogOpen(true);
  };

  // Transform backend data to match frontend structure
  const displayLicenseTypes = licenseTypes.map(lt => ({
    id: lt.id,
    name: lt.name,
    category: lt.category,
    description: lt.description || '',
    fees: lt.fees || 0,
    validity: `${lt.validity_period || 12} months`,
    processingTime: `${lt.processing_time || 30} days`,
    requirements: lt.requirements ? Object.keys(lt.requirements).length : 0,
    status: lt.status || 'active',
    icon: Building, // Default icon
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  }));

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

  const filteredLicenseTypes = displayLicenseTypes.filter(license => {
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
    total: displayLicenseTypes.length,
    active: displayLicenseTypes.filter(l => l.status === 'active').length,
    draft: displayLicenseTypes.filter(l => l.status === 'draft').length,
    avgProcessingTime: displayLicenseTypes.length > 0 ? Math.round(displayLicenseTypes.reduce((acc, l) => acc + parseInt(l.processingTime), 0) / displayLicenseTypes.length) : 0
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
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openCreateDialog}>
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
                      <Input 
                        id="name" 
                        placeholder="Enter license name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">{t.category}</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
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
                    <Textarea 
                      id="description" 
                      placeholder="Enter license description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fees">{t.feeAmount}</Label>
                      <Input 
                        id="fees" 
                        type="number" 
                        placeholder="5000"
                        value={formData.fees}
                        onChange={(e) => setFormData({...formData, fees: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="validity">{t.validityPeriod}</Label>
                      <Input 
                        id="validity" 
                        type="number"
                        placeholder="12"
                        value={formData.validity_period}
                        onChange={(e) => setFormData({...formData, validity_period: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="processing">{t.maxProcessingTime}</Label>
                      <Input 
                        id="processing" 
                        type="number"
                        placeholder="30"
                        value={formData.processing_time}
                        onChange={(e) => setFormData({...formData, processing_time: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">{t.status}</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.slice(1).map(status => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    {t.cancel}
                  </Button>
                  <Button onClick={handleCreateLicenseType} disabled={submitting}>
                    {submitting ? 'Saving...' : t.save}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Edit License Type Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{t.editLicenseType}</DialogTitle>
              <DialogDescription>
                {t.editLicenseTypeDesc}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="edit-name">{t.licenseName}</Label>
                <Input
                  id="edit-name"
                  placeholder="Enter license name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">{t.category}</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.categorySelect} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">{t.description}</Label>
                <Textarea
                  id="edit-description"
                  placeholder="Enter license description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-fees">{t.fees}</Label>
                  <Input 
                    id="edit-fees" 
                    type="number" 
                    placeholder="5000"
                    value={formData.fees}
                    onChange={(e) => setFormData({...formData, fees: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-validity">{t.validity}</Label>
                  <Input 
                    id="edit-validity" 
                    type="number"
                    placeholder="12"
                        value={formData.validity_period}
                        onChange={(e) => setFormData({...formData, validity_period: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-processing">{t.maxProcessingTime}</Label>
                      <Input 
                        id="edit-processing" 
                        type="number"
                        placeholder="30"
                        value={formData.processing_time}
                        onChange={(e) => setFormData({...formData, processing_time: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">{t.status}</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.slice(1).map(status => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    {t.cancel}
                  </Button>
                  <Button onClick={handleEditLicenseType} disabled={submitting}>
                    {submitting ? 'Updating...' : t.update}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

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
                            <Button variant="outline" size="sm" onClick={() => openEditDialog(license)}>
                              <Edit className="w-4 h-4 mr-2" />
                              {t.edit}
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteLicenseType(license.id)}>
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