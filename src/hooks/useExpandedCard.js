import { useState, useRef, useEffect } from "react";

export function useExpandedCard(isMobile) {
  const [expandedCard, setExpandedCard] = useState(null);
  const [sheetDragY, setSheetDragY] = useState(0); // Track drag position for bottom sheet

  const sheetRef = useRef(null); // Reference for bottom sheet
  const dragStartY = useRef(0); // Track drag start position
  const scrollPosition = useRef(0); // Store scroll position

  const handleReadMore = (storyId) => {
    setExpandedCard(storyId);
  };

  const handleCloseExpanded = () => {
    setExpandedCard(null);
    setSheetDragY(0); // Reset drag position
  };

  // Handle touch start for bottom sheet swipe
  const handleSheetTouchStart = (e) => {
    if (!isMobile) return;
    dragStartY.current = e.touches[0].clientY;
  };

  // Handle touch move for bottom sheet swipe-to-dismiss (not height adjustment)
  const handleSheetTouchMove = (e) => {
    if (!isMobile || dragStartY.current === 0) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - dragStartY.current;

    // Only allow downward dragging for dismissal (no upward expansion)
    if (deltaY > 0) {
      setSheetDragY(deltaY);
    }
  };

  // Handle touch end for bottom sheet swipe-to-dismiss
  const handleSheetTouchEnd = () => {
    if (!isMobile) return;

    // If dragged down more than 120px, close the sheet
    if (sheetDragY > 120) {
      handleCloseExpanded();
    } else {
      // Otherwise, snap back to fixed position (no height adjustment)
      setSheetDragY(0);
    }

    dragStartY.current = 0;
  };

  // Prevent body scroll when card is expanded
  useEffect(() => {
    if (expandedCard !== null) {
      // Save current scroll position
      scrollPosition.current = window.scrollY;

      // Lock body scroll without changing position
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%"; // Prevent layout shift from scrollbar removal

      if (isMobile) {
        document.documentElement.style.overflow = "hidden";
      }

      return () => {
        // Restore scroll
        document.body.style.overflow = "";
        document.body.style.width = "";

        if (isMobile) {
          document.documentElement.style.overflow = "";
        }

        // Restore scroll position
        window.scrollTo(0, scrollPosition.current);
      };
    }
  }, [expandedCard, isMobile]);

  return {
    expandedCard,
    sheetDragY,
    sheetRef,
    handleReadMore,
    handleCloseExpanded,
    handleSheetTouchStart,
    handleSheetTouchMove,
    handleSheetTouchEnd,
  };
}
