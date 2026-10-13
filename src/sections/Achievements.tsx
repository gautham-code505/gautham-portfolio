import { experience } from "../data/experience";
import { achievements } from "../data/achievements";
import { certifications } from "../data/education";
import { assetExists } from "../lib/assets";
import { Section } from "../components/Section";

const rank = { winner: 0, finalist: 1, placed: 2, participant: 3 } as const;

export function Achievements() {
  const sorted = [...achievements].sort((a, b) => rank[a.result] - rank[b.result]);
  const top = sorted.filter((a) => a.result !== "participant");
  const rest = sorted.filter((a) => a.result === "participant");
  return (
    <Section id="achievements" index="04" eyebrow="Achievements" title="Recognition, roles and certifications">
      <ul className="grid gap-5 md:grid-cols-2">
        {top.map((a) => {
          const photos = (a.photos ?? []).filter((p) => assetExists(p.src));
          return (
            <li key={a.title} className="overflow-hidden rounded-card border border-border bg-surface">
              {photos.length > 0 && (
                <div className={`grid gap-px bg-border ${photos.length > 1 ? "grid-cols-2" : ""}`}>
                  {photos.slice(0, 2).map((p) => (
                    <figure key={p.src} className="bg-surface">
                      <img src={p.src} alt={p.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                      {p.caption && <figcaption className="px-3 py-2 text-xs text-muted">{p.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              )}
              <div className="p-5">
                <p className="label text-signal-amber">{a.resultLabel}{a.year ? ` · ${a.year}` : ""}</p>
                <h3 className="mt-2 text-xl">{a.title}</h3>
                <p className="mt-1 text-sm text-muted">{a.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <div>
          <h3 className="label text-muted">Also participated in</h3>
          <ul className="mt-3 space-y-3 text-sm">
            {rest.map((a) => <li key={a.title}><span className="text-text">{a.title}</span><br /><span className="text-muted">{a.detail}</span></li>)}
          </ul>
        </div>
        <div>
          <h3 className="label text-muted">Position of responsibility</h3>
          {experience.map((e) => (
            <div key={e.role} className="mt-3 text-sm">
              <p className="text-text">{e.role} <span className="text-muted">· {e.org}</span></p>
              <ul className="mt-2 space-y-1.5 text-muted">{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </div>
          ))}
        </div>
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
