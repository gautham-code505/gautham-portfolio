/**
 * Checks every external URL the site renders. Run before launch:
 *   npm run check-links
 * Some profile sites (LinkedIn, LeetCode) block automated requests and are
 * reported as "manual check" instead of failures.
 */
import { publicProjects } from "../src/lib/selectors";
import { site } from "../src/data/site";

const urls = new Map<string, string>();
for (const p of publicProjects()) {
  if (p.repo) urls.set(p.repo.url, p.slug);
  if (p.demo) urls.set(p.demo.url, p.slug);
  for (const s of p.caseStudy ?? []) if (s.table) urls.set(s.table.source, `${p.slug} table`);
}
for (const [k, v] of Object.entries(site.links)) urls.set(v, `site.${k}`);

const MANUAL = /linkedin\.com|leetcode\.com|skillrack\.com/;
let failed = 0;

for (const [url, owner] of urls) {
  if (MANUAL.test(url)) {
    console.log(`?  manual check  ${url}  (${owner})`);
    continue;
  }
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    const ok = res.status < 400;
    if (!ok) failed++;
    console.log(`${ok ? "✓" : "✗"}  ${res.status}  ${url}  (${owner})`);
  } catch (e) {
    failed++;
    console.log(`✗  ERR  ${url}  (${owner}) ${(e as Error).message}`);
  }
}
if (failed) {
  console.error(`\n${failed} link(s) failed.`);
  process.exit(1);
}
console.log("\nAll automatically checkable links resolved.");
