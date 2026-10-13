import type { ReactNode } from "react";

interface Props {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

/** Shared section wrapper: consistent spacing, labelled landmark, numbered eyebrow. */
export function Section({ id, index, eyebrow, title, intro, children }: Props) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-border">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-8 sm:py-24">
        <p className="label text-accent">
          <span className="text-muted">{index}</span> / {eyebrow}
        </p>
        <h2 id={headingId} className="mt-3 text-3xl sm:text-4xl">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-2xl text-muted">{intro}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
