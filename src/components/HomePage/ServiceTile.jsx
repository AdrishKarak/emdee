import { Link } from "react-router";

export function ServiceTile({
  tile,
  index,
  isActiveMobile,
  enableHover,
  animationStyle,
  onTileTap,
  onMouseMove,
  onMouseLeave,
  isScrolling,
}) {
  return (
    <div
      onClick={() => {
        // Only allow tap on mobile
        if (typeof window !== "undefined" && window.innerWidth < 1024) {
          onTileTap(tile.id);
        }
      }}
      className={`group relative bg-black rounded-2xl min-h-[500px] lg:min-h-[clamp(480px,55vh,700px)] flex flex-col overflow-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActiveMobile ? "mobile-active" : ""} cursor-pointer lg:cursor-default select-none`}
      style={{
        ...animationStyle,
        boxShadow:
          "0 12px 40px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(255, 107, 53, 0.15)",
        transformStyle: "preserve-3d",
        pointerEvents:
          isScrolling &&
          typeof window !== "undefined" &&
          window.innerWidth >= 1024
            ? "none"
            : "auto",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Gradient Border - Rest State */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${enableHover && !isScrolling ? "lg:group-hover:opacity-0" : ""} ${isActiveMobile ? "opacity-0" : ""}`}
        style={{
          background:
            animationStyle.borderGradient ||
            "linear-gradient(135deg, #FF6B35 0%, #FF8F5A 25%, #FFB380 50%, #FF8F5A 75%, #FF6B35 100%)",
          padding: "1.5px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Gradient Border - Hover/Active State (Neon Blue + Navy Blue) */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${enableHover && !isScrolling ? "lg:group-hover:opacity-100" : ""} ${isActiveMobile ? "opacity-100" : ""}`}
        style={{
          background:
            "linear-gradient(135deg, #00D9FF 0%, #FF6B35 20%, #0099FF 40%, #0B3D91 50%, #00D9FF 60%, #FF6B35 80%, #00D9FF 100%)",
          padding: "2px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          filter: "brightness(1.4) saturate(1.3)",
          boxShadow:
            "0 0 20px rgba(0, 217, 255, 0.6), 0 0 40px rgba(11, 61, 145, 0.4), inset 0 0 20px rgba(0, 153, 255, 0.3)",
        }}
      />

      {/* Enhanced hover shadow layer */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${enableHover && !isScrolling ? "lg:group-hover:opacity-100" : ""} ${isActiveMobile ? "opacity-100" : ""}`}
        style={{
          boxShadow:
            "0 28px 80px rgba(255, 107, 53, 0.35), 0 12px 40px rgba(0, 0, 0, 0.9)",
        }}
      />

      {/* Graphic / Text Container */}
      <div className="flex-1 relative flex items-center justify-center px-8 lg:px-10 py-6 overflow-hidden">
        {/* Graphic */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActiveMobile ? "opacity-0" : `opacity-100 ${enableHover && !isScrolling ? "lg:group-hover:opacity-0" : ""}`}`}
        >
          <img
            src={tile.graphic}
            alt={tile.title}
            className={`w-auto h-[clamp(240px,35vh,340px)] object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${enableHover && !isScrolling ? "lg:group-hover:scale-95" : ""}`}
            style={{
              ...(tile.id === 2 ? { mixBlendMode: "screen" } : {}),
              ...(tile.id === 3 ? { transform: "translateX(4.5%)" } : {}),
            }}
          />
        </div>

        {/* Hover Text - Now with overflow handling */}
        <div
          className={`absolute inset-0 flex flex-col items-start justify-center transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] px-6 lg:px-12 py-6 overflow-y-auto scrollbar-hide ${isActiveMobile ? "opacity-100" : `opacity-0 ${enableHover && !isScrolling ? "lg:group-hover:opacity-100" : ""}`}`}
        >
          <div className="w-full lg:max-w-xl my-auto flex flex-col gap-4">
            <p
              className={`${tile.id === 2 ? "text-[13px] lg:text-[14.5px]" : tile.id === 3 ? "text-[12.5px] lg:text-[14px]" : "text-[13px] lg:text-[15px]"} text-white/95 leading-[1.65] text-left whitespace-pre-line font-normal tracking-wide`}
            >
              {tile.text}
            </p>
            <div className="flex flex-col gap-2.5 w-full">
              {tile.id === 1 && (
                <>
                  <Link to="/it-infra" className="inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/10 hover:bg-[#FF6B35] border border-white/10 text-white text-xs lg:text-sm font-semibold transition-all duration-300">
                    <span>Explore IT Infrastructure</span>
                    <span>→</span>
                  </Link>
                  <Link to="/amc" className="inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/10 hover:bg-[#FF6B35] border border-white/10 text-white text-xs lg:text-sm font-semibold transition-all duration-300">
                    <span>Explore IT Maintenance (AMC)</span>
                    <span>→</span>
                  </Link>
                </>
              )}
              {tile.id === 2 && (
                <>
                  <Link to="/software" className="inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/10 hover:bg-[#FF6B35] border border-white/10 text-white text-xs lg:text-sm font-semibold transition-all duration-300">
                    <span>Explore Software Development</span>
                    <span>→</span>
                  </Link>
                  <Link to="/ites" className="inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/10 hover:bg-[#FF6B35] border border-white/10 text-white text-xs lg:text-sm font-semibold transition-all duration-300">
                    <span>Explore IT Enabled Services</span>
                    <span>→</span>
                  </Link>
                </>
              )}
              {tile.id === 3 && (
                <>
                  <Link to="/manpower" className="inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/10 hover:bg-[#0B3D91] border border-white/10 text-white text-xs lg:text-sm font-semibold transition-all duration-300">
                    <span>Explore IT Staffing & Manpower</span>
                    <span>→</span>
                  </Link>
                  <Link to="/security" className="inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/10 hover:bg-[#0B3D91] border border-white/10 text-white text-xs lg:text-sm font-semibold transition-all duration-300">
                    <span>Explore Security & Surveillance</span>
                    <span>→</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Affordance Cue - Only visible on mobile when NOT active */}
        <div
          className={`lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 opacity-100 transition-opacity duration-500 pointer-events-none ${isActiveMobile ? "opacity-0" : ""}`}
        >
          <div className="flex items-center justify-center px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <span className="text-[11px] font-medium text-white/50 tracking-wide">
              Tap to read more
            </span>
          </div>
        </div>
      </div>

      {/* Title - Blurs on hover/active */}
      <div className="px-12 lg:px-16 pb-8 pt-2">
        <h2
          className={`${tile.id === 2 ? "text-xl lg:text-[27px]" : "text-xl lg:text-[27px]"} font-bold text-center lg:text-left leading-[1.2] tracking-tight bg-gradient-to-br from-white via-[#E0E0E0] to-[#A0A0A0] bg-clip-text text-transparent transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${enableHover && !isScrolling ? "lg:group-hover:blur-[1.2px] lg:group-hover:opacity-60" : ""} ${isActiveMobile ? "blur-[1.2px] opacity-60" : ""}`}
          style={{
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          {tile.title}
        </h2>
      </div>
    </div>
  );
}
