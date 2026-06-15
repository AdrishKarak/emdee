import { motion } from "motion/react";
import { Trophy, Zap } from "lucide-react";

export function DesktopCarousel({
  stories,
  carouselRef,
  carouselY,
  carouselOpacity,
  carouselScale,
  getCardPosition,
  handleReadMore,
  handlePrev,
  handleNext,
  isTransitioning,
  activeIndex,
  exitProgress,
}) {
  return (
    <motion.div
      ref={carouselRef}
      className="relative h-[600px] lg:h-[700px]"
      style={{
        translateY: carouselY,
        opacity: carouselOpacity,
        scale: carouselScale,
      }}
    >
      {/* Cards */}
      <div className="absolute inset-0 flex items-center justify-center">
        {stories.map((story, index) => {
          const position = getCardPosition(index);
          const isFocused = position === "center";
          const isVisible = position !== "hidden";

            return (
              <div
                key={story.id}
                className="absolute transition-all duration-[600ms] ease-out"
                style={{
                  transform:
                    position === "center"
                      ? "translateX(0) scale(1)"
                      : position === "left"
                        ? "translateX(-120%) scale(0.75)"
                        : position === "right"
                          ? "translateX(120%) scale(0.75)"
                          : "translateX(0) scale(0.5)",
                  opacity: isVisible ? (isFocused ? 1 : 0.4) : 0,
                  filter: isFocused ? "blur(0px)" : "blur(4px)",
                  zIndex: isFocused ? 20 : 10,
                  pointerEvents: isFocused ? "auto" : "none",
                }}
              >
                <div
                  className={`relative rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-[600ms] ${
                    isFocused ? "hover-lift bg-white/[0.03]" : "bg-white/[0.01]"
                  }`}
                  style={{
                    width: isFocused ? "429px" : "380px",
                    height: isFocused ? "680px" : "520px",
                    border: isFocused
                      ? "1px solid rgba(255, 107, 53, 0.35)"
                      : "1px solid rgba(255, 255, 255, 0.05)",
                    boxShadow: isFocused
                      ? "0 30px 60px rgba(0, 0, 0, 0.6), 0 0 50px rgba(11, 61, 145, 0.15), 0 0 20px rgba(255, 107, 53, 0.1)"
                      : "0 20px 40px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  {/* Glowing active border overlay */}
                  {isFocused && (
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        padding: "1px",
                        background: "linear-gradient(135deg, rgba(11, 61, 145, 0.5) 0%, rgba(255, 107, 53, 0.3) 100%)",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        zIndex: 30,
                      }}
                    />
                  )}

                  {/* Image Container with bottom-fade overlay */}
                  <div
                    className="relative overflow-hidden w-full"
                    style={{
                      height:
                        story.id === 6
                          ? isFocused
                            ? "279px"
                            : "248px"
                          : isFocused
                            ? "271px"
                            : "240px",
                      transform: story.id === 6 ? "translateY(-8px)" : "none",
                    }}
                  >
                    <img
                      src={story.desktopImage || story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      style={{
                        objectPosition: story.id === 6 ? "center 40%" : "center",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      padding: isFocused ? "27.36px" : "32px",
                      paddingTop:
                        story.id === 6
                          ? isFocused
                            ? "19.36px"
                            : "24px"
                          : isFocused
                            ? "27.36px"
                            : "32px",
                      paddingBottom: isFocused ? "55px" : "32px",
                    }}
                  >
                    <h3
                      className="font-qanelas-soft font-bold text-white mb-4"
                      style={{ fontSize: isFocused ? "20.52px" : "24px" }}
                    >
                      {story.title}
                    </h3>
                    <p
                      className="font-qanelas-soft text-gray-400 mb-6 leading-relaxed"
                      style={{ fontSize: isFocused ? "14.96px" : "17.5px" }}
                      dangerouslySetInnerHTML={{
                        __html: story.desktopSummary || story.summary,
                      }}
                    />
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleReadMore(story.id)}
                        className="border border-white/20 text-white bg-white/5 font-qanelas-soft font-semibold text-sm rounded-lg hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] hover:shadow-[0_4px_20px_rgba(255,107,53,0.25)] transition-all duration-300"
                        style={{
                          paddingLeft: isFocused ? "20.52px" : "24px",
                          paddingRight: isFocused ? "20.52px" : "24px",
                          paddingTop: isFocused ? "8.55px" : "10px",
                          paddingBottom: isFocused ? "8.55px" : "10px",
                        }}
                      >
                        Read More
                      </button>

                      {/* Status Indicator */}
                      <div
                        className="flex items-center gap-1.5"
                        style={{
                          transform: "translateX(-11px)",
                          opacity: story.status === "active" ? 0.7 : 0.85,
                        }}
                      >
                        {story.status === "active" ? (
                          <Zap
                            size={11}
                            className="text-green-400 fill-green-400"
                          />
                        ) : (
                          <Trophy size={11} className="text-[#C9A961]" />
                        )}
                        <span
                          className="font-qanelas-soft capitalize"
                          style={{
                            fontSize: "11px",
                            letterSpacing: "0.02em",
                            color:
                              story.status === "active" ? "#4ade80" : "#C9A961",
                          }}
                        >
                          {story.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          disabled={isTransitioning || activeIndex === 0}
          className="group absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/[0.08] hover:border-white/25 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF6B35]/10 to-[#0B3D91]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className="group absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/[0.08] hover:border-white/25 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0B3D91]/10 to-[#FF6B35]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </motion.div>
  );
}
