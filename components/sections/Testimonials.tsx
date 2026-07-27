import { testimonials } from "@/lib/content";

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-t border-neutral-800 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
          Client Words
        </p>
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {testimonials.map((t) => (
            <figure key={t.name} className="border-t border-neutral-800 pt-6">
              <blockquote className="font-serif text-lg leading-relaxed text-neutral-200">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500">
                {t.name} — {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
