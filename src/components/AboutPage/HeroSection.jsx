export function HeroSection() {
  return (
    <div className="relative w-full h-[calc(50vh-25px)] md:h-[80vh] lg:h-[85vh] overflow-hidden bg-black md:mb-0">
      {/* Mobile video with native poster */}
      <div className="md:hidden relative w-full h-full">
        <div
          className="absolute inset-0"
          style={{
            clipPath: "inset(10% 0 20% 0)",
          }}
        >
          <video
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
            src="https://pub-2d0dbb33a45b4da1b1b107f93441281b.r2.dev/emdeeoffice.mp4"
            poster="https://ucarecdn.com/72fbcd23-1ce9-4bd3-bae5-ee42f924a67b/-/format/auto/"
            autoPlay
            muted
            loop
            playsInline
            style={{ pointerEvents: "none" }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      {/* Desktop video with bottom 10% cropped */}
      <div
        className="hidden md:block absolute inset-0"
        style={{
          clipPath: "inset(0 0 10% 0)",
        }}
      >
        <video
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full object-cover"
          src="https://pub-2d0dbb33a45b4da1b1b107f93441281b.r2.dev/emdeeoffice.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ pointerEvents: "none" }}
        />
      </div>

      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
