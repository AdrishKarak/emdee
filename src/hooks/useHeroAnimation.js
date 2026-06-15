export function useHeroAnimation(scrollY) {
  // Ensure heroHeight is always a valid number
  const heroHeight =
    typeof window !== "undefined" && window.innerHeight > 0
      ? window.innerHeight
      : 1000;

  // Safety check: ensure scrollY is a valid number
  const safeScrollY =
    typeof scrollY === "number" && !isNaN(scrollY) && isFinite(scrollY)
      ? scrollY
      : 0;

  const heroScrollProgress = Math.min(safeScrollY / (heroHeight * 0.8), 1);

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easedHeroProgress = easeOutCubic(heroScrollProgress);

  // Ensure all calculated values are valid numbers
  const videoTransform = isNaN(easedHeroProgress)
    ? 0
    : easedHeroProgress * -120;
  const companyNameTransform = isNaN(easedHeroProgress)
    ? 0
    : easedHeroProgress * -80;
  const scrollIndicatorOpacity = isNaN(heroScrollProgress)
    ? 1
    : Math.max(0, 1 - heroScrollProgress * 3);

  return {
    heroHeight,
    videoTransform,
    companyNameTransform,
    scrollIndicatorOpacity,
    easedHeroProgress: isNaN(easedHeroProgress) ? 0 : easedHeroProgress,
  };
}
