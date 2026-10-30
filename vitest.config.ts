import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

// Separate from vite.config.ts so the app build config doesn't need to know
// about Vitest's "test" option typings.
export default defineConfig({
  base: "/juliacook/",
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
  },
});
