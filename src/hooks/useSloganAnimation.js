export function useSloganAnimation(scrollY, heroHeight) {
  const sloganScrollRange = 800;
  const sloganScrollProgress = Math.min(scrollY / sloganScrollRange, 1);

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
  const easedSloganProgress = easeOutQuart(sloganScrollProgress);

  const sloganStartY = heroHeight * 0.78;
  const sloganEndY = 60;
  const sloganY =
    sloganStartY - (sloganStartY - sloganEndY) * easedSloganProgress;

  const sloganScale = 1 + easedSloganProgress * 0.12;
  const sloganBgOpacity = easedSloganProgress * 0.92;
  const sloganBlur = easedSloganProgress * 12;

  return {
    sloganScrollRange,
    sloganY,
    sloganScale,
    sloganBgOpacity,
    sloganBlur,
  };
}
