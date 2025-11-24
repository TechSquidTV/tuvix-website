"use client";

import * as React from "react";
import { DottedMap } from "@/components/ui/dotted-map";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { RssIcon } from "@/components/icons/RssIcon";
import { Eye } from "@/components/ui/eye";
import { TuvixLogo } from "@/components/tuvix-logo";

// Open Source - Interactive grid pattern
export function FloatingGithubStars() {
  return (
    <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]">
      <InteractiveGridPattern
        width={40}
        height={40}
        squares={{
          mobile: [20, 10],
          tablet: [16, 10],
          desktop: [14, 10],
        }}
        className="border-green-500/40"
        squaresClassName="stroke-green-500/50 hover:fill-green-500/40 fill-transparent"
      />
    </div>
  );
}

// Privacy First - Watching eye that closes on hover
export function WatchingEye() {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Eye size={200} isOpen={!isHovered} className="text-gray-400" scleraColor="#f9fafb" />
    </div>
  );
}

// Self-Host or Cloud - Dotted world map with server locations
export function ServerCloudMap() {
  // Add markers for major server locations around the world
  const markers = [
    { lat: 37.7749, lng: -122.4194, size: 1.5 }, // San Francisco
    { lat: 40.7128, lng: -74.006, size: 1.5 }, // New York
    { lat: 51.5074, lng: -0.1278, size: 1.5 }, // London
    { lat: 52.52, lng: 13.405, size: 1.5 }, // Berlin
    { lat: 35.6762, lng: 139.6503, size: 1.5 }, // Tokyo
    { lat: 1.3521, lng: 103.8198, size: 1.5 }, // Singapore
    { lat: -33.8688, lng: 151.2093, size: 1.5 }, // Sydney
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]">
      <DottedMap
        width={300}
        height={150}
        mapSamples={10000}
        markers={markers}
        markerColor="#3b82f6"
        dotRadius={0.8}
        className="opacity-50"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </div>
  );
}

// Circle component for consistent styling
const Circle = React.forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={`z-10 flex size-12 items-center justify-center rounded-full border-2 border-orange-500/50 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] ${className || ""}`}
      >
        {children}
      </div>
    );
  }
);

Circle.displayName = "Circle";

// Publish Feeds - Broadcasting to multiple RSS feeds
export function RSSFlow() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const centerRef = React.useRef<HTMLDivElement>(null);
  const feed1Ref = React.useRef<HTMLDivElement>(null);
  const feed2Ref = React.useRef<HTMLDivElement>(null);
  const feed3Ref = React.useRef<HTMLDivElement>(null);
  const feed4Ref = React.useRef<HTMLDivElement>(null);
  const feed5Ref = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden p-10 [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)]"
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        {/* Center Tuvix logo */}
        <div className="flex flex-col justify-center">
          <Circle ref={centerRef} className="size-16 border-orange-600/60">
            <TuvixLogo className="size-full p-2" />
          </Circle>
        </div>

        {/* RSS Feed destinations */}
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={feed1Ref} className="border-orange-600/60">
            <RssIcon className="size-6 text-orange-500" />
          </Circle>
          <Circle ref={feed2Ref} className="border-orange-600/60">
            <RssIcon className="size-6 text-orange-500" />
          </Circle>
          <Circle ref={feed3Ref} className="border-orange-600/60">
            <RssIcon className="size-6 text-orange-500" />
          </Circle>
          <Circle ref={feed4Ref} className="border-orange-600/60">
            <RssIcon className="size-6 text-orange-500" />
          </Circle>
          <Circle ref={feed5Ref} className="border-orange-600/60">
            <RssIcon className="size-6 text-orange-500" />
          </Circle>
        </div>
      </div>

      {/* Animated beams from center to each feed */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={feed1Ref}
        duration={3}
        pathOpacity={0.3}
        gradientStartColor="#f97316"
        gradientStopColor="#fb923c"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={feed2Ref}
        duration={3}
        pathOpacity={0.3}
        gradientStartColor="#f97316"
        gradientStopColor="#fb923c"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={feed3Ref}
        duration={3}
        pathOpacity={0.3}
        gradientStartColor="#f97316"
        gradientStopColor="#fb923c"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={feed4Ref}
        duration={3}
        pathOpacity={0.3}
        gradientStartColor="#f97316"
        gradientStopColor="#fb923c"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={feed5Ref}
        duration={3}
        pathOpacity={0.3}
        gradientStartColor="#f97316"
        gradientStopColor="#fb923c"
      />
    </div>
  );
}
