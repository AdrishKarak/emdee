"use client";

import Navbar from "@/components/Navbar";
import { motion, useInView } from "motion/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { tilesData } from "@/components/SecurityPage/tilesData.js";
import { useITESProgress } from "@/hooks/useITESProgress";
import { ITESNavigationIndicator } from "@/components/ITESPage/ITESNavigationIndicator";
import ReactMarkdown from "react-markdown";

export function meta() {
  return [
    { title: "Security Services & Solutions | Emdee Techno Services" },
    { name: "description", content: "Comprehensive security services including physical security, cybersecurity, surveillance systems, and access control solutions." },
    { property: "og:title", content: "Security Services & Solutions | Emdee Techno Services" },
    { property: "og:description", content: "Comprehensive security services including physical security, cybersecurity, surveillance systems, and access control." },
    { property: "og:url", content: "https://emdee.in/security" }
  ];
}

export default function SecurityPage() {
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

      // Get the image and content container (last child of tile)
      const tileImage = tileElement.querySelector("img");
      const tileContent = tileElement.querySelector("div:last-child"); // The content div with text

      if (!tileImage || !tileContent) return;

      // Get current positions
      const imageRect = tileImage.getBoundingClientRect();
      const contentRect = tileContent.getBoundingClientRect();

      // Calculate tile content height (from image top to content bottom)
      const tileContentHeight = contentRect.bottom - imageRect.top;

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
      const currentIndex = currentTile - 1;
      if (index > currentIndex) {
        // Going down (lower to higher index)
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

      <div className="hidden md:block pt-20">
        <div className="relative">
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: heroImageLoaded ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img
              src="https://ucarecdn.com/8f479258-b3b1-4336-8551-d34b51700454/-/format/auto/"
              alt="Security & Surveillance"
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
              Security & Surveillance
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
            We design and deploy surveillance and security systems that enable
            real-time monitoring, access control and operational oversight
            across public institutions and urban environments. From city and
            traffic-level surveillance to institutional and facility-specific
            systems, our deployments combine field execution, system integration
            and sustained operations to support safety, compliance and
            governance at scale.
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
              1: "City Surveillance",
              2: "School Surveillance",
              3: "Police Station Surveillance",
              4: "Biometric Systems",
              5: "ANPR Surveillance",
              6: "IP-based Surveillance",
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
            src="https://ucarecdn.com/8d74883b-7e53-4bfc-8a33-d94e956e03c6/-/format/auto/"
            alt="Security & Surveillance"
            className="w-full h-auto object-contain"
            ref={mobileImageRef}
            onLoad={() => setHeroImageLoaded(true)}
          />
        </motion.div>

        <motion.div
          className="px-2 mt-4 w-full"
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
            Security & Surveillance
          </h1>
        </motion.div>

        <div
          ref={mobileIntroRef}
          className="px-6 mt-[1.95rem] mb-16 flex justify-center"
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
            We design and deploy surveillance and security systems that enable
            real-time monitoring, access control and operational oversight
            across public institutions and urban environments. From city and
            traffic-level surveillance to institutional and facility-specific
            systems, our deployments combine field execution, system integration
            and sustained operations to support safety, compliance and
            governance at scale.
          </motion.p>
        </div>

        <div className="px-2 pb-20 space-y-12">
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

      const entryStart = viewportHeight * 0.95;
      const entryEnd = viewportHeight * 0.25;

      let entryProgress = 0;

      if (isFirstTile) {
        entryProgress = introExitProgress;
      } else {
        if (rect.top < entryStart && rect.top > entryEnd) {
          entryProgress = 1 - (rect.top - entryEnd) / (entryStart - entryEnd);
        } else if (rect.top <= entryEnd) {
          entryProgress = 1;
        }
      }

      let exitProgress = 0;
      if (nextTileRef?.current) {
        const nextRect = nextTileRef.current
          .querySelector("img")
          ?.getBoundingClientRect();
        if (nextRect) {
          const nextTileHeight = nextRect.height;
          const nextTileVisibleFromBottom = viewportHeight - nextRect.top;
          const nextTileVisiblePercent = Math.max(
            0,
            Math.min(1, nextTileVisibleFromBottom / nextTileHeight),
          );

          if (nextRect.top <= viewportHeight * 0.8) {
            exitProgress = Math.min(1, nextTileVisiblePercent / 1.05);
          }
        }
      }

      setAnimationState({ entry: entryProgress, exit: exitProgress });
    };

    window.addEventListener("scroll", handleAnimation, { passive: true });
    handleAnimation();

    return () => window.removeEventListener("scroll", handleAnimation);
  }, [nextTileRef, isFirstTile, introExitProgress]);

  const getAnimationStyle = () => {
    const { entry, exit } = animationState;

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

    if (entry < 1) {
      const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);
      const easedEntry = easeOutQuad(entry);

      return {
        opacity: easedEntry,
        y: 60 * (1 - easedEntry),
        scale: 0.97 + 0.03 * easedEntry,
      };
    }

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

      <h3
        className="text-2xl font-bold text-white"
        style={
          tile.title === "E-Governance Delivery Systems"
            ? { fontSize: "1.45rem" }
            : {}
        }
      >
        {tile.title}
      </h3>

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
