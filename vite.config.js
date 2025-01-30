import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  historyApiFallback: true,
  optimizeDeps: {
    include: ["date-fns"],
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
