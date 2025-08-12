
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import CountryHeroSection from "@/components/CountryHeroSection";
import TrackOrder from "@/components/TrackOrder";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GlobalPresence from "@/components/GlobalPresence";
import ContactForm from "@/components/ContactForm";
import Certification from "@/components/Certification";
import Footer from "@/components/Footer";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const SriLankaHome = () => {
  useScrollToTop();

  useEffect(() => {
    const handleScroll = () => {
      const scrollAnimElements = document.querySelectorAll('.scroll-animate');
      scrollAnimElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.9) {
          element.classList.add('appear');
        }
      });
    };

    setTimeout(handleScroll, 100);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-white">
      <Navigation />
      <CountryHeroSection country="sri-lanka" />
      <TrackOrder />
      <AboutSection />
      <Certification />
      <ServicesSection />
      <GlobalPresence />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default SriLankaHome;
