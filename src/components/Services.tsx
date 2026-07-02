import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/lib/data";

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="What I can build for you"
      description="From backend systems to full products — design, build, and ship."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
            visual={service.visual}
          />
        ))}
      </div>
    </Section>
  );
}
