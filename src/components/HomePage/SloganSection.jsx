"use client";

import { useState, useEffect } from "react";

export function SloganSection({
  scrollY,
  sloganScrollRange,
  sloganY,
  sloganScale,
  sloganBgOpacity,
  sloganBlur,
  isPictureHovered = false,
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isFixed = scrollY < sloganScrollRange;

  return (
    <div
      className={`${isFixed && isMounted ? "fixed" : "relative"} left-0 right-0 z-40 py-10 will-change-transform`}
      style={
        isFixed && isMounted
          ? {
              top: `${sloganY}px`,
              transform: `scale(${sloganScale})`,
              transformOrigin: "center center",
              backgroundColor: `rgba(10, 10, 10, ${sloganBgOpacity})`,
              backdropFilter:
                sloganBlur > 0.5 ? `blur(${sloganBlur}px)` : "none",
              WebkitBackdropFilter:
                sloganBlur > 0.5 ? `blur(${sloganBlur}px)` : "none",
            }
          : {
              transform: `scale(1.12)`,
              transformOrigin: "center center",
              backgroundColor: `rgba(10, 10, 10, 0.92)`,
              backdropFilter: `blur(12px)`,
              WebkitBackdropFilter: `blur(12px)`,
            }
      }
    >
      <div className="flex items-center justify-center px-6">
        <p
          className="font-normal tracking-[0.06em] leading-relaxed text-center max-w-[48rem] lg:max-w-[50rem]"
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1.25rem)",
            textShadow: "0 2px 20px rgba(0,0,0,0.6)",
            color: "rgba(255, 255, 255, 0.9)",
          }}
        >
          Powering Digital India – through Platforms, Products and People.
        </p>
      </div>
    </div>
  );
}
