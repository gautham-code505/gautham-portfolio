import type { SiteConfig } from "../types/portfolio";

export const site: SiteConfig = {
  name: "Gautham M A",
  shortName: "Gautham",
  role: "B.E. CSE (AI & ML) · Sri Eshwar College of Engineering",
  headline: "I build tested decision systems in Python — from traffic signals to ambulance dispatch.",
  subhead:
    "Computer Science (AI & ML) undergraduate working on applied AI, optimization and backend engineering. Every project here shows what is built, how it was tested, and what is still planned.",
  education: "B.E. CSE (AI & ML), Sri Eshwar College of Engineering, Coimbatore · 2025–2029",
  email: "gautham.ma2025aiml@sece.ac.in",
  phone: "+91 82201 68505",
  location: "Coimbatore, Tamil Nadu, India",
  links: {
    github: "https://github.com/gautham-code505",
    linkedin: "https://www.linkedin.com/in/gautham-ma-62221a382",
    leetcode: "https://leetcode.com/u/GauthamMA/",
    skillrack: "https://www.skillrack.com/profile/557623/e09efe94eaa03ef389f608626049181e10f08483",
  },
  resumePath: "/resume/Gautham_MA_Resume.pdf",
  /** Drop the photo at public/images/gautham.jpg — it appears in the hero only when the file exists. */
  photo: { src: "/images/gautham.jpg", alt: "Portrait of Gautham M A" },
  focus: ["Decision systems", "Python backends (FastAPI)", "Optimization & QUBO", "Applied computer vision"],
  codingStats: {
    verifiedOn: "2026-10-13",
    leetcode: "43 problems solved",
    skillrack: "831 programs solved · rank 38,389",
  },
  about: [
    "I'm Gautham, a Computer Science (AI & ML) undergraduate at Sri Eshwar College of Engineering, Coimbatore. I'm drawn to problems where a system has to make a decision under real constraints: a traffic signal choosing its next phase, an ambulance dispatcher protecting future coverage, a procurement centre absorbing a sudden queue.",
    "Most of my work is the engine underneath — FastAPI services, orchestration layers, constraint-aware heuristics and QUBO formulations — backed by automated tests and an honest record of what is still unfinished.",
    "I started with a first-year Flask project and have moved steadily towards larger systems with real architecture and test suites. The journey below traces that path.",
  ],
  seo: {
    title: "Gautham M A — Decision Systems, Applied AI & Backend Engineering",
    description:
      "Portfolio of Gautham M A, a CSE (AI & ML) undergraduate at Sri Eshwar College of Engineering building tested decision systems in Python: adaptive traffic control, quantum-assisted ambulance dispatch and procurement coordination.",
  },
};
