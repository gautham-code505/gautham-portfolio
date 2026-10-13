import type { Project } from "../types/portfolio";

interface Props {
  pipeline: NonNullable<Project["pipeline"]>;
  compact?: boolean;
}

/**
 * The signature system diagram: a vertical signal trace.
 * Built stages = solid cyan node + "Built" tag. Planned = hollow dashed node + "Planned" tag.
 * Pure HTML/CSS so it reads correctly with no JavaScript and on any screen size.
 * Phase 5 adds a one-time GSAP pulse along [data-trace-built] nodes.
 */
export function SignalTrace({ pipeline, compact }: Props) {
  const built = pipeline.stages.filter((s) => s.state === "built").length;
  return (
    <figure className="rounded-card border border-border bg-surface/90 p-5 sm:p-6" data-signal-trace>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="label text-text">{pipeline.title}</span>
        <span className="label text-muted normal-case tracking-normal">
          {built} of {pipeline.stages.length} stages built
        </span>
      </figcaption>

      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted" aria-label="Legend">
        <li className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-accent" aria-hidden="true" />Built</li>
        <li className="flex items-center gap-2"><span className="size-2.5 rounded-full border border-dashed border-muted" aria-hidden="true" />Planned</li>
      </ul>

      <ol className={`relative mt-5 ${compact ? "space-y-2.5" : "space-y-3.5"}`}>
        {pipeline.stages.map((s, i) => {
          const isBuilt = s.state === "built";
          const last = i === pipeline.stages.length - 1;
          return (
            <li key={s.id} className="relative flex gap-4 pl-0" data-trace-stage={s.state}>
              <span className="relative flex w-4 shrink-0 justify-center" aria-hidden="true">
                {!last && (
                  <span
                    className={`absolute top-4 bottom-[-0.9rem] w-px ${isBuilt && pipeline.stages[i + 1]?.state === "built" ? "bg-accent/70" : "border-l border-dashed border-border-strong"}`}
                  />
                )}
                <span
                  className={`relative mt-1.5 size-3 rounded-full ${isBuilt ? "bg-accent shadow-[0_0_0_4px_rgb(59_201_219/0.15)]" : "border border-dashed border-muted bg-bg"}`}
                  data-trace-node={s.state}
                />
              </span>
              <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-3">
                <div className="min-w-0">
                  <p className={`font-display text-[0.95rem] font-medium ${isBuilt ? "text-text" : "text-muted"}`}>{s.label}</p>
                  {s.detail && !compact && <p className="text-xs text-muted">{s.detail}</p>}
                </div>
                <span className={`label shrink-0 text-[0.65rem] ${isBuilt ? "text-accent" : "text-muted"}`}>
                  {isBuilt ? "Built" : "Planned"}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-5 border-t border-border pt-3 text-xs text-muted">{pipeline.note}</p>
    </figure>
  );
}
