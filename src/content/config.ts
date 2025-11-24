import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedDate: z.date(),
      author: z.string().default("Kyle (TechSquidTV)"),
      authorAvatar: z.string().default("/avatar.svg"),
      category: z.enum(["Tutorials", "News"]),
      coverImage: image().optional(),
      coverAlt: z.string().optional(),
      featured: z.boolean().default(false),
    }),
});

export const collections = {
  blog: blogCollection,
};
