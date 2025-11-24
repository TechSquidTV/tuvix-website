import { getCollection } from "astro:content";
import { generateOpenGraphImage } from "astro-og-canvas";
import type { ImageMetadata } from "astro";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

interface Props {
  post: Awaited<ReturnType<typeof getCollection<"blog">>>[number];
}

export async function GET({ props }: { props: Props }) {
  const { post } = props;
  const { title, description, coverImage } = post.data;

  // Build the ogImage options
  const ogImageOptions: Parameters<typeof generateOpenGraphImage>[0] = {
    title: title,
    description: description,
    font: {
      title: {
        size: 72,
        lineHeight: 1.2,
        families: ["Inter"],
        weight: "Bold",
      },
      description: {
        size: 36,
        lineHeight: 1.4,
        families: ["Inter"],
        weight: "Normal",
      },
    },
    // Use direct font file URLs from Google Fonts CDN
    // These are the actual .woff2 files, not CSS
    fonts: [
      "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZ9hiA.woff2", // Inter Regular 400
      "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZ9hiA.woff2", // Inter Bold 700
    ],
    format: "PNG",
    padding: 80,
  };

  // Use cover image as background if available, otherwise use gradient
  if (coverImage) {
    // coverImage is an ImageMetadata object from Astro content collections
    // The src property is typically a URL path, but astro-og-canvas needs a file system path
    // Extract the filename from the src (which might be a URL path like "/blog/cover.webp")
    // and construct the path relative to project root
    const imageMetadata = coverImage as ImageMetadata;
    const srcPath = typeof imageMetadata.src === "string" ? imageMetadata.src : imageMetadata.src;
    const filename = typeof srcPath === "string" ? srcPath.split("/").pop() || srcPath : srcPath;
    // Cover images are stored in src/content/blog/ alongside the markdown files
    const imagePath = `./src/content/blog/${filename}`;

    ogImageOptions.bgImage = {
      path: imagePath,
      fit: "cover", // Cover the entire canvas while maintaining aspect ratio
      position: "center", // Center the image
    };
  } else {
    ogImageOptions.bgGradient = [
      [15, 23, 42],
      [30, 41, 59],
    ]; // Nice gradient background
  }

  return await generateOpenGraphImage(ogImageOptions);
}
