import { useImpactAnimation } from "@/hooks/useImpactAnimation";
import { Odometer } from "@/components/HomePage/Odometer";
import { useState, useEffect, useRef } from "react";
import { Info } from "lucide-react";

// --- CUSTOM ANIMATED SVGS ---

function PincodesServedSvg() {
  return (
    <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0B3D91" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0B3D91" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Glow backdrop */}
        <circle cx="50" cy="50" r="45" fill="url(#globeGlow)" />
        
        {/* Grid lines */}
        <circle cx="50" cy="50" r="40" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
        <circle cx="50" cy="50" r="28" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" />
        <circle cx="50" cy="50" r="16" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
        
        {/* Axis lines */}
        <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
        
        {/* Ellipses */}
        <ellipse cx="50" cy="50" rx="40" ry="14" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" fill="none" />
        <ellipse cx="50" cy="50" rx="14" ry="40" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" fill="none" />

        {/* Pulse radar rings */}
        <circle cx="50" cy="50" r="10" stroke="#FF6B35" strokeWidth="1.5" opacity="0">
          <animate attributeName="r" values="5;45" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="3s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="50" cy="50" r="10" stroke="#0B3D91" strokeWidth="1" opacity="0">
          <animate attributeName="r" values="5;35" dur="3s" begin="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="3s" begin="1.5s" repeatCount="indefinite" />
        </circle>

        {/* Pulsing Pins / Dots */}
        <g>
          {/* Central main node */}
          <circle cx="50" cy="50" r="4.5" fill="#FF6B35" />
          <circle cx="50" cy="50" r="8" stroke="#FF6B35" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" values="4.5;9;4.5" dur="2s" repeatCount="indefinite" />
          </circle>
          
          {/* Sub nodes */}
          <circle cx="25" cy="40" r="3" fill="#FFFFFF" opacity="0.8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="75" cy="45" r="3" fill="#FFFFFF" opacity="0.8">
            <animate attributeName="opacity" values="1;0.3;1" dur="2.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="35" cy="70" r="3" fill="#0B3D91">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="68" cy="65" r="3" fill="#FF6B35">
            <animate attributeName="opacity" values="1;0.4;1" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="45" cy="22" r="2.5" fill="#FFFFFF">
            <animate attributeName="opacity" values="0.2;0.9;0.2" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="58" cy="78" r="2.5" fill="#0B3D91">
            <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2.4s" repeatCount="indefinite" />
          </circle>
        </g>
        
        {/* Dynamic connection arcs */}
        <path d="M25,40 Q40,30 50,50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M75,45 Q60,55 50,50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M35,70 Q45,60 50,50" stroke="rgba(11, 61, 145, 0.4)" strokeWidth="1" />
        <path d="M68,65 Q60,55 50,50" stroke="rgba(255, 107, 53, 0.4)" strokeWidth="1" />
      </svg>
    </div>
  );
}

