import { Link } from "react-router-dom";
import type { Project } from "../types/portfolio";
import { hasCaseStudy } from "../lib/selectors";
import { StatusBadge } from "./StatusBadge";
import { ArrowRight, GitHub } from "./Icons";

/** Featured "spec sheet" card. Every field comes from the project record. */
export function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const headingId = `project-${p.slug}`;
  return (
    <article
      aria-labelledby={headingId}
      className="group spot flex flex-col rounded-card border border-border bg-surface transition-colors duration-150 hover:border-accent/60"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
        <span className="label text-muted">Project {String(index + 1).padStart(2, "0")}</span>
        <StatusBadge status={p.status} note={p.statusNote} />
      </header>

      <div className="flex flex-1 flex-col px-5 py-5">
        <h3 id={headingId} className="text-xl">{p.title}</h3>
        {p.context && <p className="mt-1 text-sm text-muted">{p.context}</p>}
        <p className="mt-3 text-[0.95rem]">{p.summary}</p>

        <dl className="mt-5 grid gap-4 text-sm">
          <div>
            <dt className="label text-muted">Problem</dt>
            <dd className="mt-1">{p.problem}</dd>
          </div>
          <div>
            <dt className="label text-muted">Evidence</dt>
            <dd className="mt-1">
              <ul className="space-y-1">
                {p.evidence.map((e) => (
                  <li key={e} className="flex gap-2"><span className="mt-2.5 h-px w-2.5 shrink-0 bg-accent" aria-hidden="true" />{e}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.technologies.map((t) => (
            <li key={t} className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted">{t}</li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6">
          {hasCaseStudy(p) && (
            <Link to={`/projects/${p.slug}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong">
              Read case study <ArrowRight /><span className="sr-only">: {p.title}</span>
            </Link>
          )}
          {p.repo && (
            <a href={p.repo.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-accent">
              <GitHub /> Source code<span className="sr-only"> for {p.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
