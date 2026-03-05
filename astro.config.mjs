// @ts-check
import { defineConfig, envField, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

import mdx from "@astrojs/mdx";

import cloudflare from "@astrojs/cloudflare";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";


// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://sapphireskin.in",
  integrations: [
    icon(),
    mdx(),
    react(),
    sitemap({
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date("2025-05-05"),
    }),
  ],

  image: {
    service: passthroughImageService(),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-dd013104c4874c2abdbd26c8b454bc80.r2.dev",
      },
    ],
  },

  env: {
    schema: {
      RESEND_API_KEY: envField.string({
        context: "server",
        access: "secret",
        startsWith: "re_",
        optional: false,
      }),
      BASE_URL: envField.string({
        context: "server",
        access: "public",
        optional: false,
      }),
      R2_PUBLIC_URL: envField.string({
        context: "server",
        access: "public",
        optional: true,
      }),
      GTM: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  output: "server",
  adapter: cloudflare(),
});
