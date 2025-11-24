"use client";

import React, { useState, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * InteractiveGridPattern is a component that renders a grid pattern with interactive squares.
 *
 * @param width - The width of each square.
 * @param height - The height of each square.
 * @param squares - The number of squares in the grid. The first element is the number of horizontal squares, and the second element is the number of vertical squares. Can be a responsive object with mobile, tablet, desktop keys.
 * @param className - The class name of the grid.
 * @param squaresClassName - The class name of the squares.
 */
interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?:
    | [number, number]
    | { mobile?: [number, number]; tablet?: [number, number]; desktop?: [number, number] };
  className?: string;
  squaresClassName?: string;
}

/**
 * The InteractiveGridPattern component.
 *
 * @see InteractiveGridPatternProps for the props interface.
 * @returns A React component.
 */
export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSquares, setCurrentSquares] = useState<[number, number]>(
    Array.isArray(squares) ? squares : squares.desktop || [24, 24]
  );
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  useEffect(() => {
    if (Array.isArray(squares)) {
      setCurrentSquares(squares);
      return;
    }

    const updateSquares = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        // Mobile
        setCurrentSquares(squares.mobile || squares.tablet || squares.desktop || [24, 24]);
      } else if (screenWidth < 1024) {
        // Tablet
        setCurrentSquares(squares.tablet || squares.desktop || [24, 24]);
      } else {
        // Desktop
        setCurrentSquares(squares.desktop || [24, 24]);
      }
    };

    updateSquares();
    window.addEventListener("resize", updateSquares);
    return () => window.removeEventListener("resize", updateSquares);
  }, [squares]);

  // Calculate columns dynamically to fill container width while keeping squares square
  useEffect(() => {
    if (!containerRef.current || Array.isArray(squares)) return;

    const updateColumns = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;

      // Get base responsive config
      const baseSquares =
        window.innerWidth < 768
          ? squares.mobile || squares.tablet || squares.desktop || [24, 24]
          : window.innerWidth < 1024
            ? squares.tablet || squares.desktop || [24, 24]
            : squares.desktop || [24, 24];

      const rows = baseSquares[1];
      // Calculate columns needed to fill width, ensuring at least the base amount
      const columnsNeeded = Math.ceil(containerWidth / width);
      const cols = Math.max(columnsNeeded, baseSquares[0]);

      setCurrentSquares([cols, rows]);
    };

    // Small delay to ensure container is rendered
    const timeoutId = setTimeout(updateColumns, 0);

    const resizeObserver = new ResizeObserver(() => {
      updateColumns();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updateColumns);
    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateColumns);
    };
  }, [squares, width]);

  const [horizontal, vertical] = currentSquares;

  return (
    <div ref={containerRef} className="absolute inset-0 h-full w-full overflow-hidden">
      <svg
        className={cn("h-full w-full border border-gray-400/30", className)}
        viewBox={`0 0 ${width * horizontal} ${height * vertical}`}
        preserveAspectRatio="xMidYMid slice"
        {...props}
      >
        {Array.from({ length: horizontal * vertical }).map((_, index) => {
          const x = (index % horizontal) * width;
          const y = Math.floor(index / horizontal) * height;
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={width}
              height={height}
              className={cn(
                "stroke-gray-400/30 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000",
                hoveredSquare === index ? "fill-gray-300/30" : "fill-transparent",
                squaresClassName
              )}
              onMouseEnter={() => setHoveredSquare(index)}
              onMouseLeave={() => setHoveredSquare(null)}
            />
          );
        })}
      </svg>
    </div>
  );
}
