import { site } from "../data/site";
import { projectBySlug } from "../lib/selectors";
import { assetExists } from "../lib/assets";
import { ButtonLink } from "../components/ButtonLink";
import { ResumeButton } from "../components/ResumeButton";
import { SignalTrace } from "../components/SignalTrace";
import { ArrowRight, GitHub } from "../components/Icons";

export function Hero() {
  const flagship = projectBySlug("aegisflow-ai");
  const photo = site.photo && assetExists(site.photo.src) ? site.photo : undefined;
  return (
    <section id="top" aria-labelledby="hero-heading" className="lab-grid relative">
      <div className="mx-auto grid max-w-page gap-12 px-4 pb-16 pt-12 sm:px-8 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:pb-24">
        <div>
          <div className="flex items-center gap-4">
            {photo && (
              <img
                src={photo.src}
                alt={photo.alt}
                width={88}
                height={88}
                className="size-[88px] shrink-0 rounded-2xl border border-border-strong object-cover"
              />
            )}
            <p className="label text-accent">{site.role}</p>
          </div>
          <h1 id="hero-heading" className="mt-6 text-4xl sm:text-5xl lg:text-[3.5rem]">{site.name}</h1>
          <p className="mt-4 max-w-xl font-display text-2xl font-medium leading-snug text-text/90 sm:text-[1.75rem]">{site.headline}</p>
          <p className="mt-5 max-w-xl text-muted">{site.subhead}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#projects" variant="primary">Explore projects <ArrowRight /></ButtonLink>
            <ResumeButton />
            <ButtonLink href={site.links.github} external ariaLabel="GitHub profile (opens in a new tab)"><GitHub /> GitHub</ButtonLink>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Focus areas">
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
