import { useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  FileText,
  Building2,
  Shield,
  Clock,
  Users,
  Bug,
  CreditCard,
  Globe,
  Phone,
  Mail,
  Send,
  Upload,
  Calendar,
  AlertCircle,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';

interface ComplaintPageProps {
  language: 'en' | 'hi';
  user?: any;
}

interface LicenseApplication {
  id: string;
  type: string;
  applicationNumber: string;
  status: string;
  submittedDate: string;
}

export function ComplaintPage({ language, user }: ComplaintPageProps) {
  const [complaintType, setComplaintType] = useState<string>('');
  const [selectedLicense, setSelectedLicense] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [priority, setPriority] = useState<string>('medium');
  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [contactPreference, setContactPreference] = useState<string>('email');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const translations = {
    en: {
      pageTitle: 'Lodge a Complaint',
      pageSubtitle: 'We are here to help resolve your concerns quickly and efficiently',
      complaintForm: 'Complaint Details',
      complaintType: 'Complaint Type',
      complaintTypeHelp: 'Select the type of complaint you want to lodge',
      licenseRelated: 'License/Application Related',
      generalIssue: 'General Issue',
      selectLicense: 'Select License Application',
      selectLicenseHelp: 'Choose the specific license application this complaint relates to',
      noLicenses: 'No license applications found',
      category: 'Issue Category',
      categoryHelp: 'Select the category that best describes your issue',
      priority: 'Priority Level',
      priorityHelp: 'How urgent is this issue?',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      critical: 'Critical',
      subject: 'Subject',
      subjectPlaceholder: 'Brief description of your complaint',
      description: 'Detailed Description',
      descriptionPlaceholder: 'Please provide detailed information about your complaint...',
      contactPreference: 'Preferred Contact Method',
      contactPreferenceHelp: 'How would you like us to contact you regarding this complaint?',
      email: 'Email',
      phone: 'Phone',
      both: 'Both Email & Phone',
      attachments: 'Attachments (Optional)',
      attachmentsHelp: 'Upload any relevant documents or screenshots',
      submitComplaint: 'Submit Complaint',
      submitting: 'Submitting...',
      complaintSubmitted: 'Complaint submitted successfully! Reference ID: ',
      complaintError: 'Failed to submit complaint. Please try again.',
      licenseCategories: {
        'application-delay': 'Application Processing Delay',
        'document-issue': 'Document/Upload Issues',
        'status-update': 'Status Update Problems',
        'payment-issue': 'Payment Related Issues',
        'rejection-appeal': 'Rejection/Appeal Issues',
        'renewal-problem': 'Renewal Problems'
      },
      generalCategories: {
        'technical-issue': 'Technical/Website Issues',
        'account-access': 'Account Access Problems',
        'information-query': 'Information/Guidance Query',
        'service-quality': 'Service Quality Issues',
        'staff-behavior': 'Staff Behavior Complaint',
        'other': 'Other Issues'
      },
      recentComplaints: 'Recent Complaints',
      complaintId: 'Complaint ID',
      status: 'Status',
      submittedOn: 'Submitted On',
      viewDetails: 'View Details',
      statusTypes: {
        'open': 'Open',
        'in-progress': 'In Progress',
        'resolved': 'Resolved',
        'closed': 'Closed'
      },
      helpSection: {
        title: 'Need Help?',
        description: 'If you need immediate assistance, you can reach us through:',
        helpline: 'Helpline: 1800-123-4567',
        email: 'Email: complaints@eodb.gov.in',
        hours: 'Available 24/7 for critical issues'
      }
    },
    hi: {
      pageTitle: 'शिकायत दर्ज करें',
      pageSubtitle: 'हम आपकी चिंताओं को जल्दी और कुशलता से हल करने के लिए यहां हैं',
      complaintForm: 'शिकायत विवरण',
      complaintType: 'शिकायत का प्रकार',
      complaintTypeHelp: 'आप जो शिकायत दर्ज करना चाहते हैं उसका प्रकार चुनें',
      licenseRelated: 'लाइसेंस/आवेदन संबंधी',
      generalIssue: 'सामान्य समस्या',
      selectLicense: 'लाइसेंस आवेदन चुनें',
      selectLicenseHelp: 'विशिष्ट लाइसेंस आवेदन चुनें जिससे यह शिकायत संबंधित है',
      noLicenses: 'कोई लाइसेंस आवेदन नहीं मिला',
      category: 'समस्या श्रेणी',
      categoryHelp: 'श्रेणी चुनें जो आपकी समस्या का सबसे अच्छा वर्णन करती है',
      priority: 'प्राथमिकता स्तर',
      priorityHelp: 'यह समस्या कितनी जरूरी है?',
      low: 'कम',
      medium: 'मध्यम',
      high: 'उच्च',
      critical: 'गंभीर',
      subject: 'विषय',
      subjectPlaceholder: 'आपकी शिकायत का संक्षिप्त विवरण',
      description: 'विस्तृत विवरण',
      descriptionPlaceholder: 'कृपया अपनी शिकायत के बारे में विस्तृत जानकारी प्रदान करें...',
      contactPreference: 'पसंदीदा संपर्क विधि',
      contactPreferenceHelp: 'इस शिकायत के संबंध में आप हमसे कैसे संपर्क करना चाहेंगे?',
      email: 'ईमेल',
      phone: 'फोन',
      both: 'ईमेल और फोन दोनों',
      attachments: 'अनुलग्नक (वैकल्पिक)',
      attachmentsHelp: 'कोई भी प्रासंगिक दस्तावेज या स्क्रीनशॉट अपलोड करें',
      submitComplaint: 'शिकायत दर्ज करें',
      submitting: 'दर्ज की जा रही है...',
      complaintSubmitted: 'शिकायत सफलतापूर्वक दर्ज की गई! संदर्भ आईडी: ',
      complaintError: 'शिकायत दर्ज करने में विफल। कृपया पुनः प्रयास करें।',
      licenseCategories: {
        'application-delay': 'आवेदन प्रसंस्करण में देरी',
        'document-issue': 'दस्तावेज/अपलोड समस्याएं',
        'status-update': 'स्थिति अपडेट समस्याएं',
        'payment-issue': 'भुगतान संबंधी समस्याएं',
        'rejection-appeal': 'अस्वीकरण/अपील समस्याएं',
        'renewal-problem': 'नवीनीकरण समस्याएं'
      },
      generalCategories: {
        'technical-issue': 'तकनीकी/वेबसाइट समस्याएं',
        'account-access': 'खाता पहुंच समस्याएं',
        'information-query': 'जानकारी/मार्गदर्शन प्रश्न',
        'service-quality': 'सेवा गुणवत्ता समस्याएं',
        'staff-behavior': 'कर्मचारी व्यवहार शिकायत',
        'other': 'अन्य समस्याएं'
      },
      recentComplaints: 'हाल की शिकायतें',
      complaintId: 'शिकायत आईडी',
      status: 'स्थिति',
      submittedOn: 'पर जमा किया गया',
      viewDetails: 'विवरण देखें',
      statusTypes: {
        'open': 'खुला',
        'in-progress': 'प्रगति में',
        'resolved': 'हल किया गया',
        'closed': 'बंद'
      },
      helpSection: {
        title: 'सहायता चाहिए?',
        description: 'यदि आपको तत्काल सहायता चाहिए, तो आप हमसे इसके माध्यम से संपर्क कर सकते हैं:',
        helpline: 'हेल्पलाइन: 1800-123-4567',
        email: 'ईमेल: complaints@eodb.gov.in',
        hours: 'गंभीर समस्याओं के लिए 24/7 उपलब्ध'
      }
    }
  };

  const t = translations[language];

  // Mock license applications data
  const licenseApplications: LicenseApplication[] = [
    {
      id: '1',
      type: language === 'hi' ? 'ट्रेड लाइसेंस' : 'Trade License',
      applicationNumber: 'TL-2024-001',
      status: language === 'hi' ? 'प्रसंस्करण में' : 'Processing',
      submittedDate: '2024-01-15'
    },
    {
      id: '2',
      type: language === 'hi' ? 'फूड लाइसेंस' : 'Food License',
      applicationNumber: 'FL-2024-002',
      status: language === 'hi' ? 'दस्तावेज़ की प्रतीक्षा' : 'Pending Documents',
      submittedDate: '2024-01-10'
    },
    {
      id: '3',
      type: language === 'hi' ? 'पर्यावरण क्लीयरेंस' : 'Environment Clearance',
      applicationNumber: 'EC-2024-003',
      status: language === 'hi' ? 'स्वीकृत' : 'Approved',
      submittedDate: '2024-01-05'
    }
  ];

  // Mock recent complaints
  const recentComplaints = [
    {
      id: 'C-2024-001',
      subject: language === 'hi' ? 'आवेदन प्रसंस्करण में देरी' : 'Application processing delay',
      status: 'in-progress',
      submittedDate: '2024-01-20'
    },
    {
      id: 'C-2024-002',
      subject: language === 'hi' ? 'भुगतान संबंधी समस्या' : 'Payment related issue',
      status: 'resolved',
      submittedDate: '2024-01-18'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!complaintType || !category || !subject || !description) {
      toast.error(language === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें' : 'Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const referenceId = `C-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      
      toast.success(t.complaintSubmitted + referenceId);
      
      // Reset form
      setComplaintType('');
      setSelectedLicense('');
      setCategory('');
      setPriority('medium');
      setSubject('');
      setDescription('');
      setContactPreference('email');
      
    } catch (error) {
      toast.error(t.complaintError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'in-progress':
        return <RefreshCw className="w-4 h-4 text-blue-500" />;
      case 'resolved':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'closed':
        return <CheckCircle2 className="w-4 h-4 text-gray-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className={`min-h-screen bg-background p-6 ${language === 'hi' ? 'lang-hi' : 'lang-en'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t.pageTitle}</h1>
              <p className="text-muted-foreground mt-1">{t.pageSubtitle}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Complaint Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {t.complaintForm}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Complaint Type */}
                    <div className="space-y-2">
                      <Label htmlFor="complaintType">{t.complaintType} *</Label>
                      <Select value={complaintType} onValueChange={setComplaintType}>
                        <SelectTrigger>
                          <SelectValue placeholder={t.complaintTypeHelp} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="license">{t.licenseRelated}</SelectItem>
                          <SelectItem value="general">{t.generalIssue}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* License Selection (only if license-related) */}
                    {complaintType === 'license' && (
                      <div className="space-y-2">
                        <Label htmlFor="selectedLicense">{t.selectLicense} *</Label>
                        <Select value={selectedLicense} onValueChange={setSelectedLicense}>
                          <SelectTrigger>
                            <SelectValue placeholder={t.selectLicenseHelp} />
                          </SelectTrigger>
                          <SelectContent>
                            {licenseApplications.length > 0 ? (
                              licenseApplications.map((license) => (
                                <SelectItem key={license.id} value={license.id}>
                                  {license.type} - {license.applicationNumber}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="none" disabled>
                                {t.noLicenses}
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Category Selection */}
                    {complaintType && (
                      <div className="space-y-2">
                        <Label htmlFor="category">{t.category} *</Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder={t.categoryHelp} />
                          </SelectTrigger>
                          <SelectContent>
                            {complaintType === 'license' ? (
                              Object.entries(t.licenseCategories).map(([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              ))
                            ) : (
                              Object.entries(t.generalCategories).map(([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Priority Level */}
                    <div className="space-y-2">
                      <Label htmlFor="priority">{t.priority}</Label>
                      <Select value={priority} onValueChange={setPriority}>
                        <SelectTrigger>
                          <SelectValue placeholder={t.priorityHelp} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">{t.low}</SelectItem>
                          <SelectItem value="medium">{t.medium}</SelectItem>
                          <SelectItem value="high">{t.high}</SelectItem>
                          <SelectItem value="critical">{t.critical}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t.subject} *</Label>
                      <Input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder={t.subjectPlaceholder}
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">{t.description} *</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={t.descriptionPlaceholder}
                        rows={6}
                        required
                      />
                    </div>

                    {/* Contact Preference */}
                    <div className="space-y-2">
                      <Label htmlFor="contactPreference">{t.contactPreference}</Label>
                      <Select value={contactPreference} onValueChange={setContactPreference}>
                        <SelectTrigger>
                          <SelectValue placeholder={t.contactPreferenceHelp} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">{t.email}</SelectItem>
                          <SelectItem value="phone">{t.phone}</SelectItem>
                          <SelectItem value="both">{t.both}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Attachments */}
                    <div className="space-y-2">
                      <Label>{t.attachments}</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">{t.attachmentsHelp}</p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          {t.submitting}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          {t.submitComplaint}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Complaints */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t.recentComplaints}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentComplaints.map((complaint) => (
                      <div key={complaint.id} className="border border-border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{complaint.id}</span>
                          <Badge className={getStatusColor(complaint.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(complaint.status)}
                              {t.statusTypes[complaint.status as keyof typeof t.statusTypes]}
                            </div>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{complaint.subject}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{t.submittedOn}: {complaint.submittedDate}</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            {t.viewDetails}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {t.helpSection.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t.helpSection.description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span>{t.helpSection.helpline}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-green-600" />
                      <span>{t.helpSection.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span>{t.helpSection.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}