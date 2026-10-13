import { useMemo, useState } from "react";
import type { Category } from "../types/portfolio";
import { activeCategories, archiveProjects, categoryLabels } from "../lib/selectors";
import { StatusBadge } from "./StatusBadge";
import { GitHub } from "./Icons";

type Filter = Category | "all";

/** Compact archive with an accessible filter (button group with aria-pressed). */
export function ArchiveGrid() {
  const all = archiveProjects();
  const cats = activeCategories().filter((c) => all.some((p) => p.category === c));
  const [filter, setFilter] = useState<Filter>("all");
  const shown = useMemo(() => (filter === "all" ? all : all.filter((p) => p.category === filter)), [all, filter]);

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {(["all", ...cats] as Filter[]).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className="min-h-11 rounded-full border border-border px-4 text-sm text-muted transition-colors hover:border-accent hover:text-text aria-pressed:border-accent aria-pressed:bg-accent/10 aria-pressed:text-text"
          >
            {c === "all" ? "All" : categoryLabels[c]}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{shown.length} projects shown</p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.slug} className="flex flex-col rounded-card border border-border bg-surface/60 p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base">{p.title}</h3>
            </div>
            <div className="mt-2"><StatusBadge status={p.status} /></div>
            <p className="mt-3 text-sm text-muted">{p.summary}</p>
            {p.featuresPlanned && p.featuresBuilt.length === 0 && (
              <p className="mt-3 text-xs text-muted"><span className="label text-[0.65rem]">Planned:</span> {p.featuresPlanned.slice(0, 3).join(" · ")}</p>
            )}
            <p className="mt-3 font-mono text-xs text-muted">{p.technologies.join(" · ")}</p>
            {p.repo && (
              <a href={p.repo.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-center gap-2 pt-3 text-sm text-muted hover:text-accent">
                <GitHub /> Source code<span className="sr-only"> for {p.title} (opens in a new tab)</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
