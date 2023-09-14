import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { Preset } from "@vite-pwa/assets-generator/config";

export const minimalPreset = {
  transparent: {
    sizes: [64, 192, 512],
    favicons: [[64, "favicon.ico"]],
  },
  maskable: {
    sizes: [512],
  },
  apple: {
    sizes: [180],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
