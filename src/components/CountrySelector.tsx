import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { getCurrentCountryFromPath, detectCountryByIP } from '@/services/countryDetection';

interface CountryData {
  country: string;
  company: string;
  website: string;
  priority: number;
  flag?: string;
  route?: string;
  visibilityByCountry?: Record<string, boolean>;
}

const countries: CountryData[] = [
  { country: "SINGAPORE", company: "GC", website: "https://www.globalconsol.com", priority: 1, flag: "/sg.svg", route: "/" },
  { country: "SRI LANKA", company: "GC", website: "https://www.globalconsol.com", priority: 2, flag: "/lk.svg", route: "/sri-lanka/home" },
  { country: "MYANMAR", company: "GC", website: "https://www.globalconsol.com", priority: 3, flag: "/mm.svg", route: "/myanmar/home" },
  { country: "BANGLADESH", company: "GC", website: "https://www.globalconsol.com", priority: 4, flag: "/bd.svg", route: "/bangladesh/home" },
  { country: "PAKISTAN", company: "GC", website: "https://www.globalconsol.com", priority: 5, flag: "/pk.svg", route: "/pakistan/home" },
  { country: "MALAYSIA", company: "OECL", website: "https://oecl.sg/malaysia", priority: 6, flag: "/my.svg", visibilityByCountry: { BANGLADESH: false } },
  { country: "INDONESIA", company: "OECL", website: "https://oecl.sg/indonesia", priority: 7, flag: "/id.svg", visibilityByCountry: { BANGLADESH: false } },
  { country: "THAILAND", company: "OECL", website: "https://oecl.sg/thailand", priority: 8, flag: "/th.svg", visibilityByCountry: { BANGLADESH: false } },
  { country: "INDIA", company: "OECL", website: "https://oecl.sg/india", priority: 8, flag: "/in.svg" },
  { country: "CHINA", company: "Haixun", website: "https://www.haixun.co/", priority: 9, flag: "/cn.svg" },
  { country: "AUSTRALIA", company: "GGL", website: "https://www.gglaustralia.com/", priority: 10, flag: "/au.svg" },
  { country: "QATAR", company: "ONE GLOBAL", website: "https://oneglobalqatar.com/", priority: 11, flag: "/qa.svg" },
  { country: "SAUDI ARABIA", company: "AMASS", website: "https://amassmiddleeast.com/", priority: 12, flag: "/sa.svg" },
  { country: "UAE", company: "AMASS", website: "https://amassmiddleeast.com/", priority: 13, flag: "/ae.svg" },
  { country: "USA", company: "GGL", website: "https://gglusa.us/", priority: 14, flag: "/us.svg", visibilityByCountry: { MYANMAR: false } },
  { country: "UK", company: "Moltech", website: "https://moltech.uk/", priority: 15, flag: "/gb.svg" }
];

const CountrySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ipCountry, setIpCountry] = useState<{ code: string; name: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const currentCountry = getCurrentCountryFromPath(location.pathname);
  const currentCountryName = currentCountry.name?.toUpperCase();

  // NEW: if URL has no country slug, force Singapore
  const hasCountryInUrl = /\/(sri-lanka|myanmar|bangladesh|pakistan)\b/i.test(location.pathname);
  const resolvedCurrentCountryName = hasCountryInUrl ? (currentCountryName || "SINGAPORE") : "SINGAPORE";

  useEffect(() => {
    const detect = async () => {
      try {
        const saved = localStorage.getItem("preferredCountry");
        if (saved) {
          setIpCountry(JSON.parse(saved));
          return;
        }
        const c = await detectCountryByIP();
        setIpCountry(c);
      } catch {
        setIpCountry(null);
      }
    };
    detect();
  }, []);

  const singaporeCountry = countries.find(c => c.country === "SINGAPORE")!;

  // Display: prefer URL; if none, ALWAYS show Singapore (ignore IP here)
  const displayCountry =
    countries.find(c => c.country.toUpperCase() === resolvedCurrentCountryName) ||
    singaporeCountry;

  // Menu list: hide the currently displayed country + respect visibility rules
  const availableCountries = countries.filter(c =>
    c.country.toUpperCase() !== resolvedCurrentCountryName &&
    (!c.visibilityByCountry || c.visibilityByCountry[resolvedCurrentCountryName] !== false)
  );
  const sortedCountries = [...availableCountries].sort((a, b) => a.priority - b.priority);

  const handleCountrySelect = (country: CountryData) => {
    localStorage.setItem("preferredCountry", JSON.stringify({
      name: country.country,
      code: country.flag?.split('/')[1]?.split('.')[0] || ''
    }));

    const currentPath = location.pathname;
    let targetRoute = country.route;

    const prefix = country.country === 'SINGAPORE' ? '' : `/${country.country.toLowerCase().replace(/\s+/g, '-')}`;
    if (currentPath.includes('/about-us')) {
      targetRoute = `${prefix}/about-us`;
    } else if (currentPath.includes('/contact')) {
      targetRoute = `${prefix}/contact`;
    }

    if (targetRoute) {
      window.location.href = targetRoute;
    } else {
      window.open(country.website, '_blank', 'noopener,noreferrer');
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-50 flex items-center gap-2">
      {displayCountry?.flag && (
        <img
          src={displayCountry.flag}
          alt={`${displayCountry.country} flag`}
          className="w-6 h-6 rounded shadow-sm object-cover"
          title={displayCountry.country}
        />
      )}

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-black text-white border-black hover:bg-black/90 px-4 py-2 rounded-full flex items-center gap-2"
          >
            <Globe className="w-6 h-6 text-white" />
            <span className="flex items-center gap-1">
              Switch Country <ChevronDown className="h-3 w-3 ml-1 text-white" />
            </span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          className="w-[280px] max-h-screen h-[90vh] border border-amber-100 bg-white p-2 rounded-lg shadow-lg overflow-y-auto"
        >
          <ScrollArea className="h-full w-full pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 gap-1 p-1">
              {sortedCountries.map((country) => (
                <DropdownMenuItem
                  key={country.country}
                  onSelect={(e) => {
                    e.preventDefault();
                    handleCountrySelect(country);
                  }}
                  className="cursor-pointer hover:bg-amber-50 py-4 px-3 min-h-[60px] rounded-md flex items-center gap-3 transition-all"
                >
                  <motion.div whileHover={{ scale: 1.05 }} className="flex items-center w-full">
                    <div className="flex-shrink-0">
                      {country.flag ? (
                        <img
                          src={country.flag}
                          alt={`${country.country} flag`}
                          className="w-6 h-6 rounded-sm shadow-sm object-cover"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-gray-200 rounded-sm flex items-center justify-center">
                          <Globe className="w-6 h-6 text-[#F6B100]" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-sm">{country.country}</div>
                      <div className="text-xs text-gray-500">{country.company}</div>
                    </div>
                  </motion.div>
                </DropdownMenuItem>
              ))}
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CountrySelector;
