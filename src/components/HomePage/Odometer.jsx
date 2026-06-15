import { useState, useEffect, useRef } from "react";

export function Odometer({ value, isVisible, className, style }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [currentColor, setCurrentColor] = useState("#FF6B35");
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Only animate once when visible
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    // Parse the numeric value from strings like "4,000+" or "99.9%"
    const numericString = value.replace(/[^0-9.]/g, "");
    const targetValue = parseFloat(numericString);

    // Get suffix (like "+", "%", etc.)
    const suffix = value.match(/[^0-9.,]/g)?.join("") || "";

    // Animation duration in ms (1.25 seconds)
    const duration = 1250;
    const colorTransitionStart = 500; // Start transitioning to white after 0.5s
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const current = startValue + (targetValue - startValue) * easeProgress;
      setDisplayValue(current);

      // Color transition logic
      if (elapsed < colorTransitionStart) {
        // Stay orange for first 0.5 seconds
        setCurrentColor("#FF6B35");
      } else {
        // Transition from orange to white
        const colorProgress =
          (elapsed - colorTransitionStart) / (duration - colorTransitionStart);
        const clampedProgress = Math.min(colorProgress, 1);

        // Interpolate from orange (#FF6B35) to white (#FFFFFF)
        const r = Math.round(255 + (255 - 255) * clampedProgress); // 255 to 255
        const g = Math.round(107 + (255 - 107) * clampedProgress); // 107 to 255
        const b = Math.round(53 + (255 - 53) * clampedProgress); // 53 to 255

        setCurrentColor(`rgb(${r}, ${g}, ${b})`);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValue);
        setCurrentColor("#FFFFFF"); // Ensure final color is white
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value]);

  // Format the number with commas if needed
  const formatNumber = (num) => {
    const rounded = Math.round(num);
    return rounded.toLocaleString("en-US");
  };

  // Get suffix from original value
  const suffix = value.match(/[^0-9.,]/g)?.join("") || "";

  return (
    <span className={className} style={{ ...style, color: currentColor }}>
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
}
