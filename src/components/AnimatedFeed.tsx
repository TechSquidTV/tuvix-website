"use client";

import { AnimatedList } from "@/components/ui/animated-list";

interface FeedItem {
  title: string;
  source: string;
  time: string;
  icon: string;
}

const feedItems: FeedItem[] = [
  {
    title: "SpaceX Starship Successfully Reaches Orbit",
    source: "Space News",
    time: "2 min ago",
    icon: "🚀",
  },
  {
    title: "New AI Model Beats GPT-4 on Coding Tasks",
    source: "Hacker News",
    time: "8 min ago",
    icon: "🤖",
  },
  {
    title: "Fireship: Why Everyone Hates React Now",
    source: "YouTube",
    time: "15 min ago",
    icon: "📺",
  },
  {
    title: "Apple Announces Vision Pro 2 with Eye Tracking",
    source: "The Verge",
    time: "32 min ago",
    icon: "🍎",
  },
  {
    title: "Netflix Raises Prices Again in 2025",
    source: "Tech News",
    time: "1 hour ago",
    icon: "📺",
  },
  {
    title: "Show HN: I Built a Tool to Track My Habits",
    source: "Hacker News",
    time: "2 hours ago",
    icon: "💡",
  },
  {
    title: "The Science Behind Perfect Sleep Schedule",
    source: "Health Daily",
    time: "3 hours ago",
    icon: "😴",
  },
  {
    title: "Best Budget Gaming Laptops of 2025",
    source: "PCWorld",
    time: "4 hours ago",
    icon: "🎮",
  },
  {
    title: "New Study: Coffee Actually Good for Your Heart",
    source: "Science Journal",
    time: "6 hours ago",
    icon: "☕",
  },
  {
    title: "Valve Teases Half-Life 3 at Gaming Awards",
    source: "IGN",
    time: "8 hours ago",
    icon: "🎮",
  },
  {
    title: "How I Went From Broke to $100k in One Year",
    source: "Medium",
    time: "9 hours ago",
    icon: "💰",
  },
  {
    title: "Reddit Goes Down for Third Time This Week",
    source: "Downdetector",
    time: "12 hours ago",
    icon: "⬇️",
  },
];

function FeedCard({ title, source, time, icon }: FeedItem) {
  return (
    <div className="flex w-full items-start gap-3 rounded-lg bg-white/90 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 ease-out hover:shadow-md">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 text-lg">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-neutral-900">{title}</p>
        <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
          <span>{source}</span>
          <span>•</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

export function AnimatedFeed() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-4">
      <div className="w-full max-w-md [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
        <AnimatedList delay={1500}>
          {feedItems.map((item, idx) => (
            <FeedCard key={idx} {...item} />
          ))}
        </AnimatedList>
      </div>
    </div>
  );
}
