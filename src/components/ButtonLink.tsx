import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost";
const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent-strong",
  secondary: "border border-border-strong text-text hover:border-accent hover:text-accent",
  ghost: "text-muted hover:text-accent",
};
const cls = (v: Variant) =>
  `inline-flex min-h-11 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors duration-150 ${variants[v]}`;

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  download?: boolean;
  ariaLabel?: string;
}

/** One button style for every CTA. Internal routes use the router; external links open in a new tab. */
export function ButtonLink({ href, children, variant = "secondary", external, download, ariaLabel }: Props) {
  if (href.startsWith("/") && !download && !href.startsWith("/resume")) {
    return <Link to={href} className={cls(variant)} aria-label={ariaLabel}>{children}</Link>;
  }
  return (
    <a
      href={href}
      className={cls(variant)}
      aria-label={ariaLabel}
      download={download || undefined}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
