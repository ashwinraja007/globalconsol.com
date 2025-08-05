import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Plane, Clock, Globe, Shield, CheckCircle, Truck, Package } from "lucide-react";
import { Link } from "react-router-dom";
const AirFreight = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const features = [{
    icon: Clock,
    title: "Express Delivery",
    description: "Time-critical shipments with guaranteed delivery schedules"
  }, {
    icon: Globe,
    title: "Global Network",
    description: "Extensive worldwide coverage through our partner airlines"
  }, {
    icon: Shield,
    title: "Secure Handling",
    description: "Professional cargo handling with full insurance coverage"
  }, {
    icon: Package,
    title: "Flexible Solutions",
    description: "Customized air freight solutions for all cargo types"
  }];
  const services = ["Express Air Freight", "Consolidated Air Cargo", "Charter Flight Services", "Door-to-Door Delivery", "Customs Clearance", "Temperature-Controlled Transport", "Hazardous Goods Handling", "Real-time Tracking"];
  return <div className="bg-white text-black min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-28 pb-16 relative overflow-hidden bg-gradient-to-r from-gc-dark-blue to-gc-blue">
        <div className="absolute inset-0 bg-gradient-to-r from-gc-dark-blue/20 to-transparent"></div>
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
            <div className="inline-flex items-center gap-3 bg-gc-gold/20 px-6 py-3 rounded-full mb-6">
              <Plane className="w-6 h-6 text-gc-gold" />
              <span className="text-white font-semibold">Air Freight Services</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Air <span className="text-gc-gold">Freight</span>
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
                <img src="/airfreight.png" alt="Air Freight Services" className="w-full h-96 object-cover" />
                <div className="absolute top-6 left-6 bg-gc-gold text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">As a leading air freight company, we excels in offering enhanced flexibility and global choice by collaborating with a diverse range of specialized carriers. These partners provide tailored schedules and solutions, ensuring our clients have more options to meet their specific needs.</div>
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
              <h2 className="text-4xl font-bold text-gc-dark-blue">Leading Air Freight Solutions</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                As a leading air freight company, OECL excels in offering enhanced flexibility and global choice by collaborating with a diverse range of specialized carriers. These partners provide tailored schedules and solutions, ensuring our clients have more options to meet their specific needs.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our Directors and Managers actively engage with our team members, fostering a hands-on approach to deliver a seamlessly integrated and highly professional service. Through our extensive worldwide network, we have established a swift and efficient airfreight solution that enables the expedited and cost-effective movement of cargo to and from international markets.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                OECL specializes in providing customized sea-air and air-sea options, tailored to meet our customers' deadlines while achieving significant cost savings. Leveraging our efficient global network, we efficiently handle air freight consolidation on numerous major routes.
              </p>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="mb-20">
            <h3 className="text-3xl font-bold text-gc-dark-blue text-center mb-12">Why Choose Our Air Freight Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => <div key={index} className="text-center p-6 bg-gradient-to-b from-gc-light-gold/10 to-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="bg-gc-gold/20 p-4 rounded-full inline-block mb-4">
                    <feature.icon className="w-8 h-8 text-gc-dark-blue" />
                  </div>
                  <h4 className="text-xl font-semibold text-gc-dark-blue mb-3">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>)}
            </div>
          </motion.div>

          {/* Services List */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="mb-20">
            <div className="bg-gradient-to-br from-gc-dark-blue to-gc-blue text-white rounded-2xl p-12">
              <h3 className="text-3xl font-bold mb-8 text-center">Our Air Freight Services Include</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service, index) => <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-gc-gold flex-shrink-0" />
                    <span className="text-lg">{service}</span>
                  </div>)}
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="text-center bg-gradient-to-r from-gc-gold to-gc-light-gold text-white p-12 rounded-2xl">
            <h3 className="text-3xl font-bold mb-6">Ready to Ship Your Cargo?</h3>
            <p className="text-xl mb-8 opacity-90">Get a quick consultation and our experts are here to help you out</p>
            <Link to="/contact">
              <button className="bg-white text-gc-dark-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 text-lg">
                Get Quote Now
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default AirFreight;