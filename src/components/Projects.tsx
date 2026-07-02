"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const [showDragHint, setShowDragHint] = useState(true);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, []);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.clientX;
    startScrollLeft.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    if (!isDragging.current || !el) return;
    el.scrollLeft = startScrollLeft.current - (e.clientX - startX.current);
  }

  function onPointerUp() {
    isDragging.current = false;
  }

  function onScroll() {
    if (showDragHint && (scrollRef.current?.scrollLeft ?? 0) > 16) {
      setShowDragHint(false);
    }
  }

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="A mix of production systems, AI agent pipelines, and infrastructure work."
    >
      <div className="relative">
        <div
          ref={scrollRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onScroll={onScroll}
          className="no-scrollbar flex cursor-grab gap-5 overflow-x-auto pb-2 select-none active:cursor-grabbing"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isDraggingRef={isDragging}
            />
          ))}
        </div>

        <AnimatePresence>
          {showDragHint && (
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute top-1/2 right-3 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-surface/90 text-muted backdrop-blur-sm"
            >
              <motion.svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <path
                  d="M6 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
