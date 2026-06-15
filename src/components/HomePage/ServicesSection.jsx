import { ServiceTile } from "./ServiceTile";
import { getTileAnimationStyle } from "@/utils/tileAnimationUtils";
import { Link } from "react-router";
import { Leaf, Sparkles, Activity, Rocket } from "lucide-react";
import { motion } from "motion/react";

const tiles = [
  {
    id: 1,
    title: "IT Infrastructure & System Integration",
    graphic:
      "https://ucarecdn.com/4bcb7aa6-15da-438a-ba87-d9c070e944f2/-/format/auto/",
    text: "We leverage 20+ years of System Integration expertise and OEM partnerships to source, supply, install, upgrade, integrate, maintain and manage IT systems at scale.\n\nWe empower digitalisation of government entities, corporations, public infrastructure, public service delivery machineries & more.",
  },
  {
    id: 2,
    title: "IT-enabled Services & Software Development",
    graphic:
      "https://ucarecdn.com/db79ca2b-b43e-4e2c-8aa8-5a94f29c8c2c/-/format/auto/",
    text: "By leveraging modern competencies in custom software development (app & web based solutions) we empower the govt's internal operations & e-governance initiatives.\n\nOur expertise stretches into ITeS where we leverage our tech and human capital to modernize, augment and deliver services under different public schemes & contexts.",
  },
  {
    id: 3,
    title: "IT Staffing & Security Surveillance Solutions",
    graphic:
      "https://ucarecdn.com/175a0e0d-7197-4fed-ac0f-58d82d8fd49c/-/format/auto/",
    text: "We deploy and manage 3500+ service engineers & IT personnel across East India to operate e-governance machineries, manage technology for/of the government, fill expertise gaps and maintain IT infrastructure & software at scale.\n\nWe also specialise in commissioning and deploying surveillance and security systems across public/private infraspace.",
  },
];

