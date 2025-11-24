"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface EyeProps {
  size?: number;
  className?: string;
  color?: string;
  scleraColor?: string;
  isOpen?: boolean; // Controlled externally
}

export const Eye: React.FC<EyeProps> = ({
  size = 64,
  className = "",
  color = "currentColor",
  scleraColor = "transparent",
  isOpen = true,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [blinkLevel, setBlinkLevel] = useState(1); // 1 = Open, 0 = Closed

  // Animation Loop for smooth blinking interpolation
  useEffect(() => {
    const target = isOpen ? 1 : 0;
    let animationFrame: number;

    const animate = () => {
      setBlinkLevel((prev) => {
        const diff = target - prev;
        // Stop if we are close enough to save resources
        if (Math.abs(diff) < 0.001) {
          return target;
        }
        // Slower factor (0.08) for heavier, smoother lid movement
        return prev + diff * 0.08;
      });
      animationFrame = requestAnimationFrame(animate);
    };

    if (Math.abs(blinkLevel - target) > 0.001) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isOpen, blinkLevel]);

  // Mouse Tracking Logic with Constraints
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;

      const rect = svgRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      // 1. Distance Influence
      // Calculate distance in screen pixels
      const dist = Math.hypot(dx, dy);

      // Define how far the mouse needs to be (in pixels) to move the eye to its edge.
      const maxViewDistance = 400;

      // Calculate a ratio (0 to 1) of how far we are looking
      const gazeIntensity = Math.min(dist / maxViewDistance, 1);

      // 2. Elliptical Constraints
      // These values define the bounding box for the *center* of the pupil in SVG units.
      // SVG Viewbox is 24x24. Pupil radius is 3.
      const maxRX = 6; // Horizontal range
      const maxRY = 3.0; // Vertical range (Increased for symmetrical eye shape)

      const angle = Math.atan2(dy, dx);

      // Map the circular gaze direction to the elliptical eye shape
      // We multiply by gazeIntensity to make the distance dependent on mouse distance.
      const constrainedX = Math.cos(angle) * maxRX * gazeIntensity;
      const constrainedY = Math.sin(angle) * maxRY * gazeIntensity;

      setPupilPos({ x: constrainedX, y: constrainedY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- Geometry Calculation ---
  // SVG Viewbox: 0 0 24 24. Center: 12,12.

  // Y-coordinates for the Quadratic Bezier control points
  // 0 and 24 are symmetrical relative to the center (12).
  // This creates a peak height of ~6px from center for both lids.
  const openTopCP = 0;
  const bottomCP = 24;
  const closedTopCP = 24; // Matches bottom lid when closed

  // Interpolate current Top Control Point based on blinkLevel
  const currentTopCP = closedTopCP + (openTopCP - closedTopCP) * blinkLevel;

  // Paths
  const topLidPath = `M 2 12 Q 12 ${currentTopCP} 22 12`;
  const bottomLidPath = `M 2 12 Q 12 ${bottomCP} 22 12`;
  // Full Shape for Fill/Clip
  const eyeShapePath = `${topLidPath} Q 12 ${bottomCP} 2 12 Z`;

  const uniqueId = React.useId();
  const clipId = `eye-clip-${uniqueId.replace(/:/g, "")}`; // Sanitize ID for CSS selectors

  // Pupil Scale Logic
  // Stays full size (scale 1) until the eye is almost closed
  const pupilScale = Math.min(1, Math.max(0, (blinkLevel - 0.1) * 1.4));

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={eyeShapePath} />
        </clipPath>
      </defs>

      {/* Sclera Background */}
      <path d={eyeShapePath} fill={scleraColor} />

      {/* Pupil */}
      <g transform={`translate(${pupilPos.x}, ${pupilPos.y})`}>
        <circle
          cx={12}
          cy={12}
          r={3}
          fill={color}
          clipPath={`url(#${clipId})`}
          transform={`scale(${pupilScale})`}
          style={{
            transformOrigin: "12px 12px",
            pointerEvents: "none",
            transition: "transform 0.1s ease-out", // Slight smoothing on movement
          }}
        />
      </g>

      {/* Eyelid Outlines (Drawn on top to hide clip edges) */}
      <path
        d={topLidPath}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pointerEvents: "none" }}
      />
      <path
        d={bottomLidPath}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pointerEvents: "none" }}
      />
    </svg>
  );
};

// --- Hook for Controlling Blink ---
export function useBlink({ initialOpen = true, blinkDuration = 200 } = {}) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const timeoutRef = useRef<number>(0);

  const blink = useCallback(() => {
    setIsOpen(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(true);
    }, blinkDuration);
  }, [blinkDuration]);

  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);

  // Cleanup
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return { isOpen, blink, close, open, setIsOpen };
}
