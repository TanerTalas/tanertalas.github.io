import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Served from the domain root on Vercel, so base is "/".
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
});
