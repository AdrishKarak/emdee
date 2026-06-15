"use client";

import Navbar from "@/components/Navbar";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { tilesData } from "@/components/ITInfraPage/tilesData";
import { useITESProgress } from "@/hooks/useITESProgress";
import { ITESNavigationIndicator } from "@/components/ITESPage/ITESNavigationIndicator";
import ReactMarkdown from "react-markdown";

export function meta() {
  return [
    { title: "IT Infrastructure Solutions | Emdee Techno Services" },
    { name: "description", content: "Comprehensive IT infrastructure services including network design, server management, cloud solutions, and data center management." },
    { property: "og:title", content: "IT Infrastructure Solutions | Emdee Techno Services" },
    { property: "og:description", content: "Comprehensive IT infrastructure services including network design, server management, cloud solutions, and data center management." },
    { property: "og:url", content: "https://emdee.in/it-infra" }
  ];
}

export default function ITInfraPage() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [expandedTiles, setExpandedTiles] = useState({});
  const [showScrollIcon, setShowScrollIcon] = useState(true);
  const [introExitProgress, setIntroExitProgress] = useState(0);
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

  const { tileRefs, tilesContainerRef, currentTile, indicatorVisible } =
    useITESProgress(tilesData.length);

  const mobileIntroRef = useRef(null);
  const isMobileIntroInView = useInView(mobileIntroRef, {
    once: true,
    amount: 0.2,
  });

  const desktopIntroRef = useRef(null);
  const isDesktopIntroInView = useInView(desktopIntroRef, {
    once: false,
    amount: 0.01,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !hasScrolled) {
        setHasScrolled(true);
      }
      if (window.scrollY > 100) {
        setShowScrollIcon(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  useEffect(() => {
    const handleIntroExit = () => {
      if (!tileRefs.current[0]?.current) return;

      const tile1Image = tileRefs.current[0].current.querySelector("img");
      if (!tile1Image) return;

      const imageRect = tile1Image.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.55;

      if (imageRect.top <= triggerPoint && imageRect.top >= 0) {
        const progress = Math.min(
          1,
          Math.max(0, (triggerPoint - imageRect.top) / (triggerPoint * 0.5)),
        );
        setIntroExitProgress(progress);
      } else if (imageRect.top < 0) {
        setIntroExitProgress(1);
      } else {
        setIntroExitProgress(0);
      }
    };

    window.addEventListener("scroll", handleIntroExit, { passive: true });
    handleIntroExit();

    return () => window.removeEventListener("scroll", handleIntroExit);
  }, [tileRefs]);

  const scrollToTile = (tileId) => {
    const index = tilesData.findIndex((tile) => tile.id === tileId);
    if (index !== -1 && tileRefs.current[index]?.current) {
      const tileElement = tileRefs.current[index].current;

      // Get all the elements we need to measure
      const tileImage = tileElement.querySelector("img");
      const readMoreButton = tileElement.querySelector("button");

      if (!tileImage || !readMoreButton) return;

      // Get current positions
      const imageRect = tileImage.getBoundingClientRect();
      const buttonRect = readMoreButton.getBoundingClientRect();

      // Calculate tile content height (from image top to button bottom)
      const tileContentHeight = buttonRect.bottom - imageRect.top;

      // Calculate available viewport space
      const navbarHeight = 80;
      const viewportHeight = window.innerHeight;
      const availableHeight = viewportHeight - navbarHeight;

      // Calculate ideal scroll position
      let targetScrollTop;

      if (tileContentHeight <= availableHeight) {
        // Tile fits - center it with equal space top and bottom
        const idealTopSpace = (availableHeight - tileContentHeight) / 2;
        const imageTopAbsolute = imageRect.top + window.scrollY;
        targetScrollTop = imageTopAbsolute - navbarHeight - idealTopSpace;
      } else {
        // Tile doesn't fit - position image at top with standard padding
        const desiredTopPadding = 120;
        const imageTopAbsolute = imageRect.top + window.scrollY;
        targetScrollTop = imageTopAbsolute - navbarHeight - desiredTopPadding;
      }

      // Apply directional adjustment
      // currentTile is 1-indexed, index is 0-indexed
      const currentIndex = currentTile - 1;
      if (index > currentIndex) {
        // Going down (lower to higher index)
        // Special case: jumping from tile 1 to tile 6 needs 140px instead of 100px
        if (currentTile === 1 && index === 5) {
          targetScrollTop -= 140;
        } else {
          targetScrollTop -= 100;
        }
      } else if (index < currentIndex) {
        // Going up (higher to lower index) - position 100px lower
        targetScrollTop += 100;
      }

      // Single smooth scroll to final position - no corrections
      window.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
    }
  };

  const toggleExpanded = (tileId) => {
    setExpandedTiles((prev) => ({
      ...prev,
      [tileId]: !prev[tileId],
    }));
  };

  const getIntroExitStyles = () => {
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOutCubic(introExitProgress);

    return {
      opacity: 1 - easedProgress,
    };
  };

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
              src="https://ucarecdn.com/d4ae0a00-b484-477c-8e70-1466a11f6238/-/format/auto/"
              alt="System Integration"
              className="w-full h-auto object-contain"
              ref={desktopImageRef}
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
              System Integration
            </h1>
          </motion.div>
        </div>

        <div
          ref={desktopIntroRef}
          className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-[50px] mb-20 flex justify-center"
        >
          <motion.p
            className="text-xl lg:text-2xl text-white leading-relaxed max-w-[72rem] text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity:
                heroImageLoaded && hasScrolled ? 1 - introExitProgress : 0,
              y: heroImageLoaded && hasScrolled ? 0 : 40,
            }}
            transition={
              introExitProgress > 0
                ? { duration: 0, delay: 0 }
                : { duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }
            }
          >
            We supply, install and manage large-scale IT infrastructure that
            powers government departments, public space, service delivery
            institutions/machineries and enterprise environments. Backed by two
            decades of field execution, leading OEM partnerships and 100,000+ IT
            assets under management, we deliver end-to-end system integrations
            and commissioning.
          </motion.p>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-32">
          <ITESNavigationIndicator
            currentTile={currentTile}
            indicatorVisible={indicatorVisible}
            tilesData={tilesData}
            onTileClick={scrollToTile}
            introExitProgress={introExitProgress}
            customIndexTitles={{
              1: "IT Hardware (SITC)",
              5: "Computer Laboratories",
              7: "IT goods (felicitation)",
            }}
          />

          <div className="w-full max-w-[65%] ml-auto pl-16">
            <div ref={tilesContainerRef} className="space-y-16">
              {tilesData.map((tile, index) => (
                <DesktopTileCard
                  key={tile.id}
                  tile={tile}
                  tileRef={tileRefs.current[index]}
                  nextTileRef={
                    index < tilesData.length - 1
                      ? tileRefs.current[index + 1]
                      : null
                  }
                  isExpanded={expandedTiles[tile.id]}
                  onToggle={() => toggleExpanded(tile.id)}
                  isFirstTile={index === 0}
                  introExitProgress={introExitProgress}
                />
              ))}
            </div>
          </div>
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
            src="https://ucarecdn.com/a5cf3f7d-432d-4878-a413-789b496e249b/-/format/auto/"
            alt="System Integration"
            className="w-full h-auto object-contain"
            ref={mobileImageRef}
            onLoad={() => setHeroImageLoaded(true)}
          />
        </motion.div>

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
            System Integration
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
            We supply, install and manage large-scale IT infrastructure that
            powers government departments, public space, service delivery
            institutions/machineries and enterprise environments. Backed by two
            decades of field execution, leading OEM partnerships and 100,000+ IT
            assets under management, we deliver end-to-end system integrations
            and commissioning.
          </motion.p>
        </div>

        <div className="px-6 pb-20 space-y-12">
          {tilesData.map((tile, index) => (
            <MobileTileCard
              key={tile.id}
              tile={tile}
              isExpanded={expandedTiles[tile.id]}
              onToggle={() => toggleExpanded(tile.id)}
              previewLines={3}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const DesktopTileCard = ({
  tile,
  tileRef,
  nextTileRef,
  isExpanded,
  onToggle,
  isFirstTile = false,
  introExitProgress = 0,
}) => {
  const cardRef = useRef(null);
  const [animationState, setAnimationState] = useState({ entry: 0, exit: 0 });

  useEffect(() => {
    const handleAnimation = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Entry animation: very extended range for calm, slow entry
      const entryStart = viewportHeight * 0.95; // Start much earlier
      const entryEnd = viewportHeight * 0.25; // End later for slower progression

      let entryProgress = 0;

      // For the first tile, use introExitProgress instead of scroll-based entry
      if (isFirstTile) {
        entryProgress = introExitProgress;
      } else {
        if (rect.top < entryStart && rect.top > entryEnd) {
          entryProgress = 1 - (rect.top - entryEnd) / (entryStart - entryEnd);
        } else if (rect.top <= entryEnd) {
          entryProgress = 1;
        }
      }

      // Exit animation: controlled by next tile's entry
      let exitProgress = 0;
      if (nextTileRef?.current) {
        // Now nextTileRef points to the card, so we find the image inside it
        const nextRect = nextTileRef.current
          .querySelector("img")
          ?.getBoundingClientRect();
        if (nextRect) {
          // Calculate what percentage of the next tile is in viewport
          const nextTileHeight = nextRect.height;
          const nextTileVisibleFromBottom = viewportHeight - nextRect.top;
          const nextTileVisiblePercent = Math.max(
            0,
            Math.min(1, nextTileVisibleFromBottom / nextTileHeight),
          );

          // Exit starts when next tile entry triggers (top <= 80% viewport)
          // Exit completes when 105% of next tile is visible
          if (nextRect.top <= viewportHeight * 0.8) {
            exitProgress = Math.min(1, nextTileVisiblePercent / 1.05);
          }
        }
      }

      setAnimationState({ entry: entryProgress, exit: exitProgress });
    };

    window.addEventListener("scroll", handleAnimation, { passive: true });
    handleAnimation(); // Check on mount

    return () => window.removeEventListener("scroll", handleAnimation);
  }, [nextTileRef, isFirstTile, introExitProgress]);

  const getAnimationStyle = () => {
    const { entry, exit } = animationState;

    // Exit takes priority
    if (exit > 0) {
      const easeInOut = (t) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const easedExit = easeInOut(exit);

      return {
        opacity: 1 - easedExit,
        y: -100 * easedExit,
        scale: 1 - 0.1 * easedExit,
      };
    }

    // Entry animation - very gentle easing for calm, smooth entry
    if (entry < 1) {
      const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);
      const easedEntry = easeOutQuad(entry);

      return {
        opacity: easedEntry,
        y: 60 * (1 - easedEntry), // Reduced from 120px for much calmer movement
        scale: 0.97 + 0.03 * easedEntry, // Reduced scale change
      };
    }

    // Fully visible
    return {
      opacity: 1,
      y: 0,
      scale: 1,
    };
  };

  const animStyle = getAnimationStyle();

  return (
    <motion.div
      ref={(el) => {
        cardRef.current = el;
        if (tileRef) tileRef.current = el;
      }}
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      animate={animStyle}
      transition={{ duration: 0, ease: "linear" }}
      className="origin-left"
      style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          transform: "scale(0.8)",
          transformOrigin: "left top",
          marginBottom: "-10%",
        }}
      >
        <img
          src={tile.image}
          alt={tile.title}
          className="w-full h-auto object-cover"
        />
      </div>

      <h2
        className="text-white"
        style={{
          fontSize: "clamp(1.5rem, 3vw, 1.8rem)",
          fontWeight: "bold",
          position: "relative",
          zIndex: 1,
        }}
      >
        {tile.title}
      </h2>

      <div
        className="text-[#E5E5E5] leading-relaxed"
        style={{ fontSize: "0.9rem", maxWidth: "85%" }}
      >
        {isExpanded ? (
          <ReactMarkdown>{tile.content}</ReactMarkdown>
        ) : (
          <div
            className="line-clamp-6"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 6,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            <ReactMarkdown>{tile.content}</ReactMarkdown>
          </div>
        )}
        <button
          onClick={onToggle}
          className="text-[#FF6B35] hover:text-[#FF7A45] font-bold transition-colors duration-200"
          style={{ marginTop: "0.6rem" }}
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      </div>
    </motion.div>
  );
};

