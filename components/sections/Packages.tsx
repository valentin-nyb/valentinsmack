import { packages } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Packages() {
  return (
    <section id="packages" className="border-t border-neutral-900 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <p className="text-[13px] tracking-[0.15em] text-neutral-500">Packages</p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={cn(
                "relative flex flex-col border p-8",
                pkg.featured ? "border-orange-500/50 bg-neutral-900/40" : "border-neutral-800"
              )}
            >
              {pkg.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-orange-500 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-neutral-950">
                  Recommended
                </span>
              )}

              <h3 className="font-display text-3xl font-black text-neutral-100">{pkg.name}.</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">{pkg.description}</p>

              <p className="mt-8 text-[13px] tracking-[0.1em] text-neutral-600">Starting from</p>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-4xl font-black text-orange-500">
                  {pkg.price}
                </span>
                {pkg.cadence && (
                  <span className="text-sm text-neutral-500">{pkg.cadence}</span>
                )}
              </p>

              <a
                href="#contact"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-white transition-opacity hover:opacity-90"
              >
                Start Your Project →
              </a>

              <p className="mt-8 text-[13px] tracking-wide text-neutral-500">What&apos;s included</p>
              <ul className="mt-4 flex flex-col gap-2">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-[15px] text-neutral-300">
                    <span className="mt-0.5 text-orange-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {pkg.note && (
                <p className="mt-6 font-serif text-sm italic text-neutral-600">{pkg.note}</p>
              )}

              <a
                href="mailto:smack.valentin@gmail.com"
                className="group relative mt-auto inline-block w-fit pt-8 text-[13px] tracking-wide text-neutral-400 transition-colors hover:text-neutral-100"
              >
                Book a 15-min call →
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-neutral-100 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
