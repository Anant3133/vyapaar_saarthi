export const translations = {
  en: {
    title: 'Scheme Applications Management',
    subtitle: 'Manage and review scheme applications across all government programs',
    allApplications: 'All Applications',
    pending: 'Pending Review',
    approved: 'Approved',
    rejected: 'Rejected',
    underReview: 'Under Review',
    backToSchemes: 'Back to Schemes',
    backToWelcome: 'Back to Welcome',
    downloadReport: 'Download Report',
    searchApplications: 'Search applications...',
    filterByStatus: 'Filter by Status',
    filterByScheme: 'Filter by Scheme',
    allStatuses: 'All Statuses',
    allSchemes: 'All Schemes',
    
    // Application details
    applicationId: 'Application ID',
    applicantName: 'Applicant Name',
    schemeName: 'Scheme Name',
    applicationDate: 'Application Date',
    status: 'Status',
    amount: 'Requested Amount',
    company: 'Company',
    location: 'Location',
    actions: 'Actions',
    
    // Actions
    viewDetails: 'View Details',
    approve: 'Approve',
    reject: 'Reject',
    requestInfo: 'Request Info',
    download: 'Download',
    
    // Status labels
    pendingReview: 'Pending Review',
    inProgress: 'In Progress',
    approved: 'Approved',
    rejected: 'Rejected',
    documentsPending: 'Documents Pending',
    
    // Quick stats
    totalApplications: 'Total Applications',
    pendingApplications: 'Pending Applications',
    approvedToday: 'Approved Today',
    avgProcessingTime: 'Avg Processing Time',
    
    // Schemes
    startupIndia: 'Startup India Scheme',
    msmeDigital: 'MSME Digital Initiative',
    womenEntrepreneur: 'Women Entrepreneur Empowerment',
    skillDevelopment: 'Skill Development Program',
    exportPromotion: 'Export Promotion Scheme',
    
    // Time
    days: 'days',
    hours: 'hours',
    minutes: 'minutes'
  },
  hi: {
    title: 'योजना आवेदन प्रबंधन',
    subtitle: 'सभी सरकारी कार्यक्रमों में योजना आवेदनों का प्रबंधन और समीक्षा करें',
    allApplications: 'सभी आवेदन',
    pending: 'समीक्षा लंबित',
    approved: 'अनुमोदित',
    rejected: 'अस्वीकृत',
    underReview: 'समीक्षाधीन',
    backToSchemes: 'योजनाओं पर वापस',
    backToWelcome: 'स्वागत पृष्ठ पर वापस',
    downloadReport: 'रिपोर्ट डाउनलोड करें',
    searchApplications: 'आवेदन खोजें...',
    filterByStatus: 'स्थिति के अनुसार फिल्टर करें',
    filterByScheme: 'योजना के अनुसार फिल्टर करें',
    allStatuses: 'सभी स्थितियां',
    allSchemes: 'सभी योजनाएं',
    
    // Application details
    applicationId: 'आवेदन आईडी',
    applicantName: 'आवेदक का नाम',
    schemeName: 'योजना का नाम',
    applicationDate: 'आवेदन दिनांक',
    status: 'स्थिति',
    amount: 'अनुरोधित राशि',
    company: 'कंपनी',
    location: 'स्थान',
    actions: 'कार्य',
    
    // Actions
    viewDetails: 'विवरण देखें',
    approve: 'अनुमोदित करें',
    reject: 'अस्वीकार करें',
    requestInfo: 'जानकारी मांगें',
    download: 'डाउनलोड करें',
    
    // Status labels
    pendingReview: 'समीक्षा लंबित',
    inProgress: 'प्रगति में',
    approved: 'अनुमोदित',
    rejected: 'अस्वीकृत',
    documentsPending: 'दस्तावेज़ लंबित',
    
    // Quick stats
    totalApplications: 'कुल आवेदन',
    pendingApplications: 'लंबित आवेदन',
    approvedToday: 'आज अनुमोदित',
    avgProcessingTime: 'औसत प्रसंस्करण समय',
    
    // Schemes
    startupIndia: 'स्टार्टअप इंडिया योजना',
    msmeDigital: 'एमएसएमई डिजिटल पहल',
    womenEntrepreneur: 'महिला उद्यमी सशक्तिकरण',
    skillDevelopment: 'कौशल विकास कार्यक्रम',
    exportPromotion: 'निर्यात संवर्धन योजना',
    
    // Time
    days: 'दिन',
    hours: 'घंटे',
    minutes: 'मिनट'
  }
};

export const sampleApplications = [
  {
    id: 'APP-2024-001',
    applicantName: 'Rajesh Kumar',
    company: 'TechStart Solutions Pvt Ltd',
    scheme: 'startupIndia',
    amount: '₹25,00,000',
    applicationDate: '2024-01-15',
    status: 'pending',
    location: 'New Delhi',
    priority: 'high'
  },
  {
    id: 'APP-2024-002',
    applicantName: 'Priya Sharma',
    company: 'Women Tech Innovations',
    scheme: 'womenEntrepreneur',
    amount: '₹15,00,000',
    applicationDate: '2024-01-14',
    status: 'approved',
    location: 'Mumbai',
    priority: 'medium'
  },
  {
    id: 'APP-2024-003',
    applicantName: 'Amit Singh',
    company: 'Digital MSME Solutions',
    scheme: 'msmeDigital',
    amount: '₹10,00,000',
    applicationDate: '2024-01-13',
    status: 'underReview',
    location: 'Bangalore',
    priority: 'medium'
  },
  {
    id: 'APP-2024-004',
    applicantName: 'Sunita Patel',
    company: 'Skill Enhancement Academy',
    scheme: 'skillDevelopment',
    amount: '₹8,00,000',
    applicationDate: '2024-01-12',
    status: 'documentsPending',
    location: 'Pune',
    priority: 'low'
  },
  {
    id: 'APP-2024-005',
    applicantName: 'Vikram Gupta',
    company: 'Export Solutions Ltd',
    scheme: 'exportPromotion',
    amount: '₹20,00,000',
    applicationDate: '2024-01-11',
    status: 'rejected',
    location: 'Chennai',
    priority: 'medium'
  }
];

export const getQuickStats = (language: 'en' | 'hi') => {
  const t = translations[language];
  return [
    {
      label: t.totalApplications,
      value: '1,247',
      change: '+24',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      label: t.pendingApplications,
      value: '89',
      change: '-5',
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      label: t.approvedToday,
      value: '23',
      change: '+8',
      color: 'bg-green-50 text-green-600'
    },
    {
      label: t.avgProcessingTime,
      value: '4.2 ' + t.days,
      change: '-0.3',
      color: 'bg-purple-50 text-purple-600'
    }
  ];
};