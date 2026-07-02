import { ServiceVisual } from "@/components/ServiceVisual";
import type { ServiceVisualType } from "@/lib/data";

export function ServiceCard({
  title,
  description,
  visual,
}: {
  title: string;
  description: string;
  visual: ServiceVisualType;
}) {
  return (
    <div className="group rounded-lg border border-border bg-surface p-4 transition-colors hover:border-border-strong">
      <div className="h-32 overflow-hidden rounded-md border border-border/60 bg-background/40">
        <ServiceVisual type={visual} />
      </div>
      <h3 className="mt-4 text-sm font-medium text-foreground">{title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{description}</p>
    </div>
  );
}
