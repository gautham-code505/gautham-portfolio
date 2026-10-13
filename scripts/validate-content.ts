/**
 * Content guardrails. Runs before every build and fails it on any violation,
 * so an unverified or overstated claim can't ship by accident.
 */
import { projects } from "../src/data/projects";
import { achievements } from "../src/data/achievements";
import { site } from "../src/data/site";

const errors: string[] = [];
const fail = (msg: string) => errors.push(msg);

const OWN_REPO = "https://github.com/gautham-code505/";
// Phrases that must never appear in public content as positive claims.
const BANNED = [/(?<!no )quantum advantage/i,/\b2972\b/, /production[- ]ready/i, /deployed in production/i];

const featured = projects.filter((p) => p.visibility === "featured");
if (featured.length < 3 || featured.length > 4) fail(`Expected 3–4 featured projects, found ${featured.length}.`);

const slugs = new Set<string>();
for (const p of projects) {
  if (slugs.has(p.slug)) fail(`Duplicate slug: ${p.slug}`);
  slugs.add(p.slug);
  if (p.visibility === "hidden") continue;

  const where = `[${p.slug}]`;
  if (!p.summary || p.summary.length > 260) fail(`${where} summary missing or longer than 260 characters.`);
  if (p.repo && !p.repo.url.startsWith(OWN_REPO)) fail(`${where} repo URL is not under ${OWN_REPO}.`);
  if (p.demo) fail(`${where} has a demo link — only allowed once a live public demo is verified.`);
  if (p.repo && /\/Q-Rescue$/.test(p.repo.url)) fail(`${where} links the empty Q-Rescue repo; use PairCover-Q-.`);

  const built = p.status === "Completed" || p.status === "Working Prototype";
  if (built && p.evidence.length === 0) fail(`${where} status "${p.status}" needs at least one evidence line.`);
  if (built && p.featuresBuilt.length === 0) fail(`${where} status "${p.status}" needs featuresBuilt.`);
  if (!built && p.status !== "In Progress" && p.featuresBuilt.length > 0)
    fail(`${where} "${p.status}" must not list built features.`);
  if (p.visibility === "featured" && p.evidence.length === 0) fail(`${where} featured project without evidence.`);

  for (const s of p.screenshots ?? []) if (!s.alt) fail(`${where} screenshot without alt text.`);

  const text = JSON.stringify({ ...p, internalNote: undefined });
  for (const re of BANNED) if (re.test(text)) fail(`${where} contains banned claim ${re}.`);
}

for (const a of achievements) {
  if (/q-?hack/i.test(a.title)) fail(`Achievement "${a.title}": Q-HACK result is unconfirmed.`);
  if (/CIH/i.test(a.title)) fail(`Achievement "${a.title}": CIH'26 result is unconfirmed.`);
}

if (!site.resumePath.startsWith("/")) fail("site.resumePath must be an absolute public path.");

if (errors.length) {
  console.error(`\n✗ Content validation failed (${errors.length}):\n  - ${errors.join("\n  - ")}\n`);
  process.exit(1);
}
const pub = projects.filter((p) => p.visibility !== "hidden").length;
console.log(`✓ Content valid: ${featured.length} featured, ${pub - featured.length} archive, ${projects.length - pub} hidden.`);
