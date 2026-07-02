import { Section } from "@/components/Section";
import { achievements, certifications, education, publications } from "@/lib/data";

export function Extras() {
  return (
    <Section id="education" eyebrow="Background" title="Education & credentials">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-sm font-medium text-foreground">Education</h3>
          <div className="mt-4 flex flex-col gap-5">
            {education.map((item) => (
              <div key={item.school}>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground transition-colors hover:text-red-400"
                  >
                    {item.school}
                  </a>
                ) : (
                  <p className="text-sm text-foreground">{item.school}</p>
                )}
                <p className="mt-1 text-sm text-muted">{item.degree}</p>
                <p className="mt-1 text-xs text-muted-2">{item.period}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-foreground">Certifications</h3>
          <div className="mt-4 flex flex-col gap-4">
            {certifications.map((cert) => (
              <a
                key={cert.name}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block text-sm text-muted transition-colors hover:text-accent"
              >
                <span className="text-foreground group-hover:text-accent">{cert.name}</span>
                <br />
                <span className="text-muted-2">{cert.issuer}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-foreground">Achievements</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {achievements.map((item) => (
              <li key={item.text} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-2" />
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    {item.text}
                  </a>
                ) : (
                  item.text
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-foreground">Publications</h3>
          <div className="mt-4 flex flex-col gap-4">
            {publications.map((pub) => (
              <a
                key={pub.title}
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block text-sm text-muted transition-colors hover:text-accent"
              >
                <span className="text-foreground group-hover:text-accent">{pub.title}</span>
                <br />
                <span className="text-muted-2">{pub.venue}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
