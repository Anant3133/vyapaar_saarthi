import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  Bell,
  User,
  Calendar,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MessageSquare,
  Share,
  Download,
  Tag,
  Building2,
  Mail,
  Phone,
  FileText,
  Users,
  Flag,
  Archive,
  Forward,
  Reply,
  Star,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Textarea } from '../../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

interface AdminNotificationDetailProps {
  language: 'en' | 'hi';
  user: any;
  notificationId?: string;
  notificationType?: 'system' | 'user' | 'circular';
  onNavigate?: (page: string) => void;
  onBack?: () => void;
}

export function AdminNotificationDetail({ 
  language, 
  user, 
  notificationId, 
  notificationType = 'user',
  onNavigate, 
  onBack 
}: AdminNotificationDetailProps) {
  const [notification, setNotification] = useState<any>(null);
  const [reply, setReply] = useState('');
  const [isStarred, setIsStarred] = useState(false);
  const [isArchived, setIsArchived] = useState(false);

  const translations = {
    en: {
      backToNotifications: 'Back to Notifications',
      notificationDetails: 'Notification Details',
      overview: 'Overview',
      actions: 'Actions',
      history: 'History',
      relatedItems: 'Related Items',
      markAsRead: 'Mark as Read',
      markAsUnread: 'Mark as Unread',
      star: 'Star',
      unstar: 'Unstar',
      archive: 'Archive',
      unarchive: 'Unarchive',
      forward: 'Forward',
      reply: 'Reply',
      delete: 'Delete',
      share: 'Share',
      download: 'Download',
      exportDetails: 'Export Details',
      notificationInfo: 'Notification Information',
      senderInfo: 'Sender Information',
      recipientInfo: 'Recipient Information',
      systemInfo: 'System Information',
      priority: 'Priority',
      status: 'Status',
      category: 'Category',
      timestamp: 'Timestamp',
      readStatus: 'Read Status',
      department: 'Department',
      subject: 'Subject',
      message: 'Message',
      attachments: 'Attachments',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      role: 'Role',
      applicationId: 'Application ID',
      licenseType: 'License Type',
      businessName: 'Business Name',
      replyPlaceholder: 'Type your reply...',
      sendReply: 'Send Reply',
      addComment: 'Add Comment',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      read: 'Read',
      unread: 'Unread',
      new: 'New',
      processed: 'Processed',
      closed: 'Closed',
      systemAlert: 'System Alert',
      userNotification: 'User Notification',
      governmentCircular: 'Government Circular',
      applicationSubmitted: 'Application Submitted',
      documentRequired: 'Document Required',
      statusUpdate: 'Status Update',
      complianceAlert: 'Compliance Alert',
      paymentReceived: 'Payment Received',
      relatedApplications: 'Related Applications',
      relatedDocuments: 'Related Documents',
      actionHistory: 'Action History',
      viewApplication: 'View Application',
      viewDocument: 'View Document',
      downloadAttachment: 'Download Attachment'
    },
    hi: {
      backToNotifications: 'अधिसूचनाओं पर वापस',
      notificationDetails: 'अधिसूचना विवरण',
      overview: 'अवलोकन',
      actions: 'कार्य',
      history: 'इतिहास',
      relatedItems: 'संबंधित आइटम',
      markAsRead: 'पढ़े गए के रूप में चिह्नित करें',
      markAsUnread: 'अपठित के रूप में चिह्नित करें',
      star: 'तारांकित करें',
      unstar: 'तारांकित हटाएं',
      archive: 'संग्रहीत करें',
      unarchive: 'संग्रह से हटाएं',
      forward: 'आगे भेजें',
      reply: 'उत्तर दें',
      delete: 'हटाएं',
      share: 'साझा करें',
      download: 'डाउनलोड',
      exportDetails: 'विवरण निर्यात करें',
      notificationInfo: 'अधिसूचना की जानकारी',
      senderInfo: 'भेजने वाले की जानकारी',
      recipientInfo: 'प्राप्तकर्ता की जानकारी',
      systemInfo: 'सिस्टम की जानकारी',
      priority: 'प्राथमिकता',
      status: 'स्थिति',
      category: 'श्रेणी',
      timestamp: 'समयांक',
      readStatus: 'पठन स्थिति',
      department: 'विभाग',
      subject: 'विषय',
      message: 'संदेश',
      attachments: 'अनुलग्नक',
      name: 'नाम',
      email: 'ईमेल',
      phone: 'फोन',
      role: 'भूमिका',
      applicationId: 'आवेदन आईडी',
      licenseType: 'लाइसेंस प्रकार',
      businessName: 'व्यवसाय का नाम',
      replyPlaceholder: 'अपना उत्तर टाइप करें...',
      sendReply: 'उत्तर भेजें',
      addComment: 'टिप्पणी जोड़ें',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'निम्न',
      read: 'पढ़ा गया',
      unread: 'अपठित',
      new: 'नया',
      processed: 'प्रसंस्करित',
      closed: 'बंद',
      systemAlert: 'सिस्टम अलर्ट',
      userNotification: 'उपयोगकर्ता अधिसूचना',
      governmentCircular: 'सरकारी परिपत्र',
      applicationSubmitted: 'आवेदन जमा किया गया',
      documentRequired: 'दस्तावेज़ आवश्यक',
      statusUpdate: 'स्थिति अपडेट',
      complianceAlert: 'अनुपालन अलर्ट',
      paymentReceived: 'भुगतान प्राप्त',
      relatedApplications: 'संबंधित आवेदन',
      relatedDocuments: 'संबंधित दस्तावेज़',
      actionHistory: 'कार्य इतिहास',
      viewApplication: 'आवेदन देखें',
      viewDocument: 'दस्तावेज़ देखें',
      downloadAttachment: 'अनुलग्नक डाउनलोड करें'
    }
  };

  const t = translations[language];

  // Mock notification data - in real app, this would be fetched based on notificationId
  useEffect(() => {
    // Simulate fetching notification data
    const mockNotification = {
      id: notificationId || 'NOT-2024-001',
      type: notificationType,
      title: language === 'hi' ? 'नया लाइसेंस आवेदन प्राप्त' : 'New License Application Received',
      message: language === 'hi' 
        ? 'एक नया ट्रेड लाइसेंस आवेदन जमा किया गया है और आपकी समीक्षा की प्रतीक्षा कर रहा है। आवेदन आईडी: APP-2024-021'
        : 'A new trade license application has been submitted and is awaiting your review. Application ID: APP-2024-021',
      priority: 'high',
      status: 'unread',
      category: 'applicationSubmitted',
      timestamp: '2024-12-23T10:30:00Z',
      department: 'MCD',
      sender: {
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@digitalmarketing.com',
        phone: '+91-9876543210',
        role: 'Business Owner',
        businessName: 'Digital Marketing Agency'
      },
      applicationData: {
        id: 'APP-2024-021',
        licenseType: 'Trade License',
        businessName: 'Digital Marketing Agency',
        status: 'pending'
      },
      attachments: [
        'application_form_APP-2024-021.pdf',
        'business_registration_certificate.pdf',
        'address_proof.pdf'
      ],
      relatedItems: [
        { type: 'application', id: 'APP-2024-021', title: 'Trade License Application' },
        { type: 'document', id: 'DOC-001', title: 'Business Registration Certificate' }
      ],
      history: [
        {
          action: 'submitted',
          timestamp: '2024-12-23T10:30:00Z',
          user: 'Rajesh Kumar',
          details: 'Application submitted for review'
        },
        {
          action: 'notification_sent',
          timestamp: '2024-12-23T10:31:00Z',
          user: 'System',
          details: 'Notification sent to reviewing officer'
        }
      ]
    };
    
    setNotification(mockNotification);
    setIsStarred(false);
    setIsArchived(false);
  }, [notificationId, notificationType, language]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'read': return 'text-green-600 bg-green-100 border-green-200';
      case 'unread': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'new': return 'text-purple-600 bg-purple-100 border-purple-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'markRead':
        setNotification(prev => ({ ...prev, status: 'read' }));
        break;
      case 'markUnread':
        setNotification(prev => ({ ...prev, status: 'unread' }));
        break;
      case 'star':
        setIsStarred(!isStarred);
        break;
      case 'archive':
        setIsArchived(!isArchived);
        break;
      case 'reply':
        if (reply.trim()) {
          console.log('Sending reply:', reply);
          setReply('');
        }
        break;
      default:
        console.log('Action:', action);
    }
  };

  if (!notification) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {language === 'hi' ? 'अधिसूचना नहीं मिली' : 'Notification not found'}
          </p>
          <Button className="mt-4" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToNotifications}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToNotifications}
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{t.notificationDetails}</h1>
                <p className="text-muted-foreground">{notification.id}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAction('star')}
                className={isStarred ? 'text-yellow-600' : ''}
              >
                <Star className={`w-4 h-4 mr-2 ${isStarred ? 'fill-current' : ''}`} />
                {isStarred ? t.unstar : t.star}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleAction('share')}>
                <Share className="w-4 h-4 mr-2" />
                {t.share}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleAction('export')}>
                <Download className="w-4 h-4 mr-2" />
                {t.exportDetails}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <div className="border-b bg-white px-6 py-4">
              <TabsList>
                <TabsTrigger value="overview">{t.overview}</TabsTrigger>
                <TabsTrigger value="actions">{t.actions}</TabsTrigger>
                <TabsTrigger value="history">{t.history}</TabsTrigger>
                <TabsTrigger value="related">{t.relatedItems}</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="overview" className="mt-0 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Notification Status */}
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle className="text-lg">{t.notificationInfo}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className={getPriorityColor(notification.priority)}>
                          {t[notification.priority as keyof typeof t]}
                        </Badge>
                        <Badge className={getStatusColor(notification.status)}>
                          {t[notification.status as keyof typeof t]}
                        </Badge>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.category}</span>
                          <span>{t[notification.category as keyof typeof t] || notification.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.timestamp}</span>
                          <span>{new Date(notification.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.department}</span>
                          <span>{notification.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.readStatus}</span>
                          <span className={notification.status === 'read' ? 'text-green-600' : 'text-blue-600'}>
                            {t[notification.status as keyof typeof t]}
                          </span>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleAction(notification.status === 'read' ? 'markUnread' : 'markRead')}
                        >
                          {notification.status === 'read' ? (
                            <>
                              <XCircle className="w-4 h-4 mr-2" />
                              {t.markAsUnread}
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              {t.markAsRead}
                            </>
                          )}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleAction('archive')}
                        >
                          <Archive className="w-4 h-4 mr-2" />
                          {isArchived ? t.unarchive : t.archive}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notification Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Message Content */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <MessageSquare className="w-5 h-5 mr-2" />
                          {notification.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">{notification.message}</p>
                      </CardContent>
                    </Card>

                    {/* Sender Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <User className="w-5 h-5 mr-2" />
                          {t.senderInfo}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${notification.sender.name}`} />
                            <AvatarFallback>
                              {notification.sender.name.split(' ').map((n: string) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            <div>
                              <label className="text-sm text-muted-foreground">{t.name}</label>
                              <p className="font-medium">{notification.sender.name}</p>
                            </div>
                            <div>
                              <label className="text-sm text-muted-foreground">{t.email}</label>
                              <p className="font-medium">{notification.sender.email}</p>
                            </div>
                            <div>
                              <label className="text-sm text-muted-foreground">{t.phone}</label>
                              <p className="font-medium">{notification.sender.phone}</p>
                            </div>
                            <div>
                              <label className="text-sm text-muted-foreground">{t.role}</label>
                              <p className="font-medium">{notification.sender.role}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Application Data (if applicable) */}
                    {notification.applicationData && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            {language === 'hi' ? 'संबंधित आवेदन' : 'Related Application'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm text-muted-foreground">{t.applicationId}</label>
                              <p className="font-medium">{notification.applicationData.id}</p>
                            </div>
                            <div>
                              <label className="text-sm text-muted-foreground">{t.licenseType}</label>
                              <p className="font-medium">{notification.applicationData.licenseType}</p>
                            </div>
                            <div>
                              <label className="text-sm text-muted-foreground">{t.businessName}</label>
                              <p className="font-medium">{notification.applicationData.businessName}</p>
                            </div>
                            <div>
                              <label className="text-sm text-muted-foreground">{t.status}</label>
                              <Badge className="ml-2">
                                {notification.applicationData.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button size="sm" onClick={() => onNavigate?.(`admin-application-detail?id=${notification.applicationData.id}`)}>
                              <Eye className="w-4 h-4 mr-2" />
                              {t.viewApplication}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Attachments */}
                    {notification.attachments && notification.attachments.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            {t.attachments}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {notification.attachments.map((attachment: string, index: number) => (
                              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <FileText className="w-5 h-5 text-blue-600" />
                                  <span className="font-medium">{attachment}</span>
                                </div>
                                <Button size="sm" variant="outline">
                                  <Download className="w-4 h-4 mr-1" />
                                  {t.downloadAttachment}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="actions" className="mt-0 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.reply}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        placeholder={t.replyPlaceholder}
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        rows={4}
                      />
                      <Button onClick={() => handleAction('reply')} disabled={!reply.trim()}>
                        <Reply className="w-4 h-4 mr-2" />
                        {t.sendReply}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full" onClick={() => handleAction('forward')}>
                        <Forward className="w-4 h-4 mr-2" />
                        {t.forward}
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => handleAction('archive')}>
                        <Archive className="w-4 h-4 mr-2" />
                        {isArchived ? t.unarchive : t.archive}
                      </Button>
                      <Button variant="outline" className="w-full text-red-600" onClick={() => handleAction('delete')}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        {t.delete}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-0 p-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      {t.actionHistory}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notification.history.map((item: any, index: number) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="font-medium">{item.details}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                              <span>{item.user}</span>
                              <span>{new Date(item.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="related" className="mt-0 p-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        {t.relatedApplications}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {notification.relatedItems
                          .filter((item: any) => item.type === 'application')
                          .map((item: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FileText className="w-5 h-5 text-blue-600" />
                                <div>
                                  <p className="font-medium">{item.title}</p>
                                  <p className="text-sm text-muted-foreground">{item.id}</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                {t.viewApplication}
                              </Button>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        {t.relatedDocuments}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {notification.relatedItems
                          .filter((item: any) => item.type === 'document')
                          .map((item: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FileText className="w-5 h-5 text-green-600" />
                                <div>
                                  <p className="font-medium">{item.title}</p>
                                  <p className="text-sm text-muted-foreground">{item.id}</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                {t.viewDocument}
                              </Button>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}