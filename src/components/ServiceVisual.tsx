import type { ServiceVisualType } from "@/lib/data";

const BOX = "0 0 220 132";

function WebsiteBuilderVisual() {
  return (
    <svg viewBox={BOX} className="h-full w-full" aria-hidden="true">
      <rect x="10" y="10" width="200" height="112" rx="6" className="svc-box" strokeWidth="1" />
      <circle cx="20" cy="20" r="2.2" className="svc-text" opacity="0.5" />
      <circle cx="29" cy="20" r="2.2" className="svc-text" opacity="0.5" />
      <circle cx="38" cy="20" r="2.2" className="svc-text" opacity="0.5" />
      <line x1="10" y1="30" x2="210" y2="30" className="svc-line" strokeWidth="1" />
      <rect
        x="22" y="40" width="176" height="22" rx="3"
        className="svc-box svc-fade-loop"
        style={{ animationDelay: "0s" }}
        strokeWidth="1"
      />
      <rect
        x="22" y="68" width="84" height="40" rx="3"
        className="svc-box svc-fade-loop"
        style={{ animationDelay: "0.5s" }}
        strokeWidth="1"
      />
      <rect
        x="114" y="68" width="84" height="40" rx="3"
        className="svc-box svc-fade-loop"
        style={{ animationDelay: "1s" }}
        strokeWidth="1"
      />
    </svg>
  );
}

function AndroidVisual() {
  const icons = Array.from({ length: 6 }, (_, i) => ({
    x: 82 + (i % 2) * 30,
    y: 30 + Math.floor(i / 2) * 30,
    delay: i * 0.25,
  }));
  return (
    <svg viewBox={BOX} className="h-full w-full" aria-hidden="true">
      <rect x="70" y="8" width="80" height="116" rx="10" className="svc-box" strokeWidth="1" />
      <rect x="100" y="14" width="20" height="4" rx="2" className="svc-text" opacity="0.35" />
      {icons.map((icon, i) => (
        <rect
          key={i}
          x={icon.x} y={icon.y} width="18" height="18" rx="4"
          className="svc-box svc-pulse"
          style={{ animationDelay: `${icon.delay}s` }}
          strokeWidth="1"
        />
      ))}
      <rect x="95" y="112" width="30" height="3" rx="1.5" className="svc-text" opacity="0.3" />
    </svg>
  );
}

function SoftwareVisual() {
  const lines = [
    { text: "function build() {", w: 78 },
    { text: "  const data = fetch();", w: 108 },
    { text: "  return data.json();", w: 100 },
    { text: "}", w: 14 },
  ];
  return (
    <svg viewBox={BOX} className="h-full w-full" aria-hidden="true">
      <rect x="10" y="10" width="200" height="112" rx="6" className="svc-box" strokeWidth="1" />
      <circle cx="20" cy="20" r="2.2" className="svc-text" opacity="0.5" />
      <circle cx="29" cy="20" r="2.2" className="svc-text" opacity="0.5" />
      <circle cx="38" cy="20" r="2.2" className="svc-text" opacity="0.5" />
      <line x1="10" y1="28" x2="210" y2="28" className="svc-line" strokeWidth="1" />
      {lines.map((line, i) => (
        <text
          key={i}
          x="22" y={46 + i * 16}
          className="svc-text svc-fade-loop font-mono"
          style={{ fontSize: 7.5, animationDelay: `${i * 0.4}s` }}
        >
          {line.text}
        </text>
      ))}
      <rect x="22" y="104" width="6" height="9" className="svc-blink" fill="var(--accent)" />
    </svg>
  );
}

