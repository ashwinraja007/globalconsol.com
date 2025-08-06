import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { useAuth } from "@/contexts/AuthContext";
import CountrySelector from "@/components/CountrySelector";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const currentCountry = getCurrentCountryFromPath(location.pathname);

  const isActive = (path: string) => location.pathname === path;

  const getNavLink = (basePath: string) => {
    if (currentCountry.code === "SG") return basePath;
    return `/${currentCountry.name.toLowerCase().replace(" ", "-")}${basePath}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 shadow-md bg-white">
      {/* Top bar with social handles */}
      <div className="bg-[#C99F63] text-white text-sm py-1 px-4 flex justify-end items-center gap-3">
        <span className="hidden md:inline">Stay connected</span>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Left: Logos */}
          <div className="flex items-center gap-4">
            <img
              alt="GGL Logo"
              src="/logo.png"
              className="h-20 w-auto object-fill"
            />
            <div className="h-8 w-px bg-gray-500 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <img
                alt="1 Global Enterprises"
                src="/lovable-uploads/a2513c1d-2708-4143-a69b-fa65a1d4d1f2.png"
                className="h-11 w-auto"
              />
              <span>
                A venture of <strong>1 Global Enterprises, Singapore</strong>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to={getNavLink("/home")} className={`nav-link font-medium ${isActive(getNavLink("/home")) || isActive("/") ? "text-gc-gold" : "text-black hover:text-gc-gold"}`}>
              Home
            </Link>
            <Link to={getNavLink("/about-us")} className={`nav-link font-medium ${isActive(getNavLink("/about-us")) ? "text-gc-gold" : "text-black hover:text-gc-gold"}`}>
              About us
            </Link>
            <Link to={getNavLink("/services")} className={`nav-link font-medium ${isActive(getNavLink("/services")) ? "text-gc-gold" : "text-black hover:text-gc-gold"}`}>
              Services
            </Link>
            <Link to={getNavLink("/where-we-are")} className={`nav-link font-medium ${isActive(getNavLink("/where-we-are")) ? "text-gc-gold" : "text-black hover:text-gc-gold"}`}>
              Where we are
            </Link>
            <Link to={getNavLink("/career")} className={`nav-link font-medium ${isActive(getNavLink("/career")) ? "text-gc-gold" : "text-black hover:text-gc-gold"}`}>
              Career
            </Link>
            <Link to={getNavLink("/contact")} className={`nav-link font-medium ${isActive(getNavLink("/contact")) ? "text-gc-gold" : "text-black hover:text-gc-gold"}`}>
              Contact us
            </Link>
          </nav>

          {/* Country selector & Button */}
          <div className="hidden md:flex items-center gap-4">
            <CountrySelector />
            <Link to={`${getNavLink("/contact")}#contact-form`}>
              <Button className="bg-gc-gold hover:bg-gc-bronze text-white rounded-md">
                GET QUOTE
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 shadow-md border-t">
          <div className="px-4">
            <nav className="flex flex-col gap-4">
              {["/home", "/about-us", "/services", "/where-we-are", "/career", "/contact"].map((path) => (
                <Link
                  key={path}
                  to={getNavLink(path)}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium ${isActive(getNavLink(path)) ? "text-gc-gold" : "text-black hover:text-gc-gold"}`}
                >
                  {path.replace("/", "").replace("-", " ").toUpperCase()}
                </Link>
              ))}
              <CountrySelector />
              <Link to={`${getNavLink("/contact")}#contact-form`} onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-gc-gold hover:bg-gc-bronze text-white w-full mt-4">
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
