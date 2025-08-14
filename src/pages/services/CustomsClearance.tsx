import { useEffect, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const CustomsClearance = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Build country-aware contact path; default to Singapore when no country slug is present
  const contactPath = useMemo(() => {
    const path = location.pathname.toLowerCase();

    // Add any new country slugs here
    const countries = ["/singapore", "/sri-lanka", "/myanmar", "/bangladesh", "/pakistan"];

    const matched = countries.find((c) => path.startsWith(c + "/") || path === c);
    return matched ? `${matched}/contact` : "/singapore/contact";
  }, [location.pathname]);

  const features = [
    { title: "Express Delivery", description: "Time-critical shipments with guaranteed delivery schedules" },
    { title: "Global Network", description: "Extensive worldwide coverage through our partner airlines" },
    { title: "Secure Handling", description: "Professional cargo handling with full insurance coverage" },
    { title: "Flexible Solutions", description: "Customized air freight solutions for all cargo types" },
  ];

  const services = [
    "Express Air Freight",
    "Consolidated Air Cargo",
    "Charter Flight Services",
    "Door-to-Door Delivery",
    "Customs Clearance",
    "Temperature-Controlled Transport",
    "Hazardous Goods Handling",
    "Real-time Tracking",
  ];

  return (
    <div className="bg-white text-black min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-28 pb-16 relative overflow-hidden bg-gradient-to-r from-gc-dark-blue to-gc-blue">
        <div className="absolute inset-0 bg-gradient-to-r from-gc-dark-blue/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-gc-gold/20 px-6 py-3 mb-5 mt-10 rounded-lg">
              <Plane className="w-6 h-6 text-gc-gold" />
              <span className="text-white font-semibold">Air Freight Services</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Air <span className="text-gc-gold text-slate-50">Freight</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Swift and reliable air cargo solutions connecting your business to global markets
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src="/airfreight.png" alt="Air Freight Services" className="w-full h-96 object-cover" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-gc-dark-blue">Leading Air Freight Solutions</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                As a leading air freight company, GC excels in offering enhanced flexibility and global choice by
                collaborating with a diverse range of specialized carriers. These partners provide tailored schedules and
                solutions, ensuring our clients have more options to meet their specific needs.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our Directors and Managers actively engage with our team members, fostering a hands-on approach to
                deliver a seamlessly integrated and highly professional service. Through our extensive worldwide network,
                we have established a swift and efficient airfreight solution that enables the expedited and
                cost-effective movement of cargo to and from international markets.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                GC specializes in providing customized sea-air and air-sea options, tailored to meet our customers'
                deadlines while achieving significant cost savings. Leveraging our efficient global network, we
                efficiently handle air freight consolidation on numerous major routes.
              </p>
            </motion.div>
          </div>

          {/* Customs Brokerage Support (replacement content) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-10 md:p-12 border border-gray-200 mb-20"
          >
            <h3 className="text-3xl font-bold mb-4 text-gc-dark-blue">Customs Brokerage Support</h3>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Our Customs House Brokerage (CHB) division provides fast, reliable, and fully compliant customs
                clearance for both imports and exports. We specialize in efficient, on-time customs processing and
                forwarding to meet the specific requirements of our customers and overseas partners. From meticulous
                document preparation to seamless coordination with customs and other authorities, our experienced team
                ensures your cargo moves without delays, penalties, or compliance issues.
              </p>
              <p>
                We manage sea and air shipments under all major trade terms, including <strong>CIF, Ex-Works, FCA, FOB,
                DAP, DDU, and DDP</strong>. Whether it’s a one-time shipment or regular cargo movements, we offer
                tailored solutions to optimize your supply chain performance. With deep expertise in customs regulations
                and a strong commitment to service excellence, we make cross-border trade <strong>simpler, faster, and
                more cost-effective</strong>.
              </p>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-gc-gold to-gc-light-gold text-white p-12 rounded-2xl"
          >
            <h3 className="text-3xl font-bold mb-6 text-slate-950">Ready to Ship Your Cargo?</h3>
            <p className="text-xl mb-8 opacity-90 text-slate-950">
              Get a quick consultation and our experts are here to help you out
            </p>

            {/* Button routes to matched country or Singapore by default */}
            <Link to={contactPath}>
              <button className="bg-white text-gc-dark-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 text-lg">
                Get Quote Now
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomsClearance;
