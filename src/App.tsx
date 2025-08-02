import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import AirFreight from "./pages/services/AirFreight";
import OceanFreight from "./pages/services/OceanFreight";
import Warehousing from "./pages/services/Warehousing";
import CustomsClearance from "./pages/services/CustomsClearance";
import LinearAgency from "./pages/services/LinearAgency";
import LiquidCargo from "./pages/services/LiquidCargo";
import ProjectCargo from "./pages/services/ProjectCargo";
import ThirdPartyLogistics from "./pages/services/ThirdPartyLogistics";
import Consolidation from "./pages/services/Consolidation";
import LinerAgency from "./pages/services/LinerAgency";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AboutUs from "./pages/aboutus";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BlogAdmin from "./pages/BlogAdmin";
import BlogEditor from "./pages/BlogEditor";
import NotFound from "./pages/NotFound";
import IndiaHome from "./pages/IndiaHome";
import IndonesiaHome from "./pages/IndonesiaHome";
import MalaysiaHome from "./pages/MalaysiaHome";
import ThailandHome from "./pages/ThailandHome";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import NewsDetailPage from "./pages/NewsDetailPage";
import Blog from "./pages/Blog";
import BlogDetail from "./components/BlogDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import CountryRedirect from "./components/CountryRedirect";
import GlobalPresence from "./pages/GlobalPresence";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <CountryRedirect />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Index />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/air-freight" element={<AirFreight />} />
              <Route path="/services/ocean-freight" element={<OceanFreight />} />
              <Route path="/services/warehousing" element={<Warehousing />} />
              <Route path="/services/project-cargo" element={<ProjectCargo />} />
              <Route path="/services/customs-clearance" element={<CustomsClearance />} />
              <Route path="/services/linear-agency" element={<LinearAgency />} />
              <Route path="/services/liquid-cargo" element={<LiquidCargo />} />
              <Route path="/services/3pl" element={<ThirdPartyLogistics />} />
              <Route path="/services/consolidation" element={<Consolidation />} />
              <Route path="/services/liner-agency" element={<LinerAgency />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog-editor" element={<BlogEditor />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/blog-admin" element={<BlogAdmin />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/global-presence" element={<GlobalPresence />} />

              {["india", "indonesia", "malaysia", "home", "thailand", "singapore"].map(country => (
                <>
                  <Route path={`/${country}/services`} element={<Services />} />
                  <Route path={`/${country}/about-us`} element={<AboutUs />} />
                  <Route path={`/${country}/contact`} element={<Contact />} />
                  <Route path={`/${country}/blogs`} element={<Blog />} />
                  <Route path={`/${country}/services/air-freight`} element={<AirFreight />} />
                  <Route path={`/${country}/services/ocean-freight`} element={<OceanFreight />} />
                  <Route path={`/${country}/services/warehousing`} element={<Warehousing />} />
                  <Route path={`/${country}/services/project-cargo`} element={<ProjectCargo />} />
                  <Route path={`/${country}/services/customs-clearance`} element={<CustomsClearance />} />
                  <Route path={`/${country}/services/linear-agency`} element={<LinearAgency />} />
                  <Route path={`/${country}/services/liquid-cargo`} element={<LiquidCargo />} />
                  <Route path={`/${country}/services/3pl`} element={<ThirdPartyLogistics />} />
                  <Route path={`/${country}/services/consolidation`} element={<Consolidation />} />
                  <Route path={`/${country}/services/liner-agency`} element={<LinerAgency />} />
                </>
              ))}

                  <Route path="/india/home" element={<IndiaHome />} />
                 <Route path="/india" element={<IndiaHome />} />                                
                 <Route path="/indonesia/home" element={<IndonesiaHome />} />
                 <Route path="/indonesia" element={<IndonesiaHome />} />                              
                 <Route path="/malaysia/home" element={<MalaysiaHome />} />
                 <Route path="/malaysia" element={<MalaysiaHome />} />                                
                <Route path="/thailand/home" element={<ThailandHome />} />
                <Route path="/thailand" element={<ThailandHome />} />
                <Route path="/Singapore/home" element={<ThailandHome />} />
                <Route path="/Singapore" element={<ThailandHome />} />

              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
