import { skills } from "../data/skills";
import { Section } from "../components/Section";

export function Skills() {
  return (
    <Section id="skills" index="03" eyebrow="Skills" title="Tools I've used in real projects" intro="Grouped by area. No self-rated percentages — the projects above show how each is used.">
      <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {skills.map((g) => (
          <div key={g.label} className="border-t border-border pt-4">
            <dt className="label text-muted">{g.label}</dt>
            <dd className="mt-2">{g.items.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
