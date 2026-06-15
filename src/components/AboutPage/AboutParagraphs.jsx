import { motion } from "motion/react";

export function AboutParagraphs({
  para1Ref,
  para2Ref,
  para3Ref,
  para4Ref,
  isPara1InView,
  isPara2InView,
  isPara3InView,
  isPara4InView,
  isPara1Exiting,
  isPara2Exiting,
  isPara3Exiting,
  isPara4Exiting,
  isDesktop,
  paragraphVariants,
}) {
  const paragraphStyle = {
    color: "rgba(255, 255, 255, 0.85)",
    letterSpacing: "0.01em",
  };

  // Helper to determine animation state
  const getAnimationState = (inView, exiting) => {
    if (exiting) return "exit";
    if (inView) return "visible";
    return "hidden";
  };

  return (
    <div className="space-y-8 mx-auto">
      <motion.p
        ref={para1Ref}
        className="font-qanelas-soft text-[0.9rem] md:text-[1.243125rem] leading-[1.85]"
        style={paragraphStyle}
        variants={isDesktop ? paragraphVariants : {}}
        initial={isDesktop ? "hidden" : {}}
        animate={
          isDesktop ? getAnimationState(isPara1InView, isPara1Exiting) : {}
        }
      >
        Founded in 2004 by Mr. Malay Das, Emdee Digitronics Pvt. Ltd. (EDPL)
        began with 12 employees within a 700 sqft. rented unit in Kolkata but
        guided by a simple conviction: help government with technology, to
        govern better through technology. Two decades later, that modest
        beginning and conviction has grown into one of East India's most diverse
        and dependable B2G technology operations - spanning identity,
        infrastructure, data, public services, education, security etc. Today we
        have established presence across multiple states, employed thousands,
        and impacted millions.
      </motion.p>

      <motion.p
        ref={para2Ref}
        className="font-qanelas-soft text-[0.9rem] md:text-[1.243125rem] leading-[1.85]"
        style={paragraphStyle}
        variants={paragraphVariants}
        initial="hidden"
        animate={getAnimationState(isPara2InView, isPara2Exiting)}
      >
        In early 2000s and 2010s, we helped build India's identity architecture
        and digital databases, empowering our populace and countless government
        machineries that serve them. We computerised electoral rolls and voter
        cards across states, we digitised high court legal documents and post
        office records in Bengal, we modernised the public distribution system
        (PDS) and ran censuses/surveys in the East (including the only
        Socio-economic & Caste Census of our history), we delivered pilot
        programmes for the "Multipurpose National Identity Card" and helped
        build the National Population Register, both predecessors to Aadhaar.
        When Aadhaar scaled nationwide, we executed one of India's largest
        enrolment operations (over 20 million enrolments across five states).
        Currently, we operate 100+ Aadhaar PEC centres in UP and Bihar, and
        maintain 3500+ Bangla Sahayata Kendras in Bengal, ensuring steady,
        accessible digital public services for citizens everyday.
      </motion.p>

      <motion.p
        ref={para3Ref}
        className="font-qanelas-soft text-[0.9rem] md:text-[1.243125rem] leading-[1.85]"
        style={paragraphStyle}
        variants={paragraphVariants}
        initial="hidden"
        animate={getAnimationState(isPara3InView, isPara3Exiting)}
      >
        Our story is not defined by a single domain, but by the breadth of what
        we enable: From spot-billing engines (serving 40 million+ consumers)
        that help 5 electricity corporations capture and provide value, to
        smart-class systems and edutech platforms transforming how 17.5 million+
        students learn and how 95,000 schools manage operations. From software
        suites supporting rural road construction, animal resource management,
        agricultural supply chains and many other e-governance ecosystems to
        extensive surveillance infrastructure securing traffic flows, government
        offices, public spaces and 250+ police stations. From enterprise IT
        integration (with 100,000+ IT assets under management) digitalising
        dozens of government departments, to thousands of on-field engineers
        (covering 4000+ pincodes) - deploying & maintaining such IT systems at
        scale or operationalising public service centres. Across 20+ years,
        these "from–to" journeys have defined who we are: a company that
        silently sits underneath the public service pipeline and powers Digital
        India - translating policy into platforms, products into capability, and
        people into impact.
      </motion.p>

      <motion.p
        ref={para4Ref}
        className="font-qanelas-soft text-[0.9rem] md:text-[1.243125rem] leading-[1.85]"
        style={paragraphStyle}
        variants={paragraphVariants}
        initial="hidden"
        animate={getAnimationState(isPara4InView, isPara4Exiting)}
      >
        As we evolve, alongside our core IT and e-governance work, we're
        extending our capabilities into sustainability - solar panel EPC, EV
        charging networks and waste-management solutions, while our next
        generation expands our footprint in B2B enterprise technology across
        infrastructure, ITeS, SaaS and AI. We parallely plan to back emerging
        tech players in the East, strengthening the ecosystem we grew from.
        Because ultimately, our journey from a rented room to quietly being one
        of the region's digital backbones proves that Information Technology is
        not just an industry, but a responsibility - to lift capacity, expand
        access and help India {isDesktop ? "move forward" : "progress"} with
        stronger digital ground beneath it.
      </motion.p>
    </div>
  );
}
