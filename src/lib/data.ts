export const profile = {
  name: "Jai Chandra Kumar Devarajan",
  role: "Python Backend Developer",
  tagline:
    "Backend engineer specializing in Django REST Framework, FastAPI, and AI/LLM integration. I build REST APIs, microservices, and AI agent pipelines that run in production.",
  location: "Bangalore, India",
  availability: "Immediately available · No notice period",
  email: "devarajanchandu@gmail.com",
  phone: "+91 9663397727",
  resumeUrl: "/resume.pdf",
  links: {
    github: "https://github.com/Devarajan241981",
    linkedin: "https://www.linkedin.com/in/devarajan241981/",
    portfolio: "#",
  },
};

export const summary =
  "Computer Science graduate (B.E., June 2026) with 9 months of production internship experience as a Python Backend Developer and Technical Lead. Specializes in Django REST Framework, FastAPI, and AI/LLM integration (OpenAI GPT-4, Gemini). Built AI agent pipelines, REST APIs, and microservices used in production.";

export const skillGroups = [
  {
    label: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "Java", "C++"],
  },
  {
    label: "Backend",
    skills: [
      "Django",
      "Django REST Framework",
      "FastAPI",
      "Flask",
      "REST API Development",
      "Microservices Architecture",
    ],
  },
  {
    label: "AI & LLMs",
    skills: [
      "OpenAI GPT-4",
      "Anthropic Claude",
      "Gemini API",
      "LLM Integration",
      "AI Agent Pipelines",
      "n8n",
      "Make.com",
      "Prompt Engineering",
      "Webhooks",
    ],
  },
  {
    label: "Databases",
    skills: [
      "PostgreSQL (Optimization)",
      "MongoDB",
      "Redis",
      "Supabase",
      "SQLite",
      "Prisma ORM",
      "SQLAlchemy",
    ],
  },
  {
    label: "Frontend",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "MERN Stack"],
  },
  {
    label: "Cloud & DevOps",
    skills: [
      "AWS (EC2, Lambda)",
      "GCP",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "CI/CD Pipelines",
      "GitHub Actions",
    ],
  },
  {
    label: "Tools",
    skills: [
      "Git",
      "GitLab",
      "Jira",
      "Postman",
      "Selenium",
      "Playwright",
      "Agile/Scrum",
      "Technical Leadership",
    ],
  },
];

export const experience = [
  {
    role: "Full Stack Developer Intern",
    subtitle: "Tech Lead & Project Manager",
    company: "Netpy Technologies",
    companyLink: "https://netpy.in/",
    location: "Bangalore",
    period: "Oct 2025 – Jun 2026",
    points: [
      "Led a team of 4 engineers, owning end-to-end architecture, sprint planning, and delivery for production-grade client projects.",
      "Engineered scalable REST APIs using Django REST Framework and FastAPI for high-traffic production environments.",
      "Integrated OpenAI GPT-4 and Gemini APIs to build AI-powered features and automated agent pipelines for clients.",
      "Established Docker-based CI/CD pipelines with GitHub Actions, enabling fast and reliable continuous delivery to production.",
      "Implemented JWT authentication, Redis caching, and RBAC for granular access control across distributed microservices.",
    ],
  },
];

