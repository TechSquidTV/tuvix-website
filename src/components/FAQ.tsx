"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { GITHUB_URL, PERSONAL_SITE_URL } from "@/lib/constants";

const faqs = [
  {
    question: "Is Tuvix really free?",
    answer:
      "Yes! RSS feeds are typically low-impact, and so we are so far able to offer a free hosted version that you can use right away. If you want zero tracking and complete control, you can also self-host it for free since it's open source.",
  },
  {
    question: "What's RSS and why should I care?",
    answer:
      'RSS (Really Simple Syndication) used to be the main way to "subscribe" to individual websites and blogs, before the internet became centralized into a few social media platforms. \
      When a website publishes new content, like a blog post, a podcast, or a video, they will publish an RSS feed that Tuvix or other RSS readers can subscribe to. An RSS aggregator, like Tuvix, will then fetch the latest content from the RSS feeds and display it in a chronological order, like a personally curated newspaper.',
  },
  {
    question: "How is this different from Feedly or other RSS readers?",
    answer:
      "Tuvix isn't a company, it's a project, used and maintained by people who want and care about it. Tuvix makes using RSS feel right at home with your favorite daily apps, with a clean, intuitive interface that works beautifully on any device. No clutter, no distractions—just your content.",
  },
  {
    question: "Can I import my existing feeds?",
    answer:
      "Absolutely! Tuvix supports OPML import, which is the standard format for RSS subscriptions. You can export your feeds from any RSS reader and import them into Tuvix in seconds.",
  },
  {
    question: "What about mobile apps?",
    answer:
      "Tuvix is available as a PWA (Progressive Web App) and can be installed on your device's home screen. It's like a native app, but it doesn't require you to download anything from the app stores. Once installed, Tuvix will work like any native app, including offline support.",
  },
  {
    question: "Do you track my reading habits?",
    answer:
      "While we do not use traditional analytics tools, we do use Sentry to monitor for errors and performance issues to help make a better app. For a 100% private experience, self-host Tuvix on your own computer or server.",
  },
  {
    question: "How do I self-host Tuvix?",
    answer: (
      <>
        Be up and running in 2 minutes with Docker Compose. Check out our{" "}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          GitHub repository
        </a>{" "}
        for detailed instructions.
      </>
    ),
  },
  {
    question: "Can I publish my own RSS feeds with Tuvix?",
    answer:
      "Yes! Currently Tuvix allows you to combine filtered and unfiltered feeds into a new public feed for consumption in other RSS readers.",
  },
  {
    question: "Will Tuvix always be free?",
    answer:
      "The self-hosted version will always be free and open source. For the hosted version, it's hard to say what the future looks like. We think we will make it pretty far with free hosting limits and we'd like to keep it that way.",
  },
  {
    question: "Who is behind Tuvix?",
    answer: (
      <>
        Me,{" "}
        <a
          href={PERSONAL_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          TechSquidTV
        </a>
        ! And a bunch of AI bots, and the amazing people who contribute to the project on{" "}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          GitHub
        </a>
        , and the likely thousands of people who worked on the many, many, dependencies that Tuvix
        relies on.
      </>
    ),
  },
];

export function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
          <AccordionContent>
            <div className="text-gray-600">{faq.answer}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
