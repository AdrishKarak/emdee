import { useState, useEffect, useRef } from "react";

export function useAboutPageCarousel(isDesktop) {
  const carouselRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCarouselInView, setIsCarouselInView] = useState(false);
  const [carouselEntryProgress, setCarouselEntryProgress] = useState(0);
  const [carouselExitProgress, setCarouselExitProgress] = useState(0);

  const mobileCarouselImages = [
    "https://ucarecdn.com/47d22b40-eff4-42f4-a784-cfe7d1a41801/-/format/auto/",
    "https://ucarecdn.com/9578ca89-da73-453d-99b4-e439fb79bead/-/format/auto/",
    "https://ucarecdn.com/0b03307a-3893-4f1f-955d-4ce7dd67b321/-/format/auto/",
    "https://ucarecdn.com/76a64437-56cc-4677-a48b-c29eb38f8ee8/-/format/auto/",
    "https://ucarecdn.com/749fef04-6767-42b6-9b30-f4f448eb2e42/-/format/auto/",
    "https://ucarecdn.com/018f5294-5273-4f9b-8d3d-2bc978c89ade/-/format/auto/",
    "https://ucarecdn.com/edc25f7c-0244-46d0-9776-3e38355d2bbb/-/format/auto/",
    "https://ucarecdn.com/ab586573-c548-40ec-a50c-e7f9ecb65261/-/format/auto/",
    "https://ucarecdn.com/71cc45a1-7a8f-4636-84fa-7c855aec5e7c/-/format/auto/",
    "https://ucarecdn.com/bf97287d-65f8-421f-97f9-92550589a803/-/format/auto/",
    "https://ucarecdn.com/23c7e524-f90f-4a96-abef-b73bfb8a92b2/-/format/auto/",
    "https://ucarecdn.com/3e6c4f29-eaeb-46a0-b3fb-5cd329bae0bd/-/format/auto/",
    "https://ucarecdn.com/d094e96b-ef4b-447b-93d0-fb7ee87c62c4/-/format/auto/",
    "https://ucarecdn.com/ae34d6e9-026e-4da1-84d7-793f83d034c2/-/format/auto/",
    "https://ucarecdn.com/13105ca5-0924-4bc4-a3a1-6d4b5a7336d7/-/format/auto/",
    "https://ucarecdn.com/cb1e49b0-a27f-4e5c-9ee4-dee1d27e806f/-/format/auto/",
    "https://ucarecdn.com/8fc0c817-b86f-4abd-8a02-a6524465b3cd/-/format/auto/",
    "https://ucarecdn.com/41a83c73-0340-4684-a263-99798e9bae94/-/format/auto/",
  ];

  const desktopCarouselImages = [
    "https://ucarecdn.com/47d22b40-eff4-42f4-a784-cfe7d1a41801/-/format/auto/",
    "https://ucarecdn.com/9578ca89-da73-453d-99b4-e439fb79bead/-/format/auto/",
    "https://ucarecdn.com/0b03307a-3893-4f1f-955d-4ce7dd67b321/-/format/auto/",
    "https://ucarecdn.com/76a64437-56cc-4677-a48b-c29eb38f8ee8/-/format/auto/",
    "https://ucarecdn.com/749fef04-6767-42b6-9b30-f4f448eb2e42/-/format/auto/",
    "https://ucarecdn.com/018f5294-5273-4f9b-8d3d-2bc978c89ade/-/format/auto/",
    "https://ucarecdn.com/edc25f7c-0244-46d0-9776-3e38355d2bbb/-/format/auto/",
    "https://ucarecdn.com/ab586573-c548-40ec-a50c-e7f9ecb65261/-/format/auto/",
    "https://ucarecdn.com/71cc45a1-7a8f-4636-84fa-7c855aec5e7c/-/format/auto/",
    "https://ucarecdn.com/bf97287d-65f8-421f-97f9-92550589a803/-/format/auto/",
    "https://ucarecdn.com/23c7e524-f90f-4a96-abef-b73bfb8a92b2/-/format/auto/",
    "https://ucarecdn.com/3e6c4f29-eaeb-46a0-b3fb-5cd329bae0bd/-/format/auto/",
    "https://ucarecdn.com/d094e96b-ef4b-447b-93d0-fb7ee87c62c4/-/format/auto/",
    "https://ucarecdn.com/ae34d6e9-026e-4da1-84d7-793f83d034c2/-/format/auto/",
    "https://ucarecdn.com/13105ca5-0924-4bc4-a3a1-6d4b5a7336d7/-/format/auto/",
    "https://ucarecdn.com/cb1e49b0-a27f-4e5c-9ee4-dee1d27e806f/-/format/auto/",
    "https://ucarecdn.com/8fc0c817-b86f-4abd-8a02-a6524465b3cd/-/format/auto/",
    "https://ucarecdn.com/af499bc1-e16d-41aa-b555-dc851fc76973/-/format/auto/",
  ];

  const carouselImages = isDesktop
    ? desktopCarouselImages
    : mobileCarouselImages;

  // Carousel entry and exit animation tracking
  useEffect(() => {
    const handleCarouselAnimation = () => {
      if (!carouselRef.current) return;

      const rect = carouselRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const entryTriggerStart = viewportHeight * 0.75;
      const entryTriggerEnd = viewportHeight * 0.5;

      if (rect.top < entryTriggerStart && rect.top > entryTriggerEnd) {
        const progress =
          1 -
          (rect.top - entryTriggerEnd) / (entryTriggerStart - entryTriggerEnd);
        setCarouselEntryProgress(Math.min(1, Math.max(0, progress)));
        setCarouselExitProgress(0);
      } else if (rect.top <= entryTriggerEnd) {
        setCarouselEntryProgress(1);
      } else {
        setCarouselEntryProgress(0);
      }

      const exitTriggerStart = -rect.height / 2;
      const exitTriggerEnd = -rect.height;

      if (rect.top < exitTriggerStart && rect.top > exitTriggerEnd) {
        const progress =
          1 - (rect.top - exitTriggerEnd) / (exitTriggerStart - exitTriggerEnd);
        setCarouselExitProgress(Math.min(1, Math.max(0, progress)));
      } else if (rect.top <= exitTriggerEnd) {
        setCarouselExitProgress(1);
      } else {
        setCarouselExitProgress(0);
      }
    };

    window.addEventListener("scroll", handleCarouselAnimation, {
      passive: true,
    });
    handleCarouselAnimation();

    return () => window.removeEventListener("scroll", handleCarouselAnimation);
  }, []);

  // Detect when carousel enters viewport
  useEffect(() => {
    if (!carouselRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCarouselInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(carouselRef.current);

    return () => observer.disconnect();
  }, []);

  // Auto-rotate carousel every 2 seconds
  useEffect(() => {
    if (!isCarouselInView) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselImages.length,
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [carouselImages.length, isCarouselInView]);

  const getCarouselAnimationStyle = () => {
    if (carouselExitProgress > 0) {
      const translateY = -150 * carouselExitProgress;
      const scale = 1 - 0.1 * carouselExitProgress;
      const opacity = 1 - 0.5 * carouselExitProgress;

      return {
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        transition: "none",
      };
    }

    if (carouselEntryProgress < 1) {
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(carouselEntryProgress);

      const translateY = 25 * (1 - easedProgress);
      const scale = 0.95 + 0.05 * easedProgress;
      const opacity = 0.5 + 0.5 * easedProgress;

      return {
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      };
    }

    return {
      transform: "translateY(0) scale(1)",
      opacity: 1,
      transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    };
  };

  return {
    carouselRef,
    currentImageIndex,
    carouselImages,
    isCarouselInView,
    getCarouselAnimationStyle,
  };
}
