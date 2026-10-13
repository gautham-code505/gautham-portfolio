import type { ProjectStatus } from "../types/portfolio";

// Colour is never the only signal: every badge carries its text label.
const styles: Record<ProjectStatus, string> = {
  Completed: "border-signal-green/50 text-signal-green",
  "Working Prototype": "border-accent/50 text-accent",
  "In Progress": "border-signal-amber/50 text-signal-amber",
  "Research / Design Stage": "border-border-strong text-muted",
  "Academic Concept": "border-dashed border-border-strong text-muted",
};
const dots: Record<ProjectStatus, string> = {
  Completed: "bg-signal-green",
  "Working Prototype": "bg-accent",
  "In Progress": "bg-signal-amber",
  "Research / Design Stage": "bg-muted",
  "Academic Concept": "border border-muted",
};

export function StatusBadge({ status, note }: { status: ProjectStatus; note?: string }) {
  return (
    <span className={`label inline-flex items-center gap-2 rounded-full border px-2.5 py-1 normal-case tracking-normal ${styles[status]}`}>
      <span className={`size-1.5 rounded-full ${dots[status]}`} aria-hidden="true" />
      {status}{note && <span className="opacity-80"> · {note}</span>}
    </span>
  );
}
