import { useState, useRef, useEffect } from "react";

export function useHeadingGradient(carouselProgress, isMobile) {
  const [headingGradientProgress, setHeadingGradientProgress] = useState(0);
  const mobileHeadingRef = useRef(null);

  // Manual scroll-based gradient progress for mobile (trigger at 40% from top)
  useEffect(() => {
    if (!isMobile) return;

    const handleMobileGradientScroll = () => {
      // On mobile, track the heading position
      if (!mobileHeadingRef.current) return;

      const rect = mobileHeadingRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const triggerStart = viewportHeight * 0.6; // Start when heading is at 60% from top
      const triggerEnd = viewportHeight * 0.4; // Complete when heading reaches 40% from top

      // Calculate progress based on heading position
      if (rect.top <= triggerStart && rect.top >= triggerEnd) {
        const progress =
          (triggerStart - rect.top) / (triggerStart - triggerEnd);
        setHeadingGradientProgress(Math.min(1, Math.max(0, progress)));
      } else if (rect.top < triggerEnd) {
        setHeadingGradientProgress(1); // Fully blue
      } else {
        setHeadingGradientProgress(0); // Fully orange
      }
    };

    window.addEventListener("scroll", handleMobileGradientScroll, {
      passive: true,
    });
    handleMobileGradientScroll(); // Check on mount

    return () =>
      window.removeEventListener("scroll", handleMobileGradientScroll);
  }, [isMobile]);

  // Track carousel progress for desktop only
  useEffect(() => {
    if (isMobile) return; // Skip for mobile, use manual scroll listener above

    const unsubscribe = carouselProgress.on("change", (latest) => {
      setHeadingGradientProgress(latest);
    });
    return () => unsubscribe();
  }, [carouselProgress, isMobile]);

  // Color interpolation function (same pattern as OEM section)
  const getHeadingGradient = () => {
    // Initial state: Orange to White gradient
    const orangeWhite = {
      start: "#FF8C00", // Bright orange
      mid: "#FFA500", // Orange
      end: "#FFFFFF", // White
    };

    // Final state: Blue to White gradient
    const blueWhite = {
      start: "#1E90FF", // Dodger blue
      mid: "#4169E1", // Royal blue
      end: "#FFFFFF", // White
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
      orangeWhite.start,
      blueWhite.start,
      headingGradientProgress,
    );
    const midColor = interpolateColor(
      orangeWhite.mid,
      blueWhite.mid,
      headingGradientProgress,
    );
    const endColor = interpolateColor(
      orangeWhite.end,
      blueWhite.end,
      headingGradientProgress,
    );

    // Interpolate gradient angle: 135deg -> 180deg (to bottom)
    const angle = 135 + (180 - 135) * headingGradientProgress;

    return `linear-gradient(${angle}deg, ${startColor} 0%, ${midColor} 80%, ${endColor} 100%)`;
  };

  return {
    headingGradientProgress,
    mobileHeadingRef,
    getHeadingGradient,
  };
}
