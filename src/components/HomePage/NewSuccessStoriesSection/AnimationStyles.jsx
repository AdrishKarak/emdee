export function AnimationStyles({ getHeadingGradient }) {
  return (
    <style jsx global>{`
      .success-heading-gradient-text {
        background: ${getHeadingGradient()};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        display: inline-block;
      }

      .hover-lift {
        transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .hover-lift:hover {
        transform: translateY(-8px) !important;
      }

      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes expandCard {
        from {
          transform: scale(0.5);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      @keyframes slideUpSheet {
        from {
          transform: translateY(100%);
        }
        to {
          transform: translateY(0);
        }
      }
    `}</style>
  );
}
