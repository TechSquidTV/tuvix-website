"use client";

import type { CollectionEntry } from "astro:content";
import { Tabs, TabsList, TabsTrigger, TabsContents, TabsContent } from "@/components/ui/tabs";

interface BlogGridProps {
  posts: CollectionEntry<"blog">[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  const categories = [
    { value: "all", label: "All" },
    { value: "tutorials", label: "Tutorials" },
    { value: "news", label: "News" },
  ];

  const getFilteredPosts = (category: string) => {
    if (category === "all") return posts;
    return posts.filter((post) => post.data.category.toLowerCase() === category);
  };

  // Get hero post (first featured post or first post)
  const heroPost = posts.find((post) => post.data.featured) || posts[0];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const renderPostGrid = (categoryPosts: CollectionEntry<"blog">[]) => {
    const gridPosts = categoryPosts.filter((post) => post.slug !== heroPost?.slug);

    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {gridPosts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
          >
            {post.data.coverImage && (
              <img
                src={post.data.coverImage.src}
                alt={post.data.title}
                className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
              />
            )}
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-3 flex items-center gap-3 text-sm">
                <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-600">
                  {post.data.category}
                </span>
                <time className="text-gray-600">{formatDate(post.data.publishedDate)}</time>
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-orange-600">
                {post.data.title}
              </h3>
              <p className="mb-4 flex-1 text-sm text-gray-600">{post.data.description}</p>
              <div className="text-sm text-gray-500">By {post.data.author}</div>
            </div>
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      {/* Hero Post */}
      {heroPost && (
        <article className="group relative mb-20 flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-0">
          {/* Image - Separate from card */}
          {heroPost.data.coverImage && (
            <a
              href={`/blog/${heroPost.slug}`}
              className="flex-shrink-0 overflow-hidden rounded-3xl shadow-xl transition-all group-hover:shadow-2xl lg:w-[43rem]"
            >
              <img
                src={heroPost.data.coverImage.src}
                alt={heroPost.data.title}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ aspectRatio: "5 / 4" }}
              />
            </a>
          )}

          {/* Text Card - Overlaps image on desktop */}
          <a
            href={`/blog/${heroPost.slug}`}
            className="rounded-3xl bg-white p-8 shadow-xl transition-all group-hover:shadow-2xl md:p-10 lg:absolute lg:right-0 lg:w-[48rem] lg:p-12"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white">
                {heroPost.data.category}
              </span>
              <time className="text-xs font-medium text-gray-500">
                {formatDate(heroPost.data.publishedDate)}
              </time>
            </div>
            <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-orange-600 md:text-4xl lg:text-5xl">
              {heroPost.data.title}
            </h1>
            <p className="mb-6 text-base leading-relaxed text-gray-600 md:text-lg">
              {heroPost.data.description}
            </p>
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="flex items-center gap-3">
                {heroPost.data.authorAvatar ? (
                  <img
                    src={heroPost.data.authorAvatar}
                    alt={heroPost.data.author}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">
                    {heroPost.data.author.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-900">{heroPost.data.author}</p>
                  <p className="text-xs text-gray-500">Author</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900 group-hover:text-orange-600">
                  Read more
                </span>
                <svg
                  className="h-4 w-4 text-gray-900 transition-transform group-hover:translate-x-1 group-hover:text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </a>
        </article>
      )}

      {/* Category Filter Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <div className="mb-8 flex justify-center">
          <TabsList className="bg-transparent gap-4">
            {categories.map((category) => (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className="rounded-full px-6 py-2 font-medium transition-all data-[state=inactive]:border-0 data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 data-[state=inactive]:shadow-none data-[state=active]:border-2 data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:text-gray-900 data-[state=active]:shadow-none hover:text-gray-900"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContents>
          {categories.map((category) => (
            <TabsContent key={category.value} value={category.value}>
              {renderPostGrid(getFilteredPosts(category.value))}
            </TabsContent>
          ))}
        </TabsContents>
      </Tabs>
    </div>
  );
}
