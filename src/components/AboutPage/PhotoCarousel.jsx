export function PhotoCarousel({
  carouselRef,
  carouselImages,
  currentImageIndex,
  getCarouselAnimationStyle,
}) {
  return (
    <div className="mt-16 md:mt-20">
      <div
        className="relative h-[300px] md:h-[650px] lg:h-[780px] overflow-hidden rounded-xl -mx-6 md:mx-0"
        ref={carouselRef}
        style={getCarouselAnimationStyle()}
      >
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: currentImageIndex === index ? 1 : 0,
            }}
          >
            <img
              src={image}
              alt={`Emdee carousel ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {carouselImages.map((_, index) => (
            <div
              key={index}
              className="transition-all duration-300"
              style={{
                width: currentImageIndex === index ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor:
                  currentImageIndex === index
                    ? "rgba(255, 107, 53, 0.9)"
                    : "rgba(255, 255, 255, 0.4)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
