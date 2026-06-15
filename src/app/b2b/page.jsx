"use client";

import Navbar from "@/components/Navbar";

export function meta() {
  return [
    { title: "Zuneko Labs - AI, ERP & Custom Software | Emdee Techno Services" },
    { name: "description", content: "Empower your business with next-gen AI automation, Frappe ERP solutions, computer vision, and custom enterprise software." }
  ];
}
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "motion/react";
import { useRef, useState, useEffect } from "react";
import { useInView } from "motion/react";
import {
  ExternalLink,
  Brain,
  Server,
  Cloud,
  BarChart3,
  ScanEye,
  Code2,
  ChevronRight,
  MapPin,
  Linkedin,
} from "lucide-react";

// ── Manifesto text — 4 paragraphs ──
const PARAS = [
  "Large Indian businesses have spent decades bending themselves to fit their software. It should have been the other way around. At Zuneko Labs, we build technology that adapts to your complexity.",
  "As the enterprise division of Emdee Digitronics, we bring two decades of institutional rigour — built running large-scale IT infrastructure for multiple state governments — to family-run conglomerates and legacy industrial businesses who have outgrown generic, rigid, and expensive software but have been told there is no alternative.",
  "There is. We build it for them. Not as consultants who leave, but as a team that stays. We combine speed of a startup with scale of a veteran IT firm, making us uniquely equipped to deliver such transformations.",
  "We have served industries ranging from insurance to motorsports, in functions ranging from financial mathematics to talent management.",
];

const PARA_WORDS = PARAS.map((p) => p.split(" "));
const TOTAL_WORDS = PARA_WORDS.flat().length;

