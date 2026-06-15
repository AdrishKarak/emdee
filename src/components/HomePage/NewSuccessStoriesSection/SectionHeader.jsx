export function SectionHeader({
  isMobile,
  mobileHeadingRef,
  getHeadingGradient,
  exitProgress,
}) {
  if (isMobile) {
    return (
      <div
        ref={mobileHeadingRef}
        className="flex lg:hidden flex-col items-center gap-4 max-w-4xl mx-auto"
        style={{ marginBottom: "38px" }}
      >
        {/* Subtitle Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
          <span className="text-[10px] font-semibold tracking-[0.2em] text-white/70 uppercase">
            OUR PORTFOLIO
          </span>
        </div>

        {/* Primary Label */}
        <h2
          className="font-qanelas-soft font-bold uppercase tracking-[0.15em] success-heading-gradient-text text-center"
          style={{
            fontSize: "1.5rem",
            letterSpacing: "0.15em",
          }}
        >
          Our Success Stories
        </h2>

        {/* Separator */}
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "rgba(255, 255, 255, 0.15)",
          }}
        />

        {/* Descriptive Line */}
        <p
          className="font-qanelas-soft italic text-center text-sm md:text-base leading-relaxed"
          style={{
            background: "linear-gradient(135deg, #FFFFFF 0%, #9CA3AF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          A curated set of flagship, legacy and active projects, drawn from our
          multi-sector delivery portfolio of hundreds
        </p>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center gap-8 mb-16 max-w-7xl mx-auto">
      {/* Primary Label with Subtitle */}
      <div className="flex-shrink-0 flex flex-col gap-2" style={{ minWidth: "320px" }}>
        <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
          <span className="text-[10px] font-semibold tracking-[0.2em] text-white/70 uppercase">
            OUR PORTFOLIO
          </span>
        </div>
        <h2
          className="font-qanelas-soft font-bold uppercase tracking-[0.15em] success-heading-gradient-text"
          style={{
            fontSize: "2.25rem",
            letterSpacing: "0.15em",
            lineHeight: "1.2",
          }}
        >
          Our Success Stories
        </h2>
      </div>

      {/* Separator */}
      <div
        className="flex-shrink-0"
        style={{
          width: "1px",
          height: "3.5em",
          background: "rgba(255, 255, 255, 0.15)",
        }}
      />

      {/* Descriptive Line */}
      <p
        className="font-qanelas-soft italic flex-1"
        style={{
          fontSize: "1.35rem",
          lineHeight: "1.6",
          background: "linear-gradient(135deg, #FFFFFF 0%, #9CA3AF 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          maxWidth: "800px",
        }}
      >
        A curated set of flagship, legacy and active projects, drawn from our
        multi-sector delivery portfolio of hundreds
      </p>
    </div>
  );
}
