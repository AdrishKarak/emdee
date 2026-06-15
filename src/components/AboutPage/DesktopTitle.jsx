import { useRef } from "react";
import { motion, useInView } from "motion/react";

export function DesktopTitle({ isDesktop, paragraphVariants }) {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: false, margin: "-100px" });

  return (
    <motion.h2
      ref={titleRef}
      className="hidden md:block text-center mb-12 lg:mb-16"
      style={{
        fontSize: "clamp(2.25rem, 5vw, 3.1875rem)",
        fontFamily: "Qanelas Soft, sans-serif",
        fontWeight: "bold",
      }}
      variants={isDesktop ? paragraphVariants : {}}
      initial={isDesktop ? "hidden" : {}}
      animate={isDesktop ? (isTitleInView ? "visible" : "hidden") : {}}
    >
      <span
        style={{
          background:
            "linear-gradient(180deg, #FF6B35 0%, #FF6B35 55%, #000000 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        About Us
      </span>
    </motion.h2>
  );
}
