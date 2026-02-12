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
import { getCurrentCountryFromPath } from '@/services/countryDetection';

interface CountryData {
  country: string;
  company: string;
  website: string;
  priority: number;
  flag?: string;
  route?: string;
}

const countries: CountryData[] = [
  { country: "SINGAPORE", company: "GC", website: "https://www.globalconsol.com", priority: 1, flag: "/sg.svg", route: "/" },
  { country: "SRI LANKA", company: "GC", website: "https://www.globalconsol.com", priority: 2, flag: "/lk.svg", route: "/sri-lanka/home" },
  { country: "MYANMAR", company: "GC", website: "https://www.globalconsol.com", priority: 3, flag: "/mm.svg", route: "/myanmar/home" },
  { country: "BANGLADESH", company: "GC", website: "https://www.globalconsol.com", priority: 4, flag: "/bd.svg", route: "/bangladesh/home" },
  { country: "PAKISTAN", company: "GC", website: "https://www.globalconsol.com", priority: 5, flag: "/pk.svg", route: "/pakistan/home" },
  { country: "INDIA", company: "OECL", website: "https://oecl.sg/india", priority: 8, flag: "/in.svg" },
  { country: "UAE", company: "AMASS", website: "https://amassmiddleeast.com/", priority: 13, flag: "/ae.svg" },
  { country: "USA", company: "GGL", website: "https://gglusa.us/", priority: 14, flag: "/us.svg" },
];

const CountrySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const path = location.pathname;
  const isMyanmar = path.startsWith("/myanmar");
  const isSouthAsia =
    path.startsWith("/bangladesh") ||
    path.startsWith("/sri-lanka") ||
    path.startsWith("/pakistan");

  const currentCountry = getCurrentCountryFromPath(path);
  const currentCountryName = currentCountry.name?.toUpperCase() || "SINGAPORE";

  const displayCountry =
    countries.find(c => c.country === currentCountryName) ||
    countries[0];

  /* -------- Remove USA from list when Myanmar -------- */

  const availableCountries = countries.filter(c => {
    if (isMyanmar && c.country === "USA") return false;
    return c.country !== currentCountryName;
  });

  const sortedCountries = [...availableCountries].sort((a, b) => a.priority - b.priority);

  /* -------- Company Name Overrides -------- */

  const getCompanyName = (country: CountryData) => {
    if (isMyanmar && country.country === "INDIA") return "GGL";
    if (isMyanmar && country.country === "UAE") return "AMASS";
    if (isSouthAsia && country.country === "UAE") return "FNL";
    return country.company;
  };

  /* -------- Routing -------- */

  const handleCountrySelect = (country: CountryData) => {

    /* Myanmar GC → always open in NEW WINDOW */
    if (isMyanmar) {
      let url = country.website;

      if (country.country === "INDIA") url = "https://www.gglindia.com/";
      if (country.country === "UAE") url = "https://amassmiddleeast.com/";

      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    /* Bangladesh / Sri Lanka / Pakistan UAE → FNL */
    if (isSouthAsia && country.country === "UAE") {
      window.location.href = "https://www.futurenetlogistics.com/";
      return;
    }

    /* Default routing */
    let targetRoute = country.route;

    const prefix =
      country.country === "SINGAPORE"
        ? ""
        : `/${country.country.toLowerCase().replace(/\s+/g, "-")}`;

    if (path.includes("/about-us")) {
      targetRoute = `${prefix}/about-us`;
    } else if (path.includes("/contact")) {
      targetRoute = `${prefix}/contact`;
    }

    if (targetRoute) {
      window.location.href = targetRoute;
    } else {
      window.open(country.website, "_blank", "noopener,noreferrer");
    }

    setIsOpen(false);
  };

  /* -------- Close on outside click -------- */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-50 flex items-center gap-2">
      {displayCountry?.flag && (
        <img
          src={displayCountry.flag}
          alt={displayCountry.country}
          className="w-6 h-6 rounded shadow-sm"
        />
      )}

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="bg-black text-white rounded-full flex gap-2 items-center">
            <Globe className="w-5 h-5" />
            Switch Country <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[280px] h-[90vh] overflow-y-auto">
          <ScrollArea className="h-full">
            {sortedCountries.map((country) => (
              <DropdownMenuItem
                key={country.country}
                onSelect={(e) => {
                  e.preventDefault();
                  handleCountrySelect(country);
                }}
                className="py-4 flex items-center gap-3"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
                  <img src={country.flag} className="w-6 h-6" />
                  <div className="ml-3">
                    <div className="text-sm font-medium">{country.country}</div>
                    <div className="text-xs text-gray-500">
                      {getCompanyName(country)}
                    </div>
                  </div>
                </motion.div>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CountrySelector;
