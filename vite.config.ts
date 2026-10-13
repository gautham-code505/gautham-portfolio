import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

// List every file in /public at build time. Images and the resume PDF render
// only when their file is really there — drop a file in, rebuild, it appears.
const publicDir = resolve(__dirname, "public");
const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : ["/" + relative(publicDir, full).split("\\").join("/")];
  });

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __PUBLIC_FILES__: JSON.stringify(walk(publicDir)),
  },
});
