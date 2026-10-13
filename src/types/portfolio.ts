// Single source of truth for the shape of every piece of portfolio content.
// Content lives in src/data/*. Components never hard-code personal facts.

export type ProjectStatus =
  | "Completed"
  | "Working Prototype"
  | "In Progress"
  | "Research / Design Stage"
  | "Academic Concept";

export type Category =
  | "applied-ai-cv"
  | "optimization-decision"
  | "ai-applications"
  | "web-software"
  | "research-concepts";

/** featured = top section, archive = grid, hidden = data file only, never rendered. */
export type Visibility = "featured" | "archive" | "hidden";

export interface Link {
  label: string;
  url: string;
}

export interface PipelineStage {
  id: string;
  label: string;
  detail?: string;
  /** built = verified in the repo; planned = intended, not yet integrated. */
  state: "built" | "planned";
}

export interface CaseStudySection {
  heading: string;
  /** Paragraphs. Keep claims to what the repo or the owner has confirmed. */
  body: string[];
  bullets?: string[];
  /** Optional verbatim code taken from the real repository. */
  code?: { lang: string; snippet: string; source: string };
  /** Optional table, e.g. benchmark results reported in the repo README. */
  table?: { caption: string; head: string[]; rows: string[][]; source: string };
}

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  /** Card text, keep under ~200 characters. */
  summary: string;
  problem: string;
  approach: string;
  /** Only features verified as working. */
  featuresBuilt: string[];
  /** Rendered with a "Planned" tag. */
  featuresPlanned?: string[];
  /** Honest limits, e.g. "No quantum advantage claimed". */
  limitations?: string[];
  status: ProjectStatus;
  category: Category;
  visibility: Visibility;
  /** Lower comes first. */
  order: number;
  technologies: string[];
  /** Short, verifiable evidence lines. */
  evidence: string[];
  /** Omit until confirmed by the owner. */
  role?: string;
  team?: { name?: string; size?: number };
  /** Event or course context. Omit until confirmed. */
  context?: string;
  /** Rough period for the journey timeline, e.g. "2026". */
  year?: number;
  /** Only verified public URLs. */
  repo?: Link;
  /** Only a live public demo. */
  demo?: Link;
  screenshots?: { src: string; alt: string; real: boolean }[];
  pipeline?: { title: string; note: string; stages: PipelineStage[] };
  caseStudy?: CaseStudySection[];
  /** ISO date of the last check against the repository. */
  verifiedOn: string;
  /** Internal notes for the owner. Never rendered. */
  internalNote?: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  role: string;
  headline: string;
  subhead: string;
  education: string;
  email: string;
  /** Shown only in the contact section. */
  phone: string;
  location: string;
  links: {
    github: string;
    linkedin: string;
    leetcode: string;
    skillrack: string;
  };
  /** Public path. The download button renders only if this file exists at build time. */
  resumePath: string;
  availability: string;
  about: string[];
  seo: { title: string; description: string };
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export type AchievementResult = "winner" | "finalist" | "placed" | "participant";

export interface Achievement {
  title: string;
  result: AchievementResult;
  /** Human-readable result, e.g. "Finalist", "4th place". */
  resultLabel: string;
  detail: string;
  year?: number;
  relatedProject?: string;
}

export interface Experience {
  role: string;
  org: string;
  points: string[];
}

export interface EducationEntry {
  institution: string;
  qualification: string;
  period: string;
  score: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: number;
}
