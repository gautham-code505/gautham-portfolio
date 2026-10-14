import { useEffect, useRef } from "react";
import { site } from "../data/site";
import { loadGsap, prefersReducedMotion } from "../lib/motion";
import { DecisionField } from "../components/DecisionField";
import { projectBySlug } from "../lib/selectors";
import { assetExists } from "../lib/assets";
import { ButtonLink } from "../components/ButtonLink";
import { ResumeButton } from "../components/ResumeButton";
import { SignalTrace } from "../components/SignalTrace";
import { ArrowRight, GitHub } from "../components/Icons";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  // One orchestrated entrance: the name resolves letter by letter, then the rest settles in.
  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    let ctxRevert: (() => void) | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled || !root.current) return;
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-char]", { yPercent: 110, opacity: 0, duration: 0.7, stagger: 0.035 })
          .from("[data-hero-in]", { opacity: 0, y: 14, duration: 0.55, stagger: 0.09 }, "-=0.35")
          .from("[data-signal-trace]", { opacity: 0, x: 24, duration: 0.7 }, "-=0.6");
      }, root);
      ctxRevert = () => ctx.revert();
    });
    return () => { cancelled = true; ctxRevert?.(); };
  }, []);

  const flagship = projectBySlug("aegisflow-ai");
  const photo = site.photo && assetExists(site.photo.src) ? site.photo : undefined;
  return (
    <section ref={root} id="top" aria-labelledby="hero-heading" className="lab-grid hero-stage relative overflow-hidden">
      <DecisionField />
      <div className="relative z-10 mx-auto grid max-w-page gap-12 px-4 pb-16 pt-12 sm:px-8 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:pb-24">
        <div>
          <div className="flex items-center gap-4" data-hero-in>
            {photo && (
              <img
                src={photo.src}
                alt={photo.alt}
                width={104}
                height={104}
                className="size-[104px] shrink-0 rounded-2xl border border-border-strong object-cover"
              />
            )}
            <p className="label text-accent">{site.role}</p>
          </div>
          <h1 id="hero-heading" aria-label={site.name} className="mt-6 text-5xl sm:text-6xl lg:text-[4.5rem]">
            {site.name.split(" ").map((word, wi) => (
              <span key={wi} aria-hidden="true" className="mr-[0.28em] inline-block whitespace-nowrap last:mr-0">
                {[...word].map((ch, ci) => (
                  <span key={ci} className="inline-block overflow-hidden align-bottom">
                    <span data-char className="inline-block">{ch}</span>
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p data-hero-in className="mt-4 max-w-xl font-display text-2xl font-medium leading-snug text-text/90 sm:text-[1.75rem]">{site.headline}</p>
          <p data-hero-in className="mt-5 max-w-xl text-muted">{site.subhead}</p>

          <div data-hero-in className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#projects" variant="primary">Explore projects <ArrowRight /></ButtonLink>
            <ResumeButton />
            <ButtonLink href={site.links.github} external ariaLabel="GitHub profile (opens in a new tab)"><GitHub /> GitHub</ButtonLink>
          </div>

          <ul data-hero-in className="mt-10 flex flex-wrap gap-2" aria-label="Focus areas">
            {site.focus.map((f) => (
              <li key={f} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">{f}</li>
            ))}
          </ul>
        </div>

        {flagship?.pipeline && <SignalTrace pipeline={flagship.pipeline} />}
      </div>
    </section>
  );
}