function ProjectsDeliveredSvg() {
  return (
    <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B3D91" />
            <stop offset="50%" stopColor="#FF6B35" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <filter id="svgGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* The flowchart path */}
        <path 
          d="M15,50 L38,50 L50,28 L62,50 L85,50" 
          stroke="rgba(255,255,255,0.1)" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        
        <path 
          d="M15,50 L38,50 L50,72 L62,50 L85,50" 
          stroke="rgba(255,255,255,0.1)" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Drawing glowing paths */}
        <path 
          d="M15,50 L38,50 L50,28 L62,50 L85,50" 
          stroke="url(#pathGradient)" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          strokeDasharray="120"
          strokeDashoffset="120"
        >
          <animate attributeName="strokeDashoffset" values="120;0" dur="4s" repeatCount="indefinite" />
        </path>

        <path 
          d="M15,50 L38,50 L50,72 L62,50 L85,50" 
          stroke="url(#pathGradient)" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          strokeDasharray="120"
          strokeDashoffset="120"
        >
          <animate attributeName="strokeDashoffset" values="120;0" dur="4s" begin="2s" repeatCount="indefinite" />
        </path>

        {/* Milestone Nodes */}
        <circle cx="15" cy="50" r="5" fill="#0B3D91" stroke="#FFFFFF" strokeWidth="1" />
        
        <circle cx="38" cy="50" r="4" fill="#FFFFFF">
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="50" cy="28" r="4.5" fill="#FF6B35">
          <animate attributeName="fill" values="#FF6B35;#FFFFFF;#FF6B35" dur="3s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="50" cy="72" r="4.5" fill="#FF6B35">
          <animate attributeName="fill" values="#FFFFFF;#FF6B35;#FFFFFF" dur="3s" repeatCount="indefinite" />
        </circle>

        <circle cx="62" cy="50" r="4" fill="#FFFFFF">
          <animate attributeName="r" values="3;5;3" dur="2.2s" repeatCount="indefinite" />
        </circle>

        <circle cx="85" cy="50" r="6" fill="#FF6B35" filter="url(#svgGlow)">
          <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <path d="M82,50 L84.5,52.5 L88,48" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function FieldEngineersSvg() {
  return (
    <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection Lines */}
        <g stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1">
          <line x1="50" y1="50" x2="20" y2="35" />
          <line x1="50" y1="50" x2="80" y2="35" />
          <line x1="50" y1="50" x2="25" y2="70" />
          <line x1="50" y1="50" x2="75" y2="70" />
          <line x1="50" y1="50" x2="50" y2="15" />
          
          <line x1="20" y1="35" x2="50" y2="15" />
          <line x1="80" y1="35" x2="50" y2="15" />
          <line x1="20" y1="35" x2="25" y2="70" />
          <line x1="80" y1="35" x2="75" y2="70" />
        </g>

        {/* Moving signal dots */}
        <circle cx="50" cy="50" r="2.5" fill="#FF6B35">
          <animate attributeName="cx" values="50;20;50" dur="3s" repeatCount="indefinite" />
          <animate attributeName="cy" values="50;35;50" dur="3s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="50" cy="50" r="2.5" fill="#FFFFFF">
          <animate attributeName="cx" values="50;80;50" dur="3.5s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="cy" values="50;35;50" dur="3.5s" begin="0.5s" repeatCount="indefinite" />
        </circle>

        <circle cx="50" cy="50" r="2.5" fill="#0B3D91">
          <animate attributeName="cx" values="50;25;50" dur="4s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="cy" values="50;70;50" dur="4s" begin="1s" repeatCount="indefinite" />
        </circle>

        {/* Central Master Node */}
        <circle cx="50" cy="50" r="8" fill="#FF6B35" />
        <path d="M46,54 C46,51 48,49 50,49 C52,49 54,51 54,54" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="50" cy="44" r="2" fill="#FFFFFF" />
        
        {/* Ring waves */}
        <circle cx="50" cy="50" r="14" stroke="rgba(255, 107, 53, 0.4)" strokeWidth="1.5">
          <animate attributeName="r" values="8;24" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Surrounding Nodes */}
        <circle cx="50" cy="15" r="5" fill="#0B3D91" stroke="#FFFFFF" strokeWidth="1">
          <animate attributeName="r" values="4;5.5;4" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="20" cy="35" r="4.5" fill="#FFFFFF" />
        <circle cx="80" cy="35" r="4.5" fill="#FFFFFF" />
        <circle cx="25" cy="70" r="4" fill="#0B3D91" />
        <circle cx="75" cy="70" r="4.5" fill="#FF6B35" />
      </svg>
    </div>
  );
}

function GovtDepartmentsSvg() {
  return (
    <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Orbit ring */}
        <ellipse cx="50" cy="62" rx="42" ry="12" stroke="rgba(255, 107, 53, 0.4)" strokeWidth="1.5" strokeDasharray="5 3">
          <animate transform="rotate(360 50 62)" attributeName="transform" type="rotate" values="0 50 62; 360 50 62" dur="15s" repeatCount="indefinite" />
        </ellipse>

        {/* Building Foundation */}
        <rect x="20" y="72" width="60" height="6" rx="2" fill="#FFFFFF" opacity="0.9" />
        <rect x="23" y="66" width="54" height="6" fill="rgba(255, 255, 255, 0.7)" />

        {/* Columns */}
        <rect x="28" y="42" width="4" height="24" rx="1" fill="#0B3D91">
          <animate attributeName="fill" values="#0B3D91;#FF6B35;#0B3D91" dur="4s" repeatCount="indefinite" />
        </rect>
        <rect x="40" y="42" width="4" height="24" rx="1" fill="#FFFFFF">
          <animate attributeName="fill" values="#FFFFFF;#FF6B35;#FFFFFF" dur="4s" begin="1s" repeatCount="indefinite" />
        </rect>
        <rect x="56" y="42" width="4" height="24" rx="1" fill="#FFFFFF">
          <animate attributeName="fill" values="#FFFFFF;#FF6B35;#FFFFFF" dur="4s" begin="2s" repeatCount="indefinite" />
        </rect>
        <rect x="68" y="42" width="4" height="24" rx="1" fill="#0B3D91">
          <animate attributeName="fill" values="#0B3D91;#FF6B35;#0B3D91" dur="4s" begin="3s" repeatCount="indefinite" />
        </rect>

        {/* Pediment */}
        <rect x="24" y="36" width="52" height="6" fill="#FFFFFF" />

        {/* Roof Dome */}
        <path d="M26,36 C26,20 74,20 74,36 Z" fill="rgba(11, 61, 145, 0.6)" stroke="#FFFFFF" strokeWidth="1" />
        
        <circle cx="50" cy="28" r="4" fill="#FF6B35">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Shining star */}
        <g>
          <path d="M50,12 L51.5,15.5 L55,17 L51.5,18.5 L50,22 L48.5,18.5 L45,17 L48.5,15.5 Z" fill="#FF6B35">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="transform" type="scale" values="0.9;1.1;0.9" dur="1.5s" repeatCount="indefinite" style={{ transformOrigin: '50px 17px' }} />
          </path>
        </g>
      </svg>
    </div>
  );
}

