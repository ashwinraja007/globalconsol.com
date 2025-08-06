
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface CountryData {
  country: string;
  company: string;
  website: string;
  priority: number;
  flag: string;
  route?: string;
  visibilityByCountry?: Record<string, boolean>;
}

const countries: CountryData[] = [
  { country: "SINGAPORE", company: "GC", website: "https://www.globalconsol.com", priority: 1, flag: "/sg.svg", route: "/" },
  { country: "MALAYSIA", company: "OECL", website: "https://oecl.vercel.app/", priority: 2, flag: "/my.svg", route: "/malaysia/home", visibilityByCountry: { BANGLADESH: false } },
  { country: "INDONESIA", company: "OECL", website: "https://oecl.vercel.app/", priority: 3, flag: "/id.svg", route: "/indonesia/home", visibilityByCountry: { BANGLADESH: false } },
  { country: "THAILAND", company: "OECL", website: "https://oecl.vercel.app/", priority: 4, flag: "/th.svg", route: "/thailand/home", visibilityByCountry: { BANGLADESH: false } },
  { country: "MYANMAR", company: "GC", website: "https://www.globalconsol.com", priority: 5, flag: "/mm.svg", route: "/myanmar/home" },
  { country: "CHINA", company: "HAIXUN", website: "https://www.haixun.co/", priority: 6, flag: "/cn.svg" },
  { country: "AUSTRALIA", company: "GGL", website: "https://www.gglaustralia.com/", priority: 7, flag: "/au.svg" },
  { country: "INDIA", company: "GGL INDIA", website: "https://gglindia.in/", priority: 8, flag: "/in.svg" },
  { country: "BANGLADESH", company: "GC", website: "https://www.globalconsol.com", priority: 9, flag: "/bd.svg", route: "/bangladesh/home", visibilityByCountry: { BANGLADESH: false } },
  { country: "SRI LANKA", company: "GC", website: "https://www.globalconsol.com", priority: 10, flag: "/lk.svg", route: "/sri-lanka/home" },
  { country: "PAKISTAN", company: "GC", website: "https://www.globalconsol.com", priority: 11, flag: "/pk.svg", route: "/pakistan/home" },
  { country: "QATAR", company: "ONE GLOBAL", website: "https://oneglobalqatar.com/", priority: 12, flag: "/qa.svg" },
  { country: "SAUDI ARABIA", company: "AMASS", website: "https://amassmiddleeast.com/", priority: 13, flag: "/sa.svg" },
  { country: "UAE", company: "AMASS", website: "https://amassmiddleeast.com/", priority: 14, flag: "/ae.svg" },
  { country: "USA", company: "GGL", website: "https://gglusa.us/", priority: 15, flag: "/us.svg", visibilityByCountry: { MYANMAR: false } },
  { country: "UK", company: "MOLTECH", website: "https://moltech.uk/", priority: 16, flag: "/gb.svg" },
];

const CountrySelector = ({ currentCountry = "" }: { currentCountry?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const availableCountries = countries.filter(
    (c) =>
      c.country.toUpperCase() !== (currentCountry || "").toUpperCase() &&
      (!c.visibilityByCountry || c.visibilityByCountry[(currentCountry || "").toUpperCase()] !== false)
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoute = countries.find(c => c.country === event.target.value)?.route;
    if (selectedRoute) navigate(selectedRoute);
  };

  return (
    <div className="country-selector">
      <select onChange={handleChange} defaultValue="" className="text-sm border rounded px-2 py-1">
        <option value="" disabled>Change Country</option>
        {availableCountries.sort((a, b) => a.priority - b.priority).map((country) => (
          <option key={country.country} value={country.country}>
            {country.country} - {country.company}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
