import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Users, 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Info,
  User,
  Mail,
  Phone,
  MapPin,
  Hash,
  CreditCard,
  Shield,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Checkbox } from '../ui/checkbox';
import { PaymentGateway } from '../PaymentGateway';

interface CompanyRegistrationProps {
  language: 'en' | 'hi';
}

export function CompanyRegistration({ language }: CompanyRegistrationProps) {
  const translations = {
    en: {
      title: 'Business Registration',
      subtitle: 'Register your business entity online',
      step: 'Step',
      of: 'of',
      complete: '% Complete',
      companyDetails: 'Company Details',
      founderInfo: 'Founder Information',
      documentsUpload: 'Documents Upload',
      payment: 'Payment',
      reviewSubmit: 'Review & Submit',
      proposedCompanyName: 'Proposed Company Name',
      nameAvailability: 'Name availability will be checked during processing',
      registrationType: 'Registration Type',
      registrationFee: 'Registration fee',
      processingTime: 'Processing time',
      mainBusinessActivity: 'Main Business Activity',
      businessActivitiesPlaceholder: 'Describe your main business activities...',
      authorizedCapital: 'Authorized Capital (₹)',
      paidUpCapital: 'Paid-up Capital (₹)',
      fullName: 'Full Name',
      emailAddress: 'Email Address',
      phoneNumber: 'Phone Number',
      location: 'Location',
      registeredOfficeAddress: 'Registered Office Address',
      registeredAddressPlaceholder: 'Enter complete registered office address',
      pinCode: 'PIN Code',
      documentsRequired: 'Please upload all required documents. Ensure documents are clear and readable.',
      uploadTips: 'Document Requirements:',
      selfAttestedCopies: 'All documents must be self-attested copies',
      clearDocuments: 'Documents should be clear and all text visible',
      fileSize: 'File size should not exceed 5MB per document',
      acceptedFormats: 'Accepted formats: PDF, JPG, PNG',
      registrationPayment: 'Registration Payment',
      securePayment: 'Your payment is secured with 256-bit SSL encryption. We accept all major payment methods.',
      registrationFeeSummary: 'Registration Fee Summary',
      governmentFee: 'Government Fee',
      serviceTax: 'Service Tax (18%)',
      professionalCharges: 'Professional Charges',
      totalAmount: 'Total Amount',
      paymentSuccess: 'Payment completed successfully! You can now proceed to review and submit your registration.',
      razorpaySecure: 'Secured by Razorpay • PCI DSS Compliant • Bank-grade security',
      reviewCarefully: 'Please review all information carefully before submitting. Changes cannot be made after submission.',
      companyDetailsTab: 'Company Details',
      documentsTab: 'Documents',
      paymentTab: 'Payment',
      companyName: 'Company Name',
      founderName: 'Founder Name',
      email: 'Email',
      phone: 'Phone',
      cityPin: 'City, PIN',
      notProvided: 'Not provided',
      notSelected: 'Not selected',
      uploaded: 'Uploaded',
      missing: 'Missing',
      paymentStatus: 'Payment Status',
      paid: 'Paid',
      pending: 'Pending',
      amount: 'Amount',
      transactionId: 'Transaction ID',
      paymentMethod: 'Payment Method',
      online: 'Online',
      termsConditions: 'I agree to the terms and conditions and certify that all information provided is accurate.',
      processingInfo: 'Processing Information',
      previous: 'Previous',
      next: 'Next',
      submitApplication: 'Submit Application'
    },
    hi: {
      title: 'व्यवसाय पंजीकरण',
      subtitle: 'अपनी व्यावसायिक इकाई को ऑनलाइन पंजीकृत करें',
      step: 'चरण',
      of: 'का',
      complete: '% पूर्ण',
      companyDetails: 'कंपनी विवरण',
      founderInfo: 'संस्थापक जानकारी',
      documentsUpload: 'दस्तावेज़ अपलोड',
      payment: 'भुगतान',
      reviewSubmit: 'समीक्षा और जमा करें',
      proposedCompanyName: 'प्रस्तावित कंपनी का नाम',
      nameAvailability: 'नाम की उपलब्धता प्रसंस्करण के दौरान जांची जाएगी',
      registrationType: 'पंजीकरण प्रकार',
      registrationFee: 'पंजीकरण शुल्क',
      processingTime: 'प्रसंस्करण समय',
      mainBusinessActivity: 'मुख्य व्यावसायिक गतिविधि',
      businessActivitiesPlaceholder: 'अपनी मुख्य व्यावसायिक गतिविधियों का वर्णन करें...',
      authorizedCapital: 'अधिकृत पूंजी (₹)',
      paidUpCapital: 'चुकता पूंजी (₹)',
      fullName: 'पूरा नाम',
      emailAddress: 'ईमेल पता',
      phoneNumber: 'फोन नंबर',
      location: 'स्थान',
      registeredOfficeAddress: 'पंजीकृत कार्यालय का पता',
      registeredAddressPlaceholder: 'पूरा पंजीकृत कार्यालय का पता दर्ज करें',
      pinCode: 'पिन कोड',
      documentsRequired: 'कृपया सभी आवश्यक दस्तावेज़ अपलोड करें। सुनिश्चित करें कि दस्तावेज़ स्पष्ट और पठनीय हैं।',
      uploadTips: 'दस्तावेज़ आवश्यकताएं:',
      selfAttestedCopies: 'सभी दस्तावेज़ स्व-सत्यापित प्रतियां होनी चाहिए',
      clearDocuments: 'दस्तावेज़ स्पष्ट होने चाहिए और सभी पाठ दिखाई देना चाहिए',
      fileSize: 'फ़ाइल का आकार प्रति दस्तावेज़ 5MB से अधिक नहीं होना चाहिए',
      acceptedFormats: 'स्वीकृत प्रारूप: PDF, JPG, PNG',
      registrationPayment: 'पंजीकरण भुगतान',
      securePayment: 'आपका भुगतान 256-बिट SSL एन्क्रिप्शन के साथ सुरक्षित है। हम सभी प्रमुख भुगतान विधियों को स्वीकार करते हैं।',
      registrationFeeSummary: 'पंजीकरण शुल्क सारांश',
      governmentFee: 'सरकारी शुल्क',
      serviceTax: 'सेवा कर (18%)',
      professionalCharges: 'पेशेवर शुल्क',
      totalAmount: 'कुल राशि',
      paymentSuccess: 'भुगतान सफलतापूर्वक पूर्ण! अब आप अपना पंजीकरण समीक्षा और जमा करने के लिए आगे बढ़ सकते हैं।',
      razorpaySecure: 'Razorpay द्वारा सुरक्षित • PCI DSS अनुपालित • बैंक-ग्रेड सुरक्षा',
      reviewCarefully: 'कृपया जमा करने से पहले सभी जानकारी की सावधानीपूर्वक समीक्षा करें। जमा करने के बाद परिवर्तन नहीं किए जा सकते।',
      companyDetailsTab: 'कंपनी विवरण',
      documentsTab: 'दस्तावेज़',
      paymentTab: 'भुगतान',
      companyName: 'कंपनी का नाम',
      founderName: 'संस्थापक का नाम',
      email: 'ईमेल',
      phone: 'फोन',
      cityPin: 'शहर, पिन',
      notProvided: 'प्रदान नहीं किया गया',
      notSelected: 'चयनित नहीं',
      uploaded: 'अपलोड किया गया',
      missing: 'गुम',
      paymentStatus: 'भुगतान स्थिति',
      paid: 'भुगतान किया गया',
      pending: 'लंबित',
      amount: 'राशि',
      transactionId: 'लेनदेन आईडी',
      paymentMethod: 'भुगतान विधि',
      online: 'ऑनलाइन',
      termsConditions: 'मैं नियम और शर्तों से सहमत हूं और प्रमाणित करता हूं कि प्रदान की गई सभी जानकारी सटीक है।',
      processingInfo: 'प्रसंस्करण जानकारी',
      previous: 'पिछला',
      next: 'अगला',
      submitApplication: 'आवेदन जमा करें'
    }
  };

  const t = translations[language];
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    registrationType: '',
    founderName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    businessActivity: '',
    authorizedCapital: '',
    paidUpCapital: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 1, title: t.companyDetails, icon: Building2 },
    { id: 2, title: t.founderInfo, icon: User },
    { id: 3, title: t.documentsUpload, icon: FileText },
    { id: 4, title: t.payment, icon: CreditCard },
    { id: 5, title: t.reviewSubmit, icon: CheckCircle2 }
  ];

  const registrationTypes = language === 'hi'
    ? [
        { 
          value: 'proprietorship', 
          label: 'एकल स्वामित्व', 
          fee: '₹1,000', 
          duration: '7-10 दिन',
          description: 'एक व्यक्ति के स्वामित्व वाला सबसे सरल व्यवसाय रूप'
        },
        { 
          value: 'partnership', 
          label: 'साझेदारी फर्म', 
          fee: '₹3,000', 
          duration: '15-20 दिन',
          description: 'दो या अधिक साझेदारों के स्वामित्व वाला व्यवसाय'
        },
        { 
          value: 'private_limited', 
          label: 'प्राइवेट लिमिटेड कंपनी', 
          fee: '₹8,000', 
          duration: '20-25 दिन',
          description: 'सीमित देयता के साथ अलग कानूनी इकाई'
        },
        { 
          value: 'public_limited', 
          label: 'पब्लिक लिमिटेड कंपनी', 
          fee: '₹15,000', 
          duration: '30-40 दिन',
          description: 'जनता से पूंजी जुटा सकती है'
        },
        { 
          value: 'llp', 
          label: 'सीमित देयता भागीदारी', 
          fee: '₹5,000', 
          duration: '15-20 दिन',
          description: 'साझेदारी और कंपनी का हाइब्रिड'
        },
        { 
          value: 'one_person_company', 
          label: 'एक व्यक्ति कंपनी', 
          fee: '₹6,000', 
          duration: '15-20 दिन',
          description: 'एकल सदस्य और सीमित देयता के साथ कंपनी'
        },
        { 
          value: 'section_8_company', 
          label: 'धारा 8 कंपनी (गैर-लाभकारी संगठन)', 
          fee: '₹4,000', 
          duration: '30-45 दिन',
          description: 'धर्मार्थ उद्देश्यों को बढ़ावा देने के लिए गैर-लाभकारी कंपनी'
        },
        { 
          value: 'producer_company', 
          label: 'उत्पादक कंपनी', 
          fee: '₹7,000', 
          duration: '25-35 दिन',
          description: 'सामूहिक लाभ के लिए उत्पादकों द्वारा गठित कंपनी'
        }
      ]
    : [
        { 
          value: 'proprietorship', 
          label: 'Sole Proprietorship', 
          fee: '₹1,000', 
          duration: '7-10 days',
          description: 'Simplest form of business owned by one person'
        },
        { 
          value: 'partnership', 
          label: 'Partnership Firm', 
          fee: '₹3,000', 
          duration: '15-20 days',
          description: 'Business owned by two or more partners'
        },
        { 
          value: 'private_limited', 
          label: 'Private Limited Company', 
          fee: '₹8,000', 
          duration: '20-25 days',
          description: 'Separate legal entity with limited liability'
        },
        { 
          value: 'public_limited', 
          label: 'Public Limited Company', 
          fee: '₹15,000', 
          duration: '30-40 days',
          description: 'Can raise capital from public'
        },
        { 
          value: 'llp', 
          label: 'Limited Liability Partnership', 
          fee: '₹5,000', 
          duration: '15-20 days',
          description: 'Hybrid of partnership and company'
        },
        { 
          value: 'one_person_company', 
          label: 'One Person Company', 
          fee: '₹6,000', 
          duration: '15-20 days',
          description: 'Company with single member and limited liability'
        },
        { 
          value: 'section_8_company', 
          label: 'Section 8 Company (Non Profit Organization)', 
          fee: '₹4,000', 
          duration: '30-45 days',
          description: 'Non-profit company for promoting charitable objects'
        },
        { 
          value: 'producer_company', 
          label: 'Producer Company', 
          fee: '₹7,000', 
          duration: '25-35 days',
          description: 'Company formed by producers for collective benefit'
        }
      ];

  const requiredDocuments = language === 'hi'
    ? [
        'निदेशकों/भागीदारों का पैन कार्ड',
        'निदेशकों/भागीदारों का आधार कार्ड',
        'पासपोर्ट साइज फोटो',
        'पंजीकृत कार्यालय का पता प्रमाण',
        'उपयोगिता बिल (बिजली/पानी)',
        'किराया समझौता या संपत्ति दस्तावेज़',
        'बैंक स्टेटमेंट',
        'डिजिटल हस्ताक्षर प्रमाणपत्र (DSC)'
      ]
    : [
        'PAN Card of Directors/Partners',
        'Aadhar Card of Directors/Partners',
        'Passport Size Photographs',
        'Address Proof of Registered Office',
        'Utility Bills (Electricity/Water)',
        'Rent Agreement or Property Documents',
        'Bank Statement',
        'Digital Signature Certificate (DSC)'
      ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    // Show success message or redirect
  };

  const progress = (currentStep / steps.length) * 100;
  const selectedType = registrationTypes.find(rt => rt.value === formData.registrationType);

  return (
    <div className={`p-6 max-w-4xl mx-auto relative z-10 ${language === 'hi' ? 'lang-hi' : 'lang-en'}`}>
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
            {/* Step 1: Company Details */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <span>{t.companyDetails}</span>
                  </CardTitle>
                </CardHeader>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="companyName">{t.proposedCompanyName}</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder={language === 'hi' ? 'प्रस्तावित कंपनी का नाम दर्ज करें' : 'Enter proposed company name'}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {t.nameAvailability}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="registrationType">{t.registrationType}</Label>
                    <Select value={formData.registrationType} onValueChange={(value) => handleInputChange('registrationType', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder={language === 'hi' ? 'पंजीकरण प्रकार चुनें' : 'Select registration type'} />
                      </SelectTrigger>
                      <SelectContent>
                        {registrationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">{type.label}</span>
                              <span className="text-xs text-muted-foreground">{type.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedType && (
                      <Alert className="mt-3">
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          {t.registrationFee}: {selectedType.fee} | {t.processingTime}: {selectedType.duration}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="businessActivity">{t.mainBusinessActivity}</Label>
                    <Textarea
                      id="businessActivity"
                      value={formData.businessActivity}
                      onChange={(e) => handleInputChange('businessActivity', e.target.value)}
                      placeholder={t.businessActivitiesPlaceholder}
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  {(formData.registrationType === 'private_limited' || formData.registrationType === 'public_limited') && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="authorizedCapital">{t.authorizedCapital}</Label>
                        <Input
                          id="authorizedCapital"
                          value={formData.authorizedCapital}
                          onChange={(e) => handleInputChange('authorizedCapital', e.target.value)}
                          placeholder="1,00,000"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="paidUpCapital">{t.paidUpCapital}</Label>
                        <Input
                          id="paidUpCapital"
                          value={formData.paidUpCapital}
                          onChange={(e) => handleInputChange('paidUpCapital', e.target.value)}
                          placeholder="1,00,000"
                          className="mt-2"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Founder Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <span>{t.founderInfo}</span>
                  </CardTitle>
                </CardHeader>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="founderName">{t.fullName}</Label>
                      <Input
                        id="founderName"
                        value={formData.founderName}
                        onChange={(e) => handleInputChange('founderName', e.target.value)}
                        placeholder={language === 'hi' ? 'संस्थापक का पूरा नाम दर्ज करें' : 'Enter founder\'s full name'}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t.emailAddress}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder={language === 'hi' ? 'संस्थापक@example.com' : 'founder@example.com'}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">{t.phoneNumber}</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">{language === 'hi' ? 'शहर' : 'City'}</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder={language === 'hi' ? 'शहर' : 'City'}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">{t.registeredOfficeAddress}</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder={t.registeredAddressPlaceholder}
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="pincode">{t.pinCode}</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      placeholder="123456"
                      className="mt-2"
                    />
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
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>{t.documentsUpload}</span>
                  </CardTitle>
                </CardHeader>
                <div className="space-y-6">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {t.documentsRequired}
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
                              {t.uploaded}
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
                      <li>• {t.selfAttestedCopies}</li>
                      <li>• {t.clearDocuments}</li>
                      <li>• {t.fileSize}</li>
                      <li>• {t.acceptedFormats}</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span>{t.registrationPayment}</span>
                  </CardTitle>
                </CardHeader>
                <div className="space-y-6">
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      {t.securePayment}
                    </AlertDescription>
                  </Alert>

                  {!paymentCompleted ? (
                    <div className="space-y-6">
                      <div className="bg-accent/20 p-6 rounded-lg">
                        <h4 className="font-semibold mb-4">{t.registrationFeeSummary}</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>{t.governmentFee}</span>
                            <span>₹{selectedType ? selectedType.fee.replace('₹', '') : '0'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{t.serviceTax}</span>
                            <span>₹{selectedType ? Math.round(parseInt(selectedType.fee.replace('₹', '').replace(',', '')) * 0.18) : '0'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{t.professionalCharges}</span>
                            <span>₹500</span>
                          </div>
                          <div className="border-t pt-3">
                            <div className="flex justify-between font-semibold">
                              <span>{t.totalAmount}</span>
                              <span>₹{selectedType ? (parseInt(selectedType.fee.replace('₹', '').replace(',', '')) + Math.round(parseInt(selectedType.fee.replace('₹', '').replace(',', '')) * 0.18) + 500).toLocaleString() : '0'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <PaymentGateway
                        amount={selectedType ? (parseInt(selectedType.fee.replace('₹', '').replace(',', '')) + Math.round(parseInt(selectedType.fee.replace('₹', '').replace(',', '')) * 0.18) + 500) : 0}
                        onSuccess={handlePaymentSuccess}
                        language={language}
                      />

                      <div className="text-center text-sm text-muted-foreground">
                        <Lock className="w-4 h-4 inline mr-1" />
                        {t.razorpaySecure}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                        {t.paymentSuccess.split('!')[0]}!
                      </h3>
                      <p className="text-green-700 dark:text-green-300">
                        {t.paymentSuccess.split('!')[1]}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    <span>{t.reviewSubmit}</span>
                  </CardTitle>
                </CardHeader>
                <div className="space-y-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      {t.reviewCarefully}
                    </AlertDescription>
                  </Alert>

                  <Tabs defaultValue="company" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="company">{t.companyDetailsTab}</TabsTrigger>
                      <TabsTrigger value="documents">{t.documentsTab}</TabsTrigger>
                      <TabsTrigger value="payment">{t.paymentTab}</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="company" className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-muted-foreground">{t.companyName}</h4>
                          <p>{formData.companyName || t.notProvided}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-muted-foreground">{t.registrationType}</h4>
                          <p>{selectedType?.label || t.notSelected}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-muted-foreground">{t.founderName}</h4>
                          <p>{formData.founderName || t.notProvided}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-muted-foreground">{t.email}</h4>
                          <p>{formData.email || t.notProvided}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-muted-foreground">{t.phone}</h4>
                          <p>{formData.phone || t.notProvided}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-muted-foreground">{t.cityPin}</h4>
                          <p>{formData.city && formData.pincode ? `${formData.city}, ${formData.pincode}` : t.notProvided}</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="documents" className="space-y-4">
                      <div className="grid gap-3">
                        {requiredDocuments.map((doc) => (
                          <div key={doc} className="flex items-center justify-between p-3 border rounded">
                            <span className="text-sm">{doc}</span>
                            <Badge variant={uploadedFiles.includes(doc) ? "default" : "destructive"}>
                              {uploadedFiles.includes(doc) ? t.uploaded : t.missing}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="payment" className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-muted-foreground">{t.paymentStatus}</h4>
                          <Badge variant={paymentCompleted ? "default" : "destructive"}>
                            {paymentCompleted ? t.paid : t.pending}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-medium text-muted-foreground">{t.amount}</h4>
                          <p>₹{selectedType ? (parseInt(selectedType.fee.replace('₹', '').replace(',', '')) + Math.round(parseInt(selectedType.fee.replace('₹', '').replace(',', '')) * 0.18) + 500).toLocaleString() : '0'}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-muted-foreground">{t.transactionId}</h4>
                          <p>{paymentCompleted ? 'TXN' + Date.now().toString().slice(-8) : t.pending}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-muted-foreground">{t.paymentMethod}</h4>
                          <p>{paymentCompleted ? t.online : t.pending}</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      {t.termsConditions}
                    </Label>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">{t.processingInfo}</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {selectedType && language === 'hi' 
                        ? `आपका आवेदन ${selectedType.duration} में प्रसंस्करित होगा।`
                        : `Your application will be processed within ${selectedType?.duration || '7-10 days'}.`
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                {t.previous}
              </Button>
              
              {currentStep < steps.length ? (
                <Button
                  onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                >
                  {t.next}
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      {language === 'hi' ? 'जमा कर रहे हैं...' : 'Submitting...'}
                    </>
                  ) : (
                    t.submitApplication
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}