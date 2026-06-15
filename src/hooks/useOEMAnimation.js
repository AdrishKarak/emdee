import { useState, useEffect, useRef } from "react";

export function useOEMAnimation() {
  const [headingPhase1Progress, setHeadingPhase1Progress] = useState(0); // Heading entry
  const [phase2Progress, setPhase2Progress] = useState(0); // Subheading + carousels entry + gradient transition

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const carouselsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // PHASE 1: Heading Entry
      // Triggers earlier when section top reaches 85% of viewport
      // Completes when section top reaches 60% of viewport
      const phase1TriggerStart = viewportHeight * 0.85;
      const phase1TriggerEnd = viewportHeight * 0.6;

      if (rect.top < phase1TriggerStart && rect.top > phase1TriggerEnd) {
        const progress =
          1 -
          (rect.top - phase1TriggerEnd) /
            (phase1TriggerStart - phase1TriggerEnd);
        setHeadingPhase1Progress(Math.min(1, Math.max(0, progress)));
      } else if (rect.top <= phase1TriggerEnd) {
        setHeadingPhase1Progress(1);
      } else {
        setHeadingPhase1Progress(0);
      }

      // PHASE 2: Subheading + Carousels Entry + Gradient Transition
      // Starts later after Phase 1 completes (when section top reaches 50%)
      // Completes when section top reaches 15% of viewport (longer duration)
      const phase2TriggerStart = viewportHeight * 0.5;
      const phase2TriggerEnd = viewportHeight * 0.15;

      if (rect.top < phase2TriggerStart && rect.top > phase2TriggerEnd) {
        const progress =
          1 -
          (rect.top - phase2TriggerEnd) /
            (phase2TriggerStart - phase2TriggerEnd);
        setPhase2Progress(Math.min(1, Math.max(0, progress)));
      } else if (rect.top <= phase2TriggerEnd) {
        setPhase2Progress(1);
      } else {
        setPhase2Progress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    sectionRef,
    headingRef,
    subheadingRef,
    carouselsRef,
    headingPhase1Progress,
    phase2Progress,
  };
}
