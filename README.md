# Gautham M A — Portfolio

Personal portfolio built with React, Vite, TypeScript, Tailwind CSS and GSAP. Design direction: **Signal Lab**.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # validates content, type-checks, builds to dist/
npm run preview    # serve the production build
```

Requires Node 18+.

## Editing content

All content lives in `src/data/`. Components never hard-code personal facts.

| File | What it holds |
| --- | --- |
| `site.ts` | Name, headline, about text, contact links, resume path, SEO |
| `projects.ts` | Every project, including hidden ones |
| `skills.ts` | Grouped skills (no percentages) |
| `achievements.ts` | Confirmed results only |
| `experience.ts` | Positions of responsibility |
| `education.ts` | Education and certifications |

The schema is in `src/types/portfolio.ts`.

### Projects

- `visibility`: `"featured"` (top cards, 3–4 of them), `"archive"` (grid) or `"hidden"` (never rendered).
- `featuresBuilt` holds only verified working features. Anything else goes in `featuresPlanned`.
- Leave `role`, `context`, `demo` undefined until confirmed. Empty fields simply don't render.
- A case-study page at `/projects/<slug>` exists only when `caseStudy` has sections.
- `pipeline` drives the signal-trace system diagram. Each stage is `built` or `planned`.

### Content guardrails

`npm run build` runs `scripts/validate-content.ts` first. The build fails if:

- there are fewer than 3 or more than 4 featured projects;
- a Completed or Working Prototype project has no evidence;
- a repo link points outside `github.com/gautham-code505`, or to the empty `Q-Rescue` repo;
- any demo link exists (allowed only once a live public demo is verified — remove the check then);
- content contains a quantum-advantage claim or the unverified LeetCode rating;
- an achievement claims a Q-HACK or CIH'26 result.

## Resume

Put the PDF at `public/resume/Gautham_MA_ATS_Resume.pdf`, then rebuild (restart `npm run dev` too).
The download buttons render only when that file exists at build time. To change the filename, edit `resumePath` in `src/data/site.ts`.

## Before launch

```bash
npm run check-links   # checks GitHub links; LinkedIn/LeetCode/SkillRack need a manual check
```

Then:

- Check the site on a phone and with reduced motion turned on.
- Add `og:image`, `og:url` and `<link rel="canonical">` in `index.html` once the Vercel URL is final.

## Deploy (Vercel)

1. Push this folder to a GitHub repository.
2. Import it in Vercel. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
3. `vercel.json` already rewrites routes to `index.html`, so `/projects/<slug>` works on refresh.

No environment variables or secrets are needed.

## Accessibility and motion

- Skip link, landmarks, visible 2px focus ring and 44px tap targets.
- Colour contrast is checked against WCAG AA: body text is at least 7.6:1 on every surface.
- `prefers-reduced-motion` turns off every GSAP animation; content is never hidden without JavaScript.
- GSAP loads lazily after first paint. No WebGL.
