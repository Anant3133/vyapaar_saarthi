// Department and License Type Mapping for Delhi Government
export interface Department {
  id: string;
  name: {
    en: string;
    hi: string;
  };
  shortName: string;
  licenseTypes: string[];
  registrationTypes: string[];
}

export interface LicenseType {
  id: string;
  name: {
    en: string;
    hi: string;
  };
  department: string;
  category: 'license' | 'registration' | 'permit' | 'noc';
  processingTime: string;
  fees: string;
  documents: string[];
}

export const departments: Department[] = [
  {
    id: 'mcd',
    name: {
      en: 'Municipal Corporation of Delhi (MCD)',
      hi: 'दिल्ली नगर निगम (एमसीडी)'
    },
    shortName: 'MCD',
    licenseTypes: ['trade-license', 'health-trade-license', 'building-permit'],
    registrationTypes: ['shop-establishment']
  },
  {
    id: 'labour-dept',
    name: {
      en: 'Labour Department, Govt. of NCT Delhi',
      hi: 'श्रम विभाग, दिल्ली सरकार'
    },
    shortName: 'Labour Dept',
    licenseTypes: ['factory-license', 'contract-labour-license'],
    registrationTypes: ['shop-establishment', 'sole-proprietorship']
  },
  {
    id: 'fire-services',
    name: {
      en: 'Delhi Fire Services',
      hi: 'दिल्ली अग्निशमन सेवा'
    },
    shortName: 'Fire Services',
    licenseTypes: ['fire-safety-noc'],
    registrationTypes: []
  },
  {
    id: 'dpcc',
    name: {
      en: 'Delhi Pollution Control Committee (DPCC)',
      hi: 'दिल्ली प्रदूषण नियंत्रण समिति (डीपीसीसी)'
    },
    shortName: 'DPCC',
    licenseTypes: ['pollution-noc', 'ewaste-authorization', 'biomedical-waste-authorization'],
    registrationTypes: []
  },
  {
    id: 'health-services',
    name: {
      en: 'Drug Control Department, Directorate of Health Services',
      hi: 'औषधि नियंत्रण विभाग, स्वास्थ्य सेवा निदेशालय'
    },
    shortName: 'Health Services',
    licenseTypes: ['drug-license-retail', 'drug-license-wholesale', 'drug-license-manufacturing'],
    registrationTypes: []
  },
  {
    id: 'excise-dept',
    name: {
      en: 'Excise Department, Govt. of NCT Delhi',
      hi: 'आबकारी विभाग, दिल्ली सरकार'
    },
    shortName: 'Excise Dept',
    licenseTypes: ['liquor-license'],
    registrationTypes: []
  },
  {
    id: 'delhi-police',
    name: {
      en: 'Delhi Police',
      hi: 'दिल्ली पुलिस'
    },
    shortName: 'Delhi Police',
    licenseTypes: ['entertainment-license', 'psara-license'],
    registrationTypes: []
  },
  {
    id: 'fssai',
    name: {
      en: 'Food Safety and Standards Authority of India (FSSAI)',
      hi: 'भारतीय खाद्य सुरक्षा और मानक प्राधिकरण (एफएसएसएआई)'
    },
    shortName: 'FSSAI',
    licenseTypes: ['fssai-license'],
    registrationTypes: []
  }
];

