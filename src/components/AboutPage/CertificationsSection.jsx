import { useState } from "react";
import { X, Eye } from "lucide-react";
import { motion } from "motion/react";

const certifications = [
  {
    title: "ISO 9001:2015",
    heading: "Quality Management System (QMS)",
    issuer: "TÜV SÜD Certified",
    images: [
      "https://ucarecdn.com/5c45e4b7-7fa0-428b-b593-9a11b77e8a5e/-/format/auto/",
    ],
    content:
      "Demonstrates our alignment with the quality framework of highest standard, signalling reliable, process-driven delivery and consistent service quality across IT infrastructure, software development, IT manpower, security, IT-enabled services, and maintenance.",
    tags: ["Quality Control", "Process Delivery", "Service Excellence"],
  },
  {
    title: "ISO/IEC 27001:2022",
    heading: "Information Security Management (ISMS)",
    issuer: "TÜV SÜD Certified",
    images: [
      "https://ucarecdn.com/59b7858a-c1e8-411b-8bb3-e1c0b1f707b8/-/format/auto/",
    ],
    content:
      "Demonstrates our adherence to the highest standards of security practices across people, process, and technology, signalling strong governance of data security, access control, risk management, and incident readiness for our IT operations, services, systems and software.",
    tags: ["Data Privacy", "Cyber Security", "Risk Governance"],
  },
  {
    title: "ISO/IEC 20000-1:2018",
    heading: "IT Service Management (ITSM)",
    issuer: "TÜV SÜD Certified",
    images: [
      "https://create-flux-file-upload-production.s3.amazonaws.com/user-uploads/97aaf6d0-f065-48e0-a29a-fb2300e6436f.png",
    ],
    content:
      "Demonstrates the highest standards of capacity for structured, reliable delivery of IT-enabled services with strong service governance, defined SLAs, customer experience & support, operational consistency and effective management.",
    tags: ["SLA Assurance", "Service Quality", "ITIL Compliance"],
  },
  {
    title: "Certificate of Appreciation (x2)",
    heading: "Statutory Compliance Leadership",
    issuer: "Ministry of Finance, GoI",
    images: [
      "https://ucarecdn.com/f7f0a9be-7816-4e13-b717-8f1802f7d815/-/format/auto/",
      "https://ucarecdn.com/95e42ed2-8bbd-46ae-89f1-a798cc28c739/-/format/auto/",
    ],
    content:
      "Puts EMDEE in the top 0.004% of taxpayers (55k recipients out of 15 million GST taxpayers; Issued every 4 years by Ministry of Finance) and acknowledges timely tax filings and disciplined regulatory compliance, reflecting highest standards of financial governance and integrity.",
    tags: ["Top Taxpayer", "Compliance Leader", "Corporate Integrity"],
  },
];

export function CertificationsSection() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Stagger variants
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <>
      <div className="w-full bg-[#0A0A0A] py-16 md:py-24 px-4 md:px-8 border-t border-white/5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#0B3D91]/5 opacity-[0.4] blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-12 md:mb-20"
          >
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
              <span className="text-[10px] font-semibold tracking-[0.2em] text-white/70 uppercase">
                TRUST & ACCREDITATION
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-qanelas-soft font-bold text-white mb-4 md:mb-6">
              Our Certifications
            </h2>
            <p className="text-[#999999] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Signalling the highest standards of{" "}
              <span className="font-semibold text-white">quality</span>,{" "}
              <span className="font-semibold text-white">reliability</span>, and{" "}
              <span className="font-semibold text-white">integrity</span> — the three pillars of EMDEE's governance.
            </p>
          </motion.div>

          {/* Grid Layout */}
          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
          >
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="relative flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:border-white/15 hover:bg-white/[0.04] transition-all duration-500 group overflow-hidden shadow-2xl"
              >
                {/* Accent glow background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D91]/10 via-transparent to-[#FF6B35]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Left: Certificate Image Gallery */}
                <div className="flex-shrink-0 flex sm:flex-col gap-3 justify-center items-center w-full sm:w-auto relative z-10">
                  {cert.images.map((image, imgIdx) => (
                    <div
                      key={imgIdx}
                      onClick={() => setSelectedImage(image)}
                      className="relative w-28 h-36 md:w-32 md:h-40 rounded-xl border border-white/10 overflow-hidden cursor-pointer shadow-lg group/img"
                    >
                      <img
                        src={image}
                        alt={`${cert.title} preview`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white transform scale-90 group-hover/img:scale-100 transition-transform duration-300" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Certificate Details */}
                <div className="flex-1 flex flex-col justify-between relative z-10 min-w-0">
                  <div>
                    {/* Issuer Tag */}
                    <span className="text-[10px] font-semibold text-[#FF6B35] uppercase tracking-wider block mb-1">
                      {cert.issuer}
                    </span>

                    {/* Certification Title */}
                    <h3 className="text-white font-bold text-lg leading-snug mb-1">
                      {cert.title}
                    </h3>

                    {/* Standard/Heading */}
                    <h4 className="text-white/80 font-medium text-xs md:text-sm mb-3">
                      {cert.heading}
                    </h4>

                    {/* Details paragraph */}
                    <p className="text-[#999999] text-xs md:text-[13px] leading-relaxed">
                      {cert.content}
                    </p>
                  </div>

                  {/* Quality/Service Tags */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                    {cert.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9px] font-semibold text-white/50 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Image popup modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-[#FF6B35] transition-all bg-white/5 hover:bg-white/10 p-2 rounded-full border border-white/10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center p-2 rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Certification details"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
