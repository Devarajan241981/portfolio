import { Section } from "@/components/Section";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <div className="flex flex-col gap-6">
        {experience.map((job) => (
          <div
            key={job.company}
            className="rounded-xl border border-border bg-surface p-6 sm:p-8"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  {job.role}{" "}
                  <span className="text-muted">
                    ·{" "}
                    <a
                      href={job.companyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-red-400"
                    >
                      {job.company}
                    </a>
                  </span>
                </h3>
                <p className="mt-1 text-sm text-accent">{job.subtitle}</p>
              </div>
              <div className="shrink-0 text-sm text-muted-2">
                {job.period} · {job.location}
              </div>
            </div>

            <ul className="mt-5 flex flex-col gap-3">
              {job.points.map((point) => (
                <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-2" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
