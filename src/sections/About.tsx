import { site } from "../data/site";
import { Section } from "../components/Section";

export function About() {
  return (
    <Section id="about" index="01" eyebrow="About" title="Decision systems, built and tested">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 text-[1.05rem]">
          {site.about.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        <aside aria-label="At a glance" className="rounded-card border border-border bg-surface p-5 text-sm">
          <dl className="grid gap-4">
            <div><dt className="label text-muted">Studying</dt><dd className="mt-1">{site.education}</dd></div>
            <div><dt className="label text-muted">Focus</dt><dd className="mt-1">Applied AI · optimization · Python backends</dd></div>
            <div><dt className="label text-muted">Looking for</dt><dd className="mt-1">{site.availability}</dd></div>
          </dl>
        </aside>
      </div>
    </Section>
  );
}