export const projects = [
  {
    title: "Bigpool",
    subtitle: "Multi-Vendor E-Commerce Marketplace",
    stack: "Next.js 16 · TypeScript",
    description:
      "Full-stack multi-vendor marketplace with customer and seller portals, JWT auth, Razorpay payments, and an installable PWA.",
    points: [
      "Full-stack marketplace with Next.js 16 (App Router, server components), React 19, TypeScript, and Tailwind/shadcn-ui — customer and seller portals across 8+ categories, cart, and checkout with Zustand state.",
      "JWT access/refresh-token auth with bcrypt hashing, Supabase (PostgreSQL) for data, Razorpay payments (UPI/card/netbanking), and Resend transactional email.",
      "Installable PWA with web-push notifications, packaged for Android via Capacitor; deployed on Render behind Cloudflare DNS, tested with Vitest.",
      "Cloudinary image uploads and automated component tests with Testing Library, on a responsive UI built with Tailwind CSS and shadcn/ui primitives.",
    ],
    tags: ["Next.js 16", "TypeScript", "Supabase", "Razorpay", "PWA"],
    link: "https://bigpool.in",
    linkLabel: "bigpool.in",
  },
  {
    title: "StackSense",
    subtitle: "Observability & Monitoring Platform",
    role: "Founder",
    stack: "FastAPI · Microservices",
    description:
      "Distributed microservices monitoring platform with autonomous topology mapping and heuristic anomaly detection for high-concurrency systems.",
    points: [
      "Lightweight, non-blocking SDK (under 2ms overhead) that autonomously maps service topology by tracing downstream microservices, database queries, and async message queues.",
      "Heuristic anomaly detection engine that correlates dispersed telemetry signals to pinpoint root causes of latency spikes (P95/P99 regressions) and error cascades in real time.",
      "Built for backend/platform teams running high-concurrency infrastructure — distributed tracing correlation, capacity planning, and alert-fatigue reduction.",
      "Founded and shipped the platform end-to-end as a solo technical founder — architecture, SDK design, metrics pipeline, and product direction.",
    ],
    tags: ["FastAPI", "Microservices", "SDK", "Anomaly Detection", "Distributed Tracing"],
    link: "https://stacksense.in",
    linkLabel: "stacksense.in",
  },
  {
    title: "Gill Organics",
    subtitle: "Organic Farm-Box Delivery Platform",
    role: "Production",
    stack: "Django · React/Next.js",
    description:
      "Full-stack organic farm-box delivery platform with role-based Customer, Packer, and Driver modules for end-to-end fulfillment tracking.",
    points: [
      "Django REST Framework backend and React + Next.js (App Router) frontend, with role-based Customer, Packer, and Driver modules plus an order History module for end-to-end fulfillment tracking.",
      "JWT authentication, Redis caching, and PostgreSQL query optimization to serve high-throughput product catalog and order-tracking APIs at low latency.",
      "Streamlined the pack-and-dispatch workflow from customer order to driver delivery, improving transaction reliability by 6%.",
      "MongoDB used alongside PostgreSQL for flexible catalog data, with the React/Next.js frontend consuming the DRF API layer end to end.",
    ],
    tags: ["Django REST Framework", "React", "Next.js", "PostgreSQL", "Redis"],
    link: "https://gillorganics.netpy.in/login",
    linkLabel: "gillorganics.netpy.in",
  },
  {
    title: "Job Agent",
    subtitle: "Autonomous Job Application Agent",
    stack: "Python · FastAPI · Playwright",
    description:
      "Autonomous agent that scrapes job boards, scores postings against a candidate profile, and auto-applies across 10+ portals.",
    points: [
      "Scrapes Greenhouse, Lever, and Ashby job board APIs directly across 40+ target companies, pulling roughly 1,000 listings per run.",
      "Custom scoring engine ranks jobs 0–100 by title/tech-stack match, AI/LLM keyword bonus, location, and experience-level fit.",
      "Playwright-driven application engine auto-fills forms and generates cover letters across LinkedIn, Naukri, Wellfound, and Indeed.",
      "FastAPI SaaS backend with JWT auth, bcrypt hashing, and Fernet-encrypted credential storage, plus dedup tracking to avoid re-applying to the same job.",
    ],
    tags: ["Python", "FastAPI", "Playwright", "Automation"],
    link: "#",
    linkLabel: "Coming soon",
  },
  {
    title: "AI Interviewer",
    subtitle: "Voice-Driven Mock Interview Platform",
    stack: "Next.js · Claude · Deepgram",
    description:
      "Voice-driven AI mock interview platform with a lip-synced 3D avatar that conducts and scores realistic spoken interviews.",
    points: [
      "Multi-provider LLM layer swaps between Claude, GPT-4o, and local Ollama for the interviewer persona and post-interview scoring.",
      "Full voice pipeline: mic capture → Deepgram speech-to-text → Claude response → ElevenLabs TTS, played through an audio-reactive 3D avatar.",
      "Prisma-modeled interview data with per-message scoring, resume parsing (PDF/DOCX), and an admin dashboard for jobs and candidates.",
      "3D avatar built with React Three Fiber and Three.js, with procedural jaw/blink animation driven by live audio amplitude for lip-sync.",
    ],
    tags: ["Next.js", "Claude", "Deepgram", "Three.js"],
    link: "#",
    linkLabel: "Coming soon",
  },
];

