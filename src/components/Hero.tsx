"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { HeroNetwork } from "@/components/HeroNetwork";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-32">
      <div className="bg-grid bg-fade-mask pointer-events-none absolute inset-0 opacity-60" />
      <div className="bg-fade-mask pointer-events-none absolute inset-0">
        <HeroNetwork />
      </div>

      <motion.div
        className="relative mx-auto max-w-6xl px-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={item}
          className="flex items-center gap-2 rounded-full border border-border-strong bg-surface px-3 py-1.5 text-xs text-muted w-fit"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          {profile.availability}
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-8 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p variants={item} className="mt-4 text-lg text-muted sm:text-xl">
          {profile.role} · {profile.location}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base"
        >
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="rounded-md border border-border-strong px-5 py-2.5 text-sm text-foreground transition-colors hover:border-accent/50 hover:text-accent"
          >
            Contact me
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
