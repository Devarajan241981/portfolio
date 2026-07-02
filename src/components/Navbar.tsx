"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ResumeModal } from "@/components/ResumeModal";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleScroll() {
      if (open) return;
      setHidden(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setHidden(false), 500);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-md transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <nav className="flex h-16 w-full items-center justify-between px-6 lg:px-10">
          <a
            href="#top"
            aria-label="Jai Chandra Kumar Devarajan"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border-strong font-mono text-xs font-medium text-foreground"
          >
            JC
          </a>

          <div className="hidden items-center gap-10 md:flex lg:gap-12">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2.5 2.5h7L12.5 5.5V13.5h-10v-11Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5 2.5V5.5H12.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
              Resume
            </button>
            <a
              href={`mailto:${profile.email}`}
              className="text-sm text-foreground transition-colors hover:text-accent"
            >
              Get in touch
            </a>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                {open ? (
                  <path
                    d="M3 3L13 13M13 3L3 13"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M2 4H14M2 8H14M2 12H14"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-border bg-background px-6 pb-6 md:hidden">
            <div className="flex flex-col gap-1 pt-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setResumeOpen(true);
                }}
                className="rounded-md px-3 py-2.5 text-left text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                Resume
              </button>
              <a
                href={`mailto:${profile.email}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-surface hover:text-accent"
              >
                Get in touch
              </a>
            </div>
          </div>
        )}
      </header>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
