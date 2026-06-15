export function MobileBottomSheet({
  stories,
  expandedCard,
  sheetDragY,
  sheetRef,
  handleCloseExpanded,
  handleSheetTouchStart,
  handleSheetTouchMove,
  handleSheetTouchEnd,
}) {
  const story = stories.find((s) => s.id === expandedCard);

  if (!story) return null;

  return (
    <>
      {/* Backdrop - covers entire viewport */}
      <div
        onClick={handleCloseExpanded}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 9998,
          animation: "fadeIn 300ms ease-out",
        }}
      />

      {/* Bottom Sheet - anchored to viewport bottom with explicit inline styles */}
      <div
        ref={sheetRef}
        onTouchStart={handleSheetTouchStart}
        onTouchMove={handleSheetTouchMove}
        onTouchEnd={handleSheetTouchEnd}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "82vh",
          maxHeight: "82vh",
          backgroundColor: "rgba(7, 9, 14, 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 -10px 40px rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
          transform: `translateY(${sheetDragY}px)`,
          transition:
            sheetDragY === 0
              ? "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
          animation: "slideUpSheet 400ms cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Close Button - prominent, top-right */}
        <button
          onClick={handleCloseExpanded}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "40px",
            height: "40px",
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            cursor: "pointer",
            transition: "all 200ms",
            zIndex: 10,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Scrollable Content - with visible scrollbar */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "28px",
            paddingBottom: "32px",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "thin",
            scrollbarColor:
              "rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Title */}
          <h3
            className="font-qanelas-soft"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "24px",
              paddingRight: "48px",
            }}
          >
            {story.title}
          </h3>

          {/* Full Text */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {story.fullText.map((paragraph, idx) => (
              <p
                key={idx}
                className="font-qanelas-soft"
                style={{
                  fontSize: "16px",
                  color: "#D1D5DB",
                  lineHeight: "1.6",
                }}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles for WebKit browsers */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </>
  );
}
