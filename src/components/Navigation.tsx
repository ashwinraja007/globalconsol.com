
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import CountrySelector from "@/components/CountrySelector";
import { getCurrentCountryFromPath } from "@/services/countryDetection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const currentCountry = getCurrentCountryFromPath(location.pathname);

  const isActive = (path: string) => location.pathname === path;

  const getNavLink = (basePath: string) => {
    if (currentCountry.code === "SG") return basePath;
    return `/${currentCountry.name.toLowerCase().replace(" ", "-")}${basePath}`;
  };

  const isCompanyLinkActive = () => {
    return isActive(getNavLink("/about-us")) || 
           isActive(getNavLink("/gallery") || 
           isActive(getNavLink("/career"));
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 shadow-md bg-white transition-all duration-300">
      {/* Top bar with social icons - Hidden on small screens */}
      <div className="bg-[#c99e65] text-white text-xs sm:text-sm py-1 px-2 sm:px-4 flex justify-between sm:justify-end items-center gap-2 sm:gap-3">
        <span className="hidden sm:block">Stay connected</span>
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="https://www.facebook.com/globalconsol/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
            <FaFacebookF className="text-xs sm:text-sm" />
          </a>
          <a href="https://x.com/globalconsol/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
            <FaTwitter className="text-xs sm:text-sm" />
          </a>
          <a href="https://www.linkedin.com/company/global-consolidators/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
            <FaLinkedinIn className="text-xs sm:text-sm" />
          </a>
          <a href="https://www.instagram.com/globalconsolidators/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
            <FaInstagram className="text-xs sm:text-sm" />
          </a>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-4 lg:py-[19px]">
        <div className="flex justify-between items-center">
          {/* Logos - Responsive sizing */}
          <div className="flex items-center gap-2 sm:gap-4">
            <img
              alt="GGL Logo"
              src="/logo.png"
              className="h-12 sm:h-16 lg:h-20 w-auto cursor-pointer object-contain transition-all duration-300"
            />
            <div className="h-6 sm:h-8 w-px bg-gray-500 hidden sm:block"></div>
            <img
              alt="1 Global Enterprises Logo"
              src="/lovable-uploads/a2513c1d-2708-4143-a69b-fa65a1d4d1f2.png"
              className="hidden sm:block h-8 sm:h-10 lg:h-11 w-auto object-contain transition-all duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            <Link
              to={getNavLink("/home")}
              className={`nav-link font-medium hover:text-gc-gold text-sm xl:text-base ${
                isActive(getNavLink("/home")) ||
                (currentCountry.code === "SG" && isActive("/"))
                  ? "text-gc-gold"
                  : "text-black"
              }`}
            >
              Home
            </Link>

            {/* Company Dropdown */}
            <DropdownMenu open={isCompanyDropdownOpen} onOpenChange={setIsCompanyDropdownOpen}>
              <DropdownMenuTrigger className={`nav-link font-medium hover:text-gc-gold text-sm xl:text-base flex items-center gap-1 ${
                isCompanyLinkActive() ? "text-gc-gold" : "text-black"
              }`}>
                Info
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-lg border rounded-md p-2 z-50">
                <DropdownMenuItem asChild>
                  <Link 
                    to={getNavLink("/about-us")}
                    className="w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-md block"
                  >
                    About Us
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link 
                    to={getNavLink("/gallery")}
                    className="w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-md block"
                  >
                    Gallery
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link 
                    to={getNavLink("/career")}
                    className="w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-md block"
                  >
                    Career
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to={getNavLink("/services")}
              className={`nav-link font-medium hover:text-gc-gold text-sm xl:text-base ${
                isActive(getNavLink("/services")) ? "text-gc-gold" : "text-black"
              }`}
            >
              Services
            </Link>
            <Link
              to={getNavLink("/blog")}
              className={`nav-link font-medium hover:text-gc-gold text-sm xl:text-base ${
                isActive(getNavLink("/blog")) || isActive(getNavLink("/blogs"))
                  ? "text-gc-gold"
                  : "text-black"
              }`}
            >
              Blogs
            </Link>
          </nav>

          {/* Right section - Responsive */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <CountrySelector />
            <Link to={`${getNavLink("/contact")}#contact-form`}>
              <Button className="bg-gc-gold hover:bg-gc-bronze text-white rounded-md text-xs sm:text-sm px-3 sm:px-4 py-2">
                Contact / Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="text-black" size={20} />
            ) : (
              <Menu className="text-black" size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white py-4 shadow-md animate-fade-in border-t max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              {[
                { label: "HOME", path: "/home" },
                { label: "ABOUT US", path: "/about-us" },
                { label: "GALLERY", path: "/gallery" },
                { label: "CAREER", path: "/career" },
                { label: "SERVICES", path: "/services" },
                { label: "BLOGS", path: "/blog" },
                { label: "CONTACT", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path === "/gallery" ? "/gallery" : getNavLink(item.path)}
                  className={`font-medium hover:text-gc-gold py-2 text-base ${
                    isActive(item.path === "/gallery" ? "/gallery" : getNavLink(item.path)) ||
                    (item.path === "/home" &&
                      currentCountry.code === "SG" &&
                      isActive("/"))
                      ? "text-gc-gold"
                      : "text-black"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-200">
                <CountrySelector />
              </div>

              <Link
                to={`${getNavLink("/contact")}#contact-form`}
                onClick={() => setIsMenuOpen(false)}
                className="pt-2"
              >
                <Button className="bg-gc-gold hover:bg-gc-bronze text-white w-full rounded-md">
                  GET QUOTE
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
