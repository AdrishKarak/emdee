import { useEffect, useState, useRef } from "react";

export function ITESNavigationIndicator({
  currentTile,
  indicatorVisible,
  tilesData,
  onTileClick,
  introExitProgress = 0,
  customIndexTitles = {},
}) {
  const [isFooterInViewport, setIsFooterInViewport] = useState(false);
  const indicatorRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const checkFooterVisibility = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Footer is entering viewport when its top is visible
      const footerEntering = footerRect.top < viewportHeight;

      setIsFooterInViewport(footerEntering);
    };

    const handleScrollWithRaf = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(checkFooterVisibility);
    };

    window.addEventListener("scroll", handleScrollWithRaf, { passive: true });
    window.addEventListener("resize", checkFooterVisibility, { passive: true });
    checkFooterVisibility(); // Check on mount

    return () => {
      window.removeEventListener("scroll", handleScrollWithRaf);
      window.removeEventListener("resize", checkFooterVisibility);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const marginStyle = {
    marginLeft: "calc((100vw - min(1400px, 100vw - 3rem)) / 2)",
  };

  const entranceOpacity = Math.min(1, introExitProgress * 2);
  const entranceTranslateX = -40 * (1 - Math.min(1, introExitProgress * 2));

  // Hide indicator when footer is in viewport OR when it hasn't entered yet
  const shouldShow =
    indicatorVisible && introExitProgress > 0 && !isFooterInViewport;

  return (
    <div
      ref={indicatorRef}
      className="hidden md:flex fixed left-0 top-1/2 pointer-events-none flex-col z-20"
      style={{
        ...marginStyle,
        opacity: shouldShow ? entranceOpacity : 0,
        transform: `translateY(calc(-50% + clamp(20px, 3vh, 30px))) translateX(${entranceTranslateX}px)`,
        transition: "opacity 0.3s ease-out, transform 0.5s ease-out",
        gap: "clamp(20px, 3.2vh, 32px)",
        width: "35%",
        maxWidth: "480px",
        paddingRight: "3rem",
      }}
    >
      {tilesData.map((tile, index) => {
        const isActive = currentTile === index + 1;
        const tileNumber = String(index + 1).padStart(2, "0");
        const displayTitle = customIndexTitles[index + 1] || tile.title;

        return (
          <button
            key={tile.id}
            onClick={() => onTileClick(tile.id)}
            className="w-full text-left group relative pointer-events-auto"
          >
            <div
              className="flex items-center"
              style={{ gap: "clamp(16px, 2vw, 24px)" }}
            >
              {/* Active bar with glow */}
              <div className="relative flex-shrink-0">
                <div
                  className={`transition-all duration-500 rounded-full ${
                    isActive
                      ? "bg-[#FF6B35]"
                      : "bg-white/20 group-hover:bg-white/40"
                  }`}
                  style={{
                    width: isActive ? "6px" : "4px",
                    height: isActive
                      ? "clamp(42px, 5.6vh, 56px)"
                      : "clamp(24px, 3.2vh, 32px)",
                  }}
                />
                {/* Glow effect for active state */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-full bg-[#FF6B35] blur-md opacity-60"
                    style={{
                      animation: "pulse 2s ease-in-out infinite",
                    }}
                  />
                )}
              </div>

              {/* Content wrapper */}
              <div>
                {/* Number indicator */}
                <div
                  className={`font-bold transition-all duration-300 ${
                    isActive
                      ? "text-[#FF6B35]"
                      : "text-white/30 group-hover:text-white/50"
                  }`}
                  style={{
                    letterSpacing: "0.1em",
                    fontSize: "clamp(0.7rem, 1.4vh, 0.875rem)",
                    marginBottom: "clamp(2px, 0.4vh, 4px)",
                  }}
                >
                  {tileNumber}
                </div>

                {/* Title - uppercase and lighter weight */}
                <div
                  className={`font-normal uppercase transition-all duration-300 leading-snug ${
                    isActive
                      ? "text-white"
                      : "text-white/40 group-hover:text-white/70"
                  }`}
                  style={{
                    fontSize: "clamp(0.85rem, 1.6vh, 1.022rem)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {displayTitle}
                </div>

                {/* Underline animation for active state */}
                <div
                  className={`h-0.5 bg-gradient-to-r from-[#FF6B35] to-transparent transition-all duration-500 ${
                    isActive
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 group-hover:w-1/3 group-hover:opacity-50"
                  }`}
                  style={{ marginTop: "clamp(4px, 0.8vh, 8px)" }}
                />
              </div>
            </div>
          </button>
        );
      })}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
