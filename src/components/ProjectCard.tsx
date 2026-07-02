"use client";

import { motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import type { MouseEvent, RefObject } from "react";
import type { projects } from "@/lib/data";

export function ProjectCard({
  project,
  index,
  isDraggingRef,
}: {
  project: (typeof projects)[number];
  index: number;
  isDraggingRef?: RefObject<boolean>;
}) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const xPercent = useTransform(mouseX, (v) => `${v * 100}%`);
  const yPercent = useTransform(mouseY, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${xPercent} ${yPercent}, rgba(62, 207, 142, 0.10), transparent 70%)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (isDraggingRef?.current) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - bounds.left) / bounds.width);
    mouseY.set((e.clientY - bounds.top) / bounds.height);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="shrink-0"
    >
      <div
        onMouseMove={handleMouseMove}
        className="group relative flex h-[540px] w-[86vw] flex-col overflow-hidden rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-strong sm:w-[480px] lg:w-[540px]"
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-medium text-foreground">{project.title}</h3>
            {project.subtitle && (
              <p className="mt-0.5 text-sm text-muted-2">
                {project.subtitle}
                {project.role ? ` · ${project.role}` : ""}
              </p>
            )}
          </div>
          {project.link === "#" ? (
            <span className="shrink-0 text-xs text-muted-2">{project.linkLabel}</span>
          ) : (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs text-muted transition-colors group-hover:text-accent"
            >
              {project.linkLabel} →
            </a>
          )}
        </div>

        <ul className="relative mt-4 flex flex-1 flex-col gap-2.5 overflow-hidden">
          {project.points.map((point) => (
            <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-muted">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-2" />
              {point}
            </li>
          ))}
        </ul>

        <div className="relative mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
