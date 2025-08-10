// Shared state management for real-time updates between business and government portals
import { departments, licenseTypes, getDepartmentByLicenseType } from './department-mapping';

interface Application {
  id: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  businessType: string;
  licenseType: string;
  licenseTypeId: string;
  businessName: string;
  businessAddress: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-review' | 'document-required';
  priority: 'high' | 'medium' | 'low';
  assignedOfficer?: string;
  rejectionReason?: string;
  approvalMessage?: string;
  submittedBy: string;
  documents: any[];
  applicationData: any;
  department: string;
  processingTime: string;
  fees: string;
  lastUpdated: string;
  daysElapsed: number;
}

interface Complaint {
  id: string;
  complainantName: string;
  complainantEmail: string;
  complainantPhone: string;
  subject: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  submissionDate: string;
  submittedBy: string;
  responses: ComplaintResponse[];
  department?: string;
  relatedApplicationId?: string;
}

interface ComplaintResponse {
  id: string;
  message: string;
  sentBy: string;
  sentByRole: 'business' | 'government';
  timestamp: string;
}

class SharedStateManager {
  private applications: Application[] = [];
  private complaints: Complaint[] = [];
  private listeners: { [key: string]: Function[] } = {
    applications: [],
    complaints: []
  };

  // Application Management
  addApplication(application: Omit<Application, 'id' | 'submissionDate' | 'status' | 'lastUpdated' | 'daysElapsed'>): Application {
    const department = getDepartmentByLicenseType(application.licenseTypeId);
    const submissionDate = new Date();
    
    const newApplication: Application = {
      ...application,
      id: `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      submissionDate: submissionDate.toISOString(),
      status: 'pending',
      priority: this.calculatePriority(application.licenseTypeId),
      assignedOfficer: 'Auto-assigned',
      department: department?.id || 'general',
      lastUpdated: submissionDate.toISOString(),
      daysElapsed: 0
    };
    
    this.applications.unshift(newApplication);
    this.notifyListeners('applications');
    return newApplication;
  }

  private calculatePriority(licenseTypeId: string): 'high' | 'medium' | 'low' {
    const highPriorityTypes = ['fire-safety-noc', 'pollution-noc', 'drug-license-retail', 'liquor-license'];
    const mediumPriorityTypes = ['factory-license', 'fssai-license', 'entertainment-license'];
    
    if (highPriorityTypes.includes(licenseTypeId)) return 'high';
    if (mediumPriorityTypes.includes(licenseTypeId)) return 'medium';
    return 'low';
  }

  getApplications(): Application[] {
    return [...this.applications];
  }

  getApplicationsByDepartment(departmentId: string): Application[] {
    return this.applications.filter(app => app.department === departmentId);
  }

  getApplicationById(id: string): Application | undefined {
    return this.applications.find(app => app.id === id);
  }

  updateApplicationStatus(id: string, status: Application['status'], message?: string, updatedBy?: string): boolean {
    const appIndex = this.applications.findIndex(app => app.id === id);
    if (appIndex !== -1) {
      this.applications[appIndex].status = status;
      this.applications[appIndex].lastUpdated = new Date().toISOString();
      
      if (status === 'rejected' && message) {
        this.applications[appIndex].rejectionReason = message;
      }
      if (status === 'approved' && message) {
        this.applications[appIndex].approvalMessage = message;
      }
      if (updatedBy) {
        this.applications[appIndex].assignedOfficer = updatedBy;
      }
      
      this.notifyListeners('applications');
      return true;
    }
    return false;
  }

  // Complaint Management
  addComplaint(complaint: Omit<Complaint, 'id' | 'submissionDate' | 'status' | 'responses'>): Complaint {
    const newComplaint: Complaint = {
      ...complaint,
      id: `COMP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      submissionDate: new Date().toISOString(),
      status: 'open',
      responses: []
    };
    
    this.complaints.unshift(newComplaint);
    this.notifyListeners('complaints');
    return newComplaint;
  }

  getComplaints(): Complaint[] {
    return [...this.complaints];
  }

  getComplaintsByDepartment(departmentId: string): Complaint[] {
    return this.complaints.filter(comp => comp.department === departmentId);
  }

  getComplaintById(id: string): Complaint | undefined {
    return this.complaints.find(comp => comp.id === id);
  }

