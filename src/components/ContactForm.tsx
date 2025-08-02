import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Building2, CheckCircle2 } from "lucide-react";
import { useLocation } from "react-router-dom";

const ContactForm = () => {
  const location = useLocation();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [indiaPage, setIndiaPage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);

  const allOffices = {
    Singapore: [
      {
        name: "Singapore Office",
        address: "Blk 511 Kampong Bahru Road, #03-01 Keppel Distripark, Singapore 099447",
        phone: "+65 6224 1338 / +65 6224 1336",
      },
    ],
    Malaysia: [
      {
        name: "Port Klang Office",
        address: "MTBBT 2, 3A-5, Jalan Batu Nilam 16, The Landmark (Behind AEON Mall), Bandar Bukit Tinggi 2, 41200 Klang, Selangor D.E",
        phone: "+603 - 3319 2778 / 74 / 75",
      },
      {
        name: "Pasir Gudang Office",
        address: "Unit 20-03A, Level 20 Menara Zurich, 15 Jalan Dato Abdullah Tahir, 80300 Johor Bahru",
        phone: "603-3319 2778 / 74 / 75, 79",
      },
    ],
    India: [
      {
        name: "Chennai Office",
        address: "Roma Building, Door No. 10, 3rd Floor, G.S.T. Road, Alandur, Chennai-600 016",
        phone: "044 4689 4646",
      },
      {
        name: "Chennai Warehouse",
        address: "Survey No.209/6A(Part)209/6B(Part), Mannur & Valarpuram Village, Perambakkam Road, Sriperumbudur Taluk, Kanchipuram District-602105",
        phone: "+91 9994355523",
      },
    ],
    Indonesia: [
      {
        name: "Jakarta Office",
        address: "408, Lina Building, JL.HR Rasuna Said kav B7, Jakarta",
        phone: "+62 21 529 20292, 522 4887",
      },
    ],
    Thailand: [
      {
        name: "Bangkok Office",
        address: "109 CCT Building, 3rd Floor, Rm.3, Surawong Road, Suriyawongse, Bangrak, Bangkok 10500",
        phone: "+662-634-3240, +662-634-3942",
      },
    ],
  };

  const getCurrentCountry = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("/india")) return "India";
    if (path.includes("/malaysia")) return "Malaysia";
    if (path.includes("/indonesia")) return "Indonesia";
    if (path.includes("/thailand")) return "Thailand";
    return "Singapore";
  };

  const currentCountry = getCurrentCountry();
  const currentOffices = allOffices[currentCountry] || [];

  useEffect(() => {
    setSelectedLocation(currentCountry);
  }, [currentCountry]);

  useEffect(() => {
    if (currentCountry === "India") {
      const interval = setInterval(() => {
        setIndiaPage((prev) => (prev === 0 ? 1 : 0));
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [currentCountry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const emails = ["karthikjungleemara@gmail", "karthiktrendsandtactics@gmail.com"]; // Replace with your second recipient

    try {
      for (const email of emails) {
        await fetch(`https://formsubmit.co/ajax/${email}`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });
      }

      form.reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Ready to streamline your logistics? Contact us today for a customized solution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Office List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-red-600" /> Our Offices
            </h3>
            {(currentCountry === "India"
              ? currentOffices.slice(indiaPage * 4, indiaPage * 4 + 4)
              : currentOffices
            ).map((office, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 + idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg border-2 border-red-500 bg-red-50"
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  {office.name}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                    <p className="text-gray-600 text-sm">{office.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-red-600" />
                    <a href={`tel:${office.phone}`} className="text-sm text-gray-600 hover:text-red-600">
                      {office.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            <p className="text-gray-600 mb-6">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="box" />
              <input type="hidden" name="_subject" value={`New Contact Submission from ${selectedLocation}`} />
              <input type="hidden" name="Preferred_Location" value={selectedLocation} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">First Name *</label>
                  <Input placeholder="Enter your first name" name="First Name" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Last Name *</label>
                  <Input placeholder="Enter your last name" name="Last Name" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address *</label>
                  <Input type="email" name="Email" placeholder="Enter your email" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <Input name="Phone" placeholder="Enter your phone number" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Company/Organization</label>
                <Input name="Organization" placeholder="Enter your company name" />
              </div>

              <div className="space-y-2 max-w-md mx-auto p-4 bg-white rounded-lg shadow">
                <label className="text-sm font-medium text-gray-700">Preferred Office Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select office location" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Singapore (HQ)", "Malaysia", "India", "Thailand", "Indonesia",
                      "Sri Lanka", "Myanmar", "Pakistan", "Bangladesh", "UK", "USA"
                    ].map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Message *</label>
                <Textarea name="Message" placeholder="Tell us about your logistics needs..." required rows={5} />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </motion.div>

              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 rounded-xl bg-green-100 border border-green-400 text-green-800 shadow flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <p className="text-sm md:text-base font-medium">
                    Your message has been sent successfully. We’ll get back to you soon!
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
