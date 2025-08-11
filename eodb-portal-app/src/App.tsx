import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { AdminSidebar } from './components/AdminSidebar';
import { TopNavbar } from './components/TopNavbar';
import { BackButton } from './components/BackButton';
import { WelcomePage } from './components/pages/WelcomePage';
import { RoleSelectionPage } from './components/pages/RoleSelectionPage';
import { LoginPage } from './components/pages/LoginPage';
import { AdminLoginPage } from './components/pages/AdminLoginPage';
import { Dashboard } from './components/pages/Dashboard';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { AnalyticsPage } from './components/pages/AnalyticsPage';
import { LicenseApplication } from './components/pages/LicenseApplication';
import { LicenseRenewal } from './components/pages/LicenseRenewal';
import { CompanyRegistration } from './components/pages/CompanyRegistration';
import { SchemesIncentives } from './components/pages/SchemesIncentives';
import { ComplianceTracker } from './components/pages/ComplianceTracker';
import { ChatbotPage } from './components/pages/ChatbotPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { UploadDocuments } from './components/pages/UploadDocuments';
import { DownloadLicense } from './components/pages/DownloadLicense';
import { Reports } from './components/pages/Reports';
import { ComplaintPage } from './components/pages/ComplaintPage';
import { DemoVideoPage } from './components/pages/DemoVideoPage';
import { CommunityForumPage } from './components/pages/CommunityForumPage';
import { ContactPage } from './components/pages/ContactPage';

// Government Employee pages
import { AdminApplicationsPage } from './components/pages/admin/AdminApplicationsPage';
import { AdminCompliancePage } from './components/pages/admin/AdminCompliancePage';
import { AdminLicensingPage } from './components/pages/admin/AdminLicensingPage';
import { AdminNotificationsPage } from './components/pages/admin/AdminNotificationsPage';
import { AdminSchemesPage } from './components/pages/admin/AdminSchemesPage';
import { AdminDocumentsPage } from './components/pages/admin/AdminDocumentsPage';
import { AdminSettingsPage } from './components/pages/admin/AdminSettingsPage';
import { AdminApplicationTracking } from './components/pages/admin/AdminApplicationTracking';
import { AdminApplicationDetail } from './components/pages/admin/AdminApplicationDetail';
import { AdminNotificationDetail } from './components/pages/admin/AdminNotificationDetail';
import { AdminSchemesAnalytics } from './components/pages/admin/AdminSchemesAnalytics';
import { AdminSchemesApplications } from './components/pages/admin/AdminSchemesApplications';
import { AdminComplaintManagementPage } from './components/pages/admin/AdminComplaintManagementPage';

// Licensing Management pages
import { AdminLicenseTypes } from './components/pages/admin/AdminLicenseTypes';
import { AdminLicenseIssuance } from './components/pages/admin/AdminLicenseIssuance';
import { AdminLicenseRenewals } from './components/pages/admin/AdminLicenseRenewals';
import { AdminLicenseMonitoring } from './components/pages/admin/AdminLicenseMonitoring';

// Compliance Management pages
import { AdminComplianceViolations } from './components/pages/admin/AdminComplianceViolations';
import { AdminComplianceReports } from './components/pages/admin/AdminComplianceReports';
import { AdminComplianceAudits } from './components/pages/admin/AdminComplianceAudits';

import { demoUtils } from './utils/supabase/client';

type UserRole = 'business' | 'government';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  businessType?: string;
  location?: string;
  phoneNumber?: string;
  verified?: boolean;
  memberSince?: string;
  totalApplications?: number;
  completedApplications?: number;
  user_metadata?: Record<string, unknown>;
  // Government user specific fields
  department?: string;
  position?: string;
  permissions?: string[];
  adminLevel?: 'super' | 'department' | 'regional';
  managedDepartments?: string[];
  lastLogin?: string;
}

// Auth Context Provider
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  selectedRole: UserRole | null;
  login: (userData: User) => void;
  logout: () => void;
  setSelectedRole: (role: UserRole | null) => void;
}

import { createContext, useContext } from 'react';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: UserRole }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/role-selection" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = user?.role === 'government' ? '/admin/dashboard' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

