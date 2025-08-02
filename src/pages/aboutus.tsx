import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Truck, Ship, Globe, Users, Award, TrendingUp, CheckCircle, Star } from "lucide-react";
const ScrollToTop = () => {
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname]);
  return null;
};
const AboutUs = () => {
  const stats = [{
    number: "30+",
    label: "Years Experience",
    icon: TrendingUp
  }, {
    number: "500+",
    label: "Global Clients",
    icon: Users
  }, {
    number: "50+",
    label: "Countries Served",
    icon: Globe
  }, {
    number: "99%",
    label: "Customer Satisfaction",
    icon: Award
  }];
  const features = ["World-class logistics services", "Cutting-edge technology solutions", "Dedicated professional team", "Global office network", "24/7 customer support", "Competitive pricing"];
  return <div className="bg-black text-white min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-white bg-slate-50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
          }} className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-950">
                About <span className="text-red-500">OECL</span>
              </h1>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed text-slate-950">
                Your premier global logistics and supply chain partner, delivering excellence across Southeast Asia and beyond
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* Text Section */}
              <motion.div initial={{
              opacity: 0,
              x: -50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }} viewport={{
              once: true
            }} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-red-500 mb-4">Our Story</h2>
                  <p className="text-lg leading-relaxed text-slate-950">
                    Established in 2008 by a team of well-experienced professionals, OECL is headquartered in Singapore and stands as one of the premier global logistics and supply chain partners in the region.
                  </p>
                  <p className="text-lg leading-relaxed text-slate-950">
                    With over 30 years of combined experience, we deliver world-class logistics services with passion and commitment across various industries, helping businesses optimize their supply chain operations.
                  </p>
                  <p className="text-lg leading-relaxed font-normal text-slate-950">
                    Our outstanding performance in handling diverse products efficiently is backed by our dedicated team, streamlined processes, and cutting-edge technology that powers our expanding global office network.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6">
                  {features.map((feature, index) => <motion.div key={index} initial={{
                  opacity: 0,
                  y: 20
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.5,
                  delay: 0.1 * index
                }} viewport={{
                  once: true
                }} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-sm text-slate-950">{feature}</span>
                    </motion.div>)}
                </div>

                <Link to="/contact" className="inline-block pt-4">
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-red-500/30 transition-all duration-300">
                    Get In Touch
                  </Button>
                </Link>
              </motion.div>

              {/* Image Section */}
              <motion.div initial={{
              opacity: 0,
              x: 50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.8,
              delay: 0.4
            }} viewport={{
              once: true
            }} className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img alt="OECL Operations" loading="lazy" className="w-full h-96 object-cover" src="/customclearance.png" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-red-600 p-4 rounded-xl shadow-lg">
                  <Ship className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          }} className="text-center mb-12 bg-inherit">
              <h2 className="text-4xl font-bold mb-4 text-slate-950">Our Impact</h2>
              <p className="text-lg text-slate-900">Numbers that speak to our commitment and excellence</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 0.1 * index
            }} viewport={{
              once: true
            }} className="text-center group">
                  <div className="bg-red-600/20 p-4 rounded-2xl mb-4 group-hover:bg-red-600/30 transition-colors duration-300 mx-auto w-fit">
                    <stat.icon className="w-8 h-8 text-red-500 mx-auto" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 text-slate-950">{stat.number}</h3>
                  <p className="text-slate-900">{stat.label}</p>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          }} className="text-center">
              <h2 className="text-4xl font-bold mb-8 text-slate-950">Our Vision</h2>
              <div className="bg-gradient-to-r from-red-600/20 to-transparent p-8 rounded-2xl bg-red-600">
                <p className="text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
                  With strategic plans to expand into more Southeast Asian countries, OECL is positioned to meet the growing demands of the international logistics market. We envision becoming the most trusted logistics partner in the region, connecting businesses globally through innovative solutions and exceptional service.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default AboutUs;
