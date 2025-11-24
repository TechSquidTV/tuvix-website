import { GITHUB_URL } from "@/lib/constants";
import { RssIcon } from "@/components/icons/RssIcon";
import { TuvixLogo } from "@/components/tuvix-logo";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-8">
          <a href="/about" className="text-sm text-gray-600 hover:text-gray-900">
            About
          </a>
          <a href="/blog" className="text-sm text-gray-600 hover:text-gray-900">
            Blog
          </a>
          <a
            href="/blog/rss.xml"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <RssIcon className="h-4 w-4" />
            RSS Feed
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            GitHub
          </a>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center gap-4">
            <a href="/" className="flex items-center gap-2">
              <TuvixLogo className="h-6 w-auto" />
            </a>
            <p className="text-center text-sm text-gray-500">
              &copy; {currentYear} Tuvix. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
