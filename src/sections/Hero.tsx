import { site } from "../data/site";
import { featuredProjects, projectBySlug } from "../lib/selectors";
import { ButtonLink } from "../components/ButtonLink";
import { ResumeButton } from "../components/ResumeButton";
import { SignalTrace } from "../components/SignalTrace";
import { ArrowRight, GitHub } from "../components/Icons";

export function Hero() {
  const flagship = projectBySlug("aegisflow-ai");
  const featured = featuredProjects();
  return (
    <section id="top" aria-labelledby="hero-heading" className="lab-grid relative">
      <div className="mx-auto grid max-w-page gap-12 px-4 pb-16 pt-12 sm:px-8 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:pb-24">
        <div>
          <p className="label inline-flex items-center gap-2 text-accent">
            <span className="size-1.5 rounded-full bg-signal-green" aria-hidden="true" />
            Open to internships
          </p>
          <h1 id="hero-heading" className="mt-5 text-4xl sm:text-5xl lg:text-[3.5rem]">
            {site.name}
            <span className="mt-3 block text-2xl font-medium text-muted sm:text-3xl">{site.headline}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg">{site.subhead}</p>
          <p className="mt-3 text-sm text-muted">{site.education}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#projects" variant="primary">Explore projects <ArrowRight /></ButtonLink>
            <ResumeButton />
            <ButtonLink href={site.links.github} external variant="secondary" ariaLabel="GitHub profile (opens in a new tab)">
              <GitHub /> GitHub
            </ButtonLink>
          </div>

          <p className="mt-10 text-sm text-muted">
            <span className="label mr-2 text-text">Featured</span>
            {featured.map((p, i) => (
              <span key={p.slug}>
                {i > 0 && <span aria-hidden="true"> · </span>}
                <a href={`#project-${p.slug}`} className="underline decoration-border-strong underline-offset-4 hover:text-accent hover:decoration-accent">{p.title}</a>
              </span>
            ))}
          </p>
        </div>

        {flagship?.pipeline && <SignalTrace pipeline={flagship.pipeline} />}
      </div>
    </section>
  );
}
