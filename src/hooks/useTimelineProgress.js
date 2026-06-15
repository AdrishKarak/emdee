import { useState, useEffect, useRef } from "react";
import { useInView } from "motion/react";

export function useTimelineProgress() {
  const entry1Ref = useRef(null);
  const entry2Ref = useRef(null);
  const entry3Ref = useRef(null);
  const entry4Ref = useRef(null);
  const entry5Ref = useRef(null);
  const entry6Ref = useRef(null);
  const entry7Ref = useRef(null);
  const entry8Ref = useRef(null);
  const timelineContainerRef = useRef(null);

  const [timelineProgress, setTimelineProgress] = useState(0);
  const [indicatorVisible, setIndicatorVisible] = useState(false);

  const isEntry1InView = useInView(entry1Ref, {
    once: false,
    margin: "-40% 0px -20% 0px",
  });
  const isEntry2InView = useInView(entry2Ref, {
    once: false,
    margin: "-40% 0px -20% 0px",
  });
  const isEntry3InView = useInView(entry3Ref, {
    once: false,
    margin: "-40% 0px -20% 0px",
  });
  const isEntry4InView = useInView(entry4Ref, {
    once: false,
    margin: "-40% 0px -20% 0px",
  });
  const isEntry5InView = useInView(entry5Ref, {
    once: false,
    margin: "-40% 0px -20% 0px",
  });
  const isEntry6InView = useInView(entry6Ref, {
    once: false,
    margin: "-40% 0px -20% 0px",
  });
  const isEntry7InView = useInView(entry7Ref, {
    once: false,
    margin: "-40% 0px -20% 0px",
  });
  const isEntry8InView = useInView(entry8Ref, {
    once: false,
    margin: "-40% 0px -20% 0px",
  });

  const isContainerInView = useInView(timelineContainerRef, {
    once: false,
    amount: 0.05,
  });

  useEffect(() => {
    if (isEntry8InView) {
      setTimelineProgress(8);
    } else if (isEntry7InView) {
      setTimelineProgress(7);
    } else if (isEntry6InView) {
      setTimelineProgress(6);
    } else if (isEntry5InView) {
      setTimelineProgress(5);
    } else if (isEntry4InView) {
      setTimelineProgress(4);
    } else if (isEntry3InView) {
      setTimelineProgress(3);
    } else if (isEntry2InView) {
      setTimelineProgress(2);
    } else if (isEntry1InView) {
      setTimelineProgress(1);
    } else {
      setTimelineProgress(0);
    }
  }, [
    isEntry1InView,
    isEntry2InView,
    isEntry3InView,
    isEntry4InView,
    isEntry5InView,
    isEntry6InView,
    isEntry7InView,
    isEntry8InView,
  ]);

  useEffect(() => {
    setIndicatorVisible(isContainerInView);
  }, [isContainerInView]);

  return {
    entryRefs: [
      entry1Ref,
      entry2Ref,
      entry3Ref,
      entry4Ref,
      entry5Ref,
      entry6Ref,
      entry7Ref,
      entry8Ref,
    ],
    timelineContainerRef,
    timelineProgress,
    indicatorVisible,
  };
}