  addComplaintResponse(complaintId: string, response: Omit<ComplaintResponse, 'id' | 'timestamp'>): boolean {
    const complaintIndex = this.complaints.findIndex(comp => comp.id === complaintId);
    if (complaintIndex !== -1) {
      const newResponse: ComplaintResponse = {
        ...response,
        id: `RESP-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        timestamp: new Date().toISOString()
      };
      
      this.complaints[complaintIndex].responses.push(newResponse);
      this.complaints[complaintIndex].status = 'in-progress';
      this.notifyListeners('complaints');
      return true;
    }
    return false;
  }

  updateComplaintStatus(id: string, status: Complaint['status']): boolean {
    const complaintIndex = this.complaints.findIndex(comp => comp.id === id);
    if (complaintIndex !== -1) {
      this.complaints[complaintIndex].status = status;
      this.notifyListeners('complaints');
      return true;
    }
    return false;
  }

  // Listener Management
  addListener(type: 'applications' | 'complaints', callback: Function): () => void {
    this.listeners[type].push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners[type].indexOf(callback);
      if (index > -1) {
        this.listeners[type].splice(index, 1);
      }
    };
  }

  private notifyListeners(type: 'applications' | 'complaints'): void {
    this.listeners[type].forEach(callback => callback());
  }

  // Initialize with department-specific demo data
  initializeDemoData(): void {
    // Add demo applications for different departments (expanded set for realistic volumes)
    const demoApplications = [
      {
        applicantName: 'Raj Enterprises Pvt Ltd',
        applicantEmail: 'contact@rajenterprises.com',
        applicantPhone: '+91 98765 43210',
        businessType: 'Manufacturing',
        licenseType: 'Trade License',
        licenseTypeId: 'trade-license',
        businessName: 'Raj Manufacturing Unit',
        businessAddress: '123 Industrial Area, Mayapuri, Delhi - 110064',
        submittedBy: 'demo-business-user',
        documents: ['business_registration.pdf', 'address_proof.pdf', 'fire_noc.pdf'],
        applicationData: {
          businessDetails: {
            name: 'Raj Manufacturing Unit',
            type: 'Manufacturing',
            address: '123 Industrial Area, Mayapuri, Delhi - 110064',
            pincode: '110064',
            phone: '+91 98765 43210',
            email: 'contact@rajenterprises.com'
          },
          licenseDetails: {
            type: 'Trade License',
            category: 'Manufacturing',
            duration: '5 years'
          }
        },
        processingTime: '15-30 days',
        fees: '₹2500'
      },
      {
        applicantName: 'Green Food Restaurant',
        applicantEmail: 'info@greenfood.com',
        applicantPhone: '+91 87654 32109',
        businessType: 'Restaurant',
        licenseType: 'FSSAI License (Food Business License)',
        licenseTypeId: 'fssai-license',
        businessName: 'Green Food Restaurant',
        businessAddress: '45 Connaught Place, New Delhi - 110001',
        submittedBy: 'demo-business-user-2',
        documents: ['fssai_application.pdf', 'business_registration.pdf', 'food_safety_plan.pdf'],
        applicationData: {
          businessDetails: {
            name: 'Green Food Restaurant',
            type: 'Restaurant',
            address: '45 Connaught Place, New Delhi - 110001',
            pincode: '110001',
            phone: '+91 87654 32109',
            email: 'info@greenfood.com'
          },
          licenseDetails: {
            type: 'FSSAI License',
            category: 'Food Business',
            duration: '3 years'
          }
        },
        processingTime: '60 days',
        fees: '₹2000'
      },
      {
        applicantName: 'Delhi Chemicals Ltd',
        applicantEmail: 'admin@delhichemicals.com',
        applicantPhone: '+91 76543 21098',
        businessType: 'Chemical Manufacturing',
        licenseType: 'Pollution NOC / Consent to Operate',
        licenseTypeId: 'pollution-noc',
        businessName: 'Delhi Chemicals Manufacturing Plant',
        businessAddress: 'Plot No. 67, Okhla Industrial Area, New Delhi - 110020',
        submittedBy: 'demo-business-user-3',
        documents: ['eia_report.pdf', 'pollution_control_plan.pdf', 'water_analysis.pdf'],
        applicationData: {
          businessDetails: {
            name: 'Delhi Chemicals Manufacturing Plant',
            type: 'Chemical Manufacturing',
            address: 'Plot No. 67, Okhla Industrial Area, New Delhi - 110020',
            pincode: '110020',
            phone: '+91 76543 21098',
            email: 'admin@delhichemicals.com'
          },
          licenseDetails: {
            type: 'Pollution NOC',
            category: 'Environmental Clearance',
            duration: '5 years'
          }
        },
        processingTime: '90-120 days',
        fees: '₹15000'
      },
      {
        applicantName: 'City Mall Complex',
        applicantEmail: 'safety@citymall.com',
        applicantPhone: '+91 65432 10987',
        businessType: 'Commercial Complex',
        licenseType: 'Fire Safety NOC',
        licenseTypeId: 'fire-safety-noc',
        businessName: 'City Mall Shopping Complex',
        businessAddress: '12 Rajouri Garden, New Delhi - 110027',
        submittedBy: 'demo-business-user-4',
        documents: ['building_plan.pdf', 'fire_safety_plan.pdf', 'structural_certificate.pdf'],
        applicationData: {
          businessDetails: {
            name: 'City Mall Shopping Complex',
            type: 'Commercial Complex',
            address: '12 Rajouri Garden, New Delhi - 110027',
            pincode: '110027',
            phone: '+91 65432 10987',
            email: 'safety@citymall.com'
          },
          licenseDetails: {
            type: 'Fire Safety NOC',
            category: 'Safety Clearance',
            duration: '3 years'
          }
        },
        processingTime: '30-45 days',
        fees: '₹5000'
      },
      {
        applicantName: 'Modern Pharmacy',
        applicantEmail: 'contact@modernpharmacy.com',
        applicantPhone: '+91 54321 09876',
        businessType: 'Pharmacy',
        licenseType: 'Drug License (Retail)',
        licenseTypeId: 'drug-license-retail',
        businessName: 'Modern Pharmacy & Medical Store',
        businessAddress: '78 Lajpat Nagar, New Delhi - 110024',
        submittedBy: 'demo-business-user-5',
        documents: ['pharmacist_certificate.pdf', 'store_layout.pdf', 'equipment_list.pdf'],
        applicationData: {
          businessDetails: {
            name: 'Modern Pharmacy & Medical Store',
            type: 'Pharmacy',
            address: '78 Lajpat Nagar, New Delhi - 110024',
            pincode: '110024',
            phone: '+91 54321 09876',
            email: 'contact@modernpharmacy.com'
          },
          licenseDetails: {
            type: 'Drug License (Retail)',
            category: 'Medical',
            duration: '3 years'
          }
        },
        processingTime: '30-45 days',
        fees: '₹1500'
      },
      // Additional MCD Applications
      {
        applicantName: 'Tech Startup Hub Pvt Ltd',
        applicantEmail: 'admin@techstartup.com',
        applicantPhone: '+91 99887 76655',
        businessType: 'Technology',
        licenseType: 'Trade License',
        licenseTypeId: 'trade-license',
        businessName: 'Tech Innovation Center',
        businessAddress: '56 Cyber City, Gurgaon Extension, Delhi - 110034',
        submittedBy: 'demo-business-user-6',
        documents: ['business_plan.pdf', 'incorporation_certificate.pdf', 'rented_agreement.pdf'],
        applicationData: {},
        processingTime: '15-30 days',
        fees: '₹3000'
      },
      {
        applicantName: 'Delhi Fashion Boutique',
        applicantEmail: 'info@delhifashion.com',
        applicantPhone: '+91 88776 65544',
        businessType: 'Retail',
        licenseType: 'Trade License',
        licenseTypeId: 'trade-license',
        businessName: 'Elite Fashion Store',
        businessAddress: '89 Khan Market, New Delhi - 110003',
        submittedBy: 'demo-business-user-7',
        documents: ['shop_agreement.pdf', 'gst_certificate.pdf', 'id_proof.pdf'],
        applicationData: {},
        processingTime: '15-30 days',
        fees: '₹2000'
      },
      // Labour Department Applications
      {
        applicantName: 'Construction Corp Ltd',
        applicantEmail: 'hr@constructioncorp.com',
        applicantPhone: '+91 77665 54433',
        businessType: 'Construction',
        licenseType: 'Contract Labour License',
        licenseTypeId: 'contract-labour-license',
        businessName: 'Metro Construction Company',
        businessAddress: 'Site No. 45, Dwarka Sector 18, Delhi - 110078',
        submittedBy: 'demo-business-user-8',
        documents: ['labour_contract.pdf', 'safety_compliance.pdf', 'company_registration.pdf'],
        applicationData: {},
        processingTime: '30-45 days',
        fees: '₹5000'
      },
      {
        applicantName: 'Industrial Solutions Pvt Ltd',
        applicantEmail: 'contact@industrialsolutions.com',
        applicantPhone: '+91 66554 43322',
        businessType: 'Manufacturing',
        licenseType: 'Factory License',
        licenseTypeId: 'factory-license',
        businessName: 'Advanced Manufacturing Unit',
        businessAddress: 'Plot 78, Narela Industrial Area, Delhi - 110040',
        submittedBy: 'demo-business-user-9',
        documents: ['factory_layout.pdf', 'machinery_list.pdf', 'pollution_clearance.pdf'],
        applicationData: {},
        processingTime: '45-60 days',
        fees: '₹8000'
      },
      // Fire Services Applications
      {
        applicantName: 'Metro Hospital Chain',
        applicantEmail: 'safety@metrohospital.com',
        applicantPhone: '+91 55443 32211',
        businessType: 'Healthcare',
        licenseType: 'Fire Safety NOC',
        licenseTypeId: 'fire-safety-noc',
        businessName: 'Metro Multi-Speciality Hospital',
        businessAddress: '123 Safdarjung Enclave, New Delhi - 110029',
        submittedBy: 'demo-business-user-10',
        documents: ['hospital_layout.pdf', 'fire_equipment_list.pdf', 'evacuation_plan.pdf'],
        applicationData: {},
        processingTime: '30-45 days',
        fees: '₹7500'
      },
      {
        applicantName: 'Grand Hotel & Resorts',
        applicantEmail: 'admin@grandhotel.com',
        applicantPhone: '+91 44332 21100',
        businessType: 'Hospitality',
        licenseType: 'Fire Safety NOC',
        licenseTypeId: 'fire-safety-noc',
        businessName: 'Grand Luxury Hotel',
        businessAddress: '45 Karol Bagh, New Delhi - 110005',
        submittedBy: 'demo-business-user-11',
        documents: ['building_plan.pdf', 'fire_safety_audit.pdf', 'sprinkler_system.pdf'],
        applicationData: {},
        processingTime: '30-45 days',
        fees: '₹10000'
      },
      // DPCC Applications
      {
        applicantName: 'EcoFriendly Industries',
        applicantEmail: 'env@ecofriendly.com',
        applicantPhone: '+91 33221 10099',
        businessType: 'Manufacturing',
        licenseType: 'Pollution NOC / Consent to Operate',
        licenseTypeId: 'pollution-noc',
        businessName: 'Green Manufacturing Plant',
        businessAddress: 'Plot 34, Bawana Industrial Area, Delhi - 110039',
        submittedBy: 'demo-business-user-12',
        documents: ['environmental_impact.pdf', 'waste_management_plan.pdf', 'air_quality_report.pdf'],
        applicationData: {},
        processingTime: '90-120 days',
        fees: '₹20000'
      },
      // Health Services Applications
      {
        applicantName: 'Family Care Clinic',
        applicantEmail: 'info@familycare.com',
        applicantPhone: '+91 22110 09988',
        businessType: 'Healthcare',
        licenseType: 'Drug License (Retail)',
        licenseTypeId: 'drug-license-retail',
        businessName: 'Family Healthcare Center',
        businessAddress: '67 Laxmi Nagar, Delhi - 110092',
        submittedBy: 'demo-business-user-13',
        documents: ['medical_registration.pdf', 'pharmacist_license.pdf', 'clinic_layout.pdf'],
        applicationData: {},
        processingTime: '30-45 days',
        fees: '₹2500'
      },
      // FSSAI Applications
      {
        applicantName: 'Spice Garden Restaurant',
        applicantEmail: 'manager@spicegarden.com',
        applicantPhone: '+91 11009988',
        businessType: 'Restaurant',
        licenseType: 'FSSAI License (Food Business License)',
        licenseTypeId: 'fssai-license',
        businessName: 'Spice Garden Fine Dining',
        businessAddress: '34 CP Metro Station, Connaught Place, Delhi - 110001',
        submittedBy: 'demo-business-user-14',
        documents: ['menu_details.pdf', 'kitchen_layout.pdf', 'staff_health_certificates.pdf'],
        applicationData: {},
        processingTime: '60 days',
        fees: '₹3000'
      },
      {
        applicantName: 'Fresh Bakery & Sweets',
        applicantEmail: 'orders@freshbakery.com',
        applicantPhone: '+91 99887766',
        businessType: 'Food Manufacturing',
        licenseType: 'FSSAI License (Food Business License)',
        licenseTypeId: 'fssai-license',
        businessName: 'Fresh Delights Bakery',
        businessAddress: '78 Karol Bagh Market, Delhi - 110005',
        submittedBy: 'demo-business-user-15',
        documents: ['production_layout.pdf', 'quality_control_plan.pdf', 'supplier_agreements.pdf'],
        applicationData: {},
        processingTime: '60 days',
        fees: '₹4000'
      },
      // Additional applications for higher volume
      {
        applicantName: 'Digital Marketing Agency',
        applicantEmail: 'hello@digitalmarketing.com',
        applicantPhone: '+91 98765432',
        businessType: 'Services',
        licenseType: 'Trade License',
        licenseTypeId: 'trade-license',
        businessName: 'Creative Digital Solutions',
        businessAddress: '12 Nehru Place, New Delhi - 110019',
        submittedBy: 'demo-business-user-16',
        documents: ['service_agreement.pdf', 'office_lease.pdf', 'team_credentials.pdf'],
        applicationData: {},
        processingTime: '15-30 days',
        fees: '₹2500'
      },
      {
        applicantName: 'Auto Service Center',
        applicantEmail: 'service@autocare.com',
        applicantPhone: '+91 87654321',
        businessType: 'Automotive',
        licenseType: 'Trade License',
        licenseTypeId: 'trade-license',
        businessName: 'Elite Auto Care Center',
        businessAddress: '456 Mayapuri Industrial Area, Delhi - 110064',
        submittedBy: 'demo-business-user-17',
        documents: ['workshop_layout.pdf', 'equipment_certificates.pdf', 'mechanic_licenses.pdf'],
        applicationData: {},
        processingTime: '15-30 days',
        fees: '₹3500'
      },
      {
        applicantName: 'Event Management Co.',
        applicantEmail: 'events@grandcelebrations.com',
        applicantPhone: '+91 76543210',
        businessType: 'Entertainment',
        licenseType: 'Entertainment License',
        licenseTypeId: 'entertainment-license',
        businessName: 'Grand Celebrations Pvt Ltd',
        businessAddress: '89 Rajouri Garden, Delhi - 110027',
        submittedBy: 'demo-business-user-18',
        documents: ['event_portfolio.pdf', 'sound_equipment_noc.pdf', 'venue_agreements.pdf'],
        applicationData: {},
        processingTime: '20-30 days',
        fees: '₹5000'
      },
      {
        applicantName: 'Textile Exports Ltd',
        applicantEmail: 'export@textileexports.com',
        applicantPhone: '+91 65432109',
        businessType: 'Export',
        licenseType: 'Factory License',
        licenseTypeId: 'factory-license',
        businessName: 'Premium Textile Manufacturing',
        businessAddress: 'Plot 123, Okhla Phase 2, Delhi - 110020',
        submittedBy: 'demo-business-user-19',
        documents: ['export_license.pdf', 'quality_certificates.pdf', 'manufacturing_process.pdf'],
        applicationData: {},
        processingTime: '45-60 days',
        fees: '₹12000'
      },
      {
        applicantName: 'Green Energy Solutions',
        applicantEmail: 'info@greenenergy.com',
        applicantPhone: '+91 54321098',
        businessType: 'Energy',
        licenseType: 'Pollution NOC / Consent to Operate',
        licenseTypeId: 'pollution-noc',
        businessName: 'Solar Power Installation Unit',
        businessAddress: 'Sector 15, Dwarka, Delhi - 110075',
        submittedBy: 'demo-business-user-20',
        documents: ['environmental_clearance.pdf', 'solar_panel_specs.pdf', 'installation_plan.pdf'],
        applicationData: {},
        processingTime: '90-120 days',
        fees: '₹25000'
      }
    ];

    // Add applications with proper department assignment
    demoApplications.forEach(app => {
      const department = getDepartmentByLicenseType(app.licenseTypeId);
      const submissionDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Random date within last 30 days
      const daysElapsed = Math.floor((Date.now() - submissionDate.getTime()) / (24 * 60 * 60 * 1000));
      
      const newApplication: Application = {
        ...app,
        id: `APP-2024-${String(this.applications.length + 1).padStart(3, '0')}`,
        submissionDate: submissionDate.toISOString(),
        status: Math.random() > 0.7 ? 'pending' : Math.random() > 0.5 ? 'in-review' : 'approved',
        priority: this.calculatePriority(app.licenseTypeId),
        assignedOfficer: 'Auto-assigned',
        department: department?.id || 'general',
        lastUpdated: submissionDate.toISOString(),
        daysElapsed
      };
      
      this.applications.push(newApplication);
    });

    // Add demo complaints (expanded set)
    const demoComplaints = [
      {
        complainantName: 'Priya Sharma',
        complainantEmail: 'priya@startup.com',
        complainantPhone: '+91 87654 32109',
        subject: 'Trade License Application Delay',
        description: 'My trade license application (APP-2024-001) has been pending for over 30 days without any update. Please expedite the process.',
        category: 'Application Delay',
        priority: 'high' as const,
        submittedBy: 'demo-business-user',
        department: 'mcd',
        relatedApplicationId: 'APP-2024-001'
      },
      {
        complainantName: 'Rohit Kumar',
        complainantEmail: 'rohit@techsolutions.com',
        complainantPhone: '+91 98765 43210',
        subject: 'Document Upload Issue',
        description: 'Unable to upload fire safety documents in the portal. Getting error message repeatedly.',
        category: 'Technical Issue',
        priority: 'medium' as const,
        submittedBy: 'demo-business-user-2',
        department: 'fire-services'
      },
      {
        complainantName: 'Meera Patel',
        complainantEmail: 'meera@greentech.com',
        complainantPhone: '+91 76543 21098',
        subject: 'DPCC Officer Not Responding',
        description: 'Assigned officer for pollution NOC application is not responding to emails and calls for the past 2 weeks.',
        category: 'Officer Communication',
        priority: 'high' as const,
        submittedBy: 'demo-business-user-3',
        department: 'dpcc'
      },
      {
        complainantName: 'Amit Singh',
        complainantEmail: 'amit@manufacturers.com',
        complainantPhone: '+91 99887 76655',
        subject: 'Factory License Fee Discrepancy',
        description: 'The fee charged for factory license is different from what was mentioned in the guidelines. Need clarification.',
        category: 'Fee Related',
        priority: 'medium' as const,
        submittedBy: 'demo-business-user-4',
        department: 'labour-dept'
      },
      {
        complainantName: 'Sunita Verma',
        complainantEmail: 'sunita@healthcenter.com',
        complainantPhone: '+91 88776 65544',
        subject: 'Drug License Inspection Delay',
        description: 'Scheduled inspection for drug license was cancelled twice without proper notification. This is causing business delays.',
        category: 'Inspection Issue',
        priority: 'high' as const,
        submittedBy: 'demo-business-user-5',
        department: 'health-services'
      },
      {
        complainantName: 'Rajesh Gupta',
        complainantEmail: 'rajesh@foodcorp.com',
        complainantPhone: '+91 77665 54433',
        subject: 'FSSAI Certificate Not Received',
        description: 'Application was approved 15 days ago but certificate has not been issued yet. Multiple follow-ups done.',
        category: 'Certificate Issue',
        priority: 'high' as const,
        submittedBy: 'demo-business-user-6',
        department: 'fssai'
      },
      {
        complainantName: 'Krishna Enterprises',
        complainantEmail: 'info@krishnaent.com',
        complainantPhone: '+91 66554 43322',
        subject: 'Fire NOC Application Status Unknown',
        description: 'Unable to track the status of fire NOC application. Portal shows conflicting information.',
        category: 'System Issue',
        priority: 'medium' as const,
        submittedBy: 'demo-business-user-7',
        department: 'fire-services'
      },
      {
        complainantName: 'Tech Solutions Pvt Ltd',
        complainantEmail: 'admin@techsolutions.com',
        complainantPhone: '+91 55443 32211',
        subject: 'Trade License Renewal Confusion',
        description: 'Received contradictory information about renewal process from different officials. Need clear guidance.',
        category: 'Process Clarification',
        priority: 'medium' as const,
        submittedBy: 'demo-business-user-8',
        department: 'mcd'
      }
    ];

    demoComplaints.forEach(complaint => {
      this.addComplaint(complaint);
    });
  }
}

// Export singleton instance
export const sharedState = new SharedStateManager();

// Initialize demo data on first load
sharedState.initializeDemoData();