import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import CountrySelector from "@/components/CountrySelector";
import { getCurrentCountryFromPath } from "@/services/countryDetection";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

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
    <header className="fixed top-0 left-0 right-0 w-full z-50 shadow-md bg-white transition-all duration-300">
      {/* Top bar with social icons */}
      <div className="bg-[#c99e65] text-white text-sm py-1 px-4 flex justify-end items-center gap-3">
        <span className="hidden sm:block">Stay connected</span>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="hover:text-white text-sm" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="hover:text-white text-sm" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn className="hover:text-white text-sm" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-white text-sm" />
        </a>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-[19px]">
        <div className="flex justify-between items-center">
          {/* Logos */}
          <div className="flex items-center gap-4">
            <img
              alt="GGL Logo"
              src="/logo.png"
              className="h-20 w-auto cursor-pointer object-fill transition-all duration-300"
            />
            <div className="h-8 w-px bg-gray-500 hidden md:block"></div>
            <img
              alt="1 Global Enterprises Logo"
              src="/lovable-uploads/a2513c1d-2708-4143-a69b-fa65a1d4d1f2.png"
              className="hidden md:block h-11 w-auto object-contain transition-all duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to={getNavLink("/home")}
              className={`nav-link font-medium hover:text-gc-gold ${
                isActive(getNavLink("/home")) ||
                (currentCountry.code === "SG" && isActive("/"))
                  ? "text-gc-gold"
                  : "text-black"
              }`}
            >
              HOME
            </Link>
            <Link
              to={getNavLink("/about-us")}
              className={`nav-link font-medium hover:text-gc-gold ${
                isActive(getNavLink("/about-us")) ? "text-gc-gold" : "text-black"
              }`}
            >
              ABOUT US
            </Link>
            <Link
              to={getNavLink("/services")}
              className={`nav-link font-medium hover:text-gc-gold ${
                isActive(getNavLink("/services")) ? "text-gc-gold" : "text-black"
              }`}
            >
              SERVICES
            </Link>
            <Link
              to={getNavLink("/blog")}
              className={`nav-link font-medium hover:text-gc-gold ${
                isActive(getNavLink("/blog")) || isActive(getNavLink("/blogs"))
                  ? "text-gc-gold"
                  : "text-black"
              }`}
            >
              BLOGS
            </Link>
            <Link
              to={getNavLink("/contact")}
              className={`nav-link font-medium hover:text-gc-gold ${
                isActive(getNavLink("/contact")) ? "text-gc-gold" : "text-black"
              }`}
            >
              CONTACT
            </Link>
          </nav>

          {/* Right section */}
          <div className="hidden md:flex items-center gap-4">
            <CountrySelector />
            <Link to={`${getNavLink("/contact")}#contact-form`}>
              <Button className="bg-gc-gold hover:bg-gc-bronze text-white rounded-md">
                GET QUOTE
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="text-black" size={24} />
            ) : (
              <Menu className="text-black" size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white py-4 shadow-md animate-fade-in border-t">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              {[
                { label: "HOME", path: "/home" },
                { label: "ABOUT US", path: "/about-us" },
                { label: "SERVICES", path: "/services" },
                { label: "BLOGS", path: "/blog" },
                { label: "CONTACT", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={getNavLink(item.path)}
                  className={`font-medium hover:text-gc-gold ${
                    isActive(getNavLink(item.path)) ||
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

              <div className="pt-2">
                <CountrySelector />
              </div>

              <Link
                to={`${getNavLink("/contact")}#contact-form`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="bg-gc-gold hover:bg-gc-bronze text-white w-full rounded-md mt-4">
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
