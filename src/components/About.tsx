import { Section } from "@/components/Section";
import { summary } from "@/lib/data";

const stats = [
  { label: "Production experience", value: "9 mo" },
  { label: "Engineers led", value: "4" },
  { label: "DSA problems solved", value: "100+" },
  { label: "Graduation", value: "Jun 2026" },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Summary">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <p className="text-[15px] leading-relaxed text-muted sm:text-base">{summary}</p>

        <dl className="grid grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border bg-surface p-5">
              <dd className="text-2xl font-semibold tracking-tight text-foreground">
                {stat.value}
              </dd>
              <dt className="mt-1 text-xs text-muted-2">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