function ManifestoWord({ word, progress, start, end }) {
  const color = useTransform(progress, [start, end], ["rgba(255, 255, 255, 0.12)", "rgba(255, 255, 255, 0.95)"]);
  return (
    <motion.span style={{ color }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

function ManifestoSection() {
  const containerRef = useRef(null);
  const { scrollYProgress: manifestoProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const spread = 0.58;
  let wordIndex = 0;

  return (
    <div ref={containerRef} style={{ height: "220vh" }} className="relative">
      <div className="sticky top-24 h-[calc(100vh-96px)] flex items-center justify-center px-7 md:px-20 lg:px-36">
        <div className="max-w-3xl w-full flex flex-col gap-7 md:gap-9">
          {PARA_WORDS.map((words, pi) => (
            <p
              key={pi}
              className="text-[15px] md:text-[18px] lg:text-[20px] leading-[1.85] tracking-wide"
            >
              {words.map((word) => {
                const i = wordIndex++;
                const start = (i / TOTAL_WORDS) * spread;
                const end = ((i + 1) / TOTAL_WORDS) * spread + 0.02;
                return (
                  <ManifestoWord
                    key={i}
                    word={word}
                    progress={manifestoProgress}
                    start={start}
                    end={end}
                  />
                );
              })}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

const leftCards = [
  {
    Icon: Brain,
    title: "AI & Automation",
    description:
      "Intelligent process automation and AI-driven workflows that reduce manual overhead and unlock operational efficiency at scale.",
    href: "https://zuneko.in/services/aiml/artificial-intelligence",
  },
  {
    Icon: Server,
    title: "IT Infrastructure",
    description:
      "End-to-end supply, integration and maintenance of enterprise-grade servers, networking and storage systems.",
    href: "https://zuneko.in/services/it-infrastructure",
  },
  {
    Icon: Cloud,
    title: "SaaS Products",
    description:
      "Subscription-based software solutions built for flexibility — deploy fast, scale seamlessly, pay as you grow.",
    href: "https://zuneko.in/services/fullstack",
  },
];

const rightCards = [
  {
    Icon: BarChart3,
    title: "ERP (Frappe)",
    description:
      "Frappe / ERPNext implementations tailored to your business — from manufacturing and procurement to HR and accounting.",
    href: "https://zuneko.in/services/enterprise-technology",
  },
  {
    Icon: ScanEye,
    title: "Computer Vision",
    description:
      "Real-time visual intelligence for surveillance, quality control and automated inspection using deep learning models.",
    href: "https://zuneko.in/services/computer-vision-technology",
  },
  {
    Icon: Code2,
    title: "Custom Software",
    description:
      "Bespoke web and application development — dashboards, portals, automation tools and integrations built around your workflows.",
    href: "https://zuneko.in/service/customsaaas",
  },
];

const allCards = [...leftCards, ...rightCards];

/* ── Desktop card — plain div, no conflicting mount animation ── */
function ServiceCard({ Icon, title, description, href, index, side }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="bg-white/[0.01] border border-white/5 backdrop-blur-md rounded-xl p-6 lg:p-7 hover:border-[#4CAF50]/30 hover:bg-white/[0.04] hover:shadow-[0_10px_35px_rgba(76,175,80,0.06)] transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <Icon
            size={21}
            strokeWidth={1.5}
            className="text-[#4CAF50] group-hover:text-[#66BB6A] transition-colors duration-300 mt-0.5"
          />
          <ChevronRight
            size={16}
            strokeWidth={1.5}
            className="text-[#555] group-hover:text-[#4CAF50] transition-colors duration-300"
          />
        </div>
        <h3 className="text-[17px] font-semibold text-white mb-3 leading-snug group-hover:text-[#4CAF50] transition-colors duration-300 font-qanelas-soft">
          {title}
        </h3>
        <p className="text-[14px] text-white/70 leading-relaxed font-qanelas-soft">
          {description}
        </p>
      </div>
    </a>
  );
}

/* ── Mobile accordion card ── */
function AccordionCard({ Icon, title, description, href, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="mb-2 rounded-lg border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 backdrop-blur-md"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.4)", pointerEvents: "auto" }}
    >
      <button
        className="w-full flex items-center justify-between py-[16px] px-3 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center gap-3">
          {/* Left accent bar */}
          <div className="w-[2px] h-4 rounded-full bg-[#4CAF50] flex-shrink-0" />
          <Icon
            size={15}
            strokeWidth={1.5}
            className="text-[#4CAF50] flex-shrink-0"
          />
          <span className="text-[14px] font-medium text-white/95 font-qanelas-soft">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
        >
          <ChevronRight
            size={15}
            strokeWidth={1.5}
            className="text-white/45"
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-3 pb-4 pt-0">
              <div className="h-[1px] bg-white/5 mb-3" />
              <p className="text-[12px] text-white/70 leading-relaxed mb-3 font-qanelas-soft">
                {description}
              </p>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[12px] text-[#4CAF50] font-medium font-qanelas-soft"
              >
                Learn more
                <ExternalLink size={11} strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function B2BPage() {
  /* ── Desktop scroll ── */
  const desktopScrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: desktopScrollRef,
    offset: ["start start", "end start"],
  });

  // Hero exits — three-point ranges clamp fully at 0
  const taglineOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2],
    [1, 0, 0],
  );
  const subtitleOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.12, 0.2],
    [1, 0, 0],
  );
  // subtitleY removed — opacity-only exit, no translation
  const logoScale = useTransform(scrollYProgress, [0.08, 0.5], [1, 0.5]);

  // Cards enter
  const cardsOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.35, 0.65],
    [0, 1, 1],
  );
  const leftCardsX = useTransform(scrollYProgress, [0.28, 0.5], [-72, 0]);
  const rightCardsX = useTransform(scrollYProgress, [0.28, 0.5], [72, 0]);

  // Visibility states — GPU layers can leak opacity; visibility:hidden is absolute
  const [subtitleHidden, setSubtitleHidden] = useState(false);
  const [taglineHidden, setTaglineHidden] = useState(false);
  useMotionValueEvent(subtitleOpacity, "change", (v) =>
    setSubtitleHidden(v < 0.01),
  );
  useMotionValueEvent(taglineOpacity, "change", (v) =>
    setTaglineHidden(v < 0.01),
  );

  /* ── Mobile scroll ── */
  const mobileScrollRef = useRef(null);
  const mobileGroupRef = useRef(null);
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileScrollRef,
    offset: ["start start", "end start"],
  });

  const [logoUpDist, setLogoUpDist] = useState(200);
  useEffect(() => {
    if (!mobileGroupRef.current) return;
    const containerH = window.innerHeight - 80;
    const groupH = mobileGroupRef.current.offsetHeight;
    const travel = (containerH - groupH) / 2 - 24;
    setLogoUpDist(Math.max(0, travel));
  }, []);

  // Mobile hero exits
  const mTaglineOpacity = useTransform(
    mobileProgress,
    [0, 0.1, 0.18],
    [1, 0, 0],
  );
  const mSubtitleOpacity = useTransform(
    mobileProgress,
    [0.04, 0.16, 0.25],
    [1, 0, 0],
  );
  const mGroupY = useTransform(mobileProgress, [0, 0.38], [0, -logoUpDist]);
  const mLogoScale = useTransform(mobileProgress, [0.05, 0.38], [1, 0.55]);

  // Mobile cards — start earlier so they're fully visible with plenty of dwell time
  const mCardsOpacity = useTransform(
    mobileProgress,
    [0.28, 0.38, 0.7],
    [0, 1, 1],
  );
  const mCardsY = useTransform(mobileProgress, [0.28, 0.42], [60, 0]);

  // Mobile visibility + pointer-events states
  const [mSubtitleHidden, setMSubtitleHidden] = useState(false);
  const [mTaglineHidden, setMTaglineHidden] = useState(false);
  const [mCardsActive, setMCardsActive] = useState(false);
  useMotionValueEvent(mSubtitleOpacity, "change", (v) =>
    setMSubtitleHidden(v < 0.01),
  );
  useMotionValueEvent(mTaglineOpacity, "change", (v) =>
    setMTaglineHidden(v < 0.01),
  );
  useMotionValueEvent(mCardsOpacity, "change", (v) =>
    setMCardsActive(v > 0.05),
  );

  return (
    <div className="min-h-screen bg-[#07090E] text-white font-qanelas-soft relative">
      {/* Background ambient glows wrapped in a container to protect sticky positioning */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#0B3D91]/10 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#4CAF50]/5 blur-[120px]" />
      </div>

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <Navbar variant="glass" />
      </div>

      <div className="pt-20 relative z-10">
        {/* ══════════════════════════════
            DESKTOP — 320vh scroll zone
        ══════════════════════════════ */}
        <div className="hidden md:block">
          <div
            ref={desktopScrollRef}
            style={{ height: "320vh" }}
            className="relative"
          >
            <div className="sticky top-20 h-[calc(100vh-80px)] overflow-hidden">
              <div className="h-full grid grid-cols-[1fr_minmax(320px,460px)_1fr] gap-6 px-8 lg:px-14 py-10">
                {/* Left column */}
                <motion.div
                  className="flex flex-col gap-4 justify-center"
                  style={{ opacity: cardsOpacity, x: leftCardsX }}
                >
                  {leftCards.map((card, i) => (
                    <ServiceCard key={i} {...card} index={i} side="left" />
                  ))}
                </motion.div>

                {/* Center: logo + subtitle + button */}
                <div className="flex flex-col items-center justify-center relative">
                  <motion.img
                    src="https://ucarecdn.com/e4b98640-24cb-4b4c-b5a1-d395510c315b/-/format/auto/"
                    alt="Zuneko"
                    style={{
                      height: "192px",
                      scale: logoScale,
                      transformOrigin: "center center",
                    }}
                    className="w-auto object-contain"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  {/* visibility:hidden ensures no GPU bleed-through when opacity=0 */}
                  <motion.div
                    className="flex flex-col items-center mt-6 pointer-events-none text-center"
                    style={{
                      opacity: subtitleOpacity,
                      visibility: subtitleHidden ? "hidden" : "visible",
                    }}
                  >
                    <p className="text-[10px] font-bold tracking-[0.25em] text-[#4CAF50] uppercase mb-4">
                      Our Enterprise Division
                    </p>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight tracking-tight font-qanelas-soft">
                      Next-Gen Enterprise Engineering & AI
                    </h1>
                    <p className="text-xs lg:text-sm text-white/50 mb-7 leading-relaxed max-w-sm font-qanelas-soft">
                      Bringing 20+ years of institutional e-governance excellence to help modern enterprises transform through custom software, AI, and Frappe ERP solutions.
                    </p>
                    <a
                      href="https://www.zuneko.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 pointer-events-auto"
                      style={{
                        background:
                          "linear-gradient(135deg, #1B5E20 0%, #0A2E0A 100%)",
                        border: "1px solid #2E5E2E",
                        boxShadow: "0 4px 20px rgba(76,175,80,0.15)",
                      }}
                    >
                      Visit Zuneko
                      <ExternalLink size={14} strokeWidth={2} />
                    </a>
                  </motion.div>
                </div>

                {/* Right column */}
                <motion.div
                  className="flex flex-col gap-4 justify-center"
                  style={{ opacity: cardsOpacity, x: rightCardsX }}
                >
                  {rightCards.map((card, i) => (
                    <ServiceCard key={i} {...card} index={i} side="right" />
                  ))}
                </motion.div>
              </div>

              {/* Tagline */}
              <motion.div
                className="absolute bottom-14 left-0 right-0 text-center px-6 pointer-events-none"
                style={{
                  opacity: taglineOpacity,
                  visibility: taglineHidden ? "hidden" : "visible",
                }}
              >
                <p className="font-playfair-display italic text-[21px] leading-relaxed tracking-wide text-[#5A5A5A]">
                  {"Transform with AI "}
                  <span
                    style={{
                      display: "inline-block",
                      background: "linear-gradient(90deg, #4CAF50, #81C784)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    today
                  </span>
                  {" — "}
                  <span
                    style={{
                      display: "inline-block",
                      background: "linear-gradient(90deg, #4CAF50, #81C784)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    yesterday
                  </span>
                  {"'s legacy into "}
                  <span
                    style={{
                      display: "inline-block",
                      background: "linear-gradient(90deg, #4CAF50, #81C784)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    tomorrow
                  </span>
                  {"'s enterprise"}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            MOBILE — 340vh scroll zone
        ══════════════════════════════ */}
        <div className="md:hidden">
          <div
            ref={mobileScrollRef}
            style={{ height: "340vh" }}
            className="relative"
          >
            <div className="sticky top-20 h-[calc(100vh-80px)] overflow-hidden">
              {/* Logo + subtitle group — z:1 keeps button above cards panel at all times */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ y: mGroupY, zIndex: 1 }}
              >
                <div
                  ref={mobileGroupRef}
                  className="flex flex-col items-center px-4"
                  style={{ position: "relative" }}
                >
                  <motion.img
                    src="https://ucarecdn.com/e4b98640-24cb-4b4c-b5a1-d395510c315b/-/format/auto/"
                    alt="Zuneko"
                    className="h-28 w-auto object-contain"
                    style={{ scale: mLogoScale, transformOrigin: "top center" }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  {/* visibility:hidden prevents ghost rendering; pointer-events-none on wrapper,
                      the <a> itself is fully interactive via default pointer-events */}
                  <motion.div
                    className="flex flex-col items-center mt-4 text-center"
                    style={{
                      opacity: mSubtitleOpacity,
                      visibility: mSubtitleHidden ? "hidden" : "visible",
                    }}
                  >
                    <p className="text-[10px] font-bold tracking-[0.25em] text-[#4CAF50] uppercase mb-3">
                      Our Enterprise Division
                    </p>
                    <h1 className="text-2xl font-bold text-white mb-2 leading-tight tracking-tight font-qanelas-soft">
                      Enterprise Engineering & AI
                    </h1>
                    <p className="text-xs text-white/50 mb-5 leading-relaxed max-w-xs font-qanelas-soft">
                      Bringing 20+ years of institutional IT execution to modern businesses through custom software, AI, and Frappe ERP.
                    </p>
                    <a
                      href="https://www.zuneko.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, #1B5E20 0%, #0A2E0A 100%)",
                        border: "1px solid #2E5E2E",
                        boxShadow: "0 4px 15px rgba(76,175,80,0.12)",
                      }}
                    >
                      Visit Zuneko
                      <ExternalLink size={13} strokeWidth={2} />
                    </a>
                  </motion.div>
                </div>
              </motion.div>

              {/* Tagline */}
              <motion.div
                className="absolute bottom-14 left-0 right-0 text-center px-6 pointer-events-none"
                style={{
                  opacity: mTaglineOpacity,
                  visibility: mTaglineHidden ? "hidden" : "visible",
                }}
              >
                <p className="font-playfair-display italic text-[16px] leading-relaxed tracking-wide text-[#5A5A5A]">
                  {"Transform with AI "}
                  <span
                    style={{
                      display: "inline-block",
                      background: "linear-gradient(90deg, #4CAF50, #81C784)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    today
                  </span>
                  {" — "}
                  <span
                    style={{
                      display: "inline-block",
                      background: "linear-gradient(90deg, #4CAF50, #81C784)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    yesterday
                  </span>
                  {"'s legacy into "}
                  <span
                    style={{
                      display: "inline-block",
                      background: "linear-gradient(90deg, #4CAF50, #81C784)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    tomorrow
                  </span>
                  {"'s enterprise"}
                </p>
              </motion.div>

              {/* Accordion cards — z:2 when active to sit above logo group,
                  z:0 when hidden so it never blocks the button */}
              <motion.div
                className="absolute inset-x-0 bottom-0 px-5 pb-4"
                style={{
                  opacity: mCardsOpacity,
                  y: mCardsY,
                  top: "160px",
                  zIndex: mCardsActive ? 2 : 0,
                  pointerEvents: mCardsActive ? "auto" : "none",
                }}
              >
                <p className="text-[10px] font-medium tracking-[0.22em] text-[#3A3A3A] uppercase mb-3 px-1">
                  Zuneko Labs · Services
                </p>
                <div className="overflow-y-auto h-full">
                  {allCards.map((card, i) => (
                    <AccordionCard key={i} {...card} index={i} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Manifesto ── */}
        <ManifestoSection />

        {/* ── Closing section ── */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-[1400px] mx-auto px-6 lg:px-16 py-24 md:py-32 relative z-10"
        >
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#4CAF50]/20 to-transparent mb-16 md:mb-20" />
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-14 md:gap-20 items-start">
            <div>
              <p className="font-playfair-display italic text-[22px] md:text-[28px] lg:text-[32px] text-white leading-[1.65] mb-10">
                "AI will not replace you. Competitors using AI will.
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #4CAF50, #81C784)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Our job is to keep you on the right side of that equation.
                </span>
                "
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <div className="flex-[3] bg-white/[0.01] border border-white/5 backdrop-blur-md rounded-lg px-4 py-3 flex items-center gap-3">
                  <MapPin
                    size={14}
                    strokeWidth={1.5}
                    className="text-[#4CAF50] flex-shrink-0"
                  />
                  <p className="text-[13px] text-white/70 leading-snug font-qanelas-soft">
                    Office 204, 2nd Floor, Suratwala Mark Plazzo, Hinjewadi,
                    Pune 411057.
                  </p>
                </div>
                <a
                  href="https://www.linkedin.com/company/zuneko-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white/[0.01] border border-white/5 hover:border-[#4CAF50]/30 hover:bg-white/[0.04] rounded-lg px-4 py-3 flex items-center gap-2 transition-all duration-200 group backdrop-blur-md"
                >
                  <Linkedin
                    size={14}
                    strokeWidth={1.5}
                    className="text-[#4CAF50] flex-shrink-0"
                  />
                  <p className="flex-1 text-[13px] font-medium text-white/60 group-hover:text-white transition-colors duration-200 leading-snug font-qanelas-soft">
                    Follow Zuneko Labs
                  </p>
                  <ChevronRight
                    size={13}
                    strokeWidth={1.5}
                    className="text-white/40 group-hover:text-[#4CAF50] transition-colors duration-200 flex-shrink-0"
                  />
                </a>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-4 md:pt-2">
              <p
                className="text-[26px] md:text-[30px] font-semibold leading-snug"
                style={{
                  background: "linear-gradient(90deg, #4CAF50, #81C784)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Ready to
                <br />
                transform?
              </p>
              <p className="text-[15px] text-[#AAAAAA] leading-snug">
                Enter the next industrial era.
              </p>
              <a
                href="https://zuneko.in/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold text-white rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  background:
                    "linear-gradient(135deg, #1B5E20 0%, #0A2E0A 100%)",
                  border: "1px solid #2E5E2E",
                  boxShadow: "0 0 24px rgba(46,125,50,0.12)",
                }}
              >
                Get in Touch
                <ExternalLink size={13} strokeWidth={2} />
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
