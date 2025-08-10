// Real-time Data Integration Service for live portal data
interface PortalData {
  applications: ApplicationData[];
  compliance: ComplianceData[];
  schemes: SchemeData[];
  notifications: NotificationData[];
  userProfile: UserProfileData;
}

interface ApplicationData {
  id: string;
  type: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'resubmission_required';
  submissionDate: string;
  lastUpdate: string;
  currentStage: string;
  nextAction: string;
  documentsRequired: string[];
  documentsSubmitted: string[];
  estimatedCompletion: string;
  officer: {
    name: string;
    contactEmail: string;
    department: string;
  };
  fees: {
    total: number;
    paid: number;
    pending: number;
  };
  timeline: {
    stage: string;
    date: string;
    status: 'completed' | 'current' | 'pending';
    remarks?: string;
  }[];
}

interface ComplianceData {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue' | 'not_applicable';
  priority: 'high' | 'medium' | 'low';
  description: string;
  requirements: string[];
  penalties: string;
  remindersSent: number;
  lastReminderDate?: string;
  completionDate?: string;
  documents: {
    name: string;
    required: boolean;
    submitted: boolean;
    validUntil?: string;
  }[];
}

interface SchemeData {
  id: string;
  title: string;
  category: string;
  eligibilityScore: number;
  maxBenefit: string;
  applicationDeadline: string;
  status: 'available' | 'applied' | 'approved' | 'rejected' | 'expired';
  requirements: string[];
  benefits: string[];
  applicationProcess: string[];
  contactInfo: {
    department: string;
    phone: string;
    email: string;
  };
}

interface NotificationData {
  id: string;
  type: 'application_update' | 'compliance_reminder' | 'scheme_alert' | 'system_announcement';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionRequired: boolean;
  actionUrl?: string;
}

interface UserProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  industryCategory: string;
  registrationDate: string;
  location: {
    state: string;
    city: string;
    pincode: string;
  };
  preferences: {
    language: 'en' | 'hi';
    notificationMethods: string[];
    autoReminders: boolean;
  };
}

export class DataIntegrationService {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();
  private subscribers: Map<string, Function[]> = new Map();
  private wsConnection: WebSocket | null = null;

  constructor() {
    this.initializeWebSocket();
    this.loadInitialData();
  }

  private initializeWebSocket() {
    // In a real implementation, this would connect to the actual WebSocket server
    // For now, we'll simulate real-time updates
    this.simulateRealTimeUpdates();
  }

  private simulateRealTimeUpdates() {
    // Simulate periodic data updates
    setInterval(() => {
      this.notifySubscribers('applications', this.getSimulatedApplicationUpdate());
      this.notifySubscribers('notifications', this.getSimulatedNotification());
    }, 30000); // Update every 30 seconds
  }

  private getSimulatedApplicationUpdate(): Partial<ApplicationData> {
    const updates = [
      { status: 'under_review' as const, currentStage: 'Document Verification', nextAction: 'Await verification completion' },
      { status: 'approved' as const, currentStage: 'Completed', nextAction: 'Download certificate' },
      { status: 'resubmission_required' as const, currentStage: 'Document Review', nextAction: 'Submit additional documents' }
    ];
    
    return updates[Math.floor(Math.random() * updates.length)];
  }

  private getSimulatedNotification(): NotificationData {
    const notifications = [
      {
        id: Date.now().toString(),
        type: 'application_update' as const,
        title: 'Application Status Update',
        message: 'Your Trade License application has moved to document verification stage',
        timestamp: new Date().toISOString(),
        read: false,
        priority: 'medium' as const,
        actionRequired: false
      },
      {
        id: (Date.now() + 1).toString(),
        type: 'compliance_reminder' as const,
        title: 'Compliance Deadline Approaching',
        message: 'GST return filing is due in 3 days',
        timestamp: new Date().toISOString(),
        read: false,
        priority: 'high' as const,
        actionRequired: true,
        actionUrl: '/compliance'
      }
    ];
    
    return notifications[Math.floor(Math.random() * notifications.length)];
  }

