"use client";

import { Tabs, TabsList, TabsTrigger, TabsContents, TabsContent } from "@/components/ui/tabs";
import { useEffect, useRef } from "react";

interface Category {
  value: string;
  label: string;
}

interface BlogTabsProps {
  categories: Category[];
}

export function BlogTabs({ categories }: BlogTabsProps) {
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const stagingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create a staging container for posts that don't match the current filter
    const stagingContainer = document.createElement("div");
    stagingContainer.style.display = "none";
    stagingContainer.className = "blog-posts-staging";
    document.body.appendChild(stagingContainer);
    stagingRef.current = stagingContainer;

    // Move all posts into the "all" category container initially
    const posts = document.querySelectorAll(".blog-post");
    const allContainer = contentRefs.current["all"];

    if (allContainer) {
      posts.forEach((post) => {
        allContainer.appendChild(post);
      });
    }

    return () => {
      // Cleanup staging container on unmount
      if (stagingRef.current && stagingRef.current.parentNode) {
        stagingRef.current.parentNode.removeChild(stagingRef.current);
      }
    };
  }, []);

  const handleTabChange = (value: string) => {
    const targetContainer = contentRefs.current[value];

    if (!targetContainer || !stagingRef.current) return;

    // Collect all posts BEFORE clearing containers (convert NodeList to array)
    const posts = Array.from(document.querySelectorAll(".blog-post"));

    // Move all posts to staging first to preserve them
    posts.forEach((post) => {
      stagingRef.current!.appendChild(post);
    });

    // Clear all containers
    Object.values(contentRefs.current).forEach((container) => {
      if (container) {
        container.innerHTML = "";
      }
    });

    // Move filtered posts to target container, rest stay in staging
    posts.forEach((post) => {
      const postCategory = post.getAttribute("data-category");
      if (value === "all" || postCategory === value) {
        targetContainer.appendChild(post);
      }
      // Non-matching posts remain in staging (hidden)
    });
  };

  return (
    <Tabs defaultValue="all" onValueChange={handleTabChange} className="w-full">
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
            <div
              ref={(el) => {
                contentRefs.current[category.value] = el;
              }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            />
          </TabsContent>
        ))}
      </TabsContents>
    </Tabs>
  );
}
