import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="mx-auto max-w-page px-4 py-24 sm:px-8">
      <p className="label text-accent">404</p>
      <h1 className="mt-3 text-4xl">Page not found</h1>
      <Link to="/" className="mt-6 inline-flex min-h-11 items-center text-accent hover:text-accent-strong">← Back to the portfolio</Link>
    </section>
  );
}
