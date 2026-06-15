"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import { CertificationsSection } from "@/components/AboutPage/CertificationsSection";

// Placeholder data for CSR tiles
const csrTiles = {
  left: [
    {
      id: "l1",
      title: "Ambulance Support",
      image:
        "https://ucarecdn.com/fd406da3-3b95-4900-8ddf-e1ab09f31265/-/format/auto/",
      content:
        "EISS (EMDEE's trust) donated an ambulance vehicle to Hasnabad Sporting Association to subsidise access to emergency medical transportation in the area.",
      stats: "",
    },
    {
      id: "l2",
      title: "Cancer Patients",
      image:
        "https://ucarecdn.com/0920697d-b805-477f-9651-ec4f734e2b3f/-/format/auto/",
      content:
        "EISS has donated a fixed amount towards the treatment of 20+ cancer patients over the years at Tata Medical Centre.",
      stats: "",
    },
    {
      id: "l3",
      title: "Donations (Adhoc/NGO)",
      image:
        "https://ucarecdn.com/4f1ef7ae-38e8-4dae-9f1a-0f17ea3245ba/-/format/auto/",
      content:
        "Over the years, EISS has donated to charitable institutions to support their work, including Mukti Rehab Centre, Prayaas, Institute of Child Health, among others, as well as provided ad hoc support (like sponsoring education fees, hospital bills etc.) to distressed individuals who've reached out.",
      stats: "",
    },
  ],
  right: [
    {
      id: "r1",
      title: "Free School",
      image:
        "https://ucarecdn.com/57f5a7f0-a9eb-4050-8641-917a53598da2/-/format/auto/",
      content:
        "EMDEE sponsored and enabled a free, subsidised school (providing primary & secondary education and 2 free meals a day) for underprivileged slum children in Sealdah, Kolkata, run by NGO arm Ahana Foundation.",
      footnote:
        "Currently, Ahana Foundation's financing has moved from EMDEE's CSR mandate to the Managing Director's personal altruism portfolio.",
      stats: "",
    },
    {
      id: "r2",
      title: "Old-Age Home*",
      image:
        "https://ucarecdn.com/8b05b7ed-a576-48ae-b980-d056be7de78f/-/format/auto/",
      content:
        "EISS is currently constructing a modern, not-for-profit old age home in Badu, Kolkata, designed to accommodate 400–500 senior citizens and cater to their needs.",
      stats: "",
    },
    {
      id: "r3",
      title: "Donations (Crisis Relief)",
      image:
        "https://ucarecdn.com/6b412ab5-6b13-4a8f-80f1-7028731e4fbf/-/format/auto/",
      content:
        "EISS has contributed to crisis relief funds including CM relief for Cyclone Aila aftermath, and PM relief for the Bihar floods, Uttarakhand landslide and J&K floods, among others.",
      stats: "",
    },
  ],
};

// Testimonials
const testimonials = [
  {
    id: 1,
    quote:
      "EMDEE is one of oldest and most respected firms in the sector due to their reputation of reliability. Mr. Das is known for his transparency, commitment to promises and culture of ethical hygiene and excellence.",
    author: "Umashankar Dubey",
    role: "Zonal Manager",
    organization: "Acer",
  },
  {
    id: 2,
    quote:
      "EMDEE has provided holistic support to our department - they have provided hardware, software as well as manpower. We consider Emdee's IT personnel who are staffed within our premises, as part of our family.",
    author: "Debashis Sarkar",
    role: "ex-Joint Director",
    organization: "West Bengal School Education Department",
  },
  {
    id: 3,
    quote:
      "Emdee has made significant contributions to numerous projects throughout the Eastern region as a leading SI. Their in-house expertise and dedication to projects have been invaluable to AMD.",
    author: "Souvik Kar",
    role: "Zonal Manager",
    organization: "AMD",
  },
  {
    id: 4,
    quote:
      "An agency we had hired to computerise Rural Household Survey, was failing to deliver. I knew EMDEE for their work in electoral digitisation. We got EMDEE to takeover the RHS work and they delivered meticulously.",
    author: "Nitish Kumar Das",
    role: "retd-Executive",
    organization: "WBCS (West Bengal Civil Services)",
  },
  {
    id: 5,
    quote:
      "Working with Emdee has been a rewarding experience. They approach each engagement with professionalism and flexibility ensuring smooth execution and dependable outcomes. They have strong domain expertise and strong focus on quality & timelines.",
    author: "Saikat Mondal",
    role: "Zonal Manager",
    organization: "LG Electronics",
  },
  {
    id: 6,
    quote:
      "We were undertaking the worlds biggest data project - National Population Register and we were lucky to have with us reliable and competent partners like EMDEE at the time.",
    author: "SK Chakrabarti",
    role: "ex-Deputy Director General",
    organization: "Office of Registrar General, India",
  },
  {
    id: 7,
    quote:
      "I know EMDEE since 1995… Canon India has successfully partnered with them for decades. They are enriched with a quality service team who can handle critical situations and good leadership in senior management.",
    author: "Suvrendu Mitra",
    role: "Zonal Manager",
    organization: "Canon",
  },
  {
    id: 8,
    quote:
      "EMDEE has been one of the most prominent and celebrated partners of WTL, since its very inception and has contributed to several key e-governance initiatives in West Bengal.",
    author: "HPS Bawa",
    role: "ex-CEO",
    organization: "WTL (Gov of WB undertaking)",
  },
];

