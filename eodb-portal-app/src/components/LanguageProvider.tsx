import React, { createContext, useContext, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'hi';
  setLanguage: (language: 'en' | 'hi') => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  language: 'en' | 'hi';
  setLanguage: (language: 'en' | 'hi') => void;
}

export function LanguageProvider({ children, language, setLanguage }: LanguageProviderProps) {
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className={language === 'hi' ? 'lang-hi' : 'lang-en'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Common translations used across components
export const commonTranslations = {
  en: {
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    download: 'Download',
    upload: 'Upload',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Information',
    close: 'Close',
    open: 'Open',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    apply: 'Apply',
    reset: 'Reset',
    clear: 'Clear',
    selectAll: 'Select All',
    selectNone: 'Select None',
    required: 'Required',
    optional: 'Optional',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    state: 'State',
    country: 'Country',
    pincode: 'PIN Code',
    date: 'Date',
    time: 'Time',
    status: 'Status',
    type: 'Type',
    category: 'Category',
    description: 'Description',
    notes: 'Notes',
    amount: 'Amount',
    total: 'Total',
    subtotal: 'Subtotal',
    tax: 'Tax',
    discount: 'Discount',
    quantity: 'Quantity',
    price: 'Price',
    created: 'Created',
    updated: 'Updated',
    approved: 'Approved',
    rejected: 'Rejected',
    pending: 'Pending',
    completed: 'Completed',
    inProgress: 'In Progress',
    draft: 'Draft',
    active: 'Active',
    inactive: 'Inactive',
    enabled: 'Enabled',
    disabled: 'Disabled'
  },
  hi: {
    back: 'वापस',
    next: 'अगला',
    previous: 'पिछला',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    save: 'सेव करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    view: 'देखें',
    download: 'डाउनलोड',
    upload: 'अपलोड',
    search: 'खोजें',
    filter: 'फ़िल्टर',
    sort: 'क्रमबद्ध करें',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',
    warning: 'चेतावनी',
    info: 'जानकारी',
    close: 'बंद करें',
    open: 'खोलें',
    yes: 'हाँ',
    no: 'नहीं',
    ok: 'ठीक है',
    apply: 'लागू करें',
    reset: 'रीसेट',
    clear: 'साफ़ करें',
    selectAll: 'सभी चुनें',
    selectNone: 'कोई नहीं चुनें',
    required: 'आवश्यक',
    optional: 'वैकल्पिक',
    name: 'नाम',
    email: 'ईमेल',
    phone: 'फोन',
    address: 'पता',
    city: 'शहर',
    state: 'राज्य',
    country: 'देश',
    pincode: 'पिन कोड',
    date: 'दिनांक',
    time: 'समय',
    status: 'स्थिति',
    type: 'प्रकार',
    category: 'श्रेणी',
    description: 'विवरण',
    notes: 'टिप्पणियां',
    amount: 'राशि',
    total: 'कुल',
    subtotal: 'उप-कुल',
    tax: 'कर',
    discount: 'छूट',
    quantity: 'मात्रा',
    price: 'मूल्य',
    created: 'बनाया गया',
    updated: 'अपडेट किया गया',
    approved: 'स्वीकृत',
    rejected: 'अस्वीकृत',
    pending: 'लंबित',
    completed: 'पूर्ण',
    inProgress: 'प्रगति में',
    draft: 'मसौदा',
    active: 'सक्रिय',
    inactive: 'निष्क्रिय',
    enabled: 'सक्षम',
    disabled: 'अक्षम'
  }
};