// Layout Component for pages with sidebar
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (language === 'hi') {
      document.documentElement.style.fontFamily = '"Noto Sans Devanagari", "Noto Sans", system-ui, sans-serif';
    } else {
      document.documentElement.style.fontFamily = 'system-ui, sans-serif';
    }
  }, [language]);

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleBack = () => {
    if (location.pathname === '/role-selection') {
      navigate('/');
    } else if (location.pathname === '/login' || location.pathname === '/government-login') {
      navigate('/role-selection');
    } else if (location.pathname === '/demo-video') {
      navigate('/');
    } else if (location.pathname === '/settings' || location.pathname === '/admin/settings') {
      if (user?.role === 'government') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } else if (user?.role === 'government') {
      navigate('/admin/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  // Pages without sidebar
  const pagesWithoutSidebar = ['/', '/role-selection', '/login', '/government-login', '/demo-video'];
  const showSidebar = !pagesWithoutSidebar.includes(location.pathname);
  const showBackButton = location.pathname !== '/' && 
    location.pathname !== '/dashboard' && 
    location.pathname !== '/admin/dashboard';

  if (!showSidebar) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(59,130,246,0.01)_50%,transparent_65%)] dark:bg-[linear-gradient(45deg,transparent_35%,rgba(59,130,246,0.02)_50%,transparent_65%)]" />
        
        <div className="relative z-10">
          {showBackButton && (
            <div className="absolute top-20 left-6 z-20">
              <BackButton onClick={handleBack} />
            </div>
          )}
          
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.25, 0, 1]
              }}
              className="min-h-screen"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.02),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.03),transparent_50%)]" />
      
      <div className="relative z-10 h-full flex overflow-hidden">
        {showBackButton && (
          <div className="absolute top-4 left-4 z-30">
            <BackButton onClick={handleBack} />
          </div>
        )}

        {user?.role === 'government' ? (
          <AdminSidebar 
            currentPage={location.pathname}
            setCurrentPage={handleNavigate}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            language={language}
            user={user}
            onBackToWelcome={() => navigate('/')}
          />
        ) : (
          <Sidebar 
            currentPage={location.pathname}
            setCurrentPage={handleNavigate}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            language={language}
            user={user}
          />
        )}
        
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'} overflow-hidden`}>
          <TopNavbar 
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            language={language}
            setLanguage={setLanguage}
            toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            user={user}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
          
          <main className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ 
                  duration: 0.3,
                  ease: [0.25, 0.25, 0, 1]
                }}
                className="min-h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

// Auth Provider Component
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setSelectedRole(null);
    demoUtils.clearDemoUser();
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      selectedRole,
      login,
      logout,
      setSelectedRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <AppLayout>
              <WelcomePageWrapper />
            </AppLayout>
          } />
          
          <Route path="/role-selection" element={
            <AppLayout>
              <RoleSelectionPageWrapper />
            </AppLayout>
          } />
          
          <Route path="/login" element={
            <AppLayout>
              <LoginPageWrapper />
            </AppLayout>
          } />
          
          <Route path="/government-login" element={
            <AppLayout>
              <AdminLoginPageWrapper />
            </AppLayout>
          } />
          
          <Route path="/demo-video" element={
            <AppLayout>
              <DemoVideoPageWrapper />
            </AppLayout>
          } />

          {/* Business User Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute requiredRole="business">
              <AppLayout>
                <DashboardWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/analytics" element={
            <ProtectedRoute requiredRole="business">
              <AppLayout>
                <AnalyticsPageWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/license-application" element={
            <ProtectedRoute requiredRole="business">
              <AppLayout>
                <LicenseApplicationWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/license-renewal" element={
            <ProtectedRoute requiredRole="business">
              <AppLayout>
                <LicenseRenewalWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/company-registration" element={
            <ProtectedRoute requiredRole="business">
              <AppLayout>
                <CompanyRegistrationWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/schemes" element={
            <ProtectedRoute requiredRole="business">
              <AppLayout>
                <SchemesIncentivesWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/compliance" element={
            <ProtectedRoute requiredRole="business">
              <AppLayout>
                <ComplianceTrackerWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/chatbot" element={
            <ProtectedRoute requiredRole="business">
              <AppLayout>
                <ChatbotPageWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/forum" element={
            <ProtectedRoute requiredRole="business">
              <AppLayout>
                <CommunityForumPageWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute requiredRole="business">
              <AppLayout>
                <SettingsPageWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/upload-documents" element={
            <ProtectedRoute requiredRole="business">
              <AppLayout>
                <UploadDocumentsWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/download-license" element={
            <ProtectedRoute requiredRole="business">
              <AppLayout>
                <DownloadLicenseWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute requiredRole="business">
              <AppLayout>
                <ReportsWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/complaints" element={
            <ProtectedRoute requiredRole="business">
              <AppLayout>
                <ComplaintPageWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/contact" element={
            <ProtectedRoute requiredRole="business">
              <AppLayout>
                <ContactPageWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />

          {/* Government Employee Protected Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminDashboardWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/applications" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminApplicationsPageWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/tracking" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminApplicationTrackingWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/application/:id" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminApplicationDetailWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/compliance" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminCompliancePageWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/licensing" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminLicensingPageWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/notifications" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminNotificationsPageWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/notification/:type/:id" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminNotificationDetailWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/schemes" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminSchemesPageWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/schemes-analytics" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminSchemesAnalyticsWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/schemes-applications" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminSchemesApplicationsWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/documents" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminDocumentsPageWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/settings" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminSettingsPageWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/complaint-management" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminComplaintManagementPageWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />

          {/* Licensing Management Routes */}
          <Route path="/admin/license-types" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminLicenseTypesWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/license-issuance" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminLicenseIssuanceWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/license-renewals" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminLicenseRenewalsWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/license-monitoring" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminLicenseMonitoringWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />

          {/* Compliance Management Routes */}
          <Route path="/admin/compliance-violations" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminComplianceViolationsWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/compliance-reports" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminComplianceReportsWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/compliance-audits" element={
            <ProtectedRoute requiredRole="government">
              <AppLayout>
                <AdminComplianceAuditsWrapper />
              </AppLayout>
            </ProtectedRoute>
          } />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

