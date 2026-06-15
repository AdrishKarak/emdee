import { useState, useRef, useEffect } from "react";
import { useScroll, useTransform } from "motion/react";

export function useSuccessStoriesCarousel(totalSlides) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [exitProgress, setExitProgress] = useState(0); // 0 = normal, 1 = fully exited

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

  // Carousel entry animations
  const { scrollYProgress: carouselProgress } = useScroll({
    target: carouselRef,
    offset: ["start end", "start center"],
  });

  const carouselY = useTransform(carouselProgress, [0, 1], [150, 0]);
  const carouselOpacity = useTransform(carouselProgress, [0, 0.7], [0, 1]);
  const carouselScale = useTransform(carouselProgress, [0, 1], [0.85, 1]);

  // Exit animation: Detect when carousel scrolls past viewport
  useEffect(() => {
    const handleExitScroll = () => {
      if (!carouselRef.current) return;

      const rect = carouselRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.07; // Top 7% of viewport

      // Start exit when carousel top reaches 7% from top of viewport
      if (rect.top <= triggerPoint && rect.top >= -200) {
        // Calculate progress with smooth easing
        const progress = Math.min(
          1,
          Math.max(0, (triggerPoint - rect.top) / 200),
        );
        setExitProgress(progress);
      } else if (rect.top < -200) {
        setExitProgress(1);
      } else {
        setExitProgress(0);
      }
    };

    window.addEventListener("scroll", handleExitScroll, { passive: true });
    handleExitScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleExitScroll);
  }, [carouselRef]);

  const handlePrev = () => {
    if (isMobile && mobileScrollRef.current) {
      const containerWidth = mobileScrollRef.current.offsetWidth;
      mobileScrollRef.current.scrollBy({
        left: -containerWidth * 0.85,
        behavior: "smooth",
      });
    } else {
      if (isTransitioning) return;
      if (activeIndex === 0) return; // Don't allow wrapping from first to last
      setIsTransitioning(true);
      setActiveIndex((prev) => prev - 1);
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

  // Get card position relative to active index
  const getCardPosition = (index) => {
    const diff = index - activeIndex;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -(totalSlides - 1)) return "right";
    if (diff === -1 || diff === totalSlides - 1) return "left";
    return "hidden";
  };

  return {
    activeIndex,
    isTransitioning,
    isMobile,
    carouselRef,
    mobileScrollRef,
    carouselProgress,
    carouselY,
    carouselOpacity,
    carouselScale,
    exitProgress,
    handlePrev,
    handleNext,
    getCardPosition,
  };
}
