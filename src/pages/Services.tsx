const Services: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Determine if first segment is 'services' (no country), or country slug
  const firstSegment = pathSegments[0] || "";
  const secondSegment = pathSegments[1] || "";

  // baseUrl for links
  let baseUrl = "/services"; // default
  if (firstSegment && firstSegment !== "services") {
    if (secondSegment === "services") {
      baseUrl = `/${firstSegment}/services`;
    } else {
      baseUrl = `/${firstSegment}/services`;
    }
  }

  // Default services
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

  // Sri Lanka–specific extra services
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

  // Show extra services only if firstSegment is 'sri-lanka'
  const displayedServices =
    firstSegment.toLowerCase() === "sri-lanka"
      ? [...allServices, ...sriLankaExtras]
      : allServices;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Navigation />
      <main className="flex-grow pt-20">
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
                <ServiceCard
                  key={service.id}
                  {...service}
                  baseUrl={baseUrl}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
