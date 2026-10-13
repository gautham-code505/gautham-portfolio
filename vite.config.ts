import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { site } from "./src/data/site";

// The resume button renders only when the PDF really exists in /public.
// Drop the file at public/resume/Gautham_MA_ATS_Resume.pdf (or change
// site.resumePath) and rebuild — no component edits needed.
const resumeFile = resolve(__dirname, "public", site.resumePath.replace(/^\//, ""));
const resumeAvailable = existsSync(resumeFile);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __RESUME_AVAILABLE__: JSON.stringify(resumeAvailable),
  },
});
