import { useState, useEffect, useRef } from "react";

export function useTileAnimation(isMobile) {
  const [activeMobileTile, setActiveMobileTile] = useState(null);
  const [isTileSectionReady, setIsTileSectionReady] = useState(false);
  const [tileAnimationState, setTileAnimationState] = useState("entering");
  const [isScrolling, setIsScrolling] = useState(false);
  const [tileStates, setTileStates] = useState([
    { state: "entering", progress: 0 },
    { state: "entering", progress: 0 },
    { state: "entering", progress: 0 },
  ]);

  const tileSectionRef = useRef(null);
  const tile0Ref = useRef(null);
  const tile1Ref = useRef(null);
  const tile2Ref = useRef(null);
  const tileRefs = [tile0Ref, tile1Ref, tile2Ref];

  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Set scrolling state
      setIsScrolling(true);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to detect scroll stop (90ms after last scroll event)
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 90);

      if (!isMobile && tileSectionRef.current) {
        const rect = tileSectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const isEntering =
          rect.top > viewportHeight * 0.3 && rect.top < viewportHeight;
        const isReady =
          rect.top <= viewportHeight * 0.3 &&
          rect.bottom > viewportHeight * 0.6;
        const isExiting = rect.bottom < viewportHeight * 1.4 && rect.bottom > 0;

        if (isEntering) {
          setTileAnimationState("entering");
          setIsTileSectionReady(false);
        } else if (isReady) {
          setTileAnimationState("ready");
          setIsTileSectionReady(true);
        } else if (isExiting) {
          setTileAnimationState("exiting");
          setIsTileSectionReady(false);
        }

        // Track individual desktop tile states for scale animation
        const newTileStates = tileRefs.map((ref) => {
          if (!ref.current) return { state: "entering", progress: 0 };

          const tileRect = ref.current.getBoundingClientRect();

          // Entry: tile is entering from bottom
          const entryStart = viewportHeight * 1.5;
          const entryEnd = viewportHeight * 0.3;
          const entryProgress =
            1 -
            Math.max(
              0,
              Math.min(1, (tileRect.top - entryEnd) / (entryStart - entryEnd)),
            );

          // Exit: tile is leaving from top
          const exitStart = viewportHeight * 1.4;
          const exitEnd = -tileRect.height;
          const exitProgress = Math.max(
            0,
            Math.min(1, (exitStart - tileRect.top) / (exitStart - exitEnd)),
          );

          // Determine state based on position
          if (tileRect.top > viewportHeight) {
            return { state: "entering", progress: 0 };
          } else if (tileRect.bottom < 0) {
            return { state: "exited", progress: 1 };
          } else if (tileRect.top > entryEnd && entryProgress < 0.99) {
            return { state: "entering", progress: entryProgress };
          } else if (tileRect.top < exitStart && exitProgress > 0.01) {
            return { state: "exiting", progress: exitProgress };
          } else {
            return { state: "ready", progress: 1 };
          }
        });

        setTileStates(newTileStates);
      }

      // Mobile: Track each tile individually
      if (isMobile) {
        const viewportHeight = window.innerHeight;
        const newTileStates = tileRefs.map((ref) => {
          if (!ref.current) return { state: "entering", progress: 0 };

          const rect = ref.current.getBoundingClientRect();

          // Entry: tile is entering from bottom
          const entryStart = viewportHeight * 1.5;
          const entryEnd = viewportHeight * 0.1;
          const entryProgress =
            1 -
            Math.max(
              0,
              Math.min(1, (rect.top - entryEnd) / (entryStart - entryEnd)),
            );

          // Exit: tile is leaving from top (now starts later)
          const exitStart = viewportHeight * 0.3;
          const exitEnd = -rect.height * 0.5;
          const exitProgress = Math.max(
            0,
            Math.min(1, (exitStart - rect.top) / (exitStart - exitEnd)),
          );

          // Determine state based on position
          if (rect.top > viewportHeight) {
            return { state: "entering", progress: 0 };
          } else if (rect.bottom < 0) {
            return { state: "exited", progress: 1 };
          } else if (rect.top > entryEnd && entryProgress < 0.99) {
            return { state: "entering", progress: entryProgress };
          } else if (rect.top < exitStart * 0.7 && exitProgress > 0.01) {
            return { state: "exiting", progress: exitProgress };
          } else {
            return { state: "ready", progress: 1 };
          }
        });

        setTileStates(newTileStates);
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
  }, [isMobile]);

  const handleMobileTileTap = (tileId) => {
    setActiveMobileTile(activeMobileTile === tileId ? null : tileId);
  };

  return {
    activeMobileTile,
    isTileSectionReady,
    tileAnimationState,
    tileStates,
    tileSectionRef,
    tileRefs,
    handleMobileTileTap,
    isScrolling,
  };
}
