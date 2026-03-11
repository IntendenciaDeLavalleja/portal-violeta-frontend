// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://portalvioleta.lavalleja.uy",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["leaflet"],
    },
  },

  integrations: [react(), sitemap()],
});