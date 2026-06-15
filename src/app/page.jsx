import Navbar from "@/components/Navbar";

export function meta() {
  return [
    { title: "Emdee Techno Services - IT Solutions & Services" },
    { name: "description", content: "Leading provider of IT infrastructure, software development, manpower solutions, security services, and comprehensive facility management." }
  ];
}
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";
import { useSloganAnimation } from "@/hooks/useSloganAnimation";
import { useTileAnimation } from "@/hooks/useTileAnimation";
import { HeroSection } from "@/components/HomePage/HeroSection";
import { SloganSection } from "@/components/HomePage/SloganSection";
import { ServicesSection } from "@/components/HomePage/ServicesSection";
import { ImpactSection } from "@/components/HomePage/ImpactSection";
import { PlaceholderSection } from "@/components/HomePage/PlaceholderSection";
import { NewSuccessStoriesSection } from "@/components/HomePage/NewSuccessStoriesSection";
import { AboutUsSection } from "@/components/HomePage/AboutUsSection";
import { OurImpactSection } from "@/components/HomePage/OurImpactSection";
import { AnimationStyles } from "@/components/HomePage/AnimationStyles";

export default function HomePage() {
  const { scrollY, isMobile } = useScrollAnimation();
  const [isPictureHovered, setIsPictureHovered] = useState(false);

  const {
    heroHeight,
    videoTransform,
    companyNameTransform,
    scrollIndicatorOpacity,
    easedHeroProgress,
  } = useHeroAnimation(scrollY);

  const {
    sloganScrollRange,
    sloganY,
    sloganScale,
    sloganBgOpacity,
    sloganBlur,
  } = useSloganAnimation(scrollY, heroHeight);

  const {
    activeMobileTile,
    isTileSectionReady,
    tileAnimationState,
    tileStates,
    tileSectionRef,
    tileRefs,
    handleMobileTileTap,
    isScrolling,
  } = useTileAnimation(isMobile);

  return (
    <div
      className="min-h-screen bg-[#0A0A0A] font-qanelas-soft"
      style={{ overflowX: "hidden", width: "100%" }}
    >
      {/* Navbar - True Global Fixed Component */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <Navbar variant="glass" />
      </div>

      {/* Hero Section */}
      <HeroSection
        videoTransform={videoTransform}
        easedHeroProgress={easedHeroProgress}
        companyNameTransform={companyNameTransform}
        scrollIndicatorOpacity={scrollIndicatorOpacity}
      />

      {/* Slogan Section */}
      <SloganSection
        scrollY={scrollY}
        sloganScrollRange={sloganScrollRange}
        sloganY={sloganY}
        sloganScale={sloganScale}
        sloganBgOpacity={sloganBgOpacity}
        sloganBlur={sloganBlur}
        isPictureHovered={isPictureHovered}
      />

      {/* Services Section */}
      <ServicesSection
        scrollY={scrollY}
        sloganScrollRange={sloganScrollRange}
        tileSectionRef={tileSectionRef}
        tileRefs={tileRefs}
        activeMobileTile={activeMobileTile}
        isTileSectionReady={isTileSectionReady}
        tileAnimationState={tileAnimationState}
        tileStates={tileStates}
        isMobile={isMobile}
        handleMobileTileTap={handleMobileTileTap}
        isScrolling={isScrolling}
      />

      {/* Impact Section */}
      <ImpactSection />

      {/* Placeholder Section - OEM Partners */}
      <PlaceholderSection />

      {/* Success Stories Section */}
      <NewSuccessStoriesSection />

      {/* About Us Section */}
      <AboutUsSection onHoverChange={setIsPictureHovered} />


      {/* Our Impact Section */}
      <OurImpactSection />

      {/* Animation Styles */}
      <AnimationStyles />

      {/* Structured Data / JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Emdee Techno Services",
            "url": "https://emdee.in",
            "logo": "https://ucarecdn.com/f74e0ffb-9698-44b5-bc68-9083a8fd14c5/-/format/auto/",
            "description": "Leading provider of IT infrastructure, software development, manpower solutions, security services, and comprehensive facility management.",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-33-4069-2109",
              "contactType": "customer service",
              "email": "admin@emdee.in",
              "areaServed": "IN",
              "availableLanguage": "en"
            },
            "sameAs": [
              "https://www.linkedin.com/company/emdee-digitronics/",
              "https://www.facebook.com/edpl123/"
            ]
          })
        }}
      />
    </div>
  );
}
