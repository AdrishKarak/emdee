"use client";

import Navbar from "@/components/Navbar";
import { motion, useInView } from "motion/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";

export function meta() {
  return [
    { title: "Software Development Services | Emdee Techno Services" },
    { name: "description", content: "Custom software development, web applications, mobile apps, and enterprise solutions tailored to your business needs." },
    { property: "og:title", content: "Software Development Services | Emdee Techno Services" },
    { property: "og:description", content: "Custom software development, web applications, mobile apps, and enterprise solutions tailored to your business needs." },
    { property: "og:url", content: "https://emdee.in/software" }
  ];
}

// Tiles data with images
const tilesData = [
  {
    id: 1,
    title: "Banglar Shiksha",
    image:
      "https://ucarecdn.com/51a6a423-bca7-4edb-863f-d1eddef844e1/-/format/auto/",
    content: `Statewide school management system for the School Education Department, GoWB, covering ~95,000 schools, 1.52 crore students, and 4.65 lakh teachers.`,
  },
  {
    id: 2,
    title: "Pranishakti",
    image:
      "https://ucarecdn.com/31862e31-dfa3-4b2d-b6be-c67717fdef48/-/format/auto/",
    content: `e-Governance platform for the Animal Resource Development Department, GoWB, covering inventory, laboratories, poultry, health camps, vaccination, cattle insurance, and content management.`,
  },
  {
    id: 3,
    title: "Mobile Veterinary Clinic System",
    image:
      "https://ucarecdn.com/ef494049-af93-4a0b-aa94-e5e4a4d125e8/-/format/auto/",
    content: `Web and Android-based application with real-time monitoring and GPS tracking for Mobile Veterinary Clinics under ARD, GoWB.`,
  },
  {
    id: 4,
    title: "WBBPE e-Governance System",
    image:
      "https://ucarecdn.com/69eb4392-b5fb-406c-bd27-415ef42954b2/-/format/auto/",
    content: `Real-time web platform for the West Bengal Board of Primary Education covering admissions, payroll, e-filing, affiliation, and payments.`,
  },
  {
    id: 5,
    title: "Teachers Education Network (TEN)",
    image:
      "https://ucarecdn.com/626e9588-8f57-4d4f-9b7c-c83fb9e5d713/-/format/auto/",
    content: `Web-based system for SCERT, West Bengal, covering HR, administration, e-filing, document management, and TRMS.`,
  },
  {
    id: 6,
    title: "West Bengal Board of Madrasah Education",
    image:
      "https://ucarecdn.com/ce2b97d5-5f54-47cf-bdec-108290eadd6a/-/format/auto/",
    content: `Design, development, and hosting of the official website, including online publication of examination results.`,
  },
  {
    id: 7,
    title: "Shiksha Ratna",
    image:
      "https://ucarecdn.com/f810b8ce-3870-4c05-be0d-720ab23d61d6/-/format/auto/",
    content: `Web and mobile application for the School Education Department, GoWB, to manage teacher felicitation under the Shiksha Ratna Award.`,
  },
  {
    id: 8,
    title: "Karma Tirtha",
    image:
      "https://ucarecdn.com/0a39bfba-1894-4863-ae4e-704df6fab60d/-/format/auto/",
    content: `Digital platform connecting SHGs, artisans, and MSMEs with government schemes and market access across 500+ units in West Bengal.`,
  },
  {
    id: 9,
    title: "Pathashree Portal",
    image:
      "https://ucarecdn.com/8ee1afab-5289-4052-8be4-98edd27555ca/-/format/auto/",
    content: `Web portal developed and managed for rural road construction monitoring across gram panchayats in West Bengal under the Pathashree initiative.`,
  },
  {
    id: 10,
    title: "MAKAUT Attendance App",
    image:
      "https://ucarecdn.com/a3d5db7d-866b-4098-a059-48bfbf703bd3/-/format/auto/",
    content: `Facial-recognition-based mobile attendance system for teaching and non-teaching staff at MAKAUT.`,
  },
  {
    id: 11,
    title: "PTTI & DIET Websites",
    image:
      "https://ucarecdn.com/0c145095-e364-47d6-aa84-ebd160ba7403/-/format/auto/",
    content: `Development of official websites for 44 Government PTTIs and DIETs across West Bengal in coordination with SCERT.`,
  },
  {
    id: 12,
    title: "Sufal Bangla GPS Tracking",
    image:
      "https://ucarecdn.com/8f534278-8ad2-4095-b77f-090f2b2d166b/-/format/auto/",
    content: `Statewide GPS-based vehicle tracking system implemented under the Sufal Bangla project of the Agricultural Marketing Department, GoWB.`,
  },
];