// Wrapper components that provide navigation and other props
const WelcomePageWrapper = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  
  return (
    <WelcomePage 
      onGetStarted={() => navigate('/role-selection')}
      onWatchDemo={() => navigate('/demo-video')}
      language={language}
      setLanguage={setLanguage}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  );
};

const RoleSelectionPageWrapper = () => {
  const navigate = useNavigate();
  const { setSelectedRole } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'business') {
      navigate('/login');
    } else if (role === 'government') {
      navigate('/government-login');
    }
  };
  
  return (
    <RoleSelectionPage 
      onRoleSelect={handleRoleSelect}
      onBack={() => navigate('/')}
      language={language}
      setLanguage={setLanguage}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  );
};

const LoginPageWrapper = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  
  const handleLogin = (userData: User) => {
    login(userData);
    navigate('/dashboard');
  };
  
  return (
    <LoginPage 
      onLogin={handleLogin}
      onBack={() => navigate('/role-selection')}
      language={language}
      setLanguage={setLanguage}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      userRole="business"
    />
  );
};

const AdminLoginPageWrapper = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  
  const handleLogin = (userData: User) => {
    login(userData);
    navigate('/admin/dashboard');
  };
  
  return (
    <AdminLoginPage 
      onLogin={handleLogin}
      onBack={() => navigate('/role-selection')}
      language={language}
      setLanguage={setLanguage}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  );
};

const DemoVideoPageWrapper = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  
  return (
    <DemoVideoPage 
      language={language}
      onBack={() => navigate('/')}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  );
};

// Business User Page Wrappers
const DashboardWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <Dashboard user={user} onNavigate={navigate} language={language} />;
};

const AnalyticsPageWrapper = () => {
  const [language] = useState<'en' | 'hi'>('en');
  return <AnalyticsPage language={language} />;
};

const LicenseApplicationWrapper = () => {
  const { user } = useAuth();
  const [language] = useState<'en' | 'hi'>('en');
  return <LicenseApplication language={language} user={user} />;
};

const LicenseRenewalWrapper = () => {
  const [language] = useState<'en' | 'hi'>('en');
  return <LicenseRenewal language={language} />;
};

const CompanyRegistrationWrapper = () => {
  const [language] = useState<'en' | 'hi'>('en');
  return <CompanyRegistration language={language} />;
};

const SchemesIncentivesWrapper = () => {
  const [language] = useState<'en' | 'hi'>('en');
  return <SchemesIncentives language={language} />;
};

const ComplianceTrackerWrapper = () => {
  const [language] = useState<'en' | 'hi'>('en');
  return <ComplianceTracker language={language} />;
};

const ChatbotPageWrapper = () => {
  const [language] = useState<'en' | 'hi'>('en');
  return <ChatbotPage language={language} />;
};

const CommunityForumPageWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <CommunityForumPage language={language} user={user} onNavigate={navigate} />;
};

const SettingsPageWrapper = () => {
  const { user, login } = useAuth();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <SettingsPage currentUser={user} onUserUpdate={login} language={language} />;
};

const UploadDocumentsWrapper = () => {
  const [language] = useState<'en' | 'hi'>('en');
  return <UploadDocuments language={language} />;
};

