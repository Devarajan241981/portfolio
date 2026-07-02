"use client";

import { useEffect } from "react";
import { profile } from "@/lib/data";
import { CodeFall } from "@/components/CodeFall";

export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  async function handleDownload() {
    try {
      const res = await fetch(profile.resumeUrl);
      const arrayBuffer = await res.arrayBuffer();
      // force a generic binary type — some Chrome builds route application/pdf blobs
      // through the PDF-viewer subsystem even for programmatic downloads, which ignores
      // the `download` attribute and assigns a random id instead of our filename
      const blob = new Blob([arrayBuffer], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Jai_Chandra_Kumar_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        a.remove();
        URL.revokeObjectURL(url);
      }, 1000);
    } catch {
      // fetch failed (e.g. offline) — fall back to a normal navigation, browser will still get the right file
      window.open(profile.resumeUrl, "_blank");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <CodeFall intense />
      <div
        className="flex max-h-[92vh] w-fit max-w-[95vw] flex-col overflow-hidden rounded-lg border border-border bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
          <span className="text-sm font-medium text-foreground">Resume</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-md border border-border-strong px-3 py-1.5 text-xs text-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              Download
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:text-foreground"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 3L13 13M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <iframe
          src={`${profile.resumeUrl}#toolbar=0&navpanes=0&statusbar=0&view=Fit`}
          title="Resume"
          className="aspect-[17/22] h-[85vh] max-w-full bg-white"
        />
      </div>
    </div>
  );
}
