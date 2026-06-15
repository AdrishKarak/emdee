export function ReadingProgressIndicator({
  readingProgress,
  indicatorVisible,
  isMobile = false,
  totalSegments = 4,
  variant = "default", // "default" or "timeline"
}) {
  const baseClasses = isMobile
    ? "md:hidden flex fixed right-0 top-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-500 flex-col z-20"
    : "hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-500 flex-col z-20";

  const marginStyle = isMobile
    ? { marginRight: "20px" }
    : { marginLeft: "calc((100vw - min(1280px, 100vw - 6rem)) / 2 - 48px)" };

  // Smaller size for timeline variant
  const segmentHeight =
    variant === "timeline"
      ? { active: "20px", inactive: "10px" }
      : isMobile
        ? { active: "24px", inactive: "12px" }
        : { active: "32px", inactive: "16px" };

  const segmentWidth =
    variant === "timeline" ? "2px" : isMobile ? "2.5px" : "3px";

  // White for timeline, orange for default
  const activeColor =
    variant === "timeline"
      ? "rgba(255, 255, 255, 0.85)" // White with good visibility
      : isMobile
        ? "rgba(255, 107, 53, 0.5)"
        : "rgba(255, 107, 53, 0.6)";

  const inactiveColor =
    variant === "timeline"
      ? "rgba(255, 255, 255, 0.25)" // Lighter grey for better visibility
      : isMobile
        ? "rgba(255, 255, 255, 0.12)"
        : "rgba(255, 255, 255, 0.15)";

  const activeOpacity = variant === "timeline" ? 0.85 : isMobile ? 1 : 1;
  const inactiveOpacity = variant === "timeline" ? 0.3 : isMobile ? 0.4 : 0.5;

  // Smaller gap for timeline
  const gapStyle = variant === "timeline" ? "3px" : isMobile ? "16px" : "24px";

  return (
    <div
      className={baseClasses}
      style={{
        ...marginStyle,
        opacity: indicatorVisible ? 1 : 0,
        gap: gapStyle,
      }}
    >
      {[...Array(totalSegments)].map((_, index) => {
        const segment = index + 1;
        return (
          <div
            key={segment}
            className="transition-all duration-500 ease-out"
            style={{
              width: segmentWidth,
              height:
                readingProgress >= segment
                  ? segmentHeight.active
                  : segmentHeight.inactive,
              backgroundColor:
                readingProgress >= segment ? activeColor : inactiveColor,
              borderRadius: "2px",
              opacity:
                readingProgress >= segment ? activeOpacity : inactiveOpacity,
            }}
          />
        );
      })}
    </div>
  );
}
