import { projects } from "../data/projects";
import type { Category, Project } from "../types/portfolio";

const byOrder = (a: Project, b: Project) => a.order - b.order;

/** Everything that may appear on the site. Hidden entries never leave this module. */
export const publicProjects = (): Project[] => projects.filter((p) => p.visibility !== "hidden").sort(byOrder);

export const featuredProjects = (): Project[] => publicProjects().filter((p) => p.visibility === "featured");

export const archiveProjects = (): Project[] => publicProjects().filter((p) => p.visibility === "archive");

export const projectBySlug = (slug: string | undefined): Project | undefined =>
  publicProjects().find((p) => p.slug === slug);

export const hasCaseStudy = (p: Project): boolean => Boolean(p.caseStudy && p.caseStudy.length > 0);

export const categoryLabels: Record<Category, string> = {
  "applied-ai-cv": "Applied AI & CV",
  "optimization-decision": "Optimization & Decision Systems",
  "ai-applications": "AI Applications",
  "web-software": "Web & Software",
  "research-concepts": "Research Concepts",
};

/** Categories that actually have public projects, in display order. */
export const activeCategories = (): Category[] => {
  const used = new Set(publicProjects().map((p) => p.category));
  return (Object.keys(categoryLabels) as Category[]).filter((c) => used.has(c));
};
