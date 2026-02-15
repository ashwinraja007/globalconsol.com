import React, { useState, useEffect } from "react";
import { Users, UserCircle, SearchCode, Ship, Calendar, ArrowRight, Play, Zap } from "lucide-react";
import { useLocation } from "react-router-dom";

interface HeroSectionProps {
  country?: 'sri-lanka' | 'myanmar' | 'bangladesh' | 'pakistan';
}

const HeroSection = ({ country }: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCustomerPortalOpen, setIsCustomerPortalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const location = useLocation();

  const countryContent = {
    'sri-lanka': {
      images: [
        { url: "/14.png", title: "GLOBAL CONSOL", description: "Your Trusted Logistics Partner in Sri Lanka", gradient: "" },
        { url: "/air1.png", title: "AIR FREIGHT", description: "We deliver flexible, global airfreight solutions", gradient: "" },
        { url: "/whouse1.png", title: "WAREHOUSE MANAGEMENT", description: "A cutting edge solutions with advanced WMS", gradient: "" },
        { url: "/15.png", title: "LIQUID CARGO TRANSPORTATION", description: "Cost effective and safe transportation of liquid cargo", gradient: "" }
      ]
    },
    myanmar: {
      images: [
        { url: "/12.png", title: "GLOBAL CONSOL", description: "Your Trusted Logistics Partner in Myanmar", gradient: "" },
        { url: "/4.png", title: "LOGISTICS SERVICES", description: "Supported through own offices and network of key partners around the world.", gradient: "" },
        { url: "/warehousing1.png", title: "WAREHOUSE MANAGEMENT", description: "A cutting edge solutions with advanced WMS.", gradient: "" },
        { url: "/16.png", title: "LIQUID CARGO TRANSPORTATION", description: "Cost effective and safe transportation of liquid cargo", gradient: "" }
      ]
    },
    bangladesh: {
      images: [
        { url: "/15.png", title: "GLOBAL CONSOL", description: "Your Trusted Logistics Partner in Bangladesh", gradient: "" },
        { url: "/20.png", title: "AIR FREIGHT", description: "We deliver flexible, global airfreight solutions", gradient: "" },
        { url: "/whouse3.png", title: "WAREHOUSE MANAGEMENT", description: "A cutting edge solutions with advanced WMS.", gradient: "" },
        { url: "/17.png", title: "LIQUID CARGO TRANSPORTATION", description: "Cost effective and safe transportation of liquid cargo", gradient: "" }
      ]
    },
    pakistan: {
      images: [
        { url: "/13.png", title: "GLOBAL CONSOL", description: "Your Trusted Logistics Partner in Pakistan", gradient: "" },
        { url: "/air1.png", title: "AIR FREIGHT", description: "We deliver flexible, global airfreight solutions", gradient: "" },
        { url: "/whouse2.png", title: "WAREHOUSE MANAGEMENT", description: "A cutting edge solutions with advanced WMS .", gradient: "" },
        { url: "/18.png", title: "LIQUID CARGO TRANSPORTATION", description: "Cost effective and safe transportation of liquid cargo", gradient: "" }
      ]
    }
  };

  const defaultImages = [
    { url: "/h1.png", title: "OECL", description: "Vital Link to Enhance Your Supply Chain.", gradient: "" },
    { url: "/h2.png", title: "LOGISTICS SERVICES", description: "Supported through own offices and network of key partners around the world.", gradient: "" },
    { url: "/h3.png", title: "WAREHOUSE MANAGEMENT", description: "A cutting edge solutions with advanced WMS .", gradient: "" },
    { url: "/h4.png", title: "MULTIPLE CARRIER OPTION", description: "Assublue space with contracted rates to major trade routes .", gradient: "" }
  ];

  const sliderImages = country ? countryContent[country].images : defaultImages;

  // ✅ UPDATED HERE (Title only change)
  const portalLinks = [
    {
      icon: <Users className="w-4 h-4" />,
      title: country === "pakistan" || country === "myanmar"
        ? "Customer Portal"
        : "Consolmate",
      url: "https://consolmate.com/auth/login/1",
      external: true,
      color: "from-blue-500 to-blue-700",
      hoverColor: "from-blue-600 to-blue-800"
    },
    {
      icon: <UserCircle className="w-4 h-4" />,
      title: "Partner Portal",
      url: "https://pp.onlinetracking.co/auth/login/1",
      external: true,
      color: "from-blue-500 to-blue-700",
      hoverColor: "from-blue-600 to-blue-800"
    },
    {
      icon: <SearchCode className="w-4 h-4" />,
      title: "Tracking",
      url: "http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:102:::::P0_GROUP_RID:54",
      external: true,
      color: "from-blue-500 to-blue-700",
      hoverColor: "from-blue-600 to-blue-800"
    },
    {
      icon: <Ship className="w-4 h-4" />,
      title: "Sailing Schedule",
      url: "http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:104:::::P0_GROUP_RID:54",
      external: true,
      color: "from-blue-500 to-blue-700",
      hoverColor: "from-blue-600 to-blue-800"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % sliderImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const currentSlide = sliderImages[activeSlide];

  const getContactUrl = () => {
    if (country) return `/${country}/contact`;
    return "/contact";
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Slider */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {sliderImages.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
              activeSlide === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img
              src={slide.url}
              alt={`Slide ${i}`}
              className="w-full h-full object-cover transition-transform duration-2000"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black/40 z-[2]" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex items-center min-h-screen px-4">
        <div className="max-w-4xl mx-auto text-center w-full space-y-6">
          <h1 className="text-4xl font-bold">
            {currentSlide.title}
          </h1>

          <p className="text-xl text-gray-200">
            {currentSlide.description}
          </p>

          <a href={getContactUrl()}>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg flex items-center gap-2 mx-auto">
              <Zap className="w-4 h-4" />
              GET STARTED
              <ArrowRight className="w-4 h-4" />
            </button>
          </a>
        </div>
      </div>

      {/* Portal Buttons */}
      <div className="absolute bottom-6 left-0 right-0 z-30 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2">
          {portalLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <div className="h-14 flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white text-sm">
                {link.icon}
                <span>{link.title}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
