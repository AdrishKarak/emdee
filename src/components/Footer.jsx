import { Phone, Facebook, Linkedin, Mail, Navigation } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B1929] border-t border-[#1a2f45] font-qanelas-soft">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* 1. Logo, Socials, ISO, CSR */}
          <div className="col-span-2 flex flex-col items-start pr-6 border-r border-[#1a2f45]">
            <a href="/" className="mb-3">
              <img
                src="https://ucarecdn.com/f74e0ffb-9698-44b5-bc68-9083a8fd14c5/-/format/auto/"
                alt="ENVEEE Logo"
                className="h-14 w-auto hover:opacity-80 transition-opacity duration-200"
              />
            </a>
            <div className="flex items-center gap-3 mb-6">
              <a
                href="https://www.linkedin.com/company/emdee-digitronics/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#1a2f45] hover:bg-[#0077B5] text-white transition-all duration-200"
              >
                <Linkedin size={18} strokeWidth={2} />
              </a>
              <a
                href="https://www.facebook.com/edpl123/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#1a2f45] hover:bg-[#1877F2] text-white transition-all duration-200"
              >
                <Facebook size={18} strokeWidth={2} />
              </a>
            </div>
            <a
              href="/#certifications"
              className="hover:opacity-75 transition-opacity duration-200 mb-6"
            >
              <img
                src="https://ucarecdn.com/9f67b653-1a26-4a5f-86d8-d2415e0d8d1b/-/format/auto/"
                alt="ISO Certified"
                className="w-[50px] h-[50px] object-contain rounded-sm"
              />
            </a>
            <a
              href="/#our-impact"
              className="text-xs text-center text-white hover:bg-[#1a2f45] transition-all duration-200 px-3 py-2 rounded-md bg-gradient-to-br from-[#0B3D91]/30 to-[#1a2f45]/30 border border-[#0B3D91]/50 hover:border-[#0B3D91] w-full"
            >
              CSR & Impact
            </a>
          </div>

          {/* 2. Kolkata Addresses */}
          <div className="col-span-3 flex flex-col gap-6 pr-6 border-r border-[#1a2f45]">
            <div className="flex gap-3">
              <a
                href="https://maps.app.goo.gl/aVHFv1tHdH6Y4Gxm6"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg overflow-hidden border border-[#1a2f45] hover:border-[#FF6B35] transition-all duration-300 flex-shrink-0"
                style={{ width: "135px", height: "85px" }}
              >
                <img
                  src="https://ucarecdn.com/87807d95-bf36-4644-a9bc-259af076376b/-/format/auto/"
                  alt="Kolkata HQ Location"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </a>
              <div className="flex flex-col justify-center min-w-0">
                <h4 className="text-sm font-semibold text-[#FF6B35] mb-1.5">
                  Kolkata HQ
                </h4>
                <p className="text-[13px] text-[#B8C5D6] leading-relaxed">
                  DH6/27, Action Area 1D, New Town, Kolkata - 700156
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="https://maps.app.goo.gl/mVii96NDyJSU8Tch9"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg overflow-hidden border border-[#1a2f45] hover:border-[#FF6B35] transition-all duration-300 flex-shrink-0"
                style={{ width: "135px", height: "85px" }}
              >
                <img
                  src="https://ucarecdn.com/06926347-f491-4909-b1f6-d38e2d4fed6c/-/format/auto/"
                  alt="Kolkata 2nd Office Location"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </a>
              <div className="flex flex-col justify-center min-w-0">
                <h4 className="text-sm font-semibold text-[#FF6B35] mb-1.5">
                  Kolkata Office 2
                </h4>
                <p className="text-[13px] text-[#B8C5D6] leading-relaxed">
                  2B, Saraswati Apartment, 114/1 Golaghata Road, Kolkata - 700048
                </p>
              </div>
            </div>
          </div>

          {/* 3. Patna + Pune + Contact Card */}
          <div className="col-span-3 flex flex-col gap-6 pr-6 border-r border-[#1a2f45]">
            <div className="flex gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-[#FF6B35] mb-1.5">
                  Patna Office
                </h4>
                <p className="text-[13px] text-[#B8C5D6] leading-relaxed">
                  ANANDPURI, 6/5, West Boring Canal Road, Patna - 800001
                </p>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-[#FF6B35] mb-1.5">
                  Pune Office
                </h4>
                <p className="text-[13px] text-[#B8C5D6] leading-relaxed">
                  3rd floor, Suratwala Mark Plazzo, Hinjewadi, Pune - 411057
                </p>
              </div>
            </div>
            <div className="bg-[#0d1f33] border border-[#1a2f45] rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Phone
                  size={15}
                  strokeWidth={2}
                  className="text-[#FF6B35] flex-shrink-0"
                />
                <a
                  href="tel:+913340692109"
                  className="text-[13px] text-white hover:text-[#FF6B35] transition-colors duration-200 font-semibold"
                >
                  033 4069 2109
                </a>
              </div>
              <div className="h-px bg-[#1a2f45]" />
              <div className="flex items-start gap-2">
                <Mail
                  size={14}
                  strokeWidth={2}
                  className="text-[#FF6B35] flex-shrink-0 mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <a
                    href="mailto:admin@emdee.in"
                    className="text-[13px] text-[#B8C5D6] hover:text-[#FF6B35] transition-colors duration-200 block font-medium"
                  >
                    admin@emdee.in
                  </a>
                  <p className="text-[11px] text-[#7B8FA8]">General Queries</p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Quick Links */}
          <div className="col-span-4 pl-4">
            <h3 className="text-base font-bold text-white mb-4 pb-2 tracking-wide border-b border-[#1a2f45]/50">
              Quick Links
            </h3>
            <nav className="grid grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/vendors", label: "Vendor KYC" },
                { href: "/new-ventures", label: "New Ventures" },
                { href: "/#our-partners", label: "Our Partners" },
                { href: "/career", label: "Career" },
                { href: "/b2b", label: "B2B - Zuneko" },
                { href: "/tender-notice", label: "Tender Notice" },
                { href: "/contact", label: "Contact Us" },
                { href: "/ites", label: "ITES" },
                { href: "/amc", label: "AMC" },
                { href: "/software", label: "Software" },
                { href: "/#our-services", label: "Services" },
                { href: "/it-infra", label: "IT Infra" },
                { href: "/manpower", label: "Manpower" },
                { href: "/tender-sub", label: "Tender Sub" },
                { href: "/#our-stats", label: "Our Stats" },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[13px] text-[#B8C5D6] hover:text-white transition-all duration-200 py-1 block"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* ── MOBILE LAYOUT ── */}
        <div className="lg:hidden space-y-8">
          {/* Logo & Phone */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1a2f45]">
            <a href="/">
              <img
                src="https://ucarecdn.com/f74e0ffb-9698-44b5-bc68-9083a8fd14c5/-/format/auto/"
                alt="ENVEEE Logo"
                className="h-12 w-auto hover:opacity-80 transition-opacity duration-200"
              />
            </a>
            <a
              href="tel:+913340692109"
              className="inline-flex items-center gap-2 text-sm text-white hover:text-[#FF6B35] transition-colors duration-200 bg-[#1a2f45] px-3.5 py-2 rounded-lg"
            >
              <Phone size={16} strokeWidth={2} />
              <span className="font-semibold">033 4069 2109</span>
            </a>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <a
                href="https://maps.app.goo.gl/aVHFv1tHdH6Y4Gxm6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF6B35] hover:text-[#FF7A45] transition-colors duration-200 mb-1"
              >
                Kolkata HQ
                <Navigation size={13} strokeWidth={2} />
              </a>
              <p className="text-sm text-[#B8C5D6] leading-relaxed">
                DH6/27, Action Area 1D, New Town, Kolkata - 700156
              </p>
            </div>
            <div>
              <a
                href="https://maps.app.goo.gl/mVii96NDyJSU8Tch9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF6B35] hover:text-[#FF7A45] transition-colors duration-200 mb-1"
              >
                Kolkata Office 2
                <Navigation size={13} strokeWidth={2} />
              </a>
              <p className="text-sm text-[#B8C5D6] leading-relaxed">
                2B, Saraswati Apartment, 114/1 Golaghata Road, Kolkata - 700048
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#FF6B35] mb-1">
                Pune Office
              </h4>
              <p className="text-sm text-[#B8C5D6] leading-relaxed">
                3rd floor, Suratwala Mark Plazzo, Hinjewadi, Pune - 411057
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#FF6B35] mb-1">
                Patna Office
              </h4>
              <p className="text-sm text-[#B8C5D6] leading-relaxed">
                ANANDPURI, 6/5, West Boring Canal Road, Patna - 800001
              </p>
            </div>
          </div>

          {/* Nav links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 pt-6 border-t border-[#1a2f45]">
            {[
              { href: "/about", label: "About Us" },
              { href: "/#our-services", label: "Services" },
              { href: "/new-ventures", label: "New Ventures" },
              { href: "/career", label: "Career" },
              { href: "/b2b", label: "B2B - Zuneko" },
              { href: "/contact", label: "Contact Us" },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="text-sm text-[#B8C5D6] hover:text-[#FF6B35] transition-colors duration-200 py-1"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Bottom row — CSR, ISO, Socials */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-[#1a2f45]">
            <div className="flex items-center gap-6">
              <a
                href="/#our-impact"
                className="text-sm text-[#B8C5D6] hover:text-[#FF6B35] transition-colors duration-200 font-semibold"
              >
                CSR & Our Impact
              </a>
              <a
                href="/#certifications"
                className="hover:opacity-75 transition-opacity duration-200 inline-flex items-center gap-2"
              >
                <img
                  src="https://ucarecdn.com/9f67b653-1a26-4a5f-86d8-d2415e0d8d1b/-/format/auto/"
                  alt="ISO Certified"
                  className="w-9 h-9 object-contain rounded-sm flex-shrink-0"
                />
                <span className="text-[11px] text-[#7B8FA8] leading-tight">
                  View ISO
                  <br />
                  Certifications
                </span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/edpl123/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#1a2f45] hover:bg-[#FF6B35] text-white transition-all duration-200"
              >
                <Facebook size={18} strokeWidth={2} />
              </a>
              <a
                href="https://www.linkedin.com/company/emdee-digitronics/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#1a2f45] hover:bg-[#FF6B35] text-white transition-all duration-200"
              >
                <Linkedin size={18} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright (Rights section spacing fixed) */}
        <div className="mt-8 lg:mt-10 pt-4 border-t border-[#1a2f45] text-center">
          <p className="text-xs text-[#7B8FA8]">
            © {new Date().getFullYear()} Emdee Digitronics Pvt. Ltd. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
