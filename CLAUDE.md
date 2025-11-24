# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro website using React integration, Tailwind CSS v4, and Shadcn UI components. The project uses pnpm as the package manager.

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Architecture

### Stack

- **Framework**: Astro 5.x with React integration
- **Styling**: Tailwind CSS v4 (using Vite plugin)
- **UI Components**: Shadcn UI (New York style)
- **Package Manager**: pnpm 10.19.0

### Key Configuration

- **Path Aliases**: `@/*` resolves to `./src/*`
- **Shadcn Config**: `components.json` defines component structure with:
  - Components in `@/components`
  - UI components in `@/components/ui`
  - Utilities in `@/lib/utils`
  - Global styles in `src/styles/global.css`

### Directory Structure

```
src/
├── components/     # Astro and React components
│   └── ui/        # Shadcn UI components
├── layouts/       # Astro layout components
├── lib/           # Utility functions (cn helper, etc.)
├── pages/         # Astro pages (file-based routing)
└── styles/        # Global CSS with Tailwind config
```

## Critical: Shadcn UI + Astro Islands

**React context is NOT shared between Astro islands.** This is the most common mistake when using Shadcn UI with Astro.

### The Problem

Calling Shadcn UI components directly in `.astro` files will fail because Astro's islands architecture isolates each React component. Components that rely on React context (Drawer, Dialog, Dropdown, Popover, Tooltip, Select, Command, etc.) cannot communicate across island boundaries.

### The Solution

**Always wrap Shadcn UI components in a parent React component (`.tsx` file)**, then import that wrapper into your Astro files.

#### ❌ Wrong Approach:

```astro
---
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
---
<!-- Each of these becomes a separate island - context is broken -->
<Drawer client:load>
  <DrawerTrigger client:load>Open</DrawerTrigger>
  <DrawerContent client:load>Content</DrawerContent>
</Drawer>
```

#### ✅ Correct Approach:

```tsx
// src/components/MyDrawer.tsx
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";

export const MyDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>Content</DrawerContent>
    </Drawer>
  );
};
```

```astro
---
// src/pages/index.astro
import { MyDrawer } from "@/components/MyDrawer";
---
<!-- Single island with shared context -->
<MyDrawer client:load />
```

### Key Rules:

1. Group related Shadcn components in a single React file
2. Import the wrapper component into `.astro` files
3. Apply `client:*` directive only to the wrapper, not individual Shadcn components
4. This ensures all components share the same React context

Reference: https://astro-tips.dev/tips/shadcn/

## Tailwind CSS v4

This project uses Tailwind CSS v4 with the Vite plugin (not PostCSS). The global CSS file uses `@import "tailwindcss"` and `@theme inline` for configuration.

### Dark Mode

Dark mode is configured using a custom variant: `@custom-variant dark (&:is(.dark *))`. Apply the `.dark` class to enable dark mode styles.

### Animation Library

`tw-animate-css` is included for additional animation utilities.

## Blog Post Images

### Image Storage

Blog post hero images should be stored **next to the markdown file** in the `src/content/blog/` directory:

```
src/content/blog/
  my-post.md
  my-post-cover.jpg  ← Store image here
```

Reference images in frontmatter using relative paths:

```yaml
---
title: "My Post"
coverImage: "./my-post-cover.jpg"
coverAlt: "Descriptive alt text"
---
```

### Recommended Image Sizes

#### Blog Post Cover Images

- **Aspect Ratio**: 16:9 (aspect-video)
- **Recommended Size**: **1920×1080px** (Full HD)
- **Alternative**: 1600×900px (smaller file size, still high quality)
- **File Format**: JPG or WebP
- **Max File Size**: ~500KB (optimize before adding)

Used in:

- Blog post detail pages (`BlogPostLayout.astro`)
- Blog grid cards (`blog/index.astro`)

#### Hero Images (Blog Index)

- **Aspect Ratio**: 5:4
- **Recommended Size**: **1600×1280px**
- **Alternative**: 1200×960px (smaller file size)
- **File Format**: JPG or WebP
- **Max File Size**: ~500KB (optimize before adding)

Used in:

- Featured hero post on blog index page (`blog/index.astro`)

#### Open Graph Images

- **Size**: **1200×630px** (standard OG image size)
- **Aspect Ratio**: ~1.91:1
- **File Format**: PNG or JPG
- **Note**: These are auto-generated at `/blog/og-image/[slug].png.ts`

### Image Optimization Tips

1. **Before adding images**:
   - Resize to recommended dimensions
   - Compress using tools like [Squoosh](https://squoosh.app/) or [TinyPNG](https://tinypng.com/)
   - Use WebP format when possible for better compression

2. **Alt Text**:
   - Always provide descriptive `coverAlt` text in frontmatter
   - This is required for accessibility and SEO

3. **Image Component**:
   - The project uses Astro's `<Image />` component which provides:
     - Automatic CLS (Cumulative Layout Shift) prevention
     - Type safety via `image()` helper in content config
     - Note: Cloudflare adapter uses passthrough service (no Sharp optimization)
