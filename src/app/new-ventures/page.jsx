"use client";

import Navbar from "@/components/Navbar";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

export function meta() {
  return [
    { title: "New Ventures - Sustainability & Infrastructure | Emdee Techno Services" },
    { name: "description", content: "Explore our sustainability-led infrastructure ventures, including Solar EPC, EV Charging networks, and Waste Management solutions." }
  ];
}

export default function NewVenturesPage() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 100

  const itemRefs = [useRef(null), useRef(null), useRef(null)];

  // Track scroll position to update progression line and active states
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how far the center of viewport has scrolled into the container
      const totalHeight = rect.height;
      const scrolled = (viewportHeight * 0.5) - rect.top;
      
      let progress = (scrolled / totalHeight) * 100;
      progress = Math.min(100, Math.max(0, progress));
      setScrollProgress(progress);

      // Determine active section
      let currentActive = 0;
      itemRefs.forEach((ref, idx) => {
        const item = ref.current;
        if (!item) return;
        const itemRect = item.getBoundingClientRect();
        // If item's top is past 55% of the viewport height, mark it active
        if (itemRect.top < viewportHeight * 0.55) {
          currentActive = idx;
        }
      });
      setActiveIndex(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ventures = [
    {
      id: 1,
      title: "Solid Waste Management",
      image: "https://ucarecdn.com/1702b82d-f61c-4ccf-977f-456038c61d7a/-/format/auto/",
      content: "EDPL has diversified into municipal solid waste management by undertaking end-to-end development of large-scale wet waste processing infrastructure. A 150+ metric-tonne per day municipal wet waste processing facility has been set up at the Hijila More dumping ground, serving three municipalities - Habra, Gobardanga and Ashoknagar Kalyangarh. The project addresses the critical need for decentralised waste processing, reduction of landfill dependency and environmentally compliant waste handling, translating urban waste streams into managed, treatment-ready inputs at scale."
    },
    {
      id: 2,
      title: "Solar PV Systems",
      image: "https://ucarecdn.com/bbeab729-406b-4b0d-95db-82b9a21e62c3/-/format/auto/",
      content: "EDPL delivers turnkey solar photovoltaic (PV) power systems across domestic and commercial applications, covering the full lifecycle from design and engineering to installation, testing and commissioning. The company executes on-grid and off-grid solar PV plants with array capacities ranging from 1.0 kWp to 50.0 kWp, bundled with five years of comprehensive maintenance and has already undertaken a large-scale project for District Magistrate of Murshidabad and Birbhum for solar integration. These deployments support energy cost reduction, grid resilience and clean power adoption, aligning institutional and commercial users with long-term sustainability and renewable energy objectives."
    },
    {
      id: 3,
      title: "EV Charging Infrastructure",
      image: "https://ucarecdn.com/1716d158-5313-4260-8686-cdc61cb60f52/-/format/auto/",
      content: "EDPL has expanded into electric mobility infrastructure through the setup, operation and management of EV charging and battery swapping stations within critical power utility environments. Deployments include EV charging infrastructure at Sonarpur 132 kV and New Jalpaiguri 220 kV substations under WBSETCL, as well as at the Hatighisha substation under WBSEDCL. By integrating EV charging facilities within existing power infrastructure, EDPL supports the transition toward electric mobility while ensuring operational reliability and grid-aligned deployment."
    }
  ];

  return (
    <div className="min-h-screen bg-[#07090E] text-white font-qanelas-soft relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-[15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#0B3D91]/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[30%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FF6B35]/5 blur-[120px] pointer-events-none z-0" />

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-[100] relative z-50">
        <Navbar variant="glass" />
      </div>

      {/* Main Content */}
      <div className="pt-20 relative z-10">
        {/* Hero Section */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 md:py-24 relative z-10">
          {/* Heading */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-[#FFFFFF] to-[#9CA3AF] bg-clip-text text-transparent leading-tight text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            New Ventures
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl md:text-2xl font-medium text-white/70 text-center max-w-4xl mx-auto"
            style={{ letterSpacing: "0.02em", lineHeight: "1.4" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            Building new capabilities beyond our core businesses
          </motion.p>
        </div>

        {/* Section 1: Sustainability Infrastructure */}
        <motion.div
          id="sustainability-infrastructure"
          className="max-w-[1300px] mx-auto px-6 lg:px-8 pt-10 pb-16 md:pb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Section Title */}
          <div className="max-w-5xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
            {/* Subtitle Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
              <span className="text-[10px] font-semibold tracking-[0.2em] text-white/70 uppercase">
                SUSTAINABILITY
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold text-white text-center tracking-wide font-qanelas-soft">
              Sustainability-Led Infrastructure
            </h2>
          </div>

          {/* Scroll-Linked Timeline & Progression Line Section */}
          <div ref={containerRef} className="relative max-w-[1200px] mx-auto px-4 md:px-0">
            {/* Background track line */}
            <div 
              className="absolute left-[23px] md:left-[33px] top-6 bottom-6 w-[2px] bg-white/10"
              style={{ zIndex: 0 }}
            />
            {/* Active progress bar (colored orange) */}
            <div 
              className="absolute left-[23px] md:left-[33px] top-6 w-[2px] bg-gradient-to-b from-[#FF6B35] to-[#0B3D91] transition-all duration-150"
              style={{ 
                height: scrollProgress > 0 ? `calc(${scrollProgress}% - 24px)` : '0px',
                zIndex: 1,
                maxHeight: 'calc(100% - 48px)'
              }}
            />

            <div className="space-y-16 md:space-y-24 relative z-10">
              {ventures.map((venture, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div 
                    key={venture.id}
                    ref={itemRefs[idx]}
                    className="flex flex-row items-stretch gap-6 md:gap-12"
                  >
                    {/* Left Column: Progression Circle Node */}
                    <div className="flex flex-col items-center justify-start pt-6 relative flex-shrink-0 w-12 md:w-[68px]">
                      <div className="relative flex items-center justify-center">
                        {isActive && (
                          <span className="absolute w-12 h-12 md:w-[68px] md:h-[68px] rounded-full border border-dashed border-[#FF6B35]/50 animate-[spin_12s_linear_infinite]" />
                        )}
                        <div 
                          className={`w-9 h-9 md:w-[50px] md:h-[50px] rounded-full border flex items-center justify-center font-bold text-xs md:text-base transition-all duration-500 z-10 ${
                            isActive 
                              ? 'bg-gradient-to-br from-[#FF6B35] to-[#D84315] border-[#FF6B35] text-white shadow-[0_0_15px_rgba(255,107,53,0.35)]' 
                              : 'bg-[#07090E] border-white/10 text-white/30'
                          }`}
                        >
                          {venture.id}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Glassmorphic Card Content */}
                    <div 
                      className={`flex-1 flex flex-col md:flex-row gap-6 md:gap-8 items-center bg-white/[0.01] border border-white/5 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-xl transition-all duration-700 ease-out hover:border-[#FF6B35]/25 hover:shadow-[0_10px_40px_rgba(255,107,53,0.03)] group ${
                        isActive ? 'bg-white/[0.03] border-white/10 shadow-[0_10px_30px_rgba(11,61,145,0.05)]' : ''
                      }`}
                    >
                      {/* Image */}
                      <div className="w-full md:w-1/2 rounded-2xl overflow-hidden relative bg-white/5 border border-white/10 shadow-lg h-[240px] md:h-[340px] flex-shrink-0">
                        <img
                          src={venture.image}
                          alt={venture.title}
                          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07090E]/60 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Content */}
                      <div className="w-full md:w-1/2 space-y-4">
                        <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-300 font-qanelas-soft ${
                          isActive ? 'text-[#FF6B35]' : 'text-white group-hover:text-[#FF6B35]'
                        }`}>
                          {venture.title}
                        </h3>
                        <p className={`text-sm md:text-base leading-relaxed font-qanelas-soft transition-colors duration-500 ${
                          isActive ? 'text-white/95' : 'text-white/70'
                        }`}>
                          {venture.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Section 2: Initiatives Under Development */}
        <motion.div
          id="initiatives-under-development"
          className="max-w-[1300px] mx-auto px-6 lg:px-8 py-16 md:py-20 pb-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Section Title */}
          <motion.div
            className="max-w-3xl mx-auto mb-12 md:mb-16 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            {/* Subtitle Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
              <span className="text-[10px] font-semibold tracking-[0.2em] text-white/70 uppercase">
                FUTURE HORIZONS
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold text-white text-center tracking-wide font-qanelas-soft">
              Initiatives Under Development
            </h2>
          </motion.div>

          {/* Horizontal Tiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <InitiativeTile
              id="pre-seed"
              title="Pre-Seed Fund"
              content="We plan to back early stage, tech-first startups based in/out of East India, through equity/non-equity capital, office space, tech/IT enablement and mentorship. Please submit pitchdecks below:"
              delay={0.1}
              buttonText="Submit Pitch Deck"
              buttonLink="https://forms.gle/QH1uTQk9ESwPMtYW7"
              className="order-2 md:order-1"
            />
            <InitiativeTile
              id="zuneko"
              title="Zuneko - Enterprise Tech"
              titleLink="https://zuneko.in"
              content={
                <>
                  We are bringing 20+ years of IT experience and expertise
                  (scaled in government space), to businesses.{" "}
                  <a
                    href="https://zuneko.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-[#FF6B35]"
                  >
                    <strong>Zuneko Labs</strong>
                  </a>{" "}
                  - our new vertical set up across Kolkata & Pune, will lead in
                  enterprise tech, digital transformations & AI solutions.
                </>
              }
              delay={0.2}
              className="order-1 md:order-2"
            />
            <InitiativeTile
              id="manufacturing"
              title="Manufacturing"
              content="We are venturing into manufacturing led capabilities. We are constructing a state-of-the-art manufacturing facility in Kalyani, West Bengal for producing global standard medical equipment (syringes, catheters, gloves and IV sets)."
              delay={0.3}
              className="order-3"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Initiative Tile Component
const InitiativeTile = ({
  id,
  title,
  titleLink,
  content,
  delay,
  buttonText,
  buttonLink,
  className,
}) => {
  const ref = useRef(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    const handleAnimation = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Entry animation: starts when tile enters bottom 80% of viewport
      const entryTriggerStart = viewportHeight * 0.8;
      const entryTriggerEnd = viewportHeight * 0.35;

      if (rect.top >= entryTriggerStart) {
        setAnimationProgress(0);
      } else if (rect.top > entryTriggerEnd) {
        const progress =
          1 -
          (rect.top - entryTriggerEnd) / (entryTriggerStart - entryTriggerEnd);
        setAnimationProgress(Math.min(1, Math.max(0, progress)));
      } else {
        setAnimationProgress(1);
      }
    };

    window.addEventListener("scroll", handleAnimation, { passive: true });
    handleAnimation(); // Check on mount

    return () => window.removeEventListener("scroll", handleAnimation);
  }, []);

  const getAnimationStyle = () => {
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOut(animationProgress);

    return {
      opacity: isInView ? 1 : 0,
      transform: `translateY(${50 * (1 - easedProgress)}px) scale(${0.95 + 0.05 * easedProgress})`,
      transition: "opacity 0.8s ease-out",
    };
  };

  const animStyle = getAnimationStyle();

  return (
    <div
      id={id}
      ref={ref}
      className={`bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 hover:bg-white/[0.04] hover:border-[#FF6B35]/30 hover:shadow-[0_10px_35px_rgba(255,107,53,0.08)] transition-all duration-300 group flex flex-col justify-between min-h-[280px] ${className || ""}`}
      style={animStyle}
    >
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-[#FF6B35] transition-colors duration-300 font-qanelas-soft">
          {titleLink ? (
            <a
              href={titleLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p className="text-sm md:text-base text-white/70 leading-relaxed font-qanelas-soft">{content}</p>
      </div>
      {buttonText && buttonLink && (
        <div className="mt-6">
          <a
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 border border-white/20 text-white bg-white/5 text-sm font-semibold rounded-lg hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] hover:shadow-[0_4px_20px_rgba(255,107,53,0.25)] transition-all duration-300 active:scale-95"
          >
            {buttonText}
          </a>
        </div>
      )}
    </div>
  );
};
