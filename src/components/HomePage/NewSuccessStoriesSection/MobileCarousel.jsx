import { Trophy, Zap } from "lucide-react";

export function MobileCarousel({
  stories,
  mobileScrollRef,
  handleReadMore,
  handlePrev,
  handleNext,
  exitProgress,
}) {
  return (
    <div className="relative -mx-6">
      {/* Horizontally scrollable container */}
      <div
        ref={mobileScrollRef}
        className="flex overflow-x-auto scrollbar-hide"
        style={{
          scrollSnapType: "x proximity",
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
          paddingLeft: "6vw",
          paddingRight: "6vw",
          paddingBottom: "20px",
        }}
      >
        {stories.map((story, index) => {
          // Check if this is the last card to render peek differently
          const isLastCard = index === stories.length - 1;

          return (
            <div
              key={story.id}
              className="flex-shrink-0 pr-3"
              style={{
                width: "calc(85vw + 12px)",
                scrollSnapAlign: "start",
              }}
            >
              {/* Card container with peek overlay */}
              <div className="relative" style={{ width: "85vw" }}>
                {/* Main card */}
                <div
                  className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl relative z-10"
                  style={{
                    height: "560px",
                  }}
                >
                  {/* Image Container with bottom-fade overlay */}
                  <div
                    className="relative overflow-hidden w-full"
                    style={{
                      height: story.id === 6 ? "223px" : "215px",
                      transform: story.id === 6 ? "translateY(-8px)" : "none",
                    }}
                  >
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: story.id === 6 ? "center 40%" : "center",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div
                    className="flex flex-col flex-1"
                    style={{
                      height:
                        story.id === 6
                          ? "calc(560px - 223px)"
                          : "calc(560px - 215px)",
                      padding: "24px",
                      paddingTop: story.id === 6 ? "16px" : "24px",
                    }}
                  >
                    <h3 className="text-base font-qanelas-soft font-bold text-white mb-3">
                      {story.title}
                    </h3>
                    <p
                      className="text-sm font-qanelas-soft text-gray-400 mb-5 leading-relaxed overflow-y-auto"
                      dangerouslySetInnerHTML={{
                        __html: story.mobileSummary || story.summary,
                      }}
                    />
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <button
                        onClick={() => handleReadMore(story.id)}
                        className="px-5 py-2 border border-white/20 text-white bg-white/5 font-qanelas-soft font-semibold text-sm rounded-lg hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] transition-all duration-300 animate-none"
                      >
                        Read More
                      </button>

                      {/* Status Indicator */}
                      <div
                        className="flex items-center gap-1.5"
                        style={{
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

                {/* Peek preview of next card - positioned absolutely */}
                {!isLastCard && (
                  <div
                    className="absolute top-0 pointer-events-none"
                    style={{
                      right: "-12vw",
                      width: "85vw",
                      height: "560px",
                      filter: "blur(3px)",
                      opacity: 0.35,
                      zIndex: 5,
                    }}
                  >
                    <div
                      className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl h-full"
                    >
                      <div className="w-full h-[215px] bg-gradient-to-br from-[#0B3D91]/10 to-[#FF6B35]/5" />
                      <div className="p-6">
                        <div className="h-6 bg-white/5 rounded mb-3" />
                        <div className="h-12 bg-white/5 rounded mb-5" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tiny subtle chevrons - secondary affordance */}
      <button
        onClick={handlePrev}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
