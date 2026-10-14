import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { loadGsap, prefersReducedMotion } from "../lib/motion";
import { journey } from "../data/journey";
import { hasCaseStudy, projectBySlug } from "../lib/selectors";
import type { JourneyKind } from "../types/portfolio";
import { ArrowRight } from "./Icons";

const kindLabel: Record<JourneyKind, string> = {
  education: "Education",
  project: "Project",
  achievement: "Achievement",
  certification: "Certification",
  role: "Current",
};
// Colour + text label together; colour is never the only signal.
const kindDot: Record<JourneyKind, string> = {
  education: "border border-muted bg-bg",
  project: "bg-accent",
  achievement: "bg-signal-amber",
  certification: "bg-signal-green",
  role: "bg-text",
};
const kindText: Record<JourneyKind, string> = {
  education: "text-muted",
  project: "text-accent",
  achievement: "text-signal-amber",
  certification: "text-signal-green",
  role: "text-text",
};

/** Vertical timeline grouped by year, oldest first. */
export function Journey() {
  const root = useRef<HTMLDivElement>(null);

  // The cyan spine fills as each year block scrolls past, and each dot lights when reached.
  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    let revert: (() => void) | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled || !root.current) return;
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-spine-host]").forEach((host) => {
          const line = host.querySelector<HTMLElement>("[data-spine]");
          if (line) {
            gsap.fromTo(line, { scaleY: 0 }, {
              scaleY: 1, ease: "none",
              scrollTrigger: { trigger: host, start: "top 65%", end: "bottom 55%", scrub: 0.4 },
            });
          }
          host.querySelectorAll<HTMLElement>("[data-dot]").forEach((dot) => {
            gsap.from(dot, {
              scale: 0.2, opacity: 0.2, duration: 0.4, ease: "back.out(2)",
              scrollTrigger: { trigger: dot, start: "top 70%", once: true },
            });
          });
        });
      }, root);
      revert = () => ctx.revert();
    });
    return () => { cancelled = true; revert?.(); };
  }, []);

  const entries = [...journey].sort((a, b) => a.sort.localeCompare(b.sort));
  const years = Array.from(new Set(entries.map((e) => (e.when === "Now" ? "Now" : e.sort.slice(0, 4)))));

  return (
    <div ref={root} className="relative">
      {years.map((y) => {
        const items = entries.filter((e) => (e.when === "Now" ? "Now" : e.sort.slice(0, 4)) === y);
        return (
          <section key={y} aria-label={y === "Now" ? "Now" : `Year ${y}`} className="grid gap-x-8 sm:grid-cols-[88px_1fr]">
            <h3 className="font-mono text-sm text-muted sm:pt-0.5 sm:text-right">
              <span className="sticky top-24 inline-block">{y}</span>
            </h3>
            <ol data-spine-host className="relative border-l border-border pb-10 pl-6 sm:pl-8">
              <span data-spine aria-hidden="true" className="spine pointer-events-none absolute -left-px top-0 h-full w-px bg-accent" />
              {items.map((e) => {
                const p = e.project ? projectBySlug(e.project) : undefined;
                const href = p ? (hasCaseStudy(p) ? `/projects/${p.slug}` : `/#project-${p.slug}`) : undefined;
                return (
                  <li key={e.title} className="relative pb-7 last:pb-0">
                    <span
                      data-dot
                      className={`absolute -left-[calc(1.5rem+5px)] top-1.5 size-[9px] rounded-full sm:-left-[calc(2rem+5px)] ${kindDot[e.kind]} ${e.highlight ? "ring-4 ring-accent/15" : ""}`}
                      aria-hidden="true"
                    />
                    <p className={`label ${kindText[e.kind]}`}>
                      {kindLabel[e.kind]}{e.when !== "Now" && <span className="text-muted"> · {e.when}</span>}
                    </p>
                    <h4 className={`mt-1.5 font-display font-medium ${e.highlight ? "text-xl" : "text-lg"}`}>{e.title}</h4>
                    <p className="mt-1 max-w-2xl text-[0.95rem] text-muted">{e.detail}</p>
                    {href && p && (
                      <Link to={href} className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm text-accent hover:text-accent-strong">
                        {hasCaseStudy(p) ? "Read the case study" : "See the project"} <ArrowRight /><span className="sr-only">: {p.title}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
