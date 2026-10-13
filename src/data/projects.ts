import type { Project } from "../types/portfolio";

/**
 * All projects, including hidden ones.
 *
 * Rules (enforced by scripts/validate-content.ts at build time):
 * - Only verified public repo URLs. No demo links until a live public demo exists.
 * - featuresBuilt = verified working features only. Everything else goes in featuresPlanned.
 * - role / context stay undefined until the owner confirms them.
 * - visibility "hidden" never renders anywhere on the site.
 */
export const projects: Project[] = [
  // ───────────────────────────── FEATURED ─────────────────────────────
  {
    slug: "aegisflow-ai",
    title: "AegisFlow AI",
    subtitle: "Offline intelligent intersection operating system for adaptive mixed-traffic management",
    summary:
      "An offline-first adaptive traffic-management system that turns traffic-state data into signal decisions. The backend decision core is built; vision and hardware integrations are planned.",
    problem:
      "Fixed signal timings can't respond to changing traffic density or to emergency vehicles, so intersections queue up when conditions shift.",
    approach:
      "A local FastAPI backend orchestrates traffic state, a decision-engine adapter and real-time WebSocket updates, designed to run at the intersection without cloud connectivity.",
    featuresBuilt: [
      "Local FastAPI backend and orchestration layer",
      "Traffic-state and system-state store",
      "Decision-engine adapter connecting traffic state to signal decisions",
      "REST endpoints for status, traffic state, decisions and demo scenarios",
      "WebSocket broadcasts for traffic state, signal decisions, system status and events",
      "Demo traffic data and scenario support",
    ],
    featuresPlanned: [
      "Camera input and YOLO-based vehicle detection",
      "Safety validation layer",
      "Signal controller and ESP32 LED signal hardware",
      "Operator dashboard",
    ],
    limitations: [
      "Vision, safety validation, controller, dashboard and ESP32 integrations are not complete.",
      "No live road cameras or hardware are connected.",
    ],
    status: "Working Prototype",
    category: "applied-ai-cv",
    visibility: "featured",
    order: 1,
    technologies: ["Python", "FastAPI", "REST", "WebSockets", "pytest", "Git"],
    evidence: [
      "Decision-engine test suite: 39 tests passed",
      "Earlier shared-contract foundation: 11 of 11 tests passed",
      "SmartAIthon 2026 finalist",
    ],
    role: "Team head — backend integration and failure handling",
    context: "SmartAIthon 2026 (finalist)",
    year: 2026,
    repo: { label: "AegisFlow-AI on GitHub", url: "https://github.com/gautham-code505/AegisFlow-AI" },
    pipeline: {
      title: "AegisFlow AI · system diagram",
      note: "System diagram. Not connected to live cameras or hardware.",
      stages: [
        { id: "camera", label: "Camera input", state: "planned" },
        { id: "vision", label: "AI vision", detail: "YOLO vehicle detection", state: "planned" },
        { id: "state", label: "Traffic state", detail: "State store + REST API", state: "built" },
        { id: "decision", label: "Decision engine", detail: "Adapter + WebSocket updates", state: "built" },
        { id: "safety", label: "Safety validation", state: "planned" },
        { id: "controller", label: "Signal controller", detail: "ESP32 LED signals", state: "planned" },
        { id: "dashboard", label: "Dashboard", state: "planned" },
      ],
    },
    caseStudy: [
      {
        heading: "The problem",
        body: [
          "Fixed-time signals assume yesterday's traffic. When density shifts or an emergency vehicle approaches, a fixed plan keeps serving empty approaches while others queue.",
        ],
      },
      {
        heading: "Why offline-first",
        body: [
          "An intersection controller can't stop working when the network drops. AegisFlow is designed so sensing, decisions and signal control run locally at the junction.",
        ],
      },
      {
        heading: "What is built",
        body: [
          "The backend decision core: a local FastAPI service with an orchestrator, a state store, a decision-engine adapter, a WebSocket manager and demo scenario handling.",
        ],
        bullets: [
          "GET /api/v1/status — system status",
          "GET /api/v1/traffic-state — current traffic state",
          "GET /api/v1/decision — latest signal decision",
          "/api/v1/demo/traffic and /api/v1/demo/{scenario} — demo data and scenarios",
          "WebSocket messages: traffic state, signal decision, system status, events",
        ],
      },
      {
        heading: "Testing",
        body: [
          "The decision-engine test suite passed 39 tests. Separately, the earlier shared-contract foundation passed 11 of 11 tests.",
        ],
      },
      {
        heading: "What is still planned",
        body: [
          "Camera input and YOLO vision, safety validation, the signal controller with ESP32 LED hardware, and the operator dashboard are not yet integrated.",
        ],
      },
      {
        heading: "My role",
        body: ["I led the project team and worked mainly on backend integration and failure handling."],
      },
    ],
    verifiedOn: "2026-10-13",
  },
  {
    slug: "q-rescue",
    title: "Q-Rescue",
    subtitle: "Quantum-assisted predictive emergency resource allocation (PairCover-Q)",
    summary:
      "A quantum-assisted ambulance-dispatch optimization prototype using a QUBO/Ising formulation and Qiskit-based QAOA simulation, evaluated against classical and random baselines.",
    problem:
      "Sending the nearest free ambulance to every call can strip a district of backup coverage when several emergencies arrive together.",
    approach:
      "Formulate multi-call dispatch as a QUBO with a pairwise residual-coverage penalty, map it to an Ising Hamiltonian, and compare QAOA simulation against brute-force, greedy and random baselines.",
    featuresBuilt: [
      "Scenario generation for ambulance dispatch",
      "QUBO formulation with a pairwise coverage penalty",
      "QUBO-to-Ising mapping",
      "Brute-force classical solver and feasibility validator",
      "Qiskit QAOA simulation with multi-seed audit",
      "Comparison against greedy, brute-force and random baselines",
      "Streamlit console and demonstration notebook",
    ],
    limitations: [
      "No quantum advantage is demonstrated or claimed.",
      "Classical brute force solves the 6-qubit scenario in under a millisecond.",
      "Synthetic scenarios on an ideal statevector simulator; QAOA results vary strongly by seed.",
    ],
    status: "Working Prototype",
    category: "optimization-decision",
    visibility: "featured",
    order: 2,
    technologies: ["Python", "Qiskit", "QAOA", "QUBO / Ising", "Streamlit", "pytest"],
    evidence: [
      "Coverage-aware optimum cost 13 vs greedy dispatch 22 in the 6-qubit scenario",
      "QAOA audited across 3 seeds at p=1 and 1 at p=2",
      "Automated pytest suite for formulation, QAOA and app integration",
    ],
    role: "Quantum computing and software side",
    team: { size: 4 },
    context: "Developed for Q-HACK INDIA 2026",
    year: 2026,
    repo: { label: "PairCover-Q- on GitHub", url: "https://github.com/gautham-code505/PairCover-Q-" },
    pipeline: {
      title: "Q-Rescue · system diagram",
      note: "System diagram of the prototype workflow on synthetic scenarios.",
      stages: [
        { id: "scenario", label: "Scenario generation", state: "built" },
        { id: "qubo", label: "QUBO formulation", detail: "Pairwise coverage penalty", state: "built" },
        { id: "ising", label: "Ising mapping", state: "built" },
        { id: "solve", label: "QAOA simulation + brute force", state: "built" },
        { id: "compare", label: "Baseline comparison", detail: "Greedy · random · exact", state: "built" },
      ],
    },
    caseStudy: [
      {
        heading: "The dispatch problem",
        body: [
          "Closest-idle dispatch assigns each call to its nearest free ambulance. With simultaneous calls, sending units from neighbouring stations can leave a whole district without primary or secondary cover.",
        ],
      },
      {
        heading: "Formulation",
        body: [
          "PairCover-Q treats dispatch as a one-shot batch assignment. The objective minimises priority-weighted travel time and penalties for unserved calls, plus a quadratic penalty that activates only when two mutually backing ambulances in the same sector are both dispatched.",
          "Because the coverage externality is pairwise, it fits a QUBO exactly without slack or auxiliary qubits, and maps directly to an Ising Hamiltonian.",
        ],
      },
      {
        heading: "Worked result (6-qubit scenario)",
        body: [
          "The coverage-aware optimum accepts a 1-minute delay on a lower-priority call to keep a backup unit stationed.",
        ],
        table: {
          caption: "Benchmark across all 64 states of Scenario 2, as reported in the repository README",
          head: ["Strategy", "Response time", "Coverage penalty", "Total cost"],
          rows: [
            ["Coverage-aware exact optimum", "13", "0", "13"],
            ["Nearest-available greedy", "12", "10", "22"],
            ["Coverage-free classical optimum", "12", "10", "22"],
            ["Alternative feasible dispatch", "15", "0", "15"],
          ],
          source: "https://github.com/gautham-code505/PairCover-Q-",
        },
      },
      {
        heading: "QAOA simulation",
        body: [
          "QAOA ran in Qiskit with a statevector simulator: three seeds at p=1 and one at p=2, optimised with COBYLA and sampled at 10,000 shots.",
          "Results depend heavily on the seed. Seed 10 recovered the optimum in 6.93% of shots, above the 1.56% uniform-random baseline; seed 99 recovered it in 0.94%, below that baseline.",
        ],
      },
      {
        heading: "Limits",
        body: [
          "There is no quantum advantage here. Classical brute force enumerates all 64 configurations in under a millisecond, while QAOA needs dozens of iterations on an ideal simulator. Real hardware noise would lower sampling rates further. QAOA is used as an exploratory proof of concept; classical exact solvers remain the ground truth.",
        ],
      },
      {
        heading: "My role",
        body: [
          "I worked on the quantum computing and software side: scenario generation, QUBO and Ising formulation, brute-force evaluation, the Qiskit QAOA simulation, baseline comparisons, validation and testing, and the Streamlit application and documentation. Q-Rescue was a four-person team project developed for Q-HACK INDIA 2026.",
        ],
      },
    ],
    verifiedOn: "2026-10-13",
    internalNote:
      "README badge says 53 tests passed, text says 58. Do not publish a total until reconciled. The README clone URL points to Sibi7Antony/Q-Rescue.",
  },
  {
    slug: "adaptive-procurement",
    title: "Adaptive Procurement Coordination API",
    subtitle: "Congestion-aware slot coordination for procurement centres",
    summary:
      "A coordination API that forecasts congestion at procurement centres and proposes booking reschedules under capacity, notice and fairness constraints — applied only after human approval.",
    problem:
      "Farmers book slots at procurement centres, but arrivals, demand surges and counter failures can build long queues that a fixed schedule can't absorb.",
    approach:
      "Operational events update centre state, trigger a 4-hour congestion forecast, and run a heuristic decision engine that proposes constraint-respecting reschedules for a human to approve or reject.",
    featuresBuilt: [
      "Procurement-slot booking for farmers and centres",
      "Event handling for arrivals, completions, no-shows, counter failures and surges",
      "Congestion forecast over a 4-hour horizon",
      "Heuristic decision engine proposing booking reschedules",
      "Constraints: operating hours, slot capacity and minimum notice",
      "Priority farmers and already-rescheduled bookings are never moved",
      "Human approval or rejection of each proposal",
      "Stale-proposal protection when bookings have changed",
    ],
    status: "Working Prototype",
    category: "optimization-decision",
    visibility: "featured",
    order: 3,
    technologies: ["Python", "FastAPI", "SQLAlchemy", "Alembic", "Docker Compose", "JavaScript", "pytest"],
    evidence: [
      "FastAPI routers for centres, farmers, bookings, events, recommendations and scenarios",
      "8 automated test modules in the repository",
      "Alembic migration for the initial schema",
    ],
    repo: {
      label: "procurement-intelligent- on GitHub",
      url: "https://github.com/gautham-code505/procurement-intelligent-",
    },
    pipeline: {
      title: "Adaptive Procurement · system diagram",
      note: "System diagram of the coordination loop.",
      stages: [
        { id: "event", label: "Operational event", detail: "Arrival · surge · counter down", state: "built" },
        { id: "centre", label: "Centre state + snapshot", state: "built" },
        { id: "forecast", label: "Congestion forecast", detail: "4-hour horizon", state: "built" },
        { id: "engine", label: "Decision engine", detail: "Constraint-checked reschedules", state: "built" },
        { id: "approval", label: "Human approval", detail: "Approve · reject · stale check", state: "built" },
      ],
    },
    caseStudy: [
      {
        heading: "The problem",
        body: [
          "A procurement centre runs on booked 15-minute slots. When a counter goes down or many farmers arrive at once, queues grow faster than the schedule can absorb.",
        ],
      },
      {
        heading: "The coordination loop",
        body: [
          "Each operational event — a farmer arriving or finishing, a no-show, a counter failing or recovering, a surge — updates the centre's state and stores a snapshot. Events that change capacity trigger a congestion forecast for the next four hours, followed by the decision engine.",
        ],
      },
      {
        heading: "Decision engine",
        body: [
          "The heuristic engine looks for congestion rated high or critical, then tries moving eligible bookings to alternative slots one at a time. It keeps the best move only if the forecast improves, and stops when congestion clears or no move helps.",
          "Outcomes are FULL_RECOVERY, PARTIAL_RECOVERY or NO_FEASIBLE_INTERVENTION.",
        ],
        bullets: [
          "Slots must fall within operating hours and have spare capacity",
          "New slots must respect a minimum-notice window",
          "Priority farmers and bookings already rescheduled once are never moved",
          "Ties are broken deterministically",
        ],
        code: {
          lang: "python",
          snippet: "return (has_crit, has_hi, max_wait, max_q, total_wait, total_q)",
          source: "core/intelligence/decider.py — the score each candidate move is compared on",
        },
      },
      {
        heading: "Human approval and stale proposals",
        body: [
          "Nothing changes until a person approves. Before applying a proposal, the service checks that every affected booking still has its original start time and hasn't been cancelled or marked a no-show. If anything moved, the proposal is rejected as stale. Approved changes emit a reschedule notification event for each farmer.",
        ],
      },
      {
        heading: "Engineering",
        body: [
          "A FastAPI service with routers for centres, farmers, bookings, events, recommendations and scenarios; SQLAlchemy models with an Alembic migration and an in-memory repository option; Docker Compose; a plain JavaScript frontend served by the API; and eight test modules covering the API, domain, intelligence, minimum notice, persistence, reset and services.",
        ],
      },
    ],
    verifiedOn: "2026-10-13",
    internalNote: "Role, team and context unconfirmed — keep undefined. Repo README is empty; write one before launch.",
  },
  {
    slug: "lara-fashion-advisor",
    title: "LARA — AI Fashion Advisor",
    subtitle: "First-year mini project · Local AI Recommendation Advisor",
    summary:
      "A Flask web stylist that assembles complete outfits from 100+ style rules for gender, skin tone, body shape, occasion and budget, with Gemini-written explanations and an offline fallback.",
    problem:
      "Online fashion stores show disconnected product listings, so shoppers struggle to find complete looks that suit their body shape, skin tone, occasion and budget.",
    approach:
      "A local rule-based recommender filters and scores a curated dataset, assembles a complete outfit under budget, and optionally asks Gemini to explain why the look works.",
    featuresBuilt: [
      "Preference form: gender, skin tone, body shape, occasion, budget",
      "Rule-based recommender with 100+ style rules over a ~40-item local dataset",
      "Complete-look assembly (top, bottom, footwear, accessories) within budget",
      "Gemini 1.5 Flash explanations with automatic offline fallback",
      "Save looks in the browser (localStorage), no account needed",
    ],
    featuresPlanned: [
      "Photo-based skin-tone detection (OpenCV, ITA)",
      "Body-shape estimation (MediaPipe Pose)",
      "Learned recommendations (KNN) and a live product database",
      "Virtual try-on",
    ],
    limitations: [
      "Static local dataset of about 40 items.",
      "Shop buttons run keyword searches rather than linking exact products.",
    ],
    status: "Completed",
    category: "ai-applications",
    visibility: "featured",
    order: 4,
    technologies: ["Python", "Flask", "JavaScript", "Tailwind CSS", "Gemini API"],
    evidence: ["Working Flask app with documented test cases (TESTING.md)", "Public repository with setup instructions"],
    role: "Team member — web application",
    team: { name: "Team Sparks", size: 4 },
    context: "First-year mini project; presented at LUNARA'26",
    year: 2026,
    repo: { label: "ai-fashion-advisor on GitHub", url: "https://github.com/gautham-code505/ai-fashion-advisor" },
    pipeline: {
      title: "LARA · system diagram",
      note: "System diagram of the recommendation flow.",
      stages: [
        { id: "input", label: "Preference form", state: "built" },
        { id: "filter", label: "Filter", detail: "Gender · occasion · budget", state: "built" },
        { id: "score", label: "Style-rule scoring", detail: "Skin tone · body shape", state: "built" },
        { id: "assemble", label: "Outfit assembly", state: "built" },
        { id: "explain", label: "Gemini explanation", detail: "Offline fallback", state: "built" },
        { id: "cv", label: "Photo analysis", detail: "OpenCV · MediaPipe", state: "planned" },
      ],
    },
    caseStudy: [
      {
        heading: "Where this started",
        body: [
          "LARA was my first-year engineering mini project, built with Team Sparks. It's here as the starting point of my development journey.",
        ],
      },
      {
        heading: "How a recommendation is made",
        body: [
          "The form posts the user's preferences. The recommender filters a local product set by gender, occasion and budget, scores what remains on skin-tone and body-shape style rules, and assembles a complete look that stays under budget. If a Gemini API key is configured, Gemini writes a short explanation of the look; otherwise LARA falls back to a built-in message.",
        ],
      },
      {
        heading: "Future scope",
        body: [
          "Photo-based skin-tone and body-shape detection with OpenCV, ITA and MediaPipe, learned recommendations, a live product database and virtual try-on are planned, not implemented in the public repository.",
        ],
      },
    ],
    verifiedOn: "2026-10-13",
    internalNote: "Do not mention Claude Vision. Do not link the LUNARA 4th place to LARA unless confirmed.",
  },

  // ───────────────────────────── ARCHIVE ─────────────────────────────
  {
    slug: "signalbridge-ai",
    title: "SignalBridge AI",
    summary:
      "Sign-language and speech accessibility for Deaf and hard-of-hearing users: webcam gesture recognition, speech-to-text and a modular FastAPI backend.",
    problem: "Communication gaps between sign-language users and hearing people in everyday, hospital and public-service settings.",
    approach: "Browser-based hand tracking and gesture classification, speech features, and a FastAPI backend with a multi-provider AI gateway.",
    featuresBuilt: [
      "Webcam hand tracking with gesture classification",
      "Speech-to-text and speech-to-sign avatar",
      "Emergency alerts, history and settings",
      "FastAPI routers and a multi-provider AI gateway with mock fallback",
    ],
    featuresPlanned: ["WebSocket streaming", "Gesture smoothing and temporal models"],
    limitations: ["Gesture classification is basic; predictions use HTTP requests rather than streaming."],
    status: "Working Prototype",
    category: "applied-ai-cv",
    visibility: "archive",
    order: 10,
    technologies: ["Python", "FastAPI", "JavaScript", "MediaPipe", "Web Speech API", "SQLite"],
    evidence: ["Public repository with FastAPI backend and browser frontend"],
    repo: { label: "sign-language- on GitHub", url: "https://github.com/gautham-code505/sign-language-" },
    verifiedOn: "2026-10-13",
    internalNote:
      "May replace LARA in featured after cleanup: remove committed node_modules and __pycache__, fix repo description, add tests, confirm role.",
  },
  {
    slug: "fios",
    title: "FIOS — Forest Intelligence & Operations System",
    summary:
      "A decision-support platform for forest emergency management, structured as an officer dashboard, API, explainable decision module, field app and database.",
    problem: "Forest emergencies need coordinated decisions across officers and field teams, often with limited connectivity.",
    approach: "A monorepo separating the officer dashboard, backend services, explainable AI module, mobile field app and shared contracts.",
    featuresBuilt: ["Repository structure for frontend, backend, AI, mobile, database and shared contracts"],
    featuresPlanned: ["Explainable decision intelligence", "Officer dashboard and field-team app"],
    status: "In Progress",
    category: "applied-ai-cv",
    visibility: "archive",
    order: 11,
    technologies: ["Python", "JavaScript", "Docker Compose"],
    evidence: ["Public repository (MIT licence)"],
    repo: { label: "FIOS on GitHub", url: "https://github.com/gautham-code505/FIOS" },
    verifiedOn: "2026-10-13",
    internalNote: "CIH'26 Grand Finale in repo description is unconfirmed — no achievement shown.",
  },
  {
    slug: "safefusion-ai",
    title: "SafeFusion AI",
    summary:
      "A planned industrial safety system combining object detection and time-to-collision estimation for confidence-aware collision-risk alerts.",
    problem: "Workers and moving equipment share space in factories, warehouses and sites, with blind spots and low visibility.",
    approach: "Planned: object detection, time-to-collision estimation, thermal imaging and sensor-fault detection feeding a safety dashboard.",
    featuresBuilt: [],
    featuresPlanned: [
      "Real-time object detection",
      "Time-to-collision estimation",
      "Confidence-aware alerts",
      "Thermal imaging and sensor-fault detection",
      "Safety dashboard",
    ],
    status: "Research / Design Stage",
    category: "applied-ai-cv",
    visibility: "archive",
    order: 12,
    technologies: ["Python", "OpenCV", "YOLOv8"],
    evidence: [],
    verifiedOn: "2026-10-13",
  },
  {
    slug: "housekeeptrack",
    title: "HouseKeepTrack",
    summary: "A Java Spring Boot REST API learning project, with a Postman collection for exercising its endpoints.",
    problem: "Learning project for building and testing a REST API with Spring Boot.",
    approach: "Spring Boot API with a Postman collection.",
    featuresBuilt: ["Spring Boot REST API", "Postman collection"],
    status: "Completed",
    category: "web-software",
    visibility: "archive",
    order: 13,
    technologies: ["Java", "Spring Boot", "Postman"],
    evidence: ["Public repository"],
    repo: { label: "JavaSpringBoot-1 on GitHub", url: "https://github.com/gautham-code505/JavaSpringBoot-1" },
    verifiedOn: "2026-10-13",
  },
  {
    slug: "vaccine-registry",
    title: "Rural Health Clinic Vaccine Cold-Chain & Immunization Registry",
    summary:
      "An academic system design for vaccine stock, expiry tracking, cold-chain temperature records, beneficiaries and immunization histories.",
    problem: "Rural clinics need one reliable record of vaccine stock, storage temperatures and who has received which dose.",
    approach: "Concept-level design (TRL 2) with a proposed Spring Boot, Spring Data JPA and MySQL stack.",
    featuresBuilt: [],
    featuresPlanned: ["Batch and expiry tracking", "Cold-chain logs", "Beneficiary and dose records", "Reports dashboard"],
    status: "Academic Concept",
    category: "web-software",
    visibility: "archive",
    order: 14,
    technologies: ["Java", "Spring Boot", "MySQL"],
    evidence: [],
    verifiedOn: "2026-10-13",
  },
  {
    slug: "neurobiome-guardian",
    title: "NeuroBiome Guardian",
    summary:
      "A planned platform for explainable, evidence-oriented interpretation of gut-microbiome reports. Not clinically validated and not medical advice.",
    problem: "Microbiome reports are hard for people to interpret without specialist help.",
    approach: "Planned: report parsing, evidence retrieval and explainable LLM/RAG summaries with secure data handling.",
    featuresBuilt: [],
    featuresPlanned: ["Report analysis", "Evidence retrieval (RAG)", "Explainable summaries"],
    status: "Research / Design Stage",
    category: "research-concepts",
    visibility: "archive",
    order: 15,
    technologies: ["Python", "FastAPI", "LLM / RAG"],
    evidence: [],
    verifiedOn: "2026-10-13",
  },

  // ───────────────────────────── HIDDEN ─────────────────────────────
  {
    slug: "fifo",
    title: "FIFO (unidentified)",
    summary: "Unverified: identity, code and documentation not yet located.",
    problem: "",
    approach: "",
    featuresBuilt: [],
    status: "In Progress",
    category: "web-software",
    visibility: "hidden",
    order: 90,
    technologies: [],
    evidence: [],
    verifiedOn: "2026-10-13",
    internalNote: "Keep hidden until the project is identified.",
  },
  {
    slug: "procurement-process",
    title: "procurement-process (React)",
    summary: "Unverified: React + Vite repo with a starter README; relationship to the API not established.",
    problem: "",
    approach: "",
    featuresBuilt: [],
    status: "In Progress",
    category: "web-software",
    visibility: "hidden",
    order: 91,
    technologies: [],
    evidence: [],
    verifiedOn: "2026-10-13",
  },
  {
    slug: "javaspringboot-session",
    title: "JavaSpringBoot (expert session)",
    summary: "Unverified: purpose and scope unclear.",
    problem: "",
    approach: "",
    featuresBuilt: [],
    status: "Completed",
    category: "web-software",
    visibility: "hidden",
    order: 92,
    technologies: [],
    evidence: [],
    verifiedOn: "2026-10-13",
  },
];
