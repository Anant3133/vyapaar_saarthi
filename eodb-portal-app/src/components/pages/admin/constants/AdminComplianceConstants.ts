// Shared constants for compliance components
export const chartColors = {
  primary: '#3b82f6',
  secondary: '#10b981',
  tertiary: '#f59e0b',
  quaternary: '#ef4444',
  accent: '#8b5cf6'
};

export const complianceReportsData = {
  complianceTrendData: [
    { month: 'Jan', score: 85, violations: 12, inspections: 45 },
    { month: 'Feb', score: 88, violations: 8, inspections: 52 },
    { month: 'Mar', score: 87, violations: 10, inspections: 48 },
    { month: 'Apr', score: 91, violations: 6, inspections: 61 },
    { month: 'May', score: 93, violations: 4, inspections: 58 },
    { month: 'Jun', score: 94, violations: 3, inspections: 67 }
  ],

  departmentPerformanceData: [
    { department: 'Trade', score: 87, inspections: 285, violations: 23 },
    { department: 'Health', score: 92, inspections: 324, violations: 15 },
    { department: 'Food', score: 86, inspections: 156, violations: 28 },
    { department: 'Environment', score: 90, inspections: 198, violations: 18 },
    { department: 'Transport', score: 88, inspections: 142, violations: 21 }
  ],

  violationsByTypeData: [
    { name: 'Safety', value: 35, color: '#ef4444' },
    { name: 'Documentation', value: 25, color: '#f59e0b' },
    { name: 'Health', value: 20, color: '#eab308' },
    { name: 'Environmental', value: 15, color: '#22c55e' },
    { name: 'Others', value: 5, color: '#6b7280' }
  ],

  recentReports: [
    {
      id: 1,
      name: 'Monthly Compliance Report',
      type: 'Monthly',
      generatedDate: '2024-01-31',
      status: 'Ready',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Department Performance Analysis',
      type: 'Quarterly',
      generatedDate: '2024-01-28',
      status: 'Ready',
      size: '3.1 MB'
    },
    {
      id: 3,
      name: 'Violations Summary Report',
      type: 'Custom',
      generatedDate: '2024-01-25',
      status: 'Generating',
      size: '-'
    }
  ],

  scheduledReports: [
    {
      id: 1,
      name: 'Monthly Compliance Dashboard',
      frequency: 'Monthly',
      nextRun: '2024-02-01',
      recipients: 3,
      status: 'enabled'
    },
    {
      id: 2,
      name: 'Quarterly Performance Report',
      frequency: 'Quarterly',
      nextRun: '2024-04-01',
      recipients: 5,
      status: 'enabled'
    }
  ],

  statistics: {
    totalInspections: 1205,
    passedInspections: 819,
    failedInspections: 241,
    averageScore: 89.2
  }
};

export const auditData = {
  audits: [
    {
      id: 'AUD-2024-001',
      business: 'राज एंटरप्राइजेज',
      auditType: 'routine',
      status: 'scheduled',
      scheduledDate: '2024-02-15',
      businessName: 'राज एंटरप्राइजेज',
      email: 'raj@enterprises.com',
      phone: '+91 9876543210',
      auditor: 'राम शर्मा',
      checklistItems: 12,
      completedItems: 8
    },
    {
      id: 'AUD-2024-002',
      business: 'स्वास्थ्य केंद्र',
      auditType: 'surprise',
      status: 'inProgress',
      scheduledDate: '2024-02-10',
      businessName: 'स्वास्थ्य केंद्र',
      email: 'health@center.com',
      phone: '+91 9876543211',
      auditor: 'डॉ. सुनीता गुप्ता',
      checklistItems: 15,
      completedItems: 10
    },
    {
      id: 'AUD-2024-003',
      business: 'फूड कॉर्नर',
      auditType: 'followUp',
      status: 'completed',
      scheduledDate: '2024-02-05',
      businessName: 'फूड कॉर्नर',
      email: 'food@corner.com',
      phone: '+91 9876543212',
      auditor: 'अनिल कुमार',
      checklistItems: 10,
      completedItems: 10
    }
  ],

  statistics: {
    total: 45,
    scheduled: 12,
    completed: 28,
    pending: 5
  }
};

export const violationsData = {
  violations: [
    {
      id: 'VIO-2024-001',
      business: 'राज एंटरप्राइजेज',
      licenseNumber: 'TL-2023-0045',
      violationType: 'safety',
      severity: 'critical',
      status: 'open',
      description: 'Fire safety equipment not maintained properly',
      reportedDate: '2024-01-20',
      reportedBy: 'Safety Inspector',
      inspector: 'राम शर्मा',
      businessName: 'राज एंटरप्राइजेज',
      email: 'raj@enterprises.com',
      phone: '+91 9876543210',
      address: 'नई दिल्ली, भारत',
      evidenceAttached: true,
      daysAgo: 2
    },
    {
      id: 'VIO-2024-002',
      business: 'स्वास्थ्य केंद्र',
      licenseNumber: 'HL-2023-0023',
      violationType: 'documentation',
      severity: 'medium',
      status: 'inProgress',
      description: 'Missing patient records documentation',
      reportedDate: '2024-01-18',
      reportedBy: 'Health Inspector',
      inspector: 'डॉ. सुनीता गुप्ता',
      businessName: 'स्वास्थ्य केंद्र',
      email: 'health@center.com',
      phone: '+91 9876543211',
      address: 'गुड़गांव, हरियाणा',
      evidenceAttached: false,
      daysAgo: 4
    }
  ],

  statistics: {
    total: 25,
    open: 8,
    critical: 3,
    resolvedToday: 2
  }
};