export function MobileTitle() {
  return (
    <div className="md:hidden px-6 pt-6 pb-0">
      <h2
        className="text-left"
        style={{
          fontSize: "clamp(2.25rem, 5vw, 3.1875rem)",
          fontFamily: "Qanelas Soft, sans-serif",
          fontWeight: "bold",
        }}
      >
        <span
          style={{
            background:
              "linear-gradient(180deg, #FF6B35 0%, #FF6B35 55%, #000000 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          About Us
        </span>
      </h2>
    </div>
  );
}
