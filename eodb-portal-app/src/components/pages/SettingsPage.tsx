import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Palette, 
  Download, 
  Upload,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Camera,
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  Key,
  HelpCircle,
  ExternalLink,
  Check,
  X,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Alert, AlertDescription } from '../ui/alert';

interface SettingsPageProps {
  currentUser: any;
  onUserUpdate: (userData: any) => void;
  language: 'en' | 'hi';
}

export function SettingsPage({ currentUser, onUserUpdate, language }: SettingsPageProps) {
  const translations = {
    en: {
      title: 'Settings',
      subtitle: 'Manage your account preferences and settings',
      secure: 'Secure',
      tabs: {
        profile: 'Profile',
        notifications: 'Notifications',
        security: 'Security',
        preferences: 'Preferences',
        data: 'Data'
      },
      profile: {
        personalInfo: 'Personal Information',
        businessInfo: 'Business Information',
        fullName: 'Full Name',
        emailAddress: 'Email Address',
        phoneNumber: 'Phone Number',
        website: 'Website',
        address: 'Address',
        businessDescription: 'Business Description',
        businessName: 'Business Name',
        businessType: 'Business Type',
        location: 'Location',
        profilePicture: 'Profile Picture',
        uploadPhoto: 'Upload Photo',
        accountStatus: 'Account Status',
        emailVerified: 'Email Verified',
        phoneVerified: 'Phone Verified',
        businessVerified: 'Business Verified',
        verified: 'Verified',
        pending: 'Pending',
        cancel: 'Cancel',
        saveChanges: 'Save Changes',
        saving: 'Saving...'
      },
      notifications: {
        title: 'Notification Preferences',
        communication: 'Communication',
        emailNotifications: 'Email Notifications',
        emailDesc: 'Receive updates via email',
        smsNotifications: 'SMS Notifications',
        smsDesc: 'Receive alerts via SMS',
        pushNotifications: 'Push Notifications',
        pushDesc: 'Browser push notifications',
        marketingEmails: 'Marketing Emails',
        marketingDesc: 'Promotional content',
        applicationUpdates: 'Application Updates',
        statusUpdates: 'Status Updates',
        statusDesc: 'Application progress updates',
        paymentReminders: 'Payment Reminders',
        paymentDesc: 'Fee payment notifications',
        systemMaintenance: 'System Maintenance',
        maintenanceDesc: 'Maintenance alerts',
        weeklyDigest: 'Weekly Digest',
        digestDesc: 'Weekly summary email',
        savePreferences: 'Save Preferences'
      },
      security: {
        changePassword: 'Change Password',
        currentPassword: 'Current Password',
        newPassword: 'New Password',
        confirmPassword: 'Confirm New Password',
        updatePassword: 'Update Password',
        twoFactor: 'Two-Factor Authentication',
        twoFactorDesc: 'Add an extra layer of security',
        enable: 'Enable',
        loginAlerts: 'Login Alerts',
        alertsDesc: 'Get notified of new logins',
        sessionManagement: 'Session Management',
        activeSessions: 'Active Sessions',
        signOutAll: 'Sign Out All Devices'
      },
      preferences: {
        language: 'Language',
        theme: 'Theme',
        dateFormat: 'Date Format',
        timeFormat: 'Time Format',
        currency: 'Currency',
        timezone: 'Timezone',
        autoSave: 'Auto-save',
        autoSaveDesc: 'Automatically save form progress',
        emailLanguage: 'Email Language',
        accessibility: 'Accessibility',
        reducedMotion: 'Reduced Motion',
        motionDesc: 'Reduce animations and transitions',
        highContrast: 'High Contrast',
        contrastDesc: 'Increase color contrast'
      },
      data: {
        dataManagement: 'Data Management',
        exportData: 'Export Data',
        exportDesc: 'Download your data in JSON format',
        exportButton: 'Export My Data',
        importData: 'Import Data',
        importDesc: 'Import data from backup file',
        deleteAccount: 'Delete Account',
        deleteDesc: 'Permanently delete your account and all data',
        deleteButton: 'Delete Account',
        confirmDelete: 'Are you sure you want to delete your account? This action cannot be undone.',
        storage: 'Storage Usage',
        documents: 'Documents',
        applications: 'Applications',
        totalUsed: 'Total Used'
      },
      messages: {
        profileUpdated: 'Profile updated successfully!',
        passwordUpdated: 'Password updated successfully!',
        passwordMismatch: 'New passwords do not match',
        notificationsSaved: 'Notification preferences saved!',
        preferencesUpdated: 'Preferences updated successfully!',
        accountDeleted: 'Account deletion initiated. You will receive a confirmation email.'
      }
    },
    hi: {
      title: 'सेटिंग्स',
      subtitle: 'अपने खाता प्राथमिकताओं और सेटिंग्स को प्रबंधित करें',
      secure: 'सुरक्षित',
      tabs: {
        profile: 'प्रोफ़ाइल',
        notifications: 'सूचनाएं',
        security: 'सुरक्षा',
        preferences: 'प्राथमिकताएं',
        data: 'डेटा'
      },
      profile: {
        personalInfo: 'व्यक्तिगत जानकारी',
        businessInfo: 'व्यावसायिक जानकारी',
        fullName: 'पूरा नाम',
        emailAddress: 'ईमेल पता',
        phoneNumber: 'फोन नंबर',
        website: 'वेबसाइट',
        address: 'पता',
        businessDescription: 'व्यावसायिक विवरण',
        businessName: 'व्यवसाय का नाम',
        businessType: 'व्यवसाय प्रकार',
        location: 'स्थान',
        profilePicture: 'प्रोफ़ाइल चित्र',
        uploadPhoto: 'फोटो अपलोड करें',
        accountStatus: 'खाता स्थिति',
        emailVerified: 'ईमेल सत्यापित',
        phoneVerified: 'फोन सत्यापित',
        businessVerified: 'व्यवसाय सत्यापित',
        verified: 'सत्यापित',
        pending: 'लंबित',
        cancel: 'रद्द करें',
        saveChanges: 'परिवर्तन सेव करें',
        saving: 'सेव हो रहा है...'
      },
      notifications: {
        title: 'सूचना प्राथमिकताएं',
        communication: 'संचार',
        emailNotifications: 'ईमेल सूचनाएं',
        emailDesc: 'ईमेल के माध्यम से अपडेट प्राप्त करें',
        smsNotifications: 'एसएमएस सूचनाएं',
        smsDesc: 'एसएमएस के माध्यम से अलर्ट प्राप्त करें',
        pushNotifications: 'पुश सूचनाएं',
        pushDesc: 'ब्राउज़र पुश सूचनाएं',
        marketingEmails: 'मार्केटिंग ईमेल',
        marketingDesc: 'प्रचारक सामग्री',
        applicationUpdates: 'आवेदन अपडेट',
        statusUpdates: 'स्थिति अपडेट',
        statusDesc: 'आवेदन प्रगति अपडेट',
        paymentReminders: 'भुगतान रिमाइंडर',
        paymentDesc: 'शुल्क भुगतान सूचनाएं',
        systemMaintenance: 'सिस्टम रखरखाव',
        maintenanceDesc: 'रखरखाव अलर्ट',
        weeklyDigest: 'साप्ताहिक डाइजेस्ट',
        digestDesc: 'साप्ताहिक सारांश ईमेल',
        savePreferences: 'प्राथमिकताएं सेव करें'
      },
      security: {
        changePassword: 'पासवर्ड बदलें',
        currentPassword: 'वर्तमान पासवर्ड',
        newPassword: 'नया पासवर्ड',
        confirmPassword: 'नया पासवर्ड की पुष्टि करें',
        updatePassword: 'पासवर्ड अपडेट करें',
        twoFactor: 'दो-चरणीय प्रमाणीकरण',
        twoFactorDesc: 'सुरक्षा की एक अतिरिक्त परत जोड़ें',
        enable: 'सक्षम करें',
        loginAlerts: 'लॉगिन अलर्ट',
        alertsDesc: 'नए लॉगिन की सूचना प्राप्त करें',
        sessionManagement: 'सत्र प्रबंधन',
        activeSessions: 'सक्रिय सत्र',
        signOutAll: 'सभी डिवाइस से साइन आउट करें'
      },
      preferences: {
        language: 'भाषा',
        theme: 'थीम',
        dateFormat: 'दिनांक प्रारूप',
        timeFormat: 'समय प्रारूप',
        currency: 'मुद्रा',
        timezone: 'समय क्षेत्र',
        autoSave: 'ऑटो-सेव',
        autoSaveDesc: 'फॉर्म प्रगति को स्वचालित रूप से सेव करें',
        emailLanguage: 'ईमेल भाषा',
        accessibility: 'पहुंच',
        reducedMotion: 'कम गति',
        motionDesc: 'एनिमेशन और ट्रांज़िशन कम करें',
        highContrast: 'उच्च कंट्रास्ट',
        contrastDesc: 'रंग कंट्रास्ट बढ़ाएं'
      },
      data: {
        dataManagement: 'डेटा प्रबंधन',
        exportData: 'डेटा एक्सपोर्ट करें',
        exportDesc: 'JSON प्रारूप में अपना डेटा डाउनलोड करें',
        exportButton: 'मेरा डेटा एक्सपोर्ट करें',
        importData: 'डेटा इंपोर्ट करें',
        importDesc: 'बैकअप फ़ाइल से डेटा इंपोर्ट करें',
        deleteAccount: 'खाता हटाएं',
        deleteDesc: 'अपना खाता और सभी डेटा स्थायी रूप से हटाएं',
        deleteButton: 'खाता हटाएं',
        confirmDelete: 'क्या आप वाकई अपना खाता हटाना चाहते हैं? यह कार्य पूर्ववत नहीं किया जा सकता।',
        storage: 'स्टोरेज उपयोग',
        documents: 'दस्तावेज़',
        applications: 'आवेदन',
        totalUsed: 'कुल उपयोग'
      },
      messages: {
        profileUpdated: 'प्रोफ़ाइल सफलतापूर्वक अपडेट हो गया!',
        passwordUpdated: 'पासवर्ड सफलतापूर्वक अपडेट हो गया!',
        passwordMismatch: 'नए पासवर्ड मेल नहीं खाते',
        notificationsSaved: 'सूचना प्राथमिकताएं सेव हो गईं!',
        preferencesUpdated: 'प्राथमिकताएं सफलतापूर्वक अपडेट हो गईं!',
        accountDeleted: 'खाता हटाने की प्रक्रिया शुरू हो गई। आपको एक पुष्टिकरण ईमेल प्राप्त होगा।'
      }
    }
  };

  const t = translations[language];

  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  // Profile settings
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phoneNumber || '',
    businessName: currentUser?.businessName || '',
    businessType: currentUser?.businessType || '',
    location: currentUser?.location || '',
    address: currentUser?.address || '',
    website: currentUser?.website || '',
    description: currentUser?.description || ''
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    applicationUpdates: true,
    paymentReminders: true,
    systemMaintenance: true,
    marketingEmails: false,
    weeklyDigest: true
  });

  // Security settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    loginAlerts: true
  });

  // System preferences
  const [preferences, setPreferences] = useState({
    language: language,
    theme: 'system',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    autoSave: true,
    reducedMotion: false,
    highContrast: false
  });

  const handleProfileSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...currentUser,
        ...profileData
      };
      
      onUserUpdate(updatedUser);
      alert(t.messages.profileUpdated);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert(t.messages.passwordMismatch);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(t.messages.passwordUpdated);
      setSecurityData({
        ...securityData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error updating password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(t.messages.notificationsSaved);
    } catch (error) {
      console.error('Error saving notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferencesSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(t.messages.preferencesUpdated);
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = () => {
    const exportData = {
      profile: profileData,
      applications: [], // Would be fetched from backend
      documents: [], // Would be fetched from backend
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eodb-data-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteAccount = () => {
    if (confirm(t.data.confirmDelete)) {
      alert(t.messages.accountDeleted);
    }
  };

  const businessTypes = language === 'hi' 
    ? [
        { value: 'sole-proprietorship', label: 'एकल स्वामित्व' },
        { value: 'partnership', label: 'साझेदारी' },
        { value: 'private-limited', label: 'प्राइवेट लिमिटेड कंपनी' },
        { value: 'public-limited', label: 'पब्लिक लिमिटेड कंपनी' },
        { value: 'llp', label: 'सीमित देयता भागीदारी' }
      ]
    : [
        { value: 'sole-proprietorship', label: 'Sole Proprietorship' },
        { value: 'partnership', label: 'Partnership' },
        { value: 'private-limited', label: 'Private Limited Company' },
        { value: 'public-limited', label: 'Public Limited Company' },
        { value: 'llp', label: 'Limited Liability Partnership' }
      ];

  return (
    <div className={`p-6 max-w-6xl mx-auto relative z-10 ${language === 'hi' ? 'lang-hi' : 'lang-en'}`}>
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
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Shield className="w-3 h-3 mr-1" />
            {t.secure}
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{t.tabs.profile}</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">{t.tabs.notifications}</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">{t.tabs.security}</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">{t.tabs.preferences}</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">{t.tabs.data}</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>{t.profile.personalInfo}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{t.profile.fullName}</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder={language === 'hi' ? 'अपना पूरा नाम दर्ज करें' : 'Enter your full name'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">{t.profile.emailAddress}</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                            className="pl-10"
                            placeholder={language === 'hi' ? 'अपना ईमेल दर्ज करें' : 'Enter your email'}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">{t.profile.phoneNumber}</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                            className="pl-10"
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="website">{t.profile.website}</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="website"
                            value={profileData.website}
                            onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                            className="pl-10"
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">{t.profile.address}</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Textarea
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                          className="pl-10"
                          placeholder={language === 'hi' ? 'अपना पूरा पता दर्ज करें' : 'Enter your complete address'}
                          rows={3}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">{t.profile.businessDescription}</Label>
                      <Textarea
                        id="description"
                        value={profileData.description}
                        onChange={(e) => setProfileData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder={language === 'hi' ? 'अपने व्यवसाय का संक्षिप्त विवरण' : 'Brief description of your business'}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="w-5 h-5" />
                      <span>{t.profile.businessInfo}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessName">{t.profile.businessName}</Label>
                        <Input
                          id="businessName"
                          value={profileData.businessName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, businessName: e.target.value }))}
                          placeholder={language === 'hi' ? 'व्यवसाय का नाम दर्ज करें' : 'Enter business name'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessType">{t.profile.businessType}</Label>
                        <Select 
                          value={profileData.businessType} 
                          onValueChange={(value) => setProfileData(prev => ({ ...prev, businessType: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={language === 'hi' ? 'व्यवसाय प्रकार चुनें' : 'Select business type'} />
                          </SelectTrigger>
                          <SelectContent>
                            {businessTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">{t.profile.location}</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder={language === 'hi' ? 'शहर, राज्य' : 'City, State'}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline">{t.profile.cancel}</Button>
                  <Button onClick={handleProfileSave} disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span>{t.profile.saving}</span>
                      </div>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {t.profile.saveChanges}
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Profile sidebar */}
              <div className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>{t.profile.profilePicture}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="relative inline-block mb-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face" />
                        <AvatarFallback className="text-lg">
                          {profileData.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="icon"
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      {t.profile.uploadPhoto}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>{t.profile.accountStatus}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t.profile.emailVerified}</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Check className="w-3 h-3 mr-1" />
                        {t.profile.verified}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t.profile.phoneVerified}</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {t.profile.pending}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t.profile.businessVerified}</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Check className="w-3 h-3 mr-1" />
                        {t.profile.verified}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>{t.notifications.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">{t.notifications.communication}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications">{t.notifications.emailNotifications}</Label>
                        <p className="text-sm text-muted-foreground">{t.notifications.emailDesc}</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, emailNotifications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-notifications">{t.notifications.smsNotifications}</Label>
                        <p className="text-sm text-muted-foreground">{t.notifications.smsDesc}</p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={notifications.smsNotifications}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, smsNotifications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-notifications">{t.notifications.pushNotifications}</Label>
                        <p className="text-sm text-muted-foreground">{t.notifications.pushDesc}</p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, pushNotifications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketing-emails">{t.notifications.marketingEmails}</Label>
                        <p className="text-sm text-muted-foreground">{t.notifications.marketingDesc}</p>
                      </div>
                      <Switch
                        id="marketing-emails"
                        checked={notifications.marketingEmails}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, marketingEmails: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">{t.notifications.applicationUpdates}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="application-updates">{t.notifications.statusUpdates}</Label>
                        <p className="text-sm text-muted-foreground">{t.notifications.statusDesc}</p>
                      </div>
                      <Switch
                        id="application-updates"
                        checked={notifications.applicationUpdates}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, applicationUpdates: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="payment-reminders">{t.notifications.paymentReminders}</Label>
                        <p className="text-sm text-muted-foreground">{t.notifications.paymentDesc}</p>
                      </div>
                      <Switch
                        id="payment-reminders"
                        checked={notifications.paymentReminders}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, paymentReminders: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="system-maintenance">{t.notifications.systemMaintenance}</Label>
                        <p className="text-sm text-muted-foreground">{t.notifications.maintenanceDesc}</p>
                      </div>
                      <Switch
                        id="system-maintenance"
                        checked={notifications.systemMaintenance}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, systemMaintenance: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="weekly-digest">{t.notifications.weeklyDigest}</Label>
                        <p className="text-sm text-muted-foreground">{t.notifications.digestDesc}</p>
                      </div>
                      <Switch
                        id="weekly-digest"
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, weeklyDigest: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleNotificationSave} disabled={isLoading}>
                    {isLoading ? t.profile.saving : t.notifications.savePreferences}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="w-5 h-5" />
                    <span>{t.security.changePassword}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">{t.security.currentPassword}</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={securityData.currentPassword}
                        onChange={(e) => setSecurityData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        placeholder={language === 'hi' ? 'वर्तमान पासवर्ड दर्ज करें' : 'Enter current password'}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="newPassword">{t.security.newPassword}</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={securityData.newPassword}
                        onChange={(e) => setSecurityData(prev => ({ ...prev, newPassword: e.target.value }))}
                        placeholder={language === 'hi' ? 'नया पासवर्ड दर्ज करें' : 'Enter new password'}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">{t.security.confirmPassword}</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder={language === 'hi' ? 'नया पासवर्ड की पुष्टि करें' : 'Confirm new password'}
                    />
                  </div>

                  <Button onClick={handlePasswordChange} disabled={isLoading} className="w-full">
                    {isLoading ? t.profile.saving : t.security.updatePassword}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>{t.security.twoFactor}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{t.security.twoFactor}</Label>
                      <p className="text-sm text-muted-foreground">{t.security.twoFactorDesc}</p>
                    </div>
                    <Switch
                      checked={securityData.twoFactorEnabled}
                      onCheckedChange={(checked) => 
                        setSecurityData(prev => ({ ...prev, twoFactorEnabled: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{t.security.loginAlerts}</Label>
                      <p className="text-sm text-muted-foreground">{t.security.alertsDesc}</p>
                    </div>
                    <Switch
                      checked={securityData.loginAlerts}
                      onCheckedChange={(checked) => 
                        setSecurityData(prev => ({ ...prev, loginAlerts: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">{t.security.sessionManagement}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{t.security.activeSessions}</p>
                    <Button variant="outline" size="sm">
                      {t.security.signOutAll}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>{t.tabs.preferences}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="language">{t.preferences.language}</Label>
                    <Select 
                      value={preferences.language} 
                      onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">हिंदी</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="theme">{t.preferences.theme}</Label>
                    <Select 
                      value={preferences.theme} 
                      onValueChange={(value) => setPreferences(prev => ({ ...prev, theme: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">{language === 'hi' ? 'लाइट' : 'Light'}</SelectItem>
                        <SelectItem value="dark">{language === 'hi' ? 'डार्क' : 'Dark'}</SelectItem>
                        <SelectItem value="system">{language === 'hi' ? 'सिस्टम' : 'System'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="currency">{t.preferences.currency}</Label>
                    <Select 
                      value={preferences.currency} 
                      onValueChange={(value) => setPreferences(prev => ({ ...prev, currency: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timezone">{t.preferences.timezone}</Label>
                    <Select 
                      value={preferences.timezone} 
                      onValueChange={(value) => setPreferences(prev => ({ ...prev, timezone: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">Asia/Kolkata</SelectItem>
                        <SelectItem value="Asia/Mumbai">Asia/Mumbai</SelectItem>
                        <SelectItem value="Asia/Delhi">Asia/Delhi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">{t.preferences.accessibility}</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{t.preferences.autoSave}</Label>
                      <p className="text-sm text-muted-foreground">{t.preferences.autoSaveDesc}</p>
                    </div>
                    <Switch
                      checked={preferences.autoSave}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, autoSave: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{t.preferences.reducedMotion}</Label>
                      <p className="text-sm text-muted-foreground">{t.preferences.motionDesc}</p>
                    </div>
                    <Switch
                      checked={preferences.reducedMotion}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, reducedMotion: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{t.preferences.highContrast}</Label>
                      <p className="text-sm text-muted-foreground">{t.preferences.contrastDesc}</p>
                    </div>
                    <Switch
                      checked={preferences.highContrast}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, highContrast: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handlePreferencesSave} disabled={isLoading}>
                    {isLoading ? t.profile.saving : t.profile.saveChanges}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data">
            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>{t.data.dataManagement}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 border border-border rounded-lg">
                      <h4 className="font-medium mb-2">{t.data.exportData}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{t.data.exportDesc}</p>
                      <Button onClick={exportData} variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        {t.data.exportButton}
                      </Button>
                    </div>

                    <div className="p-4 border border-border rounded-lg">
                      <h4 className="font-medium mb-2">{t.data.storage}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>{t.data.documents}</span>
                          <span>2.3 GB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t.data.applications}</span>
                          <span>156 MB</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>{t.data.totalUsed}</span>
                          <span>2.5 GB</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/5">
                      <h4 className="font-medium mb-2 text-destructive">{t.data.deleteAccount}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{t.data.deleteDesc}</p>
                      <Button onClick={deleteAccount} variant="destructive" className="w-full">
                        <Trash2 className="w-4 h-4 mr-2" />
                        {t.data.deleteButton}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}