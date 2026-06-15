import { useRef } from "react";
import { useSuccessStoriesCarousel } from "@/hooks/useSuccessStoriesCarousel";
import { useHeadingGradient } from "@/hooks/useHeadingGradient";
import { useExpandedCard } from "@/hooks/useExpandedCard";
import { stories } from "./NewSuccessStoriesSection/successStoriesData";
import { SectionHeader } from "./NewSuccessStoriesSection/SectionHeader";
import { MobileCarousel } from "./NewSuccessStoriesSection/MobileCarousel";
import { DesktopCarousel } from "./NewSuccessStoriesSection/DesktopCarousel";
import { ExpandedCardOverlay } from "./NewSuccessStoriesSection/ExpandedCardOverlay";
import { MobileBottomSheet } from "./NewSuccessStoriesSection/MobileBottomSheet";
import { AnimationStyles } from "./NewSuccessStoriesSection/AnimationStyles";

export function NewSuccessStoriesSection() {
  const sectionRef = useRef(null);
  const totalSlides = stories.length;

  const {
    activeIndex,
    isTransitioning,
    isMobile,
    carouselRef,
    mobileScrollRef,
    carouselProgress,
    carouselY,
    carouselOpacity,
    carouselScale,
    exitProgress,
    handlePrev,
    handleNext,
    getCardPosition,
  } = useSuccessStoriesCarousel(totalSlides);

  const { mobileHeadingRef, getHeadingGradient } = useHeadingGradient(
    carouselProgress,
    isMobile,
  );

  const {
    expandedCard,
    sheetDragY,
    sheetRef,
    handleReadMore,
    handleCloseExpanded,
    handleSheetTouchStart,
    handleSheetTouchMove,
    handleSheetTouchEnd,
  } = useExpandedCard(isMobile);

  return (
    <div
      id="our-portfolio"
      ref={sectionRef}
      className="relative bg-[#07090E] py-20 lg:py-32 px-6 lg:px-16 overflow-hidden"
      style={{ overflowX: "hidden" }}
    >
      <SectionHeader
        isMobile={isMobile}
        mobileHeadingRef={mobileHeadingRef}
        getHeadingGradient={getHeadingGradient}
        exitProgress={exitProgress}
      />

      {isMobile ? (
        <MobileCarousel
          stories={stories}
          mobileScrollRef={mobileScrollRef}
          handleReadMore={handleReadMore}
          handlePrev={handlePrev}
          handleNext={handleNext}
          exitProgress={exitProgress}
        />
      ) : (
        <DesktopCarousel
          stories={stories}
          carouselRef={carouselRef}
          carouselY={carouselY}
          carouselOpacity={carouselOpacity}
          carouselScale={carouselScale}
          getCardPosition={getCardPosition}
          handleReadMore={handleReadMore}
          handlePrev={handlePrev}
          handleNext={handleNext}
          isTransitioning={isTransitioning}
          activeIndex={activeIndex}
          exitProgress={exitProgress}
        />
      )}

      {expandedCard !== null && !isMobile && (
        <ExpandedCardOverlay
          stories={stories}
          expandedCard={expandedCard}
          handleCloseExpanded={handleCloseExpanded}
        />
      )}

      {expandedCard !== null && isMobile && (
        <MobileBottomSheet
          stories={stories}
          expandedCard={expandedCard}
          sheetDragY={sheetDragY}
          sheetRef={sheetRef}
          handleCloseExpanded={handleCloseExpanded}
          handleSheetTouchStart={handleSheetTouchStart}
          handleSheetTouchMove={handleSheetTouchMove}
          handleSheetTouchEnd={handleSheetTouchEnd}
        />
      )}

      <AnimationStyles getHeadingGradient={getHeadingGradient} />
    </div>
  );
}
