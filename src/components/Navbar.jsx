import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Menu,
  X,
  ChevronDown,
  Server,
  Workflow,
  Code,
  Users,
  Shield,
  Wrench,
  FileCheck,
  Bell,
  Upload,
} from "lucide-react";

export default function Navbar({ variant = "default" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState(null);
  const [hideTimeout, setHideTimeout] = useState(null);
  const [mounted, setMounted] = useState(false);

  const services = [
    {
      id: 1,
      title: "IT Infrastructure (System Integration)",
      titleDesktop: (
        <>
          IT Infrastructure
          <br />
          (System Integration)
        </>
      ),
      icon: Server,
      href: "/it-infra",
    },
    { id: 2, title: "IT Enabled Services", icon: Workflow, href: "/ites" },
    { id: 3, title: "Software Development", icon: Code, href: "/software" },
    { id: 4, title: "IT Manpower (BPO)", icon: Users, href: "/manpower" },
    {
      id: 5,
      title: "Security & Surveillance",
      icon: Shield,
      href: "/security",
    },
    { id: 6, title: "IT Maintenance (AMC)", icon: Wrench, href: "/amc" },
  ];

  const tenderItems = [
    { id: 1, title: "Vendor KYC", icon: FileCheck, href: "/vendors" },
    { id: 2, title: "Tender Notice", icon: Bell, href: "/tender-notice" },
    { id: 3, title: "Tender Submission", icon: Upload, href: "/tender-sub" },
  ];

  // Handle hover with delay for cursor-forgiving behavior
  const handleMouseEnter = (menuName) => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setActiveSubmenu(menuName);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveSubmenu(null);
    }, 300);
    setHideTimeout(timeout);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMobileExpandedMenu(null);
  };

  const toggleMobileSubmenu = (menuName) => {
    setMobileExpandedMenu(mobileExpandedMenu === menuName ? null : menuName);
  };

  // Ensure component is mounted (for portal)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Determine navbar background classes based on variant
  const navbarClasses =
    variant === "glass"
      ? "bg-[#0A0A0A]/70 backdrop-blur-sm border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      : "bg-[#0A0A0A]/70 backdrop-blur-sm border-b border-[#1F1F1F]/40";

  // Mobile menu content
  const mobileMenuContent =
    isMobileMenuOpen && mounted ? (
      <div
        className="lg:hidden fixed inset-0 z-[10000] bg-[#0A0A0A] overflow-y-auto font-qanelas-soft"
        style={{
          top: "80px",
          left: 0,
          right: 0,
          bottom: 0,
          position: "fixed",
          display: "block",
          visibility: "visible",
          opacity: 1,
        }}
      >
        <div className="px-4 py-6 space-y-1.5">
          {/* About Us */}
          <a
            href="/about"
            className="block px-4 py-2.5 text-[15px] font-medium text-[#E5E5E5] hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            onClick={toggleMobileMenu}
          >
            About Us
          </a>

          {/* Services with Dropdown */}
          <div>
            <button
              onClick={() => toggleMobileSubmenu("services")}
              className="w-full flex items-center justify-between px-4 py-2.5 text-[15px] font-medium text-[#E5E5E5] hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Services
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${mobileExpandedMenu === "services" ? "rotate-180" : ""}`}
              />
            </button>
            {mobileExpandedMenu === "services" && (
              <div className="mt-2 ml-2 space-y-1.5">
                {services.map((service) => {
                  const Icon = service.icon;
                  const iconColor = service.id >= 4 ? "#0B3D91" : "#FF6B35";
                  const Component = service.href ? "a" : "button";
                  return (
                    <Component
                      key={service.id}
                      href={service.href}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg border border-[#2A2A2A] bg-[#0F0F0F] hover:bg-[#262626] transition-all duration-200"
                      onClick={toggleMobileMenu}
                    >
                      <Icon
                        size={21}
                        style={{ color: iconColor }}
                        className="flex-shrink-0"
                        strokeWidth={1.5}
                      />
                      <span className="text-[14px] font-medium text-[#E5E5E5] text-left leading-tight">
                        {service.title}
                      </span>
                    </Component>
                  );
                })}
              </div>
            )}
          </div>

          {/* B2B */}
          <a
            href="/b2b"
            className="block px-4 py-2.5 text-[15px] font-medium text-[#E5E5E5] hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            onClick={toggleMobileMenu}
          >
            B2B
          </a>

          {/* New Ventures */}
          <a
            href="/new-ventures"
            className="block px-4 py-2.5 text-[15px] font-medium text-[#E5E5E5] hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            onClick={toggleMobileMenu}
          >
            New Ventures
          </a>

          {/* Career */}
          <a
            href="/career"
            className="block px-4 py-2.5 text-[15px] font-medium text-[#E5E5E5] hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            onClick={toggleMobileMenu}
          >
            Career
          </a>

          {/* Tender with Dropdown */}
          <div>
            <button
              onClick={() => toggleMobileSubmenu("tender")}
              className="w-full flex items-center justify-between px-4 py-2.5 text-[15px] font-medium text-[#E5E5E5] hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Tender
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${mobileExpandedMenu === "tender" ? "rotate-180" : ""}`}
              />
            </button>
            {mobileExpandedMenu === "tender" && (
              <div className="mt-2 ml-2 space-y-1.5">
                {tenderItems.map((item) => {
                  const Icon = item.icon;
                  const iconColor = item.id === 2 ? "#FF6B35" : "#0B3D91";
                  const Component = item.href ? "a" : "button";
                  return (
                    <Component
                      key={item.id}
                      href={item.href}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg border border-[#2A2A2A] bg-[#0F0F0F] hover:bg-[#262626] transition-all duration-200"
                      onClick={toggleMobileMenu}
                    >
                      <Icon
                        size={21}
                        style={{ color: iconColor }}
                        className="flex-shrink-0"
                        strokeWidth={1.5}
                      />
                      <span className="text-[14px] font-medium text-[#E5E5E5] text-left leading-tight">
                        {item.title}
                      </span>
                    </Component>
                  );
                })}
              </div>
            )}
          </div>

          {/* Contact Us CTA - Qanelas Soft SemiBold */}
          <a
            href="/contact"
            className="block mt-4 px-4 py-2.5 text-[15px] font-semibold bg-gradient-to-b from-[#FF6B35] to-[#E55A28] text-white rounded-lg hover:from-[#FF7A45] hover:to-[#F56838] transition-all duration-200 text-center"
            onClick={toggleMobileMenu}
          >
            Contact Us
          </a>
        </div>
      </div>
    ) : null;

  return (
    <>
      <nav className={`${navbarClasses} font-qanelas-soft`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/">
                <img
                  src="https://ucarecdn.com/f74e0ffb-9698-44b5-bc68-9083a8fd14c5/-/format/auto/"
                  alt="ENVEEE Logo"
                  className="h-[70px] lg:h-[77px] lg:-mt-[10px] w-auto desktop-logo-outline"
                />
              </a>
            </div>

            {/* Desktop Navigation - All Qanelas Soft Medium */}
            <div className="hidden lg:flex items-center space-x-1">
              {/* About Us */}
              <a
                href="/about"
                className="px-5 py-2.5 text-[15px] font-medium text-[#E5E5E5] hover:text-white transition-all duration-200 hover:bg-white/5 rounded-lg"
              >
                About Us
              </a>

              {/* Services with Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("services")}
                onMouseLeave={handleMouseLeave}
              >
                <button className="px-5 py-2.5 text-[15px] font-medium text-[#E5E5E5] hover:text-white transition-all duration-200 hover:bg-white/5 rounded-lg flex items-center gap-1.5">
                  Services
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${activeSubmenu === "services" ? "rotate-180" : ""}`}
                  />
                </button>

                {activeSubmenu === "services" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[782px] max-w-[calc(100vw-3rem)] bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl shadow-2xl p-7">
                    <div className="grid grid-cols-3 gap-5">
                      {services.map((service) => {
                        const Icon = service.icon;
                        const iconColor =
                          service.id >= 4 ? "#0B3D91" : "#FF6B35";
                        const Component = service.href ? "a" : "button";
                        return (
                          <Component
                            key={service.id}
                            href={service.href}
                            className="flex flex-col items-center justify-center p-6 rounded-lg border border-[#2A2A2A] bg-[#0F0F0F] hover:bg-[#262626] hover:border-[#404040] transition-all duration-200 group"
                          >
                            <Icon
                              size={37}
                              className="mb-3.5 group-hover:scale-110 transition-transform duration-200"
                              style={{ color: iconColor }}
                              strokeWidth={1.5}
                            />
                            <span
                              className={`${service.id === 1 ? "text-[16px]" : "text-[17px]"} font-medium text-[#E5E5E5] text-center leading-tight`}
                            >
                              {service.titleDesktop || service.title}
                            </span>
                          </Component>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* B2B */}
              <a
                href="/b2b"
                className="px-5 py-2.5 text-[15px] font-medium text-[#E5E5E5] hover:text-white transition-all duration-200 hover:bg-white/5 rounded-lg"
              >
                B2B
              </a>

              {/* New Ventures */}
              <a
                href="/new-ventures"
                className="px-5 py-2.5 text-[15px] font-medium text-[#E5E5E5] hover:text-white transition-all duration-200 hover:bg-white/5 rounded-lg"
              >
                New Ventures
              </a>

              {/* Career */}
              <a
                href="/career"
                className="px-5 py-2.5 text-[15px] font-medium text-[#E5E5E5] hover:text-white transition-all duration-200 hover:bg-white/5 rounded-lg"
              >
                Career
              </a>

              {/* Tender with Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("tender")}
                onMouseLeave={handleMouseLeave}
              >
                <button className="px-5 py-2.5 text-[15px] font-medium text-[#E5E5E5] hover:text-white transition-all duration-200 hover:bg-white/5 rounded-lg flex items-center gap-1.5">
                  Tender
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${activeSubmenu === "tender" ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Tender Mega Menu - Increased by 15% */}
                {activeSubmenu === "tender" && (
                  <div className="absolute top-full right-0 mt-2 w-[517px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl shadow-2xl p-7">
                    <div className="grid grid-cols-3 gap-[18px]">
                      {tenderItems.map((item) => {
                        const Icon = item.icon;
                        const iconColor = item.id === 2 ? "#FF6B35" : "#0B3D91";
                        const Component = item.href ? "a" : "button";
                        return (
                          <Component
                            key={item.id}
                            href={item.href}
                            className="flex flex-col items-center justify-center p-6 rounded-lg border border-[#2A2A2A] bg-[#0F0F0F] hover:bg-[#262626] hover:border-[#404040] transition-all duration-200 group"
                          >
                            <Icon
                              size={37}
                              className="mb-3.5 group-hover:scale-110 transition-transform duration-200"
                              style={{ color: iconColor }}
                              strokeWidth={1.5}
                            />
                            <span className="text-[15px] font-medium text-[#E5E5E5] text-center leading-tight">
                              {item.title}
                            </span>
                          </Component>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Us CTA - Qanelas Soft SemiBold */}
              <a
                href="/contact"
                className="ml-4 px-6 py-2.5 text-[15px] font-semibold bg-gradient-to-b from-[#FF6B35] to-[#E55A28] text-white rounded-lg hover:from-[#FF7A45] hover:to-[#F56838] transition-all duration-200 active:scale-95"
              >
                Contact Us
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X size={28} className="text-white" strokeWidth={2} />
              ) : (
                <Menu size={28} className="text-white" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          MOBILE MENU PANEL - RENDERED VIA PORTAL TO DOCUMENT.BODY
          ═══════════════════════════════════════════════════════════
          Escapes ALL parent constraints (overflow, transform, etc.)
          ═══════════════════════════════════════════════════════════ */}
      {mounted && createPortal(mobileMenuContent, document.body)}

      <style jsx>{`
        @media (min-width: 1024px) {
          .desktop-logo-outline {
            filter: brightness(1.15) 
                    drop-shadow(1px 0 0 rgba(255, 255, 255, 0.4)) 
                    drop-shadow(-1px 0 0 rgba(255, 255, 255, 0.4)) 
                    drop-shadow(0 1px 0 rgba(255, 255, 255, 0.4)) 
                    drop-shadow(0 -1px 0 rgba(255, 255, 255, 0.4));
          }
        }
      `}</style>
    </>
  );
}
