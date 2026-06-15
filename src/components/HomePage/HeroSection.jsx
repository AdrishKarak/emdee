"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";

export function HeroSection({
  videoTransform,
  easedHeroProgress,
  companyNameTransform,
  scrollIndicatorOpacity,
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Safe fallbacks so NaN never reaches CSS
  const safeVideoTransform = isNaN(videoTransform) ? 0 : videoTransform;
  const safeEasedProgress = isNaN(easedHeroProgress) ? 0 : easedHeroProgress;
  const safeNameTransform = isNaN(companyNameTransform)
    ? 0
    : companyNameTransform;
  const safeScrollOpacity = isNaN(scrollIndicatorOpacity)
    ? 1
    : scrollIndicatorOpacity;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image (Parallax and brightness scroll effect) */}
      <div
        suppressHydrationWarning
        className="fixed inset-0 w-full h-full z-0 transition-transform duration-75 ease-out"
        style={{
          transform: `translateY(${safeVideoTransform}%)`,
          filter: `brightness(${1 - safeEasedProgress * 0.35})`,
        }}
      >
        <img
          src="/v882-kul-55.jpg"
          alt="Digital Grid Technology Network"
          className="w-full h-full object-cover"
          style={{ pointerEvents: "none" }}
        />
        {/* Subtle dark tint to help text readability */}
        <div className="absolute inset-0 bg-[#030816]/35" />
      </div>

      {/* Hero Section Overlay */}
      <section className="relative h-screen w-full z-10">
        {/* Deep space background gradient to blend into the next section */}
        <div
          suppressHydrationWarning
          className="absolute inset-0 bg-gradient-to-b from-[#020610]/70 via-[#030816]/40 to-[#0A0A0A] transition-opacity duration-75 ease-out"
          style={{
            opacity: 1 - safeEasedProgress * 0.4,
          }}
        />

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-6 text-center z-20">
          <div className="flex-1" />

          {/* Main Content Box with parallax exit transform */}
          <div
            suppressHydrationWarning
            className="flex flex-col items-center max-w-5xl transition-all duration-75 ease-out"
            style={{
              transform: `translateY(calc(${safeNameTransform}% - 10px))`,
              opacity: 1 - safeEasedProgress,
            }}
          >
            {/* Brand Logo Text - Step 1 */}
            <span
              className="text-white/40 uppercase tracking-[0.35em] text-[10px] md:text-xs font-semibold mb-4 transition-all duration-1000 ease-out"
              style={{
                opacity: isMounted ? 1 : 0,
                transform: isMounted ? "translateY(0)" : "translateY(15px)",
                transitionDelay: "200ms",
              }}
            >
              EMDEE DIGITRONICS
            </span>

            {/* 20+ Years Badge - Step 2 */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B35]/15 border border-[#FF6B35]/30 mb-6 transition-all duration-1000 ease-out"
              style={{
                opacity: isMounted ? 1 : 0,
                transform: isMounted ? "translateY(0)" : "translateY(15px)",
                transitionDelay: "400ms",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.18em] text-[#FFA07A] uppercase">
                20+ Years of Operational Trust
              </span>
            </div>

            {/* Main Headline - Step 3 (E-Governance wrapped in whitespace-nowrap) */}
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-qanelas-soft font-bold tracking-tight text-white mb-6 leading-[1.15] max-w-4xl transition-all duration-1000 ease-out"
              style={{
                opacity: isMounted ? 1 : 0,
                transform: isMounted ? "translateY(0)" : "translateY(15px)",
                transitionDelay: "600ms",
              }}
            >
              Pioneering{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #FF6B35 0%, #FFA07A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                IT Infrastructure
              </span>{" "}
              & <span className="whitespace-nowrap">E-Governance</span> at Scale
            </h1>

            {/* Description - Step 4 */}
            <p
              className="text-sm md:text-base lg:text-lg text-white/75 max-w-2xl leading-relaxed mb-8 font-medium transition-all duration-1000 ease-out"
              style={{
                opacity: isMounted ? 1 : 0,
                transform: isMounted ? "translateY(0)" : "translateY(15px)",
                transitionDelay: "800ms",
              }}
            >
              We supply, install, and manage critical digital assets and facilities. Trusted partner for B2G enterprise networking, systems integration, and professional IT staffing.
            </p>

            {/* Call To Action Buttons - Step 5 */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 ease-out"
              style={{
                opacity: isMounted ? 1 : 0,
                transform: isMounted ? "translateY(0)" : "translateY(15px)",
                transitionDelay: "1000ms",
              }}
            >
              <button
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
                className="px-6 py-3.5 rounded-xl bg-[#FF6B35] text-white font-semibold text-xs md:text-sm hover:bg-[#ff7e4d] transition-all duration-300 shadow-lg shadow-[#FF6B35]/25 hover:shadow-[#FF6B35]/40 active:scale-95 flex items-center gap-2 group cursor-pointer"
              >
                Explore Services
                <span className="transform group-hover:translate-y-0.5 transition-transform">↓</span>
              </button>
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-xs md:text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 active:scale-95 text-center min-w-[150px]"
              >
                Partner With Us
              </Link>
            </div>
          </div>

          <div className="flex-1" />

          {/* Scroll Indicator */}
          <div
            suppressHydrationWarning
            className="animate-scroll-hint transition-opacity duration-300"
            style={{
              transform: "translateY(-20px)",
              opacity: isMounted ? safeScrollOpacity : 0,
              transitionDelay: isMounted ? "0ms" : "1200ms",
            }}
          >
            <ChevronDown
              size={28}
              className="text-white/40"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
