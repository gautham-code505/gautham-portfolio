import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";

/** Build-time render used by scripts/prerender.ts — every page ships as real HTML. */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}

export { publicProjects, hasCaseStudy } from "./lib/selectors";
export { site } from "./data/site";
