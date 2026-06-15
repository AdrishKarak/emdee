import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";

export function AboutUsSection({ onHoverChange }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mobileImageProgress, setMobileImageProgress] = useState(0); // 0 = X, 1 = Y
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const mobileImageRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-50px" });

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track mobile image scroll position
  useEffect(() => {
    const handleMobileImageScroll = () => {
      if (!mobileImageRef.current) return;

      const rect = mobileImageRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const imageMidpoint = rect.top + rect.height / 2;
      const viewportTrigger = viewportHeight * 0.65; // Changed to 65%

      // Calculate transition progress based on image crossing 65% viewport
      if (imageMidpoint <= viewportTrigger) {
        // Image has crossed 65%, transition to Y
        const distancePastTrigger = viewportTrigger - imageMidpoint;
        const transitionRange = 125; // Set to 125px for slower transition
        const progress = Math.min(
          1,
          Math.max(0, distancePastTrigger / transitionRange),
        );
        setMobileImageProgress(progress);
      } else {
        // Image hasn't crossed 65% yet, show X
        setMobileImageProgress(0);
      }
    };

    window.addEventListener("scroll", handleMobileImageScroll, {
      passive: true,
    });
    handleMobileImageScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleMobileImageScroll);
  }, []);

  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, x: -80, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1.0,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const subheadingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.35 + custom * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
  };

  return (
    <div ref={sectionRef} className="relative z-30 bg-[#0A0A0A] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto lg:px-12">
        {/* 40:60 Split Layout with Equal Height Containers */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-stretch">
          {/* Left Side - Images */}
          <motion.div
            className="hidden lg:block w-full lg:w-[42%] lg:-mr-12 relative overflow-hidden rounded-2xl lg:rounded-none lg:rounded-l-2xl min-h-[400px] lg:min-h-0 lg:self-stretch"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Image X - Default */}
            <img
              src="https://ucarecdn.com/de008b7b-1c89-4f81-968a-ed1e33712a07/-/format/auto/"
              alt="About Emdee"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
              style={{
                opacity: isHovered ? 0 : 1,
              }}
            />

            {/* Image Y - Hover State */}
            <img
              src="https://ucarecdn.com/5f67c185-0399-4eb2-aeff-455365d7fdac/-/format/auto/"
              alt="About Emdee Team"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
              style={{
                opacity: isHovered ? 0.75 : 0,
              }}
            />

            {/* Dark Overlay for Image Y */}
            <div
              className="absolute inset-0 bg-black transition-opacity duration-700 ease-in-out pointer-events-none"
              style={{
                opacity: isHovered ? 0.35 : 0,
              }}
            />
          </motion.div>

          {/* Right Side - Content */}
          <div className="w-full lg:w-[58%] px-6 lg:px-0 lg:pl-20 flex flex-col justify-center">
            {/* Mobile Images - Only visible on mobile, positioned above heading */}
            <div
              ref={mobileImageRef}
              className="lg:hidden relative w-screen h-[280px] mb-8 overflow-hidden -mx-6"
            >
              {/* Image X - Initial state */}
              <img
                src="https://ucarecdn.com/aabf7912-e08a-47b3-bfd5-fc12d88c9346/-/format/auto/"
                alt="About Emdee"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                style={{
                  opacity: 1 - mobileImageProgress,
                }}
              />

              {/* Dark Overlay for Image X - 25% overlay */}
              <div
                className="absolute inset-0 bg-black transition-opacity duration-500 ease-in-out pointer-events-none"
                style={{
                  opacity: (1 - mobileImageProgress) * 0.25,
                }}
              />

              {/* Image Y - Scroll state */}
              <img
                src="https://ucarecdn.com/209007ba-c5bb-4e85-bf92-4cc15b4446a3/-/format/auto/"
                alt="About Emdee Team"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                style={{
                  opacity: mobileImageProgress,
                }}
              />

              {/* Dark Overlay for Image Y - 10% overlay */}
              <div
                className="absolute inset-0 bg-black transition-opacity duration-500 ease-in-out pointer-events-none"
                style={{
                  opacity: mobileImageProgress * 0.1,
                }}
              />
            </div>

            {/* About Us Heading */}
            <motion.h2
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.1875rem)",
                fontFamily: "Qanelas Soft, sans-serif",
                fontWeight: "bold",
                marginBottom: "1.5rem",
              }}
              variants={headingVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <span
                style={{
                  background:
                    "linear-gradient(180deg, #FF6B35 0%, #FF6B35 55%, #000000 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                About Us
              </span>
            </motion.h2>

            {/* Subheading */}
            <motion.h3
              className="text-[0.96rem] md:text-[1.28rem] lg:text-[1.3056rem] font-qanelas-soft font-normal mb-8 lg:max-w-[30rem]"
              style={{
                color: "rgba(255, 255, 255, 0.85)",
                letterSpacing: "0.01em",
                lineHeight: "1.4",
                fontStyle: "italic",
              }}
              variants={subheadingVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              Powering Digital India – through Platforms, Products and People
            </motion.h3>

            {/* Body Text */}
            <div className="space-y-6 mb-10">
              <motion.p
                className="font-qanelas-soft text-[0.85rem] md:text-[0.9563rem] leading-[1.75]"
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  letterSpacing: "0.01em",
                }}
                variants={paragraphVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0}
              >
                Headquartered in Kolkata since 2004, we are a leading B2G
                partner advancing the Digital India mission across East India.
                With over 20 years of execution, we connect government intent to
                citizen delivery through system integration and maintenance,
                ITeS operations, BPO manpower, software development and
                surveillance solutions. Our legacy includes Aadhaar enrolment,
                electoral roll digitisation, SEC Census, PDS modernisation and
                countless other population-scale governance programmes and
                digitisation initiatives.
              </motion.p>

              <motion.p
                className="font-qanelas-soft text-[0.85rem] md:text-[0.9563rem] leading-[1.75]"
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  letterSpacing: "0.01em",
                }}
                variants={paragraphVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={1}
              >
                Today, our work covers the full breadth of public-service
                delivery — from spot billing for electricity corporations to
                statewide IT systems for Education, Health, Transport, Animal
                Husbandry and more; from smart classrooms in schools to software
                managing rural-roads development; from traffic surveillance
                networks to Aadhaar PEC & Authentication centres — supporting
                reliable, technology-driven service delivery for millions of
                citizens.
              </motion.p>
            </div>

            {/* Read More Button */}
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <a href="/about">
                <button
                  className="font-qanelas-soft font-semibold text-sm md:text-base lg:text-[0.9rem] px-8 py-3 lg:px-[1.8rem] lg:py-[0.675rem] rounded-lg transition-all duration-300"
                  style={{
                    background: "#D94F1F",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#000000",
                    letterSpacing: "0.02em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#C44519";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#D94F1F";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.15)";
                  }}
                >
                  Read More
                </button>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