const DownloadLicenseWrapper = () => {
  const [language] = useState<'en' | 'hi'>('en');
  return <DownloadLicense language={language} />;
};

const ReportsWrapper = () => {
  const [language] = useState<'en' | 'hi'>('en');
  return <Reports language={language} />;
};

const ComplaintPageWrapper = () => {
  const { user } = useAuth();
  const [language] = useState<'en' | 'hi'>('en');
  return <ComplaintPage language={language} user={user} />;
};

const ContactPageWrapper = () => {
  const { user } = useAuth();
  const [language] = useState<'en' | 'hi'>('en');
  return <ContactPage language={language} user={user} />;
};

// Government Employee Page Wrappers
const AdminDashboardWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <AdminDashboard user={user} onNavigate={navigate} language={language} />;
};

const AdminApplicationsPageWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <AdminApplicationsPage language={language} user={user} onNavigate={navigate} />;
};

const AdminApplicationTrackingWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <AdminApplicationTracking language={language} user={user} onNavigate={navigate} />;
};

const AdminApplicationDetailWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [language] = useState<'en' | 'hi'>('en');
  
  return (
    <AdminApplicationDetail 
      language={language} 
      user={user} 
      applicationId={id || ''}
      onNavigate={navigate}
      onBack={() => navigate('/admin/tracking')}
    />
  );
};

const AdminCompliancePageWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <AdminCompliancePage language={language} user={user} onNavigate={navigate} />;
};

const AdminLicensingPageWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <AdminLicensingPage language={language} user={user} onNavigate={navigate} />;
};

const AdminNotificationsPageWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <AdminNotificationsPage language={language} user={user} onNavigate={navigate} />;
};

const AdminNotificationDetailWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { type, id } = useParams<{ type: string; id: string }>();
  const [language] = useState<'en' | 'hi'>('en');
  
  return (
    <AdminNotificationDetail
      language={language}
      user={user}
      notificationId={id || ''}
      notificationType={(type as 'system' | 'user' | 'circular') || 'user'}
      onNavigate={navigate}
      onBack={() => navigate('/admin/notifications')}
    />
  );
};

const AdminSchemesPageWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <AdminSchemesPage language={language} user={user} onNavigate={navigate} />;
};

const AdminSchemesAnalyticsWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return (
    <AdminSchemesAnalytics
      language={language}
      user={user}
      onNavigate={navigate}
      onBack={() => navigate('/admin/schemes')}
    />
  );
};

const AdminSchemesApplicationsWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return (
    <AdminSchemesApplications
      language={language}
      user={user}
      onNavigate={navigate}
      onBack={() => navigate('/admin/schemes')}
    />
  );
};

const AdminDocumentsPageWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <AdminDocumentsPage language={language} user={user} onNavigate={navigate} />;
};

const AdminSettingsPageWrapper = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <AdminSettingsPage currentUser={user} onUserUpdate={login} language={language} onNavigate={navigate} />;
};

const AdminComplaintManagementPageWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return (
    <AdminComplaintManagementPage
      language={language}
      user={user}
      onNavigate={navigate}
      onBack={() => navigate('/dashboard')}
    />
  );
};

// Licensing Management Wrappers
const AdminLicenseTypesWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <AdminLicenseTypes language={language} user={user} onNavigate={navigate} onBack={() => navigate('/admin/licensing')} />;
};

const AdminLicenseIssuanceWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <AdminLicenseIssuance language={language} user={user} onNavigate={navigate} onBack={() => navigate('/admin/licensing')} />;
};

const AdminLicenseRenewalsWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <AdminLicenseRenewals language={language} user={user} onNavigate={navigate} onBack={() => navigate('/admin/licensing')} />;
};

const AdminLicenseMonitoringWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <AdminLicenseMonitoring language={language} user={user} onNavigate={navigate} onBack={() => navigate('/admin/licensing')} />;
};

// Compliance Management Wrappers
const AdminComplianceViolationsWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <AdminComplianceViolations language={language} user={user} onNavigate={navigate} onBack={() => navigate('/admin/compliance')} />;
};

const AdminComplianceReportsWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <AdminComplianceReports language={language} user={user} onNavigate={navigate} onBack={() => navigate('/admin/compliance')} />;
};

const AdminComplianceAuditsWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language] = useState<'en' | 'hi'>('en');
  
  return <AdminComplianceAudits language={language} user={user} onNavigate={navigate} onBack={() => navigate('/admin/compliance')} />;
};

export default App;