const MobileTileCard = ({
  tile,
  isExpanded,
  onToggle,
  previewLines,
  index,
}) => {
  const cardRef = useRef(null);
  const [animationProgress, setAnimationProgress] = useState({
    entry: 0,
    exit: 0,
  });

  useEffect(() => {
    const handleAnimation = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const entryTriggerStart = viewportHeight * 0.85;
      const entryTriggerEnd = viewportHeight * 0.5;

      if (rect.top < entryTriggerStart && rect.top > entryTriggerEnd) {
        const progress =
          1 -
          (rect.top - entryTriggerEnd) / (entryTriggerStart - entryTriggerEnd);
        setAnimationProgress({
          entry: Math.min(1, Math.max(0, progress)),
          exit: 0,
        });
      } else if (
        rect.top <= entryTriggerEnd &&
        rect.bottom > viewportHeight * 0.7
      ) {
        setAnimationProgress({ entry: 1, exit: 0 });
      }

      const exitTriggerStart = viewportHeight * 0.85;
      const exitTriggerEnd = -50;

      if (rect.bottom < exitTriggerStart && rect.bottom > exitTriggerEnd) {
        const progress =
          1 -
          (rect.bottom - exitTriggerEnd) / (exitTriggerStart - exitTriggerEnd);
        setAnimationProgress({
          entry: 1,
          exit: Math.min(1, Math.max(0, progress)),
        });
      } else if (rect.bottom <= exitTriggerEnd) {
        setAnimationProgress({ entry: 1, exit: 1 });
      } else if (rect.top >= entryTriggerStart) {
        setAnimationProgress({ entry: 0, exit: 0 });
      }
    };

    window.addEventListener("scroll", handleAnimation, { passive: true });
    handleAnimation();

    return () => window.removeEventListener("scroll", handleAnimation);
  }, []);

  const getAnimationStyle = () => {
    const { entry, exit } = animationProgress;

    if (exit > 0) {
      return {
        opacity: 1 - exit * 0.6,
        transform: `translateY(${-40 * exit}px) scale(${1 - exit * 0.05})`,
      };
    }

    if (entry < 1) {
      const easeOut = (t) => 1 - Math.pow(1 - t, 3);
      const easedEntry = easeOut(entry);
      return {
        opacity: easedEntry,
        transform: `translateY(${60 * (1 - easedEntry)}px) scale(${0.95 + 0.05 * easedEntry})`,
      };
    }

    return {
      opacity: 1,
      transform: "translateY(0) scale(1)",
    };
  };

  const animStyle = getAnimationStyle();
  const { entry, exit } = animationProgress;
  const imageScale = entry < 1 ? 1.1 : exit > 0 ? 1 + exit * 0.1 : 1;

  return (
    <div
      ref={cardRef}
      className="space-y-4 transition-all duration-700 ease-out"
      style={animStyle}
    >
      <div className="rounded-xl overflow-hidden">
        <img
          src={tile.image}
          alt={tile.title}
          className="w-full h-auto object-cover transition-transform duration-1000 ease-out"
          style={{ transform: `scale(${imageScale})` }}
        />
      </div>

      <h3 className="text-2xl font-bold text-white">{tile.title}</h3>

      <div className="text-[#E5E5E5] text-[0.95rem] leading-relaxed">
        {isExpanded ? (
          <ReactMarkdown>{tile.content}</ReactMarkdown>
        ) : (
          <div
            className="line-clamp-3"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: previewLines,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            <ReactMarkdown>{tile.content}</ReactMarkdown>
          </div>
        )}
        <button
          onClick={onToggle}
          className="mt-2 text-[#FF6B35] hover:text-[#FF7A45] font-bold transition-colors duration-200"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      </div>
    </div>
  );
};
