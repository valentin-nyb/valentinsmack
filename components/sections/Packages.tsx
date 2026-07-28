"use client";

import { useState } from "react";
import { packages } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export function Packages() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="packages" className="border-t border-neutral-900 px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[13px] tracking-[0.15em] text-neutral-500">Packages</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => {
            const isActive = hoveredIndex !== null ? hoveredIndex === i : pkg.featured;

            return (
            <Reveal
              key={pkg.name}
              delay={i * 0.1}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={cn(
                "relative flex flex-col border p-6 transition-colors",
                isActive ? "border-orange-500/60" : "border-neutral-100/40",
                pkg.featured && "bg-neutral-900/40"
              )}
            >
              {pkg.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-orange-500 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-neutral-950">
                  Recommended
                </span>
              )}

              <h3 className="font-display text-3xl font-black text-neutral-100">{pkg.name}.</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{pkg.description}</p>

              <p className="mt-6 text-[13px] tracking-[0.1em] text-neutral-600">Starting from</p>
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
                className="mt-5 inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-orange-600"
              >
                Start Your Project →
              </a>

              <p className="mt-6 text-[13px] tracking-wide text-neutral-500">What&apos;s included</p>
              <ul className="mt-3 flex flex-col gap-2">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-[15px] text-neutral-300">
                    <span className="mt-0.5 text-orange-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {pkg.note && (
                <p className="mt-4 font-serif text-sm italic">
                  <span className="box-decoration-clone bg-orange-500 px-1.5 py-0.5 text-neutral-950">
                    {pkg.note}
                  </span>
                </p>
              )}

              <a
                href="mailto:smack.valentin@gmail.com"
                className="group relative mt-auto inline-block w-fit pt-8 text-[13px] tracking-wide text-neutral-400 transition-colors hover:text-neutral-100"
              >
                Book a 15-min call →
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-neutral-100 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
