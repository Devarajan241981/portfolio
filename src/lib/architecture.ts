export type ArchNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
};

export type Side = "top" | "bottom" | "left" | "right";

export type ArchEdge = {
  id: string;
  from: string;
  to: string;
  /** Force which side of the node the edge exits/enters, overriding
   *  auto-detection — needed when a straight auto-routed segment would
   *  cut through an unrelated node sitting between the two endpoints. */
  fromSide?: Side;
  toSide?: Side;
  /** Extra bend points inserted between the two endpoints, for edges that
   *  must detour around an unrelated node sitting directly between them. */
  waypoints?: { x: number; y: number }[];
};

export type ArchStep = {
  caption: string;
  activeNodes: string[];
  activeEdges: string[];
};

export type ArchitectureSpec = {
  viewBoxWidth?: number;
  viewBoxHeight?: number;
  nodes: ArchNode[];
  edges: ArchEdge[];
  steps: ArchStep[];
};

export const architectures: Record<string, ArchitectureSpec> = {
  StackSense: {
    viewBoxWidth: 515,
    viewBoxHeight: 210,
    nodes: [
      { id: "svc-a", label: "Service A", x: 15, y: 10, w: 90 },
      { id: "svc-b", label: "Service B", x: 15, y: 65, w: 90 },
      { id: "svc-c", label: "Service C", x: 15, y: 120, w: 90 },
      { id: "trigger", label: "Event Trigger", x: 145, y: 65, w: 100 },
      { id: "sdk", label: "SDK Ingest <2ms", x: 275, y: 35, w: 105 },
      { id: "metrics", label: "Metrics Pipeline", x: 275, y: 105, w: 105 },
      { id: "anomaly", label: "Anomaly Engine", x: 400, y: 10, w: 95 },
      { id: "mapper", label: "Dependency Map", x: 400, y: 70, w: 95 },
      { id: "dashboard", label: "Dashboard/Alert", x: 400, y: 130, w: 95 },
    ],
    edges: [
      { id: "a-trigger", from: "svc-a", to: "trigger" },
      { id: "b-trigger", from: "svc-b", to: "trigger" },
      { id: "c-trigger", from: "svc-c", to: "trigger" },
      { id: "trigger-sdk", from: "trigger", to: "sdk" },
      { id: "sdk-metrics", from: "sdk", to: "metrics" },
      { id: "metrics-anomaly", from: "metrics", to: "anomaly" },
      { id: "metrics-mapper", from: "metrics", to: "mapper" },
      { id: "anomaly-dashboard", from: "anomaly", to: "dashboard" },
      { id: "mapper-dashboard", from: "mapper", to: "dashboard" },
    ],
    steps: [
      {
        caption: "Downstream services emit events across the topology.",
        activeNodes: ["svc-a", "svc-b", "svc-c", "trigger"],
        activeEdges: ["a-trigger", "b-trigger", "c-trigger"],
      },
      {
        caption: "A non-blocking SDK ingests them with under 2ms overhead.",
        activeNodes: ["trigger", "sdk"],
        activeEdges: ["trigger-sdk"],
      },
      {
        caption: "Telemetry is correlated into the metrics pipeline.",
        activeNodes: ["sdk", "metrics"],
        activeEdges: ["sdk-metrics"],
      },
      {
        caption: "The heuristic engine flags P95/P99 latency regressions.",
        activeNodes: ["metrics", "anomaly"],
        activeEdges: ["metrics-anomaly"],
      },
      {
        caption: "Dependency mapper traces the live service graph.",
        activeNodes: ["metrics", "mapper"],
        activeEdges: ["metrics-mapper"],
      },
      {
        caption: "Root cause surfaces on the dashboard, alert fatigue reduced.",
        activeNodes: ["anomaly", "mapper", "dashboard"],
        activeEdges: ["anomaly-dashboard", "mapper-dashboard"],
      },
    ],
  },

  Bigpool: {
    viewBoxHeight: 210,
    nodes: [
      { id: "customer", label: "Customer Portal", x: 15, y: 20, w: 110 },
      { id: "seller", label: "Seller Portal", x: 15, y: 90, w: 110 },
      { id: "api", label: "Next.js API Routes", x: 175, y: 55, w: 120 },
      { id: "supabase", label: "Supabase (Postgres)", x: 345, y: 5, w: 125 },
      { id: "razorpay", label: "Razorpay", x: 345, y: 55, w: 125 },
      { id: "resend", label: "Resend Email", x: 345, y: 105, w: 125 },
      { id: "cloudinary", label: "Cloudinary", x: 345, y: 155, w: 125 },
    ],
    edges: [
      { id: "customer-api", from: "customer", to: "api" },
      { id: "seller-api", from: "seller", to: "api" },
      { id: "api-supabase", from: "api", to: "supabase" },
      { id: "api-razorpay", from: "api", to: "razorpay" },
      { id: "api-resend", from: "api", to: "resend" },
      { id: "api-cloudinary", from: "api", to: "cloudinary" },
    ],
    steps: [
      {
        caption: "Customer and seller portals hit the API layer.",
        activeNodes: ["customer", "seller", "api"],
        activeEdges: ["customer-api", "seller-api"],
      },
      {
        caption: "JWT access/refresh tokens verify the session.",
        activeNodes: ["api"],
        activeEdges: [],
      },
      {
        caption: "Order and catalog data is written to Supabase Postgres.",
        activeNodes: ["api", "supabase"],
        activeEdges: ["api-supabase"],
      },
      {
        caption: "Razorpay processes UPI, card, and netbanking payments.",
        activeNodes: ["api", "razorpay"],
        activeEdges: ["api-razorpay"],
      },
      {
        caption: "Resend sends the order confirmation email.",
        activeNodes: ["api", "resend"],
        activeEdges: ["api-resend"],
      },
      {
        caption: "Cloudinary serves optimized product images.",
        activeNodes: ["api", "cloudinary"],
        activeEdges: ["api-cloudinary"],
      },
      {
        caption: "Installable PWA pushes delivery updates back to the customer.",
        activeNodes: ["api", "customer"],
        activeEdges: ["customer-api"],
      },
    ],
  },

  "Gill Organics": {
    viewBoxHeight: 200,
    nodes: [
      { id: "customer", label: "Customer Order", x: 10, y: 15, w: 95 },
      { id: "api", label: "Django REST API", x: 130, y: 15, w: 105 },
      { id: "packer", label: "Packer Module", x: 260, y: 15, w: 100 },
      { id: "driver", label: "Driver Module", x: 380, y: 15, w: 95 },
      { id: "postgres", label: "PostgreSQL", x: 195, y: 130, w: 105 },
      { id: "redis", label: "Redis Cache", x: 325, y: 130, w: 100 },
    ],
    edges: [
      { id: "customer-api", from: "customer", to: "api" },
      { id: "api-packer", from: "api", to: "packer" },
      { id: "packer-driver", from: "packer", to: "driver" },
      { id: "api-postgres", from: "api", to: "postgres", fromSide: "bottom", toSide: "top" },
      { id: "api-redis", from: "api", to: "redis", fromSide: "bottom", toSide: "top" },
      {
        id: "driver-api",
        from: "driver",
        to: "api",
        fromSide: "bottom",
        toSide: "bottom",
        waypoints: [
          { x: 427, y: 100 },
          { x: 182, y: 100 },
        ],
      },
    ],
    steps: [
      {
        caption: "Customer places an order through the storefront.",
        activeNodes: ["customer", "api"],
        activeEdges: ["customer-api"],
      },
      {
        caption: "PostgreSQL stores the order, query-optimized for scale.",
        activeNodes: ["api", "postgres"],
        activeEdges: ["api-postgres"],
      },
      {
        caption: "Redis caches high-throughput catalog lookups.",
        activeNodes: ["api", "redis"],
        activeEdges: ["api-redis"],
      },
      {
        caption: "Packer module picks and prepares the farm box.",
        activeNodes: ["api", "packer"],
        activeEdges: ["api-packer"],
      },
      {
        caption: "Driver module handles dispatch and delivery.",
        activeNodes: ["packer", "driver"],
        activeEdges: ["packer-driver"],
      },
      {
        caption: "Fulfillment status flows back through order history.",
        activeNodes: ["driver", "api"],
        activeEdges: ["driver-api"],
      },
    ],
  },

  "Job Agent": {
    viewBoxWidth: 565,
    viewBoxHeight: 210,
    nodes: [
      { id: "greenhouse", label: "Greenhouse", x: 10, y: 5, w: 95 },
      { id: "lever", label: "Lever", x: 10, y: 60, w: 95 },
      { id: "ashby", label: "Ashby", x: 10, y: 115, w: 95 },
      { id: "scraper", label: "Scraper (40+ cos)", x: 145, y: 60, w: 115 },
      { id: "scoring", label: "Scoring Engine 0–100", x: 285, y: 60, w: 125 },
      { id: "backend", label: "FastAPI + Dedup", x: 285, y: 140, w: 125 },
      { id: "playwright", label: "Playwright Apply", x: 435, y: 30, w: 100 },
      { id: "portals", label: "LinkedIn / Naukri / Indeed", x: 425, y: 110, w: 120 },
    ],
    edges: [
      { id: "gh-scraper", from: "greenhouse", to: "scraper" },
      { id: "lever-scraper", from: "lever", to: "scraper" },
      { id: "ashby-scraper", from: "ashby", to: "scraper" },
      { id: "scraper-scoring", from: "scraper", to: "scoring" },
      { id: "scoring-backend", from: "scoring", to: "backend" },
      { id: "backend-playwright", from: "backend", to: "playwright" },
      { id: "playwright-portals", from: "playwright", to: "portals" },
    ],
    steps: [
      {
        caption: "Scrapes Greenhouse, Lever, and Ashby across 40+ companies.",
        activeNodes: ["greenhouse", "lever", "ashby", "scraper"],
        activeEdges: ["gh-scraper", "lever-scraper", "ashby-scraper"],
      },
      {
        caption: "Roughly 1,000 listings pulled and normalized per run.",
        activeNodes: ["scraper", "scoring"],
        activeEdges: ["scraper-scoring"],
      },
      {
        caption: "Scoring engine ranks each job 0–100 by fit and AI/LLM bonus.",
        activeNodes: ["scoring"],
        activeEdges: [],
      },
      {
        caption: "FastAPI backend checks dedup and decrypts saved credentials.",
        activeNodes: ["scoring", "backend"],
        activeEdges: ["scoring-backend"],
      },
      {
        caption: "Playwright auto-fills forms and generates cover letters.",
        activeNodes: ["backend", "playwright"],
        activeEdges: ["backend-playwright"],
      },
      {
        caption: "Applications go out across LinkedIn, Naukri, and Indeed.",
        activeNodes: ["playwright", "portals"],
        activeEdges: ["playwright-portals"],
      },
    ],
  },

  "AI Interviewer": {
    viewBoxWidth: 550,
    viewBoxHeight: 200,
    nodes: [
      { id: "mic", label: "Mic Input", x: 10, y: 85, w: 90 },
      { id: "stt", label: "Deepgram STT", x: 130, y: 50, w: 105 },
      { id: "llm", label: "Claude / GPT-4o / Ollama", x: 265, y: 50, w: 140 },
      { id: "tts", label: "ElevenLabs TTS", x: 425, y: 50, w: 105 },
      { id: "avatar", label: "3D Avatar Lip-Sync", x: 425, y: 130, w: 105 },
      { id: "prisma", label: "Prisma Scoring DB", x: 265, y: 130, w: 140 },
    ],
    edges: [
      { id: "mic-stt", from: "mic", to: "stt" },
      { id: "stt-llm", from: "stt", to: "llm" },
      { id: "llm-tts", from: "llm", to: "tts" },
      { id: "tts-avatar", from: "tts", to: "avatar" },
      { id: "llm-prisma", from: "llm", to: "prisma" },
    ],
    steps: [
      {
        caption: "Mic captures live candidate speech.",
        activeNodes: ["mic", "stt"],
        activeEdges: ["mic-stt"],
      },
      {
        caption: "Deepgram converts speech to text in real time.",
        activeNodes: ["stt", "llm"],
        activeEdges: ["stt-llm"],
      },
      {
        caption: "A multi-provider LLM layer generates the interviewer's response.",
        activeNodes: ["llm"],
        activeEdges: [],
      },
      {
        caption: "ElevenLabs synthesizes natural speech from the reply.",
        activeNodes: ["llm", "tts"],
        activeEdges: ["llm-tts"],
      },
      {
        caption: "The 3D avatar lip-syncs to live audio amplitude.",
        activeNodes: ["tts", "avatar"],
        activeEdges: ["tts-avatar"],
      },
      {
        caption: "Prisma logs per-message scoring and resume data.",
        activeNodes: ["llm", "prisma"],
        activeEdges: ["llm-prisma"],
      },
    ],
  },
};
