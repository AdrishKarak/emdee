import { Diamond, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function TeamSection() {
  const [titleVisible, setTitleVisible] = useState(false);
  const [row1Visible, setRow1Visible] = useState(false);
  const [legendVisible, setLegendVisible] = useState(false);
  const [row2Visible, setRow2Visible] = useState(false);
  const [row3Visible, setRow3Visible] = useState(false);
  const [row4Visible, setRow4Visible] = useState(false);
  const [row5Visible, setRow5Visible] = useState(false);
  const [row5MobileVisible, setRow5MobileVisible] = useState(false);
  const [mobileGridVisible, setMobileGridVisible] = useState(false);

  const titleRef = useRef(null);
  const row1Ref = useRef(null);
  const legendRef = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const row4Ref = useRef(null);
  const row5Ref = useRef(null);
  const row5MobileRef = useRef(null);
  const mobileGridRef = useRef(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };

    const createObserver = (ref, setVisible) => {
      const observer = new IntersectionObserver(([entry]) => {
        setVisible(entry.isIntersecting);
      }, observerOptions);

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    };

    const observers = [
      createObserver(titleRef, setTitleVisible),
      createObserver(row1Ref, setRow1Visible),
      createObserver(legendRef, setLegendVisible),
      createObserver(row2Ref, setRow2Visible),
      createObserver(row3Ref, setRow3Visible),
      createObserver(row4Ref, setRow4Visible),
      createObserver(row5Ref, setRow5Visible),
      createObserver(row5MobileRef, setRow5MobileVisible),
      createObserver(mobileGridRef, setMobileGridVisible),
    ];

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const row1 = [
    {
      name: "Malay Das",
      designation: "Managing Director",
      size: "large",
      image:
        "https://ucarecdn.com/89e2f7ce-6988-4b09-a69a-04791baac40d/-/format/auto/",
    },
    {
      name: "Manash Das",
      designation: "Director",
      size: "large",
      image:
        "https://ucarecdn.com/2e09cb88-7a58-4c66-8f45-66af5c2dae2f/-/format/auto/",
    },
    {
      name: "Jaya Das Chatterjee",
      designation: "Director (non-exec)",
      size: "medium",
      image:
        "https://ucarecdn.com/0ceacd04-75ce-4c29-92ac-c22fe0cce1bf/-/format/auto/",
    },
  ];

  const row2 = [
    {
      name: "Debesh Kumar Das",
      designation: "Chief Executive Officer",
      image:
        "https://ucarecdn.com/089202a0-5cea-4f30-aa89-60e10412c7fb/-/format/auto/",
    },
    {
      name: "MD Samimuddin",
      designation: "Deputy General Manager (BD)",
      image:
        "https://ucarecdn.com/f529d16b-6f45-4480-b77a-eb23e884f664/-/format/auto/",
      badge: "diamond",
    },
    {
      name: "Debashis Roy",
      designation: "Deputy General Manager (BD)",
      image:
        "https://ucarecdn.com/fcfdf04c-974e-4999-a20f-c6f47d124be2/-/format/auto/",
      badge: "golden-star",
    },
    {
      name: "Chinmoy Kar",
      designation: "Senior Manager (BD)",
      image:
        "https://ucarecdn.com/bf3942b1-d366-47dc-9ada-5ea1b355cc1e/-/format/auto/",
      badge: "diamond",
    },
    {
      name: "Manash Mondal",
      designation: "Senior Manager (Ops)",
      image:
        "https://ucarecdn.com/f4718229-201b-448a-8d73-3e059d89ef7c/-/format/auto/",
      badge: "golden-star",
    },
  ];

  const row3 = [
    {
      name: "Tarun Kanti Mondal",
      designation: "Manager (Ops)",
      image:
        "https://ucarecdn.com/2cd77183-5fe9-436d-8827-c16c9670fe5b/-/format/auto/",
      badge: "diamond",
    },
    {
      name: "Ujjwal Singha",
      designation: "Manager (Ops)",
      image:
        "https://ucarecdn.com/ddf918c8-d4ce-43a0-be3d-76cd94f730e7/-/format/auto/",
      badge: "diamond",
    },
    {
      name: "Debashish Mondal",
      designation: "Manager (Ops)",
      image:
        "https://ucarecdn.com/a1145494-a63c-4b30-8efb-87ce6750ddf9/-/format/auto/",
      badge: "golden-star",
    },
    {
      name: "Sumit Kumar Singh",
      designation: "Head (Finance)",
      image:
        "https://ucarecdn.com/4bca7249-4613-42ff-b0f3-dd63b4be187e/-/format/auto/",
    },
    {
      name: "Maitreyo Das",
      designation: "Head of Growth",
      image:
        "https://dtvoeevhaseb5.cloudfront.net/user-uploads/63d89153-23c3-41d1-9bde-f71dd0449ae8.png",
    },
  ];

  const row4 = [
    {
      name: "Rupashi Ghosh",
      designation: "Manager (Accounts)",
      image:
        "https://ucarecdn.com/48517d59-c005-403a-b52b-2b92b84c76ad/-/format/auto/",
      badge: "silver-star",
    },
    {
      name: "Pinaki Ganguly",
      designation: "Manager (Ops)",
      image:
        "https://ucarecdn.com/f894154e-f9d5-48a3-aeb1-e7cddb24f7aa/-/format/auto/",
      badge: "silver-star",
    },
    {
      name: "Indrani Roy",
      designation: "Manager (Purchases)",
      image:
        "https://ucarecdn.com/2415c814-939d-48b6-bc25-86060ed36fbb/-/format/auto/",
      badge: "silver-star",
    },
    {
      name: "Satyajit Bagchi",
      designation: "Manager (BD)",
      image:
        "https://ucarecdn.com/4c31dced-a2f3-4025-97a0-e8a1dc507fa0/-/format/auto/",
    },
    {
      name: "Arpita Kar",
      designation: "Manager (HR)",
      image:
        "https://ucarecdn.com/1a77ac10-c9c2-49c2-999d-b0eff7227ccb/-/format/auto/",
    },
    {
      name: "Hemanta Das",
      designation: "Manager (Ops)",
      image:
        "https://ucarecdn.com/bae78cdc-c9da-4e36-8555-cf2aa569a322/-/format/auto/",
    },
    {
      name: "Prabir Kar",
      designation: "Manager (Project)",
      image:
        "https://ucarecdn.com/71f2cb77-519e-413d-8a0f-d9ec0a626514/-/format/auto/",
      badge: "silver-star",
    },
  ];

  const row5Group1 = [
    { name: "Kumar Sashi Ranjan", designation: "Manager (BD - Bihar)" },
    { name: "Naba Kumar Das", designation: "Manager (Waste Mgmt. SBU)" },
  ];

  const row5Group2 = [
    {
      name: "Tarak Chandra Das",
      designation: "MT Staff",
      badge: "golden-star",
    },
    { name: "Subhash Mondal", designation: "Assistant", badge: "golden-star" },
    { name: "Amwarish Singha", designation: "Assistant", badge: "golden-star" },
    { name: "Assottom Ghosh", designation: "Assistant", badge: "golden-star" },
  ];

  const ProfileCircle = ({
    name,
    designation,
    size = "default",
    image,
    badge,
  }) => {
    const sizeClasses = {
      large: "w-[140px] h-[140px] md:w-[180px] md:h-[180px]",
      medium: "w-[120px] h-[120px] md:w-[140px] md:h-[140px]",
      default: "w-[100px] h-[100px] md:w-[120px] md:h-[120px]",
      small: "w-[80px] h-[80px] md:w-[90px] md:h-[90px]",
    };

    const badgeSizeClasses = {
      large: "w-[10px] h-[10px] md:w-[12px] md:h-[12px]",
      medium: "w-[10px] h-[10px] md:w-[12px] md:h-[12px]",
      default: "w-[10px] h-[10px] md:w-[12px] md:h-[12px]",
      small: "w-[8px] h-[8px] md:w-[10px] md:h-[10px]",
    };

    const badgeConfig = {
      diamond: { icon: Diamond, color: "#38BDF8" },
      "golden-star": { icon: Star, color: "#FCD34D" },
      "silver-star": { icon: Star, color: "#C0C0C0" },
    };

    const BadgeIcon = badge ? badgeConfig[badge]?.icon : null;
    const badgeColor = badge ? badgeConfig[badge]?.color : null;

    return (
      <div className="flex flex-col items-center gap-3 group cursor-pointer">
        <div className="relative">
          <div
            className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-[#0B3D91]/20 to-[#FF6B35]/10 border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[#FF6B35]/50 group-hover:shadow-[0_0_25px_rgba(255,107,53,0.2)]`}
          >
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-[#07090E]/60 flex items-center justify-center">
                <svg
                  className="w-1/2 h-1/2 text-white/20"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
          {BadgeIcon && (
            <div className="absolute -top-1 -right-1 bg-[#07090E]/80 backdrop-blur-sm rounded-full p-1 border border-white/10 shadow-lg">
              <BadgeIcon
                className={badgeSizeClasses[size]}
                style={{ color: badgeColor }}
                fill={badgeColor}
              />
            </div>
          )}
        </div>
        <div className="text-center w-full">
          <div className="text-white font-medium text-sm md:text-base transition-colors duration-300 group-hover:text-[#FF6B35]">
            {name}
          </div>
          <div className="text-[#999999] text-xs md:text-sm mt-1 transition-colors duration-300 group-hover:text-white/60">
            {designation}
          </div>
        </div>
      </div>
    );
  };

  const TextProfile = ({ name, designation, size = "default", badge }) => {
    const sizeClasses = {
      default: "text-xs md:text-base",
      small: "text-xs md:text-[13.6px]",
    };

    const designationSizeClasses = {
      default: "text-[11px] md:text-sm",
      small: "text-[11px] md:text-[11.9px]",
    };

    const badgeConfig = {
      diamond: { icon: Diamond, color: "#38BDF8" },
      "golden-star": { icon: Star, color: "#FCD34D" },
      "silver-star": { icon: Star, color: "#C0C0C0" },
    };

    const BadgeIcon = badge ? badgeConfig[badge]?.icon : null;
    const badgeColor = badge ? badgeConfig[badge]?.color : null;

    return (
      <div className="text-center py-1">
        {BadgeIcon && (
          <div className="flex justify-center mb-1">
            <BadgeIcon
              className="w-[9px] h-[9px] opacity-60"
              style={{ color: badgeColor }}
              fill={badgeColor}
            />
          </div>
        )}
        <div className={`text-white ${sizeClasses[size]}`}>{name}</div>
        <div className={`text-[#888888] ${designationSizeClasses[size]}`}>
          {designation}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-transparent py-16 md:py-24 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Subtitle Pill Badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
            <span className="text-[10px] font-semibold tracking-[0.2em] text-white/70 uppercase">
              OUR PEOPLE
            </span>
          </div>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-3xl md:text-5xl font-bold text-white text-center mb-12 md:mb-16 transition-all duration-[2000ms] ease-in-out"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          Our Team
        </h2>

        {/* Row 1 - Desktop: 3 horizontal, Mobile: 3 vertical */}
        <div
          ref={row1Ref}
          className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mb-12 md:mb-[2.52rem] transition-all duration-[2000ms] ease-in-out"
          style={{
            opacity: row1Visible ? 1 : 0,
            transform: row1Visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {row1.map((profile, idx) => (
            <ProfileCircle key={idx} {...profile} />
          ))}
        </div>

        {/* Loyalty Badge Legend */}
        <div
          ref={legendRef}
          className="max-w-3xl mx-auto mb-24 md:mb-[3.92rem] transition-all duration-[2000ms] ease-in-out"
          style={{
            opacity: legendVisible ? 1 : 0,
            transform: legendVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-2 bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-lg shadow-md">
            <span className="text-[#FF6B35]/70 text-[10px] font-normal tracking-wide">
              Been part of Emdee family...
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <div className="flex items-center gap-1.5">
                <Diamond
                  className="w-[11px] h-[11px]"
                  style={{ color: "#38BDF8" }}
                  fill="#38BDF8"
                />
                <span className="text-[#999999] text-[10px]">since Day 1</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star
                  className="w-[11px] h-[11px]"
                  style={{ color: "#FCD34D" }}
                  fill="#FCD34D"
                />
                <span className="text-[#999999] text-[10px]">20+ years</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star
                  className="w-[11px] h-[11px]"
                  style={{ color: "#C0C0C0" }}
                  fill="#C0C0C0"
                />
                <span className="text-[#999999] text-[10px]">15+ years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only: combined 2x5 grid of row2 + row3 (10 people in pairs) */}
        <div
          ref={mobileGridRef}
          className="grid grid-cols-2 md:hidden gap-8 mb-12 transition-all duration-[2000ms] ease-in-out"
          style={{
            opacity: mobileGridVisible ? 1 : 0,
            transform: mobileGridVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {[...row2, ...row3].map((profile, idx) => (
            <div key={idx} className="flex justify-center">
              <ProfileCircle {...profile} />
            </div>
          ))}
        </div>

        {/* Row 2 - Desktop only: 5 horizontal */}
        <div
          ref={row2Ref}
          className="hidden md:flex md:flex-row md:justify-center md:items-start gap-8 md:gap-6 mb-12 md:mb-16 transition-all duration-[2000ms] ease-in-out"
          style={{
            opacity: row2Visible ? 1 : 0,
            transform: row2Visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {row2.map((profile, idx) => (
            <div key={idx} className="md:w-[184px] flex justify-center">
              <ProfileCircle {...profile} />
            </div>
          ))}
        </div>

        {/* Row 3 - Desktop only: 5 horizontal */}
        <div
          ref={row3Ref}
          className="hidden md:flex md:flex-row md:justify-center md:items-start gap-8 md:gap-6 mb-12 md:mb-16 transition-all duration-[2000ms] ease-in-out"
          style={{
            opacity: row3Visible ? 1 : 0,
            transform: row3Visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {row3.map((profile, idx) => (
            <div key={idx} className="md:w-[184px] flex justify-center">
              <ProfileCircle {...profile} />
            </div>
          ))}
        </div>

        {/* Row 4 - Desktop: 8 horizontal, Mobile: thin vertical tiles without pictures */}
        <div ref={row4Ref}>
          <div
            className="hidden md:flex md:flex-row md:justify-center md:items-center md:flex-wrap gap-6 md:gap-12 mb-12 md:mb-16 transition-all duration-[2000ms] ease-in-out"
            style={{
              opacity: row4Visible ? 1 : 0,
              transform: row4Visible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            {row4.map((profile, idx) => (
              <ProfileCircle key={idx} {...profile} size="small" />
            ))}
          </div>
          <div
            className="flex flex-col md:hidden gap-2.5 mb-12 transition-all duration-[2000ms] ease-in-out"
            style={{
              opacity: row4Visible ? 1 : 0,
              transform: row4Visible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            {row4.map((profile, idx) => {
              const badgeConfig = {
                diamond: { icon: Diamond, color: "#38BDF8" },
                "golden-star": { icon: Star, color: "#FCD34D" },
                "silver-star": { icon: Star, color: "#C0C0C0" },
              };
              const BadgeIcon = profile.badge
                ? badgeConfig[profile.badge]?.icon
                : null;
              const badgeColor = profile.badge
                ? badgeConfig[profile.badge]?.color
                : null;

              return (
                <div
                  key={idx}
                  className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded px-4 py-2.5 flex items-center justify-between hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="text-white text-sm font-medium flex-1">
                    {profile.name} <span className="text-white/20">•</span>{" "}
                    <span className="text-white/60 font-normal">
                      {profile.designation}
                    </span>
                  </div>
                  {BadgeIcon && (
                    <BadgeIcon
                      className="w-[9px] h-[9px] opacity-60 flex-shrink-0 ml-2"
                      style={{ color: badgeColor }}
                      fill={badgeColor}
                    />
                  )}
                </div>
              );
            })}
            {/* Mobile only: Add row5Group1 as tiles */}
            {row5Group1.map((profile, idx) => (
              <div
                key={`row5g1-${idx}`}
                className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded px-4 py-2.5 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="text-white text-sm font-medium">
                  {profile.name} <span className="text-white/20">•</span>{" "}
                  <span className="text-white/60 font-normal">
                    {profile.designation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile only: row5Group2 as 2x2 grid with simple list format */}
        <div
          ref={row5MobileRef}
          className="grid grid-cols-2 md:hidden gap-x-6 gap-y-3 mb-12 transition-all duration-[2000ms] ease-in-out"
          style={{
            opacity: row5MobileVisible ? 1 : 0,
            transform: row5MobileVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {row5Group2.map((profile, idx) => {
            const badgeConfig = {
              diamond: { icon: Diamond, color: "#38BDF8" },
              "golden-star": { icon: Star, color: "#FCD34D" },
              "silver-star": { icon: Star, color: "#C0C0C0" },
            };
            const BadgeIcon = profile.badge
              ? badgeConfig[profile.badge]?.icon
              : null;
            const badgeColor = profile.badge
              ? badgeConfig[profile.badge]?.color
              : null;

            return (
              <div key={idx} className="text-center">
                <div className="text-white text-xs font-medium flex items-center justify-center gap-1">
                  {profile.name}
                  {BadgeIcon && (
                    <BadgeIcon
                      className="w-[8px] h-[8px] opacity-60"
                      style={{ color: badgeColor }}
                      fill={badgeColor}
                    />
                  )}
                </div>
                <div className="text-[#888888] text-[11px] mt-0.5">
                  {profile.designation}
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 5 - Desktop: thin horizontal row with separator */}
        <div
          ref={row5Ref}
          className="hidden md:flex md:flex-row md:justify-center md:items-center md:gap-8 transition-all duration-[2000ms] ease-in-out"
          style={{
            opacity: row5Visible ? 1 : 0,
            transform: row5Visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {row5Group1.map((profile, idx) => (
            <TextProfile key={idx} {...profile} />
          ))}
          <div className="w-px h-12 bg-[#333333]"></div>
          {row5Group2.map((profile, idx) => (
            <TextProfile key={idx} {...profile} size="small" />
          ))}
        </div>

        {/* Special Thanks Text */}
        <div className="mt-16 md:mt-24 text-center px-4">
          <p className="text-[#666666] text-[11.4px] md:text-sm italic opacity-50">
            A special thanks to Late Animesh Dey, Sri Samir Roy and Mr Nitish
            Kumar Das, for being EMDEE's earliest supporters and mentors
          </p>
        </div>
      </div>
    </div>
  );
}
