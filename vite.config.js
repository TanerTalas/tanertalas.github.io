import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// tanertalas.github.io is a user site served from the repo root, so base is "/".
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
});
