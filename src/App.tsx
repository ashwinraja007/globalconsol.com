import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import LoadingSpinner from "@/components/LoadingSpinner";

const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Services = lazy(() => import("./pages/Services"));
const Blog = lazy(() => import("./pages/Blog"));
const News = lazy(() => import("./pages/News"));
const GlobalPresence = lazy(() => import("./pages/GlobalPresence"));
const Contact = lazy(() => import("./pages/Contact"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Profile = lazy(() => import("./pages/Profile"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const BlogAdmin = lazy(() => import("./pages/BlogAdmin"));
const BlogEditor = lazy(() => import("./pages/BlogEditor"));

// Add new admin routes
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Admin = lazy(() => import("./pages/Admin"));
const Gallery = lazy(() => import("./pages/Gallery"));

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/news" element={<News />} />
            <Route path="/global-presence" element={<GlobalPresence />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
             <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/blog-admin" element={<BlogAdmin />} />
            <Route path="/blog-editor" element={<BlogEditor />} />
            
            {/* Add new routes */}
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </Suspense>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