export const licenseTypes: LicenseType[] = [
  {
    id: 'trade-license',
    name: {
      en: 'Trade License',
      hi: 'व्यापार लाइसेंस'
    },
    department: 'mcd',
    category: 'license',
    processingTime: '15-30 days',
    fees: '₹500-5000',
    documents: ['Business Registration', 'Address Proof', 'Identity Proof', 'NOC from Fire Department']
  },
  {
    id: 'shop-establishment',
    name: {
      en: 'Shops and Establishments Registration',
      hi: 'दुकान और स्थापना पंजीकरण'
    },
    department: 'labour-dept',
    category: 'registration',
    processingTime: '7-15 days',
    fees: '₹100-1000',
    documents: ['Application Form', 'Address Proof', 'Identity Proof', 'Rent Agreement']
  },
  {
    id: 'fssai-license',
    name: {
      en: 'FSSAI License (Food Business License)',
      hi: 'एफएसएसएआई लाइसेंस (खाद्य व्यवसाय लाइसेंस)'
    },
    department: 'fssai',
    category: 'license',
    processingTime: '60 days',
    fees: '₹100-7500',
    documents: ['Application Form', 'Business Registration', 'Food Safety Plan', 'NOC from Local Authority']
  },
  {
    id: 'fire-safety-noc',
    name: {
      en: 'Fire Safety NOC',
      hi: 'अग्नि सुरक्षा एनओसी'
    },
    department: 'fire-services',
    category: 'noc',
    processingTime: '30-45 days',
    fees: '₹1000-10000',
    documents: ['Building Plan', 'Fire Safety Plan', 'Structural Stability Certificate', 'Electrical Safety Certificate']
  },
  {
    id: 'pollution-noc',
    name: {
      en: 'Pollution NOC / Consent to Operate',
      hi: 'प्रदूषण एनओसी / संचालन की सहमति'
    },
    department: 'dpcc',
    category: 'noc',
    processingTime: '90-120 days',
    fees: '₹2500-25000',
    documents: ['Environmental Impact Assessment', 'Pollution Control Measures', 'Water Analysis Report', 'Air Quality Assessment']
  },
  {
    id: 'factory-license',
    name: {
      en: 'Factory License',
      hi: 'फैक्टरी लाइसेंस'
    },
    department: 'labour-dept',
    category: 'license',
    processingTime: '45-60 days',
    fees: '₹1000-5000',
    documents: ['Factory Plan', 'Machinery Details', 'Worker Safety Plan', 'Fire Safety NOC']
  },
  {
    id: 'liquor-license',
    name: {
      en: 'Liquor License',
      hi: 'शराब लाइसेंस'
    },
    department: 'excise-dept',
    category: 'license',
    processingTime: '60-90 days',
    fees: '₹25000-100000',
    documents: ['Character Certificate', 'Financial Statements', 'Site Plan', 'Police Verification']
  },
  {
    id: 'drug-license-retail',
    name: {
      en: 'Drug License (Retail)',
      hi: 'औषधि लाइसेंस (खुदरा)'
    },
    department: 'health-services',
    category: 'license',
    processingTime: '30-45 days',
    fees: '₹500-2000',
    documents: ['Pharmacist Certificate', 'Store Layout', 'Equipment List', 'Storage Facility Details']
  },
  {
    id: 'health-trade-license',
    name: {
      en: 'Health Trade License',
      hi: 'स्वास्थ्य व्यापार लाइसेंस'
    },
    department: 'mcd',
    category: 'license',
    processingTime: '20-30 days',
    fees: '₹1000-3000',
    documents: ['Medical Fitness Certificate', 'Hygiene Certificate', 'Water Quality Report', 'Waste Management Plan']
  },
  {
    id: 'entertainment-license',
    name: {
      en: 'Cinema or Public Entertainment License',
      hi: 'सिनेमा या सार्वजनिक मनोरंजन लाइसेंस'
    },
    department: 'delhi-police',
    category: 'license',
    processingTime: '45-60 days',
    fees: '₹5000-15000',
    documents: ['Building Safety Certificate', 'Fire Safety NOC', 'Sound System Details', 'Crowd Management Plan']
  },
  {
    id: 'contract-labour-license',
    name: {
      en: 'Contract Labour License',
      hi: 'अनुबंध श्रमिक लाइसेंस'
    },
    department: 'labour-dept',
    category: 'license',
    processingTime: '30-45 days',
    fees: '₹2000-8000',
    documents: ['Labour Contract Agreement', 'Safety Compliance Certificate', 'Company Registration', 'Contractor Details']
  }
];

export const getDepartmentById = (id: string): Department | undefined => {
  return departments.find(dept => dept.id === id);
};

export const getLicenseTypeById = (id: string): LicenseType | undefined => {
  return licenseTypes.find(license => license.id === id);
};

export const getLicenseTypesByDepartment = (departmentId: string): LicenseType[] => {
  return licenseTypes.filter(license => license.department === departmentId);
};

export const getDepartmentByLicenseType = (licenseTypeId: string): Department | undefined => {
  const licenseType = getLicenseTypeById(licenseTypeId);
  return licenseType ? getDepartmentById(licenseType.department) : undefined;
};