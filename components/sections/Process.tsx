import { process } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export function Process() {
  return (
    <section className="border-t border-neutral-900 px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-[13px] tracking-[0.15em] text-neutral-500">Process</h2>

        {/* Mobile: simple stacked list, no timeline */}
        <div className="mt-6 flex flex-col gap-6 md:hidden">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08} className="border-t border-neutral-900 pt-5">
              <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-bold tracking-wide text-brand">
                {p.step}
              </span>
              <h3 className="mt-3 font-display text-lg font-black text-neutral-100">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-400">{p.description}</p>
            </Reveal>
          ))}
        </div>

        {/* Desktop: interactive timeline */}
        <div className="relative mt-16 hidden md:block">
          <div className="absolute inset-x-0 top-3 h-px bg-neutral-800" />
          <div className="relative grid grid-cols-4 gap-8">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.1} className="group flex flex-col items-center text-center">
                <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-700 bg-neutral-950 transition-colors duration-300 group-hover:border-brand">
                  <span className="h-2 w-2 rounded-full bg-neutral-600 transition-colors duration-300 group-hover:bg-brand" />
                </span>

                <span className="mt-4 rounded-full border border-neutral-700 px-3 py-1 text-xs font-bold tracking-wide text-neutral-300 transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-neutral-950">
                  {p.step}
                </span>

                <h3 className="mt-4 font-display text-lg font-black text-neutral-100 transition-colors duration-300 group-hover:text-brand">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-[220px] text-[15px] leading-relaxed text-neutral-400">
                  {p.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
