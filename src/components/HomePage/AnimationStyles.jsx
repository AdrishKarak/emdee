export function AnimationStyles() {
  return (
    <style jsx global>{`
      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      .animate-gradient {
        animation: gradient 4s ease-in-out infinite;
      }

      @keyframes scroll-hint {
        0%,
        100% {
          transform: translateY(0);
          opacity: 0.4;
        }
        50% {
          transform: translateY(6px);
          opacity: 0.7;
        }
      }
      .animate-scroll-hint {
        animation: scroll-hint 2.5s ease-in-out infinite;
      }

      /* Impact Section - Dramatic Sequential Entrance Animations */
      @keyframes impactFrameEnter {
        0% {
          opacity: 0;
          transform: translateY(200px) scale(0.2);
        }
        60% {
          transform: translateY(-20px) scale(1.05);
        }
        80% {
          transform: translateY(10px) scale(0.98);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes impactHeadingEnter {
        0% {
          opacity: 0;
          transform: translateY(135px) scale(0.85);
        }
        60% {
          transform: translateY(-15px) scale(1.03);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes impactSubheadingEnter {
        0% {
          opacity: 0;
          transform: translateY(100px) scale(0.8);
        }
        60% {
          transform: translateY(-10px) scale(1.02);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .impact-frame-enter {
        animation: impactFrameEnter 1s cubic-bezier(0.34, 1.56, 0.64, 1)
          forwards;
      }

      .impact-heading-enter {
        animation: impactHeadingEnter 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)
          forwards;
      }

      .impact-subheading-enter {
        animation: impactSubheadingEnter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)
          forwards;
      }
    `}</style>
  );
}
