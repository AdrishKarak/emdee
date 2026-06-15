export function getTileAnimationStyle(
  tileIndex,
  tileSectionRef,
  tileAnimationState,
  isMobile,
  tileState = null,
  tileRef = null,
) {
  // SSR safety check - return empty object so server and client initial renders match
  // (client also returns {} when tileSectionRef.current is null on first render)
  if (typeof window === "undefined") {
    return {};
  }

  const viewportHeight = window.innerHeight;
  const staggerDelay = tileIndex * 0.15;

  // ═══════════════════════════════════════════════════════════
  // MOBILE ANIMATIONS - Individual Tile Based
  // ═══════════════════════════════════════════════════════════
  if (isMobile && tileState && tileRef?.current) {
    const rect = tileRef.current.getBoundingClientRect();

    // ─────────────────────────────────────────────────────────
    // MOBILE ENTRY: Scale up from 1% to 100%
    // ─────────────────────────────────────────────────────────
    if (tileState.state === "entering") {
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(tileState.progress);

      // Scale from 0.01 to 1.0 (1% to 100%)
      const scale = 0.01 + easedProgress * 0.99;
      const opacity = Math.min(1, easedProgress * 1.5);
      const translateY = (1 - easedProgress) * 40;

      // Border color transition
      const borderGradient = interpolateBorderGradient(tileState.progress);

      return {
        transform: `scale(${scale}) translateY(${translateY}px)`,
        opacity,
        filter: "none",
        transition: "none",
        borderGradient,
      };
    }

    // ─────────────────────────────────────────────────────────
    // MOBILE EXIT: Blur out
    // ─────────────────────────────────────────────────────────
    if (tileState.state === "exiting") {
      const easeInQuad = (t) => t * t; // Smoother than cubic
      const easedProgress = easeInQuad(tileState.progress);

      // Reduced blur effect (0 to 3px for subtle effect)
      const blur = easedProgress * 3;
      const opacity = 1 - easedProgress * 0.5; // Less opacity change too
      const scale = 1 - easedProgress * 0.05; // Minimal scale change

      return {
        transform: `scale(${scale})`,
        opacity,
        filter: `blur(${blur}px)`,
        transition: "none",
        borderGradient:
          "linear-gradient(135deg, #FF6B35 0%, #FF8F5A 25%, #FFB380 50%, #FF8F5A 75%, #FF6B35 100%)",
      };
    }

    // MOBILE READY STATE
    return {
      transform: "scale(1)",
      opacity: 1,
      filter: "none",
      borderGradient:
        "linear-gradient(135deg, #FF6B35 0%, #FF8F5A 25%, #FFB380 50%, #FF8F5A 75%, #FF6B35 100%)",
    };
  }

  // ═══════════════════════════════════════════════════════════
  // DESKTOP ANIMATIONS - Now using scale-based entry
  // ═══════════════════════════════════════════════════════════
  if (!tileSectionRef.current) return {};
  const rect = tileSectionRef.current.getBoundingClientRect();

  // Desktop animations
  if (tileAnimationState === "entering") {
    const entryStart = viewportHeight * 1.5;
    const entryEnd = viewportHeight * 0.3;
    const rawProgress =
      1 -
      Math.max(0, Math.min(1, (rect.top - entryEnd) / (entryStart - entryEnd)));

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOutCubic(rawProgress);

    // Scale from 0.01 to 1.0 (1% to 100%)
    const scale = 0.01 + easedProgress * 0.99;
    const opacity = Math.min(1, easedProgress * 1.5);

    const colorProgress = rawProgress;
    const borderGradient = interpolateBorderGradient(colorProgress);

    return {
      transform: `scale(${scale})`,
      opacity,
      transition: "none",
      borderGradient,
    };
  }

  if (tileAnimationState === "exiting") {
    const exitStart = viewportHeight * 1.4;
    const exitEnd = 0;
    const rawProgress = Math.max(0, Math.min(1, 1 - rect.bottom / exitStart));

    const easeInQuad = (t) => t * t;
    const easedProgress = easeInQuad(rawProgress);

    const scale = 1 - easedProgress * 0.1;
    const opacity = 1 - easedProgress * 0.5;
    const blur = easedProgress * 3;

    return {
      transform: `scale(${scale})`,
      opacity,
      filter: `blur(${blur}px)`,
      transition: "none",
      borderGradient:
        "linear-gradient(135deg, #FF6B35 0%, #FF8F5A 25%, #FFB380 50%, #FF8F5A 75%, #FF6B35 100%)",
    };
  }

  return {
    transform: "scale(1)",
    opacity: 1,
    filter: "none",
    borderGradient:
      "linear-gradient(135deg, #FF6B35 0%, #FF8F5A 25%, #FFB380 50%, #FF8F5A 75%, #FF6B35 100%)",
  };
}

function interpolateBorderGradient(colorProgress) {
  const interpolateColor = (start, end, progress) => {
    const r = Math.round(start.r + (end.r - start.r) * progress);
    const g = Math.round(start.g + (end.g - start.g) * progress);
    const b = Math.round(start.b + (end.b - start.b) * progress);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const whiteColors = [
    { r: 255, g: 255, b: 255 },
    { r: 230, g: 230, b: 230 },
    { r: 200, g: 200, b: 200 },
    { r: 230, g: 230, b: 230 },
    { r: 255, g: 255, b: 255 },
  ];

  const orangeColors = [
    { r: 255, g: 107, b: 53 },
    { r: 255, g: 143, b: 90 },
    { r: 255, g: 179, b: 128 },
    { r: 255, g: 143, b: 90 },
    { r: 255, g: 107, b: 53 },
  ];

  const color0 = interpolateColor(
    whiteColors[0],
    orangeColors[0],
    colorProgress,
  );
  const color1 = interpolateColor(
    whiteColors[1],
    orangeColors[1],
    colorProgress,
  );
  const color2 = interpolateColor(
    whiteColors[2],
    orangeColors[2],
    colorProgress,
  );
  const color3 = interpolateColor(
    whiteColors[3],
    orangeColors[3],
    colorProgress,
  );
  const color4 = interpolateColor(
    whiteColors[4],
    orangeColors[4],
    colorProgress,
  );

  return `linear-gradient(135deg, ${color0} 0%, ${color1} 25%, ${color2} 50%, ${color3} 75%, ${color4} 100%)`;
}
