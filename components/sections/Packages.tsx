"use client";

import { useState } from "react";
import { packages } from "@/lib/content";
import { cn } from "@/lib/utils";

function priceFor(pkg: (typeof packages)[number], isAnnual: boolean) {
  if (pkg.billing === "one-time") {
    return { amount: pkg.priceMonthly, cadence: "one-time + VAT" };
  }
  if (isAnnual && pkg.priceYearly) {
    return { amount: pkg.priceYearly, cadence: "/ year + VAT" };
  }
  return { amount: pkg.priceMonthly, cadence: "/ month + VAT" };
}

export function Packages() {
  const [isAnnual, setIsAnnual] = useState(false);
  const hasRecurring = packages.some((p) => p.billing === "recurring");

  return (
    <section id="packages" className="border-t border-neutral-900 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="text-[13px] tracking-[0.15em] text-neutral-500">Packages</p>

          {hasRecurring && (
            <div className="flex items-center gap-3">
              <span className="text-[13px] tracking-wide text-neutral-500">Monthly</span>
              <button
                role="switch"
                aria-checked={isAnnual}
                onClick={() => setIsAnnual((v) => !v)}
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors",
                  isAnnual ? "bg-orange-500" : "bg-neutral-800"
                )}
              >
                <span
                  className={cn(
                    "absolute top-1 h-4 w-4 rounded-full bg-neutral-50 transition-transform",
                    isAnnual ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
              <span className="text-[13px] tracking-wide text-neutral-500">
                Annual <span className="text-neutral-600">(retainer only)</span>
              </span>
            </div>
          )}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => {
            const { amount, cadence } = priceFor(pkg, isAnnual);

            return (
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
                    £{amount.toLocaleString()}
                  </span>
                  <span className="text-sm text-neutral-500">{cadence}</span>
                </p>

                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                >
                  Start Your Project →
                </a>

                <p className="mt-8 text-[13px] tracking-wide text-neutral-500">Highlights</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature.label}
                      className={cn(
                        "flex items-start gap-2 text-[15px]",
                        feature.included ? "text-neutral-300" : "text-neutral-600 line-through"
                      )}
                    >
                      <span className={cn("mt-0.5", feature.included ? "text-orange-500" : "text-neutral-700")}>
                        {feature.included ? "✓" : "✗"}
                      </span>
                      {feature.label}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
