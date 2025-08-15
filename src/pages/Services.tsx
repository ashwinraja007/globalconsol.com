import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Truck, Plane, Ship, Box, Container, Cuboid } from "lucide-react";

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return null;
};

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  image: string;
  slug: string;
}

interface ServiceCardProps extends Service {
  baseUrl: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  image,
  slug,
  baseUrl,
}) => {
  const url = slug === "services" ? baseUrl : `${baseUrl}/${slug}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group grid grid-cols-1 md:grid-cols-2"
    >
      <div className="w-full h-48 md:h-64">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col justify-center bg-gradient-to-br from-gc-light-gold/10 to-gc-gold/5 bg-stone-200">
        <div className="bg-blue-200 text-gc-dark-blue p-2 rounded-full inline-block mb-2 w-fit">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-semibold text-gc-dark-blue mb-3">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-4">{description}</p>
        <Link
          to={url}
          className="text-gc-blue font-medium hover:text-gc-dark-blue inline-flex items-center text-sm transition-colors duration-300"
        >
          Learn More
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

// Utility: Get country name from URL slug
const getCurrentCountryFromPath = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  const countrySlug = segments[0]?.toLowerCase();
  const map: Record<string, string> = {
    india: "India",
    "sri-lanka": "Sri Lanka",
    myanmar: "Myanmar",
    bangladesh: "Bangladesh",
    pakistan: "Pakistan",
    singapore: "Singapore",
  };
  return map[countrySlug] || "Singapore";
};

const Services: React.FC = () => {
  const location = useLocation();
  const countryName = getCurrentCountryFromPath(location.pathname);

  // Base URL for links
  const firstSegment = location.pathname.split("/").filter(Boolean)[0] || "";
  let baseUrl = "/services";
  if (firstSegment && firstSegment !== "services") {
    baseUrl = `/${firstSegment}/services`;
  }

  const allServices: Service[] = [
    {
      id: 1,
      title: "Air Freight",
      description:
        "Fast and efficient air cargo services for time-sensitive shipments with global reach and reliability.",
      icon: Plane,
      image: "/airfreight.png",
      slug: "air-freight",
    },
    {
      id: 2,
      title: "SEA Freight",
      description:
        "Reliable sea freight for bulk and large-volume cargo with competitive rates and comprehensive coverage.",
      icon: Ship,
      image: "/oceanfreight.png",
      slug: "sea-freight",
    },
    {
      id: 3,
      title: "Warehousing",
      description:
        "Secure storage and order fulfillment services with advanced inventory management systems.",
      icon: Box,
      image: "/warehousing.png",
      slug: "warehousing",
    },
    {
      id: 4,
      title: "Liquid Cargo Transportation",
      description:
        "Safe transport of chemicals, oils, and liquids with specialized handling equipment.",
      icon: Truck,
      image: "/liquidtransportation.png",
      slug: "liquid-cargo",
    },
    {
      id: 5,
      title: "Project Cargo",
      description:
        "Handling of oversized and complex project shipments with specialized expertise.",
      icon: Container,
      image: "/projectcargo.png",
      slug: "project-cargo",
    },
    {
      id: 6,
      title: "3PL",
      description:
        "Third-party logistics for flexible supply chain solutions and operational efficiency.",
      icon: Cuboid,
      image: "/3pl.png",
      slug: "third-party-logistics",
    },
  ];

  // Sri Lanka–specific services
  const sriLankaExtras: Service[] = [
    {
      id: 7,
      title: "Transhipment",
      description:
        "GC offers seamless transhipment solutions for both LCL (Less than Container Load) and FCL (Full Container Load) cargo.",
      icon: Container,
      image: "/transhipment.png",
      slug: "transhipment",
    },
    {
      id: 8,
      title: "Customs House Brokerage",
      description:
        "Our Customs House Brokerage Division delivers fast, reliable, and compliant customs clearance services for both imports and exports.",
      icon: Truck,
      image: "/customhousebrokerage.png",
      slug: "customs-clearance",
    },
  ];

  // Append Sri Lanka extras only if country is Sri Lanka
  const displayedServices =
    countryName === "Sri Lanka"
      ? [...allServices, ...sriLankaExtras]
      : allServices;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gc-dark-blue via-gc-blue to-gc-dark-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/lovable-uploads/gp.jpg"
            alt="Services"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gc-dark-blue/90 to-gc-blue/90 " />
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white mt-7">
              Our Logistics Services
            </h1>
            <div className="w-20 h-1 bg-gc-gold mx-auto mb-6"></div>
            <p className="text-xl text-white/90 leading-relaxed">
              Comprehensive end-to-end global logistics solutions tailored to
              your business needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-gc-light-gold/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayedServices.map((service) => (
              <ServiceCard key={service.id} {...service} baseUrl={baseUrl} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
