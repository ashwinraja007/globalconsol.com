import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const CustomsClearance = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-28 pb-16 relative overflow-hidden bg-gradient-to-r from-gc-dark-blue to-gc-blue">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Custom <span className="text-gc-gold">House Brokerage</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed"
          >
            <p>
              Our Customs House Brokerage Division delivers fast, reliable, and compliant customs clearance services for both imports and exports. We specialize in efficient and timely customs clearing and forwarding to meet the unique requirements of our customers and overseas partners. From document preparation to coordination with authorities, our experienced team ensures that your cargo moves smoothly without delays or penalties.
            </p>
            <p>
              We handle shipments by sea and air under all major trade terms, including <strong>CIF, Ex-Works, FCA, FOB, DAP, DDU, and DDP</strong>. Whether it’s a one-time shipment or regular cargo movements, we offer tailored solutions to optimize your supply chain. With our in-depth knowledge of customs regulations and a commitment to service excellence, we make cross-border trade <strong>simpler, faster, and more cost-effective</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomsClearance;
