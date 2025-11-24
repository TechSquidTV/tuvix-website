import { useState } from "react";
import { GITHUB_URL, FEED_URL } from "@/lib/constants";
import { TuvixLogo } from "@/components/tuvix-logo";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <TuvixLogo className="h-8 w-auto" />
            <span className="text-2xl font-bold">Tuvix</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          <a href="/" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
            Home
          </a>
          <a
            href="/blog"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
          >
            Blog
          </a>
          <a
            href="/about"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
          >
            About
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
          >
            GitHub
          </a>
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href={FEED_URL}
            className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-6 pb-3 pt-2">
            <a
              href="/"
              className="block rounded-md px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
            >
              Home
            </a>
            <a
              href="/blog"
              className="block rounded-md px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
            >
              Blog
            </a>
            <a
              href="/about"
              className="block rounded-md px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
            >
              About
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
            >
              GitHub
            </a>
            <a
              href={FEED_URL}
              className="block rounded-md bg-black px-3 py-2 text-base font-semibold text-white hover:bg-gray-800"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
