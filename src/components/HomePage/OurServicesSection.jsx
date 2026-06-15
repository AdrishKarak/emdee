"use client";

import { motion } from "motion/react";
import {
  Server,
  Workflow,
  Code,
  Users,
  Shield,
  Wrench,
  Leaf,
  Sparkles,
} from "lucide-react";

const coreServices = [
  {
    id: 1,
    title: "IT Infrastructure",
    subtitle: "System Integration",
    icon: Server,
    gradient: "from-[#FF6B35]/20 to-[#FF6B35]/5",
    iconColor: "#FF6B35",
    href: "/it-infra",
  },
  {
    id: 2,
    title: "IT Enabled Services",
    subtitle: "E-governance Operations",
    icon: Workflow,
    gradient: "from-[#FF6B35]/20 to-[#FF6B35]/5",
    iconColor: "#FF6B35",
    href: "/ites",
  },
  {
    id: 3,
    title: "Software Development",
    subtitle: "Custom Solutions",
    icon: Code,
    gradient: "from-[#FF6B35]/20 to-[#FF6B35]/5",
    iconColor: "#FF6B35",
    href: "/software",
  },
  {
    id: 4,
    title: "IT Manpower",
    subtitle: "BPO & IT Personnel",
    icon: Users,
    gradient: "from-[#0B3D91]/20 to-[#0B3D91]/5",
    iconColor: "#0B3D91",
    href: "/manpower",
  },
  {
    id: 5,
    title: "Security & Surveillance",
    subtitle: "Protection Systems",
    icon: Shield,
    gradient: "from-[#0B3D91]/20 to-[#0B3D91]/5",
    iconColor: "#0B3D91",
    href: "/security",
  },
  {
    id: 6,
    title: "IT Maintenance",
    subtitle: "AMC Services",
    icon: Wrench,
    gradient: "from-[#0B3D91]/20 to-[#0B3D91]/5",
    iconColor: "#0B3D91",
    href: "/amc",
  },
];

const newVentures = [
  {
    id: 7,
    title: "Sustainability-Led Infrastructure",
    subtitle: "Solar EPC · EV Charging · Waste Management",
    icon: Leaf,
    gradient: "from-[#22C55E]/20 to-[#22C55E]/5",
    iconColor: "#22C55E",
    href: "/new-ventures#sustainability-infrastructure",
  },
  {
    id: 8,
    title: "Zuneko Labs",
    subtitle:
      "AI & Automation · Enterprise Tech · Computer Vision · Frappe ERP · Custom Software",
    icon: Sparkles,
    gradient: "from-[#A855F7]/20 to-[#A855F7]/5",
    iconColor: "#A855F7",
    href: "/b2b",
  },
];