function DatabaseVisual() {
  const path = "M102,61 C112,61 108,91 118,91";
  return (
    <svg viewBox={BOX} className="h-full w-full" aria-hidden="true">
      <rect x="12" y="10" width="90" height="68" rx="4" className="svc-box" strokeWidth="1" />
      <text x="57" y="21" textAnchor="middle" className="svc-text font-mono" style={{ fontSize: 7.5 }}>
        users
      </text>
      <line x1="12" y1="26" x2="102" y2="26" className="svc-line" strokeWidth="1" />
      <text x="18" y="38" className="svc-text font-mono" style={{ fontSize: 6 }}>
        id · uuid PK
      </text>
      <text x="18" y="54" className="svc-text font-mono" style={{ fontSize: 6 }}>
        email · text
      </text>
      <text x="18" y="70" className="svc-text font-mono" style={{ fontSize: 6 }}>
        org_id · uuid FK
      </text>

      <rect x="118" y="46" width="90" height="68" rx="4" className="svc-box" strokeWidth="1" />
      <text x="163" y="57" textAnchor="middle" className="svc-text font-mono" style={{ fontSize: 7.5 }}>
        orders
      </text>
      <line x1="118" y1="62" x2="208" y2="62" className="svc-line" strokeWidth="1" />
      <text x="124" y="74" className="svc-text font-mono" style={{ fontSize: 6 }}>
        id · uuid PK
      </text>
      <text x="124" y="90" className="svc-text font-mono" style={{ fontSize: 6 }}>
        user_id · uuid FK
      </text>
      <text x="124" y="106" className="svc-text font-mono" style={{ fontSize: 6 }}>
        total · numeric
      </text>

      <path d={path} fill="none" className="svc-line svc-dash" strokeWidth="1" />
      <circle r="2.4" fill="var(--accent)">
        <animateMotion dur="2.4s" repeatCount="indefinite" path={path} />
      </circle>

      <text
        x="110" y="126" textAnchor="middle"
        className="svc-text svc-fade-loop font-mono"
        style={{ fontSize: 6.5 }}
      >
        SELECT * FROM orders JOIN users USING(id)
      </text>
    </svg>
  );
}

function BackendVisual() {
  const requestPath = "M76,58 L142,58";
  const responsePath = "M142,76 L76,76";
  return (
    <svg viewBox={BOX} className="h-full w-full" aria-hidden="true">
      <rect x="14" y="50" width="60" height="34" rx="4" className="svc-box" strokeWidth="1" />
      <text x="44" y="70" textAnchor="middle" className="svc-text font-mono" style={{ fontSize: 7.5 }}>
        Client
      </text>

      <rect x="146" y="50" width="60" height="34" rx="4" className="svc-box" strokeWidth="1" />
      <text x="176" y="70" textAnchor="middle" className="svc-text font-mono" style={{ fontSize: 7.5 }}>
        Server
      </text>

      <line x1="76" y1="58" x2="142" y2="58" className="svc-line" strokeWidth="1" />
      <line x1="142" y1="76" x2="76" y2="76" className="svc-line" strokeWidth="1" />

      <text
        x="109" y="52" textAnchor="middle"
        className="svc-text svc-fade-loop font-mono"
        style={{ fontSize: 6, animationDelay: "0s" }}
      >
        GET /users
      </text>
      <text
        x="109" y="92" textAnchor="middle"
        className="svc-text svc-fade-loop font-mono"
        style={{ fontSize: 6, animationDelay: "1.6s" }}
      >
        200 OK
      </text>

      <circle r="2.2" fill="var(--accent)">
        <animateMotion dur="1.8s" repeatCount="indefinite" path={requestPath} />
      </circle>
      <circle r="2.2" fill="var(--accent)">
        <animateMotion dur="1.8s" repeatCount="indefinite" path={responsePath} begin="0.9s" />
      </circle>
    </svg>
  );
}