export function OurImpactSection() {
  const [activeTile, setActiveTile] = useState("l1");
  const [hoverSide, setHoverSide] = useState(null); // 'left' or 'right'
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get active content
  const getActiveContent = () => {
    const allTiles = [...csrTiles.left, ...csrTiles.right];
    return allTiles.find((tile) => tile.id === activeTile);
  };

  // Calculate widths based on hover state
  const getWidths = () => {
    if (hoverSide === "left") {
      return { left: "35%", middle: "40%", right: "25%" };
    } else if (hoverSide === "right") {
      return { left: "25%", middle: "40%", right: "35%" };
    }
    return { left: "30%", middle: "40%", right: "30%" };
  };

  const widths = getWidths();
  const activeContent = getActiveContent();
  const allTiles = [...csrTiles.left, ...csrTiles.right];

  return (
    <div
      id="our-impact"
      className="relative bg-[#07090E] py-20 lg:py-32 px-6 lg:px-16 overflow-hidden border-t border-white/5"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FF6B35]/5 opacity-[0.35] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#0B3D91]/8 opacity-[0.4] blur-[120px] pointer-events-none" />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px"
        }}
      />

      {/* Section Title */}
      <div className="text-center mb-16 relative z-10">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
          <span className="text-[10px] font-semibold tracking-[0.2em] text-white/70 uppercase">
            TRUST & RESPONSIBILITY
          </span>
        </div>

        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-qanelas-soft font-extrabold text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Trust &{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #FF6B35 0%, #FFA07A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Responsibility
          </span>
        </motion.h2>
      </div>

      {/* Subsection 1: Corporate Social Responsibility */}
      <motion.div
        className="mb-20 relative z-10 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
            <span className="text-[10px] font-semibold tracking-[0.2em] text-white/70 uppercase">
              SOCIAL RESPONSIBILITY
            </span>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-qanelas-soft font-bold text-white mb-10 text-center">
          Corporate Social Responsibility
        </h3>

        {/* Desktop Layout - 3 columns */}
        <div className="hidden lg:flex gap-6 items-start h-[430px]">
          {/* Left Pile */}
          <div
            className="flex flex-col gap-4 transition-all duration-500 ease-out h-full justify-between"
            style={{ width: widths.left }}
            onMouseEnter={() => setHoverSide("left")}
            onMouseLeave={() => setHoverSide(null)}
          >
            {csrTiles.left.map((tile, index) => (
              <TileCard
                key={tile.id}
                tile={tile}
                isActive={activeTile === tile.id}
                onHover={() => setActiveTile(tile.id)}
                index={index}
              />
            ))}
          </div>

          {/* Middle Content Showcase Panel */}
          <div
            className="bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-center items-center shadow-2xl relative overflow-hidden h-full"
            style={{ width: widths.middle }}
            onMouseEnter={() => {
              setHoverSide(null);
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D91]/5 to-transparent pointer-events-none" />

            <AnimatePresence mode="wait">
              {activeContent && (
                <motion.div
                  key={activeContent.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-center relative z-10 w-full"
                >
                  {/* Image with glowing frame */}
                  <div className="mb-5 rounded-xl overflow-hidden border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.5)] group/img relative max-h-[200px]">
                    <img
                      src={activeContent.image}
                      alt={activeContent.title}
                      className="w-full object-cover h-[200px] transition-transform duration-700 group-hover/img:scale-105"
                      style={
                        activeContent.id === "r3"
                          ? { objectPosition: "center 45%" }
                          : {}
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                  </div>

                  <p className="text-white/85 text-xs md:text-sm leading-relaxed max-w-md mx-auto">
                    {activeContent.content}
                  </p>

                  {/* Footnote if exists */}
                  {activeContent.footnote && (
                    <p className="text-[10px] text-white/45 leading-normal mt-3 italic bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg inline-block max-w-sm">
                      {activeContent.footnote}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Pile */}
          <div
            className="flex flex-col gap-4 transition-all duration-500 ease-out h-full justify-between"
            style={{ width: widths.right }}
            onMouseEnter={() => setHoverSide("right")}
            onMouseLeave={() => setHoverSide(null)}
          >
            {csrTiles.right.map((tile, index) => (
              <TileCard
                key={tile.id}
                tile={tile}
                isActive={activeTile === tile.id}
                onHover={() => setActiveTile(tile.id)}
                index={index + 3}
              />
            ))}
          </div>
        </div>

        {/* Mobile Layout - 3 Grid + Content Card Below */}
        <div className="lg:hidden">
          <p className="text-center text-white/30 text-[10px] mb-3 tracking-wide">
            Tap to view
          </p>

          {/* Grid of tiles */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {allTiles.map((tile) => (
              <MobileGridTile
                key={tile.id}
                tile={tile}
                isActive={activeTile === tile.id}
                onTap={() => setActiveTile(tile.id)}
              />
            ))}
          </div>

          {/* Content tile below */}
          <div className="bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-2xl p-6 min-h-[320px] flex flex-col justify-center overflow-hidden shadow-xl">
            <AnimatePresence mode="wait">
              {activeContent && (
                <motion.div
                  key={activeContent.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  {/* Image */}
                  <div className="mb-4 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                    <img
                      src={activeContent.image}
                      alt={activeContent.title}
                      className={`w-full object-cover ${activeContent.id === "r1" ? "h-[177px]" : "h-52"}`}
                    />
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed">
                    {activeContent.content}
                  </p>

                  {/* Footnote if exists */}
                  {activeContent.footnote && (
                    <p className="text-[9px] text-white/45 leading-normal mt-3 italic bg-white/5 px-2 py-1.5 rounded-lg inline-block">
                      {activeContent.footnote}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Subsection 2: Certifications */}
      <div id="certifications">
        <CertificationsSection />
      </div>

      {/* Subsection 3: Testimonials */}
      <motion.div
        className="mt-20 relative z-10 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B3D91] animate-pulse" />
            <span className="text-[10px] font-semibold tracking-[0.2em] text-white/70 uppercase">
              PARTNER TESTIMONIALS
            </span>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-qanelas-soft font-bold text-white mb-10 text-center">
          Testimonials
        </h3>
        
        <TestimonialsCarousel testimonials={testimonials} isMobile={isMobile} />
      </motion.div>

      {/* Add scrollbar hide styles */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

// Mobile Grid Tile Component
function MobileGridTile({ tile, isActive, onTap }) {
  return (
    <motion.div
      onClick={onTap}
      className="aspect-square rounded-xl overflow-hidden cursor-pointer relative flex flex-col justify-center items-center p-3 text-center transition-all duration-300"
      whileTap={{ scale: 0.95 }}
      style={{
        background: isActive
          ? "linear-gradient(135deg, rgba(11, 61, 145, 0.2) 0%, rgba(255, 107, 53, 0.1) 100%)"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.005) 100%)",
        border: isActive
          ? "1.5px solid #FF6B35"
          : "1.5px solid rgba(255, 255, 255, 0.06)",
        boxShadow: isActive
          ? "0 8px 20px rgba(255, 107, 53, 0.12), 0 0 1px rgba(255, 255, 255, 0.1) inset"
          : "0 4px 10px rgba(0, 0, 0, 0.2), 0 0 1px rgba(255, 255, 255, 0.05) inset",
        backdropFilter: "blur(8px)",
      }}
    >
      <h5 
        className="font-qanelas-soft text-[10px] leading-tight transition-colors duration-300"
        style={{
          color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
          fontWeight: isActive ? "700" : "500",
        }}
      >
        {tile.title}
      </h5>
    </motion.div>
  );
}

// Tile Card Component
function TileCard({ tile, isActive, onHover, index }) {
  return (
    <motion.div
      className="flex-1 rounded-xl cursor-pointer relative group overflow-hidden w-full"
      onMouseEnter={onHover}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ scale: 1.02 }}
      style={{
        background: isActive
          ? "linear-gradient(135deg, rgba(11, 61, 145, 0.15) 0%, rgba(255, 107, 53, 0.08) 100%)"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.005) 100%)",
        border: isActive
          ? "1.5px solid #FF6B35"
          : "1.5px solid rgba(255, 255, 255, 0.05)",
        boxShadow: isActive
          ? "0 8px 30px rgba(255, 107, 53, 0.15), 0 0 1px rgba(255, 255, 255, 0.2) inset"
          : "0 4px 12px rgba(0, 0, 0, 0.2), 0 0 1px rgba(255, 255, 255, 0.05) inset",
        backdropFilter: "blur(12px)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-between p-5">
        <h5 
          className="font-qanelas-soft text-sm md:text-base transition-colors duration-300"
          style={{
            color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.65)",
            fontWeight: isActive ? "700" : "500",
          }}
        >
          {tile.title}
        </h5>

        {/* Dynamic active indicator icon */}
        <div 
          className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 border"
          style={{
            borderColor: isActive ? "#FF6B35" : "rgba(255, 255, 255, 0.15)",
            background: isActive ? "#FF6B35" : "transparent",
          }}
        >
          <span 
            className="w-1.5 h-1.5 rounded-full bg-white transition-transform duration-300"
            style={{
              transform: isActive ? "scale(1)" : "scale(0)",
            }}
          />
        </div>
      </div>

      {/* Hover glow line */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6B35]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

// Testimonials Carousel Component
function TestimonialsCarousel({ testimonials, isMobile }) {
  const [isPaused, setIsPaused] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const carouselRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Ensure carousel is ready before starting auto-play
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Auto-play carousel (desktop)
  useEffect(() => {
    if (!isReady || isPaused || isMobile) return;
    if (!carouselRef.current) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const container = carouselRef.current;

        if (container.scrollWidth <= container.offsetWidth) return;

        const firstCard = container.querySelector('div[style*="width: 38%"]');
        const cardWidth = firstCard
          ? firstCard.offsetWidth
          : container.offsetWidth * 0.4;
        const gap = container.offsetWidth * 0.02;

        container.scrollBy({
          left: cardWidth + gap,
          behavior: "smooth",
        });

        setTimeout(() => {
          if (!carouselRef.current) return;
          const maxScroll = container.scrollWidth - container.offsetWidth;
          if (container.scrollLeft >= maxScroll - 50) {
            container.scrollTo({ left: 0, behavior: "auto" });
          }
        }, 600);
      }
    }, 7500);

    return () => clearInterval(interval);
  }, [isReady, isPaused, isMobile]);

  // Auto-play carousel (mobile)
  useEffect(() => {
    if (!isReady || isPaused || !isMobile) return;
    if (!mobileScrollRef.current) return;

    const interval = setInterval(() => {
      if (mobileScrollRef.current) {
        const container = mobileScrollRef.current;

        if (container.scrollWidth <= container.offsetWidth) return;

        // Get the first card to measure its actual width
        const firstCard = container.querySelector(".flex-shrink-0");
        const cardWidth = firstCard
          ? firstCard.offsetWidth
          : container.offsetWidth * 0.8;

        container.scrollBy({
          left: cardWidth,
          behavior: "smooth",
        });

        setTimeout(() => {
          if (!mobileScrollRef.current) return;
          const maxScroll = container.scrollWidth - container.offsetWidth;
          if (container.scrollLeft >= maxScroll - 50) {
            container.scrollTo({ left: 0, behavior: "auto" });
          }
        }, 600);
      }
    }, 7500);

    return () => clearInterval(interval);
  }, [isReady, isPaused, isMobile]);

  // Handle chevron click for desktop
  const handleChevronClick = () => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const firstCard = container.querySelector('div[style*="width: 38%"]');
    const cardWidth = firstCard
      ? firstCard.offsetWidth
      : container.offsetWidth * 0.4;
    const gap = container.offsetWidth * 0.02;

    container.scrollBy({
      left: cardWidth + gap,
      behavior: "smooth",
    });

    // Check for reset
    setTimeout(() => {
      if (!carouselRef.current) return;
      const maxScroll = container.scrollWidth - container.offsetWidth;
      if (container.scrollLeft >= maxScroll - 50) {
        container.scrollTo({ left: 0, behavior: "auto" });
      }
    }, 600);
  };

  const handleMouseDown = (e) => {
    if (!mobileScrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - mobileScrollRef.current.offsetLeft;
    scrollLeft.current = mobileScrollRef.current.scrollLeft;
    setIsPaused(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !mobileScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - mobileScrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    mobileScrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setIsPaused(false);
  };

  return (
    <>
      {/* Desktop Carousel */}
      <div className="hidden lg:block relative">
        <div
          ref={carouselRef}
          className="flex gap-[2%] overflow-x-auto scrollbar-hide py-4"
          style={{
            scrollBehavior: "smooth",
          }}
        >
          {/* Triple testimonials for smooth infinite loop */}
          {[...testimonials, ...testimonials, ...testimonials].map(
            (testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0"
                style={{ width: "38%" }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ),
          )}
        </div>

        {/* Chevron Navigation */}
        <button
          onClick={handleChevronClick}
          className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-0 translate-x-[calc(100%+0.75rem)] items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 text-white/40 group-hover:text-white/80 transition-colors duration-300" />
        </button>
      </div>

      {/* Mobile Carousel - 1.25 cards visible */}
      <div className="lg:hidden relative -mx-6">
        <div
          ref={mobileScrollRef}
          className="flex overflow-x-auto scrollbar-hide py-4"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          }}
        >
          {/* Double testimonials for infinite effect */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 pr-4"
              style={{
                width: "80%",
                scrollSnapAlign: "start",
              }}
            >
              <TestimonialCard testimonial={testimonial} isMobile />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Testimonial Card Component
function TestimonialCard({ testimonial, isMobile }) {
  return (
    <div
      className={`bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl ${isMobile ? "p-6" : "p-8"} h-full min-h-[300px] flex flex-col justify-between hover:border-[#FF6B35]/25 hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden shadow-xl`}
    >
      {/* Glow highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D91]/5 via-transparent to-[#FF6B35]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Decorative Quotation Marks */}
      <div className="absolute top-4 right-6 text-white/5 group-hover:text-[#FF6B35]/5 text-7xl font-serif pointer-events-none transition-colors duration-500 select-none">
        &ldquo;
      </div>

      {/* Quote */}
      <p
        className={`text-white/85 ${isMobile ? "text-xs md:text-sm" : "text-sm md:text-base"} leading-relaxed mb-6 italic font-medium relative z-10`}
      >
        "{testimonial.quote}"
      </p>

      {/* Author info */}
      <div className="relative z-10">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
        <p
          className={`text-white font-qanelas-soft font-bold ${isMobile ? "text-sm md:text-base" : "text-base md:text-lg"} mb-1`}
        >
          {testimonial.author}
        </p>
        <p className={`text-white/45 ${isMobile ? "text-[10px] md:text-xs" : "text-xs md:text-sm"} font-medium`}>
          {testimonial.role}
        </p>
        {testimonial.organization && (
          <p
            className={`text-[#FF6B35] ${isMobile ? "text-[10px] md:text-xs" : "text-xs md:text-sm"} font-semibold mt-1`}
          >
            {testimonial.organization}
          </p>
        )}
      </div>
    </div>
  );
}
