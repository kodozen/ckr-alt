import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

/**
 * Zweiter Bau, nur zum Vorrendern.
 *
 * Er erzeugt keine Seite für den Browser, sondern ein Bündel, das unter
 * Node läuft und aus einer Adresse HTML macht. Der Grundpfad muss
 * derselbe sein wie im Hauptbau, sonst zeigen die Verweise im
 * vorgerenderten HTML woandershin als die im Browser.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  base: process.env.BASIS_PFAD || "/",
  build: {
    ssr: "client/src/entry-server.tsx",
    outDir: "dist/ssr",
    emptyOutDir: true,
  },
});
