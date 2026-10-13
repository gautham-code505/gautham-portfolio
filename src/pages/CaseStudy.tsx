import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { hasCaseStudy, projectBySlug } from "../lib/selectors";
import { site } from "../data/site";
import { StatusBadge } from "../components/StatusBadge";
import { SignalTrace } from "../components/SignalTrace";
import { GitHub } from "../components/Icons";
import { NotFound } from "./NotFound";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function CaseStudy() {
  const { slug } = useParams();
  const p = projectBySlug(slug);

  useEffect(() => {
    if (p) document.title = `${p.title} — ${site.name}`;
    return () => { document.title = site.seo.title; };
  }, [p]);

  if (!p || !hasCaseStudy(p)) return <NotFound />;
  const sections = p.caseStudy!;

  return (
    <article className="mx-auto max-w-page px-4 py-12 sm:px-8 sm:py-16">
      <Link to="/#projects" className="label inline-flex min-h-11 items-center text-muted hover:text-accent">← All projects</Link>

      <header className="mt-4 grid gap-10 border-b border-border pb-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <div className="min-w-0">
          <StatusBadge status={p.status} />
          <h1 className="mt-4 text-4xl sm:text-5xl">{p.title}</h1>
          {p.subtitle && <p className="mt-3 text-lg text-muted">{p.subtitle}</p>}
          <p className="mt-6 text-[1.05rem]">{p.summary}</p>
          <dl className="mt-6 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
            {p.context && <div><dt className="label text-muted">Context</dt><dd className="mt-1">{p.context}</dd></div>}
            {p.role && <div><dt className="label text-muted">My role</dt><dd className="mt-1">{p.role}</dd></div>}
            {p.team?.name && <div><dt className="label text-muted">Team</dt><dd className="mt-1">{p.team.name}</dd></div>}
            <div className="sm:col-span-2"><dt className="label text-muted">Stack</dt><dd className="mt-1 font-mono text-[0.8rem]">{p.technologies.join(" · ")}</dd></div>
          </dl>
          {p.repo && (
            <a href={p.repo.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-border-strong px-4 text-sm hover:border-accent hover:text-accent">
              <GitHub /> {p.repo.label}<span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
        {p.pipeline && <SignalTrace pipeline={p.pipeline} />}
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[200px_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-24 space-y-2 text-sm">
            {sections.map((s) => <li key={s.heading}><a className="text-muted hover:text-accent" href={`#${slugify(s.heading)}`}>{s.heading}</a></li>)}
          </ul>
        </nav>

        <div className="min-w-0 max-w-3xl space-y-12">
          {sections.map((s) => (
            <section key={s.heading} id={slugify(s.heading)} aria-labelledby={`h-${slugify(s.heading)}`} className="scroll-mt-24">
              <h2 id={`h-${slugify(s.heading)}`} className="text-2xl">{s.heading}</h2>
              <div className="mt-4 space-y-4">{s.body.map((b) => <p key={b.slice(0, 30)}>{b}</p>)}</div>
              {s.bullets && (
                <ul className="mt-4 space-y-2">
                  {s.bullets.map((b) => <li key={b} className="flex gap-3"><span className="mt-3 h-px w-3 shrink-0 bg-accent" aria-hidden="true" /><span className="font-mono text-[0.85rem]">{b}</span></li>)}
                </ul>
              )}
              {s.table && (
                <div className="mt-6 overflow-x-auto rounded-card border border-border">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <caption className="px-4 py-3 text-left text-xs text-muted">{s.table.caption}</caption>
                    <thead className="border-y border-border bg-surface">
                      <tr>{s.table.head.map((h) => <th key={h} scope="col" className="px-4 py-2 font-medium">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((r, i) => (
                        <tr key={r[0]} className={`border-b border-border last:border-0 ${i === 0 ? "text-accent" : ""}`}>
                          {r.map((c, j) => j === 0 ? <th key={j} scope="row" className="px-4 py-2 font-normal">{c}</th> : <td key={j} className="px-4 py-2 font-mono">{c}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {s.code && (
                <figure className="mt-6">
                  <pre className="overflow-x-auto rounded-card border border-border bg-surface p-4 font-mono text-[0.8rem]"><code>{s.code.snippet}</code></pre>
                  <figcaption className="mt-2 text-xs text-muted">From the repository: {s.code.source}</figcaption>
                </figure>
              )}
            </section>
          ))}

          {(p.featuresPlanned?.length || p.limitations?.length) ? (
            <section aria-labelledby="h-status" className="rounded-card border border-border bg-surface p-6">
              <h2 id="h-status" className="text-xl">Status at a glance</h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="label text-accent">Built</h3>
                  <ul className="mt-2 space-y-1.5 text-sm">{p.featuresBuilt.map((f) => <li key={f}>{f}</li>)}</ul>
                </div>
                <div>
                  {p.featuresPlanned && <><h3 className="label text-muted">Planned</h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted">{p.featuresPlanned.map((f) => <li key={f}>{f}</li>)}</ul></>}
                  {p.limitations && <><h3 className="label mt-5 text-muted">Limits</h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted">{p.limitations.map((f) => <li key={f}>{f}</li>)}</ul></>}
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
