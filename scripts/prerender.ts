/**
 * Writes a static HTML file for every route after `vite build`, so recruiters'
 * tools, link previews and search engines that don't run JavaScript still see
 * the full content. The client then hydrates the same markup.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const dist = resolve("dist");
const ssrEntry = pathToFileURL(resolve("dist-ssr/entry-server.js")).href;
const { render, publicProjects, hasCaseStudy, site } = await import(ssrEntry);

const template = readFileSync(resolve(dist, "index.html"), "utf8");
const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

const routes: { url: string; title: string; description: string }[] = [
  { url: "/", title: site.seo.title, description: site.seo.description },
  ...publicProjects()
    .filter(hasCaseStudy)
    .map((p: { slug: string; title: string; summary: string }) => ({
      url: `/projects/${p.slug}`,
      title: `${p.title} — ${site.name}`,
      description: p.summary,
    })),
];

for (const r of routes) {
  const html = render(r.url);
  const canonical = `https://gautham-portfolio-alpha.vercel.app${r.url === "/" ? "/" : r.url}`;
  const page = template
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(r.title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escape(r.description)}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escape(r.title)}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${escape(r.description)}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`);
  // Flat files (projects/q-rescue.html) are served at /projects/q-rescue by Vercel (cleanUrls) and vite preview.
  const out = r.url === "/" ? resolve(dist, "index.html") : resolve(dist, `.${r.url}.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, page);
  console.log(`✓ prerendered ${r.url}`);
}
rmSync(resolve("dist-ssr"), { recursive: true, force: true });
