import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.date(),
    author: z.string().default("Kyle (TechSquidTV)"),
    authorAvatar: z.string().default("/avatar.svg"),
    category: z.enum(["Tutorials", "News"]),
    // Using string instead of image() to avoid Sharp processing with passthrough service
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

// Define img collection to suppress auto-generation warning
// This folder contains image assets (not markdown), so no files will be processed
const imgCollection = defineCollection({
  type: "content",
  schema: z.object({
    // Empty schema since this folder only contains image assets, not markdown files
  }),
});

export const collections = {
  blog: blogCollection,
  img: imgCollection,
};
