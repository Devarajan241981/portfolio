import { Section } from "@/components/Section";
import { skillGroups } from "@/lib/data";

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Technical toolkit">
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <h3 className="text-sm font-medium text-foreground">{group.label}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-muted"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
