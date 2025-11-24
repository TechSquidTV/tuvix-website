import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GITHUB_URL, FEED_URL } from "@/lib/constants";
import { AnimatedFeed } from "@/components/AnimatedFeed";
import {
  FloatingGithubStars,
  WatchingEye,
  ServerCloudMap,
  RSSFlow,
} from "@/components/FloatingIcons";

interface BentoCardProps {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href?: string;
  cta?: string;
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: BentoCardProps) => (
  <div
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "transform-gpu transition-all duration-300 hover:[box-shadow:0_0_0_1px_rgba(0,0,0,.06),0_8px_16px_rgba(0,0,0,.08),0_24px_48px_rgba(0,0,0,.08)]",
      className
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="text-xl font-semibold text-neutral-700">{name}</h3>
      <p className="max-w-lg text-neutral-400">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      )}
    >
      {href && cta && (
        <a
          href={href}
          className="pointer-events-auto text-sm font-semibold text-neutral-700 hover:text-neutral-500"
        >
          {cta} →
        </a>
      )}
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03]" />
  </div>
);

export function BentoGrid() {
  const features = [
    {
      Icon: () => (
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
      name: "No Algorithms",
      description:
        "Content appears in chronological order from sources you pick. No 'For You' page, no mystery recommendations.",
      href: "/about",
      cta: "Learn more",
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
      background: <AnimatedFeed />,
    },
    {
      Icon: () => (
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      name: "Open Source",
      description:
        "Code's on GitHub for anyone to inspect, fork, or improve. We don't hide anything.",
      href: GITHUB_URL,
      cta: "View on GitHub",
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
      background: <FloatingGithubStars />,
    },
    {
      Icon: () => (
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
      ),
      name: "Self-Host or Cloud",
      description:
        "Run it on your own server for complete control, or use our free hosted version and skip the setup.",
      href: FEED_URL,
      cta: "Get started",
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
      background: <ServerCloudMap />,
    },
    {
      Icon: () => (
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      name: "Privacy First",
      description:
        "No selling your data, not much data to sell. We use basic monitoring (Sentry) to fix bugs. Self-host for complete privacy.",
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
      background: <WatchingEye />,
    },
    {
      Icon: () => (
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
          />
        </svg>
      ),
      name: "Publish Feeds",
      description:
        "Generate RSS feeds from your saved articles. Share your curated content with the world.",
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
      background: <RSSFlow />,
    },
  ];

  return (
    <div className="grid auto-rows-[minmax(150px,auto)] grid-cols-3 gap-4 lg:auto-rows-[200px]">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </div>
  );
}
