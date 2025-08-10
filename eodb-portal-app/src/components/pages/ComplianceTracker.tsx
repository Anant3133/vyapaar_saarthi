import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Filter,
  Plus,
  Bell,
  Download,
  Upload,
  RefreshCw,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { Checkbox } from '../ui/checkbox';

interface ComplianceTrackerProps {
  language: 'en' | 'hi';
}

export function ComplianceTracker({ language }: ComplianceTrackerProps) {
  const translations = {
    en: {
      title: 'Compliance Tracker',
      subtitle: 'Stay on top of all your business compliance requirements',
      refresh: 'Refresh',
      addCompliance: 'Add Compliance',
      upcomingReminders: 'Upcoming Reminders',
      filters: 'Filters:',
      complianceItems: 'Compliance Items',
      listView: 'List View',
      calendarView: 'Calendar View',
      calendarViewTitle: 'Calendar View',
      calendarViewDesc: 'Calendar view with compliance deadlines will be displayed here',
      view: 'View',
      upload: 'Upload',
      download: 'Download',
      requiredDocuments: 'Required Documents:',
      dueDate: 'Due Date:',
      penalty: 'Penalty:',
      progress: 'Progress:',
      priority: 'priority',
      stats: {
        totalCompliances: 'Total Compliances',
        pending: 'Pending',
        overdue: 'Overdue',
        completed: 'Completed'
      },
      status: {
        all: 'All Status',
        pending: 'Pending',
        inProgress: 'In Progress',
        completed: 'Completed',
        overdue: 'Overdue'
      },
      priorities: {
        all: 'All Priority',
        high: 'High Priority',
        medium: 'Medium Priority',
        low: 'Low Priority'
      },
      complianceList: {
        gstReturn: {
          title: 'GST Return Filing',
          description: 'Monthly GST return filing for the month of January 2024'
        },
        pfReturn: {
          title: 'PF Return Filing',
          description: 'Provident Fund return for employees for January 2024'
        },
        environmentalClearance: {
          title: 'Environmental Clearance Renewal',
          description: 'Annual environmental clearance certificate renewal'
        },
        tradeLicense: {
          title: 'Trade License Renewal',
          description: 'Municipal trade license renewal for business operations'
        },
        incomeTax: {
          title: 'Income Tax Return',
          description: 'Annual income tax return filing for assessment year 2024-25'
        },
        fireSafety: {
          title: 'Fire Safety Certificate',
          description: 'Annual fire safety inspection and certificate renewal'
        }
      },
      documents: {
        salesRegister: 'Sales Register',
        purchaseRegister: 'Purchase Register',
        gstInvoices: 'GST Invoices',
        employeeRegister: 'Employee Register',
        salarySheets: 'Salary Sheets',
        pfChallans: 'PF Challans',
        environmentalReport: 'Environmental Impact Report',
        complianceCertificate: 'Compliance Certificate',
        businessRegistration: 'Business Registration',
        propertyDocuments: 'Property Documents',
        noc: 'NOC',
        form16: 'Form 16',
        investmentProofs: 'Investment Proofs',
        bankStatements: 'Bank Statements',
        fireSafetyPlan: 'Fire Safety Plan',
        equipmentCertificates: 'Equipment Certificates'
      },
      reminders: {
        gstDueTomorrow: 'GST Return Due Tomorrow',
        pfDueIn3Days: 'PF Filing Due in 3 Days',
        tradeLicenseDue: 'Trade License Renewal Due'
      },
      daysOverdue: 'days overdue',
      dueToday: 'Due today',
      dueTomorrow: 'Due tomorrow',
      dueInDays: 'Due in',
      days: 'days'
    },
    hi: {
      title: 'अनुपालन ट्रैकर',
      subtitle: 'अपनी सभी व्यावसायिक अनुपालन आवश्यकताओं पर नज़र रखें',
      refresh: 'रीफ्रेश करें',
      addCompliance: 'अनुपालन जोड़ें',
      upcomingReminders: 'आगामी रिमाइंडर',
      filters: 'फिल्टर:',
      complianceItems: 'अनुपालन आइटम',
      listView: 'सूची दृश्य',
      calendarView: 'कैलेंडर दृश्य',
      calendarViewTitle: 'कैलेंडर दृश्य',
      calendarViewDesc: 'अनुपालन समय सीमा के साथ कैलेंडर दृश्य यहाँ प्रदर्शित किया जाएगा',
      view: 'देखें',
      upload: 'अपलोड करें',
      download: 'डाउनलोड करें',
      requiredDocuments: 'आवश्यक दस्तावेज़:',
      dueDate: 'देय तिथि:',
      penalty: 'जुर्माना:',
      progress: 'प्रगति:',
      priority: 'प्राथमिकता',
      stats: {
        totalCompliances: 'कुल अनुपालन',
        pending: 'लंबित',
        overdue: 'अतिदेय',
        completed: 'पूर्ण'
      },
      status: {
        all: 'सभी स्थिति',
        pending: 'लंबित',
        inProgress: 'प्रगति में',
        completed: 'पूर्ण',
        overdue: 'अतिदेय'
      },
      priorities: {
        all: 'सभी प्राथमिकता',
        high: 'उच्च प्राथमिकता',
        medium: 'मध्यम प्राथमिकता',
        low: 'कम प्राथमिकता'
      },
      complianceList: {
        gstReturn: {
          title: 'जीएसटी रिटर्न फाइलिंग',
          description: 'जनवरी 2024 के महीने के लिए मासिक जीएसटी रिटर्न फाइलिंग'
        },
        pfReturn: {
          title: 'पीएफ रिटर्न फाइलिंग',
          description: 'जनवरी 2024 के लिए कर्मचारियों के लिए भविष्य निधि रिटर्न'
        },
        environmentalClearance: {
          title: 'पर्यावरण मंजूरी नवीनीकरण',
          description: 'वार्षिक पर्यावरण मंजूरी प्रमाणपत्र नवीनीकरण'
        },
        tradeLicense: {
          title: 'व्यापार लाइसेंस नवीनीकरण',
          description: 'व्यावसायिक संचालन के लिए नगरपालिका व्यापार लाइसेंस नवीनीकरण'
        },
        incomeTax: {
          title: 'आयकर रिटर्न',
          description: 'मूल्यांकन वर्ष 2024-25 के लिए वार्षिक आयकर रिटर्न फाइलिंग'
        },
        fireSafety: {
          title: 'अग्नि सुरक्षा प्रमाणपत्र',
          description: 'वार्षिक अग्नि सुरक्षा निरीक्षण और प्रमाणपत्र नवीनीकरण'
        }
      },
      documents: {
        salesRegister: 'बिक्री रजिस्टर',
        purchaseRegister: 'खरीद रजिस्टर',
        gstInvoices: 'जीएसटी चालान',
        employeeRegister: 'कर्मचारी रजिस्टर',
        salarySheets: 'वेतन पत्रक',
        pfChallans: 'पीएफ चालान',
        environmentalReport: 'पर्यावरणीय प्रभाव रिपोर्ट',
        complianceCertificate: 'अनुपालन प्रमाणपत्र',
        businessRegistration: 'व्यावसायिक पंजीकरण',
        propertyDocuments: 'संपत्ति दस्तावेज़',
        noc: 'एनओसी',
        form16: 'फॉर्म 16',
        investmentProofs: 'निवेश प्रमाण',
        bankStatements: 'बैंक विवरण',
        fireSafetyPlan: 'अग्नि सुरक्षा योजना',
        equipmentCertificates: 'उपकरण प्रमाणपत्र'
      },
      reminders: {
        gstDueTomorrow: 'जीएसटी रिटर्न कल देय है',
        pfDueIn3Days: 'पीएफ फाइलिंग 3 दिन में देय है',
        tradeLicenseDue: 'व्यापार लाइसेंस नवीनीकरण देय है'
      },
      daysOverdue: 'दिन अतिदेय',
      dueToday: 'आज देय',
      dueTomorrow: 'कल देय',
      dueInDays: 'देय में',
      days: 'दिन'
    }
  };

  const t = translations[language];
  const [selectedView, setSelectedView] = useState('calendar');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const complianceItems = [
    {
      id: 1,
      title: t.complianceList.gstReturn.title,
      description: t.complianceList.gstReturn.description,
      dueDate: '2024-02-15',
      priority: 'high',
      status: 'pending',
      category: 'tax',
      frequency: 'monthly',
      penalty: '₹1,000 per day',
      documents: [t.documents.salesRegister, t.documents.purchaseRegister, t.documents.gstInvoices],
      completedSteps: 2,
      totalSteps: 5
    },
    {
      id: 2,
      title: t.complianceList.pfReturn.title,
      description: t.complianceList.pfReturn.description,
      dueDate: '2024-02-20',
      priority: 'medium',
      status: 'in-progress',
      category: 'labor',
      frequency: 'monthly',
      penalty: '₹500 per day',
      documents: [t.documents.employeeRegister, t.documents.salarySheets, t.documents.pfChallans],
      completedSteps: 3,
      totalSteps: 4
    },
    {
      id: 3,
      title: t.complianceList.environmentalClearance.title,
      description: t.complianceList.environmentalClearance.description,
      dueDate: '2024-03-31',
      priority: 'high',
      status: 'completed',
      category: 'environmental',
      frequency: 'yearly',
      penalty: language === 'hi' ? 'लाइसेंस निलंबन' : 'License suspension',
      documents: [t.documents.environmentalReport, t.documents.complianceCertificate],
      completedSteps: 6,
      totalSteps: 6
    },
    {
      id: 4,
      title: t.complianceList.tradeLicense.title,
      description: t.complianceList.tradeLicense.description,
      dueDate: '2024-04-30',
      priority: 'medium',
      status: 'pending',
      category: 'municipal',
      frequency: 'yearly',
      penalty: '₹2,000 fine',
      documents: [t.documents.businessRegistration, t.documents.propertyDocuments, t.documents.noc],
      completedSteps: 0,
      totalSteps: 4
    },
    {
      id: 5,
      title: t.complianceList.incomeTax.title,
      description: t.complianceList.incomeTax.description,
      dueDate: '2024-07-31',
      priority: 'high',
      status: 'pending',
      category: 'tax',
      frequency: 'yearly',
      penalty: '₹5,000 + interest',
      documents: [t.documents.form16, t.documents.investmentProofs, t.documents.bankStatements],
      completedSteps: 1,
      totalSteps: 7
    },
    {
      id: 6,
      title: t.complianceList.fireSafety.title,
      description: t.complianceList.fireSafety.description,
      dueDate: '2024-06-15',
      priority: 'high',
      status: 'overdue',
      category: 'safety',
      frequency: 'yearly',
      penalty: language === 'hi' ? 'संचालन निलंबन' : 'Operations suspension',
      documents: [t.documents.fireSafetyPlan, t.documents.equipmentCertificates],
      completedSteps: 0,
      totalSteps: 3
    }
  ];

  const upcomingReminders = [
    {
      id: 1,
      title: t.reminders.gstDueTomorrow,
      date: '2024-02-15',
      type: 'urgent'
    },
    {
      id: 2,
      title: t.reminders.pfDueIn3Days,
      date: '2024-02-20',
      type: 'warning'
    },
    {
      id: 3,
      title: t.reminders.tradeLicenseDue,
      date: '2024-04-30',
      type: 'info'
    }
  ];

  const complianceStats = [
    {
      title: t.stats.totalCompliances,
      value: '12',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-600/10'
    },
    {
      title: t.stats.pending,
      value: '5',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-600/10'
    },
    {
      title: t.stats.overdue,
      value: '1',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-600/10'
    },
    {
      title: t.stats.completed,
      value: '6',
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-600/10'
    }
  ];

  const statusFilters = [
    { value: 'all', label: t.status.all },
    { value: 'pending', label: t.status.pending },
    { value: 'in-progress', label: t.status.inProgress },
    { value: 'completed', label: t.status.completed },
    { value: 'overdue', label: t.status.overdue }
  ];

  const priorityFilters = [
    { value: 'all', label: t.priorities.all },
    { value: 'high', label: t.priorities.high },
    { value: 'medium', label: t.priorities.medium },
    { value: 'low', label: t.priorities.low }
  ];

  const filteredItems = complianceItems.filter(item => {
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || item.priority === selectedPriority;
    return matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return t.status.completed;
      case 'in-progress': return t.status.inProgress;
      case 'pending': return t.status.pending;
      case 'overdue': return t.status.overdue;
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return language === 'hi' ? 'उच्च' : 'high';
      case 'medium': return language === 'hi' ? 'मध्यम' : 'medium';
      case 'low': return language === 'hi' ? 'कम' : 'low';
      default: return priority;
    }
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'warning': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'info': return <Bell className="w-4 h-4 text-blue-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} ${t.daysOverdue}`;
    if (diffDays === 0) return t.dueToday;
    if (diffDays === 1) return t.dueTomorrow;
    return `${t.dueInDays} ${diffDays} ${t.days}`;
  };

  return (
    <div className={`p-6 space-y-6 relative z-10 ${language === 'hi' ? 'lang-hi' : 'lang-en'}`}>
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
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              {t.refresh}
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              {t.addCompliance}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {complianceStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <h3 className="font-semibold text-foreground">{stat.title}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Reminders */}
        <Card className="bg-card/50 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-orange-600" />
              <span>{t.upcomingReminders}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingReminders.map((reminder) => (
                <Alert key={reminder.id} className="border-l-4 border-l-orange-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getReminderIcon(reminder.type)}
                      <div>
                        <p className="font-medium">{reminder.title}</p>
                        <p className="text-sm text-muted-foreground">{reminder.date}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {t.view}
                    </Button>
                  </div>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="bg-card/50 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{t.filters}</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusFilters.map((filter) => (
                      <SelectItem key={filter.value} value={filter.value}>
                        {filter.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityFilters.map((filter) => (
                      <SelectItem key={filter.value} value={filter.value}>
                        {filter.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Items */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t.complianceItems}</span>
              <Tabs value={selectedView} onValueChange={setSelectedView}>
                <TabsList>
                  <TabsTrigger value="list">{t.listView}</TabsTrigger>
                  <TabsTrigger value="calendar">{t.calendarView}</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedView}>
              <TabsContent value="list" className="mt-0">
                <div className="space-y-4">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="p-6 border-border/50 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-lg">{item.title}</h3>
                              <Badge className={getStatusColor(item.status)}>
                                {getStatusLabel(item.status)}
                              </Badge>
                              <Badge variant="outline" className={getPriorityColor(item.priority)}>
                                {getPriorityLabel(item.priority)} {t.priority}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-3">{item.description}</p>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">{t.dueDate}</span>
                                <p className="font-medium">{item.dueDate}</p>
                                <p className="text-xs text-muted-foreground">{getDaysUntilDue(item.dueDate)}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">{t.penalty}</span>
                                <p className="font-medium text-red-600">{item.penalty}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">{t.progress}</span>
                                <div className="flex items-center space-x-2 mt-1">
                                  <div className="flex-1 bg-muted rounded-full h-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full" 
                                      style={{ width: `${(item.completedSteps / item.totalSteps) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs font-medium">
                                    {item.completedSteps}/{item.totalSteps}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              {t.view}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Upload className="w-4 h-4 mr-1" />
                              {t.upload}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              {t.download}
                            </Button>
                          </div>
                        </div>
                        
                        {/* Document Checklist */}
                        <div className="border-t border-border pt-4">
                          <h4 className="font-medium mb-2">{t.requiredDocuments}</h4>
                          <div className="grid md:grid-cols-3 gap-2">
                            {item.documents.map((doc, docIndex) => (
                              <div key={doc} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`${item.id}-${docIndex}`}
                                  checked={docIndex < item.completedSteps}
                                />
                                <label 
                                  htmlFor={`${item.id}-${docIndex}`} 
                                  className="text-sm cursor-pointer"
                                >
                                  {doc}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="calendar" className="mt-0">
                <div className="text-center p-8 bg-muted/20 rounded-lg">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">{t.calendarViewTitle}</h3>
                  <p className="text-muted-foreground">
                    {t.calendarViewDesc}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}