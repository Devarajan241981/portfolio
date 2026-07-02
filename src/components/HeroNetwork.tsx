"use client";

import { motion } from "framer-motion";

const nodes = [
  { x: 120, y: 90 },
  { x: 320, y: 190 },
  { x: 540, y: 70 },
  { x: 700, y: 230 },
  { x: 880, y: 110 },
  { x: 1020, y: 250 },
  { x: 760, y: 390 },
  { x: 430, y: 350 },
  { x: 190, y: 300 },
  { x: 970, y: 420 },
  { x: 70, y: 420 },
];

const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 8],
  [2, 3],
  [2, 4],
  [3, 4],
  [3, 7],
  [4, 5],
  [5, 6],
  [5, 9],
  [6, 7],
  [6, 9],
  [7, 8],
  [8, 10],
  [0, 10],
];

const accentNodes = new Set([2, 5, 8]);

export function HeroNetwork() {
  return (
    <motion.svg
      viewBox="0 0 1200 500"
      preserveAspectRatio="xMidYMin slice"
      className="absolute inset-0 h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      aria-hidden="true"
    >
      {edges.map(([a, b]) => {
        const from = nodes[a];
        const to = nodes[b];
        return (
          <line
            key={`${a}-${b}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="rgb(var(--decor-rgb) / 0.12)"
            strokeWidth="1"
            className="wire-line"
          />
        );
      })}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={accentNodes.has(i) ? 4 : 2.5}
          fill={accentNodes.has(i) ? "var(--accent)" : "rgb(var(--decor-rgb) / 0.55)"}
          className="wire-node"
        />
      ))}
    </motion.svg>
  );
}
