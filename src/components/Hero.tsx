import { useEffect, useRef, useState } from "react";
import { GITHUB_URL, FEED_URL } from "@/lib/constants";

export const Hero = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use Intersection Observer to load video only when it's about to enter viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            observer.disconnect();
          }
        });
      },
      {
        // Start loading when video is 200px away from viewport
        rootMargin: "200px",
      }
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Only load Vimeo player script when video is about to be loaded
    if (!shouldLoadVideo) return;

    // Check if script is already loaded
    if (document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [shouldLoadVideo]);

  return (
    <div className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
            Open Source • Self-Hostable • Free Plan Available
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            It's Your Feed
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Tired of algorithms deciding what you see? Tuvix is an open-source RSS reader that shows
            you exactly what you subscribe to—nothing more, nothing less.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href={FEED_URL}
              className="rounded-md bg-black px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Get Started
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold leading-7 text-gray-900 hover:text-gray-600"
            >
              Self-host on GitHub <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Hero Video/Visual */}
        <div ref={videoContainerRef} className="mt-16 flow-root sm:mt-24">
          <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
              {shouldLoadVideo ? (
                <iframe
                  src="https://player.vimeo.com/video/1139891283?badge=0&autopause=0&player_id=0&app_id=58479"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  loading="lazy"
                  style={{
                    border: 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  title="Tuvix Launch Video"
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              ) : (
                <div
                  className="absolute inset-0 rounded-md shadow-2xl ring-1 ring-gray-900/10 overflow-hidden"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src="/blog/tuvix-beta-launch-cover.webp"
                    alt="Tuvix Launch Video"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="rounded-full bg-white/90 p-4 shadow-lg">
                      <svg
                        className="h-12 w-12 text-gray-900"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
