import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  User, 
  MessageSquare,
  Building,
  HelpCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

interface ContactPageProps {
  language: 'en' | 'hi';
  user?: any;
}

export function ContactPage({ language, user }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    subject: '',
    department: '',
    priority: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const translations = {
    en: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our support team',
      getInTouch: 'Get in Touch',
      getInTouchDesc: 'Need help? We\'re here to assist you with your business needs.',
      contactForm: 'Contact Form',
      contactFormDesc: 'Fill out the form below and we\'ll get back to you within 24 hours.',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      subject: 'Subject',
      department: 'Department',
      priority: 'Priority',
      message: 'Message',
      sendMessage: 'Send Message',
      sending: 'Sending...',
      
      // Contact Information
      contactInfo: 'Contact Information',
      officeAddress: 'Office Address',
      workingHours: 'Working Hours',
      emailSupport: 'Email Support',
      phoneSupport: 'Phone Support',
      
      // Departments
      selectDepartment: 'Select Department',
      licensing: 'Licensing & Permits',
      registration: 'Business Registration',
      compliance: 'Compliance & Legal',
      schemes: 'Schemes & Incentives',
      technical: 'Technical Support',
      general: 'General Inquiry',
      
      // Priority
      selectPriority: 'Select Priority',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      urgent: 'Urgent',
      
      // Office Details
      delhiSecretariat: 'Delhi Secretariat, I.P. Estate',
      newDelhi: 'New Delhi - 110002',
      mondayToFriday: 'Monday to Friday',
      timeSlot: '9:00 AM - 6:00 PM',
      saturdayHours: 'Saturday: 9:00 AM - 1:00 PM',
      supportEmail: 'support@vyapaarsarthi.gov.in',
      helplineNumber: '+91-11-2300-XXXX',
      tollFree: 'Toll Free: 1800-11-XXXX',
      
      // Quick Contact
      quickContact: 'Quick Contact Options',
      liveChat: 'Live Chat Support',
      liveChatDesc: 'Available 24/7 for immediate assistance',
      videoCall: 'Schedule Video Call',
      videoCallDesc: 'Book a consultation with our experts',
      whatsapp: 'WhatsApp Support',
      whatsappDesc: 'Get quick answers on WhatsApp',
      faq: 'Frequently Asked Questions',
      faqDesc: 'Find answers to common questions'
    },
    hi: {
      title: 'संपर्क करें',
      subtitle: 'हमारी सहायता टीम से संपर्क करें',
      getInTouch: 'संपर्क में रहें',
      getInTouchDesc: 'सहायता चाहिए? हम आपकी व्यावसायिक आवश्यकताओं में सहायता के लिए यहाँ हैं।',
      contactForm: 'संपर्क फॉर्म',
      contactFormDesc: 'नीचे दिए गए फॉर्म को भरें और हम 24 घंटों के भीतर आपसे संपर्क करेंगे।',
      name: 'पूरा नाम',
      email: 'ईमेल पता',
      phone: 'फोन नंबर',
      subject: 'विषय',
      department: 'विभाग',
      priority: 'प्राथमिकता',
      message: 'संदेश',
      sendMessage: 'संदेश भेजें',
      sending: 'भेजा जा रहा है...',
      
      // Contact Information
      contactInfo: 'संपर्क जानकारी',
      officeAddress: 'कार्यालय का पता',
      workingHours: 'कार्य समय',
      emailSupport: 'ईमेल सहायता',
      phoneSupport: 'फोन सहायता',
      
      // Departments
      selectDepartment: 'विभाग चुनें',
      licensing: 'लाइसेंसिंग और परमिट',
      registration: 'व्यवसाय पंजीकरण',
      compliance: 'अनुपालन और कानूनी',
      schemes: 'योजनाएं और प्रोत्साहन',
      technical: 'तकनीकी सहायता',
      general: 'सामान्य पूछताछ',
      
      // Priority
      selectPriority: 'प्राथमिकता चुनें',
      low: 'कम',
      medium: 'मध्यम',
      high: 'उच्च',
      urgent: 'तत्काल',
      
      // Office Details
      delhiSecretariat: 'दिल्ली सचिवालय, आई.पी. एस्टेट',
      newDelhi: 'नई दिल्ली - 110002',
      mondayToFriday: 'सोमवार से शुक्रवार',
      timeSlot: 'सुबह 9:00 - शाम 6:00',
      saturdayHours: 'शनिवार: सुबह 9:00 - दोपहर 1:00',
      supportEmail: 'support@vyapaarsarthi.gov.in',
      helplineNumber: '+91-11-2300-XXXX',
      tollFree: 'टॉल फ्री: 1800-11-XXXX',
      
      // Quick Contact
      quickContact: 'त्वरित संपर्क विकल्प',
      liveChat: 'लाइव चैट सहायता',
      liveChatDesc: 'तत्काल सहायता के लिए 24/7 उपलब्ध',
      videoCall: 'वीडियो कॉल शेड्यूल करें',
      videoCallDesc: 'हमारे विशेषज्ञों के साथ परामर्श बुक करें',
      whatsapp: 'व्हाट्सऐप सहायता',
      whatsappDesc: 'व्हाट्सऐप पर त्वरित उत्तर पाएं',
      faq: 'अक्सर पूछे जाने वाले प्रश्न',
      faqDesc: 'सामान्य प्रश्नों के उत्तर खोजें'
    }
  };

  const t = translations[language];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    // Reset form or show success message
    alert(language === 'hi' ? 'आपका संदेश सफलतापूर्वक भेजा गया है!' : 'Your message has been sent successfully!');
  };

  const quickContactOptions = [
    {
      icon: MessageSquare,
      title: t.liveChat,
      description: t.liveChatDesc,
      action: 'Start Chat',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      icon: Phone,
      title: t.videoCall,
      description: t.videoCallDesc,
      action: 'Schedule Call',
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      icon: MessageSquare,
      title: t.whatsapp,
      description: t.whatsappDesc,
      action: 'Open WhatsApp',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      icon: HelpCircle,
      title: t.faq,
      description: t.faqDesc,
      action: 'View FAQ',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 ${language === 'hi' ? 'lang-hi' : 'lang-en'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  {t.contactForm}
                </CardTitle>
                <CardDescription>{t.contactFormDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.name}</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder={t.name}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.email}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder={t.email}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.phone}</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder={t.phone}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t.subject}</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder={t.subject}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">{t.department}</Label>
                      <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t.selectDepartment} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="licensing">{t.licensing}</SelectItem>
                          <SelectItem value="registration">{t.registration}</SelectItem>
                          <SelectItem value="compliance">{t.compliance}</SelectItem>
                          <SelectItem value="schemes">{t.schemes}</SelectItem>
                          <SelectItem value="technical">{t.technical}</SelectItem>
                          <SelectItem value="general">{t.general}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">{t.priority}</Label>
                      <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t.selectPriority} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">{t.low}</SelectItem>
                          <SelectItem value="medium">{t.medium}</SelectItem>
                          <SelectItem value="high">{t.high}</SelectItem>
                          <SelectItem value="urgent">{t.urgent}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t.message}</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder={t.message}
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? t.sending : t.sendMessage}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Contact Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  {t.contactInfo}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{t.officeAddress}</h4>
                    <p className="text-sm text-muted-foreground">{t.delhiSecretariat}</p>
                    <p className="text-sm text-muted-foreground">{t.newDelhi}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{t.workingHours}</h4>
                    <p className="text-sm text-muted-foreground">{t.mondayToFriday}</p>
                    <p className="text-sm text-muted-foreground">{t.timeSlot}</p>
                    <p className="text-sm text-muted-foreground">{t.saturdayHours}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{t.emailSupport}</h4>
                    <p className="text-sm text-muted-foreground">{t.supportEmail}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{t.phoneSupport}</h4>
                    <p className="text-sm text-muted-foreground">{t.helplineNumber}</p>
                    <p className="text-sm text-muted-foreground">{t.tollFree}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle>{t.quickContact}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickContactOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all ${option.color}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <option.icon className="w-5 h-5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{option.title}</h4>
                        <p className="text-xs opacity-75">{option.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}