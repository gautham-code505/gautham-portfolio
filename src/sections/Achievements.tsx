import { experience } from "../data/experience";
import { achievements } from "../data/achievements";
import { Section } from "../components/Section";

const rank = { winner: 0, finalist: 1, placed: 2, participant: 3 } as const;

export function Achievements() {
  const sorted = [...achievements].sort((a, b) => rank[a.result] - rank[b.result]);
  const top = sorted.filter((a) => a.result !== "participant");
  const rest = sorted.filter((a) => a.result === "participant");
  return (
    <Section id="achievements" index="04" eyebrow="Achievements & responsibility" title="Recognition and roles">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <ul className="grid gap-4">
            {top.map((a) => (
              <li key={a.title} className="rounded-card border border-border bg-surface p-5">
                <p className="label text-accent">{a.resultLabel}{a.year ? ` · ${a.year}` : ""}</p>
                <h3 className="mt-2 text-lg">{a.title}</h3>
                <p className="mt-1 text-sm text-muted">{a.detail}</p>
              </li>
            ))}
          </ul>
          <h3 className="label mt-8 text-muted">Also participated in</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {rest.map((a) => <li key={a.title}><span className="text-text">{a.title}</span> <span className="text-muted">— {a.detail}</span></li>)}
          </ul>
        </div>
        <div>
          {experience.map((e) => (
            <article key={e.role} className="rounded-card border border-border p-5">
              <p className="label text-muted">Position of responsibility</p>
              <h3 className="mt-2 text-lg">{e.role}</h3>
              <p className="text-sm text-muted">{e.org}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {e.points.map((pt) => <li key={pt} className="flex gap-2"><span className="mt-2.5 h-px w-2.5 shrink-0 bg-accent" aria-hidden="true" />{pt}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
