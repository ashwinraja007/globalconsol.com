import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Ship } from "lucide-react";
const OceanFreight = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const features = ["Full Container Load (FCL)", "Less than Container Load (LCL)", "Door-to-door delivery", "Customs documentation", "Cargo tracking & monitoring", "Competitive freight rates"];
  return <div className="bg-white text-black min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6 mt-3 bg-kargon-blue">
              <Ship className="w-6 h-6 text-white bg-transparent" />
              <span className="font-semibold text-slate-50">Ocean Freight Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ocean Freight <span className="text-blue-500">Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Cost-effective sea cargo services for your bulk shipments with reliable scheduling
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src="/oceanfreight.png" alt="Ocean Freight Services" className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            x: 50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }} className="space-y-6">
              <h2 className="text-3xl font-bold text-blue-500">Comprehensive Ocean Freight</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                OECL has own fleet of containers including special equipment's to accommodate special requirements of customers and specializes in many trade lanes. 
                Being sea freight professionals with vast experience in the field helps to match frequent sailing and flexible service options.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Multiple carrier options on any trade route with contracted rates helps to secure the space, allocation, timing, pricing and frequency of your shipments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Cards Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* FCL Card */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} viewport={{
          once: true
        }} className="p-6 md:p-8 rounded-2xl shadow-lg border-l-4 border-blue-500 bg-slate-200">
            <h3 className="text-xl md:text-2xl font-bold text-blue-500 mb-4 text-center">FCL Services</h3>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
              FCL is the most optimized container shipping way regarding cost, volume and weight of the cargo.
              We take special care at each step of the process which involves fixing contract pricing with carriers, reserving space, make booking, picking up empty container at the container depot,
              loading at shipper facility, transporting by truck / rail to the port and vessel loading, monitor vessel schedule till final delivery to consignee.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              For import bookings we engage our overseas partners in the absence of our own network and monitor each step and keep our customers / consignees informed at all stages.
            </p>
          </motion.div>

          {/* LCL Card */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} viewport={{
          once: true
        }} className="p-6 md:p-8 rounded-2xl shadow-lg border-l-4 border-blue-500 bg-slate-200">
            <h3 className="text-xl md:text-2xl font-bold text-blue-500 mb-4 text-center">LCL Services</h3>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              OECL operate own consolidation service on many trade routes.
              With its vast network of consolidators, the company is able to provide competitive price with multiple options of sailing.
              With regular consolidation boxes to important trade lanes, the company has the advantage of accommodating cargo which requires timely deliveries.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Transparency Message */}
      <motion.div initial={{
      opacity: 0,
      y: 30
    }} whileInView={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8,
      delay: 0.6
    }} viewport={{
      once: true
    }} className="text-center bg-gradient-to-r from-blue-50 to-blue-100 p-6 md:p-8 rounded-2xl border border-blue-200 shadow-md mx-4 md:mx-auto max-w-4xl mb-12">
        <p className="text-blue-700 text-base md:text-lg font-semibold">
          OECL Provide complete transparency of all the pricing at the origin, destination and ocean freight charges.
        </p>
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>;
};
export default OceanFreight;
