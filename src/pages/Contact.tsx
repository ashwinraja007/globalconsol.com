import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LocationsSection from "@/components/LocationsSection";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Send, XCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const Contact: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const locationNames = ["SINGAPORE", "SRI LANKA", "MYANMAR", "BANGLADESH", "PAKISTAN", "UK", "USA"];
  const location = useLocation();

  // Function to detect country slug from pathname
  const getCountryFromPath = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("/singapore")) return "SINGAPORE";
    if (path.includes("/sri-lanka")) return "SRI LANKA";
    if (path.includes("/myanmar")) return "MYANMAR";
    if (path.includes("/bangladesh")) return "BANGLADESH";
    if (path.includes("/pakistan")) return "PAKISTAN";
    if (path.includes("/uk")) return "UK";
    if (path.includes("/usa")) return "USA";
    return "DEFAULT";
  };

  // Map of country to email addresses
  const emailMap: Record<string, string[]> = {
    "SINGAPORE": ["https://formsubmit.co/ajax/karthikjungleemara@gmail.com"],
    "SRI LANKA": ["https://formsubmit.co/ajax/karthiktrendsandtactics@gmail.com"],
    "MYANMAR": ["https://formsubmit.co/ajax/myanmar@example.com"],
    "BANGLADESH": ["https://formsubmit.co/ajax/bangladesh@example.com"],
    "PAKISTAN": ["https://formsubmit.co/ajax/pakistan@example.com"],
    "UK": ["https://formsubmit.co/ajax/uk@example.com"],
    "USA": ["https://formsubmit.co/ajax/usa@example.com"],
    "DEFAULT": [
      "https://formsubmit.co/ajax/karthikjungleemara@gmail.com"
    ]
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const country = getCountryFromPath();
    const urls = emailMap[country] || emailMap["DEFAULT"];

    try {
      const responses = await Promise.all(
        urls.map(url =>
          fetch(url, {
            method: "POST",
            body: formData
          })
        )
      );
      const allSuccessful = responses.every(res => res.ok);
      if (allSuccessful) {
        setShowNotification(true);
        form.reset();
        setSelectedLocation("");
        setTimeout(() => setShowNotification(false), 4000);
      } else {
        alert("One or more submissions failed. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-[40vh] flex items-center justify-center bg-blue-700 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black to-blue-900/90" />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center px-4 relative z-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Get in Touch</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto font-light">
              We're here to help and answer any questions you might have.
            </p>
          </motion.div>
        </motion.section>

        {/* Locations */}
        <section className="py-16 bg-gradient-to-b from-blue-50/30 to-white">
          <div className="container mx-auto px-4">
            <LocationsSection />
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-white" id="contact-form">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
              >
                <h2 className="text-3xl font-bold mb-2 text-black text-center">Send us a Message</h2>
                <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
                <p className="text-gray-600 mb-8 text-center">
                  Fill in the form below and we'll get back to you as soon as possible.
                </p>

                {showNotification && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Send size={18} />
                      <span>Message sent successfully!</span>
                    </div>
                    <button onClick={() => setShowNotification(false)} className="text-green-800">
                      <XCircle size={18} />
                    </button>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="box" />
                  <input type="hidden" name="_subject" value="New Contact Form Submission" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">First Name *</label>
                      <Input name="First Name" required placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Last Name *</label>
                      <Input name="Last Name" required placeholder="Enter your last name" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email Address *</label>
                      <Input name="Email" required type="email" placeholder="Enter your email" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <Input name="Phone" placeholder="Enter your phone number" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Company/Organization</label>
                    <Input name="Organization" placeholder="Enter your company name" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Preferred Location *</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred office location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locationNames.map(loc => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="Preferred Location" value={selectedLocation} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Message *</label>
                    <Textarea
                      name="Message"
                      required
                      placeholder="Tell us about your logistics needs..."
                      rows={5}
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
