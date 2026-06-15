import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { stories } from "./NewSuccessStoriesSection/successStoriesData";

export function SuccessStoriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportScale, setViewportScale] = useState(1);

  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const mobileScrollRef = useRef(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate viewport-based scale for desktop carousel
  useEffect(() => {
    const calculateScale = () => {
      if (window.innerWidth < 1024) {
        setViewportScale(1);
        return;
      }

      // The carousel needs approximately 1700px total width:
      // Center card (502px) + Left card (502*0.75 = 376.5px) + Right card (376.5px) + spacing
      const requiredWidth = 1700;
      const availableWidth = window.innerWidth * 0.9; // Use 90% of viewport

      // Scale down if viewport is smaller than required
      const scale = Math.min(1, availableWidth / requiredWidth);

      setViewportScale(scale);
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  // Carousel entry animations
  const { scrollYProgress: carouselProgress } = useScroll({
    target: carouselRef,
    offset: ["start end", "end end"],
  });

  const carouselY = useTransform(carouselProgress, [0, 0.3, 1], [150, 0, 0]);
  const carouselOpacity = useTransform(
    carouselProgress,
    [0, 0.2, 1],
    [0, 1, 1],
  );
  const baseCarouselScale = useTransform(
    carouselProgress,
    [0, 0.3, 1],
    [0.85, 1, 1],
  );

  // Combine animation scale with viewport scale
  const carouselScale = useTransform(
    baseCarouselScale,
    (value) => value * viewportScale,
  );

  const totalSlides = stories.length;

  const handlePrev = () => {
    if (isMobile && mobileScrollRef.current) {
      const containerWidth = mobileScrollRef.current.offsetWidth;
      mobileScrollRef.current.scrollBy({
        left: -containerWidth * 0.85,
        behavior: "smooth",
      });
    } else {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  const handleNext = () => {
    if (isMobile && mobileScrollRef.current) {
      const containerWidth = mobileScrollRef.current.offsetWidth;
      mobileScrollRef.current.scrollBy({
        left: containerWidth * 0.85,
        behavior: "smooth",
      });
    } else {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setActiveIndex((prev) => (prev + 1) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  const handleReadMore = (storyId) => {
    setExpandedCard(storyId);
  };

  const handleCloseExpanded = () => {
    setExpandedCard(null);
  };

  // Prevent body scroll when card is expanded
  useEffect(() => {
    if (expandedCard !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [expandedCard]);

  // Get card position relative to active index (desktop only)
  const getCardPosition = (index) => {
    const diff = index - activeIndex;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -(totalSlides - 1)) return "right";
    if (diff === -1 || diff === totalSlides - 1) return "left";
    return "hidden";
  };

  return (
    <div
      ref={sectionRef}
      className="relative bg-[#0A0A0A] py-20 lg:py-32 px-6 lg:px-16 overflow-hidden"
      style={{ overflowX: "hidden" }}
    >
      {/* Mobile Header */}
      <div className="lg:hidden text-center mb-12 px-4">
        <p className="text-sm font-qanelas-soft italic text-gray-400 mb-3">
          A glimpse into our portfolio of transformative projects
        </p>
        <div className="flex justify-center mb-3">
          <div className="w-[60px] h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
        </div>
        <h2 className="text-3xl font-qanelas-soft font-bold bg-gradient-to-r from-[#FF6B35] to-[#4A90E2] bg-clip-text text-transparent">
          Our Success Stories
        </h2>
      </div>

      {/* Mobile Carousel - 1.10 tiles with swipe */}
      {isMobile ? (
        <div className="relative -mx-6">
          {/* Horizontally scrollable container */}
          <div
            ref={mobileScrollRef}
            className="flex overflow-x-auto scrollbar-hide"
            style={{
              scrollSnapType: "x proximity",
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth",
              paddingLeft: "6vw",
              paddingRight: "6vw",
              paddingBottom: "20px",
            }}
          >
            {stories.map((story, index) => {
              // Check if this is the last card to render peek differently
              const isLastCard = index === stories.length - 1;

              return (
                <div
                  key={story.id}
                  className="flex-shrink-0 pr-3"
                  style={{
                    width: "calc(88vw + 12px)",
                    scrollSnapAlign: "start",
                  }}
                >
                  {/* Card container with peek overlay */}
                  <div className="relative" style={{ width: "88vw" }}>
                    {/* Main card */}
                    <div
                      className="bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-2xl relative z-10"
                      style={{
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        height: "550px",
                      }}
                    >
                      {/* Image */}
                      <div className="w-full h-[215px] bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A]" />

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-base font-qanelas-soft font-bold text-white mb-3">
                          {story.title}
                        </h3>
                        <p className="text-sm font-qanelas-soft text-gray-400 mb-5 leading-relaxed">
                          {story.summary}
                        </p>
                        <button
                          onClick={() => handleReadMore(story.id)}
                          className="px-5 py-2 bg-white text-black font-qanelas-soft font-semibold text-sm rounded-lg hover:bg-gray-200 transition-all duration-300"
                        >
                          Read More
                        </button>
                      </div>
                    </div>

                    {/* Peek preview of next card - positioned absolutely */}
                    {!isLastCard && (
                      <div
                        className="absolute top-0 pointer-events-none"
                        style={{
                          right: "-9vw",
                          width: "88vw",
                          height: "100%",
                          filter: "blur(3px)",
                          opacity: 0.35,
                          zIndex: 5,
                        }}
                      >
                        <div
                          className="bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-2xl h-full"
                          style={{
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                          }}
                        >
                          <div className="w-full h-[215px] bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A]" />
                          <div className="p-6">
                            <div className="h-6 bg-gray-800/50 rounded mb-3" />
                            <div className="h-12 bg-gray-800/50 rounded mb-5" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tiny subtle chevrons - secondary affordance */}
          <button
            onClick={handlePrev}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      ) : (
        /* Desktop Carousel with Viewport Scale */
        <motion.div
          ref={carouselRef}
          className="relative"
          style={{
            translateY: carouselY,
            opacity: carouselOpacity,
            scale: carouselScale,
            height: `${780 * viewportScale}px`,
          }}
        >
          {/* Cards */}
          <div className="absolute inset-0 flex items-center justify-center">
            {stories.map((story, index) => {
              const position = getCardPosition(index);
              const isFocused = position === "center";
              const isVisible = position !== "hidden";

              return (
                <div
                  key={story.id}
                  className="absolute transition-all duration-[600ms] ease-out"
                  style={{
                    transform:
                      position === "center"
                        ? "translateX(0) scale(1)"
                        : position === "left"
                          ? "translateX(-120%) scale(0.75)"
                          : position === "right"
                            ? "translateX(120%) scale(0.75)"
                            : "translateX(0) scale(0.5)",
                    opacity: isVisible ? (isFocused ? 1 : 0.4) : 0,
                    filter: isFocused ? "blur(0px)" : "blur(4px)",
                    zIndex: isFocused ? 20 : 10,
                    pointerEvents: isFocused ? "auto" : "none",
                  }}
                >
                  <div
                    className={`bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-2xl ${
                      isFocused ? "hover-lift" : ""
                    }`}
                    style={{
                      width: "502px",
                      height: "780px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: isFocused
                        ? "0 30px 60px rgba(0, 0, 0, 0.5), 0 0 80px rgba(255, 255, 255, 0.05)"
                        : "0 20px 40px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {/* Image */}
                    <div
                      className="w-full bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A]"
                      style={{ height: "317px" }}
                    />

                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-2xl font-qanelas-soft font-bold text-white mb-4">
                        {story.title}
                      </h3>
                      <p className="text-lg font-qanelas-soft text-gray-400 mb-6 leading-relaxed">
                        {story.summary}
                      </p>
                      <button
                        onClick={() => handleReadMore(story.id)}
                        className="px-6 py-2.5 bg-white text-black font-qanelas-soft font-semibold text-sm rounded-lg hover:bg-gray-200 transition-all duration-300"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            disabled={isTransitioning}
            className="absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </motion.div>
      )}

      {/* Expanded Card Overlay */}
      {expandedCard !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center px-6"
          style={{
            animation: "fadeIn 400ms ease-out",
          }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={handleCloseExpanded}
            style={{
              animation: "fadeIn 400ms ease-out",
            }}
          />

          {/* Expanded Card */}
          <div
            className="relative bg-[#1A1A1A] rounded-3xl p-12 max-w-5xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-white/10"
            style={{
              animation: "expandCard 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseExpanded}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Title */}
            <h3
              className="text-3xl font-qanelas-soft font-bold text-white mb-8"
              style={{ fontSize: "30.6px" }}
            >
              {stories.find((s) => s.id === expandedCard)?.title}
            </h3>

            {/* Full Text */}
            <div className="space-y-6">
              {stories
                .find((s) => s.id === expandedCard)
                ?.fullText.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-base lg:text-lg font-qanelas-soft text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx global>{`
        .hover-lift {
          transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .hover-lift:hover {
          transform: translateY(-8px) !important;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes expandCard {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
