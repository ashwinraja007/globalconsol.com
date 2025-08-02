import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import CountrySelector from "@/components/CountrySelector";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const currentCountry = getCurrentCountryFromPath(location.pathname);

  const isActive = (path: string) => location.pathname === path;

  const getNavLink = (basePath: string) =>
    currentCountry.code === "SG"
      ? basePath
      : `/${currentCountry.name.toLowerCase()}${basePath}`;

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 shadow-md transition-all duration-300 py-[19px] bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <img
              alt="GGL Logo"
              className="h-10 w-auto cursor-pointer object-fill transition-all duration-300"
              src="/lovable-uploads/20993204-fabd-4185-9d91-56a1fde324dc.png"
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
              className={`nav-link font-medium text-black hover:text-gc-gold ${
                isActive(getNavLink("/home")) ||
                (currentCountry.code === "SG" && isActive("/"))
                  ? "text-gc-gold"
                  : ""
              }`}
            >
              HOME
            </Link>
            <Link
              to={getNavLink("/about-us")}
              className={`nav-link font-medium text-black hover:text-gc-gold ${
                isActive(getNavLink("/about-us")) ? "text-gc-gold" : ""
              }`}
            >
              ABOUT US
            </Link>
            <Link
              to={getNavLink("/services")}
              className={`nav-link font-medium text-black hover:text-gc-gold ${
                isActive(getNavLink("/services")) ? "text-gc-gold" : ""
              }`}
            >
              SERVICES
            </Link>
            <Link
              to={getNavLink("/blogs")}
              className={`nav-link font-medium text-black hover:text-gc-gold ${
                isActive("/blog") ? "text-gc-gold" : ""
              }`}
            >
              BLOGS
            </Link>
            <Link
              to={getNavLink("/contact")}
              className={`nav-link font-medium text-black hover:text-gc-gold ${
                isActive(getNavLink("/contact")) ? "text-gc-gold" : ""
              }`}
            >
              CONTACT
            </Link>
          </nav>

          {/* Country Selector & Quote Button */}
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
              <Link
                to={getNavLink("/home")}
                className={`font-medium text-black hover:text-gc-gold ${
                  isActive(getNavLink("/home")) ||
                  (currentCountry.code === "SG" && isActive("/"))
                    ? "text-gc-gold"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                to={getNavLink("/about-us")}
                className={`font-medium text-black hover:text-gc-gold ${
                  isActive(getNavLink("/about-us")) ? "text-gc-gold" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT US
              </Link>
              <Link
                to={getNavLink("/services")}
                className={`font-medium text-black hover:text-gc-gold ${
                  isActive(getNavLink("/services")) ? "text-gc-gold" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                SERVICES
              </Link>
              <Link
                to="/blog"
                className={`font-medium text-black hover:text-gc-gold ${
                  isActive("/blog") ? "text-gc-gold" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                BLOGS
              </Link>
              <Link
                to={getNavLink("/contact")}
                className={`font-medium text-black hover:text-gc-gold ${
                  isActive(getNavLink("/contact")) ? "text-gc-gold" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </Link>

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
