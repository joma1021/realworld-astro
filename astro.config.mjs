import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [preact({ compat: true })],
  output: "server",
  adapter: vercel(),
  vite: {
    css: {
      // Legacy Conduit/Bootstrap CSS contains IE-only @media (min-width: 0\0) hacks
      // that Lightning CSS (Vite 8 / Astro 7 default minifier) rejects.
      lightningcss: {
        errorRecovery: true,
      },
    },
  },
});
