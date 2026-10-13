import type { SkillGroup } from "../types/portfolio";

// Grouped, no proficiency bars or percentages.
export const skills: SkillGroup[] = [
  { label: "Languages", items: ["Python", "Java", "C", "SQL"] },
  { label: "AI / ML", items: ["scikit-learn", "TensorFlow", "NumPy", "Pandas"] },
  { label: "Computer vision", items: ["OpenCV", "YOLOv8"] },
  { label: "Backend & web", items: ["FastAPI", "Flask", "REST APIs", "WebSockets", "React", "Tailwind CSS"] },
  { label: "Optimization", items: ["QUBO / Ising formulation", "Qiskit (QAOA simulation)"] },
  { label: "Data & tools", items: ["MySQL", "PostgreSQL", "MongoDB", "Git", "GitHub", "pytest", "Postman", "VS Code", "Figma"] },
  { label: "Core CS", items: ["Data structures & algorithms", "OOP", "DBMS", "Operating systems", "Computer networks"] },
];
