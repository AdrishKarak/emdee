"use client";

import Navbar from "@/components/Navbar";
import { useState, useRef, useEffect } from "react";
import { MapPin, Mail, Phone, Building2, Send } from "lucide-react";
import { motion, useInView } from "motion/react";

export function meta() {
  return [
    { title: "Contact Us - Get in Touch | Emdee Techno Services" },
    { name: "description", content: "Contact Emdee Techno Services for IT solutions, software development, manpower services, and more. Reach out to discuss your business needs." },
    { property: "og:title", content: "Contact Us - Get in Touch | Emdee Techno Services" },
    { property: "og:description", content: "Contact Emdee Techno Services for IT solutions, software development, manpower services, and more." },
    { property: "og:url", content: "https://emdee.in/contact" }
  ];
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    organisation: "",
    contactNumber: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Refs for mobile animations
  const addressTileRef = useRef(null);
  const formTileRef = useRef(null);
  const regionalOfficesTileRef = useRef(null);
  const contactDetailsTileRef = useRef(null);
  const logoRef = useRef(null);

  const isAddressTileInView = useInView(addressTileRef, {
    once: true,
    amount: 0.2,
  });
  const isFormTileInView = useInView(formTileRef, { once: true, amount: 0.2 });
  const isRegionalOfficesInView = useInView(regionalOfficesTileRef, {
    once: true,
    amount: 0.2,
  });
  const isContactDetailsInView = useInView(contactDetailsTileRef, {
    once: true,
    amount: 0.2,
  });
  const isLogoInView = useInView(logoRef, { once: true, amount: 0.5 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you! We'll get back to you soon.",
      });
      setFormData({
        name: "",
        organisation: "",
        contactNumber: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-qanelas-soft relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#0B3D91]/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FF6B35]/5 blur-[120px] pointer-events-none z-0" />

      <Navbar variant="glass" />

      <div className="pt-32 pb-20 px-6 lg:px-8 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl lg:text-6xl font-bold bg-gradient-to-b from-white to-[#FF6B35] bg-clip-text text-transparent mb-4"
            >
              Contact Us
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="text-xl text-[#E5E5E5] max-w-2xl mx-auto"
            >
              We're here to help. Reach out to us for any queries or support.
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
            {/* Left Side - Main Offices (HQ + 2nd Office only) */}
            <motion.div
              ref={addressTileRef}
              initial={{ opacity: 0, y: 40 }}
              animate={
                isAddressTileInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 40 }
              }
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-[#1A1A1A]/80 backdrop-blur-md border border-[#2A2A2A] rounded-2xl p-8 space-y-8 flex flex-col shadow-2xl"
            >
              <div className="text-center -mt-[10px] mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                  <Building2
                    className="text-[#FF6B35]"
                    size={24}
                    strokeWidth={1.5}
                  />
                  Our Offices
                </h2>
              </div>

              {/* Kolkata HQ */}
              <div className="space-y-4 flex-1 mt-32 lg:mt-0">
                <div className="flex items-start gap-3">
                  <Building2
                    className="text-[#0B3D91] mt-1 flex-shrink-0"
                    size={20}
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Kolkata HQ
                    </h3>
                    <p className="text-[#E5E5E5] text-sm leading-relaxed">
                      DH6/27, Action Area 1D, New Town, Kolkata - 700156
                    </p>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/aVHFv1tHdH6Y4Gxm6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl overflow-hidden border border-[#2A2A2A] hover:border-[#FF6B35] transition-all duration-300 group shadow-lg"
                >
                  <div className="relative">
                    <img
                      src="https://ucarecdn.com/87807d95-bf36-4644-a9bc-259af076376b/-/format/auto/"
                      alt="Kolkata HQ Location"
                      className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white font-semibold flex items-center gap-2">
                        <MapPin size={18} />
                        View on Google Maps
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Kolkata 2nd Office */}
              <div className="space-y-4 pt-6 border-t border-[#2A2A2A] flex-1">
                <div className="flex items-start gap-3">
                  <Building2
                    className="text-[#0B3D91] mt-1 flex-shrink-0"
                    size={20}
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Kolkata 2nd Office
                    </h3>
                    <p className="text-[#E5E5E5] text-sm leading-relaxed">
                      2B, Saraswati Apartment, 114/1 Golaghata Road, North 24
                      Parganas, West Bengal, Kolkata - 700048
                    </p>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/mVii96NDyJSU8Tch9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl overflow-hidden border border-[#2A2A2A] hover:border-[#FF6B35] transition-all duration-300 group shadow-lg"
                >
                  <div className="relative">
                    <img
                      src="https://ucarecdn.com/06926347-f491-4909-b1f6-d38e2d4fed6c/-/format/auto/"
                      alt="Kolkata 2nd Office Location"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white font-semibold flex items-center gap-2">
                        <MapPin size={18} />
                        View on Google Maps
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Mobile Only - Regional Offices */}
              <div className="lg:hidden space-y-6 pt-6 border-t border-[#2A2A2A]">
                {/* Patna Office */}
                <div className="flex items-start gap-3">
                  <Building2
                    className="text-[#0B3D91] mt-1 flex-shrink-0"
                    size={18}
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">
                      Patna Office
                    </h3>
                    <p className="text-[#E5E5E5] text-xs leading-relaxed">
                      ANANDPURI, 6/5, West Boring Canal Road, Patna, Bihar -
                      800001
                    </p>
                  </div>
                </div>

                {/* Malda Office */}
                <div className="flex items-start gap-3">
                  <Building2
                    className="text-[#0B3D91] mt-1 flex-shrink-0"
                    size={18}
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">
                      Malda Office
                    </h3>
                    <p className="text-[#E5E5E5] text-xs leading-relaxed">
                      5th floor Shivram Bhavan, R. K Mission Road, English
                      Bazar, Malda - 732101
                    </p>
                  </div>
                </div>

                {/* Behrumpore Office */}
                <div className="flex items-start gap-3">
                  <Building2
                    className="text-[#0B3D91] mt-1 flex-shrink-0"
                    size={18}
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">
                      Behrumpore Office
                    </h3>
                    <p className="text-[#E5E5E5] text-xs leading-relaxed">
                      2 No. Barrack Square (South), P.O & P.S- Berhampore,
                      Murshidabad- 742101
                    </p>
                  </div>
                </div>

                {/* Chitrakoot Office */}
                <div className="flex items-start gap-3">
                  <Building2
                    className="text-[#0B3D91] mt-1 flex-shrink-0"
                    size={18}
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">
                      Chitrakoot Office
                    </h3>
                    <p className="text-[#E5E5E5] text-xs leading-relaxed">
                      Ground 0, Baldau Ganj Kashi Road, Vakrangee Kendra,
                      Chitrakoot, Uttar Pradesh, 210205
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              ref={formTileRef}
              initial={{ opacity: 0, y: 40 }}
              animate={
                isFormTileInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
              }
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.1,
              }}
              className="bg-[#1A1A1A]/80 backdrop-blur-md border border-[#2A2A2A] rounded-2xl p-8 lg:p-10 flex flex-col h-full shadow-2xl"
            >
              <div className="mb-6">
                <h2 className="text-[1.75rem] lg:text-3xl font-bold text-white mb-2 text-center">
                  Get in Touch for Queries & Grievances
                </h2>
                <p className="text-[#999] text-center">
                  We will get back to you soon
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 flex-1 flex flex-col gap-6"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#E5E5E5] mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#FF6B35] transition-colors duration-200"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Organisation */}
                <div>
                  <label
                    htmlFor="organisation"
                    className="block text-sm font-medium text-[#E5E5E5] mb-2"
                  >
                    Organisation *
                  </label>
                  <input
                    type="text"
                    id="organisation"
                    name="organisation"
                    required
                    value={formData.organisation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#FF6B35] transition-colors duration-200"
                    placeholder="Enter your organisation"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-medium text-[#E5E5E5] mb-2"
                  >
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    required
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#FF6B35] transition-colors duration-200"
                    placeholder="Enter your contact number"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#E5E5E5] mb-2"
                  >
                    Email ID *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#FF6B35] transition-colors duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#E5E5E5] mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full min-h-[100px] px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#FF6B35] transition-colors duration-200 resize-none"
                    placeholder="Enter your message"
                  />
                </div>

                {/* Submit Status */}
                {submitStatus && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitStatus.type === "success"
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3.5 bg-gradient-to-b from-[#FF6B35] to-[#E55A28] text-white font-semibold rounded-lg hover:from-[#FF7A45] hover:to-[#F56838] transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send size={18} />
                      Submit
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Regional Offices Section - Desktop Only */}
          <motion.div
            ref={regionalOfficesTileRef}
            initial={{ opacity: 0, y: 40 }}
            animate={
              isRegionalOfficesInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 }
            }
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.15,
            }}
            className="hidden lg:block max-w-full mx-auto mb-12"
          >
            <div className="bg-[#1A1A1A]/80 backdrop-blur-md border border-[#2A2A2A] rounded-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                Regional Offices
              </h3>
              <div className="grid grid-cols-4 gap-6">
                {/* Patna Office */}
                <motion.div 
                  whileHover={{ y: -4, borderColor: "rgba(255, 107, 53, 0.4)", boxShadow: "0 10px 30px rgba(255, 107, 53, 0.05)" }}
                  className="flex flex-col gap-2 p-5 bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Building2
                      className="text-[#0B3D91] flex-shrink-0"
                      size={18}
                      strokeWidth={1.5}
                    />
                    <h4 className="text-base font-semibold text-white">
                      Patna Office
                    </h4>
                  </div>
                  <p className="text-[#E5E5E5] text-sm leading-relaxed">
                    ANANDPURI, 6/5, West Boring Canal Road, Patna, Bihar -
                    800001
                  </p>
                </motion.div>

                {/* Malda Office */}
                <motion.div 
                  whileHover={{ y: -4, borderColor: "rgba(255, 107, 53, 0.4)", boxShadow: "0 10px 30px rgba(255, 107, 53, 0.05)" }}
                  className="flex flex-col gap-2 p-5 bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Building2
                      className="text-[#0B3D91] flex-shrink-0"
                      size={18}
                      strokeWidth={1.5}
                    />
                    <h4 className="text-base font-semibold text-white">
                      Malda Office
                    </h4>
                  </div>
                  <p className="text-[#E5E5E5] text-sm leading-relaxed">
                    5th floor Shivram Bhavan, R. K Mission Road, English Bazar,
                    Malda - 732101
                  </p>
                </motion.div>

                {/* Behrumpore Office */}
                <motion.div 
                  whileHover={{ y: -4, borderColor: "rgba(255, 107, 53, 0.4)", boxShadow: "0 10px 30px rgba(255, 107, 53, 0.05)" }}
                  className="flex flex-col gap-2 p-5 bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Building2
                      className="text-[#0B3D91] flex-shrink-0"
                      size={18}
                      strokeWidth={1.5}
                    />
                    <h4 className="text-base font-semibold text-white">
                      Behrumpore Office
                    </h4>
                  </div>
                  <p className="text-[#E5E5E5] text-sm leading-relaxed">
                    2 No. Barrack Square (South), P.O & P.S- Berhampore,
                    Murshidabad- 742101
                  </p>
                </motion.div>

                {/* Chitrakoot Office */}
                <motion.div 
                  whileHover={{ y: -4, borderColor: "rgba(255, 107, 53, 0.4)", boxShadow: "0 10px 30px rgba(255, 107, 53, 0.05)" }}
                  className="flex flex-col gap-2 p-5 bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Building2
                      className="text-[#0B3D91] flex-shrink-0"
                      size={18}
                      strokeWidth={1.5}
                    />
                    <h4 className="text-base font-semibold text-white">
                      Chitrakoot Office
                    </h4>
                  </div>
                  <p className="text-[#E5E5E5] text-sm leading-relaxed">
                    Ground 0, Baldau Ganj Kashi Road, Vakrangee Kendra,
                    Chitrakoot, Uttar Pradesh, 210205
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Details Section */}
          <motion.div
            ref={contactDetailsTileRef}
            initial={{ opacity: 0, y: 40 }}
            animate={
              isContactDetailsInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 }
            }
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2,
            }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="bg-[#1A1A1A]/80 backdrop-blur-md border border-[#2A2A2A] rounded-2xl p-8 space-y-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-12 text-center">
                Contact Details
              </h2>

              {/* Email Addresses */}
              <motion.div 
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.12
                    }
                  }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-6"
              >
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <Mail
                      className="text-[#FF6B35] flex-shrink-0"
                      size={20}
                      strokeWidth={1.5}
                    />
                    <p className="text-sm text-[#999]">Vendor Queries</p>
                  </div>
                  <a
                    href="mailto:purchase@emdee.in"
                    className="text-[#E5E5E5] hover:text-[#FF6B35] transition-colors duration-200"
                  >
                    purchase@emdee.in
                  </a>
                </motion.div>

                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <Mail
                      className="text-[#FF6B35] flex-shrink-0"
                      size={20}
                      strokeWidth={1.5}
                    />
                    <p className="text-sm text-[#999]">General Queries</p>
                  </div>
                  <a
                    href="mailto:admin@emdee.in"
                    className="text-[#E5E5E5] hover:text-[#FF6B35] transition-colors duration-200"
                  >
                    admin@emdee.in
                  </a>
                </motion.div>

                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <Mail
                      className="text-[#FF6B35] flex-shrink-0"
                      size={20}
                      strokeWidth={1.5}
                    />
                    <p className="text-sm text-[#999]">Opportunity Queries</p>
                  </div>
                  <a
                    href="mailto:hr.support@emdee.in"
                    className="text-[#E5E5E5] hover:text-[#FF6B35] transition-colors duration-200"
                  >
                    hr.support@emdee.in
                  </a>
                </motion.div>
              </motion.div>

              {/* Phone */}
              <div className="pt-4 border-t border-[#2A2A2A]">
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center gap-2">
                    <Phone
                      className="text-[#0B3D91]"
                      size={20}
                      strokeWidth={1.5}
                    />
                    <p className="text-sm text-[#999]">Call Us</p>
                  </div>
                  <span className="text-[#666]">|</span>
                  <a
                    href="tel:+913340692109"
                    className="text-[#E5E5E5] hover:text-[#FF6B35] transition-colors duration-200 font-medium text-lg"
                  >
                    033 4069 2109
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Slogan */}
          <motion.div
            ref={logoRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              isLogoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.3,
            }}
            className="mt-20 text-center"
          >
            <p className="text-[1.7rem] lg:text-3xl font-bold bg-gradient-to-r from-[#FF6B35] via-white to-[#0B3D91] bg-clip-text text-transparent">
              Powering Digital India - through Platforms, Products and People.
            </p>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
