// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://campingarequita.uy",
  // Static output: Astro genera HTML/CSS/JS puro, sin servidor Node en runtime.
  // El Dockerfile sirve el dist/ con nginx:alpine.
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), sitemap()],
});