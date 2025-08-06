
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Image, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogManager from "@/components/BlogManager";
import GalleryManager from "@/components/GalleryManager";

type ActiveTab = "overview" | "blog" | "gallery";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel.",
    });
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "blog":
        return <BlogManager />;
      case "gallery":
        return <GalleryManager />;
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow" 
                onClick={() => setActiveTab("blog")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Blog Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Create, edit, and manage blog articles</p>
                </CardContent>
              </Card>
              
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveTab("gallery")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Gallery Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Upload and manage gallery images</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-64 bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-fit">
              <div className="mb-6">
                <h3 className="font-semibold text-lg">Admin Panel</h3>
                <p className="text-sm text-gray-500">Content Management</p>
              </div>
              
              <div className="space-y-2">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </Button>
                <Button
                  variant={activeTab === "blog" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("blog")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Blog Manager
                </Button>
                <Button
                  variant={activeTab === "gallery" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("gallery")}
                >
                  <Image className="mr-2 h-4 w-4" />
                  Gallery Manager
                </Button>
              </div>
              
              <div className="pt-6 mt-6 border-t border-gray-100">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
