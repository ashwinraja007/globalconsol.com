import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import News from "./pages/News";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import BlogDetail from "./pages/BlogDetail";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import BlogEditor from "./pages/BlogEditor";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import GlobalPresence from "./pages/GlobalPresence";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Service Pages
import OceanFreight from "./pages/services/OceanFreight";
import AirFreight from "./pages/services/AirFreight";
import SeaFreight from "./pages/services/SeaFreight";
import Warehousing from "./pages/services/Warehousing";
import CustomsClearance from "./pages/services/CustomsClearance";
import ProjectCargo from "./pages/services/ProjectCargo";
import Consolidation from "./pages/services/Consolidation";
import LinerAgency from "./pages/services/LinerAgency";
import ThirdPartyLogistics from "./pages/services/ThirdPartyLogistics";
import LiquidTransportation from "./pages/services/LiquidTransportation";

// Country Pages
import SriLankaHome from "./pages/sri-lanka/Home";
import MyanmarHome from "./pages/myanmar/Home";
import BangladeshHome from "./pages/bangladesh/Home";
import PakistanHome from "./pages/pakistan/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/global-presence" element={<GlobalPresence />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/news" element={<News />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* Admin Routes */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/blog-editor" element={<BlogEditor />} />
              
              {/* Protected Routes */}
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Service Routes */}
              <Route path="/services/ocean-freight" element={<OceanFreight />} />
              <Route path="/services/air-freight" element={<AirFreight />} />
              <Route path="/services/sea-freight" element={<SeaFreight />} />
              <Route path="/services/warehousing" element={<Warehousing />} />
              <Route path="/services/customs-clearance" element={<CustomsClearance />} />
              <Route path="/services/project-cargo" element={<ProjectCargo />} />
              <Route path="/services/consolidation" element={<Consolidation />} />
              <Route path="/services/liner-agency" element={<LinerAgency />} />
              <Route path="/services/third-party-logistics" element={<ThirdPartyLogistics />} />
              <Route path="/services/liquid-transportation" element={<LiquidTransportation />} />

              {/* Country specific routes */}
              <Route path="/sri-lanka/home" element={<SriLankaHome />} />
              <Route path="/myanmar/home" element={<MyanmarHome />} />
              <Route path="/bangladesh/home" element={<BangladeshHome />} />
              <Route path="/pakistan/home" element={<PakistanHome />} />
              
              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
