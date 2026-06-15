import { useOEMAnimation } from "@/hooks/useOEMAnimation";
import { useRef, useEffect, useState } from "react";

export function PlaceholderSection() {
  const {
    sectionRef,
    headingRef,
    subheadingRef,
    carouselsRef,
    headingPhase1Progress,
    phase2Progress,
  } = useOEMAnimation();

  const carousel1ContentRef = useRef(null);
  const carousel2ContentRef = useRef(null);
  const [carousel1Width, setCarousel1Width] = useState(0);
  const [carousel2Width, setCarousel2Width] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [exitProgress, setExitProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const loadedImagesCount = useRef(0);

  // Logo data for both carousels - images only, no icons
  const carousel1Logos = [
    {
      name: "D-Link",
      image:
        "https://ucarecdn.com/b3b56bb0-8ded-4e40-a90d-5b48f7daff1d/-/format/auto/",
    },
    {
      name: "HP",
      image:
        "https://ucarecdn.com/29242a28-1b03-476a-9336-8966cede3c51/-/format/auto/",
    },
    {
      name: "Dell",
      image:
        "https://ucarecdn.com/c3d0cddf-0a63-407a-acc8-a9427c47824b/-/format/auto/",
    },
    {
      name: "AMD",
      image:
        "https://ucarecdn.com/5c2dbd3d-b3ba-4b29-a2a1-617a125cb3ef/-/format/auto/",
    },
    {
      name: "Acer",
      image:
        "https://ucarecdn.com/9fd82958-bd49-4c62-a199-ad43a6428f0c/-/format/auto/",
    },
    {
      name: "Derwiser",
      image:
        "https://ucarecdn.com/6ac94df0-f626-470d-8278-f8c9a095848c/-/format/auto/",
    },
    {
      name: "Fujitsu",
      image:
        "https://ucarecdn.com/a4c3dd5b-5b16-436e-b1e4-f703a0300e3a/-/format/auto/",
    },
    {
      name: "Epson",
      image:
        "https://ucarecdn.com/4c58fc3d-21c5-422a-a9f5-98ce6e18e301/-/format/auto/",
    },
    {
      name: "APC",
      image:
        "https://ucarecdn.com/85711719-72aa-4498-9871-10b4884bdced/-/format/auto/",
    },
    {
      name: "Numeric",
      image:
        "https://ucarecdn.com/112c3b67-d6af-47db-81c0-c5bc4ed8c75b/-/format/auto/",
    },
  ];

  const carousel2Logos = [
    {
      name: "Prama Hikvision",
      image:
        "https://ucarecdn.com/bd4009e5-fd3a-48b0-a538-26755fd42fa7/-/format/auto/",
    },
    {
      name: "LG",
      image:
        "https://ucarecdn.com/b2004c02-f97d-43fd-8336-09197417c180/-/format/auto/",
    },
    {
      name: "Canon",
      image:
        "https://ucarecdn.com/6c2ac335-3630-4244-bff7-345a0ad2a514/-/format/auto/",
    },
    {
      name: "Vertiv",
      image:
        "https://ucarecdn.com/dfaf715c-9bf5-4a09-a9cb-91b72155629d/-/format/auto/",
    },
    {
      name: "CP Plus",
      image:
        "https://ucarecdn.com/82e162ea-c179-4c62-ac34-449ae11feb30/-/format/auto/",
    },
    {
      name: "Commscope",
      image:
        "https://ucarecdn.com/83b4c55b-b28a-4f46-9919-41451ef74f25/-/format/auto/",
    },
    {
      name: "Lenovo",
      image:
        "https://ucarecdn.com/293a7883-bebb-4875-a44e-fa15c8b0cfa5/-/format/auto/",
    },
    {
      name: "Netgear",
      image:
        "https://ucarecdn.com/3bab541a-0273-4082-9846-cafc7bb9e401/-/format/auto/",
    },
    {
      name: "Secugen",
      image:
        "https://ucarecdn.com/a2bf40a7-1087-40c2-8dd2-c8d9c496e699/-/format/auto/",
    },
  ];

  // Calculate fallback width based on logo count and expected sizes
  const calculateFallbackWidth = (logoCount, isMobileView) => {
    const imageHeight = isMobileView ? 180 : 300;
    const estimatedWidth = imageHeight * 1.5; // Assume 1.5:1 aspect ratio average
    const marginOffset = isMobileView ? -90 : -200;
    const effectiveWidth = estimatedWidth + marginOffset;
    return logoCount * Math.max(effectiveWidth, 50); // Minimum 50px per logo
  };

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Measure carousel width with multiple strategies
  const measureCarouselWidth = (contentRef, logoCount) => {
    if (!contentRef.current) return 0;

    const measured = contentRef.current.scrollWidth / 4;

    // If measurement seems valid (not 0 or too small), use it
    if (measured > 100) {
      return measured;
    }

    // Otherwise, use fallback calculation
    return calculateFallbackWidth(logoCount, isMobile);
  };

  // Update widths function
  const updateWidths = () => {
    if (carousel1ContentRef.current) {
      const newWidth = measureCarouselWidth(
        carousel1ContentRef,
        carousel1Logos.length,
      );
      setCarousel1Width(newWidth);
    }
    if (carousel2ContentRef.current) {
      const newWidth = measureCarouselWidth(
        carousel2ContentRef,
        carousel2Logos.length,
      );
      setCarousel2Width(newWidth);
    }
  };

  // Track image loading
  useEffect(() => {
    const totalImages = carousel1Logos.length + carousel2Logos.length;
    loadedImagesCount.current = 0;

    const handleImageLoad = () => {
      loadedImagesCount.current += 1;

      // When all images loaded, measure widths
      if (loadedImagesCount.current >= totalImages) {
        setImagesLoaded(true);
        // Small delay to ensure layout is settled
        setTimeout(updateWidths, 100);
      }
    };

    // Get all carousel images and add load listeners
    const images = document.querySelectorAll("#our-partners img");
    images.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad);
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
      });
    };
  }, []);

  // Initial width measurement and fallback timer
  useEffect(() => {
    // Initial measurement attempt
    updateWidths();

    // Fallback: If widths still 0 after 500ms, force fallback calculation
    const fallbackTimer = setTimeout(() => {
      if (carousel1Width === 0) {
        setCarousel1Width(
          calculateFallbackWidth(carousel1Logos.length, isMobile),
        );
      }
      if (carousel2Width === 0) {
        setCarousel2Width(
          calculateFallbackWidth(carousel2Logos.length, isMobile),
        );
      }
    }, 500);

    return () => clearTimeout(fallbackTimer);
  }, [isMobile]);

  // Re-measure on window resize with debounce
  useEffect(() => {
    let resizeTimer;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateWidths();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [isMobile]);

  // ResizeObserver for dynamic content changes
  useEffect(() => {
    if (!window.ResizeObserver) return;

    const observer = new ResizeObserver(() => {
      updateWidths();
    });

    if (carousel1ContentRef.current) {
      observer.observe(carousel1ContentRef.current);
    }
    if (carousel2ContentRef.current) {
      observer.observe(carousel2ContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  // Exit animation: Detect when logo carousel reaches top 5% of viewport
  useEffect(() => {
    const handleExitScroll = () => {
      if (!carouselsRef.current) return;

      const rect = carouselsRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.05;

      if (rect.top <= triggerPoint && rect.top >= 0) {
        const progress = Math.min(
          1,
          Math.max(0, (triggerPoint - rect.top) / (triggerPoint * 0.8)),
        );
        setExitProgress(progress);
      } else if (rect.top < 0) {
        setExitProgress(1);
      } else {
        setExitProgress(0);
      }
    };

    window.addEventListener("scroll", handleExitScroll, { passive: true });
    handleExitScroll();

    return () => window.removeEventListener("scroll", handleExitScroll);
  }, [carouselsRef]);

  // Calculate exit animation styles
  const getExitStyles = () => {
    if (!isMobile) return {}; // Only apply exit animation on mobile

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOutCubic(exitProgress);
    const scale = 1 - easedProgress * 0.2;

    return {
      transform: `translateY(${-20 * easedProgress}px) scale(${scale})`,
      opacity: 1 - easedProgress,
      transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
    };
  };

  // Calculate animation speed based on exit progress (deceleration)
  const getAnimationDuration = () => {
    if (!isMobile) return 30; // Consistent speed on desktop

    const baseDuration = 15; // Faster on mobile
    const slowdownFactor = 1 + exitProgress * 3;
    return baseDuration * slowdownFactor;
  };

  // Determine if animation should play
  const shouldAnimate = (width) => {
    // Animation plays if:
    // 1. Width is valid (> 0)
    // 2. On desktop: always play
    // 3. On mobile: play unless exit progress is too high
    if (width <= 0) return false;
    if (!isMobile) return true;
    return exitProgress < 0.8;
  };

  // Phase 1: Heading Entry Animation
  const getHeadingPhase1Style = () => {
    const translateY = 120 * (1 - headingPhase1Progress);
    const scale = 0.85 + 0.15 * headingPhase1Progress;
    const opacity = headingPhase1Progress;

    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity,
    };
  };

  // Phase 2: Gradient Transition (Dark Orange Gradient → White/Black Gradient)
  const getHeadingGradient = () => {
    const orangeGradient = {
      start: "#FFFFFF",
      earlyMid: "#FF8C00",
      mid: "#D2691E",
      lateMid: "#FFFFFF",
      end: "#8B4513",
    };

    const whiteBlack = {
      start: "#FFFFFF",
      earlyMid: "#E0E0E0",
      mid: "#808080",
      lateMid: "#404040",
      end: "#000000",
    };

    const interpolateColor = (color1, color2, progress) => {
      const r1 = parseInt(color1.slice(1, 3), 16);
      const g1 = parseInt(color1.slice(3, 5), 16);
      const b1 = parseInt(color1.slice(5, 7), 16);

      const r2 = parseInt(color2.slice(1, 3), 16);
      const g2 = parseInt(color2.slice(3, 5), 16);
      const b2 = parseInt(color2.slice(5, 7), 16);

      const r = Math.round(r1 + (r2 - r1) * progress);
      const g = Math.round(g1 + (g2 - g1) * progress);
      const b = Math.round(b1 + (b2 - b1) * progress);

      return `rgb(${r}, ${g}, ${b})`;
    };

    const startColor = interpolateColor(
      orangeGradient.start,
      whiteBlack.start,
      phase2Progress,
    );
    const earlyMidColor = interpolateColor(
      orangeGradient.earlyMid,
      whiteBlack.earlyMid,
      phase2Progress,
    );
    const midColor = interpolateColor(
      orangeGradient.mid,
      whiteBlack.mid,
      phase2Progress,
    );
    const lateMidColor = interpolateColor(
      orangeGradient.lateMid,
      whiteBlack.lateMid,
      phase2Progress,
    );
    const endColor = interpolateColor(
      orangeGradient.end,
      whiteBlack.end,
      phase2Progress,
    );

    return `linear-gradient(135deg, ${startColor} 0%, ${earlyMidColor} 20%, ${midColor} 45%, ${lateMidColor} 70%, ${endColor} 100%)`;
  };

  // Phase 2: Subheading + Carousels Entry Animation
  const getPhase2Style = () => {
    const translateY = 100 * (1 - phase2Progress);
    const scale = 0.9 + 0.1 * phase2Progress;
    const opacity = phase2Progress;

    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity,
    };
  };

  return (
    <div
      id="our-partners"
      ref={sectionRef}
      className="relative z-20 bg-[#0A0A0A] py-20 lg:py-32 px-6 lg:px-16"
      style={{ overflowX: "hidden" }}
    >
      {/* Heading with Dynamic Gradient */}
      <h2
        ref={headingRef}
        className="text-3xl md:text-4xl lg:text-5xl font-qanelas-soft font-extrabold text-center mb-6 heading-gradient-text"
        style={{
          letterSpacing: "-0.02em",
          lineHeight: "1.15",
          ...getHeadingPhase1Style(),
        }}
      >
        Backed by global technology leaders
      </h2>

      {/* Subheading */}
      <p
        ref={subheadingRef}
        className="text-sm md:text-base font-qanelas-soft font-medium uppercase tracking-[0.2em] text-center mb-16"
        style={{
          color: "rgba(255, 255, 255, 0.85)",
          ...getPhase2Style(),
        }}
      >
        Our OEM Partners
      </p>

      {/* Logo Marquees Container */}
      <div
        ref={carouselsRef}
        className="space-y-0"
        style={{
          marginTop: isMobile ? "0px" : "-75px",
          ...getPhase2Style(),
          ...getExitStyles(),
        }}
      >
        {/* Carousel 1 - Scrolls Right to Left */}
        <div className="relative overflow-hidden w-full">
          <div
            ref={carousel1ContentRef}
            className="inline-flex"
            style={{
              animation: shouldAnimate(carousel1Width)
                ? `marqueeLeft1 ${getAnimationDuration()}s linear infinite`
                : "none",
            }}
          >
            {/* Quadruple logos for seamless infinite loop */}
            {[
              ...carousel1Logos,
              ...carousel1Logos,
              ...carousel1Logos,
              ...carousel1Logos,
            ].map((logo, index) => (
              <div
                key={`carousel1-${index}`}
                className="flex-shrink-0"
                style={{ marginRight: isMobile ? "-90px" : "-200px" }}
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  style={{
                    height: isMobile ? "180px" : "300px",
                    width: "auto",
                    objectFit: "contain",
                    display: "block",
                    opacity: isMobile ? 0.85 : 0.8,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel 2 - Scrolls Left to Right */}
        <div
          className="relative overflow-hidden w-full"
          style={{ marginTop: isMobile ? "-30px" : "-75px" }}
        >
          <div
            ref={carousel2ContentRef}
            className="inline-flex"
            style={{
              animation: shouldAnimate(carousel2Width)
                ? `marqueeRight1 ${getAnimationDuration()}s linear infinite`
                : "none",
            }}
          >
            {/* Quadruple logos for seamless infinite loop */}
            {[
              ...carousel2Logos,
              ...carousel2Logos,
              ...carousel2Logos,
              ...carousel2Logos,
            ].map((logo, index) => (
              <div
                key={`carousel2-${index}`}
                className="flex-shrink-0"
                style={{ marginRight: isMobile ? "-70px" : "-200px" }}
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  style={{
                    height: isMobile ? "180px" : "300px",
                    width: "auto",
                    objectFit: "contain",
                    display: "block",
                    opacity: isMobile ? 0.85 : 0.8,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Gradient + Marquee Animation Styles */}
      <style jsx global>{`
        .heading-gradient-text {
          background: ${getHeadingGradient()};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          width: 100%;
        }

        @keyframes marqueeLeft1 {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${carousel1Width}px);
          }
        }

        @keyframes marqueeRight1 {
          0% {
            transform: translateX(-${carousel2Width}px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