export function ServicesSection({
  scrollY,
  sloganScrollRange,
  tileSectionRef,
  tileRefs,
  activeMobileTile,
  isTileSectionReady,
  tileAnimationState,
  tileStates,
  isMobile,
  handleMobileTileTap,
  isScrolling,
}) {
  const handleTileMouseMove = (e, enableHover) => {
    // Disable mouse move effects when scrolling
    if (window.innerWidth >= 1024 && enableHover && !isScrolling) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -2;
      const rotateY = ((x - centerX) / centerX) * 2;
      e.currentTarget.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
    }
  };

  const handleTileMouseLeave = (e, enableHover) => {
    if (window.innerWidth >= 1024 && enableHover) {
      e.currentTarget.style.transform =
        "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
  };

  return (
    <div ref={tileSectionRef} className="relative z-30 bg-[#0A0A0A]">
      {/* Spacer for sticky slogan - only during transition */}
      {scrollY < sloganScrollRange && <div className="h-[140px]" />}

      {/* Three-Tile Layout - Scroll-Animated */}
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {tiles.map((tile, index) => {
            const isActiveMobile = activeMobileTile === tile.id;
            const enableHover =
              tileAnimationState === "ready" &&
              isTileSectionReady &&
              !isScrolling;

            // Pass individual tile state and ref for mobile
            const animationStyle = getTileAnimationStyle(
              index,
              tileSectionRef,
              tileAnimationState,
              isMobile,
              tileStates?.[index],
              tileRefs?.[index],
            );

            return (
              <div key={tile.id} ref={tileRefs[index]}>
                <ServiceTile
                  tile={tile}
                  index={index}
                  isActiveMobile={isActiveMobile}
                  enableHover={enableHover}
                  animationStyle={animationStyle}
                  onTileTap={handleMobileTileTap}
                  onMouseMove={(e) => handleTileMouseMove(e, enableHover)}
                  onMouseLeave={(e) => handleTileMouseLeave(e, enableHover)}
                  isScrolling={isScrolling}
                />
              </div>
            );
          })}
        </div>

        {/* New & Future Ventures Row */}
        <div className="mt-20 pt-16 border-t border-white/5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
              <span className="text-[10px] font-semibold tracking-[0.2em] text-white/70 uppercase">
                DIVERSIFICATION & VENTURES
              </span>
            </div>
          </motion.div>

          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="text-2xl md:text-3xl font-qanelas-soft font-bold text-white mb-10 text-center"
          >
            New & Future Ventures
          </motion.h3>

          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1200px] mx-auto"
          >
            {/* Sustainability-Led Infrastructure */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.98 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } 
                }
              }}
            >
              <Link
                to="/new-ventures#sustainability-infrastructure"
                className="group flex gap-5 p-6 h-full rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md hover:bg-white/[0.03] hover:border-green-500/20 transition-all duration-300 shadow-xl hover:-translate-y-1.5"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0 border border-green-500/15">
                  <Leaf className="w-6 h-6 text-green-500" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <h4 className="text-base font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                    Sustainability Infrastructure
                  </h4>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    Solid waste processing facility, turnkey solar PV integration, and EV charging/swapping station deployments.
                  </p>
                  <span className="text-[10px] font-semibold text-green-500/80 uppercase tracking-wider mt-3">
                    Solar EPC · EV Charging · Waste Processing
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Zuneko Labs */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.98 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } 
                }
              }}
            >
              <Link
                to="/new-ventures#zuneko"
                className="group flex gap-5 p-6 h-full rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md hover:bg-white/[0.03] hover:border-purple-500/20 transition-all duration-300 shadow-xl hover:-translate-y-1.5"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0 border border-purple-500/15">
                  <Sparkles className="w-6 h-6 text-purple-500" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col justify-center min-w-0 w-full">
                  <h4 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                    Zuneko Labs
                  </h4>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    Driving digital transformations, automated business operations, custom computer vision, and AI-enabled software solutions.
                  </p>
                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    <span className="text-[10px] font-semibold text-purple-500/80 uppercase tracking-wider">
                      AI & Automation · Enterprise Tech · Computer Vision
                    </span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("https://zuneko.in", "_blank", "noopener,noreferrer");
                      }}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-purple-500/20 hover:bg-purple-500/35 border border-purple-500/30 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer"
                    >
                      zuneko.in ↗
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Medical Equipment Manufacturing */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.98 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } 
                }
              }}
            >
              <Link
                to="/new-ventures#manufacturing"
                className="group flex gap-5 p-6 h-full rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md hover:bg-white/[0.03] hover:border-cyan-500/20 transition-all duration-300 shadow-xl hover:-translate-y-1.5"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0 border border-cyan-500/15">
                  <Activity className="w-6 h-6 text-cyan-500" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                    Medical Manufacturing
                  </h4>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    Establishing a state-of-the-art medical equipment production facility in Kalyani, West Bengal for global-standard supplies.
                  </p>
                  <span className="text-[10px] font-semibold text-cyan-500/80 uppercase tracking-wider mt-3">
                    Kalyani Facility · Syringes & Catheters
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Pre-Seed Venture Fund */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.98 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } 
                }
              }}
            >
              <Link
                to="/new-ventures#pre-seed"
                className="group flex gap-5 p-6 h-full rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md hover:bg-white/[0.03] hover:border-[#FF6B35]/20 transition-all duration-300 shadow-xl hover:-translate-y-1.5"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0 border border-[#FF6B35]/15">
                  <Rocket className="w-6 h-6 text-[#FF6B35]" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <h4 className="text-base font-bold text-white group-hover:text-[#FF6B35] transition-colors duration-300">
                    Pre-Seed Venture Fund
                  </h4>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    Backing tech-first startups in the Eastern region with early-stage equity/non-equity capital, co-working space, and mentorship.
                  </p>
                  <span className="text-[10px] font-semibold text-[#FF6B35]/80 uppercase tracking-wider mt-3">
                    East India Startups · Capital & Incubation
                  </span>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