function FrontendVisual() {
  return (
    <svg viewBox={BOX} className="h-full w-full" aria-hidden="true">
      <rect x="10" y="10" width="200" height="112" rx="6" className="svc-box" strokeWidth="1" />
      <line x1="10" y1="28" x2="210" y2="28" className="svc-line" strokeWidth="1" />
      <rect x="20" y="19" width="26" height="5" rx="2" className="svc-text" opacity="0.35" />
      <rect x="150" y="19" width="14" height="5" rx="2" className="svc-text" opacity="0.3" />
      <rect x="170" y="19" width="14" height="5" rx="2" className="svc-text" opacity="0.3" />
      <rect x="190" y="19" width="10" height="5" rx="2" className="svc-text" opacity="0.3" />

      <rect x="22" y="38" width="176" height="18" rx="3" className="svc-box" strokeWidth="1" />

      {[22, 90, 158].map((x, i) => (
        <rect
          key={x}
          x={x} y="64" width="60" height="44" rx="3"
          className="svc-box svc-highlight"
          style={{ animationDelay: `${i}s` }}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

function UiUxVisual() {
  return (
    <svg viewBox={BOX} className="h-full w-full" aria-hidden="true">
      <rect x="14" y="12" width="192" height="88" rx="4" className="svc-box" strokeWidth="1" />
      <rect
        x="40" y="30" width="70" height="46" rx="3"
        fill="none"
        className="svc-line svc-dash"
        strokeWidth="1"
      />
      <circle cx="110" cy="76" r="2.4" fill="var(--accent)" className="svc-pulse" />

      <circle cx="30" cy="112" r="5" fill="rgb(var(--decor-rgb) / 0.5)" />
      <circle cx="46" cy="112" r="5" fill="var(--accent)" />
      <circle cx="62" cy="112" r="5" fill="rgb(var(--decor-rgb) / 0.28)" />
      <text x="130" y="117" className="svc-text font-mono" style={{ fontSize: 13 }}>
        Aa
      </text>
    </svg>
  );
}

function BlenderVisual() {
  return (
    <svg viewBox={BOX} className="h-full w-full" aria-hidden="true">
      <g className="svc-spin">
        <polygon
          points="110,26 144,46 144,86 110,106 76,86 76,46"
          fill="none"
          className="svc-line"
          strokeWidth="1"
        />
        <line x1="110" y1="66" x2="144" y2="46" className="svc-line" strokeWidth="1" />
        <line x1="110" y1="66" x2="110" y2="106" className="svc-line" strokeWidth="1" />
        <line x1="110" y1="66" x2="76" y2="46" className="svc-line" strokeWidth="1" />
        <circle cx="110" cy="66" r="2.2" fill="var(--accent)" className="svc-pulse" />
      </g>
    </svg>
  );
}

function VideoEditingVisual() {
  const bars = Array.from({ length: 22 }, (_, i) => 6 + Math.abs(Math.sin(i * 1.3)) * 22);
  return (
    <svg viewBox={BOX} className="h-full w-full" aria-hidden="true">
      {bars.map((h, i) => (
        <line
          key={i}
          x1={16 + i * 8.6} x2={16 + i * 8.6}
          y1={56 - h / 2} y2={56 + h / 2}
          className="svc-line"
          strokeWidth="1.5"
        />
      ))}

      <rect x="14" y="88" width="192" height="22" rx="3" className="svc-box" strokeWidth="1" />
      <rect x="16" y="90" width="48" height="18" rx="2" fill="rgb(var(--decor-rgb) / 0.14)" />
      <rect x="70" y="90" width="34" height="18" rx="2" fill="rgb(var(--decor-rgb) / 0.1)" />
      <rect x="108" y="90" width="58" height="18" rx="2" fill="rgb(var(--decor-rgb) / 0.14)" />
      <rect x="170" y="90" width="30" height="18" rx="2" fill="rgb(var(--decor-rgb) / 0.1)" />

      <line x1="16" y1="82" x2="16" y2="116" stroke="var(--accent)" strokeWidth="1.5">
        <animate attributeName="x1" values="16;200;16" dur="4.5s" repeatCount="indefinite" />
        <animate attributeName="x2" values="16;200;16" dur="4.5s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

function ProductBuilderVisual() {
  const boxes = [
    { x: 14, label: "Idea" },
    { x: 68, label: "Design" },
    { x: 122, label: "Build" },
    { x: 176, label: "Ship" },
  ];
  const path = "M14,69 L210,69";
  return (
    <svg viewBox={BOX} className="h-full w-full" aria-hidden="true">
      <path d={path} className="svc-line svc-dash" strokeWidth="1" />
      {boxes.map((b, i) => (
        <g key={b.label}>
          <rect
            x={b.x} y="56" width="34" height="26" rx="4"
            className="svc-box svc-pulse"
            style={{ animationDelay: `${i * 0.75}s` }}
            strokeWidth="1"
          />
          <text
            x={b.x + 17} y="73" textAnchor="middle"
            className="svc-text font-mono" style={{ fontSize: 6 }}
          >
            {b.label}
          </text>
        </g>
      ))}
      <circle r="2.6" fill="var(--accent)">
        <animateMotion dur="3s" repeatCount="indefinite" path={path} />
      </circle>
    </svg>
  );
}

function AutomationVisual() {
  const nodes = [
    { x: 20, y: 50, w: 34, h: 26, label: "Trigger" },
    { x: 90, y: 30, w: 34, h: 26, label: "IF" },
    { x: 90, y: 74, w: 34, h: 26, label: "HTTP" },
    { x: 160, y: 50, w: 40, h: 26, label: "Output" },
  ];
  const paths = [
    "M54,56 C72,56 72,43 90,43",
    "M54,70 C72,70 72,87 90,87",
    "M124,43 C142,43 142,63 160,63",
    "M124,87 C142,87 142,63 160,63",
  ];
  return (
    <svg viewBox={BOX} className="h-full w-full" aria-hidden="true">
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" className="svc-line svc-dash" strokeWidth="1" />
      ))}
      {paths.map((d, i) => (
        <circle key={`dot-${i}`} r="2" fill="var(--accent)">
          <animateMotion dur="1.8s" repeatCount="indefinite" path={d} begin={`${i * 0.3}s`} />
        </circle>
      ))}
      {nodes.map((n) => (
        <g key={n.label}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="5" className="svc-box" strokeWidth="1" />
          <text
            x={n.x + n.w / 2} y={n.y + n.h / 2 + 2.5} textAnchor="middle"
            className="svc-text font-mono" style={{ fontSize: 6 }}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function AiAgentVisual() {
  const promptToLlm = "M60,31 C75,31 75,52 87,58";
  const llmToResponse = "M133,58 C148,52 148,31 160,31";
  const llmToSearch = "M104,80 C100,88 98,90 95,96";
  const llmToDb = "M116,80 C120,88 148,90 154,96";
  return (
    <svg viewBox={BOX} className="h-full w-full" aria-hidden="true">
      <path d={promptToLlm} fill="none" className="svc-line svc-dash" strokeWidth="1" />
      <path d={llmToResponse} fill="none" className="svc-line svc-dash" strokeWidth="1" />
      <path d={llmToSearch} fill="none" className="svc-line svc-dash" strokeWidth="1" />
      <path d={llmToDb} fill="none" className="svc-line svc-dash" strokeWidth="1" />

      <circle r="2" fill="var(--accent)">
        <animateMotion dur="1.6s" repeatCount="indefinite" path={promptToLlm} />
      </circle>
      <circle r="2" fill="var(--accent)">
        <animateMotion dur="1.6s" repeatCount="indefinite" path={llmToResponse} begin="0.8s" />
      </circle>
      <circle r="1.8" fill="var(--accent)">
        <animateMotion dur="1.4s" repeatCount="indefinite" path={llmToSearch} begin="0.3s" />
      </circle>
      <circle r="1.8" fill="var(--accent)">
        <animateMotion dur="1.4s" repeatCount="indefinite" path={llmToDb} begin="0.7s" />
      </circle>

      <rect x="14" y="20" width="46" height="22" rx="4" className="svc-box" strokeWidth="1" />
      <text x="37" y="34" textAnchor="middle" className="svc-text font-mono" style={{ fontSize: 6 }}>
        Prompt
      </text>

      <rect x="160" y="20" width="46" height="22" rx="4" className="svc-box" strokeWidth="1" />
      <text x="183" y="34" textAnchor="middle" className="svc-text font-mono" style={{ fontSize: 6 }}>
        Response
      </text>

      <rect
        x="83" y="48" width="54" height="34" rx="7"
        fill="none"
        className="svc-line svc-dash svc-pulse"
        strokeWidth="1"
      />
      <rect x="87" y="52" width="46" height="26" rx="6" className="svc-box" strokeWidth="1" />
      <text x="110" y="69" textAnchor="middle" className="svc-text font-mono" style={{ fontSize: 6.5 }}>
        LLM
      </text>

      <rect x="68" y="96" width="54" height="22" rx="4" className="svc-box" strokeWidth="1" />
      <text x="95" y="110" textAnchor="middle" className="svc-text font-mono" style={{ fontSize: 6 }}>
        Tool: Search
      </text>

      <rect x="132" y="96" width="44" height="22" rx="4" className="svc-box" strokeWidth="1" />
      <text x="154" y="110" textAnchor="middle" className="svc-text font-mono" style={{ fontSize: 6 }}>
        Tool: DB
      </text>
    </svg>
  );
}

export function ServiceVisual({ type }: { type: ServiceVisualType }) {
  switch (type) {
    case "website-builder":
      return <WebsiteBuilderVisual />;
    case "android":
      return <AndroidVisual />;
    case "software":
      return <SoftwareVisual />;
    case "database":
      return <DatabaseVisual />;
    case "backend":
      return <BackendVisual />;
    case "frontend":
      return <FrontendVisual />;
    case "ui-ux":
      return <UiUxVisual />;
    case "blender":
      return <BlenderVisual />;
    case "video-editing":
      return <VideoEditingVisual />;
    case "product-builder":
      return <ProductBuilderVisual />;
    case "automation":
      return <AutomationVisual />;
    case "ai-agent":
      return <AiAgentVisual />;
    default:
      return null;
  }
}
