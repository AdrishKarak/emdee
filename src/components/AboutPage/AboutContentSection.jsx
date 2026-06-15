import { useEffect } from "react";
import { DesktopTitle } from "./DesktopTitle";
import { ReadingProgressIndicator } from "./ReadingProgressIndicator";
import { AboutParagraphs } from "./AboutParagraphs";
import { PhotoCarousel } from "./PhotoCarousel";

export function AboutContentSection({
  isDesktop,
  paragraphVariants,
  readingProgressHook,
  carouselHook,
}) {
  const {
    para1Ref,
    para2Ref,
    para3Ref,
    para4Ref,
    paragraphsContainerRef,
    readingProgress,
    indicatorVisible,
    setIndicatorVisible,
    isPara1InView,
    isPara2InView,
    isPara3InView,
    isPara4InView,
    isPara1Exiting,
    isPara2Exiting,
    isPara3Exiting,
    isPara4Exiting,
    isContainerInView,
  } = readingProgressHook;

  const {
    carouselRef,
    currentImageIndex,
    carouselImages,
    isCarouselInView,
    getCarouselAnimationStyle,
  } = carouselHook;

  useEffect(() => {
    setIndicatorVisible(isContainerInView && !isCarouselInView);
  }, [isContainerInView, isCarouselInView, setIndicatorVisible]);

  return (
    <div className="relative z-10 bg-transparent pt-0 md:py-20 lg:py-32">
      <div className="max-w-7xl mx-auto pl-6 pr-3 md:px-6 lg:px-12">
        <DesktopTitle
          isDesktop={isDesktop}
          paragraphVariants={paragraphVariants}
        />

        <div className="relative">
          <ReadingProgressIndicator
            readingProgress={readingProgress}
            indicatorVisible={indicatorVisible}
            isMobile={false}
          />

          <ReadingProgressIndicator
            readingProgress={readingProgress}
            indicatorVisible={indicatorVisible}
            isMobile={true}
          />

          <div className="space-y-8 mx-auto" ref={paragraphsContainerRef}>
            <AboutParagraphs
              para1Ref={para1Ref}
              para2Ref={para2Ref}
              para3Ref={para3Ref}
              para4Ref={para4Ref}
              isPara1InView={isPara1InView}
              isPara2InView={isPara2InView}
              isPara3InView={isPara3InView}
              isPara4InView={isPara4InView}
              isPara1Exiting={isPara1Exiting}
              isPara2Exiting={isPara2Exiting}
              isPara3Exiting={isPara3Exiting}
              isPara4Exiting={isPara4Exiting}
              isDesktop={isDesktop}
              paragraphVariants={paragraphVariants}
            />
          </div>

          <PhotoCarousel
            carouselRef={carouselRef}
            carouselImages={carouselImages}
            currentImageIndex={currentImageIndex}
            getCarouselAnimationStyle={getCarouselAnimationStyle}
          />
        </div>
      </div>
    </div>
  );
}
