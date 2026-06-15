export function ExpandedCardOverlay({
  stories,
  expandedCard,
  handleCloseExpanded,
}) {
  const story = stories.find((s) => s.id === expandedCard);

  if (!story) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-6"
      style={{
        animation: "fadeIn 400ms ease-out",
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={handleCloseExpanded}
        style={{
          animation: "fadeIn 400ms ease-out",
        }}
      />

      {/* Expanded Card */}
      <div
        className="relative bg-[#07090E]/95 backdrop-blur-xl rounded-3xl p-12 max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-white/10"
        style={{
          animation: "expandCard 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleCloseExpanded}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#FF6B35] hover:border-[#FF6B35] transition-all duration-300 z-10"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Title */}
        <h3 className="text-3xl lg:text-4xl font-qanelas-soft font-bold text-white mb-8">
          {story.title}
        </h3>

        {/* Full Text */}
        <div className="space-y-6">
          {story.fullText.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-base lg:text-lg font-qanelas-soft text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
