"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ArchitectureSpec, ArchNode, Side } from "@/lib/architecture";

const NODE_W = 92;
const NODE_H = 34;
const STEP_DURATION = 2800;

function sidePoint(node: ArchNode, side: Side, w: number, h: number, centerX: number, centerY: number) {
  switch (side) {
    case "left":
      return { x: node.x, y: centerY };
    case "right":
      return { x: node.x + w, y: centerY };
    case "top":
      return { x: centerX, y: node.y };
    case "bottom":
      return { x: centerX, y: node.y + h };
  }
}

export function ArchitectureDiagram({ spec }: { spec: ArchitectureSpec }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStepIndex((i) => (i + 1) % spec.steps.length);
    }, STEP_DURATION);
    return () => clearInterval(id);
  }, [spec.steps.length]);

  const step = spec.steps[stepIndex];
  const nodeById = Object.fromEntries(spec.nodes.map((n) => [n.id, n]));
  const width = spec.viewBoxWidth ?? 480;
  const height = spec.viewBoxHeight ?? 210;

  return (
    <div className="flex flex-col gap-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
        {spec.edges.map((edge) => {
          const from = nodeById[edge.from];
          const to = nodeById[edge.to];
          const fw = from.w ?? NODE_W;
          const fh = from.h ?? NODE_H;
          const tw = to.w ?? NODE_W;
          const th = to.h ?? NODE_H;
          const cx1 = from.x + fw / 2;
          const cy1 = from.y + fh / 2;
          const cx2 = to.x + tw / 2;
          const cy2 = to.y + th / 2;
          const dx = cx2 - cx1;
          const dy = cy2 - cy1;
          let x1: number, y1: number, x2: number, y2: number;
          let vertical: boolean;
          if (edge.fromSide || edge.toSide) {
            const autoHorizontal = Math.abs(dx) >= Math.abs(dy);
            const fromSide: Side =
              edge.fromSide ?? (autoHorizontal ? (dx >= 0 ? "right" : "left") : dy >= 0 ? "bottom" : "top");
            const toSide: Side =
              edge.toSide ?? (autoHorizontal ? (dx >= 0 ? "left" : "right") : dy >= 0 ? "top" : "bottom");
            ({ x: x1, y: y1 } = sidePoint(from, fromSide, fw, fh, cx1, cy1));
            ({ x: x2, y: y2 } = sidePoint(to, toSide, tw, th, cx2, cy2));
            vertical = fromSide === "top" || fromSide === "bottom";
          } else if (Math.abs(dx) >= Math.abs(dy)) {
            x1 = dx >= 0 ? from.x + fw : from.x;
            y1 = cy1;
            x2 = dx >= 0 ? to.x : to.x + tw;
            y2 = cy2;
            vertical = false;
          } else {
            x1 = cx1;
            y1 = dy >= 0 ? from.y + fh : from.y;
            x2 = cx2;
            y2 = dy >= 0 ? to.y : to.y + th;
            vertical = true;
          }
          const active = step.activeEdges.includes(edge.id);
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;
          const d = edge.waypoints
            ? `M${x1},${y1} ` + edge.waypoints.map((w) => `L${w.x},${w.y}`).join(" ") + ` L${x2},${y2}`
            : y1 === y2 || x1 === x2
              ? `M${x1},${y1} L${x2},${y2}`
              : vertical
                ? `M${x1},${y1} L${x1},${midY} L${x2},${midY} L${x2},${y2}`
                : `M${x1},${y1} L${midX},${y1} L${midX},${y2} L${x2},${y2}`;
          return (
            <g key={edge.id}>
              <path
                d={d}
                fill="none"
                stroke={active ? "var(--diagram-accent)" : "rgb(var(--decor-rgb) / 0.18)"}
                strokeWidth={active ? 1.4 : 1}
                className="transition-[stroke,stroke-width] duration-500"
              />
              {active && (
                <circle key={`${stepIndex}-${edge.id}`} r="3" fill="var(--diagram-accent)">
                  <animateMotion dur="1.1s" repeatCount="indefinite" path={d} />
                </circle>
              )}
            </g>
          );
        })}

        {spec.nodes.map((node) => {
          const w = node.w ?? NODE_W;
          const h = node.h ?? NODE_H;
          const active = step.activeNodes.includes(node.id);
          return (
            <g key={node.id}>
              <rect
                x={node.x} y={node.y} width={w} height={h} rx="6"
                fill={active ? "var(--diagram-accent)" : "rgb(var(--decor-rgb) / 0.04)"}
                fillOpacity={active ? 0.12 : 1}
                stroke={active ? "var(--diagram-accent)" : "rgb(var(--decor-rgb) / 0.26)"}
                strokeWidth={active ? 1.4 : 1}
                className="transition-[stroke,fill-opacity,stroke-width] duration-500"
              />
              <text
                x={node.x + w / 2} y={node.y + h / 2 + 3}
                textAnchor="middle"
                fill={active ? "var(--foreground)" : "rgb(var(--decor-rgb) / 0.55)"}
                className="font-mono transition-[fill] duration-500"
                style={{ fontSize: 7.5 }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      <AnimatePresence mode="wait">
        <motion.p
          key={stepIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
          className="min-h-[20px] text-sm text-muted"
        >
          {step.caption}
        </motion.p>
      </AnimatePresence>

      <div className="flex gap-1.5">
        {spec.steps.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setStepIndex(i)}
            aria-label={`Step ${i + 1} of ${spec.steps.length}`}
            className="h-1 flex-1 rounded-full transition-colors"
            style={{ backgroundColor: i === stepIndex ? "var(--diagram-accent)" : "var(--border-strong)" }}
          />
        ))}
      </div>
    </div>
  );
}
