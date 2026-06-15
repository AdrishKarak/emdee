"use client";

import Navbar from "@/components/Navbar";
import { motion, useInView } from "motion/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronDown, Wrench, Users, ClipboardList } from "lucide-react";
import ClientPortfolio from "@/components/AMCPage/ClientPortfolio";

export function meta() {
  return [
    { title: "AMC & Facility Management Services | Emdee Techno Services" },
    { name: "description", content: "Annual Maintenance Contracts (AMC) and comprehensive facility management services for IT equipment, infrastructure, and buildings." },
    { property: "og:title", content: "AMC & Facility Management Services | Emdee Techno Services" },
    { property: "og:description", content: "Annual Maintenance Contracts (AMC) and comprehensive facility management services for IT equipment and infrastructure." },
    { property: "og:url", content: "https://emdee.in/amc" }
  ];
}

// Tiles data
const tilesData = [
  {
    id: 1,
    title: "Comprehensive Servicing",
    icon: Wrench,
    content:
      "Provide active support & comprehensive servicing of IT products like Desktop, Laptop, Printer, UPS, Scanner, Biometric Devices, Network Switches, etc. for various Government Departmental offices across the state.",
  },
  {
    id: 2,
    title: "Technical Workforce",
    icon: Users,
    content:
      "Dedicated technical workforce having experience and expertise in IT hardware, networking services deployed at the block level/ district level Government offices for active technical support.",
  },
  {
    id: 3,
    title: "Management System",
    icon: ClipboardList,
    content:
      "Online Ticketing System for registering issues (if any) and related solutions as well as tracking of issues and efficient management of the overall ecosystem is overseen by a project Management unit centrally at Kolkata.",
  },
];

// Client portfolio data
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
];

