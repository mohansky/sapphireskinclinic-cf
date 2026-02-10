# R2Image Component

A reusable Astro component for displaying images stored in Cloudflare R2 bucket with automatic optimization using Astro's Image component.

## Setup

1. **Configure Astro to allow remote images** - Already done in `astro.config.mjs`:
   ```js
   image: {
     remotePatterns: [
       {
         protocol: "https",
         hostname: "pub-dd013104c4874c2abdbd26c8b454bc80.r2.dev",
       },
     ],
   }
   ```

2. Set the `R2_PUBLIC_URL` environment variable in your Cloudflare Pages settings:
   ```
   R2_PUBLIC_URL=https://your-r2-domain.com
   ```
   or if using custom domain:
   ```
   R2_PUBLIC_URL=https://cdn.sapphireskin.in
   ```

3. For local development, create a `.env` file:
   ```env
   R2_PUBLIC_URL=https://your-r2-domain.com
   ```

## Usage

### Basic Usage

```astro
---
import R2Image from "@/components/ui/R2Image.astro";
---

<R2Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
/>
```

### With CSS Classes

```astro
<R2Image
  src="/images/logo.png"
  alt="Company logo"
  width={200}
  height={100}
  class="rounded-xl shadow-lg"
/>
```

### Gallery Images

```astro
<R2Image
  src="/images/clinic/interior_1.jpg"
  alt="Clinic interior"
  width={400}
  height={300}
  class="object-cover rounded-lg"
  loading="lazy"
/>
```

### Video Poster

```astro
<video poster={`${R2_PUBLIC_URL}/ssac.jpg`}>
  <!-- Or use R2Image component for the poster -->
</video>
```

## Features

- **Automatic Optimization**: Uses Astro's Image component for automatic image optimization
- **Responsive Images**: Generates multiple sizes for different screen resolutions
- **Format Conversion**: Automatically converts to modern formats (WebP, AVIF)
- **Lazy Loading**: Built-in lazy loading by default
- **R2 Integration**: Seamlessly works with Cloudflare R2 storage

## Props

- `src` (required): Path to the image in R2 bucket (string: "/images/photo.jpg") or ImageMetadata object
- `alt` (required): Alternative text for the image
- `width` (optional): Image width (recommended for optimization)
- `height` (optional): Image height (recommended for optimization)
- `class` (optional): CSS classes to apply
- `loading` (optional): "lazy" (default) or "eager"
- `decoding` (optional): "async" (default), "sync", or "auto"
- `fallback` (optional): Fallback image path if R2_PUBLIC_URL is not set (default: "/placeholder.jpg")
- Any other standard Astro Image component attributes (via `...rest`)

## Type Safety

The component accepts two types of `src`:
- **String**: A path like `"/images/photo.jpg"` (automatically constructs R2 URL)
- **ImageMetadata**: An imported Astro image object (uses the `.src` property)
- **HTTP URLs**: Full URLs starting with "http" are passed through unchanged

## Migration Examples

### Before (local images)
```astro
<img src="/images/hero.jpg" alt="Hero" />
```

### After (R2 images)
```astro
<R2Image src="/images/hero.jpg" alt="Hero" />
```

### Before (Astro Image)
```astro
import { Image } from "astro:assets";
import heroImg from "@/images/hero.jpg";

<Image src={heroImg} alt="Hero" />
```

### After (R2 images)
```astro
import R2Image from "@/components/ui/R2Image.astro";

<R2Image src="/images/hero.jpg" alt="Hero" width={800} height={600} />
```

## Notes

- The component automatically handles URL construction
- If `src` starts with "/", it's automatically cleaned to avoid double slashes
- Falls back to a placeholder if `R2_PUBLIC_URL` is not set
- Use lazy loading by default for better performance
- For optimal SEO, always provide width and height attributes
