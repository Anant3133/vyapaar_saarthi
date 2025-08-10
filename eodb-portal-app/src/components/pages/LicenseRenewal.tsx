import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  RefreshCw, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Download,
  Upload,
  CreditCard,
  Building2,
  Phone,
  Mail,
  MapPin,
  Hash,
  User,
  Info,
  Shield,
  ArrowRight,
  Zap,
  Wallet
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { PaymentGateway } from '../PaymentGateway';

interface LicenseRenewalProps {
  language: 'en' | 'hi';
}

export function LicenseRenewal({ language }: LicenseRenewalProps) {
  const translations = {
    en: {
      title: 'License Renewal',
      subtitle: 'Renew your business licenses online',
      step: 'Step',
      of: 'of',
      complete: '% Complete',
      licenseSelection: 'License Selection',
      licenseDetails: 'License Details',
      documentsUpload: 'Documents Upload',
      payment: 'Payment',
      confirmation: 'Confirmation',
      selectLicense: 'Select License to Renew',
      existingLicenses: 'Your Existing Licenses',
      licenseNumber: 'License Number',
      expiryDate: 'Expiry Date',
      status: 'Status',
      renewalFee: 'Renewal Fee',
      validUntil: 'Valid Until',
      renewalType: 'Renewal Type',
      standard: 'Standard Renewal',
      expedited: 'Expedited Renewal',
      businessDetails: 'Business Details',
      businessName: 'Business Name',
      registrationNumber: 'Registration Number',
      businessType: 'Business Type',
      businessAddress: 'Business Address',
      contactDetails: 'Contact Details',
      contactPerson: 'Contact Person',
      emailAddress: 'Email Address',
      phoneNumber: 'Phone Number',
      changesDeclaration: 'Changes Declaration',
      businessChanges: 'Have there been any changes to your business since the last renewal?',
      describeChanges: 'Please describe the changes',
      requiredDocuments: 'Required Documents for Renewal',
      uploadTips: 'Upload Requirements:',
      existingLicenseCopy: 'Existing License Copy',
      businessRegistration: 'Business Registration Certificate',
      taxClearance: 'Tax Clearance Certificate',
      complianceCertificate: 'Compliance Certificate',
      updatedBankStatement: 'Updated Bank Statement',
      photographsOfPremises: 'Recent Photographs of Business Premises',
      renewalPayment: 'Renewal Payment',
      paymentSummary: 'Payment Summary',
      baseFee: 'Base Renewal Fee',
      lateFee: 'Late Fee (if applicable)',
      processingFee: 'Processing Fee',
      serviceTax: 'Service Tax (18%)',
      totalAmount: 'Total Amount',
      paymentSuccess: 'Payment completed successfully! Your renewal application has been submitted.',
      applicationSubmitted: 'Renewal Application Submitted Successfully',
      applicationNumber: 'Application Number',
      expectedCompletion: 'Expected Completion',
      downloadReceipt: 'Download Receipt',
      trackApplication: 'Track Application',
      notificationSettings: 'Notification Settings',
      emailNotifications: 'Email Notifications',
      smsNotifications: 'SMS Notifications',
      whatsappNotifications: 'WhatsApp Notifications',
      urgentRenewal: 'Urgent Renewal',
      expiresWithin30Days: 'Expires within 30 days',
      expiresWithin7Days: 'Expires within 7 days',
      expired: 'Expired',
      active: 'Active',
      pendingRenewal: 'Pending Renewal',
      renewalInProgress: 'Renewal in Progress',
      previous: 'Previous',
      next: 'Next',
      submitRenewal: 'Submit Renewal Application',
      selectToRenew: 'Select to Renew',
      searchLicenses: 'Search licenses...',
      filterByStatus: 'Filter by Status',
      filterByType: 'Filter by Type',
      all: 'All',
      payNow: 'Pay Now',
      renewalProcessing: 'Your renewal is being processed',
      estimatedTime: 'Estimated processing time',
      days: 'days',
      yes: 'Yes',
      no: 'No',
      // Additional License Details Section
      licenseDetailsForm: 'License Details Form',
      currentLicenseInfo: 'Current License Information',
      licenseCategory: 'License Category',
      issuingAuthority: 'Issuing Authority',
      licenseScope: 'License Scope',
      businessActivity: 'Business Activity',
      premises: 'Premises Details',
      premisesAddress: 'Premises Address',
      premisesArea: 'Premises Area (sq ft)',
      ownershipType: 'Ownership Type',
      owned: 'Owned',
      rented: 'Rented',
      leased: 'Leased',
      contactDetailsForm: 'Contact Details Form',
      authorizedSignatory: 'Authorized Signatory',
      designation: 'Designation',
      alternateContact: 'Alternate Contact',
      alternateEmail: 'Alternate Email',
      businessHours: 'Business Hours',
      website: 'Website',
      employeeCount: 'Employee Count',
      annualTurnover: 'Annual Turnover',
      // Payment Details Section
      paymentDetails: 'Payment Details',
      paymentMethod: 'Payment Method',
      creditCard: 'Credit Card',
      debitCard: 'Debit Card',
      netBanking: 'Net Banking',
      upi: 'UPI',
      wallet: 'Wallet',
      paymentBreakdown: 'Payment Breakdown',
      gstAmount: 'GST Amount',
      discount: 'Discount (if any)',
      convenienceFee: 'Convenience Fee',
      finalAmount: 'Final Amount Payable',
      paymentTerms: 'Payment Terms & Conditions',
      refundPolicy: 'Refund Policy',
      proceedToPayment: 'Proceed to Payment'
    },
    hi: {
      title: 'लाइसेंस नवीनीकरण',
      subtitle: 'अपने व्यावसायिक लाइसेंस ऑनलाइन नवीनीकृत करें',
      step: 'चरण',
      of: 'का',
      complete: '% पूर्ण',
      licenseSelection: 'लाइसेंस चयन',
      licenseDetails: 'लाइसेंस विवरण',
      documentsUpload: 'दस्तावेज़ अपलोड',
      payment: 'भुगतान',
      confirmation: 'पुष्टि',
      selectLicense: 'नवीनीकरण के लिए लाइसेंस चुनें',
      existingLicenses: 'आपके मौजूदा लाइसेंस',
      licenseNumber: 'लाइसेंस नंबर',
      expiryDate: 'समाप्ति दिनांक',
      status: 'स्थिति',
      renewalFee: 'नवीनीकरण शुल्क',
      validUntil: 'तक वैध',
      renewalType: 'नवीनीकरण प्रकार',
      standard: 'मानक नवीनीकरण',
      expedited: 'त्वरित नवीनीकरण',
      businessDetails: 'व्यावसायिक विवरण',
      businessName: 'व्यवसाय का नाम',
      registrationNumber: 'पंजीकरण संख्या',
      businessType: 'व्यवसाय प्रकार',
      businessAddress: 'व्यावसायिक पता',
      contactDetails: 'संपर्क विवरण',
      contactPerson: 'संपर्क व्यक्ति',
      emailAddress: 'ईमेल पता',
      phoneNumber: 'फोन नंबर',
      changesDeclaration: 'परिवर्तन घोषणा',
      businessChanges: 'क्या पिछले नवीनीकरण के बाद से आपके व्यवसाय में कोई परिवर्तन हुए हैं?',
      describeChanges: 'कृपया परिवर्तनों का वर्णन करें',
      requiredDocuments: 'नवीनीकरण के लिए आवश्यक दस्तावेज़',
      uploadTips: 'अपलोड आवश्यकताएं:',
      existingLicenseCopy: 'मौजूदा लाइसेंस की प्रति',
      businessRegistration: 'व्यावसायिक पंजीकरण प्रमाणपत्र',
      taxClearance: 'कर क्लीयरेंस प्रमाणपत्र',
      complianceCertificate: 'अनुपालन प्रमाणपत्र',
      updatedBankStatement: 'अपडेटेड बैंक स्टेटमेंट',
      photographsOfPremises: 'व्यावसायिक परिसर की हाल की तस्वीरें',
      renewalPayment: 'नवीनीकरण भुगतान',
      paymentSummary: 'भुगतान सारांश',
      baseFee: 'मूल नवीनीकरण शुल्क',
      lateFee: 'विलंब शुल्क (यदि लागू हो)',
      processingFee: 'प्रसंस्करण शुल्क',
      serviceTax: 'सेवा कर (18%)',
      totalAmount: 'कुल राशि',
      paymentSuccess: 'भुगतान सफलतापूर्वक पूर्ण! आपका नवीनीकरण आवेदन जमा किया गया है।',
      applicationSubmitted: 'नवीनीकरण आवेदन सफलतापूर्वक जमा किया गया',
      applicationNumber: 'आवेदन संख्या',
      expectedCompletion: 'अपेक्षित समापन',
      downloadReceipt: 'रसीद डाउनलोड करें',
      trackApplication: 'आवेदन ट्रैक करें',
      notificationSettings: 'अधिसूचना सेटिंग्स',
      emailNotifications: 'ईमेल अधिसूचनाएं',
      smsNotifications: 'एसएमएस अधिसूचनाएं',
      whatsappNotifications: 'व्हाट्सऐप अधिसूचनाएं',
      urgentRenewal: 'तत्काल नवीनीकरण',
      expiresWithin30Days: '30 दिनों के भीतर समाप्त',
      expiresWithin7Days: '7 दिनों के भीतर समाप्त',
      expired: 'समाप्त',
      active: 'सक्रिय',
      pendingRenewal: 'नवीनीकरण लंबित',
      renewalInProgress: 'नवीनीकरण प्रगति में',
      previous: 'पिछला',
      next: 'अगला',
      submitRenewal: 'नवीनीकरण आवेदन जमा करें',
      selectToRenew: 'नवीनीकरण के लिए चुनें',
      searchLicenses: 'लाइसेंस खोजें...',
      filterByStatus: 'स्थिति के अनुसार फ़िल्टर करें',
      filterByType: 'प्रकार के अनुसार फ़िल्टर करें',
      all: 'सभी',
      payNow: 'अभी भुगतान करें',
      renewalProcessing: 'आपका नवीनीकरण प्रसंस्करण हो रहा है',
      estimatedTime: 'अनुमानित प्रसंस्करण समय',
      days: 'दिन',
      yes: 'हाँ',
      no: 'नहीं',
      // Additional License Details Section
      licenseDetailsForm: 'लाइसेंस विवरण फॉर्म',
      currentLicenseInfo: 'वर्तमान लाइसेंस जानकारी',
      licenseCategory: 'लाइसेंस श्रेणी',
      issuingAuthority: 'जारी करने वाला प्राधिकरण',
      licenseScope: 'लाइसेंस स्कोप',
      businessActivity: 'व्यावसायिक गतिविधि',
      premises: 'परिसर विवरण',
      premisesAddress: 'परिसर का पता',
      premisesArea: 'परिसर का क्षेत्रफल (वर्ग फुट)',
      ownershipType: 'स्वामित्व प्रकार',
      owned: 'स्वामित्व',
      rented: 'किराया',
      leased: 'पट्टा',
      contactDetailsForm: 'संपर्क विवरण फॉर्म',
      authorizedSignatory: 'अधिकृत हस्ताक्षरकर्ता',
      designation: 'पदनाम',
      alternateContact: 'वैकल्पिक संपर्क',
      alternateEmail: 'वैकल्पिक ईमेल',
      businessHours: 'व्यावसायिक घंटे',
      website: 'वेबसाइट',
      employeeCount: 'कर्मचारी संख्या',
      annualTurnover: 'वार्षिक टर्नओवर',
      // Payment Details Section
      paymentDetails: 'भुगतान विवरण',
      paymentMethod: 'भुगतान विधि',
      creditCard: 'क्रेडिट कार्ड',
      debitCard: 'डेबिट कार्ड',
      netBanking: 'नेट बैंकिंग',
      upi: 'यूपीआई',
      wallet: 'वॉलेट',
      paymentBreakdown: 'भुगतान विवरण',
      gstAmount: 'जीएसटी राशि',
      discount: 'छूट (यदि कोई हो)',
      convenienceFee: 'सुविधा शुल्क',
      finalAmount: 'अंतिम देय राशि',
      paymentTerms: 'भुगतान नियम और शर्तें',
      refundPolicy: 'रिफंड नीति',
      proceedToPayment: 'भुगतान की ओर बढ़ें'
    }
  };

  const t = translations[language];

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLicense, setSelectedLicense] = useState('');
  const [renewalType, setRenewalType] = useState('standard');
  const [businessChanges, setBusinessChanges] = useState('');
  const [hasChanges, setHasChanges] = useState('no');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    registrationNumber: '',
    businessType: '',
    businessAddress: '',
    contactPerson: '',
    emailAddress: '',
    phoneNumber: '',
    alternateContact: '',
    alternateEmail: '',
    premisesAddress: '',
    premisesArea: '',
    ownershipType: '',
    authorizedSignatory: '',
    designation: '',
    businessHours: '',
    website: '',
    employeeCount: '',
    annualTurnover: ''
  });

  const steps = [
    { id: 1, title: t.licenseSelection, icon: FileText },
    { id: 2, title: t.licenseDetails, icon: Building2 },
    { id: 3, title: t.documentsUpload, icon: Upload },
    { id: 4, title: t.payment, icon: CreditCard },
    { id: 5, title: t.confirmation, icon: CheckCircle2 }
  ];

  // Mock data for existing licenses
  const existingLicenses = [
    {
      id: 'TL001',
      type: language === 'hi' ? 'व्यापार लाइसेंस' : 'Trade License',
      number: 'TL/2023/001234',
      issueDate: '2023-01-15',
      expiryDate: '2024-01-15',
      status: 'expired',
      renewalFee: '₹2,500',
      urgency: 'high'
    },
    {
      id: 'GST002',
      type: language === 'hi' ? 'जीएसटी पंजीकरण' : 'GST Registration',
      number: '27ABCDE1234F1Z5',
      issueDate: '2023-03-10',
      expiryDate: '2024-03-10',
      status: 'expiresWithin30Days',
      renewalFee: '₹0',
      urgency: 'medium'
    },
    {
      id: 'EC003',
      type: language === 'hi' ? 'पर्यावरण मंजूरी' : 'Environmental Clearance',
      number: 'EC/2023/5678',
      issueDate: '2023-06-20',
      expiryDate: '2024-12-20',
      status: 'active',
      renewalFee: '₹5,000',
      urgency: 'low'
    },
    {
      id: 'FS004',
      type: language === 'hi' ? 'अग्नि सुरक्षा प्रमाणपत्र' : 'Fire Safety Certificate',
      number: 'FS/2023/9012',
      issueDate: '2023-02-28',
      expiryDate: '2024-02-28',
      status: 'expiresWithin7Days',
      renewalFee: '₹1,200',
      urgency: 'high'
    }
  ];

  const requiredDocuments = [
    t.existingLicenseCopy,
    t.businessRegistration,
    t.taxClearance,
    t.complianceCertificate,
    t.updatedBankStatement,
    t.photographsOfPremises
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'expired':
        return <Badge variant="destructive">{t.expired}</Badge>;
      case 'expiresWithin7Days':
        return <Badge className="bg-red-100 text-red-800 border-red-200">{t.expiresWithin7Days}</Badge>;
      case 'expiresWithin30Days':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">{t.expiresWithin30Days}</Badge>;
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">{t.active}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'border-gray-200 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const handleFileUpload = (fileName: string) => {
    setUploadedFiles(prev => [...prev, fileName]);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    setPaymentCompleted(true);
    console.log('Payment successful:', paymentData);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setCurrentStep(5);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const progress = (currentStep / steps.length) * 100;
  const selectedLicenseData = existingLicenses.find(license => license.id === selectedLicense);

  const filteredLicenses = existingLicenses.filter(license => {
    const matchesSearch = license.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         license.number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || license.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate payment amounts
  const baseFee = selectedLicenseData ? parseInt(selectedLicenseData.renewalFee.replace('₹', '').replace(',', '')) : 0;
  const lateFee = selectedLicenseData?.status === 'expired' ? Math.floor(baseFee * 0.1) : 0;
  const processingFee = renewalType === 'expedited' ? Math.floor(baseFee * 0.5) : Math.floor(baseFee * 0.1);
  const gstAmount = Math.floor((baseFee + lateFee + processingFee) * 0.18);
  const convenienceFee = paymentMethod === 'creditCard' ? 50 : paymentMethod === 'netBanking' ? 20 : 0;
  const totalAmount = baseFee + lateFee + processingFee + gstAmount + convenienceFee;

  return (
    <div className={`p-6 max-w-6xl mx-auto relative z-10 ${language === 'hi' ? 'lang-hi' : 'lang-en'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{t.step} {currentStep} {t.of} {steps.length}</span>
              <span>{Math.round(progress)}{t.complete}</span>
            </div>
            <Progress value={progress} className="h-2 mb-4" />
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-8 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <motion.div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-gray-300 text-gray-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <step.icon className="w-5 h-5" />
                </motion.div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            {/* Step 1: License Selection */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>{t.selectLicense}</span>
                  </CardTitle>
                </CardHeader>

                {/* Search and Filter */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder={t.searchLicenses}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder={t.filterByStatus} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t.all}</SelectItem>
                      <SelectItem value="expired">{t.expired}</SelectItem>
                      <SelectItem value="expiresWithin7Days">{t.expiresWithin7Days}</SelectItem>
                      <SelectItem value="expiresWithin30Days">{t.expiresWithin30Days}</SelectItem>
                      <SelectItem value="active">{t.active}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4">
                  <h3 className="text-lg font-semibold mb-4">{t.existingLicenses}</h3>
                  {filteredLicenses.map((license) => (
                    <motion.div
                      key={license.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedLicense === license.id 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : `${getUrgencyColor(license.urgency)} hover:border-blue-300`
                      }`}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedLicense(license.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold">{license.type}</h4>
                            {getStatusBadge(license.status)}
                            {license.urgency === 'high' && (
                              <Badge variant="destructive" className="animate-pulse">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                {t.urgentRenewal}
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                            <div>
                              <span className="font-medium">{t.licenseNumber}:</span>
                              <p>{license.number}</p>
                            </div>
                            <div>
                              <span className="font-medium">{t.expiryDate}:</span>
                              <p>{new Date(license.expiryDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <span className="font-medium">{t.renewalFee}:</span>
                              <p className="text-lg font-semibold text-blue-600">{license.renewalFee}</p>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <Button 
                            variant={selectedLicense === license.id ? "default" : "outline"}
                            size="sm"
                          >
                            {selectedLicense === license.id ? <CheckCircle2 className="w-4 h-4" /> : t.selectToRenew}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: License Details */}
            {currentStep === 2 && selectedLicenseData && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <span>{t.licenseDetailsForm}</span>
                  </CardTitle>
                </CardHeader>

                <div className="space-y-6">
                  {/* Current License Info */}
                  <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">{t.currentLicenseInfo}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">{t.licenseNumber}:</span>
                          <p className="font-medium">{selectedLicenseData.number}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">{t.licenseCategory}:</span>
                          <p className="font-medium">{selectedLicenseData.type}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">{t.expiryDate}:</span>
                          <p className="font-medium">{new Date(selectedLicenseData.expiryDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">{t.status}:</span>
                          <div className="mt-1">{getStatusBadge(selectedLicenseData.status)}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Business Details Form */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{t.businessDetails}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>{t.businessName}</Label>
                          <Input
                            value={formData.businessName}
                            onChange={(e) => handleInputChange('businessName', e.target.value)}
                            placeholder="Enter business name"
                          />
                        </div>
                        <div>
                          <Label>{t.registrationNumber}</Label>
                          <Input
                            value={formData.registrationNumber}
                            onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                            placeholder="Enter registration number"
                          />
                        </div>
                        <div>
                          <Label>{t.businessType}</Label>
                          <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select business type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="trading">Trading</SelectItem>
                              <SelectItem value="service">Service</SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>{t.businessAddress}</Label>
                          <Textarea
                            value={formData.businessAddress}
                            onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                            placeholder="Enter complete business address"
                            rows={3}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{t.contactDetailsForm}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>{t.authorizedSignatory}</Label>
                          <Input
                            value={formData.authorizedSignatory}
                            onChange={(e) => handleInputChange('authorizedSignatory', e.target.value)}
                            placeholder="Enter authorized signatory name"
                          />
                        </div>
                        <div>
                          <Label>{t.designation}</Label>
                          <Input
                            value={formData.designation}
                            onChange={(e) => handleInputChange('designation', e.target.value)}
                            placeholder="Enter designation"
                          />
                        </div>
                        <div>
                          <Label>{t.emailAddress}</Label>
                          <Input
                            type="email"
                            value={formData.emailAddress}
                            onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                            placeholder="Enter email address"
                          />
                        </div>
                        <div>
                          <Label>{t.phoneNumber}</Label>
                          <Input
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            placeholder="Enter phone number"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Premises Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t.premises}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>{t.premisesAddress}</Label>
                        <Textarea
                          value={formData.premisesAddress}
                          onChange={(e) => handleInputChange('premisesAddress', e.target.value)}
                          placeholder="Enter premises address"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label>{t.premisesArea}</Label>
                        <Input
                          value={formData.premisesArea}
                          onChange={(e) => handleInputChange('premisesArea', e.target.value)}
                          placeholder="Enter area in sq ft"
                        />
                      </div>
                      <div>
                        <Label>{t.ownershipType}</Label>
                        <Select value={formData.ownershipType} onValueChange={(value) => handleInputChange('ownershipType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ownership type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="owned">{t.owned}</SelectItem>
                            <SelectItem value="rented">{t.rented}</SelectItem>
                            <SelectItem value="leased">{t.leased}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>{t.employeeCount}</Label>
                        <Input
                          value={formData.employeeCount}
                          onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                          placeholder="Enter number of employees"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Renewal Type */}
                  <div>
                    <Label>{t.renewalType}</Label>
                    <Select value={renewalType} onValueChange={setRenewalType}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">
                          <div>
                            <p className="font-medium">{t.standard}</p>
                            <p className="text-sm text-muted-foreground">
                              {language === 'hi' ? '15-20 दिन • मानक शुल्क' : '15-20 days • Standard fee'}
                            </p>
                          </div>
                        </SelectItem>
                        <SelectItem value="expedited">
                          <div>
                            <p className="font-medium">{t.expedited}</p>
                            <p className="text-sm text-muted-foreground">
                              {language === 'hi' ? '5-7 दिन • अतिरिक्त शुल्क' : '5-7 days • Additional fee'}
                            </p>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Business Changes Declaration */}
                  <div>
                    <Label>{t.changesDeclaration}</Label>
                    <div className="mt-2 space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-3">{t.businessChanges}</p>
                        <Select value={hasChanges} onValueChange={setHasChanges}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no">{t.no}</SelectItem>
                            <SelectItem value="yes">{t.yes}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {hasChanges === 'yes' && (
                        <div>
                          <Label>{t.describeChanges}</Label>
                          <Textarea
                            value={businessChanges}
                            onChange={(e) => setBusinessChanges(e.target.value)}
                            placeholder={language === 'hi' ? 'परिवर्तनों का विस्तृत विवरण दें...' : 'Provide detailed description of changes...'}
                            className="mt-2"
                            rows={3}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Documents Upload */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="w-5 h-5 text-blue-600" />
                    <span>{t.documentsUpload}</span>
                  </CardTitle>
                </CardHeader>

                <div className="space-y-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      {t.requiredDocuments}
                    </AlertDescription>
                  </Alert>

                  <div className="grid gap-4">
                    {requiredDocuments.map((doc, index) => (
                      <div key={doc} className="flex items-center justify-between p-4 border border-border rounded-lg bg-accent/20">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{doc}</p>
                            <p className="text-sm text-muted-foreground">PDF, JPG (Max 5MB)</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {uploadedFiles.includes(doc) ? (
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              {language === 'hi' ? 'अपलोड किया गया' : 'Uploaded'}
                            </Badge>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleFileUpload(doc)}
                            >
                              <Upload className="w-4 h-4 mr-1" />
                              {language === 'hi' ? 'अपलोड करें' : 'Upload'}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">{t.uploadTips}</h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• {language === 'hi' ? 'सभी दस्तावेज़ स्व-सत्यापित प्रतियां होनी चाहिए' : 'All documents must be self-attested copies'}</li>
                      <li>• {language === 'hi' ? 'दस्तावेज़ स्पष्ट और पठनीय होने चाहिए' : 'Documents should be clear and readable'}</li>
                      <li>• {language === 'hi' ? 'फ़ाइल का आकार 5MB से अधिक नहीं होना चाहिए' : 'File size should not exceed 5MB per document'}</li>
                      <li>• {language === 'hi' ? 'स्वीकृत प्रारूप: PDF, JPG, PNG' : 'Accepted formats: PDF, JPG, PNG'}</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && selectedLicenseData && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span>{t.paymentDetails}</span>
                  </CardTitle>
                </CardHeader>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Payment Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.paymentBreakdown}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span>{t.baseFee}</span>
                        <span className="font-medium">₹{baseFee.toLocaleString()}</span>
                      </div>
                      {lateFee > 0 && (
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <span className="text-red-600">{t.lateFee}</span>
                          <span className="font-medium text-red-600">₹{lateFee.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span>{t.processingFee}</span>
                        <span className="font-medium">₹{processingFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span>{t.serviceTax}</span>
                        <span className="font-medium">₹{gstAmount.toLocaleString()}</span>
                      </div>
                      {convenienceFee > 0 && (
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <span>{t.convenienceFee}</span>
                          <span className="font-medium">₹{convenienceFee.toLocaleString()}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between items-center py-2 text-lg font-bold">
                        <span>{t.finalAmount}</span>
                        <span className="text-blue-600">₹{totalAmount.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Method Selection */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.paymentMethod}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-3">
                        {[
                          { id: 'creditCard', label: t.creditCard, icon: CreditCard },
                          { id: 'debitCard', label: t.debitCard, icon: CreditCard },
                          { id: 'netBanking', label: t.netBanking, icon: Building2 },
                          { id: 'upi', label: t.upi, icon: Zap },
                          { id: 'wallet', label: t.wallet, icon: Wallet }
                        ].map((method) => (
                          <motion.div
                            key={method.id}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              paymentMethod === method.id
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-border hover:border-blue-300'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setPaymentMethod(method.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <method.icon className="w-5 h-5 text-blue-600" />
                              <span className="font-medium">{method.label}</span>
                              {paymentMethod === method.id && (
                                <CheckCircle2 className="w-5 h-5 text-blue-600 ml-auto" />
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {paymentMethod && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-6"
                        >
                          <PaymentGateway
                            amount={totalAmount}
                            currency="INR"
                            description={`License Renewal - ${selectedLicenseData.type}`}
                            onSuccess={handlePaymentSuccess}
                            onError={(error) => console.error('Payment failed:', error)}
                            customerInfo={{
                              name: formData.authorizedSignatory || 'John Doe',
                              email: formData.emailAddress || 'john@example.com',
                              phone: formData.phoneNumber || '+919999999999'
                            }}
                            language={language}
                          />
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Payment Terms */}
                <Card className="mt-6">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground space-y-2">
                      <h4 className="font-medium text-foreground">{t.paymentTerms}</h4>
                      <ul className="space-y-1 text-xs">
                        <li>• {language === 'hi' ? 'भुगतान सुरक्षित और एन्क्रिप्टेड है' : 'Payment is secure and encrypted'}</li>
                        <li>• {language === 'hi' ? 'भुगतान की पुष्टि के बाद रसीद ईमेल की जाएगी' : 'Receipt will be emailed after payment confirmation'}</li>
                        <li>• {language === 'hi' ? 'भुगतान वापसी 7-10 कार्य दिवसों में होगी' : 'Refunds will be processed within 7-10 business days'}</li>
                        <li>• {language === 'hi' ? 'किसी भी समस्या के लिए हमारे सपोर्ट टीम से संपर्क करें' : 'Contact our support team for any issues'}</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 5: Confirmation */}
            {currentStep === 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </motion.div>
                  
                  <h2 className="text-2xl font-bold text-green-600 mb-4">{t.applicationSubmitted}</h2>
                  <p className="text-muted-foreground mb-8">{t.paymentSuccess}</p>
                  
                  <div className="max-w-md mx-auto bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-8">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t.applicationNumber}:</span>
                        <span className="font-mono font-medium">RN-2024-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t.expectedCompletion}:</span>
                        <span className="font-medium">
                          {new Date(Date.now() + (renewalType === 'expedited' ? 7 : 20) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t.estimatedTime}:</span>
                        <span className="font-medium">{renewalType === 'expedited' ? '5-7' : '15-20'} {t.days}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => window.print()}>
                      <Download className="w-4 h-4 mr-2" />
                      {t.downloadReceipt}
                    </Button>
                    <Button variant="outline">
                      <Clock className="w-4 h-4 mr-2" />
                      {t.trackApplication}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex justify-between pt-8 border-t border-border">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                  disabled={currentStep === 1}
                >
                  {t.previous}
                </Button>
                
                <Button 
                  onClick={() => {
                    if (currentStep === 4 && paymentCompleted) {
                      handleSubmit();
                    } else if (currentStep < 4) {
                      setCurrentStep(prev => prev + 1);
                    }
                  }}
                  disabled={
                    (currentStep === 1 && !selectedLicense) ||
                    (currentStep === 4 && !paymentCompleted) ||
                    isSubmitting
                  }
                  className="min-w-32"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      {language === 'hi' ? 'प्रसंस्करण...' : 'Processing...'}
                    </>
                  ) : currentStep === 4 ? (
                    paymentCompleted ? t.submitRenewal : t.payNow
                  ) : (
                    <>
                      {t.next}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}