export default function SoftwarePage() {
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
  const gridRef = useRef(null);
  const mobileIntroRef = useRef(null);
  const isMobileIntroInView = useInView(mobileIntroRef, {
    once: true,
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

      // Sequential animation: intro entry -> intro visible -> intro exit (when grid enters)
      if (desktopIntroRef.current && gridRef.current) {
        const introRect = desktopIntroRef.current.getBoundingClientRect();
        const gridRect = gridRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Phase 1: Intro Entry (when scrolling starts)
        // Intro should enter when it's in the viewport
        const entryStart = viewportHeight * 0.9;
        const entryEnd = viewportHeight * 0.6;

        // Phase 2: Intro Exit (triggered by grid appearance) - DELAYED START
        // Grid starts becoming visible - changed to trigger much later
        const gridVisibleThreshold = viewportHeight * 0.65; // Changed from 0.95 to 0.65

        // Calculate intro entry progress
        let entryProgress = 0;
        if (introRect.top < entryStart && introRect.top > entryEnd) {
          entryProgress =
            1 - (introRect.top - entryEnd) / (entryStart - entryEnd);
        } else if (introRect.top <= entryEnd) {
          entryProgress = 1;
        }

        // Calculate exit progress (only when grid is approaching and much closer)
        let exitProgress = 0;
        if (gridRect.top < gridVisibleThreshold) {
          // Start exit when grid is much closer
          const exitRange = viewportHeight * 0.4; // Exit over 40% of viewport for smoother transition
          exitProgress = Math.min(
            1,
            (gridVisibleThreshold - gridRect.top) / exitRange,
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
              src="https://ucarecdn.com/d9259011-2c20-47a2-98a8-754e98fd465c/-/format/auto/"
              alt="Software Development"
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
              Software Development
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
            EDPL designs, builds and operates large-scale, mission-critical
            software systems for government departments, translating policy
            objectives into stable, scalable digital platforms. These solutions
            span education, agriculture, animal resources, infrastructure and
            livelihoods, and are built to handle high volumes of users,
            transactions and real-time data. Backed by deep domain understanding
            and long-term operational ownership, EDPL's software platforms
            support statewide programmes covering tens of thousands of
            institutions, crores of citizens and lakhs of government employees,
            enabling digital governance, monitoring and service delivery at
            scale.
          </motion.p>
        </div>

        {/* Desktop Grid - 3 columns x 4 rows */}
        <div
          ref={gridRef}
          className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-32"
        >
          <motion.div
            className="grid grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {tilesData.map((tile, index) => (
              <DesktopTile key={tile.id} tile={tile} index={index} />
            ))}
          </motion.div>
        </div>
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
            ref={mobileImageRef}
            src="https://ucarecdn.com/1de04010-ec7b-47bd-8eb3-d553f12ae9cc/-/format/auto/"
            alt="Software Development"
            className="w-full h-auto object-contain"
            onLoad={() => setHeroImageLoaded(true)}
          />
        </motion.div>

        {/* Mobile Title */}
        <motion.div
          className="px-4 mt-4 flex justify-center w-full mx-auto"
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
            className="text-[1.8rem] font-bold bg-gradient-to-b from-white to-[#D2691E] bg-clip-text text-transparent leading-tight text-center"
            style={{ fontFamily: "Qanelas Soft, sans-serif" }}
          >
            Software Development
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
            EDPL designs, builds and operates large-scale, mission-critical
            software systems for government departments, translating policy
            objectives into stable, scalable digital platforms. These solutions
            span education, agriculture, animal resources, infrastructure and
            livelihoods, and are built to handle high volumes of users,
            transactions and real-time data. Backed by deep domain understanding
            and long-term operational ownership, EDPL's software platforms
            support statewide programmes covering tens of thousands of
            institutions, crores of citizens and lakhs of government employees,
            enabling digital governance, monitoring and service delivery at
            scale.
          </motion.p>
        </div>

        {/* Mobile Grid - Single column stack */}
        <div className="px-6 pb-20">
          <div className="space-y-4">
            {tilesData.map((tile, index) => (
              <MobileTile key={tile.id} tile={tile} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const DesktopTile = ({ tile, index }) => {
  const cardRef = useRef(null);
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
      className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-xl overflow-hidden group cursor-pointer relative transition-all duration-300"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.95 }
      }
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        scale: 1.03,
        y: -6,
        transition: {
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(11, 61, 145, 0.15), transparent 80%)",
        }}
      />
      <div className="p-6 h-full flex flex-col items-center text-center">
        {/* Circular Image */}
        <div className="mb-4 w-[53px] h-[53px] rounded-full overflow-hidden flex items-center justify-center bg-white transition-all duration-300">
          <img
            src={tile.image}
            alt={tile.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-lg mb-3 leading-tight transition-colors duration-300">
          {tile.title}
        </h3>

        {/* Content */}
        <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
          {tile.content}
        </p>
      </div>
    </motion.div>
  );
};

const MobileTile = ({ tile, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-lg overflow-hidden relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="p-5 h-full flex flex-col items-center text-center">
        {/* Image */}
        <div className="mb-3 w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center bg-white">
          <img
            src={tile.image}
            alt={tile.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-lg mb-3 leading-tight">
          {tile.title}
        </h3>

        {/* Content */}
        <p className="text-white/70 text-sm leading-relaxed">{tile.content}</p>
      </div>
    </motion.div>
  );
};
