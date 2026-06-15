import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { timelineEntries } from "./timelineData";
import { ReadingProgressIndicator } from "./ReadingProgressIndicator";
import { useTimelineProgress } from "@/hooks/useTimelineProgress";

// Helper function to parse **bold** markdown syntax
function parseBoldText(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldText = part.slice(2, -2);
      return (
        <span
          key={index}
          style={{ fontWeight: "bold", color: "rgba(255, 255, 255, 0.95)" }}
        >
          {boldText}
        </span>
      );
    }
    return part;
  });
}

export function TimelineSection() {
  const timelineRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const todayRef = useRef(null);

  const {
    entryRefs,
    timelineContainerRef,
    timelineProgress,
    indicatorVisible,
  } = useTimelineProgress();

  // Track which entries are expanded (for mobile)
  const [expandedEntries, setExpandedEntries] = useState({});

  // Animation states for heading and subheading
  const [headingProgress, setHeadingProgress] = useState(0);
  const [subheadingProgress, setSubheadingProgress] = useState(0);

  // Animation states for each timeline entry
  const [entryAnimationProgress, setEntryAnimationProgress] = useState(
    timelineEntries.map(() => 0),
  );

  // Animation state for "Today" section
  const [todayAnimationProgress, setTodayAnimationProgress] = useState(0);

  // Entry animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!headingRef.current || !subheadingRef.current) return;

      const headingRect = headingRef.current.getBoundingClientRect();
      const subheadingRect = subheadingRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.8;

      // Animate heading
      if (headingRect.top < triggerPoint && headingRect.top > 0) {
        const progress = Math.min(
          1,
          (triggerPoint - headingRect.top) / (triggerPoint * 0.3),
        );
        setHeadingProgress(progress);
      } else if (headingRect.top <= 0) {
        setHeadingProgress(1);
      }

      // Animate subheading (with slight delay)
      if (subheadingRect.top < triggerPoint && subheadingRect.top > 0) {
        const progress = Math.min(
          1,
          Math.max(
            0,
            (triggerPoint - subheadingRect.top) / (triggerPoint * 0.3) - 0.2,
          ),
        );
        setSubheadingProgress(progress);
      } else if (subheadingRect.top <= 0) {
        setSubheadingProgress(1);
      }

      // Animate each timeline entry — only update state if values actually changed
      setEntryAnimationProgress((prev) => {
        let changed = false;
        const newProgress = prev.map((prevVal, index) => {
          const ref = entryRefs[index];
          if (!ref || !ref.current) return prevVal;

          const rect = ref.current.getBoundingClientRect();
          let nextVal = prevVal;

          if (rect.top < triggerPoint && rect.top > 0) {
            nextVal = Math.min(
              1,
              (triggerPoint - rect.top) / (triggerPoint * 0.3),
            );
          } else if (rect.top <= 0) {
            nextVal = 1;
          }

          if (nextVal !== prevVal) changed = true;
          return nextVal;
        });

        return changed ? newProgress : prev;
      });

      // Animate "Today" section
      if (todayRef.current) {
        const todayRect = todayRef.current.getBoundingClientRect();

        if (todayRect.top < triggerPoint && todayRect.top > 0) {
          const progress = Math.min(
            1,
            (triggerPoint - todayRect.top) / (triggerPoint * 0.3),
          );
          setTodayAnimationProgress(progress);
        } else if (todayRect.top <= 0) {
          setTodayAnimationProgress(1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [entryRefs]);

  const toggleExpanded = (index) => {
    setExpandedEntries((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Animation styles
  const getHeadingStyle = () => ({
    transform: `translateY(${40 * (1 - headingProgress)}px)`,
    opacity: headingProgress,
    transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
  });

  const getSubheadingStyle = () => ({
    transform: `translateY(${40 * (1 - subheadingProgress)}px)`,
    opacity: subheadingProgress,
    transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
  });

  const getEntryStyle = (index) => {
    const progress = entryAnimationProgress[index];
    return {
      transform: `translateY(${40 * (1 - progress)}px)`,
      opacity: progress,
      transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
    };
  };

  // Animation style for "Today" title
  const getTodayTitleStyle = () => {
    const progress = todayAnimationProgress;
    return {
      transform: `translateY(${40 * (1 - progress)}px)`,
      opacity: progress,
      transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
    };
  };

  // Animation style for "Today" content (with delay)
  const getTodayContentStyle = () => {
    const progress = Math.min(1, Math.max(0, todayAnimationProgress - 0.2));
    return {
      transform: `translateY(${40 * (1 - progress)}px)`,
      opacity: progress,
      transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
    };
  };

  return (
    <div className="relative z-10 bg-transparent py-20 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto pl-6 pr-3 md:px-6 lg:px-12">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex-shrink-0" style={{ minWidth: "fit-content" }}>
            <h2
              ref={headingRef}
              className="font-qanelas-soft font-bold"
              style={{
                fontSize: "clamp(1.6rem, 5vw, 3.5rem)",
                background:
                  "linear-gradient(180deg, #0B3D91 0%, #062A5E 90%, #000000 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.01em",
                lineHeight: "1.2",
                ...getHeadingStyle(),
              }}
            >
              Our Beginnings (1987–2004)
            </h2>
          </div>

          <div className="flex-shrink-0" style={{ minWidth: "fit-content" }}>
            <p
              ref={subheadingRef}
              className="font-qanelas-soft italic"
              style={{
                fontSize: "clamp(0.85rem, 2.5vw, 1.5rem)",
                maxWidth: "47.6rem",
                background: "linear-gradient(180deg, #FFFFFF 0%, #B0B0B0 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.01em",
                lineHeight: "1.5",
                ...getSubheadingStyle(),
              }}
            >
              From Idea to Institution - A path shaped by persistence, pivots
              and early public-sector works.
            </p>
          </div>
        </div>

        <div ref={timelineRef} className="mt-16 md:mt-24 lg:mt-32 relative">
          {/* Reading Progress Indicator - Desktop only */}
          <ReadingProgressIndicator
            readingProgress={timelineProgress}
            indicatorVisible={indicatorVisible}
            isMobile={false}
            totalSegments={8}
            variant="timeline"
          />

          {/* Container for timeline entries with vertical line */}
          <div className="relative">
            {/* Vertical Line - Desktop only, only spans timeline entries */}
            <div
              className="hidden md:block absolute left-[12%] top-0 w-[2px] bg-gradient-to-b from-[#0B3D91] via-[#062A5E] to-[#0B3D91]"
              style={{ opacity: 0.4, height: "calc(100% + 0px)" }}
            />

            {/* Vertical Line - Mobile only, only spans timeline entries */}
            <div
              className="md:hidden absolute left-[15%] top-0 w-[2px] bg-gradient-to-b from-[#0B3D91] via-[#062A5E] to-[#0B3D91]"
              style={{ opacity: 0.4, height: "calc(100% + 0px)" }}
            />

            <div
              className="space-y-12 md:space-y-16 lg:space-y-20"
              ref={timelineContainerRef}
            >
              {timelineEntries.map((entry, index) => {
                const isLastEntry = index === timelineEntries.length - 1;
                const isFirstEntry = index === 0;
                const shouldAllowExpand = !isFirstEntry && !isLastEntry;
                const isExpanded = expandedEntries[index];

                return (
                  <div
                    key={entry.year}
                    ref={entryRefs[index]}
                    className="flex flex-row gap-4 md:gap-8 relative"
                    style={getEntryStyle(index)}
                  >
                    {/* Left Column - Year */}
                    <div className="w-[15%] md:w-[12%] flex-shrink-0 flex items-start justify-end pr-4 md:pr-8">
                      <h3
                        className="font-qanelas-soft font-bold"
                        style={{
                          fontSize: "clamp(1.25rem, 2.5vw, 2.5rem)",
                          letterSpacing: "-0.01em",
                          ...(isLastEntry
                            ? {
                                color: "#D84315",
                              }
                            : {
                                background:
                                  "linear-gradient(180deg, #0B3D91 0%, #062A5E 100%)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                              }),
                        }}
                      >
                        {entry.year}
                      </h3>
                    </div>

                    {/* Timeline Marker/Dot */}
                    <div
                      className="absolute left-[15%] md:left-[12%] top-2 md:top-3 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 md:border-3 border-[#07090E] z-10"
                      style={{
                        transform: "translateX(-50%)",
                        backgroundColor: isLastEntry ? "#D84315" : "#0B3D91",
                        boxShadow: isLastEntry
                          ? "0 0 0 3px rgba(216, 67, 21, 0.2), 0 0 12px rgba(216, 67, 21, 0.4)"
                          : "0 0 0 3px rgba(11, 61, 145, 0.2), 0 0 12px rgba(11, 61, 145, 0.4)",
                      }}
                    />

                    {/* Right Column - Content */}
                    <div className="w-[78%] md:w-[85%] pl-6 md:pl-8">
                      {/* Title */}
                      <h4
                        className="font-qanelas-soft font-semibold mb-2 md:mb-3 mt-1 md:mt-2"
                        style={{
                          fontSize: "clamp(0.95rem, 1.5vw, 1.35rem)",
                          color: isLastEntry
                            ? "#D84315"
                            : "rgba(255, 255, 255, 0.95)",
                          letterSpacing: "0.01em",
                          lineHeight: "1.3",
                        }}
                      >
                        {entry.title}
                      </h4>

                      {/* Content - Handle multi-paragraph entries */}
                      <div className="space-y-3">
                        {entry.content
                          .split("\n\n")
                          .map((paragraph, pIndex) => (
                            <p
                              key={pIndex}
                              className={`font-qanelas-soft ${
                                shouldAllowExpand && !isExpanded
                                  ? "md:line-clamp-none line-clamp-3"
                                  : ""
                              }`}
                              style={{
                                fontSize: "clamp(0.75rem, 1.2vw, 0.95rem)",
                                color: "rgba(255, 255, 255, 0.7)",
                                letterSpacing: "0.01em",
                                lineHeight: "1.6",
                              }}
                            >
                              {parseBoldText(paragraph)}
                            </p>
                          ))}
                      </div>

                      {/* Read More Button - Mobile only, excluding first and last */}
                      {shouldAllowExpand && (
                        <button
                          onClick={() => toggleExpanded(index)}
                          className="md:hidden mt-3 flex items-center gap-1.5 text-sm transition-colors"
                          style={{
                            color: "rgba(11, 61, 145, 0.9)",
                          }}
                        >
                          <span className="font-qanelas-soft font-medium">
                            {isExpanded ? "Read less" : "Read more"}
                          </span>
                          <ChevronDown
                            size={16}
                            className="transition-transform duration-300"
                            style={{
                              transform: isExpanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            }}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Extended Dotted Line After 2004 */}
          <div className="relative" style={{ height: "80px" }}>
            <div
              className="hidden md:block absolute left-[12%] top-0 bottom-0 w-[2px]"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, #0B3D91 40%, transparent 40%)",
                backgroundSize: "2px 12px",
                backgroundRepeat: "repeat-y",
                opacity: 0.4,
              }}
            />
            <div
              className="md:hidden absolute left-[15%] top-0 bottom-0 w-[2px]"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, #0B3D91 40%, transparent 40%)",
                backgroundSize: "2px 12px",
                backgroundRepeat: "repeat-y",
                opacity: 0.4,
              }}
            />
          </div>

          {/* Today Section */}
          <div className="relative" ref={todayRef}>
            {/* Timeline Marker/Dot for Today */}
            <div
              className="absolute left-[15%] md:left-[12%] -top-7 md:top-3 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 md:border-3 border-[#0A0A0A] z-10"
              style={{
                transform: "translateX(-50%)",
                backgroundColor: "#FFFFFF",
                boxShadow:
                  "0 0 0 3px rgba(255, 255, 255, 0.2), 0 0 12px rgba(255, 255, 255, 0.4)",
                ...getTodayTitleStyle(),
              }}
            />

            {/* Content starts from left edge */}
            <div className="pl-0">
              {/* "Today," Title - HIDDEN ON MOBILE */}
              <h3
                className="hidden md:block font-qanelas-soft font-bold mb-3"
                style={{
                  fontSize: "clamp(1.26445rem, 1.9965vw, 1.5972rem)",
                  background:
                    "linear-gradient(180deg, #FFFFFF 0%, #E0E0E0 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "0.01em",
                  lineHeight: "1.3",
                  marginTop: "0.5rem",
                  ...getTodayTitleStyle(),
                }}
              >
                Today,
              </h3>

              {/* Content */}
              <div
                className="space-y-3 md:space-y-4 mt-8 md:mt-0 pl-6 md:pl-0"
                style={getTodayContentStyle()}
              >
                <p
                  className="font-qanelas-soft text-[0.8rem] md:text-[clamp(0.85rem,1.5vw,1.2rem)]"
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    letterSpacing: "0.01em",
                    lineHeight: "1.6",
                  }}
                >
                  {/* Mobile version - shows "Today," */}
                  <span className="md:hidden">
                    <span className="font-bold text-white">Today,</span> we
                    operate across{" "}
                  </span>
                  {/* Desktop version - no "Today," */}
                  <span className="hidden md:inline">
                    We (Emdee Digitronics Pvt. Ltd.) operate across{" "}
                  </span>
                  <span className="font-bold text-white">10+ states</span>,
                  serving{" "}
                  <span className="font-bold text-white">
                    50+ government departments and PSUs
                  </span>
                  . Over the last two decades, we have executed{" "}
                  <span className="font-bold text-white">
                    500+ government projects
                  </span>
                  , digitised{" "}
                  <span className="font-bold text-white">
                    100 million+ unique records
                  </span>{" "}
                  (from land deeds and electoral rolls to censuses and books),
                  processed utility billing for{" "}
                  <span className="font-bold text-white">
                    50 million+ consumers
                  </span>
                  , enabled digital workflows and learning content for{" "}
                  <span className="font-bold text-white">
                    30 million+ students
                  </span>{" "}
                  and onboarded{" "}
                  <span className="font-bold text-white">
                    35 million+ citizens
                  </span>{" "}
                  onto digital identity architectures. We have supplied,
                  installed, commissioned and managed{" "}
                  <span className="font-bold text-white">
                    1 million+ IT assets
                  </span>{" "}
                  through a cummulative deployment of{" "}
                  <span className="font-bold text-white">
                    15,000+ personnel
                  </span>{" "}
                  over the years.
                </p>
                <p
                  className="font-qanelas-soft text-[0.8rem] md:text-[clamp(0.95rem,1.5vw,1.2rem)]"
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    letterSpacing: "0.01em",
                    lineHeight: "1.6",
                  }}
                >
                  At any given time,{" "}
                  <span className="font-bold text-white">
                    thousands of our field engineers
                  </span>{" "}
                  operate across{" "}
                  <span className="font-bold text-white">
                    thousands of pincodes
                  </span>
                  , integrating, operating and maintaining government's IT
                  systems and public-service delivery machineries. Emdee touches
                  the lives of millions every day through its e-governance
                  technologies, surveillance and security systems, field
                  manpower, IT services and IT infrastructure footprint across
                  East India. Today, we have diversified into sustainable energy
                  and are moving towards enterprise IT & AI, as well as
                  manufacturing-led capabilities. Our foundational focus however
                  remains constant:
                </p>
                <p
                  className="font-qanelas-soft font-bold text-[0.8rem] md:text-[clamp(0.95rem,1.5vw,1.2rem)]"
                  style={{
                    color: "rgba(255, 255, 255, 0.95)",
                    letterSpacing: "0.01em",
                    lineHeight: "1.6",
                  }}
                >
                  To build IT infrastructure and systems that endure, scale and
                  help public services reach the last mile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
