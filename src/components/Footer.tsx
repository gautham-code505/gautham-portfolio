import { site } from "../data/site";
import { GitHub, LinkedIn, Mail } from "./Icons";

export function Footer() {
  const item = "inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-accent";
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-page flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm text-muted">© {new Date().getFullYear()} {site.name}</p>
        <ul className="flex flex-wrap gap-x-6">
          <li><a className={item} href={site.links.github} target="_blank" rel="noopener noreferrer"><GitHub /> GitHub</a></li>
          <li><a className={item} href={site.links.linkedin} target="_blank" rel="noopener noreferrer"><LinkedIn /> LinkedIn</a></li>
          <li><a className={item} href={`mailto:${site.email}`}><Mail /> Email</a></li>
        </ul>
      </div>
    </footer>
  );
}
