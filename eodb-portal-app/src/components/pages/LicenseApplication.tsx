import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Building, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { BusinessesAPI, LicenseTypesAPI } from '@/api'; // Assuming a barrel export in @/api/index.ts

// NOTE: The following imports are assumed to be in the correct path.
// If your project structure is different, you may need to adjust them.
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { Textarea } from './ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { Alert, AlertDescription } from './ui/alert';
// import { BusinessesAPI, LicenseTypesAPI } from '../api'; // Assuming api is in a parent directory

interface LicenseApplicationProps {
  language: 'en' | 'hi';
  user?: any;
}

interface LicenseType {
  id: string | number;
  name: string;
}

// Updated Business interface to match the Sequelize model
interface Business {
  id: string | number;
  business_name: string;
  business_type: string;
  location: string; // "City, State"
  pincode: string;
  // Add other fields from your model if they are returned by the API
}

export function LicenseApplication({ language, user }: LicenseApplicationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedApplicationId, setSubmittedApplicationId] = useState('');
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // State for dynamic data
  const [licenseTypes, setLicenseTypes] = useState<LicenseType[]>([]);
  const [myBusinesses, setMyBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState({
    licenseTypes: true,
    businesses: true,
  });

  const [selectedBusinessId, setSelectedBusinessId] = useState<string | number | null>(null);

  const [formData, setFormData] = useState({
    // Business Information
    businessName: '',
    businessType: '',
    businessAddress: '',
    pincode: '',
    city: '',
    state: 'Delhi',
    
    // License Information
    licenseType: '',
    licenseCategory: '',
    licenseDuration: '',
    
    // Applicant Information
    applicantName: user?.name || '',
    applicantEmail: user?.email || '',
    applicantPhone: user?.phoneNumber || '',
    designation: '',
    
    // Additional Information
    businessDescription: '',
    expectedEmployees: '',
    investmentAmount: '',
    
    // Documents
    uploadedDocuments: [] as string[]
  });

  // Fetch initial data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(prev => ({ ...prev, licenseTypes: true, businesses: true }));
        const [activeTypes, businesses] = await Promise.all([
          LicenseTypesAPI.getActiveLicenseTypes(),
          BusinessesAPI.getMyBusinesses()
        ]);
        setLicenseTypes(activeTypes);
        setMyBusinesses(businesses);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      } finally {
        setIsLoading(prev => ({ ...prev, licenseTypes: false, businesses: false }));
      }
    };

    fetchData();
  }, []);

  const translations = {
    en: {
      title: 'License Application',
      subtitle: 'Apply for business licenses and permits',
      step: 'Step',
      of: 'of',
      businessInfo: 'Business Information',
      licenseInfo: 'License Information',
      applicantInfo: 'Applicant Information',
      reviewSubmit: 'Review & Submit',
      selectYourBusiness: 'Select Your Business',
      businessName: 'Business Name',
      businessType: 'Business Type',
      businessAddress: 'Business Address',
      pincode: 'PIN Code',
      city: 'City',
      state: 'State',
      licenseType: 'License Type',
      licenseCategory: 'License Category',
      licenseDuration: 'License Duration',
      applicantName: 'Applicant Name',
      applicantEmail: 'Email Address',
      applicantPhone: 'Phone Number',
      designation: 'Designation',
      businessDescription: 'Business Description',
      expectedEmployees: 'Expected Number of Employees',
      investmentAmount: 'Investment Amount (₹)',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit Application',
      submitting: 'Submitting...',
      applicationSubmitted: 'Application Submitted Successfully!',
      applicationId: 'Application ID',
      processingTime: 'Expected Processing Time: 7-14 business days',
      trackApplication: 'You can track your application status in the dashboard.',
      backToDashboard: 'Back to Dashboard',
      requiredField: 'This field is required',
      selectBusinessType: 'Select Business Type',
      selectLicenseType: 'Select License Type',
      selectCategory: 'Select Category',
      selectDuration: 'Select Duration',
      submissionErrorTitle: 'Submission Failed',
      submissionErrorDescription: 'There was an error submitting your application. Please review the details and try again.',
      loading: 'Loading...',
      noBusinessesFound: 'No Businesses Found',
      noBusinessesDescription: 'You have not created any businesses yet. Please create a business from your dashboard before applying for a license.',
      businessTypes: {
        'Private Limited': 'Private Limited',
        'Public Limited': 'Public Limited',
        'Proprietorship': 'Proprietorship',
        'Partnership': 'Partnership',
        'LLP': 'LLP'
      },
      categories: {
        small: 'Small Scale',
        medium: 'Medium Scale',
        large: 'Large Scale'
      },
      durations: {
        '1year': '1 Year',
        '3years': '3 Years',
        '5years': '5 Years'
      }
    },
    hi: {
        title: 'लाइसेंस आवेदन',
        subtitle: 'व्यावसायिक लाइसेंस और परमिट के लिए आवेदन करें',
        step: 'चरण',
        of: 'का',
        businessInfo: 'व्यावसायिक जानकारी',
        licenseInfo: 'लाइसेंस जानकारी',
        applicantInfo: 'आवेदक जानकारी',
        reviewSubmit: 'समीक्षा और जमा करें',
        selectYourBusiness: 'अपना व्यवसाय चुनें',
        businessName: 'व्यवसाय का नाम',
        businessType: 'व्यवसाय का प्रकार',
        businessAddress: 'व्यवसाय का पता',
        pincode: 'पिन कोड',
        city: 'शहर',
        state: 'राज्य',
        licenseType: 'लाइसेंस प्रकार',
        licenseCategory: 'लाइसेंस श्रेणी',
        licenseDuration: 'लाइसेंस अवधि',
        applicantName: 'आवेदक का नाम',
        applicantEmail: 'ईमेल पता',
        applicantPhone: 'फोन नंबर',
        designation: 'पदनाम',
        businessDescription: 'व्यवसाय विवरण',
        expectedEmployees: 'अपेक्षित कर्मचारियों की संख्या',
        investmentAmount: 'निवेश राशि (₹)',
        next: 'अगला',
        previous: 'पिछला',
        submit: 'आवेदन जमा करें',
        submitting: 'जमा कर रहे हैं...',
        applicationSubmitted: 'आवेदन सफलतापूर्वक जमा किया गया!',
        applicationId: 'आवेदन आईडी',
        processingTime: 'अपेक्षित प्रसंस्करण समय: 7-14 कार्य दिवस',
        trackApplication: 'आप डैशबोर्ड में अपने आवेदन की स्थिति ट्रैक कर सकते हैं।',
        backToDashboard: 'डैशबोर्ड पर वापस',
        requiredField: 'यह फ़ील्ड आवश्यक है',
        selectBusinessType: 'व्यवसाय प्रकार चुनें',
        selectLicenseType: 'लाइसेंस प्रकार चुनें',
        selectCategory: 'श्रेणी चुनें',
        selectDuration: 'अवधि चुनें',
        submissionErrorTitle: 'सबमिशन विफल',
        submissionErrorDescription: 'आपका आवेदन जमा करने में कोई त्रुटि हुई। कृपया विवरण की समीक्षा करें और पुनः प्रयास करें।',
        loading: 'लोड हो रहा है...',
        noBusinessesFound: 'कोई व्यवसाय नहीं मिला',
        noBusinessesDescription: 'आपने अभी तक कोई व्यवसाय नहीं बनाया है। लाइसेंस के लिए आवेदन करने से पहले कृपया अपने डैशबोर्ड से एक व्यवसाय बनाएं।',
        businessTypes: {
            'Private Limited': 'प्राइवेट लिमिटेड',
            'Public Limited': 'पब्लिक लिमिटेड',
            'Proprietorship': 'एकल स्वामित्व',
            'Partnership': 'साझेदारी',
            'LLP': 'एलएलपी'
        },
        categories: {
            small: 'छोटे पैमाने',
            medium: 'मध्यम पैमाने',
            large: 'बड़े पैमाने'
        },
        durations: {
            '1year': '1 वर्ष',
            '3years': '3 वर्ष',
            '5years': '5 वर्ष'
        }
    }
  };


  const t = translations[language];
  const totalSteps = 4;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBusinessSelectionChange = (businessId: string) => {
    const selectedBusiness = myBusinesses.find(b => b.id.toString() === businessId);
    if (selectedBusiness) {
        setSelectedBusinessId(selectedBusiness.id);
        const [city = '', state = ''] = selectedBusiness.location.split(',').map(s => s.trim());
        setFormData(prev => ({
            ...prev,
            businessName: selectedBusiness.business_name,
            businessType: selectedBusiness.business_type,
            businessAddress: selectedBusiness.location, // Assuming location is the full address
            pincode: selectedBusiness.pincode || '', // Use pincode from model if available
            city: city,
            state: state || 'Delhi', // Default state if not in location
        }));
    } else {
        setSelectedBusinessId(null);
        // Optionally clear fields if user deselects
        setFormData(prev => ({
            ...prev,
            businessName: '',
            businessType: '',
            businessAddress: '',
            pincode: '',
            city: '',
        }));
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      const payload = {
        business_id: selectedBusinessId, // Link the application to the selected business
        license_type: formData.licenseType,
        license_category: formData.licenseCategory,
        license_duration: formData.licenseDuration,
        applicant_name: formData.applicantName,
        applicant_email: formData.applicantEmail,
        applicant_phone: formData.applicantPhone,
        designation: formData.designation,
        application_data: formData,
      };
      const created = await BusinessesAPI.createLicenseApplication(payload);
      setSubmittedApplicationId(created.id || created.tracking_number || '');
      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Application submission failed:", err);
      const message = err?.response?.data?.message || t.submissionErrorDescription;
      setSubmissionError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        // Validate that a business has been selected, which auto-fills the form
        return !!selectedBusinessId;
      case 2:
        return !!(formData.licenseType && formData.licenseCategory && formData.licenseDuration);
      case 3:
        return !!(formData.applicantName && formData.applicantEmail && formData.applicantPhone && formData.designation);
      default:
        return true;
    }
  };

  if (isSubmitted) {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
            <Card className="text-center shadow-lg"><CardContent className="p-8"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-8 h-8 text-green-600" /></motion.div><h2 className="text-2xl font-bold text-gray-800 mb-4">{t.applicationSubmitted}</h2><div className="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-6"><p className="text-sm text-gray-600 mb-2">{t.applicationId}:</p><p className="font-mono text-lg font-bold text-gray-800">{submittedApplicationId}</p></div><div className="space-y-3 text-sm text-muted-foreground mb-6"><p>{t.processingTime}</p><p>{t.trackApplication}</p></div><Button className="w-full" onClick={() => window.history.back()}>{t.backToDashboard}</Button></CardContent></Card>
          </motion.div>
        </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </motion.div>

      {/* Progress Indicator */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ${step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {step}
              </div>
              {step < 4 && (<div className={`h-1 mx-2 flex-1 transition-colors duration-300 ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />)}
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center">{t.step} {currentStep} {t.of} {totalSteps}</p>
      </motion.div>

      {/* Form Steps */}
      <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>
                {currentStep === 1 && t.businessInfo}
                {currentStep === 2 && t.licenseInfo}
                {currentStep === 3 && t.applicantInfo}
                {currentStep === 4 && t.reviewSubmit}
              </span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="businessSelector">{t.selectYourBusiness} *</Label>
                    {isLoading.businesses ? (
                        <p>{t.loading}</p>
                    ) : myBusinesses.length > 0 ? (
                        <Select onValueChange={handleBusinessSelectionChange} disabled={isLoading.businesses}>
                            <SelectTrigger id="businessSelector">
                                <SelectValue placeholder={t.selectYourBusiness} />
                            </SelectTrigger>
                            <SelectContent>
                                {myBusinesses.map((business) => (
                                    <SelectItem key={business.id} value={business.id.toString()}>
                                        {business.business_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : (
                        <Alert variant="default" className="border-yellow-400 bg-yellow-50">
                            <AlertCircle className="h-5 w-5 text-yellow-600" />
                            <AlertDescription className="text-yellow-800">
                                <strong className="font-semibold">{t.noBusinessesFound}</strong><br />
                                {t.noBusinessesDescription}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label htmlFor="businessName">{t.businessName}</Label><Input id="businessName" value={formData.businessName} readOnly placeholder="Select a business to auto-fill" /></div>
                    <div className="space-y-2"><Label htmlFor="businessType">{t.businessType}</Label><Input id="businessType" value={formData.businessType} readOnly placeholder="Select a business to auto-fill" /></div>
                    <div className="space-y-2 md:col-span-2"><Label htmlFor="businessAddress">{t.businessAddress}</Label><Textarea id="businessAddress" value={formData.businessAddress} readOnly placeholder="Select a business to auto-fill" rows={3} /></div>
                    <div className="space-y-2"><Label htmlFor="pincode">{t.pincode}</Label><Input id="pincode" value={formData.pincode} readOnly placeholder="Select a business to auto-fill" /></div>
                    <div className="space-y-2"><Label htmlFor="city">{t.city}</Label><Input id="city" value={formData.city} readOnly placeholder="Select a business to auto-fill" /></div>
                </div>
              </div>
            )}

            {/* Step 2: License Information */}
            {currentStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="licenseType">{t.licenseType} *</Label>
                  <Select value={formData.licenseType} onValueChange={(value) => handleInputChange('licenseType', value)} disabled={isLoading.licenseTypes}>
                    <SelectTrigger><SelectValue placeholder={isLoading.licenseTypes ? t.loading : t.selectLicenseType} /></SelectTrigger>
                    <SelectContent>{licenseTypes.map((type) => (<SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>))}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label htmlFor="licenseCategory">{t.licenseCategory} *</Label><Select value={formData.licenseCategory} onValueChange={(value) => handleInputChange('licenseCategory', value)}><SelectTrigger><SelectValue placeholder={t.selectCategory} /></SelectTrigger><SelectContent>{Object.entries(t.categories).map(([key, value]) => (<SelectItem key={key} value={value}>{value}</SelectItem>))}</SelectContent></Select></div>
                <div className="space-y-2"><Label htmlFor="licenseDuration">{t.licenseDuration} *</Label><Select value={formData.licenseDuration} onValueChange={(value) => handleInputChange('licenseDuration', value)}><SelectTrigger><SelectValue placeholder={t.selectDuration} /></SelectTrigger><SelectContent>{Object.entries(t.durations).map(([key, value]) => (<SelectItem key={key} value={value}>{value}</SelectItem>))}</SelectContent></Select></div>
                <div className="space-y-2 md:col-span-2"><Label htmlFor="businessDescription">{t.businessDescription}</Label><Textarea id="businessDescription" value={formData.businessDescription} onChange={(e) => handleInputChange('businessDescription', e.target.value)} placeholder="Describe your business activities" rows={4} /></div>
              </div>
            )}

            {/* Step 3: Applicant Information */}
            {currentStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><Label htmlFor="applicantName">{t.applicantName} *</Label><Input id="applicantName" value={formData.applicantName} onChange={(e) => handleInputChange('applicantName', e.target.value)} placeholder="Enter applicant name" required /></div>
                <div className="space-y-2"><Label htmlFor="applicantEmail">{t.applicantEmail} *</Label><Input id="applicantEmail" type="email" value={formData.applicantEmail} onChange={(e) => handleInputChange('applicantEmail', e.target.value)} placeholder="Enter email address" required /></div>
                <div className="space-y-2"><Label htmlFor="applicantPhone">{t.applicantPhone} *</Label><Input id="applicantPhone" value={formData.applicantPhone} onChange={(e) => handleInputChange('applicantPhone', e.target.value)} placeholder="+91 9876543210" required /></div>
                <div className="space-y-2"><Label htmlFor="designation">{t.designation} *</Label><Input id="designation" value={formData.designation} onChange={(e) => handleInputChange('designation', e.target.value)} placeholder="Owner/Manager/Director" required /></div>
                <div className="space-y-2"><Label htmlFor="expectedEmployees">{t.expectedEmployees}</Label><Input id="expectedEmployees" type="number" value={formData.expectedEmployees} onChange={(e) => handleInputChange('expectedEmployees', e.target.value)} placeholder="10" /></div>
                <div className="space-y-2"><Label htmlFor="investmentAmount">{t.investmentAmount}</Label><Input id="investmentAmount" type="number" value={formData.investmentAmount} onChange={(e) => handleInputChange('investmentAmount', e.target.value)} placeholder="500000" /></div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                {submissionError && (<Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{submissionError}</AlertDescription></Alert>)}
                <Alert><AlertCircle className="h-4 w-4" /><AlertDescription>Please review all information before submitting. You can edit any section by going back to previous steps.</AlertDescription></Alert>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card><CardHeader><CardTitle className="text-lg">{t.businessInfo}</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p><strong>{t.businessName}:</strong> {formData.businessName}</p><p><strong>{t.businessType}:</strong> {formData.businessType}</p><p><strong>{t.businessAddress}:</strong> {formData.businessAddress}</p><p><strong>{t.city}:</strong> {formData.city}, {formData.state} - {formData.pincode}</p></CardContent></Card>
                  <Card><CardHeader><CardTitle className="text-lg">{t.licenseInfo}</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p><strong>{t.licenseType}:</strong> {formData.licenseType}</p><p><strong>{t.licenseCategory}:</strong> {formData.licenseCategory}</p><p><strong>{t.licenseDuration}:</strong> {formData.licenseDuration}</p></CardContent></Card>
                  <Card><CardHeader><CardTitle className="text-lg">{t.applicantInfo}</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p><strong>{t.applicantName}:</strong> {formData.applicantName}</p><p><strong>{t.applicantEmail}:</strong> {formData.applicantEmail}</p><p><strong>{t.applicantPhone}:</strong> {formData.applicantPhone}</p><p><strong>{t.designation}:</strong> {formData.designation}</p></CardContent></Card>
                  <Card><CardHeader><CardTitle className="text-lg">Additional Information</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">{formData.expectedEmployees && <p><strong>{t.expectedEmployees}:</strong> {formData.expectedEmployees}</p>}{formData.investmentAmount && <p><strong>{t.investmentAmount}:</strong> ₹{formData.investmentAmount}</p>}{formData.businessDescription && <p><strong>{t.businessDescription}:</strong> {formData.businessDescription}</p>}</CardContent></Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex justify-between items-center mt-8">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="flex items-center space-x-2"><ArrowLeft className="w-4 h-4" /><span>{t.previous}</span></Button>
        {currentStep < totalSteps ? (<Button onClick={handleNext} disabled={!validateStep(currentStep)} className="flex items-center space-x-2"><span>{t.next}</span><ArrowRight className="w-4 h-4" /></Button>) : (<Button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">{isSubmitting ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>{t.submitting}</span></>) : (<><span>{t.submit}</span><CheckCircle className="w-4 h-4" /></>)}</Button>)}
      </motion.div>
    </div>
  );
}
