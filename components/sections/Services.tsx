import { services } from "@/lib/content";
import { IconHover3D } from "@/components/ui/icon-hover-3d";

export function Services() {
  return (
    <section id="services" className="border-t border-neutral-900 px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[13px] tracking-[0.15em] text-neutral-500">Services</p>
        <div className="mt-6 flex flex-col gap-4">
          {services.map((service) => (
            <IconHover3D key={service.title} heading={service.title} text={service.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