export function OurServicesSection() {
  return (
    <div
      id="our-services"
      className="relative bg-[#0A0A0A] py-20 lg:py-32 px-6 lg:px-16"
    >
      {/* Section Title */}
      <motion.h2
        className="text-4xl md:text-5xl lg:text-6xl font-qanelas-soft font-extrabold text-center mb-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          background: "linear-gradient(to bottom, #0B3D91 0%, #1a1a1a 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Our Services
      </motion.h2>

      {/* Subheading */}
      <motion.p
        className="text-base md:text-lg text-white/70 text-center mb-16 lg:mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Our <strong>core</strong> and <strong>diversified</strong> value
        propositions
      </motion.p>

      {/* Services Grid */}
      <div className="max-w-[1400px] mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-8 items-start">
          {/* Left side: 6 boxes in 3x2 grid */}
          <div className="flex-1 grid grid-cols-3 gap-4">
            {coreServices.map((service, index) => (
              <ServiceTile key={service.id} service={service} index={index} />
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center h-full py-4">
            <div className="w-[1px] h-[340px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          </div>

          {/* Right side: 2 boxes in 1x2 grid */}
          <div className="w-[280px] flex flex-col gap-4">
            {newVentures.map((venture, index) => (
              <NewVentureTile
                key={venture.id}
                venture={venture}
                index={index + 6}
              />
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden space-y-6">
          {/* Core services - 2 column grid */}
          <div className="grid grid-cols-2 gap-4">
            {coreServices.map((service, index) => (
              <ServiceTile
                key={service.id}
                service={service}
                index={index}
                isMobile
              />
            ))}
          </div>

          {/* Divider */}
          <div className="py-2">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* New ventures - 2 column grid to match the squares above */}
          <div className="grid grid-cols-2 gap-4">
            {newVentures.map((venture, index) => (
              <NewVentureTile
                key={venture.id}
                venture={venture}
                index={index + 6}
                isMobile
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Service Tile Component - Redesigned
function ServiceTile({ service, index, isMobile = false }) {
  const Icon = service.icon;
  const Component = service.href ? "a" : "div";

  // Mobile-specific subtitle override
  const getSubtitle = () => {
    if (isMobile && service.id === 2) {
      return "E-governance Ops.";
    }
    return service.subtitle;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Component
        href={service.href}
        className={`
          group relative overflow-hidden
          ${isMobile ? "h-[160px]" : "h-[165px]"}
          bg-[#0F0F0F]
          border border-[#1A1A1A]
          rounded-xl
          p-5
          flex flex-col items-start justify-between
          hover:border-[#2A2A2A]
          hover:bg-[#121212]
          transition-all duration-500 ease-out
          ${service.href ? "cursor-pointer" : ""}
          select-none
        `}
      >
        {/* Background gradient overlay - appears on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full justify-between w-full">
          {/* Icon */}
          <div className="flex items-start justify-between w-full">
            <div className="p-2.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
              <Icon
                size={isMobile ? 22 : 24}
                style={{ color: service.iconColor }}
                strokeWidth={1.8}
              />
            </div>

            {/* Arrow indicator for clickable tiles */}
            {service.href && (
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-white/40"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Text */}
          <div>
            <h3 className="text-white font-qanelas-soft font-bold text-base mb-1 leading-tight">
              {service.title}
            </h3>
            <p className="text-white/50 text-xs leading-tight">
              {getSubtitle()}
            </p>
          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </Component>
    </motion.div>
  );
}

// New Venture Tile Component - Redesigned
function NewVentureTile({ venture, index, isMobile = false }) {
  const Icon = venture.icon;

  // Mobile-specific subtitle override
  const getSubtitle = () => {
    if (isMobile && venture.id === 8) {
      return "AI & Automation · Enterprise Tech · Computer Vision · Frappe ERP · Custom Software";
    }
    return venture.subtitle;
  };

  // Mobile-specific title override
  const getTitle = () => {
    if (isMobile && venture.id === 7) {
      return "Sustainability-led Infrastructure";
    }
    return venture.title;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <a
        href={venture.href}
        className={`
          group relative overflow-hidden block
          ${isMobile ? "h-[210px] p-5" : "h-[165px] p-5"}
          bg-[#0F0F0F]
          border border-[#1A1A1A]
          rounded-xl
          hover:border-[#2A2A2A]
          hover:bg-[#121212]
          transition-all duration-500 ease-out
          cursor-pointer
          select-none
        `}
      >
        {/* Background gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${venture.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full w-full">
          {/* Icon and Arrow */}
          <div className="flex items-start justify-between w-full">
            <div
              className={`${isMobile ? "p-1" : "p-2.5"} rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-300`}
            >
              <Icon
                size={isMobile ? 22 : 24}
                style={{ color: venture.iconColor }}
                strokeWidth={1.8}
              />
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-white/40"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Text */}
          <div className={isMobile ? "mt-6" : "mt-auto"}>
            <h3
              className={`text-white font-qanelas-soft font-bold leading-tight ${isMobile ? "text-[14.5px] mb-5" : "text-base mb-1.5"}`}
            >
              {getTitle()}
            </h3>
            <p
              className={`text-white/50 ${isMobile ? "text-[11.5px] leading-[1.6]" : "text-[11px] leading-relaxed"}`}
            >
              {getSubtitle()}
            </p>
          </div>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </a>
    </motion.div>
  );
}
