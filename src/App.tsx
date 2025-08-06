import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import CountryRedirect from '@/components/CountryRedirect';

// Page imports
import Index from '@/pages/Index';
import SriLankaHome from '@/pages/SriLankaHome';
import MyanmarHome from '@/pages/MyanmarHome';
import BangladeshHome from '@/pages/BangladeshHome';
import PakistanHome from '@/pages/PakistanHome';
import Contact from '@/pages/Contact';
import Services from '@/pages/Services';
import GlobalPresence from '@/pages/GlobalPresence';
import AboutUs from '@/pages/aboutus';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ForgotPassword from '@/pages/ForgotPassword';
import Dashboard from '@/pages/Dashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import BlogAdmin from '@/pages/BlogAdmin';
import BlogEditor from '@/pages/BlogEditor';
import Blog from '@/pages/Blog';
import NewsDetailPage from '@/pages/NewsDetailPage';
import NewsOverviewPage from '@/pages/NewsOverviewPage';
import Projects from '@/pages/Projects';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsAndConditions from '@/pages/TermsAndConditions';
import NotFound from '@/pages/NotFound';

// Service pages
import SeaFreight from '@/pages/services/SeaFreight';
import AirFreight from '@/pages/services/AirFreight';
import CustomsClearance from '@/pages/services/CustomsClearance';
import Warehousing from '@/pages/services/Warehousing';
import Consolidation from '@/pages/services/Consolidation';
import ProjectCargo from '@/pages/services/ProjectCargo';
import LiquidCargo from '@/pages/services/LiquidCargo';
import ThirdPartyLogistics from '@/pages/services/ThirdPartyLogistics';
import LinerAgency from '@/pages/services/LinerAgency';

import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';

// Dashboard components
import DashboardOverview from '@/pages/dashboard/Overview';
import DashboardShipments from '@/pages/dashboard/Shipments';
import DashboardDocuments from '@/pages/dashboard/Documents';
import DashboardPayments from '@/pages/dashboard/Payments';
import DashboardSettings from '@/pages/dashboard/Settings';

// Admin components
import AdminOverview from '@/pages/admin/Overview';
import AdminUsers from '@/pages/admin/Users';
import AdminShipmentsManagement from '@/pages/admin/ShipmentsManagement';
import AdminPaymentsManagement from '@/pages/admin/PaymentsManagement';
import AdminSystemSettings from '@/pages/admin/SystemSettings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Services array type
type ServiceRoute = {
  path: string;
  component: React.ComponentType;
};

// All services
const serviceRoutes: ServiceRoute[] = [
  { path: 'sea-freight', component: SeaFreight },
  { path: 'air-freight', component: AirFreight },
  { path: 'customs-clearance', component: CustomsClearance },
  { path: 'warehousing', component: Warehousing },
  { path: 'consolidation', component: Consolidation },
  { path: 'project-cargo', component: ProjectCargo },
  { path: 'liquid-cargo', component: LiquidCargo },
  { path: 'third-party-logistics', component: ThirdPartyLogistics },
  { path: 'liner-agency', component: LinerAgency },
];

// Country prefixes (✅ Updated to include "singapore")
const countries = ['singapore', 'sri-lanka', 'myanmar', 'bangladesh', 'pakistan', 'home'];

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <CountryRedirect />
          <div className="App">
            <Routes>
              {/* Home routes */}
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Index />} />
              <Route path="/sri-lanka/home" element={<SriLankaHome />} />
              <Route path="/myanmar/home" element={<MyanmarHome />} />
              <Route path="/bangladesh/home" element={<BangladeshHome />} />
              <Route path="/pakistan/home" element={<PakistanHome />} />

              {/* Global pages */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/global-presence" element={<GlobalPresence />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/blog/:slug" element={<NewsDetailPage />} />
              <Route path="/news" element={<NewsOverviewPage />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/blog-editor" element={<BlogEditor />} />

              {/* Country-specific pages */}
              {countries.map((country) => (
                <React.Fragment key={country}>
                  <Route path={`/${country}/contact`} element={<Contact />} />
                  <Route path={`/${country}/about-us`} element={<AboutUs />} />
                  <Route path={`/${country}/services`} element={<Services />} />
                  <Route path={`/${country}/blog`} element={<Blog />} />
                  <Route path={`/${country}/blogs`} element={<Blog />} />
                  <Route path={`/${country}/blog/:slug`} element={<NewsDetailPage />} />
                  <Route path={`/${country}/global-presence`} element={<GlobalPresence />} />
                  <Route path={`/${country}/projects`} element={<Projects />} />
                </React.Fragment>
              ))}

              {/* Service detail pages for global and each country */}
              {serviceRoutes.map((service) => (
                <React.Fragment key={service.path}>
                  {/* Global route */}
                  <Route path={`/services/${service.path}`} element={<service.component />} />

                  {/* Country-specific routes */}
                  {countries.map((country) => (
                    <Route
                      key={`${country}-${service.path}`}
                      path={`/${country}/services/${service.path}`}
                      element={<service.component />}
                    />
                  ))}
                </React.Fragment>
              ))}

              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* User Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardOverview />} />
                <Route path="overview" element={<DashboardOverview />} />
                <Route path="shipments" element={<DashboardShipments />} />
                <Route path="documents" element={<DashboardDocuments />} />
                <Route path="payments" element={<DashboardPayments />} />
                <Route path="settings" element={<DashboardSettings />} />
              </Route>

              {/* Admin Dashboard */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              >
                <Route index element={<AdminOverview />} />
                <Route path="overview" element={<AdminOverview />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="shipments" element={<AdminShipmentsManagement />} />
                <Route path="payments" element={<AdminPaymentsManagement />} />
                <Route path="settings" element={<AdminSystemSettings />} />
                <Route path="blog" element={<BlogAdmin />} />
                <Route path="blog/edit/:id?" element={<BlogEditor />} />
              </Route>

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Toaster />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
