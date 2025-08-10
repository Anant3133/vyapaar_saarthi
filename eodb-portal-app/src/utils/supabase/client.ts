import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Create a single supabase client for interacting with the database
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// API base URL for our server functions
export const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-45c5d27d`;

// Demo mode detection
function isDemoMode() {
  // Check if we're using demo users by checking localStorage or session
  const currentUser = typeof window !== 'undefined' ? localStorage.getItem('demoUser') : null;
  return currentUser !== null || window?.location?.href?.includes('demo=true');
}

// Mock data for demo mode
const getMockDashboardAnalytics = () => ({
  activeLicenses: 12,
  pendingApplications: 5,
  upcomingDeadlines: 8,
  complianceScore: 94,
  applicationTrends: [
    { month: 'Jan', applications: 12, approvals: 8, rejections: 2, pending: 2 },
    { month: 'Feb', applications: 18, approvals: 14, rejections: 1, pending: 3 },
    { month: 'Mar', applications: 15, approvals: 12, rejections: 2, pending: 1 },
    { month: 'Apr', applications: 22, approvals: 18, rejections: 1, pending: 3 },
    { month: 'May', applications: 28, approvals: 24, rejections: 2, pending: 2 },
    { month: 'Jun', applications: 32, approvals: 28, rejections: 1, pending: 3 }
  ],
  processingBottlenecks: [
    { stage: 'Document Verification', avgTime: 3.2, currentTime: 2.8, efficiency: 87 },
    { stage: 'Technical Review', avgTime: 5.5, currentTime: 4.2, efficiency: 76 },
    { stage: 'Legal Clearance', avgTime: 7.1, currentTime: 6.8, efficiency: 96 },
    { stage: 'Final Approval', avgTime: 2.3, currentTime: 1.9, efficiency: 83 },
    { stage: 'Certificate Issue', avgTime: 1.5, currentTime: 1.2, efficiency: 80 }
  ],
  statusBreakdown: [
    { name: 'Approved', value: 68, color: '#22c55e' },
    { name: 'In Review', value: 20, color: '#eab308' },
    { name: 'Rejected', value: 8, color: '#ef4444' },
    { name: 'Draft', value: 4, color: '#6b7280' }
  ]
});

const getMockApplications = () => ([
  {
    id: 'APP001',
    title: 'Trade License Application',
    status: 'approved',
    submittedDate: '2024-01-15',
    updatedDate: '2024-01-20',
    documents: ['business_plan.pdf', 'identity_proof.pdf']
  },
  {
    id: 'APP002', 
    title: 'GST Registration',
    status: 'in-review',
    submittedDate: '2024-01-20',
    updatedDate: '2024-01-25',
    documents: ['pan_card.pdf', 'address_proof.pdf']
  },
  {
    id: 'APP003',
    title: 'Environmental Clearance',
    status: 'pending',
    submittedDate: '2024-01-25',
    updatedDate: '2024-01-25',
    documents: ['project_report.pdf']
  }
]);

const getMockSchemes = () => ([
  {
    id: 'SCH001',
    title: 'Startup India Scheme',
    description: 'Tax benefits and funding support for eligible startups',
    eligibility: 'New businesses registered within last 10 years',
    benefits: ['80% tax exemption for 3 years', 'Fast-track patent filing', 'Government tenders exemption'],
    funding: 'Up to ₹50 lakhs',
    category: 'Tax Benefits',
    applicationCount: 1240,
    successRate: 85
  },
  {
    id: 'SCH002',
    title: 'MSME Development Scheme',
    description: 'Support for Micro, Small & Medium Enterprises',
    eligibility: 'Businesses with investment up to ₹50 crores',
    benefits: ['Subsidized loans', 'Marketing assistance', 'Technology upgradation'],
    funding: 'Up to ₹25 lakhs',
    category: 'Training & Development',
    applicationCount: 890,
    successRate: 92
  },
  {
    id: 'SCH003',
    title: 'Digital India Initiative',
    description: 'Promoting digital infrastructure and services',
    eligibility: 'Technology-based businesses and startups',
    benefits: ['Digital infrastructure support', 'Cloud credits', 'Training programs'],
    funding: 'Up to ₹15 lakhs',
    category: 'Digital Infrastructure',
    applicationCount: 650,
    successRate: 78
  }
]);

// Helper function to make authenticated API calls
export async function apiCall(endpoint: string, options: RequestInit = {}) {
  // Check if we're in demo mode first
  if (isDemoMode()) {
    // Return mock data based on the endpoint
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    switch (endpoint) {
      case '/dashboard/analytics':
        return getMockDashboardAnalytics();
      case '/applications':
        return getMockApplications();
      case '/schemes':
        return getMockSchemes();
      default:
        return { success: true, message: 'Mock response for demo mode' };
    }
  }

  const { data: { session } } = await supabase.auth.getSession();
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session?.access_token || publicAnonKey}`,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Authentication helpers
export const auth = {
  async signUp(email: string, password: string, metadata: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          email,
          password,
          ...metadata,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to sign up');
      }

      return response.json();
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    // Clear demo user data if in demo mode
    if (typeof window !== 'undefined') {
      localStorage.removeItem('demoUser');
    }
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }
};

// Data service helpers
export const dataService = {
  async getDashboardAnalytics() {
    return apiCall('/dashboard/analytics');
  },

  async submitApplication(applicationData: any) {
    if (isDemoMode()) {
      // Simulate application submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        id: `APP${Date.now()}`,
        status: 'submitted',
        message: 'Application submitted successfully (Demo Mode)',
        ...applicationData
      };
    }
    
    return apiCall('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  },

  async getApplications() {
    return apiCall('/applications');
  },

  async getSchemes() {
    return apiCall('/schemes');
  },

  async sendChatMessage(message: string, language: string = 'en') {
    if (isDemoMode()) {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const responses = [
        "I understand you're asking about your application. Based on your profile, I can help you with the next steps.",
        "For your business type, I recommend focusing on these key compliance areas first.",
        "Let me check the current status of your applications and provide an update.",
        "Here are some relevant government schemes that might benefit your business.",
        "I can help you prepare the required documents for your license application."
      ];
      
      return {
        response: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString(),
        context: 'demo_mode'
      };
    }
    
    return apiCall('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, language }),
    });
  },

  async updateProfile(updates: any) {
    if (isDemoMode()) {
      // Update demo user data in localStorage
      if (typeof window !== 'undefined') {
        const currentUser = JSON.parse(localStorage.getItem('demoUser') || '{}');
        const updatedUser = { ...currentUser, ...updates };
        localStorage.setItem('demoUser', JSON.stringify(updatedUser));
      }
      
      return {
        success: true,
        message: 'Profile updated successfully (Demo Mode)',
        user: updates
      };
    }
    
    return apiCall('/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }
};

// Demo mode utilities
export const demoUtils = {
  setDemoUser(userData: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('demoUser', JSON.stringify(userData));
    }
  },
  
  getDemoUser() {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('demoUser');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  },
  
  clearDemoUser() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('demoUser');
    }
  },
  
  isDemoMode
};