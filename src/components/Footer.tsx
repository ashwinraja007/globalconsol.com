
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, Facebook, Linkedin, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Footer = () => {
  const location = useLocation();
  const [currentAddressIndex, setCurrentAddressIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const footerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const keyAddresses = [
    {
      country: "Singapore",
      offices: [
        {
          name: "OECL (Singapore) Pte Ltd.",
          address: "Blk 511 Kampong Bahru Road\n#03-01 Keppel Distripark\nSingapore - 099447",
          phone: "+65 6224 1338",
          fax: "+65 6224 1336",
          email: "info@oecl.sg"
        }
      ]
    },
    {
      country: "India",
      offices: [
        {
          name: "Chennai Office",
          address: "Roma Building, Door No. 10, 3rd Floor\nG.S.T. Road, Alandur\nChennai-600 016",
          phone: "+91 44 4689 4646"
        },
        {
          name: "Mumbai Office",
          address: "Town Center - 2, Office No.607, 6th Floor\nMarol, Andheri Kurla Road\nAndheri East, Mumbai - 400059",
          phone: "+91 8879756838"
        }
      ]
    },
    {
      country: "Malaysia",
      offices: [
        {
          name: "Port Klang Office",
          address: "2, 3A-5 Jalan Batu Nilam 16\nThe Landmark (Behind AEON Mall)\nBandar Bukit Tinggi 2\n41200, Klang, Selangor",
          phone: "+603 - 3319 2778"
        }
      ]
    },
    {
      country: "Thailand",
      offices: [
        {
          name: "Bangkok Office",
          address: "109 CCT Building, 3rd Floor\nSurawong Road, Suriyawongse\nBangrak, Bangkok 10500",
          phone: "+662-634-3240"
        }
      ]
    },
    {
      country: "Indonesia",
      offices: [
        {
          name: "Jakarta Office",
          address: "408, Lina Building\nJL.HR Rasuna Said kav B7\nJakarta",
          phone: "+62 21 529 20292"
        }
      ]
    }
  ];

  // Filter addresses based on current route
  const getFilteredAddresses = () => {
    const pathname = location.pathname.toLowerCase();
    
    if (pathname.includes('/india')) {
      return keyAddresses.filter(addr => addr.country === 'India');
    } else if (pathname.includes('/malaysia')) {
      return keyAddresses.filter(addr => addr.country === 'Malaysia');
    } else if (pathname.includes('/indonesia')) {
      return keyAddresses.filter(addr => addr.country === 'Indonesia');
    } else if (pathname.includes('/thailand')) {
      return keyAddresses.filter(addr => addr.country === 'Thailand');
    }
    
    return keyAddresses; // Show key addresses for home and other pages
  };

  const filteredAddresses = getFilteredAddresses();
  const allOffices = filteredAddresses.flatMap(country => 
    country.offices.map(office => ({
      ...office,
      country: country.country
    }))
  );

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling && allOffices.length > 1) {
      const interval = setInterval(() => {
        setCurrentAddressIndex((prev) => (prev + 1) % allOffices.length);
      }, 4000); // Change address every 4 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoScrolling, allOffices.length]);

  const handleNextAddress = () => {
    setIsAutoScrolling(false);
    setCurrentAddressIndex((prev) => (prev + 1) % allOffices.length);
  };

  const currentOffice = allOffices[currentAddressIndex];

  return (
    <footer className="pt-16 pb-8 bg-gc-dark-blue text-white">
      <div className="container mx-auto px-4">
        <div className="h-1 bg-gradient-to-r from-gc-gold via-gc-light-gold to-gc-gold rounded-full mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-4">
          {/* Column 1: Logo & About */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerAnimation}
            className="flex flex-col items-start"
          >
            <div className="mb-4">
              <img src="/lovable-uploads/20993204-fabd-4185-9d91-56a1fde324dc.png" alt="GC Logo" className="h-16 w-auto object-contain mb-2" loading="lazy" />
              <img src="/oecl.png" alt="OECL Logo" className="h-12 w-auto object-contain" loading="lazy" />
            </div>
            <p className="text-sm md:text-base text-white/80 max-w-xs text-left leading-relaxed">
              At OECL, we are proud to be one of Singapore's leading logistics companies. We offer specialized divisions in warehousing, forwarding (air and ocean), and transportation. Our mission is to deliver comprehensive end-to-end solutions in global freight forwarding.
            </p>
            <div className="flex space-x-3 mt-6">
              <motion.a
                href="https://www.facebook.com/oeclglobal"
                target="_blank"
                className="bg-gc-gold text-gc-dark-blue p-2 rounded-full hover:bg-gc-light-gold transition-colors duration-300"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/oeclglobal"
                target="_blank"
                className="bg-gc-gold text-gc-dark-blue p-2 rounded-full hover:bg-gc-light-gold transition-colors duration-300"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2: Navigation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerAnimation}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-start md:items-end lg:items-start lg:pl-10"
          >
            <h3 className="font-bold text-xl text-gc-gold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about-us" },
                { name: "Services", path: "/services" },
                { name: "Global Presence", path: "/global-presence" },
                { name: "Contact Us", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy-policy" },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-white/90 hover:text-gc-gold transition-colors duration-300 flex items-center gap-2"
                >
                  <ArrowRight size={14} className="text-gc-gold" />
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Contact Info with Auto-scrolling Addresses */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerAnimation}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-start md:items-end lg:items-start lg:pl-10"
          >
            <div className="flex items-center justify-between w-full mb-4">
              <h3 className="font-bold text-xl text-gc-gold">Contact Us</h3>
              {allOffices.length > 1 && (
                <button
                  onClick={handleNextAddress}
                  className="bg-gc-gold text-gc-dark-blue p-1.5 rounded-full hover:bg-gc-light-gold transition-colors"
                  title="Next Address"
                >
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
            
            {currentOffice && (
              <motion.div
                key={currentAddressIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 text-white/90"
              >
                <div className="flex items-start gap-2">
                  <MapPin size={18} className="text-gc-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gc-gold mb-1">
                      {currentOffice.name} - {currentOffice.country}
                    </p>
                    <p className="whitespace-pre-line text-sm leading-relaxed">
                      {currentOffice.address}
                    </p>
                  </div>
                </div>
                
                {currentOffice.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-gc-gold flex-shrink-0" />
                    <p className="text-sm">{currentOffice.phone}</p>
                  </div>
                )}
                
                {currentOffice.fax && (
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-gc-gold flex-shrink-0" />
                    <p className="text-sm">Fax: {currentOffice.fax}</p>
                  </div>
                )}
                
                {currentOffice.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-gc-gold flex-shrink-0" />
                    <p className="text-sm">{currentOffice.email}</p>
                  </div>
                )}
              </motion.div>
            )}
            
            {allOffices.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {allOffices.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentAddressIndex(index);
                      setIsAutoScrolling(false);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentAddressIndex 
                        ? 'bg-gc-gold' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Line */}
        <div className="text-center text-white/70 mt-12 pt-8 border-t border-gc-gold/20 text-sm">
          &copy; {new Date().getFullYear()} OECL Global Enterprises. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
