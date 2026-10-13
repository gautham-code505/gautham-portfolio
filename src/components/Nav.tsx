import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { site } from "../data/site";
import { Close, Menu } from "./Icons";

const links = [
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/** Sticky header with an active-section indicator and an accessible mobile menu. */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id === "top" ? "" : e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...links.map((l) => l.id)].forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/75">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink">
        Skip to content
      </a>
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-page items-center justify-between px-4 sm:px-8">
        <Link to="/" className="font-display text-base font-semibold tracking-tight">
          {site.name}<span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={href(l.id)}
                aria-current={active === l.id ? "location" : undefined}
                className="relative inline-flex min-h-11 items-center px-3 text-sm text-muted transition-colors hover:text-text aria-[current=location]:text-text"
              >
                {l.label}
                <span
                  className={`absolute inset-x-3 bottom-2 h-px bg-accent transition-transform duration-200 ${active === l.id ? "scale-x-100" : "scale-x-0"}`}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-lg text-muted hover:text-text md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <Close className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-border px-4 pb-4 md:hidden">
          {links.map((l) => (
            <li key={l.id}>
              <a href={href(l.id)} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-border text-base">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
