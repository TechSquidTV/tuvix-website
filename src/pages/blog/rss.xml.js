import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const blog = await getCollection("blog");

  // Sort by published date, newest first
  const sortedPosts = blog.sort(
    (a, b) => b.data.publishedDate.getTime() - a.data.publishedDate.getTime()
  );

  return rss({
    title: "Tuvix Blog",
    description:
      "Take back control of your internet with Tuvix, the open-source RSS aggregator. No algorithms, no tracking—just your content, your way.",
    site: context.site,
    items: await Promise.all(
      sortedPosts.map(async (post) => {
        const item = {
          title: post.data.title,
          pubDate: post.data.publishedDate,
          description: post.data.description,
          link: `/blog/${post.slug}/`,
        };

        // Include cover image if available
        if (post.data.coverImage) {
          const imagePath = post.data.coverImage.startsWith("./")
            ? `/blog/${post.data.coverImage.slice(2)}`
            : post.data.coverImage.startsWith("/")
              ? post.data.coverImage
              : `/blog/${post.data.coverImage}`;
          const imageUrl = new URL(imagePath, context.site).href;
          const imageAlt = post.data.coverAlt || post.data.title;

          // Include image HTML in description (most RSS readers support HTML in description)
          item.description = `<img src="${imageUrl}" alt="${imageAlt}" /><br/><br/>${post.data.description}`;
        }

        return item;
      })
    ),
    trailingSlash: false,
  });
}