  private loadInitialData() {
    // Load initial mock data
    this.setCache('applications', this.getMockApplications(), 5 * 60 * 1000); // 5 minutes TTL
    this.setCache('compliance', this.getMockCompliance(), 10 * 60 * 1000); // 10 minutes TTL
    this.setCache('schemes', this.getMockSchemes(), 30 * 60 * 1000); // 30 minutes TTL
    this.setCache('userProfile', this.getMockUserProfile(), 60 * 60 * 1000); // 1 hour TTL
  }

  private setCache(key: string, data: any, ttl: number) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  private getCache(key: string): any {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  public subscribe(dataType: string, callback: Function) {
    if (!this.subscribers.has(dataType)) {
      this.subscribers.set(dataType, []);
    }
    this.subscribers.get(dataType)!.push(callback);
  }

  public unsubscribe(dataType: string, callback: Function) {
    const callbacks = this.subscribers.get(dataType);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private notifySubscribers(dataType: string, data: any) {
    const callbacks = this.subscribers.get(dataType);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  // Public API methods for the chatbot
  public async getApplicationStatus(applicationId?: string): Promise<ApplicationData[]> {
    let applications = this.getCache('applications');
    
    if (!applications) {
      applications = await this.fetchApplications();
      this.setCache('applications', applications, 5 * 60 * 1000);
    }
    
    if (applicationId) {
      return applications.filter((app: ApplicationData) => app.id === applicationId);
    }
    
    return applications;
  }

  public async getComplianceItems(status?: string): Promise<ComplianceData[]> {
    let compliance = this.getCache('compliance');
    
    if (!compliance) {
      compliance = await this.fetchCompliance();
      this.setCache('compliance', compliance, 10 * 60 * 1000);
    }
    
    if (status) {
      return compliance.filter((item: ComplianceData) => item.status === status);
    }
    
    return compliance;
  }

  public async getAvailableSchemes(category?: string): Promise<SchemeData[]> {
    let schemes = this.getCache('schemes');
    
    if (!schemes) {
      schemes = await this.fetchSchemes();
      this.setCache('schemes', schemes, 30 * 60 * 1000);
    }
    
    if (category) {
      return schemes.filter((scheme: SchemeData) => scheme.category === category);
    }
    
    return schemes.filter((scheme: SchemeData) => scheme.status === 'available');
  }

  public async getUserProfile(): Promise<UserProfileData> {
    let profile = this.getCache('userProfile');
    
    if (!profile) {
      profile = await this.fetchUserProfile();
      this.setCache('userProfile', profile, 60 * 60 * 1000);
    }
    
    return profile;
  }

  public async getNotifications(unreadOnly: boolean = false): Promise<NotificationData[]> {
    let notifications = this.getCache('notifications') || [];
    
    if (unreadOnly) {
      return notifications.filter((notif: NotificationData) => !notif.read);
    }
    
    return notifications;
  }

  // Real-time action methods
  public async markNotificationAsRead(notificationId: string): Promise<boolean> {
    try {
      // In real implementation, this would make an API call
      const notifications = this.getCache('notifications') || [];
      const updated = notifications.map((notif: NotificationData) => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      );
      this.setCache('notifications', updated, 5 * 60 * 1000);
      return true;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
  }

  public async submitDocumentForApplication(applicationId: string, documentType: string, file: File): Promise<boolean> {
    try {
      // Simulate document upload
      console.log(`Uploading ${documentType} for application ${applicationId}`);
      
      // Update application status
      const applications = this.getCache('applications') || [];
      const updated = applications.map((app: ApplicationData) => {
        if (app.id === applicationId) {
          return {
            ...app,
            documentsSubmitted: [...app.documentsSubmitted, documentType],
            lastUpdate: new Date().toISOString()
          };
        }
        return app;
      });
      
      this.setCache('applications', updated, 5 * 60 * 1000);
      this.notifySubscribers('applications', { type: 'document_uploaded', applicationId, documentType });
      
      return true;
    } catch (error) {
      console.error('Error uploading document:', error);
      return false;
    }
  }

  public async setComplianceReminder(complianceId: string, reminderDate: string): Promise<boolean> {
    try {
      // In real implementation, this would schedule a reminder
      console.log(`Setting reminder for compliance ${complianceId} on ${reminderDate}`);
      
      const compliance = this.getCache('compliance') || [];
      const updated = compliance.map((item: ComplianceData) => {
        if (item.id === complianceId) {
          return {
            ...item,
            lastReminderDate: reminderDate,
            remindersSent: item.remindersSent + 1
          };
        }
        return item;
      });
      
      this.setCache('compliance', updated, 10 * 60 * 1000);
      return true;
    } catch (error) {
      console.error('Error setting reminder:', error);
      return false;
    }
  }

  // Mock data generators (in real implementation, these would be API calls)
  private async fetchApplications(): Promise<ApplicationData[]> {
    return this.getMockApplications();
  }

  private async fetchCompliance(): Promise<ComplianceData[]> {
    return this.getMockCompliance();
  }

  private async fetchSchemes(): Promise<SchemeData[]> {
    return this.getMockSchemes();
  }

  private async fetchUserProfile(): Promise<UserProfileData> {
    return this.getMockUserProfile();
  }

  private getMockApplications(): ApplicationData[] {
    return [
      {
        id: 'APP001',
        type: 'Trade License',
        status: 'under_review',
        submissionDate: '2024-01-15T10:30:00Z',
        lastUpdate: '2024-01-20T14:15:00Z',
        currentStage: 'Document Verification',
        nextAction: 'Await verification completion',
        documentsRequired: ['Business Registration', 'Address Proof', 'Identity Proof', 'Property Documents'],
        documentsSubmitted: ['Business Registration', 'Address Proof', 'Identity Proof'],
        estimatedCompletion: '2024-02-15',
        officer: {
          name: 'Rajesh Kumar',
          contactEmail: 'rajesh.kumar@municipal.gov.in',
          department: 'Municipal Corporation'
        },
        fees: {
          total: 2500,
          paid: 2500,
          pending: 0
        },
        timeline: [
          { stage: 'Application Submitted', date: '2024-01-15', status: 'completed' },
          { stage: 'Fee Payment', date: '2024-01-15', status: 'completed' },
          { stage: 'Document Verification', date: '2024-01-18', status: 'current', remarks: 'Property documents pending' },
          { stage: 'Site Inspection', date: '', status: 'pending' },
          { stage: 'Final Approval', date: '', status: 'pending' }
        ]
      },
      {
        id: 'APP002',
        type: 'GST Registration',
        status: 'approved',
        submissionDate: '2024-01-10T09:00:00Z',
        lastUpdate: '2024-01-17T16:45:00Z',
        currentStage: 'Completed',
        nextAction: 'Download GST certificate',
        documentsRequired: ['PAN Card', 'Aadhar Card', 'Bank Statement', 'Business Registration'],
        documentsSubmitted: ['PAN Card', 'Aadhar Card', 'Bank Statement', 'Business Registration'],
        estimatedCompletion: '2024-01-17',
        officer: {
          name: 'Priya Sharma',
          contactEmail: 'priya.sharma@gst.gov.in',
          department: 'GST Department'
        },
        fees: {
          total: 0,
          paid: 0,
          pending: 0
        },
        timeline: [
          { stage: 'Application Submitted', date: '2024-01-10', status: 'completed' },
          { stage: 'Document Verification', date: '2024-01-12', status: 'completed' },
          { stage: 'Processing', date: '2024-01-15', status: 'completed' },
          { stage: 'Approved', date: '2024-01-17', status: 'completed', remarks: 'GST Number: 27XXXXX1234X1Z5' }
        ]
      }
    ];
  }

  private getMockCompliance(): ComplianceData[] {
    return [
      {
        id: 'COMP001',
        title: 'GST Return Filing',
        category: 'Taxation',
        dueDate: '2024-02-20',
        status: 'pending',
        priority: 'high',
        description: 'Monthly GST return filing for January 2024',
        requirements: ['Sales Register', 'Purchase Register', 'GST Invoices', 'Input Tax Credit Details'],
        penalties: 'Late fees: ₹200 per day + 18% GST',
        remindersSent: 2,
        lastReminderDate: '2024-02-15',
        documents: [
          { name: 'Sales Register', required: true, submitted: true },
          { name: 'Purchase Register', required: true, submitted: true },
          { name: 'GST Invoices', required: true, submitted: false },
          { name: 'Input Tax Credit Details', required: true, submitted: false }
        ]
      },
      {
        id: 'COMP002',
        title: 'PF Return Filing',
        category: 'Labor',
        dueDate: '2024-02-25',
        status: 'pending',
        priority: 'medium',
        description: 'Provident Fund return for employees for January 2024',
        requirements: ['Employee Register', 'Salary Sheets', 'PF Contributions'],
        penalties: 'Damage charges: 5% to 25% of the contribution amount',
        remindersSent: 1,
        lastReminderDate: '2024-02-18',
        documents: [
          { name: 'Employee Register', required: true, submitted: true },
          { name: 'Salary Sheets', required: true, submitted: true },
          { name: 'PF Contributions', required: true, submitted: false }
        ]
      }
    ];
  }

  private getMockSchemes(): SchemeData[] {
    return [
      {
        id: 'SCH001',
        title: 'Startup India Scheme',
        category: 'Startup Support',
        eligibilityScore: 85,
        maxBenefit: '₹50 Lakhs',
        applicationDeadline: '2024-03-31',
        status: 'available',
        requirements: [
          'Company incorporated as Private Limited/LLP',
          'Annual turnover not exceeding ₹100 Cr',
          'Not more than 10 years old',
          'Working on innovation/development'
        ],
        benefits: [
          'Income tax exemption for 3 consecutive years',
          'Patent filing fast-track process',
          'Easy compliance and labor law exemptions',
          'Access to government tenders'
        ],
        applicationProcess: [
          'Register on Startup India portal',
          'Submit incorporation certificate',
          'Provide business details and innovation proof',
          'Await recognition certificate'
        ],
        contactInfo: {
          department: 'Department for Promotion of Industry and Internal Trade',
          phone: '+91-11-23062048',
          email: 'startupindia@gov.in'
        }
      },
      {
        id: 'SCH002',
        title: 'MSME Development Scheme',
        category: 'MSME Support',
        eligibilityScore: 92,
        maxBenefit: '₹25 Lakhs',
        applicationDeadline: '2024-06-30',
        status: 'available',
        requirements: [
          'Valid MSME registration',
          'Manufacturing or service enterprise',
          'Project cost within prescribed limits',
          'Promoters contribution minimum 25%'
        ],
        benefits: [
          'Collateral-free loans up to ₹2 Cr',
          'Technology upgradation support',
          'Marketing assistance for exports',
          'Skill development programs'
        ],
        applicationProcess: [
          'Complete MSME registration',
          'Prepare detailed project report',
          'Submit application to designated bank',
          'Complete documentation and verification'
        ],
        contactInfo: {
          department: 'Ministry of Micro, Small and Medium Enterprises',
          phone: '+91-11-23061301',
          email: 'msme@gov.in'
        }
      }
    ];
  }

  private getMockUserProfile(): UserProfileData {
    return {
      id: 'USER001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91-9876543210',
      businessName: 'TechStart Solutions Pvt Ltd',
      businessType: 'Private Limited Company',
      industryCategory: 'Information Technology',
      registrationDate: '2023-06-15',
      location: {
        state: 'Maharashtra',
        city: 'Mumbai',
        pincode: '400001'
      },
      preferences: {
        language: 'en',
        notificationMethods: ['email', 'sms', 'push'],
        autoReminders: true
      }
    };
  }

  public disconnect() {
    if (this.wsConnection) {
      this.wsConnection.close();
    }
    this.cache.clear();
    this.subscribers.clear();
  }
}

// Singleton instance
export const dataIntegrationService = new DataIntegrationService();