export default function AMCPage() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showScrollIcon, setShowScrollIcon] = useState(true);
  const [introState, setIntroState] = useState({ opacity: 0, y: 40 });
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  // Callback refs that check if image is already loaded when attached
  const desktopImageRef = useCallback((node) => {
    if (node !== null && node.complete && node.naturalWidth > 0) {
      setHeroImageLoaded(true);
    }
  }, []);

  const mobileImageRef = useCallback((node) => {
    if (node !== null && node.complete && node.naturalWidth > 0) {
      setHeroImageLoaded(true);
    }
  }, []);

  const desktopIntroRef = useRef(null);
  const tilesRef = useRef(null);
  const mobileIntroRef = useRef(null);
  const isMobileIntroInView = useInView(mobileIntroRef, {
    once: false,
    amount: 0.2,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !hasScrolled) {
        setHasScrolled(true);
      }
      if (window.scrollY > 100) {
        setShowScrollIcon(false);
      }

      // Sequential animation: intro entry -> intro visible -> intro exit (when tiles enter)
      if (desktopIntroRef.current && tilesRef.current) {
        const introRect = desktopIntroRef.current.getBoundingClientRect();
        const tilesRect = tilesRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Phase 1: Intro Entry
        const entryStart = viewportHeight * 0.9;
        const entryEnd = viewportHeight * 0.6;

        // Phase 2: Intro Exit (triggered by tiles appearance) - DELAYED START
        // Start exit much later when tiles are much closer to entering viewport
        const tilesVisibleThreshold = viewportHeight * 0.65; // Changed from 0.95 to 0.65 - tiles need to be much closer

        // Calculate intro entry progress
        let entryProgress = 0;
        if (introRect.top < entryStart && introRect.top > entryEnd) {
          entryProgress =
            1 - (introRect.top - entryEnd) / (entryStart - entryEnd);
        } else if (introRect.top <= entryEnd) {
          entryProgress = 1;
        }

        // Calculate exit progress (only when tiles are approaching and much closer)
        let exitProgress = 0;
        if (tilesRect.top < tilesVisibleThreshold) {
          const exitRange = viewportHeight * 0.4; // Slightly longer exit range for smoother transition
          exitProgress = Math.min(
            1,
            (tilesVisibleThreshold - tilesRect.top) / exitRange,
          );
        }

        // Combine: entry takes priority until complete, then exit takes over
        if (exitProgress > 0 && entryProgress === 1) {
          // Exiting phase
          setIntroState({
            opacity: 1 - exitProgress,
            y: -20 * exitProgress,
          });
        } else if (entryProgress > 0) {
          // Entering phase
          setIntroState({
            opacity: entryProgress,
            y: 40 * (1 - entryProgress),
          });
        } else {
          // Not yet entered
          setIntroState({
            opacity: 0,
            y: 40,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-qanelas-soft">
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <Navbar variant="glass" />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block pt-20">
        <div className="relative">
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: heroImageLoaded ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img
              src="https://ucarecdn.com/5617b817-62d5-4885-84f2-f977379008cd/-/format/auto/"
              alt="IT Maintenance"
              className="w-full h-auto object-contain"
              ref={desktopImageRef}
              onLoad={() => setHeroImageLoaded(true)}
            />
          </motion.div>

          <motion.div
            className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-[44px] flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: heroImageLoaded ? 1 : 0 }}
            transition={{
              duration: 0.8,
              delay: heroImageLoaded ? 0.1 : 0,
              ease: "easeOut",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: heroImageLoaded && showScrollIcon ? 1 : 0 }}
              transition={{
                duration: heroImageLoaded && showScrollIcon ? 0.6 : 0,
                delay: heroImageLoaded && showScrollIcon ? 0.8 : 0,
              }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown
                  className="w-8 h-8 text-white/40"
                  strokeWidth={1.5}
                />
              </motion.div>
            </motion.div>

            <h1
              className="text-6xl lg:text-7xl font-bold bg-gradient-to-b from-white to-[#D2691E] bg-clip-text text-transparent leading-tight text-center"
              style={{ fontFamily: "Qanelas Soft, sans-serif" }}
            >
              IT Maintenance
            </h1>
          </motion.div>
        </div>

        <div
          ref={desktopIntroRef}
          className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-[50px] mb-32 flex justify-center"
        >
          <motion.p
            className="text-[1.125rem] lg:text-[1.35rem] text-white leading-relaxed max-w-[72rem] text-center"
            animate={{
              opacity: heroImageLoaded && hasScrolled ? introState.opacity : 0,
              y: heroImageLoaded && hasScrolled ? introState.y : 40,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            EDPL delivers large-scale IT maintenance and support services that
            keep government IT infrastructure operational across departments and
            geographies. Backed by a dedicated technical workforce of 3500+
            field engineers, block- and district-level field presence (4000+
            pincodes), and a centralised ticketing and management system, EDPL
            maintains thousands of IT assets across offices, service centres and
            institutions - ensuring uptime, continuity and dependable day-to-day
            digital operations at scale.
          </motion.p>
        </div>

        {/* Desktop Tiles - 3 columns horizontal */}
        <div
          ref={tilesRef}
          className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-16"
        >
          <div className="grid grid-cols-3 gap-6">
            {tilesData.map((tile, index) => (
              <DesktopTile key={tile.id} tile={tile} index={index} />
            ))}
          </div>
        </div>

        {/* Client Portfolio */}
        <ClientPortfolio />
      </div>

      {/* Mobile View */}
      <div className="md:hidden pt-20">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: heroImageLoaded ? 1 : 0,
            scale: heroImageLoaded ? 1 : 0.95,
          }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img
            src="https://ucarecdn.com/db82e08b-0c7c-49b0-826c-f8bea11f3e15/-/format/auto/"
            alt="IT Maintenance"
            className="w-full h-auto object-contain"
            ref={mobileImageRef}
            onLoad={() => setHeroImageLoaded(true)}
          />
        </motion.div>

        {/* Mobile Title */}
        <motion.div
          className="px-6 mt-4 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: heroImageLoaded ? 1 : 0,
            y: heroImageLoaded ? 0 : 30,
          }}
          transition={{
            duration: 1,
            delay: heroImageLoaded ? 0.2 : 0,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <h1
            className="text-4xl font-bold bg-gradient-to-b from-white to-[#D2691E] bg-clip-text text-transparent leading-tight text-center"
            style={{ fontFamily: "Qanelas Soft, sans-serif" }}
          >
            IT Maintenance
          </h1>
        </motion.div>

        <div
          ref={mobileIntroRef}
          className="px-6 mt-7 mb-16 flex justify-center"
        >
          <motion.p
            className="text-[0.9025rem] text-white leading-relaxed text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={
              heroImageLoaded && isMobileIntroInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 }
            }
            transition={{
              duration: 1,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.1,
            }}
          >
            EDPL delivers large-scale IT maintenance and support services that
            keep government IT infrastructure operational across departments and
            geographies. Backed by a dedicated technical workforce of 3500+
            field engineers, block- and district-level field presence (4000+
            pincodes), and a centralised ticketing and management system, EDPL
            maintains thousands of IT assets across offices, service centres and
            institutions - ensuring uptime, continuity and dependable day-to-day
            digital operations at scale.
          </motion.p>
        </div>

        {/* Mobile Tiles - 1 column */}
        <div className="px-6 pb-16">
          <div className="space-y-6">
            {tilesData.map((tile, index) => (
              <MobileTile key={tile.id} tile={tile} index={index} />
            ))}
          </div>
        </div>

        {/* Client Portfolio */}
        <ClientPortfolio />
      </div>
    </div>
  );
}

const DesktopTile = ({ tile, index }) => {
  const cardRef = useRef(null);
  const Icon = tile.icon;
  const isInView = useInView(cardRef, {
    once: false,
    amount: 0.3,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-xl overflow-hidden group relative transition-all duration-500"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.95 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        scale: 1.02,
        borderColor: "#0B3D91",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(11, 61, 145, 0.15), transparent 80%)",
        }}
      />
      <div className="p-8 h-full flex flex-col">
        {/* Icon */}
        <motion.div
          className="mb-6 w-16 h-16 rounded-xl bg-gradient-to-br from-[#0B3D91]/20 to-[#0B3D91]/10 flex items-center justify-center group-hover:from-[#0B3D91]/30 group-hover:to-[#0B3D91]/20 transition-all duration-500"
          whileHover={{
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 },
          }}
        >
          <Icon
            className="w-8 h-8 text-[#0B3D91] group-hover:text-[#1557B0] transition-colors duration-500"
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Title */}
        <h3 className="text-white font-bold text-xl mb-4 leading-tight group-hover:text-[#0B3D91] transition-colors duration-300">
          {tile.title}
        </h3>

        {/* Content */}
        <p className="text-white/70 text-[0.95rem] leading-relaxed group-hover:text-white/80 transition-colors duration-300">
          {tile.content}
        </p>

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D91]/0 to-[#0B3D91]/0 group-hover:from-[#0B3D91]/5 group-hover:to-[#0B3D91]/5 rounded-xl transition-all duration-500 pointer-events-none" />
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </motion.div>
  );
};

const MobileTile = ({ tile, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });
  const Icon = tile.icon;

  return (
    <motion.div
      ref={cardRef}
      className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-xl overflow-hidden relative"
      style={index === 0 ? { marginTop: "-25px" } : {}}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div
        className="h-full flex flex-col"
        style={
          index === 0
            ? {
                paddingTop: "calc(1.5rem + 25px)",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                paddingBottom: "1.5rem",
              }
            : { padding: "1.5rem" }
        }
      >
        {/* Icon */}
        <div className="mb-4 w-14 h-14 rounded-lg bg-gradient-to-br from-[#0B3D91]/20 to-[#0B3D91]/10 flex items-center justify-center">
          <Icon className="w-7 h-7 text-[#0B3D91]" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-lg mb-3 leading-tight">
          {tile.title}
        </h3>

        {/* Content */}
        <p className="text-white/70 text-[0.875rem] leading-relaxed">
          {tile.content}
        </p>
      </div>
    </motion.div>
  );
};
