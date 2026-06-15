"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Building2 } from "lucide-react";

const clientPortfolio = [
  {
    id: 1,
    name: "Bangla Sahayata Kendra (BSKs)",
    detail: "3561 centres under Home & PAR Dept, GoWB",
  },
  {
    id: 2,
    name: "School Education Department",
    detail:
      "896 offices of DI/ ADI/ AI/ SI/ DPSC across the State incl. State HQ, GoWB",
  },
  { id: 3, name: "Higher Education Department", detail: "State HQ, GoWB" },
  {
    id: 4,
    name: "State Council of Education Research & Training (SCERT)",
    detail:
      "WB incl. all 20 District Institutes of Education & Training (DIETs) & 21 Govt. Primary Teacher's Training Institutes (PTTIs)",
  },
  {
    id: 5,
    name: "Paschim Banga Go Sampad Bikash Sanstha (PBGSBS)",
    detail:
      "State HQ & 23 District HQs and 346 BLDO offices under Animal Resources Development Dept, GoWB",
  },
  { id: 6, name: "Home & Hill Affairs Department", detail: "State HQ, GoWB" },
  { id: 7, name: "Land & Land Reforms Department", detail: "State HQ, GoWB" },
  { id: 8, name: "Agriculture Department", detail: "State HQ, GoWB" },
  { id: 9, name: "Agriculture Marketing Department", detail: "GoWB" },
  { id: 10, name: "Transport Department", detail: "GoWB" },
  { id: 11, name: "Forest Department", detail: "State HQ, GoWB" },
  { id: 12, name: "Environment Department", detail: "State HQ, GoWB" },
  {
    id: 13,
    name: "WB Secretariat Library",
    detail: "Government of West Bengal",
  },
  { id: 14, name: "Directorate of Public Instruction", detail: "GoWB" },
  { id: 15, name: "Zilla Parishad", detail: "North 24-Parganas" },
  {
    id: 16,
    name: "Directorate of Commercial Taxes",
    detail: "Department of Finance, GoWB",
  },
];

export default function ClientPortfolio() {
  return (
    <>
      {/* Desktop Section */}
      <div className="hidden md:block pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mb-16">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold bg-gradient-to-b from-white to-[#0B3D91] bg-clip-text text-transparent leading-tight text-center mb-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Current Client Portfolio
          </motion.h2>

          <motion.p
            className="text-center text-white/60 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            Maintaining IT infrastructure across government departments
          </motion.p>
        </div>

        {/* Two column layout: Image flush left, Tiles on right */}
        <div className="grid grid-cols-2 gap-12 items-start">
          {/* Left Half - Large Image flush to viewport edge - NOW STICKY */}
          <motion.div
            className="pl-0 sticky"
            style={{ top: "20px", marginTop: "-80px" }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img
              src="https://ucarecdn.com/e70d316d-3069-47aa-a942-d97c1c34c399/-/format/auto/"
              alt="Powering Digital India from the East"
              className="w-[85%] h-auto object-contain opacity-65"
              style={{ clipPath: "inset(12% 0 0 0)" }}
            />
          </motion.div>

          {/* Right Half - Tiles stacked vertically, no scrollbar */}
          <div className="flex flex-col gap-4 pr-6 lg:pr-8">
            {clientPortfolio.map((client, index) => (
              <ClientCard key={client.id} client={client} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Section */}
      <div className="md:hidden px-6 pb-20">
        <motion.h2
          className="text-3xl font-bold bg-gradient-to-b from-white to-[#0B3D91] bg-clip-text text-transparent leading-tight text-center mb-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Current Client Portfolio
        </motion.h2>

        <motion.p
          className="text-center text-white/60 text-sm mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Maintaining IT infrastructure across government departments
        </motion.p>

        {/* Image for mobile */}
        <motion.div
          className="mb-[-25px] -ml-6"
          style={{ transform: "translateY(25px)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img
            src="https://ucarecdn.com/e70d316d-3069-47aa-a942-d97c1c34c399/-/format/auto/"
            alt="Powering Digital India from the East"
            className="w-full h-auto object-contain rounded-xl"
          />
        </motion.div>

        <div className="space-y-4">
          {clientPortfolio.map((client, index) => (
            <MobileClientCard key={client.id} client={client} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}

function ClientCard({ client, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-lg overflow-hidden hover:border-[#0B3D91]/50 transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.03,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="p-6 h-full flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#0B3D91]/20 to-[#0B3D91]/10 flex items-center justify-center group-hover:from-[#0B3D91]/30 group-hover:to-[#0B3D91]/20 transition-all duration-500">
          <Building2
            className="w-5 h-5 text-[#0B3D91] group-hover:text-[#1557B0] transition-colors duration-500"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-base mb-2 leading-tight group-hover:text-[#0B3D91] transition-colors duration-300">
            {client.name}
          </h4>
          <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
            {client.detail}
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D91]/0 to-[#0B3D91]/0 group-hover:from-[#0B3D91]/5 group-hover:to-[#0B3D91]/5 rounded-lg transition-all duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}

function MobileClientCard({ client, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-lg overflow-hidden relative"
      style={index === 0 ? { position: "relative", zIndex: 10 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="mb-3 w-9 h-9 rounded-lg bg-gradient-to-br from-[#0B3D91]/20 to-[#0B3D91]/10 flex items-center justify-center">
          <Building2 className="w-5 h-5 text-[#0B3D91]" strokeWidth={1.5} />
        </div>
        <h4 className="text-white font-bold text-sm mb-2 leading-tight">
          {client.name}
        </h4>
        <p className="text-white/60 text-xs leading-relaxed">{client.detail}</p>
      </div>
    </motion.div>
  );
}
