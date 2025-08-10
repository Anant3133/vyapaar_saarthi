import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, FileText, CheckCircle, XCircle, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';

interface AdminLicensingPageProps {
  language: 'en' | 'hi';
  user: any;
  onNavigate?: (page: string) => void;
}

export function AdminLicensingPage({ language, user, onNavigate }: AdminLicensingPageProps) {
  const t = {
    en: {
      title: 'License Management',
      subtitle: 'Manage license types, approvals, and renewals',
      backToWelcome: 'Back to Welcome',
      addLicenseType: 'Add License Type',
      viewRequests: 'View Requests',
      approvalPanel: 'Approval Panel'
    },
    hi: {
      title: 'लाइसेंस प्रबंधन',
      subtitle: 'लाइसेंस प्रकार, अनुमोदन और नवीकरण का प्रबंधन करें',
      backToWelcome: 'स्वागत पृष्ठ पर वापस',
      addLicenseType: 'लाइसेंस प्रकार जोड़ें',
      viewRequests: 'अनुरोध देखें',
      approvalPanel: 'अनुमोदन पैनल'
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
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            {t.viewRequests}
          </Button>
          <Button>
            <Award className="w-4 h-4 mr-2" />
            {t.addLicenseType}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.approvalPanel}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {language === 'hi' ? 'लाइसेंस प्रबंधन सिस्टम यहाँ होगा' : 'License management system will be here'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}