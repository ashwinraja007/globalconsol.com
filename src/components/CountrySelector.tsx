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
  { country: "MALAYSIA", company: "OECL", website: "https://oecl.sg/malaysia", priority: 6, flag: "/my.svg" },
  { country: "INDONESIA", company: "OECL", website: "https://oecl.sg/indonesia", priority: 7, flag: "/id.svg" },
  { country: "THAILAND", company: "OECL", website: "https://oecl.sg/thailand", priority: 8, flag: "/th.svg" },
  { country: "INDIA", company: "OECL", website: "https://oecl.sg/india", priority: 8, flag: "/in.svg" },
  { country: "CHINA", company: "Haixun", website: "https://www.haixun.co/", priority: 9, flag: "/cn.svg" },
  { country: "AUSTRALIA", company: "GGL", website: "https://www.gglaustralia.com/", priority: 10, flag: "/au.svg" },
  { country: "QATAR", company: "ONE GLOBAL", website: "https://oneglobalqatar.com/", priority: 11, flag: "/qa.svg" },
  { country: "SAUDI ARABIA", company: "AMASS", website: "https://amassmiddleeast.com/", priority: 12, flag: "/sa.svg" },
  { country: "UAE", company: "AMASS", website: "https://amassmiddleeast.com/", priority: 13, flag: "/ae.svg" },
  { country: "USA", company: "GGL", website: "https://gglusa.us/", priority: 14, flag: "/us.svg" },
  { country: "UK", company: "GGL", website: "https://www.ggl.sg/uk", priority: 16, flag: "/gb.svg" }
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

  const currentCountry = getCurrentCountryFromPath(location.pathname);
  const currentCountryName = currentCountry.name?.toUpperCase();

  const hasCountryInUrl = /\/(sri-lanka|myanmar|bangladesh|pakistan)\b/i.test(location.pathname);
  const resolvedCurrentCountryName = hasCountryInUrl
    ? (currentCountryName || "SINGAPORE")
    : "SINGAPORE";

  const singaporeCountry = countries.find(c => c.country === "SINGAPORE")!;

  const displayCountry =
    countries.find(c => c.country.toUpperCase() === resolvedCurrentCountryName) ||
    singaporeCountry;

  const availableCountries = countries.filter(
    c => c.country.toUpperCase() !== resolvedCurrentCountryName
  );

  const sortedCountries = [...availableCountries].sort((a, b) => a.priority - b.priority);

  /* ---------------- Company Name Overrides ---------------- */

  const getCompanyName = (country: CountryData) => {
    if (isMyanmar && country.country === "INDIA") return "GGL";
    if (isMyanmar && country.country === "UAE") return "AMASS";

    if (isSouthAsia && country.country === "UAE") return "FNL";

    return country.company;
  };

  /* ---------------- URL Overrides ---------------- */

  const handleCountrySelect = (country: CountryData) => {
    const currentPath = location.pathname;

    /* Myanmar overrides */
    if (isMyanmar) {
      if (country.country === "INDIA") {
        window.location.href = "https://www.gglindia.com/";
        return;
      }
      if (country.country === "UAE") {
        window.location.href = "https://amassmiddleeast.com/";
        return;
      }
    }

    /* Bangladesh / Sri Lanka / Pakistan override */
    if (isSouthAsia && country.country === "UAE") {
      window.location.href = "https://www.futurenetlogistics.com/";
      return;
    }

    /* Original Routing */
    let targetRoute = country.route;

    const prefix =
      country.country === "SINGAPORE"
        ? ""
        : `/${country.country.toLowerCase().replace(/\s+/g, "-")}`;

    if (currentPath.includes("/about-us")) {
      targetRoute = `${prefix}/about-us`;
    } else if (currentPath.includes("/contact")) {
      targetRoute = `${prefix}/contact`;
    }

    if (targetRoute) {
      window.location.href = targetRoute;
    } else {
      window.open(country.website, "_blank", "noopener,noreferrer");
    }

    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative z-50 flex items-center gap-2">
      {displayCountry?.flag && (
        <img
          src={displayCountry.flag}
          alt={`${displayCountry.country} flag`}
          className="w-6 h-6 rounded shadow-sm object-cover"
        />
      )}

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="bg-black text-white rounded-full flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Switch Country <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[280px] h-[90vh] overflow-y-auto">
          <ScrollArea className="h-full w-full">
            {sortedCountries.map((country) => (
              <DropdownMenuItem
                key={country.country}
                onSelect={(e) => {
                  e.preventDefault();
                  handleCountrySelect(country);
                }}
                className="py-4 flex items-center gap-3"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center w-full">
                  <img
                    src={country.flag}
                    className="w-6 h-6 rounded-sm"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-sm">{country.country}</div>
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
