import { useState, useEffect, useRef } from "react";

export function useImpactAnimation() {
  const [entryProgress, setEntryProgress] = useState(0); // 0 = not started, 1 = fully entered
  const [isScrolling, setIsScrolling] = useState(false);

  // Exit animation states
  const [exitPhase1Progress, setExitPhase1Progress] = useState(0); // Content exit
  const [exitPhase2Progress, setExitPhase2Progress] = useState(0); // Frame exit

  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const tilesRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Set scrolling state
      setIsScrolling(true);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to detect scroll stop (130ms after last scroll event)
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 130);

      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // ENTRY ANIMATION LOGIC - Progress-based for replay capability
      // Entry trigger starts when section top reaches 75% and completes at 50%
      const entryTriggerStart = viewportHeight * 0.75;
      const entryTriggerEnd = viewportHeight * 0.5;

      if (rect.top < entryTriggerStart && rect.top > entryTriggerEnd) {
        const progress =
          1 -
          (rect.top - entryTriggerEnd) / (entryTriggerStart - entryTriggerEnd);
        setEntryProgress(Math.min(1, Math.max(0, progress)));
      } else if (rect.top <= entryTriggerEnd) {
        setEntryProgress(1);
      } else {
        setEntryProgress(0); // Reset when section is below viewport
      }

      // EXIT ANIMATION LOGIC
      // Exit trigger: starts earlier when section bottom reaches 99% of viewport
      const exitTriggerStart = viewportHeight * 0.99;
      const phase1End = viewportHeight * 0.6;
      const phase2End = viewportHeight * 0.2;

      // Phase 1: Content Exit (heading, subheading, tiles project upward)
      if (rect.bottom < exitTriggerStart && rect.bottom > phase1End) {
        const phase1 =
          1 - (rect.bottom - phase1End) / (exitTriggerStart - phase1End);
        setExitPhase1Progress(Math.min(1, Math.max(0, phase1)));
      } else if (rect.bottom <= phase1End) {
        setExitPhase1Progress(1);
      } else {
        setExitPhase1Progress(0);
      }

      // Phase 2: Frame Exit (frame projects upward after content)
      if (rect.bottom < phase1End && rect.bottom > phase2End) {
        const phase2 = 1 - (rect.bottom - phase2End) / (phase1End - phase2End);
        setExitPhase2Progress(Math.min(1, Math.max(0, phase2)));
      } else if (rect.bottom <= phase2End) {
        setExitPhase2Progress(1);
      } else {
        setExitPhase2Progress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Calculate individual element animation states based on entry progress
  // Frame animates first (0 to 0.3 of entry progress)
  const frameAnimated = entryProgress > 0;
  const frameProgress = Math.min(1, entryProgress / 0.3);

  // Heading animates next (0.3 to 0.6 of entry progress)
  const headingAnimated = entryProgress > 0.3;
  const headingProgress = Math.min(1, Math.max(0, (entryProgress - 0.3) / 0.3));

  // Subheading + tiles animate last (0.6 to 1.0 of entry progress)
  const subheadingAnimated = entryProgress > 0.6;
  const subheadingProgress = Math.min(
    1,
    Math.max(0, (entryProgress - 0.6) / 0.4),
  );

  return {
    sectionRef,
    frameRef,
    headingRef,
    subheadingRef,
    tilesRef,
    frameAnimated,
    headingAnimated,
    subheadingAnimated,
    isScrolling,
    exitPhase1Progress,
    exitPhase2Progress,
  };
}
