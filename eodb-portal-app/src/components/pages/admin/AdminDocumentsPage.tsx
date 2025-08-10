import { useState } from 'react';
import { motion } from 'motion/react';
import { Folder, Search, Download, Upload, FileText, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

interface AdminDocumentsPageProps {
  language: 'en' | 'hi';
  user: any;
  onNavigate?: (page: string) => void;
}

export function AdminDocumentsPage({ language, user, onNavigate }: AdminDocumentsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const t = {
    en: {
      title: 'Document Vault',
      subtitle: 'Manage all uploaded documents and files',
      backToWelcome: 'Back to Welcome',
      search: 'Search documents...',
      upload: 'Upload Document',
      download: 'Download',
      viewAll: 'View All Documents',
      totalDocuments: 'Total Documents',
      recentUploads: 'Recent Uploads'
    },
    hi: {
      title: 'दस्तावेज़ वॉल्ट',
      subtitle: 'सभी अपलोड किए गए दस्तावेज़ों और फ़ाइलों का प्रबंधन करें',
      backToWelcome: 'स्वागत पृष्ठ पर वापस',
      search: 'दस्तावेज़ खोजें...',
      upload: 'दस्तावेज़ अपलोड करें',
      download: 'डाउनलोड',
      viewAll: 'सभी दस्तावेज़ देखें',
      totalDocuments: 'कुल दस्तावेज़',
      recentUploads: 'हाल के अपलोड'
    }
  }[language];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="space-y-1">
          <motion.h1 
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.title}
          </motion.h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => onNavigate?.('welcome')}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200"
          >
            <Home className="w-4 h-4 mr-2" />
            {t.backToWelcome}
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            {t.upload}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.totalDocuments}</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.recentUploads}</p>
                <p className="text-2xl font-bold text-green-600">43</p>
              </div>
              <Upload className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{language === 'hi' ? 'भंडारण उपयोग' : 'Storage Used'}</p>
                <p className="text-2xl font-bold text-purple-600">2.4GB</p>
              </div>
              <Folder className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{language === 'hi' ? 'साझा फ़ाइलें' : 'Shared Files'}</p>
                <p className="text-2xl font-bold text-orange-600">89</p>
              </div>
              <Download className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">{language === 'hi' ? 'आवेदन दस्तावेज़' : 'Application Documents'}</h3>
                <p className="text-sm text-muted-foreground">847 {language === 'hi' ? 'फ़ाइलें' : 'files'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Folder className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">{language === 'hi' ? 'लाइसेंस फ़ाइलें' : 'License Files'}</h3>
                <p className="text-sm text-muted-foreground">234 {language === 'hi' ? 'फ़ाइलें' : 'files'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">{language === 'hi' ? 'अनुपालन रिपोर्ट' : 'Compliance Reports'}</h3>
                <p className="text-sm text-muted-foreground">166 {language === 'hi' ? 'फ़ाइलें' : 'files'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t.recentUploads}</span>
            <Button variant="outline" size="sm">
              {t.viewAll}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">trade_license_application_APP-2024-021.pdf</p>
                  <p className="text-sm text-muted-foreground">{language === 'hi' ? 'अपलोड किया गया: आज 10:30 AM' : 'Uploaded: Today 10:30 AM'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">fire_safety_inspection_report_Metro_Hospital.pdf</p>
                  <p className="text-sm text-muted-foreground">{language === 'hi' ? 'अपलोड किया गया: कल 2:15 PM' : 'Uploaded: Yesterday 2:15 PM'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium">pollution_compliance_audit_Delhi_Chemicals.pdf</p>
                  <p className="text-sm text-muted-foreground">{language === 'hi' ? 'अपलोड किया गया: 2 दिन पहले' : 'Uploaded: 2 days ago'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium">fssai_license_renewal_Fresh_Bakery.pdf</p>
                  <p className="text-sm text-muted-foreground">{language === 'hi' ? 'अपलोड किया गया: 3 दिन पहले' : 'Uploaded: 3 days ago'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}