function ITAssetsSvg() {
  return (
    <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="15" width="60" height="70" rx="4" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" fill="rgba(5, 15, 30, 0.5)" />

        <line x1="20" y1="36" x2="80" y2="36" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1.5" />
        <line x1="20" y1="58" x2="80" y2="58" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1.5" />

        {/* Server 1 */}
        <rect x="26" y="22" width="30" height="6" rx="1" fill="rgba(255, 255, 255, 0.15)" />
        <circle cx="64" cy="25" r="2" fill="#FF6B35">
          <animate attributeName="opacity" values="1;0.2;1" dur="0.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="25" r="2" fill="#0B3D91">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="76" cy="25" r="2" fill="#FFFFFF">
          <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite" />
        </circle>

        {/* Server 2 */}
        <rect x="26" y="44" width="30" height="6" rx="1" fill="rgba(255, 255, 255, 0.15)" />
        <circle cx="64" cy="47" r="2" fill="#FFFFFF">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="0.7s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="47" r="2" fill="#FF6B35">
          <animate attributeName="opacity" values="1;0.1;1" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="76" cy="47" r="2" fill="#0B3D91">
          <animate attributeName="opacity" values="0.1;1;0.1" dur="0.9s" repeatCount="indefinite" />
        </circle>

        {/* Server 3 */}
        <rect x="26" y="66" width="30" height="6" rx="1" fill="rgba(255, 255, 255, 0.15)" />
        <circle cx="64" cy="69" r="2" fill="#0B3D91">
          <animate attributeName="opacity" values="1;0.2;1" dur="1.1s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="69" r="2" fill="#FFFFFF">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="0.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="76" cy="69" r="2" fill="#FF6B35">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.3s" repeatCount="indefinite" />
        </circle>

        {/* Data stream dots */}
        <path d="M12,20 L12,80" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M88,20 L88,80" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" strokeDasharray="3 3" />

        <circle cx="12" cy="20" r="1.5" fill="#FF6B35">
          <animate attributeName="cy" values="20;80" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="88" cy="80" r="1.5" fill="#0B3D91">
          <animate attributeName="cy" values="80;20" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

// --- MAIN COMPONENT ---

export function ImpactSection() {
  const [hoveredTile, setHoveredTile] = useState(null);
  const [activeMobileInfo, setActiveMobileInfo] = useState(null);
  const mobileTilesContainerRef = useRef(null);

  const {
    sectionRef,
    frameRef,
    headingRef,
    subheadingRef,
    tilesRef,
    frameAnimated,
    headingAnimated,
    subheadingAnimated,
    isScrolling,
    exitPhase1Progress,
    exitPhase2Progress,
  } = useImpactAnimation();

  // Handle click outside to collapse active tile on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileTilesContainerRef.current &&
        !mobileTilesContainerRef.current.contains(event.target)
      ) {
        setActiveMobileInfo(null);
      }
    };

    if (activeMobileInfo !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [activeMobileInfo]);

  // Real statistics data with custom icons
  const stats = [
    {
      value: "4,000+",
      label: "Pincodes Served",
      detail:
        "Across 10+ states; includes 2,000+ pincodes currently serviced with full coverage in West Bengal",
      icon: <PincodesServedSvg />,
    },
    {
      value: "500+",
      label: "Projects Delivered",
      detail:
        "Includes hundreds of state and central government projects executed over 20+ years in the B2G ecosystem",
      icon: <ProjectsDeliveredSvg />,
    },
    {
      value: "3,500+",
      label: "Field Engineers Deployed",
      detail:
        "10,000+ service engineers and field personnel deployed cumulatively across long-term government programmes",
      icon: <FieldEngineersSvg />,
    },
    {
      value: "50+",
      label: "Government Departments Supported",
      detail:
        "Transport, Police, Education, Health, Rural Development, Food & Supplies/PDS, Agriculture, Tourism, Urban Affairs, Social Welfare, and many others across state and central agencies",
      icon: <GovtDepartmentsSvg />,
    },
    {
      value: "100,000+",
      label: "IT Assets Under Management",
      detail:
        "Over 1 million IT assets supplied, installed, configured, or commissioned historically across infrastructure/e-governance projects.",
      icon: <ITAssetsSvg />,
    },
  ];

  // Calculate exit transformations
  const getContentExitStyle = (baseDelay = 0) => {
    const adjustedProgress = Math.min(
      1,
      Math.max(0, exitPhase1Progress - baseDelay),
    );
    const translateY = -120 * adjustedProgress; // Upward projection
    const scale = 1 - 0.15 * adjustedProgress; // Slight scale-down
    const opacity = 1 - adjustedProgress; // Fade out

    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity,
      transition: "transform 0.1s linear, opacity 0.1s linear",
    };
  };

  const getFrameExitStyle = () => {
    const translateY = -150 * exitPhase2Progress; // Frame projects upward
    const scale = 1 - 0.1 * exitPhase2Progress;
    const opacity = 1 - 0.5 * exitPhase2Progress;

    // Reduce shadow as it exits
    const shadowIntensity = 1 - exitPhase2Progress;

    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity,
      boxShadow: frameAnimated
        ? `0 ${40 * shadowIntensity}px ${80 * shadowIntensity}px rgba(5, 15, 26, ${0.7 * shadowIntensity}), 0 ${20 * shadowIntensity}px ${40 * shadowIntensity}px rgba(11, 61, 145, ${0.4 * shadowIntensity}), 0 0 1px rgba(255, 255, 255, ${0.15 * shadowIntensity}) inset`
        : "0 20px 40px rgba(5, 15, 26, 0.4), 0 10px 20px rgba(11, 61, 145, 0.2)",
      transition: "all 0.1s linear",
    };
  };

  const getCardStyle = (index) => {
    const isHovered = hoveredTile === index;
    const accentColor = index % 2 === 0 ? "#FF6B35" : "#0B3D91";
    
    return {
      background: isHovered
        ? `linear-gradient(135deg, rgba(11, 61, 145, 0.18) 0%, rgba(255, 107, 53, 0.08) 100%)`
        : "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.005) 100%)",
      boxShadow: isHovered
        ? `0 20px 45px rgba(0, 0, 0, 0.65), 0 0 35px rgba(${accentColor === "#FF6B35" ? "255, 107, 53" : "11, 61, 145"}, 0.22), 0 0 1px rgba(255, 255, 255, 0.25) inset`
        : "0 8px 24px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(255, 255, 255, 0.02), 0 0 1px rgba(255, 255, 255, 0.08) inset",
      border: isHovered
        ? `1.5px solid ${accentColor}`
        : "1.5px solid rgba(255, 255, 255, 0.07)",
      backdropFilter: "blur(20px)",
      transform: isHovered ? "translateY(-12px) scale(1.03)" : "translateY(0) scale(1)",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    };
  };

  const getMobileCardStyle = (index, isExpanded) => {
    const accentColor = index % 2 === 0 ? "#FF6B35" : "#0B3D91";
    
    return {
      background: isExpanded
        ? `linear-gradient(135deg, rgba(11, 61, 145, 0.2) 0%, rgba(255, 107, 53, 0.08) 100%)`
        : "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.005) 100%)",
      boxShadow: isExpanded
        ? `0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(${accentColor === "#FF6B35" ? "255, 107, 53" : "11, 61, 145"}, 0.18), 0 0 1px rgba(255, 255, 255, 0.2) inset`
        : "0 6px 16px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.06) inset",
      border: isExpanded
        ? `1.5px solid ${accentColor}`
        : "1.5px solid rgba(255, 255, 255, 0.06)",
      backdropFilter: "blur(12px)",
      transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    };
  };

  return (
    <div
      id="our-stats"
      ref={sectionRef}
      className="relative z-30 bg-[#07090E] py-20 lg:py-32"
      style={{ overflowX: "hidden" }}
    >
      <div className="w-full">
        {/* Main Frame */}
        <div
          ref={frameRef}
          className="relative w-full rounded-[32px] lg:rounded-none px-8 lg:px-16 py-20 lg:py-32 impact-frame overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #020712 0%, #05142E 50%, #020712 100%)",
            ...(!exitPhase2Progress
              ? {
                  boxShadow: frameAnimated
                    ? "0 40px 80px rgba(5, 15, 26, 0.7), 0 20px 40px rgba(11, 61, 145, 0.4), 0 0 1px rgba(255, 255, 255, 0.15) inset"
                    : "0 20px 40px rgba(5, 15, 26, 0.4), 0 10px 20px rgba(11, 61, 145, 0.2)",
                  transform: frameAnimated
                    ? "translateY(0) scale(1)"
                    : "translateY(75px) scale(0.75)",
                  opacity: frameAnimated ? 1 : 0,
                  transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }
              : getFrameExitStyle()),
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#0B3D91] opacity-[0.12] blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#FF6B35] opacity-[0.06] blur-[120px] pointer-events-none" />
          
          {/* Subtle Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px"
            }}
          />

          {/* Typography Container */}
          <div
            className="flex flex-col items-center text-center mb-16 relative z-10"
            style={exitPhase1Progress > 0 ? getContentExitStyle(0) : {}}
          >
            {/* Subheading Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
              style={{
                ...(exitPhase1Progress === 0
                  ? {
                      transform: subheadingAnimated
                        ? "translateY(0)"
                        : "translateY(75px)",
                      opacity: subheadingAnimated ? 1 : 0,
                      transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
                    }
                  : {}),
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.2em] text-white/70 uppercase">
                OUR IMPACT IN NUMBERS
              </span>
            </div>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="text-3xl md:text-4xl lg:text-5xl font-qanelas-soft font-bold mb-4"
              style={{
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
                lineHeight: "1.2",
                ...(exitPhase1Progress === 0
                  ? {
                      transform: headingAnimated
                        ? "translateY(0) scale(1)"
                        : "translateY(100px) scale(0.95)",
                      opacity: headingAnimated ? 1 : 0,
                      transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
                    }
                  : {}),
              }}
            >
              Enabling e-governance for{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #FF6B35 0%, #FFA07A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                20+ years
              </span>
            </h2>
          </div>

          {/* Instructional Text - Mobile Only */}
          <div
            className="md:hidden flex items-center justify-center gap-1.5 mb-6 relative z-10"
            style={{
              ...(exitPhase1Progress === 0
                ? {
                    transform: subheadingAnimated
                      ? "translateY(0)"
                      : "translateY(30px)",
                    opacity: subheadingAnimated ? 0.5 : 0,
                    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  }
                : getContentExitStyle(0.05)),
            }}
          >
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                border: "1.5px solid rgba(255, 255, 255, 0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "9px",
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.35)",
              }}
            >
              i
            </div>
            <p
              className="font-qanelas-soft text-xs"
              style={{
                color: "rgba(255, 255, 255, 0.4)",
                letterSpacing: "0.02em",
                fontWeight: 400,
              }}
            >
              Tap info icon to know more
            </p>
          </div>

          {/* Mobile: Vertical List Layout */}
          <div
            ref={(el) => {
              tilesRef.current = el;
              mobileTilesContainerRef.current = el;
            }}
            className="flex flex-col gap-4 md:hidden relative z-10"
            style={{
              ...(exitPhase1Progress === 0
                ? {
                    transform: subheadingAnimated
                      ? "translateY(0) scale(1)"
                      : "translateY(75px) scale(0.75)",
                    opacity: subheadingAnimated ? 1 : 0,
                    transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
                  }
                : getContentExitStyle(0.1)),
            }}
          >
            {stats.map((stat, index) => {
              const isExpanded = activeMobileInfo === index;

              return (
                <div
                  key={index}
                  className="relative rounded-2xl px-4 py-4 transition-all duration-500 overflow-hidden"
                  style={getMobileCardStyle(index, isExpanded)}
                  onClick={() => setActiveMobileInfo(isExpanded ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    {/* SVG Icon on Left */}
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 mr-4">
                      {stat.icon}
                    </div>

                    {/* Number + Label in center */}
                    <div className="flex-grow flex flex-col justify-center min-w-0">
                      <Odometer
                        value={stat.value}
                        isVisible={subheadingAnimated}
                        className="font-qanelas-soft font-bold text-2xl"
                        style={{
                          color: "#FFFFFF",
                          letterSpacing: "-0.02em",
                        }}
                      />
                      <div className="font-qanelas-soft text-xs text-white/70 mt-1 truncate">
                        {stat.label}
                      </div>
                    </div>

                    {/* Right side: Info Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMobileInfo(isExpanded ? null : index);
                      }}
                      className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 active:scale-95 transition-all"
                    >
                      <Info
                        size={18}
                        className="transition-colors"
                        style={{
                          color: isExpanded ? "#FF6B35" : "rgba(255, 255, 255, 0.55)",
                        }}
                      />
                    </button>
                  </div>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-white/5 text-xs text-white/80 leading-relaxed font-normal animate-fadeIn">
                      {stat.detail}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop: Grid Layout */}
          <div
            className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 xl:gap-12 max-w-[1550px] mx-auto w-full px-4 relative z-10"
            style={{
              ...(exitPhase1Progress === 0
                ? {
                    transform: subheadingAnimated
                      ? "translateY(0)"
                      : "translateY(75px)",
                    opacity: subheadingAnimated ? 1 : 0,
                    transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
                  }
                : getContentExitStyle(0.1)),
            }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative rounded-2xl px-8 py-12 lg:px-10 lg:py-20 flex flex-col items-center cursor-pointer"
                style={getCardStyle(index)}
                onMouseEnter={() => setHoveredTile(index)}
                onMouseLeave={() => setHoveredTile(null)}
              >
                {/* SVG Icon Container */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 p-2 shadow-inner">
                    {stat.icon}
                  </div>
                </div>

                {/* Stat Value */}
                <div className="flex items-center justify-center h-[50px] mb-2">
                  <Odometer
                    value={stat.value}
                    isVisible={subheadingAnimated}
                    className="font-qanelas-soft font-bold text-4xl lg:text-5xl"
                    style={{
                      color: "#FFFFFF",
                      letterSpacing: "-0.02em",
                    }}
                  />
                </div>

                {/* Animated Accent Line */}
                <div className="flex justify-center my-4 w-full">
                  <div
                    className="transition-all duration-500"
                    style={{
                      width: hoveredTile === index ? "60px" : "30px",
                      height: "3px",
                      background: index % 2 === 0 ? "#FF6B35" : "#0B3D91",
                      borderRadius: "2px",
                    }}
                  />
                </div>

                {/* Stat Label */}
                <div className="flex items-start justify-center min-h-[50px] mt-2">
                  <div className="font-qanelas-soft font-medium text-sm lg:text-base text-center leading-tight text-white/80">
                    {stat.label}
                  </div>
                </div>

                {/* Hover Popup Detail */}
                {hoveredTile === index && !isScrolling && (
                  <div
                    className="absolute bottom-full left-1/2 mb-4 w-72 px-6 py-4 rounded-xl pointer-events-none z-50 text-center"
                    style={{
                      transform: "translateX(-50%)",
                      background: "rgba(10, 15, 30, 0.95)",
                      boxShadow: `0 12px 32px rgba(0, 0, 0, 0.65), 0 0 1px rgba(255, 255, 255, 0.2) inset, 0 4px 20px rgba(${index % 2 === 0 ? "255, 107, 53" : "11, 61, 145"}, 0.15)`,
                      border: `1px solid ${index % 2 === 0 ? "#FF6B35" : "#0B3D91"}`,
                      backdropFilter: "blur(16px)",
                      animation: "fadeSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                    }}
                  >
                    <p className="font-qanelas-soft text-xs leading-relaxed text-white/90 font-medium">
                      {stat.detail}
                    </p>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-6px",
                        left: "50%",
                        width: "12px",
                        height: "12px",
                        background: "rgba(10, 15, 30, 0.95)",
                        border: `1px solid ${index % 2 === 0 ? "#FF6B35" : "#0B3D91"}`,
                        borderTop: "none",
                        borderLeft: "none",
                        transform: "translateX(-50%) rotate(45deg)",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Instructional Text - Desktop Only */}
          <div
            className="hidden md:flex justify-center mt-12 relative z-10"
            style={exitPhase1Progress > 0 ? getContentExitStyle(0.15) : {}}
          >
            <p
              className="font-qanelas-soft text-sm"
              style={{
                color: "rgba(255, 255, 255, 0.35)",
                letterSpacing: "0.02em",
                fontWeight: 400,
              }}
            >
              Hover on stats to know more
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
