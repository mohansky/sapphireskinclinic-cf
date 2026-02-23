# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sapphire Skin & Aesthetics Clinic website built with Astro 5, deployed to Cloudflare Workers.

## Commands

```bash
pnpm dev       # Start development server
pnpm build     # Build for production
pnpm preview   # Preview production build locally
```

### Cloudflare Workers Deployment

```bash
npx wrangler dev           # Local Workers dev server
npx wrangler deploy        # Deploy to production
npx wrangler pages secret put RESEND_API_KEY  # Set secrets
```

Configuration: `wrangler.jsonc` (not wrangler.toml - this is Workers, not Pages)

## Architecture

### Content Collections (src/content.config.ts)

- **siteCollection**: Site-wide config from `src/content/site/index.yml` (navigation, hero, locations, testimonials, offers)
- **aboutCollection**: About page data from `src/content/about/index.yml` (doctors, clinic info)
- **treatments**: MDX files in `src/content/treatments/` with frontmatter (title, type, weight for sorting, before/after images)
- **blog**: MDX files in `src/content/blog/`
- **gallery**: YAML files in `src/content/gallery/`

### Key Integrations

- **@astrojs/cloudflare**: SSR adapter for Cloudflare Workers
- **Resend**: Email service for contact form (requires `RESEND_API_KEY` secret)
- **R2**: Images served from Cloudflare R2 via `R2_PUBLIC_URL` env var
- **Tailwind CSS v4** + **DaisyUI v5**: Styling with `ssac` custom theme

### Server-Side Features

- **Astro Actions** (`src/actions/index.ts`): Contact form handler with Zod validation
- **React Email** (`src/emails/`): Email templates for contact form submissions
- **Environment Variables** (defined in `astro.config.mjs`):
  - `RESEND_API_KEY` (secret) - Email sending
  - `BASE_URL` (public) - Site base URL
  - `R2_PUBLIC_URL` (public) - R2 bucket URL for images
  - `GTM` (client) - Google Tag Manager ID

### Component Structure

- `src/components/ui/`: Reusable UI components (Button, Heading, Container, R2Image)
- `src/components/sections/`: Page sections (Hero, Testimonials, TreatmentsCaro)
- `src/components/layout/`: Layout components (Navbar, Footer, Head)
- `src/components/schema/`: JSON-LD schema components for SEO
- `src/components/icons/`: SVG icon components

### Image Handling

Images are served from Cloudflare R2. Use the `R2Image` component which prepends `R2_PUBLIC_URL` to image paths. The `passthroughImageService()` is configured since R2 handles image optimization.

### Carousels/Sliders

Uses Swiper.js. When configuring Swiper with specific modules (Autoplay, FreeMode, Navigation, etc.), ensure modules are both imported AND registered in the `modules` array.
