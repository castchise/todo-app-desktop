import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
