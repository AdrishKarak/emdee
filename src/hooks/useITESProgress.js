import { useState, useRef } from "react";
import { useInView } from "motion/react";

export function useITESProgress(tilesCount) {
  const tilesContainerRef = useRef(null);

  // Create individual refs for each tile
  const tile1Ref = useRef(null);
  const tile2Ref = useRef(null);
  const tile3Ref = useRef(null);
  const tile4Ref = useRef(null);
  const tile5Ref = useRef(null);
  const tile6Ref = useRef(null);
  const tile7Ref = useRef(null);
  const tile8Ref = useRef(null);
  const tile9Ref = useRef(null);
  const tile10Ref = useRef(null);

  // Create individual useInView hooks for each tile
  const tile1InView = useInView(tile1Ref, { amount: 0.3 });
  const tile2InView = useInView(tile2Ref, { amount: 0.3 });
  const tile3InView = useInView(tile3Ref, { amount: 0.3 });
  const tile4InView = useInView(tile4Ref, { amount: 0.3 });
  const tile5InView = useInView(tile5Ref, { amount: 0.3 });
  const tile6InView = useInView(tile6Ref, { amount: 0.3 });
  const tile7InView = useInView(tile7Ref, { amount: 0.3 });
  const tile8InView = useInView(tile8Ref, { amount: 0.3 });
  const tile9InView = useInView(tile9Ref, { amount: 0.3 });
  const tile10InView = useInView(tile10Ref, { amount: 0.3 });

  // Collect all refs and inView states
  const tileRefs = useRef([
    tile1Ref,
    tile2Ref,
    tile3Ref,
    tile4Ref,
    tile5Ref,
    tile6Ref,
    tile7Ref,
    tile8Ref,
    tile9Ref,
    tile10Ref,
  ]);

  const tilesInView = [
    tile1InView,
    tile2InView,
    tile3InView,
    tile4InView,
    tile5InView,
    tile6InView,
    tile7InView,
    tile8InView,
    tile9InView,
    tile10InView,
  ];

  // Determine current tile - check from highest to lowest index
  let currentTile = 0;
  for (let i = tilesCount - 1; i >= 0; i--) {
    if (tilesInView[i]) {
      currentTile = i + 1;
      break;
    }
  }

  // Check if container is in view for indicator visibility
  const containerInView = useInView(tilesContainerRef, { amount: 0.05 });

  return {
    tileRefs,
    tilesContainerRef,
    currentTile,
    indicatorVisible: containerInView,
  };
}
