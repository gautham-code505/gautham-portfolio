import { certifications, education } from "../data/education";
import { Section } from "../components/Section";

export function Education() {
  return (
    <Section id="education" index="05" eyebrow="Education" title="Education & certifications">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <ul className="divide-y divide-border border-y border-border">
          {education.map((e) => (
            <li key={e.qualification} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
              <div>
                <p className="font-medium">{e.qualification}</p>
                <p className="text-sm text-muted">{e.institution}</p>
              </div>
              <p className="font-mono text-sm text-muted">{e.period} · <span className="text-text">{e.score}</span></p>
            </li>
          ))}
        </ul>
        <div>
          <h3 className="label text-muted">Certifications</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {certifications.map((c) => <li key={c.title}>{c.title} <span className="text-muted">— {c.issuer}, {c.year}</span></li>)}
          </ul>
        </div>
      </div>
    </Section>
  );
}
