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

  const allAddresses = [
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
      country: "Malaysia",
      offices: [
        {
          name: "PORTKLANG MTBBT",
          address: "2, 3A-5 Jalan Batu Nilam 16\nThe Landmark (Behind AEON Mall)\nBandar Bukit Tinggi 2\n41200, Klang, Selangor D.E",
          phone: "+603 - 3319 2778 / 74 / 75"
        },
        {
          name: "PASIRGUDANG",
          address: "Unit 20-03A, Level 20\nMenara Zurich\n15 Jalan Dato Abdullah Tahir\n80300 Johor Bahru",
          phone: "+603-3319 2778 / 74 / 75, 79"
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
          name: "Chennai Warehouse",
          address: "Survey No.209/6A(Part)209/6B(Part)\nMannur & Valarpuram Village\nPerambakkam Road, Sriperumbudur Taluk\nKanchipuram District-602105",
          phone: "+91 9994355523"
        },
        {
          name: "Delhi",
          address: "Plot No. 15, 1st Floor, Block C\nPocket 8, Sector 17\nDwarka, New Delhi 110075",
          phone: "+91 11 41088871"
        },
        {
          name: "Kolkata",
          address: "Imagine Techpark, Unit No. 10, 19th Floor\nBlock DN 6, Sector - V Salt Lake City\nKolkata, West Bengal, India - 700091",
          phone: "+91 33 4814 9162 / 63"
        },
        {
          name: "Bengaluru",
          address: "3C-964 IIIrd Cross Street\nHRBR LAYOUT 1st Block\nKalayan Nagar Bannaswadi\nBengaluru - 560043",
          phone: "+91 9841676259"
        },
        {
          name: "Cochin",
          address: "CC 59/801A Elizabeth Memorial Building\nThevara Ferry Jn\nCochin 682013, Kerala",
          phone: "+91 484 4019192 / 93"
        },
        {
          name: "Hyderabad",
          address: "H.No. 1-8-450/1/A-7 Indian Airlines colony\nOpp Police Lines, Begumpet\nHyderabad-500016, Telangana",
          phone: "+91 040-49559704"
        },
        {
          name: "Mumbai",
          address: "Town Center - 2, Office No.607, 6th Floor\nMarol, Andheri Kurla Road\nAndheri East, Mumbai - 400059",
          phone: "+91 8879756838, 022-35131688 / 35113475 / 35082586"
        }
      ]
    },
    {
      country: "Thailand",
      offices: [
        {
          name: "Bangkok",
          address: "109 CCT Building, 3rd Floor, Rm.3\nSurawong Road, Suriyawongse\nBangrak, Bangkok 10500",
          phone: "+662-634-3240, +662-634-3942"
        }
      ]
    },
    {
      country: "Indonesia",
      offices: [
        {
          name: "Jakarta",
          address: "408, Lina Building\nJL.HR Rasuna Said kav B7\nJakarta",
          phone: "+62 21 529 20292, 522 4887"
        },
        {
          name: "Surabaya",
          address: "Japfa Indoland Center, Japfa Tower 1\nLantai 4/401-A JL Jend\nBasuki Rahmat 129-137\nSurabaya 60271",
          phone: "+62 21 529 20292, 522 4887"
        }
      ]
    },
    {
      country: "Sri Lanka",
      offices: [
        {
          name: "Colombo",
          address: "Ceylinco House, 9th Floor\nNo. 69, Janadhipathi Mawatha\nColombo 01, Sri Lanka",
          phone: "+94 114477494 / 98",
          fax: "+94 114477499"
        }
      ]
    },
    {
      country: "Myanmar",
      offices: [
        {
          name: "Yangon",
          address: "No.608, Room 8B, Bo Soon Pat Tower\nMerchant Street, Pabedan Township\nYangon, Myanmar",
          phone: "+951 377985, 243101",
          fax: "+951 243158"
        }
      ]
    },
    {
      country: "Pakistan",
      offices: [
        {
          name: "Karachi",
          address: "Suite No.301, 3rd Floor, Fortune Center\nShahrah-e-Faisal, Block 6, PECHS\nKarachi, Pakistan",
          phone: "+92-300-8282511, +92-21-34302281-5"
        },
        {
          name: "Lahore",
          address: "Office # 301, 3rd Floor\nGulberg Arcade Main Market\nGulberg 2, Lahore, Pakistan",
          phone: "+92 42-35782306/07/08"
        }
      ]
    },
    {
      country: "Bangladesh",
      offices: [
        {
          name: "Dhaka",
          address: "ID #9-N (New), 9-M(Old-N), 9th floor\nTower 1, Police Plaza Concord No.2\nRoad # 144, Gulshan Model Town\nDhaka 1215, Bangladesh",
          phone: "+880 1716 620989"
        }
      ]
    },
    {
      country: "UK",
      offices: [
        {
          name: "London",
          address: "167-169 Great Portland Street\n5th Floor\nLondon W1W 5PF, United Kingdom",
          phone: "+44 (0) 203 393 9508"
        }
      ]
    },
    {
      country: "USA",
      offices: [
        {
          name: "New York",
          address: "New Jersey Branch\n33 Wood Avenue South, Suite 600\nIselin, NJ 08830",
          phone: "+1 732 456 6780"
        },
        {
          name: "Los Angeles",
          address: "2250 South Central Avenue\nCompton, CA 90220",
          phone: "+1 310 928 3903"
        },
        {
          name: "Chicago",
          address: "939 W. North Avenue, Suite 750\nChicago, IL 60642"
        }
      ]
    }
  ];

  // Filter addresses based on current route
  const getFilteredAddresses = () => {
    const pathname = location.pathname.toLowerCase();
    
    if (pathname.includes('/india')) {
      return allAddresses.filter(addr => addr.country === 'India');
    } else if (pathname.includes('/malaysia')) {
      return allAddresses.filter(addr => addr.country === 'Malaysia');
    } else if (pathname.includes('/indonesia')) {
      return allAddresses.filter(addr => addr.country === 'Indonesia');
    } else if (pathname.includes('/thailand')) {
      return allAddresses.filter(addr => addr.country === 'Thailand');
    } else if (pathname.includes('/singapore')) {
      return allAddresses.filter(addr => addr.country === 'Singapore');
    } else if (pathname.includes('/srilanka')) {
      return allAddresses.filter(addr => addr.country === 'Sri Lanka');
    } else if (pathname.includes('/myanmar')) {
      return allAddresses.filter(addr => addr.country === 'Myanmar');
    } else if (pathname.includes('/pakistan')) {
      return allAddresses.filter(addr => addr.country === 'Pakistan');
    } else if (pathname.includes('/bangladesh')) {
      return allAddresses.filter(addr => addr.country === 'Bangladesh');
    } else if (pathname.includes('/uk')) {
      return allAddresses.filter(addr => addr.country === 'UK');
    } else if (pathname.includes('/usa')) {
      return allAddresses.filter(addr => addr.country === 'USA');
    }
    
    return allAddresses; // Show all addresses for home and other pages
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
    <footer className="pt-16 pb-8 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 rounded-full mb-8" />

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
              <img src="/oecl.png" alt="OECL Logo" className="h-14 w-auto object-contain" loading="lazy" />
              <img src="/1GlobalEnterprises.png" alt="1 Global Enterprises Logo" className="h-10 w-auto object-contain mt-2" />
            </div>
            <p className="text-sm md:text-base text-white/80 max-w-xs text-left">
              At OECL, we are proud to be one of Singapore's leading logistics companies. We offer specialized divisions in warehousing, forwarding (air and ocean), and transportation. Our mission is to deliver comprehensive end-to-end solutions in global freight forwarding, managed through a trusted network of partners who excel in all logistics segments.
            </p>
            <div className="flex space-x-3 mt-4">
              <motion.a
                href="https://www.facebook.com/oeclglobal"
                target="_blank"
                className="bg-white text-black p-2 rounded-full hover:bg-yellow-500 hover:text-black transition"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/oeclglobal"
                target="_blank"
                className="bg-white text-black p-2 rounded-full hover:bg-yellow-500 hover:text-black transition"
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
            <h3 className="font-bold text-lg text-white mb-4">Navigation</h3>
            <div className="flex flex-col gap-2">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about-us" },
                { name: "Services", path: "/services" },
                { name: "Contact Us", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms And Conditions", path: "/terms-and-conditions" },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-white/80 hover:text-yellow-500 transition flex items-center gap-2"
                >
                  <ArrowRight size={14} className="text-yellow-500" />
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
              <h3 className="font-bold text-lg text-white">Contact Us</h3>
              {allOffices.length > 1 && (
                <button
                  onClick={handleNextAddress}
                  className="bg-yellow-500 text-black p-1.5 rounded-full hover:bg-yellow-400 transition-colors"
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
                className="space-y-3 text-white/80"
              >
                <div className="flex items-start gap-2">
                  <MapPin size={18} className="text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-yellow-500 mb-1">
                      {currentOffice.name} - {currentOffice.country}
                    </p>
                    <p className="whitespace-pre-line text-sm">
                      {currentOffice.address}
                    </p>
                  </div>
                </div>
                
                {currentOffice.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-yellow-500 flex-shrink-0" />
                    <p className="text-sm">{currentOffice.phone}</p>
                  </div>
                )}
                
                {currentOffice.fax && (
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-yellow-500 flex-shrink-0" />
                    <p className="text-sm">Fax: {currentOffice.fax}</p>
                  </div>
                )}
                
                {currentOffice.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-yellow-500 flex-shrink-0" />
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
                        ? 'bg-yellow-500' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Line */}
        <div className="text-center text-white/70 mt-10 text-sm">
          &copy; {new Date().getFullYear()} OECL. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
