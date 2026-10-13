import { featuredProjects } from "../lib/selectors";
import { Section } from "../components/Section";
import { ProjectCard } from "../components/ProjectCard";
import { ArchiveGrid } from "../components/ArchiveGrid";
import { Reveal } from "../components/Reveal";

export function Projects() {
  const featured = featuredProjects();
  return (
    <Section
      id="projects"
      index="02"
      eyebrow="Projects"
      title="What I've built — and what's still planned"
      intro="Each project shows its real status. Built features are backed by code or tests in the linked repository; planned work is labelled as planned."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((p, i) => (
          <div key={p.slug} id={`project-${p.slug}`} className="scroll-mt-24">
            <Reveal delay={(i % 2) * 0.06}><ProjectCard project={p} index={i} /></Reveal>
          </div>
        ))}
      </div>

      <h3 className="mt-20 text-2xl">Project archive</h3>
      <p className="mt-2 max-w-2xl text-muted">Earlier work, ongoing builds and design-stage concepts.</p>
      <div className="mt-6"><ArchiveGrid /></div>
    </Section>
  );
}
