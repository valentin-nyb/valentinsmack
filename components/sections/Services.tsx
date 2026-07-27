import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="border-t border-neutral-900 px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[13px] tracking-[0.15em] text-neutral-500">Services</p>
        <div className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-2">
          {services.map((service, i) => (
            <div key={service.title} className="border-t border-neutral-900 pt-5">
              <span className="font-serif italic text-neutral-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-2xl font-black text-neutral-100 md:text-3xl">
                {service.title}
              </h3>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-neutral-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
