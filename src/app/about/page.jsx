import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { MobileTitle } from "@/components/AboutPage/MobileTitle";
import { HeroSection } from "@/components/AboutPage/HeroSection";
import { AboutContentSection } from "@/components/AboutPage/AboutContentSection";
import { TeamSection } from "@/components/AboutPage/TeamSection";
import { TimelineSection } from "@/components/AboutPage/TimelineSection";
import { CertificationsSection } from "@/components/AboutPage/CertificationsSection";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { useAboutPageCarousel } from "@/hooks/useAboutPageCarousel";
import { motion } from "framer-motion";

export function meta() {
  return [
    { title: "About Us - Our Story & Vision | Emdee Techno Services" },
    { name: "description", content: "Learn about Emdee Techno Services journey, our vision, mission, and the expert team delivering innovative IT solutions and services since our inception." },
    { property: "og:title", content: "About Us - Our Story & Vision | Emdee Techno Services" },
    { property: "og:description", content: "Learn about Emdee Techno Services journey, our vision, mission, and the expert team delivering innovative IT solutions and services." },
    { property: "og:url", content: "https://emdee.in/about" }
  ];
}

export default function AboutPage() {
  const [isDesktop, setIsDesktop] = useState(false);

  const readingProgressHook = useReadingProgress();
  const carouselHook = useAboutPageCarousel(isDesktop);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const paragraphVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.98,
      filter: "blur(6px)",
      transition: {
        duration: 0.6,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-white font-qanelas-soft relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#0B3D91]/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FF6B35]/5 blur-[120px] pointer-events-none z-0" />

      <div className="fixed top-0 left-0 right-0 z-[100] relative z-50">
        <Navbar variant="glass" />
      </div>

      <div className="pt-20 relative z-10">
        <MobileTitle />
        <HeroSection />
        <AboutContentSection
          isDesktop={isDesktop}
          paragraphVariants={paragraphVariants}
          readingProgressHook={readingProgressHook}
          carouselHook={carouselHook}
        />
        <TeamSection />
        <TimelineSection />
        <CertificationsSection />
      </div>
    </div>
  );
}
