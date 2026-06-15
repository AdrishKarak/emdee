import { useState, useEffect, useRef } from "react";
import { useInView } from "motion/react";

export function useReadingProgress() {
  const para1Ref = useRef(null);
  const para2Ref = useRef(null);
  const para3Ref = useRef(null);
  const para4Ref = useRef(null);
  const paragraphsContainerRef = useRef(null);

  const [readingProgress, setReadingProgress] = useState(0);
  const [indicatorVisible, setIndicatorVisible] = useState(false);

  // Exit state tracking
  const [isPara1Exiting, setIsPara1Exiting] = useState(false);
  const [isPara2Exiting, setIsPara2Exiting] = useState(false);
  const [isPara3Exiting, setIsPara3Exiting] = useState(false);
  const [isPara4Exiting, setIsPara4Exiting] = useState(false);

  const isPara1InView = useInView(para1Ref, {
    once: true,
    margin: "-40% 0px -20% 0px",
  });
  const isPara2InView = useInView(para2Ref, {
    once: true,
    margin: "-40% 0px -20% 0px",
  });
  const isPara3InView = useInView(para3Ref, {
    once: true,
    margin: "-40% 0px -20% 0px",
  });
  const isPara4InView = useInView(para4Ref, {
    once: true,
    margin: "-40% 0px -20% 0px",
  });

  const isContainerInView = useInView(paragraphsContainerRef, {
    once: false,
    amount: 0.05,
  });

  // Track when paragraphs exit the viewport (scroll past top)
  useEffect(() => {
    const handleScroll = () => {
      const checkExit = (ref, setExiting) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        // Paragraph is exiting when its bottom is above 30% of viewport
        const isExiting = rect.bottom < window.innerHeight * 0.3;
        setExiting(isExiting);
      };

      checkExit(para1Ref, setIsPara1Exiting);
      checkExit(para2Ref, setIsPara2Exiting);
      checkExit(para3Ref, setIsPara3Exiting);
      checkExit(para4Ref, setIsPara4Exiting);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isPara4InView) {
      setReadingProgress(4);
    } else if (isPara3InView) {
      setReadingProgress(3);
    } else if (isPara2InView) {
      setReadingProgress(2);
    } else if (isPara1InView) {
      setReadingProgress(1);
    } else {
      setReadingProgress(0);
    }
  }, [isPara1InView, isPara2InView, isPara3InView, isPara4InView]);

  return {
    para1Ref,
    para2Ref,
    para3Ref,
    para4Ref,
    paragraphsContainerRef,
    readingProgress,
    indicatorVisible,
    setIndicatorVisible,
    isPara1InView,
    isPara2InView,
    isPara3InView,
    isPara4InView,
    isPara1Exiting,
    isPara2Exiting,
    isPara3Exiting,
    isPara4Exiting,
    isContainerInView,
  };
}