export const education = [
  {
    school: "S.E.A College of Engineering, Bangalore",
    degree: "B.E. – Computer Science & Engineering",
    period: "2022 – Jun 2026",
    link: "https://seacet.edu.in/",
  },
  {
    school: "RK Vision PU College",
    degree: "PUC – PCMB",
    period: "2020 – 2022",
  },
];

export const certifications = [
  {
    name: "Introduction to Data Science",
    issuer: "Cisco",
    link: "https://drive.google.com/file/d/1AciWqMJtv9o_eHO6u4nHgraWd4rIObbT/view",
  },
  {
    name: "Advanced Software Engineering",
    issuer: "Walmart",
    link: "https://drive.google.com/file/d/1J_Fb9t7Ax8k2f3nWt4iOUFWHmSegoL6L/view",
  },
  {
    name: "AWS EC2 & Lambda",
    issuer: "Simplilearn",
    link: "https://drive.google.com/file/d/1hgLFREQmIhTuIF2p5Nca3COz083tWeeR/view",
  },
];

export const achievements = [
  {
    text: "Regional Round Winner – TCS TechBytes",
    link: "https://drive.google.com/file/d/1ldoSmaEaMSfjrrKL-_v6PPIFklIPfdT7/view",
  },
  { text: "Solved 100+ DSA problems on competitive platforms" },
  { text: "University Hackathon Finalist – S.E.A College" },
];

export const services = [
  {
    title: "Website Builder",
    description: "Full-stack websites from wireframe to launch, built for speed and clarity.",
    visual: "website-builder",
  },
  {
    title: "Android App Development",
    description: "Native and cross-platform Android apps with clean, maintainable code.",
    visual: "android",
  },
  {
    title: "Software Development",
    description: "End-to-end software systems — architecture, APIs, and production delivery.",
    visual: "software",
  },
  {
    title: "Database Design",
    description: "Schema modeling, relationships, and query optimization for scale.",
    visual: "database",
  },
  {
    title: "Backend Development",
    description: "REST APIs, microservices, and integrations built for reliability.",
    visual: "backend",
  },
  {
    title: "Frontend Development",
    description: "Responsive, accessible interfaces with modern component architecture.",
    visual: "frontend",
  },
  {
    title: "UI/UX Design",
    description: "Wireframes, design systems, and user flows grounded in usability.",
    visual: "ui-ux",
  },
  {
    title: "Blender 3D",
    description: "3D modeling, texturing, and rendering for product and concept visuals.",
    visual: "blender",
  },
  {
    title: "Video Editing",
    description: "Clean cuts, pacing, and color grading for promo and product videos.",
    visual: "video-editing",
  },
  {
    title: "Product Building",
    description: "From idea to shipped product — scoping, building, and iterating fast.",
    visual: "product-builder",
  },
  {
    title: "Workflow Automation",
    description: "n8n and Make.com pipelines that connect apps, APIs, and triggers.",
    visual: "automation",
  },
  {
    title: "AI & LLM Agents",
    description: "Agent pipelines with tool calling, prompt engineering, and RAG on GPT-4/Gemini.",
    visual: "ai-agent",
  },
] as const;

export type ServiceVisualType = (typeof services)[number]["visual"];

export const publications = [
  {
    title: "Confidential Stock Trading on Encrypted VM's",
    venue: "International Journal For Multidisciplinary Research (IJFMR), 2025",
    link: "https://www.ijfmr.com/papers/2025/6/60468.pdf",
  },
];
